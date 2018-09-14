/* 
    version : 1.0.6
    Author  : Aman Sahil
    Maintained at and by : https://github.com/amansahil/lyra-js    
*/

var lr =  {}

lr.generateRand =  function(length, type){
        if(typeof type === 'string' || type instanceof String){
            var type = type.toLowerCase()
        }
        var text = "";
        var possible = "";
        if(type == "alphanum"){
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        } else if(type == "string"){
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        } else {
            var possible = "0123456789";
        }

        for (let i = 0; i < length; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
}

lr.getURLargs = function(){
    var str = document.URL;
    var res = str.split("?");
    var res2  = "Please follow documentation format";
    if(res.length == 2){
        var res2 = res[1].split("&");
    }
    
    return res2;
}

lr.i = function(id){
    if (lr.i.cache[id] === undefined) {
        lr.i.cache[id] = document.getElementById(id) || false;
      }
    return lr.i.cache[id];
}

lr.i.cache = {};

lr.q = function(id){
    if (lr.q.cache[id] === undefined) {
        lr.q.cache[id] = document.querySelector(id) || false;
      }
    return lr.q.cache[id];
}

lr.q.cache = {};

lr.qa = function(id){
    if (lr.qa.cache[id] === undefined) {
        lr.qa.cache[id] = document.querySelectorAll(id) || false;
      }
    return lr.qa.cache[id];
}

lr.qa.cache = {};


lr.getAbsoluteUrl = (function() {
	var a;

	return function(url) {

        if(url === undefined) {
            url = ""
        }

		if(!a) a = document.createElement('a');
		a.href = url;

		return a.href;
	};
})();

lr.getDate = function(format, date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


    var newDate = format;
    var dateObj = "";

    if(date == undefined) {
        dateObj = new Date();
    } else {
        dateObj = new Date(date);
    }
    var mm = dateObj.getMonth() + 1;
    var dd = dateObj.getDate();
    var dn = dayNames[dateObj.getDay()];
    var dsn = shortDayNames[dateObj.getDay()];
    var yy = dateObj.getFullYear();
    var hh = dateObj.getHours();
    var min = dateObj.getMinutes();
    var ss = dateObj.getSeconds();
    var fm  = monthNames[mm - 1];
    var sm = shortMonthNames[mm -1];

    newDate = newDate.replaceAll("dd", dd);
    newDate = newDate.replaceAll("mm", mm);
    newDate = newDate.replaceAll("yy", yy);
    newDate = newDate.replaceAll("fm", fm);
    newDate = newDate.replaceAll("sm", sm)
    newDate = newDate.replaceAll("hh", hh);
    newDate = newDate.replaceAll("min", min);
    newDate = newDate.replaceAll("ss", ss);
    newDate = newDate.replaceAll("dn", dn);
    newDate = newDate.replaceAll("dsn", dsn);

    return newDate;
}

lr.getTimeByZone = function(zone, date){
    var zone = zone.toUpperCase()

    if(date == undefined){
        var today = new Date();
    } else {
        var today = new Date(date);
    }

    var UTChour = today.getUTCHours()

    var UTCminute = today.getUTCMinutes()

    var newHour = "";
    var newMinute = "";

    switch(zone) {
        case "ECT":
            var newHour = UTChour + 1;
            break;

        case "EET":
            var newHour = UTChour + 2;
            break;

        case "ART":
            var newHour = UTChour + 2;
            break;

        case "EAT":
            var newHour = UTChour + 3;
            break; 
            
        case "MET":
            var newHour = UTChour + 3;
            var newMinute = UTCminute + 30;
            break;

        case "NET":
            var newHour = UTChour + 4;
            break;

        case "PLT":
            var newHour = UTChour + 5;
            break;

        case "IST":
            var newHour = UTChour + 5;
            var newMinute = UTCminute + 30;
            break;

        case "BST":
            var newHour = UTChour + 6;
            break;

        case "VST":
            var newHour = UTChour + 7;
            break;

        case "CTT":
            var newHour = UTChour + 8;
            break;

        case "JST":
            var newHour = UTChour + 9;
            break;

        case "ACT":
            var newHour = UTChour + 9;
            var newMinute = UTCminute + 30;
            break;

        case "AET":
            var newHour = UTChour + 10;
            break;
            
        case "SST":
            var newHour = UTChour + 11;
            break; 

        case "NST":
            var newHour = UTChour + 12;
            break; 
    
        case "MIT":
            var newHour = UTChour - 11;
            break; 

        case "HST":
            var newHour = UTChour - 10;
            break; 

        case "AST":
            var newHour = UTChour - 9;
            break;

        case "PST":
            var newHour = UTChour - 8;
            break;

        case "PNT":
            var newHour = UTChour - 7;
            break;

        case "MST":
            var newHour = UTChour - 7;
            break;

        case "CST":
            var newHour = UTChour - 6;
            break;
        

        case "EST":
            var newHour = UTChour - 5;
            break;

        case "IET":
            var newHour = UTChour - 5;
            break;

        case "PRT":
            var newHour = UTChour - 4;
            break;

        case "CNT":
            var newHour = UTChour - 3;
            var newMinute = UTCminute - 30;
            
            break;   
            
        case "AGT":
            var newHour = UTChour - 3;
            break;

        case "BET": 
            var newHour = UTChour - 3;
            break;

        case "CAT": 
            var newHour = UTChour - 1;
            break;   

        default: 
            var newHour = UTChour + 0
            break;
    }

    today.setUTCHours(newHour);

    if( newMinute != "" ) {
        today.setUTCMinutes(newMinute);
    }

    if(date == undefined){
        var todayTime = today.toUTCString(); 
        if(todayTime != "Invalid Date")
            var todayTime = todayTime.substring(0, todayTime.length - 4);
    } else {
        var todayTime = today.toString(); 
        if(todayTime != "Invalid Date")
         var todayTime = todayTime.substring(0, todayTime.length - 15);
    }

    return todayTime;
}

lr.convertTimeByZone = function(currentZone, finalZone, date){
    var today = new Date(date);

    var currentZone = currentZone.toUpperCase()
    var finalZone = finalZone.toUpperCase()

    var UTChour = today.getHours()

    var UTCminute = today.getMinutes()

    switch(currentZone) {
        case "ECT":
            var UTChour = UTChour - 1;
            break;

        case "EET":
            var UTChour = UTChour - 2;
            break;

        case "ART":
            var UTChour = UTChour - 2;
            break;

        case "EAT":
            var UTChour = UTChour - 3;
            break; 
            
        case "MET":
            var UTChour = UTChour - 3;
            var UTCminute = UTCminute - 30;
            break;

        case "NET":
            var UTChour = UTChour - 4;
            break;

        case "PLT":
            var UTChour = UTChour - 5;
            break;

        case "IST":
            var UTChour = UTChour - 5;
            var UTCminute = UTCminute - 30;
            break;

        case "BST":
            var UTChour = UTChour - 6;
            break;

        case "VST":
            var UTChour = UTChour - 7;
            break;

        case "CTT":
            var UTChour = UTChour - 8;
            break;

        case "JST":
            var UTChour = UTChour - 9;
            break;

        case "ACT":
            var UTChour = UTChour - 9;
            var UTCminute = UTCminute - 30;
            break;

        case "AET":
            var UTChour = UTChour - 10;
            break;
            
        case "SST":
            var UTChour = UTChour - 11;
            break; 

        case "NST":
            var UTChour = UTChour - 12;
            break; 
    
        case "MIT":
            var UTChour = UTChour + 11;
            break; 

        case "HST":
            var UTChour = UTChour + 10;
            break; 

        case "AST":
            var UTChour = UTChour + 9;
            break;

        case "PST":
            var UTChour = UTChour + 8;
            break;

        case "PNT":
            var UTChour = UTChour + 7;
            break;

        case "MST":
            var UTChour = UTChour + 7;
            break;

        case "CST":
            var UTChour = UTChour + 6;
            break;
        

        case "EST":
            var UTChour = UTChour + 5;
            break;

        case "IET":
            var UTChour = UTChour + 5;
            break;

        case "PRT":
            var UTChour = UTChour + 4;
            break;

        case "CNT":
            var UTChour = UTChour + 3;
            var UTCminute = UTCminute + 30;
            
            break;   
            
        case "AGT":
            var UTChour = UTChour + 3;
            break;

        case "BET": 
            var UTChour = UTChour + 3;
            break;

        case "CAT": 
            var UTChour = UTChour + 1;
            break;   

        default: 
            var UTChour = UTChour + 0
            break;
    }

    today.setHours(UTChour);
    today.setMinutes(UTCminute)

    var newTime = today.toString();
    
    var newTime = newTime.substring(0, newTime.length - 15);

    var finalTime = this.getTimeByZone(finalZone, newTime) 

    var res = finalTime.split(" ")

    var vnewTime = ""

    for(let i = 0; i < 5; i++){
        vnewTime += res[i]+" "
    }

    return vnewTime.trim()
}

lr.convertDateAdvanced = function(format, date, length) {
    format = format.replace(/[^a-zA-Z0-9]/g, ' ');
    date = date.replace(/[^a-zA-Z0-9]/g, ' ');

    var newDate = ""
    var newFormat = ""

    var dayStop = false;
    var monthStop = false;
    var yearStop = false;

    var hourStop = false;
    var minuteStop = false;
    var secondStop = false;

    format.forEachWord(function(word, i) {
        if(word == "dd") {
            if(!dayStop) {
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += newWord+"-";
                        newFormat += "dd-"
                        dayStop = true;
                    }                
                })
            }
        }   
    })

    format.forEachWord(function(word, i) {
        if(word == "mm") {
            if(!monthStop){
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += newWord+"-";
                        newFormat += "mm-"
                        monthStop = true
                    }                
                })
            }
        }   
    })

    format.forEachWord(function(word, i) {
        if(word == "yy") {
            if(!yearStop){
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += +newWord;
                        newFormat += "yy"
                        yearStop = true;
                    }             
                })
            }
        }   
    })

    format.forEachWord(function(word, i) {
        if(word == "hh") {
            if(!hourStop) {
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += " "+newWord+":";
                        hourStop = true;
                    }                
                })
            }
        }   
    })

    format.forEachWord(function(word, i) {
        if(word == "min") {
            if(!minuteStop){
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += newWord+":";
                        minuteStop = true
                    }                
                })
            }
        }   
    })

    format.forEachWord(function(word, i) {
        if(word == "ss") {
            if(!secondStop){
                date.forEachWord(function(newWord, newi){
                    if(i == newi) {
                        newDate += +newWord;
                        secondStop = true;
                    }             
                })
            }
        }   
    })

    return lr.convertDate(newFormat, newDate, length)
}

