const margin = { top: 13, right: 0, bottom: 35, left: 20 };
let centerPadding = 30;
let width = 340 - margin.left - margin.right;
let height = 670 - margin.top - margin.bottom;
let barHeight = Math.floor(height / 100);
let datacsv;
let data = [];
let title;
let subTitle;
let analyse;
let animate;
let animState = !1;
let fixState = !1;
let initialOutline = !1;
let ioYear;
let ioVariant;
let ageState = !1;
let firstRun = !1;
let tmpMcolor;
let tmpFcolor;
let birthyear;
let uiHolder;
let clickBirthYear = 0;
let currSize;
const pastMcolor = "#143250";
const pastFcolor = "#96282d";
const futureMcolor = "#2c74b5";
const futureFcolor = "#fd484e";
const highlight = "#333";
const oldColor = "#235587";
const mediumColor = "#5a91c8";
const youngColor = "#afc8e1";
let locale;
const state = {
  year: { hsh: "y", default: 2022 },
  agelimits: { hsh: "a", default: "20,66" },
  variant: { hsh: "v", default: 1 },
  outline: { hsh: "o" },
  language: { hsh: "l", default: "de" },
  size: { hsh: "s", default: "xl" },
  agegroups: { hsh: "g", default: !1 },
  birthyear: { hsh: "b", default: 0 },
};
const head = {
  de: "15. koordinierte Bev\u00f6lkerungsvoraus\u00adberechnung f\u00fcr Deutschland",
  en: "15th Coordinated Population Projection for Germany",
};
const langButton = {
  de: ["English", "Switch to English version"],
  en: ["Deutsch", "Zur deutschen Version"],
};
const headPast = {
  de: "Bev\u00f6lkerung in Deutschland",
  en: "Population in Germany",
};
const xMen = { de: "M\u00e4nner (in Tausend)", en: "Men (thousand)" };
const xWomen = { de: "Frauen (in Tausend)", en: "Women (thousand)" };
const ageStructure = { de: "Altersaufbau", en: "Age structure" };
const makeOutlineVerb = {
  de: "Altersaufbau fixieren",
  en: "Lock age structure",
};
const Variant = { de: "Varianten", en: "Variants" };
const variantName = {
  de: {
    v1: "Variante 1: Moderate Entwicklung der Geburtenh\u00e4ufigkeit und Lebenserwartung bei niedrigem Wanderungssaldo (G2L2W1)",
    v2: "Variante 2: Moderate Entwicklung der Geburtenh\u00e4ufigkeit, der Lebenserwartung und des Wanderungssaldos (G2L2W2)",
    v3: "Variante 3: Moderate Entwicklung der Geburtenh\u00e4ufigkeit und Lebenserwartung bei hohem Wanderungssaldo (G2L2W3)",
    v4: "Variante 4: Relativ alte Bev\u00f6lkerung (G1L3W1)",
    v5: "Variante 5: Relativ junge Bev\u00f6lkerung (G3L1W3)",
    v6: "Variante 6: Auswirkungen einer sinkenden Geburtenh\u00e4ufigkeit (G1L2W2)",
    v7: "Variante 7: Auswirkungen einer steigenden Geburtenh\u00e4ufigkeit  (G3L2W2)",
    v8: "Variante 8: Auswirkungen eines geringeren Anstiegs der Lebenserwartung (G2L1W2)",
    v9: "Variante 9: Auswirkungen eines st\u00e4rkeren Anstiegs der Lebenserwartung (G2L3W2)",
    v10: "Variante 10: Bev\u00f6lkerungsminimum (G1L1W1)",
    v11: "Variante 11: Bev\u00f6lkerungsmaximum (G3L3W3)",
    v12: "Variante 12: Sinkende Geburtenh\u00e4ufigkeit, moderate Entwicklung der Lebenserwartung, niedriger Wanderungssaldo (G1L2W1)",
    v13: "Variante 13: Geringer Anstieg der Lebenserwartung und niedriger Wanderungssaldo (G2L1W1)",
    v14: "Variante 14: Starker Anstieg der Lebenserwartung und niedriger Wanderungssaldo (G2L3W1)",
    v15: "Variante 15: Sinkende Geburtenh\u00e4ufigkeit und geringer Anstieg der Lebenserwartung (G1L1W2)",
    v16: "Variante 16: Sinkende Geburtenh\u00e4ufigkeit und starker Anstieg der Lebenserwartung (G1L3W2)",
    v17: "Variante 17: Steigende Geburtenh\u00e4ufigkeit und geringer Anstieg der Lebenserwartung (G3L1W2)",
    v18: "Variante 18: Steigende Geburtenh\u00e4ufigkeit und starker Anstieg der Lebenserwartung (G3L3W2)",
    v19: "Variante 19: Geringer Anstieg der Lebenserwartung und hoher Wanderungssaldo (G2L1W3)",
    v20: "Variante 20: Starker Anstieg der Lebenserwartung und hoher Wanderungssaldo (G2L3W3)",
    v21: "Variante 21: Steigende Geburtenh\u00e4ufigkeit und hoher Wanderungssaldo (G3L2W3)",
    v22: "Modellrechnung 1: Steigende Geburtenh\u00e4ufigkeit, niedriger Wanderungssaldo, geringer Anstieg der Lebenserwartun (G3L1W1)",
    v23: "Modellrechnung 2: Steigende Geburtenh\u00e4ufigkeit, niedriger Wanderungssaldo, moderater Anstieg der Lebenserwartung (G3L2W1)",
    v24: "Modellrechnung 3: Steigende Geburtenh\u00e4ufigkeit, niedriger Wanderungssaldo, starker Anstieg der Lebenserwartung (G3L3W1)",
    v25: "Modellrechnung 4: Sinkende Geburtenh\u00e4ufigkeit, hoher Wanderungssaldo, geringer Anstieg der Lebenserwartung (G1L1W3)",
    v26: "Modellrechnung 5: Sinkende Geburtenh\u00e4ufigkeit, hoher Wanderungssaldo, moderater Anstieg der Lebenserwartung (G1L2W3)",
    v27: "Modellrechnung 6: Sinkende Geburtenh\u00e4ufigkeit, hoher Wanderungssaldo, starker Anstieg der Lebenserwartung (G1L3W3)",
  },
  en: {
    v1: "Variant 1: Moderate development in fertility and life expectancy with low net migration (G2L2W1)",
    v2: "Variant 2: Moderate development of birth rate, life expectancy and net migration  (G2L2W2)",
    v3: "Variant 3: Moderate development in fertility and life expectancy with high net migration (G2L2W3)",
    v4: "Variant 4: Relatively old population (G1L3W1)",
    v5: "Variant 5: Relatively young population (G3L1W3)",
    v6: "Variant 6: Impacts of declining fertility  (G1L2W2)",
    v7: "Variant 7: Impacts of rising fertility (G3L2W2)",
    v8: "Variant 8: Impacts of a smaller increase in life expectancy (G2L1W2)",
    v9: "Variant 9: Impacts of a sharper increase in life expectancy (G2L3W2)",
    v10: "Variant 10: Minimum population (G1L1W1)",
    v11: "Variant 11: Maximum population (G3L3W3)",
    v12: "Variant 12: Impacts of declining fertility and low net migration (G1L2W1)",
    v13: "Variant 13: Slight increase in life expectancy and low net migration (G2L1W1)",
    v14: "Variant 14: Sharp increase in life expectancy and low net migration (G2L3W1)",
    v15: "Variant 15: Declining fertility and slight increase in life expectancy (G1L1W2)",
    v16: "Variant 16: Declining fertility and sharp increase in life expectancy (G1L3W2)",
    v17: "Variant 17: Increasing fertility and slight increase in life expectancy (G3L1W2)",
    v18: "Variant 18: Increasing fertility and sharp increase in life expectancy (G3L3W2)",
    v19: "Variant 19: Slight increase in life expectancy and high net migration (G2L1W3)",
    v20: "Variant 20: Sharp increase in life expectancy and high net migration  (G2L3W3)",
    v21: "Variant 21: Increasing fertility and high net migration (G3L2W3)",
    v22: "Model calculation 1: Increasing fertility, slight increase in life expectancy, low net migration (G3L1W1)",
    v23: "Model calculation 2: Increasing fertility, moderate increase in life expectancy, low net migration  (G3L2W1)",
    v24: "Model calculation 3: Increasing fertility, sharp increase in life expectancy, low net migration (G3L3W1)",
    v25: "Model calculation 4: Declining fertility, slight increase in life expectancy, high net migration  (G1L1W3)",
    v26: "Model calculation 5: Declining fertility, moderate increase in life expectancy, high net migration  (G1L2W3)",
    v27: "Model calculation 6: Declining fertility, sharp increase in life expectancy, high net migration (G1L3W3)",
  },
};
const shortVariant = {
  v0: "",
  v1: "V1 - G2L2W1",
  v2: "V2 - G2L2W2",
  v3: "V3 - G2L2W3",
  v4: "V4 - G1L3W1",
  v5: "V5 - G3L1W3",
  v6: "V6 - G1L2W2",
  v7: "V7 - G3L2W2",
  v8: "V8 - G2L1W2",
  v9: "V9 - G2L3W2",
  v10: "V10 - G1L1W1",
  v11: "V11 - G3L3W3",
  v12: "V12 - G1L2W1",
  v13: "V13 - G2L1W1",
  v14: "V14 - G2L3W1",
  v15: "V15 - G1L1W2",
  v16: "V16 - G1L3W2",
  v17: "V17 - G3L1W2",
  v18: "V18 - G3L3W2",
  v19: "V19 - G2L1W3",
  v20: "V20 - G2L3W3",
  v21: "V21 - G3L2W3",
  v22: "M1 - G3L1W1",
  v23: "M2 - G3L2W1",
  v24: "M3 - G3L3W1",
  v25: "M4 - G1L1W3",
  v26: "M5 - G1L2W3",
  v27: "M6 - G1L3W3",
};
const vBoxTitle = {
  de: "W\u00e4hlen Sie jeweils eine Annahme",
  en: "Choose a variant",
};
const vBoxTitleG = { de: "Geburtenh\u00e4ufigkeit", en: "Birth rate" };
const vBoxTitleL = {
  de: "Lebenserwartung",
  en: "Life expectancy",
};
const vBoxTitleW = { de: "Wanderungssaldo", en: "Net migration" };
const Assumptions = { de: "Variante", en: "Assumptions" };
const assumptionsTitleG = { de: "Geburtenrate 2070:", en: "Birth rate 2070:" };
const assumptionsTitleL = {
  de: "Lebenserwartung bei Geburt 2070:",
  en: "Life expectancy at birth 2070 in years:",
};
const assumptionsTitleW = {
  de: "Durchschnittlicher Wanderungssaldo:",
  en: "Average net migration:",
};
const radioTitle1 = { de: "niedrig", en: "low" };
const radioTitle2 = { de: "moderat", en: "medium" };
const radioTitle3 = { de: "hoch", en: "high" };
const assumptionDetails = {
  de: {
    g1: "R\u00fcckgang auf 1,44 Kinder je Frau",
    g2: "R\u00fcckgang in 2022, danach Anstieg auf 1,55 Kinder je Frau",
    g3: "R\u00fcckgang in 2022, danach Anstieg auf 1,67 Kinder je Frau",
    l1: "82,6 f\u00fcr Jungen<br>86,1 f\u00fcr M\u00e4dchen",
    l2: "84,6 f\u00fcr Jungen<br>88,2 f\u00fcr M\u00e4dchen",
    l3: "86,4 f\u00fcr Jungen<br>90,1 f\u00fcr M\u00e4dchen",
    w1: "180 000 Personen",
    w2: "290 000 Personen",
    w3: "400 000 Personen",
  },
  en: {
    g1: "decrease to 1.44 children per woman",
    g2: "decrease in 2022, then increase to 1.55 children per woman",
    g3: "decrease in 2022, then increase to 1.67 children per woman",
    l1: "82.6 for boys<br>86.1 for girls",
    l2: "84.6 for boys<br>88.2 for girls",
    l3: "86.4 for boys<br>90.1 for girls",
    w1: "180 000 persons per year",
    w2: "290 000 persons per year",
    w3: "400 000 persons per year",
  },
};
const tAge = { de: "Alter", en: "Age" };
const tMill = { de: "Millionen", en: "Million" };
const tRatio = { de: "Anteil", en: "Pct." };
const tTotal = { de: "Insgesamt", en: "Total" };
const oldAgeDepRatio = {
  de: [
    "Altenquotient:",
    "Personen der \u00e4lteren Altersgruppe je 100 Personen der mittleren Altersgruppe",
  ],
  en: [
    "Old-age dependency ratio:",
    "Number of people in the older age-group per 100 persons in the middle age-group",
  ],
};
const youngAgeDepRatio = {
  de: [
    "Jugendquotient:",
    "Personen der j\u00fcngeren Altersgruppe je 100 Personen der mittleren Altersgruppe",
  ],
  en: [
    "Young-age dependency ratio:",
    "Number of people in the younger age-group per 100 persons in the middle age-group",
  ],
};
const ageGroups = { de: "Altersgruppen \u00e4ndern", en: "Change age groups" };
const bYearTxt = { de: "Jahrgang", en: "Year of birth" };
const persTxt = { de: "Personen", en: "people" };
const embedLink = {
  de: ["Grafik einbetten", "Grafik in Webseite einbetten"],
  en: ["Embed this graphic", "embed graphic in website"],
};
const embedInfo = {
  de: "Um diese Grafik in Ihre Webseite einzubinden, kopieren Sie den folgenden Programmcode",
  en: "Copy the following code to embed this graphic in your website",
};
const furtherInfo = {
  de: [
    "Mehr erfahren",
    "\u00d6ffnet die Themenseite der Bev\u00f6lkerungsvoraus\u00adberechnung in einem neuen Fenster",
  ],
  en: ["Read more", "Opens Topic population projection in new window"],
};
const downloadInfo = {
  de: [
    "Daten herunterladen",
    "L\u00e4dt die Daten zur Bev\u00f6lkerungsvorausberechnung herunter",
  ],
  en: ["Download open data", "Download population projection data"],
};
const de = d3.locale({
  decimal: ",",
  thousands: "\u00a0",
  grouping: [3],
  currency: ["", " \u20ac"],
  dateTime: "%A, der %e. %B %Y, %X",
  date: "%e.%m.%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(
    " ",
  ),
  shortDays: "So Mo Di Mi Do Fr Sa".split(" "),
  months:
    "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(
      " ",
    ),
  shortMonths: "Jan Feb Mrz Apr Mai Jun Jul Aug Sep Okt Nov Dez".split(" "),
});
const en = d3.locale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["\u00a3", ""],
  dateTime: "%a %e %b %X %Y",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
  shortDays: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
  months:
    "January February March April May June July August September October November December".split(
      " ",
    ),
  shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
});
const fr = d3.locale({
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", " \u20ac"],
  dateTime: "%A, le %e %B %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: "dimanche lundi mardi mercredi jeudi vendredi samedi".split(" "),
  shortDays: "dim. lun. mar. mer. jeu. ven. sam.".split(" "),
  months:
    "janvier f\u00e9vrier mars avril mai juin juillet ao\u00fbt septembre octobre novembre d\u00e9cembre".split(
      " ",
    ),
  shortMonths:
    "janv. f\u00e9vr. mars avr. mai juin juil. ao\u00fbt sept. oct. nov. d\u00e9c.".split(
      " ",
    ),
});
let currVariant = "v1";
let tmpVariant = "v1";
const age1 = 99;
const year0 = 1950;
const year1 = 2070;
const beginProjection = 2022;
let year = 2022;
let ageLimits = [20, 67];
const speed = 700;
let language = "de";
let nrXticks = 7;
let nrYticks = 5;
document.addEventListener("DOMContentLoaded", function () {
  const a = document.getElementById("easel");
  const c = document.getElementById("makeOutline");
  const b = document.getElementById("ageLimiter");
  const e = document.getElementById("lang-button");
  hookEvent("easel", "mousewheel", MouseWheel);
  variantBox.onchange = function () {
    const g = switchVariant();
    changeVariant(g);
  };
  e.onclick = function () {
    switchLang();
  };
  a.ondblclick = function () {
    resetClicked();
  };
  a.ontouchstart = function () {
    touchStart(event);
  };
  a.ontouchmove = function () {
    touchMove(event);
  };
  a.ontouchend = function () {
    touchEnd(event);
  };
  a.onmouseover = function () {
    removeCircles();
  };
  c.onclick = function () {
    outline(year, tmpVariant);
  };
  b.onclick = function () {
    toggleAgeLimits();
  };
});
function switchVariant() {
  const a = document.querySelector('input[name="geburt"]:checked').value;
  const c = document.querySelector('input[name="leben"]:checked').value;
  const b = document.querySelector('input[name="wanderung"]:checked').value;
  switch (a + c + b) {
    case "g2l2w1":
      return "v1";
    case "g2l2w2":
      return "v2";
    case "g2l2w3":
      return "v3";
    case "g1l3w1":
      return "v4";
    case "g3l1w3":
      return "v5";
    case "g1l2w2":
      return "v6";
    case "g3l2w2":
      return "v7";
    case "g2l1w2":
      return "v8";
    case "g2l3w2":
      return "v9";
    case "g1l1w1":
      return "v10";
    case "g3l3w3":
      return "v11";
    case "g1l2w1":
      return "v12";
    case "g2l1w1":
      return "v13";
    case "g2l3w1":
      return "v14";
    case "g1l1w2":
      return "v15";
    case "g1l3w2":
      return "v16";
    case "g3l1w2":
      return "v17";
    case "g3l3w2":
      return "v18";
    case "g2l1w3":
      return "v19";
    case "g2l3w3":
      return "v20";
    case "g3l2w3":
      return "v21";
    case "g3l1w1":
      return "v22";
    case "g3l2w1":
      return "v23";
    case "g3l3w1":
      return "v24";
    case "g1l1w3":
      return "v25";
    case "g1l2w3":
      return "v26";
    case "g1l3w3":
      return "v27";
    default:
      return "v1";
  }
}
function reverseVariant(a) {
  switch (a) {
    case "v1":
      return "g2 l2 w1";
    case "v2":
      return "g2 l2 w2";
    case "v3":
      return "g2 l2 w3";
    case "v4":
      return "g1 l3 w1";
    case "v5":
      return "g3 l1 w3";
    case "v6":
      return "g1 l2 w2";
    case "v7":
      return "g3 l2 w2";
    case "v8":
      return "g2 l1 w2";
    case "v9":
      return "g2 l3 w2";
    case "v10":
      return "g1 l1 w1";
    case "v11":
      return "g3 l3 w3";
    case "v12":
      return "g1 l2 w1";
    case "v13":
      return "g2 l1 w1";
    case "v14":
      return "g2 l3 w1";
    case "v15":
      return "g1 l1 w2";
    case "v16":
      return "g1 l3 w2";
    case "v17":
      return "g3 l1 w2";
    case "v18":
      return "g3 l3 w2";
    case "v19":
      return "g2 l1 w3";
    case "v20":
      return "g2 l3 w3";
    case "v21":
      return "g3 l2 w3";
    case "v22":
      return "g3 l1 w1";
    case "v23":
      return "g3 l2 w1";
    case "v24":
      return "g3 l3 w1";
    case "v25":
      return "g1 l1 w3";
    case "v26":
      return "g1 l2 w3";
    case "v27":
      return "g1 l3 w3";
  }
}
function splitCombination(a) {
  return reverseVariant(a).split(" ");
}
function reformat(a) {
  a == "m" &&
    (d3.selectAll(".xl").style("display", "none"),
    d3.selectAll(".birthyear").select("text").style("fill", "none"),
    (nrXticks = 3),
    (nrYticks = 10),
    (margin.right = 10),
    (margin.left = 10),
    (centerPadding = 24),
    (width = 240 - margin.left - margin.right),
    (height = 480 - margin.top - margin.bottom),
    (barHeight = Math.floor(height / 100)),
    d3.select("#wrapper").style("width", "515px").style("height", "860px"),
    d3
      .select("#pageHeader")
      .style("width", "494px")
      .style("height", "40px")
      .style("top", "16px")
      .style("padding-left", "16px"),
    d3
      .select("#pageHeader h1")
      .style("margin-top", "3px")
      .style("font-size", "16px")
      .style("width", "310px")
      .style("padding-top", "0px"),
    d3
      .select(".logo-large")
      .style("margin-top", "3px")
      .style("width", "149px")
      .style("height", "37px")
      .style("right", "5px"),
    d3.select("#pageHeader ul").style("top", "85px").style("left", "15px"),
    d3
      .select("#easel")
      .style("width", "505px")
      .style("height", "480px")
      .style("top", "150px"),
    d3
      .select("#dashBoard")
      .style("width", "505px")
      .style("height", "145px")
      .style("left", "0px")
      .style("top", "665px"),
    d3
      .select("#assumptions")
      .style("top", "0px")
      .style("width", "240px")
      .style("left", "20px"),
    d3.select("#asmpH4").style("margin-bottom", "4px"),
    d3.select("#assumptions ul").style("padding-left", "16px"),
    d3.select("#data").style("left", "278px").style("top", "8px"),
    d3
      .selectAll("td")
      .style("padding-bottom", "3px")
      .style("padding-top", "4px"),
    d3.selectAll(".ageLimitTxt").style("border-right-width", "4px"),
    d3.select("#tAge").style("width", "64px"),
    d3.select("#tMill").style("width", "70px"),
    d3.select("#tRatio").style("width", "70px"),
    d3.selectAll(".age").style("font-size", "14px"),
    d3.selectAll(".tick text").style("font-size", "14px"),
    d3.select("#copyright").style("width", "505px").style("top", "835px"),
    d3.select(".logo").style("position", "absolute").style("right", "15px"),
    (currSize = "m"));
}
const readHash = function () {
  let a = location.hash.split("#")[1];
  if (a) {
    const c = a.substring(0, 48).replace(/[^0-9a-y,&=]/g, "");
    a = (function () {
      const g = {};
      c.split(/&/).forEach(function (d) {
        d = d.split(/=/);
        g[d[0]] = d[1];
      });
      return g;
    })();
    if (a.hasOwnProperty("a")) {
      let b = a.a.split(",");
      var e = +b[0];
      b = +b[1];
      e < b &&
        e > 0 &&
        b < 100 &&
        ((ageLimits[0] = e), (ageLimits[1] = b), (state.agelimits.val = a.a));
    }
    a.hasOwnProperty("v") &&
      ((e = +a.v),
      e >= 1 &&
        e <= 27 &&
        ((tmpVariant = "v" + e),
        year < beginProjection
          ? (currVariant = "v1")
          : (currVariant = tmpVariant)));
    a.hasOwnProperty("g") && (ageState = !0);
    a.hasOwnProperty("b") &&
      ((e = +a.b), e >= year0 - 100 && e <= year1 && (clickBirthYear = e));
    a.hasOwnProperty("l") &&
      ((language = ["de", "en"].indexOf(a.l) > -1 ? a.l : "de"),
      (state.language.val = language));
    a.hasOwnProperty("o") &&
      ((e = a.o.split("v")),
      +e[0] >= year0 &&
        +e[0] <= year1 &&
        ((initialOutline = !0),
        (ioYear = +e[0]),
        +e[1] >= 0 && +e[1] <= 27 && (ioVariant = "v" + e[1])));
    a.hasOwnProperty("s") && reformat(a.s);
    a.hasOwnProperty("y") &&
      ((a = +a.y),
      a >= year0 && a <= year1 && ((year = a), (state.year.val = year)));
  }
  window.innerWidth < 701 && reformat("m");
  d3.select("#lang-button").html(langButton[language][0]);
  d3.select("#lang-button").attr("title", langButton[language][1]);
  d3.select("#ageGroupsTxt").text(ageGroups[language]);
  d3.select("#makeOutlineTxt").text(makeOutlineVerb[language]);
  d3.select("#variantNick").text(Variant[language]);
  d3.select("#furtherInfo").text(furtherInfo[language][0]);
  d3.select("#furtherInfo").attr("title", furtherInfo[language][1]);
  d3.select("#downloadInfo").text(downloadInfo[language][0]);
  d3.select("#downloadInfo").attr("title", downloadInfo[language][1]);
  d3.select("#embedLink").text(embedLink[language][0]);
  d3.select("#embedLink").attr("title", embedLink[language][1]);
  d3.select("#tAge").text(tAge[language]);
  d3.select("#tMill").text(tMill[language]);
  d3.select("#tRatio").text(tRatio[language]);
  d3.select("#tTotal").text(tTotal[language]);
  d3.select(".assumptionsTitleG").html(assumptionsTitleG[language]);
  d3.select(".assumptionsTitleL").html(assumptionsTitleL[language]);
  d3.select(".assumptionsTitleW").html(assumptionsTitleW[language]);
  d3.select(".variantBoxTitle").html(vBoxTitle[language]);
  d3.select(".variantBoxTitleG").html(vBoxTitleG[language]);
  d3.select(".variantBoxTitleL").html(vBoxTitleL[language]);
  d3.select(".variantBoxTitleW").html(vBoxTitleW[language]);
  d3.select(".variantBoxRadioTitle1").html(radioTitle1[language]);
  d3.select(".variantBoxRadioTitle2").html(radioTitle2[language]);
  d3.select(".variantBoxRadioTitle3").html(radioTitle3[language]);
  if (language == "de" || language == "ru") locale = de;
  if (language == "fr" || language == "es") locale = fr;
  language == "en" && (locale = en);
};
readHash();
const mill = locale.numberFormat(".1f");
const perc = locale.numberFormat("%");
const thsd = locale.numberFormat("n");
const full = d3.format("0f");
const yearSlider = d3
  .slider()
  .value(year)
  .orientation("vertical")
  .min(year0)
  .max(year1)
  .step(1)
  .axis(
    d3.svg
      .axis()
      .orient("right")
      .tickValues([
        1950, 1960, 1970, 1980, 1990, 2e3, 2010, 2022, 2030, 2040, 2050, 2060,
        2070,
      ])
      .tickPadding(10)
      .tickFormat(d3.format("")),
  )
  .on("slide", function (a, c) {
    a.stopPropagation();
    scrollPyramid(c, currVariant);
  });
