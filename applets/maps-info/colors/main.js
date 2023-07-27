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
  projection: am5map.geoMercator(),
  //layout: root.horizontalLayout
}));

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
  {	id:	"IN"	, value:	64595	},
  {	id:	"US"	, value:	40402	},
  {	id:	"MX"	, value:	19314	},
  {	id:	"GB"	, value:	13229	},
  {	id:	"ES"	, value:	15398	},
  {	id:	"AU"	, value:	7545	},
  {	id:	"CA"	, value:	7205	},
  {	id:	"PK"	, value:	4819	},
  {	id:	"AR"	, value:	7231	},
  {	id:	"CO"	, value:	6118	},
  {	id:	"CN"	, value:	4659	},
  {	id:	"DE"	, value:	4374	},
  {	id:	"PH"	, value:	3281	},
  {	id:	"TR"	, value:	2360	},
  {	id:	"KR"	, value:	2598	},
  {	id:	"PE"	, value:	3622	},
  {	id:	"IT"	, value:	2705	},
  {	id:	"BR"	, value:	2198	},
  {	id:	"BD"	, value:	1803	},
  {	id:	"CL"	, value:	2794	},
  {	id:	"FR"	, value:	2168	},
  {	id:	"NL"	, value:	2213	},
  {	id:	"HK"	, value:	1820	},
  {	id:	"NG"	, value:	1587	},
  {	id:	"ID"	, value:	1751	},
  {	id:	"JP"	, value:	1769	},
  {	id:	"IL"	, value:	1832	},
  {	id:	"EC"	, value:	2229	},
  {	id:	"RU"	, value:	1604	},
  {	id:	"MY"	, value:	1259	},
  {	id:	"TW"	, value:	1398	},
  {	id:	"CH"	, value:	1719	},
  {	id:	"ZA"	, value:	1282	},
  {	id:	"PL"	, value:	1440	},
  {	id:	"SG"	, value:	1314	},
  {	id:	"KE"	, value:	1307	},
  {	id:	"SE"	, value:	1471	},
  {	id:	"IR"	, value:	1009	},
  {	id:	"IQ"	, value:	998	},
  {	id:	"GR"	, value:	969	},
  {	id:	"LK"	, value:	755	},
  {	id:	"TH"	, value:	911	},
  {	id:	"VE"	, value:	1246	},
  {	id:	"DO"	, value:	1231	},
  {	id:	"ET"	, value:	760	},
  {	id:	"DK"	, value:	877	},
  {	id:	"SA"	, value:	744	},
  {	id:	"NO"	, value:	910	},
  {	id:	"EG"	, value:	784	},
  {	id:	"IE"	, value:	815	},
  {	id:	"BO"	, value:	1087	},
  {	id:	"BE"	, value:	795	},
  {	id:	"VN"	, value:	792	},
  {	id:	"FI"	, value:	722	},
  {	id:	"PT"	, value:	681	},
  {	id:	"RO"	, value:	699	},
  {	id:	"CR"	, value:	847	},
  {	id:	"AT"	, value:	635	},
  {	id:	"AE"	, value:	512	},
  {	id:	"CZ"	, value:	620	},
  {	id:	"HN"	, value:	662	},
  {	id:	"NZ"	, value:	471	},
  {	id:	"MA"	, value:	512	},
  {	id:	"HU"	, value:	462	},
  {	id:	"UA"	, value:	406	},
  {	id:	"UY"	, value:	506	},
  {	id:	"TZ"	, value:	305	},
  {	id:	"GH"	, value:	330	},
  {	id:	"PA"	, value:	535	},
  {	id:	"NP"	, value:	305	},
  {	id:	"PY"	, value:	456	},
  {	id:	"GT"	, value:	439	},
  {	id:	"HR"	, value:	291	},
  {	id:	"JO"	, value:	275	},
  {	id:	"RS"	, value:	287	},
  {	id:	"KZ"	, value:	247	},
  {	id:	"LB"	, value:	221	},
  {	id:	"SV"	, value:	320	},
  {	id:	"ZM"	, value:	221	},
  {	id:	"DZ"	, value:	221	},
  {	id:	"CU"	, value:	253	},
  {	id:	"BG"	, value:	204	},
  {	id:	"ZW"	, value:	222	},
  {	id:	"SK"	, value:	200	},
  {	id:	"CY"	, value:	174	},
  {	id:	"UG"	, value:	158	},
  {	id:	"SI"	, value:	166	},
  {	id:	"OM"	, value:	132	},
  {	id:	"AZ"	, value:	158	},
  {	id:	"LU"	, value:	175	},
  {	id:	"TT"	, value:	118	},
  {	id:	"LT"	, value:	137	},
  {	id:	"BA"	, value:	101	},
  {	id:	"AM"	, value:	139	},
  {	id:	"PR"	, value:	148	},
  {	id:	"KW"	, value:	94	},
  {	id:	"KH"	, value:	104	},
  {	id:	"TN"	, value:	92	},
  {	id:	"MU"	, value:	92	},
  {	id:	"BH"	, value:	76	},
  {	id:	"EE"	, value:	89	},
  {	id:	"JM"	, value:	77	},
  {	id:	"BY"	, value:	77	},
  {	id:	"CM"	, value:	68	},
  {	id:	"SD"	, value:	75	},
  {	id:	"GE"	, value:	98	},
  {	id:	"IC"	, value:	75	},
  {	id:	"QA"	, value:	72	},
  {	id:	"SY"	, value:	73	},
  {	id:	"NA"	, value:	79	},
  {	id:	"AL"	, value:	69	},
  {	id:	"NI"	, value:	105	},
  {	id:	"BW"	, value:	63	},
  {	id:	"BN"	, value:	52	},
  {	id:	"UZ"	, value:	70	},
  {	id:	"PS"	, value:	61	},
  {	id:	"LV"	, value:	61	},
  {	id:	"MK"	, value:	56	},
  {	id:	"MW"	, value:	46	},
  {	id:	"MM"	, value:	57	},
  {	id:	"MO"	, value:	49	},
  {	id:	"MD"	, value:	65	},
  {	id:	"MN"	, value:	61	},
  {	id:	"LY"	, value:	53	},
  {	id:	"FJ"	, value:	38	},
  {	id:	"RW"	, value:	41	},
  {	id:	"BT"	, value:	30	},
  {	id:	"ME"	, value:	34	},
  {	id:	"SO"	, value:	29	},
  {	id:	"KG"	, value:	37	},
  {	id:	"MT"	, value:	30	},
  {	id:	"SZ"	, value:	30	},
  {	id:	"AF"	, value:	29	},
  {	id:	"MZ"	, value:	28	},
  {	id:	"SS"	, value:	26	},
  {	id:	"GY"	, value:	19	},
  {	id:	"YE"	, value:	20	},
  {	id:	"BB"	, value:	20	},
  {	id:	"LS"	, value:	18	},
  {	id:	"SN"	, value:	19	},
  {	id:	"AO"	, value:	21	},
  {	id:	"CI"	, value:	17	},
  {	id:	"PG"	, value:	17	},
  {	id:	"AD"	, value:	27	},
  {	id:	"CV"	, value:	20	},
  {	id:	"LS"	, value:	14	},
  {	id:	"MG"	, value:	13	},
  {	id:	"MV"	, value:	12	},
  {	id:	"BZ"	, value:	7	},
  {	id:	"GG"	, value:	7	},
  {	id:	"BF"	, value:	7	},
  {	id:	"BS"	, value:	10	},
  {	id:	"JE"	, value:	11	},
  {	id:	"VU"	, value:	10	},
  {	id:	"AG"	, value:	5	},
  {	id:	"GQ"	, value:	10	},
  {	id:	"KY"	, value:	9	},
  {	id:	"LR"	, value:	5	},
  {	id:	"TM"	, value:	6	},
  {	id:	"VI"	, value:	6	},
  {	id:	"CW"	, value:	7	},
  {	id:	"GM"	, value:	4	},
  {	id:	"HT"	, value:	5	},
  {	id:	"MC"	, value:	6	},
  {	id:	"NC"	, value:	5	},
  {	id:	"SC"	, value:	5	},
  {	id:	"VC"	, value:	4	},
  {	id:	"GL"	, value:	3	},
  {	id:	"GP"	, value:	10	},
  {	id:	"GU"	, value:	3	},
  {	id:	"NE"	, value:	4	},
  {	id:	"BJ"	, value:	3	},
  {	id:	"BM"	, value:	4	},
  {	id:	"SL"	, value:	3	},
  {	id:	"TG"	, value:	3	},
  {	id:	"VG"	, value:	5	},
  {	id:	"AS"	, value:	1	},
  {	id:	"AW"	, value:	4	},
  {	id:	"BI"	, value:	1	},
  {	id:	"EH"	, value:	1	},
  {	id:	"GA"	, value:	1	},
  {	id:	"GI"	, value:	1	},
  {	id:	"GN"	, value:	1	},
  {	id:	"IM"	, value:	2	},
  {	id:	"KN"	, value:	1	},
  {	id:	"MR"	, value:	1	},
  {	id:	"RE"	, value:	1	},
  {	id:	"SR"	, value:	5	},
  {	id:	"TO"	, value:	1	},
  {	id:	"WS"	, value:	3	},
]);

var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",
  startColor: am5.color("#9cc7e7"),
  endColor: am5.color("#0f1317"),
  startText: "0",
  endText: "65000",
  stepCount: 8
}));

heatLegend.startLabel.setAll({
  fontSize: 10,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 10,
  fill: heatLegend.get("endColor")
});

// change this to template when possible
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});