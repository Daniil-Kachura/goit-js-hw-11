import { getImgs } from '../API/pixabay';
import { createMarkup } from './createMarkUp';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
  form: document.querySelector('.search-form'),
  target: document.querySelector('.target'),
  gallery: document.querySelector('.gallery'),
};
let page = 1;
let searchQuery = null;
let lightbox;


const obs = new IntersectionObserver(onObs, {
  rootMargin: '300px',
});

refs.form.addEventListener('submit', onSubmitForm);

  function onSubmitForm(evt) {
  evt.preventDefault();

  obs.unobserve(refs.target);

  refs.gallery.innerHTML = '';
  page = 1;
  searchQuery = evt.target.elements.searchQuery.value;
  if (searchQuery === '') {
    return Notiflix.Notify.failure("Sorry, you didn't write anything", {
      position: 'center-center',
    });
  }
  getImgs(searchQuery, page)
    .then(response => {
      console.log(response);
      if (!response.data.totalHits) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.', {
      position: 'center-center',
    });
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`, {
      position: 'center-center'
    });
      console.log(response.data);
      createMarkup(response.data.hits);
      lightbox = new SimpleLightbox('.gallery a');
      obs.observe(refs.target);
    })
    .catch (console.log);
    }

function onObs(entries) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      page += 1;

      getImgs(searchQuery, page)
        .then(response => {
          createMarkup(response.data.hits);
          lightbox.refresh();

          if (page * 40 > response.data.totalHits) {
            obs.unobserve(refs.target);
            return Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results.", {
      position: 'center-center'
    });
          }
        })
        .catch(console.log);
    }
  });
}

