# Lyra-JS
A tiny javascript utility library that makes code look neater, dates easier and much more.

## Installation 

NPM:

    npm install lyra-js --save

CDN: 

    https://lyra-js.firebaseapp.com/lyra.min.js


## Selectors made neater 

    lr.i('id') //Instead of document.getElementById()
    lr.q('.class') //Instead of document.querySelector()
    lr.qa('input') //Instead of document.querySelectorAll()

## Dates are hard but they don't need to be in javascript

    lr.add("5 days") //Adds 5 days to current date
    lr.add("Tuesday", "Sat, 30 Jun 2018 12:43:00") //Moves date to next Tuesday

    lr.sub("5 months") //Subtracts 5 months from current date

    lr.getTimeByZone("JST") //Gets current date and time in Japan

    lr.convertDateAdvanced("dd, mm yy", "30, June 2018")

    //Converts any date format to a valid date string or date object 

    lr.convertDateAdvanced("mm, this is text hh@dd yy yy ss min", "07, this is text 6@3 2018 2018 13 13")

    //Yes, Even Something like this

    lr.dateDifference(date, date2) 
    
    //Get's the difference in years, months, days or even in hours, minutes and seconds

    //And yes, leap years included
    
    //These are just a few of the things lyra-js can do for dates

## A useful bunch of functions is better than a bunch of functions

    lr.generateRand(6, "alphanum") //Generates a random alphanumeric string

    lr.getAbsoluteUrl("hello") 
    
    //Gets absolute URL of any page 

    //Eg: www.xyz.com/hello or www.xyz.com/view/hello 

    "String".forEach(function(letter, i){

    })  //Loops for each letter

    "String of words".forEachWord(function(word, i){

    }) //Loops for each word

    ["hello", "1", "world"].toUpperCase() //Makes all strings in an array upper case

    //We have so much more, check out our docs below

## Docs

Check out our docs [here](https://lyra.js.org/docs)




