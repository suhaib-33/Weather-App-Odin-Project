const apiKey = "f06b87ed879731fba8f04062ea93c5c2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    if (city.trim() === "") {
        return;
    }
    try {

        const response = await fetch(
            `${apiUrl}${city}&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").textContent =
            data.name;

        document.querySelector(".temp").textContent =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").textContent =
            data.main.humidity + "%";

        document.querySelector(".wind").textContent =
            data.wind.speed + " m/s";

        const weatherMain = data.weather[0].main;

        switch (weatherMain) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;

            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;

            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;

            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;

            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;

            default:
                weatherIcon.src = "images/clear.png";
        }

        document.querySelector(".weather").style.display =
            "block";

        document.querySelector(".error").style.display =
            "none";

    } catch (error) {

        document.querySelector(".error").style.display =
            "block";

        document.querySelector(".weather").style.display =
            "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});