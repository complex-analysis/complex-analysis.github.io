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
  {	id:	"IN"	, value:	89961	},
  {	id:	"US"	, value:	78383	},
  {	id:	"MX"	, value:	29867	},
  {	id:	"GB"	, value:	23735	},
  {	id:	"ES"	, value:	23836	},
  {	id:	"AU"	, value:	13341	},
  {	id:	"CA"	, value:	14148	},
  {	id:	"PK"	, value:	6483	},
  {	id:	"AR"	, value:	11173	},
  {	id:	"CO"	, value:	9389	},
  {	id:	"CN"	, value:	6804	},
  {	id:	"DE"	, value:	9113	},
  {	id:	"PH"	, value:	5101	},
  {	id:	"TR"	, value:	4294	},
  {	id:	"KR"	, value:	4635	},
  {	id:	"PE"	, value:	5314	},
  {	id:	"IT"	, value:	5492	},
  {	id:	"BR"	, value:	4096	},
  {	id:	"BD"	, value:	2829	},
  {	id:	"CL"	, value:	4453	},
  {	id:	"FR"	, value:	4355	},
  {	id:	"NL"	, value:	4527	},
  {	id:	"HK"	, value:	3479	},
  {	id:	"NG"	, value:	2517	},
  {	id:	"ID"	, value:	3271	},
  {	id:	"JP"	, value:	3144	},
  {	id:	"IL"	, value:	3540	},
  {	id:	"EC"	, value:	3253	},
  {	id:	"RU"	, value:	3121	},
  {	id:	"MY"	, value:	2151	},
  {	id:	"TW"	, value:	2598	},
  {	id:	"CH"	, value:	3330	},
  {	id:	"ZA"	, value:	2133	},
  {	id:	"PL"	, value:	3645	},
  {	id:	"SG"	, value:	2844	},
  {	id:	"KE"	, value:	1856	},
  {	id:	"SE"	, value:	3150	},
  {	id:	"IR"	, value:	1695	},
  {	id:	"IQ"	, value:	1571	},
  {	id:	"GR"	, value:	1933	},
  {	id:	"LK"	, value:	1276	},
  {	id:	"TH"	, value:	1716	},
  {	id:	"VE"	, value:	2018	},
  {	id:	"DO"	, value:	1892	},
  {	id:	"ET"	, value:	1136	},
  {	id:	"DK"	, value:	1748	},
  {	id:	"SA"	, value:	1173	},
  {	id:	"NO"	, value:	1981	},
  {	id:	"EG"	, value:	1392	},
  {	id:	"IE"	, value:	1393	},
  {	id:	"BO"	, value:	1702	},
  {	id:	"BE"	, value:	1606	},
  {	id:	"VN"	, value:	1668	},
  {	id:	"FI"	, value:	1706	},
  {	id:	"PT"	, value:	1257	},
  {	id:	"RO"	, value:	1338	},
  {	id:	"CR"	, value:	1255	},
  {	id:	"AT"	, value:	1459	},
  {	id:	"AE"	, value:	817	},
  {	id:	"CZ"	, value:	1249	},
  {	id:	"HN"	, value:	897	},
  {	id:	"NZ"	, value:	990	},
  {	id:	"MA"	, value:	812	},
  {	id:	"HU"	, value:	986	},
  //{	id:		, value:	425	},
  {	id:	"UA"	, value:	718	},
  {	id:	"UY"	, value:	823	},
  {	id:	"TZ"	, value:	431	},
  {	id:	"GH"	, value:	464	},
  {	id:	"PA"	, value:	868	},
  {	id:	"NP"	, value:	463	},
  {	id:	"PY"	, value:	647	},
  {	id:	"GT"	, value:	649	},
  {	id:	"HR"	, value:	541	},
  {	id:	"JO"	, value:	471	},
  {	id:	"RS"	, value:	586	},
  {	id:	"KZ"	, value:	539	},
  {	id:	"LB"	, value:	367	},
  {	id:	"SV"	, value:	453	},
  {	id:	"ZM"	, value:	289	},
  {	id:	"DZ"	, value:	479	},
  {	id:	"CU"	, value:	338	},
  {	id:	"BG"	, value:	423	},
  {	id:	"ZW"	, value:	271	},
  {	id:	"SK"	, value:	328	},
  {	id:	"CY"	, value:	303	},
  {	id:	"UG"	, value:	266	},
  {	id:	"SI"	, value:	356	},
  {	id:	"OM"	, value:	177	},
  {	id:	"AZ"	, value:	319	},
  {	id:	"LU"	, value:	299	},
  {	id:	"TT"	, value:	149	},
  {	id:	"LT"	, value:	290	},
  {	id:	"BA"	, value:	209	},
  {	id:	"AM"	, value:	304	},
  {	id:	"PR"	, value:	226	},
  {	id:	"KW"	, value:	160	},
  {	id:	"KH"	, value:	245	},
  {	id:	"TN"	, value:	178	},
  {	id:	"MU"	, value:	134	},
  {	id:	"BH"	, value:	119	},
  {	id:	"EE"	, value:	161	},
  {	id:	"JM"	, value:	111	},
  {	id:	"BY"	, value:	130	},
  {	id:	"CM"	, value:	100	},
  {	id:	"SD"	, value:	90	},
  {	id:	"GE"	, value:	204	},
  {	id:	"IC"	, value:	165	},
  {	id:	"QA"	, value:	106	},
  {	id:	"SY"	, value:	117	},
  {	id:	"NA"	, value:	105	},
  {	id:	"AL"	, value:	150	},
  {	id:	"NI"	, value:	146	},
  {	id:	"BW"	, value:	108	},
  {	id:	"BN"	, value:	68	},
  {	id:	"XK"	, value:	79	},
  {	id:	"UZ"	, value:	170	},
  {	id:	"PS"	, value:	98	},
  {	id:	"LV"	, value:	133	},
  {	id:	"MK"	, value:	138	},
  {	id:	"MW"	, value:	88	},
  {	id:	"MM"	, value:	140	},
  {	id:	"MO"	, value:	89	},
  {	id:	"MD"	, value:	136	},
  {	id:	"MN"	, value:	122	},
  {	id:	"LY"	, value:	121	},
  {	id:	"FJ"	, value:	50	},
  {	id:	"RW"	, value:	110	},
  {	id:	"BT"	, value:	41	},
  {	id:	"ME"	, value:	69	},
  {	id:	"SO"	, value:	45	},
  {	id:	"KG"	, value:	65	},
  {	id:	"MT"	, value:	57	},
  {	id:	"SZ"	, value:	45	},
  {	id:	"AF"	, value:	45	},
  {	id:	"MZ"	, value:	41	},
  {	id:	"SS"	, value:	40	},
  {	id:	"GY"	, value:	22	},
  {	id:	"YE"	, value:	50	},
  {	id:	"BB"	, value:	26	},
  {	id:	"LS"	, value:	20	},
  {	id:	"SN"	, value:	34	},
  {	id:	"AO"	, value:	27	},
  {	id:	"CI"	, value:	25	},
  {	id:	"PG"	, value:	25	},
  {	id:	"AD"	, value:	32	},
  {	id:	"CD"	, value:	19	},
  {	id:	"CV"	, value:	24	},
  {	id:	"LS"	, value:	17	},
  {	id:	"MG"	, value:	27	},
  {	id:	"MV"	, value:	18	},
  {	id:	"BZ"	, value:	9	},
  {	id:	"GG"	, value:	10	},
  {	id:	"BF"	, value:	12	},
  {	id:	"BS"	, value:	12	},
  {	id:	"JE"	, value:	20	},
  {	id:	"VU"	, value:	15	},
  {	id:	"AG"	, value:	9	},
  {	id:	"GQ"	, value:	19	},
  {	id:	"KY"	, value:	10	},
  {	id:	"LA"	, value:	10	},
  {	id:	"LR"	, value:	6	},
  {	id:	"TM"	, value:	11	},
  {	id:	"VI"	, value:	6	},
  {	id:	"CW"	, value:	9	},
  {	id:	"GM"	, value:	7	},
  {	id:	"HT"	, value:	5	},
  {	id:	"MC"	, value:	9	},
  {	id:	"NC"	, value:	6	},
  {	id:	"SC"	, value:	11	},
  {	id:	"VC"	, value:	4	},
  {	id:	"GL"	, value:	3	},
  {	id:	"GP"	, value:	10	},
  {	id:	"GU"	, value:	9	},
  {	id:	"NE"	, value:	5	},
  {	id:	"BJ"	, value:	6	},
  {	id:	"BM"	, value:	9	},
  {	id:	"SL"	, value:	6	},
  {	id:	"TG"	, value:	5	},
  {	id:	"VG"	, value:	6	},
  {	id:	"AS"	, value:	1	},
  {	id:	"AW"	, value:	5	},
  {	id:	"BI"	, value:	1	},
  {	id:	"EH"	, value:	2	},
  {	id:	"GA"	, value:	2	},
  {	id:	"GI"	, value:	1	},
  {	id:	"GN"	, value:	1	},
  {	id:	"IM"	, value:	4	},
  {	id:	"KN"	, value:	1	},
  {	id:	"MR"	, value:	1	},
  {	id:	"RE"	, value:	1	},
  {	id:	"SR"	, value:	9	},
  {	id:	"TO"	, value:	2	},
  {	id:	"WS"	, value:	6	},
  {	id:	"ML"	, value:	1	},
  {	id:	"TD"	, value:	1	},
  {	id:	"IS"	, value:	107	},
  {	id:	"ER"	, value:	3	},
  {	id:	"LA"	, value:	5	},
  {	id:	"GW"	, value:	0	},
  {	id:	"SB"	, value:	7	},
  {	id:	"DJ"	, value:	1	},

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
  endText: "90K",
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