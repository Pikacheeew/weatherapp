document.getElementById('get-weather-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if(location) {
        fetch(`https://goweather.herokuapp.com/weather/${location}`)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-result').innerText = 'Failed to load weather data';
            });
    } else {
        document.getElementById('weather-result').innerText = 'Please enter a location';
    }
});

function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayFormatted = today.toLocaleDateString('en-US', options);

    if(data.temperature && data.wind && data.description) {
        let forecastHtml = `
            <p>Today (${todayFormatted}):</p>
            <p>Temperature: ${data.temperature}</p>
            <p>Wind: ${data.wind}</p>
            <p>Description: ${data.description}</p>
            <h3>Forecast</h3>
            <div class="forecast-container">
        `;

        data.forecast.forEach((day, index) => {
            const forecastDate = new Date(today);
            forecastDate.setDate(today.getDate() + index + 1);
            const forecastDateFormatted = forecastDate.toLocaleDateString('en-US', options);

            let dayLabel = index === 0 ? "Tomorrow" : forecastDateFormatted;

            forecastHtml += `
                <div class="forecast">
                    <p>${dayLabel}:</p>
                    <p>Temperature: ${day.temperature}</p>
                    <p>Wind: ${day.wind}</p>
                </div>
            `;
        });

        forecastHtml += `</div>`; // Close forecast-container
        weatherResult.innerHTML = forecastHtml;
    } else {
        weatherResult.innerText = 'Weather data not available for this location';
    }
}
