const markdownIt = require('markdown-it');
const format = require('date-fns/format');
// see https://plug11ty.com/plugins/reading-time-plugin-for-eleventy/
const readingTime = require('eleventy-plugin-reading-time');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const excerpts = require('./helpers/excerpts');

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true
};

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/blog/*/img/*');
  eleventyConfig.addPassthroughCopy('./src/learn/*/img/*');
  eleventyConfig.addPassthroughCopy('./src/read/img/*');
  eleventyConfig.addPassthroughCopy('./src/img/**');
  eleventyConfig.addPassthroughCopy('./src/fonts/*');
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(syntaxHighlight);
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
