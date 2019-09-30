/* 
    version : 2.0.4
    Author  : Aman Sahil
    Maintained at and by : https://github.com/amansahil/lyra-js    
*/

exports.getDate = function(format, date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const shortMonthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  let generatedDate = format
    ? format
    : '{dd}/{mm}/{yy} {12hh}:{min}:{ss} {ampm}'

  const dateObj = date ? new Date(date) : new Date()

  const getDay = dateObj.getDay()
  const getDate = dateObj.getDate()
  const getMonth = dateObj.getMonth()
  const getHours = dateObj.getHours()

  const relpaceObj = {
    dd: getDate,
    dn: dayNames[getDay],
    dsn: shortDayNames[getDay],
    mm: getMonth + 1,
    fm: monthNames[getMonth],
    sm: shortMonthNames[getMonth],
    yy: dateObj.getFullYear(),
    hh: getHours,
    '12hh': getHours % 12 ? getHours % 12 : 12,
    AMPM: getHours >= 12 ? 'PM' : 'AM',
    ampm: getHours >= 12 ? 'pm' : 'am',
    min: lowerThanTen(dateObj.getMinutes()),
    ss: lowerThanTen(dateObj.getSeconds())
  }

  return formatDate(generatedDate, relpaceObj)
}

exports.getTimeByZone = function(zone, date) {
  const today = date ? new Date(date) : new Date()

  const zoneObject = zoneSwitch(
    '+',
    '-',
    today.getUTCHours(),
    today.getUTCMinutes()
  )

  const newHour = zoneObject[0][zone.toUpperCase() || 'default']()

  const minuteSwitch = zoneObject[1][zone.toUpperCase() || 'default']

  const newMinute = minuteSwitch && minuteSwitch()

  today.setUTCHours(newHour)

  newMinute && today.setUTCMinutes(newMinute)

  const todayConverted = date ? today.toString() : today.toUTCString()

  return removeOffset(todayConverted)
}

exports.convertTimeByZone = function(currentZone, finalZone, date) {
  const date2Convert = new Date(date)

  const zoneObject = zoneSwitch(
    '-',
    '+',
    date2Convert.getHours(),
    date2Convert.getMinutes()
  )

  const UTChour = zoneObject[0][currentZone.toUpperCase() || 'default']()

  const minuteSwitch = zoneObject[1][currentZone.toUpperCase() || 'default']

  const UTCminute = minuteSwitch && minuteSwitch()

  date2Convert.setHours(UTChour)
  date2Convert.setMinutes(UTCminute)

  return exports.getTimeByZone(finalZone.toUpperCase(), date2Convert)
}

exports.convertDate = function(format, date, length) {
  format = format.replace(/[^a-zA-Z0-9]/g, ' ')
  date = date.replace(/[^a-zA-Z0-9]/g, ' ')

  let newDate = ''
  let newFormat = ''

  const dateKeys = ['dd', 'mm', 'yy', 'hh', 'min', 'ss']

  const doneKeys = []

  let k = 0

  for (const key of dateKeys) {
    const timeConditon = k > 2
    const yearConditon = key !== 'yy'

    forEachWord(format, (word, i) => {
      if (word === key && !doneKeys.includes(key)) {
        doneKeys.push(key)

        forEachWord(date, (dateNum, j) => {
          if (i === j) {
            !timeConditon
              ? (newDate += yearConditon ? dateNum + '-' : dateNum + ' ')
              : (newDate += dateNum + ':')

            !timeConditon
              ? (newFormat += yearConditon ? `${key}-` : `${key} `)
              : null
          }
        })
      }
    })
    k++
  }

  return convertDateHelper(
    removeLastChar(newFormat),
    removeLastChar(newDate),
    length
  )
}

exports.dateDifference = function(date, date2, type) {
  let difference = ''

  date = new Date(date)
  date2 = new Date(date2)

  const dateDiff = date - date2

  const dateObj = {
    Year: Math.floor(dateDiff / 31536000000),
    Month: Math.floor((dateDiff % 31536000000) / 2628000000),
    Day: Math.floor(((dateDiff % 31536000000) % 2628000000) / 86400000 - 2)
  }

  const timeObj = {
    Hour: [date.getHours() - date2.getHours(), 24],
    Minute: [date.getMinutes() - date2.getMinutes(), 60],
    Second: [date.getSeconds() - date2.getSeconds(), 60]
  }

  let usertimeObj = {}

  for (const literalObj in dateObj) {
    dateObj[literalObj] > 0
      ? (difference += `${dateObj[literalObj]} ${literalObj}${
          dateObj[literalObj] === 1 ? '' : 's'
        } `)
      : null
  }

  if (type === 'long' || difference === '') {
    let i = 0
    for (const timeType in timeObj) {
      const time = timeObj[timeType]
      const keys = Object.keys(timeObj)

      usertimeObj[timeType] = time[0]
      usertimeObj[timeType] += usertimeObj[timeType] < 0 ? time[1] : 0

      i < 2 && timeObj[keys[i + 1]][0] < 0
        ? (usertimeObj[timeType] = usertimeObj[timeType] - 1)
        : null

      const userViewTime = usertimeObj[timeType]

      difference += `${userViewTime} ${timeType}${
        userViewTime === 1 ? '' : 's'
      } `

      i++
    }
  }

  return difference.trim()
}

