'use strict';
import axios from 'axios';

//  Клас з параметрами запиту та методами для зипиту на сервер
export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '29925704-f3eb556a3c5262f4d88a225e4';

  constructor() {
    this.page = 1;
    this.per_page = 40;
    //   searchQuery будемо записувати в екземплярі при сабміті форми
    this.searchQuery = '';
  }

  //  Метод для запиту на сервер
  fetchPhotosByQuery() {
    //  Обєкт параметрів запиту
    const searchParams = {
      q: this.searchQuery,
      key: this.#API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    };

    //   Виводить результат запиту
    return axios.get(`${this.#BASE_URL}`, {
      params: searchParams,
    });
  }
}
