const margin = { top: 13, right: 0, bottom: 35, left: 20 }
let centerPadding = 30
let width = 340 - margin.left - margin.right
let height = 670 - margin.top - margin.bottom
let barHeight = Math.floor(height / 100)
let title
let subTitle
let analyse
let animate
let animState = !1
let fixState = !1
let initialOutline = !1
let ioYear
let ioVariant
let ageState = !1
let firstRun = !1
let tmpMcolor
let tmpFcolor
let birthyear
let uiHolder
let clickBirthYear = 0
let currSize
const pastMcolor = '#143250'
const pastFcolor = '#96282d'
const futureMcolor = '#2c74b5'
const futureFcolor = '#fd484e'
const highlight = '#333'
const oldColor = '#235587'
const mediumColor = '#5a91c8'
const youngColor = '#afc8e1'
let locale
const state = {
  year: { hsh: 'y', default: 2022 },
  variant: { hsh: 'v', default: 1 },
  outline: { hsh: 'o' },
  size: { hsh: 's', default: 'xl' },
  agegroups: { hsh: 'g', default: !1 },
  birthyear: { hsh: 'b', default: 0 }
}
const xMen = 'Men'
const xWomen = 'Women'
const ageStructure = 'Age structure'
const makeOutlineVerb = 'Lock age structure'
const Variant = 'Variants'
const variantName = {
  v1: 'Variant 1: Principal',
  v2: 'Variant 2: High fertility',
  v3: 'Variant 3: Low fertility',
  v4: 'Variant 4: High life expectancy',
  v5: 'Variant 5: Low life expectancy',
  v6: 'Variant 6: High migration',
  v7: 'Variant 7: Low migration',
  v8: 'Variant 8: High population',
  v9: 'Variant 9: Low population',
  v10: 'Variant 10: Young age structure',
  v11: 'Variant 11: Old age structure'
}
const shortVariant = {
  v0: '',
  v1: 'V1 - B2L2M2',
  v2: 'V2 - B3L2M2',
  v3: 'V3 - B1L2M2',
  v4: 'V4 - B2L3M2',
  v5: 'V5 - B2L1M2',
  v6: 'V6 - B2L2M3',
  v7: 'V7 - B2L2M1',
  v8: 'V8 - B3L3M3',
  v9: 'V9 - B1L1M1',
  v10: 'V10 - B3L1M3',
  v11: 'V11 - B1L3M1'
}
const sBoxTitle = 'Make a selection'
const vBoxTitleB = 'Birth rate'
const vBoxTitleL = 'Life expectancy'
const vBoxTitleM = 'Net migration'
const Assumptions = 'Assumptions'
const assumptionsTitleG = 'Birth rate 2070:'
const assumptionsTitleL = 'Life expectancy at birth 2070 in years:'
const assumptionsTitleW = 'Average net migration:'
const radioTitle1 = 'low'
const radioTitle2 = 'medium'
const radioTitle3 = 'high'
const assumptionDetails = {
  b1: 'Average completed family size 1.61 children per woman',
  b2: 'Average completed family size 1.78 children per woman',
  b3: 'Average completed family size 1.91 children per woman',
  l1: '81.2 for boys<br>84.3 for girls',
  l2: '82.9 for boys<br>85.8 for girls',
  l3: '84.0 for boys<br>86.8 for girls',
  m1: '81 500 persons per year',
  m2: '173 000 persons per year',
  m3: '264 500 persons per year'
}
const tAge = 'Age'
const tThou = 'Thousand'
const tRatio = 'Pct.'
const tTotal = 'Total'
const oldAgeDepRatio = [
  'Old-age dependency ratio:',
  'Number of people in the older age-group per 100 persons in the middle age-group'
]
const youngAgeDepRatio = [
  'Young-age dependency ratio:',
  'Number of people in the younger age-group per 100 persons in the middle age-group'
]
const ageGroups = 'Change age groups'
const bYearTxt = 'Year of birth'
const persTxt = 'people'
const embedLink = ['Embed this graphic', 'embed graphic in website']
const embedInfo =
  'Copy the following code to embed this graphic in your website'
const furtherInfo = [
  'Read more',
  'Opens topic population projection in new window'
]
const downloadInfo = [
  'Download open data',
  'Download population projection data'
]
let currVariant = 'v1'
let tmpVariant = 'v1'
const age1 = 100
const year0 = 2010
const year1 = 2050
const beginProjection = 2018
let year = 2023
const ageLimits = [18, 65]
const speed = 700
let nrXticks = 7
let nrYticks = 5
locale = d3.locale({
  decimal: '.',
  thousands: ',',
  grouping: [3],
  currency: ['\u00a3', ''],
  dateTime: '%a %e %b %X %Y',
  date: '%d/%m/%Y',
  time: '%H:%M:%S',
  periods: ['AM', 'PM'],
  days: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
  shortDays: 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
  months:
    'January February March April May June July August September October November December'.split(
      ' '
    ),
  shortMonths: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ')
})

