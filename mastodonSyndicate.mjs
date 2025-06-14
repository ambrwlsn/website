import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const MASTODON_API_TOKEN = process.env.MASTODON_API_TOKEN;
const MASTODON_INSTANCE = process.env.MASTODON_INSTANCE;

async function getLatestSocialPost(socialDirectory = './src/social') {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  try {
    // Get the most recently committed markdown file
    const { stdout } = await execAsync(`git log -1 --name-only --pretty=format: -- ${socialDirectory}/*.md`);
    const latestFile = stdout.trim().split('\n').filter(f => f.endsWith('.md'))[0];

    if (!latestFile) throw new Error('No recently committed markdown file found.');

    const content = await fs.readFile(latestFile, 'utf-8');

    // Strip frontmatter if present
    const cleaned = content.replace(/^---[\s\S]*?---/, '').trim();

    return cleaned.slice(0, 300); // Optional: truncate to 300 characters
  } catch (err) {
    throw new Error(`Error getting latest social post: ${err.message}`);
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
