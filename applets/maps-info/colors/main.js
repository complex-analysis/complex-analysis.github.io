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
  { id: "IN", value: 88085 },
  { id: "US", value: 74846 },
  { id: "MX", value: 29088 },
  { id: "GB", value: 22689 },
  { id: "ES", value: 23005 },
  { id: "AU", value: 13037 },
  { id: "CA", value: 13653 },
  { id: "PK", value: 6388 },
  { id: "AR", value: 10893 },
  { id: "CO", value: 9136 },
  { id: "CN", value: 6612 },
  { id: "DE", value: 8693 },
  { id: "PH", value: 4930 },
  { id: "TR", value: 4071 },
  { id: "KR", value: 4489 },
  { id: "PE", value: 5146 },
  { id: "IT", value: 5222 },
  { id: "BR", value: 3936 },
  { id: "BD", value: 2730 },
  { id: "CL", value: 4300 },
  { id: "FR", value: 4155 },
  { id: "NL", value: 4344 },
  { id: "HK", value: 3257 },
  { id: "NG", value: 2452 },
  { id: "ID", value: 3152 },
  { id: "JP", value: 3032 },
  { id: "IL", value: 3403 },
  { id: "EC", value: 3114 },
  { id: "RU", value: 2984 },
  { id: "MY", value: 2083 },
  { id: "TW", value: 2516 },
  { id: "CH", value: 3189 },
  { id: "ZA", value: 2092 },
  { id: "PL", value: 3489 },
  { id: "SG", value: 2740 },
  { id: "KE", value: 1786 },
  { id: "SE", value: 3017 },
  { id: "IR", value: 1645 },
  { id: "IQ", value: 1479 },
  { id: "GR", value: 1877 },
  { id: "LK", value: 1243 },
  { id: "TH", value: 1634 },
  { id: "VE", value: 1948 },
  { id: "DO", value: 1822 },
  { id: "ET", value: 1110 },
  { id: "DK", value: 1693 },
  { id: "SA", value: 1143 },
  { id: "NO", value: 1910 },
  { id: "EG", value: 1336 },
  { id: "IE", value: 1350 },
  { id: "BO", value: 1664 },
  { id: "BE", value: 1532 },
  { id: "VN", value: 1634 },
  { id: "FI", value: 1624 },
  { id: "PT", value: 1217 },
  { id: "RO", value: 1281 },
  { id: "CR", value: 1219 },
  { id: "AT", value: 1358 },
  { id: "AE", value: 807 },
  { id: "CZ", value: 1189 },
  { id: "HN", value: 874 },
  { id: "NZ", value: 963 },
  { id: "MA", value: 793 },
  { id: "HU", value: 940 },
  { id: "UA", value: 700 },
  { id: "UY", value: 808 },
  { id: "TZ", value: 426 },
  { id: "GH", value: 440 },
  { id: "PA", value: 847 },
  { id: "NP", value: 456 },
  { id: "PY", value: 633 },
  { id: "GT", value: 633 },
  { id: "HR", value: 524 },
  { id: "JO", value: 455 },
  { id: "RS", value: 536 },
  { id: "KZ", value: 507 },
  { id: "LB", value: 362 },
  { id: "SV", value: 438 },
  { id: "ZM", value: 283 },
  { id: "DZ", value: 438 },
  { id: "CU", value: 329 },
  { id: "BG", value: 405 },
  { id: "ZW", value: 261 },
  { id: "SK", value: 322 },
  { id: "CY", value: 290 },
  { id: "UG", value: 257 },
  { id: "SI", value: 347 },
  { id: "OM", value: 174 },
  { id: "AZ", value: 295 },
  { id: "LU", value: 292 },
  { id: "TT", value: 95 },
  { id: "LT", value: 277 },
  { id: "BA", value: 204 },
  { id: "AM", value: 289 },
  { id: "PR", value: 220 },
  { id: "KW", value: 149 },
  { id: "KH", value: 233 },
  { id: "TN", value: 172 },
  { id: "MU", value: 132 },
  { id: "BH", value: 63 },
  { id: "EE", value: 156 },
  { id: "JM", value: 62 },
  { id: "BY", value: 61 },
  { id: "CM", value: 61 },
  { id: "SD", value: 60 },
  { id: "GE", value: 197 },
  { id: "IC", value: 157 },
  { id: "QA", value: 58 },
  { id: "SY", value: 57 },
  { id: "NA", value: 55 },
  { id: "AL", value: 140 },
  { id: "NI", value: 140 },
  { id: "BW", value: 51 },
  { id: "BN", value: 49 },
  { id: "UZ", value: 167 },
  { id: "PS", value: 46 },
  { id: "LV", value: 123 },
  { id: "MK", value: 129 },
  { id: "MW", value: 40 },
  { id: "MM", value: 138 },
  { id: "MO", value: 39 },
  { id: "MD", value: 133 },
  { id: "MN", value: 112 },
  { id: "LY", value: 115 },
  { id: "FJ", value: 35 },
  { id: "RW", value: 101 },
  { id: "BT", value: 25 },
  { id: "ME", value: 25 },
  { id: "SO", value: 25 },
  { id: "KG", value: 23 },
  { id: "MT", value: 23 },
  { id: "SZ", value: 21 },
  { id: "AF", value: 20 },
  { id: "MZ", value: 20 },
  { id: "SS", value: 20 },
  { id: "GY", value: 18 },
  { id: "YE", value: 17 },
  { id: "BB", value: 15 },
  { id: "LS", value: 15 },
  { id: "SN", value: 13 },
  { id: "AO", value: 12 },
  { id: "CI", value: 11 },
  { id: "PG", value: 10 },
  { id: "AD", value: 9 },
  { id: "CV", value: 9 },
  { id: "LS", value: 8 },
  { id: "MG", value: 8 },
  { id: "MV", value: 8 },
  { id: "BZ", value: 7 },
  { id: "GG", value: 7 },
  { id: "BF", value: 6 },
  { id: "BS", value: 6 },
  { id: "JE", value: 6 },
  { id: "VU", value: 6 },
  { id: "AG", value: 5 },
  { id: "GQ", value: 5 },
  { id: "KY", value: 5 },
  { id: "LR", value: 5 },
  { id: "TM", value: 5 },
  { id: "VI", value: 5 },
  { id: "CW", value: 4 },
  { id: "GM", value: 4 },
  { id: "HT", value: 4 },
  { id: "MC", value: 4 },
  { id: "NC", value: 4 },
  { id: "SC", value: 4 },
  { id: "VC", value: 4 },
  { id: "GL", value: 3 },
  { id: "GP", value: 3 },
  { id: "GU", value: 3 },
  { id: "NE", value: 3 },
  { id: "BJ", value: 2 },
  { id: "BM", value: 2 },
  { id: "SL", value: 2 },
  { id: "TG", value: 2 },
  { id: "VG", value: 2 },
  { id: "AS", value: 1 },
  { id: "AW", value: 1 },
  { id: "BI", value: 1 },
  { id: "EH", value: 1 },
  { id: "GA", value: 1 },
  { id: "GI", value: 1 },
  { id: "GN", value: 1 },
  { id: "IM", value: 1 },
  { id: "KN", value: 1 },
  { id: "MR", value: 1 },
  { id: "RE", value: 1 },
  { id: "SR", value: 1 },
  { id: "TO", value: 1 },
  { id: "WS", value: 1 },

  // https://www.iso.org/obp/ui/#home
  { id: "AQ", value: 0 },
  { id: "ML", value: 0 },
  { id: "TD", value: 0 },
  { id: "CD", value: 0 },
  { id: "CG", value: 0 },
  { id: "CF", value: 0 },
  { id: "IS", value: 0 },
  { id: "SJ", value: 0 },
  { id: "TJ", value: 0 },
  { id: "GF", value: 0 },
  { id: "ER", value: 0 },
  { id: "KP", value: 0 },
  { id: "LA", value: 0 },
  { id: "GW", value: 0 },
  { id: "XK", value: 0 },
  { id: "TL", value: 0 },
  { id: "AX", value: 0 },
  { id: "SB", value: 0 },
  { id: "DJ", value: 0 },
  { id: "MQ", value: 0 },
  { id: "FK", value: 0 },
]);

var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",
  startColor: am5.color("#9cc7e7"),
  endColor: am5.color("#0f1317"),
  startText: "0",
  endText: "89K",
  //stepCount: 6
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