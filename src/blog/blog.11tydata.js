const excerpts = require('../../helpers/excerpts');
const markdownIt = require('markdown-it');

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true
};

module.exports = {
  eleventyComputed: {
    postExcerpt: (data) => {
      const currentPost = data.collections.posts.find(post =>
        post.data.title === data.title
      )
      if (!currentPost) {
        return '';
      }

      const parsedMarkdownBody = new markdownIt(MARKDOWN_OPTIONS).renderInline(currentPost.template.frontMatter.content);
      return excerpts(parsedMarkdownBody)
    }
  }
};
