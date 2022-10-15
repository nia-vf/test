import http from 'http';
//import url from 'url';
//import fs from 'fs';
//import { dirname } from 'path';
import _ from 'underscore';
import fetch from 'node-fetch'

//Variables
var locations = "London",
    forecastDays = "7",
    unitGroup = "metric",
    apiKey = "WJ27TXZRYWGJJ8WD93BSJ37EP";

//API endpoint url
var weatherDataApiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + locations + "/next7days?unitGroup=" + unitGroup + "&key=" + apiKey + "";

//Headings
//var stringForCsv = "Date,Time,Conditions,Temperature,Temperature (Feels Like),Humidity,Precipitation,Wind Speed\r\n";

//Call API, return JSON
var weatherData = ""
async function getWeatherData() {
    const response = await fetch(weatherDataApiUrl);
    const dataJson = await response.json();
    weatherData = getValuesFromJson(dataJson);
}

//Get required values from JSON response
function getValuesFromJson(dataJson) {

    var filteredWeatherData = []
    _.each(dataJson.days, function(day) {
        var date = day.datetime;
        _.each(day.hours, function(hour) {
            filteredWeatherData.push({
                "date": date,
                "time": hour.datetime,
                "conditions": hour.conditions,
                "temperature": hour.temperature,
                "feelsLike": hour.feelslike,
                "humidity": hour.humidity,
                "precipitation": hour.precip,
                "windSpeed": hour.windspeed
            })
        })
    })
    return JSON.stringify(filteredWeatherData);
}

getWeatherData()
console.log(weatherData)

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(weatherData);
    response.end();
}).listen(80);
