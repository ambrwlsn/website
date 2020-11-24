const sanitizeHTML = require('sanitize-html');
const uniqBy = require('lodash/uniqBy');

module.exports = function(webmentions, url) {
  // define which types of webmentions should be included per URL.
  // possible values listed here:
  // https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
  const allowedTypes = [
    'mention-of',
    'in-reply-to',
    'repost-of',
    'like-of',
    'bookmark-of',
  ];

  // define which HTML tags you want to allow in the webmention body content
  // https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
  const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href'],
    },
  };

  // clean webmention content for output
  const clean = (entry) => {
    const { html, text } = entry.content;

    if (html) {
      // really long html mentions, usually newsletters or compilations
      entry.content.value =
        html.length > 2000
          ? `mentioned this in <a href="${entry['wm-source']}">${
              entry['wm-source']
            }</a>`
          : sanitizeHTML(html, allowedHTML);
    } else {
      entry.content.value = sanitizeHTML(text, allowedHTML);
    }

    return entry;
  };

  // sort webmentions by published timestamp chronologically.
  // swap a.published and b.published to reverse order.
  const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

  // Likes on Twitter
  const likes = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'like-of';
    })
    .sort(orderByDate)
    .map((_) => _.author);

  // Re-tweets on Twitter
  const reposts = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'repost-of';
    })
    .sort(orderByDate)
    .map((_) => _.author);

  // Replies on Twitter
  const replies = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'in-reply-to';
    })
    .filter((obj) => obj.author.url !== 'https://twitter.com/ambrwlsn90')
    .sort(orderByDate)
    .map(clean);

  // removes duplicate replies in the replies array
  const uniqueReplies = uniqBy(
    replies.reverse(),
    (obj) => obj.author.name
  ).reverse();

  // run all of the above for each webmention that targets the current URL
  return {
    likes,
    reposts,
    replies: uniqueReplies,
  };
};
