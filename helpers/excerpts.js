const striptags = require('striptags');
const he = require('he');

module.exports = function(str) {
  //   Truncate content and add ellipsis.
  const truncate = value => value.slice(0, 160) + '…';

  //   Remove HTML tags from the output for plain text, and
  //   encode HTML entities.
  return truncate(he.decode(striptags(str)));
};