// attach a listener - fires when the initial HTML document has been completely loaded and parsed
document.addEventListener('DOMContentLoaded', function () {
  const a = document.getElementById('easel')
  const c = document.getElementById('makeOutline')
  hookEvent('easel', 'mousewheel', MouseWheel)
  variantMenuTop.onchange = function () {
    const g = switchVariant()
    changeVariant(g)
  }
  a.ondblclick = function () {
    resetClicked()
  }
  a.ontouchstart = function () {
    touchStart(event)
  }
  a.ontouchmove = function () {
    touchMove(event)
  }
  a.ontouchend = function () {
    touchEnd(event)
  }
  a.onmouseover = function () {
    removeCircles()
  }
  c.onclick = function () {
    outline(year, tmpVariant)
  }
})

// fn switch Variant
function switchVariant() {
  const a = document.getElementById('variantMenuTop').value
  switch (a) {
    case '1':
      return 'v1'
    case '2':
      return 'v2'
    case '3':
      return 'v3'
    case '4':
      return 'v4'
    case '5':
      return 'v5'
    case '6':
      return 'v6'
    case '7':
      return 'v7'
    case '8':
      return 'v8'
    case '9':
      return 'v9'
    case '10':
      return 'v10'
    case '11':
      return 'v11'
    default:
      return 'v1'
  }
}

// fn reverse Variant
function reverseVariant(a) {
  switch (a) {
    case 'v1':
      return 'b2 l2 m2'
    case 'v2':
      return 'b3 l2 m2'
    case 'v3':
      return 'b1 l2 m2'
    case 'v4':
      return 'b2 l3 m2'
    case 'v5':
      return 'b2 l1 m2'
    case 'v6':
      return 'b2 l2 m3'
    case 'v7':
      return 'b2 l2 m1'
    case 'v8':
      return 'b3 l3 m3'
    case 'v9':
      return 'b1 l1 m1'
    case 'v10':
      return 'b3 l1 m3'
    case 'v11':
      return 'b1 l3 m1'
  }
}

// fn split Combination
function splitCombination(a) {
  return reverseVariant(a).split(' ')
}

// fn reformat
function reformat(a) {
  a == 'm' &&
    (d3.selectAll('.xl').style('display', 'none'),
    d3.selectAll('.birthyear').select('text').style('fill', 'none'),
    (nrXticks = 3),
    (nrYticks = 10),
    (margin.right = 10),
    (margin.left = 10),
    (centerPadding = 24),
    (width = 240 - margin.left - margin.right),
    (height = 480 - margin.top - margin.bottom),
    (barHeight = Math.floor(height / 100)),
    d3.select('#wrapper').style('width', '515px').style('height', '860px'),
    d3
      .select('#pageHeader')
      .style('width', '494px')
      .style('height', '40px')
      .style('top', '16px')
      .style('padding-left', '16px'),
    d3
      .select('#pageHeader h1')
      .style('margin-top', '3px')
      .style('font-size', '16px')
      .style('width', '310px')
      .style('padding-top', '0px'),
    d3
      .select('.logo-large')
      .style('margin-top', '3px')
      .style('width', '149px')
      .style('height', '37px')
      .style('right', '5px'),
    d3.select('#pageHeader ul').style('top', '85px').style('left', '15px'),
    d3
      .select('#easel')
      .style('width', '505px')
      .style('height', '480px')
      .style('top', '150px'),
    d3
      .select('#dashBoard')
      .style('width', '505px')
      .style('height', '145px')
      .style('left', '0px')
      .style('top', '665px'),
    d3
      .select('#assumptions')
      .style('top', '0px')
      .style('width', '240px')
      .style('left', '20px'),
    d3.select('#asmpH4').style('margin-bottom', '4px'),
    d3.select('#assumptions ul').style('padding-left', '16px'),
    d3.select('#data').style('left', '278px').style('top', '8px'),
    d3
      .selectAll('td')
      .style('padding-bottom', '3px')
      .style('padding-top', '4px'),
    // d3.selectAll('.ageLimitTxt').style('border-right-width', '4px'),
    d3.select('#tAge').style('width', '64px'),
    d3.select('#tThou').style('width', '70px'),
    d3.select('#tRatio').style('width', '70px'),
    d3.selectAll('.age').style('font-size', '14px'),
    d3.selectAll('.tick text').style('font-size', '14px'),
    d3.select('#copyright').style('width', '505px').style('top', '835px'),
    d3.select('.logo').style('position', 'absolute').style('right', '15px'),
    (currSize = 'm'))
}

