import axios from 'axios';
//----------------------------------------------//

const KEY_PIX = '29925704-f3eb556a3c5262f4d88a225e4';
const BASE_URL = 'https://pixabay.com/api/';

async function getImgs(name, page) {
  const params = {
    url: BASE_URL,
    params: {
      key: KEY_PIX,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      q: name,
      page: page,
      per_page: 40,
    },
  };

  return await axios(params);
}

export { getImgs };