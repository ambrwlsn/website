module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/css/');
  eleventyConfig.addPassthroughCopy('./src/css');
  eleventyConfig.addPassthroughCopy('./src/blog/*/img/*');
  eleventyConfig.addFilter('log', value => {
    console.log('BOOO:', JSON.stringify(value));
  });

  let markdownIt = require('markdown-it');
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
