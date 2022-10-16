import _ from 'underscore';
import fetch from 'node-fetch'

//Call API, return JSON
//var weatherData = ""
export async function getWeatherData(location, unitGroup, includeHours) {
    let apiKey = "WJ27TXZRYWGJJ8WD93BSJ37EP"
    let include = ""
    if (includeHours == "yes") { include = "&include=hours" }
    let weatherDataApiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/next7days?unitGroup=" + unitGroup + "&key=" + apiKey + include
        //works to this point
    const response = await fetch(weatherDataApiUrl);
    const dataJson = await response.json();
    var weatherData = getValuesFromJson(dataJson);
    //document.write(weatherData);
    return weatherData;
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