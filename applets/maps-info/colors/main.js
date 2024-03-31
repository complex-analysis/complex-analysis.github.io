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

polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

polygonSeries.data.setAll([
  {	id:	"IN"	, value:	73385	},
  {	id:	"US"	, value:	52378	},
  {	id:	"MX"	, value:	23167	},
  {	id:	"GB"	, value:	16403	},
  {	id:	"ES"	, value:	18112	},
  {	id:	"AU"	, value:	9417	},
  {	id:	"CA"	, value:	9622	},
  {	id:	"PK"	, value:	5497	},
  {	id:	"AR"	, value:	8715	},
  {	id:	"CO"	, value:	7143	},
  {	id:	"CN"	, value:	5243	},
  {	id:	"DE"	, value:	5672	},
  {	id:	"PH"	, value:	3823	},
  {	id:	"TR"	, value:	2965	},
  {	id:	"KR"	, value:	3359	},
  {	id:	"PE"	, value:	4137	},
  {	id:	"IT"	, value:	3607	},
  {	id:	"BR"	, value:	2781	},
  {	id:	"BD"	, value:	2208	},
  {	id:	"CL"	, value:	3412	},
  {	id:	"FR"	, value:	2895	},
  {	id:	"NL"	, value:	3033	},
  {	id:	"HK"	, value:	2381	},
  {	id:	"NG"	, value:	1976	},
  {	id:	"ID"	, value:	2213	},
  {	id:	"JP"	, value:	2177	},
  {	id:	"IL"	, value:	2159	},
  {	id:	"EC"	, value:	2589	},
  {	id:	"RU"	, value:	2012	},
  {	id:	"MY"	, value:	1677	},
  {	id:	"TW"	, value:	1827	},
  {	id:	"CH"	, value:	2286	},
  {	id:	"ZA"	, value:	1584	},
  {	id:	"PL"	, value:	1924	},
  {	id:	"SG"	, value:	1817	},
  {	id:	"KE"	, value:	1469	},
  {	id:	"SE"	, value:	2055	},
  {	id:	"IR"	, value:	1256	},
  {	id:	"IQ"	, value:	1230	},
  {	id:	"GR"	, value:	1339	},
  {	id:	"LK"	, value:	1041	},
  {	id:	"TH"	, value:	1204	},
  {	id:	"VE"	, value:	1463	},
  {	id:	"DO"	, value:	1478	},
  {	id:	"ET"	, value:	851	},
  {	id:	"DK"	, value:	1192	},
  {	id:	"SA"	, value:	903	},
  {	id:	"NO"	, value:	1308	},
  {	id:	"EG"	, value:	962	},
  {	id:	"IE"	, value:	1013	},
  {	id:	"BO"	, value:	1291	},
  {	id:	"BE"	, value:	1077	},
  {	id:	"VN"	, value:	1065	},
  {	id:	"FI"	, value:	1119	},
  {	id:	"PT"	, value:	883	},
  {	id:	"RO"	, value:	910	},
  {	id:	"CR"	, value:	982	},
  {	id:	"AT"	, value:	872	},
  {	id:	"AE"	, value:	607	},
  {	id:	"CZ"	, value:	794	},
  {	id:	"HN"	, value:	760	},
  {	id:	"NZ"	, value:	634	},
  {	id:	"MA"	, value:	581	},
  {	id:	"HU"	, value:	628	},
  {	id:	"UA"	, value:	515	},
  {	id:	"UY"	, value:	636	},
  {	id:	"TZ"	, value:	325	},
  {	id:	"GH"	, value:	367	},
  {	id:	"PA"	, value:	677	},
  {	id:	"NP"	, value:	361	},
  {	id:	"PY"	, value:	518	},
  {	id:	"GT"	, value:	510	},
  {	id:	"HR"	, value:	367	},
  {	id:	"JO"	, value:	348	},
  {	id:	"RS"	, value:	379	},
  {	id:	"KZ"	, value:	365	},
  {	id:	"LB"	, value:	265	},
  {	id:	"SV"	, value:	368	},
  {	id:	"ZM"	, value:	249	},
  {	id:	"DZ"	, value:	285	},
  {	id:	"CU"	, value:	290	},
  {	id:	"BG"	, value:	266	},
  {	id:	"ZW"	, value:	237	},
  {	id:	"SK"	, value:	251	},
  {	id:	"CY"	, value:	201	},
  {	id:	"UG"	, value:	200	},
  {	id:	"SI"	, value:	239	},
  {	id:	"OM"	, value:	153	},
  {	id:	"AZ"	, value:	194	},
  {	id:	"LU"	, value:	212	},
  {	id:	"TT"	, value:	136	},
  {	id:	"LT"	, value:	199	},
  {	id:	"BA"	, value:	150	},
  {	id:	"AM"	, value:	188	},
  {	id:	"PR"	, value:	177	},
  {	id:	"KW"	, value:	122	},
  {	id:	"KH"	, value:	136	},
  {	id:	"TN"	, value:	124	},
  {	id:	"MU"	, value:	113	},
  {	id:	"BH"	, value:	63	},
  {	id:	"EE"	, value:	115	},
  {	id:	"JM"	, value:	62	},
  {	id:	"BY"	, value:	61	},
  {	id:	"CM"	, value:	61	},
  {	id:	"SD"	, value:	60	},
  {	id:	"GE"	, value:	135	},
  {	id:	"IC"	, value:	121	},
  {	id:	"QA"	, value:	58	},
  {	id:	"SY"	, value:	57	},
  {	id:	"NA"	, value:	55	},
  {	id:	"AL"	, value:	91	},
  {	id:	"NI"	, value:	117	},
  {	id:	"BW"	, value:	51	},
  {	id:	"BN"	, value:	49	},
  {	id:	"UZ"	, value:	107	},
  {	id:	"PS"	, value:	46	},
  {	id:	"LV"	, value:	83	},
  {	id:	"MK"	, value:	81	},
  {	id:	"MW"	, value:	40	},
  {	id:	"MM"	, value:	82	},
  {	id:	"MO"	, value:	39	},
  {	id:	"MD"	, value:	76	},
  {	id:	"MN"	, value:	76	},
  {	id:	"LY"	, value:	37	},
  {	id:	"FJ"	, value:	35	},
  {	id:	"RW"	, value:	77	},
  {	id:	"BT"	, value:	25	},
  {	id:	"ME"	, value:	25	},
  {	id:	"SO"	, value:	25	},
  {	id:	"KG"	, value:	23	},
  {	id:	"MT"	, value:	23	},
  {	id:	"SZ"	, value:	21	},
  {	id:	"AF"	, value:	20	},
  {	id:	"MZ"	, value:	20	},
  {	id:	"SS"	, value:	20	},
  {	id:	"GY"	, value:	18	},
  {	id:	"YE"	, value:	17	},
  {	id:	"BB"	, value:	15	},
  {	id:	"LS"	, value:	15	},
  {	id:	"SN"	, value:	13	},
  {	id:	"AO"	, value:	12	},
  {	id:	"CI"	, value:	11	},
  {	id:	"PG"	, value:	10	},
  {	id:	"AD"	, value:	9	},
  {	id:	"CV"	, value:	9	},
  {	id:	"LS"	, value:	8	},
  {	id:	"MG"	, value:	8	},
  {	id:	"MV"	, value:	8	},
  {	id:	"BZ"	, value:	7	},
  {	id:	"GG"	, value:	7	},
  {	id:	"BF"	, value:	6	},
  {	id:	"BS"	, value:	6	},
  {	id:	"JE"	, value:	6	},
  {	id:	"VU"	, value:	6	},
  {	id:	"AG"	, value:	5	},
  {	id:	"GQ"	, value:	5	},
  {	id:	"KY"	, value:	5	},
  {	id:	"LR"	, value:	5	},
  {	id:	"TM"	, value:	5	},
  {	id:	"VI"	, value:	5	},
  {	id:	"CW"	, value:	4	},
  {	id:	"GM"	, value:	4	},
  {	id:	"HT"	, value:	4	},
  {	id:	"MC"	, value:	4	},
  {	id:	"NC"	, value:	4	},
  {	id:	"SC"	, value:	4	},
  {	id:	"VC"	, value:	4	},
  {	id:	"GL"	, value:	3	},
  {	id:	"GP"	, value:	3	},
  {	id:	"GU"	, value:	3	},
  {	id:	"NE"	, value:	3	},
  {	id:	"BJ"	, value:	2	},
  {	id:	"BM"	, value:	2	},
  {	id:	"SL"	, value:	2	},
  {	id:	"TG"	, value:	2	},
  {	id:	"VG"	, value:	2	},
  {	id:	"AS"	, value:	1	},
  {	id:	"AW"	, value:	1	},
  {	id:	"BI"	, value:	1	},
  {	id:	"EH"	, value:	1	},
  {	id:	"GA"	, value:	1	},
  {	id:	"GI"	, value:	1	},
  {	id:	"GN"	, value:	1	},
  {	id:	"IM"	, value:	1	},
  {	id:	"KN"	, value:	1	},
  {	id:	"MR"	, value:	1	},
  {	id:	"RE"	, value:	1	},
  {	id:	"SR"	, value:	1	},
  {	id:	"TO"	, value:	1	},
  {	id:	"WS"	, value:	1	},

  // https://www.iso.org/obp/ui/#home
  {	id:	"AQ"	, value:	0	},
  {	id:	"ML"	, value:	0	},
  {	id:	"TD"	, value:	0	},
  {	id:	"CD"	, value:	0	},
  {	id:	"CG"	, value:	0	},
  {	id:	"CF"	, value:	0	},
  {	id:	"IS"	, value:	0	},
  {	id:	"SJ"	, value:	0	},
  {	id:	"TJ"	, value:	0	},
  {	id:	"GF"	, value:	0	},
  {	id:	"ER"	, value:	0	},
  {	id:	"KP"	, value:	0	},
  {	id:	"LA"	, value:	0	},
  {	id:	"GW"	, value:	0	},
  {	id:	"XK"	, value:	0	},
  {	id:	"TL"	, value:	0	},
  {	id:	"AX"	, value:	0	},
  {	id:	"SB"	, value:	0	},
  {	id:	"DJ"	, value:	0	},
  {	id:	"MQ"	, value:	0	},
  {	id:	"FK"	, value:	0	},
]);

var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",
  startColor: am5.color("#9cc7e7"),
  endColor: am5.color("#0f1317"),
  startText: "0",
  endText: "75K",
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