// fn read Hash
const readHash = function () {
  sel = document.getElementById('areaMenuTop')
  csvFilePath = 'data/' + 'd3_test_' + sel.value.replace(/ /g, '_') + '.csv'
  csvFileNm = 'd3_test_' + sel.value.replace(/ /g, '_') + '.csv'
  let a = location.hash.split('#')[1]
  if (a) {
    const c = a.substring(0, 48).replace(/[^0-9a-y,&=]/g, '')
    a = (function () {
      const g = {}
      c.split(/&/).forEach(function (d) {
        d = d.split(/=/)
        g[d[0]] = d[1]
      })
      return g
    })()
    if (a.hasOwnProperty('a')) {
      let b = a.a.split(',')
      var e = +b[0]
      b = +b[1]
      e < b &&
        e > 0 &&
        b < 100 &&
        ((ageLimits[0] = e), (ageLimits[1] = b), (state.agelimits.val = a.a))
    }
    a.hasOwnProperty('v') &&
      ((e = +a.v),
      e >= 1 &&
        e <= 27 &&
        ((tmpVariant = 'v' + e),
        year < beginProjection
          ? (currVariant = 'v1')
          : (currVariant = tmpVariant)))
    a.hasOwnProperty('g') && (ageState = !0)
    a.hasOwnProperty('b') &&
      ((e = +a.b), e >= year0 - 100 && e <= year1 && (clickBirthYear = e))
    a.hasOwnProperty('o') &&
      ((e = a.o.split('v')),
      +e[0] >= year0 &&
        +e[0] <= year1 &&
        ((initialOutline = !0),
        (ioYear = +e[0]),
        +e[1] >= 0 && +e[1] <= 27 && (ioVariant = 'v' + e[1])))
    a.hasOwnProperty('s') && reformat(a.s)
    a.hasOwnProperty('y') &&
      ((a = +a.y),
      a >= year0 && a <= year1 && ((year = a), (state.year.val = year)))
  }
  window.innerWidth < 701 && reformat('m')
  d3.select('#ageGroupsTxt').text(ageGroups)
  d3.select('#makeOutlineTxt').text(makeOutlineVerb)
  d3.select('#variantNick').text(Variant)
  d3.select('#furtherInfo').text(furtherInfo[0])
  d3.select('#furtherInfo').attr('title', furtherInfo[1])
  d3.select('#downloadLink')
    .attr('href', csvFilePath)
    .attr('download', csvFileNm)
    .attr('title', downloadInfo[1])
    .text(downloadInfo[0])
  d3.select('#embedLink').text(embedLink[0])
  d3.select('#embedLink').attr('title', embedLink[1])
  d3.select('#tAge').text(tAge)
  d3.select('#tThou').text(tThou)
  d3.select('#tRatio').text(tRatio)
  d3.select('#tTotal').text(tTotal)
  d3.select('.assumptionsTitleB').html(assumptionsTitleG)
  d3.select('.assumptionsTitleL').html(assumptionsTitleL)
  d3.select('.assumptionsTitleM').html(assumptionsTitleW)
  d3.select('.selectBoxTitle').html(sBoxTitle)
  d3.select('.variantBoxTitleB').html(vBoxTitleB)
  d3.select('.variantBoxTitleL').html(vBoxTitleL)
  d3.select('.variantBoxTitleM').html(vBoxTitleM)
  d3.select('.variantBoxRadioTitle1').html(radioTitle1)
  d3.select('.variantBoxRadioTitle2').html(radioTitle2)
  d3.select('.variantBoxRadioTitle3').html(radioTitle3)
}
readHash()

//locale.numberFormat().thousands
// fn format axis values when area is England
function engAxisFormat(d, i) {
  if (d / 1e4 >= 1) {
    d = d / 1e3 + 'k'
  } else {
    d = d3.format(',')(d)
  }
  return d
}

const mill = locale.numberFormat('.1f')
const perc = locale.numberFormat('%')
const thsd = locale.numberFormat('n')
const full = d3.format('0f')
const yearSlider = d3
  .slider()
  .value(year)
  .orientation('vertical')
  .min(year0)
  .max(year1)
  .step(1)
  .axis(
    d3.svg
      .axis()
      .orient('right')
      .tickValues([
        1950, 1960, 1970, 1980, 1990, 2e3, 2010, 2022, 2030, 2040, 2050, 2060,
        2070
      ])
      .tickPadding(10)
      .tickFormat(d3.format(''))
  )
  .on('slide', function (a, c) {
    a.stopPropagation()
    scrollPyramid(c, currVariant)
  })
d3.select('#sliderHolder').call(yearSlider)
d3.select('#txLow').text('<' + ageLimits[0])
d3.select('#txMed').text(ageLimits[0] + '\u2013' + (ageLimits[1] - 1))
d3.select('#txUp').text(ageLimits[1] + '+')
const x = d3.scale.linear().range([width, 0])
const w = d3.scale.linear().range([0, width])
const y = d3.scale.linear().range([barHeight / 2, height - barHeight / 2])
const yy = d3.scale.linear().range([-barHeight, -height]).domain([0, age1])
const xAxis = d3.svg
  .axis()
  .scale(x)
  .orient('bottom')
  .ticks(nrXticks)
  .tickSize(-height)
  .tickPadding(7)
  .tickFormat(engAxisFormat)
