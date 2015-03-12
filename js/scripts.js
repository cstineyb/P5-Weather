//IF CONDITION CODE... else

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

      //BEFORE  11am
       if ( time < 11  ){
        
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

      var description = weather.description; 
      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
       // Get & store state
      var state = weather.region;
      // Get & store image
      var bigImage = weather.image;
    // Get & store current
      var currently = weather.currently;
    // Get & store low temp
      var low = weather.low;
    // Get & store high temp
      var high= weather.high;
    // Get & store sunrise
      var sunrise = weather.sunrise;
    // Get & store sunset
      var sunset = weather.sunset;
    // Get & store barometric pressure
      var pressure = weather.pressure;
      // Get & store update
      var updated = weather.updated;
  // Get & store visibility
      var visibility = weather.visibility;

      var miles = weather.units.distance;

      //FORECAST WEATHER DATA
       // Get & store day one date

       var oneDate = weather.forecast[0].day +", "+weather.forecast[0].date;
       console.log(oneDate);

       // Get & store day one high
       var oneDateHigh = weather.forecast[0].high;

       // Get & store day one low
       var oneDateLow = weather.forecast[0].low;
         // Get & store day one thumb
       var oneDateThumb = weather.forecast[0].thumbnail;
//SUBSEQUENT DAYS
  //TWO
      var twoDate = weather.forecast[1].day +", "+weather.forecast[1].date;
       console.log(twoDate);

       // Get & store day one high
       var twoDateHigh = weather.forecast[1].high;

       // Get & store day one low
       var twoDateLow = weather.forecast[1].low;
         // Get & store day one thumb
       var twoDateThumb = weather.forecast[1].thumbnail;
   //THREE
      var threeDate = weather.forecast[2].day +", "+weather.forecast[2].date;
       console.log(threeDate);

       // Get & store day one high
       var threeDateHigh = weather.forecast[2].high;

       // Get & store day one low
       var threeDateLow = weather.forecast[2].low;
         // Get & store day one thumb
       var threeDateThumb = weather.forecast[2].thumbnail;

    //FOUR
      var fourDate = weather.forecast[3].day +", "+weather.forecast[3].date;
      

       // Get & store day one high
       var fourDateHigh = weather.forecast[3].high;

       // Get & store day one low
       var fourDateLow = weather.forecast[3].low;
         // Get & store day one thumb
       var fourDateThumb = weather.forecast[3].thumbnail;   
    //FIVE
      var fiveDate = weather.forecast[4].day +", "+weather.forecast[4].date;
    

       // Get & store day one high
       var fiveDateHigh = weather.forecast[4].high;

       // Get & store day one low
       var fiveDateLow = weather.forecast[4].low;
         // Get & store day one thumb
       var fiveDateThumb = weather.forecast[4].thumbnail;      

      
     




      console.log(oneDateThumb);
      console.log(oneDateHigh);
      console.log(currently);
       console.log(fourDateThumb, fiveDateThumb);
        console.log(fourDate);
           console.log(fiveDate);
           console.log(fiveDateHigh);

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
//TEMPERATURE ALERT when high and low are more than 25 degrees apart 
      if ( diff >= 25 ){
  
      $('.ui.modal.difference').modal('show');
      }
      
  //WICKED HOT ALERT when high temp is 99 degrees or more. 
      // Output to hooks in HTML
      if ( high>= 99 ){
  
      $('.ui.modal.hot-stuff').modal('show');
      }


      $('.temp').prepend(temp);

      //OUTPUT CITY, STATE


      $('.city').text(city + ", " + state);
      //OUTPUT DESCRIPTION
      $('.current').text(currently);
      
      //OUTPUT thumbnail
       //$('.thumb img').attr('src', thumb);
       //OUTPUT full size image
        $('.bigImage img').attr('src', bigImage);
        //OUTPUT high and low temperatures

        $('.high').append(high);

        $('.low').append(low);
        //OUTPUT wind
         $('.wind').text(windData);

      
      //OUTPUT difference in hi-lo temps
       $('span.diff').text(diff);
      
    //TOGGLE FOR WEATHERGEEK "GEEK OUT" OPTION


$(document).ready(function() {
  
 $("#clickMe").click(function() {
    $("#geekspot").toggle("slow");
  });
});
      // Geek out OUPUTs
        //OUTPUT sunrise
        $('.sunrise').append(sunrise);
        //OUTPUT sunset
        $('.sunset').append(sunset);
        //OUTPUT humdity
       $('.humid').append(humid + "%");
        //OUTPUT dewpoint
        $('.dewpoint').append(dewpoint);
        //OUTPUT visibility
        $('.visibility').append(visibility+" "+miles);
        //OUTPUT windchill
        $('.windchill').text(" "+windchill);

        //OUTPUT pressure
        $('.pressure').append(pressure);
        //OUTPUT updated
        $('.updated').append(updated);


//FORECAST TOGGLE
    $("#forecast").click(function() {
    $("#forecastSpot").toggle("slow");
  });  

  //FORECAST OUTPUT
      //OUTPUT day one
        $('.dayOne').text(oneDate);
        $('.dayOneThumb').attr('src', oneDateThumb);
         $('.dayOneHigh').append(oneDateHigh);
         $('.dayOneLow').append(oneDateLow);

        //OUTPUT day two
        $('.dayTwo').text(twoDate);
        $('.dayTwoThumb').attr('src', twoDateThumb);
         $('.dayTwoHigh').append(twoDateHigh);
         $('.dayTwoLow').append(twoDateLow);


        //OUTPUT day three
       $('.dayThree').text(threeDate);
        $('.dayThreeThumb').attr('src', threeDateThumb);
         $('.dayThreeHigh').append(threeDateHigh);
         $('.dayThreeLow').append(threeDateLow);



       //OUTPUT day four
       $('.dayFour').text(fourDate);
        $('.dayFourThumb').attr('src', fourDateThumb);
         $('.dayFourHigh').append(fourDateHigh);
         $('.dayFourLow').append(fourDateLow);
        

        //OUTPUT day five
       $('.dayFive').text(fiveDate);
        $('.dayFiveThumb').attr('src', fiveDateThumb);
         $('.dayFiveHigh').append(fiveDateHigh);
         $('.dayFiveLow').append(fiveDateLow); 
        
      // See console for _weather_ object
      console.log(weather);
    },
  
    // if error
    error: function(error) {  
      $('body').html('<p>' + error + '</p>');
    }
  
  });

