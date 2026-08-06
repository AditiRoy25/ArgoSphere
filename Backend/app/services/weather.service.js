
const axios =
require("axios");

class WeatherService {

    async currentWeather(
        district
    ){

        // OpenWeatherMap API

        return {

            district,

            temperature:32,

            humidity:75,

            rainfall:10,

            weather:
            "Cloudy"

        };

    }

    async weatherAlert(
        district
    ){

        return {

            district,

            alert:
            "Heavy Rainfall Expected"

        };

    }

}

module.exports =
new WeatherService();

