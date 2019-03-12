// This file is in the entry point in your webpack config.
import './styles.scss';

$.get("https://my-sweater-weather.herokuapp.com/api/v1/backgrounds?location=denver,co", function(data, status) {
  debugger;
  console.log(`${data}`)
});
