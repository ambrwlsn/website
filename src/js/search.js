(function(window, document) {
  'use strict';

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: 'OR',
      expand: true,
    });

    const resEl = document.getElementById('searchResults');
    const noResultsEl = document.getElementById('noResultsFound');

    resEl.innerHTML = '';
    if (results) {
      results.map((r) => {
        const { id, title, date } = r.doc;
        const el = document.createElement('li');
        resEl.appendChild(el);

        const a = document.createElement('a');
        a.setAttribute('href', id);
        a.textContent = title;
        el.appendChild(a);

        const div = document.createElement('div');
        div.setAttribute('class', 'learn-post-dates');
        div.textContent = date;
        el.appendChild(div);
      });
    } else {
      noResultsEl.style.display = 'block';
    }
  };

  fetch('/search-index.json').then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById('searchField').addEventListener('input', search);
    })
  );
})(window, document);
