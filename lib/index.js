// This file is in the entry point in your webpack config.
import './styles.scss';


$(document).ready(function(){
  $("#searchAgainBtn").hide();
  $("#currentWeather").hide();
  $("#currentWeatherDetails").hide();
  $("#submitCityStateBtn").click(function(event) {
    event.preventDefault();
    $("form").hide();
    $("#searchAgainBtn").show();
    $("#currentWeather").show();
    $("#currentWeatherDetails").show();
    let cityState = $("#cityStateData").val();
    $.get(`https://my-sweater-weather.herokuapp.com/api/v1/backgrounds?location=${cityState}`, function(data, status) {
      let currentBackground = data["data"][0]["attributes"]["source_url"]
      document.body.style.backgroundImage = `url(${currentBackground})`;
    })
    $.get(`https://my-sweater-weather.herokuapp.com/api/v1/forecast?location=${cityState}`, function(data, status) {
      let currentLocation = data["data"]["attributes"]["current_weather"];
      $(".current-temp").text(Math.ceil(currentLocation["current_temp"]))
      $(".current-time").text(currentLocation["current_time"])
      $(".high-low").text(`High: ${Math.ceil(currentLocation["high"])}° Low: ${Math.ceil(currentLocation["low"])}°`)
      $(".location").text(currentLocation["location"])
      $(".summary").text(currentLocation["summary"])
      $(".date-time").text(`${currentLocation["today"]}, ${currentLocation["current_time"]}`)
      $(".icon").text(currentLocation["icon"])
      $("#searchAgainBtn").click(function(event) {
        event.preventDefault();
        $("form").show();
      })
      let currentWeatherDetails = data["data"]["attributes"]["current_weather_details"]
      $(".details-summary").text(currentWeatherDetails["summary"])
      $(".real-feel").html(`<b>Real Feel: </b>${Math.ceil(currentWeatherDetails["real_feel"])}°`)
      $(".humidity").html(`<b>Humidity: </b>${currentWeatherDetails["humidity"]}%`)
      $(".visibility").html(`<b>Visibility: </b>${currentWeatherDetails["visibility"]} miles`)
      $(".uv-index").html(`<b>UV Index: </b>${currentWeatherDetails["uv_index"]}`)
      $(".summary-today").html(`<b>Today: </b>${currentWeatherDetails["today_summary"]}`)
      $(".summary-tonight").html(`<b>Tonight: </b>${currentWeatherDetails["tonight_summary"]}`)
      $(".details-icon").text(currentWeatherDetails["icon"])
      // let hourlyWeather = data["data"]["attributes"]["hourly_weather"]
      // debugger;
      // console.log(hourlyWeather)
    });
  });
})
