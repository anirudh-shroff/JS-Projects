let cityName = document.querySelector("#cityName");
const searchBtn = document.querySelector("#searchBtn");

let cityTitle = document.querySelector("#cityTitle");
let temp = document.querySelector("#temp");
let feelsLike = document.querySelector("#feelsLike");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let pressure = document.querySelector("#pressure");
let visibility = document.querySelector("#visibility");

let cityData = document.querySelector(".cityData");

cityData.style.display = "none";

const WEATHER_API_KEY = "69418bcf3e96432da5992545250212";

searchBtn.addEventListener("click", async () => {
    const city = cityName.value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=yes`
        );

        const data = await res.json();
        console.log(data);

        if (data.error) {
            alert(data.error.message);
            return;
        }

        cityData.style.display = "block";

        cityTitle.textContent = data.location.name;
        temp.textContent = `Temperature: ${data.current.temp_c}°C`;
        feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
        pressure.textContent = `Pressure: ${data.current.pressure_mb} hPa`;
        visibility.textContent = `Visibility: ${data.current.vis_km} km`;

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("Failed to fetch weather data.");
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
});