const wAxis = d3.svg
  .axis()
  .scale(w)
  .orient('bottom')
  .ticks(nrXticks)
  .tickSize(-height)
  .tickPadding(7)
  .tickFormat(engAxisFormat)
const svg = d3
  .select('#easel')
  .append('svg')
  .attr('width', 2 * (width + margin.left + margin.right) + centerPadding)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
const birthyears = svg.append('g').attr('class', 'birthyears')
const dsv = d3.dsv(',', 'text/plain')

// fn parse Data - this does all the heavy lifting
function parseData() {
  sel = document.getElementById('areaMenuTop')
  csvFileNm = 'data/' + 'd3_test_' + sel.value.replace(/ /g, '_') + '.csv'
  data = []
  dsv(csvFileNm, function (a) {
    datacsv = d3
      .nest()
      .key(function (d) {
        return d.Simulationsjahr
      })
      .key(function (d) {
        return d.mw
      })
      .key(function (d) {
        return d.Variante
      })
      .map(a)
    for (a = year0; a < year1 + 1; a++) {
      if (typeof datacsv[a].m[0] !== 'undefined') {
        for (var c = 0; c < age1 + 1; c++) {
          data.push({
            year: +a,
            age: +c,
            mw: '1',
            variant: 'v0',
            people: +datacsv[a].m[0][0]['Bev_' + c + '_' + (c + 1)]
          }),
            data.push({
              year: +a,
              age: +c,
              mw: '2',
              variant: 'v0',
              people: +datacsv[a].w[0][0]['Bev_' + c + '_' + (c + 1)]
            })
        }
      }
      if (typeof datacsv[a].m[1] !== 'undefined') {
        for (c = 0; c < age1 + 1; c++) {
          for (var b in datacsv[a].m) {
            data.push({
              year: +a,
              age: +c,
              mw: '1',
              variant: 'v' + b,
              people: +datacsv[a].m[b][0]['Bev_' + c + '_' + (c + 1)]
            }),
              data.push({
                year: +a,
                age: +c,
                mw: '2',
                variant: 'v' + b,
                people: +datacsv[a].w[b][0]['Bev_' + c + '_' + (c + 1)]
              })
          }
        }
      }
    }
    b = d3.max(data, function (d) {
      return d.people
    })
    x.domain([0, b])
    w.domain([0, b])
    y.domain([year1 - age1, year1])
    birthyears.attr('transform', 'translate(0,' + (y(year1) - y(year)) + ')')
    data = d3
      .nest()
      .key(function (d) {
        return d.year
      })
      .key(function (d) {
        return d.variant
      })
      .key(function (d) {
        return d.year - d.age
      })
      .rollup(function (d) {
        return d.map(function (f) {
          return f.people
        })
      })
      .map(data)
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 32)
      .attr('class', 'xAxisLabel')
      .text(xMen)
    svg
      .append('g')
      .attr('class', 'x axis')
      .attr(
        'transform',
        'translate(' + (width + centerPadding) + ',' + height + ')'
      )
      .call(wAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 32)
      .attr('class', 'xAxisLabel')
      .text(xWomen)
    title = svg
      .append('text')
      .attr('class', 'title')
      .attr('x', 90)
      .attr('y', 35)
      .text(year)
    subTitle = svg
      .append('text')
      .attr('class', 'subtitle')
      .attr('x', 90)
      .attr('y', 0)
      .text(ageStructure)
    pastFuture()
    birthyear = birthyears
      .selectAll('.birthyear')
      .data(d3.range(year0 - age1, year1 + 1, 1))
      .enter()
      .append('g')
      .attr('class', function (d) {
        return d == clickBirthYear ? 'clickBirthYear' : 'birthyear'
      })
      .attr('transform', function (d) {
        return 'translate(0,' + y(d) + ')'
      })
      .on('mouseover', function (d) {
        clickBirthYear == 0 &&
          (d3.select(this).select('text').style('opacity', 0),
          d3.select(this).select('.males').style('fill', highlight),
          d3.select(this).select('.females').style('fill', highlight),
          d3
            .select(this)
            .append('text')
            .attr('class', 'hoverBirthYear')
            .attr('x', width - 10)
            .attr('y', -1)
            .attr('text-anchor', 'end')
            .text(bYearTxt + ' ' + d),
          d3
            .select(this)
            .append('text')
            .attr('class', 'hoverBirthYear hoverTotals')
            .attr('x', width + centerPadding + 10)
            .attr('y', -1)
            .attr('text-anchor', 'start')
            .text(
              thsd(
                1 *
                  (data[year][tmpVariant][d][0] + data[year][tmpVariant][d][1])
              ) +
                ' ' +
                persTxt
            ))
      })
      .on('click', function (d) {
        clickBirthYear == 0 &&
          ((clickBirthYear = d),
          (state.birthyear.val = clickBirthYear),
          rewriteHash(),
          d3.select(this).attr('class', 'clickBirthYear'))
      })
      .on('mouseout', function (d, f) {
        clickBirthYear == 0 &&
          (d3.select(this).select('.males').style('fill', tmpMcolor),
          d3.select(this).select('.females').style('fill', tmpFcolor),
          d3.select(this).select('text').style('opacity', 1),
          d3.select(this).selectAll('.hoverBirthYear').remove())
      })
    birthyear
      .selectAll('rect')
      .data(function (d) {
        d = data[year][tmpVariant][d] ? data[year][tmpVariant][d] : [0, 0]
        const f = d3.min(d)
        return [d[0], d[1], f, f]
      })
      .enter()
      .append('rect')
      .attr('y', -barHeight / 2)
      .attr('height', barHeight)
      .attr('class', function (d, f) {
        if (f == 0) return 'males'
        if (f == 1) return 'females'
        if (f > 1) return 'symmetry'
      })
      .style('fill', function (d, f) {
        if (f == 0) return tmpMcolor
        if (f == 1) return tmpFcolor
      })
      .attr('x', function (d, f) {
        return f % 2 ? width + centerPadding : x(d)
      })
      .attr('width', function (d, f) {
        return f % 2 ? w(d) : width - x(d)
      })
    birthyear
      .append('text')
      .attr('x', width - 20)
      .attr('dy', '.35em')
      .text(function (d, f) {
        return (f + 6) % 5 ? '' : d
      })
    svg
      .selectAll('.age')
      .data(d3.range(0, age1 + 2, nrYticks))
      .enter()
      .append('text')
      .attr('class', 'age')
      .attr('y', function (d) {
        return y(year1 - d)
      })
      .attr('x', width + centerPadding / 2)
      .attr('dy', '.3em')
      .text(function (d) {
        return d
      })
    uiHolder = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + (2 * width + 5) + ', ' + (height - 56) + ')'
      )
      .attr('class', 'noPrint')
      .attr('class', 'ui')
      .style('fill', '#2c74b5')
    uiHolder
      .append('path')
      .attr(
        'd',
        'M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z'
      )
      .attr('id', 'pause')
      .style('opacity', 0)
    uiHolder
      .append('path')
      .attr(
        'd',
        'M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'
      )
      .attr('id', 'play')
    uiHolder
      .append('path')
      .attr('d', 'M0 0h48v48H0z')
      .style('opacity', 0)
      .on('click', toggleAnimate)
    window.focus()
    d3.select(window).on('keydown', function () {
      switch (d3.event.keyCode) {
        case 37:
          year = Math.max(year0, year - 1)
          break
        case 39:
          year = Math.min(year1, year + 1)
      }
      pyramid(year)
    })
    d3.select('#' + splitCombination(currVariant)[0]).attr('checked', !0)
    d3.select('#' + splitCombination(currVariant)[1]).attr('checked', !0)
    d3.select('#' + splitCombination(currVariant)[2]).attr('checked', !0)
    changeVariantText(currVariant)
    d3.select('#assumptionsHead').text(Assumptions)
    calcAgegroups()
    currSize == 'm' &&
      (d3.selectAll('.birthyear').style('fill', 'none'),
      d3.selectAll('.age').style('font-size', '14px'),
      d3.selectAll('.tick text').style('font-size', '12px'),
      d3.selectAll('.xAxisLabel').style('font-size', '12px'))
    ageState && ((ageState = !1), (firstRun = !0))
    clickBirthYear != 0 &&
      (d3.select('.clickBirthYear').select('.males').style('fill', highlight),
      d3.select('.clickBirthYear').select('.females').style('fill', highlight),
      d3
        .select('.clickBirthYear')
        .append('text')
        .attr('class', 'hoverBirthYear')
        .attr('x', width - 10)
        .attr('y', -1)
        .attr('text-anchor', 'end')
        .text(bYearTxt + ' ' + clickBirthYear),
      d3
        .select('.clickBirthYear')
        .append('text')
        .attr('class', 'hoverBirthYear hoverTotals')
        .attr('x', width + centerPadding + 10)
        .attr('y', -1)
        .attr('text-anchor', 'start')
        .text(
          thsd(
            1 *
              (data[year][tmpVariant][clickBirthYear][0] +
                data[year][tmpVariant][clickBirthYear][1])
          ) +
            ' ' +
            persTxt
        ))
    initialOutline && outline(ioYear, ioVariant)
    d3.selectAll('.hourglass').remove()
  })
}

