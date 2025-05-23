import elasticlunr from 'elasticlunr';
import format from 'date-fns/format';

export default async function (collection) {
  var index = elasticlunr(function() {
    this.addField('title');
    this.addField('tags');
    this.addField('date');
    this.addField('keywords');
    this.setRef('id');
  });

  collection.forEach((page) => {
    index.addDoc({
      title: page.data.title,
      tags: page.data.tags,
      keywords: page.data.keywords,
      date: format(new Date(page.data.date), 'MM/dd/yyyy'),
      id: page.url,
    });
  });

  return index.toJSON();
};
