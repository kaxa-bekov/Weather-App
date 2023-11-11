//Side bar elements
const weatherButton = document.getElementById("weather-option");

// Main info elements
const conditionsExpandButton = document.getElementById("expand-conditions");
const hourlyAndConditionsWrapper = document.getElementById("hourlyAndConditionsId");
const extendedConditionsWrapper =  document.getElementById("extendedConditionsWrapper");
// Main info updatable fields (may add to a class later.)
const cityMain = document.getElementById('cityMain');
const tempMain = document.getElementById('tempMain');
// Sub info elements
const dailyForecast = document.getElementById("dailyForecast");
const subHourlyForecast = document.getElementById("subHourlyForecast");
const dailyForecastUL = document.querySelector(".daily-forecast-div > ul");
const dailyForecastFirstParagraph = document.querySelector(".daily-forecast-div > p");
const dailyForecastLi = document.querySelectorAll("[data-daily]");
// console.log(dailyForecastFirstParagraph);
// console.log(dailyForecastLi);


// button handler that shows expanded conditions and adds hourly to sub-weather tab
conditionsExpandButton.addEventListener('click',() =>{

    hourlyAndConditionsWrapper.style.display = 'none';
    extendedConditionsWrapper.style.display = 'grid';
    subWeatherDisplayChange();

})

//button handler to return to the original main screen
weatherButton.addEventListener('click', () => {
    hourlyAndConditionsWrapper.style.display = 'flex';
    extendedConditionsWrapper.style.display = 'none';
    subWeatherDisplayRevert();
    updateWeather();
})


// Function to change the sub-weather display
function subWeatherDisplayChange(){
    dailyForecast.style.padding = "28px";
    dailyForecast.style.flexBasis = "66%";
    dailyForecastUL.style.gap = "15px";
    dailyForecastFirstParagraph.style.marginBottom = "0"
    subHourlyForecast.style.display = "block";
    dailyForecastLi.forEach(day => {
        day.classList.toggle("daily-forecast-shrink");
    })
}

// Function that returns the original state of the sub-weather tab
function subWeatherDisplayRevert(){
    dailyForecast.style.padding = "34px";
    dailyForecast.style.flexBasis = "100%";
    dailyForecastUL.style.gap = "51px";
    dailyForecastFirstParagraph.style.marginBottom = "39px"
    subHourlyForecast.style.display = "none";
    dailyForecastLi.forEach(day => {
        day.classList.remove("daily-forecast-shrink");
    })
}

const getWeatherData = async (lat, lon) => {
    let  weatherData = undefined;
    weatherData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2e45d6c495086102f84e4abce600e8a6&units=metric`).then(response => response.json());
    // console.log(weatherData.timezone);
    return weatherData;
}

async function getNeededWeather(getData) {


    let weatherData = await getData(40.7128,-74.006);
    let temp = weatherData.current.temp;

    let city = weatherData.timezone.split('/')[1];
    city = city.split('_')[0] + ' ' + city.split('_')[1];
    console.log(city);
    let neededData = [city, temp];
    return neededData;
} 



async function updateWeather(){

    let infoArray = await getNeededWeather(getWeatherData);
    cityMain.innerText = infoArray[0];
    tempMain.innerHTML = `${infoArray[1]}` + `&deg;`;
    console.log(await getNeededWeather(getWeatherData));

}

