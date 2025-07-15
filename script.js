const API_KEY = "96bf54ef5bba4763b4455751250507";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

// Get DOM elements

//input:
const btn = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");

//result/output:
const city = document.getElementById("city");
const region = document.getElementById("region");
const country = document.getElementById("country");
const weather = document.getElementById("weather");
const tempC = document.getElementById("temp_c");
const tempF = document.getElementById("temp_f");
const date = document.getElementById("date");
const windSpeed = document.getElementById("wind-speed");
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    searchWeather();
});




async function searchWeather() {
    let locationInput = searchInput.value;
    if (!isNaN(locationInput)) {
        alert("Please enter a valid Location.");
        return;
    }

    // const BASE_URL='https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Karachi';
    const URL = `${BASE_URL}?key=${API_KEY}&q=${locationInput}`;

    try {
        console.log("Fetching exchange rate...");
        const response = await fetch(URL);

        if (!response.ok) { alert("Could not Fetch Weather updates!") };

        const data = await response.json();
        displayWeatherInfo(data);
        showWeatherInfoBox();

    } catch (error) {
        alert("Error Fetching Data!")
        console.error("Error fetching data:", error);
    }
}


//
function displayWeatherInfo(data) {
    const city_out = data.location["name"];
    const region_out = data.location['region'];
    const country_out = data.location['country'];
    const weather_out = data.current.condition['text'];
    const temp_c_out = data.current["temp_c"];
    const temp_f_out = data.current["temp_f"];
    const date_out = data.current["last_updated"];
    const windSpeed_out = data.current['wind_kph'];
    const lat_out = data.location['lat'];
    const long_out = data.location['lon'];

    console.log("city:" + city_out);
    console.log("region:" + region_out);
    console.log("country:" + country_out);
    console.log("weather:" + weather_out);
    console.log("tempC:" + temp_c_out);
    console.log("tempF:" + temp_f_out);
    console.log("date:" + date_out);
    console.log("wind Speed:" + windSpeed_out);
    console.log("Latitude:" + lat_out);
    console.log("Longitude:" + long_out);

    city.innerText = city_out;
    region.innerText = region_out;
    country.innerText = country_out;
    weather.innerText = weather_out;
    tempC.innerText = temp_c_out + " °C";
    tempF.innerText = temp_f_out + " °F";
    date.innerText = date_out;
    windSpeed.innerText = windSpeed_out + " Km/hr";
    latitude.innerText = lat_out;
    longitude.innerText = long_out;
}

//enter key press for search box:
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchWeather(); // Call your search function here
    }
});



document.getElementById("geo-btn").addEventListener("click", () => {
    alert("Fetching your live location please wait!")
    navigator.geolocation.getCurrentPosition(
        async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Use coordinates in API request
            const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${lat},${lon}`);
            const data = await response.json();

            displayWeatherInfo(data);
            showWeatherInfoBox();   
        },
        function (error) {
            alert("Unable to retrieve your location.");
            console.error(error);
        }
    );
});


const weatherInfoBox = document.getElementById("weather-info");

document.addEventListener("DOMContentLoaded", () => {
    weatherInfoBox.style.display = 'none';
})

function showWeatherInfoBox() {
    weatherInfoBox.style.display='flex';
}