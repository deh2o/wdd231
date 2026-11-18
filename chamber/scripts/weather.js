// Select homepage weather elements
const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIconContainer = document.querySelector("#weather-icon-container");const forecastContainer = document.querySelector("#forecast");

// Abakaliki, Ebonyi State, Nigeria
const latitude = 6.3249;
const longitude = 8.1137;

// Replace with your own OpenWeatherMap API key
const apiKey = "e3e080efc589b2f2e7f3099143b493b3";

// API URLs
const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


// Fetch current weather
async function getCurrentWeather() {
    try {
        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error("Unable to fetch current weather.");
        }

        const data = await response.json();
        displayCurrentWeather(data);

    } catch (error) {
        console.error("Current weather error:", error);

        if (currentTemp) currentTemp.textContent = "Unavailable";
        if (weatherDescription) weatherDescription.textContent = "Weather data unavailable";
    }
}


// Display current weather
function displayCurrentWeather(data) {
    if (!currentTemp || !weatherDescription || !weatherIconContainer) return;

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    currentTemp.textContent = `${temperature}°C`;
    weatherDescription.textContent = description;

    // Create the weather icon dynamically
    const icon = document.createElement("img");

    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = description;
    icon.width = 100;
    icon.height = 100;

    weatherIconContainer.replaceChildren(icon);
}


// Fetch 3-day forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Unable to fetch forecast.");
        }

        const data = await response.json();
        displayForecast(data);

    } catch (error) {
        console.error("Forecast error:", error);

        if (forecastContainer) {
            forecastContainer.textContent = "Forecast data unavailable.";
        }
    }
}


// Display the forecast
function displayForecast(data) {
    if (!forecastContainer) return;

    forecastContainer.innerHTML = "";

    const timezoneOffset = data.city.timezone;
    const dailyForecasts = {};

    // Group forecast entries by Abakaliki local date
    data.list.forEach((forecast) => {
        const localDate = new Date((forecast.dt + timezoneOffset) * 1000)
            .toISOString()
            .split("T")[0];

        if (!dailyForecasts[localDate]) {
            dailyForecasts[localDate] = [];
        }

        dailyForecasts[localDate].push(forecast);
    });

    // Get the next 3 days, excluding today
    const dates = Object.keys(dailyForecasts).sort().slice(1, 4);

    dates.forEach((date) => {
        const entries = dailyForecasts[date];

        // Find forecast closest to midday
        const middayForecast = entries.reduce((closest, entry) => {
            const localHour = new Date(
                (entry.dt + timezoneOffset) * 1000
            ).getUTCHours();

            const closestHour = new Date(
                (closest.dt + timezoneOffset) * 1000
            ).getUTCHours();

            return Math.abs(localHour - 12) < Math.abs(closestHour - 12)
                ? entry
                : closest;
        });

        createForecastCard(date, middayForecast);
    });
}


// Create a forecast card
function createForecastCard(date, forecast) {
    const card = document.createElement("article");
    card.classList.add("forecast-card");

    const day = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-NG", {
        weekday: "long",
        timeZone: "UTC"
    });

    const iconCode = forecast.weather[0].icon;
    const description = forecast.weather[0].description;
    const temperature = Math.round(forecast.main.temp);

    card.innerHTML = `
        <h4>${day}</h4>
        <img
            src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
            alt="${description}"
        >
        <p>${description}</p>
        <p><strong>${temperature}°C</strong></p>
    `;

    forecastContainer.appendChild(card);
}


// Run the weather functions
getCurrentWeather();
getForecast();