d3.select("#sliderHolder").call(yearSlider);
d3.select("#txLow").text("<" + ageLimits[0]);
d3.select("#txMed").text(ageLimits[0] + "\u2013" + (ageLimits[1] - 1));
d3.select("#txUp").text(ageLimits[1] + "+");
const x = d3.scale.linear().range([width, 0]);
const w = d3.scale.linear().range([0, width]);
const y = d3.scale.linear().range([barHeight / 2, height - barHeight / 2]);
const yy = d3.scale.linear().range([-barHeight, -height]).domain([0, age1]);
const xAxis = d3.svg
  .axis()
  .scale(x)
  .orient("bottom")
  .ticks(nrXticks)
  .tickSize(-height)
  .tickPadding(7);
const wAxis = d3.svg
  .axis()
  .scale(w)
  .orient("bottom")
  .ticks(nrXticks)
  .tickSize(-height)
  .tickPadding(7);
const svg = d3
  .select("#easel")
  .append("svg")
  .attr("width", 2 * (width + margin.left + margin.right) + centerPadding)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
const birthyears = svg.append("g").attr("class", "birthyears");
const dsv = d3.dsv(";", "text/plain");
dsv("data/15_bevoelkerungsvorausberechnung_daten.csv", function (a) {
  datacsv = d3
    .nest()
    .key(function (d) {
      return d.Simulationsjahr;
    })
    .key(function (d) {
      return d.mw;
    })
    .key(function (d) {
      return d.Variante;
    })
    .map(a);
  for (a = year0; a < year1 + 1; a++) {
    if (typeof datacsv[a].m[0] !== "undefined") {
      for (var c = 0; c < age1 + 1; c++) {
        data.push({
          year: +a,
          age: +c,
          mw: "1",
          variant: "v0",
          people: +datacsv[a].m[0][0]["Bev_" + c + "_" + (c + 1)],
        }),
          data.push({
            year: +a,
            age: +c,
            mw: "2",
            variant: "v0",
            people: +datacsv[a].w[0][0]["Bev_" + c + "_" + (c + 1)],
          });
      }
    }
    if (typeof datacsv[a].m[1] !== "undefined") {
      for (c = 0; c < age1 + 1; c++) {
        for (var b in datacsv[a].m) {
          data.push({
            year: +a,
            age: +c,
            mw: "1",
            variant: "v" + b,
            people: +datacsv[a].m[b][0]["Bev_" + c + "_" + (c + 1)],
          }),
            data.push({
              year: +a,
              age: +c,
              mw: "2",
              variant: "v" + b,
              people: +datacsv[a].w[b][0]["Bev_" + c + "_" + (c + 1)],
            });
        }
      }
    }
  }
  b = d3.max(data, function (d) {
    return d.people;
  });
  x.domain([0, b]);
  w.domain([0, b]);
  y.domain([year1 - age1, year1]);
  b = d3
    .select("#easel")
    .append("div")
    .attr("id", "ageSliderHolder")
    .style("height", height + "px")
    .style("top", margin.top - 3 + "px")
    .style("left", margin.left + centerPadding / 2 + width + "px");
  const e = b
    .append("div")
    .attr("class", "ageLimit")
    .style("top", y(year1 - ageLimits[0]) - 2 + "px")
    .text(ageLimits[0]);
  const g = b
    .append("div")
    .attr("class", "ageLimit")
    .attr("class", "ageLimit")
    .style("top", y(year1 - ageLimits[1]) - 2 + "px")
    .text(ageLimits[1]);
  b = d3
    .slider()
    .value(ageLimits)
    .orientation("vertical")
    .min(0)
    .max(100)
    .step(1)
    .animate(!1)
    .on("slide", function (d, f) {
      ageLimits = f;
      state.agelimits.val = ageLimits[0] + "," + ageLimits[1];
      rewriteHash();
      d3.select("#txLow").text("<" + ageLimits[0]);
      d3.select("#txMed").text(ageLimits[0] + "\u2013" + (ageLimits[1] - 1));
      d3.select("#txUp").text(ageLimits[1] + "+");
      e.style("top", y(year1 - ageLimits[0]) - 2 + "px").text(ageLimits[0]);
      g.style("top", y(year1 - ageLimits[1]) - 2 + "px").text(ageLimits[1]);
      paintAgeGroups();
      calcAgegroups();
    });
  d3.select("#ageSliderHolder").call(b);
  birthyears.attr("transform", "translate(0," + (y(year1) - y(year)) + ")");
  data = d3
    .nest()
    .key(function (d) {
      return d.year;
    })
    .key(function (d) {
      return d.variant;
    })
    .key(function (d) {
      return d.year - d.age;
    })
    .rollup(function (d) {
      return d.map(function (f) {
        return f.people;
      });
    })
    .map(data);
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 32)
    .attr("class", "xAxisLabel")
    .text(xMen[language]);
  svg
    .append("g")
    .attr("class", "x axis")
    .attr(
      "transform",
      "translate(" + (width + centerPadding) + "," + height + ")",
    )
    .call(wAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", 32)
    .attr("class", "xAxisLabel")
    .text(xWomen[language]);
  title = svg
    .append("text")
    .attr("class", "title")
    .attr("x", 90)
    .attr("y", 35)
    .text(year);
  subTitle = svg
    .append("text")
    .attr("class", "subtitle")
    .attr("x", 90)
    .attr("y", 0)
    .text(ageStructure[language]);
  pastFuture();
  birthyear = birthyears
    .selectAll(".birthyear")
    .data(d3.range(year0 - age1, year1 + 1, 1))
    .enter()
    .append("g")
    .attr("class", function (d) {
      return d == clickBirthYear ? "clickBirthYear" : "birthyear";
    })
    .attr("transform", function (d) {
      return "translate(0," + y(d) + ")";
    })
    .on("mouseover", function (d) {
      clickBirthYear == 0 &&
        (d3.select(this).select("text").style("opacity", 0),
        d3.select(this).select(".males").style("fill", highlight),
        d3.select(this).select(".females").style("fill", highlight),
        d3
          .select(this)
          .append("text")
          .attr("class", "hoverBirthYear")
          .attr("x", width - 10)
          .attr("y", -1)
          .attr("text-anchor", "end")
          .text(bYearTxt[language] + " " + d),
        d3
          .select(this)
          .append("text")
          .attr("class", "hoverBirthYear hoverTotals")
          .attr("x", width + centerPadding + 10)
          .attr("y", -1)
          .attr("text-anchor", "start")
          .text(
            thsd(
              1e3 *
                (data[year][tmpVariant][d][0] + data[year][tmpVariant][d][1]),
            ) +
              " " +
              persTxt[language],
          ));
    })
    .on("click", function (d) {
      clickBirthYear == 0 &&
        ((clickBirthYear = d),
        (state.birthyear.val = clickBirthYear),
        rewriteHash(),
        d3.select(this).attr("class", "clickBirthYear"));
    })
    .on("mouseout", function (d, f) {
      clickBirthYear == 0 &&
        (d3.select(this).select(".males").style("fill", tmpMcolor),
        d3.select(this).select(".females").style("fill", tmpFcolor),
        d3.select(this).select("text").style("opacity", 1),
        d3.select(this).selectAll(".hoverBirthYear").remove());
    });
  birthyear
    .selectAll("rect")
    .data(function (d) {
      d = data[year][tmpVariant][d] ? data[year][tmpVariant][d] : [0, 0];
      const f = d3.min(d);
      return [d[0], d[1], f, f];
    })
    .enter()
    .append("rect")
    .attr("y", -barHeight / 2)
    .attr("height", barHeight)
    .attr("class", function (d, f) {
      if (f == 0) return "males";
      if (f == 1) return "females";
      if (f > 1) return "symmetry";
    })
    .style("fill", function (d, f) {
      if (f == 0) return tmpMcolor;
      if (f == 1) return tmpFcolor;
    })
    .attr("x", function (d, f) {
      return f % 2 ? width + centerPadding : x(d);
    })
    .attr("width", function (d, f) {
      return f % 2 ? w(d) : width - x(d);
    });
  birthyear
    .append("text")
    .attr("x", width - 20)
    .attr("dy", ".35em")
    .text(function (d, f) {
      return (f + 6) % 5 ? "" : d;
    });
  svg
    .selectAll(".age")
    .data(d3.range(0, age1 + 2, nrYticks))
    .enter()
    .append("text")
    .attr("class", "age")
    .attr("y", function (d) {
      return y(year1 - d);
    })
    .attr("x", width + centerPadding / 2)
    .attr("dy", ".3em")
    .text(function (d) {
      return d;
    });
  uiHolder = svg
    .append("g")
    .attr(
      "transform",
      "translate(" + (2 * width + 5) + ", " + (height - 56) + ")",
    )
    .attr("class", "noPrint")
    .attr("class", "ui")
    .style("fill", "#2c74b5");
  uiHolder
    .append("path")
    .attr(
      "d",
      "M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z",
    )
    .attr("id", "pause")
    .style("opacity", 0);
  uiHolder
    .append("path")
    .attr(
      "d",
      "M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z",
    )
    .attr("id", "play");
  uiHolder
    .append("path")
    .attr("d", "M0 0h48v48H0z")
    .style("opacity", 0)
    .on("click", toggleAnimate);
  window.focus();
  d3.select(window).on("keydown", function () {
    switch (d3.event.keyCode) {
      case 37:
        year = Math.max(year0, year - 1);
        break;
      case 39:
        year = Math.min(year1, year + 1);
    }
    pyramid(year);
  });
  d3.select("#" + splitCombination(currVariant)[0]).attr("checked", !0);
  d3.select("#" + splitCombination(currVariant)[1]).attr("checked", !0);
  d3.select("#" + splitCombination(currVariant)[2]).attr("checked", !0);
  changeVariantText(currVariant);
  d3.select("#assumptionsHead").text(Assumptions[language]);
  calcAgegroups();
  currSize == "m" &&
    (d3.selectAll(".birthyear").style("fill", "none"),
    d3.selectAll(".age").style("font-size", "14px"),
    d3.selectAll(".tick text").style("font-size", "12px"),
    d3.selectAll(".xAxisLabel").style("font-size", "12px"));
  ageState && ((ageState = !1), (firstRun = !0), toggleAgeLimits());
  clickBirthYear != 0 &&
    (d3.select(".clickBirthYear").select(".males").style("fill", highlight),
    d3.select(".clickBirthYear").select(".females").style("fill", highlight),
    d3
      .select(".clickBirthYear")
      .append("text")
      .attr("class", "hoverBirthYear")
      .attr("x", width - 10)
      .attr("y", -1)
      .attr("text-anchor", "end")
      .text(bYearTxt[language] + " " + clickBirthYear),
    d3
      .select(".clickBirthYear")
      .append("text")
      .attr("class", "hoverBirthYear hoverTotals")
      .attr("x", width + centerPadding + 10)
      .attr("y", -1)
      .attr("text-anchor", "start")
      .text(
        thsd(
          1e3 *
            (data[year][tmpVariant][clickBirthYear][0] +
              data[year][tmpVariant][clickBirthYear][1]),
        ) +
          " " +
          persTxt[language],
      ));
  initialOutline && outline(ioYear, ioVariant);
  d3.selectAll(".hourglass").remove();
});
function hookEvent(a, c, b) {
  typeof a === "string" && (a = document.getElementById(a));
  a != null &&
    (a.addEventListener
      ? (c == "mousewheel" && a.addEventListener("DOMMouseScroll", b, !1),
        a.addEventListener(c, b, !1))
      : a.attachEvent && a.attachEvent("on" + c, b));
}
function MouseWheel(a) {
  a.preventDefault();
  a.stopPropagation();
  a = a || window.event;
  (a.detail ? -1 * a.detail : a.wheelDelta) > 0
    ? (year = Math.max(year0, year - 1))
    : (year = Math.min(year1, year + 1));
  scrollPyramid(year, currVariant);
}
var touchStart = function (a) {
  startY = a.touches[0].pageY;
  keepTrackOfTouches = a.touches.length;
};
var touchEnd = function (a) {
  keepTrackOfTouches = a.touches.length;
};
var touchMove = function (a) {
  a.preventDefault();
  keepTrackOfTouches == 1 &&
    (startY - a.touches[0].pageY < 0
      ? (year = Math.max(year0, year - 1))
      : (year = Math.min(year1, year + 1)),
    scrollPyramid(year, currVariant));
};
const baseSVG = d3.select("#easel").select("svg").append("g");
const upperPathG = baseSVG.append("g").attr("transform", "translate(0 -300)");
const handDrawn =
  "M381.277,493.511 C397.462,493.562 414.705,487.692 433.728,497.935 C444.402,503.682 442.406,514.239 429.874,521.472 C412.179,531.684 374.481,534.336 345.445,532.824 C336.632,532.365 287.429,527.906 273.59,519.24 C233.753,494.294 353.741,480.883 387.859,489.221";
