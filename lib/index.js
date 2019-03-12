// This file is in the entry point in your webpack config.
import './styles.scss';

// $.get("https://my-sweater-weather.herokuapp.com/api/v1/backgrounds?location=denver,co", function(data, status) {
//   debugger;
//   console.log(`${data}`)
// });
// $.ajax({url: "demo_test.txt", success: function(result){
//    $("#div1").html(result);
//  }});
$.get("https://my-sweater-weather.herokuapp.com/api/v1/backgrounds?location=denver,co", function(data, status){
   window.alert("Data: " + data["data"][0]["attributes"]["source_url"] + "\nStatus: " + status);
   $(".example").text(data["data"][0]["attributes"]["source_url"])
   document.body.style.backgroundImage = `url(${data["data"][0]["attributes"]["source_url"]})`;
});
