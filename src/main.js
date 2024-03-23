'use strict';
console.log('main:v.2024.03.24.009');

import renderData from './js/render-functions';
import * as izi from './js/iziToastHelper';
import pixabay from './js/pixabay-api';

let page = 1;
let searchTerm = '';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

const searchBtn = document.getElementById('submit');
searchBtn.disabled = true;

const gallery = document.getElementById('gallery');
const loadingIndicator = document.getElementById('loading-indicator');
const loadMoreBtn = document.getElementById('load-more-btn');

searchInput.addEventListener('input', e => {
  searchBtn.disabled = searchInput.value.trim() === '';
});

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  showLoadingIndicator();

  searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    console.log('Please enter a search term.');
    return izi.showError('Please enter a search term.');
  }

  page = 1;
  await getImages(page);
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  await getImages(page);
});

async function getImages(page) {
  showLoadingIndicator();
  console.log('page:', page);

  try {
    const pageItems = 15;
    loadMoreBtn.style.display = 'none';

    let response = await pixabay(searchTerm, page, pageItems);
    const data = response.data;
    const hits = data.hits;
    renderData(hits);

    const totalHits = data.totalHits || 0;
    console.log('totalHits:', totalHits);
    if (totalHits === 0) {
      const msg = `main: Sorry, there are no images matching your search query: [${searchTerm}]. Please try again!`;
      hideLoadingIndicator();
      return izi.showError(msg);
    }
    if (totalHits <= page * pageItems) {
      const msg = "We're sorry, but you've reached the end of search results.";
      return izi.showInfo(msg);
    }
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    izi.showError(error.message);
  } finally {
    hideLoadingIndicator();
  }
}

function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
  loadMoreBtn.style.display = 'none';
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}