const upperPath = upperPathG
  .append("path")
  .attr("d", handDrawn)
  .attr("class", "swoosh noPrint");
const totalLength = upperPath.node().getTotalLength();
const lowerPath = baseSVG
  .append("path")
  .attr("d", handDrawn)
  .attr("class", "swoosh noPrint");
upperPath
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength);
lowerPath
  .attr("stroke-dasharray", totalLength + " " + totalLength)
  .attr("stroke-dashoffset", totalLength);
function drawCircles() {
  upperPath
    .transition()
    .delay(150)
    .duration(400)
    .ease("linear")
    .attr("stroke-dashoffset", 0);
  lowerPath
    .transition()
    .delay(600)
    .duration(400)
    .ease("linear")
    .attr("stroke-dashoffset", 0);
  firstRun = !0;
}
function removeCircles() {
  firstRun && d3.selectAll(".swoosh").remove();
}
function toggleAgeLimits() {
  resetClicked();
  (ageState = !ageState)
    ? (birthyears.attr("pointer-events", "none"),
      d3.select("#ageSliderHolder").style("display", "block"),
      d3.selectAll(".age").style("fill", "#aaa"),
      paintAgeGroups(),
      d3.select("#txUp").style("border-right-color", oldColor),
      d3.select("#txMed").style("border-right-color", mediumColor),
      d3.select("#txLow").style("border-right-color", youngColor),
      (document.getElementById("ageLimiter").checked = !0),
      firstRun || drawCircles(),
      (state.agegroups.val = !0))
    : (d3.select("#txLow").style("border-right-color", "#fff"),
      d3.select("#txMed").style("border-right-color", "#fff"),
      d3.select("#txUp").style("border-right-color", "#fff"),
      birthyears.attr("pointer-events", "all"),
      d3.select("#ageSliderHolder").style("display", "none"),
      d3.selectAll(".age").style("fill", "#444"),
      d3.selectAll(".males").style("fill", tmpMcolor),
      d3.selectAll(".females").style("fill", tmpFcolor),
      (document.getElementById("ageLimiter").checked = !1),
      removeCircles(),
      (state.agegroups.val = !1));
  rewriteHash();
}
function paintAgeGroups() {
  const a = birthyear.filter(function (e) {
    return e <= year - ageLimits[1];
  });
  const c = birthyear.filter(function (e) {
    return e <= year - ageLimits[0] && e > year - ageLimits[1];
  });
  const b = birthyear.filter(function (e) {
    return e > year - ageLimits[0];
  });
  a.selectAll(".males").style("fill", oldColor);
  a.selectAll(".females").style("fill", oldColor);
  c.selectAll(".males").style("fill", mediumColor);
  c.selectAll(".females").style("fill", mediumColor);
  b.selectAll(".males").style("fill", youngColor);
  b.selectAll(".females").style("fill", youngColor);
}
function calcAgegroups() {
  year < beginProjection ? (tmpVariant = "v0") : (tmpVariant = currVariant);
  let a = 0;
  let c = 0;
  let b;
  for (b = 0; b < ageLimits[0]; b++) {
    a +=
      data[year][tmpVariant][year - b][0] + data[year][tmpVariant][year - b][1];
  }
  for (b = ageLimits[0]; b < ageLimits[1]; b++) {
    c +=
      data[year][tmpVariant][year - b][0] + data[year][tmpVariant][year - b][1];
  }
  b = +tmpVariant.split("v")[1];
  const e = +datacsv[year].m[b][0].Bev + (datacsv[year].w[b][0].Bev - 0);
  b = e - c - a;
  const g = (b / c) * 100;
  const d = (a / c) * 100;
  d3.select("#youngAbs").text(mill(a / 1e3));
  d3.select("#mediumAbs").text(mill(c / 1e3));
  d3.select("#oldAbs").text(mill(b / 1e3));
  d3.select("#totals").text(mill(e / 1e3));
  d3.select("#jungQ")
    .text(youngAgeDepRatio[language][0] + " " + full(d))
    .attr("data-tooltip", youngAgeDepRatio[language][1]);
  d3.select("#altQ")
    .html(oldAgeDepRatio[language][0] + " " + full(g))
    .attr("data-tooltip", oldAgeDepRatio[language][1]);
  d3.select("#youngPerc").text(perc(a / e));
  d3.select("#mediumPerc").text(perc(c / e));
  d3.select("#oldPerc").text(perc(b / e));
}
function resetClicked() {
  d3.selectAll(".hoverBirthYear").remove();
  d3.select(".clickBirthYear").select(".males").style("fill", tmpMcolor);
  d3.select(".clickBirthYear").select(".females").style("fill", tmpFcolor);
  d3.select(".clickBirthYear").select("text").style("opacity", 1);
  d3.select(".clickBirthYear").attr("class", "birthyear");
  clickBirthYear = 0;
  state.birthyear.val = clickBirthYear;
  rewriteHash();
}
function movingBirthYear() {
  clickBirthYear == 0
    ? d3.selectAll(".hoverBirthYear").remove()
    : year - clickBirthYear < 0 || year - clickBirthYear > 99
      ? resetClicked()
      : d3
          .select(".clickBirthYear")
          .select(".hoverTotals")
          .text(
            thsd(
              1e3 *
                (data[year][tmpVariant][clickBirthYear][0] +
                  data[year][tmpVariant][clickBirthYear][1]),
            ) +
              " " +
              persTxt[language],
          );
}
const headLine = d3.select("#headline");
const subheadline = d3.select("#subheadline");
const assumptionsDiv = d3.selectAll(".futureMeta");
function pastFuture() {
  const a = tmpMcolor;
  title.text(year);
  year < beginProjection
    ? (headLine.text(headPast[language]),
      subheadline.style("display", "none"),
      assumptionsDiv.style("display", "none"),
      (tmpVariant = "v0"),
      (state.variant.val = "2"),
      (tmpMcolor = pastMcolor),
      (tmpFcolor = pastFcolor))
    : (headLine.text(head[language]),
      subheadline.style("display", "inline"),
      subheadline.text(variantName[language][currVariant]),
      assumptionsDiv.style("display", "block"),
      (tmpVariant = currVariant),
      (state.variant.val = tmpVariant.substring(1, 3)),
      (tmpMcolor = futureMcolor),
      (tmpFcolor = futureFcolor));
  a != tmpMcolor &&
    (d3.selectAll(".males").style("fill", tmpMcolor),
    d3.selectAll(".females").style("fill", tmpFcolor),
    d3.select(".clickBirthYear").select(".males").style("fill", highlight),
    d3.select(".clickBirthYear").select(".females").style("fill", highlight));
}
function pyramid(a) {
  year = a;
  yearSlider.value(year);
  pastFuture();
  birthyears
    .transition()
    .ease("linear")
    .duration(speed)
    .attr("transform", "translate(0," + (y(year1) - y(year)) + ")");
  birthyear
    .selectAll("rect")
    .data(function (c) {
      c = data[year][tmpVariant][c] ? data[year][tmpVariant][c] : [0, 0];
      const b = d3.min(c);
      return [c[0], c[1], b, b];
    })
    .transition()
    .duration(speed)
    .attr("x", function (c, b) {
      return b % 2 ? width + centerPadding : x(c);
    })
    .attr("width", function (c, b) {
      return b % 2 ? w(c) : width - x(c);
    });
  movingBirthYear();
  calcAgegroups();
}
function changeVariant(a) {
  state.variant.val = a.substring(1, 3);
  rewriteHash();
  animState
    ? ((currVariant = a),
      stopAnimate(),
      (animState = !1),
      setTimeout("scrollPyramid(year, currVariant)", speed))
    : scrollPyramid(year, a);
  changeVariantText(a);
}
function changeVariantText(a) {
  d3.select("#assumptions")
    .transition()
    .each("end", function () {
      d3.select("#assumptionsHeadx").text(shortVariant[a]);
    });
  const c = document.querySelector('input[name="geburt"]:checked').value;
  const b = document.querySelector('input[name="leben"]:checked').value;
  const e = document.querySelector('input[name="wanderung"]:checked').value;
  d3.select(".assumptionG").html(assumptionDetails[language][c]);
  d3.select(".assumptionL").html(assumptionDetails[language][b]);
  d3.select(".assumptionW").html(assumptionDetails[language][e]);
}
function scrollPyramid(a, c) {
  year = a;
  yearSlider.value(year);
  currVariant = c;
  pastFuture();
  state.year.val = year;
  rewriteHash();
  birthyears.attr("transform", "translate(0," + (y(year1) - y(year)) + ")");
  birthyear
    .selectAll("rect")
    .data(function (b) {
      b = data[year][tmpVariant][b] ? data[year][tmpVariant][b] : [0, 0];
      const e = d3.min(b);
      return [b[0], b[1], e, e];
    })
    .attr("x", function (b, e) {
      return e % 2 ? width + centerPadding : x(b);
    })
    .attr("width", function (b, e) {
      return e % 2 ? w(b) : width - x(b);
    });
  movingBirthYear();
  calcAgegroups();
  ageState && paintAgeGroups();
}
const legendSvg = d3
  .select("#legend")
  .append("svg")
  .attr("width", "70px")
  .attr("height", "60px")
  .on("click", function (a) {
    outline(year, tmpVariant);
  });
