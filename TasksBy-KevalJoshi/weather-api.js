
let cityDropdown = document.getElementById("citydropdown");

const cityNameInput = document.getElementById('cityname');

async function searchCity() {

    let cityName = cityNameInput.value;

    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${cityName}&type=like&sort=population&cnt=10&appid=0bbef5e062e1b62fbf010233e89fe25a`);
        let result = await data.json();

        let weatherDetailsDiv = document.getElementById("weatherdetails");
        weatherDetailsDiv.classList.add('weatherdetails');

        if (result.list) {
            addDropdown(result.list);
            weatherDetailsDiv.innerHTML = `<h2>Select City From List</h2>`
        } else {
            clearDropdown();
            weatherDetailsDiv.innerHTML = `<h2>No City Found</h2>`
        }
    } catch (error) {
        console.log('error in api', error);
    }
}
function addDropdown(cityList) {
    clearDropdown();
    cityList.forEach((city) => {
        let option = document.createElement('option');
        option.value = `${city.name},${city.sys.country}`;
        option.innerText = `CityName: ${city.name} | CountryName: ${city.sys.country}`


        cityDropdown.appendChild(option);
    });
}

cityDropdown.addEventListener('change', function () {
    const selectedCityName = this.value;

    getData(selectedCityName);
    console.log(selectedCityName);
    console.log('hii');

});



function clearDropdown() {
    cityDropdown.innerHTML = '<option value="">--CityList--</option>';
}

async function getData(fullname) {
    console.log(fullname);
    let arr = fullname.split(",")
    let city = arr[0];
    let country = arr[1]

    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=0bbef5e062e1b62fbf010233e89fe25a`);
        let result = await data.json();
        setData(result);
    } catch (error) {
        console.error('error in apis:');
    }
}

function setData(weatherInfo) {
    let weatherDetails = {
        country: weatherInfo.sys.country,
        city: weatherInfo.name,
        description: weatherInfo.weather[0].description,
        temprature: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        latitude: weatherInfo.coord.lat,
        longitude: weatherInfo.coord.lon,
        windspeed: weatherInfo.wind.speed,

    };

    let weatherDetailsDiv = document.getElementById("weatherdetails");
    weatherDetailsDiv.classList.add('weatherdetails');
    weatherDetailsDiv.innerHTML = `
                <h2>Weather Details Of ${weatherDetails.city}</h2>
                <p>City: ${weatherDetails.city}</p>
                <p>Country: ${weatherDetails.country}</p>
                <p>City: ${weatherDetails.description}</p>
                <p>Temprature: ${weatherDetails.temprature}</p>
                <p>Humidity: ${weatherDetails.humidity}%</p>
                <p>Latitude: ${weatherDetails.latitude}</p>
                <p>Longitude: ${weatherDetails.longitude} kph</p>
                <p>WindSpeed ${weatherDetails.windspeed}</p>
            `;

    console.table(weatherDetails);
}


// function fahrenheitToCelsius(fahrenheit) {
//     let celsius = (fahrenheit - 32) * 5 / 9;
//     return Number(celsius.toFixed(1));
// }






