const markdownIt = require('markdown-it');
const format = require('date-fns/format');
// see https://plug11ty.com/plugins/reading-time-plugin-for-eleventy/
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const excerpts = require('./helpers/excerpts');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const { exec } = require('child_process');
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment(null);
env.addGlobal('variable', 'value');

var provision_uri = env.getGlobal('variable', 'value');

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true
};

module.exports = function(eleventyConfig, options) {
  eleventyConfig.addWatchTarget('./src/css/**');
  eleventyConfig.addWatchTarget('./src/blog/**/**');
  eleventyConfig.on('afterBuild', () => {
    exec('npm run concat');
  });
  eleventyConfig.addPassthroughCopy('./src/blog/*/img/**');
  eleventyConfig.addPassthroughCopy('./src/learn/img/**');
  eleventyConfig.addPassthroughCopy('./src/about/img/**');
  eleventyConfig.addPassthroughCopy('./src/projects/img/**');
  eleventyConfig.addPassthroughCopy('./src/read/img/**');
  eleventyConfig.addPassthroughCopy('./src/cv/img/**');
  eleventyConfig.addPassthroughCopy('./src/cv/**');
  eleventyConfig.addPassthroughCopy('./src/img/**');
  eleventyConfig.addPassthroughCopy('./src/fonts/**');
  eleventyConfig.addPassthroughCopy('./src/_redirects');

  // Inspired by https://github.com/5t3ph/eleventy-plugin-emoji-readtime
  const defaults = {
    wpm: 275,
    showEmoji: true,
    emoji: '📖',
    ariaLabel: 'book',
    label: 'mins',
    bucketSize: 2
  };

  eleventyConfig.addFilter('emojiReadTime', content => {
    const { wpm, showEmoji, emoji, ariaLabel, label, bucketSize } = {
      ...defaults,
      ...options
    };
    const minutes = Math.ceil(content.trim().split(/\s+/).length / wpm);
    const buckets = Math.round(minutes / bucketSize) || 1;

    const displayLabel = `${minutes} ${label}`;

    if (showEmoji) {
      return `${displayLabel} <span role="img" aria-label="${buckets} ${ariaLabel} emoji to convey the length of the post">${new Array(
        buckets || 1
      )
        .fill(`${emoji}&nbsp;`)
        .join('')}</span>`;
    }

    return displayLabel;
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter('count', value => {
    return Math.ceil(value.trim().split(/\s+/).length);
  });
  eleventyConfig.addFilter('log', value => {
    console.log('BOOO:', value);
  });
  eleventyConfig.addFilter('readableBlogPostDate', dateObj => {
    return format(new Date(dateObj), 'MMMM do, yyyy');
  });
  eleventyConfig.addFilter('readableBlogListDate', dateObj => {
    return format(new Date(dateObj), 'MMM do yyyy');
  });
  // see https://webbureaucrat.gitlab.io/posts/eleventy-excerpts/
  eleventyConfig.addFilter('toHTML', str => {
    return new markdownIt(MARKDOWN_OPTIONS).renderInline(str);
  });

  eleventyConfig.addFilter('limit', function(arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter('getExcerpt', excerpts);

  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('src/blog/**/*.md');
  });

  eleventyConfig.addCollection('learn', collection => {
    return collection.getFilteredByGlob('src/learn/*.md');
  });


  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: '<!-- excerpt -->'
  });

  eleventyConfig.setLibrary('md', markdownIt(MARKDOWN_OPTIONS));

  // Sort with `Array.sort`
  eleventyConfig.addFilter('learnSort', function(collection) {
    return collection.sort(function(a, b) {
      return b.data.number - a.data.number;
    });
  });

  eleventyConfig.addFilter('tagSort', function(collection) {
    return collection.sort(function(a, b) {
      if (b > a) return -1;
      else if (b < a) return 1;
      else return 0;
    });
  });

  eleventyConfig.addFilter('trim', function(value) {
    return value.trim();
  });

  // https://www.11ty.dev/docs/quicktips/tag-pages/
  eleventyConfig.addCollection('tagList', function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if ('tags' in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case 'all':
            case 'post':
            case 'tagList':
            case 'bookReview':
            case 'wilt':
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'public'
    }
  };
};
