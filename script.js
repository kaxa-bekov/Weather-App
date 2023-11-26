//Side bar elements
const weatherButton = document.getElementById("weather-option");
const citiesButton = document.getElementById("cities-option");
const mapButton = document.getElementById("map-option");
const settingsButton = document.getElementById("settings-option");

const searchBox = document.getElementById('searh-box');
const searchData = document.querySelector('[data-location]');
//All tabs are contained in two arrays, one array holds the main tabs to set their active/hidden class and anothe array contains the sub tabs for the same functionality
// Also all the tabs have their unique ids to use them as a reference to each tab depending on which one is selected and set it to active.
const weatherTab = document.getElementById('weather-tab')
const subWeatherTab = document.getElementById('sub-weather-tab');

const subWeatherSummaryTab = document.getElementById('sub-weather-summary-tab');
const citiesTab = document.getElementById('cities-tab');
const placeholderCity = document.querySelector('[data-city-placeholder]');
const citiesList = document.getElementById('cities-list');
const mapTab = document.getElementById('map-tab');
const mainTabs = document.querySelectorAll('[data-mains]');
const subTabs = document.querySelectorAll('[data-subs]');


let mapInstance;

// Main info elements
const conditionsExpandButton = document.getElementById("expand-conditions");
const hourlyAndConditionsWrapper = document.getElementById("hourlyAndConditionsId");
const extendedConditionsWrapper =  document.getElementById("extendedConditionsWrapper");
// Main and sub info updatable fields (may add to a class later.)
const cityMain = document.querySelectorAll('[data-city]');
const tempMain = document.querySelectorAll('[data-temperature-main]');
const imageMain = document.querySelectorAll('[data-image-main]');
//Conditions variables/arrays of the same condition elements
const precipitation = document.querySelectorAll('[data-precipitation]');
const realFeel = document.querySelectorAll('[data-real-feel]');
const wind = document.querySelectorAll('[data-wind]');
const UVIndex = document.querySelectorAll('[data-uv]');
const humidity = document.querySelector('[data-humidity]');
const visibility = document.querySelector('[data-visibility]');
const pressure = document.querySelector('[data-pressure]');
const sunset = document.querySelector('[data-sunset]');
                                               
    // Element arrays to update the info.
    // Array contains other element arrays if they should have the same info. for example these arrays contain arrays of element, where each array of elements contains the element that supposed to displaythe same data.
    // for example the first hour, then second hour and then third hour temperature, then the rest of the 3 arrays contain only one Element, but down in the nested for loop everything gets initialized properly
    //temperature update
        let arrayOf6HoursTempDataElements = [
            document.querySelectorAll('[data-hourly-first]'),document.querySelectorAll('[data-hourly-second]'),document.querySelectorAll('[data-hourly-third]'),
            document.querySelectorAll('[data-hourly-fourth]'),document.querySelectorAll('[data-hourly-fifth]'),document.querySelectorAll('[data-hourly-sixth]')
    ];
    //image update
        let arrayOf6HoursImageDataElements = [
            document.querySelectorAll('[data-hourlyImage-first]'),document.querySelectorAll('[data-hourlyImage-second]'),document.querySelectorAll('[data-hourlyImage-third]'),
            document.querySelectorAll('[data-hourlyImage-fourth]'),document.querySelectorAll('[data-hourlyImage-fifth]'),document.querySelectorAll('[data-hourlyImage-sixth]')
    ];

        let arrayOfHourIncrement = [
            document.querySelectorAll('[data-hourI-first]'),document.querySelectorAll('[data-hourI-second]'),document.querySelectorAll('[data-hourI-third]'),
            document.querySelectorAll('[data-hourI-fourth]'),document.querySelectorAll('[data-hourI-fifth]'),document.querySelectorAll('[data-hourI-sixth]')
    ];

//Object containing keys as the day summary and values as icon URLs to assign them depending on the summary of a given day
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
//Daily forecast elements arrays of arrays of similar elements to have them initialized in one place in the code.

