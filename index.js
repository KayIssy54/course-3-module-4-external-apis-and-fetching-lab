// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Select DOM elements
const input = document.getElementById("state-input")
const button = document.getElementById("fetch-alerts")
const displayDiv = document.getElementById("alerts-display")
const errorDiv = document.getElementById("error-message")

// Fetch function using async/await
async function getWeather(state) {
  try {
    
    errorDiv.textContent = ""
    errorDiv.classList.add("hidden")

    const response = await fetch(`${weatherApi}${state}`)
    const data = await response.json()

    displayDiv.innerHTML = ""

    const alerts = data.features

    const summary = document.createElement("h2")
    summary.textContent = `Weather Alerts: ${alerts.length}`
    displayDiv.appendChild(summary)

    alerts.forEach(alert => {
      const p = document.createElement("p")
      p.textContent = alert.properties.headline
      displayDiv.appendChild(p)
    })

  } catch (error) {
    // Show error message
    errorDiv.textContent = error.message
    errorDiv.classList.remove("hidden")
  }
}
button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase()

  getWeather(state)


  input.value = ""
})
