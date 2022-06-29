import { fetchImage } from './fetchImage';
import "./style.css"
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
var debounce = require(`lodash.debounce`)

const input = document.querySelector("input")
const button = document.querySelector("button")
const gallery = document.querySelector(".gallery")
const form = document.querySelector("#search-form")
const load = document.querySelector(".load-more")
let pageNum = 1;
load.style.visibility="hidden"
// gallery=$(".gallery")

const search = (event)=>{
    event.preventDefault()
    pageNum=1
    fetchImage(input.value,pageNum).then(photos => {
        if(photos.totalHits!=0){
            Notiflix.Notify.success("Hooray! We found totalHits images.")
            addPic(photos.hits)
            lightbox.refresh()
        }
        else{
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.") 
        }
    })
load.style.visibility="visible"
}

const loading=()=>{
    pageNum++
    fetchImage(input.value,pageNum).then(photos => {
      addPic(photos.hits)
    })
    .catch(()=>{
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.") 
    })
    lightbox.refresh()
}
form.addEventListener("submit",search)
load.addEventListener("click",loading)

 const addPic=(object)=>{
   
        
      try{
        for (const image of object) {
        let content =` <div class="photo-card">
        <a class="gallery__link" href="${image.largeImageURL}">
        <div>
        <img src="${image.webformatURL}" alt="${image.tags}" class="gallery_image" loading="lazy" />
        </div>
        </a>
        <div class="info">
          <p class="info-item">Likes:<br> 
            <b>${image.likes}</b>
          </p>
          <p class="info-item">Vievs:<br>
            <b>${image.views}</b>
          </p>
          <p class="info-item">Comments:<br>
            <b>${image.comments}</b>
          </p>
          <p class="info-item">Downloads:<br>
            <b>${image.downloads}</b>
          </p>
        </div>
        
        </div>`
        gallery.insertAdjacentHTML('beforeend', content);
    }
    var lightbox = new SimpleLightbox('.gallery a', {});
        }
        catch{
        }


 }