async function getWeather() {
    const apiKey = '';

    const location = document.getElementById('location').value;
    const currentTemperature = document.getElementById('currentTemperature');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');


    try {
        const locationResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
        if (!locationResponse.ok) throw new Error('Failed to fetch location data');

        const locationData = await locationResponse.json();
        const {lat, lon} = locationData[0];
        latitude.innerHTML = lat;
        longitude.innerHTML = lon;

        // const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
        // if (!currentWeatherResponse.ok) throw new Error('Failed to fetch weather data');
        // const currentWeatherData = await currentWeatherResponse.json();
        // console.log(currentWeatherData);

        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        if (!currentWeatherResponse.ok) throw new Error('Failed to fetch weather data');
        const currentWeatherData = await currentWeatherResponse.json();
        console.log(currentWeatherData);



        const temperature = currentWeatherData.list[0].main.temp;

        color_coding(temperature);

        currentTemperature.innerHTML = `${temperature}°F`;

    } catch (error) {
        console.error('Error:', error);
    }
}

function color_coding(temperature) {
    if (temperature > 80) {
        document.getElementById("currentTemperature").style.color = "red";
    } else {
        document.getElementById("currentTemperature").style.color = "blue";
    }
}