function getWeather(){
    const apiKey = `42265d20c17f679d581c09b01d2e6d00`;

    const location = document.getElementById('location').value;
    const currentTemperature = document.getElementById('currentTemperature');
    const latitude = document.getElementById('latitudeHTML1');
    const longitude = document.getElementById('longitudeHTML1');

    const locationDataApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=&appid=${apiKey}`;

    fetch(locationDataApiUrl)
    .then(response => {
        if (!response.ok) {
            currentTemperature.innerHTML = '0';
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;
        latitude.innerHTML = lat;
        longitude.innerHTML = lon;

        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        fetch(weatherApiUrl)
            .then(response => {
                if (!response.ok) {
                    // currentTemperature.innerHTML = '0';
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.list[0].main.temp;
                currentTemperature.innerHTML = `${temperature}°F`;
            })
            .catch(error => {
                currentTemperature.innerHTML = '0';
                console.error('Error:', error);
            });
    })
    .catch(error => {
        currentTemperature.innerHTML = '0';
        console.error('Error:', error);
    });

}