// fn hook Event
function hookEvent(a, c, b) {
  typeof a === 'string' && (a = document.getElementById(a))
  a != null &&
    (a.addEventListener
      ? (c == 'mousewheel' && a.addEventListener('DOMMouseScroll', b, !1),
        a.addEventListener(c, b, !1))
      : a.attachEvent && a.attachEvent('on' + c, b))
}

// fn Mouse Wheel
function MouseWheel(a) {
  a.preventDefault()
  a.stopPropagation()
  a = a || window.event
  ;(a.detail ? -1 * a.detail : a.wheelDelta) > 0
    ? (year = Math.max(year0, year - 1))
    : (year = Math.min(year1, year + 1))
  scrollPyramid(year, currVariant)
}

var touchStart = function (a) {
  startY = a.touches[0].pageY
  keepTrackOfTouches = a.touches.length
}
var touchEnd = function (a) {
  keepTrackOfTouches = a.touches.length
}
var touchMove = function (a) {
  a.preventDefault()
  keepTrackOfTouches == 1 &&
    (startY - a.touches[0].pageY < 0
      ? (year = Math.max(year0, year - 1))
      : (year = Math.min(year1, year + 1)),
    scrollPyramid(year, currVariant))
}

const baseSVG = d3.select('#easel').select('svg').append('g')
const upperPathG = baseSVG.append('g').attr('transform', 'translate(0 -300)')
const handDrawn =
  'M381.277,493.511 C397.462,493.562 414.705,487.692 433.728,497.935 C444.402,503.682 442.406,514.239 429.874,521.472 C412.179,531.684 374.481,534.336 345.445,532.824 C336.632,532.365 287.429,527.906 273.59,519.24 C233.753,494.294 353.741,480.883 387.859,489.221'
