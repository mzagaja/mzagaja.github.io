// Algolia credentials injected via Jekyll (meta tags in base.html)
// We read them from data attributes on the search dialog element

const searchDialog = document.querySelector('#search-dialog');
const searchTrigger = document.querySelector('#search-trigger');
const mobileMenuTrigger = document.querySelector('#mobile-menu-trigger');
const mobileNav = document.querySelector('#mobile-nav');

// Mobile drawer
if (mobileMenuTrigger && mobileNav) {
  mobileMenuTrigger.addEventListener('click', () => {
    mobileNav.show();
  });
}

// Search dialog open
if (searchTrigger && searchDialog) {
  searchTrigger.addEventListener('click', () => {
    searchDialog.show();
  });
}

// Lazy Algolia init — only pay the cost on first open
let searchInitialized = false;

if (searchDialog) {
  searchDialog.addEventListener('wa-show', () => {
    if (searchInitialized) return;
    searchInitialized = true;
    initAlgolia();
  });
}

function initAlgolia() {
  const appId = 'ADZBG2997L';
  const apiKey = 'b8c639bf58a56694e5b07d3b68d685b1';
  const indexName = 'jekyll';

  // Load Algolia scripts dynamically
  const algoliaScript = document.createElement('script');
  algoliaScript.src = 'https://cdn.jsdelivr.net/npm/algoliasearch@4.14.2/dist/algoliasearch-lite.umd.js';
  algoliaScript.crossOrigin = 'anonymous';

  const instantsearchScript = document.createElement('script');
  instantsearchScript.src = 'https://cdn.jsdelivr.net/npm/instantsearch.js@4.49.1/dist/instantsearch.production.min.js';
  instantsearchScript.crossOrigin = 'anonymous';

  const momentScript = document.createElement('script');
  momentScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js';

  document.head.appendChild(algoliaScript);

  algoliaScript.onload = () => {
    document.head.appendChild(instantsearchScript);
    document.head.appendChild(momentScript);

    instantsearchScript.onload = () => {
      const searchClient = algoliasearch(appId, apiKey);

      const search = instantsearch({
        indexName,
        searchClient,
      });

      const hitTemplate = (hit) => {
        const date = hit.date ? moment.unix(hit.date).format('MMM D, YYYY') : '';
        const title = hit._highlightResult.title.value;
        const content = hit._highlightResult.html ? hit._highlightResult.html.value : '';
        return `
          <div class="post-item">
            <span class="post-meta">${date}</span>
            <h2><a class="post-link" href="${hit.url}">${title}</a></h2>
            <div class="post-snippet">${content}</div>
            <a class="read-more" href="${hit.url}">Read More</a>
          </div>
        `;
      };

      search.addWidgets([
        instantsearch.widgets.searchBox({
          container: '#search-searchbar',
          placeholder: 'Search posts...',
          showSubmit: false,
          showLoadingIndicator: false,
          showReset: false,
        }),
        instantsearch.widgets.hits({
          container: '#search-hits',
          templates: { item: hitTemplate },
          escapeHTML: false,
        }),
        instantsearch.widgets.poweredBy({
          container: '#powered-by',
          theme: 'dark',
        }),
      ]);

      search.start();
    };
  };
}
