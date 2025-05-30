import dateToISO from './date-to-iso';
import absoluteUrl from './absolute-url-new';
import htmlToAbsoluteUrls from './html-to-absolute-url-new';

export default async function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('rssLastUpdatedDate', (collection) => {
    if (!collection || !collection.length) {
      throw new Error('Collection is empty in rssLastUpdatedDate filter.');
    }

    // Newest date in the collection
    return dateToISO(
      new Date(
        Math.max(
          ...collection.map((item) => {
            return item.date;
          })
        )
      )
    );
  });

  eleventyConfig.addNunjucksFilter('rssDate', (dateObj) => dateToISO(dateObj));

  eleventyConfig.addNunjucksFilter('absoluteUrl', (href, base) =>
    absoluteUrl(href, base)
  );

  eleventyConfig.addNunjucksAsyncFilter(
    'htmlToAbsoluteUrls',
    (htmlContent, base, callback) => {
      if (!htmlContent) {
        callback(null, '');
        return;
      }

      htmlToAbsoluteUrls(htmlContent, base).then((result) => {
        callback(null, result.html);
      });
    }
  );
};
