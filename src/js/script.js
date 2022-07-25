/* eslint-disable no-undef */
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'
import axios from 'axios'

const apiKey = '34a61fe9d75bb7e785ce9f32d42de618' // The client nature of this app requires me to 
                                                  // have a hard coded API key for a non-free service 
                                                  // that needs a credit card and information on file. 
                                                  // Luckily the service allows you to restrict the number 
                                                  // of API calls allowed to the free tier limit of 1000 requests.
                                                  // This is infuriatingly bad practice and I have no idea why the bootcamp
                                                  // is making us do it like this. Normally the API request would be done by the
                                                  // backend serving the web application and hydrated safely to the client.
                                                  // This project is a big fat thumbs down in my book, and I'll probably disable 
                                                  // the API key after it's graded. 

const searchInput = document.querySelector("#searchFormInput1")
const searchBtn = document.querySelector("#doSearchButton")

function doSearch(city){
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function handleSearchBtn() {
    const city = searchInput.value
    doSearch(city)
}

function entry() {
    searchBtn.addEventListener('click', doSearch)
}
entry()