const upperPath = upperPathG
  .append('path')
  .attr('d', handDrawn)
  .attr('class', 'swoosh noPrint')
const totalLength = upperPath.node().getTotalLength()
const lowerPath = baseSVG
  .append('path')
  .attr('d', handDrawn)
  .attr('class', 'swoosh noPrint')
upperPath
  .attr('stroke-dasharray', totalLength + ' ' + totalLength)
  .attr('stroke-dashoffset', totalLength)
lowerPath
  .attr('stroke-dasharray', totalLength + ' ' + totalLength)
  .attr('stroke-dashoffset', totalLength)

// fn draw Circles
function drawCircles() {
  upperPath
    .transition()
    .delay(150)
    .duration(400)
    .ease('linear')
    .attr('stroke-dashoffset', 0)
  lowerPath
    .transition()
    .delay(600)
    .duration(400)
    .ease('linear')
    .attr('stroke-dashoffset', 0)
  firstRun = !0
}

// fn remove Circles
function removeCircles() {
  firstRun && d3.selectAll('.swoosh').remove()
}

// fn calc Agegroups
function calcAgegroups() {
  year < beginProjection ? (tmpVariant = 'v0') : (tmpVariant = currVariant)
  let a = 0
  let c = 0
  let b
  for (b = 0; b < ageLimits[0]; b++) {
    a +=
      data[year][tmpVariant][year - b][0] + data[year][tmpVariant][year - b][1]
  }
  for (b = ageLimits[0]; b < ageLimits[1]; b++) {
    c +=
      data[year][tmpVariant][year - b][0] + data[year][tmpVariant][year - b][1]
  }
  b = +tmpVariant.split('v')[1]
  const e = +datacsv[year].m[b][0].Bev + (datacsv[year].w[b][0].Bev - 0)
  b = e - c - a
  const g = (b / c) * 100
  const d = (a / c) * 100
  d3.select('#youngAbs').text(mill(a / 1e3))
  d3.select('#mediumAbs').text(mill(c / 1e3))
  d3.select('#oldAbs').text(mill(b / 1e3))
  d3.select('#totals').text(mill(e / 1e3))
  d3.select('#youngQ')
    .text(youngAgeDepRatio[0] + ' ' + full(d))
    .attr('data-tooltip', youngAgeDepRatio[1])
  d3.select('#oldQ')
    .html(oldAgeDepRatio[0] + ' ' + full(g))
    .attr('data-tooltip', oldAgeDepRatio[1])
  d3.select('#youngPerc').text(perc(a / e))
  d3.select('#mediumPerc').text(perc(c / e))
  d3.select('#oldPerc').text(perc(b / e))
}

// fn reset Clicked
function resetClicked() {
  d3.selectAll('.hoverBirthYear').remove()
  d3.select('.clickBirthYear').select('.males').style('fill', tmpMcolor)
  d3.select('.clickBirthYear').select('.females').style('fill', tmpFcolor)
  d3.select('.clickBirthYear').select('text').style('opacity', 1)
  d3.select('.clickBirthYear').attr('class', 'birthyear')
  clickBirthYear = 0
  state.birthyear.val = clickBirthYear
  rewriteHash()
}

// fn moving Birth Year
function movingBirthYear() {
  clickBirthYear == 0
    ? d3.selectAll('.hoverBirthYear').remove()
    : year - clickBirthYear < 0 || year - clickBirthYear > 99
    ? resetClicked()
    : d3
        .select('.clickBirthYear')
        .select('.hoverTotals')
        .text(
          thsd(
            1 *
              (data[year][tmpVariant][clickBirthYear][0] +
                data[year][tmpVariant][clickBirthYear][1])
          ) +
            ' ' +
            persTxt
        )
}

