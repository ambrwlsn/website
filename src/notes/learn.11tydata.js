const excerpts = require('../../helpers/excerpts');
const markdownIt = require('markdown-it');

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true,
};

module.exports = {
  eleventyComputed: {
    learnExcerpt: (data) => {
      const currentPost = data.collections.notes.find(
        (post) => post.data.title === data.title
      );
      if (!currentPost) {
        return '';
      }

      const parsedMarkdownBody = new markdownIt(MARKDOWN_OPTIONS).renderInline(
        currentPost.template.frontMatter.content
      );
      return excerpts(parsedMarkdownBody);
    },
  },
};
