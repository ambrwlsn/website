import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

dotenv.config(); // Load .env

const accessToken = process.env.BLUESKY_ACCESS_TOKEN;
const handle = process.env.BLUESKY_HANDLE;

async function getLatestSocialPost(socialDirectory = './src/social') {
  const files = await fs.readdir(socialDirectory);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  if (markdownFiles.length === 0) throw new Error('No markdown posts found');

  let latestFile = '';
  let latestTime = 0;

  for (const file of markdownFiles) {
    const stat = await fs.stat(path.join(socialDirectory, file));
    if (stat.mtimeMs > latestTime) {
      latestTime = stat.mtimeMs;
      latestFile = file;
    }
  }

  const fullPath = path.join(socialDirectory, latestFile);
  const content = await fs.readFile(fullPath, 'utf-8');
  return content.trim().slice(0, 300); // Optional: limit to Bluesky's 300 characters
}


async function postToBluesky(data = {}) {
  const url = 'https://bsky.social/xrpc/com.atproto.repo.createRecord';

  const text = data.text || '';
  const regex = /(https?:\/\/[^\s]+)/g;
  let match;
  const links = [];

  while ((match = regex.exec(text)) !== null) {
    const urlString = match[0];
    const start = match.index;
    const end = start + urlString.length;

    links.push({ start, end, url: urlString });
  }

  const facets = links.length > 0
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

  if (data.embed) record.embed = data.embed;
  if (facets) record.facets = facets;

  const payload = {
    collection: 'app.bsky.feed.post',
    repo: handle,
    record,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'amberwilson.co.uk',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`HTTP ${response.status}: ${err}`);
    }

    const result = await response.json();
    console.log('✅ Post successful:', result);
  } catch (err) {
    console.error('❌ Failed to post to Bluesky:', err.message);
  }
}

// Run it
(async () => {
  try {
    const text = await getLatestSocialPost('./social');

    await postToBluesky({
      text,
      accessToken: accessToken,
    });
  } catch (err) {
    console.error('❌ Error running script:', err.message);
  }
})();