const dailyImage =[
     document.querySelectorAll('[data-dailyImage-first]'),document.querySelectorAll('[data-dailyImage-second]'),document.querySelectorAll('[data-dailyImage-third]'),document.querySelectorAll('[data-dailyImage-fourth]'),
     document.querySelectorAll('[data-dailyImage-fifth]'),document.querySelectorAll('[data-dailyImage-sixth]'),document.querySelectorAll('[data-dailyImage-seventh]')
];

const daySummaryWord = [
    document.querySelectorAll('[data-daySummary-first]'),document.querySelectorAll('[data-daySummary-second]'),document.querySelectorAll('[data-daySummary-third]'),document.querySelectorAll('[data-daySummary-fourth]'),
    document.querySelectorAll('[data-daySummary-fifth]'),document.querySelectorAll('[data-daySummary-sixth]'),document.querySelectorAll('[data-daySummary-seventh]')

]

//min  and max daily tempereatures.

let arrayOfArraysOfElementsContaining2ArraysMinAndMax = [

    [document.querySelectorAll('[data-max-first]'),document.querySelectorAll('[data-min-first]')],
    [document.querySelectorAll('[data-max-second]'),document.querySelectorAll('[data-min-second]')],
    [document.querySelectorAll('[data-max-third]'),document.querySelectorAll('[data-min-third]')],
    [document.querySelectorAll('[data-max-fourth]'),document.querySelectorAll('[data-min-fourth]')],
    [document.querySelectorAll('[data-max-fifth]'),document.querySelectorAll('[data-min-fifth]')],
    [document.querySelectorAll('[data-max-sixth]'),document.querySelectorAll('[data-min-sixth]')],
    [document.querySelectorAll('[data-max-seventh]'),document.querySelectorAll('[data-min-seventh]')]

]

// console.log(dailyMins[0].textContent);
const dailyForecast = document.getElementById("dailyForecast");
const subHourlyForecast = document.getElementById("subHourlyForecast");
const dailyForecastUL = document.querySelector(".daily-forecast-div > ul");
const dailyForecastFirstParagraph = document.querySelector(".daily-forecast-div > p");
const dailyForecastLi = document.querySelectorAll("[data-daily]");


//Week days array and some of the handling
const daysOfWeek = document.querySelectorAll('[data-day]')
const daysOfWeekShort = document.querySelectorAll('[data-day-short]')
let dayIncrement = new Date();
let today = new Date();

const weekDaysRefs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


//Default city name
let currentLocation= '';

// List of all the added cities
let arrayOfCities = [...citiesList.children];
let arrayOfCityNames = [];



