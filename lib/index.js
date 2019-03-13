// This file is in the entry point in your webpack config.
import './styles.scss';


$(document).ready(function(){
  $("#searchAgain").hide();
  $("#submitCityStateBtn").click(function(event) {
    event.preventDefault();
    $("form").hide();
    $("#searchAgain").show();
    let cityState = $("#cityStateData").val();
    $.get(`https://my-sweater-weather.herokuapp.com/api/v1/forecast?location=${cityState}`, function(data, status) {
      let currentLocation = data["data"]["attributes"]["current_weather"];
      $(".current_temp").text(currentLocation["current_temp"])
      $(".current_time").text(currentLocation["current_time"])
      $(".high").text(currentLocation["high"] + " degrees")
      $(".low").text(currentLocation["low"] + " degrees")
      $(".location").text(currentLocation["location"])
      $(".summary").text(currentLocation["summary"])
      $(".date").text(currentLocation["today"])
      $("#searchAgain").click(function(event) {
        event.preventDefault();
        $("form").show();
      })
    });
  });
})