exports.getCC = function(offset) {
  if (offset == undefined) {
    const date = new Date()
    offset = date.getTimezoneOffset()
    offset = -offset / 60
  }

  const zoneOffset = {
    '0': ['UTC'],
    '1': ['ECT'],
    '2': ['EET', 'ART'],
    '3': ['EAT'],
    '3.5': ['MET'],
    '4': ['NET'],
    '5': ['PLT'],
    '5.5': ['IST'],
    '6': ['BST'],
    '7': ['VST'],
    '8': ['CTT'],
    '9': ['JST'],
    '9.5': ['ACT'],
    '10': ['AET'],
    '11': ['SST'],
    '12': ['NST'],
    '-11': ['MIT'],
    '-10': ['HST'],
    '-9': ['AST'],
    '-8': ['PST'],
    '-7': ['PNT', 'MST'],
    '-6': ['CST'],
    '-5': ['EST', 'IET'],
    '-4': ['PRT'],
    '-3.5': ['CNT'],
    '-3': ['AGT', 'BET'],
    '-1': ['CAT'],
    defaul: ['UTC']
  }

  return zoneOffset[offset || 'default']
}

exports.add = function(arg, date) {
  arg = arg.toLowerCase().trim()

  let res = arg.split(' ')

  res[0] = parseInt(res[0])
  res[1] = res[1] && res[1].substring(0, res[1].length - 1)

  const dateObj = date ? new Date(date) : new Date()

  if (res[1] === undefined) {
    arg = arg.substring(0, 3) // Eg: convert monday to mon

    const dayToNumber = {
      mon: 2,
      tue: 3,
      wed: 4,
      thu: 5,
      fri: 6,
      sat: 7,
      sun: 1
    }

    const num = dayToNumber[arg]

    let day = dateObj.getDay() + 1
    let addDay = num - day

    if (addDay < 0) {
      addDay = 7 + addDay
    } else if (addDay == 0) {
      addDay = 7
    }

    day = dateObj.getDate() + addDay

    dateObj.setDate(day)
  } else if (res[1] === 'year') {
    const year = dateObj.getFullYear() + res[0]

    dateObj.setFullYear(year)
  } else if (res[1] === 'month') {
    const month = dateObj.getMonth() + res[0]

    dateObj.setMonth(month)
  } else if (res[1] === 'day') {
    const day = dateObj.getDate() + res[0]

    dateObj.setDate(day)
  } else if (res[1] === 'hour') {
    const hours = dateObj.getHours() + res[0]

    dateObj.setHours(hours)
  } else if (res[1] === 'minute') {
    const minutes = dateObj.getMinutes() + res[0]

    dateObj.setMinutes(minutes)
  } else if (res[1] === 'second') {
    const seconds = dateObj.getSeconds() + res[0]

    dateObj.setSeconds(seconds)
  }

  const longDate = dateObj.toString()

  return removeOffset(longDate)
}

exports.sub = function(arg, date) {
  var arg = arg.toLowerCase()

  let res = arg.split(' ')

  if (res[1] == undefined) {
    arg = arg.substring(0, 3)

    const dateObj = date ? new Date(date) : new Date()

    const dayToNumber = {
      mon: 2,
      tue: 3,
      wed: 4,
      thu: 5,
      fri: 6,
      sat: 7,
      sun: 1
    }

    const num = dayToNumber[arg]

    let day = dateObj.getDay() + 1
    let addDay = day - num

    if (addDay < 0) {
      addDay = 7 + addDay
    } else if (addDay == 0) {
      addDay = 7
    }

    day = dateObj.getDate() - addDay

    dateObj.setDate(day)

    const longDate = dateObj.toString()

    return removeOffset(longDate)
  } else {
    res[0] = -parseInt(res[0])

    const arg = res[0] + ' ' + res[1]
    return exports.add(arg, date)
  }
}

const lowerThanTen = function(num) {
  return (num = num < 10 ? '0' + num : num)
}

const formatDate = function(string, values) {
  const regex = /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g

  const getValue = function(key) {
    if (values == null || typeof values === 'undefined') return null

    const value = values[key]
    const type = typeof value

    return type === 'string' || type === 'number' ? value : null
  }

  return string.replace(regex, function(match) {
    const key = match.substr(1, match.length - 2)

    const value = getValue(key)

    return value != null ? value : match
  })
}

const removeLastChar = function(string) {
  return string.substring(0, string.length - 1)
}

