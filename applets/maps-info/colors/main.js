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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  projection: am5map.geoNaturalEarth1(),
  layout: root.horizontalLayout,
}));

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

// Create polygon series
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  valueField: "value",
  calculateAggregates: true
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}"
});

polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.color("#9cc7e7"),
  max: am5.color("#0f1317"),
  key: "fill"
}]);

polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

polygonSeries.data.setAll([
  { id: "IN", value: 102716 },
  { id: "US", value: 99866 },
  { id: "MX", value: 38912 },
  { id: "GB", value: 29271 },
  { id: "ES", value: 28439 },
  { id: "AU", value: 16684 },
  { id: "CA", value: 17496 },
  { id: "PK", value: 7100 },
  { id: "AR", value: 13181 },
  { id: "CO", value: 10920 },
  { id: "CN", value: 8665 },
  { id: "DE", value: 11857 },
  { id: "PH", value: 6097 },
  { id: "TR", value: 2147 },
  { id: "KR", value: 5522 },
  { id: "PE", value: 6099 },
  { id: "IT", value: 7154 },
  { id: "BR", value: 5516 },
  { id: "BD", value: 3438 },
  { id: "CL", value: 5292 },
  { id: "FR", value: 5529 },
  { id: "NL", value: 5717 },
  { id: "HK", value: 4484 },
  { id: "NG", value: 2772 },
  { id: "ID", value: 4633 },
  { id: "JP", value: 3935 },
  { id: "IL", value: 4442 },
  { id: "EC", value: 3649 },
  { id: "RU", value: 3968 },
  { id: "MY", value: 2519 },
  { id: "TW", value: 3101 },
  { id: "CH", value: 4211 },
  { id: "ZA", value: 2649 },
  { id: "PL", value: 4673 },
  { id: "SG", value: 4729 },
  { id: "KE", value: 2099 },
  { id: "SE", value: 3914 },
  { id: "IR", value: 2087 },
  { id: "IQ", value: 1975 },
  { id: "GR", value: 2427 },
  { id: "LK", value: 1472 },
  { id: "TH", value: 2229 },
  { id: "VE", value: 2392 },
  { id: "DO", value: 2055 },
  { id: "ET", value: 1256 },
  { id: "DK", value: 2148 },
  { id: "SA", value: 1392 },
  { id: "NO", value: 2394 },
  { id: "EG", value: 1750 },
  { id: "IE", value: 1787 },
  { id: "BO", value: 1913 },
  { id: "BE", value: 2172 },
  { id: "VN", value: 2411 },
  { id: "FI", value: 2150 },
  { id: "PT", value: 1635 },
  { id: "RO", value: 1735 },
  { id: "CR", value: 1384 },
  { id: "AT", value: 1912 },
  { id: "AE", value: 1032 },
  { id: "CZ", value: 1616 },
  { id: "HN", value: 1037 },
  { id: "NZ", value: 1244 },
  { id: "MA", value: 1011 },
  { id: "HU", value: 1287 },
  { id: "UA", value: 985 },
  { id: "UY", value: 935 },
  { id: "TZ", value: 506 },
  { id: "GH", value: 482 },
  { id: "PA", value: 964 },
  { id: "NP", value: 578 },
  { id: "PY", value: 719 },
  { id: "GT", value: 764 },
  { id: "HR", value: 671 },
  { id: "JO", value: 561 },
  { id: "RS", value: 708 },
  { id: "KZ", value: 666 },
  { id: "LB", value: 427 },
  { id: "SV", value: 513 },
  { id: "ZM", value: 316 },
  { id: "DZ", value: 716 },
  { id: "CU", value: 355 },
  { id: "BG", value: 547 },
  { id: "ZW", value: 295 },
  { id: "SK", value: 411 },
  { id: "CY", value: 360 },
  { id: "UG", value: 348 },
  { id: "SI", value: 488 },
  { id: "OM", value: 202 },
  { id: "AZ", value: 400 },
  { id: "LU", value: 342 },
  { id: "TT", value: 166 },
  { id: "LT", value: 413 },
  { id: "BA", value: 276 },
  { id: "AM", value: 373 },
  { id: "PR", value: 265 },
  { id: "KW", value: 188 },
  { id: "KH", value: 331 },
  { id: "TN", value: 220 },
  { id: "MU", value: 154 },
  { id: "BH", value: 142 },
  { id: "EE", value: 236 },
  { id: "JM", value: 122 },
  { id: "BY", value: 162 },
  { id: "CM", value: 97 },
  { id: "SD", value: 110 },
  { id: "GE", value: 276 },
  { id: "IC", value: 196 },
  { id: "QA", value: 140 },
  { id: "SY", value: 135 },
  { id: "NA", value: 125 },
  { id: "AL", value: 208 },
  { id: "NI", value: 165 },
  { id: "BW", value: 116 },
  { id: "BN", value: 75 },
  { id: "XK", value: 95 },
  { id: "UZ", value: 233 },
  { id: "PS", value: 110 },
  { id: "LV", value: 184 },
  { id: "MK", value: 188 },
  { id: "MW", value: 107 },
  { id: "MM", value: 193 },
  { id: "MO", value: 117 },
  { id: "MD", value: 181 },
  { id: "MN", value: 160 },
  { id: "LY", value: 184 },
  { id: "FJ", value: 56 },
  { id: "RW", value: 140 },
  { id: "BT", value: 56 },
  { id: "ME", value: 86 },
  { id: "SO", value: 48 },
  { id: "KG", value: 73 },
  { id: "MT", value: 83 },
  { id: "SZ", value: 57 },
  { id: "AF", value: 61 },
  { id: "MZ", value: 77 },
  { id: "SS", value: 51 },
  { id: "GY", value: 30 },
  { id: "YE", value: 49 },
  { id: "BB", value: 29 },
  { id: "LS", value: 31 },
  { id: "SN", value: 43 },
  { id: "AO", value: 36 },
  { id: "CI", value: 35 },
  { id: "PG", value: 32 },
  { id: "AD", value: 38 },
  { id: "CD", value: 26 },
  { id: "CV", value: 25 },
  { id: "LS", value: 17 },
  { id: "MG", value: 33 },
  { id: "MV", value: 23 },
  { id: "BZ", value: 11 },
  { id: "GG", value: 13 },
  { id: "BF", value: 14 },
  { id: "BS", value: 15 },
  { id: "JE", value: 22 },
  { id: "VU", value: 15 },
  { id: "AG", value: 9 },
  { id: "GQ", value: 24 },
  { id: "KY", value: 11 },
  { id: "LA", value: 21 },
  { id: "LR", value: 8 },
  { id: "TM", value: 17 },
  { id: "VI", value: 7 },
  { id: "CW", value: 4 },
  { id: "GM", value: 8 },
  { id: "HT", value: 6 },
  { id: "MC", value: 9 },
  { id: "NC", value: 8 },
  { id: "SC", value: 12 },
  { id: "VC", value: 4 },
  { id: "GL", value: 4 },
  { id: "GP", value: 11 },
  { id: "GU", value: 10 },
  { id: "NE", value: 9 },
  { id: "BJ", value: 8 },
  { id: "BM", value: 8 },
  { id: "SL", value: 7 },
  { id: "TG", value: 6 },
  { id: "VG", value: 10 },
  { id: "AS", value: 1 },
  { id: "AW", value: 6 },
  { id: "BI", value: 1 },
  { id: "EH", value: 3 },
  { id: "GA", value: 4 },
  { id: "GI", value: 1 },
  { id: "GN", value: 3 },
  { id: "IM", value: 11 },
  { id: "KN", value: 1 },
  { id: "MR", value: 3 },
  { id: "RE", value: 1 },
  { id: "SR", value: 11 },
  { id: "TO", value: 1 },
  { id: "WS", value: 7 },
  { id: "ML", value: 2 },
  { id: "TD", value: 1 },
  { id: "IS", value: 138 },
  { id: "ER", value: 2 },
  { id: "LA", value: 16 },
  { id: "GW", value: 0 },
  { id: "SB", value: 7 },
  { id: "DJ", value: 1 },
  { id: "DM", value: 2 },
  { id: "TC", value: 0 },
  { id: "PW", value: 0 },
  { id: "NR", value: 0 },
  // https://www.iban.com/country-codes
  { id: "AQ", value: 0 }, // Antartica
  { id: "CG", value: 0 }, // The Congo
  { id: "CF", value: 0 }, // Central African Republic (the)
  { id: "SJ", value: 0 }, // Svalbard and Jan Mayen
  { id: "TJ", value: 0 }, // Tajikistan
  { id: "GF", value: 0 }, // French Guiana
  { id: "KP", value: 0 }, // Korea (the Democratic People's Republic of)
  { id: "TL", value: 0 }, // Timor-Leste
  { id: "AX", value: 0 }, // Åland Islands
  { id: "MQ", value: 0 }, // Martinique
  { id: "FK", value: 0 }, // Falkland Islands (the) [Malvinas]
]);

var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",
  startColor: am5.color("#9cc7e7"),
  endColor: am5.color("#0f1317"),
  startText: "0",
  endText: "103K",
  stepCount: 6
}));

heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});

// change this to template when possible
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});