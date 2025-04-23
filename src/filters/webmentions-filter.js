import sanitizeHTML from 'sanitize-html';
import uniqBy from 'lodash/uniqBy.js';

export default function (webmentions, url) {
  const allowedHTML = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href'],
    },
  };

  const clean = (entry) => {
    const { html, text } = entry.content;

    if (html) {
      entry.content.value =
        html.length > 2000
          ? `mentioned this in <a href="${entry['wm-source']}">${entry['wm-source']}</a>`
          : sanitizeHTML(html, allowedHTML);
    } else {
      entry.content.value = sanitizeHTML(text, allowedHTML);
    }

    return entry;
  };

  const checkRequiredFields = (entry) => {
    const { author, published } = entry;
    return !!author && !!author.name && !!published;
  };

  const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

  const filterByUrl = (entry) => entry['wm-target'] === url;

  const filterOutSpecificAuthor = (entry) => entry.author.url !== 'https://twitter.com/ambrwlsn90';

  const byType = (type) => (entry) => entry['wm-property'] === type;

  const total = webmentions
    .filter(filterByUrl)
    .filter(filterOutSpecificAuthor)
    .length;

  const likes = webmentions
    .filter(filterByUrl)
    .filter(byType('like-of'))
    .sort(orderByDate)
    .map((entry) => entry.author);

  const reposts = webmentions
    .filter(filterByUrl)
    .filter(byType('repost-of'))
    .sort(orderByDate)
    .map((entry) => entry.author);

  const replies = webmentions
    .filter(filterByUrl)
    .filter(byType('in-reply-to'))
    .filter(filterOutSpecificAuthor)
    .sort(orderByDate)
    .map(clean);

  const bookmarks = webmentions
    .filter(filterByUrl)
    .filter(byType('bookmark-of'))
    .sort(orderByDate)
    .map(clean);

  const uniqueReplies = uniqBy(replies.reverse(), (entry) => entry.author.name).reverse();

  const traditionalMentions = webmentions
    .filter(filterByUrl)
    .filter(checkRequiredFields)
    .filter(byType('mention-of'))
    .sort(orderByDate)
    .map(clean);

  return {
    total,
    likes,
    reposts,
    replies: uniqueReplies,
    bookmarks,
    traditionalMentions,
  };
}
