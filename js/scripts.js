

/*// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    location: 'Spokane, WA',
    woeid: '12799529',
    unit: 'f',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});*/

//GET TIME
  
  var d = new Date();
  var time = d.getHours();

    console.log(time);

 //SET BACKGROUND COLORS BASED ON TIME   

  if ( time >= 5 && time <= 18 ){
  $('#time').addClass('day');
  }else {
    $('#time').addClass('night');
  }


$.simpleWeather({

    location: 'Spokane, WA',
    woeid: '12799529',
    unit: 'f',
    
    // Get _weather_ object
    success: function(weather) {
      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
       // Get & store state
      var state = weather.region;
      // Get & store thumb
      var thumb = weather.thumbnail;

      var bigImage = weather.image;
      // Get & store relative humidity
      var humid = weather.humidity;

      var windchill = weather.wind.chill;

      //CREATE APPROXIMATE DEWPOINT CALCULATION
      /**     Td = T - ((100 - RH)/5.)
              DEWPOINT = Temperature - ((100-Relative Humidity Percentage)/5.)
              where Td is dew point temperature (in degrees Celsius), T is observed temperature (in degrees Celsius), and RH is relative humidity (in percent). Apparently this relationship is fairly accurate for relative humidity values above 50%
 
      **/
      //dewpoint in celsius
      //var dewpoint = Math.ceil(temp - ((100-humid)/5));

      //dewpoint F
      var dewpoint = Math.ceil(temp - .36*(100-humid));
      console.log(dewpoint);
     
      
      // Output to hooks in HTML
      $('.temp').prepend(temp);

      //OUTPUT CITY, STATE
      $('.city').text(city + ", " + state);
      //OUTPUT STATE
      
      //get and store thumbnail
       $('.thumb img').attr('src', thumb);
       //get and store full size image
        $('.bigImage img').attr('src', bigImage);
       //get and store humdity
       $('.humid').text(humid + "%");

       $('.windchill').text(windchill + " F");
      
      
      // See console for _weather_ object
      console.log(weather);
    },
  
    // if error
    error: function(error) {  
      $('body').html('<p>' + error + '</p>');
    }
  
  });