// button handler that shows expanded conditions and adds hourly to sub-weather tab
conditionsExpandButton.addEventListener('click',() =>{

    hourlyAndConditionsWrapper.style.display = 'none';
    extendedConditionsWrapper.style.display = 'grid';
    subWeatherDisplayChange();

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

async function addCityListItem(location){

let rawData = await prepareResponse(location);

// arrayOfCityNames.forEach(cityName => {
//     if(cityName.innerHTML === rawData.locationName){
//         alert("This city has already been added! Please select it from the list.")
//         return
//     }
// })

for(let cityName of arrayOfCityNames){
    
    if(cityName.innerHTML === rawData.locationName){
        alert("This city has already been added! Please select it from the list.")
        return
    }
}

let cityListItem = document.createElement('li');
    cityListItem.classList.add('city-list-item');
let weatherImage = document.createElement('img');
    weatherImage.classList.add('city-list-img');
    weatherImage.src = imageURLs.hasOwnProperty(rawData.daySummaryKeyWord[0]) ? imageURLs[rawData.daySummaryKeyWord[0]] : './icons/loading-icon.png';
let cityNameAndLocalTimeDiv = document.createElement('div');
    cityNameAndLocalTimeDiv.classList.add('city-name-and-local-time');
let cityName = document.createElement('h1');
    cityName.classList.add('list-item-city');
    cityName.setAttribute('data-city-name',null);
    cityName.innerHTML = rawData.locationName;
let localTime = document.createElement('p');
    localTime.classList.add('local-time');
    localTime.innerHTML = '02:43 AM'
let listItemTemp = document.createElement('p');
    listItemTemp.classList.add('list-item-temperature');
    listItemTemp.innerHTML = `${rawData.temp}&deg;`;
    cityNameAndLocalTimeDiv.appendChild(cityName);
    cityNameAndLocalTimeDiv.appendChild(localTime);
    cityListItem.appendChild(weatherImage);
    cityListItem.appendChild(cityNameAndLocalTimeDiv);
    cityListItem.appendChild(listItemTemp);

    if(placeholderCity.parentElement === citiesTab){
        citiesTab.removeChild(placeholderCity);
    }

    cityListItem.addEventListener('click', () => {
        
        arrayOfCities.forEach(city => {
            city.classList.remove('selected');
        });
        updateConditions(location);
        cityListItem.classList.add('selected');

    })

 
    
    

    citiesList.appendChild(cityListItem);
    arrayOfCities = [...citiesList.children];
    arrayOfCityNames = [...document.querySelectorAll('[data-city-name]')];

}

async function prepareResponse(location){
   
    let geoData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=2e45d6c495086102f84e4abce600e8a6`).then(response => response.json());
    let locationName = geoData[0].name;
    let lat = geoData[0].lat;
    let lon = geoData[0].lon;
    let wData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2e45d6c495086102f84e4abce600e8a6&units=metric`).then(response => response.json());
    let neededData = await getNeededWeather(wData);
    
    let wholeObject = {locationName, ...neededData}; 
    // console.log(wholeObject);
    await initMap();
    return wholeObject;
}


async function getNeededWeather(weatherData) {
    
    //1. The city name is being initialized globally and set from the variable on line 151.
    
    //2. Now we will set a variable for the current temperature
    let temp = Math.trunc(weatherData.current.temp);
    
    //3. Now we will creat an array and save all of the needed air conditions in it.
    let airConditions = {       
        uvi: weatherData.current.uvi,
        windSpeed: weatherData.current.wind_speed,
        humidity: weatherData.current.humidity,
        visibility: weatherData.current.visibility,
        feelsLike: weatherData.current.feels_like,
        rain: weatherData.daily[0].rain,
        pressure: weatherData.current.pressure,
        sunset: weatherData.current.sunset
    };
    //4. Now we need the hourly temperature values for that day.
    let hourlyTempRaw = [weatherData.hourly[0].temp, weatherData.hourly[3].temp, weatherData.hourly[6].temp, weatherData.hourly[9].temp, weatherData.hourly[12].temp, weatherData.hourly[15].temp];
    
    let hourlyTemp = hourlyTempRaw.map(hour => {
        return Math.trunc(hour);
    })
    
    //5. We also need to get the hourly summary and use it to set according images on the hourly list
    let hourlySummary = [
        weatherData.hourly[0].weather[0].main,
        weatherData.hourly[3].weather[0].main,
        weatherData.hourly[6].weather[0].main,
        weatherData.hourly[9].weather[0].main,
        weatherData.hourly[12].weather[0].main,
        weatherData.hourly[15].weather[0].main
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
    temp,
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


async function updateConditions(location){

    let obj = await prepareResponse(location);


    currentLocation = obj.locationName;

    realFeel.forEach(realFeel => {
        realFeel.innerHTML = `${Math.trunc(obj.airConditions.feelsLike)}` + `&deg;`;
    })        
    wind.forEach(wind => {
        wind.innerHTML = `${Math.trunc(obj.airConditions.windSpeed*3.6)}` + ' km/h';
    })
    precipitation.forEach(rain => {
        if(!isNaN(Math.trunc(obj.airConditions.rain))){
            rain.innerHTML = (`${Math.trunc(obj.airConditions.rain)}` + ' mm/h') ?? ' 0 mm/h';
        }else{
            rain.innerHTML = ' 0 mm/h';
        }
    })
    UVIndex.forEach(uv => {
        uv.innerHTML = obj.airConditions.uvi;
    })
    humidity.innerHTML = `${obj.airConditions.humidity}` + ' %';
    visibility.innerHTML = `${obj.airConditions.visibility/1000}` + ' km';
    pressure.innerHTML = `${obj.airConditions.pressure}` + ' hPa';
    let date = new Date(obj.airConditions.sunset * 1000).toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
    sunset.innerHTML = date;
    

    //Hourly temp data
    for(let i = 0;i < arrayOf6HoursTempDataElements.length;i++){
        for(let j= 0;j < arrayOf6HoursTempDataElements[i].length; j++){
            arrayOf6HoursTempDataElements[i][j].innerHTML = `${obj.hourly[i]}` + `&deg;`;
        }
}
    //Hourly image
    for(let i = 0;i < arrayOf6HoursImageDataElements.length;i++){
        for(let j = 0;j < arrayOf6HoursImageDataElements[i].length;j++){
            arrayOf6HoursImageDataElements[i][j].src = imageURLs.hasOwnProperty([obj.hourlySummaryKeyWord[i]]) ? imageURLs[obj.hourlySummaryKeyWord[i]] : undefined ;
        }
    }

    //Daily image
    for(let i=0;i<dailyImage.length;i++){
        for(let j = 0; j < dailyImage[i].length;j++){
        dailyImage[i][j].src = imageURLs.hasOwnProperty([obj.daySummaryKeyWord[i]]) ? imageURLs[obj.daySummaryKeyWord[i]] : undefined ;
    }
    }
    
    //Daily Summary
    for(let i=0;i<daySummaryWord.length;i++){
        for(let j = 0; j < daySummaryWord[i].length;j++){
        daySummaryWord[i][j].innerHTML = daySummaries.hasOwnProperty([obj.daySummaryKeyWord[i]]) ? daySummaries[obj.daySummaryKeyWord[i]] : undefined ;
    }
    }


    //Week days long implementation
    for(let i=0;i<daysOfWeek.length;i++){
        let nextDay = i + 1;
        dayIncrement.setDate(today.getDate() + nextDay);
        daysOfWeek[i].innerHTML = weekDaysRefs[dayIncrement.getDay()];
    }

   //Week days short implementation
    for(let i =0;i<daysOfWeekShort.length;i++){
        let nextDay = i + 1;
        dayIncrement.setDate(today.getDate() + nextDay);
        daysOfWeekShort[i].innerHTML = weekDaysRefs[dayIncrement.getDay()];
    }

    
    // going inside of the main array
    for(let i = 0; i<arrayOfArraysOfElementsContaining2ArraysMinAndMax.length;i++){
        //going inside of the second array, this one will always contain a PAIR (2) of arrays foe each lines max and min, therefore we are only entering this loop once, then increasing the j variable to be out of range.
        //That is done because we are accesing both of the nested arrays(max and min) using [j+1] for the second one and initializing both
        for(let j = 0;j < arrayOfArraysOfElementsContaining2ArraysMinAndMax[i].length;j+=5){
            // Entering the actual elements array and setting their data (both at the same time) using the two dimensional array that we get from our forecast object.
            for(let n = 0;n < arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j].length;n++){
                //setting max 
                    arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j][n].innerHTML = `${Math.trunc(obj.dailyMinMax[i][0])}` + ' ';
                // //setting min
                    arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j+1][n].innerHTML = Math.trunc(obj.dailyMinMax[i][1]);
            }
        }
    }


    //initializing the city with geocoding api and the temperature with weather api
    
    cityMain.forEach(city => {
        city.innerText = currentLocation;
    })
    
    
    tempMain.forEach(t =>{
        t.innerHTML = `${obj.temp}` + `&deg;`;
    })

    imageMain.forEach(image => {
        image.alt = daySummaries.hasOwnProperty([obj.daySummaryKeyWord[0]]) ? daySummaries[obj.daySummaryKeyWord[0]] : undefined ;
        image.src = imageURLs.hasOwnProperty(obj.daySummaryKeyWord[0]) ? imageURLs[obj.daySummaryKeyWord[0]] : undefined;
    })

    //incrementring hour value +3
        let hourCurrent = new Date();
        let hourIncrement = 0;

    for(let i=0;i<arrayOfHourIncrement.length;i++){
        for(j=0;j<arrayOfHourIncrement[i].length;j++){
        hourCurrent.setHours(today.getHours() + hourIncrement, 0);
        arrayOfHourIncrement[i][j].innerHTML = hourCurrent.toLocaleTimeString(undefined, {hour:'2-digit',minute: '2-digit'});
    }
    hourIncrement += 3;
    }
    
    
}

