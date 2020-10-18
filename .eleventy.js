const markdownIt = require('markdown-it');
const format = require('date-fns/format');
// see https://plug11ty.com/plugins/reading-time-plugin-for-eleventy/
const readingTime = require('eleventy-plugin-reading-time');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

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

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  eleventyConfig.setLibrary('md', markdownIt(options));

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
