/* eslint-disable no-undef */
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/style.css'
import axios from 'axios'
import dayjs from 'dayjs'

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

const searchInput = document.querySelector('#searchFormInput1')
const searchBtn = document.querySelector('#doSearchButton')
const cardList = document.querySelector('#cardList')

function updateCityWeather (city, weather) {
  // make main data panel visible
  const dataContainer = document.querySelector('#dataContainer')
  dataContainer.className = 'col-8'

  // first daily weather
  const todayName = document.querySelector('#todayName')
  const todayTemp = document.querySelector('#todayTemp')
  const todayWind = document.querySelector('#todayWind')
  const todayHumid = document.querySelector('#todayHumid')
  const todayUV = document.querySelector('#todayUV')
  todayName.textContent = city.name
  todayTemp.textContent = `Temp: ${weather.current.temp}°F`
  todayWind.textContent = `Wind: ${weather.current.wind_speed} MPH`
  todayHumid.textContent = `Humidity: ${weather.current.humidity} g.kg-1`
  todayUV.textContent = `UV Index: ${weather.current.uvi}`

  // now the 5 day forecast
  cardList.textContent = ''
  weather.daily.slice(0, 5).forEach((day) => {
    const dayCard = document.createElement('div')
    dayCard.className = 'col-md-3 m-0 p-1'

    const date = dayjs(day.dt * 1000)
    dayCard.innerHTML = `
                      <div class="card">
                      <h5 class="card-title">${date.format('MM/DD/YYYY')}</h5>
                      <div class="col">
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" style="width: 64px; height: 64px;" class="card-img-top" alt="Weather Icon">
                      </div>
                        <div class="card-body">
                          <ul class="list-group text-start">
                            <li class="list-group-item">Temp: ${day.temp.day}°F</li>
                            <li class="list-group-item">Wind: ${day.wind_speed} MPH</li>
                            <li class="list-group-item">Humid: ${day.humidity}</li>
                          </ul>
                        </div>
                      </div>`
    cardList.appendChild(dayCard)
  })
}

function doSearch (city) {
  axios.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${city},US&appid=${apiKey}`)
    .then(function (response) {
      // should have coordinates
      const coords = response.data
      console.log(coords)
      axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
          // should have weather data
          const weather = response.data
          updateCityWeather(coords, weather)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

function handleSearchBtn () {
  const city = searchInput.value
  doSearch(city)
}

function entry () {
  searchBtn.addEventListener('click', handleSearchBtn)
}
window.doSearch = doSearch
entry()