//Map initialization
async function initMap(){
    const { Map } = await google.maps.importLibrary('maps');

    mapInstance = new Map(mapTab, {
        center: {lat:40.730610,lng:-73.935242},
        zoom: 12,
    });

    console.log(mapInstance)

    // mapInstance.addEventListener('tilesLoaded', () => {
    //     console.log('Tiles Loaded')
    // })
}


//Cities button handles ro switch tabs (classList.add/remove('active/hidden)).

citiesButton.addEventListener('click', () => {
    
    mainTabs.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })

    subTabs.forEach(tab =>{
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })
    
    subWeatherSummaryTab.classList.add('active');
    subWeatherSummaryTab.classList.remove('hidden');
    citiesTab.classList.add('active');
    citiesTab.classList.remove('hidden');
    
    
    
})

//Searh box listener and handler 

// searchBox.addEventListener('select',  () => {
//     mainTabs.forEach(tab => {
//         tab.classList.add('hidden');
//         tab.classList.remove('active');
//     })

//     subTabs.forEach(tab =>{
//         tab.classList.add('hidden');
//         tab.classList.remove('active');
//     })
    
//     subWeatherSummaryTab.classList.add('active');
//     subWeatherSummaryTab.classList.remove('hidden');
//     citiesTab.classList.add('active');
//     citiesTab.classList.remove('hidden');
// })