lr.convertDate = function(format, date, length){
    var newDate = ""
    var time = ""
    var seperator = format[2]

    var res = format.split(seperator)
    var dateRes = date.split(seperator)

    if(res.length != 3 || dateRes.length != 3){
        console.error("Format error, make sure day, month or year is only written once or if all values are mentioned")
        return;
    }

    var timeRes = dateRes[dateRes.length -1].split(" ")

    if(timeRes[1] != undefined) {
        time = timeRes[1]
        dateRes[dateRes.length -1] = timeRes[0]
    } else {
        time = "00:00:00"
    }

    for(let i = 0; i < res.length; i++){
        if(res[i] == "yy"){
            newDate += dateRes[i]+"/"
        }     
    }

    for(let i = 0; i < res.length; i++){
        if(res[i] == "mm") {
            dateRes[i] = dateRes[i].substr(0,3)
            dateRes[i] = dateRes[i].toLowerCase()
            newDate += dateRes[i]+"/"
        }
    }

    for(let i = 0; i < res.length; i++){
        if(res[i] == "dd"){
            newDate += dateRes[i]
        }     
    }
    
    newDate += " "+time

    var convertedDate = new Date(newDate)

    var longDate = convertedDate.toString()

    var dateRes = longDate.split(" ")

    var longDate = ""

    for(let i = 0; i < 5; i++){
        longDate += dateRes[i]+" "
    }


    var shortDate = convertedDate;

    if(length == "short") {
        return shortDate;
    } else {
        return longDate.trim();
    }
}

