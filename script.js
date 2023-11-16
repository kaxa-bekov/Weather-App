//Side bar elements
const weatherButton = document.getElementById("weather-option");
const citiesButton = document.getElementById("cities-option");
const mapButton = document.getElementById("map-option");
const settingsButton = document.getElementById("settings-option");


// Main info elements
const conditionsExpandButton = document.getElementById("expand-conditions");
const hourlyAndConditionsWrapper = document.getElementById("hourlyAndConditionsId");
const extendedConditionsWrapper =  document.getElementById("extendedConditionsWrapper");
// Main and sub info updatable fields (may add to a class later.)
const cityMain = document.getElementById('cityMain');
const tempMain = document.getElementById('tempMain');
const chanceOfRainMainScreen = document.getElementById('chance-of-rain-top-screen');
//small grid condition elements
const realFeelMain = document.getElementById('real-feel-main');
const windMain = document.getElementById('wind-main');
const chanceOfRainMain = document.getElementById('chance-of-rain-main');
const uvIndexMain = document.getElementById('uv-index-main');
// big grid condition elements
const uvIndex = document.getElementById('uv-index');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const feelsLike = document.getElementById('feels-like');
const chanceOfRain = document.getElementById('chance-of-rain');
const pressure = document.getElementById('pressure');
const sunset = document.getElementById('sunset');

        // Element arrays to update the info.
        // 6 hours hourly temperature array
        // 3 hours hourly temperature arrays
        //Object containing keys as the day summary and values as icon URLs to assign them epending on the summary of  a given day
const hourlySixFormat = document.querySelectorAll('[data-hourlySixFormat]');
const hourlyThreeFormat = document.querySelectorAll('[data-hourlyThreeFormat]');
//Image object and image element array
const imageURLs = {
            Clear:'./weather images/sunny-img.png',
            Clouds:'./weather images/cloudy-img.png',
            Rain: './weather images/rain-img.png',
            Snow: './weather images/snow-img.png',
            Thunderstorm: './weather images/thunderstorm-img.png'
}
const daySummaries = {
    Clear:'Sunny',
    Clouds:'Cloudy',
    Rain: 'Rainy',
    Snow: 'Snow',
    Thunderstorm: 'Storm'
}
// Hourly and daily image elements arrays, as well as daily summary word array
const hourlyImageElements = document.querySelectorAll('[data-hourlyImage]');
const hourlyImageElementsShort = document.querySelectorAll('[data-hourlyImageShort]');
const dailyImage = document.querySelectorAll('[data-dailyImage]');
const daySummaryWord = document.querySelectorAll('[data-daySummary]')

//example
// for (const key in object) {
//     if (Object.hasOwnProperty.call(object, key)) {
//         const element = object[key];
//     }
// }

//min  and max daily tempereatures.
const dailyMins = document.querySelectorAll('[data-min-temp]');
const dailyMaxes = document.querySelectorAll('[data-max-temp]');
// console.log(dailyMins[0].textContent);
const dailyForecast = document.getElementById("dailyForecast");
const subHourlyForecast = document.getElementById("subHourlyForecast");
const dailyForecastUL = document.querySelector(".daily-forecast-div > ul");
const dailyForecastFirstParagraph = document.querySelector(".daily-forecast-div > p");
const dailyForecastLi = document.querySelectorAll("[data-daily]");
//Week days array
const daysOfWeek = document.querySelectorAll('[data-day]')
let dayAfter = new Date();
let today = new Date();

const weekDaysRefs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

for(let i=0;i<daysOfWeek.length;i++){
    let nextDay = i + 1;
    dayAfter.setDate(today.getDate() + nextDay);
    daysOfWeek[i].innerHTML = weekDaysRefs[dayAfter.getDay()];

}



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

