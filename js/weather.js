/*! simpleWeather v3.0.2 - http://simpleweatherjs.com */
(function($) {
  "use strict";

  function getAltTemp(unit, temp) {
    if(unit === 'f') {
      return Math.round((5.0/9.0)*(temp-32.0));
    } else {
      return Math.round((9.0/5.0)*temp+32.0);
    }
  }

  $.extend({
    simpleWeather: function(options){
      options = $.extend({
        location: '',
        woeid: '',
        unit: 'f',
        success: function(weather){},
        error: function(message){}
      }, options);

      var now = new Date();
      var weatherUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&rnd='+now.getFullYear()+now.getMonth()+now.getDay()+now.getHours()+'&diagnostics=true&callback=?&q=';
      if(options.location !== '') {
        weatherUrl += 'select * from weather.forecast where woeid in (select woeid from geo.placefinder where text="'+options.location+'" and gflags="R" limit 1) and u="'+options.unit+'"';
      } else if(options.woeid !== '') {
        weatherUrl += 'select * from weather.forecast where woeid='+options.woeid+' and u="'+options.unit+'"';
      } else {
        options.error({message: "Could not retrieve weather due to an invalid location."});
        return false;
      }

      $.getJSON(
        encodeURI(weatherUrl),
        function(data) {
          if(data !== null && data.query !== null && data.query.results !== null && data.query.results.channel.description !== 'Yahoo! Weather Error') {
            var result = data.query.results.channel,
                weather = {},
                forecast,
                compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'],
                image404 = "https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";

            weather.title = result.item.title;
            weather.temp = result.item.condition.temp;
            weather.code = result.item.condition.code;
            weather.todayCode = result.item.forecast[0].code;
            weather.currently = result.item.condition.text;
            weather.high = result.item.forecast[0].high;
            weather.low = result.item.forecast[0].low;
            weather.text = result.item.forecast[0].text;
            weather.humidity = result.atmosphere.humidity;
            weather.pressure = result.atmosphere.pressure;
            weather.rising = result.atmosphere.rising;
            weather.visibility = result.atmosphere.visibility;
            weather.sunrise = result.astronomy.sunrise;
            weather.sunset = result.astronomy.sunset;
            weather.description = result.item.description;
            weather.city = result.location.city;
            weather.country = result.location.country;
            weather.region = result.location.region;
            weather.updated = result.item.pubDate;
            weather.link = result.item.link;
            weather.units = {temp: result.units.temperature, distance: result.units.distance, pressure: result.units.pressure, speed: result.units.speed};
            weather.wind = {chill: result.wind.chill, direction: compass[Math.round(result.wind.direction / 22.5)], speed: result.wind.speed};

            if(result.item.condition.temp < 80 && result.atmosphere.humidity < 40) {
              weather.heatindex = -42.379+2.04901523*result.item.condition.temp+10.14333127*result.atmosphere.humidity-0.22475541*result.item.condition.temp*result.atmosphere.humidity-6.83783*(Math.pow(10, -3))*(Math.pow(result.item.condition.temp, 2))-5.481717*(Math.pow(10, -2))*(Math.pow(result.atmosphere.humidity, 2))+1.22874*(Math.pow(10, -3))*(Math.pow(result.item.condition.temp, 2))*result.atmosphere.humidity+8.5282*(Math.pow(10, -4))*result.item.condition.temp*(Math.pow(result.atmosphere.humidity, 2))-1.99*(Math.pow(10, -6))*(Math.pow(result.item.condition.temp, 2))*(Math.pow(result.atmosphere.humidity,2));
            } else {
              weather.heatindex = result.item.condition.temp;
            }

            if(result.item.condition.code == "3200") {
              weather.thumbnail = image404;
              weather.image = image404;
            } else {
              weather.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+result.item.condition.code+"ds.png";
              weather.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+result.item.condition.code+"d.png";
            }

            weather.alt = {temp: getAltTemp(options.unit, result.item.condition.temp), high: getAltTemp(options.unit, result.item.forecast[0].high), low: getAltTemp(options.unit, result.item.forecast[0].low)};
            if(options.unit === 'f') {
              weather.alt.unit = 'c';
            } else {
              weather.alt.unit = 'f';
            }

            weather.forecast = [];
            for(var i=0;i<result.item.forecast.length;i++) {
              forecast = result.item.forecast[i];
              forecast.alt = {high: getAltTemp(options.unit, result.item.forecast[i].high), low: getAltTemp(options.unit, result.item.forecast[i].low)};

              if(result.item.forecast[i].code == "3200") {
                forecast.thumbnail = image404;
                forecast.image = image404;
              } else {
                forecast.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+result.item.forecast[i].code+"ds.png";
                forecast.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/"+result.item.forecast[i].code+"d.png";
              }

              weather.forecast.push(forecast);
            }

            options.success(weather);
          } else {
            options.error({message: "There was an error retrieving the latest weather information. Please try again.", error: data.query.results.channel.item.title});
          }
        }
      );
      return this;
    }
  });
})(jQuery);
function setWeatherIcon(condid) {
 
  switch(condid) {
    case '0': var icon  = '<i class="wi-tornado"></i>';
    break;
    case '1': var icon  = '<i class="wi-storm-showers"></i>';
    break;
    case '2': var icon  = '<i class="wi-tornado"></i>';
    break;
    case '3': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '4': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '5': var icon  = '<i class="wi-snow"></i>';
    break;
    case '6': var icon  = '<i class="wi-rain-mix"></i>';
    break;
    case '7': var icon  = '<i class="wi-rain-mix"></i>';
    break;
    case '8': var icon  = '<i class="wi-sprinkle"></i>';
    break;
    case '9': var icon  = '<i class="wi-sprinkle"></i>';
    break;
    case '10': var icon  = '<i class="wi-hail"></i>';
    break;
    case '11': var icon  = '<i class="wi-showers"></i>';
    break;
    case '12': var icon  = '<i class="wi-showers"></i>';
    break;
    case '13': var icon  = '<i class="wi-snow"></i>';
    break;
    case '14': var icon  = '<i class="wi-storm-showers"></i>';
    break;
    case '15': var icon  = '<i class="wi-snow"></i>';
    break;
    case '16': var icon  = '<i class="wi-snow"></i>';
    break;
    case '17': var icon  = '<i class="wi-hail"></i>';
    break;
    case '18': var icon  = '<i class="wi-hail"></i>';
    break;
    case '19': var icon  = '<i class="wi-cloudy-gusts"></i>';
    break;
    case '20': var icon  = '<i class="wi-fog"></i>';
    break;
    case '21': var icon  = '<i class="wi-fog"></i>';
    break;
    case '22': var icon  = '<i class="wi-fog"></i>';
    break;
    case '23': var icon  = '<i class="wi-cloudy-gusts"></i>';
    break;
    case '24': var icon  = '<i class="wi-cloudy-windy"></i>';
    break;
    case '25': var icon  = '<i class="wi-thermometer"></i>';
    break;
    case '26': var icon  = '<i class="wi-cloudy"></i>';
    break;
    case '27': var icon  = '<i class="wi-night-cloudy"></i>';
    break;
    case '28': var icon  = '<i class="wi-day-cloudy"></i>';
    break;
    case '29': var icon  = '<i class="wi-night-cloudy"></i>';
    break;
    case '30': var icon  = '<i class="wi-day-cloudy"></i>';
    break;
    case '31': var icon  = '<i class="wi-night-clear"></i>';
    break;
    case '32': var icon  = '<i class="wi-day-sunny"></i>';
    break;
    case '33': var icon  = '<i class="wi-night-clear"></i>';
    break;
    case '34': var icon  = '<i class="wi-day-sunny-overcast"></i>';
    break;
    case '35': var icon  = '<i class="wi-hail"></i>';
    break;
    case '36': var icon  = '<i class="wi-day-sunny"></i>';
    break;
    case '37': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '38': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '39': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '40': var icon  = '<i class="wi-storm-showers"></i>';
    break;
    case '41': var icon  = '<i class="wi-snow"></i>';
    break;
    case '42': var icon  = '<i class="wi-snow"></i>';
    break;
    case '43': var icon  = '<i class="wi-snow"></i>';
    break;
    case '44': var icon  = '<i class="wi-cloudy"></i>';
    break;
    case '45': var icon  = '<i class="wi-lightning"></i>';
    break;
    case '46': var icon  = '<i class="wi-snow"></i>';
    break;
    case '47': var icon  = '<i class="wi-thunderstorm"></i>';
    break;
    case '3200': var icon  =  '<i class="wi-cloud"></i>';
    break;
    default: var icon  =  '<i class="wi-cloud"></i>';
    break;
  }
 
  return icon;
 
}
