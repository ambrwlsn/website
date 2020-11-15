const elasticlunr = require('elasticlunr');
const format = require('date-fns/format');

module.exports = function(collection) {
  var index = elasticlunr(function() {
    this.addField('title');
    this.addField('tags');
    this.addField('date');
    this.setRef('id');
  });

  collection.forEach((page) => {
    index.addDoc({
      title: page.data.title,
      tags: page.data.tags,
      date: format(new Date(page.data.date), 'MMM do yyyy'),
      id: page.url,
    });
  });

  return index.toJSON();
};