searchBox.addEventListener('submit', async (event) =>{

    
    try{
        
    event.preventDefault();
    const userInput = searchData.value.trim();
    if(!userInput){
        throw new Error('Empty Location');
    }

    if(citiesTab.classList.contains('active')){

        await addCityListItem(userInput);

    }else if(weatherTab.classList.contains('active')){
        updateConditions(userInput);

        arrayOfCities.forEach(city => {
            city.classList.remove('selected');
        });

        
    }else{
        updateConditions(userInput);
    }
        
    
   
    
    }catch(error){
        alert('Please enter a city name or a zip code: ' + `${error}`);
    }
    finally{
      
        searchData.value = '';
    }
})

//Weather button handler to return to the original main screen and revert the changes of 'see more; button.

weatherButton.addEventListener('click', async () => {

    subTabs.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })


    mainTabs.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })

    weatherTab.classList.add('active');
    weatherTab.classList.remove('hidden');
    subWeatherTab.classList.add('active');
    subWeatherTab.classList.remove('hidden');

    hourlyAndConditionsWrapper.style.display = 'flex';
    extendedConditionsWrapper.style.display = 'none';
    subWeatherDisplayRevert();
    try{
        if(!currentLocation){
            throw new Error('No data to show!')
        }
        await updateConditions(currentLocation); 
        
    }catch(error){
        // alert('please enter a location to view weather: ' + `${error}`);
    }
})


// map button listener
mapButton.addEventListener('click', async () => {
    subTabs.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })
    mainTabs.forEach(tab =>{
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })

    mapTab.classList.add('active');
    mapTab.classList.remove('hidden');

    await initMap();

})