const headLine = d3.select('#headline')
const subheadline = d3.select('#subheadline')
const assumptionsDiv = d3.selectAll('.futureMeta')

// fn past Future
function pastFuture() {
  const head =
    '2018 Based Population Projection for' +
    '\xa0' +
    document.getElementById('areaMenuTop').value
  const headPast =
    'Population in' + '\xa0' + document.getElementById('areaMenuTop').value
  const a = tmpMcolor
  title.text(year)
  year < beginProjection
    ? (headLine.text(headPast),
      subheadline.style('display', 'none'),
      assumptionsDiv.style('display', 'block'),
      (tmpVariant = 'v0'),
      (state.variant.val = '2'),
      (tmpMcolor = pastMcolor),
      (tmpFcolor = pastFcolor))
    : (headLine.text(head),
      subheadline.style('display', 'inline'),
      subheadline.text(variantName[currVariant]),
      assumptionsDiv.style('display', 'block'),
      (tmpVariant = currVariant),
      (state.variant.val = tmpVariant.substring(1, 3)),
      (tmpMcolor = futureMcolor),
      (tmpFcolor = futureFcolor))
  a != tmpMcolor &&
    (d3.selectAll('.males').style('fill', tmpMcolor),
    d3.selectAll('.females').style('fill', tmpFcolor),
    d3.select('.clickBirthYear').select('.males').style('fill', highlight),
    d3.select('.clickBirthYear').select('.females').style('fill', highlight))
}

// fn pyramid
function pyramid(a) {
  year = a
  yearSlider.value(year)
  pastFuture()
  birthyears
    .transition()
    .ease('linear')
    .duration(speed)
    .attr('transform', 'translate(0,' + (y(year1) - y(year)) + ')')
  birthyear
    .selectAll('rect')
    .data(function (c) {
      c = data[year][tmpVariant][c] ? data[year][tmpVariant][c] : [0, 0]
      const b = d3.min(c)
      return [c[0], c[1], b, b]
    })
    .transition()
    .duration(speed)
    .attr('x', function (c, b) {
      return b % 2 ? width + centerPadding : x(c)
    })
    .attr('width', function (c, b) {
      return b % 2 ? w(c) : width - x(c)
    })
  movingBirthYear()
  calcAgegroups()
}

// fn change Variant
function changeVariant(a) {
  state.variant.val = a.substring(1, 3)
  rewriteHash()
  animState
    ? ((currVariant = a),
      stopAnimate(),
      (animState = !1),
      setTimeout('scrollPyramid(year, currVariant)', speed))
    : scrollPyramid(year, a)
  changeVariantText(a)
}

// fn change Variant Text
function changeVariantText(a) {
  d3.select('#assumptions')
    .transition()
    .each('end', function () {
      d3.select('#assumptionsHeadx').text(shortVariant[a])
    })
  const c = splitCombination(a)[0]
  const b = splitCombination(a)[1]
  const e = splitCombination(a)[2]
  d3.select('.assumptionB').html(assumptionDetails[c])
  d3.select('.assumptionL').html(assumptionDetails[b])
  d3.select('.assumptionM').html(assumptionDetails[e])
}

// fn scroll Pyramid
function scrollPyramid(a, c) {
  year = a
  yearSlider.value(year)
  currVariant = c
  pastFuture()
  state.year.val = year
  rewriteHash()
  birthyears.attr('transform', 'translate(0,' + (y(year1) - y(year)) + ')')
  birthyear
    .selectAll('rect')
    .data(function (b) {
      b = data[year][tmpVariant][b] ? data[year][tmpVariant][b] : [0, 0]
      const e = d3.min(b)
      return [b[0], b[1], e, e]
    })
    .attr('x', function (b, e) {
      return e % 2 ? width + centerPadding : x(b)
    })
    .attr('width', function (b, e) {
      return e % 2 ? w(b) : width - x(b)
    })
  movingBirthYear()
  calcAgegroups()
}

const legendSvg = d3
  .select('#legend')
  .append('svg')
  .attr('width', '70px')
  .attr('height', '60px')
  .on('click', function (a) {
    outline(year, tmpVariant)
  })
const miniOutline = legendSvg
  .append('g')
  .attr('transform', 'translate(10,0),scale(0.074)')
const yearLegend = legendSvg
  .append('text')
  .attr('x', 34)
  .attr('y', 30)
  .attr('class', 'mini Year')
const variantLegend = legendSvg
  .append('text')
  .attr('x', 34)
  .attr('y', 57)
  .attr('class', 'mini Variant')

