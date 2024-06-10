//java.js

// Fetch weather data from OpenWeatherMap API based on the user's input
function getWeather() {
    const location = $('#location').val();
    if (!location) return;

    // Use OpenWeatherMap API to get weather data
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=11b4a60445294b2600c2c247f4e1cd11`, function (data) {
        displayWeather(data);
    });
}

// Display weather details on the webpage
function displayWeather(weatherData) {
    const weatherDetails = $('#weather-details');
    weatherDetails.html(`
        <h2>Weather Details for ${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `);
}

// Add event listeners to call the getWeather function when the button is clicked
$('#location').on('keypress', function (e) {
    if (e.which === 13) {
        getWeather();
    }
});

$('#get-weather-button').on('click', function () {
    getWeather();
});
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('open-menu');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });

  
});

