const gallery = document.querySelector('.gallery');

function createMarkup(arr) {
  const mark = arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        comments,
        downloads,
        largeImageURL,
        views,
        
      }) => {
        return `<div class="gallery__item">
                  <div class="photo-card">
                  <a class="gallery__item" href="${largeImageURL}">
                    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
                    </a>
                    <div class="info">
                      <p class="info-item">
                        <b>Likes :</b> ${likes}
                      </p>
                      <p class="info-item">
                        <b>Views :</b> ${views}
                      </p>
                      <p class="info-item">
                        <b>Comments :</b> ${comments}
                      </p>
                      <p class="info-item">
                        <b>Downloads :</b> ${downloads}
                      </p>
                    </div>
               </div>
            </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', mark);
}

export { createMarkup };