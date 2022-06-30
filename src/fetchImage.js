export { fetchImage };
import axios from "axios";
import Notiflix from 'notiflix';
async function fetchImage(name,pageNum) {
  return await axios.get(`https://pixabay.com/api/?key=28343049-d212888c474dea82932fe7020&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNum}&per_page=40`).
  then(
    photos => {
        return photos.data;
    }
  );
}
