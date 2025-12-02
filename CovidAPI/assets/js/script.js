const searchBtn = document.querySelector("#searchBtn");
const countryInput = document.querySelector("#name");

const stats = document.querySelector("#stats");
const locationName = document.querySelector("#locationName");
const confirmedCases = document.querySelector("#confirmedCases");
const deathCase = document.querySelector("#deathCase");
const surviveCases = document.querySelector("#surviveCases");
const flagImg = document.querySelector("#flag");

// Initially hide the stats card
stats.style.display = "none";

searchBtn.addEventListener("click", () => {
    const country = countryInput.value.trim();

    if (country === "") {
        alert("Please enter a country name!");

        // Hide stats card
        stats.style.display = "none";
        return;
    }

    fetchData(country);
});

async function fetchData(country) {
    const url = `https://disease.sh/v3/covid-19/countries/${country}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();

        // Update stats
        locationName.textContent = `Country: ${data.country}`;
        confirmedCases.textContent = `Confirmed Cases: ${data.cases.toLocaleString()}`;
        deathCase.textContent = `Deaths: ${data.deaths.toLocaleString()}`;
        surviveCases.textContent = `Active Cases: ${data.active.toLocaleString()}`;

        // Update flag
        flagImg.src = data.countryInfo.flag;

        // Show stats card
        stats.style.display = "block";

    } catch (error) {
        alert("Error: " + error.message);

        // Hide stats card on error
        stats.style.display = "none";
    }
}
