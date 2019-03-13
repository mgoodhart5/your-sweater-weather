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
    $.get(`https://my-sweater-weather.herokuapp.com/api/v1/forecast?location=${cityState}`, function(data, status) {
      let currentLocation = data["data"]["attributes"]["current_weather"];
      $(".current-temp").text(currentLocation["current_temp"])
      $(".current-time").text(currentLocation["current_time"])
      $(".high-low").text(`High: ${currentLocation["high"]}° Low: ${currentLocation["low"]}°`)
      $(".low").text( + " degrees")
      $(".location").text(currentLocation["location"])
      $(".summary").text(currentLocation["summary"])
      $(".date-time").text(`${currentLocation["today"]}, ${currentLocation["current_time"]}`)
      $(".icon").text(currentLocation["icon"])
      $("#searchAgain").click(function(event) {
        event.preventDefault();
        $("form").show();
      })
      let currentWeatherDetails = data["data"]["attributes"]["current_weather_details"]
      debugger;
      $(".details-summary").text(currentWeatherDetails["summary"])
      $(".real-feel").append(`${currentWeatherDetails["real_feel"]}°`)
      $(".humidity").append(`${currentWeatherDetails["humidity"]}%`)
      $(".visibility").append(`${currentWeatherDetails["visibility"]} miles`)
      $(".details-icon").text(currentWeatherDetails["icon"])
    });
  });
})
