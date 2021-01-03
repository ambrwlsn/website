const posthtml = require('posthtml');
const urls = require('posthtml-urls');
const absoluteUrl = require('./absolute-url-new');

module.exports = function(htmlContent, base) {
  if (!base) {
    throw new Error(
      'eleventy-plugin-rss, htmlToAbsoluteUrls(absolutePostUrl) was missing the full URL base `absolutePostUrl` argument.'
    );
  }

  let options = {
    eachURL: function(url, attr, element) {
      url = url.trim();

      return absoluteUrl(url, base);
    },
  };

  let modifier = posthtml().use(urls(options));

  return modifier.process(htmlContent);
};
