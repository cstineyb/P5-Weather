//IF CONDITION CODE... else

//GET TIME
  
  var d = new Date();
  var time = d.getHours();

    console.log(time);
//CONDITIONALS
     //SET BACKGROUND COLORS BASED ON TIME   
//if (time < 10) {
 //   greeting = "Good morning";
//} else if (time < 20) {
  //  greeting = "Good day";
//} else {
  //  greeting = "Good evening";

      if ( time >= 6 && time <= 17 ){
      
      $('#time').addClass('day');
      $('h1, li, button').addClass('dark');
      }else {
        $('#time').addClass('night');
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
 

 //FORECAST ICON APPEARANCE SWITCHAROO, 

      var imgLoc = 'img/icons/'+ weather.code +'.png';

      $('img').attr('src', imgLoc);

      console.log(imgLoc);

    //PRIORITY BASIC WEATHER DATA 

      var description = weather.description; 
      // Get & store temperature
      var temp = weather.temp;
      // Get & store city
      var city = weather.city;
       // Get & store state
      var state = weather.region;
      // Get & store ibigimage
      var bigImage = imgLoc;


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
      

       // Get & store day one high
       var oneDateHigh = weather.forecast[0].high;

       // Get & store day one low
       var oneDateLow = weather.forecast[0].low;

       //THUMBNAIL FUN!
         
      var imgLocThumbOne = 'img/icons/thumbs/'+ weather.forecast[0].code +'.png';

      $('img').attr('src', imgLocThumbOne);

      // Get & store day one thumb

       var oneDateThumb = imgLocThumbOne;
//SUBSEQUENT DAYS
  //TWO
 //THUMBNAIL FUN!
      var imgLocThumbTwo = 'img/icons/thumbs/'+ weather.forecast[1].code +'.png';

      $('img').attr('src', imgLocThumbTwo);


      var twoDate = weather.forecast[1].day +", "+weather.forecast[1].date;
      

       // Get & store day two high
       var twoDateHigh = weather.forecast[1].high;

       // Get & store day two low
       var twoDateLow = weather.forecast[1].low;
         // Get & store day two thumb
       var twoDateThumb = imgLocThumbTwo;
   //THREE
       //THUMBNAIL FUN!

      var imgLocThumbThree = 'img/icons/thumbs/'+ weather.forecast[2].code +'.png';

      $('img').attr('src', imgLocThumbThree);



      var threeDate = weather.forecast[2].day +", "+weather.forecast[2].date;
     

       // Get & store day three high
       var threeDateHigh = weather.forecast[2].high;

       // Get & store day three low
       var threeDateLow = weather.forecast[2].low;
         // Get & store day three thumb
       var threeDateThumb = imgLocThumbThree;

    //FOUR


     var imgLocThumbFour = 'img/icons/thumbs/'+ weather.forecast[3].code +'.png';

      $('img').attr('src', imgLocThumbFour);

      var fourDate = weather.forecast[3].day +", "+weather.forecast[3].date;
      

       // Get & store day four high
       var fourDateHigh = weather.forecast[3].high;

       // Get & store day four low
       var fourDateLow = weather.forecast[3].low;
         // Get & store day four thumb
       var fourDateThumb = imgLocThumbFour;   
    //FIVE

     var imgLocThumbFive = 'img/icons/thumbs/'+ weather.forecast[4].code +'.png';

      $('img').attr('src', imgLocThumbFive);

      var fiveDate = weather.forecast[4].day +", "+weather.forecast[4].date;
    

       // Get & store day five high
       var fiveDateHigh = weather.forecast[4].high;

       // Get & store day five low
       var fiveDateLow = weather.forecast[4].low;
         // Get & store day five thumb
       var fiveDateThumb = imgLocThumbFive;      

      
     




      /*console.log(oneDateThumb);
      console.log(oneDateHigh);
      console.log(currently);
       console.log(fourDateThumb, fiveDateThumb);
        console.log(fourDate);
           console.log(fiveDate);
           console.log(fiveDateHigh);

           */

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
//POP UP WEATHER FOR FAVORITE PLACES TO VISIT
//HI WEATHER

$(function() {
  $.simpleWeather({
    location: 'Paia, HI',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.city+'</h2>';
       html += '<p>weather.code: '+weather.code+'</p>';
      html += '<p> '+weather.temp+weather.units.temp+'</p>';
      html += '<p>weather.currently: '+weather.currently+'</p>';
      html += '<p>&uarr; '+weather.high+' '+'&darr;  '+weather.low+'</p>';
      
      
    $("#weather1").html(html);
    },
    error: function(error) {
      $("#weather1").html('<p>'+error.message+'</p>');
    }
  });
});

$("#hi").click(function() {
    $("#weather1").slideToggle("slow");
  
});




//GIRONA WEATHER
$(function() {
  $.simpleWeather({
    location: 'Girona, Spain',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.city+'</h2>';
       html += '<p>weather.code: '+weather.code+'</p>';
      html += '<p> '+weather.temp+weather.units.temp+'</p>';
      html += '<p>weather.currently: '+weather.currently+'</p>';
      html += '<p>&uarr; '+weather.high+' '+'&darr;  '+weather.low+'</p>';
      
      
    $("#weather2").html(html);
    },
    error: function(error) {
      $("#weather2").html('<p>'+error.message+'</p>');
    }
  });
});

$("#spain").click(function() {
    $("#weather2").slideToggle("slow");
  
});




//BC WEATHER

$(function() {
  $.simpleWeather({
    location: 'Nakusp, B',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.city+'</h2>';
       html += '<p>weather.code: '+weather.code+'</p>';
      html += '<p> '+weather.temp+weather.units.temp+'</p>';
      html += '<p>weather.currently: '+weather.currently+'</p>';
      html += '<p>&uarr; '+weather.high+' '+'&darr;  '+weather.low+'</p>';
      
      
    $("#weather3").html(html);
    },
    error: function(error) {
      $("#weather3").html('<p>'+error.message+'</p>');
    }
  });
});

$("#bc").click(function() {
    $("#weather3").slideToggle("slow");
  
});



//NZ WEATHER
$(function() {
  $.simpleWeather({
    location: 'Auckland, NZ',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.city+'</h2>';
       html += '<p>weather.code: '+weather.code+'</p>';
      html += '<p> '+weather.temp+weather.units.temp+'</p>';
      html += '<p>weather.currently: '+weather.currently+'</p>';
      html += '<p>&uarr; '+weather.high+' '+'&darr;  '+weather.low+'</p>';
      
      
    $("#weather4").html(html);
    },
    error: function(error) {
      $("#weather4").html('<p>'+error.message+'</p>');
    }
  });
});

$("#nz").click(function() {
    $("#weather4").slideToggle("slow");
  
});

      

