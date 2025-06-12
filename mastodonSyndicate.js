import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const MASTODON_API_TOKEN = process.env.MASTODON_API_TOKEN;
const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE;

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
  let content = await fs.readFile(fullPath, 'utf-8');

  // Remove frontmatter if present
  content = content.replace(/^---[\s\S]*?---/, '').trim();

  return content.slice(0, 500); // Mastodon character limit
}

async function postToMastodon(text) {
  const url = `${MASTODON_INSTANCE}/api/v1/statuses`;

  const body = {
    status: text,
    visibility: 'public' // or 'unlisted', 'private', 'direct'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MASTODON_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Mastodon post failed: ${response.status} ${err}`);
  }

  const result = await response.json();
  console.log('✅ Posted to Mastodon:', result.url);
}

(async () => {
  try {
    const text = await getLatestSocialPost('./src/social');
    await postToMastodon(text);
  } catch (err) {
    console.error('❌ Mastodon syndication error:', err.message);
  }
})();
