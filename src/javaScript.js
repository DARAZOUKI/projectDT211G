"use strict";
import $ from 'jquery';

let currentInfoWindow = null;
//initialize the Google Map
function initMap() {
    const mapElement = document.getElementById('map');
    const map = new google.maps.Map(mapElement, {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });

    // marker and weather info for the user's current location
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const initialLocation = { lat, lng };

        map.setCenter(initialLocation);
        map.setZoom(10);

        const marker = new google.maps.Marker({ position: initialLocation, map });
        getWeatherByCoordinates(lat, lng, map, marker);
    }, () => {
        console.error('Geolocation failed.');
    });

    // Add event listener to the map
    map.addListener('click', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map
        });
        getWeatherByCoordinates(lat, lng, map, marker);
    });
}
//fetch weather data using latitude and longitude coordinates
function getWeatherByCoordinates(lat, lng, map, marker) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c2562d53045ecc0679458c0be80122f6&units=metric`,
        method: 'GET',
        success: function(data) {
            displayWeather(data);
            displayWeatherOnMap(data, map, marker);
        },
        error: function(error) {
            console.error('Error fetching weather data:', error);
        }
    });
}
//fetch weather data using a city name
function getWeather() {
    const location = encodeURIComponent(document.getElementById('location').value);
    if (!location) return;
// Make an AJAX request to fetch weather data.
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c2562d53045ecc0679458c0be80122f6&units=metric`,
        method: 'GET',
        success: function(data) {
            displayWeather(data);
            const lat = data.coord.lat;
            const lng = data.coord.lon;
            const mapElement = document.getElementById('map');
            const map = new google.maps.Map(mapElement, {
                center: { lat, lng },
                zoom: 10
            });
            const marker = new google.maps.Marker({ position: { lat, lng }, map });
            displayWeatherOnMap(data, map, marker);
        },
        error: function(error) {
            console.error('Error fetching weather data:', error);
        }
    });
}

function displayWeather(weatherData) {
    const weatherDetails = $('#weather-details');
    weatherDetails.html(`
        <h2>Weather Details for ${weatherData.name}</h2>
        <div class="weather-icon">
        <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="weather-icon">
        </div>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Description: ${weatherData.weather[0].description}</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
      
    `);
}

function displayWeatherOnMap(weatherData, map, marker) {
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }

    const infowindow = new google.maps.InfoWindow({
        content: `
            <div>
                <h3>${weatherData.name}</h3>
                <div class="weather-icon">
                <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="weather-icon">
        </div>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Description: ${weatherData.weather[0].description}</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            </div>
        `
    });

    marker.addListener('click', () => {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
        infowindow.open(map, marker);
        currentInfoWindow = infowindow;
    });

    infowindow.open(map, marker);
    currentInfoWindow = infowindow;
}

window.initMap = initMap;
window.getWeather = getWeather;
