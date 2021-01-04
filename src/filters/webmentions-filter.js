const sanitizeHTML = require('sanitize-html');
const uniqBy = require('lodash/uniqBy');

module.exports = function(webmentions, url) {
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

  // only allow webmentions that have an author name and a timestamp
  const checkRequiredFields = (entry) => {
    const { author, published } = entry;
    return !!author && !!author.name && !!published;
  };

  // sort webmentions by published timestamp chronologically.
  // swap a.published and b.published to reverse order.
  const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

  // define which types of webmentions should be included per URL.
  // possible values listed here:
  // https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page

  // Total webmentions
  const total = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => obj.author.url !== 'https://twitter.com/ambrwlsn90')
    .length;

  // Likes on Twitter
  const likes = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'like-of';
    })
    .sort(orderByDate)
    .map((_) => _.author);

  // Re-posts
  const reposts = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'repost-of';
    })
    .sort(orderByDate)
    .map((_) => _.author);

  // Replies
  const replies = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'in-reply-to';
    })
    .filter((obj) => obj.author.url !== 'https://twitter.com/ambrwlsn90')
    .sort(orderByDate)
    .map(clean);

  // Bookmarks
  const bookmarks = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter((obj) => {
      return obj['wm-property'] === 'bookmark-of';
    })
    .sort(orderByDate)
    .map(clean);

  // removes duplicate replies in the replies array
  const uniqueReplies = uniqBy(
    replies.reverse(),
    (obj) => obj.author.name
  ).reverse();

  // Traditional (non-twitter) webmentions and quote tweets
  const traditionalMentions = webmentions
    .filter((entry) => entry['wm-target'] === url)
    .filter(checkRequiredFields)
    .filter((obj) => {
      return obj['wm-property'] === 'mention-of';
    })
    .sort(orderByDate)
    .map(clean);

  // run all of the above for each webmention that targets the current URL
  return {
    total,
    likes,
    reposts,
    replies: uniqueReplies,
    bookmarks,
    traditionalMentions,
  };
};