const convertDateHelper = function(format, date, length) {
  const shortMonthNames = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ]

  let newDate = ''
  let time = ''

  const res = format.split(format[2])
  let dateRes = date.split(format[2])

  if (res.length != 3 || dateRes.length != 3) {
    console.error(
      'Format error, make sure day, month or year is only written once or if all values are mentioned'
    )
    return
  }

  const timeRes = dateRes[dateRes.length - 1].split(' ')

  if (timeRes[1] !== undefined) {
    time = timeRes[1]
    dateRes[dateRes.length - 1] = timeRes[0]
  } else {
    time = '00:00:00'
  }

  const dateKeys = ['yy', 'mm', 'dd']

  dateKeys.forEach(key => {
    for (let i = 0; i < res.length; i++) {
      if (res[i] === 'mm' && key === 'mm') {
        dateRes[i] = dateRes[i].substr(0, 3)
        dateRes[i] = dateRes[i].toLowerCase()
        if (isNaN(dateRes[i]))
          dateRes[i] = shortMonthNames.findIndex(j => j === dateRes[i]) + 1
        newDate += dateRes[i] + '/'
      } else if (res[i] === 'yy' && key === 'yy') {
        newDate += dateRes[i] + '/'
      } else if (res[i] === 'dd' && key === 'dd') {
        newDate += dateRes[i]
      }
    }
  })

  newDate += ' ' + time

  const convertedDate = new Date(newDate)

  const longDate = convertedDate.toString()

  if (length == 'object') {
    return convertedDate
  } else {
    return removeOffset(longDate)
  }
}

const removeOffset = function(time) {
  let newTime = ''

  const res = time.split(' ')

  for (let i = 0; i < 5; i++) {
    newTime += res[i] + ' '
  }

  return newTime.trim()
}

const forEachWord = function(string, fn) {
  let i = -1

  string.replace(/\b([\w\-]+)\b/g, function(match, word) {
    fn.call(string, word, ++i)
    return match
  })

  return true
}

const zoneSwitch = function(firstOp, secondOp, hour, minute) {
  const operators = {
    '+': function(a, b) {
      return a + b
    },
    '-': function(a, b) {
      return a - b
    }
  }

  const hourZoneSwitch = {
    ECT: () => {
      return operators[firstOp](hour, 1)
    },
    EET: () => {
      return operators[firstOp](hour, 2)
    },
    ART: () => {
      return operators[firstOp](hour, 2)
    },
    EAT: () => {
      return operators[firstOp](hour, 3)
    },
    MET: () => {
      return operators[firstOp](hour, 3)
    },
    NET: () => {
      return operators[firstOp](hour, 4)
    },
    PLT: () => {
      return operators[firstOp](hour, 5)
    },
    IST: () => {
      return operators[firstOp](hour, 5)
    },
    BST: () => {
      return operators[firstOp](hour, 6)
    },
    VST: () => {
      return operators[firstOp](hour, 7)
    },
    CTT: () => {
      return operators[firstOp](hour, 8)
    },
    JST: () => {
      return operators[firstOp](hour, 9)
    },
    ACT: () => {
      return operators[firstOp](hour, 9)
    },
    AET: () => {
      return operators[firstOp](hour, 10)
    },
    SST: () => {
      return operators[firstOp](hour, 11)
    },
    NST: () => {
      return operators[firstOp](hour, 12)
    },
    MIT: () => {
      return operators[secondOp](hour, 11)
    },
    HST: () => {
      return operators[secondOp](hour, 10)
    },
    AST: () => {
      return operators[secondOp](hour, 9)
    },
    PST: () => {
      return operators[secondOp](hour, 8)
    },
    PNT: () => {
      return operators[secondOp](hour, 7)
    },
    MST: () => {
      return operators[secondOp](hour, 7)
    },
    CST: () => {
      return operators[secondOp](hour, 6)
    },
    EST: () => {
      return operators[secondOp](hour, 5)
    },
    IET: () => {
      return operators[secondOp](hour, 5)
    },
    PRT: () => {
      return operators[secondOp](hour, 4)
    },
    CNT: () => {
      return operators[secondOp](hour, 3)
    },
    AGT: () => {
      return operators[secondOp](hour, 3)
    },
    BET: () => {
      return operators[secondOp](hour, 3)
    },
    CAT: () => {
      return operators[secondOp](hour, 1)
    },
    default: () => {
      return hour + 0
    }
  }

  const oppHalfanHour = operators[firstOp](minute, 30)

  const minuteZoneSwitch = {
    MET: () => {
      return oppHalfanHour
    },
    IST: () => {
      return oppHalfanHour
    },
    ACT: () => {
      return oppHalfanHour
    },
    CNT: () => {
      return operators[secondOp](minute, 30)
    },
    default: () => {
      return null
    }
  }

  return [hourZoneSwitch, minuteZoneSwitch]
}
