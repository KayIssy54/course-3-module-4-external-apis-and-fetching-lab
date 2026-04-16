// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here! 

async function fetchWeather(state) {
    const response = await fetch(weatherApi + state);
    const data = await response.json();
    return data;
}


function displayWeather(data, state) {
    const results = document.getElementById("weather-results");
    results.innerHTML = "";

    const alerts = data.features;

    const title = document.createElement("h2");
    title.textContent =
        `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;

    results.appendChild(title);

    const ul = document.createElement("ul");

    alerts.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        ul.appendChild(li);
    });

    results.appendChild(ul);
}


function showError(message) {
    const errorBox = document.getElementById("error-message");
    const results = document.getElementById("weather-results");

    results.innerHTML = "";
    errorBox.style.display = "block";
    errorBox.textContent = message;
}


const button = document.getElementById("get-weather");

if (button) {
    button.addEventListener("click", async () => {
        const input = document.getElementById("state");
        const errorBox = document.getElementById("error-message");
        const results = document.getElementById("weather-results");

        const state = input.value.trim().toUpperCase();

        try {
            errorBox.textContent = "";
            errorBox.style.display = "none";

            const data = await fetchWeather(state);
            displayWeather(data, state);

            input.value = "";

        } catch (error) {
            showError(error.message);
        }
    });
}