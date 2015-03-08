

//GET TIME
  
  var d = new Date();
  var time = d.getHours();

    console.log(time);
//CONDITIONALS
     //SET BACKGROUND COLORS BASED ON TIME   

      if ( time >= 5 && time <= 18 ){
      
      $('#time').addClass('day');
      }else {
        $('#time').addClass('night');
      }
      if ( time >= 5 && time <= 18 ){
      
      $('h1, li, button').addClass('dark');
      }else {
        $('h1, li, button').addClass('light');
      }

      //POSITION WEATHER IMAGE RELATIVE TO TIME OF DAY

      //BEFORE  12noon
       if ( time <= 12  ){
        
        $('.bigImage').addClass('lefty');
        }


//SPOKANE WEATHER
$.simpleWeather({

    location: 'Spokane, WA',
    woeid: '12799529',
    unit: 'f',
    
    // Get _weather_ object
    success: function(weather) {

    //PRIORITY BASIC WEATHER DATA  
      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
       // Get & store state
      var state = weather.region;
      // Get & store image
      var bigImage = weather.image;

      var currently = weather.currently;

      var low = weather.low;

      var high= weather.high;

      console.log(currently);

      var windData = weather.wind.direction +" "+ weather.wind.speed + weather.units.speed;
     

     //SEONDARY ON_DEMAND "GEEK" WEATHER DATA   
       // Get & store thumb
      var thumb = weather.thumbnail;

   
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

      //temp difference

      var diff = high - low;
     
 //CONDITIONALS BASED ON WEATHER DATA
     //USE DEWPOINT TO CREATE IF ELSE - FROST ALERT when temperature <32 && dewpoint > temperature activate warning MODAL

     if ( temp <32 && dewpoint > temp ){
  
      $('.ui.modal').modal('show');
      }
//TEMPERATURE ALERT when high and low are more than 25 apart 
      if ( low <= high+25 ){
  
      $('.ui.modal.difference').modal('show');
      }
      
  //WICKE HOT ALERT when high temp is 99 degrees or more. 
      // Output to hooks in HTML
      if ( high>= 99 ){
  
      $('.ui.modal.hot-stuff').modal('show');
      }


      $('.temp').prepend(temp);

      //OUTPUT CITY, STATE
      $('.city').text(city + ", " + state);
      //OUTPUT DESCRIPTION
      $('.current').text(currently);
      
      //get and store thumbnail
       $('.thumb img').attr('src', thumb);
       //get and store full size image
        $('.bigImage img').attr('src', bigImage);
        //get and store high and low temperatures

        $('.high').append(high);

        $('.low').append(low);

        // get and store wind
         $('.wind').text(windData);

       //get and store humdity
       $('.humid').append(humid + "%");
       // get and store windchill
       
       $('.windchill').text(" "+windchill);

       $('span.diff').text(diff);
      
    //TOGGLE FOR WEATHERGEEK "GEEK OUT" OPTION


$(document).ready(function() {
  
 $("#clickMe").click(function() {
    $("#geekspot").toggle("slow");
  });
});
 //MOTION FOR "GEEK OUT" OPTION


      // See console for _weather_ object
      console.log(weather);
    },
  
    // if error
    error: function(error) {  
      $('body').html('<p>' + error + '</p>');
    }
  
  });

//



