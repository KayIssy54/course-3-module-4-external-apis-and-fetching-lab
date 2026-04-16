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
    // Clear previous error
    errorDiv.textContent = ""
    errorDiv.classList.add("hidden")

    // Fetch data
    const response = await fetch(`${weatherApi}${state}`)
    const data = await response.json()

    // Clear previous display
    displayDiv.innerHTML = ""

    // Get alerts
    const alerts = data.features

    // Display summary (IMPORTANT: tests expect this exact format)
    const summary = document.createElement("h2")
    summary.textContent = `Weather Alerts: ${alerts.length}`
    displayDiv.appendChild(summary)

    // Display each alert headline
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

// Add event listener
button.addEventListener("click", () => {
  const state = input.value.trim().toUpperCase()

  // Call fetch function
  getWeather(state)

  // Clear input (TEST expects this)
  input.value = ""
})
