# Lyra-JS

A nano javascript library for date and time manipulation.

## Installation

NPM:

    npm install lyra-js --save

CDN:

    https://lyra-js.firebaseapp.com/lyra.min.js

## Dates are hard but they don't need to be in javascript

    lr.add("5 days") // Adds 5 days to current date
    lr.add("Tuesday", "Sat, 30 Jun 2018 12:43:00") // Moves date to next Tuesday

    lr.sub("5 months") // Subtracts 5 months from current date

    lr.getTimeByZone("JST") // Gets current date and time in Japan

    lr.convertDate("dd, mm yy", "30, June 2018")

    // Converts any date format to a valid date string or date object

    lr.convertDate("mm, this is text hh@dd yy yy ss min", "07, this is text 6@3 2018 2018 13 13")

    // Yes, Even Something like this

    lr.dateDifference(date, date2)

    // Get's the difference in years, months, days or even in hours, minutes and seconds

    // And yes, leap years included

    // These are just a few of the things lyra-js can do for dates

## Docs

Check out our docs [here](https://lyra.js.org/docs)
