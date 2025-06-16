import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import matter from 'gray-matter';
import mime from 'mime';

dotenv.config();

// 1. Get Bluesky Access Token
async function getBlueskyToken(identifier, password) {
  const response = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.accessJwt;
}

// 2. Upload Image to Bluesky
async function uploadImageToBluesky(filePath, accessToken) {
  const url = 'https://bsky.social/xrpc/com.atproto.repo.uploadBlob';

  const imageBuffer = await fs.readFile(filePath);
  const mimeType = mime.getType(filePath);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': mimeType,
    },
    body: imageBuffer,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload image: ${response.status} - ${error}`);
  }

  const blob = await response.json();
  return blob.blob;
}

// 3. Get latest post by frontmatter "number"
async function getLatestSocialPost(socialDirectory = './src/social') {
  const files = await fs.readdir(socialDirectory);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  if (markdownFiles.length === 0) throw new Error('No markdown posts found');

  const numberedPosts = [];

  for (const file of markdownFiles) {
    const fullPath = path.join(socialDirectory, file);
    const raw = await fs.readFile(fullPath, 'utf-8');
    const { data, content } = matter(raw);

    if (typeof data.number === 'number') {
      numberedPosts.push({
        number: data.number,
        content,
        filePath: fullPath,
      });
    }
  }

  if (numberedPosts.length === 0) throw new Error('No posts with "number" in frontmatter');

  // Find post with highest number
  const latestPost = numberedPosts.sort((a, b) => b.number - a.number)[0];

  return latestPost;
}

// 4. Post to Bluesky
async function postToBluesky({ text, embed, accessToken, handle }) {
  const url = 'https://bsky.social/xrpc/com.atproto.repo.createRecord';

  // Extract links for rich text facets
  const links = [...text.matchAll(/https?:\/\/[^\s)]+/g)].map(match => {
    const start = match.index;
    const end = start + match[0].length;
    return {
      start,
      end,
      url: match[0],
    };
  });

  const facets = links.length
    ? links.map(link => ({
        index: {
          byteStart: link.start,
          byteEnd: link.end,
        },
        features: [
          {
            $type: 'app.bsky.richtext.facet#link',
            uri: link.url,
          },
        ],
      }))
    : undefined;

  const record = {
    $type: 'app.bsky.feed.post',
    text,
    createdAt: new Date().toISOString(),
  };

  if (facets) record.facets = facets;
  if (embed) record.embed = embed;

  const payload = {
    repo: handle,
    collection: 'app.bsky.feed.post',
    record,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'amberwilson.co.uk',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  const result = await response.json();
  console.log('✅ Post successful:', result.uri);
}

// 5. Main Runner
(async () => {
  try {
    const handle = process.env.BLUESKY_HANDLE;
    const accessToken = await getBlueskyToken(
      process.env.BLUESKY_HANDLE,
      process.env.BLUESKY_APP_PASSWORD
    );

    const post = await getLatestSocialPost();
    let text = post.content.trim().slice(0, 300); // Truncate if needed
    let embed;

    // Look for <img src="img/filename" alt="..."> in text
    const imgMatch = post.content.match(/<img\s+[^>]*src="img\/([^"]+)"[^>]*alt="([^"]*)"[^>]*>/i);

    if (imgMatch) {
      const imageFilename = imgMatch[1];
      const altText = imgMatch[2] || 'Image from post';
      const imagePath = path.join('./src/social/img', imageFilename);

      try {
        const blob = await uploadImageToBluesky(imagePath, accessToken);
        embed = {
          $type: 'app.bsky.embed.images',
          images: [{ image: blob, alt: altText }],
        };
        // Remove the <img> tag from post text
        text = text.replace(imgMatch[0], '').trim();
      } catch (err) {
        console.error('❌ Failed to upload image:', err.message);
      }
    }

    await postToBluesky({ text, embed, accessToken, handle });

  } catch (err) {
    console.error('❌ Error running script:', err.message);
  }
})();