lr.dateDifference = function(date, date2, type) {
   var difference = ""
   var date =  new Date(date)
   var date2 = new Date(date2)

   var dateDiff = date - date2;

   var year = Math.floor(dateDiff/31536000000);
   var month = Math.floor((dateDiff % 31536000000)/2628000000);
   var day = Math.floor((((dateDiff % 31536000000) % 2628000000)/86400000) - 2);
   
   var hours = date.getHours() - date2.getHours()
   var minute = date.getMinutes() - date2.getMinutes()
   var seconds = date.getSeconds() - date2.getSeconds()

    if(year > 0) {
        if(year == 1){
            difference += `${year} Year `
        } else {
            difference += `${year} Years `
        }
   }

   if(month > 0) {
        if(month == 1){
            difference += `${month} Month `
        } else {
            difference += `${month} Months `
        }
   }


   if(day > 0) {
        if(day == 1){
            difference += `${day} Day`
        } else {
            difference += `${day} Days`
        }
   }

   if (type == "long") {
        if(hours == 1){
            difference += ` ${hours} Hours `
        } else if(hours < 0){
            hours = 24 + hours;
            difference += ` ${hours} Hours `
        } else {
            difference += ` ${hours} Hours `
        }

        if(minute == 1){
            difference += `${minute} Minute `
        } else if(minute < 0){
            minute = 60 + minute;
            difference += ` ${minute} Minutes `
        } else {
            difference += `${minute} Minutes `
        }

        if(seconds == 1){
            difference += `${seconds} Second `
        } else if(seconds < 0){
            seconds = 60 + seconds;
            difference += ` ${seconds} Seconds `
        } else {
            difference += `${seconds} Seconds `
        }
   }
   
   return difference.trim();
}

