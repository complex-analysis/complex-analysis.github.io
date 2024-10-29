function MathCell(r,e,t={}){function i(e){var t="label"in e?e.label:"";return 1===t.length&&(t=`<i>${t}</i>`),"action"===e.type?`
<div style="width: 100%; display: inline-block"> ${interact(r,e)} </div>`:`
<div style="white-space: nowrap">
<div style="min-width: .5in; display: inline-block">${t}</div>
<div style="width: 100%; display: inline-block; white-space: nowrap">
  ${interact(r,e)} </div>
</div>`}for(var n="",a=0;a<e.length;a++){var o=e[a];Array.isArray(o)?n+=function t(e){var n="";return(e=Array.isArray(e[0])?e:[e]).forEach(e=>{n+="<tr>",e.forEach(e=>{n+="<td>",Array.isArray(e)?n+=t(e):n+=i(e),n+="</td>"}),n+="</tr>"}),`
<table style="width: 100%; line-height: inherit">
${n}
</table>`}(o):n+=i(o)}n+=`
<div style="height: .25in"></div>
<div id=${r}wrapper style="width: 100%; flex: 1; position: relative">`;var s=1;"multipleOutputs"in t?n+=function t(n){var i="";return(n=Array.isArray(n[0])?n:[n]).forEach(e=>{i+=`
<div style="width: 100%; height: ${100/n.length}%; white-space: nowrap">`,e.forEach(e=>{Array.isArray(e)?i+=t(e):(i+=`
<div id=${r}output${s} style="width: ${100/n[0].length}%; height: calc(100% - 5px);
                                         border: 1px solid black; display: inline-block"></div>`,s++)}),i+=`
</div>`}),`
<div style="width: 100%; height: 100%; position: absolute">
${i}
</div>`}(t.multipleOutputs):n+=`
<div id=${r}output style="width: 100%; height: 100%; position: absolute"></div>`,n+=`
</div>`;t=document.createRange().createContextualFragment(n);document.getElementById(r).appendChild(t)}function interact(e,t){var n="name"in t?t.name:"";switch(t.type){case"slider":return`
<input id=${e+n} type=range min=${h="min"in t?t.min:0} max=${d="max"in t?t.max:1} step=${u="step"in t?t.step:.01} value=${c="default"in t?t.default:h}
       style="vertical-align: middle; width: calc(100% - 1.1in)"
       onchange="${e+n}Box.value=${e+n}.value;
                 window.id='${e}';${e}.update('${e}')"/>
<input id=${e+n}Box type=number min=${h} max=${d} step=${u} value=${c}
       title="" style="width: .5in"
       onchange="checkLimits(this);${e+n}.value=${e+n}Box.value;
                 window.id='${e}';${e}.update('${e}')"/>`;case"buttons":for(var i=("values"in t?t.values:[1,2,3]),r=("labels"in t&&t.labels),a=("default"in t?t.default:i[0]),o=t.width?'style="width: '+t.width+'"':"",s="",l=0;l<i.length;l++)s+=`
<input id=${e+n}_${l} name=${e+n} type=radio
       value=${i[l]} ${i[l]===a?"checked":""}
       onchange="window.id='${e}';${e}.update('${e}')"/>
<label for=${e+n}_${l} ${o}> ${(r||i)[l]} </label> &nbsp; </input>`;return s;case"number":return`
<input id=${e+n} type=number min=${h="min"in t?t.min:0} max=${d="max"in t?t.max:1} step=${u="step"in t?t.step:.01} value=${c="default"in t?t.default:h}
       style="width: 1in" title="" onload=this.onchange
       onchange="checkLimits(this);window.id='${e}';${e}.update('${e}')"/>`;case"checkbox":return`
<input id=${e+n} type=checkbox ${("default"in t?t.default:"")?"checked":""}
       onchange="window.id='${e}';${e}.update('${e}')"/>`;case"text":return`
<input id=${e+n} type=text value="${c="default"in t?t.default:""}" style="${p="width: "+(t.width||"calc(100% - .6in)")}"
       onchange="window.id='${e}';${e}.update('${e}')"/>`;case"iterator":var c,p=".75in",d="";return`
<div id=${e+n}
    style="display: inline-block; width: .5in; text-align: left">${c="default"in t?t.default:0}</div> ${d=t.reversible?`
<button onclick="${e+n}.innerHTML--;window.id='${e}';${e}.update('${e}')"
    style="width: ${p}">Last</button>`:d}
<button onclick="${e+n}.innerHTML++;window.id='${e}';${e}.update('${e}')"
    style="width: ${p}">Next</button>
<button onclick="${e+n}.innerHTML=${c};window.id='${e}';${e}.update('${e}')"
    style="width: ${p}">Reset</button>`;case"action":var u="script"in t?t.script:"doNothing",h="label"in t?t.label:"&nbsp;",p="width"in t?t.width:"1in";if("updateParent"===t.subtype)return`
<button onclick="${e}.${u}" style="width: ${p}">${h}</button>`;default:return"Unsupported input type"}}function graphic(e,t,n){switch(n.type){case"svg":return svg(e,t,n);case"threejs":return threejs(e,t,n);case"x3d":return x3d(e,t,n);case"text":return`
<div style="width: 100%; height: 100%; float: left;
            white-space: nowrap; overflow-x: auto; ${n.center?"text-align: center":""}">
   ${JSON.stringify(t).replace(/\"/g,"")} </div>`;case"matrix":for(var i=`
<table style="width: 95%; margin: auto; line-height: 1.5; text-align: center">`,r=0;r<t.length;r++){i+="<tr>";for(var a=0;a<t[r].length;a++)i+="<td>"+t[r][a]+"</td>";i+="</tr>"}return`
<div style="display: flex; width: 97%; height: 97%; text-align: center">

<svg width="2%" height=95% preserveAspectRatio="none"
     xmlns="http://www.w3.org/2000/svg"
     style="border: 1.5px solid black; border-right: none"></svg>
${i+="</table>"}

<svg width="2%" height="95%" preserveAspectRatio="none"
     xmlns="http://www.w3.org/2000/svg"
     style="border: 1.5px solid black; border-left: none"></svg>
</div>`;default:return"Unsupported graphic type"}}function generateId(){return"id"+Math.floor(1e10*Math.random())}function checkLimits(e){+e.value<+e.min&&(e.value=e.min),+e.value>+e.max&&(e.value=e.max)}function getVariable(e,t){var n=document.getElementById(e+t);if(!n)return e=document.querySelector("input[name="+e+t+"]:checked").value,isNaN(e)?e:+e;if(n.innerHTML)return+n.innerHTML;switch(n.type){case"number":case"range":return+n.value;case"checkbox":return n.checked;case"text":return n.value}}function setLimit(e,t,n,i){var r=document.getElementById(e+t);switch(n){case"min":r.min=i,r.value<i&&(r.value=i);break;case"max":r.max=i,r.value>i&&(r.value=i)}"range"===r.type&&((n=document.getElementById(e+t+"Box")).min=r.min,n.max=r.max,n.value=r.value)}function evaluate(e,t,n){var i=document.querySelectorAll("[id^="+e+"output]");if(1===i.length)(a=i[0]).innerHTML=graphic(e,t,n),"threejs"===n.type&&l(a);else for(var r=0;r<i.length;r++){var a,o=(a=i[r]).id.substr(a.id.indexOf("output")+6),s=Array.isArray(n)?n[r]:JSON.parse(JSON.stringify(n));s.output=o,s.no3DBorder=!0,a.innerHTML=graphic(e,t[r],s),"threejs"===s.type&&l(a),"matrix"===s.type&&(a.style.border="none")}function l(e){e=e.children[0];/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(e.style.width=getComputedStyle(e).width,e.style.height=getComputedStyle(e).height)}}function injectFunctions(e,t,n=""){e=document.getElementById(e+"output"+n);if(!(0<e.children.length&&e.children[0].contentWindow))throw Error("injectFuctions must follow evaluate");var i=e.children[0].contentWindow;Object.keys(t).forEach(e=>i[e]=t[e])}function minMax(e,t){for(var n=Number.MAX_VALUE,i=-Number.MAX_VALUE,r=0;r<e.length;r++)e[r][t]<n&&(n=e[r][t]),e[r][t]>i&&(i=e[r][t]);return{min:n,max:i}}window.onerror=function(e){document.getElementById(window.id+"output").innerHTML=e};var numericInfinity=1e300;function dataReplacer(e,t){return t===1/0?"Infinity":t===-1/0?"-Infinity":t!=t?"NaN":t}function dataReviver(e,t){return"Infinity"===t?numericInfinity:"-Infinity"===t?-numericInfinity:"NaN"===t?NaN:t}function linspace(e,t,n){for(var i=[],r=(t-e)/(n-1),a=0;a<n-1;a++)i.push(e+a*r);return i.push(t),i}function lerp(t,n){return function(e){return t[1]+(e-t[0])*(n[1]-t[1])/(n[0]-t[0])}}function roundTo(e,t,n=!0){if(0===e)return e;if(Array.isArray(e)){for(var i=[],r=0;r<e.length;r++)i[r]=roundTo(e[r],t,n);return i}return n&&(t=t-Math.floor(Math.log10(Math.abs(e)))-1),Math.round(10**t*e)/10**t}function ceilTo(e,t,n=!0){if(0===e)return e;if(Array.isArray(e)){for(var i=[],r=0;r<e.length;r++)i[r]=ceilTo(e[r],t,n);return i}return n&&(t=t-Math.floor(Math.log10(Math.abs(e)))-1),Math.ceil(10**t*e)/10**t}function floorTo(e,t,n=!0){if(0===e)return e;if(Array.isArray(e)){for(var i=[],r=0;r<e.length;r++)i[r]=floorTo(e[r],t,n);return i}return n&&(t=t-Math.floor(Math.log10(Math.abs(e)))-1),Math.floor(10**t*e)/10**t}function normalize(e){for(var t=Math.hypot.apply(null,e),n=0;n<e.length;n++)e[n]/=t;return e}function translate(e,t){for(var n=0;n<e.length;n++)for(var i=0;i<t.length;i++)e[n][i]+=t[i];return e}function rotate(e,t=0,n=[0,0,1]){switch(e[0].length){case 2:for(var i=0;i<e.length;i++){var r=(h=e[i])[0]*Math.cos(t)-h[1]*Math.sin(t),a=h[0]*Math.sin(t)+h[1]*Math.cos(t);e[i]=[r,a]}break;case 3:var o=Math.hypot.apply(null,n);if(0!==o){if(1!==o)for(i=0;i<3;i++)n[i]/=o;for(var s=n[0],l=n[1],c=n[2],p=Math.cos(t),d=Math.sin(t),u=[[p+(1-p)*s**2,-d*c+(1-p)*s*l,d*l+(1-p)*s*c],[d*c+(1-p)*s*l,p+(1-p)*l**2,-d*s+(1-p)*l*c],[-d*l+(1-p)*s*c,d*s+(1-p)*l*c,p+(1-p)*c**2]],i=0;i<e.length;i++){for(var h=e[i],r=0,a=0,f=0,g=0;g<h.length;g++)r+=u[0][g]*h[g],a+=u[1][g]*h[g],f+=u[2][g]*h[g];e[i]=[r,a,f]}}break;default:throw Error("Unsupported rotation dimension")}}function rotateFromZAxis(e,t){rotate(e,Math.acos(t[2]/Math.hypot.apply(null,t)),[-t[1],t[0],0])}function getCompleteCode(){var e=document.getElementsByClassName("mathcell")[0],t=e.cloneNode(!1),e=(t.removeAttribute("id"),t.appendChild(e.children[0]),t.outerHTML.replace("<script>","\n<script>").replace("</div>","\n</div>"));document.getElementById("codeDisplay").innerText=e}function color(e,t,n){return{r:e,g:t,b:n}}function colorFromHue(e){function t(e,t,n){return n<0&&(n+=1),1<n&&--n,n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+6*(t-e)*(2/3-n):e}return{r:t(0,1,(e=(e%1+1)%1)+1/3),g:t(0,1,e),b:t(0,1,e-1/3)}}function colorFromArg(e){return"object"==typeof e&&"re"in e||(e={re:e,im:0}),colorFromHue(Math.atan2(e.im,e.re)/Math.PI/2)}function colorStringFromHue(e){return`hsl(${360*e},100%,50%)`}function colorToHexString(e){return"#"+("000000"+(255*e.r<<16^255*e.g<<8^255*e.b<<0).toString(16)).slice(-6)}function colormap(e,t=!1){function n(i){return function(e){for(var t=0;t<i.length;t++){var n=i[t][1];if(e>=n[0]&&e<=n[1])return i[t][0](e)}return 0}}var i=n(colormaps[e].r),r=n(colormaps[e].g),a=n(colormaps[e].b);return t?function(e){return{r:i(1-e),g:r(1-e),b:a(1-e)}}:function(e){return{r:i(e),g:r(e),b:a(e)}}}var defaultPlotColor="rgb(0,127,255)",mathcellStyle=document.createElement("style");function isosurface(e,t,n,i,r={}){t.length<3&&(t[2]=50),n.length<3&&(n[2]=50),i.length<3&&(i[2]=50),"color"in r||(r.color=defaultPlotColor),"opacity"in r||(r.opacity=1),"material"in r||(r.material="phong");for(var a=("level"in r?r.level:0),o=(t[1]-t[0])/(t[2]-1),s=(n[1]-n[0])/(n[2]-1),l=(i[1]-i[0])/(i[2]-1),c=[],p=0,d=0;d<t[2];d++){c[d]=[];for(var u=t[0]+d*o,h=0;h<n[2];h++){var f=n[0]+h*s;c[d][h]=[];for(var g=0;g<i[2];g++){var m=i[0]+g*l;c[d][h][g]=[u,f,m,e(u,f,m),p],p++}}}function v(e,t){var n=e[4]<t[4]?e[4]+t[4]*t[4]:e[4]*e[4]+t[4],i=$[n];return i||(i=(a-e[3])/(t[3]-e[3]),[e[0]+i*(t[0]-e[0]),e[1]+i*(t[1]-e[1]),e[2]+i*(t[2]-e[2]),n])}for(var x,y,b,M=[],w=[],$={},d=0;d<t[2]-1;d++)for(h=0;h<n[2]-1;h++)for(g=0;g<i[2]-1;g++){var E=c[d][h][g],k=c[d][h+1][g],T=c[d+1][h+1][g],z=c[d+1][h][g],R=c[d][h][g+1],A=c[d][h+1][g+1],F=c[d+1][h+1][g+1],L=c[d+1][h][g+1],H=[],S=0;if(E[3]<a&&(S+=1),k[3]<a&&(S+=2),T[3]<a&&(S+=4),z[3]<a&&(S+=8),R[3]<a&&(S+=16),A[3]<a&&(S+=32),F[3]<a&&(S+=64),L[3]<a&&(S+=128),0!==edgeTable[S]&&255!==edgeTable[S]){1&edgeTable[S]&&(H[0]=v(E,k)),2&edgeTable[S]&&(H[1]=v(k,T)),4&edgeTable[S]&&(H[2]=v(T,z)),8&edgeTable[S]&&(H[3]=v(z,E)),16&edgeTable[S]&&(H[4]=v(R,A)),32&edgeTable[S]&&(H[5]=v(A,F)),64&edgeTable[S]&&(H[6]=v(F,L)),128&edgeTable[S]&&(H[7]=v(L,R)),256&edgeTable[S]&&(H[8]=v(E,R)),512&edgeTable[S]&&(H[9]=v(k,A)),1024&edgeTable[S]&&(H[10]=v(T,F)),2048&edgeTable[S]&&(H[11]=v(z,L));for(var C=0;-1!=triangleTable[S][C];C+=3)x=H[triangleTable[S][C]],Number.isInteger(x)||(p=x[3],x=M.push(x.slice(0,3))-1,$[p]=x),y=H[triangleTable[S][C+1]],Number.isInteger(y)||(p=y[3],y=M.push(y.slice(0,3))-1,$[p]=y),b=H[triangleTable[S][C+2]],Number.isInteger(b)||(p=b[3],b=M.push(b.slice(0,3))-1,$[p]=b),w.push([x,y,b])}}return[{vertices:M,faces:w,options:r,type:"surface"}]}mathcellStyle.type="text/css",mathcellStyle.innerHTML=`

.mathcell {

  width: 480px;
  margin: 5px auto 5px auto;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0px 20px 20px 20px;
  line-height: 1.5;

}

input[type=text] {

  -webkit-appearance: none;
  box-shadow: none;
  border: 1px solid black;
  border-radius: 5px;

}

input[type=number] {

  -webkit-appearance: none;
  -moz-appearance:textfield;
  box-shadow: none;
  border: 1px solid black;
  border-radius: 5px;

}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {

  -webkit-appearance: none;
  margin: 0;

}

input[type=radio] {

  display: none;

}

input[type=radio] + label {

  display: inline-block;
  vertical-align: middle;
  min-width: 25px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #eee;

}

input[type=radio]:checked + label {

  border-width: 2px;
  background-color: #fafafa

}

/*
Generated at http://www.cssportal.com/style-input-range/
Thumb is 20px by 25px with 5px radius
Track is 10px high with 3px radius
For MS, 1px margins top and right to avoid cutoffs
Replace when major browsers support common styling
*/

input[type=range] {

  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;

}

input[type=range]:focus {

  outline: none;

}

input[type=range]::-webkit-slider-runnable-track {

  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #000000;

}

input[type=range]::-webkit-slider-thumb {

  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;

}

input[type=range]:focus::-webkit-slider-runnable-track {

  background: #FFFFFF;

}

input[type=range]::-moz-range-track {

  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #000000;

}

input[type=range]::-moz-range-thumb {

  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;

}

input[type=range]::-ms-track {

  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;

}

input[type=range]::-ms-fill-lower {

  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 3px;
  box-shadow: 0px 0px 0px #000000;

}

input[type=range]::-ms-fill-upper {

  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 3px;
  box-shadow: 0px 0px 0px #000000;
  margin-right: 1px;

}

input[type=range]::-ms-thumb {

  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #000000;
  height: 18px;
  width: 25px;
  border-radius: 5px;
  background: #eee;
  cursor: pointer;
  margin-top: 1px;

}

input[type=range]:focus::-ms-fill-lower {

  background: #FFFFFF;

}

input[type=range]:focus::-ms-fill-upper {

  background: #FFFFFF;

}

/* not in cssportal */

input[type=range]::-moz-focus-outer {

  border: 0;

}

`,document.getElementsByTagName("head")[0].appendChild(mathcellStyle);var edgeTable=[0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0],triangleTable=[[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1],[3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1],[3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1],[3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1],[9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1],[1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1],[9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1],[2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1],[8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1],[9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1],[4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1],[3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1],[1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1],[4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1],[4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1],[9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1],[1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1],[5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1],[2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1],[9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1],[0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1],[2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1],[10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1],[4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1],[5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1],[5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1],[9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1],[0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1],[1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1],[10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1],[8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1],[2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1],[7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1],[9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1],[2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1],[11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1],[9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1],[5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1],[11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1],[11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1],[1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1],[9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1],[5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1],[2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1],[0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1],[5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1],[6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1],[0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1],[3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1],[6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1],[5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1],[1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1],[10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1],[6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1],[1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1],[8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1],[7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1],[3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1],[5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1],[0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1],[9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1],[8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1],[5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1],[0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1],[6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1],[10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1],[10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1],[8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1],[1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1],[3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1],[0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1],[10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1],[0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1],[3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1],[6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1],[9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1],[8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1],[3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1],[6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1],[0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1],[10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1],[10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1],[1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1],[2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1],[7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1],[7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1],[2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1],[1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1],[11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1],[8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1],[0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1],[7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1],[10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1],[2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1],[6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1],[7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1],[2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1],[1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1],[10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1],[10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1],[0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1],[7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1],[6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1],[8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1],[9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1],[6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1],[1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1],[4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1],[10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1],[8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1],[0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1],[1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1],[8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1],[10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1],[4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1],[10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1],[5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1],[11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1],[9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1],[6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1],[7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1],[3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1],[7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1],[9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1],[3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1],[6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1],[9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1],[1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1],[4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1],[7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1],[6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1],[3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1],[0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1],[6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1],[1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1],[0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1],[11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1],[6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1],[5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1],[9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1],[1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1],[1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1],[10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1],[0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1],[5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1],[10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1],[11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1],[0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1],[9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1],[7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1],[2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1],[8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1],[9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1],[9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1],[1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1],[9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1],[9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1],[5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1],[0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1],[10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1],[2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1],[0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1],[0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1],[9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1],[5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1],[3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1],[5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1],[8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1],[0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1],[9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1],[0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1],[1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1],[3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1],[4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1],[9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1],[11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1],[11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1],[2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1],[9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1],[3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1],[1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1],[4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1],[4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1],[0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1],[3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1],[3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1],[0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1],[9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1],[1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];function isoline(e,t,n,i={}){t.length<3&&(t[2]=100),n.length<3&&(n[2]=100),"color"in i||(i.color=defaultPlotColor),"opacity"in i||(i.opacity=1);for(var r=("level"in i?i.level:0),a=(t[1]-t[0])/(t[2]-1),o=(n[1]-n[0])/(n[2]-1),s=[],l=0;l<t[2];l++){s[l]=[];for(var c=t[0]+l*a,p=0;p<n[2];p++){var d=n[0]+p*o;s[l][p]=[c,d,e(c,d)]}}function u(e,t){var n=(r-e[2])/(t[2]-e[2]);return[e[0]+n*(t[0]-e[0]),e[1]+n*(t[1]-e[1])]}for(var h=[],l=0;l<s.length-1;l++)for(p=0;p<s[l].length-1;p++){var f=s[l][p],g=s[l+1][p],m=s[l+1][p+1],v=s[l][p+1],x=0,y=(f[2]<r&&(x+=1),g[2]<r&&(x+=2),m[2]<r&&(x+=4),v[2]<r&&(x+=8),[]),b=[];switch(x){case 0:case 15:continue;case 1:y=[u(f,g),u(v,f)];break;case 2:y=[u(g,m),u(f,g)];break;case 3:y=[u(g,m),u(v,f)];break;case 4:y=[u(m,v),u(g,m)];break;case 5:y=[u(m,v),u(v,f)],b=[u(f,g),u(g,m)];break;case 6:y=[u(m,v),u(f,g)];break;case 7:y=[u(m,v),u(v,f)];break;case 8:y=[u(v,f),u(m,v)];break;case 9:y=[u(f,g),u(m,v)];break;case 10:y=[u(v,f),u(f,g)],b=[u(g,m),u(m,v)];break;case 11:y=[u(g,m),u(m,v)];break;case 12:y=[u(v,f),u(g,m)];break;case 13:y=[u(f,g),u(g,m)];break;case 14:y=[u(v,f),u(f,g)]}h.push({points:y,options:i,type:"line"}),0<b.length&&h.push({points:b,options:i,type:"line"})}return h}function isoband(e,t,n,i={}){t.length<3&&(t[2]=75),n.length<3&&(n[2]=75),"color"in i||(i.color=defaultPlotColor),"opacity"in i||(i.opacity=1);for(var r=("level"in i?i.level:0),a=(t[1]-t[0])/(t[2]-1),o=(n[1]-n[0])/(n[2]-1),s=[],l=0;l<t[2];l++){s[l]=[];for(var c=t[0]+l*a,p=0;p<n[2];p++){var d=n[0]+p*o;s[l][p]=[c,d,e(c,d)]}}function u(e,t){var n=(r-e[2])/(t[2]-e[2]);return[e[0]+n*(t[0]-e[0]),e[1]+n*(t[1]-e[1])]}for(var h=[],l=0;l<s.length-1;l++)for(p=0;p<s[l].length-1;p++){var f=s[l][p],g=s[l+1][p],m=s[l+1][p+1],v=s[l][p+1],x=0,y=(f[2]<r&&(x+=1),g[2]<r&&(x+=2),m[2]<r&&(x+=4),v[2]<r&&(x+=8),[]);switch(x){case 0:continue;case 1:y=[u(f,g),u(v,f),f];break;case 2:y=[u(g,m),u(f,g),g];break;case 3:y=[u(g,m),u(v,f),f,g];break;case 4:y=[u(m,v),u(g,m),m];break;case 5:y=[u(m,v),u(v,f),f,u(f,g),u(g,m),m];break;case 6:y=[u(m,v),u(f,g),g,m];break;case 7:y=[u(m,v),u(v,f),f,g,m];break;case 8:y=[u(v,f),u(m,v),v];break;case 9:y=[u(f,g),u(m,v),v,f];break;case 10:y=[u(v,f),u(f,g),g,u(g,m),u(m,v),v];break;case 11:y=[u(g,m),u(m,v),v,f,g];break;case 12:y=[u(v,f),u(g,m),m,v];break;case 13:y=[u(f,g),u(g,m),m,v,f];break;case 14:y=[u(v,f),u(f,g),g,m,v];break;case 15:y=[f,g,m,v]}i.fill=!0,h.push({points:y,options:i,type:"line"})}return h}var matplotlib={gray:{r:[[e=>e,[0,1]]],g:[[e=>e,[0,1]]],b:[[e=>e,[0,1]]]},spring:{r:[[e=>1,[0,1]]],g:[[e=>e,[0,1]]],b:[[e=>1-e,[0,1]]]},summer:{r:[[e=>e,[0,1]]],g:[[e=>(e+1)/2,[0,1]]],b:[[e=>.4,[0,1]]]},autumn:{r:[[e=>1,[0,1]]],g:[[e=>e,[0,1]]],b:[[e=>0,[0,1]]]},winter:{r:[[e=>0,[0,1]]],g:[[e=>e,[0,1]]],b:[[e=>1-e/2,[0,1]]]},cool:{r:[[e=>e,[0,1]]],g:[[e=>1-e,[0,1]]],b:[[e=>1,[0,1]]]},hot:{r:[[lerp([0,.0416],[.365079,1]),[0,.365079]],[e=>1,[.365079,1]]],g:[[e=>0,[0,.365079]],[lerp([.365079,0],[.746032,1]),[.365079,.746032]],[e=>1,[.746032,1]]],b:[[e=>0,[0,.746032]],[lerp([.746032,0],[1,1]),[.746032,1]]]},copper:{r:[[lerp([0,0],[.809524,1]),[0,.809524]],[e=>1,[.809524,1]]],g:[[e=>.7812*e,[0,1]]],b:[[e=>.4975*e,[0,1]]]},bwr:{r:[[e=>2*e,[0,.5]],[e=>1,[.5,1]]],g:[[e=>2*e,[0,.5]],[e=>2*(1-e),[.5,1]]],b:[[e=>1,[0,.5]],[e=>2*(1-e),[.5,1]]]},hsv:{r:[[e=>colorFromHue(e).r,[0,1]]],g:[[e=>colorFromHue(e).g,[0,1]]],b:[[e=>colorFromHue(e).b,[0,1]]]},ocean:{r:[[e=>0,[0,.667]],[e=>3*e-2,[.667,1]]],g:[[e=>Math.abs((3*e-1)/2),[0,1]]],b:[[e=>e,[0,1]]]},brg:{r:[[e=>2*e,[0,.5]],[e=>2*(1-e),[.5,1]]],g:[[e=>0,[0,.5]],[e=>2*e-1,[.5,1]]],b:[[e=>1-2*e,[0,.5]],[e=>0,[.5,1]]]},rainbow:{r:[[e=>Math.abs(2*e-.5),[0,.75]],[e=>1,[.75,1]]],g:[[e=>Math.sin(Math.PI*e),[0,1]]],b:[[e=>Math.cos(Math.PI/2*e),[0,1]]]},jet:{r:[[e=>0,[0,.35]],[lerp([.35,0],[.66,1]),[.35,.66]],[e=>1,[.66,.89]],[lerp([.89,1],[1,.5]),[.89,1]]],g:[[e=>0,[0,.125]],[lerp([.125,0],[.375,1]),[.125,.375]],[e=>1,[.375,.64]],[lerp([.64,1],[.91,0]),[.64,.91]],[e=>0,[.91,1]]],b:[[lerp([0,.5],[.11,1]),[0,.11]],[e=>1,[.11,.34]],[lerp([.34,1],[.65,0]),[.34,.65]],[e=>0,[.65,1]]]}},mathematica={density:{r:[[e=>.129+1.532*e,[0,.5]],[e=>.775+.25*e,[.5,.9]],[e=>1,[.9,1]]],g:[[e=>.331+.597*e,[0,1]]],b:[[e=>.54+1.18*e,[0,.1]],[e=>.75-.92*e,[.1,.5]],[e=>.775*e-.0975,[.5,.9]],[e=>1.5*e-.75,[.9,1]]]},sunset:{r:[[e=>2.313*e,[0,.32]],[e=>.391+1.181*e,[.32,.5]],[e=>.972+.033*e,[.5,1]]],g:[[e=>.792*e,[0,.35]],[e=>1.281*e-.179,[.35,.82]],[e=>.281+.719*e,[.82,1]]],b:[[e=>3.025*e,[0,.17]],[e=>.73-1.365*e,[.17,.5]],[e=>.482*e-.19,[.5,.67]],[e=>2.168*e-1.316,[.67,.82]],[e=>3.031*e-2.032,[.82,1]]]},thermometer:{r:[[e=>.11+1.829*e-1.445*e**3,[0,1]]],g:[[e=>.035+3.79*e-4.689*e**2+.877*e**3,[0,1]]],b:[[e=>.777+1.558*e-3.767*e**2+1.587*e**3,[0,1]]]},watermelon:{r:[[e=>.1+1.301*e,[0,.15]],[e=>.137+1.029*e,[.15,.7]],[e=>.458+.575*e,[.7,.85]],[e=>1.336-.452*e,[.85,1]]],g:[[e=>.097+2.078*e-1.327*e**2,[0,.55]],[e=>.794+.1*e,[.55,.72]],[e=>1.56-.973*e,[.72,.85]],[e=>2.897-2.536*e,[.85,1]]],b:[[e=>.0975+.836*e,[0,.3]],[e=>.012+1.13*e,[.3,.55]],[e=>.197+.808*e,[.55,.72]],[e=>1.019-.343*e,[.72,.85]],[e=>2.886-2.525*e,[.85,1]]]},cherry:{r:[[e=>.216+2.437*e,[0,.14]],[e=>.383+1.267*e,[.14,.3]],[e=>.57+.621*e,[.3,.42]],[e=>.721+.272*e,[.42,1]]],g:[[e=>.215-.409*e,[0,.15]],[e=>.13+.176*e,[.15,.3]],[e=>.089+.0576*e+.86*e**2,[.3,1]]],b:[[e=>.215-.405*e,[0,.15]],[e=>.133+.166*e,[.15,.28]],[e=>.075+.12*e+.813*e**2,[.28,1]]]},rust:{r:[[e=>1.556*e,[0,.5]],[e=>.556+.444*e,[.5,1]]],g:[[e=>.742*e,[0,.5]],[e=>.265+.208*e,[.5,1]]],b:[[e=>.191-.242*e,[0,.5]],[e=>.105-.069*e,[.5,1]]]},rainbow2:{r:[[e=>.471-2.566*e,[0,.05]],[e=>.423-2.045*e+6.551*e**2-4.092*e**3,[.05,1]]],g:[[e=>.107+.24*e,[0,.07]],[e=>2.669*e-.062-2.012*e**2-.476*e**4,[.07,1]]],b:[[e=>.523+2.692*e-6.33*e**2,[0,.4]],[e=>1.212-1.534*e,[.4,.55]],[e=>.919-.994*e,[.55,.62]],[e=>.556-.421*e,[.62,1]]]},temperature:{r:[[e=>.176+1.633*e,[0,.15]],[e=>.098+2.162*e,[.15,.35]],[e=>.092+3.098*e-2.643*e**2,[.35,.67]],[e=>1.362-.547*e,[.67,1]]],g:[[e=>.305+1.627*e,[0,.4]],[e=>.739+.501*e,[.4,.5]],[e=>1-.018*e,[.5,.67]],[e=>.185+3.688*e-3.731*e**2,[.67,1]]],b:[[e=>.928+.154*e,[0,.42]],[e=>1.404-.985*e,[.42,.5]],[e=>2.014-2.205*e,[.5,.58]],[e=>2.807-3.569*e,[.58,.67]],[e=>1.561-1.703*e,[.67,.75]],[e=>.637-.473*e,[.75,1]]]}},colormaps=Object.assign({},matplotlib,mathematica);function plot(t,e,n={}){e.length<3&&(e[2]=200),"color"in n||(n.color=defaultPlotColor),"opacity"in n||(n.opacity=1);var i=[];return linspace(e[0],e[1],e[2]).forEach(e=>i.push([e,t(e)])),[{points:i,options:n,type:"line"}]}function listPlot(e,t={}){if(Array.isArray(arguments[1])){e=JSON.parse(JSON.stringify(e));for(var n=arguments[0][0].length-1,i=1;i<arguments.length;i++)if(Array.isArray(arguments[i]))for(var r=0;r<arguments[0].length;r++)e[r][n]+=arguments[i][r][n];t=Array.isArray(arguments[arguments.length-1])?{}:arguments[arguments.length-1]}return"color"in t||(t.color=defaultPlotColor),"opacity"in t||(t.opacity=1),[{points:e,options:t,type:"line"}]}function polarPlot(t,e,n={}){return e.length<3&&(e[2]=200),parametric(e=>[t(e)*Math.cos(e),t(e)*Math.sin(e)],e,n)}function parametric(e,t,n,i={}){var r=Math.random(),a=t.length<3?50:t[2],o=(t[1]-t[0])/a;if(!Array.isArray(n)){Array.isArray(e(r))||(M=e,e=e=>[e,M(e)]);for(var s=[],l=0;l<=a;l++){var c=t[0]+l*o;s.push(e(c))}return line(s,n)}"color"in i||(i.color=defaultPlotColor),"opacity"in i||(i.opacity=1),"material"in i||(i.material="phong");var p=n.length<3?50:n[2],d=(n[1]-n[0])/p,u=(Array.isArray(e(r,r))||(M=e,e=(e,t)=>[e,t,M(e,t)]),[]);"colormap"in i&&(i.colors=[]);for(l=0;l<=p;l++)for(var h=n[0]+l*d,f=0;f<=a;f++){var g=e(c=t[0]+f*o,h);if("complexFunction"in i)switch("object"==typeof g[2]&&"re"in g[2]||(g[2]={re:g[2],im:0}),i.complexFunction){case"re":u.push([g[0],g[1],g[2].re]);break;case"im":u.push([g[0],g[1],g[2].im]);break;case"abs":u.push([g[0],g[1],Math.hypot(g[2].re,g[2].im)]);break;default:throw Error("Unsupported complex function case")}else u.push(g);"colormap"in i&&("complexArgument"===i.colormap&&i.colors.push(colorFromArg(g[2])),"function"==typeof i.colormap)&&i.colors.push(i.colormap(c,h))}for(var m,v,x=[],y=[],b=a+1,l=0;l<p;l++)for(f=0;f<a;f++){var M=[f+b*l,f+b*l+1,f+b*(l+1)+1,f+b*(l+1)];if(i.maxFaceSlope){var w=i.maxFaceSlope;if(Math.abs((u[M[0]][2]-u[M[1]][2])/o)>w||Math.abs((u[M[1]][2]-u[M[2]][2])/d)>w||Math.abs((u[M[2]][2]-u[M[3]][2])/o)>w||Math.abs((u[M[3]][2]-u[M[0]][2])/d)>w){M.forEach(e=>{y.includes(e)||y.push(e)});continue}}x.push(M)}return 0<y.length&&(m=new Set(x.flat()),v=u[m.values().next().value][2],y.forEach(e=>{m.has(e)||(u[e][2]=v)})),[{vertices:u,faces:x,options:i,type:"surface"}]}function wireframe(e,t,n,i={}){i.openEnded||(i.openEnded=!0);for(var r,a=Math.random(),o=t.length<3?50:t[2],s=(t[1]-t[0])/o,l=n.length<3?50:n[2],c=(n[1]-n[0])/l,p=(Array.isArray(e(a,a))||(r=e,e=(e,t)=>[e,t,r(e,t)]),[]),d=0;d<=o;d++){for(var u=t[0]+d*s,h=[],f=0;f<=l;f++){var g=n[0]+f*c;h.push(e(u,g))}line(h,i).forEach(e=>p.push(e))}for(d=0;d<=l;d++){for(g=n[0]+d*c,h=[],f=0;f<=o;f++){u=t[0]+f*s;h.push(e(u,g))}line(h,i).forEach(e=>p.push(e))}return p}function surfaceFromLines(t,e={}){if("color"in e||(e.color=defaultPlotColor),"opacity"in e||(e.opacity=1),"material"in e||(e.material="phong"),!t.every(e=>e.length===t[0].length))throw Error("All lines must be of equal length");for(var n=[],i=(a=(a=[]).concat(t[0])).length,r=1;r<t.length;r++)for(var a=a.concat(t[r]),o=0;o<i-1;o++)n.push([(r-1)*i+o,(r-1)*i+o+1,r*i+o+1,r*i+o]);return[{vertices:a,faces:n,options:e,type:"surface"}]}function diskFromLines(t,e={}){if("color"in e||(e.color=defaultPlotColor),"opacity"in e||(e.opacity=1),"material"in e||(e.material="phong"),!t.every(e=>e.length===t[0].length))throw Error("All lines must be of equal length");for(var n=[],i=[],r=(n=n.concat(t[0])).length-1,a=1;a<t.length;a++){n=n.concat(t[a].slice(1)),i.push([0,(a-1)*r+1,a*r+1]);for(var o=1;o<r;o++)i.push([(a-1)*r+o,(a-1)*r+o+1,a*r+o+1,a*r+o])}i.push([0,(a-1)*r+1,1]);for(o=1;o<r;o++)i.push([(a-1)*r+o,(a-1)*r+o+1,o+1,o]);return[{vertices:n,faces:i,options:e,type:"surface"}]}function slopeField(e,t,n,i,r={}){t.length<3&&(t[2]=20),n.length<3&&(n[2]=20);var a=(t[1]-t[0])/t[2],o=(n[1]-n[0])/n[2],s=[],l=[];function c(e,t){for(var n=0;n<e.length;n++)e[n]*=t;return e}if(!Array.isArray(i)){for(var p=.25*Math.min(a,o),d=0;d<=t[2];d++)for(var u=t[0]+d*a,h=0;h<=n[2];h++){var f=c(normalize([1,e(u,m=n[0]+h*o)]),p);s.push(line(translate([[-f[0],-f[1]],[f[0],f[1]]],[u,m]),i)[0])}return s}i.length<3&&(i[2]=20);for(var g=(i[1]-i[0])/i[2],p=.25*Math.min(a,o,g),d=0;d<=t[2];d++)for(u=t[0]+d*a,h=0;h<=n[2];h++)for(var m=n[0]+h*o,v=0;v<=i[2];v++){var x=i[0]+v*g;f=translate([[-(f=c(normalize([1,e(u,m,x)[0],e(u,m,x)[1]]),p))[0],-f[1],-f[2]],[f[0],f[1],f[2]]],[u,m,x]),l.push(f[0],f[1])}return r.useLineSegments=!0,line(l,r)}function arrow(e,t,n={}){var i,r,a;return"color"in n||(n.color=defaultPlotColor),"opacity"in n||(n.opacity=1),2===e.length?(n.fill=!0,i=normalize([t[0]-e[0],t[1]-e[1]]),i=normalize([(a=[i[1],-i[0]])[0]-i[0],a[1]-i[1]]),r=.05*(n.size||1),[{points:[e,t,i=[t[0]+r*i[0],t[1]+r*i[1]],[i[0]-Math.sqrt(2)*r*a[0],i[1]-Math.sqrt(2)*r*a[1]],t],options:n,type:"line"}]):(i=Math.sqrt((t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2)/2,r=.1*(n.size||1),a=[(t[0]+e[0])/2,(t[1]+e[1])/2,(t[2]+e[2])/2],t=normalize([t[0]-e[0],t[1]-e[1],t[2]-e[2]]),n.center=a,n.axis=t,e=cylinder(r/3,2*i,n)[0],a=[a[0]+i*t[0],a[1]+i*t[1],a[2]+i*t[2]],n.center=a,[e,cone(r,r,n)[0]])}function text(e,t,n={}){return"color"in n||(n.color="black"),"fontSize"in n||(n.fontSize=14),[{text:e,point:t,options:n,type:"text"}]}function point(e,t={}){return"color"in t||(t.color=defaultPlotColor),"opacity"in t||(t.opacity=1),"size"in t||(t.size=1),[{point:e,options:t,type:"point"}]}function line(e,t={}){if("color"in t||(t.color=defaultPlotColor),"opacity"in t||(t.opacity=1),"radius"in t){var n=[];t.endcaps&&(t.center=e[0],n.push(sphere(t.radius,t)[0]));for(var i=1;i<e.length;i++){var r=e[i-1],a=e[i],o=Math.sqrt((a[0]-r[0])**2+(a[1]-r[1])**2+(a[2]-r[2])**2);t.axis=[a[0]-r[0],a[1]-r[1],a[2]-r[2]],t.center=[(r[0]+a[0])/2,(r[1]+a[1])/2,(r[2]+a[2])/2],n.push(cylinder(t.radius,o,t)[0]),t.endcaps&&(t.center=a,n.push(sphere(t.radius,t)[0]))}return n}return[{points:e,options:t,type:"line"}]}function box(e,t,n,i={}){"color"in i||(i.color=defaultPlotColor),"opacity"in i||(i.opacity=1);e/=2,t/=2,n/=2,e=[[e,t,n],[-e,t,n],[-e,-t,n],[e,-t,n],[e,t,-n],[-e,t,-n],[-e,-t,-n],[e,-t,-n]];return"axis"in i&&rotateFromZAxis(e,i.axis),"center"in i&&translate(e,i.center),[{vertices:e,faces:[[0,1,2,3],[4,7,6,5],[0,4,5,1],[2,6,7,3],[0,3,7,4],[1,5,6,2]],options:i,type:"surface"}]}function sphere(e,t={}){"color"in t||(t.color=defaultPlotColor),"opacity"in t||(t.opacity=1);for(var n=("steps"in t?t.steps:20),i=e,r=[[0,0,i],[0,0,-i]],a=[],o=1;o<n;o++)for(var s=Math.PI*o/n,l=0;l<n;l++){var c=2*Math.PI*l/n;r.push([i*Math.sin(s)*Math.cos(c),i*Math.sin(s)*Math.sin(c),i*Math.cos(s)])}for(o=2;o<n+1;o++)a.push([0,o,o+1]);a.push([0,n+1,2]);for(o=1;o<n-1;o++){for(var p=(o-1)*n+2,l=0;l<n-1;l++)a.push([p+l,p+l+n,p+l+1+n,p+l+1]);a.push([p+n-1,p+2*n-1,p+n,p])}for(o=r.length-n;o<r.length-1;o++)a.push([1,o+1,o]);return a.push([1,r.length-n,r.length-1]),"center"in t&&translate(r,t.center),[{vertices:r,faces:a,options:t,type:"surface"}]}function ellipsoid(t,n,i,e={}){"color"in e||(e.color=defaultPlotColor),"opacity"in e||(e.opacity=1);var r=sphere(1,{steps:e.steps||20})[0];return r.vertices.forEach(e=>{e[0]*=t,e[1]*=n,e[2]*=i}),"axis"in e&&rotateFromZAxis(r.vertices,e.axis),"center"in e&&translate(r.vertices,e.center),[{vertices:r.vertices,faces:r.faces,options:e,type:"surface"}]}function cylinder(e,t,n={}){"color"in n||(n.color=defaultPlotColor),"opacity"in n||(n.opacity=1),n.endcaps&&(n.openEnded=!0);for(var i=("steps"in n?n.steps:20),r=e,a=t/2,o=[[0,0,a],[0,0,-a]],s=[],l=0;l<i;l++){var c=2*Math.PI*l/i;o.push([r*Math.cos(c),r*Math.sin(c),a],[r*Math.cos(c),r*Math.sin(c),-a])}if(!n.openEnded){for(l=2;l<o.length-3;l+=2)s.push([0,l,l+2]);s.push([0,o.length-2,2])}for(l=2;l<o.length-3;l+=2)s.push([l,l+1,l+3,l+2]);if(s.push([o.length-2,o.length-1,3,2]),!n.openEnded){for(l=2;l<o.length-3;l+=2)s.push([1,l+3,l+1]);s.push([1,3,o.length-1])}return"axis"in n&&rotateFromZAxis(o,n.axis),"center"in n&&translate(o,n.center),[{vertices:o,faces:s,options:n,type:"surface"}]}function cone(e,t,n={}){"color"in n||(n.color=defaultPlotColor),"opacity"in n||(n.opacity=1);for(var i=("steps"in n?n.steps:20),r=e,a=t/2,o=[[0,0,-a],[0,0,a]],s=[],l=0;l<i;l++){var c=2*Math.PI*l/i;o.push([r*Math.cos(c),r*Math.sin(c),-a])}for(l=2;l<o.length-1;l++)s.push([0,l,l+1],[1,l,l+1]);return s.push([0,o.length-1,2],[1,o.length-1,2]),"axis"in n&&rotateFromZAxis(o,n.axis),"center"in n&&translate(o,n.center),[{vertices:o,faces:s,options:n,type:"surface"}]}function svg(e,t,n){var N="backgroundColor"in n?n.backgroundColor:"white",i="axesColor"in n?n.axesColor:"black",t=JSON.parse(JSON.stringify(t,dataReplacer),dataReviver);function B(e){return(new DOMParser).parseFromString(e,"text/html").documentElement.textContent.length}function j(e){for(var t=0;t<100&&roundTo(e,t,!1)!==e;t++);return t}function O(e,t=1e-10){return e=Math.abs(e)<t?0:e}for(var r=("output"in n?n.output:""),e=document.getElementById(e+"output"+r),r=e.offsetWidth,e=e.offsetHeight,a=(n.includeOrigin&&t.push([{points:[[0,0]],options:{color:"",opacity:0},type:"line"}]),[]),o=[],s=[],l=0;l<t.length;l++)for(var c=0;c<t[l].length;c++){var p=t[l][c];"text"===p.type&&a.push(p),"point"===p.type&&o.push(p),"line"===p.type&&s.push(p)}for(var d=[],l=0;l<a.length;l++)d.push(a[l].point);for(l=0;l<o.length;l++)d.push(o[l].point);for(l=0;l<s.length;l++)s[l].points.forEach(e=>d.push(e));var u=minMax(d,0),h=minMax(d,1),f=(h.min===-1/0&&(h.min=-numericInfinity),h.max===1/0&&(h.max=numericInfinity),"xMin"in n?n.xMin:floorTo(u.min,4,!1)),g="xMax"in n?n.xMax:ceilTo(u.max,4,!1),m="yMin"in n?n.yMin:floorTo(h.min,4,!1),v="yMax"in n?n.yMax:ceilTo(h.max,4,!1),u=(f===g&&(--f,g+=1),m===v&&(--m,v+=1),n.equalLimits&&(f<m?m=f:f=m,v<g?v=g:g=v),g-f),h=v-m,I=r/u,D=e/h,V=(n.equalAspect&&(D=I),!("axes"in n)||n.axes),x=(V||(n.ticks=!1),"ticks"in n?n.ticks:["auto","auto"]),q=("auto"===(x="none"===(x="auto"===x?["auto","auto"]:x)?!1:x)[0]&&(x[0]=Math.pow(10,Math.floor(Math.log10(u))),3*x[0]>u&&(x[0]/=2),4*x[0]>u)&&(x[0]/=2),"auto"===x[1]&&(x[1]=Math.pow(10,Math.floor(Math.log10(h))),3*x[1]>h&&(x[1]/=2),4*x[1]>h)&&(x[1]/=2),j(x[0])),J=j(x[1]),u=10*Math.max(roundTo(m,J,!1).toString().length,roundTo(v,J,!1).toString().length,roundTo(3*x[1],J,!1).toString().length),y=10,b=16,h="axesLabels"in n?n.axesLabels[0]:"",W=0<h.length?Math.max(20,15*B(h)):0,U="axesLabels"in n?n.axesLabels[1]:"",M=4.5*B(U),w=0<U.length?20:0,$=Math.round(-f*I),E=$,k=x?Math.max(20,u+y-$,M-$):20,X=r+k+20+W,_=k,T=($<0&&(E=-30,X=r+(k=x?Math.max(20,u+y,M):20)+50+W,_=k+30),r<$&&(E=r+30,X=r+(k=x?Math.max(u,M,W):W)+50,y=x?-u:20),Math.round(v*D)),z=T,M=e+40+w,k=20+w,R=(T<0&&(z=-30,M=e+50+w+b,k=30+b,b=-6,0<w)&&(w+=12),e<T&&(z=e+30,M=e+50+w+1.5*b),V||(k=_=5,X=r+10,M=e+10),`
<svg width="${r}" height="${e}" preserveAspectRatio="none"
     viewBox="${-_} ${-k} ${X} ${M}"
     xmlns="http://www.w3.org/2000/svg" style="background-color: ${N}">`);if(V){if(R=R+`<path d="M -20 ${z} L ${r+20} ${z}" stroke="${i}"/>`+`<path d="M ${E} -20 L ${E} ${e+20}" stroke="${i}"/>`,x){for(l=x[0]*Math.ceil(f/x[0]);l<=g;l+=x[0])(0!==O(l)||T!==z&&0===w)&&(R=(R+=`<path d="M ${H=Math.round($+I*l)} ${z} L ${H} ${z-5*Math.sign(b)}"
                        stroke="${i}" />`)+`<text x="${H}" y="${z+b}" fill="${i}"
                        font-family="monospace" text-anchor="middle">
                  ${+l.toFixed(q)}</text>`);for(l=x[1]*Math.ceil(m/x[1]);l<=v;l+=x[1])(0!==O(l)||$!==E&&0===W)&&(R=(R+=`<path d="M ${E} ${S=Math.round(T-D*l)} L ${E+5*Math.sign(y)} ${S}"
                        stroke="${i}" />`)+`<text x="${E-y}" y="${S}" fill="${i}"
                        font-family="monospace" text-anchor="end" dominant-baseline="central">
                  ${+l.toFixed(J)}</text>`)}R=R+`<text x="${r+20+Math.abs(y)}" y="${z}"
            font-family="monospace" font-size="110%" font-weight="bold" fill="${i}"
            dominant-baseline="central">${h}</text>`+`<text x="${E}" y="${-20-w/2}"
            font-family="monospace" font-size="110%" font-weight="bold" fill="${i}"
            text-anchor="middle">${U}</text>`}function A(e){return roundTo($+I*e,2,!1)}function F(e){return roundTo(T-D*e,2,!1)}for(l=0;l<s.length;l++){for(var L=s[l],c=(L.points.forEach(e=>{e[1]<m&&(e[1]=m-1),e[1]>v&&(e[1]=v+1)}),0);isNaN(L.points[c][1]);)c++;for(var H=L.points[c][0],S=L.points[c][1],G=(R+=`<path d="M ${A(H)} `+F(S),H),C=S,Z=!1,Y=c+1;Y<L.points.length;Y++){function P(e){return(e-C)/(S-C)*(H-G)+G}H=L.points[Y][0],S=L.points[Y][1],isNaN(S)?Z=!0:(m<=C&&m<=S&&C<=v&&S<=v&&(Z?(R+=` M ${A(H)} `+F(S),Z=!1):R+=` L ${A(H)} `+F(S)),(C<m&&S<m||v<C&&v<S)&&(R+=` M ${A(H)} `+F(S)),C<m&&v<S&&(n.includeVerticals?R=(R=(R+=` M ${A(P(m))} `+F(m))+` L ${A(P(v))} `+F(v))+` M ${A(H)} `+F(S):R+=` M ${A(H)} `+F(S)),v<C&&S<m&&(n.includeVerticals?R=(R=(R+=` M ${A(P(v))} `+F(v))+` L ${A(P(m))} `+F(m))+` M ${A(H)} `+F(S):R+=` M ${A(H)} `+F(S)),C<m&&m<=S&&S<v&&(R=(R+=` M ${A(P(m))} `+F(m))+` L ${A(H)} `+F(S)),m<=C&&C<v&&S<m&&(R=(R+=` L ${A(P(m))} `+F(m))+` M ${A(H)} `+F(S)),C<=v&&m<C&&v<S&&(R=(R+=` L ${A(P(v))} `+F(v))+` M ${A(H)} `+F(S)),v<C&&S<=v&&m<S&&(R=(R+=` M ${A(P(v))} `+F(v))+` L ${A(H)} `+F(S)),G=H,C=S)}var K=L.options.thickness||1.5;R+=`"
  stroke="${L.options.color}" stroke-width="${K}" opacity="${L.options.opacity}"
  fill="${L.options.fill?L.options.color:"none"}"/>`}for(l=0;l<o.length;l++){var Q=o[l];R+=`<circle cx="${A(Q.point[0])}" cy="${F(Q.point[1])}"
                    r="${3*Q.options.size}" fill="${Q.options.color}" opacity="${Q.options.opacity}"/>`}for(l=0;l<a.length;l++){var e1=a[l];R+=`<text x="${A(e1.point[0])}" y="${F(e1.point[1])}"
                  fill="${e1.options.color}" font-size="${e1.options.fontSize}"
                  text-anchor="middle" dominant-baseline="central">
            ${e1.text}</text>`}return R+"</svg>"}function threejsTemplate(e,t,n,i,r,a){return`
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta charset="utf-8">
<meta name=viewport content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<style>

     body { margin: 0px; overflow: hidden; }

</style>
</head>

<body>

<script src="https://cdn.jsdelivr.net/gh/paulmasson/threejs-with-controls@r135/build/three.min.js"></script>

<script>

var config = ${e};
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( config.clearColor, 1 );
document.body.appendChild( renderer.domElement );

var a = config.aspectRatio; // aspect multipliers
var animate = config.animate;

var xMin = config.xMin, yMin = config.yMin, zMin = config.zMin;
var xMax = config.xMax, yMax = config.yMax, zMax = config.zMax;

if ( xMin === xMax ) { xMin -= 1; xMax += 1; }
if ( yMin === yMax ) { yMin -= 1; yMax += 1; }
if ( zMin === zMax ) { zMin -= 1; zMax += 1; }

// apply aspect multipliers for convenience
xMin *= a[0]; yMin *= a[1]; zMin *= a[2];
xMax *= a[0]; yMax *= a[1]; zMax *= a[2];

var xRange = xMax - xMin;
var yRange = yMax - yMin;
var zRange = zMax - zMin;
var rRange = Math.sqrt( xRange*xRange + yRange*yRange );

if ( zRange > rRange && a[2] === 1 && !config.equalAspect ) {
  a[2] = rRange / zRange;
  zMin *= a[2];
  zMax *= a[2];
  zRange *= a[2];
}

var xMid = ( xMin + xMax ) / 2;
var yMid = ( yMin + yMax ) / 2;
var zMid = ( zMin + zMax ) / 2;

if ( config.frame ) {
  var vertices = [ xMin, yMin, zMin, xMax, yMax, zMax ];
  var box = new THREE.BufferGeometry();
  box.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
  var boxMesh = new THREE.Line( box );
  scene.add( new THREE.BoxHelper( boxMesh, 'black' ) );
}

if ( config.axesLabels ) {

  var d = config.decimals; // decimals
  var offsetRatio = .1;
  var al = config.axesLabels;

  var offset = offsetRatio * ( yMax - yMin );
  var xm = ( xMid/a[0] ).toFixed(d);
  if ( /^-0.?0*$/.test(xm) ) xm = xm.substr(1);
  addLabel( al[0] + '=' + xm, xMid, yMax+offset, zMin );
  addLabel( ( xMin/a[0] ).toFixed(d), xMin, yMax+offset, zMin );
  addLabel( ( xMax/a[0] ).toFixed(d), xMax, yMax+offset, zMin );

  var offset = offsetRatio * ( xMax - xMin );
  var ym = ( yMid/a[1] ).toFixed(d);
  if ( /^-0.?0*$/.test(ym) ) ym = ym.substr(1);
  addLabel( al[1] + '=' + ym, xMax+offset, yMid, zMin );
  addLabel( ( yMin/a[1] ).toFixed(d), xMax+offset, yMin, zMin );
  addLabel( ( yMax/a[1] ).toFixed(d), xMax+offset, yMax, zMin );

  var offset = offsetRatio * ( yMax - yMin );
  var zm = ( zMid/a[2] ).toFixed(d);
  if ( /^-0.?0*$/.test(zm) ) zm = zm.substr(1);
  addLabel( al[2] + '=' + zm, xMax, yMin-offset, zMid );
  addLabel( ( zMin/a[2] ).toFixed(d), xMax, yMin-offset, zMin );
  addLabel( ( zMax/a[2] ).toFixed(d), xMax, yMin-offset, zMax );

}

function addLabel( text, x, y, z, color='black', fontsize=14 ) {

  var canvas = document.createElement( 'canvas' );
  var pixelRatio = Math.round( window.devicePixelRatio );
  canvas.width = 128 * pixelRatio;
  canvas.height = 32 * pixelRatio; // powers of two
  canvas.style.width = '128px';
  canvas.style.height = '32px';

  var context = canvas.getContext( '2d' );
  context.scale( pixelRatio, pixelRatio );
  context.fillStyle = color;
  context.font = fontsize + 'px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText( text, canvas.width/2/pixelRatio, canvas.height/2/pixelRatio );

  var texture = new THREE.Texture( canvas );
  texture.needsUpdate = true;

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: texture, sizeAttenuation: false } ) );
  sprite.position.set( x, y, z );
  sprite.scale.set( 1/4, 1/16, 1 ); // ratio of width to height plus scaling
  scene.add( sprite );

}

if ( config.axes ) scene.add( new THREE.AxesHelper( Math.min( xMax, yMax, zMax ) ) );

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight,
                                          config.cameraNear ? config.cameraNear : .1,
                                          config.cameraFar ? config.cameraFar : 1000 );
camera.up.set( 0, 0, 1 );

// default auto position, followed by rotation to viewpoint direction
camera.position.set( xMid, yMid, zMid );
var defaultOffset = new THREE.Vector3( xRange, yRange, zRange );

if ( config.viewpoint !== 'auto' ) {
  var v = config.viewpoint;
  var t = new THREE.Vector3( v[0], v[1], v[2] );
  var phi = defaultOffset.angleTo( t );
  var n = t.cross( defaultOffset ).normalize();
  defaultOffset.applyAxisAngle( n, -phi );
}

camera.position.add( defaultOffset );

var lights = ${t};

for ( var i = 0 ; i < lights.length ; i++ ) {
  var light = new THREE.DirectionalLight( lights[i].color, 1 );
  var v = lights[i].position;
  light.position.set( a[0]*v[0], a[1]*v[1], a[2]*v[2] );
  if ( lights[i].parent === 'camera' ) {
    light.target.position.set( xMid, yMid, zMid );
    scene.add( light.target );
    camera.add( light );
  } else scene.add( light );
}
scene.add( camera );

scene.add( new THREE.AmbientLight( config.ambientLight, 1 ) );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target.set( xMid, yMid, zMid );
controls.addEventListener( 'change', function() { if ( !animate ) render(); } );
controls.update();

window.addEventListener( 'resize', function() {

  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if ( !animate ) render();

} );

window.addEventListener( 'mousedown', suspendAnimation );
window.addEventListener( 'mousemove', suspendAnimation );
window.addEventListener( 'mousewheel', suspendAnimation );

window.addEventListener( 'touchstart', suspendAnimation );
window.addEventListener( 'touchmove', suspendAnimation );
window.addEventListener( 'touchend', suspendAnimation );

var suspendTimer;

function suspendAnimation() {
  if ( config.animateOnInteraction ) return;
  clearInterval( suspendTimer );
  animate = false;
  suspendTimer = setTimeout( function() { if ( config.animate ) { animate = true; render(); } }, 5000 );
}

var texts = ${n};

for ( var i = 0 ; i < texts.length ; i++ ) {
  var t = texts[i];
  addLabel( t.text, t.point[0], t.point[1], t.point[2], t.options.color, t.options.fontSize );
}

var points = ${i};

for ( var i = 0 ; i < points.length ; i++ ) addPoint( points[i] );

function addPoint( p ) {

  var v = p.point;
  var vertices = [ a[0]*v[0], a[1]*v[1], a[2]*v[2] ];
  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  var canvas = document.createElement( 'canvas' );
  canvas.width = 128;
  canvas.height = 128;

  var context = canvas.getContext( '2d' );
  context.arc( 64, 64, 64, 0, 2 * Math.PI );
  context.fillStyle = p.options.color;
  context.fill();

  var texture = new THREE.Texture( canvas );
  texture.needsUpdate = true;

  var transparent = p.options.opacity < 1 ? true : false;
  var material = new THREE.PointsMaterial( { size: p.options.size/20, map: texture,
                                             transparent: transparent, opacity: p.options.opacity,
                                             alphaTest: .1 } );

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = new THREE.Points( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  scene.add( mesh );

}

var lines = ${r};

var newLines = [], tempPoints = [];

for ( var i = 0 ; i < lines.length ; i++ ) {

  lines[i].points.forEach( v => {
    // apply aspect multipliers for convenience
    //   and set points outside bounds or NaN to empty array
    v[0] *= a[0]; v[1] *= a[1]; v[2] *= a[2];
    if ( v[0] < xMin || v[0] > xMax || v[1] < yMin || v[1] > yMax
           || v[2] < zMin || v[2] > zMax || isNaN(v[2]) )
      v.splice(0);
  } );

  // split lines at empty points
  for ( var j = 0 ; j < lines[i].points.length ; j++ )
    if ( lines[i].points[j].length === 0 ) {
      tempPoints = lines[i].points.splice( j );
      if ( j === 0 ) lines[i].points = [[0,0,0]]; // dummy line for options
    }

  var l = [];
  for ( var j = 0 ; j < tempPoints.length ; j++ ) {
    var p = tempPoints[j];
    if ( p.length > 0 ) l.push( p );
    else if ( l.length > 0 ) {
      newLines.push( { points: l, options: lines[i].options } );
      l = [];
    }
  }
  if ( l.length > 0 ) newLines.push( { points: l, options: lines[i].options } );

}

newLines.forEach( l => lines.push( l ) );
newLines = [], tempPoints = [];

for ( var i = 0 ; i < lines.length ; i++ ) addLine( lines[i] );

function addLine( l ) {

  var vertices = [];
  for ( var i = 0 ; i < l.points.length ; i++ ) {
    var v = l.points[i];
    vertices.push( v[0], v[1], v[2] );
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  var linewidth = l.options.thickness ? l.options.thickness : 1;
  var transparent = l.options.opacity < 1 ? true : false;
  var material = new THREE.LineBasicMaterial( { color: l.options.color, linewidth: linewidth,
                                                transparent: transparent, opacity: l.options.opacity } );

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = l.options.useLineSegments ? new THREE.LineSegments( geometry, material )
                                       : new THREE.Line( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  scene.add( mesh );

}

var surfaces = ${a};

for ( var i = 0 ; i < surfaces.length ; i++ ) addSurface( surfaces[i] );

function addSurface( s ) {

  // apply aspect multipliers for convenience
  s.vertices.forEach( v => { v[0] *= a[0]; v[1] *= a[1]; v[2] *= a[2]; } );

  var badVertices = [];

  // remove faces completely outside vertical range or containing NaN
  for ( var i = s.faces.length - 1 ; i >= 0 ; i-- ) {
    var f = s.faces[i];

    if ( f.every( index => s.vertices[index][2] < zMin ) ) s.faces.splice( i, 1 );
    if ( f.every( index => s.vertices[index][2] > zMax ) ) s.faces.splice( i, 1 );

    var check = false;
    f.forEach( index => {
      if ( isNaN( s.vertices[index][2] ) ) {
        if ( !badVertices.includes( index ) ) badVertices.push( index );
        check = true;
      } } );
    if ( check ) s.faces.splice( i, 1 );
  }

  // set bad vertices to dummy value
  badVertices.forEach( index => s.vertices[index][2] = 0 );

  // constrain vertices to vertical range
  for ( var i = 0 ; i < s.vertices.length ; i++ ) {
    if ( s.vertices[i][2] < zMin ) s.vertices[i][2] = zMin;
    if ( s.vertices[i][2] > zMax ) s.vertices[i][2] = zMax;
  }

  var indices = [];
  for ( var i = 0 ; i < s.faces.length ; i++ ) {
    var f = s.faces[i];
    for ( var j = 0 ; j < f.length - 2 ; j++ )
      indices.push( f[0], f[j+1], f[j+2] );
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setIndex( indices );
  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( s.vertices.flat(), 3 ) );
  geometry.computeVertexNormals();

  var side = s.options.singleSide ? THREE.FrontSide : THREE.DoubleSide;
  var transparent = s.options.opacity < 1 ? true : false;
  var material;

  switch ( s.options.material ) {

    case 'normal':

      material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } );
      break;

    case 'standard':

      var metalness = s.options.metalness >= 0 ? s.options.metalness : .5;
      var roughness = s.options.roughness >= 0 ? s.options.roughness : .5;

      material = new THREE.MeshStandardMaterial( {
                               color: s.options.color, side: side,
                               transparent: transparent, opacity: s.options.opacity,
                               metalness: metalness, roughness: roughness } );
      break;

    case 'phong':
    default:

      var shininess = s.options.shininess >= 0 ? s.options.shininess : 20;

      material = new THREE.MeshPhongMaterial( {
                               color: s.options.color, side: side,
                               transparent: transparent, opacity: s.options.opacity,
                               shininess: shininess } );

  }

  if ( 'colors' in s.options ) {
    var colors = [];
    for ( var i = 0 ; i < s.options.colors.length ; i++ ) {
      var c = s.options.colors[i];
      colors.push( c.r, c.g, c.b );
    }
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    material.vertexColors = THREE.VertexColors;
    material.color.set( 'white' ); // crucial!
  }

  var c = new THREE.Vector3();
  geometry.computeBoundingBox();
  geometry.boundingBox.getCenter( c );
  geometry.translate( -c.x, -c.y, -c.z );

  var mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( c.x, c.y, c.z );
  if ( s.options.renderOrder ) mesh.renderOrder = s.options.renderOrder;

  // to be removed
  if ( s.options.rotationAxisAngle ) {
    s.options.rotation = { axis: s.options.rotationAxisAngle[0],
                           angle: s.options.rotationAxisAngle[1] }
    console.log( 'rotationAxisAngle is deprecated: see documentation for new format' );
  }

  if ( s.options.rotation ) {
    var v = s.options.rotation.axis;
    mesh.userData.rotation = { axis: new THREE.Vector3( v[0], v[1], v[2] ).normalize(),
                               angle: s.options.rotation.angle };
  }

  if ( s.options.translation ) {
    var arg = s.options.translation.argument ? s.options.translation.argument : 't';
    var step = Number.isFinite(s.options.translation.step) ? s.options.translation.step : .05;
    mesh.userData.translation = { 
      path: Function( arg, 'return ' + s.options.translation.path ),
      step: step, t: 0 };
  }

  if ( 'group' in s.options ) {

    var group = scene.getObjectByName( s.options.group );
    if ( !group ) {
      group = new THREE.Group();
      group.name = s.options.group;
      scene.add( group );
    }
    group.add( mesh );

    if ( mesh.userData.rotation ) {
      group.userData.rotation = { axis: mesh.userData.rotation.axis,
                                  angle: mesh.userData.rotation.angle };
      mesh.userData.rotation = false;
    }

  } else scene.add( mesh );

}

if ( config.clippingPlane ) {

  var v = config.clippingPlane.vector;
  var d = config.clippingPlane.distance;
  var plane = new THREE.Plane( new THREE.Vector3( v[0], v[1], v[2] ).normalize(), d );
  renderer.clippingPlanes = [ plane ];

}

function render() {

  if ( animate ) requestAnimationFrame( render );
  renderer.render( scene, camera );

  scene.children.forEach( child => {

    if ( child.userData.rotation && animate )
      child.rotateOnAxis( child.userData.rotation.axis, child.userData.rotation.angle );

    if ( child.userData.translation && animate ) {
      var v = child.userData.translation.path( child.userData.translation.t );
      child.position.set( v[0], v[1], v[2] );
      child.userData.translation.t += child.userData.translation.step;
    }

  } );

}

render();

</script>

</body>
</html>`}function threejs(e,t,s){for(var t=JSON.parse(JSON.stringify(t,dataReplacer),dataReviver),n=("ambientLight"in s||(s.ambientLight="rgb(127,127,127)"),"aspectRatio"in s||(s.aspectRatio=[1,1,1]),"axesLabels"in s&&!0!==s.axesLabels||(s.axesLabels=["x","y","z"]),"clearColor"in s||(s.clearColor="white"),"decimals"in s||(s.decimals=2),"frame"in s||(s.frame=!0),"viewpoint"in s||(s.viewpoint="auto"),s.frame||(s.axesLabels=!1),"output"in s?s.output:""),e=document.getElementById(e+"output"+n),i=(0<e.children.length&&e.children[0].contentWindow&&(e=(n=e.children[0].contentWindow).camera.position,s.viewpoint=[e.x-n.xMid,e.y-n.yMid,e.z-n.zMid]),[]),r=[],a=[],o=[],l=0;l<t.length;l++)for(var c=0;c<t[l].length;c++){var p=t[l][c];"text"===p.type&&(void 0===p.point[2]&&(p.point[2]=0),i.push(p)),"point"===p.type&&(void 0===p.point[2]&&(p.point[2]=0),r.push(p)),"line"===p.type&&(p.points.forEach(e=>{void 0===e[2]&&(e[2]=0)}),p.points=roundTo(p.points,3,!1),a.push(p)),"surface"===p.type&&(p.vertices=roundTo(p.vertices,3,!1),o.push(p))}for(var d=[],l=0;l<i.length;l++)d.push(i[l].point);for(l=0;l<r.length;l++)d.push(r[l].point);for(l=0;l<a.length;l++)a[l].points.forEach(e=>d.push(e));for(l=0;l<o.length;l++)o[l].vertices.forEach(e=>d.push(e));var e=minMax(d,0),n=minMax(d,1),u=minMax(d,2),e=("xMin"in s||(s.xMin=e.min),"yMin"in s||(s.yMin=n.min),"zMin"in s||(s.zMin=u.min),"xMax"in s||(s.xMax=e.max),"yMax"in s||(s.yMax=n.max),"zMax"in s||(s.zMax=u.max),o.forEach(e=>{if("colormap"in e.options&&(!("colors"in e.options)||0===e.options.colors.length)){e.options.colors=[];for(var t=colormap(e.options.colormap,e.options.reverseColormap),n=minMax(e.vertices,2),i=n.min<s.zMin?s.zMin:n.min,r=n.max>s.zMax?s.zMax:n.max,a=0;a<e.vertices.length;a++){var o=e.vertices[a][2],o=((o=r<(o=o<i?i:o)?r:o)-i)/(r-i);e.options.colors.push(t(o))}}}),s.no3DBorder?"none":"1px solid black"),n=(s=JSON.stringify(s),JSON.stringify([{position:[-5,3,0],color:"rgb(127,127,127)",parent:"camera"}])),i=JSON.stringify(i),r=JSON.stringify(r),a=JSON.stringify(a,dataReplacer),o=JSON.stringify(o,dataReplacer);return`<iframe style="width: 100%; height: 100%; border: ${e};"
                  srcdoc="${threejsTemplate(s,n,i,r,a,o).replace(/\"/g,"&quot;")}" scrolling="no"></iframe>`}function x3d(e,t,n){t=JSON.parse(JSON.stringify(t,dataReplacer),dataReviver);for(var i=(!("frame"in n)||n.frame),r=("viewer"in n&&n.viewer,"output"in n?n.output:""),e=document.getElementById(e+"output"+r),r=e.offsetWidth,a=e.offsetHeight,o=[],s=[],l=[],c=[],p=0;p<t.length;p++)for(var d=0;d<t[p].length;d++){var u=t[p][d];"text"===u.type&&o.push(u),"point"===u.type&&s.push(u),"line"===u.type&&l.push(u),"surface"===u.type&&(u.vertices=roundTo(u.vertices,3,!1),c.push(u))}for(var h=[],p=0;p<o.length;p++)h.push(o[p].point);for(p=0;p<s.length;p++)h.push(s[p].point);for(p=0;p<l.length;p++)l[p].points.forEach(e=>h.push(e));for(p=0;p<c.length;p++)c[p].vertices.forEach(e=>h.push(e));var f=minMax(h,0),g=minMax(h,1),m=minMax(h,2),v="xMin"in n?n.xMin:f.min,x="yMin"in n?n.yMin:g.min,y="zMin"in n?n.zMin:m.min,f="xMax"in n?n.xMax:f.max,g="yMax"in n?n.yMax:g.max,b="zMax"in n?n.zMax:m.max,m=f-v,M=g-x,w=b-y,$=(f+v)/2,E=(g+x)/2,k=(b+y)/2,x=[[[v,x,y],[f,x,y]],[[v,x,y],[v,g,y]],[[v,x,y],[v,x,b]],[[f,x,y],[f,g,y]],[[f,x,y],[f,x,b]],[[v,g,y],[f,g,y]],[[v,g,y],[v,g,b]],[[v,x,b],[f,x,b]],[[v,x,b],[v,g,b]],[[f,g,y],[f,g,b]],[[f,x,b],[f,g,b]],[[v,g,b],[f,g,b]]],v=[Math.PI/2+Math.atan(M/m),[0,0,1]],f=Math.sqrt(m**2+M**2+w**2),g=Math.sqrt(m**2+M**2),v=function(e,t){for(var n=e[0],i=e[1],r=t[0],a=t[1],e=i[0]*a[0]+i[1]*a[1]+i[2]*a[2],o=[i[1]*a[2]-i[2]*a[1],i[2]*a[0]-i[0]*a[2],i[0]*a[1]-i[1]*a[0]],s=2*Math.acos(Math.cos(n/2)*Math.cos(r/2)-e*Math.sin(n/2)*Math.sin(r/2)),l=[],c=0;c<3;c++)l[c]=i[c]*Math.sin(n/2)*Math.cos(r/2)/Math.sin(s/2)+a[c]*Math.cos(n/2)*Math.sin(r/2)/Math.sin(s/2)-o[c]*Math.sin(n/2)*Math.sin(r/2)/Math.sin(s/2);return[s,l]}(v,[Math.acos(w/f),[-M/g,m/g,0]]),T=`
<X3D width="${r}" height="${a}">
<Scene>
<Background skyColor="1 1 1"></Background>
<Viewpoint position="${m+$} ${M+E} ${w+k}"
           orientation="${v[1].join(" ")} ${v[0]}"
           centerOfRotation="${$} ${E} ${k}"></Viewpoint>`;i&&(T+=`
<Shape>
<Appearance>
<Material emissiveColor="0 0 0"></Material>
</Appearance>
<LineSet vertexCount="2 2 2 2 2 2 2 2 2 2 2 2">
<Coordinate point="${x.map(e=>e[0].concat(e[1]).join(" ")).join(", ")}"></Coordinate>
</LineSet>
</Shape>`);for(p=0;p<c.length;p++){for(var z=c[p],d=z.faces.length-1;0<=d;d--){var R=z.faces[d],A=!0,A=(R.forEach(e=>A=A&&z.vertices[e][2]<y),A&&z.faces.splice(d,1),!0);R.forEach(e=>A=A&&z.vertices[e][2]>b),A&&z.faces.splice(d,1)}for(d=0;d<z.vertices.length;d++)z.vertices[d][2]<y&&(z.vertices[d][2]=y),z.vertices[d][2]>b&&(z.vertices[d][2]=b);for(var F="",d=0;d<z.faces.length;d++)F+=z.faces[d].join(" ")+" -1 ";for(s="",d=0;d<z.vertices.length;d++)s+=z.vertices[d].join(" ")+" ";var L=document.createElement("p"),L=(L.style.color=z.options.color,L.style.color.replace(/[^\d,]/g,"").split(","));if(L.forEach((e,t,n)=>n[t]/=255),T+=`
<Shape>
<Appearance>
<TwoSidedMaterial diffuseColor="${L.join(" ")}" transparency="${1-z.options.opacity}"></TwoSidedMaterial>
</Appearance>
<IndexedFaceSet creaseAngle="1.57" solid="false" coordIndex="${F}">
<Coordinate point="${s}"></Coordinate>`,"colors"in z.options){for(var H="",d=0;d<z.options.colors.length;d++){var S=z.options.colors[d];H+=`${S.r} ${S.g} ${S.b} `}T+=`
<Color color="${H}"></Color>`}T+=`
</IndexedFaceSet>
</Shape>`}T+=`
</Scene>
</X3D>`,n.saveAsXML&&(f=new Blob([`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">
`+T]),(g=document.body.appendChild(document.createElement("a"))).href=window.URL.createObjectURL(f),g.download="scene.xml",g.click());m=`
<html>
<head>
<title></title>
<meta charset="utf-8">
${"x3dom"===n.viewer?'<link rel="stylesheet" type="text/css" href="https://www.x3dom.org/download/x3dom.css">':'<link rel="stylesheet" type="text/css" href="https://code.create3000.de/x_ite/4.6.9/dist/x_ite.css"/>'}
</head>

<body style="margin: 0px">

${"x3dom"===n.viewer?'<script src="https://www.x3dom.org/download/x3dom.js"><\/script>':`<script src="https://code.create3000.de/x_ite/4.6.9/dist/x_ite.min.js"></script>
<script src="https://raw.githack.com/andreasplesch/x_ite_dom/master/release/x_ite_dom.1.3.js"></script>
<script>
  //disable straighten horizon
  X3D( function ready() {
    var browser = X3D.getBrowser( 'X3DCanvas' );
    browser.setBrowserOption( 'StraightenHorizon', false );
  } );
</script>`}

<X3DCanvas style="width: ${r}px; height: ${a}px">
${T}
</X3DCanvas>

</body>
</html>`,M=n.no3DBorder?"none":"1px solid black";return`<iframe style="width: ${e.offsetWidth}px; height: ${e.offsetHeight}px; border: ${M}"
                  srcdoc="${m.replace(/\"/g,"&quot;")}" scrolling="no"></iframe>`}