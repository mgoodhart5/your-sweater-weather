/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

	var currentUserKey; // This file is in the entry point in your webpack config.

	var skycons = new Skycons({ "color": "pink" });
	$(document).ready(function () {
	  $("#register-form").hide();
	  $("#searchAgainBtn").hide();
	  $("#currentWeather").hide();
	  $("#currentWeatherDetails").hide();
	  $("#hourlyWeather").hide();
	  $("#dailyWeather").hide();
	  $("#registerBtn").click(function (event) {
	    event.preventDefault();
	    $("#register-form").show();
	    $("#searchAgainBtn").hide();
	    $("#currentWeather").hide();
	    $("#currentWeatherDetails").hide();
	    $("#hourlyWeather").hide();
	    $("#dailyWeather").hide();
	    $(".weather-inquiry").hide();
	    $("#registerBtn").hide();
	    $("#submitRegistrationBtn").click(function (event) {
	      event.preventDefault();
	      var email = $("#email").val();
	      var pw = $("#password").val();
	      var pwConfirmation = $("#password-confirmation").val();
	      if (email === "") {
	        alert("Please fill out email.");
	      } else if (pw === "") {
	        alert("Please fill out password.");
	      } else if (pwConfirmation === "") {
	        alert("Please fill out password confirmation.");
	      } else if (pw !== pwConfirmation) {
	        alert("Your passwords do not match.");
	      } else {
	        fetch("https://my-sweater-weather.herokuapp.com/api/v1/users", {
	          method: 'POST',
	          headers: { "Content-Type": "application/json" },
	          body: JSON.stringify({
	            email: email,
	            password: pw,
	            password_confirmation: pwConfirmation
	          })
	        }).then(function (response) {
	          return response.json();
	        }).then(function (object) {
	          console.log(object.data.attributes.api_key);
	          currentUserKey = object.data.attributes.api_key;
	          console.log(currentUserKey);
	        }).catch(function (error) {
	          return console.error({ error: error });
	        });
	        alert("You are now registered! Please Login to Favorite your Locations!", 2000);
	        $("#register-form").hide();
	        $(".weather-inquiry").show();
	      };
	    });
	  });
	  $("#submitCityStateBtn").click(function (event) {
	    event.preventDefault();
	    $("form").hide();
	    $("#searchAgainBtn").show();
	    $("#currentWeather").show();
	    $("#currentWeatherDetails").show();
	    $("#hourlyWeather").show();
	    $("#dailyWeather").show();
	    var cityState = $("#cityStateData").val();
	    $.get("https://my-sweater-weather.herokuapp.com/api/v1/backgrounds?location=" + cityState, function (data, status) {
	      var currentBackground = data["data"][0]["attributes"]["source_url"];
	      document.body.style.backgroundImage = "url(" + currentBackground + ")";
	    });
	    $.get("https://my-sweater-weather.herokuapp.com/api/v1/forecast?location=" + cityState, function (data, status) {
	      var currentLocation = data["data"]["attributes"]["current_weather"];
	      $(".current-temp").text(Math.ceil(currentLocation["current_temp"]));
	      $(".current-time").text(currentLocation["current_time"]);
	      $(".high-low").text("High: " + Math.ceil(currentLocation["high"]) + "\xB0 Low: " + Math.ceil(currentLocation["low"]) + "\xB0");
	      $(".location").text(currentLocation["location"]);
	      $(".summary").text(currentLocation["summary"]);
	      $(".date-time").text(currentLocation["today"] + ", " + currentLocation["current_time"]);
	      // $("icon1").text(currentLocation["icon"])
	      skycons.add("icon1", currentLocation["icon"]);
	      $("#searchAgainBtn").click(function (event) {
	        event.preventDefault();
	        $("form").show();
	        $("#searchAgainBtn").hide();
	        $("#currentWeather").hide();
	        $("#currentWeatherDetails").hide();
	        $("#hourlyWeather").hide();
	        $("#dailyWeather").hide();
	      });
	      var currentWeatherDetails = data["data"]["attributes"]["current_weather_details"];
	      $(".details-summary").text(currentWeatherDetails["summary"]);
	      $(".real-feel").html("<b>Real Feel: </b>" + Math.ceil(currentWeatherDetails["real_feel"]) + "\xB0");
	      $(".humidity").html("<b>Humidity: </b>" + currentWeatherDetails["humidity"] + "%");
	      $(".visibility").html("<b>Visibility: </b>" + currentWeatherDetails["visibility"] + " miles");
	      $(".uv-index").html("<b>UV Index: </b>" + currentWeatherDetails["uv_index"]);
	      $(".summary-today").html("<b>Today: </b>" + currentWeatherDetails["today_summary"]);
	      $(".summary-tonight").html("<b>Tonight: </b>" + currentWeatherDetails["tonight_summary"]);
	      $(".details-icon").text(currentWeatherDetails["icon"]);
	      var hourlyWeather = data["data"]["attributes"]["hourly_weather"];
	      $(".first").text(hourlyWeather[0]["icon"]);
	      $(".second").text(hourlyWeather[1]["icon"]);
	      $(".third").text(hourlyWeather[2]["icon"]);
	      $(".fourth").text(hourlyWeather[3]["icon"]);
	      $(".fifth").text(hourlyWeather[4]["icon"]);
	      $(".first-t").html("<b>" + hourlyWeather[0]["time"] + "</b>");
	      $(".second-t").html("<b>" + hourlyWeather[1]["time"] + "</b>");
	      $(".third-t").html("<b>" + hourlyWeather[2]["time"] + "</b>");
	      $(".fourth-t").html("<b>" + hourlyWeather[3]["time"] + "</b>");
	      $(".fifth-t").html("<b>" + hourlyWeather[4]["time"] + "</b>");
	      $(".first-temp").text(Math.ceil(hourlyWeather[0]["temperature"]) + "\xB0");
	      $(".second-temp").text(Math.ceil(hourlyWeather[1]["temperature"]) + "\xB0");
	      $(".third-temp").text(Math.ceil(hourlyWeather[2]["temperature"]) + "\xB0");
	      $(".fourth-temp").text(Math.ceil(hourlyWeather[3]["temperature"]) + "\xB0");
	      $(".fifth-temp").text(Math.ceil(hourlyWeather[4]["temperature"]) + "\xB0");
	      var dailyWeather = data["data"]["attributes"]["daily_weather"];
	      $(".first-day").html("<b>" + dailyWeather[1]["day"] + "</b>");
	      $(".second-day").html("<b>" + dailyWeather[2]["day"] + "</b>");
	      $(".third-day").html("<b>" + dailyWeather[3]["day"] + "</b>");
	      $(".fourth-day").html("<b>" + dailyWeather[4]["day"] + "</b>");
	      $(".fifth-day").html("<b>" + dailyWeather[5]["day"] + "</b>");
	      $(".first-icon").text(dailyWeather[1]["icon"]);
	      $(".second-icon").text(dailyWeather[2]["icon"]);
	      $(".third-icon").text(dailyWeather[3]["icon"]);
	      $(".fourth-icon").text(dailyWeather[4]["icon"]);
	      $(".fifth-icon").text(dailyWeather[5]["icon"]);
	      $(".first-high").html("<b>\u2191</b> " + dailyWeather[1]["temperature_high"] + "\xB0");
	      $(".second-high").html("<b>\u2191</b> " + dailyWeather[2]["temperature_high"] + "\xB0");
	      $(".third-high").html("<b>\u2191</b> " + dailyWeather[3]["temperature_high"] + "\xB0");
	      $(".fourth-high").html("<b>\u2191</b> " + dailyWeather[4]["temperature_high"] + "\xB0");
	      $(".fifth-high").html("<b>\u2191</b> " + dailyWeather[5]["temperature_high"] + "\xB0");
	      $(".first-low").html("<b>\u2193</b> " + dailyWeather[1]["temperature_low"] + "\xB0");
	      $(".second-low").html("<b>\u2193</b> " + dailyWeather[2]["temperature_low"] + "\xB0");
	      $(".third-low").html("<b>\u2193</b> " + dailyWeather[3]["temperature_low"] + "\xB0");
	      $(".fourth-low").html("<b>\u2193</b> " + dailyWeather[4]["temperature_low"] + "\xB0");
	      $(".fifth-low").html("<b>\u2193</b> " + dailyWeather[5]["temperature_low"] + "\xB0");
	      $(".first-precip").text("Precip Probability " + dailyWeather[1]["precip_probability"] + "%");
	      $(".second-precip").text("Precip Probability " + dailyWeather[2]["precip_probability"] + "%");
	      $(".third-precip").text("Precip Probability " + dailyWeather[3]["precip_probability"] + "%");
	      $(".fourth-precip").text("Precip Probability " + dailyWeather[4]["precip_probability"] + "%");
	      $(".fifth-precip").text("Precip Probability " + dailyWeather[5]["precip_probability"] + "%");
	    });
	    skycons.play;
	  });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  background-color: #52796F;\n  font-family: sans-serif;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-attachment: fixed;\n  height: 200%; }\n\nnav {\n  text-align: center;\n  background: rgba(53, 79, 82, 0.8);\n  color: #CAD2C5;\n  border-radius: 15px;\n  border: 2px solid #2F3E46;\n  width: 98vw;\n  margin-left: 5px;\n  padding: 9px; }\n\nh1 {\n  margin: 5px; }\n\n#loginBtn {\n  padding: 5px;\n  border-radius: 15px;\n  background-color: #354F52;\n  color: #CAD2C5; }\n\n#registerBtn {\n  padding: 5px;\n  border-radius: 15px;\n  background-color: #354F52;\n  color: #CAD2C5; }\n\n.weather-inquiry {\n  text-align: center; }\n\n#register-form {\n  text-align: center; }\n\n#email {\n  margin: 10px;\n  padding: 10px;\n  font-size: 15px;\n  border-radius: 15px;\n  width: 200px; }\n\n#password {\n  margin: 10px;\n  padding: 10px;\n  font-size: 15px;\n  border-radius: 15px; }\n\n#password-confirmation {\n  margin: 10px;\n  padding: 10px;\n  font-size: 15px;\n  border-radius: 15px; }\n\n#submitRegistrationBtn {\n  margin: 20px;\n  padding: 15px;\n  border-radius: 15px;\n  background-color: #354F52;\n  color: #CAD2C5; }\n\n#currentWeather {\n  display: inline-block;\n  border: 2px solid #2F3E46;\n  background: rgba(132, 169, 140, 0.8);\n  border-radius: 15px;\n  padding: 10px;\n  margin-right: 20px;\n  margin-left: 5px;\n  margin-top: 50px;\n  margin-bottom: 10px;\n  height: 260px;\n  width: 45vw;\n  position: absolute;\n  left: 20px; }\n\n.currentWeatherMain {\n  display: inline-block;\n  text-align: center;\n  padding: 5px;\n  margin: 10px; }\n\n.currentWeatherInfo {\n  display: inline-block;\n  text-align: center;\n  padding-left: 100px;\n  margin: 10px; }\n\n.detailsInfo {\n  display: inline-block;\n  text-align: center;\n  padding-left: 20px;\n  padding-bottom: 5px;\n  margin: 5px; }\n\n.detailsSpecific {\n  display: inline-block;\n  text-align: center;\n  padding-left: 150px;\n  margin: 5px; }\n\n.currentWeatherSummary {\n  padding-bottom: 15px;\n  margin: 10px;\n  text-align: center; }\n\n.daySummaries {\n  padding-bottom: 15px;\n  margin: 10px;\n  text-align: center; }\n\n#currentWeatherDetails {\n  display: inline-block;\n  border: 2px solid #2F3E46;\n  background: rgba(132, 169, 140, 0.8);\n  border-radius: 15px;\n  padding: 10px;\n  margin-left: 755px;\n  margin-right: 15px;\n  margin-top: 50px;\n  margin-bottom: 10px;\n  height: 260px;\n  width: 45vw;\n  position: relative;\n  right: 20px; }\n\n#cityStateData {\n  margin: 20px;\n  padding: 15px;\n  font-size: 20px;\n  border-radius: 15px; }\n\n#submitCityStateBtn {\n  margin: 20px;\n  padding: 15px;\n  border-radius: 15px;\n  background-color: #354F52;\n  color: #CAD2C5; }\n\n#submitCityStateBtn:hover {\n  background-color: #84898C;\n  color: #CAD2C5; }\n\n#searchAgainBtn {\n  padding: 10px;\n  border-radius: 15px;\n  background-color: #354F52;\n  color: #CAD2C5; }\n\n#searchAgainBtn:hover {\n  background-color: #84898C;\n  color: #CAD2C5; }\n\n#hourlyWeather {\n  border: 2px solid #2F3E46;\n  background: rgba(132, 169, 140, 0.8);\n  border-radius: 15px;\n  padding: 10px;\n  margin: 10px;\n  height: 120px;\n  width: 97vw;\n  text-align: center; }\n\n#dailyWeather {\n  border: 2px solid #2F3E46;\n  background: rgba(132, 169, 140, 0.8);\n  border-radius: 15px;\n  text-align: center;\n  padding: 10px;\n  margin: 10px;\n  height: 150px;\n  width: 97vw; }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);
