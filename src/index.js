import   {fetchBreeds } from "./cat-api";
import {fetchCatByBreed} from "./cat-api"
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'

const selectors = {

    breedSelect : document.querySelector(".breed-select"),
    loader : document.querySelector(".loader"), 
    error : document.querySelector(".error"),
    catInfo : document.querySelector(".cat-info")
}

selectors.loader.style.display = 'none';
selectors.error.style.display = 'none';

selectors.breedSelect.addEventListener("change", catInfoFunc)


function createMarkup(arr) {
    return arr.map(({id, name}) => 
   `<option value="${id}">${name}</option>`)
        .join('')   
}  


fetchBreeds()
.then(data => {
    selectors.breedSelect.insertAdjacentHTML('beforeend', createMarkup(data))
 new SlimSelect({
    select: '#selectElement'
  })})  
  .catch(err => {
    selectors.error.style.display = 'block';
    console.log(err)})


function catInfoFunc(evt){
selectors.loader.style.display = 'block';
selectors.catInfo.style.display = 'none';
fetchCatByBreed(evt.target.value)
.then(data =>{
   
    let dataInform = data[0].breeds[0];
    let {reference_image_id, name, description, temperament} = dataInform;
    console.log(dataInform)
    selectors.catInfo.innerHTML =
    `<img src="https://cdn2.thecatapi.com/images/${reference_image_id}.jpg" alt="${name}" width="300px">
    <div class="cat-info-div">
      <h2 class= "cat-title ">${name}</h2>
      <p class = "cat-description"> ${description}</p>
      <p class=" cat-temperament">Temperament : ${temperament}</p>
    </div>`
    
})
.catch(err => {
    selectors.error.style.display = 'block';
    console.log(err)})
.finally(()=> {
    selectors.loader.style.display = 'none'
    selectors.catInfo.style.display = 'flex'})
}
console.log(catInfoFunc())

