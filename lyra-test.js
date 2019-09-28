const expect = require('chai').expect
const lr = require('./lyra')

describe('Testing convertDate function', () => {
  it('Returns Wed Mar 28 2018 13:30:10', () => {
    expect(
      lr.convertDate('yy dd-mm hh:min:ss', ' 2018 28-3 13:30:10')
    ).to.equal('Wed Mar 28 2018 13:30:10')
  })
})

describe('Testing getDate function', () => {
  it('Returns Saturday, 28/9/2019 8:06:54 pm', () => {
    expect(
      lr.getDate(
        '{dn}, {dd}/{mm}/{yy} {12hh}:{min}:{ss} {ampm}',
        'Sat Sep 28 2019 20:06:54 GMT+0100 (BST)'
      )
    ).to.equal('Saturday, 28/9/2019 8:06:54 pm')
  })
})

describe('Testing convertTimeByZone and getTimeByZone function', () => {
  it('Returns Sat, 30 Jun 2018 12:43:00', () => {
    expect(
      lr.convertTimeByZone('IST', 'JST', 'Sat, 30 Jun 2018 12:43:00')
    ).to.equal('Sat Jun 30 2018 16:13:00')
  })
})

describe('Testing getCC function', () => {
  it('Returns ["NET"]', () => {
    expect(lr.getCC(4).toString()).to.equal('NET')
  })
})

describe('Testing add function', () => {
  it('Returns Tue Jul 03 2018 16:13:00', () => {
    expect(lr.add('Tuesday', 'Sat Jun 30 2018 16:13:00')).to.equal(
      'Tue Jul 03 2018 16:13:00'
    )
  })
})

describe('Testing sub function', () => {
  it('Returns Wed Jun 27 2018 16:13:00', () => {
    expect(lr.sub('Wed', 'Sat Jun 30 2018 16:13:00')).to.equal(
      'Wed Jun 27 2018 16:13:00'
    )
  })
})

describe('Testing dateDifference function', () => {
  it('Returns 2 Months 16 Days 23 Hours 18 Minutes 10 Seconds', () => {
    expect(
      lr.dateDifference(
        'Fri Sep 14 2018 15:31:10',
        'Wed Jun 27 2018 16:13:00',
        'long'
      )
    ).to.equal('2 Months 16 Days 23 Hours 18 Minutes 10 Seconds')
  })
})