lr.getCC = function(offset) {
    var date = ""

    if(offset == undefined) {
        date = new Date()
        offset = date.getTimezoneOffset()
        offset =  -offset/60
    }

    switch(offset) {
        case 0: 
            var newHour = ["UTC"];
            break;

        case 1:
            var newHour = ["ECT"];
            break;

        case 2:
            var newHour = ["EET", "ART"];
            break;

        case 3:
            var newHour = ["EAT"];
            break; 
            
        case 3.5:
            var newHour = ["MET"];
            break;

        case 4:
            var newHour = ["NET"];
            break;

        case 5:
            var newHour = ["PLT"];
            break;

        case 5.5:
            var newHour = ["IST"];
            break;

        case 6:
            var newHour = ["BST"];
            break;

        case 7:
            var newHour = ["VST"];
            break;

        case 8:
            var newHour = ["CTT"];
            break;

        case 9:
            var newHour = ["JST"];
            break;

        case 9.5:
            var newHour = ["ACT"];
            break;

        case 10:
            var newHour = ["AET"];
            break;
            
        case 11:
            var newHour = ["SST"];
            break; 

        case 12:
            var newHour = ["NST"];
            break; 
    
        case -11:
            var newHour = ["MIT"];
            break; 

        case -10:
            var newHour = ["HST"];
            break; 

        case -9:
            var newHour = ["AST"];
            break;

        case -8:
            var newHour = ["PST"];
            break;

        case -7:
            var newHour = ["PNT", "MST"];
            break;

        case -6:
            var newHour = ["CST"];
            break;
        

        case -5:
            var newHour = ["EST", "IET"];
            break;

        case -4:
            var newHour = ["PRT"];
            break;

        case -3.5:
            var newHour = ["CNT"]
            break;   
            
        case -3:
            var newHour = ["AGT", "BET"];
            break;

        case -1: 
            var newHour = ["CAT"];
            break;   

        default: 
            var newHour = ["UTC"]
            break;
    }

    return newHour;
}

lr.add = function(arg, date) {
   var arg = arg.toLowerCase()

   var res = arg.split(" ")

   var num = ""
    
   res[0] = parseInt(res[0])

   if(date == undefined) {
       date = new Date()
   } else {
       date = new Date(date)
   }

   if(res[1] == undefined){
        arg = arg.substring(0,3);

        switch(arg) {
            case "mon":
                num = 2;
                break;
            case "tue":
                num = 3;
                break;
            case "wed":
                num = 4;
                break;
            case "thu":
                num = 5;
                break;
            case "fri":
                num = 6;
                break;
            case "sat":
                num = 7;
                break;
            case "sun":
                num = 1;
                break;
        }

        var day = date.getDay() + 1;
        var addDay = num - day;

        if(addDay < 0) {
            addDay = 7 + addDay
        } else if(addDay == 0) {
            addDay = 7;
        }

        var day = date.getDate()
        var day = day + addDay 
        date.setDate(day) 

   } else if(res[1] == "years" || res[1] == "year") {
        var year = date.getFullYear()
        var year = year + res[0] 
        date.setFullYear(year)
    } else if(res[1] == "months" || res[1] == "month") {
        var month = date.getMonth()
        var month = month + res[0] 
        date.setMonth(month)        
    } else if(res[1] == "days" || res[1] == "day") {
        var day = date.getDate()
        var day = day + res[0] 
        date.setDate(day)      
    } else if(res[1] == "hours" || res[1] == "hour") {
        var hours = date.getHours()
        var hours = hours + res[0] 
        date.setHours(hours)    
    } else if(res[1] == "minutes" || res[1] == "minute") {
        var minutes = date.getMinutes()
        var minutes = minutes + res[0] 
        date.setMinutes(minutes)    
    } else if(res[1] == "seconds" || res[1] == "second") {
        var seconds = date.getSeconds()
        var seconds = seconds + res[0] 
        date.setSeconds(seconds)    
    } 

    var longDate = date.toString()

    var dateRes = longDate.split(" ")

    var longDate = ""

    for(let i = 0; i < 5; i++){
        longDate += dateRes[i]+" "
    }

    return longDate.trim();
}

