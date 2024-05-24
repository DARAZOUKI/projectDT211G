"use strict";
import $ from 'jquery';



function initMap() {
    navigator.geolocation.getCurrentPosition(position => {
        const mapElement = document.getElementById('map');
        mapElement.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
    });
}

initMap();

function getWeather() {
    const location = encodeURIComponent(document.getElementById('location').value);
    if (!location) return;
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c2562d53045ecc0679458c0be80122f6`)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}
function displayWeather(weatherData) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
    <h2>Weather Details for ${weatherData.name}</h2>
    <div class="weather-icon">
        <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Icon">
    </div>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Description: ${weatherData.weather[0].description}</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    <button onclick="displayDetailedWeather('${weatherData.name}')">More Details</button>
`;
}
window.initMap = initMap; // Ensure initMap is available globally
window.getWeather = getWeather; // Ensure getWeather is available globally