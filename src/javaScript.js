"use strict";
let map;

function initMap() {
    if (window.google) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            zoom: 1
        });
    } else {
        console.error('Google Maps API not loaded.');
    }
}

function getWeather() {
    const location = $('#location').val();
    if (!location) return;

    // Use OpenWeatherMap API to get weather data
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=11b4a60445294b2600c2c247f4e1cd11`, function (data) {
      
        // Display weather data
        displayWeather(data);

        // Add a marker to the map
        const marker = new google.maps.Marker({
            position: { lat: data.coord.lat, lng: data.coord.lon },
            map: map,
            title: data.name
        });

        // Center the map on the marker
        map.panTo({ lat: data.coord.lat, lng: data.coord.lon });
    });
}

function displayWeather(weatherData) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
        <h2>Weather Details for ${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;
}