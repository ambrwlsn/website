import fs from 'fs';
import fetch from 'node-fetch';
import unionBy from 'lodash';
import { readFile } from 'fs/promises';
const metadata = JSON.parse(
  await readFile(new URL('./metadata.json', import.meta.url), 'utf-8')
);
import { domainToASCII } from 'url';

// Load .env variables with dotenv
import dotenv from 'dotenv';
dotenv.config();

// Configuration Parameters
const CACHE_DIR = '_cache';
const API_ORIGIN = 'https://webmention.io/api/mentions.jf2';
const TOKEN = process.env.WEBMENTION_TOKEN;

async function fetchWebmentions(since) {
  const { domain } = metadata;

  if (!domain) {
    // If we dont have a domain name, abort
    console.warn(
      'unable to fetch webmentions: no domain specified in metadata.'
    );
    return false;
  }
  if (!TOKEN) {
    // If we dont have a domain access token, abort
    console.warn(
      'unable to fetch webmentions: no access token specified in environment.'
    );
    return false;
  }

  let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}`;
  if (since) {
    url += `&per-page=100&&since=${since}`;
  } else {
    url += `&per-page=999`;
  }

  const response = await fetch(url);
  if (response.ok) {
    const feed = await response.json();
    console.log(
      `${feed.children.length} webmentions fetched from ${API_ORIGIN}`
    );
    return feed;
  }

  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id');
}

// save combined webmentions in cache file
function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  const fileContent = JSON.stringify(data, null, 2);

  // create cache folder if it doesnt exist already
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }
  // write data to cache json file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    console.log(`webmentions cached to ${filePath}`);
  });
}

// get cache contents from json file
function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`;

  if (fs.existsSync(filePath)) {
    const cacheFile = fs.readFileSync(filePath);
    return JSON.parse(cacheFile);
  }
  return {
    lastFetched: null,
    children: [],
  };
}

export default async function () {
  const cache = readFromCache();
  const { lastFetched } = cache;

  // Only fetch new mentions in production
  if (process.env.ELEVENTY_ENV === 'production' || !lastFetched) {
    const feed = await fetchWebmentions(lastFetched);

    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed),
      };

      writeToCache(webmentions);
      return webmentions;
    }
  }

  console.log(`${cache.children.length} webmentions loaded from cache`);
  return cache;
};
