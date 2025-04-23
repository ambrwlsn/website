import markdownIt from 'markdown-it';
import excerpts from './excerpts.js';

const MARKDOWN_OPTIONS = {
  html: true,
  breaks: false,
  linkify: true,
};

export default function eleventyExcerptPlugin(eleventyConfig) {
  const md = new markdownIt(MARKDOWN_OPTIONS);

  eleventyConfig.addAsyncFilter('excerpt', (content = '') => {
    const parsed = md.renderInline(content);
    return excerpts(parsed);
  });
}
