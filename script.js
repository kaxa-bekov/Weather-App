//Popup and Overlay
const overlay = document.getElementById('overlay');
const popupLocation = document.getElementById('popup-location');
const popupSeeMore = document.getElementById('popup-expand-conditions');
const popupListCities = document.getElementById('popup-city-list');
const popupHomeIcon = document.getElementById('popup-home');
const popupSettings = document.getElementById('popup-settings')

const hasVisited = localStorage.getItem('hasVisited');

// if(hasVisited !== 'true'){
    showPopupLocation();
// }

function showPopupLocation(){
    overlay.style.display = 'block';
    popupLocation.style.display = 'block';
}

function closePopupLocation(){
    popupLocation.style.display = 'none';
    popupSeeMore.style.display = 'block';
}

function closeConditionsPopup(){
    popupSeeMore.style.display = 'none';
    popupHomeIcon.style.display = 'block';
}

function closeHomePopup() {
    overlay.style.display = 'none';
    popupHomeIcon.style.display = 'none';
}


function showCityListPopup(){
    overlay.style.display = 'block';
    popupListCities.style.display = 'block';
}
 
function closeCityListPopup(){
    overlay.style.display = 'none';
    popupListCities.style.display = 'none';

}

function showSettingsPopup(){
    overlay.style.display = 'block';
    popupSettings.style.display = 'block';
}

function closeSettingsPopup(){
    overlay.style.display = 'none';
    popupSettings.style.display = 'none';
    localStorage.setItem('hasVisited','true');
}


//Side bar elements
const weatherButton = document.getElementById("weather-option");
const citiesButton = document.getElementById("cities-option");
const mapButton = document.getElementById("map-option");
const settingsButton = document.getElementById("settings-option");

const homeIcon = document.getElementById('home-icon');
homeIcon.addEventListener('click', () => {

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
});

const searchBox = document.getElementById('searh-box');
const searchData = document.querySelector('[data-location]');
let autocomplete;



//All tabs are contained in two arrays, one array holds the main tabs to set their active/hidden class and anothe array contains the sub tabs for the same functionality
// Also all the tabs have their unique ids to use them as a reference to each tab depending on which one is selected and set it to active.
const weatherTab = document.getElementById('weather-tab')
const subWeatherTab = document.getElementById('sub-weather-tab');

const subWeatherSummaryTab = document.getElementById('sub-weather-summary-tab');
const citiesTab = document.getElementById('cities-tab');
const placeholderCity = document.querySelector('[data-city-placeholder]');
const subPlaceholderCity = document.querySelector('[data-sub-city-placeholder]');

const citiesList = document.getElementById('cities-list');
const subCitiesList = document.getElementById('sub-cities-list');

const mapTab = document.getElementById('map-tab');
const subCitiesTab = document.getElementById('sub-cities-tab');

const settingsTab = document.getElementById('settings-tab');
const subSignUpTab = document.getElementById('sub-signup-tab');

//settings tab toggle switch variables
const notificationToggleCheckBox = document.getElementById('notification-toggle');
const twelveHourToggleCheckBox = document.getElementById('12-hour-toggle');
const locationToggleCheckBox = document.getElementById('location-toggle');

twelveHourToggleCheckBox.checked = true;

//Measurment unit selection sliders
const tempSlider = document.getElementById('temp-slider');
const windSlider = document.getElementById('wind-slider');
const pressureSlider = document.getElementById('pressure-slider');
const precipitationSlider = document.getElementById('precipitation-slider');
const distanceSlider = document.getElementById('distance-slider');

const mainTabs = document.querySelectorAll('[data-mains]');
const subTabs = document.querySelectorAll('[data-subs]');

//Settings variables
let tempUnit = 'c';
let windSpeedUnit = 'km/h';
let pressureUnit = 'hPa';
let precipitationUnit = 'mm';
let distanceUnit = 'km';

//Map instance variable
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
// Getting browsers current position.
const nav = window.navigator;

function getLocation(){
    return new Promise((resolve,reject) => {
        nav.geolocation.getCurrentPosition(resolve, reject);
    })
}

