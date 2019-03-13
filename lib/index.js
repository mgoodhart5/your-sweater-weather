// This file is in the entry point in your webpack config.
import './styles.scss';

$(document).ready(function(){
  $("#searchAgainBtn").hide();
  $("#currentWeather").hide();
  $("#currentWeatherDetails").hide();
  $("#hourlyWeather").hide();
  $("#dailyWeather").hide();
  $("#submitCityStateBtn").click(function(event) {
    event.preventDefault();
    $("form").hide();
    $("#searchAgainBtn").show();
    $("#currentWeather").show();
    $("#currentWeatherDetails").show();
    $("#hourlyWeather").show();
    $("#dailyWeather").show();
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
        $("#searchAgainBtn").hide();
        $("#currentWeather").hide();
        $("#currentWeatherDetails").hide();
        $("#hourlyWeather").hide();
        $("#dailyWeather").hide();
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
      let hourlyWeather = data["data"]["attributes"]["hourly_weather"]
      $(".first").text(hourlyWeather[0]["icon"])
      $(".second").text(hourlyWeather[1]["icon"])
      $(".third").text(hourlyWeather[2]["icon"])
      $(".fourth").text(hourlyWeather[3]["icon"])
      $(".fifth").text(hourlyWeather[4]["icon"])
      $(".first-t").text(hourlyWeather[0]["time"])
      $(".second-t").text(hourlyWeather[1]["time"])
      $(".third-t").text(hourlyWeather[2]["time"])
      $(".fourth-t").text(hourlyWeather[3]["time"])
      $(".fifth-t").text(hourlyWeather[4]["time"])
      $(".first-temp").text(Math.ceil(hourlyWeather[0]["temperature"]))
      $(".second-temp").text(Math.ceil(hourlyWeather[1]["temperature"]))
      $(".third-temp").text(Math.ceil(hourlyWeather[2]["temperature"]))
      $(".fourth-temp").text(Math.ceil(hourlyWeather[3]["temperature"]))
      $(".fifth-temp").text(Math.ceil(hourlyWeather[4]["temperature"]))
      // $.each(hourlyWeather, function (index, value) {
      //   $(".hourly-info").html(`<td class="round-${index}">${value["icon"]}</td>`);
      //   $(".hourly-info").html(`<td class="round-${index}">${value["time"]}</td>`);
      //   $(".hourly-info").html(`<td class="round-${index}">${Math.ceil(value["temperature"]}°</td>`);
      // });
      
    });
  });
})
