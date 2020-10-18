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
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter('log', value => {
    console.log('BOOO:', JSON.stringify(value));
  });
  eleventyConfig.addFilter('readableDate', dateObj => {
    return format(new Date(dateObj), 'MMMM do, yyyy');
  });
  // see https://webbureaucrat.gitlab.io/posts/eleventy-excerpts/
  eleventyConfig.addFilter('toHTML', str => {
    return new markdownIt(MARKDOWN_OPTIONS).renderInline(str);
  });

  eleventyConfig.addFilter('getExcerpt', excerpts);

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: '<!-- excerpt -->'
  });

  eleventyConfig.setLibrary('md', markdownIt(MARKDOWN_OPTIONS));

  return {
    // These are all optional, defaults are shown:
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'public'
    }
  };
};
