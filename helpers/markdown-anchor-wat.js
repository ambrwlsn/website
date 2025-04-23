// altered from plugin provided by https://www.npmjs.com/package/markdown-it-anchor

import linkIcon from './link.js';

const slugify = (s) =>
  encodeURIComponent(
    String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
  );

const defaultOptions = {
  divClass: 'heading-wrapper',
  anchorClass: 'anchor-link',
};

const anchor = (md, options) => {
  options = Object.assign({}, defaultOptions, options);

  md.renderer.rules.heading_open = function(tokens, index) {
    const contentToken = tokens[index + 1];
    const slug = slugify(contentToken.content);

    if (tokens[index].tag === 'h2') {
      return `
      <div class="${options.divClass}">
        <${tokens[index].tag} id="${slug}">`;
    }
    return `<${tokens[index].tag}>`;
  };

  md.renderer.rules.heading_close = function(tokens, index) {
    const contentToken = tokens[index - 1];
    const slug = slugify(contentToken.content);

    if (tokens[index].tag === 'h2') {
      return `
      </${tokens[index].tag}>
        <a class="${options.anchorClass}" href="#${slug}">
          <span class="anchor-icon" aria-hidden="true">${linkIcon}</span>
          <span class="hidden">Section titled ${contentToken.content}</span>
        </a>
      </div>`;
    }
    return `</${tokens[index].tag}>`;
  };
};

export default anchor;