// This function makes the Api call and returns the json object to be handled later in the code. It receives the lat and long coordinates that will be passed from the search bar.
const getWeatherData = async (lat, lon) => {
    let  weatherData = undefined;
    weatherData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2e45d6c495086102f84e4abce600e8a6&units=metric`).then(response => response.json());
    console.log(weatherData);
    return weatherData;
}

// getWeatherData(40.4093, 49.8671);

// This fuction gets the callback function as a parameter and then calls that function inside. The callback function is the API Call function that will return the json object.
// Then in this function we extract all the needed weather information and store it in our JS object that will be returned from here to be handled in the update() function.
async function getNeededWeather(getData) {


    // This is returned json object, we need to get needed data from it and save it in our custom object.
    let weatherData = await getData(41.4993,-81.6944);

    //Now we need to extract the following: city name, current temperature, chance of rain, hourly temperatures for that current day, air conditions for the current day.
    // We also need to get the daily temperature (highest/lowest pairs) - this will be assigned to each day of the week so should probably have a separate object for it.

    //1. City Name variable:
    let city = weatherData.timezone.split('/')[1];
    //will check if the city name is 2 words and if it is will remove the underscore from it, otherwise city will be returned
    if(city.includes('_')){
    city = city.split('_')[0] + ' ' + city.split('_')[1];
    }
    // console.log(city);

    //2. Now we will set a variable for the current temperature
    let temp = Math.trunc(weatherData.current.temp);
    
    //3. Now we will creat an array and save all of the needed air conditions in it. the chance of rain will be used twice.
    let airConditions = {       
                                uvi: weatherData.current.uvi,
                                windSpeed: weatherData.current.wind_speed,
                                humidity: weatherData.current.humidity,
                                visibility: weatherData.current.visibility,
                                feelsLike: weatherData.current.feels_like,
                                rain: weatherData.current.rain,
                                pressure: weatherData.current.pressure,
                                sunset: weatherData.current.sunset
                            };

    // console.log(airConditions[0]);
    //4. Now we need the hourly temperature values for that day.
    let hourlyTempRaw = [weatherData.hourly[6].temp, weatherData.hourly[9].temp, weatherData.hourly[12].temp, weatherData.hourly[15].temp, weatherData.hourly[18].temp, weatherData.hourly[21].temp];
   

    let hourlyTemp = hourlyTempRaw.map(hour => {
        return Math.trunc(hour);
    })

    //5. We also need to get the hourly summary and use it to set according images on the hourly list

    let hourlySummary = [
                            weatherData.hourly[6].weather[0].main,
                            weatherData.hourly[9].weather[0].main,
                            weatherData.hourly[12].weather[0].main,
                            weatherData.hourly[15].weather[0].main,
                            weatherData.hourly[18].weather[0].main,
                            weatherData.hourly[21].weather[0].main
                            ]

    
    //6. Now we will get and store the daily highest/lowest temperatures. This is represented as a matrix with each row containing the highest/lowest temperatures for that given day.
    let dailyTempHiLo = [   [weatherData.daily[0].temp.max,weatherData.daily[0].temp.min],
                            [weatherData.daily[1].temp.max,weatherData.daily[1].temp.min],
                            [weatherData.daily[2].temp.max,weatherData.daily[2].temp.min],
                            [weatherData.daily[3].temp.max,weatherData.daily[3].temp.min],
                            [weatherData.daily[4].temp.max,weatherData.daily[4].temp.min],
                            [weatherData.daily[5].temp.max,weatherData.daily[5].temp.min],
                            [weatherData.daily[6].temp.max,weatherData.daily[6].temp.min]
                        ]

                        // console.log(dailyTempHiLo[0]);

    //7. And the las thing is we have to get the summary of the day like 'sunny' or 'cloudy'
    let daySummary = [  weatherData.daily[0].weather[0].main,
                        weatherData.daily[1].weather[0].main,
                        weatherData.daily[2].weather[0].main,
                        weatherData.daily[3].weather[0].main,
                        weatherData.daily[4].weather[0].main,
                        weatherData.daily[5].weather[0].main,
                        weatherData.daily[6].weather[0].main
                    ]


    
    // this variable holds the object that has the needed info.
    let neededInfoObject = {
        city:`${city}`,
        temp:`${temp}`,
        airConditions,
        hourly: [
                hourlyTemp[0],
                hourlyTemp[1],
                hourlyTemp[2],
                hourlyTemp[3],
                hourlyTemp[4],
                hourlyTemp[5]
                ],
        hourlySummaryKeyWord: [
                hourlySummary[0],
                hourlySummary[1],
                hourlySummary[2],
                hourlySummary[3],
                hourlySummary[4],
                hourlySummary[5]
                ],
        dailyMinMax: [
                dailyTempHiLo[0],
                dailyTempHiLo[1],
                dailyTempHiLo[2],
                dailyTempHiLo[3],
                dailyTempHiLo[4],
                dailyTempHiLo[5],
                dailyTempHiLo[6]
                ],
        daySummaryKeyWord: [
                daySummary[0],
                daySummary[1],
                daySummary[2],
                daySummary[3],
                daySummary[4],
                daySummary[5],
                daySummary[6]
                ]

 
    }
    return neededInfoObject;
} 


function updateConditions(obj){

    realFeelMain.innerHTML = `${Math.trunc(obj.airConditions.feelsLike)}` + `&deg;`;
    windMain.innerHTML = `${Math.trunc(obj.airConditions.windSpeed*3.6)}` + ' km/h';
    chanceOfRainMain.innerHTML = obj.airConditions.rain ?? '0%';
    uvIndexMain.innerHTML = obj.airConditions.uvi;
    uvIndex.innerHTML = obj.airConditions.uvi;
    wind.innerHTML = `${Math.trunc(obj.airConditions.windSpeed*3.6)}` + ' km/h';
    humidity.innerHTML = `${obj.airConditions.humidity}` + ' %';
    visibility.innerHTML = `${obj.airConditions.visibility/1000}` + ' km';
    feelsLike.innerHTML = `${Math.trunc(obj.airConditions.feelsLike)}` + `&deg;`;
    chanceOfRain.innerHTML = obj.airConditions.rain ?? ' 0%';
    pressure.innerHTML = `${obj.airConditions.pressure}` + ' hPa';
    let date = new Date(obj.airConditions.sunset * 1000).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    sunset.innerHTML = date;
    chanceOfRainMainScreen.innerHTML = obj.airConditions.rain ?? ' 0%';


    for(let i = 0; i < hourlyThreeFormat.length; i++){
            hourlyThreeFormat[i].innerHTML = `${obj.hourly[i]}` + `&deg;`;
        }
   

    for(let i = 0; i < hourlyImageElements.length;i++){
            hourlyImageElements[i].src = imageURLs.hasOwnProperty([obj.hourlySummaryKeyWord[i]]) ? imageURLs[obj.hourlySummaryKeyWord[i]] : undefined ;
    }

    for(let i = 0; i < hourlyImageElementsShort.length;i++){
        hourlyImageElementsShort[i].src = imageURLs.hasOwnProperty([obj.hourlySummaryKeyWord[i]]) ? imageURLs[obj.hourlySummaryKeyWord[i]] : undefined ;
    }

    for(let i = 0; i < dailyImage.length;i++){
        dailyImage[i].src = imageURLs.hasOwnProperty([obj.daySummaryKeyWord[i]]) ? imageURLs[obj.daySummaryKeyWord[i]] : undefined ;
    }


    for(let i = 0; i < daySummaryWord.length;i++){
        daySummaryWord[i].innerHTML = daySummaries.hasOwnProperty([obj.daySummaryKeyWord[i]]) ? daySummaries[obj.daySummaryKeyWord[i]] : undefined ;
    }

    console.log(obj.dailyMinMax[0][1]);

    for(let i = 0; i < dailyMaxes.length; i++){
        dailyMaxes[i].innerHTML = `${Math.trunc(obj.dailyMinMax[i][0])}` + ' ';
        dailyMins[i].innerHTML = Math.trunc(obj.dailyMinMax[i][1]);
    }
}

async function updateWeather(){

    let infoObject = await getNeededWeather(getWeatherData);
    //initializing the city (will chage later with geocoding api) and the temperature (will be formatting to a integer number instead of decimal)
    cityMain.innerText = infoObject.city;
    tempMain.innerHTML = `${infoObject.temp}` + `&deg;`;
    // initializing the 6 hours temperature array
    for(let i = 0; i <= hourlySixFormat.length-1;i++){
        hourlySixFormat[i].innerHTML = `${infoObject.hourly[i]}` + `&deg;`;
    }

    

    updateConditions(infoObject);


}

updateWeather();
