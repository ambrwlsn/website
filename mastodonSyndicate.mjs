import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import fetch from 'node-fetch';
import mime from 'mime';
import { FormData } from 'undici';
import { Blob } from 'fetch-blob';

class File extends Blob {
  constructor(chunks, name, options = {}) {
    super(chunks, options);
    this.name = name;
    this.lastModified = options.lastModified || Date.now();
  }
}

dotenv.config();

// ENV
const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE;
const MASTODON_API_TOKEN = process.env.MASTODON_API_TOKEN;

if (!MASTODON_INSTANCE || !MASTODON_API_TOKEN) {
  throw new Error('Missing MASTODON_INSTANCE or MASTODON_API_TOKEN in .env');
}

// Utility: Upload image to Mastodon
async function uploadImage(filePath, altText = 'Image from post') {
  const url = `https://${process.env.MASTODON_INSTANCE}/api/v2/media`;

  // Read file as buffer
  const buffer = await fs.readFile(filePath);

  // Detect MIME type — force fallback to image/jpeg if unsure
  const mimeType = mime.getType(filePath) || 'image/jpeg';

  const fileName = path.basename(filePath);

  // Create File for FormData
  const file = new File([buffer], fileName, { type: mimeType });

  const form = new FormData();
  form.append('file', file);
  form.append('description', altText);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MASTODON_API_TOKEN}`,
    },
    body: form,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mastodon image upload failed: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.id;
}

// Utility: Post status
async function postToMastodon({ text, mediaId }) {
  const url = `https://${MASTODON_INSTANCE}/api/v1/statuses`;

  const payload = {
    status: text,
    visibility: 'public',
    media_ids: mediaId ? [mediaId] : [],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MASTODON_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mastodon post failed: ${response.status} - ${error}`);
  }

  console.log('✅ Successfully posted to Mastodon');
}

// Utility: Get post with highest frontmatter `number`
async function getHighestNumberPost(dir = './src/social') {
  const files = await fs.readdir(dir);
  const markdownFiles = files.filter(f => f.endsWith('.md'));

  let topPost = null;
  let highestNumber = -Infinity;

  for (const file of markdownFiles) {
    const fullPath = path.join(dir, file);
    const content = await fs.readFile(fullPath, 'utf8');
    const parsed = matter(content);

    const num = Number(parsed.data.number);
    if (!isNaN(num) && num > highestNumber) {
      highestNumber = num;
      topPost = {
        file,
        content: parsed.content.trim(),
        data: parsed.data,
      };
    }
  }

  if (!topPost) throw new Error('No valid post with a number found');
  return topPost;
}

// Run script
(async () => {
  try {
    const post = await getHighestNumberPost();
    let text = post.content;
    let mediaId = null;

    // Extract <img src="img/..." alt="..."> tag
    const imgMatch = text.match(/<img\s+[^>]*src="img\/([^"]+)"[^>]*alt="([^"]*)"[^>]*>/i);
    if (imgMatch) {
      const filename = imgMatch[1];
      const altText = imgMatch[2] || 'Image';
      const imagePath = path.join('./src/social/img', filename);

      text = text.replace(imgMatch[0], '').trim();

      mediaId = await uploadImage(imagePath, altText); // 👈 Pass altText here
      console.log(`📸 Uploaded image: ${filename}`);
    }

    // Post status
    await postToMastodon({ text, mediaId });
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
})();
