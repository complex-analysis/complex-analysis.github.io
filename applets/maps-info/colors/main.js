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
  { id: "IN", value: 93114 },
  { id: "US", value: 83584 },
  { id: "MX", value: 31618 },
  { id: "GB", value: 25141 },
  { id: "ES", value: 25211 },
  { id: "AU", value: 13736 },
  { id: "CA", value: 14985 },
  { id: "PK", value: 6650 },
  { id: "AR", value: 11391 },
  { id: "CO", value: 9688 },
  { id: "CN", value: 7035 },
  { id: "DE", value: 9798 },
  { id: "PH", value: 5345 },
  { id: "TR", value: 4648 },
  { id: "KR", value: 4758 },
  { id: "PE", value: 5449 },
  { id: "IT", value: 5870 },
  { id: "BR", value: 4320 },
  { id: "BD", value: 2979 },
  { id: "CL", value: 4553 },
  { id: "FR", value: 4646 },
  { id: "NL", value: 4811 },
  { id: "HK", value: 3605 },
  { id: "NG", value: 2558 },
  { id: "ID", value: 3607 },
  { id: "JP", value: 3341 },
  { id: "IL", value: 3814 },
  { id: "EC", value: 3340 },
  { id: "RU", value: 3356 },
  { id: "MY", value: 2252 },
  { id: "TW", value: 2691 },
  { id: "CH", value: 3500 },
  { id: "ZA", value: 2171 },
  { id: "PL", value: 3887 },
  { id: "SG", value: 2977 },
  { id: "KE", value: 1856 },
  { id: "SE", value: 3329 },
  { id: "IR", value: 1886 },
  { id: "IQ", value: 1667 },
  { id: "GR", value: 2077 },
  { id: "LK", value: 1315 },
  { id: "TH", value: 1893 },
  { id: "VE", value: 2096 },
  { id: "DO", value: 1915 },
  { id: "ET", value: 1190 },
  { id: "DK", value: 1860 },
  { id: "SA", value: 1226 },
  { id: "NO", value: 2090 },
  { id: "EG", value: 1509 },
  { id: "IE", value: 1484 },
  { id: "BO", value: 1738 },
  { id: "BE", value: 1871 },
  { id: "VN", value: 1851 },
  { id: "FI", value: 1821 },
  { id: "PT", value: 1358 },
  { id: "RO", value: 1428 },
  { id: "CR", value: 1269 },
  { id: "AT", value: 1552 },
  { id: "AE", value: 880 },
  { id: "CZ", value: 1330 },
  { id: "HN", value: 919 },
  { id: "NZ", value: 1026 },
  { id: "MA", value: 879 },
  { id: "HU", value: 1043 },
  //{	id:		, value:	438	},
  { id: "UA", value: 770 },
  { id: "UY", value: 835 },
  { id: "TZ", value: 461 },
  { id: "GH", value: 462 },
  { id: "PA", value: 878 },
  { id: "NP", value: 496 },
  { id: "PY", value: 655 },
  { id: "GT", value: 668 },
  { id: "HR", value: 575 },
  { id: "JO", value: 501 },
  { id: "RS", value: 618 },
  { id: "KZ", value: 574 },
  { id: "LB", value: 388 },
  { id: "SV", value: 463 },
  { id: "ZM", value: 292 },
  { id: "DZ", value: 588 },
  { id: "CU", value: 340 },
  { id: "BG", value: 467 },
  { id: "ZW", value: 271 },
  { id: "SK", value: 356 },
  { id: "CY", value: 332 },
  { id: "UG", value: 273 },
  { id: "SI", value: 384 },
  { id: "OM", value: 185 },
  { id: "AZ", value: 345 },
  { id: "LU", value: 307 },
  { id: "TT", value: 160 },
  { id: "LT", value: 318 },
  { id: "BA", value: 232 },
  { id: "AM", value: 316 },
  { id: "PR", value: 237 },
  { id: "KW", value: 165 },
  { id: "KH", value: 258 },
  { id: "TN", value: 185 },
  { id: "MU", value: 141 },
  { id: "BH", value: 125 },
  { id: "EE", value: 183 },
  { id: "JM", value: 112 },
  { id: "BY", value: 133 },
  { id: "CM", value: 94 },
  { id: "SD", value: 96 },
  { id: "GE", value: 231 },
  { id: "IC", value: 166 },
  { id: "QA", value: 117 },
  { id: "SY", value: 119 },
  { id: "NA", value: 104 },
  { id: "AL", value: 165 },
  { id: "NI", value: 148 },
  { id: "BW", value: 105 },
  { id: "BN", value: 70 },
  { id: "XK", value: 81 },
  { id: "UZ", value: 184 },
  { id: "PS", value: 98 },
  { id: "LV", value: 154 },
  { id: "MK", value: 153 },
  { id: "MW", value: 92 },
  { id: "MM", value: 155 },
  { id: "MO", value: 93 },
  { id: "MD", value: 143 },
  { id: "MN", value: 126 },
  { id: "LY", value: 136 },
  { id: "FJ", value: 51 },
  { id: "RW", value: 113 },
  { id: "BT", value: 47 },
  { id: "ME", value: 74 },
  { id: "SO", value: 46 },
  { id: "KG", value: 66 },
  { id: "MT", value: 70 },
  { id: "SZ", value: 48 },
  { id: "AF", value: 44 },
  { id: "MZ", value: 44 },
  { id: "SS", value: 40 },
  { id: "GY", value: 28 },
  { id: "YE", value: 47 },
  { id: "BB", value: 26 },
  { id: "LS", value: 27 },
  { id: "SN", value: 33 },
  { id: "AO", value: 30 },
  { id: "CI", value: 28 },
  { id: "PG", value: 26 },
  { id: "AD", value: 34 },
  { id: "CD", value: 21 },
  { id: "CV", value: 24 },
  { id: "LS", value: 17 },
  { id: "MG", value: 26 },
  { id: "MV", value: 18 },
  { id: "BZ", value: 8 },
  { id: "GG", value: 11 },
  { id: "BF", value: 11 },
  { id: "BS", value: 12 },
  { id: "JE", value: 21 },
  { id: "VU", value: 15 },
  { id: "AG", value: 8 },
  { id: "GQ", value: 20 },
  { id: "KY", value: 10 },
  { id: "LA", value: 14 },
  { id: "LR", value: 6 },
  { id: "TM", value: 17 },
  { id: "VI", value: 6 },
  { id: "CW", value: 10 },
  { id: "GM", value: 7 },
  { id: "HT", value: 5 },
  { id: "MC", value: 9 },
  { id: "NC", value: 7 },
  { id: "SC", value: 11 },
  { id: "VC", value: 4 },
  { id: "GL", value: 3 },
  { id: "GP", value: 11 },
  { id: "GU", value: 9 },
  { id: "NE", value: 7 },
  { id: "BJ", value: 6 },
  { id: "BM", value: 8 },
  { id: "SL", value: 7 },
  { id: "TG", value: 5 },
  { id: "VG", value: 6 },
  { id: "AS", value: 1 },
  { id: "AW", value: 5 },
  { id: "BI", value: 1 },
  { id: "EH", value: 2 },
  { id: "GA", value: 3 },
  { id: "GI", value: 1 },
  { id: "GN", value: 1 },
  { id: "IM", value: 8 },
  { id: "KN", value: 1 },
  { id: "MR", value: 1 },
  { id: "RE", value: 1 },
  { id: "SR", value: 9 },
  { id: "TO", value: 2 },
  { id: "WS", value: 6 },
  { id: "ML", value: 2 },
  { id: "TD", value: 1 },
  { id: "IS", value: 108 },
  { id: "ER", value: 2 },
  { id: "LA", value: 9 },
  { id: "GW", value: 0 },
  { id: "SB", value: 7 },
  { id: "DJ", value: 1 },
  { id: "DM", value: 1 },
  { id: "TC", value: 1 },
  { id: "PW", value: 1 },
  { id: "NR", value: 1 },
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
  endText: "100K",
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