const miniOutline = legendSvg
  .append("g")
  .attr("transform", "translate(10,0),scale(0.074)");
const yearLegend = legendSvg
  .append("text")
  .attr("x", 34)
  .attr("y", 30)
  .attr("class", "mini Year");
const variantLegend = legendSvg
  .append("text")
  .attr("x", 34)
  .attr("y", 57)
  .attr("class", "mini Variant");
function outline(a, c) {
  if ((fixState = !fixState)) {
    d3.select("#legend").select("button").style("display", "none");
    if (a < beginProjection) {
      var b = "v0";
      state.outline.val = a;
    } else (b = c), (state.outline.val = a + c);
    document.getElementById("makeOutline").checked = !0;
    rewriteHash();
    let e = svg
      .append("g")
      .attr(
        "transform",
        "translate(" + (width + centerPadding) + "," + height + ")",
      )
      .attr("class", "outline");
    let g = svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "outline");
    c = "M " + w(data[a][b][a][1]) + " 0 L";
    for (var d = "M " + x(data[a][b][a][0]) + " 0 L", f = 0; f < age1; f++) {
      const k = w(data[a][b][a - f][1]);
      const l = w(data[a][b][a - f - 1][1]);
      const m = x(data[a][b][a - f][0]);
      const n = x(data[a][b][a - f - 1][0]);
      const h = yy(f);
      c += " " + k + " " + h + " " + l + " " + h;
      d += " " + m + " " + h + " " + n + " " + h;
    }
    c += " " + w(data[a][b][a - age1][1]) + " " + yy(age1);
    d += " " + x(data[a][b][a - age1][0]) + " " + yy(age1);
    e.append("path").attr("d", c).attr("class", "envelopeCurve");
    g.append("path").attr("d", d).attr("class", "envelopeCurve");
    e = miniOutline
      .append("g")
      .attr(
        "transform",
        "translate(" + (width + centerPadding) + "," + height + ")",
      )
      .attr("class", "outline");
    g = miniOutline
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "outline");
    e.append("path").attr("d", c).attr("class", "envelopeCurve miniCurve");
    g.append("path").attr("d", d).attr("class", "envelopeCurve miniCurve");
    yearLegend.text(a);
    variantLegend.text(shortVariant[b]);
  } else {
    d3.selectAll(".outline").remove(),
      yearLegend.text(""),
      variantLegend.text(""),
      d3.select("#legend").select("button").style("display", "block"),
      delete state.outline.val,
      (document.getElementById("makeOutline").checked = !1),
      rewriteHash();
  }
}
function nextPyramid() {
  year += 1;
  year > year1
    ? (stopAnimate(),
      birthyears
        .transition()
        .delay(3 * speed)
        .duration(1e3)
        .style("opacity", 0)
        .each("end", function () {
          ageState && paintAgeGroups();
          scrollPyramid(year0, currVariant);
          birthyears
            .transition()
            .duration(1e3)
            .style("opacity", 1)
            .each("end", function () {
              startAnimate();
            });
        }))
    : (ageState && paintAgeGroups(),
      pyramid(year),
      (state.year.val = year),
      rewriteHash());
}
function startAnimate() {
  animate = setInterval(nextPyramid, speed);
  uiHolder.select("#play").style("opacity", 0);
  uiHolder.select("#pause").style("opacity", 1);
}
function stopAnimate() {
  uiHolder.select("#pause").style("opacity", 0);
  uiHolder.select("#play").style("opacity", 1);
  clearInterval(animate);
}
function toggleAnimate() {
  (animState = !animState) ? startAnimate() : stopAnimate();
}
function rewriteHash() {
  let a = "!";
  let c;
  for (c in state) {
    state[c].hasOwnProperty("val") &&
      state[c].val != state[c].default &&
      (a += state[c].hsh + "=" + state[c].val + "&");
  }
  a = a.replace(/=true/, "");
  location.hash = a.replace(/&$/, "");
}
function embed() {
  location.hash == "" ? (location.hash = "#&s=m") : (location.hash += "&s=m");
  window.prompt(
    embedInfo[language],
    '<iframe width="515px" height="860px" src="https://service.destatis.de/bevoelkerungspyramide' +
      location.hash +
      '" scrolling="no" frameborder="0"></iframe>',
  );
}
function switchLang() {
  state.language.val =
    state.language.val === "de" || void 0 === state.language.val ? "en" : "de";
  rewriteHash();
  location.reload();
}
const currYear = new Date().getFullYear();
const copy = document.querySelector(".js-copyright");
copy.innerHTML =
  '\u00a9 <svg x="0px" y="0px" width="12" height="10" viewBox="0 0 509 452"><g><rect x="5" y="40" fill="#1D1D1B" width="107" height="298"/><polygon fill="#CD1531" points="199,338 199,110 306,110 306,337.938"/><rect x="397" fill="#FCC200" width="107" height="338"/><rect y="376" fill="#B1B1B1" width="509" height="76"/></g></svg> <a href="https://www.destatis.de/impressum" title="Impressum Statistisches Bundesamt">Statistisches Bundesamt</a> (Destatis), Wiesbaden ' +
  currYear;
