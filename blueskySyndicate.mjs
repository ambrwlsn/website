import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';

dotenv.config(); // Load .env

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


const accessToken = await getBlueskyToken(
  process.env.BLUESKY_HANDLE,
  process.env.BLUESKY_APP_PASSWORD
);

const handle = process.env.BLUESKY_HANDLE;

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
    const text = await getLatestSocialPost('./src/social');

    await postToBluesky({
      text,
      accessToken: accessToken,
    });
  } catch (err) {
    console.error('❌ Error running script:', err.message);
  }
})();

