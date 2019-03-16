// This file is in the entry point in your webpack config.
import './styles.scss';
var currentUserKey

$(document).ready(function(){
  $("#register-form").hide();
  $("#login-form").hide();
  $("#searchAgainBtn").hide();
  $("#currentWeather").hide();
  $("#currentWeatherDetails").hide();
  $("#hourlyWeather").hide();
  $("#dailyWeather").hide();
  $("#registerBtn").click(function(event) {
    event.preventDefault();
    $("#register-form").show();
    $("#loginBtn").show();
    $("#login-form").hide();
    $("#searchAgainBtn").hide();
    $("#currentWeather").hide();
    $("#currentWeatherDetails").hide();
    $("#hourlyWeather").hide();
    $("#dailyWeather").hide();
    $(".weather-inquiry").hide();
    $("#registerBtn").hide();
    $("#submitRegistrationBtn").click(function(event) {
      event.preventDefault();
      let email = $("#email").val();
      let pw = $("#password").val();
      let pwConfirmation = $("#password-confirmation").val();
        if(email === "") {
          alert("Please fill out email.");
        } else if(pw === "") {
          alert("Please fill out password.");
        } else if(pwConfirmation === "") {
          alert("Please fill out password confirmation.");
        } else if(pw !== pwConfirmation) {
          alert("Your passwords do not match.")
        } else {
          fetch("https://my-sweater-weather.herokuapp.com/api/v1/users", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify ({
              email: email,
              password: pw,
              password_confirmation: pwConfirmation
            })
          }).then(response => response.json())
          .then(object => {
            console.log(object.data.attributes.api_key)
            currentUserKey = object.data.attributes.api_key
          })
          .catch(error => console.error({ error }))
          alert("You are now registered and logged in! Feel free to search the weather and favorite a location!")
          $("#register-form").hide();
          $(".weather-inquiry").show();
        };
    });
  });
  $("#loginBtn").click(function(event) {
    event.preventDefault();
    $("#login-form").show();
    $("#register-form").hide();
    $("#searchAgainBtn").hide();
    $("#currentWeather").hide();
    $("#currentWeatherDetails").hide();
    $("#hourlyWeather").hide();
    $("#dailyWeather").hide();
    $(".weather-inquiry").hide();
    $("#loginBtn").hide();
    $("#submitLoginBtn").click(function(event) {
      event.preventDefault();
      let loginEmail = $("#loginEmail").val();
      let loginPassword = $("#loginPassword").val();
      if(loginEmail === "") {
        alert("Please fill out email.");
      } else if(loginPassword === "") {
        alert("Please fill out password.");
      } else {
        fetch("https://my-sweater-weather.herokuapp.com/api/v1/sessions", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify ({
            email: loginEmail,
            password: loginPassword,
          })
        }).then(response => response.json())
        .then(object => {
          console.log(object.data.attributes.api_key)
          currentUserKey = object.data.attributes.api_key
          document.cookie = object.data.attributes.api_key
        })
        .catch(error => console.error({ error }))
        alert("You are now logged in! Feel free to search the weather and favorite a location!")
        $("#login-form").hide();
        $(".weather-inquiry").show();
        $("#registerBtn").hide();
      };
    })
  });
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
      $("icon1").text(currentLocation["icon"])
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
      $(".first-t").html(`<b>${hourlyWeather[0]["time"]}</b>`)
      $(".second-t").html(`<b>${hourlyWeather[1]["time"]}</b>`)
      $(".third-t").html(`<b>${hourlyWeather[2]["time"]}</b>`)
      $(".fourth-t").html(`<b>${hourlyWeather[3]["time"]}</b>`)
      $(".fifth-t").html(`<b>${hourlyWeather[4]["time"]}</b>`)
      $(".first-temp").text(`${Math.ceil(hourlyWeather[0]["temperature"])}°`)
      $(".second-temp").text(`${Math.ceil(hourlyWeather[1]["temperature"])}°`)
      $(".third-temp").text(`${Math.ceil(hourlyWeather[2]["temperature"])}°`)
      $(".fourth-temp").text(`${Math.ceil(hourlyWeather[3]["temperature"])}°`)
      $(".fifth-temp").text(`${Math.ceil(hourlyWeather[4]["temperature"])}°`)
      let dailyWeather = data["data"]["attributes"]["daily_weather"]
      $(".first-day").html(`<b>${dailyWeather[1]["day"]}</b>`)
      $(".second-day").html(`<b>${dailyWeather[2]["day"]}</b>`)
      $(".third-day").html(`<b>${dailyWeather[3]["day"]}</b>`)
      $(".fourth-day").html(`<b>${dailyWeather[4]["day"]}</b>`)
      $(".fifth-day").html(`<b>${dailyWeather[5]["day"]}</b>`)
      $(".first-icon").text(dailyWeather[1]["icon"])
      $(".second-icon").text(dailyWeather[2]["icon"])
      $(".third-icon").text(dailyWeather[3]["icon"])
      $(".fourth-icon").text(dailyWeather[4]["icon"])
      $(".fifth-icon").text(dailyWeather[5]["icon"])
      $(".first-high").html(`<b>↑</b> ${dailyWeather[1]["temperature_high"]}°`)
      $(".second-high").html(`<b>↑</b> ${dailyWeather[2]["temperature_high"]}°`)
      $(".third-high").html(`<b>↑</b> ${dailyWeather[3]["temperature_high"]}°`)
      $(".fourth-high").html(`<b>↑</b> ${dailyWeather[4]["temperature_high"]}°`)
      $(".fifth-high").html(`<b>↑</b> ${dailyWeather[5]["temperature_high"]}°`)
      $(".first-low").html(`<b>↓</b> ${dailyWeather[1]["temperature_low"]}°`)
      $(".second-low").html(`<b>↓</b> ${dailyWeather[2]["temperature_low"]}°`)
      $(".third-low").html(`<b>↓</b> ${dailyWeather[3]["temperature_low"]}°`)
      $(".fourth-low").html(`<b>↓</b> ${dailyWeather[4]["temperature_low"]}°`)
      $(".fifth-low").html(`<b>↓</b> ${dailyWeather[5]["temperature_low"]}°`)
      $(".first-precip").text(`Precip Probability ${dailyWeather[1]["precip_probability"]}%`)
      $(".second-precip").text(`Precip Probability ${dailyWeather[2]["precip_probability"]}%`)
      $(".third-precip").text(`Precip Probability ${dailyWeather[3]["precip_probability"]}%`)
      $(".fourth-precip").text(`Precip Probability ${dailyWeather[4]["precip_probability"]}%`)
      $(".fifth-precip").text(`Precip Probability ${dailyWeather[5]["precip_probability"]}%`)
    });
  });
})