// fn outline
function outline(a, c) {
  if ((fixState = !fixState)) {
    d3.select('#legend').select('button').style('display', 'none')
    if (a < beginProjection) {
      var b = 'v0'
      state.outline.val = a
    } else (b = c), (state.outline.val = a + c)
    document.getElementById('makeOutline').checked = !0
    rewriteHash()
    let e = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + (width + centerPadding) + ',' + height + ')'
      )
      .attr('class', 'outline')
    let g = svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'outline')
    c = 'M ' + w(data[a][b][a][1]) + ' 0 L'
    for (var d = 'M ' + x(data[a][b][a][0]) + ' 0 L', f = 0; f < age1; f++) {
      const k = w(data[a][b][a - f][1])
      const l = w(data[a][b][a - f - 1][1])
      const m = x(data[a][b][a - f][0])
      const n = x(data[a][b][a - f - 1][0])
      const h = yy(f)
      c += ' ' + k + ' ' + h + ' ' + l + ' ' + h
      d += ' ' + m + ' ' + h + ' ' + n + ' ' + h
    }
    c += ' ' + w(data[a][b][a - age1][1]) + ' ' + yy(age1)
    d += ' ' + x(data[a][b][a - age1][0]) + ' ' + yy(age1)
    e.append('path').attr('d', c).attr('class', 'envelopeCurve')
    g.append('path').attr('d', d).attr('class', 'envelopeCurve')
    e = miniOutline
      .append('g')
      .attr(
        'transform',
        'translate(' + (width + centerPadding) + ',' + height + ')'
      )
      .attr('class', 'outline')
    g = miniOutline
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'outline')
    e.append('path').attr('d', c).attr('class', 'envelopeCurve miniCurve')
    g.append('path').attr('d', d).attr('class', 'envelopeCurve miniCurve')
    yearLegend.text(a)
    variantLegend.text(shortVariant[b])
  } else {
    d3.selectAll('.outline').remove(),
      yearLegend.text(''),
      variantLegend.text(''),
      d3.select('#legend').select('button').style('display', 'block'),
      delete state.outline.val,
      (document.getElementById('makeOutline').checked = !1),
      rewriteHash()
  }
}

// fn next Pyramid
function nextPyramid() {
  year += 1
  year > year1
    ? (stopAnimate(),
      birthyears
        .transition()
        .delay(3 * speed)
        .duration(1e3)
        .style('opacity', 0)
        .each('end', function () {
          scrollPyramid(year0, currVariant)
          birthyears
            .transition()
            .duration(1e3)
            .style('opacity', 1)
            .each('end', function () {
              startAnimate()
            })
        }))
    : (pyramid(year), (state.year.val = year), rewriteHash())
}

// fn start Animate
function startAnimate() {
  animate = setInterval(nextPyramid, speed)
  uiHolder.select('#play').style('opacity', 0)
  uiHolder.select('#pause').style('opacity', 1)
}

// fn stop Animate
function stopAnimate() {
  uiHolder.select('#pause').style('opacity', 0)
  uiHolder.select('#play').style('opacity', 1)
  clearInterval(animate)
}

// fn toggle Animate
function toggleAnimate() {
  ;(animState = !animState) ? startAnimate() : stopAnimate()
}

// fn rewrite Hash
function rewriteHash() {
  let a = '!'
  let c
  for (c in state) {
    state[c].hasOwnProperty('val') &&
      state[c].val != state[c].default &&
      (a += state[c].hsh + '=' + state[c].val + '&')
  }
  a = a.replace(/=true/, '')
  location.hash = a.replace(/&$/, '')
}

// fn embed
function embed() {
  location.hash == '' ? (location.hash = '#&s=m') : (location.hash += '&s=m')
  window.prompt(
    embedInfo,
    '<iframe width="515px" height="860px" src="https://service.destatis.de/bevoelkerungspyramide' +
      location.hash +
      '" scrolling="no" frameborder="0"></iframe>'
  )
}

const currYear = new Date().getFullYear()
const copy = document.querySelector('.js-copyright')
copy.innerHTML =
  '\u00a9 <a href="https://www.strategyunitwm.nhs.uk/" target="_blank" title="Imprint Strategy Unit">The Strategy Unit</a>, hosted by NHS Midlands and Lancashire CSU ' +
  currYear

parseData()

// fn update - attach a listener to areaMenuTop that will be notified on change
document
  .getElementById('areaMenuTop')
  .addEventListener('change', function update() {
    // select elements to remove by their class name
    d3.selectAll('.title').remove()
    d3.selectAll('.axis').remove()
    d3.selectAll('.ui').remove()
    d3.selectAll('.birthyear').remove()
    readHash()
    parseData()
  })

/*
// equivalent to above - not sure which method is more idiomatic
// fn update - attach a listener to areaMenuTop that will be notified on change
areaMenuTop.onchange = function update() {
  // select elements to remove by their class name
  d3.selectAll('.title').remove()
  d3.selectAll('.axis').remove()
  d3.selectAll('.ui').remove()
  d3.selectAll('.birthyear').remove()
  parseData()
}
*/