lr.sub = function(arg, date) {
    var arg = arg.toLowerCase()

    var res = arg.split(" ")

    if(res[1] == undefined){

        if(date == undefined) {
            date = new Date()
        } else {
            date = new Date(date)
        }

        arg = arg.substring(0,3);

        switch(arg) {
            case "mon":
                num = 2;
                break;
            case "tue":
                num = 3;
                break;
            case "wed":
                num = 4;
                break;
            case "thu":
                num = 5;
                break;
            case "fri":
                num = 6;
                break;
            case "sat":
                num = 7;
                break;
            case "sun":
                num = 1;
                break;
        }

        var day = date.getDay() + 1;
        var addDay = day - num;

        if(addDay < 0) {
            addDay = 7 + addDay
        } else if(addDay == 0) {
            addDay = 7;
        }

        var day = date.getDate()
        var day = day - addDay 

        date.setDate(day) 

        var longDate = date.toString()

        var dateRes = longDate.split(" ")
    
        var longDate = ""
    
        for(let i = 0; i < 5; i++){
            longDate += dateRes[i]+" "
        }
    
        return longDate.trim();
   } else {     
    res[0] = -parseInt(res[0])

    var arg = res[0]+" "+res[1]

    return lr.add(arg, date);
   }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.titleCase = function() {
    str = this

    if(str === undefined){
        console.error("Please input a valid argument");
        return;
    }

    var splitStr = str.toLowerCase().split(' ');
    for(let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

String.prototype.camelize = function() {
    return this.replace(/\-(\w)/g, function( $0, $1 ) {
        return $1.toUpperCase();
    });
}

String.prototype.contains = function(what, caseSensitive) { 
    var str = this

    if(caseSensitive == false){
        str = str.toLowerCase()
        what = what.toLowerCase()    
    }

    what = typeof what === 'string' ? what : what.toString();
    
    return str.indexOf( what ) > -1;   
}

String.prototype.count = function(what, caseSensitive) {
    var i = 0;

    var str = this

    if(caseSensitive == false){
        str = str.toLowerCase()
        what = what.toLowerCase()    
    }

    str.forEachWord(function(word){
        if(word == what){
            i++;
        }
    })

    return i;
}

String.prototype.format = function (values) {
    var regex = /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g;

    var getValue = function (key) {
            if (values == null || typeof values === 'undefined') return null;

            var value = values[key];
            var type = typeof value;

            return type === 'string' || type === 'number' ? value : null;
        };

    return this.replace(regex, function (match) {
        var key = match.substr(1, match.length - 2);

        var value = getValue(key);

        return value != null ? value : match;
    });
}

String.prototype.shorten = function( length, token ) {              
    var substrd = this.substring( 0, length || this.length );
    
    return substrd + ( substrd === this ? '' : (token || '') );
}

String.prototype.forEach = function( fn ) {
    var c, i = -1;
    
    while ( (c = this[++i]) ) {
        fn.call( this, c, i );
    }
    
    return true;
}

String.prototype.forEachWord = function( fn ) {
    var string = this,
        i = -1;
    
    string.replace(/\b([\w\-]+)\b/g, function( match, word ){
        fn.call( string, word, ++i );
        return match;
    });
    
    return true;
}

String.prototype.indices = function(arg, caseSensitive){
    var indices = [];
    var str = this

    if(caseSensitive == false) {
        str = str.toLowerCase()
    }

    for(let i=0; i<str.length;i++) {
        if (str[i] === arg) indices.push(i);
    }

    return indices;
}

Array.prototype.indices = function(arg, caseSensitive){
    var indices = [];
    var arr = this

    if(caseSensitive == false) {
        arr = arr.toLowerCase()
    }

    for(let i=0; i<arr.length;i++) {
        if (arr[i] === arg) indices.push(i);
    }

    return indices;
}

Array.prototype.indexOfMax = function(arr) {
    var arr = this

    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

Array.prototype.indexOfMin = function() {
    var arr = this

    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

Array.prototype.maxArray = function(){
    var maxValue = Math.max.apply( Math, this );

    return maxValue
}

Array.prototype.minArray = function(){
    var minValue = Math.min.apply( Math, this );

    return minValue
}

Array.prototype.toLowerCase = function() {
    var sorted = []
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === 'string' || this[i] instanceof String){
            sorted.push(this[i].toLowerCase());
        } else {
            sorted.push(this[i]);
        }
    }

    return sorted;
}

Array.prototype.toUpperCase = function() {
    var sorted = []
    for (var i = 0; i < this.length; i++) {
        if (typeof this[i] === 'string' || this[i] instanceof String){
            sorted.push(this[i].toUpperCase());
        } else {
            sorted.push(this[i]);            
        }
    }

    return sorted;
}