window.addEventListener('DOMContentLoaded', async () => {
    let position;
    try{
        position = await getLocation();
        let reverseLocation = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAi97T2eKAyD-H_jYuAoFCON0OEy_XiQOE`).then(response => response.json());
        currentLocation = reverseLocation.results[5].formatted_address.toString();
        updateConditions(currentLocation);
    }catch(error){
        alert('Then Enter a location to see weather information')
    }
});

// button handler that shows expanded conditions and adds hourly to sub-weather tab
conditionsExpandButton.addEventListener('click',() =>{
    hourlyAndConditionsWrapper.style.display = 'none';
    extendedConditionsWrapper.style.display = 'grid';
    subWeatherDisplayChange();
})

// Function to change the sub-weather display
function subWeatherDisplayChange(){
    dailyForecast.style.padding = "1.75em";
    dailyForecast.style.flexBasis = "66%";
    dailyForecastUL.style.gap = "1em";
    dailyForecastFirstParagraph.style.marginBottom = "0"
    subHourlyForecast.style.display = "block";
    dailyForecastLi.forEach(day => {
        day.classList.toggle("daily-forecast-shrink");
    })
}

// Function that returns the original state of the sub-weather tab
function subWeatherDisplayRevert(){
    dailyForecast.style.padding = "2em";
    dailyForecast.style.flexBasis = "100%";
    dailyForecastUL.style.gap = "3.1875em";
    dailyForecastFirstParagraph.style.marginBottom = "2.4375em"
    subHourlyForecast.style.display = "none";
    dailyForecastLi.forEach(day => {
        day.classList.remove("daily-forecast-shrink");
    })
}

// List of all the added cities
let arrayOfCities = [...citiesList.children];
let arrayOfSubCities = [...subCitiesList.children];
//Array of infowindows based on the location name,this is an empty array to begin with that gets modified by concat() method
let arrayOfInfoWindows = [];


//Function to receive a DOM Node and append it to the MAIN cities tab with applied styling accordingly
function addToCityList(listItem,location){
    

    listItem.classList.add('city-list-item');
    listItem.children[0].classList.add('city-list-img');
    listItem.children[1].classList.add('city-name-and-local-time');
    listItem.children[1].children[0].classList.add('list-item-city');
    listItem.children[1].children[1].classList.add('local-time');
    listItem.children[2].classList.add('list-item-temperature');
    citiesList.appendChild(listItem);
    arrayOfCities = [...citiesList.children];
    listItem.addEventListener('click', () => {
        arrayOfCities.forEach(city => {
            city.classList.remove('selected');
        });
        arrayOfSubCities.forEach(city => {
            city.classList.remove('selected');
        });
        listItem.classList.add('selected');
        updateConditions(location);
        let nodeValue = listItem.children[1].children[0].innerHTML;
        arrayOfSubCities.forEach(city => {
        if(city.children[1].children[0].innerHTML === nodeValue){
        city.classList.add('selected');
        }});
    })

    listItem.addEventListener('dblclick', () => {

        let nodeValue = listItem.children[1].children[0].innerHTML;

        for(let i = arrayOfSubCities.length-1; i>=0;i--){
            if(arrayOfSubCities[i].children[1].children[0].innerHTML === nodeValue){
                arrayOfSubCities[i].remove();
                        arrayOfSubCities.splice(i,1);
                        }
                    }

        for(let i = arrayOfCities.length-1; i>=0;i--){
                if(arrayOfCities[i].children[1].children[0].innerHTML === nodeValue){
                    arrayOfCities[i].remove();
                            arrayOfCities.splice(i,1);
                            }
                    }

        if(citiesList.children.length === 0){
            citiesTab.insertBefore(placeholderCity,citiesList);
            subCitiesTab.insertBefore(subPlaceholderCity,subCitiesList);
        }
       
    })
    
}

//Function to receive a DOM Node and append it to the SUB cities tab with applied styles according to that tab
function addToSubCityList(subListItem,location){
    subListItem.classList.add('sub-city-list-item');
    subListItem.children[0].classList.add('sub-city-list-img');
    subListItem.children[1].classList.add('sub-city-name-and-local-time');
    subListItem.children[1].children[0].classList.add('sub-list-item-city');
    subListItem.children[1].children[1].classList.add('sub-local-time');
    subListItem.children[2].classList.add('sub-list-item-temperature');
    subCitiesList.appendChild(subListItem);
    arrayOfSubCities = [...subCitiesList.children];
    subListItem.addEventListener('click', () => {
        arrayOfCities.forEach(city => {
            city.classList.remove('selected');
        });
        arrayOfSubCities.forEach(city => {
            city.classList.remove('selected');
        });
        subListItem.classList.add('selected');
        updateConditions(location);
        let nodeValue = subListItem.children[1].children[0].innerHTML;
        arrayOfCities.forEach(city => {
            if(city.children[1].children[0].innerHTML === nodeValue){
            city.classList.add('selected');
            }
        });
    })

    subListItem.addEventListener('dblclick', () => {

        let nodeValue = subListItem.children[1].children[0].innerHTML;

        for(let i = arrayOfSubCities.length-1; i>=0;i--){
            if(arrayOfSubCities[i].children[1].children[0].innerHTML === nodeValue){
                        arrayOfSubCities[i].remove();
                        arrayOfSubCities.splice(i,1);
                        }
                    }

        for(let i = arrayOfCities.length-1; i>=0;i--){
                if(arrayOfCities[i].children[1].children[0].innerHTML === nodeValue){
                        arrayOfCities[i].remove();
                        arrayOfCities.splice(i,1);
                        }
                    }

        if(subCitiesList.children.length === 0){
            subCitiesTab.insertBefore(subPlaceholderCity,subCitiesList);
            citiesTab.insertBefore(placeholderCity,citiesList);
        }
        
    })

}

async function updateConditionsOnCityListItems(){

    for(let i=0;i<arrayOfCities.length;i++){
        let cityTemp = await prepareResponse(arrayOfCities[i].children[1].children[0].innerHTML);
        arrayOfCities[i].children[2].innerHTML = `${getTemperatureInCorrectUnit(cityTemp.temp)}` + '&deg;' + `${tempUnit === 'c' ? 'C' : 'F'}`;
        arrayOfSubCities[i].children[2].innerHTML = `${getTemperatureInCorrectUnit(cityTemp.temp)}` + '&deg;' + `${tempUnit === 'c' ? 'C' : 'F'}`;
    }
}

async function addCityListItem(location){

    if(await ifLocationExists(location)) return

    let rawData = await prepareResponse(location);

    let cityListItem = document.createElement('li');
    let weatherImage = document.createElement('img');
    weatherImage.src = imageURLs.hasOwnProperty(rawData.daySummaryKeyWord[0]) ? imageURLs[rawData.daySummaryKeyWord[0]] : './icons/loading-icon.png';
    let cityNameAndLocalTimeDiv = document.createElement('div');
    let cityName = document.createElement('h1');
    cityName.innerHTML = rawData.locationName;
    let localTime = document.createElement('p');
    localTime.innerHTML = rawData.localTime.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'});
    let listItemTemp = document.createElement('p');
    listItemTemp.innerHTML = `${getTemperatureInCorrectUnit(rawData.temp)}&deg;` + `${tempUnit === 'c' ? 'C' : 'F'}`;
    cityNameAndLocalTimeDiv.appendChild(cityName);
    cityNameAndLocalTimeDiv.appendChild(localTime);
    cityListItem.appendChild(weatherImage);
    cityListItem.appendChild(cityNameAndLocalTimeDiv);
    cityListItem.appendChild(listItemTemp);

    let subCityListItem = cityListItem.cloneNode(true);
    addToCityList(cityListItem,rawData.locationName);
    addToSubCityList(subCityListItem,rawData.locationName);

    if(placeholderCity.parentElement === citiesTab){
        citiesTab.removeChild(placeholderCity);
        subCitiesTab.removeChild(subPlaceholderCity)
    }
}

//This function will be checking if we already have the same location added to our lists of locations and prevent any other function calls before we even get any weather for that location ( which is obviously unnecessary
async function ifLocationExists(location){
    let locationToCheck = await getLatLongForInput(location);
    let ifExists = false;
    for(localName of arrayOfCities){
        if(localName.children[1].children[0].innerHTML === locationToCheck.locationName){
            alert("This city has already been added! Please select it from the list.");
            ifExists = true;
        }
    }
    return ifExists;
 }

//Function to return local time at the given location
async function getLocalTimeForLocation(lat, lon){
    //Creating a date object based on milliseconds elapsed from january 1 (timestamp in machine's local time)
    let localDate = new Date(Date.now());
    //Getting UTC time zone date pieces stored in 6 variables (used to create a date object for current UTC date/time in UTC time zone)
    let utcYear = localDate.getUTCFullYear();
    let utcMonth = localDate.getUTCMonth();
    let utcDAte = localDate.getUTCDate();
    let utcHour = localDate.getUTCHours();
    let utcMinute = localDate.getUTCMinutes();
    let utcSecond = localDate.getUTCSeconds();
    //Creating the UTC date/time object for current time in UTC time zone
    let UTCdate = new Date(utcYear, utcMonth, utcDAte, utcHour, utcMinute, utcSecond);
    //Getting a timestamp in milliseconds from the UTC date object - this gives us the seconds(after dividing on 1000) elapsed since january 1 till current time in UTC time zone
    utcTimestamp = Date.UTC(utcYear, utcMonth, utcDAte, utcHour, utcMinute, utcSecond) / 1000; // Now we have a UTC date object and UTC seconds (all in UTC time zone which is important to get local time based on given location)

    //Calling time zone API to get the time offset for the given location (passing the UTC timestapm for accuracy (kinda optional))
    let timeZOneInfo = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lon}&timestamp=${utcTimestamp}&key=AIzaSyAi97T2eKAyD-H_jYuAoFCON0OEy_XiQOE`).then(response => response.json());
    //Getting the Hour value of offset by diving the seconds value on 3600(60*60)
    let hourOffset = timeZOneInfo.rawOffset/3600;
    //Calculating the local time for the given location by adding the offset hours to the UTC hours
    let local = UTCdate.getHours() + hourOffset;
    //Creating a new date object to hold the local date to the given location and setting its hour value to the UTC hours + offset hours
    localToTheLocationDate = new Date();
    localToTheLocationDate.setHours(local);
    //returning the Date object holding the local time for the given location
    return [localToTheLocationDate,hourOffset];
}

//This function will be getting the user input and returning lat and long for it
async function getLatLongForInput(location){
    //Creating a reference to the Geocoder class from google maps API
    const {Geocoder} = await google.maps.importLibrary('geocoding');
    //Creating an object of that class
    let geocoder = new Geocoder();
    //Geo coding the location input received from a user
    const codedGeo = await geocoder.geocode({address : location});
    //Setting the location name to the formatted location string
    let locationName = codedGeo.results[0].formatted_address;
    
    if(locationName.includes(',')){
        //Making sure to remove the last word if there are 2 commas in the formatted response
        let localName = locationName.split(',');
        locationName = localName[0] + ', ' + localName[1];
    }
    //And finally setting the latitude and longtitude values to variables
    let lat = codedGeo.results[0].geometry.location.lat();
    let lon = codedGeo.results[0].geometry.location.lng();
    //Putting the data in an object and returning that object
    let geoCodedInfoObject = {
        locationName,
        lat,
        lon
    }
    return geoCodedInfoObject;
}

//This function will be adding a marker to the map every time user adds a city to the list
async function getInfoWindow(marker,infoWindow){

    for(let i = 0;i < arrayOfInfoWindows.length;i++){
       arrayOfInfoWindows[i].close();
    }

    infoWindow.open({
        anchor: marker,
        mapInstance,
        shouldFocus: false
    });
    

    marker.addListener('click', () => {
        infoWindow.open({
            anchor: marker,
            mapInstance,
            shouldFocus: false
        });
    })

  
}

async function getLatLngObject(lat,lon){
    //Creating a reference to LatLng class from google maps API
    const {LatLng} = await google.maps.importLibrary('core')
    //Creating an object of that class called markerPosition because that will be our marker position for each new marker
    const markerPosition = new LatLng(lat, lon);
    return markerPosition;
}

async function getmapMarker(latLngObject){
    //Creating a reference to Marker class from google maps API
    const {Marker} = await google.maps.importLibrary('marker');
    //Creating a new Marker object and initializing it with the given LatLng object created a few lines above
    const marker = new Marker({
        position: latLngObject,
        map: mapInstance
    })
    //Every time this function is called map will be panned to the new marker position(previous markers remain on the map)
    mapInstance.panTo(latLngObject);
    return marker;
}

async function initInfoWindow(locationName,temp,daySummary){
    const infoWindowContent = (location,temp,daySummary) => {
        const infoDiv = document.createElement('div');
        infoDiv.setAttribute('style', "font-family: 'Rubik',sans-serif;");
        infoDiv.classList.add('info-window')
        const infoLocation = document.createElement('h1');
        infoLocation.innerHTML = location;
        const infoImage = document.createElement('img');
        infoImage.src = imageURLs.hasOwnProperty(daySummary) ? imageURLs[daySummary] : './icons/loading-icon.png';
        const infoTemp = document.createElement('p');
        infoTemp.innerHTML = getTemperatureInCorrectUnit(temp) + '&deg;' + `${tempUnit === 'c' ? 'C' : 'F'}`;
        
        infoDiv.append(infoLocation,infoImage,infoTemp);
        return infoDiv;
    }
    const {InfoWindow} = await google.maps.importLibrary('maps');
    const infoWindow = new InfoWindow({content: infoWindowContent(locationName,temp,daySummary),maxWidth:300});
    arrayOfInfoWindows.push(infoWindow);

    return infoWindow;
}

async function prepareResponse(location){
    
    //Calling the function that will return an object containing the formatted location string and lat adn long for the giveen location
    let geoCodedObject = await getLatLongForInput(location);
    let lat = geoCodedObject.lat;
    let lon = geoCodedObject.lon;

    let locationName = geoCodedObject.locationName;

    //Calling the function that will return the local time to the location that was entered
    let localTimeArray = await getLocalTimeForLocation(geoCodedObject.lat, geoCodedObject.lon);
    let localTime = localTimeArray[0];
    let localTimeOffset = localTimeArray[1];

    
    //Making the Weather Api call based on lat and long returned fro Geocoder
    let wData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2e45d6c495086102f84e4abce600e8a6&units=metric`).then(response => response.json());
    //Calling the function that will format the weather data and return only what we need
    let neededData = getNeededWeather(wData);
    //Adding the necesary data to the object that will be returned to update all the conditions and UI
    let wholeObject = {locationName, ...neededData,localTime,localTimeOffset,lat,lon}; 

    //this code will execute only if user is currently in the Map Tab or in the Settings Tab
    if(mapTab.classList.contains('active') || settingsTab.classList.contains('active')){
        //Calling the functions that will add a marker to the map based on given location

        //Calling the function that will return a LatLng object
        const latlngObject = await getLatLngObject(lat,lon);
        //Callin the function that will return a reference to a Map Marker
        const mapMarker = await getmapMarker(latlngObject);
        //Calling the function that will create an InfoWindow and add it to the map Marker
        const infoWindowRef = await initInfoWindow(locationName,neededData.temp,neededData.daySummaryKeyWord[0]);
        //Calling the function that will be making changes to the info windows aka closing and opening new ones
        await getInfoWindow(mapMarker,infoWindowRef);

    }

    //Returning the necessary data object
    return wholeObject;
}


function getNeededWeather(weatherData) {
    
    //1. The location name is being initialized globally and set from the variable on line 151.
    
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

function updateHourlies(localTime){
    //incrementring LOCAL hour value +3
    let hourCurrent;
    let hourIncrement = 0;
    let hourlyFormat = '';

    if((currentLocation === '') && ((localTime === undefined) || (localTime === null))){
        hourCurrent = new Date;
        switch(twelveHourToggleCheckBox.checked){
            case true:
                for(let i=0;i<arrayOfHourIncrement.length;i++){
    
                    hourCurrent.setHours(hourCurrent.getHours() + hourIncrement, 0);
            
                        for(j=0;j<arrayOfHourIncrement[i].length;j++){
                        arrayOfHourIncrement[i][j].innerHTML = hourCurrent.toLocaleTimeString(undefined, {hour:'2-digit',minute: '2-digit'});
                        }
            
                    hourIncrement = 3;
                }
               break;
            case false:
                for(let i=0;i<arrayOfHourIncrement.length;i++){
    
                    hourCurrent.setHours(hourCurrent.getHours() + hourIncrement, 0);
                    if(hourCurrent.getHours() < 10){
                        hourlyFormat = '0' + `${hourCurrent.getHours()}`;
                    }else{
                        hourlyFormat = `${hourCurrent.getHours()}`;
                    }
            
                        for(j=0;j<arrayOfHourIncrement[i].length;j++){
                        arrayOfHourIncrement[i][j].innerHTML = `${hourlyFormat}` + ':00';
                        }
            
                    hourIncrement = 3;
                    hourlyFormat = '';
                }
                break;
            default:
                break;
    
        }
    }else{
        
    hourCurrent = localTime;
   

    switch(twelveHourToggleCheckBox.checked){
        case true:
            for(let i=0;i<arrayOfHourIncrement.length;i++){

                hourCurrent.setHours(hourCurrent.getHours() + hourIncrement, 0);
        
                    for(j=0;j<arrayOfHourIncrement[i].length;j++){
                    arrayOfHourIncrement[i][j].innerHTML = hourCurrent.toLocaleTimeString(undefined, {hour:'2-digit',minute: '2-digit'});
                    }
        
                hourIncrement = 3;
            }
           break;
        case false:
            for(let i=0;i<arrayOfHourIncrement.length;i++){

                hourCurrent.setHours(hourCurrent.getHours() + hourIncrement, 0);
                if(hourCurrent.getHours() < 10){
                    hourlyFormat = '0' + `${hourCurrent.getHours()}`;
                }else{
                    hourlyFormat = `${hourCurrent.getHours()}`;
                }
        
                    for(j=0;j<arrayOfHourIncrement[i].length;j++){
                    arrayOfHourIncrement[i][j].innerHTML = `${hourlyFormat}` + ':00';
                    }
        
                hourIncrement = 3;
                hourlyFormat = '';
            }
            break;
        default:
            break;

    }
    }

    
}

updateHourlies(undefined);

async function updateConditions(location){

    let obj = await prepareResponse(location);

    currentLocation = obj.locationName;

    realFeel.forEach(realFeel => {
        realFeel.innerHTML = `${Math.trunc(getTemperatureInCorrectUnit(obj.airConditions.feelsLike))}` + `&deg;` + `${tempUnit === 'c' ? 'C' : 'F'}`;
    })        
    wind.forEach(wind => {
        switch(windSpeedUnit){
            case 'km/h':
                wind.innerHTML = `${Math.trunc(obj.airConditions.windSpeed*3.6)}` + ' km/h';
                break;
            case 'mi/h':
                wind.innerHTML = `${Math.trunc((obj.airConditions.windSpeed*3.6)/1.609)}` + ' mi/h';
                break;
            case 'knots':
                wind.innerHTML = `${Math.trunc((obj.airConditions.windSpeed*3.6)/1.852)}` + ' Knots';
                break;
            default:
                break;

        }
        
    })
    precipitation.forEach(rain => {
        if(!isNaN(Math.trunc(obj.airConditions.rain))){
            switch (precipitationUnit) {
                case 'mm':
                    rain.innerHTML = (`${Math.trunc(obj.airConditions.rain)}` + ' mm/h') ?? ' 0 mm/h';
                    break;
                case 'inches':
                    rain.innerHTML = (`${Math.trunc(obj.airConditions.rain/25.4)}` + ' In/h') ?? ' 0 In/h';
                default:
                    break;
            } 
        }else{
            switch(precipitationUnit){
                case 'mm':
                    rain.innerHTML = ' 0 mm/h';
                    break;
                case 'inches':
                    rain.innerHTML = ' 0 Inches';
                    break;
                default:
                    break;
            }
            
        }
    })
    UVIndex.forEach(uv => {
        uv.innerHTML = obj.airConditions.uvi;
    })
    humidity.innerHTML = `${obj.airConditions.humidity}` + ' %';
    switch (distanceUnit) {
        case 'km':
            visibility.innerHTML = `${obj.airConditions.visibility/1000}` + ' km';
            break;
        case 'mi':
            visibility.innerHTML = `${Math.trunc((obj.airConditions.visibility/1000)/1.609)}` + ' mi';
        default:
            break;
    }
    switch(pressureUnit){
        case 'hPa':
            pressure.innerHTML = `${obj.airConditions.pressure}` + ' hPa';
            break;
        case 'inches':
            pressure.innerHTML = `${Math.trunc(obj.airConditions.pressure/33.7685)}` + ' Inches';
            break;
        case 'kPa':
            pressure.innerHTML = `${obj.airConditions.pressure/10}` + ' kPa';
            break;
        case 'mm':
            pressure.innerHTML = `${Math.trunc(obj.airConditions.pressure/1.33322)}` + ' mm';
            break;    
        default:
            break;
    }
    

    //Getting Date object based on sunset timestamp for the location which returns the date and time in the machines local time zone. then getting UTC time off of that tsunset timestamp and then adding the local time ofset.
    let date = new Date(obj.airConditions.sunset * 1000);
    let utcYear = date.getUTCFullYear();
    let utcMonth = date.getUTCMonth();
    let utcDAte = date.getUTCDate();
    let utcHour = date.getUTCHours();
    let utcMinute = date.getUTCMinutes();
    let utcSecond = date.getUTCSeconds();
    let utcDateObject = new Date(utcYear,utcMonth,utcDAte,utcHour,utcMinute,utcSecond );
    utcDateObject.setHours(utcDateObject.getHours() + obj.localTimeOffset);

    let hourFormat;
    if(utcDateObject.getHours() < 10){
        hourFormat = '0' + `${utcDateObject.getHours()}`;
    }else{
        hourFormat = `${utcDateObject.getHours()}`;
    }

    let minuteFormat;
    if(utcDateObject.getMinutes() < 10){
        minuteFormat = '0' + `${utcDateObject.getMinutes()}`;
    }else{
        minuteFormat = `${utcDateObject.getMinutes()}`;
    }

    switch(twelveHourToggleCheckBox.checked){
        case true:
           sunset.innerHTML = utcDateObject.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" });
           break;
        case false:
           sunset.innerHTML = `${hourFormat}` + ':' + `${minuteFormat}`;
            break;
        default:
            break;

    }
    
    //Hourly temp data
    for(let i = 0;i < arrayOf6HoursTempDataElements.length;i++){
        for(let j= 0;j < arrayOf6HoursTempDataElements[i].length; j++){
            arrayOf6HoursTempDataElements[i][j].innerHTML = `${getTemperatureInCorrectUnit(obj.hourly[i])}` + `&deg;` + `${tempUnit === 'c' ? 'C' : 'F'}`;
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

    let dayIncrement = new Date();
    let today = new Date();
    //Week days long implementation
    for(let i=0;i<daysOfWeek.length;i++){
        let nextDay = i + 1;
        dayIncrement.setDate(today.getDate() + nextDay); 
        daysOfWeek[i].innerHTML = weekDaysRefs[dayIncrement.getDay()];
    }
    dayIncrement = new Date();
   //Week days short implementation
    for(let i =0;i<daysOfWeekShort.length;i++){
        let nextDay = i + 1;
        dayIncrement.setDate(today.getDate() + nextDay);
        daysOfWeekShort[i].innerHTML = weekDaysRefs[dayIncrement.getDay()];
    }
    dayIncrement = new Date();
    
    // going inside of the main array
    for(let i = 0; i<arrayOfArraysOfElementsContaining2ArraysMinAndMax.length;i++){
        //going inside of the second array, this one will always contain a PAIR (2) of arrays foe each lines max and min, therefore we are only entering this loop once, then increasing the j variable to be out of range.
        //That is done because we are accesing both of the nested arrays(max and min) using [j+1] for the second one and initializing both
        for(let j = 0;j < arrayOfArraysOfElementsContaining2ArraysMinAndMax[i].length;j+=5){
            // Entering the actual elements array and setting their data (both at the same time) using the two dimensional array that we get from our forecast object.
            for(let n = 0;n < arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j].length;n++){
                //setting max 
                    arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j][n].innerHTML = `${Math.trunc(getTemperatureInCorrectUnit(obj.dailyMinMax[i][0]))}` + ' ';
                // //setting min
                    arrayOfArraysOfElementsContaining2ArraysMinAndMax[i][j+1][n].innerHTML = `${Math.trunc(getTemperatureInCorrectUnit(obj.dailyMinMax[i][1]))}`  + `${tempUnit === 'c' ? 'C' : 'F'}`;
            }
        }
    }


    //initializing the city with geocoding api and the temperature with weather api
    
    cityMain.forEach(city => {
        city.innerText = currentLocation;
    })
    
   
    tempMain.forEach(t =>{
        t.innerHTML = `${getTemperatureInCorrectUnit(obj.temp)}` + `&deg;` + `${tempUnit === 'c' ? 'C' : 'F'}`;
    })



    imageMain.forEach(image => {
        image.alt = daySummaries.hasOwnProperty([obj.daySummaryKeyWord[0]]) ? daySummaries[obj.daySummaryKeyWord[0]] : undefined ;
        image.src = imageURLs.hasOwnProperty(obj.daySummaryKeyWord[0]) ? imageURLs[obj.daySummaryKeyWord[0]] : undefined;
    })



    updateHourlies(obj.localTime);


}

//Cities button handles to switch tabs (classList.add/remove('active/hidden)).

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


    // if(hasVisited !== 'true'){
        showCityListPopup();
    // }
    
})

//Searh box listener and handler 

searchBox.addEventListener('submit', async (event) =>{
    event.preventDefault();
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
        alert('please enter a location to view weather: ' + `${error}`);
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
    subCitiesTab.classList.add('active');
    subCitiesTab.classList.remove('hidden');

    // await initMap();

})


settingsButton.addEventListener('click', () => {
    subTabs.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })
    mainTabs.forEach(tab =>{
        tab.classList.add('hidden');
        tab.classList.remove('active');
    })

    settingsTab.classList.add('active');
    settingsTab.classList.remove('hidden')
    subSignUpTab.classList.add('active');
    subSignUpTab.classList.remove('hidden')

    // if(hasVisited !== 'true'){
        showSettingsPopup()
    // }
})

async function setTempUnits(unit){
    tempUnit = unit;
    switch(unit){
        case 'c':
            tempSlider.style.left = '0'
            break;
        case 'f':
            tempSlider.style.left = '50%'
            break;
        default:
            console.log('invalid argument for temperature unit');
    }
    await updateConditionsOnCityListItems();
    await updateConditions(currentLocation);
}

async function setWindUnits(unit){
    windSpeedUnit = unit;
    switch(unit){
        case 'km/h':
            windSlider.style.left = '0';
            break;
        case 'mi/h':
            windSlider.style.left = '33%';
            break;
        case 'knots':
            windSlider.style.left = '66%';
            break;
        default:
            console.log('invalid argument for wind speed unit');
    }
    await updateConditions(currentLocation);
}

async function setPressureUnits(unit){
    pressureUnit = unit;
    switch(unit){
        case 'hPa':
            pressureSlider.style.left = '0';
            break;
        case 'inches':
            pressureSlider.style.left = '25%';
            break;
        case 'kPa':
            pressureSlider.style.left = '50%';
            break;
        case 'mm':
            pressureSlider.style.left = '75%';
            break;    
        default:
            console.log('invalid argument for pressure unit');
    }
    await updateConditions(currentLocation);
}

function setPrecipitationUnits(unit){
    precipitationUnit = unit;
    switch(unit){
        case 'mm':
            precipitationSlider.style.left = '0';
            break;
        case 'inches':
            precipitationSlider.style.left = '50%';
            break;
        default:
            console.log('invalid argument for precipitation unit');
    }
}

function setDistanceUnits(unit){
    distanceUnit = unit;
    switch(unit){
        case 'km':
            distanceSlider.style.left = '0';
            break;
        case 'mi':
            distanceSlider.style.left = '50%';
            break;
        default:
            console.log('invalid argument for distance unit');
    }
}


function getTemperatureInCorrectUnit(temp){
    //Setting the correct measurment unit for the temperature
    let temperature;
    switch (tempUnit) {
        case 'c':
            temperature = temp;
            break;
        case 'f':
            temperature = Math.trunc((temp * (9/5)) + 32);
            break;
        default:
            break;
    }
    return temperature;
}


function notificationsToggle(){
    notificationToggleCheckBox.checked = !notificationToggleCheckBox.checked;
}

function twelveHourToggle(){
    twelveHourToggleCheckBox.checked = !twelveHourToggleCheckBox.checked;
}

function locationToggle(){
    locationToggleCheckBox.checked = !locationToggleCheckBox.checked;
}
//Google map initialization(one instance only, called when app starts)
async function initMap(){
    if(mapInstance) return
    const { Map } = await google.maps.importLibrary('maps');
    mapInstance = new Map(mapTab, {
        center: {lat:40.730610,lng:-73.935242},
        zoom: 12,
    });

    const { Autocomplete } = await google.maps.importLibrary('places');
    autocomplete = new Autocomplete(searchData, {
        fields: ['formatted_address','name'],
        types: ['(regions)']
    })

    
    autocomplete.addListener('place_changed', async () => {
        
        try{

            console.log(autocomplete.getPlace().name);
            const userInput = autocomplete.getPlace().formatted_address;
            if(!userInput){
                throw new Error('Empty Location');
            }
        
            if(citiesTab.classList.contains('active') || mapTab.classList.contains('active')){
        
                 
                //Taking the selection off of all of thye list items
                arrayOfCities.forEach(city => {
                    city.classList.remove('selected');
                });
                arrayOfSubCities.forEach(city => {
                    city.classList.remove('selected');
                })
                await updateConditions(userInput);
                await addCityListItem(userInput);
            }else if(weatherTab.classList.contains('active')){
                await updateConditions(userInput);
        
                arrayOfCities.forEach(city => {
                    city.classList.remove('selected');
                });
                arrayOfSubCities.forEach(city => {
                    city.classList.remove('selected');
                })
            }
            }catch(error){
                alert('Please enter a city name or a zip code: ' + `${error}`);
            }
            finally{
              
                searchData.value = '';
                searchData.focus();
            }

    })
}

window.initMap();