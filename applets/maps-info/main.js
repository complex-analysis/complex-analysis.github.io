/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoMercator()
  })
);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0,
  strokeOpacity: 0
});
// Add background polygo
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.15,
  strokeWidth: 0.5,
  stroke: root.interfaceColors.get("background")
});

// Create polygon series for circles
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var circleTemplate = am5.Template.new({
  tooltipText: "{name}: {value}"
});

var bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    calculateAggregates: true,
    valueField: "value",
    polygonIdField: "id"
  })
);

bubbleSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 10,
      templateField: "circleTemplate"
    }, circleTemplate)
  });
});

bubbleSeries.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 30,
  key: "radius",
  dataField: "value"
}]);

var colors = am5.ColorSet.new(root, {});

bubbleSeries.data.setAll([
  {
    id: "AF",
    name: "Afghanistan",
    value: 20,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "AL",
    name: "Albania",
    value: 53,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "DZ",
    name: "Algeria",
    value: 169,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "AO",
    name: "Angola",
    value: 10,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "AR",
    name: "Argentina",
    value: 3906,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "AM",
    name: "Armenia",
    value: 75,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "AU",
    name: "Australia",
    value: 6579,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "AT",
    name: "Austria",
    value: 394,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "AZ",
    name: "Azerbaijan",
    value: 102,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "BH",
    name: "Bahrain",
    value: 63,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BD",
    name: "Bangladesh",
    value: 1530,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BY",
    name: "Belarus",
    value: 57,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "BE",
    name: "Belgium",
    value: 469,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "BZ",
    name: "Belize",
    value: 7,
    circleTemplate: { fill: colors.getIndex(4) } // Belize new
  },
  {
    id: "BJ",
    name: "Benin",
    value: 2,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "BT",
    name: "Bhutan",
    value: 2,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BO",
    name: "Bolivia",
    value: 272,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "BA",
    name: "Bosnia and Herzegovina",
    value: 83,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "BW",
    name: "Botswana",
    value: 51,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "BR",
    name: "Brazil",
    value: 1863,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "BN",
    name: "Brunei",
    value: 48,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BG",
    name: "Bulgaria",
    value: 130,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "BF",
    name: "Burkina Faso",
    value: 6,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "BI",
    name: "Burundi",
    value: 1,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "KH",
    name: "Cambodia",
    value: 63,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "CM",
    name: "Cameroon",
    value: 61,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "CA",
    name: "Canada",
    value: 6040,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "CV",
    name: "Cape Verde",
    value: 6,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "CI",
    name: "Cayman Islands",
    value: 4,
    circleTemplate: { fill: colors.getIndex(3) } // new
  },
  {
    id: "CL",
    name: "Chile",
    value: 972,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CN",
    name: "China",
    value: 3804,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "CO",
    name: "Colombia",
    value: 3413,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CG",
    name: "Congo, Rep.",
    value: 9,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "CR",
    name: "Costa Rica",
    value: 289,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "CI",
    name: "Cote d'Ivoire",
    value: 10,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "HR",
    name: "Croatia",
    value: 219,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "CU",
    name: "Cuba",
    value: 75,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "CY",
    name: "Cyprus",
    value: 129,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "CZ",
    name: "Czech Rep.",
    value: 348,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "DK",
    name: "Denmark",
    value: 604,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "DO",
    name: "Dominican Rep.",
    value: 304,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "EC",
    name: "Ecuador",
    value: 1192,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "EG",
    name: "Egypt",
    value: 552,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "SV",
    name: "El Salvador",
    value: 100,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "GQ",
    name: "Equatorial Guinea",
    value: 2,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "EE",
    name: "Estonia",
    value: 57,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "ET",
    name: "Ethiopia",
    value: 634,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "FJ",
    name: "Fiji",
    value: 35,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "FI",
    name: "Finland",
    value: 473,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "FR",
    name: "France",
    value: 1693,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "GA",
    name: "Gabon",
    value: 1,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "GM",
    name: "Gambia",
    value: 4,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "GE",
    name: "Georgia",
    value: 53,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "DE",
    name: "Germany",
    value: 3240,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "GH",
    name: "Ghana",
    value: 247,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "GR",
    name: "Greece",
    value: 694,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "GT",
    name: "Guatemala",
    value: 125,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "GN",
    name: "Guinea",
    value: 1,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "GY",
    name: "Guyana",
    value: 18,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "HT",
    name: "Haiti",
    value: 4,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "HN",
    name: "Honduras",
    value: 223,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "HK",
    name: "Hong Kong, China",
    value: 1327,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "HU",
    name: "Hungary",
    value: 273,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "IS",
    name: "Iceland",
    value: 55,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "IN",
    name: "India",
    value: 62344,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ID",
    name: "Indonesia",
    value: 1214,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IR",
    name: "Iran",
    value: 825,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IQ",
    name: "Iraq",
    value: 779,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IE",
    name: "Ireland",
    value: 539,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "IL",
    name: "Israel",
    value: 1201,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IT",
    name: "Italy",
    value: 2196,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "JM",
    name: "Jamaica",
    value: 61,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "JP",
    name: "Japan",
    value: 1236,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "JO",
    name: "Jordan",
    value: 218,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KZ",
    name: "Kazakhstan",
    value: 186,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KE",
    name: "Kenya",
    value: 948,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "KW",
    name: "Kuwait",
    value: 74,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KG",
    name: "Kyrgyzstan",
    value: 20,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LA",
    name: "Laos",
    value: 5,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LV",
    name: "Latvia",
    value: 40,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "LB",
    name: "Lebanon",
    value: 172,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LS",
    name: "Lesotho",
    value: 15,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "LR",
    name: "Liberia",
    value: 5,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "LY",
    name: "Libya",
    value: 35,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "LT",
    name: "Lithuania",
    value: 79,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "LU",
    name: "Luxembourg",
    value: 99,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "MK",
    name: "Macedonia, FYR",
    value: 25,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "MG",
    name: "Madagascar",
    value: 38,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MW",
    name: "Malawi",
    value: 40,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MY",
    name: "Malaysia",
    value: 1003,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "MR",
    name: "Mauritania",
    value: 7,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MU",
    name: "Mauritius",
    value: 64,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MX",
    name: "Mexico",
    value: 11617,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "MD",
    name: "Moldova",
    value: 36,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "MN",
    name: "Mongolia",
    value: 4,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ME",
    name: "Montenegro",
    value: 25,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "MA",
    name: "Morocco",
    value: 221,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MZ",
    name: "Mozambique",
    value: 18,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "MM",
    name: "Myanmar",
    value: 39,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "NA",
    name: "Namibia",
    value: 55,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "NP",
    name: "Nepal",
    value: 235,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "NL",
    name: "Netherlands",
    value: 1632,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "NZ",
    name: "New Zealand",
    value: 332,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "NI",
    name: "Nicaragua",
    value: 31,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "NE",
    name: "Niger",
    value: 34,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "NG",
    name: "Nigeria",
    value: 1327,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "NO",
    name: "Norway",
    value: 549,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "OM",
    name: "Oman",
    value: 105,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PK",
    name: "Pakistan",
    value: 4643,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PA",
    name: "Panama",
    value: 133,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "PG",
    name: "Papua New Guinea",
    value: 9,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "PY",
    name: "Paraguay",
    value: 89,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "PE",
    name: "Peru",
    value: 1969,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "PH",
    name: "Philippines",
    value: 2337,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PL",
    name: "Poland",
    value: 901,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "PT",
    name: "Portugal",
    value: 403,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "PR",
    name: "Puerto Rico",
    value: 45,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "QA",
    name: "Qatar",
    value: 55,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "RO",
    name: "Romania",
    value: 387,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "RU",
    name: "Russia",
    value: 1256,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "RW",
    name: "Rwanda",
    value: 10,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "SA",
    name: "Saudi Arabia",
    value: 573,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SN",
    name: "Senegal",
    value: 12,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "RS",
    name: "Serbia",
    value: 196,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "SL",
    name: "Sierra Leone",
    value: 26,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "SG",
    name: "Singapore",
    value: 945,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SK",
    name: "Slovak Republic",
    value: 122,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "SI",
    name: "Slovenia",
    value: 112,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "SB",
    name: "Solomon Islands",
    value: 55,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "SO",
    name: "Somalia",
    value: 25,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "ZA",
    name: "South Africa",
    value: 988,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "ES",
    name: "Spain",
    value: 8721,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "LK",
    name: "Sri Lanka",
    value: 659,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SD",
    name: "Sudan",
    value: 59,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "SE",
    name: "Sweden",
    value: 879,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "CH",
    name: "Switzerland",
    value: 1346,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "SY",
    name: "Syria",
    value: 55,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TW",
    name: "Taiwan",
    value: 1008,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TZ",
    name: "Tanzania",
    value: 249,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "TH",
    name: "Thailand",
    value: 625,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TG",
    name: "Togo",
    value: 2,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "TT",
    name: "Trinidad and Tobago",
    value: 92,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "TN",
    name: "Tunisia",
    value: 64,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "TR",
    name: "Turkey",
    value: 2497,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "TM",
    name: "Turkmenistan",
    value: 5,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "UG",
    name: "Uganda",
    value: 129,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "UA",
    name: "Ukraine",
    value: 253,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "AE",
    name: "United Arab Emirates",
    value: 395,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "GB",
    name: "United Kingdom",
    value: 10130,
    circleTemplate: { fill: colors.getIndex(8) }
  },
  {
    id: "US",
    name: "United States",
    value: 32491,
    circleTemplate: { fill: colors.getIndex(4) }
  },
  {
    id: "UY",
    name: "Uruguay",
    value: 150,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "UZ",
    name: "Uzbekistan",
    value: 46,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "VE",
    name: "Venezuela",
    value: 318,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "VN",
    name: "Vietnam",
    value: 1,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "YE",
    name: "Yemen, Rep.",
    value: 16,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ZM",
    name: "Zambia",
    value: 173,
    circleTemplate: { fill: colors.getIndex(2) }
  },
  {
    id: "ZW",
    name: "Zimbabwe",
    value: 137,
    circleTemplate: { fill: colors.getIndex(2) }
  }
]);

// Add globe/map switch
var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: 20,
  y: 40
}));

cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Map"
}));

var switchButton = cont.children.push(
  am5.Button.new(root, {
    themeTags: ["switch"],
    centerY: am5.p50,
    icon: am5.Circle.new(root, {
      themeTags: ["icon"]
    })
  })
);

switchButton.on("active", function () {
  if (!switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
  } else {
    chart.set("projection", am5map.geoOrthographic());
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
  }
});

cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Globe"
  })
);

// Make stuff animate on load
chart.appear(1000, 100);