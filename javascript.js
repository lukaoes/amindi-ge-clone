var weatherApi = "https://api.open-meteo.com/v1/forecast?latitude=41.6941&longitude=44.8337&hourly=temperature_2m&current_weather=true&forecast_days=3";

fetch(weatherApi).then(function (data) {
    data.json().then(function (result) {

        var temperatureNow = result.current_weather.temperature;
        var timeNow = result.current_weather.time.slice(11, 13);
        var windspeedNow = result.current_weather.windspeed;
        var pressure = result.current_weather.winddirection;
        var temperatureInWind = temperatureNow - 2;

        if (temperatureNow >= 20) {
            var condition = 'მზიანი';
            var weatherPicture = `<img src="./images/20+.png" alt="20+">`
        } else if (temperatureNow < 20 && temperatureNow >= 15) {
            var condition = 'მოღრუბლული';
            var weatherPicture = `<img src="./images/15-20.png" alt="15-20">`
        } else if (temperatureNow < 15) {
            var condition = 'წვიმიანი'
            var weatherPicture = `<img src="./images/0-15.png" alt="0-15">`
        }

        document.getElementById('temperature').innerHTML = `${temperatureNow}°`;
        document.getElementById('conditionNow').innerHTML = `${condition}`
        document.getElementById('weatherBigPicture').innerHTML = `${weatherPicture}`
        document.getElementById('windSp').innerHTML = `${windspeedNow} kph`
        document.getElementById('pressure').innerHTML = `${pressure} kpa`
        document.getElementById('temperatureInWind').innerHTML = `${temperatureInWind}°`


        var hourNweather = "";
        result.hourly.time.forEach(function (hour, index) {
            result.hourly.time.splice(24);
            if (result.hourly.temperature_2m[index] >= 20) {

                var weatherPictureTwo = `<img src="./images/20+.png" alt="20+">`
            } else if (result.hourly.temperature_2m[index] < 20 && result.hourly.temperature_2m[index] >= 15) {

                var weatherPictureTwo = `<img src="./images/15-20.png" alt="15-20">`
            } else if (result.hourly.temperature_2m[index] < 15) {

                var weatherPictureTwo = `<img src="./images/0-15.png" alt="0-15">`
            }
            var div = `<div>
                        <div class="hourlyTop">
                            <h5> ${hour.slice(11, 13)} </h5> <span>საათი</span>
                        </div>
                            <div class="smallPhoto">
                                ${weatherPictureTwo}
                            </div>
                        <div class="hourlyBtm">
                            <h4>${result.hourly.temperature_2m[index]}°</h4>
                        </div>
                        </div>
                        `;
            hourNweather = hourNweather + div;

        });
        document.getElementById('mainHourly').innerHTML = hourNweather;

    })

})
