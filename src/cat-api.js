import axios from "axios";
axios.defaults.baseURL = "https://api.thecatapi.com/v1/"
axios.defaults.headers.common["x-api-key"] ="live_OdQUj2bd2o1aVUuL0IBJmkoKWNUjJUaROR0UAx9JMiW3dayGRDufVPgOM9eYt0Sj" ;

export function fetchBreeds(){
    return axios.get(`breeds/`)
    .then((response)=> {
        console.log(response.data)
        return response.data})
    .catch(error => console.log(err))
    }
export function fetchCatByBreed(breedId){
    return axios.get(`images/search?breed_ids=${breedId}`)
    .then((response)=> {
        return response.data})
    .catch(error => console.log(err))
    
}