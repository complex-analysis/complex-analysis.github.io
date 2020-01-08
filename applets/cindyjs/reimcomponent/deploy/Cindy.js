/*! npm.im/iphone-inline-video 2.0.2 */
var enableInlineVideo=function(){"use strict";/*! npm.im/intervalometer */
function e(e,i,n,r){function t(n){d=i(t,r),e(n-(a||n)),a=n}var d,a;return{start:function(){d||t(0)},stop:function(){n(d),d=null,a=0}}}function i(i){return e(i,requestAnimationFrame,cancelAnimationFrame)}function n(e,i,n,r){function t(i){Boolean(e[n])===Boolean(r)&&i.stopImmediatePropagation(),delete e[n]}return e.addEventListener(i,t,!1),t}function r(e,i,n,r){function t(){return n[i]}function d(e){n[i]=e}r&&d(e[i]),Object.defineProperty(e,i,{get:t,set:d})}function t(e,i,n){n.addEventListener(i,function(){return e.dispatchEvent(new Event(i))})}function d(e,i){Promise.resolve().then(function(){e.dispatchEvent(new Event(i))})}function a(e){var i=new Audio;return t(e,"play",i),t(e,"playing",i),t(e,"pause",i),i.crossOrigin=e.crossOrigin,i.src=e.src||e.currentSrc||"data:",i}function o(e,i,n){(m||0)+200<Date.now()&&(e[b]=!0,m=Date.now()),n||(e.currentTime=i),w[++T%3]=100*i|0}function u(e){return e.driver.currentTime>=e.video.duration}function s(e){var i=this;i.video.readyState>=i.video.HAVE_FUTURE_DATA?(i.hasAudio||(i.driver.currentTime=i.video.currentTime+e*i.video.playbackRate/1e3,i.video.loop&&u(i)&&(i.driver.currentTime=0)),o(i.video,i.driver.currentTime)):i.video.networkState===i.video.NETWORK_IDLE&&0===i.video.buffered.length&&i.video.load(),i.video.ended&&(delete i.video[b],i.video.pause(!0))}function c(){var e=this,i=e[h];return e.webkitDisplayingFullscreen?void e[g]():("data:"!==i.driver.src&&i.driver.src!==e.src&&(o(e,0,!0),i.driver.src=e.src),void(e.paused&&(i.paused=!1,0===e.buffered.length&&e.load(),i.driver.play(),i.updater.start(),i.hasAudio||(d(e,"play"),i.video.readyState>=i.video.HAVE_ENOUGH_DATA&&d(e,"playing")))))}function v(e){var i=this,n=i[h];n.driver.pause(),n.updater.stop(),i.webkitDisplayingFullscreen&&i[E](),n.paused&&!e||(n.paused=!0,n.hasAudio||d(i,"pause"),i.ended&&(i[b]=!0,d(i,"ended")))}function p(e,n){var r=e[h]={};r.paused=!0,r.hasAudio=n,r.video=e,r.updater=i(s.bind(r)),n?r.driver=a(e):(e.addEventListener("canplay",function(){e.paused||d(e,"playing")}),r.driver={src:e.src||e.currentSrc||"data:",muted:!0,paused:!0,pause:function(){r.driver.paused=!0},play:function(){r.driver.paused=!1,u(r)&&o(e,0)},get ended(){return u(r)}}),e.addEventListener("emptied",function(){var i=!r.driver.src||"data:"===r.driver.src;r.driver.src&&r.driver.src!==e.src&&(o(e,0,!0),r.driver.src=e.src,i?r.driver.play():r.updater.stop())},!1),e.addEventListener("webkitbeginfullscreen",function(){e.paused?n&&0===r.driver.buffered.length&&r.driver.load():(e.pause(),e[g]())}),n&&(e.addEventListener("webkitendfullscreen",function(){r.driver.currentTime=e.currentTime}),e.addEventListener("seeking",function(){w.indexOf(100*e.currentTime|0)<0&&(r.driver.currentTime=e.currentTime)}))}function l(e){var i=e[h];e[g]=e.play,e[E]=e.pause,e.play=c,e.pause=v,r(e,"paused",i.driver),r(e,"muted",i.driver,!0),r(e,"playbackRate",i.driver,!0),r(e,"ended",i.driver),r(e,"loop",i.driver,!0),n(e,"seeking"),n(e,"seeked"),n(e,"timeupdate",b,!1),n(e,"ended",b,!1)}function f(e,i){if(void 0===i&&(i={}),!e[h]){if(!i.everywhere){if(!y)return;if(!(i.iPad||i.ipad?/iPhone|iPod|iPad/:/iPhone|iPod/).test(navigator.userAgent))return}!e.paused&&e.webkitDisplayingFullscreen&&e.pause(),p(e,!e.muted),l(e),e.classList.add("IIV"),e.muted&&e.autoplay&&e.play(),/iPhone|iPod|iPad/.test(navigator.platform)||console.warn("iphone-inline-video is not guaranteed to work in emulated environments")}}var m,y="object"==typeof document&&"object-fit"in document.head.style&&!matchMedia("(-webkit-video-playable-inline)").matches,h="bfred-it:iphone-inline-video",b="bfred-it:iphone-inline-video:event",g="bfred-it:iphone-inline-video:nativeplay",E="bfred-it:iphone-inline-video:nativepause",w=[],T=0;return f}();
// rev 482
/********************************************************************************
 *                                                                              *
 * Author    :  Angus Johnson                                                   *
 * Version   :  6.2.1                                                          *
 * Date      :  31 October 2014                                                 *
 * Website   :  http://www.angusj.com                                           *
 * Copyright :  Angus Johnson 2010-2014                                         *
 *                                                                              *
 * License:                                                                     *
 * Use, modification & distribution is subject to Boost Software License Ver 1. *
 * http://www.boost.org/LICENSE_1_0.txt                                         *
 *                                                                              *
 * Attributions:                                                                *
 * The code in this library is an extension of Bala Vatti's clipping algorithm: *
 * "A generic solution to polygon clipping"                                     *
 * Communications of the ACM, Vol 35, Issue 7 (July 1992) pp 56-63.             *
 * http://portal.acm.org/citation.cfm?id=129906                                 *
 *                                                                              *
 * Computer graphics and geometric modeling: implementation and algorithms      *
 * By Max K. Agoston                                                            *
 * Springer; 1 edition (January 4, 2005)                                        *
 * http://books.google.com/books?q=vatti+clipping+agoston                       *
 *                                                                              *
 * See also:                                                                    *
 * "Polygon Offsetting by Computing Winding Numbers"                            *
 * Paper no. DETC2005-85513 pp. 565-575                                         *
 * ASME 2005 International Design Engineering Technical Conferences             *
 * and Computers and Information in Engineering Conference (IDETC/CIE2005)      *
 * September 24-28, 2005 , Long Beach, California, USA                          *
 * http://www.me.berkeley.edu/~mcmains/pubs/DAC05OffsetPolygon.pdf              *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Author    :  Timo                                                            *
 * Version   :  6.2.1.2                                                         *
 * Date      :  27 November 2016                                                 *
 *                                                                              *
 * This is a translation of the C# Clipper library to Javascript.               *
 * Int128 struct of C# is implemented using JSBN of Tom Wu.                     *
 * Because Javascript lacks support for 64-bit integers, the space              *
 * is a little more restricted than in C# version.                              *
 *                                                                              *
 * C# version has support for coordinate space:                                 *
 * +-4611686018427387903 ( sqrt(2^127 -1)/2 )                                   *
 * while Javascript version has support for space:                              *
 * +-4503599627370495 ( sqrt(2^106 -1)/2 )                                      *
 *                                                                              *
 * Tom Wu's JSBN proved to be the fastest big integer library:                  *
 * http://jsperf.com/big-integer-library-test                                   *
 *                                                                              *
 * This class can be made simpler when (if ever) 64-bit integer support comes.  *
 *                                                                              *
 *******************************************************************************/
/*******************************************************************************
 *                                                                              *
 * Basic JavaScript BN library - subset useful for RSA encryption.              *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/                               *
 * Copyright (c) 2005  Tom Wu                                                   *
 * All Rights Reserved.                                                         *
 * See "LICENSE" for details:                                                   *
 * http://www-cs-students.stanford.edu/~tjw/jsbn/LICENSE                        *
 *                                                                              *
 *******************************************************************************/

(function(){function k(a,b,c){d.biginteger_used=1;null!=a&&("number"==typeof a&&"undefined"==typeof b?this.fromInt(a):"number"==typeof a?this.fromNumber(a,b,c):null==b&&"string"!=typeof a?this.fromString(a,256):this.fromString(a,b))}function m(){return new k(null,void 0,void 0)}function R(a,b,c,e,d,g){for(;0<=--g;){var f=b*this[a++]+c[e]+d;d=Math.floor(f/67108864);c[e++]=f&67108863}return d}function S(a,b,c,e,d,g){var f=b&32767;for(b>>=15;0<=--g;){var l=this[a]&32767,k=this[a++]>>15,n=b*l+k*f,l=f*
l+((n&32767)<<15)+c[e]+(d&1073741823);d=(l>>>30)+(n>>>15)+b*k+(d>>>30);c[e++]=l&1073741823}return d}function T(a,b,c,e,d,g){var f=b&16383;for(b>>=14;0<=--g;){var l=this[a]&16383,k=this[a++]>>14,n=b*l+k*f,l=f*l+((n&16383)<<14)+c[e]+d;d=(l>>28)+(n>>14)+b*k;c[e++]=l&268435455}return d}function M(a,b){var c=D[a.charCodeAt(b)];return null==c?-1:c}function x(a){var b=m();b.fromInt(a);return b}function E(a){var b=1,c;0!=(c=a>>>16)&&(a=c,b+=16);0!=(c=a>>8)&&(a=c,b+=8);0!=(c=a>>4)&&(a=c,b+=4);0!=(c=a>>2)&&
(a=c,b+=2);0!=a>>1&&(b+=1);return b}function A(a){this.m=a}function B(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<a.DB-15)-1;this.mt2=2*a.t}function U(a,b){return a&b}function K(a,b){return a|b}function N(a,b){return a^b}function O(a,b){return a&~b}function C(){}function P(a){return a}function z(a){this.r2=m();this.q3=m();k.ONE.dlShiftTo(2*a.t,this.r2);this.mu=this.r2.divide(a);this.m=a}var d={use_lines:!0,use_xyz:!1},F=!1;"undefined"!==typeof module&&
module.exports?(module.exports=d,F=!0):"undefined"!==typeof document?window.ClipperLib=d:self.ClipperLib=d;var q;if(F)r="chrome",q="Netscape";else{var r=navigator.userAgent.toString().toLowerCase();q=navigator.appName}var G,L,H,I,J,Q;G=-1!=r.indexOf("chrome")&&-1==r.indexOf("chromium")?1:0;F=-1!=r.indexOf("chromium")?1:0;L=-1!=r.indexOf("safari")&&-1==r.indexOf("chrome")&&-1==r.indexOf("chromium")?1:0;H=-1!=r.indexOf("firefox")?1:0;r.indexOf("firefox/17");r.indexOf("firefox/15");r.indexOf("firefox/3");
I=-1!=r.indexOf("opera")?1:0;r.indexOf("msie 10");r.indexOf("msie 9");J=-1!=r.indexOf("msie 8")?1:0;Q=-1!=r.indexOf("msie 7")?1:0;r=-1!=r.indexOf("msie ")?1:0;d.biginteger_used=null;"Microsoft Internet Explorer"==q?(k.prototype.am=S,q=30):"Netscape"!=q?(k.prototype.am=R,q=26):(k.prototype.am=T,q=28);k.prototype.DB=q;k.prototype.DM=(1<<q)-1;k.prototype.DV=1<<q;k.prototype.FV=Math.pow(2,52);k.prototype.F1=52-q;k.prototype.F2=2*q-52;var D=[],w;q=48;for(w=0;9>=w;++w)D[q++]=w;q=97;for(w=10;36>w;++w)D[q++]=
w;q=65;for(w=10;36>w;++w)D[q++]=w;A.prototype.convert=function(a){return 0>a.s||0<=a.compareTo(this.m)?a.mod(this.m):a};A.prototype.revert=function(a){return a};A.prototype.reduce=function(a){a.divRemTo(this.m,null,a)};A.prototype.mulTo=function(a,b,c){a.multiplyTo(b,c);this.reduce(c)};A.prototype.sqrTo=function(a,b){a.squareTo(b);this.reduce(b)};B.prototype.convert=function(a){var b=m();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);0>a.s&&0<b.compareTo(k.ZERO)&&this.m.subTo(b,b);return b};
B.prototype.revert=function(a){var b=m();a.copyTo(b);this.reduce(b);return b};B.prototype.reduce=function(a){for(;a.t<=this.mt2;)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&32767,e=c*this.mpl+((c*this.mph+(a[b]>>15)*this.mpl&this.um)<<15)&a.DM,c=b+this.m.t;for(a[c]+=this.m.am(0,e,a,b,0,this.m.t);a[c]>=a.DV;)a[c]-=a.DV,a[++c]++}a.clamp();a.drShiftTo(this.m.t,a);0<=a.compareTo(this.m)&&a.subTo(this.m,a)};B.prototype.mulTo=function(a,b,c){a.multiplyTo(b,c);this.reduce(c)};B.prototype.sqrTo=function(a,
b){a.squareTo(b);this.reduce(b)};k.prototype.copyTo=function(a){for(var b=this.t-1;0<=b;--b)a[b]=this[b];a.t=this.t;a.s=this.s};k.prototype.fromInt=function(a){this.t=1;this.s=0>a?-1:0;0<a?this[0]=a:-1>a?this[0]=a+this.DV:this.t=0};k.prototype.fromString=function(a,b){var c;if(16==b)c=4;else if(8==b)c=3;else if(256==b)c=8;else if(2==b)c=1;else if(32==b)c=5;else if(4==b)c=2;else{this.fromRadix(a,b);return}this.s=this.t=0;for(var e=a.length,d=!1,g=0;0<=--e;){var h=8==c?a[e]&255:M(a,e);0>h?"-"==a.charAt(e)&&
(d=!0):(d=!1,0==g?this[this.t++]=h:g+c>this.DB?(this[this.t-1]|=(h&(1<<this.DB-g)-1)<<g,this[this.t++]=h>>this.DB-g):this[this.t-1]|=h<<g,g+=c,g>=this.DB&&(g-=this.DB))}8==c&&0!=(a[0]&128)&&(this.s=-1,0<g&&(this[this.t-1]|=(1<<this.DB-g)-1<<g));this.clamp();d&&k.ZERO.subTo(this,this)};k.prototype.clamp=function(){for(var a=this.s&this.DM;0<this.t&&this[this.t-1]==a;)--this.t};k.prototype.dlShiftTo=function(a,b){var c;for(c=this.t-1;0<=c;--c)b[c+a]=this[c];for(c=a-1;0<=c;--c)b[c]=0;b.t=this.t+a;b.s=
this.s};k.prototype.drShiftTo=function(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s};k.prototype.lShiftTo=function(a,b){var c=a%this.DB,e=this.DB-c,d=(1<<e)-1,g=Math.floor(a/this.DB),h=this.s<<c&this.DM,l;for(l=this.t-1;0<=l;--l)b[l+g+1]=this[l]>>e|h,h=(this[l]&d)<<c;for(l=g-1;0<=l;--l)b[l]=0;b[g]=h;b.t=this.t+g+1;b.s=this.s;b.clamp()};k.prototype.rShiftTo=function(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t)b.t=0;else{var e=a%this.DB,d=this.DB-e,g=
(1<<e)-1;b[0]=this[c]>>e;for(var h=c+1;h<this.t;++h)b[h-c-1]|=(this[h]&g)<<d,b[h-c]=this[h]>>e;0<e&&(b[this.t-c-1]|=(this.s&g)<<d);b.t=this.t-c;b.clamp()}};k.prototype.subTo=function(a,b){for(var c=0,e=0,d=Math.min(a.t,this.t);c<d;)e+=this[c]-a[c],b[c++]=e&this.DM,e>>=this.DB;if(a.t<this.t){for(e-=a.s;c<this.t;)e+=this[c],b[c++]=e&this.DM,e>>=this.DB;e+=this.s}else{for(e+=this.s;c<a.t;)e-=a[c],b[c++]=e&this.DM,e>>=this.DB;e-=a.s}b.s=0>e?-1:0;-1>e?b[c++]=this.DV+e:0<e&&(b[c++]=e);b.t=c;b.clamp()};
k.prototype.multiplyTo=function(a,b){var c=this.abs(),e=a.abs(),d=c.t;for(b.t=d+e.t;0<=--d;)b[d]=0;for(d=0;d<e.t;++d)b[d+c.t]=c.am(0,e[d],b,d,0,c.t);b.s=0;b.clamp();this.s!=a.s&&k.ZERO.subTo(b,b)};k.prototype.squareTo=function(a){for(var b=this.abs(),c=a.t=2*b.t;0<=--c;)a[c]=0;for(c=0;c<b.t-1;++c){var e=b.am(c,b[c],a,2*c,0,1);(a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,e,b.t-c-1))>=b.DV&&(a[c+b.t]-=b.DV,a[c+b.t+1]=1)}0<a.t&&(a[a.t-1]+=b.am(c,b[c],a,2*c,0,1));a.s=0;a.clamp()};k.prototype.divRemTo=function(a,
b,c){var e=a.abs();if(!(0>=e.t)){var d=this.abs();if(d.t<e.t)null!=b&&b.fromInt(0),null!=c&&this.copyTo(c);else{null==c&&(c=m());var g=m(),h=this.s;a=a.s;var l=this.DB-E(e[e.t-1]);0<l?(e.lShiftTo(l,g),d.lShiftTo(l,c)):(e.copyTo(g),d.copyTo(c));e=g.t;d=g[e-1];if(0!=d){var v=d*(1<<this.F1)+(1<e?g[e-2]>>this.F2:0),n=this.FV/v,v=(1<<this.F1)/v,p=1<<this.F2,y=c.t,q=y-e,t=null==b?m():b;g.dlShiftTo(q,t);0<=c.compareTo(t)&&(c[c.t++]=1,c.subTo(t,c));k.ONE.dlShiftTo(e,t);for(t.subTo(g,g);g.t<e;)g[g.t++]=0;
for(;0<=--q;){var r=c[--y]==d?this.DM:Math.floor(c[y]*n+(c[y-1]+p)*v);if((c[y]+=g.am(0,r,c,q,0,e))<r)for(g.dlShiftTo(q,t),c.subTo(t,c);c[y]<--r;)c.subTo(t,c)}null!=b&&(c.drShiftTo(e,b),h!=a&&k.ZERO.subTo(b,b));c.t=e;c.clamp();0<l&&c.rShiftTo(l,c);0>h&&k.ZERO.subTo(c,c)}}}};k.prototype.invDigit=function(){if(1>this.t)return 0;var a=this[0];if(0==(a&1))return 0;var b=a&3,b=b*(2-(a&15)*b)&15,b=b*(2-(a&255)*b)&255,b=b*(2-((a&65535)*b&65535))&65535,b=b*(2-a*b%this.DV)%this.DV;return 0<b?this.DV-b:-b};
k.prototype.isEven=function(){return 0==(0<this.t?this[0]&1:this.s)};k.prototype.exp=function(a,b){if(4294967295<a||1>a)return k.ONE;var c=m(),e=m(),d=b.convert(this),g=E(a)-1;for(d.copyTo(c);0<=--g;)if(b.sqrTo(c,e),0<(a&1<<g))b.mulTo(e,d,c);else var h=c,c=e,e=h;return b.revert(c)};k.prototype.toString=function(a){if(0>this.s)return"-"+this.negate().toString(a);if(16==a)a=4;else if(8==a)a=3;else if(2==a)a=1;else if(32==a)a=5;else if(4==a)a=2;else return this.toRadix(a);var b=(1<<a)-1,c,e=!1,d="",
g=this.t,h=this.DB-g*this.DB%a;if(0<g--)for(h<this.DB&&0<(c=this[g]>>h)&&(e=!0,d="0123456789abcdefghijklmnopqrstuvwxyz".charAt(c));0<=g;)h<a?(c=(this[g]&(1<<h)-1)<<a-h,c|=this[--g]>>(h+=this.DB-a)):(c=this[g]>>(h-=a)&b,0>=h&&(h+=this.DB,--g)),0<c&&(e=!0),e&&(d+="0123456789abcdefghijklmnopqrstuvwxyz".charAt(c));return e?d:"0"};k.prototype.negate=function(){var a=m();k.ZERO.subTo(this,a);return a};k.prototype.abs=function(){return 0>this.s?this.negate():this};k.prototype.compareTo=function(a){var b=
this.s-a.s;if(0!=b)return b;var c=this.t,b=c-a.t;if(0!=b)return 0>this.s?-b:b;for(;0<=--c;)if(0!=(b=this[c]-a[c]))return b;return 0};k.prototype.bitLength=function(){return 0>=this.t?0:this.DB*(this.t-1)+E(this[this.t-1]^this.s&this.DM)};k.prototype.mod=function(a){var b=m();this.abs().divRemTo(a,null,b);0>this.s&&0<b.compareTo(k.ZERO)&&a.subTo(b,b);return b};k.prototype.modPowInt=function(a,b){var c;c=256>a||b.isEven()?new A(b):new B(b);return this.exp(a,c)};k.ZERO=x(0);k.ONE=x(1);C.prototype.convert=
P;C.prototype.revert=P;C.prototype.mulTo=function(a,b,c){a.multiplyTo(b,c)};C.prototype.sqrTo=function(a,b){a.squareTo(b)};z.prototype.convert=function(a){if(0>a.s||a.t>2*this.m.t)return a.mod(this.m);if(0>a.compareTo(this.m))return a;var b=m();a.copyTo(b);this.reduce(b);return b};z.prototype.revert=function(a){return a};z.prototype.reduce=function(a){a.drShiftTo(this.m.t-1,this.r2);a.t>this.m.t+1&&(a.t=this.m.t+1,a.clamp());this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);for(this.m.multiplyLowerTo(this.q3,
this.m.t+1,this.r2);0>a.compareTo(this.r2);)a.dAddOffset(1,this.m.t+1);for(a.subTo(this.r2,a);0<=a.compareTo(this.m);)a.subTo(this.m,a)};z.prototype.mulTo=function(a,b,c){a.multiplyTo(b,c);this.reduce(c)};z.prototype.sqrTo=function(a,b){a.squareTo(b);this.reduce(b)};var u=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,
313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],V=67108864/u[u.length-1];k.prototype.chunkSize=function(a){return Math.floor(Math.LN2*
this.DB/Math.log(a))};k.prototype.toRadix=function(a){null==a&&(a=10);if(0==this.signum()||2>a||36<a)return"0";var b=this.chunkSize(a),b=Math.pow(a,b),c=x(b),e=m(),d=m(),g="";for(this.divRemTo(c,e,d);0<e.signum();)g=(b+d.intValue()).toString(a).substr(1)+g,e.divRemTo(c,e,d);return d.intValue().toString(a)+g};k.prototype.fromRadix=function(a,b){this.fromInt(0);null==b&&(b=10);for(var c=this.chunkSize(b),e=Math.pow(b,c),d=!1,g=0,h=0,l=0;l<a.length;++l){var v=M(a,l);0>v?"-"==a.charAt(l)&&0==this.signum()&&
(d=!0):(h=b*h+v,++g>=c&&(this.dMultiply(e),this.dAddOffset(h,0),h=g=0))}0<g&&(this.dMultiply(Math.pow(b,g)),this.dAddOffset(h,0));d&&k.ZERO.subTo(this,this)};k.prototype.fromNumber=function(a,b,c){if("number"==typeof b)if(2>a)this.fromInt(1);else for(this.fromNumber(a,c),this.testBit(a-1)||this.bitwiseTo(k.ONE.shiftLeft(a-1),K,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(b);)this.dAddOffset(2,0),this.bitLength()>a&&this.subTo(k.ONE.shiftLeft(a-1),this);else{c=[];var e=a&7;c.length=
(a>>3)+1;b.nextBytes(c);c[0]=0<e?c[0]&(1<<e)-1:0;this.fromString(c,256)}};k.prototype.bitwiseTo=function(a,b,c){var e,d,g=Math.min(a.t,this.t);for(e=0;e<g;++e)c[e]=b(this[e],a[e]);if(a.t<this.t){d=a.s&this.DM;for(e=g;e<this.t;++e)c[e]=b(this[e],d);c.t=this.t}else{d=this.s&this.DM;for(e=g;e<a.t;++e)c[e]=b(d,a[e]);c.t=a.t}c.s=b(this.s,a.s);c.clamp()};k.prototype.changeBit=function(a,b){var c=k.ONE.shiftLeft(a);this.bitwiseTo(c,b,c);return c};k.prototype.addTo=function(a,b){for(var c=0,e=0,d=Math.min(a.t,
this.t);c<d;)e+=this[c]+a[c],b[c++]=e&this.DM,e>>=this.DB;if(a.t<this.t){for(e+=a.s;c<this.t;)e+=this[c],b[c++]=e&this.DM,e>>=this.DB;e+=this.s}else{for(e+=this.s;c<a.t;)e+=a[c],b[c++]=e&this.DM,e>>=this.DB;e+=a.s}b.s=0>e?-1:0;0<e?b[c++]=e:-1>e&&(b[c++]=this.DV+e);b.t=c;b.clamp()};k.prototype.dMultiply=function(a){this[this.t]=this.am(0,a-1,this,0,0,this.t);++this.t;this.clamp()};k.prototype.dAddOffset=function(a,b){if(0!=a){for(;this.t<=b;)this[this.t++]=0;for(this[b]+=a;this[b]>=this.DV;)this[b]-=
this.DV,++b>=this.t&&(this[this.t++]=0),++this[b]}};k.prototype.multiplyLowerTo=function(a,b,c){var e=Math.min(this.t+a.t,b);c.s=0;for(c.t=e;0<e;)c[--e]=0;var d;for(d=c.t-this.t;e<d;++e)c[e+this.t]=this.am(0,a[e],c,e,0,this.t);for(d=Math.min(a.t,b);e<d;++e)this.am(0,a[e],c,e,0,b-e);c.clamp()};k.prototype.multiplyUpperTo=function(a,b,c){--b;var e=c.t=this.t+a.t-b;for(c.s=0;0<=--e;)c[e]=0;for(e=Math.max(b-this.t,0);e<a.t;++e)c[this.t+e-b]=this.am(b-e,a[e],c,0,0,this.t+e-b);c.clamp();c.drShiftTo(1,c)};
k.prototype.modInt=function(a){if(0>=a)return 0;var b=this.DV%a,c=0>this.s?a-1:0;if(0<this.t)if(0==b)c=this[0]%a;else for(var e=this.t-1;0<=e;--e)c=(b*c+this[e])%a;return c};k.prototype.millerRabin=function(a){var b=this.subtract(k.ONE),c=b.getLowestSetBit();if(0>=c)return!1;var e=b.shiftRight(c);a=a+1>>1;a>u.length&&(a=u.length);for(var d=m(),g=0;g<a;++g){d.fromInt(u[Math.floor(Math.random()*u.length)]);var h=d.modPow(e,this);if(0!=h.compareTo(k.ONE)&&0!=h.compareTo(b)){for(var l=1;l++<c&&0!=h.compareTo(b);)if(h=
h.modPowInt(2,this),0==h.compareTo(k.ONE))return!1;if(0!=h.compareTo(b))return!1}}return!0};k.prototype.clone=function(){var a=m();this.copyTo(a);return a};k.prototype.intValue=function(){if(0>this.s){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]};k.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24};k.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<
16>>16};k.prototype.signum=function(){return 0>this.s?-1:0>=this.t||1==this.t&&0>=this[0]?0:1};k.prototype.toByteArray=function(){var a=this.t,b=[];b[0]=this.s;var c=this.DB-a*this.DB%8,e,d=0;if(0<a--)for(c<this.DB&&(e=this[a]>>c)!=(this.s&this.DM)>>c&&(b[d++]=e|this.s<<this.DB-c);0<=a;)if(8>c?(e=(this[a]&(1<<c)-1)<<8-c,e|=this[--a]>>(c+=this.DB-8)):(e=this[a]>>(c-=8)&255,0>=c&&(c+=this.DB,--a)),0!=(e&128)&&(e|=-256),0==d&&(this.s&128)!=(e&128)&&++d,0<d||e!=this.s)b[d++]=e;return b};k.prototype.equals=
function(a){return 0==this.compareTo(a)};k.prototype.min=function(a){return 0>this.compareTo(a)?this:a};k.prototype.max=function(a){return 0<this.compareTo(a)?this:a};k.prototype.and=function(a){var b=m();this.bitwiseTo(a,U,b);return b};k.prototype.or=function(a){var b=m();this.bitwiseTo(a,K,b);return b};k.prototype.xor=function(a){var b=m();this.bitwiseTo(a,N,b);return b};k.prototype.andNot=function(a){var b=m();this.bitwiseTo(a,O,b);return b};k.prototype.not=function(){for(var a=m(),b=0;b<this.t;++b)a[b]=
this.DM&~this[b];a.t=this.t;a.s=~this.s;return a};k.prototype.shiftLeft=function(a){var b=m();0>a?this.rShiftTo(-a,b):this.lShiftTo(a,b);return b};k.prototype.shiftRight=function(a){var b=m();0>a?this.lShiftTo(-a,b):this.rShiftTo(a,b);return b};k.prototype.getLowestSetBit=function(){for(var a=0;a<this.t;++a)if(0!=this[a]){var b=a*this.DB;a=this[a];if(0==a)a=-1;else{var c=0;0==(a&65535)&&(a>>=16,c+=16);0==(a&255)&&(a>>=8,c+=8);0==(a&15)&&(a>>=4,c+=4);0==(a&3)&&(a>>=2,c+=2);0==(a&1)&&++c;a=c}return b+
a}return 0>this.s?this.t*this.DB:-1};k.prototype.bitCount=function(){for(var a=0,b=this.s&this.DM,c=0;c<this.t;++c){for(var e=this[c]^b,d=0;0!=e;)e&=e-1,++d;a+=d}return a};k.prototype.testBit=function(a){var b=Math.floor(a/this.DB);return b>=this.t?0!=this.s:0!=(this[b]&1<<a%this.DB)};k.prototype.setBit=function(a){return this.changeBit(a,K)};k.prototype.clearBit=function(a){return this.changeBit(a,O)};k.prototype.flipBit=function(a){return this.changeBit(a,N)};k.prototype.add=function(a){var b=m();
this.addTo(a,b);return b};k.prototype.subtract=function(a){var b=m();this.subTo(a,b);return b};k.prototype.multiply=function(a){var b=m();this.multiplyTo(a,b);return b};k.prototype.divide=function(a){var b=m();this.divRemTo(a,b,null);return b};k.prototype.remainder=function(a){var b=m();this.divRemTo(a,null,b);return b};k.prototype.divideAndRemainder=function(a){var b=m(),c=m();this.divRemTo(a,b,c);return[b,c]};k.prototype.modPow=function(a,b){var c=a.bitLength(),e,d=x(1),g;if(0>=c)return d;e=18>
c?1:48>c?3:144>c?4:768>c?5:6;g=8>c?new A(b):b.isEven()?new z(b):new B(b);var h=[],l=3,k=e-1,n=(1<<e)-1;h[1]=g.convert(this);if(1<e)for(c=m(),g.sqrTo(h[1],c);l<=n;)h[l]=m(),g.mulTo(c,h[l-2],h[l]),l+=2;for(var p=a.t-1,y,q=!0,t=m(),c=E(a[p])-1;0<=p;){c>=k?y=a[p]>>c-k&n:(y=(a[p]&(1<<c+1)-1)<<k-c,0<p&&(y|=a[p-1]>>this.DB+c-k));for(l=e;0==(y&1);)y>>=1,--l;0>(c-=l)&&(c+=this.DB,--p);if(q)h[y].copyTo(d),q=!1;else{for(;1<l;)g.sqrTo(d,t),g.sqrTo(t,d),l-=2;0<l?g.sqrTo(d,t):(l=d,d=t,t=l);g.mulTo(t,h[y],d)}for(;0<=
p&&0==(a[p]&1<<c);)g.sqrTo(d,t),l=d,d=t,t=l,0>--c&&(c=this.DB-1,--p)}return g.revert(d)};k.prototype.modInverse=function(a){var b=a.isEven();if(this.isEven()&&b||0==a.signum())return k.ZERO;for(var c=a.clone(),d=this.clone(),f=x(1),g=x(0),h=x(0),l=x(1);0!=c.signum();){for(;c.isEven();)c.rShiftTo(1,c),b?(f.isEven()&&g.isEven()||(f.addTo(this,f),g.subTo(a,g)),f.rShiftTo(1,f)):g.isEven()||g.subTo(a,g),g.rShiftTo(1,g);for(;d.isEven();)d.rShiftTo(1,d),b?(h.isEven()&&l.isEven()||(h.addTo(this,h),l.subTo(a,
l)),h.rShiftTo(1,h)):l.isEven()||l.subTo(a,l),l.rShiftTo(1,l);0<=c.compareTo(d)?(c.subTo(d,c),b&&f.subTo(h,f),g.subTo(l,g)):(d.subTo(c,d),b&&h.subTo(f,h),l.subTo(g,l))}if(0!=d.compareTo(k.ONE))return k.ZERO;if(0<=l.compareTo(a))return l.subtract(a);if(0>l.signum())l.addTo(a,l);else return l;return 0>l.signum()?l.add(a):l};k.prototype.pow=function(a){return this.exp(a,new C)};k.prototype.gcd=function(a){var b=0>this.s?this.negate():this.clone();a=0>a.s?a.negate():a.clone();if(0>b.compareTo(a)){var c=
b,b=a;a=c}var c=b.getLowestSetBit(),d=a.getLowestSetBit();if(0>d)return b;c<d&&(d=c);0<d&&(b.rShiftTo(d,b),a.rShiftTo(d,a));for(;0<b.signum();)0<(c=b.getLowestSetBit())&&b.rShiftTo(c,b),0<(c=a.getLowestSetBit())&&a.rShiftTo(c,a),0<=b.compareTo(a)?(b.subTo(a,b),b.rShiftTo(1,b)):(a.subTo(b,a),a.rShiftTo(1,a));0<d&&a.lShiftTo(d,a);return a};k.prototype.isProbablePrime=function(a){var b,c=this.abs();if(1==c.t&&c[0]<=u[u.length-1]){for(b=0;b<u.length;++b)if(c[0]==u[b])return!0;return!1}if(c.isEven())return!1;
for(b=1;b<u.length;){for(var d=u[b],f=b+1;f<u.length&&d<V;)d*=u[f++];for(d=c.modInt(d);b<f;)if(0==d%u[b++])return!1}return c.millerRabin(a)};k.prototype.square=function(){var a=m();this.squareTo(a);return a};k.prototype.IsNegative=function(){return-1==this.compareTo(k.ZERO)?!0:!1};k.op_Equality=function(a,b){return 0==a.compareTo(b)?!0:!1};k.op_Inequality=function(a,b){return 0!=a.compareTo(b)?!0:!1};k.op_GreaterThan=function(a,b){return 0<a.compareTo(b)?!0:!1};k.op_LessThan=function(a,b){return 0>
a.compareTo(b)?!0:!1};k.op_Addition=function(a,b){return(new k(a)).add(new k(b))};k.op_Subtraction=function(a,b){return(new k(a)).subtract(new k(b))};k.Int128Mul=function(a,b){return(new k(a)).multiply(new k(b))};k.op_Division=function(a,b){return a.divide(b)};k.prototype.ToDouble=function(){return parseFloat(this.toString())};q=function(a,b){var c;if("undefined"==typeof Object.getOwnPropertyNames)for(c in b.prototype){if("undefined"==typeof a.prototype[c]||a.prototype[c]==Object.prototype[c])a.prototype[c]=
b.prototype[c]}else for(var d=Object.getOwnPropertyNames(b.prototype),f=0;f<d.length;f++)"undefined"==typeof Object.getOwnPropertyDescriptor(a.prototype,d[f])&&Object.defineProperty(a.prototype,d[f],Object.getOwnPropertyDescriptor(b.prototype,d[f]));for(c in b)"undefined"==typeof a[c]&&(a[c]=b[c]);a.$baseCtor=b};d.Path=function(){return[]};d.Paths=function(){return[]};d.DoublePoint=function(){var a=arguments;this.Y=this.X=0;1==a.length?(this.X=a[0].X,this.Y=a[0].Y):2==a.length&&(this.X=a[0],this.Y=
a[1])};d.DoublePoint0=function(){this.Y=this.X=0};d.DoublePoint1=function(a){this.X=a.X;this.Y=a.Y};d.DoublePoint2=function(a,b){this.X=a;this.Y=b};d.PolyNode=function(){this.m_Parent=null;this.m_polygon=new d.Path;this.m_endtype=this.m_jointype=this.m_Index=0;this.m_Childs=[];this.IsOpen=!1};d.PolyNode.prototype.IsHoleNode=function(){for(var a=!0,b=this.m_Parent;null!==b;)a=!a,b=b.m_Parent;return a};d.PolyNode.prototype.ChildCount=function(){return this.m_Childs.length};d.PolyNode.prototype.Contour=
function(){return this.m_polygon};d.PolyNode.prototype.AddChild=function(a){var b=this.m_Childs.length;this.m_Childs.push(a);a.m_Parent=this;a.m_Index=b};d.PolyNode.prototype.GetNext=function(){return 0<this.m_Childs.length?this.m_Childs[0]:this.GetNextSiblingUp()};d.PolyNode.prototype.GetNextSiblingUp=function(){return null===this.m_Parent?null:this.m_Index==this.m_Parent.m_Childs.length-1?this.m_Parent.GetNextSiblingUp():this.m_Parent.m_Childs[this.m_Index+1]};d.PolyNode.prototype.Childs=function(){return this.m_Childs};
d.PolyNode.prototype.Parent=function(){return this.m_Parent};d.PolyNode.prototype.IsHole=function(){return this.IsHoleNode()};d.PolyTree=function(){this.m_AllPolys=[];d.PolyNode.call(this)};d.PolyTree.prototype.Clear=function(){for(var a=0,b=this.m_AllPolys.length;a<b;a++)this.m_AllPolys[a]=null;this.m_AllPolys.length=0;this.m_Childs.length=0};d.PolyTree.prototype.GetFirst=function(){return 0<this.m_Childs.length?this.m_Childs[0]:null};d.PolyTree.prototype.Total=function(){var a=this.m_AllPolys.length;
0<a&&this.m_Childs[0]!=this.m_AllPolys[0]&&a--;return a};q(d.PolyTree,d.PolyNode);d.Math_Abs_Int64=d.Math_Abs_Int32=d.Math_Abs_Double=function(a){return Math.abs(a)};d.Math_Max_Int32_Int32=function(a,b){return Math.max(a,b)};d.Cast_Int32=r||I||L?function(a){return a|0}:function(a){return~~a};d.Cast_Int64=G?function(a){return-2147483648>a||2147483647<a?0>a?Math.ceil(a):Math.floor(a):~~a}:H&&"function"==typeof Number.toInteger?function(a){return Number.toInteger(a)}:Q||J?function(a){return parseInt(a,
10)}:r?function(a){return-2147483648>a||2147483647<a?0>a?Math.ceil(a):Math.floor(a):a|0}:function(a){return 0>a?Math.ceil(a):Math.floor(a)};d.Clear=function(a){a.length=0};d.PI=3.141592653589793;d.PI2=6.283185307179586;d.IntPoint=function(){var a=arguments,b=a.length;this.Y=this.X=0;d.use_xyz?(this.Z=0,3==b?(this.X=a[0],this.Y=a[1],this.Z=a[2]):2==b?(this.X=a[0],this.Y=a[1],this.Z=0):1==b?a[0]instanceof d.DoublePoint?(a=a[0],this.X=d.Clipper.Round(a.X),this.Y=d.Clipper.Round(a.Y),this.Z=0):(a=a[0],
"undefined"==typeof a.Z&&(a.Z=0),this.X=a.X,this.Y=a.Y,this.Z=a.Z):this.Z=this.Y=this.X=0):2==b?(this.X=a[0],this.Y=a[1]):1==b?a[0]instanceof d.DoublePoint?(a=a[0],this.X=d.Clipper.Round(a.X),this.Y=d.Clipper.Round(a.Y)):(a=a[0],this.X=a.X,this.Y=a.Y):this.Y=this.X=0};d.IntPoint.op_Equality=function(a,b){return a.X==b.X&&a.Y==b.Y};d.IntPoint.op_Inequality=function(a,b){return a.X!=b.X||a.Y!=b.Y};d.use_xyz?(d.IntPoint0=function(){this.Z=this.Y=this.X=0},d.IntPoint1=function(a){this.X=a.X;this.Y=a.Y;
this.Z=a.Z},d.IntPoint1dp=function(a){this.X=d.Clipper.Round(a.X);this.Y=d.Clipper.Round(a.Y);this.Z=0},d.IntPoint2=function(a,b){this.X=a;this.Y=b;this.Z=0},d.IntPoint3=function(a,b,c){this.X=a;this.Y=b;this.Z=c}):(d.IntPoint0=function(){this.Y=this.X=0},d.IntPoint1=function(a){this.X=a.X;this.Y=a.Y},d.IntPoint1dp=function(a){this.X=d.Clipper.Round(a.X);this.Y=d.Clipper.Round(a.Y)},d.IntPoint2=function(a,b){this.X=a;this.Y=b});d.IntRect=function(){var a=arguments,b=a.length;4==b?(this.left=a[0],
this.top=a[1],this.right=a[2],this.bottom=a[3]):1==b?(this.left=a[0].left,this.top=a[0].top,this.right=a[0].right,this.bottom=a[0].bottom):this.bottom=this.right=this.top=this.left=0};d.IntRect0=function(){this.bottom=this.right=this.top=this.left=0};d.IntRect1=function(a){this.left=a.left;this.top=a.top;this.right=a.right;this.bottom=a.bottom};d.IntRect4=function(a,b,c,d){this.left=a;this.top=b;this.right=c;this.bottom=d};d.ClipType={ctIntersection:0,ctUnion:1,ctDifference:2,ctXor:3};d.PolyType={ptSubject:0,
ptClip:1};d.PolyFillType={pftEvenOdd:0,pftNonZero:1,pftPositive:2,pftNegative:3};d.JoinType={jtSquare:0,jtRound:1,jtMiter:2};d.EndType={etOpenSquare:0,etOpenRound:1,etOpenButt:2,etClosedLine:3,etClosedPolygon:4};d.EdgeSide={esLeft:0,esRight:1};d.Direction={dRightToLeft:0,dLeftToRight:1};d.TEdge=function(){this.Bot=new d.IntPoint;this.Curr=new d.IntPoint;this.Top=new d.IntPoint;this.Delta=new d.IntPoint;this.Dx=0;this.PolyTyp=d.PolyType.ptSubject;this.Side=d.EdgeSide.esLeft;this.OutIdx=this.WindCnt2=
this.WindCnt=this.WindDelta=0;this.PrevInSEL=this.NextInSEL=this.PrevInAEL=this.NextInAEL=this.NextInLML=this.Prev=this.Next=null};d.IntersectNode=function(){this.Edge2=this.Edge1=null;this.Pt=new d.IntPoint};d.MyIntersectNodeSort=function(){};d.MyIntersectNodeSort.Compare=function(a,b){var c=b.Pt.Y-a.Pt.Y;return 0<c?1:0>c?-1:0};d.LocalMinima=function(){this.Y=0;this.Next=this.RightBound=this.LeftBound=null};d.Scanbeam=function(){this.Y=0;this.Next=null};d.OutRec=function(){this.Idx=0;this.IsOpen=
this.IsHole=!1;this.PolyNode=this.BottomPt=this.Pts=this.FirstLeft=null};d.OutPt=function(){this.Idx=0;this.Pt=new d.IntPoint;this.Prev=this.Next=null};d.Join=function(){this.OutPt2=this.OutPt1=null;this.OffPt=new d.IntPoint};d.ClipperBase=function(){this.m_CurrentLM=this.m_MinimaList=null;this.m_edges=[];this.PreserveCollinear=this.m_HasOpenPaths=this.m_UseFullRange=!1;this.m_CurrentLM=this.m_MinimaList=null;this.m_HasOpenPaths=this.m_UseFullRange=!1};d.ClipperBase.horizontal=-9007199254740992;d.ClipperBase.Skip=
-2;d.ClipperBase.Unassigned=-1;d.ClipperBase.tolerance=1E-20;d.ClipperBase.loRange=47453132;d.ClipperBase.hiRange=0xfffffffffffff;d.ClipperBase.near_zero=function(a){return a>-d.ClipperBase.tolerance&&a<d.ClipperBase.tolerance};d.ClipperBase.IsHorizontal=function(a){return 0===a.Delta.Y};d.ClipperBase.prototype.PointIsVertex=function(a,b){var c=b;do{if(d.IntPoint.op_Equality(c.Pt,a))return!0;c=c.Next}while(c!=b);return!1};d.ClipperBase.prototype.PointOnLineSegment=function(a,b,c,d){return d?a.X==
b.X&&a.Y==b.Y||a.X==c.X&&a.Y==c.Y||a.X>b.X==a.X<c.X&&a.Y>b.Y==a.Y<c.Y&&k.op_Equality(k.Int128Mul(a.X-b.X,c.Y-b.Y),k.Int128Mul(c.X-b.X,a.Y-b.Y)):a.X==b.X&&a.Y==b.Y||a.X==c.X&&a.Y==c.Y||a.X>b.X==a.X<c.X&&a.Y>b.Y==a.Y<c.Y&&(a.X-b.X)*(c.Y-b.Y)==(c.X-b.X)*(a.Y-b.Y)};d.ClipperBase.prototype.PointOnPolygon=function(a,b,c){for(var d=b;;){if(this.PointOnLineSegment(a,d.Pt,d.Next.Pt,c))return!0;d=d.Next;if(d==b)break}return!1};d.ClipperBase.prototype.SlopesEqual=d.ClipperBase.SlopesEqual=function(){var a=arguments,
b=a.length,c,e,f;if(3==b)return b=a[0],c=a[1],(a=a[2])?k.op_Equality(k.Int128Mul(b.Delta.Y,c.Delta.X),k.Int128Mul(b.Delta.X,c.Delta.Y)):d.Cast_Int64(b.Delta.Y*c.Delta.X)==d.Cast_Int64(b.Delta.X*c.Delta.Y);if(4==b)return b=a[0],c=a[1],e=a[2],(a=a[3])?k.op_Equality(k.Int128Mul(b.Y-c.Y,c.X-e.X),k.Int128Mul(b.X-c.X,c.Y-e.Y)):0===d.Cast_Int64((b.Y-c.Y)*(c.X-e.X))-d.Cast_Int64((b.X-c.X)*(c.Y-e.Y));b=a[0];c=a[1];e=a[2];f=a[3];return(a=a[4])?k.op_Equality(k.Int128Mul(b.Y-c.Y,e.X-f.X),k.Int128Mul(b.X-c.X,
e.Y-f.Y)):0===d.Cast_Int64((b.Y-c.Y)*(e.X-f.X))-d.Cast_Int64((b.X-c.X)*(e.Y-f.Y))};d.ClipperBase.SlopesEqual3=function(a,b,c){return c?k.op_Equality(k.Int128Mul(a.Delta.Y,b.Delta.X),k.Int128Mul(a.Delta.X,b.Delta.Y)):d.Cast_Int64(a.Delta.Y*b.Delta.X)==d.Cast_Int64(a.Delta.X*b.Delta.Y)};d.ClipperBase.SlopesEqual4=function(a,b,c,e){return e?k.op_Equality(k.Int128Mul(a.Y-b.Y,b.X-c.X),k.Int128Mul(a.X-b.X,b.Y-c.Y)):0===d.Cast_Int64((a.Y-b.Y)*(b.X-c.X))-d.Cast_Int64((a.X-b.X)*(b.Y-c.Y))};d.ClipperBase.SlopesEqual5=
function(a,b,c,e,f){return f?k.op_Equality(k.Int128Mul(a.Y-b.Y,c.X-e.X),k.Int128Mul(a.X-b.X,c.Y-e.Y)):0===d.Cast_Int64((a.Y-b.Y)*(c.X-e.X))-d.Cast_Int64((a.X-b.X)*(c.Y-e.Y))};d.ClipperBase.prototype.Clear=function(){this.DisposeLocalMinimaList();for(var a=0,b=this.m_edges.length;a<b;++a){for(var c=0,e=this.m_edges[a].length;c<e;++c)this.m_edges[a][c]=null;d.Clear(this.m_edges[a])}d.Clear(this.m_edges);this.m_HasOpenPaths=this.m_UseFullRange=!1};d.ClipperBase.prototype.DisposeLocalMinimaList=function(){for(;null!==
this.m_MinimaList;){var a=this.m_MinimaList.Next;this.m_MinimaList=null;this.m_MinimaList=a}this.m_CurrentLM=null};d.ClipperBase.prototype.RangeTest=function(a,b){if(b.Value)(a.X>d.ClipperBase.hiRange||a.Y>d.ClipperBase.hiRange||-a.X>d.ClipperBase.hiRange||-a.Y>d.ClipperBase.hiRange)&&d.Error("Coordinate outside allowed range in RangeTest().");else if(a.X>d.ClipperBase.loRange||a.Y>d.ClipperBase.loRange||-a.X>d.ClipperBase.loRange||-a.Y>d.ClipperBase.loRange)b.Value=!0,this.RangeTest(a,b)};d.ClipperBase.prototype.InitEdge=
function(a,b,c,e){a.Next=b;a.Prev=c;a.Curr.X=e.X;a.Curr.Y=e.Y;d.use_xyz&&(a.Curr.Z=e.Z);a.OutIdx=-1};d.ClipperBase.prototype.InitEdge2=function(a,b){a.Curr.Y>=a.Next.Curr.Y?(a.Bot.X=a.Curr.X,a.Bot.Y=a.Curr.Y,d.use_xyz&&(a.Bot.Z=a.Curr.Z),a.Top.X=a.Next.Curr.X,a.Top.Y=a.Next.Curr.Y,d.use_xyz&&(a.Top.Z=a.Next.Curr.Z)):(a.Top.X=a.Curr.X,a.Top.Y=a.Curr.Y,d.use_xyz&&(a.Top.Z=a.Curr.Z),a.Bot.X=a.Next.Curr.X,a.Bot.Y=a.Next.Curr.Y,d.use_xyz&&(a.Bot.Z=a.Next.Curr.Z));this.SetDx(a);a.PolyTyp=b};d.ClipperBase.prototype.FindNextLocMin=
function(a){for(var b;;){for(;d.IntPoint.op_Inequality(a.Bot,a.Prev.Bot)||d.IntPoint.op_Equality(a.Curr,a.Top);)a=a.Next;if(a.Dx!=d.ClipperBase.horizontal&&a.Prev.Dx!=d.ClipperBase.horizontal)break;for(;a.Prev.Dx==d.ClipperBase.horizontal;)a=a.Prev;for(b=a;a.Dx==d.ClipperBase.horizontal;)a=a.Next;if(a.Top.Y!=a.Prev.Bot.Y){b.Prev.Bot.X<a.Bot.X&&(a=b);break}}return a};d.ClipperBase.prototype.ProcessBound=function(a,b){var c,e=a,f;if(e.OutIdx==d.ClipperBase.Skip){a=e;if(b){for(;a.Top.Y==a.Next.Bot.Y;)a=
a.Next;for(;a!=e&&a.Dx==d.ClipperBase.horizontal;)a=a.Prev}else{for(;a.Top.Y==a.Prev.Bot.Y;)a=a.Prev;for(;a!=e&&a.Dx==d.ClipperBase.horizontal;)a=a.Next}a==e?e=b?a.Next:a.Prev:(a=b?e.Next:e.Prev,c=new d.LocalMinima,c.Next=null,c.Y=a.Bot.Y,c.LeftBound=null,c.RightBound=a,a.WindDelta=0,e=this.ProcessBound(a,b),this.InsertLocalMinima(c));return e}a.Dx==d.ClipperBase.horizontal&&(c=b?a.Prev:a.Next,c.OutIdx!=d.ClipperBase.Skip&&(c.Dx==d.ClipperBase.horizontal?c.Bot.X!=a.Bot.X&&c.Top.X!=a.Bot.X&&this.ReverseHorizontal(a):
c.Bot.X!=a.Bot.X&&this.ReverseHorizontal(a)));c=a;if(b){for(;e.Top.Y==e.Next.Bot.Y&&e.Next.OutIdx!=d.ClipperBase.Skip;)e=e.Next;if(e.Dx==d.ClipperBase.horizontal&&e.Next.OutIdx!=d.ClipperBase.Skip){for(f=e;f.Prev.Dx==d.ClipperBase.horizontal;)f=f.Prev;f.Prev.Top.X==e.Next.Top.X?b||(e=f.Prev):f.Prev.Top.X>e.Next.Top.X&&(e=f.Prev)}for(;a!=e;)a.NextInLML=a.Next,a.Dx==d.ClipperBase.horizontal&&a!=c&&a.Bot.X!=a.Prev.Top.X&&this.ReverseHorizontal(a),a=a.Next;a.Dx==d.ClipperBase.horizontal&&a!=c&&a.Bot.X!=
a.Prev.Top.X&&this.ReverseHorizontal(a);e=e.Next}else{for(;e.Top.Y==e.Prev.Bot.Y&&e.Prev.OutIdx!=d.ClipperBase.Skip;)e=e.Prev;if(e.Dx==d.ClipperBase.horizontal&&e.Prev.OutIdx!=d.ClipperBase.Skip){for(f=e;f.Next.Dx==d.ClipperBase.horizontal;)f=f.Next;f.Next.Top.X==e.Prev.Top.X?b||(e=f.Next):f.Next.Top.X>e.Prev.Top.X&&(e=f.Next)}for(;a!=e;)a.NextInLML=a.Prev,a.Dx==d.ClipperBase.horizontal&&a!=c&&a.Bot.X!=a.Next.Top.X&&this.ReverseHorizontal(a),a=a.Prev;a.Dx==d.ClipperBase.horizontal&&a!=c&&a.Bot.X!=
a.Next.Top.X&&this.ReverseHorizontal(a);e=e.Prev}return e};d.ClipperBase.prototype.AddPath=function(a,b,c){d.use_lines?c||b!=d.PolyType.ptClip||d.Error("AddPath: Open paths must be subject."):c||d.Error("AddPath: Open paths have been disabled.");var e=a.length-1;if(c)for(;0<e&&d.IntPoint.op_Equality(a[e],a[0]);)--e;for(;0<e&&d.IntPoint.op_Equality(a[e],a[e-1]);)--e;if(c&&2>e||!c&&1>e)return!1;for(var f=[],g=0;g<=e;g++)f.push(new d.TEdge);var h=!0;f[1].Curr.X=a[1].X;f[1].Curr.Y=a[1].Y;d.use_xyz&&(f[1].Curr.Z=
a[1].Z);var l={Value:this.m_UseFullRange};this.RangeTest(a[0],l);this.m_UseFullRange=l.Value;l.Value=this.m_UseFullRange;this.RangeTest(a[e],l);this.m_UseFullRange=l.Value;this.InitEdge(f[0],f[1],f[e],a[0]);this.InitEdge(f[e],f[0],f[e-1],a[e]);for(g=e-1;1<=g;--g)l.Value=this.m_UseFullRange,this.RangeTest(a[g],l),this.m_UseFullRange=l.Value,this.InitEdge(f[g],f[g+1],f[g-1],a[g]);for(g=a=e=f[0];;)if(a.Curr!=a.Next.Curr||!c&&a.Next==e){if(a.Prev==a.Next)break;else if(c&&d.ClipperBase.SlopesEqual(a.Prev.Curr,
a.Curr,a.Next.Curr,this.m_UseFullRange)&&(!this.PreserveCollinear||!this.Pt2IsBetweenPt1AndPt3(a.Prev.Curr,a.Curr,a.Next.Curr))){a==e&&(e=a.Next);a=this.RemoveEdge(a);g=a=a.Prev;continue}a=a.Next;if(a==g||!c&&a.Next==e)break}else{if(a==a.Next)break;a==e&&(e=a.Next);g=a=this.RemoveEdge(a)}if(!c&&a==a.Next||c&&a.Prev==a.Next)return!1;c||(this.m_HasOpenPaths=!0,e.Prev.OutIdx=d.ClipperBase.Skip);a=e;do this.InitEdge2(a,b),a=a.Next,h&&a.Curr.Y!=e.Curr.Y&&(h=!1);while(a!=e);if(h){if(c)return!1;a.Prev.OutIdx=
d.ClipperBase.Skip;a.Prev.Bot.X<a.Prev.Top.X&&this.ReverseHorizontal(a.Prev);b=new d.LocalMinima;b.Next=null;b.Y=a.Bot.Y;b.LeftBound=null;b.RightBound=a;b.RightBound.Side=d.EdgeSide.esRight;for(b.RightBound.WindDelta=0;a.Next.OutIdx!=d.ClipperBase.Skip;)a.NextInLML=a.Next,a.Bot.X!=a.Prev.Top.X&&this.ReverseHorizontal(a),a=a.Next;this.InsertLocalMinima(b);this.m_edges.push(f);return!0}this.m_edges.push(f);h=null;d.IntPoint.op_Equality(a.Prev.Bot,a.Prev.Top)&&(a=a.Next);for(;;){a=this.FindNextLocMin(a);
if(a==h)break;else null==h&&(h=a);b=new d.LocalMinima;b.Next=null;b.Y=a.Bot.Y;a.Dx<a.Prev.Dx?(b.LeftBound=a.Prev,b.RightBound=a,f=!1):(b.LeftBound=a,b.RightBound=a.Prev,f=!0);b.LeftBound.Side=d.EdgeSide.esLeft;b.RightBound.Side=d.EdgeSide.esRight;b.LeftBound.WindDelta=c?b.LeftBound.Next==b.RightBound?-1:1:0;b.RightBound.WindDelta=-b.LeftBound.WindDelta;a=this.ProcessBound(b.LeftBound,f);a.OutIdx==d.ClipperBase.Skip&&(a=this.ProcessBound(a,f));e=this.ProcessBound(b.RightBound,!f);e.OutIdx==d.ClipperBase.Skip&&
(e=this.ProcessBound(e,!f));b.LeftBound.OutIdx==d.ClipperBase.Skip?b.LeftBound=null:b.RightBound.OutIdx==d.ClipperBase.Skip&&(b.RightBound=null);this.InsertLocalMinima(b);f||(a=e)}return!0};d.ClipperBase.prototype.AddPaths=function(a,b,c){for(var d=!1,f=0,g=a.length;f<g;++f)this.AddPath(a[f],b,c)&&(d=!0);return d};d.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3=function(a,b,c){return d.IntPoint.op_Equality(a,c)||d.IntPoint.op_Equality(a,b)||d.IntPoint.op_Equality(c,b)?!1:a.X!=c.X?b.X>a.X==b.X<c.X:b.Y>
a.Y==b.Y<c.Y};d.ClipperBase.prototype.RemoveEdge=function(a){a.Prev.Next=a.Next;a.Next.Prev=a.Prev;var b=a.Next;a.Prev=null;return b};d.ClipperBase.prototype.SetDx=function(a){a.Delta.X=a.Top.X-a.Bot.X;a.Delta.Y=a.Top.Y-a.Bot.Y;a.Dx=0===a.Delta.Y?d.ClipperBase.horizontal:a.Delta.X/a.Delta.Y};d.ClipperBase.prototype.InsertLocalMinima=function(a){if(null===this.m_MinimaList)this.m_MinimaList=a;else if(a.Y>=this.m_MinimaList.Y)a.Next=this.m_MinimaList,this.m_MinimaList=a;else{for(var b=this.m_MinimaList;null!==
b.Next&&a.Y<b.Next.Y;)b=b.Next;a.Next=b.Next;b.Next=a}};d.ClipperBase.prototype.PopLocalMinima=function(){null!==this.m_CurrentLM&&(this.m_CurrentLM=this.m_CurrentLM.Next)};d.ClipperBase.prototype.ReverseHorizontal=function(a){var b=a.Top.X;a.Top.X=a.Bot.X;a.Bot.X=b;d.use_xyz&&(b=a.Top.Z,a.Top.Z=a.Bot.Z,a.Bot.Z=b)};d.ClipperBase.prototype.Reset=function(){this.m_CurrentLM=this.m_MinimaList;if(null!=this.m_CurrentLM)for(var a=this.m_MinimaList;null!=a;){var b=a.LeftBound;null!=b&&(b.Curr.X=b.Bot.X,
b.Curr.Y=b.Bot.Y,d.use_xyz&&(b.Curr.Z=b.Bot.Z),b.Side=d.EdgeSide.esLeft,b.OutIdx=d.ClipperBase.Unassigned);b=a.RightBound;null!=b&&(b.Curr.X=b.Bot.X,b.Curr.Y=b.Bot.Y,d.use_xyz&&(b.Curr.Z=b.Bot.Z),b.Side=d.EdgeSide.esRight,b.OutIdx=d.ClipperBase.Unassigned);a=a.Next}};d.Clipper=function(a){"undefined"==typeof a&&(a=0);this.m_PolyOuts=null;this.m_ClipType=d.ClipType.ctIntersection;this.m_IntersectNodeComparer=this.m_IntersectList=this.m_SortedEdges=this.m_ActiveEdges=this.m_Scanbeam=null;this.m_ExecuteLocked=
!1;this.m_SubjFillType=this.m_ClipFillType=d.PolyFillType.pftEvenOdd;this.m_GhostJoins=this.m_Joins=null;this.StrictlySimple=this.ReverseSolution=this.m_UsingPolyTree=!1;d.ClipperBase.call(this);this.m_SortedEdges=this.m_ActiveEdges=this.m_Scanbeam=null;this.m_IntersectList=[];this.m_IntersectNodeComparer=d.MyIntersectNodeSort.Compare;this.m_UsingPolyTree=this.m_ExecuteLocked=!1;this.m_PolyOuts=[];this.m_Joins=[];this.m_GhostJoins=[];this.ReverseSolution=0!==(1&a);this.StrictlySimple=0!==(2&a);this.PreserveCollinear=
0!==(4&a);d.use_xyz&&(this.ZFillFunction=null)};d.Clipper.ioReverseSolution=1;d.Clipper.ioStrictlySimple=2;d.Clipper.ioPreserveCollinear=4;d.Clipper.prototype.Clear=function(){0!==this.m_edges.length&&(this.DisposeAllPolyPts(),d.ClipperBase.prototype.Clear.call(this))};d.Clipper.prototype.DisposeScanbeamList=function(){for(;null!==this.m_Scanbeam;){var a=this.m_Scanbeam.Next;this.m_Scanbeam=null;this.m_Scanbeam=a}};d.Clipper.prototype.Reset=function(){d.ClipperBase.prototype.Reset.call(this);this.m_SortedEdges=
this.m_ActiveEdges=this.m_Scanbeam=null;for(var a=this.m_MinimaList;null!==a;)this.InsertScanbeam(a.Y),a=a.Next};d.Clipper.prototype.InsertScanbeam=function(a){if(null===this.m_Scanbeam)this.m_Scanbeam=new d.Scanbeam,this.m_Scanbeam.Next=null,this.m_Scanbeam.Y=a;else if(a>this.m_Scanbeam.Y){var b=new d.Scanbeam;b.Y=a;b.Next=this.m_Scanbeam;this.m_Scanbeam=b}else{for(var c=this.m_Scanbeam;null!==c.Next&&a<=c.Next.Y;)c=c.Next;a!=c.Y&&(b=new d.Scanbeam,b.Y=a,b.Next=c.Next,c.Next=b)}};d.Clipper.prototype.Execute=
function(){var a=arguments,b=a.length,c=a[1]instanceof d.PolyTree;if(4!=b||c){if(4==b&&c){var b=a[0],e=a[1],c=a[2],a=a[3];if(this.m_ExecuteLocked)return!1;this.m_ExecuteLocked=!0;this.m_SubjFillType=c;this.m_ClipFillType=a;this.m_ClipType=b;this.m_UsingPolyTree=!0;try{(f=this.ExecuteInternal())&&this.BuildResult2(e)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return f}if(2==b&&!c||2==b&&c)return b=a[0],e=a[1],this.Execute(b,e,d.PolyFillType.pftEvenOdd,d.PolyFillType.pftEvenOdd)}else{b=
a[0];e=a[1];c=a[2];a=a[3];if(this.m_ExecuteLocked)return!1;this.m_HasOpenPaths&&d.Error("Error: PolyTree struct is need for open path clipping.");this.m_ExecuteLocked=!0;d.Clear(e);this.m_SubjFillType=c;this.m_ClipFillType=a;this.m_ClipType=b;this.m_UsingPolyTree=!1;try{var f=this.ExecuteInternal();f&&this.BuildResult(e)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=!1}return f}};d.Clipper.prototype.FixHoleLinkage=function(a){if(null!==a.FirstLeft&&(a.IsHole==a.FirstLeft.IsHole||null===a.FirstLeft.Pts)){for(var b=
a.FirstLeft;null!==b&&(b.IsHole==a.IsHole||null===b.Pts);)b=b.FirstLeft;a.FirstLeft=b}};d.Clipper.prototype.ExecuteInternal=function(){try{this.Reset();if(null===this.m_CurrentLM)return!1;var a=this.PopScanbeam();do{this.InsertLocalMinimaIntoAEL(a);d.Clear(this.m_GhostJoins);this.ProcessHorizontals(!1);if(null===this.m_Scanbeam)break;var b=this.PopScanbeam();if(!this.ProcessIntersections(b))return!1;this.ProcessEdgesAtTopOfScanbeam(b);a=b}while(null!==this.m_Scanbeam||null!==this.m_CurrentLM);for(var a=
0,c=this.m_PolyOuts.length;a<c;a++){var e=this.m_PolyOuts[a];null===e.Pts||e.IsOpen||(e.IsHole^this.ReverseSolution)==0<this.Area(e)&&this.ReversePolyPtLinks(e.Pts)}this.JoinCommonEdges();a=0;for(c=this.m_PolyOuts.length;a<c;a++)e=this.m_PolyOuts[a],null===e.Pts||e.IsOpen||this.FixupOutPolygon(e);this.StrictlySimple&&this.DoSimplePolygons();return!0}finally{d.Clear(this.m_Joins),d.Clear(this.m_GhostJoins)}};d.Clipper.prototype.PopScanbeam=function(){var a=this.m_Scanbeam.Y;this.m_Scanbeam=this.m_Scanbeam.Next;
return a};d.Clipper.prototype.DisposeAllPolyPts=function(){for(var a=0,b=this.m_PolyOuts.length;a<b;++a)this.DisposeOutRec(a);d.Clear(this.m_PolyOuts)};d.Clipper.prototype.DisposeOutRec=function(a){this.m_PolyOuts[a].Pts=null;this.m_PolyOuts[a]=null};d.Clipper.prototype.AddJoin=function(a,b,c){var e=new d.Join;e.OutPt1=a;e.OutPt2=b;e.OffPt.X=c.X;e.OffPt.Y=c.Y;d.use_xyz&&(e.OffPt.Z=c.Z);this.m_Joins.push(e)};d.Clipper.prototype.AddGhostJoin=function(a,b){var c=new d.Join;c.OutPt1=a;c.OffPt.X=b.X;c.OffPt.Y=
b.Y;d.use_xyz&&(c.OffPt.Z=b.Z);this.m_GhostJoins.push(c)};d.Clipper.prototype.SetZ=function(a,b,c){null!==this.ZFillFunction&&0==a.Z&&null!==this.ZFillFunction&&(d.IntPoint.op_Equality(a,b.Bot)?a.Z=b.Bot.Z:d.IntPoint.op_Equality(a,b.Top)?a.Z=b.Top.Z:d.IntPoint.op_Equality(a,c.Bot)?a.Z=c.Bot.Z:d.IntPoint.op_Equality(a,c.Top)?a.Z=c.Top.Z:this.ZFillFunction(b.Bot,b.Top,c.Bot,c.Top,a))};d.Clipper.prototype.InsertLocalMinimaIntoAEL=function(a){for(;null!==this.m_CurrentLM&&this.m_CurrentLM.Y==a;){var b=
this.m_CurrentLM.LeftBound,c=this.m_CurrentLM.RightBound;this.PopLocalMinima();var e=null;null===b?(this.InsertEdgeIntoAEL(c,null),this.SetWindingCount(c),this.IsContributing(c)&&(e=this.AddOutPt(c,c.Bot))):(null==c?(this.InsertEdgeIntoAEL(b,null),this.SetWindingCount(b),this.IsContributing(b)&&(e=this.AddOutPt(b,b.Bot))):(this.InsertEdgeIntoAEL(b,null),this.InsertEdgeIntoAEL(c,b),this.SetWindingCount(b),c.WindCnt=b.WindCnt,c.WindCnt2=b.WindCnt2,this.IsContributing(b)&&(e=this.AddLocalMinPoly(b,c,
b.Bot))),this.InsertScanbeam(b.Top.Y));null!=c&&(d.ClipperBase.IsHorizontal(c)?this.AddEdgeToSEL(c):this.InsertScanbeam(c.Top.Y));if(null!=b&&null!=c){if(null!==e&&d.ClipperBase.IsHorizontal(c)&&0<this.m_GhostJoins.length&&0!==c.WindDelta)for(var f=0,g=this.m_GhostJoins.length;f<g;f++){var h=this.m_GhostJoins[f];this.HorzSegmentsOverlap(h.OutPt1.Pt.X,h.OffPt.X,c.Bot.X,c.Top.X)&&this.AddJoin(h.OutPt1,e,h.OffPt)}0<=b.OutIdx&&null!==b.PrevInAEL&&b.PrevInAEL.Curr.X==b.Bot.X&&0<=b.PrevInAEL.OutIdx&&d.ClipperBase.SlopesEqual(b.PrevInAEL,
b,this.m_UseFullRange)&&0!==b.WindDelta&&0!==b.PrevInAEL.WindDelta&&(f=this.AddOutPt(b.PrevInAEL,b.Bot),this.AddJoin(e,f,b.Top));if(b.NextInAEL!=c&&(0<=c.OutIdx&&0<=c.PrevInAEL.OutIdx&&d.ClipperBase.SlopesEqual(c.PrevInAEL,c,this.m_UseFullRange)&&0!==c.WindDelta&&0!==c.PrevInAEL.WindDelta&&(f=this.AddOutPt(c.PrevInAEL,c.Bot),this.AddJoin(e,f,c.Top)),e=b.NextInAEL,null!==e))for(;e!=c;)this.IntersectEdges(c,e,b.Curr,!1),e=e.NextInAEL}}};d.Clipper.prototype.InsertEdgeIntoAEL=function(a,b){if(null===
this.m_ActiveEdges)a.PrevInAEL=null,a.NextInAEL=null,this.m_ActiveEdges=a;else if(null===b&&this.E2InsertsBeforeE1(this.m_ActiveEdges,a))a.PrevInAEL=null,a.NextInAEL=this.m_ActiveEdges,this.m_ActiveEdges=this.m_ActiveEdges.PrevInAEL=a;else{null===b&&(b=this.m_ActiveEdges);for(;null!==b.NextInAEL&&!this.E2InsertsBeforeE1(b.NextInAEL,a);)b=b.NextInAEL;a.NextInAEL=b.NextInAEL;null!==b.NextInAEL&&(b.NextInAEL.PrevInAEL=a);a.PrevInAEL=b;b.NextInAEL=a}};d.Clipper.prototype.E2InsertsBeforeE1=function(a,
b){return b.Curr.X==a.Curr.X?b.Top.Y>a.Top.Y?b.Top.X<d.Clipper.TopX(a,b.Top.Y):a.Top.X>d.Clipper.TopX(b,a.Top.Y):b.Curr.X<a.Curr.X};d.Clipper.prototype.IsEvenOddFillType=function(a){return a.PolyTyp==d.PolyType.ptSubject?this.m_SubjFillType==d.PolyFillType.pftEvenOdd:this.m_ClipFillType==d.PolyFillType.pftEvenOdd};d.Clipper.prototype.IsEvenOddAltFillType=function(a){return a.PolyTyp==d.PolyType.ptSubject?this.m_ClipFillType==d.PolyFillType.pftEvenOdd:this.m_SubjFillType==d.PolyFillType.pftEvenOdd};
d.Clipper.prototype.IsContributing=function(a){var b,c;a.PolyTyp==d.PolyType.ptSubject?(b=this.m_SubjFillType,c=this.m_ClipFillType):(b=this.m_ClipFillType,c=this.m_SubjFillType);switch(b){case d.PolyFillType.pftEvenOdd:if(0===a.WindDelta&&1!=a.WindCnt)return!1;break;case d.PolyFillType.pftNonZero:if(1!=Math.abs(a.WindCnt))return!1;break;case d.PolyFillType.pftPositive:if(1!=a.WindCnt)return!1;break;default:if(-1!=a.WindCnt)return!1}switch(this.m_ClipType){case d.ClipType.ctIntersection:switch(c){case d.PolyFillType.pftEvenOdd:case d.PolyFillType.pftNonZero:return 0!==
a.WindCnt2;case d.PolyFillType.pftPositive:return 0<a.WindCnt2;default:return 0>a.WindCnt2}case d.ClipType.ctUnion:switch(c){case d.PolyFillType.pftEvenOdd:case d.PolyFillType.pftNonZero:return 0===a.WindCnt2;case d.PolyFillType.pftPositive:return 0>=a.WindCnt2;default:return 0<=a.WindCnt2}case d.ClipType.ctDifference:if(a.PolyTyp==d.PolyType.ptSubject)switch(c){case d.PolyFillType.pftEvenOdd:case d.PolyFillType.pftNonZero:return 0===a.WindCnt2;case d.PolyFillType.pftPositive:return 0>=a.WindCnt2;
default:return 0<=a.WindCnt2}else switch(c){case d.PolyFillType.pftEvenOdd:case d.PolyFillType.pftNonZero:return 0!==a.WindCnt2;case d.PolyFillType.pftPositive:return 0<a.WindCnt2;default:return 0>a.WindCnt2}case d.ClipType.ctXor:if(0===a.WindDelta)switch(c){case d.PolyFillType.pftEvenOdd:case d.PolyFillType.pftNonZero:return 0===a.WindCnt2;case d.PolyFillType.pftPositive:return 0>=a.WindCnt2;default:return 0<=a.WindCnt2}}return!0};d.Clipper.prototype.SetWindingCount=function(a){for(var b=a.PrevInAEL;null!==
b&&(b.PolyTyp!=a.PolyTyp||0===b.WindDelta);)b=b.PrevInAEL;if(null===b)a.WindCnt=0===a.WindDelta?1:a.WindDelta,a.WindCnt2=0,b=this.m_ActiveEdges;else{if(0===a.WindDelta&&this.m_ClipType!=d.ClipType.ctUnion)a.WindCnt=1;else if(this.IsEvenOddFillType(a))if(0===a.WindDelta){for(var c=!0,e=b.PrevInAEL;null!==e;)e.PolyTyp==b.PolyTyp&&0!==e.WindDelta&&(c=!c),e=e.PrevInAEL;a.WindCnt=c?0:1}else a.WindCnt=a.WindDelta;else a.WindCnt=0>b.WindCnt*b.WindDelta?1<Math.abs(b.WindCnt)?0>b.WindDelta*a.WindDelta?b.WindCnt:
b.WindCnt+a.WindDelta:0===a.WindDelta?1:a.WindDelta:0===a.WindDelta?0>b.WindCnt?b.WindCnt-1:b.WindCnt+1:0>b.WindDelta*a.WindDelta?b.WindCnt:b.WindCnt+a.WindDelta;a.WindCnt2=b.WindCnt2;b=b.NextInAEL}if(this.IsEvenOddAltFillType(a))for(;b!=a;)0!==b.WindDelta&&(a.WindCnt2=0===a.WindCnt2?1:0),b=b.NextInAEL;else for(;b!=a;)a.WindCnt2+=b.WindDelta,b=b.NextInAEL};d.Clipper.prototype.AddEdgeToSEL=function(a){null===this.m_SortedEdges?(this.m_SortedEdges=a,a.PrevInSEL=null,a.NextInSEL=null):(a.NextInSEL=this.m_SortedEdges,
a.PrevInSEL=null,this.m_SortedEdges=this.m_SortedEdges.PrevInSEL=a)};d.Clipper.prototype.CopyAELToSEL=function(){var a=this.m_ActiveEdges;for(this.m_SortedEdges=a;null!==a;)a.PrevInSEL=a.PrevInAEL,a=a.NextInSEL=a.NextInAEL};d.Clipper.prototype.SwapPositionsInAEL=function(a,b){if(a.NextInAEL!=a.PrevInAEL&&b.NextInAEL!=b.PrevInAEL){if(a.NextInAEL==b){var c=b.NextInAEL;null!==c&&(c.PrevInAEL=a);var d=a.PrevInAEL;null!==d&&(d.NextInAEL=b);b.PrevInAEL=d;b.NextInAEL=a;a.PrevInAEL=b;a.NextInAEL=c}else b.NextInAEL==
a?(c=a.NextInAEL,null!==c&&(c.PrevInAEL=b),d=b.PrevInAEL,null!==d&&(d.NextInAEL=a),a.PrevInAEL=d,a.NextInAEL=b,b.PrevInAEL=a,b.NextInAEL=c):(c=a.NextInAEL,d=a.PrevInAEL,a.NextInAEL=b.NextInAEL,null!==a.NextInAEL&&(a.NextInAEL.PrevInAEL=a),a.PrevInAEL=b.PrevInAEL,null!==a.PrevInAEL&&(a.PrevInAEL.NextInAEL=a),b.NextInAEL=c,null!==b.NextInAEL&&(b.NextInAEL.PrevInAEL=b),b.PrevInAEL=d,null!==b.PrevInAEL&&(b.PrevInAEL.NextInAEL=b));null===a.PrevInAEL?this.m_ActiveEdges=a:null===b.PrevInAEL&&(this.m_ActiveEdges=
b)}};d.Clipper.prototype.SwapPositionsInSEL=function(a,b){if(null!==a.NextInSEL||null!==a.PrevInSEL)if(null!==b.NextInSEL||null!==b.PrevInSEL){if(a.NextInSEL==b){var c=b.NextInSEL;null!==c&&(c.PrevInSEL=a);var d=a.PrevInSEL;null!==d&&(d.NextInSEL=b);b.PrevInSEL=d;b.NextInSEL=a;a.PrevInSEL=b;a.NextInSEL=c}else b.NextInSEL==a?(c=a.NextInSEL,null!==c&&(c.PrevInSEL=b),d=b.PrevInSEL,null!==d&&(d.NextInSEL=a),a.PrevInSEL=d,a.NextInSEL=b,b.PrevInSEL=a,b.NextInSEL=c):(c=a.NextInSEL,d=a.PrevInSEL,a.NextInSEL=
b.NextInSEL,null!==a.NextInSEL&&(a.NextInSEL.PrevInSEL=a),a.PrevInSEL=b.PrevInSEL,null!==a.PrevInSEL&&(a.PrevInSEL.NextInSEL=a),b.NextInSEL=c,null!==b.NextInSEL&&(b.NextInSEL.PrevInSEL=b),b.PrevInSEL=d,null!==b.PrevInSEL&&(b.PrevInSEL.NextInSEL=b));null===a.PrevInSEL?this.m_SortedEdges=a:null===b.PrevInSEL&&(this.m_SortedEdges=b)}};d.Clipper.prototype.AddLocalMaxPoly=function(a,b,c){this.AddOutPt(a,c);0==b.WindDelta&&this.AddOutPt(b,c);a.OutIdx==b.OutIdx?(a.OutIdx=-1,b.OutIdx=-1):a.OutIdx<b.OutIdx?
this.AppendPolygon(a,b):this.AppendPolygon(b,a)};d.Clipper.prototype.AddLocalMinPoly=function(a,b,c){var e,f;d.ClipperBase.IsHorizontal(b)||a.Dx>b.Dx?(e=this.AddOutPt(a,c),b.OutIdx=a.OutIdx,a.Side=d.EdgeSide.esLeft,b.Side=d.EdgeSide.esRight,f=a,a=f.PrevInAEL==b?b.PrevInAEL:f.PrevInAEL):(e=this.AddOutPt(b,c),a.OutIdx=b.OutIdx,a.Side=d.EdgeSide.esRight,b.Side=d.EdgeSide.esLeft,f=b,a=f.PrevInAEL==a?a.PrevInAEL:f.PrevInAEL);null!==a&&0<=a.OutIdx&&d.Clipper.TopX(a,c.Y)==d.Clipper.TopX(f,c.Y)&&d.ClipperBase.SlopesEqual(f,
a,this.m_UseFullRange)&&0!==f.WindDelta&&0!==a.WindDelta&&(c=this.AddOutPt(a,c),this.AddJoin(e,c,f.Top));return e};d.Clipper.prototype.CreateOutRec=function(){var a=new d.OutRec;a.Idx=-1;a.IsHole=!1;a.IsOpen=!1;a.FirstLeft=null;a.Pts=null;a.BottomPt=null;a.PolyNode=null;this.m_PolyOuts.push(a);a.Idx=this.m_PolyOuts.length-1;return a};d.Clipper.prototype.AddOutPt=function(a,b){var c=a.Side==d.EdgeSide.esLeft;if(0>a.OutIdx){var e=this.CreateOutRec();e.IsOpen=0===a.WindDelta;var f=new d.OutPt;e.Pts=
f;f.Idx=e.Idx;f.Pt.X=b.X;f.Pt.Y=b.Y;d.use_xyz&&(f.Pt.Z=b.Z);f.Next=f;f.Prev=f;e.IsOpen||this.SetHoleState(a,e);a.OutIdx=e.Idx}else{var e=this.m_PolyOuts[a.OutIdx],g=e.Pts;if(c&&d.IntPoint.op_Equality(b,g.Pt))return g;if(!c&&d.IntPoint.op_Equality(b,g.Prev.Pt))return g.Prev;f=new d.OutPt;f.Idx=e.Idx;f.Pt.X=b.X;f.Pt.Y=b.Y;d.use_xyz&&(f.Pt.Z=b.Z);f.Next=g;f.Prev=g.Prev;f.Prev.Next=f;g.Prev=f;c&&(e.Pts=f)}return f};d.Clipper.prototype.SwapPoints=function(a,b){var c=new d.IntPoint(a.Value);a.Value.X=b.Value.X;
a.Value.Y=b.Value.Y;d.use_xyz&&(a.Value.Z=b.Value.Z);b.Value.X=c.X;b.Value.Y=c.Y;d.use_xyz&&(b.Value.Z=c.Z)};d.Clipper.prototype.HorzSegmentsOverlap=function(a,b,c,d){var e;a>b&&(e=a,a=b,b=e);c>d&&(e=c,c=d,d=e);return a<d&&c<b};d.Clipper.prototype.SetHoleState=function(a,b){for(var c=!1,d=a.PrevInAEL;null!==d;)0<=d.OutIdx&&0!=d.WindDelta&&(c=!c,null===b.FirstLeft&&(b.FirstLeft=this.m_PolyOuts[d.OutIdx])),d=d.PrevInAEL;c&&(b.IsHole=!0)};d.Clipper.prototype.GetDx=function(a,b){return a.Y==b.Y?d.ClipperBase.horizontal:
(b.X-a.X)/(b.Y-a.Y)};d.Clipper.prototype.FirstIsBottomPt=function(a,b){for(var c=a.Prev;d.IntPoint.op_Equality(c.Pt,a.Pt)&&c!=a;)c=c.Prev;for(var e=Math.abs(this.GetDx(a.Pt,c.Pt)),c=a.Next;d.IntPoint.op_Equality(c.Pt,a.Pt)&&c!=a;)c=c.Next;for(var f=Math.abs(this.GetDx(a.Pt,c.Pt)),c=b.Prev;d.IntPoint.op_Equality(c.Pt,b.Pt)&&c!=b;)c=c.Prev;for(var g=Math.abs(this.GetDx(b.Pt,c.Pt)),c=b.Next;d.IntPoint.op_Equality(c.Pt,b.Pt)&&c!=b;)c=c.Next;c=Math.abs(this.GetDx(b.Pt,c.Pt));return e>=g&&e>=c||f>=g&&f>=
c};d.Clipper.prototype.GetBottomPt=function(a){for(var b=null,c=a.Next;c!=a;)c.Pt.Y>a.Pt.Y?(a=c,b=null):c.Pt.Y==a.Pt.Y&&c.Pt.X<=a.Pt.X&&(c.Pt.X<a.Pt.X?(b=null,a=c):c.Next!=a&&c.Prev!=a&&(b=c)),c=c.Next;if(null!==b)for(;b!=c;)for(this.FirstIsBottomPt(c,b)||(a=b),b=b.Next;d.IntPoint.op_Inequality(b.Pt,a.Pt);)b=b.Next;return a};d.Clipper.prototype.GetLowermostRec=function(a,b){null===a.BottomPt&&(a.BottomPt=this.GetBottomPt(a.Pts));null===b.BottomPt&&(b.BottomPt=this.GetBottomPt(b.Pts));var c=a.BottomPt,
d=b.BottomPt;return c.Pt.Y>d.Pt.Y?a:c.Pt.Y<d.Pt.Y?b:c.Pt.X<d.Pt.X?a:c.Pt.X>d.Pt.X?b:c.Next==c?b:d.Next==d?a:this.FirstIsBottomPt(c,d)?a:b};d.Clipper.prototype.Param1RightOfParam2=function(a,b){do if(a=a.FirstLeft,a==b)return!0;while(null!==a);return!1};d.Clipper.prototype.GetOutRec=function(a){for(a=this.m_PolyOuts[a];a!=this.m_PolyOuts[a.Idx];)a=this.m_PolyOuts[a.Idx];return a};d.Clipper.prototype.AppendPolygon=function(a,b){var c=this.m_PolyOuts[a.OutIdx],e=this.m_PolyOuts[b.OutIdx],f;f=this.Param1RightOfParam2(c,
e)?e:this.Param1RightOfParam2(e,c)?c:this.GetLowermostRec(c,e);var g=c.Pts,h=g.Prev,l=e.Pts,k=l.Prev;a.Side==d.EdgeSide.esLeft?(b.Side==d.EdgeSide.esLeft?(this.ReversePolyPtLinks(l),l.Next=g,g.Prev=l,h.Next=k,k.Prev=h,c.Pts=k):(k.Next=g,g.Prev=k,l.Prev=h,h.Next=l,c.Pts=l),g=d.EdgeSide.esLeft):(b.Side==d.EdgeSide.esRight?(this.ReversePolyPtLinks(l),h.Next=k,k.Prev=h,l.Next=g,g.Prev=l):(h.Next=l,l.Prev=h,g.Prev=k,k.Next=g),g=d.EdgeSide.esRight);c.BottomPt=null;f==e&&(e.FirstLeft!=c&&(c.FirstLeft=e.FirstLeft),
c.IsHole=e.IsHole);e.Pts=null;e.BottomPt=null;e.FirstLeft=c;f=a.OutIdx;h=b.OutIdx;a.OutIdx=-1;b.OutIdx=-1;for(l=this.m_ActiveEdges;null!==l;){if(l.OutIdx==h){l.OutIdx=f;l.Side=g;break}l=l.NextInAEL}e.Idx=c.Idx};d.Clipper.prototype.ReversePolyPtLinks=function(a){if(null!==a){var b,c;b=a;do c=b.Next,b.Next=b.Prev,b=b.Prev=c;while(b!=a)}};d.Clipper.SwapSides=function(a,b){var c=a.Side;a.Side=b.Side;b.Side=c};d.Clipper.SwapPolyIndexes=function(a,b){var c=a.OutIdx;a.OutIdx=b.OutIdx;b.OutIdx=c};d.Clipper.prototype.IntersectEdges=
function(a,b,c){var e=0<=a.OutIdx,f=0<=b.OutIdx;d.use_xyz&&this.SetZ(c,a,b);if(!d.use_lines||0!==a.WindDelta&&0!==b.WindDelta){if(a.PolyTyp==b.PolyTyp)if(this.IsEvenOddFillType(a)){var g=a.WindCnt;a.WindCnt=b.WindCnt;b.WindCnt=g}else a.WindCnt=0===a.WindCnt+b.WindDelta?-a.WindCnt:a.WindCnt+b.WindDelta,b.WindCnt=0===b.WindCnt-a.WindDelta?-b.WindCnt:b.WindCnt-a.WindDelta;else this.IsEvenOddFillType(b)?a.WindCnt2=0===a.WindCnt2?1:0:a.WindCnt2+=b.WindDelta,this.IsEvenOddFillType(a)?b.WindCnt2=0===b.WindCnt2?
1:0:b.WindCnt2-=a.WindDelta;var h,l,k;a.PolyTyp==d.PolyType.ptSubject?(h=this.m_SubjFillType,k=this.m_ClipFillType):(h=this.m_ClipFillType,k=this.m_SubjFillType);b.PolyTyp==d.PolyType.ptSubject?(l=this.m_SubjFillType,g=this.m_ClipFillType):(l=this.m_ClipFillType,g=this.m_SubjFillType);switch(h){case d.PolyFillType.pftPositive:h=a.WindCnt;break;case d.PolyFillType.pftNegative:h=-a.WindCnt;break;default:h=Math.abs(a.WindCnt)}switch(l){case d.PolyFillType.pftPositive:l=b.WindCnt;break;case d.PolyFillType.pftNegative:l=
-b.WindCnt;break;default:l=Math.abs(b.WindCnt)}if(e&&f)0!=h&&1!=h||0!=l&&1!=l||a.PolyTyp!=b.PolyTyp&&this.m_ClipType!=d.ClipType.ctXor?this.AddLocalMaxPoly(a,b,c):(this.AddOutPt(a,c),this.AddOutPt(b,c),d.Clipper.SwapSides(a,b),d.Clipper.SwapPolyIndexes(a,b));else if(e){if(0===l||1==l)this.AddOutPt(a,c),d.Clipper.SwapSides(a,b),d.Clipper.SwapPolyIndexes(a,b)}else if(f){if(0===h||1==h)this.AddOutPt(b,c),d.Clipper.SwapSides(a,b),d.Clipper.SwapPolyIndexes(a,b)}else if(!(0!=h&&1!=h||0!=l&&1!=l)){switch(k){case d.PolyFillType.pftPositive:e=
a.WindCnt2;break;case d.PolyFillType.pftNegative:e=-a.WindCnt2;break;default:e=Math.abs(a.WindCnt2)}switch(g){case d.PolyFillType.pftPositive:f=b.WindCnt2;break;case d.PolyFillType.pftNegative:f=-b.WindCnt2;break;default:f=Math.abs(b.WindCnt2)}if(a.PolyTyp!=b.PolyTyp)this.AddLocalMinPoly(a,b,c);else if(1==h&&1==l)switch(this.m_ClipType){case d.ClipType.ctIntersection:0<e&&0<f&&this.AddLocalMinPoly(a,b,c);break;case d.ClipType.ctUnion:0>=e&&0>=f&&this.AddLocalMinPoly(a,b,c);break;case d.ClipType.ctDifference:(a.PolyTyp==
d.PolyType.ptClip&&0<e&&0<f||a.PolyTyp==d.PolyType.ptSubject&&0>=e&&0>=f)&&this.AddLocalMinPoly(a,b,c);break;case d.ClipType.ctXor:this.AddLocalMinPoly(a,b,c)}else d.Clipper.SwapSides(a,b)}}else if(0!=a.WindDelta||0!=b.WindDelta)a.PolyTyp==b.PolyTyp&&a.WindDelta!=b.WindDelta&&this.m_ClipType==d.ClipType.ctUnion?0===a.WindDelta?f&&(this.AddOutPt(a,c),e&&(a.OutIdx=-1)):e&&(this.AddOutPt(b,c),f&&(b.OutIdx=-1)):a.PolyTyp!=b.PolyTyp&&(0!==a.WindDelta||1!=Math.abs(b.WindCnt)||this.m_ClipType==d.ClipType.ctUnion&&
0!==b.WindCnt2?0!==b.WindDelta||1!=Math.abs(a.WindCnt)||this.m_ClipType==d.ClipType.ctUnion&&0!==a.WindCnt2||(this.AddOutPt(b,c),f&&(b.OutIdx=-1)):(this.AddOutPt(a,c),e&&(a.OutIdx=-1)))};d.Clipper.prototype.DeleteFromAEL=function(a){var b=a.PrevInAEL,c=a.NextInAEL;if(null!==b||null!==c||a==this.m_ActiveEdges)null!==b?b.NextInAEL=c:this.m_ActiveEdges=c,null!==c&&(c.PrevInAEL=b),a.NextInAEL=null,a.PrevInAEL=null};d.Clipper.prototype.DeleteFromSEL=function(a){var b=a.PrevInSEL,c=a.NextInSEL;if(null!==
b||null!==c||a==this.m_SortedEdges)null!==b?b.NextInSEL=c:this.m_SortedEdges=c,null!==c&&(c.PrevInSEL=b),a.NextInSEL=null,a.PrevInSEL=null};d.Clipper.prototype.UpdateEdgeIntoAEL=function(a){null===a.NextInLML&&d.Error("UpdateEdgeIntoAEL: invalid call");var b=a.PrevInAEL,c=a.NextInAEL;a.NextInLML.OutIdx=a.OutIdx;null!==b?b.NextInAEL=a.NextInLML:this.m_ActiveEdges=a.NextInLML;null!==c&&(c.PrevInAEL=a.NextInLML);a.NextInLML.Side=a.Side;a.NextInLML.WindDelta=a.WindDelta;a.NextInLML.WindCnt=a.WindCnt;
a.NextInLML.WindCnt2=a.WindCnt2;a=a.NextInLML;a.Curr.X=a.Bot.X;a.Curr.Y=a.Bot.Y;d.use_xyz&&(a.Curr.Z=a.Bot.Z);a.PrevInAEL=b;a.NextInAEL=c;d.ClipperBase.IsHorizontal(a)||this.InsertScanbeam(a.Top.Y);return a};d.Clipper.prototype.ProcessHorizontals=function(a){for(var b=this.m_SortedEdges;null!==b;)this.DeleteFromSEL(b),this.ProcessHorizontal(b,a),b=this.m_SortedEdges};d.Clipper.prototype.GetHorzDirection=function(a,b){a.Bot.X<a.Top.X?(b.Left=a.Bot.X,b.Right=a.Top.X,b.Dir=d.Direction.dLeftToRight):
(b.Left=a.Top.X,b.Right=a.Bot.X,b.Dir=d.Direction.dRightToLeft)};d.Clipper.prototype.ProcessHorizontal=function(a,b){var c={Dir:null,Left:null,Right:null};this.GetHorzDirection(a,c);for(var e=c.Dir,f=c.Left,g=c.Right,h=a,l=null;null!==h.NextInLML&&d.ClipperBase.IsHorizontal(h.NextInLML);)h=h.NextInLML;for(null===h.NextInLML&&(l=this.GetMaximaPair(h));;){for(var k=a==h,n=this.GetNextInAEL(a,e);null!==n&&!(n.Curr.X==a.Top.X&&null!==a.NextInLML&&n.Dx<a.NextInLML.Dx);){c=this.GetNextInAEL(n,e);if(e==
d.Direction.dLeftToRight&&n.Curr.X<=g||e==d.Direction.dRightToLeft&&n.Curr.X>=f){if(n==l&&k){if(0<=a.OutIdx){e=this.AddOutPt(a,a.Top);for(c=this.m_SortedEdges;null!==c;)0<=c.OutIdx&&this.HorzSegmentsOverlap(a.Bot.X,a.Top.X,c.Bot.X,c.Top.X)&&(f=this.AddOutPt(c,c.Bot),this.AddJoin(f,e,c.Top)),c=c.NextInSEL;this.AddGhostJoin(e,a.Bot);this.AddLocalMaxPoly(a,l,a.Top)}this.DeleteFromAEL(a);this.DeleteFromAEL(l);return}if(e==d.Direction.dLeftToRight){var p=new d.IntPoint(n.Curr.X,a.Curr.Y);this.IntersectEdges(a,
n,p)}else p=new d.IntPoint(n.Curr.X,a.Curr.Y),this.IntersectEdges(n,a,p);this.SwapPositionsInAEL(a,n)}else if(e==d.Direction.dLeftToRight&&n.Curr.X>=g||e==d.Direction.dRightToLeft&&n.Curr.X<=f)break;n=c}if(null!==a.NextInLML&&d.ClipperBase.IsHorizontal(a.NextInLML))a=this.UpdateEdgeIntoAEL(a),0<=a.OutIdx&&this.AddOutPt(a,a.Bot),c={Dir:e,Left:f,Right:g},this.GetHorzDirection(a,c),e=c.Dir,f=c.Left,g=c.Right;else break}null!==a.NextInLML?0<=a.OutIdx?(e=this.AddOutPt(a,a.Top),b&&this.AddGhostJoin(e,a.Bot),
a=this.UpdateEdgeIntoAEL(a),0!==a.WindDelta&&(l=a.PrevInAEL,c=a.NextInAEL,null!==l&&l.Curr.X==a.Bot.X&&l.Curr.Y==a.Bot.Y&&0!==l.WindDelta&&0<=l.OutIdx&&l.Curr.Y>l.Top.Y&&d.ClipperBase.SlopesEqual(a,l,this.m_UseFullRange)?(f=this.AddOutPt(l,a.Bot),this.AddJoin(e,f,a.Top)):null!==c&&c.Curr.X==a.Bot.X&&c.Curr.Y==a.Bot.Y&&0!==c.WindDelta&&0<=c.OutIdx&&c.Curr.Y>c.Top.Y&&d.ClipperBase.SlopesEqual(a,c,this.m_UseFullRange)&&(f=this.AddOutPt(c,a.Bot),this.AddJoin(e,f,a.Top)))):this.UpdateEdgeIntoAEL(a):(0<=
a.OutIdx&&this.AddOutPt(a,a.Top),this.DeleteFromAEL(a))};d.Clipper.prototype.GetNextInAEL=function(a,b){return b==d.Direction.dLeftToRight?a.NextInAEL:a.PrevInAEL};d.Clipper.prototype.IsMinima=function(a){return null!==a&&a.Prev.NextInLML!=a&&a.Next.NextInLML!=a};d.Clipper.prototype.IsMaxima=function(a,b){return null!==a&&a.Top.Y==b&&null===a.NextInLML};d.Clipper.prototype.IsIntermediate=function(a,b){return a.Top.Y==b&&null!==a.NextInLML};d.Clipper.prototype.GetMaximaPair=function(a){var b=null;
d.IntPoint.op_Equality(a.Next.Top,a.Top)&&null===a.Next.NextInLML?b=a.Next:d.IntPoint.op_Equality(a.Prev.Top,a.Top)&&null===a.Prev.NextInLML&&(b=a.Prev);return null===b||-2!=b.OutIdx&&(b.NextInAEL!=b.PrevInAEL||d.ClipperBase.IsHorizontal(b))?b:null};d.Clipper.prototype.ProcessIntersections=function(a){if(null==this.m_ActiveEdges)return!0;try{this.BuildIntersectList(a);if(0==this.m_IntersectList.length)return!0;if(1==this.m_IntersectList.length||this.FixupIntersectionOrder())this.ProcessIntersectList();
else return!1}catch(b){this.m_SortedEdges=null,this.m_IntersectList.length=0,d.Error("ProcessIntersections error")}this.m_SortedEdges=null;return!0};d.Clipper.prototype.BuildIntersectList=function(a){if(null!==this.m_ActiveEdges){var b=this.m_ActiveEdges;for(this.m_SortedEdges=b;null!==b;)b.PrevInSEL=b.PrevInAEL,b.NextInSEL=b.NextInAEL,b.Curr.X=d.Clipper.TopX(b,a),b=b.NextInAEL;for(var c=!0;c&&null!==this.m_SortedEdges;){c=!1;for(b=this.m_SortedEdges;null!==b.NextInSEL;){a=b.NextInSEL;var e=new d.IntPoint;
b.Curr.X>a.Curr.X?(this.IntersectPoint(b,a,e),c=new d.IntersectNode,c.Edge1=b,c.Edge2=a,c.Pt.X=e.X,c.Pt.Y=e.Y,d.use_xyz&&(c.Pt.Z=e.Z),this.m_IntersectList.push(c),this.SwapPositionsInSEL(b,a),c=!0):b=a}if(null!==b.PrevInSEL)b.PrevInSEL.NextInSEL=null;else break}this.m_SortedEdges=null}};d.Clipper.prototype.EdgesAdjacent=function(a){return a.Edge1.NextInSEL==a.Edge2||a.Edge1.PrevInSEL==a.Edge2};d.Clipper.IntersectNodeSort=function(a,b){return b.Pt.Y-a.Pt.Y};d.Clipper.prototype.FixupIntersectionOrder=
function(){this.m_IntersectList.sort(this.m_IntersectNodeComparer);this.CopyAELToSEL();for(var a=this.m_IntersectList.length,b=0;b<a;b++){if(!this.EdgesAdjacent(this.m_IntersectList[b])){for(var c=b+1;c<a&&!this.EdgesAdjacent(this.m_IntersectList[c]);)c++;if(c==a)return!1;var d=this.m_IntersectList[b];this.m_IntersectList[b]=this.m_IntersectList[c];this.m_IntersectList[c]=d}this.SwapPositionsInSEL(this.m_IntersectList[b].Edge1,this.m_IntersectList[b].Edge2)}return!0};d.Clipper.prototype.ProcessIntersectList=
function(){for(var a=0,b=this.m_IntersectList.length;a<b;a++){var c=this.m_IntersectList[a];this.IntersectEdges(c.Edge1,c.Edge2,c.Pt);this.SwapPositionsInAEL(c.Edge1,c.Edge2)}this.m_IntersectList.length=0};G=function(a){return 0>a?Math.ceil(a-.5):Math.round(a)};H=function(a){return 0>a?Math.ceil(a-.5):Math.floor(a+.5)};I=function(a){return 0>a?-Math.round(Math.abs(a)):Math.round(a)};J=function(a){if(0>a)return a-=.5,-2147483648>a?Math.ceil(a):a|0;a+=.5;return 2147483647<a?Math.floor(a):a|0};d.Clipper.Round=
r?G:F?I:L?J:H;d.Clipper.TopX=function(a,b){return b==a.Top.Y?a.Top.X:a.Bot.X+d.Clipper.Round(a.Dx*(b-a.Bot.Y))};d.Clipper.prototype.IntersectPoint=function(a,b,c){c.X=0;c.Y=0;var e,f;if(a.Dx==b.Dx)c.Y=a.Curr.Y,c.X=d.Clipper.TopX(a,c.Y);else{if(0===a.Delta.X)c.X=a.Bot.X,d.ClipperBase.IsHorizontal(b)?c.Y=b.Bot.Y:(f=b.Bot.Y-b.Bot.X/b.Dx,c.Y=d.Clipper.Round(c.X/b.Dx+f));else if(0===b.Delta.X)c.X=b.Bot.X,d.ClipperBase.IsHorizontal(a)?c.Y=a.Bot.Y:(e=a.Bot.Y-a.Bot.X/a.Dx,c.Y=d.Clipper.Round(c.X/a.Dx+e));
else{e=a.Bot.X-a.Bot.Y*a.Dx;f=b.Bot.X-b.Bot.Y*b.Dx;var g=(f-e)/(a.Dx-b.Dx);c.Y=d.Clipper.Round(g);c.X=Math.abs(a.Dx)<Math.abs(b.Dx)?d.Clipper.Round(a.Dx*g+e):d.Clipper.Round(b.Dx*g+f)}if(c.Y<a.Top.Y||c.Y<b.Top.Y){if(a.Top.Y>b.Top.Y)return c.Y=a.Top.Y,c.X=d.Clipper.TopX(b,a.Top.Y),c.X<a.Top.X;c.Y=b.Top.Y;c.X=Math.abs(a.Dx)<Math.abs(b.Dx)?d.Clipper.TopX(a,c.Y):d.Clipper.TopX(b,c.Y)}c.Y>a.Curr.Y&&(c.Y=a.Curr.Y,c.X=Math.abs(a.Dx)>Math.abs(b.Dx)?d.Clipper.TopX(b,c.Y):d.Clipper.TopX(a,c.Y))}};d.Clipper.prototype.ProcessEdgesAtTopOfScanbeam=
function(a){for(var b=this.m_ActiveEdges;null!==b;){var c=this.IsMaxima(b,a);c&&(c=this.GetMaximaPair(b),c=null===c||!d.ClipperBase.IsHorizontal(c));if(c){var e=b.PrevInAEL;this.DoMaxima(b);b=null===e?this.m_ActiveEdges:e.NextInAEL}else{this.IsIntermediate(b,a)&&d.ClipperBase.IsHorizontal(b.NextInLML)?(b=this.UpdateEdgeIntoAEL(b),0<=b.OutIdx&&this.AddOutPt(b,b.Bot),this.AddEdgeToSEL(b)):(b.Curr.X=d.Clipper.TopX(b,a),b.Curr.Y=a);if(this.StrictlySimple&&(e=b.PrevInAEL,0<=b.OutIdx&&0!==b.WindDelta&&
null!==e&&0<=e.OutIdx&&e.Curr.X==b.Curr.X&&0!==e.WindDelta)){var f=new d.IntPoint(b.Curr);d.use_xyz&&this.SetZ(f,e,b);c=this.AddOutPt(e,f);e=this.AddOutPt(b,f);this.AddJoin(c,e,f)}b=b.NextInAEL}}this.ProcessHorizontals(!0);for(b=this.m_ActiveEdges;null!==b;)this.IsIntermediate(b,a)&&(c=null,0<=b.OutIdx&&(c=this.AddOutPt(b,b.Top)),b=this.UpdateEdgeIntoAEL(b),e=b.PrevInAEL,f=b.NextInAEL,null!==e&&e.Curr.X==b.Bot.X&&e.Curr.Y==b.Bot.Y&&null!==c&&0<=e.OutIdx&&e.Curr.Y>e.Top.Y&&d.ClipperBase.SlopesEqual(b,
e,this.m_UseFullRange)&&0!==b.WindDelta&&0!==e.WindDelta?(e=this.AddOutPt(e,b.Bot),this.AddJoin(c,e,b.Top)):null!==f&&f.Curr.X==b.Bot.X&&f.Curr.Y==b.Bot.Y&&null!==c&&0<=f.OutIdx&&f.Curr.Y>f.Top.Y&&d.ClipperBase.SlopesEqual(b,f,this.m_UseFullRange)&&0!==b.WindDelta&&0!==f.WindDelta&&(e=this.AddOutPt(f,b.Bot),this.AddJoin(c,e,b.Top))),b=b.NextInAEL};d.Clipper.prototype.DoMaxima=function(a){var b=this.GetMaximaPair(a);if(null===b)0<=a.OutIdx&&this.AddOutPt(a,a.Top),this.DeleteFromAEL(a);else{for(var c=
a.NextInAEL;null!==c&&c!=b;)this.IntersectEdges(a,c,a.Top),this.SwapPositionsInAEL(a,c),c=a.NextInAEL;-1==a.OutIdx&&-1==b.OutIdx?(this.DeleteFromAEL(a),this.DeleteFromAEL(b)):0<=a.OutIdx&&0<=b.OutIdx?(0<=a.OutIdx&&this.AddLocalMaxPoly(a,b,a.Top),this.DeleteFromAEL(a),this.DeleteFromAEL(b)):d.use_lines&&0===a.WindDelta?(0<=a.OutIdx&&(this.AddOutPt(a,a.Top),a.OutIdx=-1),this.DeleteFromAEL(a),0<=b.OutIdx&&(this.AddOutPt(b,a.Top),b.OutIdx=-1),this.DeleteFromAEL(b)):d.Error("DoMaxima error")}};d.Clipper.ReversePaths=
function(a){for(var b=0,c=a.length;b<c;b++)a[b].reverse()};d.Clipper.Orientation=function(a){return 0<=d.Clipper.Area(a)};d.Clipper.prototype.PointCount=function(a){if(null===a)return 0;var b=0,c=a;do b++,c=c.Next;while(c!=a);return b};d.Clipper.prototype.BuildResult=function(a){d.Clear(a);for(var b=0,c=this.m_PolyOuts.length;b<c;b++){var e=this.m_PolyOuts[b];if(null!==e.Pts){var e=e.Pts.Prev,f=this.PointCount(e);if(!(2>f)){for(var g=Array(f),h=0;h<f;h++)g[h]=e.Pt,e=e.Prev;a.push(g)}}}};d.Clipper.prototype.BuildResult2=
function(a){a.Clear();for(var b=0,c=this.m_PolyOuts.length;b<c;b++){var e=this.m_PolyOuts[b],f=this.PointCount(e.Pts);if(!(e.IsOpen&&2>f||!e.IsOpen&&3>f)){this.FixHoleLinkage(e);var g=new d.PolyNode;a.m_AllPolys.push(g);e.PolyNode=g;g.m_polygon.length=f;for(var e=e.Pts.Prev,h=0;h<f;h++)g.m_polygon[h]=e.Pt,e=e.Prev}}b=0;for(c=this.m_PolyOuts.length;b<c;b++)e=this.m_PolyOuts[b],null!==e.PolyNode&&(e.IsOpen?(e.PolyNode.IsOpen=!0,a.AddChild(e.PolyNode)):null!==e.FirstLeft&&null!=e.FirstLeft.PolyNode?
e.FirstLeft.PolyNode.AddChild(e.PolyNode):a.AddChild(e.PolyNode))};d.Clipper.prototype.FixupOutPolygon=function(a){var b=null;a.BottomPt=null;for(var c=a.Pts;;){if(c.Prev==c||c.Prev==c.Next){a.Pts=null;return}if(d.IntPoint.op_Equality(c.Pt,c.Next.Pt)||d.IntPoint.op_Equality(c.Pt,c.Prev.Pt)||d.ClipperBase.SlopesEqual(c.Prev.Pt,c.Pt,c.Next.Pt,this.m_UseFullRange)&&(!this.PreserveCollinear||!this.Pt2IsBetweenPt1AndPt3(c.Prev.Pt,c.Pt,c.Next.Pt)))b=null,c.Prev.Next=c.Next,c=c.Next.Prev=c.Prev;else if(c==
b)break;else null===b&&(b=c),c=c.Next}a.Pts=c};d.Clipper.prototype.DupOutPt=function(a,b){var c=new d.OutPt;c.Pt.X=a.Pt.X;c.Pt.Y=a.Pt.Y;d.use_xyz&&(c.Pt.Z=a.Pt.Z);c.Idx=a.Idx;b?(c.Next=a.Next,c.Prev=a,a.Next.Prev=c,a.Next=c):(c.Prev=a.Prev,c.Next=a,a.Prev.Next=c,a.Prev=c);return c};d.Clipper.prototype.GetOverlap=function(a,b,c,d,f){a<b?c<d?(f.Left=Math.max(a,c),f.Right=Math.min(b,d)):(f.Left=Math.max(a,d),f.Right=Math.min(b,c)):c<d?(f.Left=Math.max(b,c),f.Right=Math.min(a,d)):(f.Left=Math.max(b,d),
f.Right=Math.min(a,c));return f.Left<f.Right};d.Clipper.prototype.JoinHorz=function(a,b,c,e,f,g){var h=a.Pt.X>b.Pt.X?d.Direction.dRightToLeft:d.Direction.dLeftToRight;e=c.Pt.X>e.Pt.X?d.Direction.dRightToLeft:d.Direction.dLeftToRight;if(h==e)return!1;if(h==d.Direction.dLeftToRight){for(;a.Next.Pt.X<=f.X&&a.Next.Pt.X>=a.Pt.X&&a.Next.Pt.Y==f.Y;)a=a.Next;g&&a.Pt.X!=f.X&&(a=a.Next);b=this.DupOutPt(a,!g);d.IntPoint.op_Inequality(b.Pt,f)&&(a=b,a.Pt.X=f.X,a.Pt.Y=f.Y,d.use_xyz&&(a.Pt.Z=f.Z),b=this.DupOutPt(a,
!g))}else{for(;a.Next.Pt.X>=f.X&&a.Next.Pt.X<=a.Pt.X&&a.Next.Pt.Y==f.Y;)a=a.Next;g||a.Pt.X==f.X||(a=a.Next);b=this.DupOutPt(a,g);d.IntPoint.op_Inequality(b.Pt,f)&&(a=b,a.Pt.X=f.X,a.Pt.Y=f.Y,d.use_xyz&&(a.Pt.Z=f.Z),b=this.DupOutPt(a,g))}if(e==d.Direction.dLeftToRight){for(;c.Next.Pt.X<=f.X&&c.Next.Pt.X>=c.Pt.X&&c.Next.Pt.Y==f.Y;)c=c.Next;g&&c.Pt.X!=f.X&&(c=c.Next);e=this.DupOutPt(c,!g);d.IntPoint.op_Inequality(e.Pt,f)&&(c=e,c.Pt.X=f.X,c.Pt.Y=f.Y,d.use_xyz&&(c.Pt.Z=f.Z),e=this.DupOutPt(c,!g))}else{for(;c.Next.Pt.X>=
f.X&&c.Next.Pt.X<=c.Pt.X&&c.Next.Pt.Y==f.Y;)c=c.Next;g||c.Pt.X==f.X||(c=c.Next);e=this.DupOutPt(c,g);d.IntPoint.op_Inequality(e.Pt,f)&&(c=e,c.Pt.X=f.X,c.Pt.Y=f.Y,d.use_xyz&&(c.Pt.Z=f.Z),e=this.DupOutPt(c,g))}h==d.Direction.dLeftToRight==g?(a.Prev=c,c.Next=a,b.Next=e,e.Prev=b):(a.Next=c,c.Prev=a,b.Prev=e,e.Next=b);return!0};d.Clipper.prototype.JoinPoints=function(a,b,c){var e=a.OutPt1,f;new d.OutPt;var g=a.OutPt2,h;new d.OutPt;if((h=a.OutPt1.Pt.Y==a.OffPt.Y)&&d.IntPoint.op_Equality(a.OffPt,a.OutPt1.Pt)&&
d.IntPoint.op_Equality(a.OffPt,a.OutPt2.Pt)){if(b!=c)return!1;for(f=a.OutPt1.Next;f!=e&&d.IntPoint.op_Equality(f.Pt,a.OffPt);)f=f.Next;f=f.Pt.Y>a.OffPt.Y;for(h=a.OutPt2.Next;h!=g&&d.IntPoint.op_Equality(h.Pt,a.OffPt);)h=h.Next;if(f==h.Pt.Y>a.OffPt.Y)return!1;f?(f=this.DupOutPt(e,!1),h=this.DupOutPt(g,!0),e.Prev=g,g.Next=e,f.Next=h,h.Prev=f):(f=this.DupOutPt(e,!0),h=this.DupOutPt(g,!1),e.Next=g,g.Prev=e,f.Prev=h,h.Next=f);a.OutPt1=e;a.OutPt2=f;return!0}if(h){for(f=e;e.Prev.Pt.Y==e.Pt.Y&&e.Prev!=f&&
e.Prev!=g;)e=e.Prev;for(;f.Next.Pt.Y==f.Pt.Y&&f.Next!=e&&f.Next!=g;)f=f.Next;if(f.Next==e||f.Next==g)return!1;for(h=g;g.Prev.Pt.Y==g.Pt.Y&&g.Prev!=h&&g.Prev!=f;)g=g.Prev;for(;h.Next.Pt.Y==h.Pt.Y&&h.Next!=g&&h.Next!=e;)h=h.Next;if(h.Next==g||h.Next==e)return!1;c={Left:null,Right:null};if(!this.GetOverlap(e.Pt.X,f.Pt.X,g.Pt.X,h.Pt.X,c))return!1;b=c.Left;var l=c.Right;c=new d.IntPoint;e.Pt.X>=b&&e.Pt.X<=l?(c.X=e.Pt.X,c.Y=e.Pt.Y,d.use_xyz&&(c.Z=e.Pt.Z),b=e.Pt.X>f.Pt.X):g.Pt.X>=b&&g.Pt.X<=l?(c.X=g.Pt.X,
c.Y=g.Pt.Y,d.use_xyz&&(c.Z=g.Pt.Z),b=g.Pt.X>h.Pt.X):f.Pt.X>=b&&f.Pt.X<=l?(c.X=f.Pt.X,c.Y=f.Pt.Y,d.use_xyz&&(c.Z=f.Pt.Z),b=f.Pt.X>e.Pt.X):(c.X=h.Pt.X,c.Y=h.Pt.Y,d.use_xyz&&(c.Z=h.Pt.Z),b=h.Pt.X>g.Pt.X);a.OutPt1=e;a.OutPt2=g;return this.JoinHorz(e,f,g,h,c,b)}for(f=e.Next;d.IntPoint.op_Equality(f.Pt,e.Pt)&&f!=e;)f=f.Next;if(l=f.Pt.Y>e.Pt.Y||!d.ClipperBase.SlopesEqual(e.Pt,f.Pt,a.OffPt,this.m_UseFullRange)){for(f=e.Prev;d.IntPoint.op_Equality(f.Pt,e.Pt)&&f!=e;)f=f.Prev;if(f.Pt.Y>e.Pt.Y||!d.ClipperBase.SlopesEqual(e.Pt,
f.Pt,a.OffPt,this.m_UseFullRange))return!1}for(h=g.Next;d.IntPoint.op_Equality(h.Pt,g.Pt)&&h!=g;)h=h.Next;var k=h.Pt.Y>g.Pt.Y||!d.ClipperBase.SlopesEqual(g.Pt,h.Pt,a.OffPt,this.m_UseFullRange);if(k){for(h=g.Prev;d.IntPoint.op_Equality(h.Pt,g.Pt)&&h!=g;)h=h.Prev;if(h.Pt.Y>g.Pt.Y||!d.ClipperBase.SlopesEqual(g.Pt,h.Pt,a.OffPt,this.m_UseFullRange))return!1}if(f==e||h==g||f==h||b==c&&l==k)return!1;l?(f=this.DupOutPt(e,!1),h=this.DupOutPt(g,!0),e.Prev=g,g.Next=e,f.Next=h,h.Prev=f):(f=this.DupOutPt(e,!0),
h=this.DupOutPt(g,!1),e.Next=g,g.Prev=e,f.Prev=h,h.Next=f);a.OutPt1=e;a.OutPt2=f;return!0};d.Clipper.GetBounds=function(a){for(var b=0,c=a.length;b<c&&0==a[b].length;)b++;if(b==c)return new d.IntRect(0,0,0,0);var e=new d.IntRect;e.left=a[b][0].X;e.right=e.left;e.top=a[b][0].Y;for(e.bottom=e.top;b<c;b++)for(var f=0,g=a[b].length;f<g;f++)a[b][f].X<e.left?e.left=a[b][f].X:a[b][f].X>e.right&&(e.right=a[b][f].X),a[b][f].Y<e.top?e.top=a[b][f].Y:a[b][f].Y>e.bottom&&(e.bottom=a[b][f].Y);return e};d.Clipper.prototype.GetBounds2=
function(a){var b=a,c=new d.IntRect;c.left=a.Pt.X;c.right=a.Pt.X;c.top=a.Pt.Y;c.bottom=a.Pt.Y;for(a=a.Next;a!=b;)a.Pt.X<c.left&&(c.left=a.Pt.X),a.Pt.X>c.right&&(c.right=a.Pt.X),a.Pt.Y<c.top&&(c.top=a.Pt.Y),a.Pt.Y>c.bottom&&(c.bottom=a.Pt.Y),a=a.Next;return c};d.Clipper.PointInPolygon=function(a,b){var c=0,d=b.length;if(3>d)return 0;for(var f=b[0],g=1;g<=d;++g){var h=g==d?b[0]:b[g];if(h.Y==a.Y&&(h.X==a.X||f.Y==a.Y&&h.X>a.X==f.X<a.X))return-1;if(f.Y<a.Y!=h.Y<a.Y)if(f.X>=a.X)if(h.X>a.X)c=1-c;else{var l=
(f.X-a.X)*(h.Y-a.Y)-(h.X-a.X)*(f.Y-a.Y);if(0==l)return-1;0<l==h.Y>f.Y&&(c=1-c)}else if(h.X>a.X){l=(f.X-a.X)*(h.Y-a.Y)-(h.X-a.X)*(f.Y-a.Y);if(0==l)return-1;0<l==h.Y>f.Y&&(c=1-c)}f=h}return c};d.Clipper.prototype.PointInPolygon=function(a,b){var c=0,d=b,f=a.X,g=a.Y,h=b.Pt.X,l=b.Pt.Y;do{b=b.Next;var k=b.Pt.X,n=b.Pt.Y;if(n==g&&(k==f||l==g&&k>f==h<f))return-1;if(l<g!=n<g)if(h>=f)if(k>f)c=1-c;else{h=(h-f)*(n-g)-(k-f)*(l-g);if(0==h)return-1;0<h==n>l&&(c=1-c)}else if(k>f){h=(h-f)*(n-g)-(k-f)*(l-g);if(0==
h)return-1;0<h==n>l&&(c=1-c)}h=k;l=n}while(d!=b);return c};d.Clipper.prototype.Poly2ContainsPoly1=function(a,b){var c=a;do{var d=this.PointInPolygon(c.Pt,b);if(0<=d)return 0<d;c=c.Next}while(c!=a);return!0};d.Clipper.prototype.FixupFirstLefts1=function(a,b){for(var c=0,d=this.m_PolyOuts.length;c<d;c++){var f=this.m_PolyOuts[c];null!=f.Pts&&null!=f.FirstLeft&&this.ParseFirstLeft(f.FirstLeft)==a&&this.Poly2ContainsPoly1(f.Pts,b.Pts)&&(f.FirstLeft=b)}};d.Clipper.prototype.FixupFirstLefts2=function(a,
b){for(var c=0,d=this.m_PolyOuts,f=d.length,g=d[c];c<f;c++,g=d[c])g.FirstLeft==a&&(g.FirstLeft=b)};d.Clipper.ParseFirstLeft=function(a){for(;null!=a&&null==a.Pts;)a=a.FirstLeft;return a};d.Clipper.prototype.JoinCommonEdges=function(){for(var a=0,b=this.m_Joins.length;a<b;a++){var c=this.m_Joins[a],e=this.GetOutRec(c.OutPt1.Idx),f=this.GetOutRec(c.OutPt2.Idx);if(null!=e.Pts&&null!=f.Pts){var g;g=e==f?e:this.Param1RightOfParam2(e,f)?f:this.Param1RightOfParam2(f,e)?e:this.GetLowermostRec(e,f);if(this.JoinPoints(c,
e,f))if(e==f){e.Pts=c.OutPt1;e.BottomPt=null;f=this.CreateOutRec();f.Pts=c.OutPt2;this.UpdateOutPtIdxs(f);if(this.m_UsingPolyTree){g=0;for(var h=this.m_PolyOuts.length;g<h-1;g++){var l=this.m_PolyOuts[g];null!=l.Pts&&d.Clipper.ParseFirstLeft(l.FirstLeft)==e&&l.IsHole!=e.IsHole&&this.Poly2ContainsPoly1(l.Pts,c.OutPt2)&&(l.FirstLeft=f)}}this.Poly2ContainsPoly1(f.Pts,e.Pts)?(f.IsHole=!e.IsHole,f.FirstLeft=e,this.m_UsingPolyTree&&this.FixupFirstLefts2(f,e),(f.IsHole^this.ReverseSolution)==0<this.Area(f)&&
this.ReversePolyPtLinks(f.Pts)):this.Poly2ContainsPoly1(e.Pts,f.Pts)?(f.IsHole=e.IsHole,e.IsHole=!f.IsHole,f.FirstLeft=e.FirstLeft,e.FirstLeft=f,this.m_UsingPolyTree&&this.FixupFirstLefts2(e,f),(e.IsHole^this.ReverseSolution)==0<this.Area(e)&&this.ReversePolyPtLinks(e.Pts)):(f.IsHole=e.IsHole,f.FirstLeft=e.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(e,f))}else f.Pts=null,f.BottomPt=null,f.Idx=e.Idx,e.IsHole=g.IsHole,g==f&&(e.FirstLeft=f.FirstLeft),f.FirstLeft=e,this.m_UsingPolyTree&&this.FixupFirstLefts2(f,
e)}}};d.Clipper.prototype.UpdateOutPtIdxs=function(a){var b=a.Pts;do b.Idx=a.Idx,b=b.Prev;while(b!=a.Pts)};d.Clipper.prototype.DoSimplePolygons=function(){for(var a=0;a<this.m_PolyOuts.length;){var b=this.m_PolyOuts[a++],c=b.Pts;if(null!=c&&!b.IsOpen){do{for(var e=c.Next;e!=b.Pts;){if(d.IntPoint.op_Equality(c.Pt,e.Pt)&&e.Next!=c&&e.Prev!=c){var f=c.Prev,g=e.Prev;c.Prev=g;g.Next=c;e.Prev=f;f.Next=e;b.Pts=c;f=this.CreateOutRec();f.Pts=e;this.UpdateOutPtIdxs(f);this.Poly2ContainsPoly1(f.Pts,b.Pts)?(f.IsHole=
!b.IsHole,f.FirstLeft=b,this.m_UsingPolyTree&&this.FixupFirstLefts2(f,b)):this.Poly2ContainsPoly1(b.Pts,f.Pts)?(f.IsHole=b.IsHole,b.IsHole=!f.IsHole,f.FirstLeft=b.FirstLeft,b.FirstLeft=f,this.m_UsingPolyTree&&this.FixupFirstLefts2(b,f)):(f.IsHole=b.IsHole,f.FirstLeft=b.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(b,f));e=c}e=e.Next}c=c.Next}while(c!=b.Pts)}}};d.Clipper.Area=function(a){var b=a.length;if(3>b)return 0;for(var c=0,d=0,f=b-1;d<b;++d)c+=(a[f].X+a[d].X)*(a[f].Y-a[d].Y),f=d;return.5*
-c};d.Clipper.prototype.Area=function(a){var b=a.Pts;if(null==b)return 0;var c=0;do c+=(b.Prev.Pt.X+b.Pt.X)*(b.Prev.Pt.Y-b.Pt.Y),b=b.Next;while(b!=a.Pts);return.5*c};d.Clipper.SimplifyPolygon=function(a,b){var c=[],e=new d.Clipper(0);e.StrictlySimple=!0;e.AddPath(a,d.PolyType.ptSubject,!0);e.Execute(d.ClipType.ctUnion,c,b,b);return c};d.Clipper.SimplifyPolygons=function(a,b){"undefined"==typeof b&&(b=d.PolyFillType.pftEvenOdd);var c=[],e=new d.Clipper(0);e.StrictlySimple=!0;e.AddPaths(a,d.PolyType.ptSubject,
!0);e.Execute(d.ClipType.ctUnion,c,b,b);return c};d.Clipper.DistanceSqrd=function(a,b){var c=a.X-b.X,d=a.Y-b.Y;return c*c+d*d};d.Clipper.DistanceFromLineSqrd=function(a,b,c){var d=b.Y-c.Y;c=c.X-b.X;b=d*b.X+c*b.Y;b=d*a.X+c*a.Y-b;return b*b/(d*d+c*c)};d.Clipper.SlopesNearCollinear=function(a,b,c,e){return Math.abs(a.X-b.X)>Math.abs(a.Y-b.Y)?a.X>b.X==a.X<c.X?d.Clipper.DistanceFromLineSqrd(a,b,c)<e:b.X>a.X==b.X<c.X?d.Clipper.DistanceFromLineSqrd(b,a,c)<e:d.Clipper.DistanceFromLineSqrd(c,a,b)<e:a.Y>b.Y==
a.Y<c.Y?d.Clipper.DistanceFromLineSqrd(a,b,c)<e:b.Y>a.Y==b.Y<c.Y?d.Clipper.DistanceFromLineSqrd(b,a,c)<e:d.Clipper.DistanceFromLineSqrd(c,a,b)<e};d.Clipper.PointsAreClose=function(a,b,c){var d=a.X-b.X;a=a.Y-b.Y;return d*d+a*a<=c};d.Clipper.ExcludeOp=function(a){var b=a.Prev;b.Next=a.Next;a.Next.Prev=b;b.Idx=0;return b};d.Clipper.CleanPolygon=function(a,b){"undefined"==typeof b&&(b=1.415);var c=a.length;if(0==c)return[];for(var e=Array(c),f=0;f<c;++f)e[f]=new d.OutPt;for(f=0;f<c;++f)e[f].Pt=a[f],e[f].Next=
e[(f+1)%c],e[f].Next.Prev=e[f],e[f].Idx=0;f=b*b;for(e=e[0];0==e.Idx&&e.Next!=e.Prev;)d.Clipper.PointsAreClose(e.Pt,e.Prev.Pt,f)?(e=d.Clipper.ExcludeOp(e),c--):d.Clipper.PointsAreClose(e.Prev.Pt,e.Next.Pt,f)?(d.Clipper.ExcludeOp(e.Next),e=d.Clipper.ExcludeOp(e),c-=2):d.Clipper.SlopesNearCollinear(e.Prev.Pt,e.Pt,e.Next.Pt,f)?(e=d.Clipper.ExcludeOp(e),c--):(e.Idx=1,e=e.Next);3>c&&(c=0);for(var g=Array(c),f=0;f<c;++f)g[f]=new d.IntPoint(e.Pt),e=e.Next;return g};d.Clipper.CleanPolygons=function(a,b){for(var c=
Array(a.length),e=0,f=a.length;e<f;e++)c[e]=d.Clipper.CleanPolygon(a[e],b);return c};d.Clipper.Minkowski=function(a,b,c,e){e=e?1:0;var f=a.length,g=b.length,h=[];if(c)for(c=0;c<g;c++){for(var l=Array(f),k=0,n=a.length,p=a[k];k<n;k++,p=a[k])l[k]=new d.IntPoint(b[c].X+p.X,b[c].Y+p.Y);h.push(l)}else for(c=0;c<g;c++){l=Array(f);k=0;n=a.length;for(p=a[k];k<n;k++,p=a[k])l[k]=new d.IntPoint(b[c].X-p.X,b[c].Y-p.Y);h.push(l)}a=[];for(c=0;c<g-1+e;c++)for(k=0;k<f;k++)b=[],b.push(h[c%g][k%f]),b.push(h[(c+1)%
g][k%f]),b.push(h[(c+1)%g][(k+1)%f]),b.push(h[c%g][(k+1)%f]),d.Clipper.Orientation(b)||b.reverse(),a.push(b);return a};d.Clipper.MinkowskiSum=function(a,b,c){if(b[0]instanceof Array){h=b;b=new d.Paths;for(var e=new d.Clipper,f=0;f<h.length;++f){var g=d.Clipper.Minkowski(a,h[f],!0,c);e.AddPaths(g,d.PolyType.ptSubject,!0);c&&(g=d.Clipper.TranslatePath(h[f],a[0]),e.AddPath(g,d.PolyType.ptClip,!0))}e.Execute(d.ClipType.ctUnion,b,d.PolyFillType.pftNonZero,d.PolyFillType.pftNonZero);return b}var h=d.Clipper.Minkowski(a,
b,!0,c),e=new d.Clipper;e.AddPaths(h,d.PolyType.ptSubject,!0);e.Execute(d.ClipType.ctUnion,h,d.PolyFillType.pftNonZero,d.PolyFillType.pftNonZero);return h};d.Clipper.TranslatePath=function(a,b){for(var c=new d.Path,e=0;e<a.length;e++)c.push(new d.IntPoint(a[e].X+b.X,a[e].Y+b.Y));return c};d.Clipper.MinkowskiDiff=function(a,b){var c=d.Clipper.Minkowski(a,b,!1,!0),e=new d.Clipper;e.AddPaths(c,d.PolyType.ptSubject,!0);e.Execute(d.ClipType.ctUnion,c,d.PolyFillType.pftNonZero,d.PolyFillType.pftNonZero);
return c};d.Clipper.PolyTreeToPaths=function(a){var b=[];d.Clipper.AddPolyNodeToPaths(a,d.Clipper.NodeType.ntAny,b);return b};d.Clipper.AddPolyNodeToPaths=function(a,b,c){var e=!0;switch(b){case d.Clipper.NodeType.ntOpen:return;case d.Clipper.NodeType.ntClosed:e=!a.IsOpen}0<a.m_polygon.length&&e&&c.push(a.m_polygon);e=0;a=a.Childs();for(var f=a.length,g=a[e];e<f;e++,g=a[e])d.Clipper.AddPolyNodeToPaths(g,b,c)};d.Clipper.OpenPathsFromPolyTree=function(a){for(var b=new d.Paths,c=0,e=a.ChildCount();c<
e;c++)a.Childs()[c].IsOpen&&b.push(a.Childs()[c].m_polygon);return b};d.Clipper.ClosedPathsFromPolyTree=function(a){var b=new d.Paths;d.Clipper.AddPolyNodeToPaths(a,d.Clipper.NodeType.ntClosed,b);return b};q(d.Clipper,d.ClipperBase);d.Clipper.NodeType={ntAny:0,ntOpen:1,ntClosed:2};d.ClipperOffset=function(a,b){"undefined"==typeof a&&(a=2);"undefined"==typeof b&&(b=d.ClipperOffset.def_arc_tolerance);this.m_destPolys=new d.Paths;this.m_srcPoly=new d.Path;this.m_destPoly=new d.Path;this.m_normals=[];
this.m_StepsPerRad=this.m_miterLim=this.m_cos=this.m_sin=this.m_sinA=this.m_delta=0;this.m_lowest=new d.IntPoint;this.m_polyNodes=new d.PolyNode;this.MiterLimit=a;this.ArcTolerance=b;this.m_lowest.X=-1};d.ClipperOffset.two_pi=6.28318530717959;d.ClipperOffset.def_arc_tolerance=.25;d.ClipperOffset.prototype.Clear=function(){d.Clear(this.m_polyNodes.Childs());this.m_lowest.X=-1};d.ClipperOffset.Round=d.Clipper.Round;d.ClipperOffset.prototype.AddPath=function(a,b,c){var e=a.length-1;if(!(0>e)){var f=
new d.PolyNode;f.m_jointype=b;f.m_endtype=c;if(c==d.EndType.etClosedLine||c==d.EndType.etClosedPolygon)for(;0<e&&d.IntPoint.op_Equality(a[0],a[e]);)e--;f.m_polygon.push(a[0]);var g=0;b=0;for(var h=1;h<=e;h++)d.IntPoint.op_Inequality(f.m_polygon[g],a[h])&&(g++,f.m_polygon.push(a[h]),a[h].Y>f.m_polygon[b].Y||a[h].Y==f.m_polygon[b].Y&&a[h].X<f.m_polygon[b].X)&&(b=g);if(!(c==d.EndType.etClosedPolygon&&2>g)&&(this.m_polyNodes.AddChild(f),c==d.EndType.etClosedPolygon))if(0>this.m_lowest.X)this.m_lowest=
new d.IntPoint(this.m_polyNodes.ChildCount()-1,b);else if(a=this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y],f.m_polygon[b].Y>a.Y||f.m_polygon[b].Y==a.Y&&f.m_polygon[b].X<a.X)this.m_lowest=new d.IntPoint(this.m_polyNodes.ChildCount()-1,b)}};d.ClipperOffset.prototype.AddPaths=function(a,b,c){for(var d=0,f=a.length;d<f;d++)this.AddPath(a[d],b,c)};d.ClipperOffset.prototype.FixOrientations=function(){if(0<=this.m_lowest.X&&!d.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))for(var a=
0;a<this.m_polyNodes.ChildCount();a++){var b=this.m_polyNodes.Childs()[a];(b.m_endtype==d.EndType.etClosedPolygon||b.m_endtype==d.EndType.etClosedLine&&d.Clipper.Orientation(b.m_polygon))&&b.m_polygon.reverse()}else for(a=0;a<this.m_polyNodes.ChildCount();a++)b=this.m_polyNodes.Childs()[a],b.m_endtype!=d.EndType.etClosedLine||d.Clipper.Orientation(b.m_polygon)||b.m_polygon.reverse()};d.ClipperOffset.GetUnitNormal=function(a,b){var c=b.X-a.X,e=b.Y-a.Y;if(0==c&&0==e)return new d.DoublePoint(0,0);var f=
1/Math.sqrt(c*c+e*e);return new d.DoublePoint(e*f,-(c*f))};d.ClipperOffset.prototype.DoOffset=function(a){this.m_destPolys=[];this.m_delta=a;if(d.ClipperBase.near_zero(a))for(var b=0;b<this.m_polyNodes.ChildCount();b++){var c=this.m_polyNodes.Childs()[b];c.m_endtype==d.EndType.etClosedPolygon&&this.m_destPolys.push(c.m_polygon)}else{this.m_miterLim=2<this.MiterLimit?2/(this.MiterLimit*this.MiterLimit):.5;var e=3.14159265358979/Math.acos(1-(0>=this.ArcTolerance?d.ClipperOffset.def_arc_tolerance:this.ArcTolerance>
Math.abs(a)*d.ClipperOffset.def_arc_tolerance?Math.abs(a)*d.ClipperOffset.def_arc_tolerance:this.ArcTolerance)/Math.abs(a));this.m_sin=Math.sin(d.ClipperOffset.two_pi/e);this.m_cos=Math.cos(d.ClipperOffset.two_pi/e);this.m_StepsPerRad=e/d.ClipperOffset.two_pi;0>a&&(this.m_sin=-this.m_sin);for(b=0;b<this.m_polyNodes.ChildCount();b++){c=this.m_polyNodes.Childs()[b];this.m_srcPoly=c.m_polygon;var f=this.m_srcPoly.length;if(!(0==f||0>=a&&(3>f||c.m_endtype!=d.EndType.etClosedPolygon))){this.m_destPoly=
[];if(1==f)if(c.m_jointype==d.JoinType.jtRound)for(var c=1,f=0,g=1;g<=e;g++){this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[0].X+c*a),d.ClipperOffset.Round(this.m_srcPoly[0].Y+f*a)));var h=c,c=c*this.m_cos-this.m_sin*f,f=h*this.m_sin+f*this.m_cos}else for(f=c=-1,g=0;4>g;++g)this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[0].X+c*a),d.ClipperOffset.Round(this.m_srcPoly[0].Y+f*a))),0>c?c=1:0>f?f=1:c=-1;else{for(g=this.m_normals.length=0;g<f-1;g++)this.m_normals.push(d.ClipperOffset.GetUnitNormal(this.m_srcPoly[g],
this.m_srcPoly[g+1]));c.m_endtype==d.EndType.etClosedLine||c.m_endtype==d.EndType.etClosedPolygon?this.m_normals.push(d.ClipperOffset.GetUnitNormal(this.m_srcPoly[f-1],this.m_srcPoly[0])):this.m_normals.push(new d.DoublePoint(this.m_normals[f-2]));if(c.m_endtype==d.EndType.etClosedPolygon)for(h=f-1,g=0;g<f;g++)h=this.OffsetPoint(g,h,c.m_jointype);else if(c.m_endtype==d.EndType.etClosedLine){h=f-1;for(g=0;g<f;g++)h=this.OffsetPoint(g,h,c.m_jointype);this.m_destPolys.push(this.m_destPoly);this.m_destPoly=
[];h=this.m_normals[f-1];for(g=f-1;0<g;g--)this.m_normals[g]=new d.DoublePoint(-this.m_normals[g-1].X,-this.m_normals[g-1].Y);this.m_normals[0]=new d.DoublePoint(-h.X,-h.Y);h=0;for(g=f-1;0<=g;g--)h=this.OffsetPoint(g,h,c.m_jointype)}else{h=0;for(g=1;g<f-1;++g)h=this.OffsetPoint(g,h,c.m_jointype);c.m_endtype==d.EndType.etOpenButt?(g=f-1,h=new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[g].X+this.m_normals[g].X*a),d.ClipperOffset.Round(this.m_srcPoly[g].Y+this.m_normals[g].Y*a)),this.m_destPoly.push(h),
h=new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[g].X-this.m_normals[g].X*a),d.ClipperOffset.Round(this.m_srcPoly[g].Y-this.m_normals[g].Y*a)),this.m_destPoly.push(h)):(g=f-1,h=f-2,this.m_sinA=0,this.m_normals[g]=new d.DoublePoint(-this.m_normals[g].X,-this.m_normals[g].Y),c.m_endtype==d.EndType.etOpenSquare?this.DoSquare(g,h):this.DoRound(g,h));for(g=f-1;0<g;g--)this.m_normals[g]=new d.DoublePoint(-this.m_normals[g-1].X,-this.m_normals[g-1].Y);this.m_normals[0]=new d.DoublePoint(-this.m_normals[1].X,
-this.m_normals[1].Y);h=f-1;for(g=h-1;0<g;--g)h=this.OffsetPoint(g,h,c.m_jointype);c.m_endtype==d.EndType.etOpenButt?(h=new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[0].X-this.m_normals[0].X*a),d.ClipperOffset.Round(this.m_srcPoly[0].Y-this.m_normals[0].Y*a)),this.m_destPoly.push(h),h=new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[0].X+this.m_normals[0].X*a),d.ClipperOffset.Round(this.m_srcPoly[0].Y+this.m_normals[0].Y*a)),this.m_destPoly.push(h)):(this.m_sinA=0,c.m_endtype==d.EndType.etOpenSquare?
this.DoSquare(0,1):this.DoRound(0,1))}}this.m_destPolys.push(this.m_destPoly)}}}};d.ClipperOffset.prototype.Execute=function(){var a=arguments;if(a[0]instanceof d.PolyTree)if(b=a[0],c=a[1],b.Clear(),this.FixOrientations(),this.DoOffset(c),a=new d.Clipper(0),a.AddPaths(this.m_destPolys,d.PolyType.ptSubject,!0),0<c)a.Execute(d.ClipType.ctUnion,b,d.PolyFillType.pftPositive,d.PolyFillType.pftPositive);else if(c=d.Clipper.GetBounds(this.m_destPolys),e=new d.Path,e.push(new d.IntPoint(c.left-10,c.bottom+
10)),e.push(new d.IntPoint(c.right+10,c.bottom+10)),e.push(new d.IntPoint(c.right+10,c.top-10)),e.push(new d.IntPoint(c.left-10,c.top-10)),a.AddPath(e,d.PolyType.ptSubject,!0),a.ReverseSolution=!0,a.Execute(d.ClipType.ctUnion,b,d.PolyFillType.pftNegative,d.PolyFillType.pftNegative),1==b.ChildCount()&&0<b.Childs()[0].ChildCount())for(a=b.Childs()[0],b.Childs()[0]=a.Childs()[0],b.Childs()[0].m_Parent=b,c=1;c<a.ChildCount();c++)b.AddChild(a.Childs()[c]);else b.Clear();else{var b=a[0],c=a[1];d.Clear(b);
this.FixOrientations();this.DoOffset(c);a=new d.Clipper(0);a.AddPaths(this.m_destPolys,d.PolyType.ptSubject,!0);if(0<c)a.Execute(d.ClipType.ctUnion,b,d.PolyFillType.pftPositive,d.PolyFillType.pftPositive);else{var c=d.Clipper.GetBounds(this.m_destPolys),e=new d.Path;e.push(new d.IntPoint(c.left-10,c.bottom+10));e.push(new d.IntPoint(c.right+10,c.bottom+10));e.push(new d.IntPoint(c.right+10,c.top-10));e.push(new d.IntPoint(c.left-10,c.top-10));a.AddPath(e,d.PolyType.ptSubject,!0);a.ReverseSolution=
!0;a.Execute(d.ClipType.ctUnion,b,d.PolyFillType.pftNegative,d.PolyFillType.pftNegative);0<b.length&&b.splice(0,1)}}};d.ClipperOffset.prototype.OffsetPoint=function(a,b,c){this.m_sinA=this.m_normals[b].X*this.m_normals[a].Y-this.m_normals[a].X*this.m_normals[b].Y;if(1>Math.abs(this.m_sinA*this.m_delta)){if(0<this.m_normals[b].X*this.m_normals[a].X+this.m_normals[a].Y*this.m_normals[b].Y)return this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_normals[b].X*this.m_delta),
d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_normals[b].Y*this.m_delta))),b}else 1<this.m_sinA?this.m_sinA=1:-1>this.m_sinA&&(this.m_sinA=-1);if(0>this.m_sinA*this.m_delta)this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_normals[b].X*this.m_delta),d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_normals[b].Y*this.m_delta))),this.m_destPoly.push(new d.IntPoint(this.m_srcPoly[a])),this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_normals[a].X*
this.m_delta),d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_normals[a].Y*this.m_delta)));else switch(c){case d.JoinType.jtMiter:c=1+(this.m_normals[a].X*this.m_normals[b].X+this.m_normals[a].Y*this.m_normals[b].Y);c>=this.m_miterLim?this.DoMiter(a,b,c):this.DoSquare(a,b);break;case d.JoinType.jtSquare:this.DoSquare(a,b);break;case d.JoinType.jtRound:this.DoRound(a,b)}return a};d.ClipperOffset.prototype.DoSquare=function(a,b){var c=Math.tan(Math.atan2(this.m_sinA,this.m_normals[b].X*this.m_normals[a].X+
this.m_normals[b].Y*this.m_normals[a].Y)/4);this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_delta*(this.m_normals[b].X-this.m_normals[b].Y*c)),d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_delta*(this.m_normals[b].Y+this.m_normals[b].X*c))));this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_delta*(this.m_normals[a].X+this.m_normals[a].Y*c)),d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_delta*(this.m_normals[a].Y-this.m_normals[a].X*
c))))};d.ClipperOffset.prototype.DoMiter=function(a,b,c){c=this.m_delta/c;this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+(this.m_normals[b].X+this.m_normals[a].X)*c),d.ClipperOffset.Round(this.m_srcPoly[a].Y+(this.m_normals[b].Y+this.m_normals[a].Y)*c)))};d.ClipperOffset.prototype.DoRound=function(a,b){for(var c=Math.max(d.Cast_Int32(d.ClipperOffset.Round(this.m_StepsPerRad*Math.abs(Math.atan2(this.m_sinA,this.m_normals[b].X*this.m_normals[a].X+this.m_normals[b].Y*this.m_normals[a].Y)))),
1),e=this.m_normals[b].X,f=this.m_normals[b].Y,g,h=0;h<c;++h)this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+e*this.m_delta),d.ClipperOffset.Round(this.m_srcPoly[a].Y+f*this.m_delta))),g=e,e=e*this.m_cos-this.m_sin*f,f=g*this.m_sin+f*this.m_cos;this.m_destPoly.push(new d.IntPoint(d.ClipperOffset.Round(this.m_srcPoly[a].X+this.m_normals[a].X*this.m_delta),d.ClipperOffset.Round(this.m_srcPoly[a].Y+this.m_normals[a].Y*this.m_delta)))};d.Error=function(a){try{throw Error(a);
}catch(b){alert(b.message)}};d.JS={};d.JS.AreaOfPolygon=function(a,b){b||(b=1);return d.Clipper.Area(a)/(b*b)};d.JS.AreaOfPolygons=function(a,b){b||(b=1);for(var c=0,e=0;e<a.length;e++)c+=d.Clipper.Area(a[e]);return c/(b*b)};d.JS.BoundsOfPath=function(a,b){return d.JS.BoundsOfPaths([a],b)};d.JS.BoundsOfPaths=function(a,b){b||(b=1);var c=d.Clipper.GetBounds(a);c.left/=b;c.bottom/=b;c.right/=b;c.top/=b;return c};d.JS.Clean=function(a,b){if(!(a instanceof Array))return[];var c=a[0]instanceof Array;a=
d.JS.Clone(a);if("number"!=typeof b||null===b)return d.Error("Delta is not a number in Clean()."),a;if(0===a.length||1==a.length&&0===a[0].length||0>b)return a;c||(a=[a]);for(var e=a.length,f,g,h,k,v,n,p,m=[],q=0;q<e;q++)if(g=a[q],f=g.length,0!==f)if(3>f)h=g,m.push(h);else{h=g;k=b*b;v=g[0];for(p=n=1;p<f;p++)(g[p].X-v.X)*(g[p].X-v.X)+(g[p].Y-v.Y)*(g[p].Y-v.Y)<=k||(h[n]=g[p],v=g[p],n++);v=g[n-1];(g[0].X-v.X)*(g[0].X-v.X)+(g[0].Y-v.Y)*(g[0].Y-v.Y)<=k&&n--;n<f&&h.splice(n,f-n);h.length&&m.push(h)}!c&&
m.length?m=m[0]:c||0!==m.length?c&&0===m.length&&(m=[[]]):m=[];return m};d.JS.Clone=function(a){if(!(a instanceof Array)||0===a.length)return[];if(1==a.length&&0===a[0].length)return[[]];var b=a[0]instanceof Array;b||(a=[a]);var c=a.length,d,f,g,h,k=Array(c);for(f=0;f<c;f++){d=a[f].length;h=Array(d);for(g=0;g<d;g++)h[g]={X:a[f][g].X,Y:a[f][g].Y};k[f]=h}b||(k=k[0]);return k};d.JS.Lighten=function(a,b){if(!(a instanceof Array))return[];if("number"!=typeof b||null===b)return d.Error("Tolerance is not a number in Lighten()."),
d.JS.Clone(a);if(0===a.length||1==a.length&&0===a[0].length||0>b)return d.JS.Clone(a);a[0]instanceof Array||(a=[a]);var c,e,f,g,h,k,m,n,p,q,r,t,u,w,x,A=a.length,B=b*b,z=[];for(c=0;c<A;c++)if(f=a[c],k=f.length,0!=k){for(g=0;1E6>g;g++){h=[];k=f.length;f[k-1].X!=f[0].X||f[k-1].Y!=f[0].Y?(r=1,f.push({X:f[0].X,Y:f[0].Y}),k=f.length):r=0;q=[];for(e=0;e<k-2;e++){m=f[e];p=f[e+1];n=f[e+2];w=m.X;x=m.Y;m=n.X-w;t=n.Y-x;if(0!==m||0!==t)u=((p.X-w)*m+(p.Y-x)*t)/(m*m+t*t),1<u?(w=n.X,x=n.Y):0<u&&(w+=m*u,x+=t*u);m=
p.X-w;t=p.Y-x;n=m*m+t*t;n<=B&&(q[e+1]=1,e++)}h.push({X:f[0].X,Y:f[0].Y});for(e=1;e<k-1;e++)q[e]||h.push({X:f[e].X,Y:f[e].Y});h.push({X:f[k-1].X,Y:f[k-1].Y});r&&f.pop();if(q.length)f=h;else break}k=h.length;h[k-1].X==h[0].X&&h[k-1].Y==h[0].Y&&h.pop();2<h.length&&z.push(h)}a[0]instanceof Array||(z=z[0]);"undefined"==typeof z&&(z=[[]]);return z};d.JS.PerimeterOfPath=function(a,b,c){if("undefined"==typeof a)return 0;var d=Math.sqrt,f=0,g,h,k,m,n=a.length;if(2>n)return 0;b&&(a[n]=a[0],n++);for(;--n;)g=
a[n],k=g.X,g=g.Y,h=a[n-1],m=h.X,h=h.Y,f+=d((k-m)*(k-m)+(g-h)*(g-h));b&&a.pop();return f/c};d.JS.PerimeterOfPaths=function(a,b,c){c||(c=1);for(var e=0,f=0;f<a.length;f++)e+=d.JS.PerimeterOfPath(a[f],b,c);return e};d.JS.ScaleDownPath=function(a,b){var c,d;b||(b=1);for(c=a.length;c--;)d=a[c],d.X/=b,d.Y/=b};d.JS.ScaleDownPaths=function(a,b){var c,d,f;b||(b=1);for(c=a.length;c--;)for(d=a[c].length;d--;)f=a[c][d],f.X/=b,f.Y/=b};d.JS.ScaleUpPath=function(a,b){var c,d,f=Math.round;b||(b=1);for(c=a.length;c--;)d=
a[c],d.X=f(d.X*b),d.Y=f(d.Y*b)};d.JS.ScaleUpPaths=function(a,b){var c,d,f,g=Math.round;b||(b=1);for(c=a.length;c--;)for(d=a[c].length;d--;)f=a[c][d],f.X=g(f.X*b),f.Y=g(f.Y*b)};d.ExPolygons=function(){return[]};d.ExPolygon=function(){this.holes=this.outer=null};d.JS.AddOuterPolyNodeToExPolygons=function(a,b){var c=new d.ExPolygon;c.outer=a.Contour();var e=a.Childs(),f=e.length;c.holes=Array(f);var g,h,k,m,n;for(h=0;h<f;h++)for(g=e[h],c.holes[h]=g.Contour(),k=0,m=g.Childs(),n=m.length;k<n;k++)g=m[k],
d.JS.AddOuterPolyNodeToExPolygons(g,b);b.push(c)};d.JS.ExPolygonsToPaths=function(a){var b,c,e,f,g=new d.Paths;b=0;for(e=a.length;b<e;b++)for(g.push(a[b].outer),c=0,f=a[b].holes.length;c<f;c++)g.push(a[b].holes[c]);return g};d.JS.PolyTreeToExPolygons=function(a){var b=new d.ExPolygons,c,e,f;c=0;e=a.Childs();for(f=e.length;c<f;c++)a=e[c],d.JS.AddOuterPolyNodeToExPolygons(a,b);return b}})();
var CindyJS = (function() {
            "use strict";

            var debugStartup = false;

            var waitCount = -1;

            var toStart = [];

            // waitFor returns a callback which will decrement the waitCount
            function waitFor(name) {
                if (waitCount === 0) {
                    console.error("Waiting for " + name + " after we finished waiting.");
                    return function() {};
                }
                if (waitCount < 0)
                    waitCount = 0;
                if (debugStartup)
                    console.log("Start waiting for " + name);
                ++waitCount;
                return function() {
                    if (debugStartup)
                        console.log("Done waiting for " + name);
                    --waitCount;
                    if (waitCount < 0) {
                        console.error("Wait count mismatch: " + name);
                    }
                    if (waitCount === 0) {
                        var i = 0,
                            n = toStart.length;
                        if (debugStartup)
                            console.log("Done waiting, starting " + n + " instances:");
                        while (i < n)
                            toStart[i++].startup();
                    }
                };
            }

            if (typeof document !== "undefined" && typeof window !== "undefined" &&
                typeof document.addEventListener !== "undefined" &&
                (typeof window.cindyDontWait === "undefined" ||
                    window.cindyDontWait !== true)) {
                document.addEventListener("DOMContentLoaded", waitFor("DOMContentLoaded"));
            }

            function CindyJS(data) {
                var instance = CindyJS.newInstance(data);
                if (waitCount <= 0) instance.startup();
                else if (data.autostart !== false) toStart.push(instance);
                return instance;
            }

            var baseDir = null;
            var cindyJsScriptElement = null;
            var waitingForLoad = {};

            CindyJS.getBaseDir = function() {
                if (baseDir !== null)
                    return baseDir;
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; ++i) {
                    var script = scripts[i];
                    var src = script.src;
                    if (!src) continue;
                    var match = /Cindy\.js$/.exec(src);
                    if (match) {
                        baseDir = src.substr(0, match.index);
                        console.log("Will load extensions from " + baseDir);
                        cindyJsScriptElement = script;
                        return baseDir;
                    }
                }
                console.error("Could not find <script> tag for Cindy.js");
                baseDir = cindyJsScriptElement = false;
                return baseDir;
            };

            CindyJS.addNewScript = function(path, onerror) {
                if (!onerror) onerror = console.error.bind(console);
                var baseDir = CindyJS.getBaseDir();
                if (baseDir === false) {
                    return false;
                }
                var elt = document.createElement("script");
                elt.src = baseDir + path;
                var next = cindyJsScriptElement.nextSibling;
                var parent = cindyJsScriptElement.parentElement;
                if (next)
                    parent.insertBefore(elt, next);
                else
                    parent.appendChild(elt);
                return elt;
            };

            CindyJS.loadScript = function(name, path, onload, onerror) {
                if (window[name]) {
                    onload();
                    return true;
                }
                if (!onerror) onerror = console.error.bind(console);
                var elt = waitingForLoad[name];
                if (!elt) {
                    elt = CindyJS.addNewScript(path, onerror);
                    if (elt === false) {
                        onerror("Can't load additional components.");
                        return false;
                    }
                    waitingForLoad[name] = elt;
                }
                elt.addEventListener("load", onload);
                elt.addEventListener("error", onerror);
                return null;
            };

            CindyJS._autoLoadingPlugin = {};

            CindyJS.autoLoadPlugin = function(name, path, onload) {
                if (CindyJS._pluginRegistry[name]) {
                    onload();
                    return true;
                }
                var listeners = CindyJS._autoLoadingPlugin[name];
                if (!listeners) {
                    if (!path) path = name + "-plugin.js";
                    listeners = CindyJS._autoLoadingPlugin[name] = [];
                    var elt = CindyJS.addNewScript(path);
                    if (elt === false) {
                        return false;
                    }
                    elt.addEventListener("error", console.error.bind(console));
                }
                listeners.push(onload);
                return null;
            };

            var nada = {
                ctype: 'undefined'
            };

            CindyJS.waitFor = waitFor;
            CindyJS._pluginRegistry = {};
            CindyJS.instances = [];
            CindyJS.registerPlugin = function(apiVersion, pluginName, initCallback) {
                if (apiVersion !== 1) {
                    console.error("Plugin API version " + apiVersion + " not supported");
                    return false;
                }
                CindyJS._pluginRegistry[pluginName] = initCallback;
                var listeners = CindyJS._autoLoadingPlugin[pluginName] || [];
                listeners.forEach(function(callback) {
                    callback();
                });
            };

            var idCounter = 0;

            function generateId(prefix) {
                if (prefix === undefined)
                    prefix = "CindyJSid";
                return prefix + (++idCounter);
            }

            CindyJS.dumpState = function(index) {
                // Call this if you find a rendering bug you'd like to reproduce.
                // The save the printed JSON to a file and include it in your report.
                var state = CindyJS.instances[index || 0].saveState();
                console.log(JSON.stringify(state));
            };

            CindyJS.debugState = function(index) {
                // Call this to test how a widget handles a save & reload.
                // You can paste javascript:CindyJS.debugState() into the
                // address bar of your browser to achieve this.
                CindyJS.instances.map(function(instance) {
                    var cfg = instance.config;
                    cfg = JSON.parse(JSON.stringify(cfg));
                    var state = instance.saveState();
                    console.log(JSON.stringify(state));
                    for (var key in state)
                        cfg[key] = state[key];
                    instance.shutdown();
                    return cfg;
                }).forEach(function(cfg) {
                    CindyJS(cfg);
                });
            };

            CindyJS.newInstance = function(instanceInvocationArguments) {
var CindyJS = this; // since this will be turned into a method

var csconsole;
var cslib;

var cscompiled = {};

// Simulation settings
var csanimating = false;
var csstopped = true;
var simtime = 0; // accumulated simulation time since start
var simspeed = 0.5; // global speed setting, will get scaled for applications
var simcap = 1000 / 20; // max. ms between frames for fps-independent sim
var simtick = 0; // Date.now of the most recent simulation tick
var simaccuracy = 10; // number of sub-steps per frame

var simunit = 5 / 360; // reported simulationtime() per internal simtime unit
/* Cinderella has a factor 5 for its internal animation clock,
 * and the division by 360 is in the simulationtime function implementation.
 */

// internal simtime units per millisecond at simspeed 1
var simfactor = 0.32 / simunit / 1000 * 2;
/*              ^^^^ simulationtime per second, observed in Cinderella
 *                     ^^^^^^^ simulationtime per simtime unit
 *                               ^^^^ milliseconds per second
 *                                      ^ default accuracy factor
 *
 * Cinderella does timing different from CindyJS, so here are some notes.
 * The default in Cinderella is speed=1.0, accuracy=2, frames=1 in its terms,
 * which in CindyJS terminology would mean speed=0.5, accuracy=1.
 * It schedules animation frames with 20ms between, so the actual framerate
 * depends on the time each such frame takes to compute.
 * The step in simulated time for each such job is computed in Cinderella
 * as speed * 2^(frames - accuracy), so it's 0.5 units by default.
 * This amount is internal only; the simulationtime() divides the accumulated
 * time by 360.  Using its output, one can observe the amount of simulated
 * time for each second of wall time.  It will vary with hardware, but
 * on current desktops was observed to be close to 0.32 per second,
 * corresponding to 23.04ms between consecutive frames on average.
 * So that's where all the magic values in the simfactor computation come from.
 *
 * Should these values (simunit and simfactor) be different for widgets
 * which were not exported from Cinderella? (gagern, 2016-09-02)
 */

// Coordinate system settings
var csscale = 1;
var csgridsize = 0;
var cstgrid = 0;
var csgridscript;
var cssnap = false;
var csaxes = false;

function dump(a) {
    console.log(JSON.stringify(a));
}

function dumpcs(a) {
    console.log(niceprint(a));

    if (a.ctype !== "undefined") {
        csconsole.out(niceprint(a));
    }
}

function evalcs(a) {
    var prog = evaluator.parse$1([General.wrap(a)], []);
    var erg = evaluate(prog);
    dumpcs(erg);
}


function evokeCS(code) {
    var parsed = analyse(code, false);
    console.log(parsed);
    evaluate(parsed);
    scheduleUpdate();
}


var canvas;
var trafos;

function updateCanvasDimensions() {
    canvas.width = csw = canvas.clientWidth;
    canvas.height = csh = canvas.clientHeight;
    csctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    csport.setMat(25, 0, 0, 25, 250.5, 250.5); // reset
    if (trafos) {
        for (var i = 0; i < trafos.length; i++) {
            var trafo = trafos[i];
            var trname = Object.keys(trafo)[0];
            if (trname === "scale") {
                csscale = trafo.scale;
                csport[trname](trafo.scale);
            }
            if (trname === "translate") {
                csport[trname](trafo.translate[0], trafo.translate[1]);
            }
            if (trname === "scaleAndOrigin") {
                csscale = trafo[trname][0] / 25;
                csport[trname].apply(null, trafo[trname]);
            }
            if (trname === "visibleRect") {
                csport[trname].apply(null, trafo[trname]);
                csscale = csport.drawingstate.initialmatrix.a / 25;
            }
        }
    }
    csport.createnewbackup();
    csport.greset();
    var devicePixelRatio = 1;
    if (typeof window !== "undefined" && window.devicePixelRatio)
        devicePixelRatio = window.devicePixelRatio;
    var backingStoreRatio =
        csctx.webkitBackingStorePixelRatio ||
        csctx.mozBackingStorePixelRatio ||
        csctx.msBackingStorePixelRatio ||
        csctx.oBackingStorePixelRatio ||
        csctx.backingStorePixelRatio ||
        1;
    if (devicePixelRatio !== backingStoreRatio) {
        var ratio = devicePixelRatio / backingStoreRatio;
        canvas.width = csw * ratio;
        canvas.height = csh * ratio;
        csctx.scale(ratio, ratio);
    }
}

// hook to allow instrumented versions to replace or augment the canvas object
var haveCanvas = function(canvas) {
    return canvas;
};

var isFiniteNumber = Number.isFinite || function(x) {
    return (typeof x === 'number') && isFinite(x);
};

var csmouse, csctx, csw, csh, csgeo, images, dropped = nada,
    dropPoint = nada;

function canvasWithContainingDiv(elt) {
    var div;
    if (elt.tagName.toLowerCase() !== "canvas") {
        // we have a div or something like that, nest a canvas inside that
        div = elt;
        canvas = document.createElement("canvas");
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
    } else {
        // we have a canvas; build a div around it
        canvas = elt;
        div = document.createElement("div");
        var attrs = Array.prototype.slice.call(canvas.attributes);
        var width = null;
        var height = null;
        attrs.forEach(function(attr) {
            if (attr.name === "width") {
                width = attr.value;
            } else if (attr.name === "height") {
                height = attr.value;
            } else {
                div.setAttributeNodeNS(canvas.removeAttributeNode(attr));
            }
        });
        if (width !== null && !div.style.width) {
            div.style.width = width + "px";
        }
        if (height !== null && !div.style.height) {
            div.style.height = height + "px";
        }
        canvas.parentNode.replaceChild(div, canvas);
    }
    div.classList.add("CindyJS-widget");
    var style = canvas.style;
    style.position = "absolute";
    style.border = "none";
    style.margin = style.padding = style.left = style.top = "0px";
    style.width = style.height = "100%";
    var position = "static";
    if (window.getComputedStyle) {
        position = window.getComputedStyle(div).getPropertyValue("position");
        position = String(position || "static");
    }
    if (position === "static")
        div.style.position = "relative"; // serve as a positioning root
    div.appendChild(canvas);
    return canvas;
}

function isCinderellaBeforeVersion() {
    var c = instanceInvocationArguments.cinderella;
    if (!c || !c.version)
        return false;
    for (var i = 0; i < arguments.length; ++i) {
        var x = c.version[i];
        var y = arguments[i];
        if (x !== y)
            return (typeof x === typeof y) && (x < y);
    }
    return false;
}

function createCindyNow() {
    startupCalled = true;
    if (waitForPlugins !== 0) return;

    var data = instanceInvocationArguments;
    if (data.exclusive) {
        i = CindyJS.instances.length;
        while (i > 0)
            CindyJS.instances[--i].shutdown();
    }

    if (data.csconsole !== undefined)
        csconsole = data.csconsole;
    setupConsole();

    csmouse = [100, 100];
    var c = null;
    trafos = data.transform;
    if (data.ports) {
        if (data.ports.length > 0) {
            var port = data.ports[0];
            c = port.element;
            if (!c)
                c = document.getElementById(port.id);
            c = canvasWithContainingDiv(c);
            var divStyle = c.parentNode.style;
            if (port.fill === "window") {
                divStyle.width = "100vw";
                divStyle.height = "100vh";
            } else if (port.fill === "parent") {
                divStyle.width = "100%";
                divStyle.height = "100%";
            } else if (port.width && port.height) {
                divStyle.width = port.width + "px";
                divStyle.height = port.height + "px";
            }
            if (port.background)
                c.style.backgroundColor = port.background;
            if (port.transform !== undefined)
                trafos = port.transform;
            if (isFiniteNumber(port.grid) && port.grid > 0)
                csgridsize = port.grid;
            if (isFiniteNumber(port.tgrid) && port.tgrid > 0)
                cstgrid = port.tgrid;
            if (port.snap)
                cssnap = true;
            if (port.axes)
                csaxes = true;
        }
    }
    if (!c) {
        c = data.canvas;
        if (!c && typeof document !== "undefined") {
            c = document.getElementById(data.canvasname);
            if (c) c = canvasWithContainingDiv(c);
        }
    }
    if (c) {
        canvas = c = haveCanvas(c);
        csctx = c.getContext("2d");
        updateCanvasDimensions();
        if (!csctx.setLineDash)
            csctx.setLineDash = function() {};
        if (data.animation ? data.animation.controls : data.animcontrols)
            setupAnimControls(data);
        if (data.animation && isFiniteNumber(data.animation.speed)) {
            if (data.animation.accuracy === undefined &&
                isCinderellaBeforeVersion(2, 9, 1875))
                setSpeed(data.animation.speed * 0.5);
            else
                setSpeed(data.animation.speed);
        }
        if (data.animation && isFiniteNumber(data.animation.accuracy))
            simaccuracy = data.animation.accuracy;
    }
    if (data.statusbar) {
        if (typeof data.statusbar === "string") {
            statusbar = document.getElementById(data.statusbar);
        } else {
            statusbar = data.statusbar;
        }
    }

    //Setup the scripts
    var scripts = ["move",
        "keydown", "keyup", "keytyped", "keytype",
        "mousedown", "mouseup", "mousedrag", "mousemove", "mouseclick",
        "init", "tick", "draw",
        "simulationstep", "simulationstart", "simulationstop", "ondrop"
    ];
    var scriptconf = data.scripts;
    var scriptpat = null;
    if (typeof scriptconf === "string" && scriptconf.search(/\*/))
        scriptpat = scriptconf;
    if (typeof scriptconf !== "object")
        scriptconf = null;

    scripts.forEach(function(s) {
        var cscode;
        if (scriptconf !== null && scriptconf[s]) {
            cscode = scriptconf[s];
        } else {
            var sname = s + "script";
            if (data[sname]) {
                cscode = document.getElementById(data[sname]);
            } else if (scriptpat) {
                cscode = document.getElementById(scriptpat.replace(/\*/, s));
                if (!cscode)
                    return;
            } else {
                return;
            }
            cscode = cscode.text;
        }
        cscode = analyse(cscode, false);
        if (cscode.ctype === "error") {
            console.error(
                "Error compiling " + s + " script: " +
                cscode.message
            );
        } else {
            cscompiled[s] = cscode;
        }
    });
    if (isCinderellaBeforeVersion(2, 9, 1888) && !cscompiled.keydown) {
        // Cinderella backwards-compatible naming of key events
        cscompiled.keydown = cscompiled.keytyped;
        cscompiled.keytyped = cscompiled.keytype;
        cscompiled.keytype = undefined;
    }

    if (isFiniteNumber(data.grid) && data.grid > 0) {
        csgridsize = data.grid;
    }
    if (data.snap) {
        cssnap = true;
    }

    csgeo = {};

    var i = 0;
    images = {};

    //Read Geometry
    if (!data.geometry) {
        data.geometry = [];
    }
    csinit(data.geometry);

    //Read Physics
    if (!data.behavior) {
        data.behavior = [];
    }
    if (typeof csinitphys === 'function')
        csinitphys(data.behavior);

    for (var k in data.images) {
        var img = loadImage(data.images[k], false);
        if (img !== nada)
            images[k] = img;
    }

    for (var l in data.videos) {
        var video = loadImage(data.videos[l], true);
        if (video !== nada)
            images[l] = video;
    }

    globalInstance.canvas = c;

    // Invoke oninit callback
    if (data.oninit)
        data.oninit(globalInstance);

    CindyJS.instances.push(globalInstance);
    if (instanceInvocationArguments.use)
        instanceInvocationArguments.use.forEach(function(name) {
            evaluator.use$1([General.wrap(name)], {});
        });
    loadExtraModules();
    doneLoadingModule();
}

/*
 * An image wrapper object contains the following properties:
 * img: the actual drawable, i.e. an <img>, <canvas>, <video> or similar
 * width, height: dimensions of the image
 * ready: boolean indicating whether the image been loaded already
 * live: boolean indicating whether the image is expected to change continuously
 * generation: A counter that is increased once the drawable is changed.
 */
function loadImage(obj, video) {
    var img;
    if (typeof obj === "string") {
        if (video) {
            img = document.createElement("video");
            img.preload = "auto";
            img.loop = true; //loop videos as default

            //https://www.npmjs.com/package/iphone-inline-video
            img.setAttribute("playsinline", "");
            enableInlineVideo(img);
        } else {
            img = new Image();
        }
        img.src = obj;
    } else {
        img = obj;
    }
    if (!img.tagName) {
        console.error("Not a valid image element", img);
        return nada;
    }
    var value = {
        img: img,
        width: NaN,
        height: NaN,
        ready: true,
        live: false,
        generation: 0,
        whenReady: callFunctionNow,
    };
    var tag = img.tagName.toLowerCase();
    var callWhenReady = [];
    if (tag === "img") {
        if (img.complete) {
            value.width = img.width;
            value.height = img.height;
        } else {
            value.ready = false;
            img.addEventListener("load", function() {
                value.width = img.width;
                value.height = img.height;
                value.ready = true;
                value.whenReady = callFunctionNow;
                callWhenReady.forEach(callFunctionNow);
                scheduleUpdate();
            });
            value.whenReady = callWhenReady.push.bind(callWhenReady);
        }
    } else if (tag === "video") {
        value.live = true;
        if (img.readyState >= img.HAVE_METADATA) {
            value.width = img.videoWidth;
            value.height = img.videoHeight;
        } else {
            value.ready = false;
            img.addEventListener("loadedmetadata", function() {
                value.width = img.videoWidth;
                value.height = img.videoHeight;
                value.ready = true;
                value.whenReady = callFunctionNow;
                callWhenReady.forEach(callFunctionNow);
                scheduleUpdate();
            });
            value.whenReady = callWhenReady.push.bind(callWhenReady);
        }
    } else if (tag === "canvas") {
        value.width = img.width;
        value.height = img.height;
    } else {
        console.error("Not a valid image element", tag, img);
        return nada;
    }
    return {
        ctype: "image",
        value: value,
    };
}

var animcontrols = {
    play: noop,
    pause: noop,
    stop: noop
};

function setupAnimControls(data) {
    var controls = document.createElement("div");
    controls.className = "CindyJS-animcontrols";
    canvas.parentNode.appendChild(controls);
    var speedLo = 0;
    var speedHi = 1;
    var speedScale = 1;
    if (data.animation && data.animation.speedRange &&
        isFiniteNumber(data.animation.speedRange[0]) &&
        isFiniteNumber(data.animation.speedRange[1])) {
        speedLo = data.animation.speedRange[0];
        speedHi = data.animation.speedRange[1];
        speedScale = speedHi - speedLo;
    }
    var slider = document.createElement("div");
    slider.className = "CindyJS-animspeed";
    controls.appendChild(slider);
    var knob = document.createElement("div");
    slider.appendChild(knob);
    addAutoCleaningEventListener(slider, "mousedown", speedDown);
    addAutoCleaningEventListener(slider, "mousemove", speedDrag);
    addAutoCleaningEventListener(canvas.parentNode, "mouseup", speedUp, true);
    var buttons = document.createElement("div");
    buttons.className = "CindyJS-animbuttons";
    controls.appendChild(buttons);
    setupAnimButton("play", csplay);
    setupAnimButton("pause", cspause);
    setupAnimButton("stop", csstop);
    animcontrols.stop(true);

    setSpeedKnob = function(speed) {
        speed = (speed - speedLo) / speedScale;
        speed = Math.max(0, Math.min(1, speed));
        speed = Math.round(speed * 1000) * 0.1; // avoid scientific notation
        knob.style.width = speed + "%";
    };

    function setupAnimButton(id, ctrl) {
        var button = document.createElement("button");
        var img = document.createElement("img");
        button.appendChild(img);
        buttons.appendChild(button);
        loadSvgIcon(img, id);
        button.addEventListener("click", ctrl);
        animcontrols[id] = setActive;

        function setActive(active) {
            if (active) button.classList.add("CindyJS-active");
            else button.classList.remove("CindyJS-active");
        }
    }

    var speedDragging = false;

    function speedDown(event) {
        speedDragging = true;
        speedDrag(event);
    }

    function speedDrag(event) {
        if (!speedDragging) return;
        var rect = slider.getBoundingClientRect();
        var x = event.clientX - rect.left - slider.clientLeft + 0.5;
        setSpeed(speedScale * x / rect.width + speedLo);
    }

    function speedUp(event) {
        speedDragging = false;
    }

}

var setSpeedKnob = null;

function setSpeed(speed) {
    simspeed = speed;
    if (setSpeedKnob) setSpeedKnob(speed);
}

/* Install layer ‹id› of Icons.svg as the src of the given img element.
 * Since Safari has problems honoring the :target SVG selector
 * to make the selected layer visible, we achieve the same effect manually:
 * We load the SVG once, then remove all layers from its DOM but keep them
 * in a dictionary.  Then when an icon gets requested, we re-add that layer
 * to the SVG DOM, serialize the resulting XML and use it as a data: URI.
 *
 * There are three phases, and during each the loadSvgIcon variable refers
 * to a fifferent function.
 * The first request triggers loading of the SVG, and changes the function
 * to a version which simply enqueues subsequent requests.
 * Once the SVG has arrived, the function gets changes to the one that actually
 * sets the src attribute to the icon in question.
 * That function is then applied to all the enqueued requests as well.
 */
var loadSvgIcon = function(img, id) {
    var iconsToLoad = [];
    loadSvgIcon = function cacheRequest(img, id) {
        // subsequent requests get enqueued while we load the SVG
        iconsToLoad.push({
            img: img,
            id: id
        });
    };
    loadSvgIcon(img, id); // cache the first request as well
    var url = CindyJS.getBaseDir() + "images/Icons.svg";
    var req = new XMLHttpRequest();
    req.onreadystatechange = handleStateChange;
    req.responseType = "document";
    req.open("GET", url);
    req.send();

    function handleStateChange() {
        if (req.readyState !== XMLHttpRequest.DONE) return;
        if (req.status !== 200) {
            console.error(
                "Failed to load CindyJS Icons.svg from " + url +
                ": " + req.statusText);
            return;
        }
        var svg = req.responseXML;
        var docElt = svg.documentElement;
        var layers = {};
        var node, next;
        for (node = docElt.firstChild; node; node = next) {
            next = node.nextSibling;
            if (node.nodeType !== Node.ELEMENT_NODE ||
                node.namespaceURI !== "http://www.w3.org/2000/svg" ||
                node.localName.toLowerCase() !== "g")
                continue;
            docElt.removeChild(node);
            node.setAttribute("style", "display:inline");
            layers[node.getAttribute("id")] = node;
        }
        var serializer = new XMLSerializer();
        loadSvgIcon = function(img, id) {
            // now that the SVG is loaded, requests get handled straight away
            if (!layers.hasOwnProperty(id)) return;
            var layer = layers[id];
            docElt.appendChild(layer);
            var str;
            try {
                str = serializer.serializeToString(svg);
            } finally {
                docElt.removeChild(layer);
            }
            img.src = "data:image/svg+xml;charset=utf-8," +
                encodeURIComponent(str);
        };
        iconsToLoad.forEach(function(icon) {
            loadSvgIcon(icon.img, icon.id);
        });
        iconsToLoad = null;
    }
};

function callFunctionNow(f) {
    return f();
}

function loadExtraModules() {
    if (usedFunctions.convexhull3d$1) {
        loadExtraPlugin("QuickHull3D", "QuickHull3D.js");
    }
}

var modulesToLoad = 1;

function loadExtraPlugin(name, path) {
    var cb = null;
    if (instanceInvocationArguments.plugins)
        cb = instanceInvocationArguments.plugins[name];
    if (!cb)
        cb = CindyJS._pluginRegistry[name];
    if (cb) {
        evaluator.use$1([General.wrap(name)], {});
        return;
    }
    ++modulesToLoad;
    CindyJS.autoLoadPlugin(name, path, function() {
        evaluator.use$1([General.wrap(name)], {});
        doneLoadingModule();
    });
}

function loadExtraModule(name, path) {
    ++modulesToLoad;
    CindyJS.loadScript(name, path, doneLoadingModule, function() {
        console.error(
            "Failed to load " + path + ", can't start CindyJS instance");
        shutdown();
    });
}

function doneLoadingModule() {
    if (--modulesToLoad !== 0)
        return;

    //Evaluate Init script
    evaluate(cscompiled.init);

    if ((instanceInvocationArguments.animation ||
            instanceInvocationArguments).autoplay)
        csplay();

    if (globalInstance.canvas)
        setuplisteners(globalInstance.canvas, instanceInvocationArguments);
}

var backup = null;

function backupGeo() {
    var state = stateArrays.backup;
    state.set(stateIn);
    var speeds = {};
    for (var i = 0; i < csgeo.points.length; i++) {
        var el = csgeo.points[i];
        if (typeof(el.behavior) !== 'undefined') {
            speeds[el.name] = [
                el.behavior.vx,
                el.behavior.vy,
                el.behavior.vz
            ];
        }
    }
    backup = {
        state: state,
        speeds: speeds
    };
}


function restoreGeo() {
    if (backup === null)
        return;
    stateIn.set(backup.state);
    Object.keys(backup.speeds).forEach(function(name) {
        var el = csgeo.csnames[name];
        if (typeof(el.behavior) !== 'undefined') { //TODO Diese Physics Reset ist FALSCH
            var speed = backup.speeds[name];
            el.behavior.vx = speed[0];
            el.behavior.vy = speed[1];
            el.behavior.vz = speed[2];
            el.behavior.fx = 0;
            el.behavior.fy = 0;
            el.behavior.fz = 0;
        }
    });
    recalcAll();
}


function csplay() {
    if (!csanimating) { // stop or pause state
        if (csstopped) { // stop state
            backupGeo();
            simtime = 0;
            csstopped = false;
            animcontrols.stop(false);
        } else {
            animcontrols.pause(false);
        }
        simtick = Date.now();
        animcontrols.play(true);
        if (typeof csinitphys === 'function') {
            if (csPhysicsInited) {
                csresetphys();
            }
        }

        csanimating = true;
        cs_simulationstart();
        scheduleUpdate();
    }
}

function cspause() {
    if (csanimating) {
        animcontrols.play(false);
        animcontrols.pause(true);
        csanimating = false;
    }
}

function csstop() {
    if (!csstopped) {
        if (csanimating) {
            cs_simulationstop();
            csanimating = false;
            animcontrols.play(false);
        } else {
            animcontrols.pause(false);
        }
        animcontrols.stop(true);
        csstopped = true;
        restoreGeo();
    }
}

var shutdownHooks = [];
var isShutDown = false;

function shutdown() {
    if (isShutDown)
        return; // ignore multiple calls
    isShutDown = true;
    // console.log("Shutting down");

    // Remove this from the list of all running instances
    var n = CindyJS.instances.length;
    while (n > 0) {
        if (CindyJS.instances[--n] === globalInstance) {
            CindyJS.instances.splice(n, 1);
            break;
        }
    }

    // Call hooks in reverse order
    n = shutdownHooks.length;
    while (n > 0) {
        try {
            shutdownHooks[--n]();
        } catch (e) {
            console.error(e);
        }
    }
}

// The following object will be returned from the public CindyJS function.
// Its startup method will be called automatically unless specified otherwise.
var globalInstance = {
    "config": instanceInvocationArguments,
    "startup": createCindyNow,
    "shutdown": shutdown,
    "evokeCS": evokeCS,
    "play": csplay,
    "pause": cspause,
    "stop": csstop,
    "evalcs": function(code) {
        return evaluate(analyse(code, false));
    },
    "parse": function(code) {
        return analyse(code);
    },
    "niceprint": niceprint,
    "canvas": null, // will be set during startup
};

var startupCalled = false;
var waitForPlugins = 0;
if (instanceInvocationArguments.use) {
    instanceInvocationArguments.use.forEach(function(name) {
        var cb = null;
        if (instanceInvocationArguments.plugins)
            cb = instanceInvocationArguments.plugins[name];
        if (!cb)
            cb = CindyJS._pluginRegistry[name];
        if (!cb) {
            ++waitForPlugins;
            console.log("Loading script for plugin " + name);
            CindyJS.loadScript(name + "-plugin", name + "-plugin.js", function() {
                console.log("Successfully loaded plugin " + name);
                if (--waitForPlugins === 0 && startupCalled) createCindyNow();
            }, function() {
                console.error("Failed to auto-load plugin " + name);
                if (--waitForPlugins === 0 && startupCalled) createCindyNow();
            });
        }
    });
}

//
// CONSOLE
//
function setupConsole() {
    if (csconsole === null) {
        csconsole = new NullConsoleHandler();
    } else if (csconsole === true) {
        csconsole = new CindyConsoleHandler();
    } else if (typeof csconsole === "string") {
        csconsole = new ElementConsoleHandler(csconsole);
    } else if (typeof csconsole === "object" && typeof csconsole.appendChild === "function") {
        csconsole = new ElementConsoleHandler(csconsole);
    } else {
        // Default
        csconsole = new NullConsoleHandler();
    }
}

function GenericConsoleHandler(args) {

    this.in = function(s, preventNewline) {
        console.log(s);

        if (preventNewline) {
            this.append(this.createTextNode("span", "blue", s));

        } else {
            this.append(this.createTextNode("p", "blue", s));
        }
    };

    this.out = function(s, preventNewline) {
        console.log(s);

        if (preventNewline) {
            this.append(this.createTextNode("span", "red", s));

        } else {
            this.append(this.createTextNode("p", "red", s));
        }
    };

    this.err = function(s, preventNewline) {
        console.log(s);

        if (preventNewline) {
            this.append(this.createTextNode("span", "red", s));

        } else {
            this.append(this.createTextNode("p", "red", s));
        }
    };

    this.createTextNode = function(tagName, color, s) {
        if (typeof document !== "undefined") {
            var element = document.createElement(tagName);
            element.appendChild(document.createTextNode(s));
            element.style.color = color;

            return element;
        }

        return s + "\n";
    };
}

function CindyConsoleHandler() {

    var that = this;
    var cmd;
    var container = document.createElement("div");
    var log;

    container.innerHTML = (
        '<div id="console" style="border-top: 1px solid #333333; bottom: 0px; position: absolute; width: 100%;">' +
        '<div id="log" style="height: 150px; overflow-y: auto;"></div>' +
        '<input id="cmd" type="text" style="box-sizing: border-box; height: 30px; width: 100%;">' +
        '</div>'
    );

    document.body.appendChild(container);

    cmd = document.getElementById("cmd");
    log = document.getElementById("log");

    cmd.onkeydown = function(evt) {
        if (evt.keyCode !== 13 || cmd.value === "") {
            return;
        }

        that.in(cmd.value);

        evalcs(cmd.value);

        cmd.value = "";

        log.scrollTop = log.scrollHeight;
    };

    this.append = function(s) {
        log.appendChild(s);
    };

    this.clear = function() {
        log.innerHTML = "";
    };
}

CindyConsoleHandler.prototype = new GenericConsoleHandler();

function ElementConsoleHandler(idOrElement) {

    var element = idOrElement;
    if (typeof idOrElement === "string") {
        element = document.getElementById(idOrElement);
    }

    this.append = function(s) {
        element.appendChild(s);
    };

    this.clear = function() {
        element.innerHTML = "";
    };
}

ElementConsoleHandler.prototype = new GenericConsoleHandler();

function NullConsoleHandler() {

    this.append = function(s) {
        // Do nothing
    };

    this.clear = function() {
        // Do nothing
    };
}

NullConsoleHandler.prototype = new GenericConsoleHandler();
var mouse = {};
var move;

var cskey = "";
var cskeycode = 0;


function getmover(mouse) {
    var mov = null;
    var adist = 1000000;
    var diff;
    for (var i = 0; i < csgeo.free.length; i++) {
        var el = csgeo.free[i];
        if (el.pinned || el.visible === false || el.tmp === true)
            continue;

        var dx, dy, dist, p;
        var sc = csport.drawingstate.matrix.sdet;
        if (el.kind === "P") {
            p = List.normalizeZ(el.homog);
            if (!List._helper.isAlmostReal(p))
                continue;
            dx = p.value[0].value.real - mouse.x;
            dy = p.value[1].value.real - mouse.y;
            dist = Math.sqrt(dx * dx + dy * dy);
            if (el.narrow && dist > (typeof el.narrow === "number" ?
                    el.narrow : 20) / sc)
                continue;
        } else if (el.kind === "C") { //Must be CircleMr
            var mid = csgeo.csnames[el.args[0]];
            var rad = el.radius;
            var xx = CSNumber.div(mid.homog.value[0], mid.homog.value[2]).value.real;
            var yy = CSNumber.div(mid.homog.value[1], mid.homog.value[2]).value.real;
            dx = xx - mouse.x;
            dy = yy - mouse.y;
            var ref = Math.sqrt(dx * dx + dy * dy);
            dist = ref - rad.value.real;
            dx = 0;
            dy = 0;
            if (dist < 0) {
                dist = -dist;
            }
            dist = dist + 30 / sc;

        } else if (el.kind === "L") { //Must be ThroughPoint(Horizontal/Vertical not treated yet)
            var l = el.homog;
            var N = CSNumber;
            var nn = N.add(N.mult(l.value[0], N.conjugate(l.value[0])),
                N.mult(l.value[1], N.conjugate(l.value[1])));
            var ln = List.scaldiv(N.sqrt(nn), l);
            dist = ln.value[0].value.real * mouse.x + ln.value[1].value.real * mouse.y + ln.value[2].value.real;
            dx = -ln.value[0].value.real * dist;
            dy = -ln.value[1].value.real * dist;

            if (dist < 0) {
                dist = -dist;
            }
            dist = dist + 25 / sc;
        } else if (el.kind === "Text") {
            if (!el.homog || el.dock || !el._bbox) continue;
            p = csport.from(mouse.x, mouse.y, 1);
            dx = Math.max(0, p[0] - el._bbox.right, el._bbox.left - p[0]);
            dy = Math.max(0, p[1] - el._bbox.bottom, el._bbox.top - p[1]);
            dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 20)
                continue;
            dist = dist / sc;
            p = List.normalizeZ(el.homog);
            if (!List._helper.isAlmostReal(p))
                continue;
            dx = p.value[0].value.real - mouse.x;
            dy = p.value[1].value.real - mouse.y;
        } else {
            continue;
        }

        if (dist < adist + 0.2 / sc) { //A bit a dirty hack, prefers new points
            adist = dist;
            mov = el;
            diff = {
                x: dx,
                y: dy
            };
        }
    }
    console.log("Moving " + (mov ? mov.name : "nothing"));
    if (mov === null)
        return null;
    return {
        mover: mov,
        offset: diff,
        prev: {
            x: mouse.x,
            y: mouse.y
        }
    };
}

function addAutoCleaningEventListener(target, type, listener, useCapture) {
    if (useCapture === undefined)
        useCapture = false;
    shutdownHooks.push(function() {
        target.removeEventListener(type, listener, useCapture);
    });
    target.addEventListener(type, listener, useCapture);
}

function setuplisteners(canvas, data) {

    var MO = null;
    if (typeof MutationObserver !== "undefined")
        MO = MutationObserver;
    if (!MO && typeof WebKitMutationObserver !== "undefined")
        MO = WebKitMutationObserver; // jshint ignore: line
    if (MO) {
        MO = new MO(function(mutations) {
            // Browsers which support MutationObserver likely support contains
            if (!document.body.contains(canvas))
                shutdown();
        });
        MO.observe(document.documentElement, {
            "childList": true,
            "subtree": true
        });
        shutdownHooks.push(function() {
            MO.disconnect();
        });
    } else {
        addAutoCleaningEventListener(canvas, "DOMNodeRemovedFromDocument", shutdown);
        addAutoCleaningEventListener(canvas, "DOMNodeRemoved", shutdown);
    }

    function updatePosition(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left - canvas.clientLeft + 0.5;
        var y = event.clientY - rect.top - canvas.clientTop + 0.5;
        var pos = csport.to(x, y);
        mouse.prevx = mouse.x;
        mouse.prevy = mouse.y;
        mouse.x = pos[0];
        mouse.y = pos[1];
        csmouse[0] = mouse.x;
        csmouse[1] = mouse.y;
        scheduleUpdate();
    }

    if (data.keylistener === true) {
        addAutoCleaningEventListener(document, "keydown", function(e) {
            cs_keydown(e);
            return false;
        });
        addAutoCleaningEventListener(document, "keyup", function(e) {
            cs_keyup(e);
            return false;
        });
        addAutoCleaningEventListener(document, "keypress", function(e) {
            cs_keytyped(e);
            return false;
        });
    } else if (cscompiled.keydown || cscompiled.keyup || cscompiled.keytyped) {
        canvas.setAttribute("tabindex", "0");
        addAutoCleaningEventListener(canvas, "mousedown", function() {
            canvas.focus();
        });
        addAutoCleaningEventListener(canvas, "keydown", function(e) {
            if (e.keyCode === 9 /* tab */ ) return;
            cs_keydown(e);
            if (!cscompiled.keytyped) {
                // this must bubble in order to trigger a keypress event
                e.preventDefault();
            }
        });
        addAutoCleaningEventListener(canvas, "keyup", function(e) {
            cs_keyup(e);
            e.preventDefault();
        });
        addAutoCleaningEventListener(canvas, "keypress", function(e) {
            if (e.keyCode === 9 /* tab */ ) return;
            cs_keytyped(e);
            e.preventDefault();
        });
    }

    addAutoCleaningEventListener(canvas, "mousedown", function(e) {
        mouse.button = e.which;
        updatePosition(e);
        cs_mousedown();
        manage("mousedown");
        mouse.down = true;
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "mouseup", function(e) {
        mouse.down = false;
        cindy_cancelmove();
        cs_mouseup();
        manage("mouseup");
        scheduleUpdate();
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "mousemove", function(e) {
        updatePosition(e);
        if (mouse.down) {
            cs_mousedrag();
        } else {
            cs_mousemove();
        }
        manage("mousemove");
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "click", function(e) {
        updatePosition(e);
        cs_mouseclick();
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "dragenter", function(e) {
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "dragover", function(e) {
        e.preventDefault();
    });

    addAutoCleaningEventListener(canvas, "drop", function(e) {
        e.preventDefault();

        // get data
        var dt = e.dataTransfer;
        var files = dt.files;
        var dropped = Array(files.length);
        var countDown = files.length;
        // drop position
        var rect = e.currentTarget.getBoundingClientRect();
        var x = e.clientX - rect.left - canvas.clientLeft + 0.5;
        var y = e.clientY - rect.top - canvas.clientTop + 0.5;
        var pos = List.realVector(csport.to(x, y));

        if (files.length > 0) {
            Array.prototype.forEach.call(files, function(file, i) {
                var reader = new FileReader();
                if (textType(file.type)) {
                    reader.onload = function() {
                        textDone(i, reader.result);
                    };
                    reader.readAsText(file);
                } else if ((/^image\//).test(file.type)) {
                    reader.onload = function() {
                        imgDone(i, reader.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    console.log("Unknown MIME type: " + file.type);
                    oneDone(i, nada);
                }
            });
        } else {
            var data = dt.getData("text/uri-list");
            if (data) {
                data = data.split("\n").filter(function(line) {
                    return !/^\s*(#|$)/.test(line);
                });
                countDown = data.length;
                dropped = Array(countDown);
                files = Array(countDown);
                data.forEach(dropUri);
            }
        }

        function dropUri(uri, i) {
            var name = uri.replace(/[?#][^]*/, "");
            name = name.replace(/[^]*\/([^\/])/, "$1");
            files[i] = {
                type: "",
                name: name
            };
            var req = new XMLHttpRequest();
            req.onreadystatechange = haveHead;
            req.open("HEAD", uri);
            req.send();

            function haveHead() {
                if (req.readyState !== XMLHttpRequest.DONE)
                    return;
                if (req.status !== 200) {
                    console.error("HEAD request for " + uri + " failed: " +
                        (req.responseText || "(no error message)"));
                    oneDone(i, nada);
                    return;
                }
                var type = req.getResponseHeader("Content-Type");
                files[i].type = type;
                if ((/^image\//).test(type)) {
                    imgDone(i, uri);
                } else if (textType(type)) {
                    req = new XMLHttpRequest();
                    req.onreadystatechange = haveText;
                    req.open("GET", uri);
                    req.send();
                } else {
                    oneDone(i, nada);
                }
            }

            function haveText() {
                if (req.readyState !== XMLHttpRequest.DONE)
                    return;
                if (req.status !== 200) {
                    console.error("GET request for " + uri + " failed: " +
                        (req.responseText || "(no error message)"));
                    oneDone(i, nada);
                    return;
                }
                textDone(i, req.responseText);
            }

        }

        function textType(type) {
            type = type.replace(/;[^]*/, "");
            if ((/^text\//).test(type)) return 1;
            if (type === "application/json") return 2;
            return 0;
        }

        function textDone(i, text) {
            switch (textType(files[i].type)) {
                case 1:
                    oneDone(i, General.string(text));
                    break;
                case 2:
                    var data, value;
                    try {
                        data = JSON.parse(text);
                        value = General.wrapJSON(data);
                    } catch (err) {
                        console.error(err);
                        value = nada;
                    }
                    oneDone(i, value);
                    break;
                default:
                    oneDone(i, nada);
                    break;
            }
        }

        function imgDone(i, src) {
            var img = new Image();
            var reported = false;
            img.onload = function() {
                if (reported) return;
                reported = true;
                oneDone(i,

                    loadImage(img, false));
            };
            img.onerror = function(err) {
                if (reported) return;
                reported = true;
                console.error(err);
                oneDone(i, nada);
            };
            img.src = src;
        }

        function oneDone(i, value, type) {
            dropped[i] = List.turnIntoCSList([
                value,
                General.string(type || value.ctype),
                General.string(files[i].type),
                General.string(files[i].name),
            ]);
            if (--countDown === 0) {
                cs_onDrop(dropped, pos);
            }
        }
    });


    function touchMove(e) {

        var activeTouchIDList = e.changedTouches;
        var gotit = false;
        for (var i = 0; i < activeTouchIDList.length; i++) {
            if (activeTouchIDList[i].identifier === activeTouchID) {
                gotit = true;
            }
        }
        if (!gotit) {
            return;
        }

        updatePosition(e.targetTouches[0]);
        if (mouse.down) {
            cs_mousedrag();
        } else {
            cs_mousemove();
        }

        manage("mousemove");

        e.preventDefault();
    }
    var activeTouchID = -1;

    function touchDown(e) {
        if (activeTouchID !== -1) {
            return;
        }

        var activeTouchIDList = e.changedTouches;
        if (activeTouchIDList.length === 0) {
            return;
        }
        activeTouchID = activeTouchIDList[0].identifier;

        updatePosition(e.targetTouches[0]);
        cs_mousedown();
        mouse.down = true;
        //move = getmover(mouse);
        manage("mousedown");
        e.preventDefault();
    }

    function touchUp(e) {
        var activeTouchIDList = e.changedTouches;
        var gotit = false;
        for (var i = 0; i < activeTouchIDList.length; i++) {
            if (activeTouchIDList[i].identifier === activeTouchID) {
                gotit = true;
            }
        }

        if (!gotit) {
            return;
        }
        activeTouchID = -1;
        mouse.down = false;
        cindy_cancelmove();
        cs_mouseup();
        manage("mouseup");
        scheduleUpdate();
        e.preventDefault();
    }

    addAutoCleaningEventListener(canvas, "touchstart", touchDown, false);
    addAutoCleaningEventListener(canvas, "touchmove", touchMove, true);
    addAutoCleaningEventListener(canvas, "touchend", touchUp, false);
    if (typeof document !== "undefined" && document.body) {
        addAutoCleaningEventListener(document.body, "touchcancel", touchUp, false);
        // addAutoCleaningEventListener(document.body, "mouseup", mouseUp, false);
    }

    if (typeof window !== "undefined") {
        addAutoCleaningEventListener(window, "resize", function() {
            requestAnimFrame(function() {
                updateCanvasDimensions();
                scheduleUpdate();
            });
        }, false);
    }
    resizeSensor(canvas.parentNode);

    scheduleUpdate();
}

function mkdiv(parent, style) {
    var div = document.createElement("div");
    div.setAttribute("style", style);
    parent.appendChild(div);
    return div;
}

// Inspired by
// github.com/marcj/css-element-queries/blob/bfa9a7f/src/ResizeSensor.js
// written by Marc J. Schmidt and others, licensed under the MIT license.
function resizeSensor(element) {
    if (typeof document === "undefined") return;
    var styleChild = "position: absolute; transition: 0s; left: 0; top: 0;";
    var style = styleChild + " right: 0; bottom: 0; overflow: hidden;" +
        " z-index: -1; visibility: hidden;";
    var expand = mkdiv(element, style);
    var expandChild = mkdiv(
        expand, styleChild + " width: 100000px; height: 100000px");
    var shrink = mkdiv(element, style);
    mkdiv(shrink, styleChild + " width: 200%; height: 200%");

    function reset() {
        expand.scrollLeft = expand.scrollTop =
            shrink.scrollLeft = shrink.scrollTop = 100000;
    }

    reset();
    var w = element.clientWidth;
    var h = element.clientHeight;
    var scheduled = false;

    function onScroll() {
        if (w !== element.clientWidth || h !== element.clientHeight) {
            w = element.clientWidth;
            h = element.clientHeight;
            if (!scheduled) {
                scheduled = true;
                requestAnimFrame(function() {
                    scheduled = false;
                    updateCanvasDimensions();
                    scheduleUpdate();
                });
            }
        }
        reset();
    }

    expand.addEventListener("scroll", onScroll);
    shrink.addEventListener("scroll", onScroll);
}

var requestAnimFrame;
if (instanceInvocationArguments.isNode) {
    requestAnimFrame = process.nextTick; // jshint ignore:line
} else {
    requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 0);
        };
}

var requestedAnimFrame = null;

function scheduleUpdate() {
    if (!requestedAnimFrame) {
        requestedAnimFrame = requestAnimFrame(doit);
    }
}

function doit() {
    requestedAnimFrame = null; // so we can schedule a new one
    if (isShutDown) return;
    if (csanimating) {
        cs_tick();
    }
    updateCindy();
    if (csanimating) {
        scheduleUpdate();
    }
}

function updateCindy() {
    csport.reset();
    csctx.save();
    csctx.clearRect(0, 0, csw, csh);
    var m = csport.drawingstate.matrix;
    var d, a, b, i, p;
    // due to the csport.reset(), m is initial, i.e. a = d and b = c = 0
    if (csgridsize !== 0) { // Square grid
        csctx.beginPath();
        csctx.strokeStyle = "rgba(0,0,0,0.1)";
        csctx.lineWidth = 1;
        csctx.lineCap = "butt";
        d = csgridsize * m.a;
        i = Math.ceil(-m.tx / d);
        while ((p = i * d + m.tx) < csw) {
            if (i || !csaxes) {
                csctx.moveTo(p, 0);
                csctx.lineTo(p, csh);
            }
            i++;
        }
        i = Math.floor(m.ty / d);
        while ((p = i * d - m.ty) < csh) {
            if (i || !csaxes) {
                csctx.moveTo(0, p);
                csctx.lineTo(csw, p);
            }
            i++;
        }
        csctx.stroke();
    }
    if (cstgrid !== 0) { // Triangular grid
        csctx.beginPath();
        csctx.strokeStyle = "rgba(0,0,0,0.1)";
        csctx.lineWidth = 1;
        csctx.lineCap = "butt";
        d = cstgrid * m.a;
        var sqrt3 = Math.sqrt(3);
        a = m.ty / sqrt3;
        b = (csh + m.ty) / sqrt3;
        // down slope first
        i = Math.ceil(-(m.tx + b) / d);
        while ((p = i * d + m.tx) + a < csw) {
            csctx.moveTo(p + a, 0);
            csctx.lineTo(p + b, csh);
            i++;
        }
        // up slope second
        i = Math.ceil(-(m.tx - a) / d);
        while ((p = i * d + m.tx) - b < csw) {
            csctx.moveTo(p - a, 0);
            csctx.lineTo(p - b, csh);
            i++;
        }
        // horizontal last
        d *= 0.5 * sqrt3;
        i = Math.floor(m.ty / d);
        while ((p = i * d - m.ty) < csh) {
            if (i || !csaxes) {
                csctx.moveTo(0, p);
                csctx.lineTo(csw, p);
            }
            i++;
        }
        csctx.stroke();
    }
    if (csaxes) {
        csctx.beginPath();
        csctx.strokeStyle = "rgba(0,0,0,0.2)";
        csctx.lineWidth = 3;
        csctx.lineCap = "butt";
        csctx.lineJoin = "miter";
        csctx.miterLimit = 10;
        csctx.beginPath();
        csctx.moveTo(0, -m.ty);
        csctx.lineTo(csw - 6, -m.ty);
        csctx.moveTo(csw - 13, -5 - m.ty);
        csctx.lineTo(csw - 3, -m.ty);
        csctx.lineTo(csw - 13, 5 - m.ty);
        csctx.moveTo(m.tx, csh);
        csctx.lineTo(m.tx, 6);
        csctx.moveTo(m.tx - 5, 13);
        csctx.lineTo(m.tx, 3);
        csctx.lineTo(m.tx + 5, 13);
        csctx.stroke();
    }
    traceMouseAndScripts();
    //   console.log("NOW UPDATING");
    //  drawgrid();
    csport.greset();
    draw_traces();
    render();
    csctx.restore();
}

function keyEvent(e, script) {
    var evtobj = window.event ? event : e;
    var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
    var actualkey = String.fromCharCode(unicode);
    cskey = actualkey;
    cskeycode = unicode;
    evaluate(script);
    scheduleUpdate();
}

function cs_keydown(e) {
    keyEvent(e, cscompiled.keydown);
}

function cs_keyup(e) {
    keyEvent(e, cscompiled.keyup);
}

function cs_keytyped(e) {
    keyEvent(e, cscompiled.keytyped);
}

function cs_mousedown(e) {
    evaluate(cscompiled.mousedown);
}

function cs_mouseup(e) {
    evaluate(cscompiled.mouseup);
}

function cs_mousedrag(e) {
    evaluate(cscompiled.mousedrag);
}

function cs_mousemove(e) {
    evaluate(cscompiled.mousemove);
}

function cs_mouseclick(e) {
    evaluate(cscompiled.mouseclick);
}

function cs_tick(e) {
    var now = Date.now();
    var delta = Math.min(simcap, now - simtick) * simspeed * simfactor;
    simtick = now;
    var time = simtime + delta;
    if (csPhysicsInited && typeof(lab) !== 'undefined') {
        lab.tick(delta);
    }
    simtime = time;
    if (csanimating) {
        evaluate(cscompiled.tick);
    }
}

function cs_simulationstep(e) {
    evaluate(cscompiled.simulationstep);
}

function cs_simulationstart(e) {
    evaluate(cscompiled.simulationstart);
}

function cs_simulationstop(e) {
    evaluate(cscompiled.simulationstop);
}

function cs_onDrop(lst, pos) {
    dropped = List.turnIntoCSList(lst);
    dropPoint = pos;
    evaluate(cscompiled.ondrop);
    dropped = nada;
    dropPoint = nada;
    scheduleUpdate();
}

function cindy_cancelmove() {
    move = undefined;
}
var version = [0,8,4,77,"g2906920"];
//==========================================
//      Complex Numbers
//==========================================
var CSNumber = {};
CSNumber._helper = {};
CSNumber._helper.roundingfactor = 1e4;
CSNumber._helper.angleroundingfactor = 1e1;

CSNumber._helper.niceround = function(a, roundingfactor) {
    return Math.round(a * roundingfactor) / roundingfactor;
};

CSNumber.niceprint = function(a, roundingfactor) {
    roundingfactor = roundingfactor || CSNumber._helper.roundingfactor;
    if (a.usage === "Angle") {
        return CSNumber._helper.niceangle(a);
    }
    var real = CSNumber._helper.niceround(a.value.real, roundingfactor);
    var imag = CSNumber._helper.niceround(a.value.imag, roundingfactor);
    if (imag === 0) {
        return "" + real;
    }

    if (imag > 0) {
        return "" + real + " + i*" + imag;
    } else {
        return "" + real + " - i*" + (-imag);
    }
};

var angleUnit = instanceInvocationArguments.angleUnit || "°";
var angleUnitName = angleUnit.replace(/\s+/g, ""); // unit may contain space
var TWOPI = Math.PI * 2;
var PERTWOPI = 1 / TWOPI;
var angleUnits = {
    "rad": TWOPI,
    "°": 360,
    "deg": 360,
    "degree": 360,
    "gra": 400,
    "grad": 400,
    "turn": 1,
    "cyc": 1,
    "rev": 1,
    "rot": 1,
    "π": 2,
    "pi": 2,
    "quad": 4,
};

CSNumber._helper.niceangle = function(a) {
    var unit = angleUnits[angleUnitName];
    if (!unit)
        return CSNumber.niceprint(General.withUsage(a, null));
    if (typeof unit === "function")
        return unit(a);
    var num = CSNumber.niceprint(
        CSNumber.realmult(unit * PERTWOPI, a),
        unit > 200 ? CSNumber._helper.angleroundingfactor : null);
    if (num.indexOf("i*") === -1)
        return num + angleUnit;
    return "(" + num + ")" + angleUnit;
};

CSNumber.complex = function(r, i) {
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.real = function(r) {
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': 0
        }
    };
};

CSNumber.zero = CSNumber.real(0);

CSNumber.one = CSNumber.real(1);

CSNumber.infinity = CSNumber.complex(Infinity, Infinity);

CSNumber.nan = CSNumber.complex(NaN, NaN);

CSNumber._helper.input = function(a) {
    if (typeof a === "object")
        return CSNumber.complex(+a.r, +a.i);
    else
        return CSNumber.real(+a);
};

CSNumber.argmax = function(a, b) {
    var n1 = a.value.real * a.value.real + a.value.imag * a.value.imag;
    var n2 = b.value.real * b.value.real + b.value.imag * b.value.imag;
    return (n1 < n2 ? b : a);
};


CSNumber.max = function(a, b) {
    return {
        "ctype": "number",
        "value": {
            'real': Math.max(a.value.real, b.value.real),
            'imag': Math.max(a.value.imag, b.value.imag)
        }
    };
};


CSNumber.min = function(a, b) {
    return {
        "ctype": "number",
        "value": {
            'real': Math.min(a.value.real, b.value.real),
            'imag': Math.min(a.value.imag, b.value.imag)
        }
    };
};


CSNumber.add = function(a, b) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real + b.value.real,
            'imag': a.value.imag + b.value.imag
        }
    };
};

CSNumber.sub = function(a, b) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real - b.value.real,
            'imag': a.value.imag - b.value.imag
        }
    };
};

CSNumber.neg = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': -a.value.real,
            'imag': -a.value.imag
        }
    };
};


CSNumber.re = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real,
            'imag': 0
        }
    };
};

CSNumber.im = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.imag,
            'imag': 0
        }
    };
};

CSNumber.conjugate = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real,
            'imag': -a.value.imag
        }
    };
};


CSNumber.round = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': Math.round(a.value.real),
            'imag': Math.round(a.value.imag)
        }
    };
};

CSNumber.ceil = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': Math.ceil(a.value.real),
            'imag': Math.ceil(a.value.imag)
        }
    };
};

CSNumber.floor = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': Math.floor(a.value.real),
            'imag': Math.floor(a.value.imag)
        }
    };
};


CSNumber.mult = function(a, b) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real * b.value.real - a.value.imag * b.value.imag,
            'imag': a.value.real * b.value.imag + a.value.imag * b.value.real
        }
    };
};

CSNumber.realmult = function(r, c) {
    return {
        "ctype": "number",
        "value": {
            'real': r * c.value.real,
            'imag': r * c.value.imag
        }
    };
};

CSNumber.multiMult = function(arr) {
    var erg = arr[0];
    if (erg.ctype !== "number") return nada;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i].ctype !== "number") {
            return nada;
        }
        erg = CSNumber.mult(erg, arr[i]);
    }

    return erg;
};

CSNumber.abs2 = function(a) {
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real * a.value.real + a.value.imag * a.value.imag,
            'imag': 0
        }
    };
};

CSNumber.abs = function(a) {
    return CSNumber.sqrt(CSNumber.abs2(a));
};


CSNumber.inv = function(a) {
    var s = a.value.real * a.value.real + a.value.imag * a.value.imag;
    return {
        "ctype": "number",
        "value": {
            'real': a.value.real / s,
            'imag': -a.value.imag / s
        }
    };
};


CSNumber.div = function(a, b) {
    var ar = a.value.real;
    var ai = a.value.imag;
    var br = b.value.real;
    var bi = b.value.imag;
    var s = br * br + bi * bi;
    return {
        "ctype": "number",
        "value": {
            'real': (ar * br + ai * bi) / s,
            'imag': (ai * br - ar * bi) / s
        }
    };
};

CSNumber.eps = 1e-10;
CSNumber.epsbig = 1e-6;

CSNumber.snap = function(a) {
    var r = a.value.real;
    var i = a.value.imag;
    if (Math.floor(r + CSNumber.eps) !== Math.floor(r - CSNumber.eps)) {
        r = Math.round(r);
    }
    if (Math.floor(i + CSNumber.eps) !== Math.floor(i - CSNumber.eps)) {
        i = Math.round(i);
    }
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };

};

CSNumber.exp = function(a) {
    var n = Math.exp(a.value.real);
    var r = n * Math.cos(a.value.imag);
    var i = n * Math.sin(a.value.imag);
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.cos = function(a) {
    var rr = a.value.real;
    var ii = a.value.imag;
    var n = Math.exp(ii);
    var imag1 = n * Math.sin(-rr);
    var real1 = n * Math.cos(-rr);
    n = Math.exp(-ii);
    var imag2 = n * Math.sin(rr);
    var real2 = n * Math.cos(rr);
    var i = (imag1 + imag2) / 2.0;
    var r = (real1 + real2) / 2.0;
    //  if (i * i < 1E-30) i = 0;
    //  if (r * r < 1E-30) r = 0;
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.sin = function(a) {
    var rr = a.value.real;
    var ii = a.value.imag;
    var n = Math.exp(ii);
    var imag1 = n * Math.sin(-rr);
    var real1 = n * Math.cos(-rr);
    n = Math.exp(-ii);
    var imag2 = n * Math.sin(rr);
    var real2 = n * Math.cos(rr);
    var r = -(imag1 - imag2) / 2.0;
    var i = (real1 - real2) / 2.0;
    //  if (i * i < 1E-30) i = 0;
    //  if (r * r < 1E-30) r = 0;
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.tan = function(a) {
    var s = CSNumber.sin(a);
    var c = CSNumber.cos(a);
    return CSNumber.div(s, c);
};

CSNumber.arccos = function(a) { //OK hässlich aber tuts.
    var t2 = CSNumber.mult(a, CSNumber.neg(a));
    var tmp = CSNumber.sqrt(CSNumber.add(CSNumber.real(1), t2));
    var tmp1 = CSNumber.add(CSNumber.mult(a, CSNumber.complex(0, 1)), tmp);
    var erg = CSNumber.add(CSNumber.mult(CSNumber.log(tmp1), CSNumber.complex(0, 1)), CSNumber.real(Math.PI * 0.5));
    return General.withUsage(erg, "Angle");
};

CSNumber.arcsin = function(a) { //OK hässlich aber tuts.
    var t2 = CSNumber.mult(a, CSNumber.neg(a));
    var tmp = CSNumber.sqrt(CSNumber.add(CSNumber.real(1), t2));
    var tmp1 = CSNumber.add(CSNumber.mult(a, CSNumber.complex(0, 1)), tmp);
    var erg = CSNumber.mult(CSNumber.log(tmp1), CSNumber.complex(0, -1));
    return General.withUsage(erg, "Angle");
};

CSNumber.arctan = function(a) { //OK hässlich aber tuts.
    var t1 = CSNumber.log(CSNumber.add(CSNumber.mult(a, CSNumber.complex(0, -1)), CSNumber.real(1)));
    var t2 = CSNumber.log(CSNumber.add(CSNumber.mult(a, CSNumber.complex(0, 1)), CSNumber.real(1)));
    var erg = CSNumber.mult(CSNumber.sub(t1, t2), CSNumber.complex(0, 0.5));
    return General.withUsage(erg, "Angle");
};


CSNumber.arctan2 = function(a, b) {
    var erg;
    if (b === undefined)
        erg = CSNumber.real(Math.atan2(a.value.imag, a.value.real));
    else if (CSNumber._helper.isReal(a) && CSNumber._helper.isReal(b))
        erg = CSNumber.real(Math.atan2(b.value.real, a.value.real));
    else {
        var z = CSNumber.add(a, CSNumber.mult(CSNumber.complex(0, 1), b));
        var r = CSNumber.sqrt(CSNumber.add(CSNumber.mult(a, a), CSNumber.mult(b, b)));
        erg = CSNumber.mult(CSNumber.complex(0, -1), CSNumber.log(CSNumber.div(z, r)));
    }
    return General.withUsage(erg, "Angle");
};


CSNumber.sqrt = function(a) {
    var rr = a.value.real;
    var ii = a.value.imag;
    var n = Math.sqrt(Math.sqrt(rr * rr + ii * ii));
    var w = Math.atan2(ii, rr);
    var i = n * Math.sin(w / 2);
    var r = n * Math.cos(w / 2);
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.powRealExponent = function(a, b) {
    var rr = a.value.real;
    var ii = a.value.imag;
    var n = Math.pow(Math.sqrt(rr * rr + ii * ii), b);
    var w = Math.atan2(ii, rr);
    var i = n * Math.sin(w * b);
    var r = n * Math.cos(w * b);
    return {
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    };
};

CSNumber.log = function(a) {
    var re = a.value.real;
    var im = a.value.imag;
    var s = Math.sqrt(re * re + im * im);
    var i = im;


    var imag = Math.atan2(im, re);
    if (i < 0) {
        imag += (2 * Math.PI);
    }
    if (i === 0 && re < 0) {
        imag = Math.PI;
    }
    if (imag > Math.PI) {
        imag -= (2 * Math.PI);
    }
    var real = Math.log(s);

    return CSNumber.snap({
        "ctype": "number",
        "value": {
            'real': real,
            'imag': imag
        }
    });
};


CSNumber.pow = function(a, b) {
    if (CSNumber._helper.isZero(b))
        return CSNumber.one;
    if (CSNumber._helper.isZero(a))
        return CSNumber.zero;
    if (CSNumber._helper.isReal(b))
        return CSNumber.powRealExponent(a, b.value.real);
    return CSNumber.exp(CSNumber.mult(CSNumber.log(a), b));
};


CSNumber.mod = function(a, b) {
    var a1 = a.value.real;
    var a2 = b.value.real;
    var b1 = a.value.imag;
    var b2 = b.value.imag;


    var r = a1 - Math.floor(a1 / a2) * a2;
    var i = b1 - Math.floor(b1 / b2) * b2;
    if (a2 === 0) r = 0;
    if (b2 === 0) i = 0;

    return CSNumber.snap({
        "ctype": "number",
        "value": {
            'real': r,
            'imag': i
        }
    });
};


CSNumber._helper.seed = 'NO';

CSNumber._helper.seedrandom = function(a) {
    a = a - Math.floor(a);
    a = a * 0.8 + 0.1;
    CSNumber._helper.seed = a;
};

CSNumber._helper.rand = function() {
    if (CSNumber._helper.seed === 'NO') {
        return Math.random();
    }
    var a = CSNumber._helper.seed;
    a = Math.sin(1000 * a) * 1000;
    a = a - Math.floor(a);
    CSNumber._helper.seed = a;
    return a;
};

CSNumber._helper.randnormal = function() {
    var a = CSNumber._helper.rand();
    var b = CSNumber._helper.rand();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
};


CSNumber._helper.isEqual = function(a, b) {
    return (a.value.real === b.value.real) && (a.value.imag === b.value.imag);
};

CSNumber._helper.isLessThan = function(a, b) {

    return (a.value.real < b.value.real ||
        (a.value.real === b.value.real && a.value.imag < b.value.imag));
};

CSNumber._helper.compare = function(a, b) {
    if (CSNumber._helper.isLessThan(a, b)) {
        return -1;
    }
    if (CSNumber._helper.isEqual(a, b)) {
        return 0;
    }
    return 1;
};

CSNumber._helper.isAlmostEqual = function(a, b, preci) {
    var eps = CSNumber.eps;
    if (typeof(preci) !== 'undefined') {
        eps = preci;
    }
    var r = a.value.real - b.value.real;
    var i = a.value.imag - b.value.imag;
    return (r < eps) && (r > -eps) && (i < eps) && (i > -eps);
};

CSNumber._helper.isZero = function(a) {
    return (a.value.real === 0) && (a.value.imag === 0);
};

CSNumber._helper.isAlmostZero = function(a) {
    var r = a.value.real;
    var i = a.value.imag;
    return (r < CSNumber.eps) && (r > -CSNumber.eps) && (i < CSNumber.eps) && (i > -CSNumber.eps);
};


CSNumber._helper.isReal = function(a) {
    return (a.value.imag === 0);
};

CSNumber._helper.isAlmostReal = function(a) {
    var i = a.value.imag;
    // This implementation follows Cinderella
    return (i < CSNumber.epsbig) && (i > -CSNumber.epsbig);
};

CSNumber._helper.isNaN = function(a) {
    return (isNaN(a.value.real)) || (isNaN(a.value.imag));
};

CSNumber._helper.isFinite = function(z) {
    return isFinite(z.value.real) && isFinite(z.value.imag);
};


CSNumber._helper.isAlmostImag = function(a) {
    var r = a.value.real;
    // This implementation follows Cinderella
    return (r < CSNumber.epsbig) && (r > -CSNumber.epsbig);
};

CSNumber._helper.z3a = CSNumber.complex(-0.5, 0.5 * Math.sqrt(3));
CSNumber._helper.z3b = CSNumber.complex(-0.5, -0.5 * Math.sqrt(3));
CSNumber._helper.cub1 = {
    "ctype": "list",
    "value": [CSNumber.one, CSNumber.one, CSNumber.one]
};
CSNumber._helper.cub2 = {
    "ctype": "list",
    "value": [CSNumber._helper.z3a, CSNumber.one, CSNumber._helper.z3b]
};
CSNumber._helper.cub3 = {
    "ctype": "list",
    "value": [CSNumber._helper.z3b, CSNumber.one, CSNumber._helper.z3a]
};

/* Solve the cubic equation ax^3 + bx^2 + cx + d = 0.
 * The result is a JavaScript array of three complex numbers satisfying that equation.
 */
CSNumber.solveCubic = function(a, b, c, d) {
    var help = CSNumber._helper.solveCubicHelper(a, b, c, d);
    return [
        List.scalproduct(CSNumber._helper.cub1, help),
        List.scalproduct(CSNumber._helper.cub2, help),
        List.scalproduct(CSNumber._helper.cub3, help)
    ];
};

/* Helps solving the cubic equation ax^3 + bx^2 + cx + d = 0.
 * The returned values are however NOT the solution itself.
 * If this function returns [y1, y2, y3] then the actual solutions are
 * x = z*y1 + y2 + z^2*y3 where z^3 = 1 i.e. z is any of three roots of unity
 */
CSNumber._helper.solveCubicHelper = function(a, b, c, d) {
    // mostly adapted from the cinderella2 source code

    var ar = a.value.real;
    var ai = a.value.imag;
    var br = b.value.real;
    var bi = b.value.imag;
    var cr = c.value.real;
    var ci = c.value.imag;
    var dr = d.value.real;
    var di = d.value.imag;

    var c1 = 1.25992104989487316476721060727822835057025; //2^(1/3)
    var c2 = 1.58740105196819947475170563927230826039149; //2^(2/3)

    // t1 = (4ac - b^2)

    var acr = ar * cr - ai * ci;
    var aci = ar * ci + ai * cr;

    var t1r = 4 * acr - (br * br - bi * bi);
    var t1i = 4 * aci - 2 * br * bi;

    // ab = ab
    var abr = ar * br - ai * bi;
    var abi = ar * bi + ai * br;

    // t3 = t1 *c - 18 ab * d = (4 ac - b*b)*c - 18 abd
    var t3r = t1r * cr - t1i * ci - 18 * (abr * dr - abi * di);
    var t3i = (t1r * ci + t1i * cr) - 18 * (abr * di + abi * dr);

    // aa = 27  a*a
    var aar = 27 * (ar * ar - ai * ai);
    var aai = 54 * (ai * ar);

    // aad =  aa *d = 27 aad
    var aadr = aar * dr - aai * di;
    var aadi = aar * di + aai * dr;

    // t1 = b^2
    var bbr = br * br - bi * bi;
    var bbi = 2 * br * bi;

    // w = b^3
    var wr = bbr * br - bbi * bi;
    var wi = bbr * bi + bbi * br;

    // t2 = aad + 4w = 27aad + 4bbb
    var t2r = aadr + 4 * wr;
    var t2i = aadi + 4 * wi;

    // t1 = 27 *(t3 * c + t2 *d)
    t1r = t3r * cr - t3i * ci + t2r * dr - t2i * di;
    t1i = t3r * ci + t3i * cr + t2r * di + t2i * dr;

    // DIS OK!!

    // w = -2 b^3
    wr *= -2;
    wi *= -2;

    // w = w + 9 a b c
    wr += 9 * (abr * cr - abi * ci);
    wi += 9 * (abr * ci + abi * cr);

    // w = w + -27 a*a d
    wr -= aadr;
    wi -= aadi;

    // t1 = (27 dis).Sqrt()
    t1r *= 27;
    t1i *= 27;
    t2r = Math.sqrt(Math.sqrt(t1r * t1r + t1i * t1i));
    t2i = Math.atan2(t1i, t1r);
    t1i = t2r * Math.sin(t2i / 2);
    t1r = t2r * Math.cos(t2i / 2);

    // w = w + a * dis // sqrt war schon oben
    wr += t1r * ar - t1i * ai;
    wi += t1r * ai + t1i * ar;

    // w ausgerechnet. Jetz w1 und w2
    //     w1.assign(wr,wi);
    //     w2.assign(wr,wi);
    //     w1.sqrt1_3();
    //     w2.sqrt2_3();
    var radius = Math.exp(Math.log(Math.sqrt(wr * wr + wi * wi)) / 3.0);
    var phi = Math.atan2(wi, wr);
    var w1i = radius * Math.sin(phi / 3);
    var w1r = radius * Math.cos(phi / 3);

    radius *= radius;
    phi *= 2;

    var w2i = radius * Math.sin(phi / 3);
    var w2r = radius * Math.cos(phi / 3);

    // x = 2 b^2
    // x = x - 6 ac
    var xr = 2 * bbr - 6 * acr;
    var xi = 2 * bbi - 6 * aci;

    //y.assign(-c2).mul(b).mul(w1);
    var yr = -c2 * (br * w1r - bi * w1i);
    var yi = -c2 * (br * w1i + bi * w1r);

    //    z.assign(c1).mul(w2);
    var zr = c1 * w2r;
    var zi = c1 * w2i;

    //w1.mul(a).mul(3).mul(c2);
    t1r = c2 * 3 * (w1r * ar - w1i * ai);
    t1i = c2 * 3 * (w1r * ai + w1i * ar);

    var s = t1r * t1r + t1i * t1i;

    t2r = (xr * t1r + xi * t1i) / s;
    t2i = (-xr * t1i + xi * t1r) / s;
    xr = t2r;
    xi = t2i;

    t2r = (yr * t1r + yi * t1i) / s;
    t2i = (-yr * t1i + yi * t1r) / s;
    yr = t2r;
    yi = t2i;

    t2r = (zr * t1r + zi * t1i) / s;
    t2i = (-zr * t1i + zi * t1r) / s;
    zr = t2r;
    zi = t2i;

    return List.turnIntoCSList([
        CSNumber.complex(xr, xi),
        CSNumber.complex(yr, yi),
        CSNumber.complex(zr, zi)
    ]);
};


//CSNumber._helper.solveCubicBlinn = function(alpha, beta, gamma, delta) {
//    // Blinn
//    var beta2 = CSNumber.mult(beta,beta);
//    var beta3 = CSNumber.mult(beta2,beta);
//    var gamma2 = CSNumber.mult(gamma,gamma);
//    var gamma3 = CSNumber.mult(gamma2,gamma);
//
//    var d1 = CSNumber.mult(alpha,gamma);
//    d1 = CSNumber.sub(d1, beta2);
//
//    var d2 = CSNumber.mult(alpha,delta);
//    d2 = CSNumber.sub(d2, CSNumber.mult(beta,gamma));
//
//    var d3 = CSNumber.mult(beta,delta);
//    d3 = CSNumber.sub(d3, gamma2);
//
//    var ldel = CSNumber.multiMult([CSNumber.real(4), d1, d3]);
//    ldel = CSNumber.sub(ldel, CSNumber.mult(d2,d2));
//
//    console.log("ldel", ldel.value.real);
//
//    var lambda, mu;
//    // large if else switch in paper
//    if(ldel.value.real < 0){
//        console.log("ldel value real < 0 true");
//        var abar;
//        var dbar;
//        var bbar;
//        var gbar;
//    
//        var ifone = CSNumber.sub(CSNumber.mult(beta3, delta), CSNumber.mult(alpha,gamma3));
//        //console.log("ifone", ifone);
//        if(ifone.value.real >= 0){
//        console.log("ifone value real >= 0 true");
//            abar = CSNumber.clone(alpha);
//            gbar = CSNumber.clone(d1);
//            dbar = CSNumber.add(CSNumber.multiMult([CSNumber.real(-2), beta,d1]), CSNumber.mult(alpha,d2));
//        }
//        else{
//        console.log("ifone value real >= 0 false");
//            abar = delta;
//            gbar = d3;
//            dbar = CSNumber.add(CSNumber.multiMult([CSNumber.real(-1), delta, d2]), CSNumber.multiMult([CSNumber.real(2), gamma, d3]));
//        }
//    
//        var signum = function(a){
//            if(a.value.real > 0) return CSNumber.real(1);
//            else return CSNumber.real(-1);
//        }
//    
//        var T0 = CSNumber.multiMult([CSNumber.real(-1), signum(dbar), CSNumber.abs(abar), CSNumber.sqrt(CSNumber.mult(CSNumber.real(-1), ldel))]);
//        var T1 = CSNumber.add(CSNumber.mult(CSNumber.real(-1), dbar), T0);
//    
//        var pp = CSNumber.powRealExponent(CSNumber.mult(T1, CSNumber.real(0.5)), 1/3);
//    
//        var qq;
//        if(CSNumber.abs(T1, T0).value.real < 0.00000001){
//            console.log("p = -q");
//            qq = CSNumber.mult(CSNumber.real(-1), pp);
//        }
//        else {
//            console.log("p !!!!= -q");
//            qq = CSNumber.div(CSNumber.mult(CSNumber.real(-1),gbar), pp);
//        }
//    
//        var x1;
//        if(gbar.value.real <= 0){ 
//            console.log("gbar.value.real <= 0 true");
//            x1 = CSNumber.add(pp,qq);}
//        else {
//            console.log("gbar.value.real <= 0 false");
//            x1 = CSNumber.mult(CSNumber.real(-1), dbar);
//            var tmp = CSNumber.add(CSNumber.mult(pp,pp), CSNumber.mult(qq,qq));
//            tmp = CSNumber.add(tmp,gbar);
//            x1 = CSNumber.mult(x1, CSNumber.inv(tmp));
//        }
//    
//        var res1;
//        if(ifone.value.real >= 0) {
//            console.log("ifone.value.real >= 0 true")
//            res1 = [CSNumber.sub(x1, beta), alpha];
//        }
//        else {
//            console.log("ifone.value.real >= 0 false")
//            res1 = [CSNumber.mult(CSNumber.real(-1),delta), CSNumber.add(x1, gamma)];
//        }
//    
//        //console.log("res1", res1);
//        lambda = res1[0];
//        mu = res1[1];
//    }   //  if(ldel.value.real < 0)
//    else{
//console.log("ldel.value.real < 0 false");
//        // left side of Blinn's paper
//        //
//        var DAbar = CSNumber.add(CSNumber.multiMult([CSNumber.real(-2), beta, d1]), CSNumber.mult(alpha,d2));
//        var CAbar = CSNumber.clone(d1);
//
//        var sigA = CSNumber.arctan2(CSNumber.mult(alpha, CSNumber.sqrt(ldel)), CSNumber.mult(CSNumber.real(-1), DAbar));
//        sigA = CSNumber.mult(CSNumber.real(1/3), CSNumber.abs(sigA));
//
//        var CAsqrt = CSNumber.multiMult([CSNumber.real(2), CSNumber.sqrt(CSNumber.mult(CSNumber.real(-1), CAbar))]);
//
//        var x1A = CSNumber.mult(CAsqrt, CSNumber.cos(sigA));
//        var x3A = CSNumber.clone(CAsqrt);
//        var x3Ainner = CSNumber.mult(CSNumber.real(-0.5), CSNumber.cos(sigA));
//        // cos - sin
//        x3Ainner = CSNumber.add(x3Ainner, CSNumber.multiMult([CSNumber.real(-0.5), CSNumber.sqrt(CSNumber.real(3)), CSNumber.sin(sigA)]));
//        x3A = CSNumber.mult(CAsqrt, x3Ainner);
//
////        console.log("x1A, x3A, x3Ainner", x1A, x3A,x3Ainner);
//        var ifxa = CSNumber.sub(CSNumber.add(x1A, x3A), CSNumber.mult(CSNumber.real(2), beta));
//
//        var xL;
//        if(ifxa.value.real > 0){
//            console.log( "ifxa.value.real > 0 true");
//            xL = x1A;
//        }
//        else{
//            console.log( "ifxa.value.real > 0 false");
//            xL = x3A;
//        }
//
//        var resL = [CSNumber.sub(xL, beta), alpha];
//
//        // right side of Blinn's paper
//        //
//        var DDbar = CSNumber.add(CSNumber.multiMult([CSNumber.real(-1), delta, d2]), CSNumber.multiMult([CSNumber.real(2),gamma,d3]));
//        var CDbar = CSNumber.clone(d3);
//        var sigD = CSNumber.arctan2(CSNumber.mult(delta, CSNumber.sqrt(ldel)), CSNumber.mult(CSNumber.real(-1), DDbar));
//        sigD = CSNumber.mult(CSNumber.real(1/3), CSNumber.abs(sigD));
//
//        var CDsqrt = CSNumber.multiMult([CSNumber.real(2), CSNumber.sqrt(CSNumber.mult(CSNumber.real(-1), CDbar))]);
//
//        var x1D = CSNumber.mult(CDsqrt, CSNumber.cos(sigD));
//        var x3D = CSNumber.clone(CDsqrt);
//        // cos - sin
//        var x3Dinner = CSNumber.mult(CSNumber.real(-0.5), CSNumber.cos(sigD));
//        x3Dinner = CSNumber.add(x3Dinner, CSNumber.multiMult([CSNumber.real(-0.5), CSNumber.sqrt(CSNumber.real(3)), CSNumber.sin(sigA)]));
//        x3D = CSNumber.mult(CAsqrt,x3Dinner);
//
//        console.log("x1D, x3d, x3Dinner", x1D, x3D, x3Dinner);
//
//        var ifxs = CSNumber.sub(CSNumber.add(x1D, x3D), CSNumber.mult(CSNumber.real(2), gamma));
//
//        var xS;
//        if(ifxa.value.real < 0){
//            console.log("ifxa.value.real < 0 true");
//            xS = x1D;
//        }
//        else{
//            console.log("ifxa.value.real < 0 false");
//            xS = x3D;
//        }
//
//        var resS = [CSNumber.mult(CSNumber.real(-1), delta), CSNumber.add(xS, gamma)];
//
//
////        console.log("resL, resS", resL, resS);
//        // combine both -- lower end of Blinn's paper
//        var EE = CSNumber.mult(resL[1], resS[1]);
//        var FF = CSNumber.multiMult([CSNumber.real(-1), resL[0], resS[1]]);
//        FF = CSNumber.sub(FF, CSNumber.mult(resL[1], resS[0]));
//        var GG = CSNumber.mult(resL[0], resS[0]);
//
// //       console.log("ee, ff, gg", EE, FF, GG);
//        var resg1 = CSNumber.sub(CSNumber.mult(gamma, FF), CSNumber.mult(beta, GG));
//        var resg2 = CSNumber.sub(CSNumber.mult(gamma, EE), CSNumber.mult(beta, FF));
////        var regGes = [resg1, resg2];
//        lambda = resg1;
//        mu = resg2;
//
//        return [lambda, mu];
//
//    } // end else
//};
//==========================================
//      Lists
//==========================================
var List = {};
List._helper = {};

List.turnIntoCSList = function(l) {
    return {
        'ctype': 'list',
        'value': l
    };
};

List.EMPTY = List.turnIntoCSList([]);

List.asList = function(x) {
    if (x.ctype === "list") {
        return x;
    }
    if (x.ctype === "number" || x.ctype === "boolean" || x.ctype === "geo") {
        return List.turnIntoCSList([x]);
    }
    // else: string, undefined, shape, image
    return List.EMPTY;
};

List.realVector = function(l) {
    var erg = [];
    for (var i = 0; i < l.length; i++) {
        erg[i] = {
            "ctype": "number",
            "value": {
                'real': l[i],
                'imag': 0
            }
        };
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

// return n'th unitvector in C^d
List._helper.unitvector = function(d, n) {
    var res = List.zerovector(d);
    res.value[Math.floor(n.value.real - 1)] = CSNumber.real(1);
    return res;
};

List.idMatrix = function(n) {
    var erg = List.zeromatrix(n, n);
    var one = CSNumber.real(1);
    for (var i = 0; i < n.value.real; i++) erg.value[i].value[i] = one;
    return erg;
};


List._helper.flippedidMatrix = function(n) {
    var erg = List.zeromatrix(n, n);
    var one = CSNumber.real(1);
    for (var i = 0; i < n.value.real; i++) erg.value[i].value[n.value.real - i - 1] = one;

    return erg;
};

List.println = function(l) {
    var erg = [];
    for (var i = 0; i < l.value.length; i++) {
        if (l.value[i].ctype === "number") {
            erg[i] = CSNumber.niceprint(l.value[i]);
        } else if (l.value[i].ctype === "list") {
            List.println(l.value[i]);
        } else return nada;
    }

    if (l.value[0].ctype === "number")
        console.log(erg);
};

List.matrix = function(l) {
    return List.turnIntoCSList(l.map(List.turnIntoCSList));
};

List.realMatrix = function(l) {
    var len = l.length;
    var erg = new Array(len);
    for (var i = 0; i < len; i++) {
        erg[i] = List.realVector(l[i]);
    }
    return List.turnIntoCSList(erg);
};

List.ex = List.realVector([1, 0, 0]);
List.ey = List.realVector([0, 1, 0]);
List.ez = List.realVector([0, 0, 1]);


List.linfty = List.realVector([0, 0, 1]);

List.ii = List.turnIntoCSList([CSNumber.complex(1, 0),
    CSNumber.complex(0, 1),
    CSNumber.complex(0, 0)
]);

List.jj = List.turnIntoCSList([CSNumber.complex(1, 0),
    CSNumber.complex(0, -1),
    CSNumber.complex(0, 0)
]);


List.fundDual = List.realMatrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
]);
List.fund = List.realMatrix([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1]
]);


List.sequence = function(a, b) {
    var erg = [];
    var ct = 0;
    for (var i = Math.round(a.value.real); i < Math.round(b.value.real) + 1; i++) {
        erg[ct] = {
            "ctype": "number",
            "value": {
                'real': i,
                'imag': 0
            }
        };
        ct++;
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.pairs = function(a) {
    var erg = [];
    for (var i = 0; i < a.value.length - 1; i++) {
        for (var j = i + 1; j < a.value.length; j++) {
            erg.push({
                'ctype': 'list',
                'value': [a.value[i], a.value[j]]
            });
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.triples = function(a) {
    var erg = [];
    for (var i = 0; i < a.value.length - 2; i++) {
        for (var j = i + 1; j < a.value.length - 1; j++) {
            for (var k = j + 1; k < a.value.length; k++) {
                erg.push({
                    'ctype': 'list',
                    'value': [a.value[i], a.value[j], a.value[k]]
                });
            }
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.cycle = function(a) {
    var erg = [];
    for (var i = 0; i < a.value.length - 1; i++) {
        erg[i] = {
            'ctype': 'list',
            'value': [a.value[i], a.value[i + 1]]
        };
    }
    erg.push({
        'ctype': 'list',
        'value': [a.value[a.value.length - 1], a.value[0]]
    });

    return {
        'ctype': 'list',
        'value': erg
    };
};

List.consecutive = function(a) {
    var erg = [];
    for (var i = 0; i < a.value.length - 1; i++) {
        erg[i] = {
            'ctype': 'list',
            'value': [a.value[i], a.value[i + 1]]
        };
    }

    return {
        'ctype': 'list',
        'value': erg
    };
};

List.reverse = function(a) {
    var erg = new Array(a.value.length);
    for (var i = a.value.length - 1, j = 0; i >= 0; i--, j++) {
        erg[j] = a.value[i];
    }

    return {
        'ctype': 'list',
        'value': erg
    };
};


List.directproduct = function(a, b) {
    var erg = [];
    for (var i = 0; i < a.value.length; i++) {
        for (var j = 0; j < b.value.length; j++) {
            erg.push({
                'ctype': 'list',
                'value': [a.value[i], b.value[j]]
            });
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.concat = function(a, b) {
    var erg = [];
    for (var i = 0; i < a.value.length; i++) {
        erg.push(a.value[i]);
    }
    for (var j = 0; j < b.value.length; j++) {
        erg.push(b.value[j]);
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.prepend = function(b, a) {
    var erg = [];
    erg[0] = b;

    for (var i = 0; i < a.value.length; i++) {
        erg[i + 1] = a.value[i];
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.append = function(a, b) {
    var erg = [];
    for (var i = 0; i < a.value.length; i++) {
        erg[i] = a.value[i];
    }
    erg.push(b);
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.contains = function(a, b) {
    var erg = [];
    var bb = false;
    for (var i = 0; i < a.value.length; i++) {
        var cc = a.value[i];
        if ((eval_helper.equals(cc, b)).value) {
            return {
                'ctype': 'boolean',
                'value': true
            };

        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


List.common = function(a, b) {
    var erg = [];
    var ct = 0;
    for (var i = 0; i < a.value.length; i++) {
        var bb = false;
        var cc = a.value[i];
        for (var j = 0; j < b.value.length; j++) {
            bb = bb || (eval_helper.equals(cc, b.value[j])).value;
        }
        if (bb) {
            erg[ct] = a.value[i];
            ct++;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.remove = function(a, b) {
    var erg = [];
    var ct = 0;
    for (var i = 0; i < a.value.length; i++) {
        var bb = false;
        var cc = a.value[i];
        for (var j = 0; j < b.value.length; j++) {
            bb = bb || (eval_helper.equals(cc, b.value[j])).value;
        }
        if (!bb) {
            erg[ct] = a.value[i];
            ct++;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};

List.sort1 = function(a) {
    var erg = a.value.slice();
    erg.sort(General.compare);
    return List.turnIntoCSList(erg);
};

List._helper.isEqual = function(a1, a2) {
    return List.equals(a1, a2).value;
};

List._helper.isLessThan = function(a, b) {

    var s1 = a.value.length;
    var s2 = b.value.length;
    var i = 0;

    while (!(i >= s1 || i >= s2 || !General.isEqual(a.value[i], b.value[i]))) {
        i++;
    }
    if (i === s1 && i < s2) return true;
    if (i === s2 && i < s1) return false;
    if (i === s1 && i === s2) return false;
    return General.isLessThan(a.value[i], b.value[i]);

};


List._helper.compare = function(a, b) {
    if (List._helper.isLessThan(a, b)) return -1;
    if (List._helper.isEqual(a, b)) return 0;
    return 1;
};

List.equals = function(a1, a2) {
    if (a1.value.length !== a2.value.length) {
        return {
            'ctype': 'boolean',
            'value': false
        };
    }
    var erg = true;
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];

        if (av1.ctype === 'list' && av2.ctype === 'list') {
            erg = erg && List.equals(av1, av2).value;
        } else {
            erg = erg && comp_equals([av1, av2], []).value;

        }
    }
    return {
        'ctype': 'boolean',
        'value': erg
    };
};

List.almostequals = function(a1, a2) {

    if (a1.value.length !== a2.value.length) {
        return {
            'ctype': 'boolean',
            'value': false
        };
    }
    var erg = true;
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];

        if (av1.ctype === 'list' && av2.ctype === 'list') {
            erg = erg && List.almostequals(av1, av2).value;
        } else {
            erg = erg && comp_almostequals([av1, av2], []).value;

        }
    }
    return {
        'ctype': 'boolean',
        'value': erg
    };
};

List._helper.isAlmostReal = function(a1) {
    var erg = true;
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];

        if (av1.ctype === 'list') {
            erg = erg && List._helper.isAlmostReal(av1);
        } else {
            erg = erg && CSNumber._helper.isAlmostReal(av1);
        }
    }
    return erg;
};

List._helper.isAlmostZero = function(lst) {
    for (var i = 0; i < lst.value.length; i++) {
        var elt = lst.value[i];
        if (elt.ctype === 'list') {
            if (!List._helper.isAlmostZero(elt))
                return false;
        } else {
            if (!CSNumber._helper.isAlmostZero(elt))
                return false;
        }
    }
    return true;
};

List._helper.isNaN = function(a1) {
    var erg = false;
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];

        if (av1.ctype === 'list') {
            erg = erg || List._helper.isNaN(av1);
        } else {
            erg = erg || CSNumber._helper.isNaN(av1);
        }
    }
    return erg;
};


List.set = function(a1) {
    var erg = [];
    var ct = 0;

    var erg1 = a1.value.slice();
    erg1.sort(General.compare);

    for (var i = 0; i < erg1.length; i++) {
        if (i === 0 || !(comp_equals([erg[erg.length - 1], erg1[i]], [])).value) {
            erg[ct] = erg1[i];
            ct++;

        }

    }

    return {
        'ctype': 'list',
        'value': erg
    };

};


///////////////////////////


List.maxval = function(a) { //Only for Lists or Lists of Lists that contain numbers
    //Used for Normalize max
    var erg = CSNumber.zero;
    for (var i = 0; i < a.value.length; i++) {
        var v = a.value[i];
        if (v.ctype === "number") {
            erg = CSNumber.argmax(erg, v);
        }
        if (v.ctype === "list") {
            erg = CSNumber.argmax(erg, List.maxval(v));
        }
    }
    return erg;
};

/**
 * Return the index associated with the entry of maximal value
 * @param lst  a List to be iterated over, must not be empty
 * @param fun  a function to apply to each list element, must return a real value
 * @param startIdx start search from here
 * @return the index of the maximal element as a JavaScript number
 */
List.maxIndex = function(lst, fun, startIdx) {
    var sIdx = 0;
    if (startIdx !== undefined) sIdx = startIdx;

    var bestIdx = sIdx;
    var bestVal = fun(lst.value[sIdx]).value.real;
    for (var i = sIdx; i < lst.value.length; ++i) {
        var v = fun(lst.value[i]).value.real;
        if (v > bestVal) {
            bestIdx = i;
            bestVal = v;
        }
    }
    return bestIdx;
};

List.normalizeMax = function(a) {
    var s = CSNumber.inv(List.maxval(a));
    if (!CSNumber._helper.isFinite(s)) return a;
    return List.scalmult(s, a);
};

List.normalizeZ = function(a) {
    var s = CSNumber.inv(a.value[2]);
    return List.scalmult(s, a);
};

List.dehom = function(a) {
    a = a.value.slice();
    var n = a.length - 1;
    var d = CSNumber.inv(a[n]);
    a.length = n;
    for (var i = 0; i < n; ++i)
        a[i] = CSNumber.mult(d, a[i]);
    return List.turnIntoCSList(a);
};

List.normalizeAbs = function(a) {
    var s = CSNumber.inv(List.abs(a));
    return List.scalmult(s, a);
};

List.max = function(a1, a2) {

    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];
        erg[i] = General.max(av1, av2);
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.min = function(a1, a2) {

    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];
        erg[i] = General.min(av1, av2);
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.scaldiv = function(a1, a2) {
    if (a1.ctype !== 'number') {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a2.value.length; i++) {
        var av2 = a2.value[i];
        if (av2.ctype === 'number') {
            erg[i] = General.div(av2, a1);
        } else if (av2.ctype === 'list') {
            erg[i] = List.scaldiv(a1, av2);
        } else {
            erg[i] = nada;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.scalmult = function(a1, a2) {
    if (a1.ctype !== 'number') {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a2.value.length; i++) {
        var av2 = a2.value[i];
        if (av2.ctype === 'number') {
            erg[i] = General.mult(av2, a1);
        } else if (av2.ctype === 'list') {
            erg[i] = List.scalmult(a1, av2);
        } else {
            erg[i] = nada;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.add = function(a1, a2) {

    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];
        if (av1.ctype === 'number' && av2.ctype === 'number') {
            erg[i] = General.add(av1, av2);
        } else if (av1.ctype === 'list' && av2.ctype === 'list') {
            erg[i] = List.add(av1, av2);
        } else {
            erg[i] = nada;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.sub = function(a1, a2) {

    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var erg = [];
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];
        if (av1.ctype === 'number' && av2.ctype === 'number') {
            erg[i] = CSNumber.sub(av1, av2);
        } else if (av1.ctype === 'list' && av2.ctype === 'list') {
            erg[i] = List.sub(av1, av2);
        } else {
            erg[i] = nada;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };
};


List.abs2 = function(a1) {

    var erg = 0;
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = a1.value[i];
        if (av1.ctype === 'number') {
            erg += CSNumber.abs2(av1).value.real;
        } else if (av1.ctype === 'list') {
            erg += List.abs2(av1).value.real;
        } else {
            return nada;
        }
    }

    return {
        "ctype": "number",
        "value": {
            'real': erg,
            'imag': 0
        }
    };
};

List.abs = function(a1) {
    return CSNumber.sqrt(List.abs2(a1));
};


List.normalizeMaxXX = function(a) { //Assumes that list is a number Vector
    var maxv = -10000;
    var nn = CSNumber.real(1);
    for (var i = 0; i < a.value.length; i++) {
        var v = CSNumber.abs(a.value[i]);
        if (v.value.real > maxv) {
            nn = a.value[i];
            maxv = v.value.real;
        }
    }
    return List.scaldiv(nn, a);

};


List.recursive = function(a1, op) {
    var erg = [];
    for (var i = 0; i < a1.value.length; i++) {
        var av1 = evaluateAndVal(a1.value[i]); //Will man hier evaluieren
        if (av1.ctype === 'number') {
            erg[i] = CSNumber[op](av1);
        } else if (av1.ctype === 'list') {
            erg[i] = List[op](av1);
        } else {
            erg[i] = nada;
        }
    }
    return {
        'ctype': 'list',
        'value': erg
    };

};

List.re = function(a) {
    return List.recursive(a, "re");
};


List.neg = function(a) {
    return List.recursive(a, "neg");
};

List.im = function(a) {
    return List.recursive(a, "im");
};

List.conjugate = function(a) {
    return List.recursive(a, "conjugate");
};

List.transjugate = function(a) {
    return List.transpose(List.conjugate(a));
};


List.round = function(a) {
    return List.recursive(a, "round");
};


List.ceil = function(a) {
    return List.recursive(a, "ceil");
};


List.floor = function(a) {
    return List.recursive(a, "floor");
};


List._helper.colNumb = function(a) {
    if (a.ctype !== 'list') {
        return -1;
    }
    var ind = -1;
    for (var i = 0; i < a.value.length; i++) {
        if ((a.value[i]).ctype !== 'list') {
            return -1;
        }
        if (i === 0) {
            ind = (a.value[i]).value.length;
        } else {
            if (ind !== (a.value[i]).value.length)
                return -1;
        }
    }
    return ind;
};

List._helper.isNumberVecN = function(a, n) {

    if (a.ctype !== 'list') {
        return false;
    }
    if (a.value.length !== n) {
        return false;
    }

    for (var i = 0; i < a.value.length; i++) {
        if ((a.value[i]).ctype !== 'number') {
            return false;
        }
    }
    return true;

};


List.isNumberVector = function(a) {
    if (a.ctype !== 'list') {
        return {
            'ctype': 'boolean',
            'value': false
        };
    }
    for (var i = 0; i < a.value.length; i++) {
        if ((a.value[i]).ctype !== 'number') {
            return {
                'ctype': 'boolean',
                'value': false
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': true
    };

};


List.isNumberVectorN = function(a, n) {
    if (a.ctype !== 'list') {
        return {
            'ctype': 'boolean',
            'value': false
        };
    }
    if (a.value)
        for (var i = 0; i < a.value.length; i++) {
            if ((a.value[i]).ctype !== 'number') {
                return {
                    'ctype': 'boolean',
                    'value': false
                };
            }
        }
    return {
        'ctype': 'boolean',
        'value': true
    };

};


List.isNumberMatrix = function(a) {
    if (List._helper.colNumb(a) === -1) {
        return {
            'ctype': 'boolean',
            'value': false
        };
    }

    for (var i = 0; i < a.value.length; i++) {
        if (!List.isNumberVector((a.value[i])).value) {
            return {
                'ctype': 'boolean',
                'value': false
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': true
    };

};


List._helper.isNumberMatrixMN = function(a, m, n) {
    return List.isNumberMatrix(a).value &&
        a.value.length === m &&
        a.value[0].value.length === n;
};


List.scalproduct = function(a1, a2) {
    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var erg = {
        'ctype': 'number',
        'value': {
            'real': 0,
            'imag': 0
        }
    };
    for (var i = 0; i < a2.value.length; i++) {
        var av1 = a1.value[i];
        var av2 = a2.value[i];
        if (av1.ctype === 'number' && av2.ctype === 'number') {
            erg = CSNumber.add(CSNumber.mult(av1, av2), erg);
        } else {
            return nada;
        }
    }

    return erg;
};

List.sesquilinearproduct = function(a1, a2) {
    if (a1.value.length !== a2.value.length) {
        return nada;
    }
    var real = 0;
    var imag = 0;
    for (var i = 0; i < a2.value.length; i++) {
        var av1 = a1.value[i].value;
        var av2 = a2.value[i].value;
        real += av1.real * av2.real + av1.imag * av2.imag;
        imag += av1.real * av2.imag - av1.imag * av2.real;
    }
    return CSNumber.complex(real, imag);
};

List.normSquared = function(a) {
    var erg = 0;
    for (var i = 0; i < a.value.length; i++) {
        var av = a.value[i].value;
        erg += av.real * av.real + av.imag * av.imag;
    }
    return CSNumber.real(erg);
};

List.productMV = function(a, b) {
    if (a.value[0].value.length !== b.value.length) {
        return nada;
    }
    var li = [];
    for (var j = 0; j < a.value.length; j++) {
        var erg = {
            'ctype': 'number',
            'value': {
                'real': 0,
                'imag': 0
            }
        };
        var a1 = a.value[j];
        for (var i = 0; i < b.value.length; i++) {
            var av1 = a1.value[i];
            var av2 = b.value[i];

            if (av1.ctype === 'number' && av2.ctype === 'number') {
                erg = CSNumber.add(CSNumber.mult(av1, av2), erg);
            } else {
                return nada;
            }
        }
        li[j] = erg;
    }
    return List.turnIntoCSList(li);

};


List.productVM = function(a, b) {
    if (a.value.length !== b.value.length) {
        return nada;
    }
    var li = [];
    for (var j = 0; j < b.value[0].value.length; j++) {
        var erg = {
            'ctype': 'number',
            'value': {
                'real': 0,
                'imag': 0
            }
        };
        for (var i = 0; i < a.value.length; i++) {
            var av1 = a.value[i];
            var av2 = b.value[i].value[j];

            if (av1.ctype === 'number' && av2.ctype === 'number') {
                erg = CSNumber.add(CSNumber.mult(av1, av2), erg);
            } else {
                return nada;
            }
        }
        li[j] = erg;
    }
    return List.turnIntoCSList(li);

};

List.productMM = function(a, b) {
    if (a.value[0].value.length !== b.value.length) {
        return nada;
    }
    var li = [];
    for (var j = 0; j < a.value.length; j++) {
        var aa = a.value[j];
        var erg = List.productVM(aa, b);
        li[j] = erg;
    }
    return List.turnIntoCSList(li);
};


List.mult = function(a, b) {

    if (a.value.length === b.value.length && List.isNumberVector(a).value && List.isNumberVector(b).value) {
        return List.scalproduct(a, b);
    }

    if (List.isNumberMatrix(a).value && b.value.length === a.value[0].value.length && List.isNumberVector(b).value) {
        return List.productMV(a, b);
    }

    if (List.isNumberMatrix(b).value && a.value.length === b.value.length && List.isNumberVector(a).value) {
        return List.productVM(a, b);
    }

    if (List.isNumberMatrix(a).value && List.isNumberMatrix(b).value && b.value.length === a.value[0].value.length) {
        return List.productMM(a, b);
    }

    return nada;


};

List.projectiveDistMinScal = function(a, b) {
    var sa = List.abs(a);
    var sb = List.abs(b);

    if (sa.value.real === 0 || sb.value.real === 0)
        return 0;
    var cb = List.conjugate(b);
    var p = List.scalproduct(a, cb);

    // 1 here is derived from cinderella src -- Martin and i are not sure why this is 1 and not infinity
    var np = CSNumber._helper.isAlmostZero(p) ? CSNumber.real(1) : CSNumber.div(p, CSNumber.abs(p));


    var na = List.scaldiv(sa, a);
    var nb = List.scaldiv(sb, b);
    nb = List.scalmult(np, nb);

    var d1 = List.abs(List.add(na, nb));
    var d2 = List.abs(List.sub(na, nb));
    return Math.min(d1.value.real, d2.value.real);

};

function conicMat2Vec(m) {
    var v = m.value;
    var r0 = v[0].value;
    var r1 = v[1].value;
    var r2 = v[2].value;
    return List.turnIntoCSList([
        r0[0],
        CSNumber.add(r0[1], r1[0]),
        CSNumber.add(r0[2], r2[0]),
        r1[1],
        CSNumber.add(r1[2], r2[1]),
        r2[2]
    ]);
}

List.conicDist = function(mat1, mat2) {
    var vec1 = conicMat2Vec(mat1);
    var vec2 = conicMat2Vec(mat2);
    console.log(niceprint(vec1), niceprint(vec2));
    return List.projectiveDistMinScal(vec1, vec2);
};

List.crossOperator = function(a) {

    var x = a.value[0];
    var y = a.value[1];
    var z = a.value[2];
    return List.turnIntoCSList([
        List.turnIntoCSList([CSNumber.zero, CSNumber.neg(z), y]),
        List.turnIntoCSList([z, CSNumber.zero, CSNumber.neg(x)]),
        List.turnIntoCSList([CSNumber.neg(y), x, CSNumber.zero])
    ]);

};

List.cross = function(a, b) { //Assumes that a is 3-Vector
    var x = CSNumber.sub(CSNumber.mult(a.value[1], b.value[2]), CSNumber.mult(a.value[2], b.value[1]));
    var y = CSNumber.sub(CSNumber.mult(a.value[2], b.value[0]), CSNumber.mult(a.value[0], b.value[2]));
    var z = CSNumber.sub(CSNumber.mult(a.value[0], b.value[1]), CSNumber.mult(a.value[1], b.value[0]));
    return List.turnIntoCSList([x, y, z]);
};

List.crossratio3harm = function(a, b, c, d, x) {
    var acx = List.det3(a, c, x);
    var bdx = List.det3(b, d, x);
    var adx = List.det3(a, d, x);
    var bcx = List.det3(b, c, x);
    var numer = CSNumber.mult(acx, bdx);
    var denom = CSNumber.mult(adx, bcx);
    return List.turnIntoCSList([numer, denom]);
};

List.crossratio3 = function(a, b, c, d, x) {
    var cr = List.crossratio3harm(a, b, c, d, x);
    return CSNumber.div(cr.value[0], cr.value[1]);
};

List.veronese = function(a) { //Assumes that a is 3-Vector
    var xx = CSNumber.mult(a.value[0], a.value[0]);
    var yy = CSNumber.mult(a.value[1], a.value[1]);
    var zz = CSNumber.mult(a.value[2], a.value[2]);
    var xy = CSNumber.mult(a.value[0], a.value[1]);
    var xz = CSNumber.mult(a.value[0], a.value[2]);
    var yz = CSNumber.mult(a.value[1], a.value[2]);
    return List.turnIntoSCList([xx, yy, zz, xy, xz, yz]);
};

List.matrixFromVeronese = function(a) { //Assumes that a is 6-Vector
    var xx = a.value[0];
    var yy = a.value[1];
    var zz = a.value[2];
    var xy = CSNumber.realmult(0.5, a.value[3]);
    var xz = CSNumber.realmult(0.5, a.value[4]);
    var yz = CSNumber.realmult(0.5, a.value[5]);
    return List.turnIntoCSList([
        List.turnIntoCSList([xx, xy, xz]),
        List.turnIntoCSList([xy, yy, yz]),
        List.turnIntoCSList([xz, yz, zz])
    ]);

};

List.det2 = function(R1, R2) {
    var tmp = CSNumber.mult(R1.value[0], R2.value[1]);
    tmp = CSNumber.sub(tmp, CSNumber.mult(R1.value[1], R2.value[0]));
    return tmp;
};

List.det3 = function(p, q, r) { //Assumes that a,b,c are 3-Vectors
    //Keine Ahnung ob man das so inlinen will (hab das grad mal so übernommen)

    var re = p.value[0].value.real * q.value[1].value.real * r.value[2].value.real - p.value[0].value.imag * q.value[1].value.imag * r.value[2].value.real - p.value[0].value.imag * q.value[1].value.real * r.value[2].value.imag - p.value[0].value.real * q.value[1].value.imag * r.value[2].value.imag + p.value[2].value.real * q.value[0].value.real * r.value[1].value.real - p.value[2].value.imag * q.value[0].value.imag * r.value[1].value.real - p.value[2].value.imag * q.value[0].value.real * r.value[1].value.imag - p.value[2].value.real * q.value[0].value.imag * r.value[1].value.imag + p.value[1].value.real * q.value[2].value.real * r.value[0].value.real - p.value[1].value.imag * q.value[2].value.imag * r.value[0].value.real - p.value[1].value.imag * q.value[2].value.real * r.value[0].value.imag - p.value[1].value.real * q.value[2].value.imag * r.value[0].value.imag - p.value[0].value.real * q.value[2].value.real * r.value[1].value.real + p.value[0].value.imag * q.value[2].value.imag * r.value[1].value.real + p.value[0].value.imag * q.value[2].value.real * r.value[1].value.imag + p.value[0].value.real * q.value[2].value.imag * r.value[1].value.imag - p.value[2].value.real * q.value[1].value.real * r.value[0].value.real + p.value[2].value.imag * q.value[1].value.imag * r.value[0].value.real + p.value[2].value.imag * q.value[1].value.real * r.value[0].value.imag + p.value[2].value.real * q.value[1].value.imag * r.value[0].value.imag - p.value[1].value.real * q.value[0].value.real * r.value[2].value.real + p.value[1].value.imag * q.value[0].value.imag * r.value[2].value.real + p.value[1].value.imag * q.value[0].value.real * r.value[2].value.imag + p.value[1].value.real * q.value[0].value.imag * r.value[2].value.imag;

    var im = -p.value[0].value.imag * q.value[1].value.imag * r.value[2].value.imag + p.value[0].value.imag * q.value[1].value.real * r.value[2].value.real + p.value[0].value.real * q.value[1].value.real * r.value[2].value.imag + p.value[0].value.real * q.value[1].value.imag * r.value[2].value.real - p.value[2].value.imag * q.value[0].value.imag * r.value[1].value.imag + p.value[2].value.imag * q.value[0].value.real * r.value[1].value.real + p.value[2].value.real * q.value[0].value.real * r.value[1].value.imag + p.value[2].value.real * q.value[0].value.imag * r.value[1].value.real - p.value[1].value.imag * q.value[2].value.imag * r.value[0].value.imag + p.value[1].value.imag * q.value[2].value.real * r.value[0].value.real + p.value[1].value.real * q.value[2].value.real * r.value[0].value.imag + p.value[1].value.real * q.value[2].value.imag * r.value[0].value.real + p.value[0].value.imag * q.value[2].value.imag * r.value[1].value.imag - p.value[0].value.imag * q.value[2].value.real * r.value[1].value.real - p.value[0].value.real * q.value[2].value.real * r.value[1].value.imag - p.value[0].value.real * q.value[2].value.imag * r.value[1].value.real + p.value[2].value.imag * q.value[1].value.imag * r.value[0].value.imag - p.value[2].value.imag * q.value[1].value.real * r.value[0].value.real - p.value[2].value.real * q.value[1].value.real * r.value[0].value.imag - p.value[2].value.real * q.value[1].value.imag * r.value[0].value.real + p.value[1].value.imag * q.value[0].value.imag * r.value[2].value.imag - p.value[1].value.imag * q.value[0].value.real * r.value[2].value.real - p.value[1].value.real * q.value[0].value.real * r.value[2].value.imag - p.value[1].value.real * q.value[0].value.imag * r.value[2].value.real;


    return CSNumber.complex(re, im);
};

List.det4m = function(m) {
    // auto-generated code, see detgen.js
    var body = m.value;
    var row = body[0].value;
    var elt = row[0].value;
    var m00r = +elt.real;
    var m00i = +elt.imag;
    elt = row[1].value;
    var m01r = +elt.real;
    var m01i = +elt.imag;
    elt = row[2].value;
    var m02r = +elt.real;
    var m02i = +elt.imag;
    elt = row[3].value;
    var m03r = +elt.real;
    var m03i = +elt.imag;
    row = body[1].value;
    elt = row[0].value;
    var m10r = +elt.real;
    var m10i = +elt.imag;
    elt = row[1].value;
    var m11r = +elt.real;
    var m11i = +elt.imag;
    elt = row[2].value;
    var m12r = +elt.real;
    var m12i = +elt.imag;
    elt = row[3].value;
    var m13r = +elt.real;
    var m13i = +elt.imag;
    var a01r = m00r * m11r - m00i * m11i - m01r * m10r + m01i * m10i;
    var a01i = m00r * m11i + m00i * m11r - m01r * m10i - m01i * m10r;
    var a02r = m00r * m12r - m00i * m12i - m02r * m10r + m02i * m10i;
    var a02i = m00r * m12i + m00i * m12r - m02r * m10i - m02i * m10r;
    var a03r = m00r * m13r - m00i * m13i - m03r * m10r + m03i * m10i;
    var a03i = m00r * m13i + m00i * m13r - m03r * m10i - m03i * m10r;
    var a12r = m01r * m12r - m01i * m12i - m02r * m11r + m02i * m11i;
    var a12i = m01r * m12i + m01i * m12r - m02r * m11i - m02i * m11r;
    var a13r = m01r * m13r - m01i * m13i - m03r * m11r + m03i * m11i;
    var a13i = m01r * m13i + m01i * m13r - m03r * m11i - m03i * m11r;
    var a23r = m02r * m13r - m02i * m13i - m03r * m12r + m03i * m12i;
    var a23i = m02r * m13i + m02i * m13r - m03r * m12i - m03i * m12r;
    row = body[2].value;
    elt = row[0].value;
    m00r = +elt.real;
    m00i = +elt.imag;
    elt = row[1].value;
    m01r = +elt.real;
    m01i = +elt.imag;
    elt = row[2].value;
    m02r = +elt.real;
    m02i = +elt.imag;
    elt = row[3].value;
    m03r = +elt.real;
    m03i = +elt.imag;
    row = body[3].value;
    elt = row[0].value;
    m10r = +elt.real;
    m10i = +elt.imag;
    elt = row[1].value;
    m11r = +elt.real;
    m11i = +elt.imag;
    elt = row[2].value;
    m12r = +elt.real;
    m12i = +elt.imag;
    elt = row[3].value;
    m13r = +elt.real;
    m13i = +elt.imag;
    var b01r = m00r * m11r - m00i * m11i - m01r * m10r + m01i * m10i;
    var b01i = m00r * m11i + m00i * m11r - m01r * m10i - m01i * m10r;
    var b02r = m00r * m12r - m00i * m12i - m02r * m10r + m02i * m10i;
    var b02i = m00r * m12i + m00i * m12r - m02r * m10i - m02i * m10r;
    var b03r = m00r * m13r - m00i * m13i - m03r * m10r + m03i * m10i;
    var b03i = m00r * m13i + m00i * m13r - m03r * m10i - m03i * m10r;
    var b12r = m01r * m12r - m01i * m12i - m02r * m11r + m02i * m11i;
    var b12i = m01r * m12i + m01i * m12r - m02r * m11i - m02i * m11r;
    var b13r = m01r * m13r - m01i * m13i - m03r * m11r + m03i * m11i;
    var b13i = m01r * m13i + m01i * m13r - m03r * m11i - m03i * m11r;
    var b23r = m02r * m13r - m02i * m13i - m03r * m12r + m03i * m12i;
    var b23i = m02r * m13i + m02i * m13r - m03r * m12i - m03i * m12r;
    return CSNumber.complex(
        a01r * b23r - a01i * b23i -
        a02r * b13r + a02i * b13i +
        a03r * b12r - a03i * b12i +
        a12r * b03r - a12i * b03i -
        a13r * b02r + a13i * b02i +
        a23r * b01r - a23i * b01i,
        a01r * b23i + a01i * b23r -
        a02r * b13i - a02i * b13r +
        a03r * b12i + a03i * b12r +
        a12r * b03i + a12i * b03r -
        a13r * b02i - a13i * b02r +
        a23r * b01i + a23i * b01r);
};

List.eucangle = function(a, b) {
    var tmp1 = List.cross(a, List.linfty);
    var tmp2 = List.cross(b, List.linfty);
    var ca = List.det3(List.ez, tmp1, List.ii);
    var cb = List.det3(List.ez, tmp1, List.jj);
    var cc = List.det3(List.ez, tmp2, List.ii);
    var cd = List.det3(List.ez, tmp2, List.jj);
    var dv = CSNumber.div(CSNumber.mult(ca, cd), CSNumber.mult(cc, cb));
    var ang = CSNumber.log(dv);
    ang = CSNumber.mult(ang, CSNumber.complex(0, 0.5));
    return ang;
};


List.zerovector = function(a) {
    var len = Math.floor(a.value.real);
    var erg = new Array(len);
    for (var i = 0; i < len; i++) {
        erg[i] = 0;
    }
    return List.realVector(erg);
};


List.zeromatrix = function(a, b) {
    var len = Math.floor(a.value.real);
    var erg = new Array(len);
    for (var i = 0; i < len; i++) {
        erg[i] = List.zerovector(b);
    }
    return List.turnIntoCSList(erg);
};

List.vandermonde = function(a) {
    var len = a.value.length;
    var erg = List.zeromatrix(len, len);

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++)
            erg.value[i].value[j] = CSNumber.pow(a.value[i], CSNumber.real(j - 1));
    }
    return erg;
};


List.transpose = function(a) {
    var erg = [];
    var n = a.value[0].value.length;
    var m = a.value.length;
    for (var i = 0; i < n; i++) {
        var li = [];
        for (var j = 0; j < m; j++) {
            li[j] = a.value[j].value[i];
        }
        erg[i] = List.turnIntoCSList(li);
    }
    return List.turnIntoCSList(erg);
};


List.column = function(a, b) {
    var erg = [];
    var n = a.value.length;
    var i = Math.floor(b.value.real - 1);
    for (var j = 0; j < n; j++) {
        erg[j] = a.value[j].value[i];
    }

    return List.turnIntoCSList(erg);
};


List.row = function(a, b) {
    var erg = [];
    var n = a.value[0].value.length;
    var i = Math.floor(b.value.real - 1);
    for (var j = 0; j < n; j++) {
        erg[j] = a.value[i].value[j];
    }

    return List.turnIntoCSList(erg);
};

List.adjoint2 = function(AA) {
    var a = AA.value[0].value[0];
    var b = AA.value[0].value[1];
    var c = AA.value[1].value[0];
    var d = AA.value[1].value[1];

    var erg = new Array(2);
    erg[0] = List.turnIntoCSList([d, CSNumber.neg(b)]);
    erg[1] = List.turnIntoCSList([CSNumber.neg(c), a]);
    erg = List.turnIntoCSList(erg);
    return erg;
};


List.adjoint3 = function(a) {
    var row, elt,
        r11, i11, r12, i12, r13, i13,
        r21, i21, r22, i22, r23, i23,
        r31, i31, r32, i32, r33, i33;
    row = a.value[0].value;
    elt = row[0].value;
    r11 = elt.real;
    i11 = elt.imag;
    elt = row[1].value;
    r12 = elt.real;
    i12 = elt.imag;
    elt = row[2].value;
    r13 = elt.real;
    i13 = elt.imag;
    row = a.value[1].value;
    elt = row[0].value;
    r21 = elt.real;
    i21 = elt.imag;
    elt = row[1].value;
    r22 = elt.real;
    i22 = elt.imag;
    elt = row[2].value;
    r23 = elt.real;
    i23 = elt.imag;
    row = a.value[2].value;
    elt = row[0].value;
    r31 = elt.real;
    i31 = elt.imag;
    elt = row[1].value;
    r32 = elt.real;
    i32 = elt.imag;
    elt = row[2].value;
    r33 = elt.real;
    i33 = elt.imag;
    return {
        'ctype': 'list',
        'value': [{
            'ctype': 'list',
            'value': [{
                'ctype': 'number',
                'value': {
                    'real': r22 * r33 - r23 * r32 - i22 * i33 + i23 * i32,
                    'imag': r22 * i33 - r23 * i32 - r32 * i23 + r33 * i22
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': -r12 * r33 + r13 * r32 + i12 * i33 - i13 * i32,
                    'imag': -r12 * i33 + r13 * i32 + r32 * i13 - r33 * i12
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': r12 * r23 - r13 * r22 - i12 * i23 + i13 * i22,
                    'imag': r12 * i23 - r13 * i22 - r22 * i13 + r23 * i12
                }
            }]
        }, {
            'ctype': 'list',
            'value': [{
                'ctype': 'number',
                'value': {
                    'real': -r21 * r33 + r23 * r31 + i21 * i33 - i23 * i31,
                    'imag': -r21 * i33 + r23 * i31 + r31 * i23 - r33 * i21
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': r11 * r33 - r13 * r31 - i11 * i33 + i13 * i31,
                    'imag': r11 * i33 - r13 * i31 - r31 * i13 + r33 * i11
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': -r11 * r23 + r13 * r21 + i11 * i23 - i13 * i21,
                    'imag': -r11 * i23 + r13 * i21 + r21 * i13 - r23 * i11
                }
            }]
        }, {
            'ctype': 'list',
            'value': [{
                'ctype': 'number',
                'value': {
                    'real': r21 * r32 - r22 * r31 - i21 * i32 + i22 * i31,
                    'imag': r21 * i32 - r22 * i31 - r31 * i22 + r32 * i21
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': -r11 * r32 + r12 * r31 + i11 * i32 - i12 * i31,
                    'imag': -r11 * i32 + r12 * i31 + r31 * i12 - r32 * i11
                }
            }, {
                'ctype': 'number',
                'value': {
                    'real': r11 * r22 - r12 * r21 - i11 * i22 + i12 * i21,
                    'imag': r11 * i22 - r12 * i21 - r21 * i12 + r22 * i11
                }
            }]
        }]
    };
};

List.inverse = function(a) {
    var len = a.value.length;
    if (len !== a.value[0].value.length) {
        console.log("Inverse works only for square matrices");
        return nada;
    }
    if (len === 2) return List.scaldiv(List.det(a), List.adjoint2(a));
    if (len === 3) return List.scaldiv(List.det(a), List.adjoint3(a));

    var LUP = List.LUdecomp(a);
    var n = a.value.length;

    var zero = CSNumber.real(0);
    var one = CSNumber.real(1);

    var ei = List.zerovector(CSNumber.real(n));
    ei.value[0] = one;

    var erg = new Array(n);
    for (var i = 0; i < n; i++) {
        erg[i] = List._helper.LUsolve(LUP, ei);
        ei.value[i] = zero;
        ei.value[i + 1] = one;
    }

    erg = List.turnIntoCSList(erg);
    erg = List.transpose(erg);
    return erg;
};


List.linearsolve = function(a, bb) {
    if (a.value.length === 2) return List.linearsolveCramer2(a, bb);
    else if (a.value.length === 3) return List.linearsolveCramer3(a, bb);
    else return List.LUsolve(a, bb);
};

List.getDiag = function(A) {
    if (A.value.length !== A.value[0].value.length) return nada;
    var erg = new Array(A.value.length);
    for (var i = 0; i < A.value.length; i++) erg[i] = A.value[i].value[i];

    return List.turnIntoCSList(erg);
};


List.getSubDiag = function(A) {
    if (A.value.length !== A.value[0].value.length) return nada;
    var erg = new Array(A.value.length - 1);
    for (var i = 0; i < A.value.length - 1; i++) erg[i] = A.value[i + 1].value[i];

    return List.turnIntoCSList(erg);
};


// get eigenvalues of a 2x2 matrix
List.eig2 = function(AA) {
    var trace = CSNumber.add(AA.value[0].value[0], AA.value[1].value[1]);
    var bdet = List.det2(AA.value[0], AA.value[1]);

    var trace2 = CSNumber.mult(trace, trace);

    var L1 = CSNumber.mult(trace, CSNumber.real(0.5));
    var L2 = L1;

    var mroot = CSNumber.sqrt(CSNumber.sub(CSNumber.div(trace2, CSNumber.real(4)), bdet));


    L1 = CSNumber.add(L1, mroot);
    L2 = CSNumber.sub(L2, mroot);

    return List.turnIntoCSList([L1, L2]);
};

List.eig = function(A, getEigenvectors) {
    var getEv = getEigenvectors || true;

    var i, j;
    var AA = A;
    var cslen = CSNumber.real(AA.value.length);
    var len = cslen.value.real;
    var zero = CSNumber.real(0);

    // the code is not well tested -- perhaps we can use it later
    var useHess = false;
    if (useHess) {
        var Hess = List._helper.toHessenberg(A);
        AA = Hess[1];
    }

    var QRRes = List._helper.QRIteration(AA);
    AA = QRRes[0];

    var QQ = QRRes[1];

    var eigvals = List.getDiag(AA);
    eigvals = List.sort1(eigvals);

    var ID = List.idMatrix(cslen, cslen);


    var eigenvecs = new Array(len);
    eigenvecs = List.turnIntoCSList(eigenvecs);
    if (getEv) {

        // calc eigenvecs
        //
        // if we have a normal matrix QQ holds already the eigenvecs
        //    if( false && List._helper.isNormalMatrix(AA)){
        //        console.log("is normal matrix return QQ");
        //        var QQQ = List.transpose(QQ);
        //        for(i = 0; i < len; i++)
        //        eigenvecs.value[i] = QQQ.value[i];
        //    }
        //    else{
        var useInverseIteration = false; // inverse iteration or nullspace method to obtain eigenvecs

        var MM, xx, nullS, qq;
        if (useInverseIteration) {
            for (qq = 0; qq < len; qq++) {
                xx = List._helper.inverseIteration(AA, eigvals.value[qq]);
                xx = General.mult(QQ, xx);
                eigenvecs.value[qq] = xx;
            }
        } else {
            var ceigval, oeigval, lastevec;
            var count = 0;
            var sameEigVal = false;
            for (qq = 0; qq < len; qq++) {
                if (sameEigVal) {
                    xx = nullS.value[count];
                } else {
                    ceigval = eigvals.value[qq];
                    MM = List.sub(A, List.scalmult(ceigval, ID));
                    nullS = List.nullSpace(MM);
                    xx = nullS.value[0];
                    if (xx !== undefined) lastevec = xx; // if we found a eigenvector != [0...0] may need it again
                }

                // check if we got nothing from nullspace
                if (xx === undefined) {
                    xx = lastevec;
                }
                if (List.abs(xx).value.real < 1e-8 && count === 0) { // couldnt find a vector in nullspace -- should not happen
                    xx = List._helper.inverseIteration(A, eigvals.value[qq]);
                }
                eigenvecs.value[qq] = List._helper.isAlmostZeroVec(xx) ? xx : List.scaldiv(List.abs(xx), xx);


                if (qq < len - 1) {
                    sameEigVal = CSNumber.abs(CSNumber.sub(eigvals.value[qq], eigvals.value[qq + 1])).value.real < 1e-6;
                    if (sameEigVal) count++;
                    else count = 0;
                }
            }

        }

        //} // end else from normal matrices
        eigenvecs = List.transpose(eigenvecs);
    } // end getEv

    return List.turnIntoCSList([eigvals, eigenvecs]);
};

List._helper.isNormalMatrix = function(A) {
    return List.abs(List.sub(A, List.transjugate(A))).value.real < 1e-10;
};

List._helper.QRIteration = function(A, maxIter) {
    var i;
    var AA = A;
    var cslen = CSNumber.real(AA.value.length);
    var Alen = cslen.value.real; // does not change
    var len = cslen.value.real; // changes
    var zero = CSNumber.real(0);
    var Id = List.idMatrix(cslen, cslen);
    var erg = List.zeromatrix(cslen, cslen);
    var QQ = List.idMatrix(cslen, cslen);
    var mIter = maxIter ? maxIter : 2500;

    var QR, kap, shiftId, block, L1, L2, blockeigs, ann, dist1, dist2;
    var numDeflations = 0;
    var eigvals = new Array(len);
    for (i = 0; i < mIter; i++) {

        block = List._helper.getBlock(AA, [len - 2, len - 1], [len - 2, len - 1]);
        blockeigs = List.eig2(block);
        L1 = blockeigs.value[0];
        L2 = blockeigs.value[1];

        var l1n = List.abs(L1).value.real;
        var l2n = List.abs(L2).value.real;


        ann = AA.value[len - 1].value[len - 1];
        dist1 = CSNumber.abs(CSNumber.sub(ann, L1)).value.real;
        dist2 = CSNumber.abs(CSNumber.sub(ann, L2)).value.real;
        kap = dist1 < dist2 ? L1 : L2;

        Id = List.idMatrix(CSNumber.real(len), CSNumber.real(len));
        shiftId = List.scalmult(kap, Id);


        QR = List.QRdecomp(List.sub(AA, shiftId)); // shift


        AA = General.mult(QR.R, QR.Q);
        AA = List.add(AA, shiftId);

        QR.Q = List._helper.buildBlockMatrix(QR.Q, List.idMatrix(CSNumber.real(numDeflations), CSNumber.real(numDeflations)));
        QQ = General.mult(QQ, QR.Q);
        if (CSNumber.abs2(AA.value[AA.value.length - 1].value[AA.value[0].value.length - 2]).value.real < 1e-48 && len > 1) {

            eigvals[Alen - numDeflations - 1] = AA.value[len - 1].value[len - 1]; // get Eigenvalue

            // copy shortening to erg
            for (i = 0; i < len; i++) {
                erg.value[len - 1].value[i] = AA.value[len - 1].value[i];
                erg.value[i].value[len - 1] = AA.value[i].value[len - 1];
            }

            // shorten Matrix AA
            AA = List._helper.getBlock(AA, [0, len - 2], [0, len - 2]);


            numDeflations++;
            len--;
        }

        // break if we have only 1x1 matrix
        if (len === 1) {
            erg.value[0].value[0] = AA.value[0].value[0];
            break;
        }

        if (List._helper.isUpperTriangular(AA)) {
            for (i = 0; i < len; i++) {
                erg.value[i].value[i] = AA.value[i].value[i];
            }
            break;
        }
    }
    return [erg, QQ];
};

// return rank of a square matrix
List.rank = function(A, preci) {
    var QR = List.RRQRdecomp(A, preci);
    return QR.rank;
};

List._helper.isAlmostZeroVec = function(A) {

    var len = A.value.length;
    for (var i = 0; i < len; i++)
        if (!CSNumber._helper.isAlmostZero(A.value[i])) return false;

    return true;
};

List._helper.isLowerTriangular = function(A) {
    var leni = A.value.length;
    var lenj = A.value[0].value.length;
    for (var i = 0; i < leni; i++)
        for (var j = i + 1; j < lenj; j++) {
            if (!CSNumber._helper.isAlmostZero(A.value[i].value[j])) return false;
        }

    return true;
};


List._helper.isUpperTriangular = function(A) {
    return List._helper.isLowerTriangular(List.transpose(A));
};

List._helper.isAlmostId = function(AA) {
    var A = AA;
    var len = A.value.length;
    var cslen = CSNumber.real(len);
    if (len !== A.value[0].value.length) return false;

    var erg = List.sub(A, List.idMatrix(cslen), cslen);
    for (var i = 0; i < len; i++)
        for (var j = 0; j < len; j++) {
            if (CSNumber.abs(erg.value[i].value[j]).value.real > 1e-16) return false;
        }

    return true;
};

List.nullSpace = function(A, precision) {
    var len = A.value.length;
    var QR = List.RRQRdecomp(List.transjugate(A), precision); // QQ of QR is Nullspace of A^H
    var QQ = List.transpose(QR.Q); // transpose makes it easier to handle the vectors
    var nullRank = len - QR.rank.value.real;

    var erg = new Array(nullRank);
    QQ.value.reverse(); // the last vectors are the nullspace vectors

    // get nullVectors
    var vec, tmp;
    for (var i = 0; i < nullRank; i++) {
        vec = QQ.value[i];
        erg[i] = (List.scaldiv(List.abs(vec), vec));
    }


    erg = List.turnIntoCSList(erg);
    if (erg.value.length > 0) return erg;
    else return List.turnIntoCSList([List.zerovector(CSNumber.real(len))]);
};


List._helper.isAlmostDiagonal = function(AA) {
    var erg = AA;
    var len = AA.value.length;
    var cslen = CSNumber.real(len);
    var zero = CSNumber.real(0);
    if (len !== AA.value[0].value.length) return false;


    for (var i = 0; i < len; i++)
        for (var j = 0; j < len; j++) {
            if (i === j) continue;
            if (CSNumber.abs(erg.value[i].value[j]).value.real > 1e-16) return false;
        }

    return true;
};


List._helper.inverseIteration = function(A, shiftinit) {
    console.log("warning: code untested");
    var len = A.value.length;

    // random vector
    var xx = new Array(len);
    for (var i = 0; i < len; i++) {
        xx[i] = 2 * Math.random() - 0.5;
    }
    xx = List.realVector(xx);

    var qk = xx;
    var ID = List.idMatrix(CSNumber.real(len), CSNumber.real(len));

    var shift = shiftinit;
    shift = CSNumber.add(shift, CSNumber.real(0.1 * Math.random() - 0.5)); // add rand to make get a full rank matrix
    for (var ii = 0; ii < 100; ii++) {
        qk = List.scaldiv(List.abs(xx), xx);
        xx = List.LUsolve(List.sub(A, List.scalmult(shift, ID)), JSON.parse(JSON.stringify(qk))); // TODO Use triangular form
    }


    return List.scaldiv(List.abs(xx), xx);
};


// return Hessenberg Matrix H of A and tansformationmatrix QQ
List._helper.toHessenberg = function(A) {
    var AA = JSON.parse(JSON.stringify(A));
    var len = AA.value.length;
    var cslen = CSNumber.real(len - 1);
    var cslen2 = CSNumber.real(len);
    var one = CSNumber.real(1);


    if (List._helper.isUpperTriangular(AA)) return [List.idMatrix(cslen, cslen), A];

    var xx, uu, vv, alpha, e1, Qk, ww, erg;
    var QQ = List.idMatrix(cslen2, cslen2);
    var absxx;
    for (var k = 1; k < len - 1; k++) {

        //xx = List.tranList._helper.getBlock(AA, [k, len+1], [k,k]);
        xx = List.column(AA, CSNumber.real(k));
        xx.value = xx.value.splice(k);
        absxx = List.abs2(xx).value.real;
        if (absxx > 1e-16) {
            Qk = List._helper.getHouseHolder(xx);
            QQ = General.mult(QQ, Qk);

            AA = General.mult(General.mult(Qk, AA), Qk);
        }

        // book keeping
        cslen.value.real--;
    }

    return [QQ, AA];
};

// swap an element in js or cs array
List._helper.swapEl = function(arr, i, j) {
    var tmp;
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        return;
    }
    if (arr.ctype === "list") {
        tmp = arr.value[i];
        arr.value[i] = arr.value[j];
        arr.value[j] = tmp;
        return;
    }
    return;
};

// rank revealing QR decomposition
// see Golub, van Loan -- Matrix Computations - p. 302
List.RRQRdecomp = function(A, precision) {
    var preci = Math.sqrt(CSNumber.eps); // sane default
    if (precision !== undefined) preci = 0.1 * precision.value.real; // 0.1 is a workaround
    var preci2 = preci * preci; // we are working work abs()^2 later on

    var i;
    var AA;
    var len = A.value.length;
    var cslen = CSNumber.real(len);
    var one = CSNumber.real(1);

    var e1 = List._helper.unitvector(CSNumber.real(A.value.length), one);

    var xx, alpha, uu, vv, ww, Qk;
    // QQ is the the normal matrix Q
    var QQ = List.idMatrix(cslen, cslen);

    // this will be the updated matrix
    var AAA = JSON.parse(JSON.stringify(A));


    // get column norms
    var tA = List.transpose(A);
    var norms = new Array(len);
    for (i = 0; i < len; i++) norms[i] = List.abs2(tA.value[i]);
    norms = List.turnIntoCSList(norms);


    var piv = new Array(len);
    for (i = 0; i < len; i++) piv[i] = i;


    var maxIdx = List.maxIndex(norms, CSNumber.abs);
    var tau = norms.value[maxIdx];
    var rank = 0;
    var normxx;
    for (var k = 0; CSNumber.abs2(tau).value.real > 1e-16; k++) {
        rank++;
        List._helper.swapColumn(AAA, k, maxIdx);
        List._helper.swapEl(norms, k, maxIdx);
        List._helper.swapEl(piv, k, maxIdx);
        AA = List._helper.getBlock(AAA, [k, ], [k, ]);
        xx = List.column(AA, one);
        normxx = List.abs2(xx).value.real;
        if (normxx > 1e-8) {
            Qk = List._helper.getHouseHolder(xx);
            // fix dimension
            Qk = List._helper.buildBlockMatrix(List.idMatrix(CSNumber.real(k), CSNumber.real(k)), Qk);
            QQ = General.mult(QQ, List.transjugate(Qk));
            AAA = General.mult(Qk, AAA);
        }

        // update norms 
        for (i = k + 1; i < len; i++) {
            norms.value[i] = CSNumber.sub(norms.value[i], CSNumber.mult(AAA.value[k].value[i], CSNumber.conjugate(AAA.value[k].value[i])));
        }


        maxIdx = List.maxIndex(norms, CSNumber.abs2, k + 1);
        tau = norms.value[maxIdx];

        // after k+2 steps we are done
        if (k + 2 === len) {
            //if (!CSNumber._helper.isAlmostZero(tau)) rank++; // if tau !=0 we have rank + 1
            if (CSNumber.abs(tau).value.real > preci2) rank++; // if tau !=0 we have rank + 1
            break;
        }

        // book keeping
        cslen = CSNumber.sub(cslen, one);
        e1.value = e1.value.splice(0, e1.value.length - 1);
    }

    var R = AAA; //General.mult(List.transjugate(QQ), A);

    return {
        Q: QQ,
        R: R,
        P: List.turnIntoCSList(piv),
        rank: CSNumber.real(rank)
    };
};

List._helper.getHouseHolder = function(xx) {
    var cslen = CSNumber.real(xx.value.length);
    if (List.abs2(xx) < 1e-16) return List.idMatrix(cslen, cslen);

    var alpha, uu, vv, ww, Qk;
    var one = CSNumber.real(1);
    var e1 = List._helper.unitvector(CSNumber.real(xx.value.length), one);

    alpha = List._helper.QRgetAlpha(xx, 0);

    uu = List.sub(xx, List.scalmult(alpha, e1));
    vv = List.scaldiv(List.abs(uu), uu);
    ww = CSNumber.div(List.sesquilinearproduct(xx, vv), List.sesquilinearproduct(vv, xx));

    Qk = List.idMatrix(cslen, cslen);
    Qk = List.sub(Qk, List.scalmult(CSNumber.add(one, ww), List._helper.transposeMult(vv, List.conjugate(vv))));

    return Qk;
};

// reorder matrix by pivots -- used in RRQRdecomp
List._helper.reOrderbyPivots = function(A, piv) {
    var len = A.value.length.length;
    var tA = List.transpose(A);
    var Rerg = new Array(len);
    for (var i = 0; i < piv.length; i++) Rerg[piv[i]] = tA.value[i];
    Rerg = List.turnIntoCSList(Rerg);
    return List.transpose(Rerg);
};

List.QRdecomp = function(A) {
    var AA;
    var len = A.value.length;
    var cslen = CSNumber.real(len);

    if (List._helper.isUpperTriangular(A)) {
        return {
            Q: List.idMatrix(cslen, cslen),
            R: A,
        };
    }

    var one = CSNumber.real(1);

    var e1 = List._helper.unitvector(CSNumber.real(A.value.length), one);

    var xx, alpha, uu, vv, ww, Qk, normxx;
    // QQ is the the normal matrix Q
    var QQ = List.idMatrix(cslen, cslen);

    // this will be the updated matrix
    var AAA = JSON.parse(JSON.stringify(A));
    for (var k = 0;; k++) {
        AA = List._helper.getBlock(AAA, [k, ], [k, ]);

        xx = List.column(AA, one);
        normxx = List.abs2(xx).value.real;
        if (normxx > 1e-8) { // otherwise we already have the desired vector
            Qk = List._helper.getHouseHolder(xx);
            // update QQ
            // fix dimension
            Qk = List._helper.buildBlockMatrix(List.idMatrix(CSNumber.real(k), CSNumber.real(k)), Qk);
            QQ = General.mult(QQ, List.transjugate(Qk));
            AAA = General.mult(Qk, AAA);
        }

        // after k+2 steps we are done
        if (k + 2 === len) {
            break;
        }

        // book keeping
        cslen = CSNumber.sub(cslen, one);
        e1.value = e1.value.splice(0, e1.value.length - 1);
    }

    var R = AAA; //General.mult(List.transjugate(QQ), A);
    return {
        Q: QQ,
        R: R,
    };

};


List._helper.swapColumn = function(A, l, m) {
    var tmp;
    for (var i = 0; i < A.value.length; i++) {
        tmp = A.value[i].value[l];
        A.value[i].value[l] = A.value[i].value[m];
        A.value[i].value[m] = tmp;
    }
};

// build matrices of form
//      A 0
//      0 B
List._helper.buildBlockMatrix = function(A, B) {
    if (A.value.length === 0) return B;
    if (B.value.length === 0) return A;

    var mA = A.value.length;
    var mB = B.value.length;
    var m = mA + mB;

    var nA = A.value[0].value.length;
    var nB = B.value[0].value.length;
    var n = nA + nB;

    var erg = List.zeromatrix(CSNumber.real(m), CSNumber.real(n));

    for (var i = 0; i < A.value.length; i++)
        for (var j = 0; j < A.value[0].value.length; j++)
            erg.value[i].value[j] = A.value[i].value[j];


    for (var ii = 0; ii < B.value.length; ii++)
        for (var jj = 0; jj < B.value[0].value.length; jj++)
            erg.value[mA + ii].value[nA + jj] = B.value[ii].value[jj];

    return erg;
};

List._helper.getBlock = function(A, m, n) {
    var AA = JSON.parse(JSON.stringify(A));
    var m0 = m[0],
        m1;
    var n0 = n[0],
        n1;


    if (m[1] === undefined) m1 = AA.value.length;
    else m1 = m[1];

    if (n[1] === undefined) n1 = AA.value[0].value.length;
    else n1 = n[1];

    // slice does not include end
    m1++;
    n1++;


    AA.value = AA.value.slice(m0, m1);
    for (var i = 0; i < AA.value.length; i++) AA.value[i].value = AA.value[i].value.slice(n0, n1);


    return AA;
};


// return a copy of A with a Block B placed at position pos = [m, n]
List._helper.setBlock = function(A, B, pos) {
    var AA = JSON.parse(JSON.stringify(A));
    var m0 = pos[0];
    var n0 = pos[1];

    var m1 = B.value.length;
    var n1 = B.value[0].value.length;

    for (var i = 0; i < m1; i++)
        for (var j = 0; j < n1; j++) {
            AA.value[m0 + i].value[n0 + j] = B.value[i].value[j];
        }

    return AA;
};

// return u v^T Matrix
List._helper.transposeMult = function(u, v) {
    if (u.value.length !== v.value.length) return nada;
    var len = u.value.length;

    var erg = new Array(len);

    for (var i = 0; i < len; i++) {
        erg[i] = List.scalmult(u.value[i], v);
    }

    return List.turnIntoCSList(erg);

};

List._helper.QRgetAlpha = function(x, k) {
    //    var xx = List.scaldiv(List.abs(x), x);
    //    var atan = CSNumber.real(Math.atan2(xx.value[k].value.real, xx.value[k].value.imag));
    //    var alpha = CSNumber.neg(List.abs(xx));
    //    var expo = CSNumber.exp(CSNumber.mult(atan, CSNumber.complex(0, 1)));
    //    alpha = CSNumber.mult(alpha, expo);
    //    return alpha;

    // real version
    if (x.value[k].value.real < 0) return List.abs(x);
    return CSNumber.neg(List.abs(x));
};

List.LUdecomp = function(AA) {
    //    if(List._helper.isUpperTriangular){
    //        var len = AA.value.length;
    //
    //        var PP =  new Array(len);
    //        for(var ii = 0; ii < len; ii++) PP[ii] =ii;
    //        return {
    //            LU: AA,
    //            P: PP,
    //            TransPos: 0 
    //        };
    //    }
    var A = JSON.parse(JSON.stringify(AA)); // TODO: get rid of this cloning
    var i, j, k, absAjk, Akk, Ak, Pk, Ai;
    var tpos = 0;
    var max;
    var n = A.value.length,
        n1 = n - 1;
    var P = new Array(n);
    for (k = 0; k < n; ++k) {
        Pk = k;
        Ak = A.value[k];
        max = CSNumber.abs(Ak.value[k]).value.real;
        for (j = k + 1; j < n; ++j) {
            absAjk = CSNumber.abs(A.value[j].value[k]);
            if (max < absAjk.value.real) {
                max = absAjk.value.real;
                Pk = j;
            }
        }
        if (max < CSNumber.eps) console.log("Warning: singular matrix!");

        P[k] = Pk;

        if (Pk !== k) {
            A.value[k] = A.value[Pk];
            A.value[Pk] = Ak;
            Ak = A.value[k];
            tpos++;
        }

        Akk = Ak.value[k];

        for (i = k + 1; i < n; ++i) {
            A.value[i].value[k] = CSNumber.div(A.value[i].value[k], Akk);
        }

        for (i = k + 1; i < n; ++i) {
            Ai = A.value[i];
            for (j = k + 1; j < n1; ++j) {
                Ai.value[j] = CSNumber.sub(Ai.value[j], CSNumber.mult(Ai.value[k], Ak.value[j]));
                ++j;
                Ai.value[j] = CSNumber.sub(Ai.value[j], CSNumber.mult(Ai.value[k], Ak.value[j]));
            }
            if (j === n1) Ai.value[j] = CSNumber.sub(Ai.value[j], CSNumber.mult(Ai.value[k], Ak.value[j]));
        }
    }

    return {
        LU: A,
        P: P,
        TransPos: tpos
    };
};

List.LUsolve = function(A, b) {
    var LUP = List.LUdecomp(A);
    return List._helper.LUsolve(LUP, b);
};

List._helper.LUsolve = function(LUP, bb) {
    var b = JSON.parse(JSON.stringify(bb)); // TODO: get rid of this cloning
    var i, j;
    var LU = LUP.LU;
    var n = LU.value.length;
    var x = JSON.parse(JSON.stringify(b));

    var P = LUP.P;
    var Pi, LUi, LUii, tmp;

    for (i = n - 1; i !== -1; --i) x.value[i] = b.value[i];
    for (i = 0; i < n; ++i) {
        Pi = P[i];
        if (P[i] !== i) {
            tmp = x.value[i];
            x.value[i] = x.value[Pi];
            x.value[Pi] = tmp;
        }

        LUi = LU.value[i];
        for (j = 0; j < i; ++j) {
            x.value[i] = CSNumber.sub(x.value[i], CSNumber.mult(x.value[j], LUi.value[j]));
        }
    }

    for (i = n - 1; i >= 0; --i) {
        LUi = LU.value[i];
        for (j = i + 1; j < n; ++j) {
            x.value[i] = CSNumber.sub(x.value[i], CSNumber.mult(x.value[j], LUi.value[j]));
        }

        x.value[i] = CSNumber.div(x.value[i], LUi.value[i]);
    }

    return x;
};


// currently not working because of bug in RRQR 

/*
List.linearsolveQR = function(a,bb){
    // QR solve
    var m = a.value.length;
    var n = a.value[0].value.length;
    if(m !== n) console.log("Warning: only implemented for square matrices!");
    var res = List.RRQRdecomp(a);
    if(res.rank.value.real !== m) console.log("Warning: matrix is singular!");
    var RR = res.R;
    var pivs = res.P.value;

    console.log("Q", niceprint(res.Q));
    console.log("R", niceprint(res.R));
    console.log("pivs", pivs);
    console.log("Q*R", niceprint(General.mult(res.Q,RR)));

    // switch by pivots
    var zz = General.mult(List.transjugate(res.Q), bb);


    // backsubstitution
    var xx, resvec = [];
   for(var i = m - 1; i >=0; i--){
       resvec[i] = zz.value[i];

       for(var j = m-1; j > i; j--){
           resvec[i] = CSNumber.sub(resvec[i] , CSNumber.mult(RR.value[i].value[j],resvec[j]));
       }
        resvec[i] = CSNumber.div(resvec[i], RR.value[i].value[i]);
   }

   // reorder pivots
   var ges = new Array(m);
   
   for(var k = 0; k < m; k++){
       ges[k] = resvec[pivs[k]];
   }
   ges = List.turnIntoCSList(ges);

   return ges;
};
*/

List.linearsolveCramer2 = function(A, b) {
    var A1 = List.column(A, CSNumber.real(1));
    var A2 = List.column(A, CSNumber.real(2));

    var detA = List.det2(A1, A2);
    if (CSNumber._helper.isZero(detA)) console.log("A is not regular!");

    var x1 = List.det2(b, A2);
    x1 = CSNumber.div(x1, detA);
    var x2 = List.det2(A1, b);
    x2 = CSNumber.div(x2, detA);

    var res = List.turnIntoCSList([x1, x2]);
    return res;
};

List.linearsolveCramer3 = function(A, b) {
    var A1 = List.column(A, CSNumber.real(1));
    var A2 = List.column(A, CSNumber.real(2));
    var A3 = List.column(A, CSNumber.real(3));

    var detA = List.det3(A1, A2, A3);
    if (CSNumber._helper.isZero(detA)) console.log("A is not regular!");

    var x1 = List.det3(b, A2, A3);
    var x2 = List.det3(A1, b, A3);
    var x3 = List.det3(A1, A2, b);

    var res = List.turnIntoCSList([x1, x2, x3]);
    res = List.scaldiv(detA, res);

    return res;
};

// solve general linear system A*x=b by transforming A to sym. pos. definite
List.linearsolveCGNR = function(AA, bb) {
    var transA = List.transpose(AA);
    var A = General.mult(transA, AA);
    var b = General.mult(transA, bb);

    return List.linearsolveCG(A, b);
};

// only for sym. pos. definite matrices!
List.linearsolveCG = function(A, b) {
    var r, p, alp, x, bet, Ap, rback;

    x = b;
    r = List.sub(b, General.mult(A, b));
    p = r;

    var maxIter = Math.ceil(1.2 * A.value.length);
    var count = 0;
    while (count < maxIter) {
        count++;
        Ap = General.mult(A, p);

        alp = List.scalproduct(r, r);
        rback = alp;
        alp = CSNumber.div(alp, List.scalproduct(p, Ap));

        x = List.add(x, General.mult(alp, p));
        r = List.sub(r, General.mult(alp, Ap));

        if (List.abs(r).value.real < CSNumber.eps) break;

        bet = List.scalproduct(r, r);
        bet = CSNumber.div(bet, rback);
        p = List.add(r, General.mult(bet, p));
    }
    if (count >= maxIter) console.log("CG did not converge");

    return x;
};


List.det = function(a) {
    if (a.value.length === 1) return a.value[0].value[0];
    if (a.value.length === 2) return List.det2(a.value[0], a.value[1]);
    if (a.value.length === 3) {
        return List.det3(a.value[0], a.value[1], a.value[2]);
    }
    if (a.value.length === 4) {
        return List.det4m(a);
    }

    var n = a.value.length,
        ret = CSNumber.real(1),
        i, j, k, A = JSON.parse(JSON.stringify(a)),
        Aj, Ai, alpha, temp, k1, k2, k3;
    for (j = 0; j < n - 1; j++) {
        k = j;
        for (i = j + 1; i < n; i++) {
            if (CSNumber.abs(A.value[i].value[j]).value.real > CSNumber.abs(A.value[k].value[j]).value.real) {
                k = i;
            }
        }
        if (k !== j) {
            temp = A.value[k];
            A.value[k] = A.value[j];
            A.value[j] = temp;
            ret = CSNumber.neg(ret);
        }
        Aj = A.value[j];
        for (i = j + 1; i < n; i++) {
            Ai = A.value[i];
            alpha = CSNumber.div(Ai.value[j], Aj.value[j]);
            for (k = j + 1; k < n - 1; k += 2) {
                k1 = k + 1;
                Ai.value[k] = CSNumber.sub(Ai.value[k], CSNumber.mult(Aj.value[k], alpha));
                Ai.value[k1] = CSNumber.sub(Ai.value[k1], CSNumber.mult(Aj.value[k1], alpha));
            }
            if (k !== n) {
                Ai.value[k] = CSNumber.sub(Ai.value[k], CSNumber.mult(Aj.value[k], alpha));
            }
        }
        if (CSNumber._helper.isZero(Aj.value[j])) {
            return CSNumber.real(0);
        }
        ret = CSNumber.mult(ret, Aj.value[j]);
    }
    var result = CSNumber.mult(ret, A.value[j].value[j]);
    return result;
};

List.LUdet = function(a) {
    var LUP = List.LUdecomp(a);
    var LU = LUP.LU;

    var len = LU.value.length;

    var det = LU.value[0].value[0];
    for (var i = 1; i < len; i++) det = CSNumber.mult(det, LU.value[i].value[i]);

    // take care of sign
    if (LUP.TransPos % 2 === 1) det = CSNumber.neg(det);

    return det;
};


///Feldzugriff
///TODO Will man das in list haben??

List.getField = function(li, key) {
    var n;

    if (key === "homog") {
        if (List._helper.isNumberVecN(li, 3)) {
            return li;
        }
        if (List._helper.isNumberVecN(li, 2)) {
            return List.turnIntoCSList([
                li.value[0], li.value[1], CSNumber.real(1)
            ]);
        }
    }

    if (key === "xy") {
        if (List._helper.isNumberVecN(li, 2)) {
            return li;
        }
        if (List._helper.isNumberVecN(li, 3)) {
            return List.turnIntoCSList([
                CSNumber.div(li.value[0], li.value[2]),
                CSNumber.div(li.value[1], li.value[2])
            ]);
        }
    }

    if (key === "x") {
        if (List.isNumberVector(li)) {
            n = li.value.length;
            if (n > 0 && n !== 3) {
                return li.value[0];
            }
            if (n === 3) {
                if (li.usage === "Point") {
                    return CSNumber.div(li.value[0], li.value[2]);
                } else {
                    return li.value[0];
                }
            }
        }
    }

    if (key === "y") {
        if (List.isNumberVector(li)) {
            n = li.value.length;
            if (n > 1 && n !== 3) {
                return li.value[1];
            }
            if (n === 3) {
                if (li.usage === "Point") {
                    return CSNumber.div(li.value[1], li.value[2]);
                } else {
                    return li.value[1];
                }
            }
        }
    }

    if (key === "z") {
        if (List.isNumberVector(li)) {
            n = li.value.length;
            if (n > 2) {
                return li.value[2];
            }
        }
    }

    return nada;

};

List.nil = List.turnIntoCSList([]);

List.ofGeos = function(geos) {
    return List.turnIntoCSList(geos.map(function(geo) {
        return {
            ctype: "geo",
            value: geo
        };
    }));
};
/*
 * Dictionaries map CindyScript values to CindyScript values.
 * Since values are immutable and support equality testing,
 * they can be easily used as keys.
 *
 * Internally the map is an object with properties
 * whose names are stringified versions of the CindyScript keys.
 * The values are objects which hold the original key and value.
 * To keep overhead low, avoid deeply nested data structures as keys.
 */

var Dict = {};

Dict.key = function(x) {
    if (x.ctype === "string")
        return "s" + x.value.length + ":" + x.value + ";";
    if (x.ctype === "number")
        return "n" + x.value.real + "," + x.value.imag + ";";
    if (x.ctype === "list")
        return "l" + x.value.length + ":" +
            x.value.map(Dict.key).join(",") + ";";
    if (x.ctype === "boolean")
        return "b" + x.value + ";";
    if (x.ctype === "dict") {
        var keys = Object.keys(x.value).sort();
        return "d" + keys.length + ":" + keys.join(",") + ";";
    }
    if (x.ctype !== "undefined")
        csconsole.err("Bad dictionary key: " + niceprint(x));
    return "undef";
};

// Dictionary creation is a two-step process:
// one creates a dictionary (empty or cloned), then adds entries to it.
// During this process, the dictionary is considered mutable.
// But as for all other CindyJS data structures, once the construction
// is complete and other code gains access to the dictionary,
// the dictionary is considered immutable.

Dict.create = function() {
    return {
        ctype: "dict",
        value: {} // or Map or Object.create(null)?
    };
};

Dict.clone = function(dict) {
    var res = Dict.create();
    for (var key in dict.value)
        if (dict.value.hasOwnProperty(key))
            res.value[key] = dict.value[key];
    return res;
};

// Modifying operation
Dict.put = function(dict, key, value) {
    dict.value[Dict.key(key)] = {
        key: key,
        value: value
    };
};

Dict.get = function(dict, key, dflt) {
    var kv = dict.value[Dict.key(key)];
    if (kv) return kv.value; // check kv.key?
    return dflt;
};

Dict.niceprint = function(dict) {
    return "{" + Object.keys(dict.value).sort().map(function(key) {
        var kv = dict.value[key];
        return niceprint(kv.key) + ":" + niceprint(kv.value);
    }).join(", ") + "}";
};
//==========================================
//      Things that apply to several types
//==========================================
var General = {};
General._helper = {};

General.order = {
    undefined: 0,
    boolean: 1,
    number: 2,
    term: 3,
    atomic: 4,
    variable: 5,
    geo: 6,
    string: 7,
    list: 8
};

General.string = function(s) {
    return {
        ctype: "string",
        value: s
    };
};

General.bool = function(b) {
    return {
        ctype: "boolean",
        value: b
    };
};

General.not = function(v) {
    return General.bool(!v.value);
};

General.isLessThan = function(a, b) {
    return General.compare(a, b) === -1;

};


General.isEqual = function(a, b) {
    return General.compare(a, b) === 0;

};


General.compareResults = function(a, b) {
    return General.compare(a.result, b.result);
};

General.compare = function(a, b) {
    if (a.ctype !== b.ctype) {
        return (General.order[a.ctype] - General.order[b.ctype]);
    }
    if (a.ctype === 'number') {
        return CSNumber._helper.compare(a, b);
    }
    if (a.ctype === 'list') {
        return List._helper.compare(a, b);
    }
    if (a.ctype === 'geo') {
        if (a.value.name === b.value.name) {
            return 0;
        }
        if (a.value.name < b.value.name) {
            return -1;
        }
        return 1;
    }
    if (a.ctype === 'string') {
        if (a.value === b.value) {
            return 0;
        }
        if (a.value < b.value) {
            return -1;
        }
        return 1;
    }
    if (a.ctype === 'boolean') {
        if (a.value === b.value) {
            return 0;
        }
        if (a.value === false) {
            return -1;
        }
        return 1;
    }

};

General.add = function(v0, v1) {
    if (v0.ctype === 'void' && v1.ctype === 'number') { // unary plus
        return v1;
    }
    if (v0.ctype === 'void' && v1.ctype === 'list') { // unary plus
        return v1;
    }
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.add(v0, v1);
    }
    if (v0.ctype === 'string' || v1.ctype === 'string') {
        return {
            "ctype": "string",
            "value": niceprint(v0) + niceprint(v1)
        };
    }

    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.add(v0, v1);
    }
    return nada;
};

General.sub = function(v0, v1) {
    if (v0.ctype === 'void' && v1.ctype === 'number') { // unary minus
        return CSNumber.neg(v1);
    }
    if (v0.ctype === 'void' && v1.ctype === 'list') { // unary minus
        return List.neg(v1);
    }
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.sub(v0, v1);
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.sub(v0, v1);
    }
    return nada;
};

General.mult = function(v0, v1) {

    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.mult(v0, v1);
    }
    if (v0.ctype === 'number' && v1.ctype === 'list') {
        return List.scalmult(v0, v1);
    }
    if (v0.ctype === 'list' && v1.ctype === 'number') {
        return List.scalmult(v1, v0);
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.mult(v0, v1);
    }
    return nada;

};

General.div = function(v0, v1) {

    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.div(v0, v1);
    }
    if (v0.ctype === 'list' && v1.ctype === 'number') {
        return List.scaldiv(v1, v0);
    }
    return nada;
};


General.max = function(v0, v1) {

    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.max(v0, v1);
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.max(v0, v1);
    }
    return nada;

};


General.min = function(v0, v1) {

    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.min(v0, v1);
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.min(v0, v1);
    }
    return nada;

};

General.wrap = function(v) {
    if (typeof v === "number") {
        return CSNumber.real(v);
    }
    if (typeof v === "object" && v.length !== undefined) { //evtl in List ziehen
        var li = [];
        for (var i = 0; i < v.length; i++) {
            li[i] = General.wrap(v[i]);
        }
        return List.turnIntoCSList(li);
    }
    if (typeof v === "string") {
        return {
            ctype: "string",
            value: v
        };
    }
    if (typeof v === "boolean") {
        return {
            ctype: "boolean",
            value: v
        };
    }
    return nada;
};

General.unwrap = function(v) {
    if (typeof v !== "object" || v === null) {
        return v;
    }
    if (Array.isArray(v)) {
        return v.map(General.unwrap);
    }
    switch (v.ctype) {
        case "string":
        case "boolean":
            return v.value;
        case "number":
            if (v.value.imag === 0)
                return v.value.real;
            return {
                r: v.value.real,
                i: v.value.imag
            };
        case "list":
            return v.value.map(General.unwrap);
        default:
            return null;
    }
};

General.withUsage = function(v, usage) {
    // shallow copy with possibly new usage
    return {
        "ctype": v.ctype,
        "value": v.value,
        "usage": usage
    };
};

General.wrapJSON = function(data) {
    switch (typeof data) {
        case "number":
            return CSNumber.real(data);
        case "string":
            return General.string(data);
        case "boolean":
            return General.bool(data);
        case "object":
            if (data === null)
                return nada;
            if (Array.isArray(data))
                return List.turnIntoCSList(data.map(General.wrapJSON));
            var d = Dict.create();
            for (var k in data)
                Dict.put(d, General.string(k), General.wrapJSON(data[k]));
            return d;
        default:
            console.log(
                "Failed to convert " + (typeof data) + " to CindyJS data type");
            return nada;
    }
};

General.identity = function(x) {
    return x;
};
/*jshint -W069 */

var myfunctions = {};

var infixmap = {};
infixmap[':'] = operator_not_implemented(':');
// infixmap['.'] not needed thanks to definitionDot special handling
infixmap['°'] = postfix_numb_degree;
infixmap['_'] = infix_take;
infixmap['^'] = infix_pow;
infixmap['√'] = infix_sqrt;
infixmap['*'] = infix_mult;
infixmap['×'] = infix_cross;
infixmap['/'] = infix_div;
infixmap['+'] = infix_add;
infixmap['-'] = infix_sub;
infixmap['!'] = prefix_not;
infixmap['=='] = comp_equals;
infixmap['~='] = comp_almostequals;
infixmap['~<'] = comp_ult;
infixmap['~>'] = comp_ugt;
infixmap['=:='] = operator_not_implemented('=:=');
infixmap['>='] = comp_ge;
infixmap['<='] = comp_le;
infixmap['~>='] = comp_uge;
infixmap['~<='] = comp_ule;
infixmap['>'] = comp_gt;
infixmap['<'] = comp_lt;
infixmap['<>'] = comp_notequals;
infixmap['∈'] = infix_in;
infixmap['∉'] = infix_nin;
infixmap['&'] = infix_and;
infixmap['%'] = infix_or;
infixmap['!='] = comp_notequals;
infixmap['~!='] = comp_notalmostequals;
infixmap['..'] = infix_sequence;
infixmap['++'] = infix_concat;
infixmap['--'] = infix_remove;
infixmap['~~'] = infix_common;
infixmap[':>'] = infix_append;
infixmap['<:'] = infix_prepend;
infixmap['='] = infix_assign;
infixmap[':='] = infix_define;
infixmap[':=_'] = postfix_undefine;
infixmap['::='] = operator_not_implemented('::=');
// infixmap['->'] not needed thanks to modifierOp special handling
infixmap[';'] = infix_semicolon;

/*jshint +W069 */

function operator_not_implemented(name) {
    var first = true;
    return function(args, modifs) {
        if (first) {
            console.error("Operator " + name + " is not supported yet.");
            first = false;
        }
        return nada;
    };
}

//****************************************************************
// this function is responsible for evaluation an expression tree
//****************************************************************

function niceprint(a) {
    if (typeof a === 'undefined') {
        return '_??_';
    }
    if (a === null) {
        return '_???_';
    }
    if (a.ctype === 'undefined') {
        return '___';
    }
    if (a.ctype === 'number') {
        return CSNumber.niceprint(a);
    }
    if (a.ctype === 'string') {
        return a.value;
    }
    if (a.ctype === 'boolean') {
        return a.value;
    }
    if (a.ctype === 'list') {
        var erg = "[";
        for (var i = 0; i < a.value.length; i++) {
            erg = erg + niceprint(evaluate(a.value[i]));
            if (i !== a.value.length - 1) {
                erg = erg + ', ';
            }

        }
        return erg + "]";
    }
    if (a.ctype === 'dict') {
        return Dict.niceprint(a);
    }
    if (a.ctype === 'function') {
        return 'FUNCTION';

    }
    if (a.ctype === 'infix') {
        return 'INFIX';
    }
    if (a.ctype === 'modifier') {
        return a.key + '->' + niceprint(a.value);
    }
    if (a.ctype === 'shape') {
        return a.type;
    }

    if (a.ctype === 'error') {
        return "Error: " + a.message;
    }
    if (a.ctype === 'variable') {
        return niceprint(namespace.getvar(a.name));
    }

    if (a.ctype === 'geo') {
        return a.value.name;
    }
    if (a.ctype === 'image') {
        return "IMAGE";
    }


    return "_?_";

}


//TODO Eventuell auslagern
//*******************************************************
//this is the container for self-defined functions
//Distinct form evaluator for code clearness :-)
//*******************************************************
function evalmyfunctions(name, args, modifs) {
    var tt = myfunctions[name];
    if (tt === undefined) {
        return nada;
    }

    var set = [],
        i;

    for (i = 0; i < tt.arglist.length; i++) {
        set[i] = evaluate(args[i]);
    }
    for (i = 0; i < tt.arglist.length; i++) {
        namespace.newvar(tt.arglist[i].name);
        namespace.setvar(tt.arglist[i].name, set[i]);
    }
    namespace.pushVstack("*");
    var erg = evaluate(tt.body);
    namespace.cleanVstack();
    for (i = 0; i < tt.arglist.length; i++) {
        namespace.removevar(tt.arglist[i].name);
    }
    return erg;
    //                    return tt(args,modifs);
}

//*******************************************************
//this function evaluates a concrete function
//*******************************************************
var evaluator = {};
var eval_helper = {};

eval_helper.evaluate = function(name, args, modifs) {
    if (myfunctions.hasOwnProperty(name))
        return evalmyfunctions(name, args, modifs);
    var f = evaluator[name];
    if (f)
        return f(args, modifs);
    // This following is legacy code, and should be removed
    // once all functions are converted to their arity-aware form.
    // Unless we introduce something like variadic functions.
    var n = name.lastIndexOf("$");
    if (n !== -1) {
        n = name.substr(0, n);
        f = evaluator[n];
        if (f)
            return f(args, modifs);
    }
    csconsole.err("Called undefined function " + n + " (as " + name + ")");
    return nada;
};


eval_helper.equals = function(v0, v1) { //Und nochmals un-OO
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return {
            'ctype': 'boolean',
            'value': (v0.value.real === v1.value.real) &&
                (v0.value.imag === v1.value.imag)
        };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value === v1.value)
        };
    }
    if (v0.ctype === 'boolean' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (v0.value === v1.value)
        };
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        var erg = List.equals(v0, v1);
        return erg;
    }
    if (v0.ctype === 'geo' && v1.ctype === 'geo') {
        return {
            'ctype': 'boolean',
            'value': (v0.value === v1.value)
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};
//==========================================
//      Namespace and Vars
//==========================================

var namespace = {};

// Initialize preset variables
namespace.vars = (function() {
    var preset = {
        pi: CSNumber.real(Math.PI),
        'π': CSNumber.real(Math.PI),
        i: CSNumber.complex(0, 1),
        'true': General.bool(true),
        'false': General.bool(false),
        '#': nada,
        'nil': List.turnIntoCSList([]),
        'newline': General.string('\n'),
        'tab': General.string('\t'),
    };
    var vars = [];
    for (var name in preset)
        vars[name] = [preset[name]];
    return vars;
})();

namespace.isVariable = function(name) {
    return this.vars.hasOwnProperty(name);
};

namespace.create = function(name) {
    if (this.vars.hasOwnProperty(name))
        return this.vars[name];
    var v = [null];
    this.vars[name] = v;
    return v;
};

namespace.newvar = function(name) {
    var v = this.vars[name];
    v.push(nada); // nada not null for deeper levels
    return v;
};

namespace.removevar = function(name) {
    var stack = this.vars[name];
    if (stack.length === 0) console.error("Removing non-existing " + name);
    stack.pop();
    if (stack.length === 0) console.warn("Removing last " + name);
};


namespace.setvar = function(name, val) {
    var stack = this.vars[name];
    if (stack.length === 0) console.error("Setting non-existing variable " + name);
    if (val === undefined) {
        console.error("Setting variable " + name + " to undefined value");
        val = nada;
    }
    if (val.ctype === 'undefined') {
        stack[stack.length - 1] = val;
        return;
    }
    var erg = val;
    if (erg === null) erg = nada; // explicit setting does lift unset state
    stack[stack.length - 1] = erg;
};

namespace.undefinedWarning = {};

namespace.getvar = function(name) {

    var stack = this.vars[name];
    if (stack.length === 0) console.error("Getting non-existing variable " + name);
    var erg = stack[stack.length - 1];
    if (erg === null) {
        if (csgeo.csnames.hasOwnProperty(name)) {
            return {
                'ctype': 'geo',
                'value': csgeo.csnames[name]
            };
        } else {
            if (console && console.log && this.undefinedWarning[name] === undefined) {
                this.undefinedWarning[name] = true;
                console.log("Warning: Accessing undefined variable: " + name);
            }
        }
        return nada;
    }
    return erg;
};

namespace.dump = function(name) {
    var stack = this.vars[name];
    console.log("*** Dump " + name);

    for (var i = 0; i < stack.length; i++) {
        console.log(i + ":> " + niceprint(stack[i]));
    }
};

namespace.vstack = [];

namespace.pushVstack = function(v) {
    this.vstack.push(v);

};
namespace.popVstack = function() {
    this.vstack.pop();
};

namespace.cleanVstack = function() {
    var st = this.vstack;
    while (st.length > 0 && st[st.length - 1] !== "*") {
        this.removevar(st[st.length - 1]);
        st.pop();
    }
    if (st.length > 0) {
        st.pop();
    }
};
var csAssets = {};
//*************************************************************
// and here are the accessors for properties and elements
//*************************************************************

var Accessor = {};

Accessor.generalFields = { // fieldname translation
    color: "color",
    colorhsb: "",
    size: "size",
    alpha: "alpha",
    fillcolor: "fillcolor",
    fillalpha: "fillalpha",
    isshowing: "isshowing",
    visible: "visible",
    name: "name",
    caption: "caption",
    trace: "",
    tracelength: "",
    selected: "",
    labeled: "labeled",
    labelled: "labeled",
};

Accessor.getGeoField = function(geoname, field) {
    if (typeof csgeo.csnames[geoname] !== 'undefined') {
        return Accessor.getField(csgeo.csnames[geoname], field);
    }
    return nada;
};


Accessor.setGeoField = function(geoname, field, value) {
    if (typeof csgeo.csnames[geoname] !== 'undefined') {
        return Accessor.setField(csgeo.csnames[geoname], field, value);
    }
    return nada;
};

Accessor.getField = function(geo, field) {
    var erg;
    if (geo.kind === "P") {
        if (field === "xy") {
            erg = List.dehom(geo.homog);
            return General.withUsage(erg, "Point");
        }

        if (field === "homog") {
            return General.withUsage(geo.homog, "Point");
        }

        if (field === "x") {
            return CSNumber.div(geo.homog.value[0], geo.homog.value[2]);
        }

        if (field === "y") {
            return CSNumber.div(geo.homog.value[1], geo.homog.value[2]);
        }
    }
    if (geo.kind === "L" || geo.kind === "S") {
        if (field === "homog") {
            return General.withUsage(geo.homog, "Line");
        }
        if (field === "angle") {
            erg = List.eucangle(List.ey, geo.homog);
            return General.withUsage(erg, "Angle");
        }
        if (field === "slope") {
            return CSNumber.neg(CSNumber.div(
                geo.homog.value[0], geo.homog.value[1]));
        }

    }
    if (geo.kind === "Tr") {
        if (field === "matrix") {
            return geo.matrix;
        }
    }
    if (geo.kind === "C") {
        if (field === "radius") { //Assumes that we have a circle
            var s = geo.matrix;
            var ax = s.value[0].value[0];
            var az = s.value[0].value[2];
            var bz = s.value[1].value[2];
            var cz = s.value[2].value[2];


            var n = CSNumber.mult(ax, ax);
            var aa = CSNumber.div(az, ax);
            var bb = CSNumber.div(bz, ax);
            var cc = CSNumber.div(cz, ax);
            erg = CSNumber.sqrt(CSNumber.sub(CSNumber.add(CSNumber.mult(aa, aa),
                    CSNumber.mult(bb, bb)),
                cc));

            return erg;
        }

        if (field === "size") {
            return geo.size;
        }

        if (field === "matrix") {
            return geo.matrix;
        }

        if (field === "center") {
            var cen = geoOps._helper.CenterOfConic(geo.matrix);
            cen = List.dehom(cen);
            return General.withUsage(cen, "Point");
        }

        if (field === "dualMatrix") {
            return List.normalizeMax(List.adjoint3(geo.matrix));
        }
    }
    if (geo.kind === "Text") {
        if (field === "pressed") {
            if (geo.checkbox) {
                return General.bool(geo.checkbox.checked);
            } else {
                return General.bool(false);
            }
        }
        if (field === "xy") {
            erg = List.dehom(geo.homog);
            return General.withUsage(erg, "Point");
        }
        if (field === "homog") {
            return General.withUsage(geo.homog, "Point");
        }
        if (field === "x") {
            return CSNumber.div(geo.homog.value[0], geo.homog.value[2]);
        }
        if (field === "y") {
            return CSNumber.div(geo.homog.value[1], geo.homog.value[2]);
        }
    }
    if (field === "trace") {
        return General.bool(!!geo.drawtrace);
    }
    if (Accessor.generalFields[field]) { //must be defined as an actual string
        erg = geo[Accessor.generalFields[field]];
        if (erg && erg.ctype) {
            return erg;
        } else if (typeof erg !== "object") {
            return General.wrap(erg);
        } else {
            return nada;
        }
    }
    //Accessors for masses
    if (geo.behavior) {
        if (field === "mass" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.mass);
        }
        if (field === "radius" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.radius);
        }
        if (field === "charge" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.charge);
        }
        if (field === "friction" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.friction);
        }
        if (field === "vx" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.vx);
        }
        if (field === "vy" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.vy);
        }
        if (field === "v" && geo.behavior.type === "Mass") {
            return List.realVector([geo.behavior.vx, geo.behavior.vy]);
        }
        if (field === "fx" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.fx);
        }
        if (field === "fy" && geo.behavior.type === "Mass") {
            return CSNumber.real(geo.behavior.fy);
        }
        if (field === "f" && geo.behavior.type === "Mass") {
            return List.realVector([geo.behavior.fx, geo.behavior.fy]);
        }

    }
    var getter = geoOps[geo.type]["get_" + field];
    if (typeof getter === "function") {
        return getter(geo);
    }
    return nada;


};

Accessor.setField = function(geo, field, value) {
    var dir;

    if (field === "color" && List._helper.isNumberVecN(value, 3)) {
        geo.color = value;
    }
    if (field === "size" && value.ctype === "number") {
        geo.size = value;
    }
    if (field === "alpha" && value.ctype === "number") {
        geo.alpha = value;
    }
    if (field === "fillcolor" && List._helper.isNumberVecN(value, 3)) {
        geo.fillcolor = value;
    }
    if (field === "fillalpha" && value.ctype === "number") {
        geo.fillalpha = value;
    }
    if (field === "visible") {
        if (value.ctype === "boolean") {
            geo.visible = value.value;
        }
    }
    if (field === "pinned") {
        if (value.ctype === "boolean") {
            geo.pinned = value.value;
        }
    }
    if (field === "labeled" || field === "labelled") {
        if (value.ctype === "boolean") {
            geo.labeled = value.value;
        }
    }
    if (field === "printlabel") {
        geo.printname = niceprint(value);
    }
    if (field === "trace") {
        if (value.ctype === "boolean") {
            if (value.value && !geo.drawtrace) {
                geo.drawtrace = true;
                setupTraceDrawing(geo);
            } else {
                geo.drawtrace = value.value;
            }
        }
    }

    if (geo.kind === "P" && geo.movable) {
        if (field === "xy" && List._helper.isNumberVecN(value, 2)) {
            movepointscr(geo, List.turnIntoCSList([value.value[0], value.value[1], CSNumber.real(1)]), "homog");
        }

        if (field === "xy" && List._helper.isNumberVecN(value, 3)) {
            movepointscr(geo, value, "homog");
        }

        if (field === "x" && value.ctype === "number") {
            movepointscr(geo, List.turnIntoCSList([CSNumber.mult(value, geo.homog.value[2]), geo.homog.value[1], geo.homog.value[2]]), "homog");
        }

        if (field === "y" && value.ctype === "number") {
            movepointscr(geo, List.turnIntoCSList([geo.homog.value[0], CSNumber.mult(value, geo.homog.value[2]), geo.homog.value[2]]), "homog");
        }

        if (field === "homog" && List._helper.isNumberVecN(value, 3)) {
            movepointscr(geo, value, "homog");
        }
    }

    if (field === "homog" && geo.kind === "L" && geo.movable && List._helper.isNumberVecN(value, 3)) {
        movepointscr(geo, value, "homog");
    }

    if (geo.kind === "Text") {
        if (field === "pressed" && value.ctype === "boolean" && geo.checkbox) {
            geo.checkbox.checked = value.value;
        }
        if (geo.movable) { // Texts may move without tracing
            if (field === "xy") {
                if (List._helper.isNumberVecN(value, 2)) {
                    geo.homog = List.turnIntoCSList([value.value[0], value.value[1], CSNumber.real(1)]);
                } else if (List._helper.isNumberVecN(value, 3)) {
                    geo.homog = value;
                }
            } else if (field === "homog" && List._helper.isNumberVecN(value, 3)) {
                geo.homog = value;
            } else if (field === "x" && value.ctype === "number") {
                geo.homog = List.turnIntoCSList([CSNumber.mult(value, geo.homog.value[2]), geo.homog.value[1], geo.homog.value[2]]);
            } else if (field === "y" && value.ctype === "number") {
                geo.homog = List.turnIntoCSList([geo.homog.value[0], CSNumber.mult(value, geo.homog.value[2]), geo.homog.value[2]]);
            }
        }
    }
    if (geo.behavior) {
        if (field === "mass" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.mass = value.value.real;
        }
        if (field === "mass" && geo.behavior.type === "Sun" && value.ctype === "number") {
            geo.behavior.mass = value.value.real;
        }
        if (field === "friction" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.friction = value.value.real;
        }
        if (field === "charge" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.charge = value.value.real;
        }
        if (field === "radius" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.radius = value.value.real;
        }
        if (field === "vx" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.vx = value.value.real;
        }
        if (field === "vy" && geo.behavior.type === "Mass" && value.ctype === "number") {
            geo.behavior.vy = value.value.real;
        }
        if (field === "v" && geo.behavior.type === "Mass" && List._helper.isNumberVecN(value, 2)) {
            geo.behavior.vx = value.value[0].value.real;
            geo.behavior.vy = value.value[1].value.real;
        }
    }
    var setter = geoOps[geo.type]["set_" + field];
    if (typeof setter === "function") {
        return setter(geo, value);
    }


};
//*******************************************************
// and here are the definitions of the operators
//*******************************************************

evaluator.version$0 = function(args, modifs) {
    var ver = ["CindyJS"].concat(version);
    return List.turnIntoCSList(ver.map(General.wrap));
};

evaluator.clearconsole$0 = function(args, modifs) {
    csconsole.clear();
};

evaluator.err$1 = function(args, modifs) { //OK
    var varname = '',
        s;
    if (args[0].ctype === 'variable') {
        varname = args[0].name;
        s = namespace.getvar(args[0].name);
    } else {
        s = args[0];
    }
    s = varname + " ===> " + niceprint(evaluate(s));

    csconsole.err(s);

    return nada;
};

evaluator.errc$1 = function(args, modifs) { //OK
    var s;
    if (args[0].ctype === 'variable') {
        // var s=evaluate(args[0].value[0]);
        s = evaluate(namespace.getvar(args[0].name));
        console.log(args[0].name + " ===> " + niceprint(s));

    } else {
        s = evaluate(args[0]);
        console.log(" ===> " + niceprint(s));

    }
    return nada;
};

evaluator.print$1 = function(args, modifs) {
    csconsole.out(niceprint(evaluate(args[0])), true);
    return nada;
};

evaluator.println$1 = function(args, modifs) {
    csconsole.out(niceprint(evaluate(args[0])));
    return nada;
};

evaluator.assert$2 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'boolean') {
        if (v0.value === false)
            return evaluator.println$1([args[1]], modifs);
    } else {
        csconsole.err("Condition for assert is not boolean");
    }
    return nada;
};

evaluator.dump$1 = function(args, modifs) {

    dump(args[0]);
    return nada;
};


evaluator.repeat$2 = function(args, modifs) { //OK
    return evaluator.repeat$3([args[0], null, args[1]], modifs);
};

evaluator.repeat$3 = function(args, modifs) { //OK
    function handleModifs() {
        var erg;

        if (modifs.start !== undefined) {
            erg = evaluate(modifs.start);
            if (erg.ctype === 'number') {
                startb = true;
                start = erg.value.real;
            }
        }
        if (modifs.step !== undefined) {
            erg = evaluate(modifs.step);
            if (erg.ctype === 'number') {
                stepb = true;
                step = erg.value.real;
            }
        }
        if (modifs.stop !== undefined) {
            erg = evaluate(modifs.stop);
            if (erg.ctype === 'number') {
                stopb = true;
                stop = erg.value.real;
            }
        }


        if (startb && !stopb && !stepb) {
            stop = step * n + start;
        }

        if (!startb && stopb && !stepb) {
            start = -step * (n - 1) + stop;
            stop += step;
        }

        if (!startb && !stopb && stepb) {
            stop = step * n + start;
        }

        if (startb && stopb && !stepb) {
            step = (stop - start) / (n - 1);
            stop += step;
        }

        if (startb && !stopb && stepb) {
            stop = step * n + start;
        }

        if (!startb && stopb && stepb) {
            start = -step * (n - 1) + stop;
            stop += step;
        }

        if (startb && stopb && stepb) {
            stop += step;
        }
    }


    var v1 = evaluateAndVal(args[0]);

    var lauf = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            lauf = args[1].name;
        }
    }
    if (v1.ctype !== 'number') {
        return nada;
    }
    var n = Math.round(v1.value.real); //TODO: conversion to real!!!
    var step = 1;
    var start = 1;
    var stop = n + 1;
    var startb = false;
    var stopb = false;
    var stepb = false;
    handleModifs();
    if ((start <= stop && step > 0) || (start >= stop && step < 0))
        if (startb && stopb && stepb) {
            n = Math.floor((stop - start) / step);
        }

    namespace.newvar(lauf);
    var erg = nada;
    for (var i = 0; i < n; i++) {
        namespace.setvar(lauf, {
            'ctype': 'number',
            'value': {
                'real': i * step + start,
                'imag': 0
            }
        });
        erg = evaluate(args[2]);
    }
    namespace.removevar(lauf);

    return erg;

};


evaluator.while$2 = function(args, modifs) { //OK

    var prog = args[1];
    var test = args[0];
    var bo = evaluate(test);
    var erg = nada;
    while (bo.ctype !== 'list' && bo.value) {
        erg = evaluate(prog);
        bo = evaluate(test);
    }

    return erg;

};


evaluator.apply$2 = function(args, modifs) { //OK
    return evaluator.apply$3([args[0], null, args[1]], modifs);
};

evaluator.apply$3 = function(args, modifs) { //OK

    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype !== 'list') {
        return nada;
    }

    var lauf = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            lauf = args[1].name;
        }
    }

    var li = v1.value;
    var erg = [];
    namespace.newvar(lauf);
    for (var i = 0; i < li.length; i++) {
        namespace.setvar(lauf, li[i]);
        erg[i] = evaluate(args[2]);
    }
    namespace.removevar(lauf);

    return {
        'ctype': 'list',
        'value': erg
    };

};

evaluator.forall$2 = function(args, modifs) { //OK
    return evaluator.forall$3([args[0], null, args[1]], modifs);
};

evaluator.forall$3 = function(args, modifs) { //OK

    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype !== 'list') {
        return nada;
    }

    var lauf = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            lauf = args[1].name;
        }
    }

    var li = v1.value;
    var erg = [];
    namespace.newvar(lauf);
    var res;
    for (var i = 0; i < li.length; i++) {
        namespace.setvar(lauf, li[i]);
        res = evaluate(args[2]);
        erg[i] = res;
    }
    namespace.removevar(lauf);

    return res;

};

evaluator.select$2 = function(args, modifs) { //OK
    return evaluator.select$3([args[0], null, args[1]], modifs);
};

evaluator.select$3 = function(args, modifs) { //OK

    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype !== 'list') {
        return nada;
    }

    var lauf = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            lauf = args[1].name;
        }
    }

    var li = v1.value;
    var erg = [];
    namespace.newvar(lauf);
    var ct = 0;
    for (var i = 0; i < li.length; i++) {
        namespace.setvar(lauf, li[i]);
        var res = evaluate(args[2]);
        if (res.ctype === 'boolean') {
            if (res.value === true) {
                erg[ct] = li[i];
                ct++;
            }
        }
    }
    namespace.removevar(lauf);

    return {
        'ctype': 'list',
        'value': erg
    };

};


evaluator.flatten$1 = function(args, modifs) {
    function recurse(lst, level) {
        if (level === -1 || lst.ctype !== "list")
            return lst;
        return [].concat.apply([], lst.value.map(function(elt) {
            return recurse(elt, level - 1);
        }));
    }
    var lst = evaluateAndVal(args[0]);
    if (lst.ctype !== "list")
        return lst;
    var levels = modifs.levels;
    if (levels === undefined) {
        levels = 1;
    } else {
        levels = evaluate(levels);
        if (levels.ctype === "number")
            levels = levels.value.real;
        else if (levels.ctype === "string" && levels.value === "all")
            levels = -2;
        else
            levels = 1;
    }
    return {
        'ctype': 'list',
        'value': recurse(lst, levels)
    };
};


function infix_semicolon(args, modifs) { //OK
    var u0 = (args[0].ctype === 'void');
    var u1 = (args[1].ctype === 'void');

    if (u0 && u1) {
        return nada;
    }
    if (!u0 && u1) {
        return evaluate(args[0]);
    }
    if (!u0 && !u1) {
        evaluate(args[0]); //Wegen sideeffects
    }
    if (!u1) {
        return evaluate(args[1]);
    }
    return nada;
}


evaluator.createvar$1 = function(args, modifs) { //OK
    if (args[0].ctype === 'variable') {
        var v = args[0].name;
        namespace.newvar(v);
    }
    return nada;
};

evaluator.local = function(args, modifs) { //VARIADIC!

    for (var i = 0; i < args.length; i++) {
        if (args[i].ctype === 'variable') {
            var v = args[i].name;
            namespace.newvar(v);
        }
    }

    return nada;

};


evaluator.removevar$1 = function(args, modifs) { //OK
    var ret = evaluate(args[0]);
    if (args[0].ctype === 'variable') {
        var v = args[0].name;
        namespace.removevar(v);
    }
    return ret;
};


evaluator.release = function(args, modifs) { //VARIADIC!

    if (args.length === 0)
        return nada;


    var ret = evaluate(args[args.length - 1]);

    for (var i = 0; i < args.length; i++) {
        if (args[i].ctype === 'variable') {
            var v = args[i].name;
            namespace.removevar(v);
        }
    }

    return ret;

};

evaluator.regional = function(args, modifs) { //VARIADIC!

    for (var i = 0; i < args.length; i++) {
        if (args[i].ctype === 'variable') {
            var v = args[i].name;
            namespace.newvar(v);
            namespace.pushVstack(v);
        }
    }
    return nada;

};


evaluator.genList = function(args, modifs) { //VARIADIC!
    return List.turnIntoCSList(args.map(evaluate));
};


eval_helper.assigntake = function(data, what) { //TODO: Bin nicht ganz sicher obs das so tut
    var lhs = data.args[0];
    var where = evaluate(lhs);
    var ind = evaluateAndVal(data.args[1]);
    var rhs = nada;

    if (where.ctype === 'list' || where.ctype === 'string') {
        var ind1 = Math.floor(ind.value.real);
        if (ind1 < 0) {
            ind1 = where.value.length + ind1 + 1;
        }
        if (ind1 > 0 && ind1 <= where.value.length) {
            if (where.ctype === 'list') {
                var lst = where.value.slice();
                lst[ind1 - 1] = evaluate(what);
                rhs = List.turnIntoCSList(lst);
            } else {
                var str = where.value;
                str = str.substring(0, ind1 - 1) +
                    niceprint(evaluate(what)) +
                    str.substring(ind1, str.length);
                rhs = General.string(str);
            }
        }
    }
    infix_assign([lhs, rhs]);
};


eval_helper.assigndot = function(data, what) {
    var where = evaluate(data.obj);
    var field = data.key;
    if (where.ctype === 'geo' && field) {
        Accessor.setField(where.value, field, evaluateAndVal(what));
    }

    return nada;

};


eval_helper.assignlist = function(vars, vals) {
    var n = vars.length;
    var m = vals.length;
    if (m < n) n = m;

    for (var i = 0; i < n; i++) {
        var name = vars[i];
        var val = vals[i];
        infix_assign([name, val], []);

    }


};


function infix_assign(args, modifs) {

    var u0 = (args[0].ctype === 'undefined');
    var u1 = (args[1].ctype === 'undefined');
    var v1 = evaluate(args[1]);
    if (u0 || u1) {
        return nada;
    }
    if (args[0].ctype === 'variable') {
        namespace.setvar(args[0].name, v1);
    } else if (args[0].ctype === 'infix') {
        if (args[0].oper === '_') {
            // Copy on write
            eval_helper.assigntake(args[0], v1);
        } else {
            console.error("Can't use infix expression as lvalue");
        }
    } else if (args[0].ctype === 'field') {
        eval_helper.assigndot(args[0], v1);
    } else if (args[0].ctype === 'function' && args[0].oper === 'genList') {
        if (v1.ctype === "list") {
            eval_helper.assignlist(args[0].args, v1.value);
        } else {
            console.error("Expected list in rhs of assignment");
        }
    } else {
        console.error("Left hand side of assignment is not a recognized lvalue");
    }
    return v1;
}


function infix_define(args, modifs, self) {

    var u0 = (args[0].ctype === 'undefined');
    var u1 = (args[1].ctype === 'undefined');

    if (u0 || u1) {
        return nada;
    }
    if (args[0].ctype === 'function') {
        var fname = args[0].oper;
        var ar = args[0].args;
        var body = args[1];
        var generation = 1;
        if (myfunctions.hasOwnProperty(fname)) {
            var previous = myfunctions[fname];
            if (previous.definer === self) {
                // Redefinition using the same piece of code changes nothing.
                // This needs some work once we have closures.
                return nada;
            }
            generation = previous.generation + 1;
        }
        myfunctions[fname] = {
            'oper': fname,
            'body': body,
            'arglist': ar,
            'definer': self,
            'generation': generation
        };
    }
    if (args[0].ctype === 'variable') {
        namespace.setvar(args[0].name, args[1]);
    }

    return nada;
}


function postfix_undefine(args, modifs) {
    if (args[1].ctype !== 'void') {
        return nada;
    }
    if (args[0].ctype === 'function') {
        delete myfunctions[args[0].oper];
    }
    return nada;
}


evaluator.if$2 = function(args, modifs) { //OK
    return evaluator.if$3(args, modifs);
};

evaluator.if$3 = function(args, modifs) { //OK

    var u0 = (args[0].ctype === 'undefined');
    var u1 = (args[1].ctype === 'undefined');

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'boolean') {
        if (v0.value === true) {
            return evaluate(args[1]);
        } else if (args.length === 3) {
            return evaluate(args[2]);
        }
    } else {
        csconsole.err("Condition for if is not boolean");
    }

    return nada;

};

function comp_equals(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);

    if (v0.ctype === v1.ctype) {
        if (v0.ctype === 'number') {
            return General.bool(
                v0.value.real === v1.value.real &&
                v0.value.imag === v1.value.imag
            );
        }
        if (v0.ctype === 'string') {
            return General.bool(v0.value === v1.value);
        }
        if (v0.ctype === 'boolean') {
            return General.bool(v0.value === v1.value);
        }
        if (v0.ctype === 'list') {
            return List.equals(v0, v1);
        }
        if (v0.ctype === 'geo') {
            return General.bool(v0.value === v1.value);
        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
}

function comp_notequals(args, modifs) {
    return General.not(comp_equals(args, modifs));
}

function comp_almostequals(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return {
            'ctype': 'boolean',
            'value': CSNumber._helper.isAlmostEqual(v0, v1)
        };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value === v1.value)
        };
    }
    if (v0.ctype === 'boolean' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (v0.value === v1.value)
        };
    }
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        var erg = List.almostequals(v0, v1);
        return erg;
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
}


evaluator.and$2 = infix_and;

function infix_and(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);

    if (v0.ctype === 'boolean' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (v0.value && v1.value)
        };
    }

    return nada;
}


evaluator.or$2 = infix_or;

function infix_or(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);

    if (v0.ctype === 'boolean' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (v0.value || v1.value)
        };
    }

    return nada;
}


evaluator.xor$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);

    if (v0.ctype === 'boolean' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (v0.value !== v1.value)
        };
    }

    return nada;
};


evaluator.not$1 = function(args, modifs) {
    var v = evaluateAndVal(args[0]);

    if (v.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (!v.value)
        };
    }

    return nada;
};

function prefix_not(args, modifs) {
    var v1 = evaluateAndVal(args[1]);

    if (args[0].ctype === 'void' && v1.ctype === 'boolean') {
        return {
            'ctype': 'boolean',
            'value': (!v1.value)
        };
    }

    return nada;
}


function postfix_numb_degree(args, modifs) {
    var v0 = evaluateAndVal(args[0]);

    if (v0.ctype === 'number' && args[1].ctype === 'void') {
        return General.withUsage(CSNumber.realmult(Math.PI / 180, v0), "Angle");
    }

    return nada;
}


function comp_notalmostequals(args, modifs) {
    return General.not(comp_almostequals(args, modifs));
}


function comp_ugt(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real - v1.value.real >= CSNumber.eps)
            };
    }
    return nada;
}

function comp_uge(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real - v1.value.real > -CSNumber.eps)
            };
    }
    return nada;
}

function comp_ult(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real - v1.value.real <= -CSNumber.eps)
            };
    }
    return nada;
}

function comp_ule(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real - v1.value.real < CSNumber.eps)
            };
    }
    return nada;
}


function comp_gt(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real > v1.value.real)
            };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value > v1.value)
        };
    }
    return nada;
}


function comp_ge(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real >= v1.value.real)
            };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value >= v1.value)
        };
    }
    return nada;
}


function comp_le(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real <= v1.value.real)
            };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value <= v1.value)
        };
    }
    return nada;
}

function comp_lt(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) && CSNumber._helper.isAlmostReal(v1))
            return {
                'ctype': 'boolean',
                'value': (v0.value.real < v1.value.real)
            };
    }
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': (v0.value < v1.value)
        };
    }
    return nada;
}


function infix_sequence(args, modifs) { //OK
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return List.sequence(v0, v1);
    }
    return nada;
}

eval_helper.genericListMathGen = function(name, op, emptyval) {
    evaluator[name + "$1"] = function(args, modifs) {
        var v0 = evaluate(args[0]);
        if (v0.ctype !== 'list') {
            return nada;
        }
        var li = v0.value;
        if (li.length === 0) {
            return emptyval;
        }

        var erg = li[0];
        for (var i = 1; i < li.length; i++) {
            erg = op(erg, li[i]);
        }
        return erg;
    };
    var name$3 = name + "$3";
    evaluator[name + "$2"] = function(args, modifs) {
        return evaluator[name$3]([args[0], null, args[1]]);
    };
    evaluator[name$3] = function(args, modifs) {
        var v0 = evaluateAndVal(args[0]);
        if (v0.ctype !== 'list') {
            return nada;
        }
        var li = v0.value;
        if (li.length === 0) {
            return emptyval;
        }

        var lauf = '#';
        if (args[1] !== null) {
            if (args[1].ctype === 'variable') {
                lauf = args[1].name;
            }
        }

        namespace.newvar(lauf);
        namespace.setvar(lauf, li[0]);
        var erg = evaluate(args[2]);
        for (var i = 1; i < li.length; i++) {
            namespace.setvar(lauf, li[i]);
            var b = evaluate(args[2]);
            erg = op(erg, b);
        }
        namespace.removevar(lauf);
        return erg;
    };
};

eval_helper.genericListMathGen("product", General.mult, CSNumber.real(1));
eval_helper.genericListMathGen("sum", General.add, CSNumber.real(0));
eval_helper.genericListMathGen("max", General.max, nada);
eval_helper.genericListMathGen("min", General.min, nada);

evaluator.max$2 = function(args, modifs) {
    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype === "list")
        return evaluator.max$3([v1, null, args[1]]);
    var v2 = evaluateAndVal(args[1]);
    return evaluator.max$1([List.turnIntoCSList([v1, v2])]);
};

evaluator.min$2 = function(args, modifs) {
    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype === "list")
        return evaluator.min$3([v1, null, args[1]]);
    var v2 = evaluateAndVal(args[1]);
    return evaluator.min$1([List.turnIntoCSList([v1, v2])]);
};

evaluator.add$2 = infix_add;

function infix_add(args, modifs) {
    var v0 = args[0];
    if (v0.ctype !== "void")
        v0 = evaluateAndVal(v0);
    var v1 = evaluateAndVal(args[1]);
    var erg = General.add(v0, v1);
    if (v0.usage === "Angle" && v1.usage === "Angle")
        erg = General.withUsage(erg, "Angle");
    return erg;
}

evaluator.sub$2 = infix_sub;

function infix_sub(args, modifs) {
    var v0 = args[0];
    if (v0.ctype !== "void")
        v0 = evaluateAndVal(v0);
    var v1 = evaluateAndVal(args[1]);
    var erg = General.sub(v0, v1);
    if (v0.usage === "Angle" && v1.usage === "Angle")
        erg = General.withUsage(erg, "Angle");
    return erg;
}

evaluator.mult$2 = infix_mult;

function infix_mult(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var erg = General.mult(v0, v1);
    if (v0.usage === "Angle" && !v1.usage)
        erg = General.withUsage(erg, "Angle");
    else if (v1.usage === "Angle" && !v0.usage)
        erg = General.withUsage(erg, "Angle");
    return erg;
}

evaluator.div$2 = infix_div;

function infix_div(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v1.ctype === "number" && CSNumber._helper.isZero(v1))
        csconsole.err("WARNING: Division by zero!");
    var erg = General.div(v0, v1);
    if (v0.usage === "Angle" && !v1.usage)
        erg = General.withUsage(erg, "Angle");
    else if (v1.usage === "Angle" && !v0.usage)
        erg = General.withUsage(erg, "Angle");
    return erg;
}


evaluator.mod$2 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.mod(v0, v1);
    }
    return nada;

};

evaluator.pow$2 = infix_pow;

function infix_pow(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.pow(v0, v1);
    }
    return nada;

}


///////////////////////////////
//     UNARY MATH OPS        //
///////////////////////////////


evaluator.exp$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.exp(v0);
    }
    return nada;
};

evaluator.sin$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.sin(v0);
    }
    return nada;
};

evaluator.sqrt$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.sqrt(v0);
    }
    return nada;
};

function infix_sqrt(args, modifs) {
    if (args[0].ctype === 'void')
        return evaluator.sqrt$1([args[1]], modifs);
    return nada;
}

eval_helper.laguerre = function(cs, x, maxiter) {
    if (cs.ctype !== 'list')
        return nada;
    var n = cs.value.length - 1,
        i;
    for (i = 0; i <= n; i++)
        if (cs.value[i].ctype !== 'number')
            return nada;
    if (x.ctype !== 'number')
        return nada;
    var rand = [1.0, 0.3141, 0.5926, 0.5358, 0.9793, 0.2385, 0.6264, 0.3383, 0.2795, 0.0288];
    var a, p, q, s, g, g2, h, r, d1, d2;
    var tol = 1e-14;
    for (var iter = 1; iter <= maxiter; iter++) {
        s = CSNumber.zero;
        q = CSNumber.zero;
        p = cs.value[n];

        for (i = n - 1; i >= 0; i--) {
            s = CSNumber.add(q, CSNumber.mult(s, x));
            q = CSNumber.add(p, CSNumber.mult(q, x));
            p = CSNumber.add(cs.value[i], CSNumber.mult(p, x));
        }

        if (CSNumber._helper.isLessThan(CSNumber.abs(p), CSNumber.real(tol)))
            return x;

        g = CSNumber.div(q, p);
        g2 = CSNumber.mult(g, g);
        h = CSNumber.sub(g2, CSNumber.div(CSNumber.mult(CSNumber.real(2.0), s), p));
        r = CSNumber.sqrt(CSNumber.mult(CSNumber.real(n - 1), CSNumber.sub(CSNumber.mult(CSNumber.real(n), h), g2)));
        d1 = CSNumber.add(g, r);
        d2 = CSNumber.sub(g, r);
        if (CSNumber._helper.isLessThan(CSNumber.abs(d1), CSNumber.abs(d2)))
            d1 = d2;
        if (CSNumber._helper.isLessThan(CSNumber.real(tol), CSNumber.abs(d1)))
            a = CSNumber.div(CSNumber.real(n), d1);
        else
            a = CSNumber.mult(CSNumber.add(CSNumber.abs(x), CSNumber.one), CSNumber.complex(Math.cos(iter), Math.sin(iter)));
        if (CSNumber._helper.isLessThan(CSNumber.abs(a), CSNumber.real(tol)))
            return x;
        if (iter % 20 === 0 && iter < maxiter - 19)
            a = CSNumber.mult(a, CSNumber.real(rand[Math.floor(iter / 20)]));
        x = CSNumber.sub(x, a);
    }
    return x;
};

// maybe this should become CSNumber._helper.solveQuadratic?
eval_helper.quadratic_roots = function(cs) {
    if (cs.ctype !== 'list')
        return nada;
    var a = cs.value[2],
        b = cs.value[1],
        c = cs.value[0];
    if (CSNumber._helper.isZero(c))
        return [CSNumber.zero, CSNumber.neg(CSNumber.div(b, a))];
    var r = CSNumber.sqrt(CSNumber.sub(CSNumber.mult(b, b), CSNumber.mult(CSNumber.real(4.0), CSNumber.mult(a, c))));
    if (CSNumber.re(b) >= 0.0)
        r = CSNumber.neg(r);
    return [CSNumber.div(CSNumber.sub(r, b), CSNumber.mult(CSNumber.real(2.0), a)), CSNumber.div(CSNumber.mult(CSNumber.real(2.0), c), CSNumber.sub(r, b))];
};

eval_helper.roots = function(cs) {
    var roots = [];
    var cs_orig = cs;
    var n = cs.value.length - 1;
    if (n <= 0)
        return List.turnIntoCSList([]);
    if (CSNumber._helper.isZero(cs.value[n])) {
        roots = eval_helper.roots(List.turnIntoCSList(cs.value.slice(0, n)));
        return List.append(roots, CSNumber.infinity);
    }
    if (n === 1)
        roots[0] = CSNumber.neg(CSNumber.div(cs.value[0], cs.value[1]));
    else if (n === 2)
        roots = eval_helper.quadratic_roots(cs);
    else {
        for (var i = 0; i < n - 2; i++) {
            roots[i] = eval_helper.laguerre(cs, CSNumber.zero, 200);
            roots[i] = eval_helper.laguerre(cs_orig, roots[i], 1);
            var fx = [];
            fx[n - i] = cs.value[n - i];
            for (var j = n - i; j > 0; j--)
                fx[j - 1] = CSNumber.add(cs.value[j - 1], CSNumber.mult(fx[j], roots[i]));
            fx.shift();
            cs = List.turnIntoCSList(fx);
        }
        var qroots = eval_helper.quadratic_roots(cs);
        roots[n - 2] = qroots[0];
        roots[n - 1] = qroots[1];
    }
    return List.turnIntoCSList(roots);
};

evaluator.roots$1 = function(args, modifs) {
    var cs = evaluateAndVal(args[0]);
    if (cs.ctype === 'list') {
        for (var i = 0; i < cs.value.length; i++)
            if (cs.value[i].ctype !== 'number')
                return nada;
        var roots = eval_helper.roots(cs);
        return List.sort1(roots);
    }
    return nada;
};

evaluator.autodiff$3 = function(args, modifs) {
    var varname = "x"; // fix this later
    var ffunc;
    if (args[0].ctype === "function") {
        ffunc = myfunctions[args[0].oper].body;
        varname = args[0].args[0].name;
    } else if (typeof(args[0].impl) === "function")
        ffunc = args[0];
    else {
        console.log("could not parse function");
        return nada;
    }
    var xarr = evaluateAndVal(args[1]);
    var grade = evaluateAndVal(args[2]);

    if (grade.value.real < 1) {
        console.log("grade cant be < 1");
        return nada;
    }

    grade = CSNumber.add(grade, CSNumber.real(1));
    var erg = CSad.autodiff(ffunc, varname, xarr, grade);
    return erg;
};

evaluator.cos$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.cos(v0);
    }
    return nada;
};


evaluator.tan$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.tan(v0);
    }
    return nada;
};

evaluator.arccos$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.arccos(v0);
    }
    return nada;
};


evaluator.arcsin$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.arcsin(v0);
    }
    return nada;
};


evaluator.arctan$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.arctan(v0);
    }
    return nada;
};

evaluator.arctan2$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return CSNumber.arctan2(v0, v1);
    }
    return nada;
};

evaluator.arctan2$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list' && v0.value.length === 2) {
        var tmp = v0.value;
        if (tmp[0].ctype === 'number' && tmp[1].ctype === 'number') {
            return evaluator.arctan2$2(tmp, modifs);
        }
    } else if (v0.ctype === 'number')
        return CSNumber.arctan2(v0);
    return nada;
};


evaluator.log$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.log(v0);
    }
    return nada;

};


eval_helper.recursiveGen = function(op) {
    var numOp = CSNumber[op],
        listOp = List[op];
    evaluator[op + "$1"] = function(args, modifs) {
        var v0 = evaluateAndVal(args[0]);
        if (v0.ctype === 'number') {
            return numOp(v0);
        }
        if (v0.ctype === 'list') {
            return listOp(v0);
        }
        return nada;
    };
};

eval_helper.recursiveGen("im");
eval_helper.recursiveGen("re");
eval_helper.recursiveGen("conjugate");
eval_helper.recursiveGen("round");
eval_helper.recursiveGen("ceil");
eval_helper.recursiveGen("floor");
eval_helper.recursiveGen("abs");
evaluator.abs_infix = evaluator.abs$1;

///////////////////////////////
//        RANDOM             //
///////////////////////////////

evaluator.random$0 = function(args, modifs) {
    return CSNumber.real(CSNumber._helper.rand());
};

evaluator.random$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return CSNumber.complex(v0.value.real * CSNumber._helper.rand(), v0.value.imag * CSNumber._helper.rand());
    }
    return nada;
};

evaluator.seedrandom$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        CSNumber._helper.seedrandom(v0.value.real);
    }
    return nada;

};

evaluator.randomnormal$0 = function(args, modifs) {
    return CSNumber.real(CSNumber._helper.randnormal());
};

evaluator.randominteger$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        var r = v0.value.real | 0,
            i = v0.value.imag | 0;
        r = (r * CSNumber._helper.rand()) | 0;
        i = (i * CSNumber._helper.rand()) | 0;
        return CSNumber.complex(r, i);
    }
    return nada;
};

evaluator.randomint$1 = evaluator.randominteger$1;

evaluator.randombool$0 = function(args, modifs) {
    if (CSNumber._helper.rand() > 0.5) {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


///////////////////////////////
//        TYPECHECKS         //
///////////////////////////////

evaluator.isreal$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0)) {
            return {
                'ctype': 'boolean',
                'value': true
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isinteger$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) &&
            v0.value.real === Math.floor(v0.value.real)) {
            return {
                'ctype': 'boolean',
                'value': true
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.iseven$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) &&
            v0.value.real / 2 === Math.floor(v0.value.real / 2)) {
            return {
                'ctype': 'boolean',
                'value': true
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isodd$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        if (CSNumber._helper.isAlmostReal(v0) &&
            (v0.value.real - 1) / 2 === Math.floor((v0.value.real - 1) / 2)) {
            return {
                'ctype': 'boolean',
                'value': true
            };
        }
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.iscomplex$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isstring$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'string') {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.islist$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.ismatrix$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if ((List._helper.colNumb(v0)) !== -1) {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.iscircle$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo" && v0.value.kind === "C" && v0.value.matrix.usage === "Circle") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.isconic$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo" && v0.value.kind === "C") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isline$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo" && v0.value.kind === "L") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.ispoint$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo" && v0.value.kind === "P") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.isgeometric$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isnumbermatrix$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    return List.isNumberMatrix(v0);
};

evaluator.isnumbervector$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    return List.isNumberVector(v0);
};


evaluator.issun$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'geo' && v0.value.behavior !== undefined && v0.value.behavior.type === "Sun") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.ismass$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'geo' && v0.value.behavior !== undefined && v0.value.behavior.type === "Mass") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.isspring$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'geo' && v0.value.behavior !== undefined && v0.value.behavior.type === "Spring") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};


evaluator.isbouncer$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'geo' && v0.value.behavior !== undefined && v0.value.behavior.type === "Bouncer") {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

evaluator.isundefined$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'undefined') {
        return {
            'ctype': 'boolean',
            'value': true
        };
    }
    return {
        'ctype': 'boolean',
        'value': false
    };
};

// See AlgoMap.java in the Cinderella codebase, but also geoMacros in GeoOps.js
var cinderellaAlgoNames = {
    ArcBy3: "Arc",
    CenterOfConic: "Center",
    ConicBy1p4l: "Conic1P4L",
    ConicBy4p1l: "Conic4P1L",
    ConicBy5lines: "Conic5L",
    ConicBy2Foci1P: "ConicFoci", // sometimes "ConicFociH" instead
    ConicFromPrincipalDirections: "ConicPrincipleDirs",
    // Mid: "EuclideanMid", (only sometimes)
    Free: "FreePoint",
    PolarOfLine: "PolarLine",
    PolarOfPoint: "PolarPoint",
    PointOnSegment: "PointOnLine",
    Button: "Text",
    ToggleButton: "Text",
    TrReflectionL: "TrReflection",
    TrReflectionP: "TrReflection",
    TrReflectionC: "TrReflection",
    TrTranslation: "TrProjection", // or TrTranslationPP?
    TrSimilarity: "TrProjection",
    TrAffine: "TrProjection",
    TransformP: "Transform",
    TransformL: "Transform",
    TransformSegment: "Transform",
    TransformS: "Transform",
    TransformPolygon: "Transform",
    TransformArc: "Transform",
    TransformConic: "Transform",
    TransformC: "Transform",
    TrMoebiusP: "Transform",
    TrMoebiusL: "Transform",
    TrMoebiusSegment: "Transform",
    TrMoebiusS: "Transform",
    TrMoebiusPolygon: "Transform",
    TrMoebiusArc: "Transform",
    TrMoebiusCircle: "Transform",
    TrMoebiusC: "Transform",
    TrInverseMoebius: "TrInverse",
    Perp: "Orthogonal",
    Para: "Parallel",
    AngleBisector: "AngularBisector",
    IntersectLC: "IntersectionConicLine",
    IntersectCirCir: "IntersectionCircleCircle",
    OtherPointOnCircle: "PointOnCircle",
};

evaluator.algorithm$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo") {
        var el = v0.value;
        var type = el.type;
        var compat = evaluateAndVal(modifs.compatibility);
        if (compat.ctype === "string" &&
            (/^cinderella$/i).test(compat.value)) {
            if (/^Select/.test(type)) {
                el = csgeo.csnames[el.args[0]];
                type = el.type;
            }
            if (cinderellaAlgoNames.hasOwnProperty(type))
                type = cinderellaAlgoNames[type];
            else if (type === "CircleMr")
                type = el.pinned ? "CircleByFixedRadius" : "CircleByRadius";
        }
        return General.string(type);
    }
    return nada;
};

evaluator.inputs$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "geo") {
        var el = v0.value;
        var type = el.type;
        var res = [];
        if (el.args) res = el.args.map(function(name) {
            return {
                ctype: "geo",
                value: csgeo.csnames[name]
            };
        });
        if (/^Select/.test(type) || geoOps[type].isMovable) {
            switch (el.kind) { // compare savePos in StateIO
                case "P":
                case "L":
                    res.push(el.homog);
                    break;
                case "C":
                    res.push(el.matrix);
                    break;
            }
        }
        return List.turnIntoCSList(res);
    }
    return nada;
};

evaluator.moveto$2 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === "geo") {
        var el = v0.value;
        if (List._helper.isNumberVecN(v1, 2)) {
            Accessor.setField(el, "xy", v1);
        } else if (List._helper.isNumberVecN(v1, 3)) {
            Accessor.setField(el, "homog", v1);
        }
    }
    return nada;
};

evaluator.continuefromhere$0 = function(args, modifs) {
    stateContinueFromHere();
    return nada;
};

evaluator.matrixrowcolumn$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var n = List._helper.colNumb(v0);
    if (n !== -1) {
        return List.realVector([v0.value.length, v0.value[0].value.length]);
    }
    return nada;
};

evaluator.rowmatrix$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "list")
        return List.turnIntoCSList([v0]);
    return nada;
};

evaluator.columnmatrix$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === "list")
        return List.turnIntoCSList(v0.value.map(function(elt) {
            return List.turnIntoCSList([elt]);
        }));
    return nada;
};

evaluator.submatrix$3 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    var v2 = evaluate(args[2]);
    if (v0.ctype === "list" && v1.ctype === "number" && v2.ctype === "number") {
        var col = Math.round(v1.value.real);
        var row = Math.round(v2.value.real);
        var mat = v0.value.slice();
        if (row > 0 && row <= mat.length)
            mat.splice(row - 1, 1);
        var sane = true;
        var erg = mat.map(function(row1) {
            if (row1.ctype !== "list") {
                sane = false;
                return;
            }
            var row2 = row1.value.slice();
            if (col > 0 && col <= row2.length)
                row2.splice(col - 1, 1);
            return List.turnIntoCSList(row2);
        });
        if (!sane)
            return nada;
        return List.turnIntoCSList(erg);
    }
    return nada;
};


///////////////////////////////
//         GEOMETRY          //
///////////////////////////////


evaluator.complex$1 = function(args, modifs) {
    var a, b, c, v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        if (List.isNumberVector(v0)) {
            if (v0.value.length === 2) {
                a = v0.value[0];
                b = v0.value[1];
                return CSNumber.complex(a.value.real - b.value.imag, b.value.real + a.value.imag);
            }
            if (v0.value.length === 3) {
                a = v0.value[0];
                b = v0.value[1];
                c = v0.value[2];
                a = CSNumber.div(a, c);
                b = CSNumber.div(b, c);
                return CSNumber.complex(a.value.real - b.value.imag, b.value.real + a.value.imag);
            }
        }
    }
    return nada;
};

evaluator.gauss$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return List.realVector([v0.value.real, v0.value.imag]);
    }
    return nada;
};


evaluator.cross$2 = infix_cross;

function infix_cross(args, modifs) {
    var v0 = evaluateAndHomog(args[0]);
    var v1 = evaluateAndHomog(args[1]);
    if (v0 !== nada && v1 !== nada) {
        var erg = List.cross(v0, v1);
        if (v0.usage === "Point" && v1.usage === "Point") {
            erg = General.withUsage(erg, "Line");
        }
        if (v0.usage === "Line" && v1.usage === "Line") {
            erg = General.withUsage(erg, "Point");
        }
        return erg;
    }
    return nada;
}

evaluator.crossratio$4 = function(args, modifs) {
    var a0 = evaluate(args[0]);
    var a1 = evaluate(args[1]);
    var a2 = evaluate(args[2]);
    var a3 = evaluate(args[3]);

    var v0 = evaluateAndHomog(a0);
    var v1 = evaluateAndHomog(a1);
    var v2 = evaluateAndHomog(a2);
    var v3 = evaluateAndHomog(a3);
    if (v0 !== nada && v1 !== nada && v2 !== nada && v3 !== nada) {
        // TODO: can't handle four collinear points at infinity
        return List.crossratio3(v0, v1, v2, v3, List.ii);
    }

    if (a0.ctype === "number" && a1.ctype === "number" &&
        a2.ctype === "number" && a3.ctype === "number") {
        return CSNumber.div(
            CSNumber.mult(
                CSNumber.sub(a0, a2),
                CSNumber.sub(a1, a3)
            ), CSNumber.mult(
                CSNumber.sub(a0, a3),
                CSNumber.sub(a1, a2)
            )
        );
    }

    return nada;
};

evaluator.para$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var w0 = evaluateAndHomog(v0);
    var w1 = evaluateAndHomog(v1);

    if (v0 !== nada && v1 !== nada) {
        var u0 = v0.usage;
        var u1 = v1.usage;
        var p = w0;
        var l = w1;
        if (u0 === "Line" || u1 === "Point") {
            p = w1;
            l = w0;
        }
        var inf = List.linfty;
        var erg = List.cross(List.cross(inf, l), p);
        return General.withUsage(erg, "Line");
    }
    return nada;
};


evaluator.perp$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var w0 = evaluateAndHomog(v0);
    var w1 = evaluateAndHomog(v1);
    if (v0 !== nada && v1 !== nada) {
        var u0 = v0.usage || w0.usage;
        var u1 = v1.usage || w1.usage;
        var p = w0;
        var l = w1;
        if (u0 === "Line" || u1 === "Point") {
            p = w1;
            l = w0;
        }
        var tt = List.turnIntoCSList([l.value[0], l.value[1], CSNumber.zero]);
        var erg = List.cross(tt, p);
        return General.withUsage(erg, "Line");
    }
    return nada;
};

evaluator.perp$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (List._helper.isNumberVecN(v0, 2)) {
        var erg = List.turnIntoCSList([CSNumber.neg(v0.value[1]), v0.value[0]]);
        return erg;
    }
    return nada;
};

evaluator.parallel$2 = evaluator.para$2;

evaluator.perpendicular$2 = evaluator.perp$2;

evaluator.perpendicular$1 = evaluator.perp$1;

evaluator.meet$2 = function(args, modifs) {
    var v0 = evaluateAndHomog(args[0]);
    var v1 = evaluateAndHomog(args[1]);
    if (v0 !== nada && v1 !== nada) {
        var erg = List.cross(v0, v1);
        return General.withUsage(erg, "Point");
    }
    return nada;
};


evaluator.join$2 = function(args, modifs) {
    var v0 = evaluateAndHomog(args[0]);
    var v1 = evaluateAndHomog(args[1]);
    if (v0 !== nada && v1 !== nada) {
        var erg = List.cross(v0, v1);
        return General.withUsage(erg, "Line");
    }
    return nada;
};


evaluator.dist$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var diff = infix_sub([v0, v1], []);
    return evaluator.abs$1([diff], []);
};

evaluator.dist_infix = evaluator.dist$2;


evaluator.point$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (List._helper.isNumberVecN(v0, 3) || List._helper.isNumberVecN(v0, 2)) {
        return General.withUsage(v0, "Point");
    }
    return v0;
};

evaluator.line$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (List._helper.isNumberVecN(v0, 3)) {
        return General.withUsage(v0, "Line");
    }
    return v0;
};

evaluator.det$3 = function(args, modifs) {
    var v0 = evaluateAndHomog(args[0]);
    var v1 = evaluateAndHomog(args[1]);
    var v2 = evaluateAndHomog(args[2]);
    if (v0 !== nada && v1 !== nada && v2 !== nada) {
        var erg = List.det3(v0, v1, v2);
        return erg;
    }
};

evaluator.det$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            return List.det(v0);
        }
    }
    return nada;
};


evaluator.eig$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            return List.eig(v0);
        }
    }
    return nada;
};


evaluator.eigenvalues$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            var erg = List.eig(v0, false);
            return erg.value[0]; // return only eigenvals
        }
    }
    return nada;
};


evaluator.rank$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            return List.rank(v0, modifs.precision);
        }
    }
    return nada;
};


evaluator.kernel$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            var erg = List.nullSpace(v0, modifs.precision);
            return List.transpose(erg);
        }
    }
    return nada;
};


evaluator.eigenvectors$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            var erg = List.eig(v0);
            return erg.value[1]; // return only eigenvecs
        }
    }
    return nada;
};


evaluator.area$3 = function(args, modifs) {
    var v0 = evaluateAndHomog(args[0]);
    var v1 = evaluateAndHomog(args[1]);
    var v2 = evaluateAndHomog(args[2]);
    if (v0 !== nada && v1 !== nada && v2 !== nada) {
        var z0 = v0.value[2];
        var z1 = v1.value[2];
        var z2 = v2.value[2];
        if (!CSNumber._helper.isAlmostZero(z0) && !CSNumber._helper.isAlmostZero(z1) && !CSNumber._helper.isAlmostZero(z2)) {
            v0 = List.scaldiv(z0, v0);
            v1 = List.scaldiv(z1, v1);
            v2 = List.scaldiv(z2, v2);
            var erg = List.det3(v0, v1, v2);
            return CSNumber.realmult(0.5, erg);
        }
    }
    return nada;
};


evaluator.inverse$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length) {
            return List.inverse(v0);
        }
    }
    return nada;
};


evaluator.linearsolve$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'list') {
        var n = List._helper.colNumb(v0);
        if (n !== -1 && n === v0.value.length && List._helper.isNumberVecN(v1, n)) {
            return List.linearsolve(v0, v1);
        }
    }
    return nada;
};

var permutationsFixedList = [
    [ // 0
        []
    ],
    [ // 1
        [0]
    ],
    [ // 2,
        [0, 1],
        [1, 0]
    ],
    [ // 3
        [0, 1, 2],
        [0, 2, 1],
        [1, 0, 2],
        [1, 2, 0],
        [2, 0, 1],
        [2, 1, 0]
    ],
    [ // 4
        [0, 1, 2, 3],
        [0, 1, 3, 2],
        [0, 2, 1, 3],
        [0, 2, 3, 1],
        [0, 3, 1, 2],
        [0, 3, 2, 1],
        [1, 0, 2, 3],
        [1, 0, 3, 2],
        [1, 2, 0, 3],
        [1, 2, 3, 0],
        [1, 3, 0, 2],
        [1, 3, 2, 0],
        [2, 0, 1, 3],
        [2, 0, 3, 1],
        [2, 1, 0, 3],
        [2, 1, 3, 0],
        [2, 3, 0, 1],
        [2, 3, 1, 0],
        [3, 0, 1, 2],
        [3, 0, 2, 1],
        [3, 1, 0, 2],
        [3, 1, 2, 0],
        [3, 2, 0, 1],
        [3, 2, 1, 0]
    ]
];

function minCostMatching(w) {
    var n = w.length;
    if (n === 0) return [];
    if (n === 1) return [0];
    if (n === 2) {
        if (w[0][0] + w[1][1] <= w[0][1] + w[1][0]) return [0, 1];
        else return [1, 0];
    }
    if (n > 4)
        return hungarianMethod(w);
    var perms = permutationsFixedList[n];
    var bc = Number.POSITIVE_INFINITY;
    var bp = perms[0];
    for (var i = 0; i < perms.length; ++i) {
        var p = perms[i];
        var c = 0;
        for (var j = 0; j < n; ++j)
            c += w[j][p[j]];
        if (c < bc) {
            bc = c;
            bp = p;
        }
    }
    return bp;
}

function hungarianMethod(w) {
    // Hungarian Algorithm to determine a min-cost matching
    // for a square cost matrix given as JavaScript arrays (not Lists)
    // of floating point numbers (not CSNumbers).
    // The invariant v1[i1].cost + v2[i2].cost <= w[i1][i2] will be maintained.
    // The result is the matched column (inner index) for every row
    // (outer index) of the supplied weight matrix.

    var abs = Math.abs;
    var n = w.length;
    var i1, i2;
    var v1 = new Array(n);
    var v2 = new Array(n); // the two partitions
    var e = new Array(n); // excess matrix, zero indicates edge in eq. subgr.
    for (i1 = 0; i1 < n; ++i1)
        e[i1] = new Array(n);

    function mkVertex() {
        return {
            matched: -1, // index of partner in matching
            prev: -1, // previous node in alternating tree
            start: -1, // root of alternating path
            cost: 0, // vertex cost for hungarian method
            used: false, // flag used for matching and vertex cover
            leaf: false // indicates queued item for matching computation
        };
    }

    for (i1 = 0; i1 < n; ++i1) {
        v1[i1] = mkVertex();
        v2[i1] = mkVertex();
        v1[i1].cost = w[i1][0];
        for (i2 = 1; i2 < n; ++i2) {
            if (v1[i1].cost > w[i1][i2])
                v1[i1].cost = w[i1][i2];
        }
    }

    for (;;) {

        // Step 1: update excess matrix: edge cost minus sum of vertex costs
        for (i1 = 0; i1 < n; ++i1) {
            for (i2 = 0; i2 < n; ++i2) {
                e[i1][i2] = w[i1][i2] - v1[i1].cost - v2[i2].cost;
                if (e[i1][i2] < (abs(w[i1][i2]) + abs(v1[i1].cost) +
                        abs(v2[i2].cost)) * 1e-14)
                    e[i1][i2] = 0;
            }
        }

        // Step 2: find a maximal matching in the equality subgraph
        for (i1 = 0; i1 < n; ++i1)
            v1[i1].matched = v2[i1].matched = -1; // reset
        var matchsize = 0;
        for (;;) {
            for (i1 = 0; i1 < n; ++i1) {
                v1[i1].used = v1[i1].leaf = v2[i1].used = v2[i1].leaf = false;
                if (v1[i1].matched !== -1) continue;
                v1[i1].start = i1;
                v1[i1].used = v1[i1].leaf = true;
                v1[i1].prev = -1;
            }
            var haspath = false;
            var empty = false;
            while (!empty) {

                // follow edges not in matching
                for (i1 = 0; i1 < n; ++i1) {
                    if (!v1[i1].leaf) continue;
                    v1[i1].leaf = false;
                    for (i2 = 0; i2 < n; ++i2) {
                        if (v2[i2].used || e[i1][i2] > 0)
                            continue;
                        if (v1[i1].matched === i2)
                            continue;
                        v2[i2].prev = i1;
                        v2[i2].start = v1[i1].start;
                        v2[i2].used = v2[i2].leaf = true;
                        if (v2[i2].matched === -1) {
                            v1[v2[i2].start].prev = i2;
                            haspath = true;
                            break;
                        }
                    } // for i2
                } // for i1

                if (haspath) break;
                empty = true;

                // follow edge in matching
                for (i2 = 0; i2 < n; ++i2) {
                    if (!v2[i2].leaf) continue;
                    v2[i2].leaf = false;
                    i1 = v2[i2].matched;
                    if (v1[i1].used) continue;
                    v1[i1].prev = i2;
                    v1[i1].start = v2[i2].start;
                    v1[i1].used = v1[i1].leaf = true;
                    empty = false;
                } // for i2

            } // while !empty
            if (!haspath) break;

            // now augment every path found
            for (var start = 0; start < n; ++start) {
                if (v1[start].matched !== -1 || v1[start].prev === -1) continue;
                i2 = v1[start].prev;
                do {
                    i1 = v2[i2].prev;
                    v2[i2].matched = i1;
                    v1[i1].matched = i2;
                    i2 = v1[i1].prev;
                } while (i1 !== start);
                ++matchsize;
            }
        } // for(;;)

        if (matchsize === n) break; // found maximum weight matching

        // Step 3: find vertex cover on equality subgraph
        for (i1 = 0; i1 < n; ++i1) {
            v1[i1].used = v1[i1].leaf = v2[i1].used = v2[i1].leaf = false;
        }
        for (i1 = 0; i1 < n; ++i1) {
            if (v1[i1].matched === -1) notincover1(i1);
        }
        for (i2 = 0; i2 < n; ++i2) {
            if (v2[i2].matched === -1) notincover2(i2);
        }
        for (i1 = 0; i1 < n; ++i1) {
            if (v1[i1].matched === -1) continue;
            if (v1[i1].used || v2[v1[i1].matched].used) continue;
            v1[i1].used = true;
        }

        // Step 4: adjust costs.
        // cost change is minimal cost in the part not covered
        var eps = Number.POSITIVE_INFINITY;
        for (i1 = 0; i1 < n; ++i1) {
            if (v1[i1].used) continue;
            for (i2 = 0; i2 < n; ++i2) {
                if (v2[i2].used) continue;
                if (eps > e[i1][i2]) eps = e[i1][i2];
            }
        }
        // assert(eps>0);
        // reduce total cost by applying cost change
        for (i1 = 0; i1 < n; ++i1) {
            if (!v1[i1].used) v1[i1].cost += eps;
            if (v2[i1].used) v2[i1].cost -= eps;
        }
    }

    // We have a result, so let's format it appropriately
    var res = new Array(n);
    for (i1 = 0; i1 < n; ++i1) {
        i2 = v1[i1].matched;
        res[i1] = i2;
    }
    return res;

    // v1[i1] is definitely not in the cover
    //  => all edges must have their opposite endpoint covered
    function notincover1(i1) {
        for (var i2 = 0; i2 < n; ++i2) {
            if (e[i1][i2] > 0 || v2[i2].used) continue;
            v2[i2].used = true;
            notincover1(v2[i2].matched);
        }
    }

    // symmetric to the above
    function notincover2(i2) {
        for (var i1 = 0; i1 < n; ++i1) {
            if (e[i1][i2] > 0 || v1[i1].used) continue;
            v1[i1].used = true;
            notincover2(v1[i1].matched);
        }
    }

}

evaluator.mincostmatching$1 = function(args, modifs) {
    var costMatrix = evaluate(args[0]);
    if (List.isNumberMatrix(costMatrix).value) {
        var nr = costMatrix.value.length;
        var nc = List._helper.colNumb(costMatrix);
        var size = (nr < nc ? nc : nr);
        var i, j;
        var w = new Array(size);
        for (i = 0; i < size; ++i) {
            w[i] = new Array(size);
            for (j = 0; j < size; ++j) {
                if (i < nr && j < nc)
                    w[i][j] = costMatrix.value[i].value[j].value.real;
                else
                    w[i][j] = 0;
            }
        }
        var matching = minCostMatching(w);
        var res = new Array(nr);
        for (i = 0; i < nr; ++i) {
            j = matching[i];
            if (j < nc)
                res[i] = CSNumber.real(j + 1);
            else
                res[i] = CSNumber.real(0);
        }
        return List.turnIntoCSList(res);
    }
    return nada;
};

///////////////////////////////
//    List Manipulations     //
///////////////////////////////

function infix_take(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype !== 'string') {
        v0 = List.asList(v0);
    }
    if (v1.ctype === 'number') {
        var ind = Math.floor(v1.value.real);
        if (ind < 0) {
            ind = v0.value.length + ind + 1;
        }
        if (ind > 0 && ind < v0.value.length + 1) {
            if (v0.ctype === 'list') {
                return v0.value[ind - 1];
            }
            return {
                "ctype": "string",
                "value": v0.value.charAt(ind - 1)
            };
        } else {
            csconsole.err("WARNING: Index out of range!");
            return nada;
        }
    }
    if (v1.ctype === 'list') { // This is recursive, different from Cinderella
        var li = [];
        for (var i = 0; i < v1.value.length; i++) {
            var v1i = evaluateAndVal(v1.value[i]);
            li[i] = infix_take([v0, v1i], []);
        }
        return List.turnIntoCSList(li);
    }
    return nada;
}

evaluator.take$2 = infix_take;

evaluator.length$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list' || v0.ctype === 'string') {
        return CSNumber.real(v0.value.length);
    }
    return nada;
};


evaluator.pairs$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.pairs(v0);
    }
    return nada;
};

evaluator.triples$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.triples(v0);
    }
    return nada;
};

evaluator.cycle$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.cycle(v0);
    }
    return nada;
};

evaluator.consecutive$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.consecutive(v0);
    }
    return nada;
};


evaluator.reverse$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.reverse(v0);
    }
    return nada;
};

evaluator.directproduct$2 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.directproduct(v0, v1);
    }
    return nada;
};

evaluator.concat$2 = infix_concat;

function infix_concat(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'shape' && v1.ctype === 'shape') {
        return eval_helper.shapeconcat(v0, v1);
    }
    var l0 = List.asList(v0);
    var l1 = List.asList(v1);
    if (l0.ctype === 'list' && l1.ctype === 'list') {
        return List.concat(l0, l1);
    }
    return nada;
}

evaluator.common$2 = infix_common;

function infix_common(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.set(List.common(v0, v1));
    }
    if (v0.ctype === 'shape' && v1.ctype === 'shape') {
        return eval_helper.shapecommon(v0, v1);
    }
    return nada;
}

evaluator.remove$2 = infix_remove;

function infix_remove(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'list' && v1.ctype === 'list') {
        return List.remove(v0, v1);
    }
    if (v0.ctype === 'shape' && v1.ctype === 'shape') {
        return eval_helper.shaperemove(v0, v1);
    }
    return nada;
}


evaluator.append$2 = infix_append;

function infix_append(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'list') {
        return List.append(v0, v1);
    }
    return nada;
}

evaluator.prepend$2 = infix_prepend;

function infix_prepend(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v1.ctype === 'list') {
        return List.prepend(v0, v1);
    }
    return nada;
}

evaluator.contains$2 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'list') {
        return List.contains(v0, v1);
    }
    return nada;
};

function infix_in(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v1.ctype === 'list') {
        return List.contains(v1, v0);
    }
    return nada;
}

function infix_nin(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v1.ctype === 'list') {
        return General.not(List.contains(v1, v0));
    }
    return nada;
}

evaluator.sort$2 = function(args, modifs) {
    return evaluator.sort$3([args[0], null, args[1]], modifs);
};

evaluator.sort$3 = function(args, modifs) { //OK
    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype !== 'list') {
        return nada;
    }

    var lauf = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            lauf = args[1].name;
        }
    }

    var li = v1.value;
    var erg = [];
    namespace.newvar(lauf);
    var i;
    for (i = 0; i < li.length; i++) {
        namespace.setvar(lauf, li[i]);
        erg[i] = {
            val: li[i],
            result: evaluate(args[2])
        };
    }
    namespace.removevar(lauf);

    erg.sort(General.compareResults);
    var erg1 = [];
    for (i = 0; i < li.length; i++) {
        erg1[i] = erg[i].val;
    }

    return {
        'ctype': 'list',
        'value': erg1
    };
};

evaluator.sort$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.sort1(v0);
    }
    return nada;
};

evaluator.set$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        return List.set(v0);
    }
    return nada;
};

function gcd(a, b) {
    a = a | 0;
    b = b | 0;
    if (a === 0 && b === 0)
        return 0;
    while (b !== 0) {
        var c = a;
        a = b;
        b = (c % b) | 0;
    }
    return a;
}

evaluator.combinations$2 = function(args, modifs) {
    var base = evaluate(args[0]);
    var count = evaluate(args[1]);
    var n, k, current, res;

    if (count.ctype === 'number') {
        k = count.value.real | 0;
        if (base.ctype === 'number') {
            n = base.value.real | 0;
            if (n - k < k) k = n - k;
            if (k < 0) return CSNumber.real(0);
            if (k === 0) return CSNumber.real(1);
            if (k === 1) return base;
            // compute (n! / (n-k)!) / k! efficiently
            var numer = 1;
            var denom = 1;
            for (var i = 1; i <= k; ++i) {
                // Use "| 0" to indicate integer arithmetic
                var x = (n - k + i) | 0;
                var y = i | 0;
                var g = gcd(x, y) | 0;
                x = (x / g) | 0;
                y = (y / g) | 0;
                g = gcd(numer, y) | 0;
                numer = (numer / g) | 0;
                y = (y / g) | 0;
                g = gcd(x, denom) | 0;
                x = (x / g) | 0;
                denom = (denom / g) | 0;
                numer = (numer * x) | 0;
                denom = (denom * y) | 0;
            }
            return CSNumber.real(numer / denom);
        }
        if (base.ctype === 'list') {
            n = base.value.length;
            if (k < 0 || k > n)
                return List.turnIntoCSList([]);
            if (k === 0)
                return List.turnIntoCSList([List.turnIntoCSList([])]);
            if (k === n)
                return List.turnIntoCSList([base]);
            res = [];
            current = new Array(k);
            pick(0, 0);
            return List.turnIntoCSList(res);
        }
    }
    return nada;

    function pick(i, s) {
        if (i === k) {
            res.push(List.turnIntoCSList(current.slice()));
        } else if (s < n) {
            current[i] = base.value[s];
            pick(i + 1, s + 1);
            pick(i, s + 1);
        }
    }
};

evaluator.zeromatrix$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v0.ctype === 'number' && v1.ctype === 'number') {
        return List.zeromatrix(v0, v1);
    }
    return nada;
};


evaluator.zerovector$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        return List.zerovector(v0);
    }
    return nada;
};

evaluator.transpose$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list' && List._helper.colNumb(v0) !== -1) {
        return List.transpose(v0);
    }
    return nada;
};

evaluator.row$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v1.ctype === 'number' && v0.ctype === 'list' && List._helper.colNumb(v0) !== -1) {
        return List.row(v0, v1);
    }
    return nada;
};

evaluator.column$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    if (v1.ctype === 'number' && v0.ctype === 'list' && List._helper.colNumb(v0) !== -1) {
        return List.column(v0, v1);
    }
    return nada;
};


///////////////////////////////
//        DICTIONARIES       //
///////////////////////////////

evaluator.dict$0 = function(args, modifs) {
    var d = Dict.create();
    for (var key in modifs)
        if (modifs.hasOwnProperty(key))
            Dict.put(d, General.string(key), evaluate(modifs[key]));
    return d;
};

evaluator.put$3 = function(args, modifs) {
    var d = evaluate(args[0]);
    var k = evaluate(args[1]);
    var v = evaluate(args[2]);
    if (d.ctype === "dict") {
        d = Dict.clone(d);
        Dict.put(d, k, v);
        return d;
    }
    return nada;
};

evaluator.get$2 = function(args, modifs) {
    var d = evaluate(args[0]);
    var k = evaluate(args[1]);
    if (d.ctype === "dict") {
        return Dict.get(d, k, nada);
    }
    return nada;
};


///////////////////////////////
//         COLOR OPS         //
///////////////////////////////

evaluator.red$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        var c = Math.min(1, Math.max(0, v0.value.real));
        return List.realVector([c, 0, 0]);
    }
    return nada;
};

evaluator.green$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        var c = Math.min(1, Math.max(0, v0.value.real));
        return List.realVector([0, c, 0]);
    }
    return nada;
};

evaluator.blue$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        var c = Math.min(1, Math.max(0, v0.value.real));
        return List.realVector([0, 0, c]);
    }
    return nada;
};

evaluator.gray$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        var c = Math.min(1, Math.max(0, v0.value.real));
        return List.realVector([c, c, c]);
    }
    return nada;
};

evaluator.grey$1 = evaluator.gray$1;

eval_helper.HSVtoRGB = function(h, s, v) {

    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s;
        v = h.v;
        h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return List.realVector([r, g, b]);
};

evaluator.hue$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'number') {
        var c = v0.value.real;
        c = c - Math.floor(c);
        return eval_helper.HSVtoRGB(c, 1, 1);
    }
    return nada;
};

///////////////////////////////
//      shape booleans       //
///////////////////////////////


eval_helper.shapeconvert = function(a) {
    var i, li;
    if (a.type === "circle") {
        var pt = a.value.value[0];
        var aa = General.div(pt, pt.value[2]);
        var mx = aa.value[0].value.real;
        var my = aa.value[1].value.real;
        var r = a.value.value[1].value.real;
        var n = 125;
        li = new Array(n);
        var d = Math.PI * 2 / n;
        for (i = 0; i < n; i++) {
            li[i] = {
                X: (mx + Math.cos(i * d) * r),
                Y: (my + Math.sin(i * d) * r)
            };
        }

        return [li];
    }
    if (a.type === "polygon") {
        var erg = [];
        for (i = 0; i < a.value.length; i++) {
            var pol = a.value[i];
            li = [];
            for (var j = 0; j < pol.length; j++) {
                li[j] = {
                    X: pol[j].X,
                    Y: pol[j].Y
                };
            }
            erg[i] = li;
        }
        return erg;
    }


};


eval_helper.shapeop = function(a, b, op) {

    var convert;
    var aa = eval_helper.shapeconvert(a);
    var bb = eval_helper.shapeconvert(b);
    var scale = 1000;
    ClipperLib.JS.ScaleUpPaths(aa, scale);
    ClipperLib.JS.ScaleUpPaths(bb, scale);
    var cpr = new ClipperLib.Clipper();
    cpr.AddPaths(aa, ClipperLib.PolyType.ptSubject, true);
    cpr.AddPaths(bb, ClipperLib.PolyType.ptClip, true);
    var subject_fillType = ClipperLib.PolyFillType.pftNonZero;
    var clip_fillType = ClipperLib.PolyFillType.pftNonZero;
    var clipType = op;
    var solution_paths = new ClipperLib.Paths();
    cpr.Execute(clipType, solution_paths, subject_fillType, clip_fillType);
    ClipperLib.JS.ScaleDownPaths(solution_paths, scale);
    //    console.log(JSON.stringify(solution_paths));
    return {
        ctype: "shape",
        type: "polygon",
        value: solution_paths
    };

};

eval_helper.shapecommon = function(a, b) {
    return eval_helper.shapeop(a, b, ClipperLib.ClipType.ctIntersection);
};

eval_helper.shaperemove = function(a, b) {
    return eval_helper.shapeop(a, b, ClipperLib.ClipType.ctDifference);
};

eval_helper.shapeconcat = function(a, b) {
    return eval_helper.shapeop(a, b, ClipperLib.ClipType.ctUnion);
};


///////////////////////////////
//            IO             //
///////////////////////////////

evaluator.key$0 = function(args, modifs) { //OK
    return {
        ctype: "string",
        value: cskey
    };
};


evaluator.keycode$0 = function(args, modifs) { //OK
    return CSNumber.real(cskeycode);
};


evaluator.mouse$0 = function(args, modifs) { //OK
    var x = csmouse[0];
    var y = csmouse[1];
    return List.realVector([x, y]);
};

evaluator.mover$0 = function(args, modifs) { //OK
    if (move && move.mover)
        return {
            ctype: "geo",
            value: move.mover
        };
    else
        console.log("Not moving anything at the moment");
    return nada;
};


///////////////////////////////
//      Graphic State        //
///////////////////////////////

evaluator.translate$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list') {
        if (List.isNumberVector(v0)) {
            if (v0.value.length === 2) {
                var a = v0.value[0];
                var b = v0.value[1];
                csport.translate(a.value.real, b.value.real);
                return nada;
            }
        }
    }
    return nada;
};


evaluator.rotate$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.rotate(v0.value.real);
        return nada;
    }
    return nada;
};


evaluator.scale$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.scale(v0.value.real);
        return nada;
    }
    return nada;
};


evaluator.greset$0 = function(args, modifs) {
    var n = csgstorage.stack.length;
    csport.greset();
    for (var i = 0; i < n; i++) {
        csctx.restore();
    }
    return nada;
};


evaluator.gsave$0 = function(args, modifs) {
    csport.gsave();
    csctx.save();
    return nada;
};


evaluator.grestore$0 = function(args, modifs) {
    csport.grestore();
    csctx.restore();
    return nada;
};


evaluator.color$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list' && List.isNumberVector(v0).value) {
        csport.setcolor(v0);
    }
    return nada;
};


evaluator.linecolor$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list' && List.isNumberVector(v0).value) {
        csport.setlinecolor(v0);
    }
    return nada;
};


evaluator.pointcolor$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'list' && List.isNumberVector(v0).value) {
        csport.setpointcolor(v0);
    }
    return nada;
};

evaluator.alpha$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.setalpha(v0);
    }
    return nada;
};

evaluator.pointsize$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.setpointsize(v0);
    }
    return nada;
};

evaluator.linesize$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.setlinesize(v0);
    }
    return nada;
};

evaluator.textsize$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        csport.settextsize(v0);
    }
    return nada;
};


//////////////////////////////////////////
//          Animation control           //
//////////////////////////////////////////

evaluator.playanimation$0 = function(args, modifs) {
    csplay();
    return nada;
};

evaluator.pauseanimation$0 = function(args, modifs) {
    cspause();
    return nada;
};

evaluator.stopanimation$0 = function(args, modifs) {
    csstop();
    return nada;
};


///////////////////////////////
//          String           //
///////////////////////////////


evaluator.text$1 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]); // Cinderella compatible
    // if (v0 === nada) return nada; // Cinderella compatible
    return General.string(niceprint(v0));
};

evaluator.replace$3 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    var v2 = evaluate(args[2]);
    if (v0.ctype === 'string' && v1.ctype === 'string' && v2.ctype === 'string') {
        var str0 = v0.value;
        var str1 = v1.value.replace(/[^A-Za-z0-9]/g, "\\$&");
        var str2 = v2.value.replace(/\$/g, "$$$$");
        var regex = new RegExp(str1, "g");
        str0 = str0.replace(regex, str2);
        return {
            ctype: "string",
            value: str0
        };
    }
};

evaluator.replace$2 = function(args, modifs) {
    var ind;
    var repl;
    var keyind;
    var from;

    /////HELPER/////
    function getReplStr(str, keys, from) {
        var s = "";
        ind = -1;
        keyind = -1;
        for (var i = 0; i < keys.length; i++) {
            var s1 = keys[i][0];
            var a = str.indexOf(s1, from);
            if (a !== -1) {
                if (ind === -1) {
                    s = s1;
                    ind = a;
                    keyind = i;
                } else if (a < ind) {
                    s = s1;
                    ind = a;
                    keyind = i;
                }
            }
        }
        return s;
    }

    ////////////////

    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'string' && v1.ctype === 'list') {
        var s = v0.value;
        var rules = [];
        for (var i = 0; i < v1.value.length; i++) {
            var el = v1.value[i];
            if (el.ctype === "list" &&
                el.value.length === 2 &&
                el.value[0].ctype === "string" &&
                el.value[1].ctype === "string") {
                rules[rules.length] = [el.value[0].value, el.value[1].value];
            }

        }
        ind = -1;
        from = 0;
        var srep = getReplStr(s, rules, from);
        while (ind !== -1) {
            s = s.substring(0, ind) +
                (rules[keyind][1]) +
                s.substring(ind + (srep.length), s.length);
            from = ind + rules[keyind][1].length;
            srep = getReplStr(s, rules, from);
        }

        return {
            ctype: "string",
            value: s
        };
    }

    return nada;
};


evaluator.substring$3 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var v2 = evaluateAndVal(args[2]);
    if (v0.ctype === 'string' && v1.ctype === 'number' && v2.ctype === 'number') {
        var s = v0.value;
        return {
            ctype: "string",
            value: s.substring(Math.floor(v1.value.real),
                Math.floor(v2.value.real))
        };
    }
    return nada;
};


evaluator.tokenize$2 = function(args, modifs) {
    var li, i;
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        return evaluator.tokenize$2([v0, List.turnIntoCSList([v1])], modifs);
    }
    if (v0.ctype === 'string' && v1.ctype === 'list') {
        var str = v0.value;

        if (v1.value.length === 0) {
            // This is a leaf
            var convert = true;
            if (modifs.autoconvert !== undefined) {
                var erg = evaluate(modifs.autoconvert);
                if (erg.ctype === 'boolean') {
                    convert = erg.value;
                }
            }
            if (convert && str !== "") {
                var fl = Number(str);
                if (!isNaN(fl)) {
                    return CSNumber.real(fl);
                }
            }
            return General.string(str);
        }

        var head = v1.value[0];
        var tail = List.turnIntoCSList(v1.value.slice(1));
        var tokens = str.split(head.value);
        return List.turnIntoCSList(tokens.map(function(token) {
            return evaluator.tokenize$2([General.string(token), tail], modifs);
        }));
    }
    return nada;
};

evaluator.indexof$2 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    if (v0.ctype === 'string' && v1.ctype === 'string') {
        var str = v0.value;
        var code = v1.value;
        var i = str.indexOf(code);
        return CSNumber.real(i + 1);
    }
    return nada;
};

evaluator.indexof$3 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    var v1 = evaluate(args[1]);
    var v2 = evaluate(args[2]);
    if (v0.ctype === 'string' && v1.ctype === 'string' && v2.ctype === 'number') {
        var str = v0.value;
        var code = v1.value;
        var start = Math.round(v2.value.real);
        var i = str.indexOf(code, start - 1);
        return CSNumber.real(i + 1);
    }
    return nada;
};

evaluator.parse$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'string') {
        var code = v0.value;
        var prog = analyse(code);
        return evaluate(prog);
    }
    return nada;
};

evaluator.unicode$1 = function(args, modifs) {
    var codepoint, str;
    var arg = evaluate(args[0]);
    var base = 16;
    if (modifs.base) {
        var b = evaluate(modifs.base);
        if (b.ctype === 'number')
            base = b.value.real;
    }
    if (arg.ctype === 'string') {
        codepoint = parseInt(arg.value, base);
    } else if (arg.ctype === 'number') {
        codepoint = arg.value.real;
    } else {
        return nada;
    }
    if (typeof String.fromCodePoint !== "undefined") {
        str = String.fromCodePoint(codepoint);
    } else if (codepoint <= 0xffff) {
        str = String.fromCharCode(codepoint);
    } else {
        var cp = codepoint - 0x10000;
        var hi = (cp >> 10) + 0xd800;
        var lo = (cp & 0x3ff) + 0xdc00;
        str = String.fromCharCode(hi, lo);
    }
    return General.string(str);
};

evaluator.international$1 = function(args, modifs) {
    return evaluator.international$2([args[0], null], modifs);
};

function defaultPluralForm(cnt) {
    return cnt === 1 ? 0 : 1;
}

evaluator.international$2 = function(args, modifs) {
    var arg = evaluate(args[0]);
    if (arg.ctype !== "string") return nada;
    var language = instanceInvocationArguments.language || "en";
    var tr = instanceInvocationArguments.translations || {};
    var trl = tr[language] || {};
    if (!trl.hasOwnProperty(arg.value)) return arg;
    var entry = trl[arg.value];
    if (typeof entry === "string")
        return General.string(entry);
    var pluralform = 0;
    if (args[1] === null)
        return arg;
    var count = evaluate(args[1]);
    if (count.ctype === "number")
        count = count.value.real;
    else
        count = 0;
    var pluralFormFunction = trl._pluralFormFunction || defaultPluralForm;
    var pluralForm = pluralFormFunction(count);
    if (pluralForm < entry.length)
        return General.string(entry[pluralForm]);
    return arg;
};

evaluator.currentlanguage$0 = function(args, modifs) {
    return General.string(instanceInvocationArguments.language || "en");
};

///////////////////////////////
//     Transformations       //
///////////////////////////////

eval_helper.basismap = function(a, b, c, d) {
    var mat = List.turnIntoCSList([a, b, c]);
    mat = List.adjoint3(List.transpose(mat));
    var vv = General.mult(mat, d);
    mat = List.turnIntoCSList([
        General.mult(vv.value[0], a),
        General.mult(vv.value[1], b),
        General.mult(vv.value[2], c)
    ]);
    return List.transpose(mat);

};

evaluator.map$8 = function(args, modifs) {
    var w0 = evaluateAndHomog(args[0]);
    var w1 = evaluateAndHomog(args[1]);
    var w2 = evaluateAndHomog(args[2]);
    var w3 = evaluateAndHomog(args[3]);
    var v0 = evaluateAndHomog(args[4]);
    var v1 = evaluateAndHomog(args[5]);
    var v2 = evaluateAndHomog(args[6]);
    var v3 = evaluateAndHomog(args[7]);
    if (v0 !== nada && v1 !== nada && v2 !== nada && v3 !== nada &&
        w0 !== nada && w1 !== nada && w2 !== nada && w3 !== nada) {
        var m1 = eval_helper.basismap(v0, v1, v2, v3);
        var m2 = eval_helper.basismap(w0, w1, w2, w3);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};

evaluator.map$6 = function(args, modifs) {
    var w0 = evaluateAndHomog(args[0]);
    var w1 = evaluateAndHomog(args[1]);
    var w2 = evaluateAndHomog(args[2]);
    var inf = List.realVector([0, 0, 1]);
    var cc = List.cross;

    var w3 = cc(cc(w2, cc(inf, cc(w0, w1))),
        cc(w1, cc(inf, cc(w0, w2))));

    var v0 = evaluateAndHomog(args[3]);
    var v1 = evaluateAndHomog(args[4]);
    var v2 = evaluateAndHomog(args[5]);
    var v3 = cc(cc(v2, cc(inf, cc(v0, v1))),
        cc(v1, cc(inf, cc(v0, v2))));

    if (v0 !== nada && v1 !== nada && v2 !== nada && v3 !== nada &&
        w0 !== nada && w1 !== nada && w2 !== nada && w3 !== nada) {
        var m1 = eval_helper.basismap(v0, v1, v2, v3);
        var m2 = eval_helper.basismap(w0, w1, w2, w3);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};

evaluator.map$4 = function(args, modifs) {
    var ii = List.ii;
    var jj = List.jj;

    var w0 = evaluateAndHomog(args[0]);
    var w1 = evaluateAndHomog(args[1]);
    var v0 = evaluateAndHomog(args[2]);
    var v1 = evaluateAndHomog(args[3]);

    if (v0 !== nada && v1 !== nada &&
        w0 !== nada && w1 !== nada) {
        var m1 = eval_helper.basismap(v0, v1, ii, jj);
        var m2 = eval_helper.basismap(w0, w1, ii, jj);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};

evaluator.map$2 = function(args, modifs) {
    var ii = List.ii;
    var jj = List.jj;
    var w0 = evaluateAndHomog(args[0]);
    var w1 = General.add(List.realVector([1, 0, 0]), w0);
    var v0 = evaluateAndHomog(args[1]);
    var v1 = General.add(List.realVector([1, 0, 0]), v0);

    if (v0 !== nada && v1 !== nada &&
        w0 !== nada && w1 !== nada) {
        var m1 = eval_helper.basismap(v0, v1, ii, jj);
        var m2 = eval_helper.basismap(w0, w1, ii, jj);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};

evaluator.pointreflect$1 = function(args, modifs) {
    var ii = List.ii;
    var jj = List.jj;

    var w0 = evaluateAndHomog(args[0]);
    var w1 = General.add(List.realVector([1, 0, 0]), w0);
    var v1 = General.add(List.realVector([-1, 0, 0]), w0);

    if (v1 !== nada && w0 !== nada && w1 !== nada) {
        var m1 = eval_helper.basismap(w0, v1, ii, jj);
        var m2 = eval_helper.basismap(w0, w1, ii, jj);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};


evaluator.linereflect$1 = function(args, modifs) {
    var ii = List.ii;
    var jj = List.jj;

    var w0 = evaluateAndHomog(args[0]);
    var r0 = List.realVector([Math.random(), Math.random(), Math.random()]);
    var r1 = List.realVector([Math.random(), Math.random(), Math.random()]);
    var w1 = List.cross(r0, w0);
    var w2 = List.cross(r1, w0);

    if (w0 !== nada && w1 !== nada) {
        var m1 = eval_helper.basismap(w1, w2, ii, jj);
        var m2 = eval_helper.basismap(w1, w2, jj, ii);
        var erg = General.mult(m1, List.adjoint3(m2));
        return List.normalizeMax(erg);
    }
    return nada;
};


///////////////////////////////
//         Shapes            //
///////////////////////////////


eval_helper.extractPointVec = function(v1) { //Eventuell Homogen machen
    var erg = {};
    erg.ok = false;
    if (v1.ctype === 'geo') {
        var val = v1.value;
        if (val.kind === "P") {
            erg.x = Accessor.getField(val, "x");
            erg.y = Accessor.getField(val, "y");
            erg.z = CSNumber.real(1);
            erg.ok = true;
            return erg;
        }

    }
    if (v1.ctype !== 'list') {
        return erg;
    }

    var pt1 = v1.value;
    var x = 0;
    var y = 0;
    var z = 0;
    var n1, n2, n3;
    if (pt1.length === 2) {
        n1 = pt1[0];
        n2 = pt1[1];
        if (n1.ctype === 'number' && n2.ctype === 'number') {
            erg.x = n1;
            erg.y = n2;
            erg.z = CSNumber.real(1);
            erg.ok = true;
            return erg;
        }
    }

    if (pt1.length === 3) {
        n1 = pt1[0];
        n2 = pt1[1];
        n3 = pt1[2];
        if (n1.ctype === 'number' && n2.ctype === 'number' && n3.ctype === 'number') {
            erg.x = CSNumber.div(n1, n3);
            erg.y = CSNumber.div(n2, n3);
            erg.z = CSNumber.real(1);
            erg.ok = true;
            return erg;
        }
    }

    return erg;

};


evaluator.polygon$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'list') {
        var li = [];
        for (var i = 0; i < v0.value.length; i++) {
            var pt = eval_helper.extractPoint(v0.value[i]);
            if (!pt.ok) {
                return nada;
            }
            li[i] = {
                X: pt.x,
                Y: pt.y
            };
        }
        return {
            ctype: "shape",
            type: "polygon",
            value: [li]
        };
    }
    return nada;
};

evaluator.circle$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var pt = eval_helper.extractPointVec(v0);

    if (!pt.ok || v1.ctype !== 'number') {
        return nada;
    }
    var pt2 = List.turnIntoCSList([pt.x, pt.y, pt.z]);
    return {
        ctype: "shape",
        type: "circle",
        value: List.turnIntoCSList([pt2, v1])
    };
};

evaluator.screen$0 = function(args, modifs) {
    var m = csport.drawingstate.initialmatrix;
    var transf = function(px, py) {
        var xx = px - m.tx;
        var yy = py + m.ty;
        var x = (xx * m.d - yy * m.b) / m.det;
        var y = -(-xx * m.c + yy * m.a) / m.det;
        var erg = {
            X: x,
            Y: y
        };
        return erg;
    };
    var erg = [
        transf(0, 0),
        transf(csw, 0),
        transf(csw, csh),
        transf(0, csh)
    ];
    return {
        ctype: "shape",
        type: "polygon",
        value: [erg]
    };
};

evaluator.halfplane$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var w0 = evaluateAndHomog(v0);
    var w1 = evaluateAndHomog(v1);
    if (v0 !== nada && v1 !== nada) {
        var u0 = v0.usage;
        var u1 = v1.usage;
        var p = w0;
        var l = w1;
        if (u0 === "Line" || u1 === "Point") {
            p = w1;
            l = w0;
        }
        //OK im Folgenden lässt sich viel optimieren
        var tt = List.turnIntoCSList([l.value[0], l.value[1], CSNumber.zero]);
        var erg = List.cross(tt, p);
        var foot = List.cross(l, erg);
        foot = General.div(foot, foot.value[2]);
        p = General.div(p, p.value[2]);
        var diff = List.sub(p, foot);
        var nn = List.abs(diff);
        diff = General.div(diff, nn);

        var sx = foot.value[0].value.real;
        var sy = foot.value[1].value.real;
        var dx = diff.value[0].value.real * 1000;
        var dy = diff.value[1].value.real * 1000;

        var pp1 = {
            X: sx + dy / 2,
            Y: sy - dx / 2
        };
        var pp2 = {
            X: sx + dy / 2 + dx,
            Y: sy - dx / 2 + dy
        };
        var pp3 = {
            X: sx - dy / 2 + dx,
            Y: sy + dx / 2 + dy
        };
        var pp4 = {
            X: sx - dy / 2,
            Y: sy + dx / 2
        };
        return {
            ctype: "shape",
            type: "polygon",
            value: [
                [pp1, pp2, pp3, pp4]
            ]
        };
    }
    return nada;
};

///////////////////////////////
//   Geometric elements      //
///////////////////////////////

evaluator.element$1 = function(args, modifs) {
    var name = evaluate(args[0]);
    if (name.ctype === "string")
        if (csgeo.csnames.hasOwnProperty(name.value))
            return {
                ctype: "geo",
                value: csgeo.csnames[name.value]
            };
    return nada;
};

// helper for all*(<geoobject>)
eval_helper.all$1 = function(args, filter) {
    var arg = evaluate(args[0]);
    if (arg.ctype !== "geo") return List.nil; // or nada?
    if (!arg.value.incidences) return List.nil;
    return List.ofGeos(arg.value.incidences.map(function(name) {
        return csgeo.csnames[name];
    }).filter(filter));
};

evaluator.allpoints$0 = function(args, modifs) {
    return List.ofGeos(csgeo.points);
};

evaluator.allpoints$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "P";
    });
};

evaluator.allmasses$0 = function(args, modifs) {
    return List.ofGeos(masses);
};

evaluator.allmasses$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "P" &&
            el.behavior && el.behavior.type === "Mass";
    });
};

evaluator.allsprings$0 = function(args, modifs) {
    return List.ofGeos(springs);
};

evaluator.allsprings$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "S" &&
            el.behavior && el.behavior.type === "Spring";
    });
};

evaluator.alllines$0 = function(args, modifs) {
    return List.ofGeos(csgeo.lines);
};

evaluator.alllines$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "L" || el.kind === "S";
    });
};

evaluator.allsegments$0 = function(args, modifs) {
    return List.ofGeos(csgeo.lines.filter(function(el) {
        return el.kind === "S";
    }));
};

evaluator.allsegments$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "S";
    });
};

evaluator.allconics$0 = function(args, modifs) {
    return List.ofGeos(csgeo.conics);
};

evaluator.allconics$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "C";
    });
};

evaluator.allcircles$0 = function(args, modifs) {
    return List.ofGeos(csgeo.conics.filter(function(el) {
        return el.matrix.usage === "Circle";
    }));
};

evaluator.allcircles$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return el.kind === "C" && el.matrix.usage === "Circle";
    });
};

evaluator.allelements$0 = function(args, modifs) {
    return List.ofGeos(csgeo.gslp);
};

evaluator.allelements$1 = function(args, modifs) {
    return eval_helper.all$1(args, function(el) {
        return true;
    });
};

evaluator.elementsatmouse$0 = function(args, modifs) {
    var eps = 0.5;
    var mouse = List.realVector([csmouse[0], csmouse[1], 1]);

    var distMouse = function(p) {
        if (CSNumber._helper.isAlmostZero(p.value[2])) return Infinity;
        var pz = List.normalizeZ(p);
        return List.abs(List.sub(pz, mouse)).value.real;
    };

    var getPerp = function(l) {
        var fp = List.turnIntoCSList([l.value[0], l.value[1], CSNumber.zero]);
        return List.normalizeMax(List.cross(mouse, fp));
    };

    var inciPP = function(p) {
        return (distMouse(p.homog) < eps);
    };

    var inciPL = function(l) {
        var perp = getPerp(l.homog);
        var pp = List.normalizeMax(List.cross(l.homog, perp));
        var d = distMouse(pp);
        return (d < eps);
    };

    var inciPC = function(c) {
        var l = General.mult(c.matrix, mouse);
        var perp = getPerp(l);
        var sect = geoOps._helper.IntersectLC(perp, c.matrix);
        var dists = sect.map(function(el) {
            return distMouse(el);
        });

        var erg = Math.min(dists[0], dists[1]);

        return (erg < eps);
    };

    var points = csgeo.points.filter(inciPP);

    var lines = csgeo.lines.filter(function(el) {
        var val = inciPL(el);
        // fetch segment
        if (val && el.kind === "S") {
            var line = el.homog;
            var tt = List.turnIntoCSList([line.value[0], line.value[1], CSNumber.zero]);
            var cr = List.crossratio3(
                el.farpoint, el.startpos, el.endpos, mouse, tt).value.real;
            if (cr < 0 || cr > 1) val = false;
        }

        return val;
    });

    var conics = csgeo.conics.filter(function(el) {
        var val = inciPC(el);
        // fetch arc
        if (val && el.isArc) {
            var cr = List.crossratio3harm(el.startPoint, el.endPoint,
                el.viaPoint, mouse, List.ii);
            var m = cr.value[0];
            var n = cr.value[1];
            if (!CSNumber._helper.isAlmostZero(m)) {
                n = CSNumber.div(n, m);
                m = CSNumber.real(1);
            } else {
                m = CSNumber.div(m, n);
                n = CSNumber.real(1);
            }
            var nor = List.abs(List.turnIntoCSList([n, m]));
            m = CSNumber.div(m, nor);
            n = CSNumber.div(n, nor);

            var prod = CSNumber.mult(n, m);
            if (m.value.real < 0) prod = CSNumber.neg(prod);

            if (prod.value.real < 0) val = false;
        }
        return val;
    });


    var elts = points.concat(lines, conics);

    return List.ofGeos(elts);
};

evaluator.incidences$1 = evaluator.allelements$1;

evaluator.createpoint$2 = function(args, modifs) {
    var name = evaluate(args[0]);
    var pos = evaluateAndHomog(args[1]);

    if (name.ctype !== "string") {
        console.log("Name must be a string");
        return nada;
    }

    if (pos.ctype !== "list" && List.isNumberVector(pos)) {
        console.log("Position must be a number vector");
        return nada;
    }

    var el = {
        name: name.value,
        type: "Free",
        labeled: true,
        pos: pos
    };

    return addElement(el);
};

evaluator.create$3 = function(args, modifs) {
    var names = evaluate(args[0]);
    var type = evaluate(args[1]);
    var defs = evaluate(args[2]);

    var name, el, i;
    if (names.ctype === "string") {
        name = names.value;
    } else if (names.ctype !== "list") {
        console.log("Names must be a string or a list of strings");
        return nada;
    } else if (names.value.length !== 1) {
        // Create the compound object, then Select objects to split it up
        name = General.string(names.value.map(function(name) {
            return name.value;
        }).join("__"));
        el = evaluator.create$3([name, type, defs], modifs);
        if (el !== nada) {
            type = General.string(el.kind.replace(/^(.*)s$/, "Select$1"));
            defs = List.turnIntoCSList([General.string(el.name)]);
            for (i = 0; i < names.value.length; ++i) {
                evaluator.create$3([names.value[i], type, defs], {
                    index: CSNumber.real(i + 1)
                });
            }
        }
        return el;
    } else if (names.value[0].ctype !== "string") {
        console.log("Element of names list must be a string");
        return nada;
    } else {
        name = names.value[0].value;
    }
    if (type.ctype !== "string") {
        console.log("Type must be a string");
        return nada;
    }
    if (defs.ctype !== "list") {
        console.log("Arguments must be a list");
        return nada;
    }

    if (!geoOps.hasOwnProperty(type.value) &&
        !geoAliases.hasOwnProperty(type.value) &&
        !geoMacros.hasOwnProperty(type.value)) {
        console.log("Invalid geometric operation: '" + type.value + "'");
        return nada;
    }

    var a = [];
    var pos = null;

    for (i = 0; i < defs.value.length; i++) {
        var def = defs.value[i];

        if (def.ctype === "string") {
            a.push(def.value);
        } else if (def.ctype === "geo") {
            a.push(def.value.name);
        } else {
            var vec = evaluateAndHomog(def);
            if (vec !== nada) {
                pos = vec;
            } else {
                console.log("Unknown argument type");
                return nada;
            }
        }
    }

    el = {
        name: name,
        type: type.value,
        labeled: true
    };

    if (pos)
        el.pos = pos;

    if (a.length > 0)
        el.args = a;

    var index = evaluateAndVal(modifs.index);
    if (index.ctype === "number")
        el.index = index.value.real | 0;

    return addElement(el);
};

///////////////////////////////
//   Calling external code   //
///////////////////////////////

evaluator.javascript$1 = function(args, modifs) {
    var v0 = evaluate(args[0]);
    if (v0.ctype === 'string') {
        var s = v0.value;
        var f = new Function(s); // jshint ignore:line
        f.call(globalInstance); // run code, with CindyJS instance as "this".
    }
    return nada;
};

evaluator.use$1 = function(args, modifs) {
    function defineFunction(name, arity, impl) {
        evaluator[name.toLowerCase() + "$" + arity] = impl;
    }
    var v0 = evaluate(args[0]);
    if (v0.ctype === "string") {
        var name = v0.value,
            cb;
        if (instanceInvocationArguments.plugins)
            cb = instanceInvocationArguments.plugins[name];
        if (!cb)
            cb = CindyJS._pluginRegistry[name];
        if (cb) {
            /* The following object constitutes API for third-party plugins.
             * We should feel committed to maintaining this API.
             */
            cb({
                "instance": globalInstance,
                "config": instanceInvocationArguments,
                "nada": nada,
                "evaluate": evaluate,
                "extractPoint": eval_helper.extractPoint,
                "evaluateAndVal": evaluateAndVal,
                "defineFunction": defineFunction,
                "addShutdownHook": shutdownHooks.push.bind(shutdownHooks),
                "addAutoCleaningEventListener": addAutoCleaningEventListener,
                "getVariable": namespace.getvar.bind(namespace),
                "getInitialMatrix": function() {
                    return csport.drawingstate.initialmatrix;
                },
                "setTextRenderer": function(handlerCanvas, handlerHtml) {
                    textRendererCanvas = handlerCanvas;
                    if (handlerHtml) textRendererHtml = handlerHtml;
                },
                "getImage": function(name, lazy) {
                    if (typeof name === "string")
                        name = General.string(name);
                    var img = imageFromValue(name);
                    if (!img) return null;
                    if (!lazy && img.cdyUpdate)
                        img.cdyUpdate();
                    return img;
                },
                "getMyfunction": function(name) {
                    if (!myfunctions.hasOwnProperty(name))
                        return null;
                    return myfunctions[name];
                }
            });
            return {
                "ctype": "boolean",
                "value": true
            };
        } else {
            console.log("Plugin " + name + " not found");
            return {
                "ctype": "boolean",
                "value": false
            };
        }
    }
    return nada;
};

evaluator.format$2 = function(args, modifs) { //TODO Angles
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var dec;

    function fmtNumber(n) {
        var erg = n.toFixed(dec),
            erg1;
        do {
            erg1 = erg;
            erg = erg.substring(0, erg.length - 1);
        } while (erg !== "" && erg !== "-" && +erg === +erg1);
        return "" + erg1;
    }

    function fmt(v) {
        var r, i, erg;
        if (v.ctype === 'number') {
            r = fmtNumber(v.value.real);
            i = fmtNumber(v.value.imag);
            if (i === "0")
                erg = r;
            else if (i.substring(0, 1) === "-")
                erg = r + " - i*" + i.substring(1);
            else
                erg = r + " + i*" + i;
            return {
                "ctype": "string",
                "value": erg
            };
        }
        if (v.ctype === 'list') {
            return {
                "ctype": "list",
                "value": v.value.map(fmt)
            };
        }
        return {
            "ctype": "string",
            "value": niceprint(v).toString()
        };
    }
    if ((v0.ctype === 'number' || v0.ctype === 'list') && v1.ctype === 'number') {
        dec = Math.max(0, Math.min(20, Math.round(v1.value.real)));
        return fmt(v0);
    }
    return nada;
};

///////////////////////////////
//     Date and time         //
///////////////////////////////

if (!Date.now) Date.now = function() {
    return new Date().getTime();
};
var epoch = 0;

evaluator.timestamp$0 = function(args, modifs) {
    return CSNumber.real(Date.now());
};

evaluator.seconds$0 = function(args, modifs) { //OK
    return CSNumber.real((Date.now() - epoch) / 1000);
};

evaluator.resetclock$0 = function(args, modifs) {
    epoch = Date.now();
    return nada;
};

evaluator.time$0 = function(args, modifs) {
    var now = new Date();
    return List.realVector([
        now.getHours(), now.getMinutes(),
        now.getSeconds(), now.getMilliseconds()
    ]);
};

evaluator.date$0 = function(args, modifs) {
    var now = new Date();
    return List.realVector([
        now.getFullYear(), now.getMonth() + 1, now.getDate()
    ]);
};

evaluator.simulationtime$0 = function(args, modifs) {
    return CSNumber.real(simtime * simunit);
};

evaluator.settimeout$2 = function(args, modifs) {
    var delay = evaluate(args[0]); // delay in seconds
    var code = args[1]; // code to execute, cannot refer to regional variables
    function callback() {
        evaluate(code);
        scheduleUpdate();
    }
    if (delay.ctype === "number") {
        if (typeof window !== "undefined") {
            window.setTimeout(callback, delay.value.real * 1000.0);
        }
    }
    return nada;
};

/***********************************/
/**********    WEBGL     ***********/
/***********************************/

eval_helper.formatForWebGL = function(x) {
    return x.toFixed(10);
};

evaluator.generateWebGL$2 = function(args, modifs) {
    var f = eval_helper.formatForWebGL;
    var expr = args[0];
    var vars = evaluate(args[1]);
    console.log(vars);
    if (vars.ctype !== "list") {
        return nada;
    }

    var varlist = [];
    for (var i = 0; i < vars.value.length; i++) {
        if (vars.value[i].ctype === "string") {
            varlist.push(vars.value[i].value);

        }
    }
    console.log("***********");
    console.log(varlist);
    var li = eval_helper.plotvars(expr);
    console.log(li);

    if (li.indexOf("a") === -1 && li.indexOf("b") === -1 && li.indexOf("c") === -1 && li.indexOf("d") === -1 && li.indexOf("e") === -1 && li.indexOf("f") === -1) {
        var erg = evaluateAndVal(expr);
        expr = erg;

    }

    //   dump(expr);
    if (expr.ctype === "number") {
        return {
            "ctype": "string",
            "value": "vec2(" + f(expr.value.real) + "," + f(expr.value.imag) + ")"
        };
    }
    if (expr.ctype === "variable") {

        return {
            "ctype": "string",
            "value": expr.name
        };
    }
    if (expr.ctype === "string" || expr.ctype === "void") {
        return expr;
    }
    var a, b;
    if (expr.args.length === 2) {
        if (expr.ctype === "infix" || expr.ctype === "function") {
            a = evaluator.compileToWebGL$1([expr.args[0]], {});
            b = evaluator.compileToWebGL$1([expr.args[1]], {});
            if (expr.oper === "+" || expr.oper === "add") {
                if (a.value === undefined || a.ctype === "void") {
                    return {
                        "ctype": "string",
                        "value": b.value
                    };

                } else {
                    return {
                        "ctype": "string",
                        "value": "addc(" + a.value + "," + b.value + ")"
                    };
                }

            }
            if (expr.oper === "*" || expr.oper === "mult") {
                return {
                    "ctype": "string",
                    "value": "multc(" + a.value + "," + b.value + ")"
                };
            }
            if (expr.oper === "/" || expr.oper === "div") {
                return {
                    "ctype": "string",
                    "value": "divc(" + a.value + "," + b.value + ")"
                };
            }
            if (expr.oper === "-" || expr.oper === "sub") {
                if (a.value === undefined || a.ctype === "void") {
                    return {
                        "ctype": "string",
                        "value": "negc(" + b.value + ")"
                    };

                } else {
                    return {
                        "ctype": "string",
                        "value": "subc(" + a.value + "," + b.value + ")"
                    };
                }
            }
            if (expr.oper === "^" || expr.oper === "pow") {
                return {
                    "ctype": "string",
                    "value": "powc(" + a.value + "," + b.value + ")"
                };
            }
        }
    }

    if ((expr.ctype === "function") && (expr.args.length === 1)) {
        a = evaluator.compileToWebGL$1([expr.args[0]], {});
        if (expr.oper === "sin$1") {
            return {
                "ctype": "string",
                "value": "sinc(" + a.value + ")"
            };
        }
        if (expr.oper === "cos$1") {
            return {
                "ctype": "string",
                "value": "cosc(" + a.value + ")"
            };
        }
        if (expr.oper === "tan$1") {
            return {
                "ctype": "string",
                "value": "tanc(" + a.value + ")"
            };
        }
        if (expr.oper === "exp$1") {
            return {
                "ctype": "string",
                "value": "expc(" + a.value + ")"
            };
        }
        if (expr.oper === "log$1") {
            return {
                "ctype": "string",
                "value": "logc(" + a.value + ")"
            };
        }
        if (expr.oper === "arctan$1") {
            return {
                "ctype": "string",
                "value": "arctanc(" + a.value + ")"
            };
        }
        if (expr.oper === "arcsin$1") {
            return {
                "ctype": "string",
                "value": "arcsinc(" + a.value + ")"
            };
        }
        if (expr.oper === "arccos$1") {
            return {
                "ctype": "string",
                "value": "arccosc(" + a.value + ")"
            };
        }
        if (expr.oper === "sqrt$1") {
            return {
                "ctype": "string",
                "value": "sqrtc(" + a.value + ")"
            };
        }
    }

    return nada;

};


evaluator.compileToWebGL$1 = function(args, modifs) {
    var a, b;
    var f = eval_helper.formatForWebGL;
    var expr = args[0];
    var li = eval_helper.plotvars(expr);

    if (li.indexOf("a") === -1 && li.indexOf("b") === -1 && li.indexOf("c") === -1 && li.indexOf("d") === -1 && li.indexOf("e") === -1 && li.indexOf("f") === -1) {
        var erg = evaluateAndVal(expr);
        expr = erg;

    }

    //   dump(expr);
    if (expr.ctype === "number") {
        return {
            "ctype": "string",
            "value": "vec2(" + f(expr.value.real) + "," + f(expr.value.imag) + ")"
        };
    }
    if (expr.ctype === "variable") {

        return {
            "ctype": "string",
            "value": expr.name
        };
    }
    if (expr.ctype === "string" || expr.ctype === "void") {
        return expr;
    }
    if (expr.args.length === 2) {
        if (expr.ctype === "infix" || expr.ctype === "function") {
            a = evaluator.compileToWebGL$1([expr.args[0]], {});
            b = evaluator.compileToWebGL$1([expr.args[1]], {});
            if (expr.oper === "+" || expr.oper === "add") {
                if (a.value === undefined || a.ctype === "void") {
                    return {
                        "ctype": "string",
                        "value": b.value
                    };

                } else {
                    return {
                        "ctype": "string",
                        "value": "addc(" + a.value + "," + b.value + ")"
                    };
                }

            }
            if (expr.oper === "*" || expr.oper === "mult") {
                return {
                    "ctype": "string",
                    "value": "multc(" + a.value + "," + b.value + ")"
                };
            }
            if (expr.oper === "/" || expr.oper === "div") {
                return {
                    "ctype": "string",
                    "value": "divc(" + a.value + "," + b.value + ")"
                };
            }
            if (expr.oper === "-" || expr.oper === "sub") {
                if (a.value === undefined || a.ctype === "void") {
                    return {
                        "ctype": "string",
                        "value": "negc(" + b.value + ")"
                    };

                } else {
                    return {
                        "ctype": "string",
                        "value": "subc(" + a.value + "," + b.value + ")"
                    };
                }
            }
            if (expr.oper === "^" || expr.oper === "pow") {
                return {
                    "ctype": "string",
                    "value": "powc(" + a.value + "," + b.value + ")"
                };
            }
        }
    }
    if ((expr.ctype === "function") && (expr.args.length === 1)) {
        a = evaluator.compileToWebGL$1([expr.args[0]], {});

        if (expr.oper === "sin$1") {
            return {
                "ctype": "string",
                "value": "sinc(" + a.value + ")"
            };
        }
        if (expr.oper === "cos$1") {
            return {
                "ctype": "string",
                "value": "cosc(" + a.value + ")"
            };
        }
        if (expr.oper === "tan$1") {
            return {
                "ctype": "string",
                "value": "tanc(" + a.value + ")"
            };
        }
        if (expr.oper === "exp$1") {
            return {
                "ctype": "string",
                "value": "expc(" + a.value + ")"
            };
        }
        if (expr.oper === "log$1") {
            return {
                "ctype": "string",
                "value": "logc(" + a.value + ")"
            };
        }
        if (expr.oper === "arctan$1") {
            return {
                "ctype": "string",
                "value": "arctanc(" + a.value + ")"
            };
        }
        if (expr.oper === "arcsin$1") {
            return {
                "ctype": "string",
                "value": "arcsinc(" + a.value + ")"
            };
        }
        if (expr.oper === "arccos$1") {
            return {
                "ctype": "string$1",
                "value": "arccosc(" + a.value + ")"
            };
        }
        if (expr.oper === "sqrt$1") {
            return {
                "ctype": "string",
                "value": "sqrtc(" + a.value + ")"
            };
        }
    }
    return nada;
};


/************************************/
/**********    PHYSICS    ***********/
/************************************/


evaluator.setsimulationspeed$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        setSpeed(v0.value.real);
    }
    return nada;
};

evaluator.setsimulationaccuracy$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        if (typeof(labObjects) !== "undefined" && typeof(labObjects.env) !== "undefined") {
            labObjects.env.accuracy = Math.max(1, v0.value.real | 0);
        }
    }
    return nada;
};

evaluator.setsimulationquality$1 = function(args, modifs) {

    var v0 = evaluateAndVal(args[0]);
    if (v0.ctype === 'number') {
        if (typeof(labObjects) !== "undefined" && typeof(labObjects.env) !== "undefined") {
            var qual = v0.value.real;
            if (qual === 0) {
                labObjects.env.errorbound = 0.01;
                labObjects.env.lowestdeltat = 0.00001;
                labObjects.env.slowdownfactor = 2;
            }
            if (qual === 1) {
                labObjects.env.errorbound = 0.001;
                labObjects.env.lowestdeltat = 0.0000001;
                labObjects.env.slowdownfactor = 2;
            }
            if (qual === 2) {
                labObjects.env.errorbound = 0.00001;
                labObjects.env.lowestdeltat = 0.0000000001;
                labObjects.env.slowdownfactor = 4;
            }
            if (qual === 3) {
                labObjects.env.errorbound = 0.000001;
                labObjects.env.lowestdeltat = 0.000000000001;
                labObjects.env.slowdownfactor = 4;
            }
        }
    }
    return nada;
};

var activeButton = null;
var statusbar = null;

evaluator.createtool$3 = function(args, modifs) {
    var modif;
    var xref = "left";
    var yref = "top";

    var space = null;
    if (modifs.space) {
        modif = evaluate(modifs.space);
        if (modif.ctype === "number") {
            space = modif.value.real / 2;
        }
    }

    var toolbar = null;
    if (modifs.toolbar) {
        modif = evaluate(modifs.toolbar);
        if (modif.ctype === "string") {
            toolbar = document.getElementById(modif.value);
            if (!toolbar)
                console.warn("Element #" + modif.value + " not found");
        }
    }
    if (!toolbar) {
        if (modifs.reference) {
            var ref = evaluate(modifs.reference);
            if (ref.ctype === "string") {
                switch (ref.value) {
                    case "UR":
                        xref = "right";
                        break;
                    case "LL":
                        yref = "bottom";
                        break;
                    case "LR":
                        xref = "right";
                        yref = "bottom";
                }
            }
        }
        toolbar = document.createElement("div");
        toolbar.className = "CindyJS-toolbar";
        canvas.parentNode.appendChild(toolbar);
        var x = evaluate(args[1]);
        var y = evaluate(args[2]);
        if (x.ctype === "number")
            toolbar.style[xref] = x.value.real + "px";
        if (y.ctype === "number")
            toolbar.style[yref] = y.value.real + "px";
        if (space !== null)
            toolbar.style.margin = (-space) + "px";
    }

    var names = evaluate(args[0]);
    if (names.ctype === "string") {
        names = [
            [names.value]
        ];
    } else if (names.ctype === "list") {
        names = names.value.map(function(row) {
            if (row.ctype === "string") {
                return [row.value];
            } else if (row.ctype === "list") {
                return row.value.map(function(name) {
                    if (name.ctype === "string") {
                        return name.value;
                    } else {
                        return null;
                    }
                });
            } else {
                return [null];
            }
        });
    } else {
        console.log("Name must be a string or a list of strings");
        return nada;
    }

    if (modifs.flipped) {
        modif = evaluate(modifs.flipped);
        if (modif.ctype === "boolean" && modif.value) {
            console.log("Flipping");
            var ncols = 0;
            var nrows = names.length;
            names.forEach(function(row) {
                if (row.length > ncols)
                    ncols = row.length;
            });
            var flipped = [];
            for (var i = 0; i < ncols; ++i) {
                flipped[i] = [];
                for (var j = 0; j < nrows; ++j) {
                    flipped[i][j] = names[j][i] || null;
                }
            }
            names = flipped;
        }
    }

    if (yref === "bottom") names.reverse();
    names.forEach(function(row) {
        if (xref === "right") row.reverse();
        var rowElt = document.createElement("div");
        toolbar.appendChild(rowElt);
        row.forEach(function(name) {
            if (!tools.hasOwnProperty(name)) {
                console.log("Tool '" + name + "' not implemented yet.");
                name = null;
            }
            if (name === null) {
                var spacer = document.createElement("span");
                spacer.className = "CindyJS-spacer";
                rowElt.appendChild(spacer);
                return;
            }
            var button = document.createElement("button");
            var img = document.createElement("img");
            img.src = CindyJS.getBaseDir() + "images/" + name + ".png";
            button.appendChild(img);

            function click() {
                if (activeButton)
                    activeButton.classList.remove("CindyJS-active");
                activeButton = button;
                button.classList.add("CindyJS-active");
                setActiveTool(name);
            }

            button.addEventListener("click", click);
            if (!activeButton) click();
            if (space !== null) button.style.margin = space + "px";
            rowElt.appendChild(button);
        });
    });

    return nada;
};

evaluator.dropped$0 = function() {
    return dropped;
};


evaluator.droppoint$0 = function() {
    return dropPoint;
};

evaluator.parsecsv$1 = function(args, modifs) {
    var autoconvert = true;
    var mcon = evaluateAndVal(modifs.autoconvert);
    if (mcon.ctype === "boolean") autoconvert = mcon.value;

    var delim = null;
    var md = evaluateAndVal(modifs.delimiter);
    if (md.ctype === "string" && /^[^\"\r\n]$/.test(md.value))
        delim = md.value;

    var str = evaluateAndVal(args[0]);
    if (str.ctype !== "string") {
        console.log("CSV data is not a string");
        return nada;
    }
    str = str.value;

    var re = '(?:"((?:[^"]+|"")*)"|([^]*?))(\r\n|(,)|[\r\n]|$)';
    // captures:  1             1  2     2 3     4 4         3
    if (delim) {
        // see replace$3
        delim = delim
            .replace(/[^A-Za-z0-9]/g, "\\$&")
            .replace(/\$/g, "$$$$");
        re = re.replace(/,/g, delim);
    }
    re = new RegExp(re, "g");

    var row = [];
    var data = [];
    var ncols = null;
    while (re.lastIndex < str.length) {
        var match = re.exec(str);
        var itm = match[2];
        if (typeof match[1] === "string")
            itm = match[1].replace(/""/g, '"');
        if (!autoconvert)
            itm = General.string(itm);
        else if (/^[Tt]rue$/.test(itm))
            itm = General.bool(true);
        else if (/^[Ff]alse$/.test(itm))
            itm = General.bool(false);
        else if (/^[\-+]?([0-9]+(\.[0-9]*)?|\.[0-9]+|Infinity)$/.test(itm))
            itm = CSNumber.real(Number(itm));
        else
            itm = General.string(itm);
        row.push(itm);
        if (match[4] && re.lastIndex === str.length) {
            // last row ended with a delimiter
            row.push(General.string(""));
            match = {}; // fall through to end-of-input handling below
        }
        if (!match[4]) { // end of row
            if (ncols === null)
                ncols = row.length;
            if (ncols < row.length) {
                ncols = row.length;
                for (var i = 0; i < data.length; ++i)
                    for (var j = data[i].length; j < ncols; ++j)
                        data[i][j] = nada;
            } else if (ncols > row.length) {
                for (var k = row.length; k < ncols; ++k)
                    row[k] = nada;
            }
            data.push(row);
            row = [];
        }
    }
    return List.turnIntoCSList(data.map(List.turnIntoCSList));
};

evaluator.load$2 = function(args, modifs) {
    return evaluator.load$3([args[0], null, args[1]], modifs);
};

evaluator.load$3 = function(args, modifs) {
    var varname = '#';
    if (args[1] !== null) {
        if (args[1].ctype === 'variable') {
            varname = args[1].name;
        }
    }
    var arg0 = evaluateAndVal(args[0]);
    var url = null;
    var req = null;
    if (arg0.ctype === "string" && /^https?:\/\//.test(arg0.value)) {
        url = arg0.value;
    }
    if (url !== null) {
        req = new XMLHttpRequest();
        req.onreadystatechange = handleStateChange;
        req.open("GET", url);
        req.send();
        return General.bool(true);
    }
    return nada;

    function handleStateChange() {
        if (req.readyState !== XMLHttpRequest.DONE) return;
        var value;
        if (req.status === 200) {
            value = General.string(String(req.responseText));
        } else {
            csconsole.err("Failed to load " + url + ": " + req.statusText);
            value = nada;
        }
        namespace.newvar(varname);
        namespace.setvar(varname, value);
        evaluate(args[2]);
        namespace.removevar(varname);
        scheduleUpdate();
    }

};
//*******************************************************
// and here are the definitions of the drawing operators
//*******************************************************


eval_helper.extractPoint = function(v1) {
    var erg = {};
    erg.ok = false;
    if (v1.ctype === 'geo') {
        var val = v1.value;
        if (val.kind === "P") {
            erg.x = Accessor.getField(val, "x").value.real;
            erg.y = Accessor.getField(val, "y").value.real;
            erg.ok = true;
            return erg;
        }

    }
    if (v1.ctype !== 'list') {
        return erg;
    }

    var pt1 = v1.value;
    var x = 0;
    var y = 0;
    var z = 0,
        n1, n2, n3;
    if (pt1.length === 2) {
        n1 = pt1[0];
        n2 = pt1[1];
        if (n1.ctype === 'number' && n2.ctype === 'number') {
            erg.x = n1.value.real;
            erg.y = n2.value.real;
            erg.ok = true;
            return erg;
        }
    }

    if (pt1.length === 3) {
        n1 = pt1[0];
        n2 = pt1[1];
        n3 = pt1[2];
        if (n1.ctype === 'number' && n2.ctype === 'number' && n3.ctype === 'number') {
            n1 = CSNumber.div(n1, n3);
            n2 = CSNumber.div(n2, n3);
            erg.x = n1.value.real;
            erg.y = n2.value.real;
            erg.ok = true;
            return erg;
        }
    }

    return erg;

};

evaluator.draw$1 = function(args, modifs) {

    var v1 = evaluateAndVal(args[0]);
    if (v1.ctype === "shape") {
        eval_helper.drawshape(v1, modifs);
    } else if (v1.usage === "Line") {
        Render2D.handleModifs(modifs, Render2D.lineModifs);
        Render2D.drawline(v1);
    } else {
        var pt = eval_helper.extractPoint(v1);

        if (!pt.ok) {
            if (typeof(v1.value) !== "undefined") { //eventuell doch ein Segment
                if (v1.value.length === 2) {
                    return evaluator.draw$2(v1.value, modifs);
                }
            }
            return;
        }

        if (modifs !== null) {
            Render2D.handleModifs(modifs, Render2D.pointModifs);
        }
        Render2D.drawpoint(pt);
    }
    return nada;
};

evaluator.draw$2 = function(args, modifs) {
    var v1 = evaluateAndVal(args[0]);
    var v2 = evaluateAndVal(args[1]);
    var pt1 = eval_helper.extractPoint(v1);
    var pt2 = eval_helper.extractPoint(v2);
    if (!pt1.ok || !pt2.ok) {
        return nada;
    }
    if (modifs !== null) {
        Render2D.handleModifs(modifs, Render2D.lineModifs);
    }
    Render2D.drawsegcore(pt1, pt2);
    return nada;
};

evaluator.drawcircle$2 = function(args, modifs) {
    return eval_helper.drawcircle(args, modifs, "D");
};


eval_helper.arcHelper = function(args) {
    var arc = {};
    arc.startPoint = evaluateAndHomog(args[0]);
    arc.viaPoint = evaluateAndHomog(args[1]);
    arc.endPoint = evaluateAndHomog(args[2]);
    return arc;
};

evaluator.fillcircle$2 = function(args, modifs) {
    return eval_helper.drawcircle(args, modifs, "F");
};

evaluator.drawarc$3 = function(args, modifs) {
    var arc = eval_helper.arcHelper(args);
    return eval_helper.drawarc(arc, modifs, "D");
};

evaluator.fillarc$3 = function(args, modifs) {
    var arc = eval_helper.arcHelper(args);
    return eval_helper.drawarc(arc, modifs, "F");
};


eval_helper.drawarc = function(args, modifs, df) {
    var a = args.startPoint;
    var b = args.viaPoint;
    var c = args.endPoint;

    // check for complex values
    if (!List._helper.isAlmostReal(List.turnIntoCSList([a, b, c]))) return nada;

    // modifs handling
    Render2D.handleModifs(modifs, Render2D.conicModifs);
    Render2D.preDrawCurve();

    var abcdet = List.det3(a, b, c);

    if (Math.abs(abcdet.value.real) > 1e-12) { // we have an arc, not segment
        var con = geoOps._helper.ConicBy5(null, a, b, c, List.ii, List.jj);
        var cen = geoOps._helper.CenterOfConic(con);
        cen = List.normalizeMax(cen);

        var zer = CSNumber.real(0);

        // move center of conic to origin
        var mat = List.turnIntoCSList([
            List.turnIntoCSList([cen.value[2], zer, CSNumber.neg(cen.value[0])]),
            List.turnIntoCSList([zer, cen.value[2], CSNumber.neg(cen.value[1])]),
            List.turnIntoCSList([zer, zer, cen.value[2]])
        ]);
        var aa = List.normalizeZ(General.mult(mat, a));
        var bb = List.normalizeZ(General.mult(mat, b));
        var cc = List.normalizeZ(General.mult(mat, c));


        // get angles of A and C 
        var startAngle = -Math.atan2(aa.value[1].value.real, aa.value[0].value.real);
        var endAngle = -Math.atan2(cc.value[1].value.real, cc.value[0].value.real);

        cen = List.normalizeZ(cen);
        a = List.normalizeZ(a);
        b = List.normalizeZ(b);
        c = List.normalizeZ(c);
        var arcDist = List.abs(List.sub(a, cen));

        // x, y vals of the center
        var pt = [cen.value[0].value.real, cen.value[1].value.real];

        // transform to canvas
        var m = csport.drawingstate.matrix;
        var xx = pt[0] * m.a - pt[1] * m.b + m.tx;
        var yy = pt[0] * m.c - pt[1] * m.d - m.ty;


        // check for counter clockwise drawing
        var cclock = List.det3(a, b, c).value.real > 0;

        csctx.save();

        // canvas circle radius 
        var rad = arcDist.value.real * m.sdet;

        csctx.beginPath();
        csctx.translate(xx, yy);

        // use the canvas arc function -- buggy in Chrome at least in Okt 15
        // looks fine in Sept 16
        var useArc = true;

        if (useArc) {
            csctx.arc(0, 0, arcDist.value.real * m.sdet, startAngle, endAngle, cclock);
        } else {
            var num = 500; // Number of segments

            //  mod 2 pi in case startAngle > endAngle
            if (startAngle > endAngle) endAngle = endAngle + Math.PI * 2;

            // divide segments --  rotate counterclockwise if necessary
            var ntler = !cclock ? (endAngle - startAngle) / num : -(2 * Math.PI - endAngle + startAngle) / num;

            // drawing
            csctx.moveTo(rad * Math.cos(startAngle), rad * Math.sin(startAngle));
            var angl;
            for (var ii = 0; ii <= num; ii++) {
                angl = startAngle + ii * ntler;
                csctx.lineTo(rad * Math.cos(angl), rad * Math.sin(angl));
            }
        }


        if (df === "F") {
            csctx.fillStyle = Render2D.lineColor;
            csctx.closePath();
            csctx.fill();
        }

        if (df === "D") {
            csctx.stroke();
        }
        csctx.restore();

    } else { // segment case
        if (df !== "D") return nada; // Nothing to fill in the degenerate case
        var ptA = eval_helper.extractPoint(a);
        var ptB = eval_helper.extractPoint(b);
        var ptC = eval_helper.extractPoint(c);
        if (!ptA.ok || !ptB.ok || !ptC.ok) return nada;

        // dists
        var dAB = (ptA.x - ptB.x) * (ptA.x - ptB.x) + (ptA.y - ptB.y) * (ptA.y - ptB.y);
        var dAC = (ptA.x - ptC.x) * (ptA.x - ptC.x) + (ptA.y - ptC.y) * (ptA.y - ptC.y);
        var dBC = (ptC.x - ptB.x) * (ptC.x - ptB.x) + (ptC.y - ptB.y) * (ptC.y - ptB.y);

        // if 2 points are the same return nada;
        if (dAB < 1e-12 || dAC < 1e-12 || dBC < 1e-12) return nada;

        // check by dets if B is in the middle
        var crossr = List.crossratio3(a, c, b, List.cross(List.cross(a, b), List.linfty), List.ii);
        var Bmiddle = crossr.value.real < 0;

        // if B is in the middle we are fine
        if (Bmiddle) {
            Render2D.drawsegcore(ptA, ptC);
        } else { // nasty case -- B not in the middle -- we have 2 ray to infinity
            Render2D.drawRaySegment(a, c);
        }
    }

    return nada;
};


// draw circle with from alp to bet (for circle 0 to 2*pi)
eval_helper.drawcircle = function(args, modifs, df) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);

    var pt = eval_helper.extractPoint(v0);


    if (!pt.ok || v1.ctype !== 'number' || !CSNumber._helper.isAlmostReal(v1)) {
        return nada;
    }

    var m = csport.drawingstate.matrix;

    var xx = pt.x * m.a - pt.y * m.b + m.tx;
    var yy = pt.x * m.c - pt.y * m.d - m.ty;

    Render2D.handleModifs(modifs, Render2D.conicModifs);
    Render2D.preDrawCurve();

    csctx.lineJoin = "miter";
    csctx.beginPath();
    csctx.arc(xx, yy, Math.abs(v1.value.real) * m.sdet, 0, 2 * Math.PI);
    csctx.closePath();

    if (df === "D") {
        csctx.stroke();
    }
    if (df === "F") {
        csctx.fillStyle = Render2D.lineColor;
        csctx.fill();
    }
    if (df === "C") {
        csctx.clip();
    }

    /* CanvasRenderingContext2D.arc in Chrome is buggy. See #259
     * But drawconic doesn't handle filling, so it's no replacement.
    var xx = pt.x;
    var yy = pt.y;
    var rad = v1.value.real;


    var cMat = List.realMatrix([
        [1, 0, -xx],
        [0, 1, -yy],
        [-xx, -yy, xx * xx + yy * yy - rad * rad]
    ]);

    eval_helper.drawconic(cMat, modifs);
    */

    return nada;
};

evaluator.drawconic$1 = function(args, modifs) {
    var Conic = {};
    Conic.usage = "conic";

    var arr = evaluateAndVal(args[0]);

    if (arr.ctype !== "list" || arr.value.length !== 3 && arr.value.length !== 6) {
        console.error("could not parse conic");
        return nada;
    }

    if (arr.value.length === 6) { // array case

        for (var i = 0; i < 6; i++) // check for faulty arrays
            if (arr.value[i].ctype !== "number") {
                console.error("could not parse conic");
                return nada;
            }

        var half = CSNumber.real(0.5);

        var a = arr.value[0];
        var b = arr.value[2];
        b = CSNumber.mult(b, half);
        var c = arr.value[1];
        var d = arr.value[3];
        d = CSNumber.mult(d, half);
        var e = arr.value[4];
        e = CSNumber.mult(e, half);
        var f = arr.value[5];

        var mat = List.turnIntoCSList([
            List.turnIntoCSList([a, b, d]),
            List.turnIntoCSList([b, c, e]),
            List.turnIntoCSList([d, e, f])
        ]);
        Conic.matrix = mat;
    } else { // matrix case

        for (var ii = 0; ii < 3; ii++) // check for faulty arrays
            for (var jj = 0; jj < 3; jj++)
                if (arr.value[ii].value[jj].ctype !== "number") {
                    console.error("could not parse conic");
                    return nada;
                }

        if (!List.equals(arr, List.transpose(arr)).value) { // not symm case
            var aa = General.mult(arr, CSNumber.real(0.5));
            var bb = General.mult(List.transpose(arr), CSNumber.real(0.5));
            arr = List.add(aa, bb);
            Conic.matrix = arr;
        } else {
            Conic.matrix = arr;
        }


    }
    Conic.matrix = List.normalizeMax(Conic.matrix);
    return eval_helper.drawconic(Conic.matrix, modifs);
};

eval_helper.drawconic = function(conicMatrix, modifs) {

    Render2D.handleModifs(modifs, Render2D.conicModifs);
    if (Render2D.lsize === 0)
        return;
    Render2D.preDrawCurve();

    var eps = 1e-14; //JRG Hab ih von 1e-16 runtergesetzt
    var mat = List.normalizeMax(conicMatrix);
    var origmat = mat;

    // check for complex values
    for (var i = 0; i < 2; i++)
        for (var j = 0; j < 2; j++) {
            if (Math.abs(mat.value[i].value[j].value.imag) > CSNumber.eps) return;
        }

    // transform matrix to canvas coordiantes
    var tMatrix1 = List.turnIntoCSList([ // inverse of homog points (0,0), (1,0), (0, 1)
        List.realVector([-1, -1, 1]),
        List.realVector([1, 0, 0]),
        List.realVector([0, 1, 0])
    ]);

    // get canvas coordiantes
    var pt0 = csport.from(0, 0, 1);
    pt0[2] = 1;
    var pt1 = csport.from(1, 0, 1);
    pt1[2] = 1;
    var pt2 = csport.from(0, 1, 1);
    pt2[2] = 1;

    var tMatrix2 = List.turnIntoCSList([
        List.realVector(pt0),
        List.realVector(pt1),
        List.realVector(pt2)
    ]);
    tMatrix2 = List.transpose(tMatrix2);

    var ttMatrix = General.mult(tMatrix2, tMatrix1); // get transformation matrix

    var ittMatrix = List.inverse(ttMatrix);

    // transform Conic
    mat = General.mult(List.transpose(ittMatrix), mat);
    mat = General.mult(mat, ittMatrix);


    var a = mat.value[0].value[0].value.real;
    var b = mat.value[1].value[0].value.real;
    var c = mat.value[1].value[1].value.real;
    var d = mat.value[2].value[0].value.real;
    var e = mat.value[2].value[1].value.real;
    var f = mat.value[2].value[2].value.real;

    var myMat = [
        [a, b, d],
        [b, c, e],
        [d, e, f]
    ];


    var det = a * c * f - a * e * e - b * b * f + 2 * b * d * e - c * d * d;
    var degen = Math.abs(det) < eps;

    // check for circles with very large radius 
    if (degen && conicMatrix.usage === "Circle") {
        var cen = General.mult(List.adjoint3(origmat), List.linfty);
        var zabs = CSNumber.abs(cen.value[2]).value.real;
        // we are not a degenrate circle if our center is finite
        if (zabs > CSNumber.eps) degen = false;
    }

    var cswh_max = csw > csh ? csw : csh;

    var x_zero = -1.5 * cswh_max;
    var x_w = 1.5 * cswh_max; //2 * cswh_max;
    var y_zero = -1.5 * cswh_max;
    var y_h = 1.5 * cswh_max;

    var useRot = 1;
    if (degen) { // since we split then - rotation unnecessary
        useRot = 0;
    }


    if (useRot) {
        var C = [a, b, c, d, e, f];
        var A = [
            [C[0], C[1]],
            [C[1], C[2]]
        ];
        var angle = 0;
        if (Math.abs(a - b) > eps) {
            angle = Math.atan(b / a - c) / 2;
        } else {
            angle = Math.PI / 4;
        }
        var get_rMat = function(angle) {
            var acos = Math.cos(angle);
            var asin = Math.sin(angle);
            return [
                [acos, -asin, 0],
                [asin, acos, 0],
                [0, 0, 1]
            ];
        };


        var rMat = get_rMat(angle);
        rMat = List.realMatrix(rMat);
        var TrMat = List.transpose(rMat);
        var tmp = General.mult(List.realMatrix(myMat), rMat);
        tmp = General.mult(TrMat, tmp);
        a = tmp.value[0].value[0].value.real;
        b = tmp.value[1].value[0].value.real;
        c = tmp.value[1].value[1].value.real;
        d = tmp.value[2].value[0].value.real;
        e = tmp.value[2].value[1].value.real;
        f = tmp.value[2].value[2].value.real;

    }

    var Conic = [a, b, c, d, e, f];

    // split degenerate conic into 1 or 2 lines
    var split_degen = function() {

        //modifs.size= CSNumber.real(2); // TODO fix this
        var erg = geoOps._helper.splitDegenConic(origmat);
        if (erg === nada) return;
        var lg = erg[0];
        var lh = erg[1];

        var arg = [lg];
        evaluator.draw$1(arg, modifs);
        arg[0] = lh;
        evaluator.draw$1(arg, modifs);

    };

    var get_concic_type = function(C) {
        if (C === 'undefined' || C.length !== 6) {
            console.error("this does not define a Conic");
        }

        if (degen) return "degenerate";

        var det = C[0] * C[2] - C[1] * C[1];

        if (Math.abs(det) < eps) {
            return "parabola";
        } else if (det > eps) {
            return "ellipsoid";
        } else {
            return "hyperbola";
        }

    }; // end get_concic_type

    var type = get_concic_type(Conic);

    var norm = function(x0, y0, x1, y1) {
        var norm = Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2);
        return Math.sqrt(norm);
    };

    var is_inside = function(x, y) {
        return (x > 0 && x < csw && y > 0 && y < csh);
    };

    var drawRect = function(x, y, col) {
        csctx.strokeStyle = 'red';
        if (col !== 'undefined') csctx.strokeStyle = col;
        csctx.beginPath();
        csctx.rect(x, y, 10, 10);
        csctx.stroke();
    };
    // arrays to save points on conic
    var arr_x1 = [];
    var arr_x2 = [];
    var arr_y1 = [];
    var arr_y2 = [];
    var arr_xg = [];
    var arr_yg = [];

    var resetArrays = function() {
        arr_x1 = [];
        arr_x2 = [];
        arr_y1 = [];
        arr_y2 = [];
        arr_xg = [];
        arr_yg = [];
    };

    var drawArray = function(x, y) {
        csctx.beginPath();
        csctx.moveTo(x[0], y[0]);
        for (var i = 1; i < x.length; i++) {
            //csctx.moveTo(x[i - 1], y[i - 1]);
            //csctx.fillRect(x[i],y[i],5,5);
            csctx.lineTo(x[i], y[i]);
        }
        csctx.stroke();
    }; // end drawArray


    var eval_conic_x = function(C, ymin, ymax) {
        var x1, x2;
        var type = get_concic_type(C);

        if (C.length !== 6) {
            console.error("Conic needs 6 Parameters");
            return;
        }

        var a = C[0];
        var b = C[1];
        var c = C[2];
        var d = C[3];
        var e = C[4];
        var f = C[5];


        var step;
        var perc = 0.1;
        var diff = ymax - ymin;
        var ssmall = perc * diff + ymin;
        var slarge = ymax - perc * diff;
        for (var y = ymin; y <= ymax; y += step) {
            if (y < ssmall || y > slarge || Math.abs(ymax - ymin) < 100) {
                step = 1 / 2;
            } else if (y < 0 || y > csh) {
                step = 10;
            } else {
                step = 3;
            }

            var inner = -a * c * y * y - 2 * a * e * y - a * f + b * b * y * y + 2 * b * d * y + d * d;
            inner = Math.sqrt(inner);


            x1 = 1 / a * (-b * y - d + inner);
            x2 = -1 / a * (b * y + d + inner);


            var ya, yb, y1, y2;
            if (useRot) {
                var r1 = [x1, y, 1];
                var r2 = [x2, y, 1];
                r1 = General.mult(rMat, List.realVector(r1));
                r2 = General.mult(rMat, List.realVector(r2));
                x1 = r1.value[0].value.real;
                x2 = r2.value[0].value.real;
                y1 = r1.value[1].value.real;
                y2 = r2.value[1].value.real;
            } else {
                y1 = y;
                y2 = y;
            }


            // for ellipsoids we go out of canvas
            if (!isNaN(x1) && type === "ellipsoid") {
                arr_x1.push(x1);
                arr_y1.push(y1);
            } else if (!isNaN(x1) && x1 >= x_zero && x1 <= x_w) {
                arr_x1.push(x1);
                arr_y1.push(y1);
            }

            if (!isNaN(x2) && type === "ellipsoid") {
                arr_x2.push(x2);
                arr_y2.push(y2);
            } else if (!isNaN(x2) && x2 >= x_zero && x2 <= x_w) {
                arr_x2.push(x2);
                arr_y2.push(y2);
            }
        }
    }; // end eval_conic_x

    // calc and draw conic
    var calc_draw = function(C) {
        var ymin, ymax, y0, y1;
        var ttemp;

        var type = get_concic_type(C);


        if (C.length !== 6) {
            console.error("Conic needs 6 Parameters");
            return;
        }

        var a = C[0];
        var b = C[1];
        var c = C[2];
        var d = C[3];
        var e = C[4];
        var f = C[5];

        // these are the actual formulas - we use variables to speed up
        //y0 = (-a*e + b*d - Math.sqrt(a*(-a*c*f + a*Math.pow(e, 2) + Math.pow(b, 2)*f - 2*b*d*e + c*Math.pow(d,2))))/(a*c - Math.pow(b, 2));
        //y1 = (-a*e + b*d + Math.sqrt(a*(-a*c*f + a*Math.pow(e, 2) + Math.pow(b, 2)*f - 2*b*d*e + c*Math.pow(d,2))))/(a*c - Math.pow(b, 2));

        var aebd = -a * e + b * d;
        var largeSqrt = Math.sqrt(a * (-a * c * f + a * Math.pow(e, 2) + Math.pow(b, 2) * f - 2 * b * d * e + c * Math.pow(d, 2)));
        var deNom = a * c - Math.pow(b, 2);

        if (Math.abs(deNom) > eps) {
            y0 = (aebd - largeSqrt) / deNom;
            y1 = (aebd + largeSqrt) / deNom;
        } else {
            y0 = (-a * f + d * d) / (2 * a * e - 2 * b * d);
            y1 = y0;
        }

        if (!isNaN(y0) && y0 > y_zero && y0 < y_h) { // ungly but works
        } else {
            y0 = y_zero;
        }

        if (!isNaN(y1) && y1 > y_zero && y1 < y_h) {} else {
            y1 = y_zero;
        }

        ymin = (y0 < y1 ? y0 : y1);
        ymax = (y0 > y1 ? y0 : y1);


        eval_conic_x(C, y_zero, ymin);
        arr_xg = arr_x1.concat(arr_x2.reverse());
        arr_yg = arr_y1.concat(arr_y2.reverse());
        drawArray(arr_xg, arr_yg);
        resetArrays();


        eval_conic_x(C, ymax, y_h);
        drawArray(arr_x1, arr_y1);
        //drawRect(arr_x1[0], arr_y1[0], "red");
        //console.log(arr_x1, arr_y1);
        //drawRect(arr_x2[0], arr_y2[0], "green");
        // bridge branches
        if (is_inside(arr_x1[0], arr_y1[1]) || is_inside(arr_x2[0], arr_y2[0])) { // drawing bug fix
            csctx.beginPath();
            csctx.moveTo(arr_x1[0], arr_y1[0]);
            csctx.lineTo(arr_x2[0], arr_y2[0]);
            csctx.stroke();
        }
        drawArray(arr_x2, arr_y2);
        resetArrays();


        eval_conic_x(C, ymin, ymax);
        drawArray(arr_x1, arr_y1);
        // bridge branches
        // if (type === "ellipsoid") {
        csctx.beginPath();
        csctx.moveTo(arr_x1[0], arr_y1[0]);
        csctx.lineTo(arr_x2[0], arr_y2[0]);
        csctx.stroke();
        csctx.beginPath();
        csctx.moveTo(arr_x1[arr_x1.length - 1], arr_y1[arr_y1.length - 1]);
        csctx.lineTo(arr_x2[arr_x2.length - 1], arr_y2[arr_y2.length - 1]);
        csctx.stroke();
        //}
        // }
        drawArray(arr_x2, arr_y2);
        resetArrays();
    }; // end calc_draw


    // actually start drawing
    if (!degen) {
        calc_draw(Conic);
    } else {
        split_degen();
    }

}; // end eval_helper.drawconic

evaluator.drawall$1 = function(args, modifs) {
    var v1 = evaluate(args[0]);
    if (v1.ctype === "list") {
        Render2D.handleModifs(modifs, Render2D.pointAndLineModifs);
        for (var i = 0; i < v1.value.length; i++) {
            evaluator.draw$1([v1.value[i]], null);
        }
    }
    return nada;
};

evaluator.connect$1 = function(args, modifs) {
    return eval_helper.drawpolygon(args, modifs, "D", false);
};


evaluator.drawpoly$1 = function(args, modifs) {
    return eval_helper.drawpolygon(args, modifs, "D", true);
};


evaluator.fillpoly$1 = function(args, modifs) {
    return eval_helper.drawpolygon(args, modifs, "F", true);
};

evaluator.drawpolygon$1 = function(args, modifs) {
    return eval_helper.drawpolygon(args, modifs, "D", true);
};


evaluator.fillpolygon$1 = function(args, modifs) {
    return eval_helper.drawpolygon(args, modifs, "F", true);
};


eval_helper.drawpolygon = function(args, modifs, df, cycle) {
    Render2D.handleModifs(modifs, Render2D.conicModifs);
    Render2D.preDrawCurve();


    var m = csport.drawingstate.matrix;

    function drawpolyshape() {
        var polys = v0.value;
        for (var j = 0; j < polys.length; j++) {
            var pol = polys[j];
            var i;
            for (i = 0; i < pol.length; i++) {
                var pt = pol[i];
                var xx = pt.X * m.a - pt.Y * m.b + m.tx;
                var yy = pt.X * m.c - pt.Y * m.d - m.ty;
                if (i === 0)
                    csctx.moveTo(xx, yy);
                else
                    csctx.lineTo(xx, yy);
            }
            csctx.closePath();
        }
    }

    function drawpoly() {
        var i;
        for (i = 0; i < v0.value.length; i++) {
            var pt = eval_helper.extractPoint(v0.value[i]);
            if (!pt.ok) {
                return;
            }
            var xx = pt.x * m.a - pt.y * m.b + m.tx;
            var yy = pt.x * m.c - pt.y * m.d - m.ty;
            if (i === 0)
                csctx.moveTo(xx, yy);
            else
                csctx.lineTo(xx, yy);
        }
        if (cycle)
            csctx.closePath();
    }

    var v0 = evaluate(args[0]);

    csctx.beginPath();
    if (v0.ctype === 'list') {
        drawpoly();
    }
    if (v0.ctype === 'shape') {
        drawpolyshape();
    }

    if (df === "D") {
        if (Render2D.fillColor) {
            csctx.fillStyle = Render2D.fillColor;
            csctx.fill(Render2D.fillrule);
        }
        csctx.stroke();
    }
    if (df === "F") {
        csctx.fillStyle = Render2D.lineColor;
        csctx.fill(Render2D.fillrule);
    }
    if (df === "C") {
        csctx.clip();
    }

    return nada;

};

function defaultTextRendererCanvas(ctx, text, x, y, align, size, lineHeight) {
    if (text.indexOf("\n") !== -1) {
        var left = Infinity;
        var right = -Infinity;
        var top = Infinity;
        var bottom = -Infinity;
        text.split("\n").forEach(function(row) {
            var box = defaultTextRendererCanvas(ctx, row, x, y, align, size);
            if (left > box.left) left = box.left;
            if (right < box.right) right = box.right;
            if (top > box.top) top = box.top;
            if (bottom < box.bottom) bottom = box.bottom;
            y += lineHeight;
        });
        return {
            left: left,
            right: right,
            top: top,
            bottom: bottom
        };
    }
    var m = ctx.measureText(text);
    ctx.fillText(text, x - m.width * align, y);
    // We can't rely on advanced text metrics due to lack of browser support,
    // so we have to guess sizes, the vertical ones in particular.
    return {
        left: x - m.width * align,
        right: x + m.width * (1 - align),
        top: y - 0.7 * 1.2 * size,
        bottom: y + 0.3 * 1.2 * size
    };
}

// This is a hook: the following function may get replaced by a plugin.
var textRendererCanvas = defaultTextRendererCanvas;

// This is a hook: the following function may get replaced by a plugin.
var textRendererHtml = function(element, text, font) {
    if (text.indexOf("\n") !== -1) {
        // TODO: find a way to align the element by its FIRST row
        // as Cinderella does it, instead of by the last row as we do now.
        var rows = text.split("\n");
        element.textContent = rows[0];
        for (var i = 1; i < rows.length; ++i) {
            element.appendChild(document.createElement("br"));
            element.appendChild(document.createTextNode(rows[i]));
        }
        return;
    }
    element.textContent = text;
};

eval_helper.drawtext = function(args, modifs, callback) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluate(args[1]);
    var pt = eval_helper.extractPoint(v0);

    if (!pt.ok) {
        return null;
    }

    var col = csport.drawingstate.textcolor;
    Render2D.handleModifs(modifs, Render2D.textModifs);
    var size = csport.drawingstate.textsize;
    if (size === null) size = defaultAppearance.textsize;
    if (Render2D.size !== null) size = Render2D.size;
    csctx.fillStyle = Render2D.textColor;

    var m = csport.drawingstate.matrix;
    var xx = pt.x * m.a - pt.y * m.b + m.tx + Render2D.xOffset;
    var yy = pt.x * m.c - pt.y * m.d - m.ty - Render2D.yOffset;

    var txt = niceprint(v1);
    var font = (
        Render2D.bold + Render2D.italics +
        Math.round(size * 10) / 10 + "px " +
        Render2D.family);
    csctx.font = font;
    if (callback) {
        return callback(txt, font, xx, yy, Render2D.align, size);
    } else {
        return textRendererCanvas(
            csctx, txt, xx, yy, Render2D.align,
            size, size * defaultAppearance.lineHeight);
    }
};

evaluator.drawtext$2 = function(args, modifs) {
    eval_helper.drawtext(args, modifs, null);
    return nada;
};

evaluator.drawtable$2 = function(args, modifs) {
    var v0 = evaluateAndVal(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var pt = eval_helper.extractPoint(v0);
    if (!pt.ok) return nada;
    if (v1.ctype !== "list") return nada;
    var data = v1.value;
    var nr = data.length;
    var nc = -1;
    var r, c;
    for (r = 0; r < nr; ++r)
        if (data[r].ctype === "list" && data[r].value.length > nc)
            nc = data[r].value.length;
    if (nc === -1) { // depth 1, no nested lists
        data = data.map(function(row) {
            return [row];
        });
        nc = 1;
    } else {
        data = data.map(function(row) {
            return List.asList(row).value;
        });
    }

    // Modifier handling
    var sx = 100;
    var sy = null;
    var border = true;
    var color = csport.drawingstate.textcolor;
    Render2D.handleModifs(modifs, {
        "size": true,
        "color": function(v) {
            if (List._helper.isNumberVecN(v, 3))
                color = Render2D.makeColor([
                    v.value[0].value.real,
                    v.value[1].value.real,
                    v.value[2].value.real
                ]);
        },
        "alpha": true,
        "bold": true,
        "italics": true,
        "family": true,
        "align": true,
        "x_offset": true,
        "y_offset": true,
        "offset": true,
        "width": function(v) {
            if (v.ctype === "number")
                sx = v.value.real;
        },
        "height": function(v) {
            if (v.ctype === "number")
                sy = v.value.real;
        },
        "border": function(v) {
            if (v.ctype === "boolean")
                border = v.value;
        },
    });
    var size = csport.drawingstate.textsize;
    if (size === null) size = defaultAppearance.textsize;
    if (Render2D.size !== null) size = Render2D.size;
    if (sy === null) sy = 1.6 * size;

    var font = (
        Render2D.bold + Render2D.italics +
        Math.round(size * 10) / 10 + "px " +
        Render2D.family);
    csctx.font = font;
    var m = csport.drawingstate.matrix;
    var ww = nc * sx;
    var hh = nr * sy;
    var xx = pt.x * m.a - pt.y * m.b + m.tx + Render2D.xOffset;
    var yy = pt.x * m.c - pt.y * m.d - m.ty - Render2D.yOffset - hh;
    if (border) {
        Render2D.preDrawCurve();
        csctx.strokeStyle = Render2D.lineColor;
        csctx.beginPath();
        for (r = 1; r < nr; ++r) {
            csctx.moveTo(xx, yy + r * sy);
            csctx.lineTo(xx + ww, yy + r * sy);
        }
        for (c = 1; c < nc; ++c) {
            csctx.moveTo(xx + c * sx, yy);
            csctx.lineTo(xx + c * sx, yy + hh);
        }
        csctx.stroke();
        csctx.lineWidth = Render2D.lsize + 1;
        csctx.beginPath();
        csctx.rect(xx, yy, ww, hh);
        csctx.stroke();
    }
    xx += Render2D.align * sx + (1 - 2 * Render2D.align) * sy * 0.3;
    yy += sy * 0.7;
    csctx.fillStyle = color;
    for (r = 0; r < nr; ++r) {
        for (c = 0; c < nc; ++c) {
            var txt = niceprint(data[r][c]);
            textRendererCanvas(csctx, txt, xx + c * sx, yy + r * sy, Render2D.align);
        }
    }
    return nada;
};

eval_helper.drawshape = function(shape, modifs) {
    if (shape.type === "polygon") {
        return eval_helper.drawpolygon([shape], modifs, "D", 1);
    }
    if (shape.type === "circle") {
        return eval_helper.drawcircle([shape.value.value[0], shape.value.value[1]], modifs, "D");
    }
    return nada;
};


eval_helper.fillshape = function(shape, modifs) {

    if (shape.type === "polygon") {
        return eval_helper.drawpolygon([shape], modifs, "F", 1);
    }
    if (shape.type === "circle") {
        return eval_helper.drawcircle([shape.value.value[0], shape.value.value[1]], modifs, "F");
    }
    return nada;
};


eval_helper.clipshape = function(shape, modifs) {
    if (shape.type === "polygon") {
        return eval_helper.drawpolygon([shape], modifs, "C", 1);
    }
    if (shape.type === "circle") {
        return eval_helper.drawcircle([shape.value.value[0], shape.value.value[1]], modifs, "C");
    }
    return nada;
};


evaluator.fill$1 = function(args, modifs) {
    var v1 = evaluate(args[0]);
    if (v1.ctype === "shape") {
        return eval_helper.fillshape(v1, modifs);
    }
    return nada;
};


evaluator.clip$1 = function(args, modifs) {
    var v1 = evaluate(args[0]);
    if (v1.ctype === "shape") {
        return eval_helper.clipshape(v1, modifs);
    }
    if (v1.ctype === "list") {
        var erg = evaluator.polygon$1(args, []);
        return evaluator.clip$1([erg], []);
    }
    return nada;
};

///////////////////////////////////////////////
////// FUNCTION PLOTTING    ///////////////////
///////////////////////////////////////////////

// TODO: Dynamic Color and Alpha

evaluator.plot$1 = function(args, modifs) {
    return evaluator.plot$2([args[0], null], modifs);
};

evaluator.plot$2 = function(args, modifs) {
    var dashing = false;
    var connectb = false;
    var minstep = 0.001;
    var pxlstep = 0.2 / csscale; //TODO Anpassen auf PortScaling
    var count = 0;
    var stroking = false;
    var start = -10; //TODO Anpassen auf PortScaling
    var stop = 10;
    var step = 0.1;
    var steps = 1000;

    var v1 = args[0];
    var runv;
    if (args[1] !== null && args[1].ctype === 'variable') {
        runv = args[1].name;

    } else {
        var li = eval_helper.plotvars(v1);
        runv = "#";
        if (li.indexOf("t") !== -1) {
            runv = "t";
        }
        if (li.indexOf("z") !== -1) {
            runv = "z";
        }
        if (li.indexOf("y") !== -1) {
            runv = "y";
        }
        if (li.indexOf("x") !== -1) {
            runv = "x";
        }
    }

    namespace.newvar(runv);

    var m = csport.drawingstate.matrix;
    var col = csport.drawingstate.linecolor;
    var lsize = 1;

    Render2D.handleModifs(modifs, {
        "color": true,
        "alpha": true,
        "size": true,
        "dashpattern": true,
        "dashtype": true,
        "dashing": true,
        "lineCap": true,
        "lineJoin": true,
        "miterLimit": true,

        "connect": function(v) {
            if (v.ctype === 'boolean')
                connectb = v.value;
        },

        "start": function(v) {
            if (v.ctype === 'number')
                start = v.value.real;
        },

        "stop": function(v) {
            if (v.ctype === 'number')
                stop = v.value.real;
        },

        "steps": function(v) {
            if (v.ctype === 'number')
                steps = v.value.real;
        },
    });
    csctx.strokeStyle = Render2D.lineColor;
    csctx.lineWidth = Render2D.lsize;

    function canbedrawn(v) {
        return v.ctype === 'number' && CSNumber._helper.isAlmostReal(v);
    }

    function limit(v) { //TODO: Die  muss noch geschreoben werden
        return v;

    }

    function drawstroke(x1, x2, v1, v2, step) {
        count++;
        //console.log(niceprint(x1)+"  "+niceprint(x2));
        //console.log(step);
        var xb = +x2.value.real;
        var yb = +v2.value.real;


        var xx2 = xb * m.a - yb * m.b + m.tx;
        var yy2 = xb * m.c - yb * m.d - m.ty;
        var xa = +x1.value.real;
        var ya = +v1.value.real;
        var xx1 = xa * m.a - ya * m.b + m.tx;
        var yy1 = xa * m.c - ya * m.d - m.ty;

        if (!stroking) {
            csctx.beginPath();
            csctx.moveTo(xx1, yy1);
            csctx.lineTo(xx2, yy2);
            stroking = true;
        } else {
            csctx.lineTo(xx1, yy1);

            csctx.lineTo(xx2, yy2);
        }

    }


    function drawrec(x1, x2, y1, y2, step) {

        var drawable1 = canbedrawn(y1);
        var drawable2 = canbedrawn(y2);


        if ((step < minstep)) { //Feiner wollen wir  nicht das muss wohl ein Sprung sein
            if (!connectb) {
                if (stroking) {
                    csctx.stroke();
                    stroking = false;
                }


            }
            return;
        }
        if (!drawable1 && !drawable2)
            return; //also hier gibt's nix zu malen, ist ja nix da

        var mid = CSNumber.real((x1.value.real + x2.value.real) / 2);
        namespace.setvar(runv, mid);
        var ergmid = evaluate(v1);

        var drawablem = canbedrawn(ergmid);

        if (drawable1 && drawable2 && drawablem) { //alles ist malbar ---> Nach Steigung schauen
            var a = limit(y1.value.real);
            var b = limit(ergmid.value.real);
            var c = limit(y2.value.real);
            var dd = Math.abs(a + c - 2 * b) / (pxlstep);
            var drawit = (dd < 1);
            if (drawit) { //Weiterer Qualitätscheck eventuell wieder rausnehmen.
                var mid1 = CSNumber.real((x1.value.real + mid.value.real) / 2);
                namespace.setvar(runv, mid1);
                var ergmid1 = evaluate(v1);

                var mid2 = CSNumber.real((mid.value.real + x2.value.real) / 2);
                namespace.setvar(runv, mid2);
                var ergmid2 = evaluate(v1);

                var ab = limit(ergmid1.value.real);
                var bc = limit(ergmid2.value.real);
                var dd1 = Math.abs(a + b - 2 * ab) / (pxlstep);
                var dd2 = Math.abs(b + c - 2 * bc) / (pxlstep);
                drawit = drawit && dd1 < 1 && dd2 < 1;


            }
            if (drawit) { // Refinement sieht gut aus ---> malen
                drawstroke(x1, mid, y1, ergmid, step / 2);
                drawstroke(mid, x2, ergmid, y2, step / 2);

            } else { //Refinement zu grob weiter verfeinern
                drawrec(x1, mid, y1, ergmid, step / 2);
                drawrec(mid, x2, ergmid, y2, step / 2);
            }
            return;
        }

        //Übergange con drawable auf nicht drawable

        drawrec(x1, mid, y1, ergmid, step / 2);

        drawrec(mid, x2, ergmid, y2, step / 2);


    }

    //Hier beginnt der Hauptteil
    var xo, vo, x, v, xx, yy;

    stroking = false;

    x = CSNumber.real(14.32);
    namespace.setvar(runv, x);
    v = evaluate(v1);
    if (v.ctype !== "number") {
        if (List.isNumberVector(v).value) {
            if (v.value.length === 2) { //Parametric Plot
                stroking = false;
                step = (stop - start) / steps;
                for (x = start; x < stop; x = x + step) {
                    namespace.setvar(runv, CSNumber.real(x));
                    var erg = evaluate(v1);
                    if (List.isNumberVector(erg).value && erg.value.length === 2) {
                        var x1 = +erg.value[0].value.real;
                        var y = +erg.value[1].value.real;
                        xx = x1 * m.a - y * m.b + m.tx;
                        yy = x1 * m.c - y * m.d - m.ty;

                        if (!stroking) {
                            csctx.beginPath();
                            csctx.moveTo(xx, yy);
                            stroking = true;
                        } else {
                            csctx.lineTo(xx, yy);
                        }

                    }


                }
                csctx.stroke();

                namespace.removevar(runv);

            }
        }
        return nada;
    }


    for (xx = start; xx < stop + step; xx = xx + step) {

        x = CSNumber.real(xx);
        namespace.setvar(runv, x);
        v = evaluate(v1);

        if (x.value.real > start) {
            drawrec(xo, x, vo, v, step);

        }
        xo = x;
        vo = v;


    }


    namespace.removevar(runv);
    if (stroking)
        csctx.stroke();

    return nada;
};


evaluator.plotX$1 = function(args, modifs) { //OK


    var v1 = args[0];
    var li = eval_helper.plotvars(v1);
    var runv = "#";
    if (li.indexOf("t") !== -1) {
        runv = "t";
    }
    if (li.indexOf("z") !== -1) {
        runv = "z";
    }
    if (li.indexOf("y") !== -1) {
        runv = "y";
    }
    if (li.indexOf("x") !== -1) {
        runv = "x";
    }


    namespace.newvar(runv);
    var start = -10;
    var stop = 10;
    var step = 0.01;
    var m = csport.drawingstate.matrix;
    var col = csport.drawingstate.linecolor;
    csctx.fillStyle = col;
    csctx.lineWidth = 1;
    csctx.lineCap = Render2D.lineCap;
    csctx.lineJoin = Render2D.lineJoin;
    csctx.miterLimit = Render2D.miterLimit;

    var stroking = false;

    for (var x = start; x < stop; x = x + step) {
        namespace.setvar(runv, CSNumber.real(x));

        var erg = evaluate(v1);
        if (erg.ctype === "number") {
            var y = +erg.value.real;
            var xx = x * m.a - y * m.b + m.tx;
            var yy = x * m.c - y * m.d - m.ty;
            if (!stroking) {
                csctx.beginPath();
                csctx.moveTo(xx, yy);
                stroking = true;
            } else {
                csctx.lineTo(xx, yy);
            }

        }


    }
    csctx.stroke();

    namespace.removevar(runv);


    return nada;

};


eval_helper.plotvars = function(a) {
    function merge(x, y) {
        var obj = {},
            i;
        for (i = x.length - 1; i >= 0; --i)
            obj[x[i]] = x[i];
        for (i = y.length - 1; i >= 0; --i)
            obj[y[i]] = y[i];
        var res = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) // <-- optional
                res.push(obj[k]);
        }
        return res;
    }

    function remove(x, y) {

        for (var i = 0; i < x.length; i++) {
            if (x[i] === y) {
                x.splice(i, 1);
                i--;
            }
        }
        return x;
    }

    var l1, l2, li, els, j;

    if (a.ctype === "variable") {
        return [a.name];
    }

    if (a.ctype === 'infix') {
        l1 = eval_helper.plotvars(a.args[0]);
        l2 = eval_helper.plotvars(a.args[1]);
        return merge(l1, l2);
    }

    if (a.ctype === 'list') {
        els = a.value;
        li = [];
        for (j = 0; j < els.length; j++) {
            l1 = eval_helper.plotvars(els[j]);
            li = merge(li, l1);
        }
        return li;
    }

    if (a.ctype === 'function') {
        els = a.args;
        li = [];
        for (j = 0; j < els.length; j++) {
            l1 = eval_helper.plotvars(els[j]);
            li = merge(li, l1);

        }
        if ((a.oper === "apply" //OK, das kann man eleganter machen, TODO: irgendwann
                ||
                a.oper === "select" || a.oper === "forall" || a.oper === "sum" || a.oper === "product" || a.oper === "repeat" || a.oper === "min" || a.oper === "max" || a.oper === "sort"
            ) && a.args[1].ctype === "variable") {
            li = remove(li, a.args[1].name);
        }
        return li;
    }

    return [];


};


evaluator.clrscr$0 = function(args, modifs) {
    if (typeof csw !== 'undefined' && typeof csh !== 'undefined') {
        csctx.clearRect(0, 0, csw, csh);
    }
    return nada;
};

evaluator.repaint$0 = function(args, modifs) {
    scheduleUpdate();
    return nada;
};


evaluator.screenbounds$0 = function(args, modifs) {
    var pt1 = General.withUsage(List.realVector(csport.to(0, 0)), "Point");
    var pt2 = General.withUsage(List.realVector(csport.to(csw, 0)), "Point");
    var pt3 = General.withUsage(List.realVector(csport.to(csw, csh)), "Point");
    var pt4 = General.withUsage(List.realVector(csport.to(0, csh)), "Point");
    return (List.turnIntoCSList([pt1, pt2, pt3, pt4]));
};


evaluator.createimage$3 = function(args, modifs) {

    var v0 = evaluate(args[0]);
    var v1 = evaluateAndVal(args[1]);
    var v2 = evaluateAndVal(args[2]);


    if (v1.ctype !== 'number' || v2.ctype !== 'number' || v0.ctype !== 'string') {
        return nada;
    }


    var canvas = document.createElement("canvas");
    canvas.id = v0.value;
    canvas.width = v1.value.real;
    canvas.height = v2.value.real;

    // canvas.style.border="1px solid #FF0000";
    canvas.style.display = "none";
    document.body.appendChild(canvas);
    images[v0.value] = loadImage(canvas, false);

    return nada;
};


evaluator.clearimage$1 = function(args, modifs) {

    var name = evaluate(args[0]);

    if (!(name.ctype === 'string' || name.ctype === 'image')) {
        return nada;
    }

    var image = imageFromValue(name);
    var localcanvas = image.img;

    if (typeof(localcanvas) === "undefined" || localcanvas === null) {
        return nada;
    }
    var cw = image.width;
    var ch = image.height;
    var localcontext = localcanvas.getContext('2d');
    localcontext.clearRect(0, 0, cw, ch);
    image.generation++;

    return nada;
};


evaluator.canvas$4 = function(args, modifs) {
    var a = evaluateAndVal(args[0]);
    var b = evaluateAndVal(args[1]);
    var name = evaluate(args[2]);
    var prog = args[3];

    var pta = eval_helper.extractPoint(a);
    var ptb = eval_helper.extractPoint(b);
    if (!pta.ok || !ptb.ok || !(name.ctype === 'string' || name.ctype === 'image')) {
        return nada;
    }

    var image = imageFromValue(name);
    if (!image || !image.img.getContext) {
        return nada;
    }
    var localcanvas = image.img;

    var cw = image.width;
    var ch = image.height;

    var diffx = ptb.x - pta.x;
    var diffy = ptb.y - pta.y;

    var ptcx = pta.x - diffy * ch / cw;
    var ptcy = pta.y + diffx * ch / cw;
    var ptdx = ptb.x - diffy * ch / cw;
    var ptdy = ptb.y + diffx * ch / cw;

    var cva = csport.from(pta.x, pta.y, 1);
    var cvc = csport.from(ptcx, ptcy, 1);
    var cvd = csport.from(ptdx, ptdy, 1);

    var x11 = cva[0];
    var x12 = cva[1];
    var x21 = cvc[0];
    var x22 = cvc[1];
    var x31 = cvd[0];
    var x32 = cvd[1];
    var y11 = 0;
    var y12 = ch;
    var y21 = 0;
    var y22 = 0;
    var y31 = cw;
    var y32 = 0;

    var a1 = (cw * (x12 - x22)) / ((x11 - x21) * (x12 - x32) - (x11 - x31) * (x12 - x22));
    var a2 = (cw * (x11 - x21)) / ((x12 - x22) * (x11 - x31) - (x12 - x32) * (x11 - x21));
    var a3 = -a1 * x11 - a2 * x12;
    var a4 = (ch * (x12 - x32) - ch * (x12 - x22)) / ((x11 - x21) * (x12 - x32) - (x11 - x31) * (x12 - x22));
    var a5 = (ch * (x11 - x31) - ch * (x11 - x21)) / ((x12 - x22) * (x11 - x31) - (x12 - x32) * (x11 - x21));
    var a6 = ch - a4 * x11 - a5 * x12;

    var localcontext = localcanvas.getContext('2d');

    var backupctx = csctx;
    csctx = localcontext;
    csctx.save();

    csctx.transform(a1, a4, a2, a5, a3, a6);

    image.generation++;

    evaluate(prog);
    csctx.restore();
    csctx = backupctx;
};


evaluator.canvas$5 = function(args, modifs) {
    var a = evaluateAndVal(args[0]);
    var b = evaluateAndVal(args[1]);
    var c = evaluateAndVal(args[2]);
    var name = evaluate(args[3]);
    var prog = args[4];

    var pta = eval_helper.extractPoint(a);
    var ptb = eval_helper.extractPoint(b);
    var ptc = eval_helper.extractPoint(c);
    if (!pta.ok || !ptb.ok || !ptc.ok || !(name.ctype === 'string' || name.ctype === 'image')) {
        return nada;
    }

    var image = imageFromValue(name);
    if (!image || !image.img.getContext) {
        return nada;
    }
    var localcanvas = image.img;

    var cw = image.width;
    var ch = image.height;

    var cva = csport.from(pta.x, pta.y, 1);
    var cvb = csport.from(ptb.x, ptb.y, 1);
    var cvc = csport.from(ptc.x, ptc.y, 1);

    var x11 = cva[0];
    var x12 = cva[1];
    var x21 = cvb[0];
    var x22 = cvb[1];
    var x31 = cvc[0];
    var x32 = cvc[1];
    var y11 = 0;
    var y12 = ch;
    var y21 = cw;
    var y22 = ch;
    var y31 = 0;
    var y32 = 0;

    var a1 = ((y11 - y21) * (x12 - x32) - (y11 - y31) * (x12 - x22)) /
        ((x11 - x21) * (x12 - x32) - (x11 - x31) * (x12 - x22));
    var a2 = ((y11 - y21) * (x11 - x31) - (y11 - y31) * (x11 - x21)) /
        ((x12 - x22) * (x11 - x31) - (x12 - x32) * (x11 - x21));
    var a3 = y11 - a1 * x11 - a2 * x12;
    var a4 = ((y12 - y22) * (x12 - x32) - (y12 - y32) * (x12 - x22)) /
        ((x11 - x21) * (x12 - x32) - (x11 - x31) * (x12 - x22));
    var a5 = ((y12 - y22) * (x11 - x31) - (y12 - y32) * (x11 - x21)) /
        ((x12 - x22) * (x11 - x31) - (x12 - x32) * (x11 - x21));
    var a6 = y12 - a4 * x11 - a5 * x12;

    var localcontext = localcanvas.getContext('2d');

    var backupctx = csctx;
    csctx = localcontext;
    csctx.save();

    csctx.transform(a1, a4, a2, a5, a3, a6);

    image.generation++;

    evaluate(prog);
    csctx.restore();
    csctx = backupctx;
};

evaluator.screenresolution$0 = function(args, modifs) {
    var m = csport.drawingstate.matrix;
    return CSNumber.real(m.a);
};

evaluator.layer$1 = function(args, modifs) {
    // No-op to avoid error messages when exporting from Cinderella
    // See https://gitlab.cinderella.de:8082/cindyjs/cindyjs/issues/17
};
//*******************************************************
// and here are the definitions of the image operators
//*******************************************************

function imageFromValue(val) {
    if (val.ctype === 'image') {
        return val.value;
    }
    if (val.ctype === 'string' && images.hasOwnProperty(val.value)) {
        return images[val.value].value;
    }
    return null;
}

evaluator.imagesize$1 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    if (!img) {
        return nada;
    }
    return List.realVector([+img.width, +img.height]);
};

evaluator.imageready$1 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    return General.bool(!!(img && img.ready));
};

function drawImageIndirection(img, x, y) {
    if (img.drawTo) {
        img.drawTo(csctx, x, y);
    } else {
        csctx.drawImage(img.img, x, y);
    }
}

evaluator.drawimage$2 = function(args, modifs) {

    function drawimg1() {


        function handleModifs() {
            var erg;
            if (modifs.angle !== undefined) {
                erg = evaluate(modifs.angle);
                if (erg.ctype === 'number') {
                    rot = erg.value.real;
                }
            }

            if (modifs.rotation !== undefined) {
                erg = evaluate(modifs.rotation);
                if (erg.ctype === 'number') {
                    rot = erg.value.real;
                }
            }

            if (modifs.scale !== undefined) {
                erg = evaluateAndVal(modifs.scale);
                if (erg.ctype === 'number') {
                    scax = erg.value.real;
                    scay = erg.value.real;
                }
                if (List.isNumberVector(erg).value && (erg.value.length === 2)) {
                    scax = erg.value[0].value.real;
                    scay = erg.value[1].value.real;
                }

            }

            if (modifs.scalex !== undefined) {
                erg = evaluate(modifs.scalex);
                if (erg.ctype === 'number') {
                    scax = erg.value.real;
                }
            }

            if (modifs.scaley !== undefined) {
                erg = evaluate(modifs.scaley);
                if (erg.ctype === 'number') {
                    scay = erg.value.real;
                }
            }

            if (modifs.flipx !== undefined) {
                erg = evaluate(modifs.flipx);
                if (erg.ctype === 'boolean') {
                    if (erg.value) {
                        flipx = -1;
                    }
                }
            }

            if (modifs.flipy !== undefined) {
                erg = evaluate(modifs.flipy);
                if (erg.ctype === 'boolean') {
                    if (erg.value) {
                        flipy = -1;
                    }
                }
            }


            if (modifs.alpha !== undefined) {
                erg = evaluate(modifs.alpha);
                if (erg.ctype === 'number') {
                    alpha = erg.value.real;
                }

            }


        }


        var scax = 1;
        var scay = 1;
        var flipx = 1;
        var flipy = 1;
        var rot = 0;
        var alpha = 1;

        var pt = eval_helper.extractPoint(v0);

        if (!pt.ok) {
            return nada;
        }

        img = imageFromValue(img);
        if (!img) {
            return nada;
        }

        csctx.save();
        handleModifs();


        var m = csport.drawingstate.matrix;
        var initm = csport.drawingstate.initialmatrix;


        var w = img.width;
        var h = img.height;

        //TODO das ist für die Drehungen im lokaen koordinatensystem
        //sollte eigentlich einfacher gehen

        var xx = pt.x * m.a - pt.y * m.b + m.tx;
        var yy = pt.x * m.c - pt.y * m.d - m.ty;

        var xx1 = (pt.x + 1) * m.a - pt.y * m.b + m.tx - xx;
        var yy1 = (pt.x + 1) * m.c - pt.y * m.d - m.ty - yy;

        var ixx = pt.x * initm.a - pt.y * initm.b + initm.tx;
        var iyy = pt.x * initm.c - pt.y * initm.d - initm.ty;

        var ixx1 = (pt.x + 1) * initm.a - pt.y * initm.b + initm.tx - ixx;
        var iyy1 = (pt.x + 1) * initm.c - pt.y * initm.d - initm.ty - iyy;

        var sc = Math.sqrt(xx1 * xx1 + yy1 * yy1) / Math.sqrt(ixx1 * ixx1 + iyy1 * iyy1);
        var ang = -Math.atan2(xx1, yy1) + Math.atan2(ixx1, iyy1);

        var viewScale = csport.drawingstate.matrix.sdet / 72;
        scax *= viewScale;
        scay *= viewScale;

        if (alpha !== 1)
            csctx.globalAlpha = alpha;

        csctx.translate(xx, yy);
        csctx.scale(scax * flipx * sc, scay * flipy * sc);


        csctx.rotate(rot + ang);


        csctx.translate(-xx, -yy);
        csctx.translate(-w / 2, -h / 2);

        drawImageIndirection(img, xx, yy);
        csctx.globalAlpha = 1;

        csctx.restore();


    }


    function drawimg3() {
        var alpha = 1;
        var flipx = 1;
        var flipy = 1;
        var aspect = 1;

        function handleModifs() {
            var erg;

            if (modifs.alpha !== undefined) {
                erg = evaluate(modifs.alpha);
                if (erg.ctype === 'number') {
                    alpha = erg.value.real;
                }

            }

            if (modifs.aspect !== undefined) {
                erg = evaluate(modifs.aspect);
                if (erg.ctype === 'number') {
                    aspect = erg.value.real;
                }

            }

            if (modifs.flipx !== undefined) {
                erg = evaluate(modifs.flipx);
                if (erg.ctype === 'boolean') {
                    if (erg.value) {
                        flipx = -1;
                    }
                }
            }

            if (modifs.flipy !== undefined) {
                erg = evaluate(modifs.flipy);
                if (erg.ctype === 'boolean') {
                    if (erg.value) {
                        flipy = -1;
                    }
                }
            }

        }


        var pt1 = eval_helper.extractPoint(v0);
        var pt2 = eval_helper.extractPoint(v1);
        var pt3;


        if (!pt1.ok || !pt2.ok) {
            return nada;
        }

        img = imageFromValue(img);
        if (!img) {
            return nada;
        }

        var w = img.width;
        var h = img.height;


        if (v2 === 0) {

            pt3 = {};
            pt3.x = pt1.x - (pt2.y - pt1.y);
            pt3.y = pt1.y + (pt2.x - pt1.x);
            aspect = h / w;

        } else {
            pt3 = eval_helper.extractPoint(v2);
            if (!pt1.ok) return nada;
        }

        csctx.save();
        handleModifs();


        var m = csport.drawingstate.matrix;
        var initm = csport.drawingstate.initialmatrix;


        if (alpha !== 1)
            csctx.globalAlpha = alpha;

        var xx1 = pt1.x * m.a - pt1.y * m.b + m.tx;
        var yy1 = pt1.x * m.c - pt1.y * m.d - m.ty;

        var xx2 = pt2.x * m.a - pt2.y * m.b + m.tx;
        var yy2 = pt2.x * m.c - pt2.y * m.d - m.ty;

        var xx3 = pt3.x * m.a - pt3.y * m.b + m.tx;
        var yy3 = pt3.x * m.c - pt3.y * m.d - m.ty;

        csctx.transform(xx2 - xx1, yy2 - yy1, xx3 - xx1, yy3 - yy1, xx1, yy1);
        csctx.scale(1 / w, -1 / h * aspect);

        csctx.translate(w / 2, -h / 2);
        csctx.scale(flipx, flipy);
        csctx.translate(-w / 2, h / 2);

        csctx.translate(0, -h);


        drawImageIndirection(img, 0, 0);
        csctx.globalAlpha = 1;

        csctx.restore();


    }


    var v0, v1, v2, img;

    if (args.length === 2) {
        v0 = evaluateAndVal(args[0]);
        img = evaluateAndVal(args[1]);

        return drawimg1();
    }

    if (args.length === 3) {
        v0 = evaluateAndVal(args[0]);
        v1 = evaluateAndVal(args[1]);
        v2 = 0;
        img = evaluateAndVal(args[2]);

        return drawimg3();
    }


    if (args.length === 4) {
        v0 = evaluateAndVal(args[0]);
        v1 = evaluateAndVal(args[1]);
        v2 = evaluateAndVal(args[2]);
        img = evaluateAndVal(args[3]);

        return drawimg3();
    }

    return nada;
};

// TODO: separate arities
evaluator.drawimage$3 = evaluator.drawimage$2;
evaluator.drawimage$4 = evaluator.drawimage$2;

evaluator.allimages$0 = function() {
    var lst = [];
    var keys = Object.keys(images);
    keys.forEach(function(e) {
        lst.push({
            ctype: "string",
            value: e
        });
    });
    return List.turnIntoCSList(lst);
};

evaluator.cameravideo$0 = function(args, modifs) {
    var maximal = true; //use maximal as default (if no other modifier is given)
    var constraints = {};

    function makeconstraints(width) {
        return {
            video: {
                width: width,
                advanced: [{
                    width: {
                        max: width, //see below for details
                        min: width
                    }
                }, {
                    width: {
                        ideal: width
                    }
                }]
            },
            audio: false
        };
    }

    if (modifs.resolution !== undefined) {
        var val = evaluate(modifs.resolution);
        if (val.ctype === 'string' && val.value === 'maximal') maximal = true;
        else {
            if (val.ctype === 'number') {
                maximal = false;
                constraints = makeconstraints(val.value.real);
            } else if (List._helper.isNumberVecN(val, 2)) {
                maximal = false;
                constraints = makeconstraints(val.value[0].value.real);
                var heightorratio = val.value[1].value.real;
                if (heightorratio < 10 || !Number.isInteger(heightorratio)) {
                    constraints.video.aspectRatio = heightorratio;
                    constraints.video.advanced[0].aspectRatio = {
                        min: heightorratio,
                        max: heightorratio
                    };
                    constraints.video.advanced[1].aspectRatio = {
                        ideal: heightorratio,
                    };
                } else {
                    constraints.video.height = heightorratio;
                    constraints.video.advanced[0].height = {
                        min: heightorratio,
                        max: heightorratio
                    };
                    constraints.video.advanced[1].height = {
                        ideal: heightorratio,
                    };
                }
            }
        }
    }
    if (maximal) {
        // As per https://bugs.chromium.org/p/chromium/issues/detail?id=543997#c47,
        // Chrome 54 doesn't actually honor ideal constraints yet, so we need
        // to explicitely list some common widths to control resolution selection.
        constraints = [320, 640, 1024, 1280, 1920, 2560];
        constraints = constraints.map(function(w) {
            return {
                width: {
                    min: w
                }
            };
        });
        // We'd like to also minimize aspect ratio i.e. maximize height for a given
        // width, but Chrome again appears to have a problem with this. See also
        // https://bugs.chromium.org/p/chromium/issues/detail?id=657145
        if (false) {
            constraints = constraints.concat([1.34, 1.59, 1.78].map(function(a) {
                return {
                    aspectRatio: {
                        max: a
                    }
                };
            }));
        }
        constraints = {
            video: {
                width: 16000, // ideal dimensions, will
                height: 9000, // prefer big resolutions
                advanced: constraints
            },
            audio: false
        };
    }

    var openVideoStream = null;

    var gum = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    if (gum) {
        openVideoStream = function(success, failure) {
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(success, failure);
        };
    } else {
        gum = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        if (gum) {
            openVideoStream = function(success, failure) {
                gum.call(navigator, constraints, success, failure);
            };
        }
    }
    if (!openVideoStream) {
        console.warn("getUserMedia call not supported");
        return nada;
    }
    var video = document.createElement("video");
    video.autoplay = true;
    var img = loadImage(video, true);
    console.log("Opening stream.");
    openVideoStream(function success(stream) {
        var url = window.URL.createObjectURL(stream);
        video.src = url;
        video.addEventListener("loadeddata", csplay);
    }, function failure(err) {
        console.error("Could not get user video:", String(err), err);
    });
    return img;
};

evaluator.playvideo$1 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    if (img.live && img.img.play) {
        img.img.play();
    }
    return nada;
};

evaluator.pausevideo$1 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    if (img.live && img.img.pause) {
        img.img.pause();
    }
    return nada;
};

var helpercanvas; //invisible helper canvas.
function getHelperCanvas(width, height) {
    if (!helpercanvas) {
        //creating helpercanvas only once increases the running time
        helpercanvas = /** @type {HTMLCanvasElement} */ (document.createElement("canvas"));
    }
    helpercanvas.width = width;
    helpercanvas.height = height;
    return helpercanvas;
}

/**
 * reads a rectangular block of pixels from the upper left corner.
 * The colors are representent as a 4 component RGBA vector with entries in [0,1]
 */
function readPixelsIndirection(img, x, y, width, height) {
    var res = [];
    if (img.readPixels) {
        res = img.readPixels(x, y, width, height);
    } else { //use canvas-approach
        var data, ctx;
        if (img.img.getContext) { //img is a canvas
            ctx = img.img.getContext('2d');
            data = ctx.getImageData(x, y, width, height).data;
        } else { //copy corresponding subimage of img.img to temporary canvas
            try {
                var helpercanvas = getHelperCanvas(width, height);
                ctx = helpercanvas.getContext('2d');
                ctx.drawImage(img.img, x, y, width, height, 0, 0, width, height);
                data = ctx.getImageData(0, 0, width, height).data;
            } catch (exception) {
                console.log(exception);
            }

        }
        for (var i in data) res.push(data[i] / 255);
    }
    return res;
}

/**
 * imagergba(‹image›,x,y) implements imagergb(‹imagename›,x,y) from Cinderella, i.e.
 * returns a 4 component vector ranging from (0-255, 0-255, 0-255, 0-1)
 */
evaluator.imagergba$3 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    var x = evaluateAndVal(args[1]);
    var y = evaluateAndVal(args[2]);

    if (!img || x.ctype !== 'number' || y.ctype !== 'number' || !img.ready) return nada;

    x = Math.round(x.value.real);
    y = Math.round(y.value.real);
    if (!isFiniteNumber(x) || !isFiniteNumber(y)) return nada;

    var rgba = readPixelsIndirection(img, x, y, 1, 1);
    return List.realVector([rgba[0] * 255, rgba[1] * 255, rgba[2] * 255, rgba[3]]);
};

evaluator.imagergb$3 = evaluator.imagergba$3; //According to reference

function readimgatcoord(img, coord, modifs) {
    if (!coord.ok) return nada;

    var w = img.width;
    var h = img.height;

    var interpolate = true; //default values
    var repeat = false;

    function handleModifs() {
        var erg;
        if (modifs.interpolate !== undefined) {
            erg = evaluate(modifs.interpolate);
            if (erg.ctype === 'boolean') {
                interpolate = (erg.value);
            }
        }

        if (modifs.repeat !== undefined) {
            erg = evaluate(modifs.repeat);
            if (erg.ctype === 'boolean') {
                repeat = (erg.value);
            }
        }
    }
    handleModifs();
    if (interpolate) {
        coord.x -= 0.5; //center of pixels are in the middle of them.
        coord.y -= 0.5; //Now pixel-centers have wlog integral coordinates
    }

    if (repeat) {
        coord.x = (coord.x % w + w) % w;
        coord.y = (coord.y % h + h) % h;
    }

    var xi = Math.floor(coord.x); //integral part
    var yi = Math.floor(coord.y);

    if (!isFiniteNumber(xi) || !isFiniteNumber(yi)) return nada;

    var rgba = [0, 0, 0, 0];
    if (interpolate) {
        var i, j;

        var xf = coord.x - xi; //fractional part
        var yf = coord.y - yi;

        var pixels = readPixelsIndirection(img, xi, yi, 2, 2);

        //modify pixels for boundary cases:
        if (repeat) { //read pixels at boundary seperately
            if (xi === w - 1 || yi === h - 1) {
                var p10 = readPixelsIndirection(img, (xi + 1) % w, yi, 1, 1);
                var p01 = readPixelsIndirection(img, xi, (yi + 1) % h, 1, 1);
                var p11 = readPixelsIndirection(img, (xi + 1) % w, (yi + 1) % h, 1, 1);
                pixels = pixels.slice(0, 4).concat(p10, p01, p11);
            }
        } else { //clamp to boundary
            if (xi === -1 || xi === w - 1) xf = Math.round(xf);
            if (yi === -1 || yi === h - 1) yf = Math.round(yf);
        }

        //bilinear interpolation for each component i
        for (i = 0; i < 4; i++)
            rgba[i] = (1 - yf) * ((1 - xf) * pixels[i] + xf * pixels[i + 4]) +
            yf * ((1 - xf) * pixels[i + 8] + xf * pixels[i + 12]);
    } else {
        rgba = readPixelsIndirection(img, xi, yi, 1, 1);
    }
    return List.realVector(rgba);
}

/**
 * imagergba(<point1>, <point2>, ‹image›, <point3>) returns the color at the coordinate
 * <point3> assuming that the left/right lower corner is <point1>/<point2> resp.
 */
evaluator.imagergba$4 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[2]));
    if (!img || !img.ready) return nada;

    var w = img.width;
    var h = img.height;

    var w0 = evaluateAndHomog(args[0]);
    var w1 = evaluateAndHomog(args[1]);
    var v0 = evaluateAndHomog(List.realVector([0, h, 1]));
    var v1 = evaluateAndHomog(List.realVector([w, h, 1]));

    if (w0 === nada || w1 === nada || p === nada) return nada;

    //create an orientation-reversing similarity transformation that maps w0->v0, w1->v1
    var ii = List.ii;
    var jj = List.jj;

    var m1 = eval_helper.basismap(v0, v1, ii, jj); //interchange I and J,
    var m2 = eval_helper.basismap(w0, w1, jj, ii); //see Thm. 18.4 of Perspectives on Projective Geometry
    var p = evaluateAndHomog(args[3]);
    var coord = eval_helper.extractPoint(General.mult(m1, General.mult(List.adjoint3(m2), p)));
    return readimgatcoord(img, coord, modifs);
};


evaluator.imagergb$4 = function(args, modifs) {
    var rgba = evaluator.imagergba$4(args, modifs);
    if (rgba === nada) return nada;
    return List.turnIntoCSList(rgba.value.slice(0, 3));
};

evaluator.readpixels$1 = function(args, modifs) {
    var img = imageFromValue(evaluateAndVal(args[0]));
    var data = readPixelsIndirection(img, 0, 0, img.width, img.height);
    var pixels = [];
    for (var i = 0; i + 3 < data.length; i += 4) {
        pixels.push(List.turnIntoCSList([CSNumber.real(data[i + 0]), CSNumber.real(data[i + 1]), CSNumber.real(data[i + 2]), CSNumber.real(data[i + 3])]));
    }
    return List.turnIntoCSList(pixels);
};
/*jshint -W030 */
'use strict'; // So this file can be used as a stand-alone node module
/*jshint +W030 */

// All operators, sorted by precedence level
var operatorLevels = [{
    key: [':'],
    field: ['.'],
    deg: ['°'],
    take: ['_'],
}, {
    functionCall: true
}, {
    rassoc: true,
    pow: ['^'],
    sqrt: ['√'],
}, {
    mul: [
        '*',
        '\u2062', // invisible times
        '\u22c5', // ⋅ dot operator
        '\u00b7', // · middle dot
    ],
    cross: ['×'],
    div: [
        '/',
        '\u00f7', // ÷ division sign
        '\u2215', // ∕ division slash
        '\u2236', // ∶ ratio
    ],
}, {
    add: ['+'],
    sub: ['-', '−'],
    neg: ['!', '¬'],
}, {
    seq: ['..'],
}, {
    eq: ['==', '≟'],
    ne: ['!=', '<>', '≠'],
    lt: ['<'],
    gt: ['>'],
    le: ['<=', '≤', '≦'],
    ge: ['>=', '≥', '≧'],
    aeq: ['~=', '≈'],
    ane: ['~!=', '≉'],
    alt: ['~<', '⪉'],
    agt: ['~>', '⪊'],
    ale: ['~<=', '⪅'],
    age: ['~>=', '⪆'],
    'in': ['∈'],
    nin: ['∉'],
}, {
    and: ['&', '∧'],
    or: ['%', '∨'],
}, {
    rassoc: true,
    prepend: ['<:'],
}, {
    concat: ['++', '∪'],
    remove: ['--', '∖'],
    common: ['~~', '∩'],
    append: [':>'],
}, {
    rassoc: true,
    assign: ['='],
    define: [':='],
    undefine: [':=_'],
    bdefine: ['::='],
}, {
    seq: [';'],
}, {
    modif: ['->', '→'],
}, {
    rassoc: true,
    list: [','],
}];

var prefixOperators = ['+', '-'];
var prefixOnly = ['!', '√'];
var postfixOnly = ['°', ':=_'];
var flexfix = [';', ','];

var operatorSymbols = [];
var operators = {};
var functionCallPrecedence;

(function initializeOperators() {
    var precedence = 0;
    operatorLevels.forEach(function(level) {
        precedence += 2;
        var rassoc = !!level.rassoc;
        if (level.functionCall)
            functionCallPrecedence = precedence;
        for (var name in level) {
            var symbols = level[name];
            if (typeof symbols === 'boolean')
                continue;
            var descr = {
                name: name,
                sym: symbols[0],
                symbols: symbols,
                rassoc: rassoc,
                precedence: precedence,
                prefix: false,
                postfix: false,
                infix: true,
                bare: false,
            };
            for (var i = 0; i < symbols.length; ++i) {
                var symbol = symbols[i];
                if (operators.hasOwnProperty(symbol))
                    throw Error('Duplicate operator: ' + symbol);
                operators[symbol] = descr;
                operatorSymbols.push(symbol);
            }
        }
    });
    prefixOperators.forEach(function(op) {
        operators[op].prefix = true;
    });
    prefixOnly.forEach(function(op) {
        operators[op].prefix = true;
        operators[op].infix = false;
    });
    postfixOnly.forEach(function(op) {
        operators[op].postfix = true;
        operators[op].infix = false;
    });
    flexfix.forEach(function(op) {
        operators[op].prefix = true;
        operators[op].postfix = true;
        operators[op].infix = true;
        operators[op].bare = true;
    });
})();

operatorSymbols.sort(function(a, b) {
    return b.length - a.length;
});

var brackets = '[](){}||';

var inTokenWhitespace = '[ \t]*';
var whitespaceToken = '[ \t\n]+';

// Allow spaces in tokens. Any occurrence of ' ' is replaced by '[…]*',
// with […] matching the class of allowed in-token whitespace.
function expandSpaces(str) {
    return str.replace(/ /g, inTokenWhitespace);
}

// Quote special characters in strings so they can be used in regular
// expressions without triggering any special meaning
function rescape(str) {
    return str.replace(/[^A-Za-z0-9 \u0080-\uffff]/ig, '\\$&');
}

// Form a group consisting matching any of the given strings literally,
// but with whitespace allowed.
function anyOfGroup(lst) {
    return '(' + lst.map(rescape).join('|') + ')';
}

// Either an integer part, possibly followed by a possibly empty
// fractional part, possibly followed by an exponent, or a leading dot
// followed by a non-empty fractional part, possibly followed by an
// exponent.
var reNumber = expandSpaces(
    '(?:[0-9](?: [0-9])*(?: \\.(?! \\.)(?: [0-9])*)?|\\.(?: [0-9])+)' +
    '(?: [Ee](?: [+-])?(?: [0-9])+)?'
);

var supDigit = '[⁰¹²³⁴⁵⁶⁷⁸⁹]';
var subDigit = '[₀₁₂₃₄₅₆₇₈₉]';
var supNum = expandSpaces('(?:[⁺⁻] )?' + supDigit + '(?: ' + supDigit + ')*');
var subNum = expandSpaces('(?:[₊₋] )?' + subDigit + '(?: ' + subDigit + ')*');

// Letters (Unicode 8.0.0 category L), or rather their UTF-16 encoding
// (using surrogate pairs as needed). Generated by tools/unicodeCat.js.
// See Parser_test.js for an uncompressed version of this string.
var unicodeLetters = (function(dict, str, hiRanges) {
    var i, fst;
    var j = 0;
    var res = "(?:[";
    var n = str.length;
    for (i = 0; i < n; ++i) {
        var code = str.charCodeAt(i);
        if (code >= 0xd800) {
            res += "]|" + str.charAt(i) + "[";
            j = 0xdc00;
        } else {
            res += String.fromCharCode(fst = j = dict[code - 32] + j);
            j += dict[str.charCodeAt(++i) - 32];
            if (j !== fst) {
                if (j !== fst + 1) res += "-";
                res += String.fromCharCode(j);
            }
        }
    }
    return res + "]|[" + hiRanges + "][\udc00-\udfff])";
})([
    2, 0, 106, 3, 4, 1, 6, 5, 7, 11, 17, 8, 12, 21, 9, 22, 30, 10, 15, 24, 25,
    16, 13, 42, 46, 14, 18, 19, 29, 37, 27, 28, 35, 26, 32, 36, 40, 43, 47, 53,
    20, 48, 50, 56, 33, 34, 39, 51, 52, 55, 63, 64, 65, 68, 85, 23, 31, 38, 45,
    49, 105, 59, 66, 69, 72, 88, 102, 114, 117, 128, 157, 191, 41, 44, 54, 60,
    67, 70, 71, 73, 74, 75, 76, 80, 81, 82, 83, 84, 86, 87, 89, 93, 94, 98, 99,
    107, 108, 116, 122, 130, 132, 134, 138, 160, 165, 185, 195, 196, 255, 268,
    277, 310, 332, 339, 362, 365, 390, 449, 457, 470, 512, 513, 541, 568, 582,
    619, 673, 726, 768, 820, 921, 991, 1164, 2684, 6581, 8453, 11171, 20949
], ("T4(4I!)!'!&/ 0 \x96')2$+! !\x83$ %## !(!   ! ; u \x86.\x88 =#!+YoA& 87C" +
    "% } !5%+%) #!*! <0a,!4B1%'!&-'!1!$!33`HsG$!;!+.52'(#%#- & !$#$!*!9%  2%" +
    "H''%#- & % % %B# !H *+   - & % $$!;!5%3!,(#%#- & % $$!X%  5!:! '$  #$% " +
    "! %$%$ $)W!G(   / 2$!> &%C(   / . $$!L! %5%;(   D#!*!* 4'&*$W + !#&]F %" +
    "6&]% !#% !#!(# &   ! !#% # %1!#$ !/#L!S( @?$\x817-!*''#$!$%+ ',6!:= !&!" +
    "#7 \x90 ##& ! ##D ##B ##& ! ##9 K ##^Y2*V#'$\x9d#5 4&p((+, #2*2*2,  5OC" +
    "!'!Uy.D !&_)0J<#$,E'4Q/1Pv!|8:&K<9%)E>@7 )@\x80# #$%1gT\x8e#'#=#'#( ! !" +
    " ! 0#P & !$  &$##'',&  &d!9!*,b!'!#. !$$(! ! ! # 1##&$'!G%\xa58 8 \x84(" +
    "#$%6= !&!#Q+!*/1& & & & & & & &t!\x97%E$&%'V(  z #&D${:Aj2\x99\xa6q\xa9" +
    "E\xa4UZ#\x8d$2)%-8*0#_J+#b#M#(S1   # /0O2[R'$! !6>)/A?+8<!*$ .)$ D3  (-" +
    "/$!$[ !$%#$#! !4 #1+ 6'#'#'1& & 7 .)c0\xa86/'I\xa7\x93#\\N&6$&! . , $ !" +
    " % % \x7fM\x92;R#Gh)d$ \x85=4(4,a$'#'#'# \ud800!) 4 : % 9#6@\x82\x94?$I" +
    "IX*5 ((=)<#@'(\ud801!f~N.Of\x8f1-)(\ud802!'#! E %$!#/)/10^: %)-)4nQ(%T!" +
    "5#   AZ?$?C( >?G)-):9*\ud803!`KJ9J\ud804#PriL3>@7M$!6F2#/! !C* 3V& ! # " +
    "9 .+8N(#%#- & % $$!;!6$\ud805eF-% !\x8987#=F-!k7x4\ud806\x87RB!\x95K" +
    "\ud808!\xa2\ud809e\x8a\ud80d!8\ud811!\x9c\ud81a!\x9b+0c<;F*#BH&:\ud81b" +
    "\xa0U,!l,\ud82c!%\ud82f!\"&,$++.\ud835!w m %#!#%## ) ! & S ##( & > # $ " +
    "!$& \x91#3 3 0 3 0 3 0 3 0 3 (\ud83a!\x8b\ud83b\x98# A % !#! . # ! !(!'" +
    "! ! !   % !#! ! ! ! ! % !## & # # ! . 5&  $ 5\ud869!\x9f7\x8c\ud86d!" +
    "\xa1,g\ud86e!<#\xa3\ud873!\x9e\ud87e!\x9a"
), "\ud80c\ud840-\ud868\ud86a-\ud86c\ud86f-\ud872");

var reIdentifier = expandSpaces(
    "#(?: [1-9])?|(?:'|" + unicodeLetters + ")(?: (?:[0-9']|" + unicodeLetters + "))*"
);

var reNextToken = [ //                 token text
    '(' + whitespaceToken + ')', //    whitespace
    '(//.*)', //                       single-line comment
    '(/\\*)', //                       start of multi-line comment
    '(' + reNumber + ')', //           number literal
    anyOfGroup(operatorSymbols), //    operator
    anyOfGroup(brackets.split('')), // bracket
    '(' + subNum + ')', //             subscript
    '(' + supNum + ')', //             superscript
    '(' + reIdentifier + ')', //       identifier
    '("[^"]*")', //                    string literal
    '($)', //                          EOF
].join('|');

var reSpace = new RegExp(inTokenWhitespace.replace(/\*$/, '+'), 'g');

var tokenTypes = [
    'ANY', 'WS', 'COMMENT', 'START_COMMENT',
    'NUM', 'OP', 'BRA', 'SUB', 'SUP', 'ID', 'STR', 'EOF'
];

(function sanityCheck() {
    var re = new RegExp(reNextToken, 'g');
    var match = re.exec('');
    if (match.hasOwnProperty(tokenTypes.length))
        throw Error('RE has more groups than expected');
    if (!match.hasOwnProperty(tokenTypes.length - 1))
        throw Error('RE has fewer groups than expected');
})();

function ParseError(message, location, text) {
    var msg = message;
    if (location)
        msg = msg + ' at ' + location.row + ':' + location.col;
    if (text)
        msg = msg + ': ‘' + text + '’';
    var err = Error(msg);
    err.name = 'CindyScriptParseError';
    err.description = message;
    err.location = location;
    err.text = text;
    return err;
}

function Tokenizer(input) {
    this.input = input;
    this.re = new RegExp(reNextToken, 'g');
    var bols = []; // beginnings of lines
    var pos = input.indexOf('\n') + 1;
    while (pos) {
        bols.push(pos);
        pos = input.indexOf('\n', pos) + 1;
    }
    bols.push(input.length);
    this.bols = bols;
    this.pos = 0;
    this.bol = 0;
    this.line = 1;
}

Tokenizer.prototype.advanceBy = function(offset) {
    this.advanceTo(this.pos + offset);
};

Tokenizer.prototype.advanceTo = function(pos) {
    this.pos = pos;
    while (this.bols[0] <= pos) {
        this.bol = this.bols.shift();
        this.line++;
    }
};

Tokenizer.prototype.curPos = function() {
    return {
        row: this.line,
        col: this.pos - this.bol,
        pos: this.pos
    };
};

Tokenizer.prototype.nextInternal = function() {
    var match = this.re.exec(this.input);
    if (match.index !== this.pos)
        throw ParseError('Invalid token', this.curPos(),
            this.input.substring(this.pos, match.index));
    var pos1 = this.curPos();
    this.advanceBy(match[0].length);
    var pos2 = this.curPos();
    var tt;
    /*jshint -W116 */
    for (tt = 1; match[tt] == null; ++tt) {} // neither null nor undefined
    /*jshint +W116 */
    return {
        start: pos1,
        end: pos2,
        raw: match[0],
        text: match[0].replace(reSpace, ''),
        toktype: tokenTypes[tt]
    };
};

Tokenizer.prototype.next = function() {
    var tok;
    do {
        tok = this.nextInternal();
        if (tok.toktype === 'START_COMMENT') {
            // Match multiline comment, take nesting into account
            var reComment = /\*\/|\/\*/g;
            reComment.lastIndex = tok.start.pos + 2;
            var depth = 1;
            var match;
            while (depth > 0) {
                match = reComment.exec(this.input);
                if (!match) {
                    throw ParseError('Unterminated comment',
                        tok.start, tok.text);
                } else if (match[0] === '/*') {
                    ++depth;
                } else {
                    --depth;
                }
            }
            this.re.lastIndex = reComment.lastIndex;
            this.advanceTo(reComment.lastIndex);
            tok.end = this.curPos();
            tok.raw = this.input.substring(tok.start.pos, tok.end.pos);
            tok.text = tok.raw;
            tok.toktype = 'COMMENT';
        }
    } while (tok.toktype === 'WS' || tok.toktype === 'COMMENT');
    return tok;
};

// Take a sequence ending in […, ‹lhs›, ‹op›, ‹rhs›] and turn it into
// […, ‹op›], but record ‹lhs› and ‹rhs› as args of ‹op›.
function applyOperator(seq) {
    var op = seq[seq.length - 2];
    var lhs = seq[seq.length - 3];
    var rhs = seq[seq.length - 1];
    if (lhs) {
        if (lhs.isSuperscript && op.precedence <= lhs.precedence)
            throw ParseError(
                'Operator not allowed after superscript',
                op.start, op.text);
        if (rhs) { // expr op expr
            if (!op.op.infix)
                throw ParseError(
                    'Operator may not be used infix',
                    op.start, op.text);
        } else { // expr op null
            if (!op.op.postfix)
                throw ParseError(
                    'Operator may not be used postfix',
                    op.start, op.text);
        }
    } else {
        if (rhs) { // null op expr
            if (!op.op.prefix)
                throw ParseError(
                    'Operator may not be used prefix',
                    op.start, op.text);
        } else {
            if (!op.op.bare)
                throw ParseError(
                    'Operator without operands',
                    op.start, op.text);
        }
    }
    op.ctype = 'infix';
    op.oper = op.op.sym;
    op.args = [lhs, rhs];
    seq.splice(seq.length - 3, 3, op);
}

function subsup(seq, tok, op, dict) {
    if (!(seq.length & 1)) seq.push(null);
    op = operators[op];
    while (seq.length >= 3 &&
        seq[seq.length - 2].precedence <= op.precedence)
        applyOperator(seq);
    seq.push({
        op: op,
        precedence: op.precedence + (op.rassoc ? 1 : 0),
        start: tok.start,
        end: tok.end,
        text: tok.text,
        rawtext: tok.rawtext
    });
    var dstDigits = "";
    var srcDigits = tok.text;
    for (var i = 0; i < srcDigits.length; ++i)
        dstDigits += "0123456789+-".charAt(dict.indexOf(srcDigits.charAt(i)));
    tok.ctype = 'number';
    tok.value = {
        real: +dstDigits,
        imag: 0
    };
    seq.push(tok);
    applyOperator(seq);
}

// Recursively called for nested brackets. closing is the text of the
// expected closing bracket, which will be treated as closing even if
// it also is an opening bracket, e.g. in the case of |…|.
function parseRec(tokens, closing) {
    // Seq is an alternating list of expressions (even indices) and
    // incomplete operators (odd indices). The order of operator
    // precedences is by increasing value, since if the precedence
    // value were to decrease, previous operators can be applied.
    // In the case of right-associative operators, multiple operators
    // in the sequence can have equal precedence.
    var seq = [];
    var tok; // last token to be processed
    parseLoop: while (true) {
        tok = tokens.next();
        switch (tok.toktype) {
            case 'OP':
                var op = operators[tok.text];
                if (op.sym === '_' &&
                    seq.length && !(seq.length & 1) && // preceding op
                    seq[seq.length - 1].toktype === 'OP' && // 
                    seq[seq.length - 1].op.sym === ':=') {
                    seq.pop();
                    op = operators[':=_'];
                    tok.text = op.sym;
                }
                tok.op = op;
                tok.precedence = op.precedence;
                if (!(seq.length & 1)) seq.push(null);
                while (seq.length >= 3 &&
                    seq[seq.length - 2].precedence <= tok.precedence)
                    applyOperator(seq);
                if (op.rassoc)
                    tok.precedence++;
                seq.push(tok);
                break;
            case 'ID':
                tok.ctype = 'variable';
                tok.name = tok.text;
                if (seq.length & 1)
                    throw ParseError('Missing operator', tok.start, tok.text);
                seq.push(tok);
                break;
            case 'NUM':
                tok.ctype = 'number';
                tok.value = {
                    real: +tok.text,
                    imag: 0
                };
                if (seq.length & 1)
                    throw ParseError('Missing operator', tok.start, tok.text);
                seq.push(tok);
                break;
            case 'STR':
                tok.ctype = 'string';
                tok.value = tok.raw.substring(1, tok.raw.length - 1);
                if (seq.length & 1)
                    throw ParseError('Missing operator', tok.start, tok.text);
                seq.push(tok);
                break;
            case 'SUB':
                subsup(seq, tok, '_', '₀₁₂₃₄₅₆₇₈₉₊₋');
                break;
            case 'SUP':
                subsup(seq, tok, '^', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻');
                seq[seq.length - 1].isSuperscript = true;
                break;
            case 'BRA':
                var bra = brackets.indexOf(tok.text);
                if (tok.text === closing || bra & 1)
                    break parseLoop;
                var closer = brackets.charAt(bra + 1);
                var sub = parseRec(tokens, closer);
                var ctok = sub.closedBy;
                if (ctok.text !== closer)
                    throw ParseError(
                        'Opening ' + tok.text +
                        ' at ' + tok.start.row + ':' + tok.start.col +
                        ' closed by ' + (ctok.text || 'EOF') +
                        ' at ' + ctok.start.row + ':' + ctok.start.col);
                var pair = tok.text + ctok.text;
                var lst = [];
                var expr = sub.expr;
                if (expr) {
                    while (expr && expr.ctype === 'infix' && expr.oper === ',') {
                        lst.push(expr.args[0]);
                        expr = expr.args[1];
                    }
                    lst.push(expr);
                }
                if (!(seq.length & 1)) { // value position
                    if (pair === '||') {
                        if (lst.length === 1) {
                            seq.push({
                                ctype: 'function',
                                oper: 'abs_infix',
                                args: lst,
                                modifs: {},
                            });
                        } else if (lst.length === 2) {
                            seq.push({
                                ctype: 'function',
                                oper: 'dist_infix',
                                args: lst,
                                modifs: {},
                            });
                        } else {
                            throw ParseError(
                                "Don't support |…| with " + lst.length +
                                ' arguments', tok.start);
                        }
                    } else if (pair === '{}') {
                        throw ParseError('{…} reserved for future use', tok.start);
                    } else if (pair !== '[]' && lst.length === 1) {
                        seq.push({
                            ctype: 'paren',
                            args: lst,
                        });
                    } else if (lst.length === 0) {
                        seq.push({
                            ctype: 'list',
                            value: [],
                        });
                    } else {
                        seq.push({
                            ctype: 'function',
                            oper: 'genList',
                            args: lst,
                            modifs: {},
                        });
                    }
                } else { // operator position, so it's a function call
                    if (pair === '{}')
                        throw ParseError('{…} reserved for future use', tok.start);
                    var fname = seq[seq.length - 1];
                    if (fname.ctype !== 'variable')
                        throw ParseError(
                            'Function name must be an identifier',
                            fname.start);
                    if (seq.length > 2 &&
                        seq[seq.length - 2].precedence < functionCallPrecedence)
                        throw ParseError(
                            'Function call in indexing construct must be enclosed in parentheses',
                            tok.start);
                    fname.ctype = 'function';
                    var args = fname.args = [];
                    var modifs = fname.modifs = {};
                    for (var i = 0; i < lst.length; ++i) {
                        var elt = lst[i];
                        if (elt && elt.ctype === 'infix' && elt.oper === '->') {
                            var id = elt.args[0];
                            if (id.ctype !== 'variable')
                                throw ParseError(
                                    'Modifier name must be an identifier',
                                    elt.start);
                            modifs[id.name] = elt.args[1];
                        } else {
                            args.push(elt);
                        }
                    }
                    fname.oper = fname.name.toLowerCase() + '$' + fname.args.length;
                }
                break;
            case 'EOF':
                break parseLoop;
        }
    }
    if (!(seq.length & 1)) seq.push(null);
    while (seq.length >= 3)
        applyOperator(seq);
    return {
        expr: seq[0],
        closedBy: tok
    };
}

var cvoid = {
    ctype: 'void'
};

function Parser(expr) {
    this.usedFunctions = {};
    this.usedVariables = {};
}

Parser.prototype.postprocess = function(expr) {
    if (expr === null)
        return cvoid;
    if (expr) {
        // parent-first postprocessing
        if (expr.ctype === 'infix') {
            if (expr.oper === ':=') {
                var fun = expr.args[0];
                if (fun.ctype === 'function') {
                    fun.args.forEach(function(arg) {
                        if (arg === null || arg.ctype !== 'variable')
                            throw ParseError(
                                'Function argument must be an identifier',
                                arg.start || expr.start);
                    });
                } else if (fun.ctype !== 'variable') {
                    throw ParseError(
                        expr.oper + ' can only be used to define ' +
                        'functions or variables',
                        expr.start);
                }
            } else if (expr.oper === ',') {
                throw ParseError(
                    'comma may only be used to delimit list elements',
                    expr.start);
            }
        }

        if (expr.args)
            expr.args = expr.args.map(this.postprocess, this);
        if (expr.modifs)
            for (var key in expr.modifs)
                expr.modifs[key] = this.postprocess(expr.modifs[key]);

        // parent-last postprocessing
        if (expr.ctype === 'paren') {
            return expr.args[0];
        } else if (expr.ctype === 'infix') {
            if (expr.oper === '.') {
                if (!(expr.args[1] && expr.args[1].ctype === 'variable'))
                    throw ParseError(
                        'Field name must be identifier', expr.start, expr.text);
                expr.ctype = 'field';
                expr.obj = expr.args[0];
                expr.key = expr.args[1].name;
                delete expr.args;
            }
            if (this.infixmap)
                expr.impl = this.infixmap[expr.oper];
        } else if (expr.ctype === 'variable') {
            this.usedVariables[expr.name] = true;
        } else if (expr.ctype === 'function') {
            this.usedFunctions[expr.oper] = true;
        }
    }

    // Re-construct all objects using object literals.
    // This helps some JavaScript engines improve performance.
    if (expr.ctype === 'infix') {
        return {
            ctype: 'infix',
            oper: String(expr.oper),
            args: [expr.args[0], expr.args[1]],
            impl: expr.impl,
        };
    }
    if (expr.ctype === 'variable') {
        return {
            ctype: 'variable',
            name: String(expr.name),
        };
    }
    if (expr.ctype === 'number') {
        return {
            ctype: 'number',
            value: {
                real: +expr.value.real,
                imag: +expr.value.imag
            },
        };
    }
    if (expr.ctype === 'string') {
        return {
            ctype: 'string',
            value: String(expr.value),
        };
    }
    if (expr.ctype === 'list') {
        return {
            ctype: 'list',
            value: expr.value,
        };
    }
    if (expr.ctype === 'function') {
        return {
            ctype: 'function',
            oper: String(expr.oper),
            args: expr.args,
            modifs: expr.modifs,
        };
    }
    if (expr.ctype === 'field') {
        return {
            ctype: 'field',
            obj: expr.obj,
            key: String(expr.key),
        };
    }
    throw Error("Unsupported AST node of type " + expr.ctype);
};

Parser.prototype.parse = function(code) {
    try {
        var res = parseRec(new Tokenizer(code));
        if (res.closedBy.toktype !== 'EOF')
            throw ParseError(
                'Closing bracket never opened.',
                res.closedBy.start,
                res.closedBy.text
            );
        return this.postprocess(res.expr);
    } catch (err) {
        err.ctype = 'error';
        return err;
    }
};

if (typeof process !== "undefined" &&
    typeof module !== "undefined" &&
    typeof module.exports !== "undefined" &&
    typeof window === "undefined") {
    module.exports.Parser = Parser;
    module.exports.Tokenizer = Tokenizer;
    module.exports.unicodeLetters = unicodeLetters;
    module.exports.parse = function(code) {
        return (new Parser()).parse(code);
    };
}
//****************************************************************
// this function is responsible for evaluation an expression tree
//****************************************************************

function evaluate(a) {
    if (a === undefined) {
        return nada;
    }
    if (a.ctype === 'infix') {
        return a.impl(a.args, {}, a);
    }
    if (a.ctype === 'variable') {
        return evaluate(namespace.getvar(a.name));
    }
    if (a.ctype === 'function') {
        return eval_helper.evaluate(a.oper, a.args, a.modifs);
    }
    if (a.ctype === 'void') {
        return nada;
    }
    if (a.ctype === 'field') {
        var obj = evaluate(a.obj);
        if (obj.ctype === "geo") {
            return Accessor.getField(obj.value, a.key);
        }
        if (obj.ctype === "list") {
            return List.getField(obj, a.key);
        }
        return nada;
    }
    return a;
}


function evaluateAndVal(a) {


    var x = evaluate(a);
    if (x.ctype === 'geo') {
        var val = x.value;
        if (val.kind === "P") {
            return Accessor.getField(val, "xy");
        }
        if (val.kind === "V") {
            return val.value;
        }

    }
    return x; //TODO Implement this
}

function evaluateAndHomog(a) {
    var x = evaluate(a);
    if (x.ctype === 'geo') {
        var val = x.value;
        if (val.kind === "P") {
            return Accessor.getField(val, "homog");
        }
        if (val.kind === "L") {
            return Accessor.getField(val, "homog");
        }

    }
    if (List._helper.isNumberVecN(x, 3)) {
        return x;
    }

    if (List._helper.isNumberVecN(x, 2)) {
        var y = List.turnIntoCSList([
            x.value[0], x.value[1], CSNumber.real(1)
        ]);
        if (x.usage)
            y = General.withUsage(y, x.usage);
        return y;
    }

    return nada;
}


//*******************************************************
// this function shows an expression tree on the console
//*******************************************************

function report(a, i) {
    var prep = new Array(i + 1).join('.'),
        els, j;
    if (a.ctype === 'infix') {
        console.log(prep + "INFIX: " + a.oper);
        console.log(prep + "ARG 1 ");
        report(a.args[0], i + 1);
        console.log(prep + "ARG 2 ");
        report(a.args[1], i + 1);
    }
    if (a.ctype === 'number') {
        console.log(prep + "NUMBER: " + CSNumber.niceprint(a));
    }
    if (a.ctype === 'variable') {
        console.log(prep + "VARIABLE: " + a.name);
    }
    if (a.ctype === 'undefined') {
        console.log(prep + "UNDEF");
    }
    if (a.ctype === 'void') {
        console.log(prep + "VOID");
    }
    if (a.ctype === 'string') {
        console.log(prep + "STRING: " + a.value);
    }
    if (a.ctype === 'shape') {
        console.log(prep + "SHAPE: " + a.type);
    }
    if (a.ctype === 'modifier') {
        console.log(prep + "MODIF: " + a.key);
    }
    if (a.ctype === 'list') {
        console.log(prep + "LIST ");
        els = a.value;
        for (j = 0; j < els.length; j++) {
            console.log(prep + "EL" + j);
            report(els[j], i + 1);
        }
    }
    if (a.ctype === 'function') {
        console.log(prep + "FUNCTION: " + a.oper);
        els = a.args;
        for (j = 0; j < els.length; j++) {
            console.log(prep + "ARG" + j);
            report(els[j], i + 1);
        }
        els = a.modifs;
        for (var name in els) {
            console.log(prep + "MODIF:" + name);
            report(els[name], i + 1);
        }
    }
    if (a.ctype === 'error') {
        console.log(prep + "ERROR: " + a.message);
    }

}

var usedFunctions = {};

function analyse(code) {
    var parser = new Parser();
    parser.usedFunctions = usedFunctions;
    parser.infixmap = infixmap;
    var res = parser.parse(code);
    for (var name in parser.usedVariables)
        namespace.create(name);
    return res;
}
//*******************************************************
// and here are the definitions of the sound operators
//*******************************************************

var sound = {};
sound.lines = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

evaluator.playsin$1 = function(args, modifs) {

    function handleModifs() {
        var erg;
        if (modifs.line !== undefined) {

            erg = evaluate(modifs.line);
            if (erg.ctype === 'number') {
                linenumber = Math.floor(erg.value.real);
                if (linenumber < 0) {
                    linenumber = 0;
                }
                if (linenumber > 10) {
                    linenumber = 10;
                }
            }
        }
    }


    var v0 = evaluateAndVal(args[0]);
    var linenumber = 0;
    if (v0.ctype === 'number') {
        handleModifs();
        var lines = sound.lines;
        var f = v0.value.real;
        if (lines[linenumber] === 0) {
            // Was bitte sollte die Funktion T an dieser Stelle sein?
            // lines[linenumber]=T("sin", {freq:f,mul:0.6}).play();


        } else {
            lines[linenumber].set({
                freq: f
            });
        }

    }
    return nada;

};
var CSad = {};

CSad.printArr = function(erg) {
    var n = erg.value.length;
    var ttemp = [];
    var ttempi = [];
    var printimag = false;
    for (var k = 0; k < n; k++) {
        ttemp[k] = erg.value[k].value.real;
        ttempi[k] = erg.value[k].value.imag;
        if (ttempi[k] !== 0) printimag = true;
    }
    console.log(ttemp);
    if (printimag)
        console.log(ttempi);
};

// array which contains only n zeros
CSad.zero = function(n) {
    var erg = [];
    var zero = CSNumber.real(0);

    for (var i = 0; i < n.value.real; i++) {
        erg[i] = zero;
    }

    return List.turnIntoCSList(erg);
};

// csad number type [x0, 0, 0, ...]
CSad.number = function(x0, n) {
    var erg = CSad.zero(n);
    erg.value[0] = x0;
    return erg;
};

// csad variables [x0, 1, 0, ....]
CSad.variable = function(x0, n) {
    var erg = CSad.zero(n);
    erg.value[0] = x0;
    erg.value[1] = CSNumber.real(1);
    return erg;
};

CSad.add = function(a, b) {
    return List.add(a, b);
};

CSad.sub = function(a, b) {
    return List.sub(a, b);
};

CSad.mult = function(f, g) {
    if (f.value.length !== g.value.length) {
        console.error("dims don't fit return nada");
        return nada;
    }

    var le = f.value.length;
    var erg = CSad.zero(CSNumber.real(le));

    var ges = CSNumber.real(0);
    for (var k = 0; k < le; k++) {
        for (var i = 0; i <= k; i++) {
            ges = CSNumber.add(ges, CSNumber.mult(f.value[i], g.value[k - i]));
        } // end inner
        erg.value[k] = ges;
        ges = CSNumber.real(0);
    } // end outer

    return erg;
};


CSad.pow = function(a, b) {
    if (b.value.real < 0 || b.value.real !== Math.floor(b.value.real)) {
        return CSad.root(a, b);
    } else {
        var temp = a;
        for (var i = 1; i < b.value.real; i++) {
            temp = CSad.mult(temp, a);
        }
        return temp;
    }
};

// (f)^r for float r
CSad.root = function(f, r) {
    var zero = CSNumber.real(0);
    var one = CSNumber.real(1);
    var rOne = CSNumber.add(one, r);

    var le = f.value.length;
    var erg = CSad.zero(CSNumber.real(le));
    erg.value[0] = CSNumber.pow(f.value[0], r);

    var sum = zero;
    var inner;
    var ges, csK;
    for (var k = 1; k < le; k++) {
        csK = CSNumber.real(k);
        ges = f.value[k];
        for (var i = 1; i <= k; i++) {
            inner = CSNumber.mult(rOne, CSNumber.real(i));
            inner = CSNumber.div(inner, csK);
            inner = CSNumber.sub(inner, one);
            inner = CSNumber.mult(inner, f.value[i]);
            inner = CSNumber.mult(inner, erg.value[k - i]);
            sum = CSNumber.add(sum, inner);
        } // end inner

        ges = CSNumber.div(sum, f.value[0]);
        erg.value[k] = ges;
        sum = zero;
    } // end outer

    //    CSad.printArr(erg);
    return erg;

};

// return first nonzero indexes of f and g starting from k
CSad.findFirstNoneZero = function(f, g, k) {
    var idxf = Infinity;
    var idxg = Infinity;
    var myEps = 1e-12;
    for (var i = k; i < f.value.length; i++) {
        if (CSNumber.abs2(f.value[i]).value.real > myEps) {
            idxf = i;
            break;
        }
    }

    for (var j = k; j < g.value.length; j++) {
        if (CSNumber.abs2(g.value[j]).value.real > myEps) {
            idxg = j;
            break;
        }
    }

    return [idxf, idxg];
};

//CSad.trimArr = function(f, g) {};

// f / g
CSad.div = function(f, g) {
    if (f.value.length !== g.value.length) {
        console.log("dims don't fit - return nada");
        return nada;
    }

    var le = f.value.length;
    var myEps = 1e-16;
    var zero = CSNumber.real(0);
    var erg = CSad.zero(CSNumber.real(le));

    var sum = zero;
    var ges = zero;

    // loop over all coefficients
    for (var k = 0; k < le; k++) {
        // L'Hospitals rule
        var indxs = CSad.findFirstNoneZero(f, g, k);
        if (k < indxs[0] && (indxs[0] === indxs[1]) && indxs[0] !== Infinity) {
            //console.log("apply l Hospital", k);
            f.value.splice(k, indxs[0]);
            g.value.splice(k, indxs[0]);
            erg.value.splice(k, indxs[0]);
            le = le - indxs[0];
        }


        ges = f.value[k];
        for (var i = 0; i < k; i++) {
            sum = CSNumber.add(sum, CSNumber.mult(erg.value[i], g.value[k - i]));
        } // end inner

        ges = CSNumber.sub(ges, sum);
        ges = CSNumber.div(ges, g.value[0]);
        erg.value[k] = ges;
        ges = zero;
        sum = zero;
    } // end outer

    return erg;
};

CSad.exp = function(f) {
    var zero = CSNumber.real(0);
    var le = f.value.length;
    var erg = CSad.zero(CSNumber.real(le));

    var sum = zero;
    var inner;
    erg.value[0] = CSNumber.exp(f.value[0]);
    for (var k = 1; k < le; k++) {
        for (var i = 1; i <= k; i++) {
            inner = CSNumber.mult(CSNumber.real(i), f.value[i]);
            inner = CSNumber.mult(inner, erg.value[k - i]);
            sum = CSNumber.add(sum, inner);
        } // end inner
        erg.value[k] = CSNumber.div(sum, CSNumber.real(k));
        sum = zero;
    } // end outer

    return erg;
};

CSad.log = function(f) {
    var zero = CSNumber.real(0);
    var le = f.value.length;
    var erg = CSad.zero(CSNumber.real(le));
    erg.value[0] = CSNumber.log(f.value[0]);

    var sum = zero;
    var ges;
    var inner;
    for (var k = 1; k < le; k++) {
        ges = f.value[k];
        for (var i = 1; i < k; i++) {
            inner = CSNumber.mult(CSNumber.real(i), erg.value[i]);
            inner = CSNumber.mult(inner, f.value[k - i]);
            sum = CSNumber.add(sum, inner);
        } // end inner

        sum = CSNumber.div(sum, CSNumber.real(k));
        ges = CSNumber.sub(ges, sum);
        ges = CSNumber.div(ges, f.value[0]);
        erg.value[k] = ges;
        sum = zero;
    } // end outer

    return erg;
};

CSad.sincos = function(f) {
    var zero = CSNumber.real(0);
    var le = f.value.length;
    var ergsin = CSad.zero(CSNumber.real(le));
    var ergcos = CSad.zero(CSNumber.real(le));
    ergsin.value[0] = CSNumber.sin(f.value[0]);
    ergcos.value[0] = CSNumber.cos(f.value[0]);

    var sumcos = zero;
    var sumsin = zero;
    var insin, incos, inboth;
    var numk;
    for (var k = 1; k < le; k++) {
        numk = CSNumber.real(k);
        for (var i = 1; i <= k; i++) {
            inboth = CSNumber.mult(CSNumber.real(i), f.value[i]);
            insin = CSNumber.mult(inboth, ergcos.value[k - i]);
            incos = CSNumber.mult(inboth, ergsin.value[k - i]);

            sumsin = CSNumber.add(sumsin, insin);

            sumcos = CSNumber.add(sumcos, incos);
        } // end inner

        sumsin = CSNumber.div(sumsin, numk);
        sumcos = CSNumber.div(sumcos, CSNumber.neg(numk));
        ergsin.value[k] = sumsin;
        ergcos.value[k] = sumcos;
        sumsin = zero;
        sumcos = zero;
    } // end outer

    CSad.sinsave = ergsin;
    CSad.cossave = ergcos;
    return [ergsin, ergcos];

};

CSad.sin = function(f) {
    var erg = CSad.sincos(f);
    return erg[0];
};

CSad.cos = function(f) {
    var erg = CSad.sincos(f);
    return erg[1];
};


CSad.faculty = function(n) {
    var erg = [];
    erg[0] = CSNumber.real(1);
    var val = 1;
    for (var i = 1; i <= n.value.real; i++) {
        val = i * val;
        erg[i] = CSNumber.real(val);
    }
    erg = List.turnIntoCSList(erg);
    return erg;
};


CSad.diff = function(prog, varname, x0, grade) {
    var erg;

    if (prog.ctype === "variable") {
        if (prog.name !== varname) { // if we have different variable than run variable substitute with right val
            erg = CSad.number(evaluate(prog), grade);
        } else {
            erg = CSad.variable(x0, grade);
        }
    } else if (prog.ctype === "number") {
        erg = CSad.number(prog, grade);
    } else if (prog.ctype === "infix") {
        if (prog.oper === "*") {
            return CSad.mult(CSad.diff(prog.args[0], varname, x0, grade), CSad.diff(prog.args[1], varname, x0, grade));
        }
        if (prog.oper === "^") {
            return CSad.pow(CSad.diff(prog.args[0], varname, x0, grade), CSad.diff(prog.args[1], varname, x0, grade).value[0]); // .value[0] since we only want the exponent
        }

        if (prog.oper === "/") {
            return CSad.div(CSad.diff(prog.args[0], varname, x0, grade), CSad.diff(prog.args[1], varname, x0, grade));
        } else if (prog.oper === "+") {
            return CSad.add(CSad.diff(prog.args[0], varname, x0, grade), CSad.diff(prog.args[1], varname, x0, grade));
        } else if (prog.oper === "-") {
            return CSad.sub(CSad.diff(prog.args[0], varname, x0, grade), CSad.diff(prog.args[1], varname, x0, grade));
        } else {
            console.log("infix not found", prog.oper);
            return nada;
        }

    } else if (prog.ctype === "function") {
        if (prog.oper === "exp$1") {
            return CSad.exp(CSad.diff(prog.args[0], varname, x0, grade));
        }
        if (prog.oper === "log$1") {
            return CSad.log(CSad.diff(prog.args[0], varname, x0, grade));
        }
        if (prog.oper === "sin$1") {
            return CSad.sin(CSad.diff(prog.args[0], varname, x0, grade));
        }
        if (prog.oper === "cos$1") {
            return CSad.cos(CSad.diff(prog.args[0], varname, x0, grade));
        }
    } else {
        console.log("ctype not found", prog.ctype);
        return nada;
    }

    return erg;

};

CSad.adevaluate = function(prog, varname, x0, grade) {
    var ergarr = CSad.diff(prog, varname, x0, grade);
    var facs = CSad.faculty(grade);
    for (var i = 2; i < ergarr.value.length; i++) {
        ergarr.value[i] = CSNumber.mult(ergarr.value[i], facs.value[i]);
    }

    //console.log("erg after fac");
    //CSad.printArr(ergarr);

    return ergarr;
};

CSad.autodiff = function(ffunc, varname, xarr, grade) {
    var erg = [];
    var le = xarr.value.length;

    var arr;
    for (var i = 0; i < le; i++) {
        arr = CSad.adevaluate(ffunc, varname, xarr.value[i], grade);
        erg[i] = arr;
    }

    erg = List.turnIntoCSList(erg);
    return erg;
};
var Render2D = {};

Render2D.handleModifs = function(modifs, handlers) {
    // Reset stuff first
    if (Render2D.dashing)
        Render2D.unSetDash();
    Render2D.colorraw = null;
    Render2D.fillcolorraw = null;
    Render2D.fillrule = "nonzero";
    Render2D.size = null;
    if (Render2D.psize <= 0) Render2D.psize = 0;
    if (Render2D.lsize <= 0) Render2D.lsize = 0;
    Render2D.overhang = 1; //TODO Maybe set default
    Render2D.dashing = false;
    Render2D.isArrow = false;
    Render2D.arrowSides = '==>';
    Render2D.arrowposition = 1.0; // position arrowhead along the line
    Render2D.headlen = 10; // arrow head length - perhaps set this relative to canvas size
    Render2D.arrowShape = Render2D.arrowShapes.line;
    Render2D.alpha = csport.drawingstate.alpha;
    Render2D.fillalpha = 0;
    Render2D.bold = "";
    Render2D.italics = "";
    Render2D.family = "sans-serif";
    Render2D.align = 0;
    Render2D.xOffset = 0;
    Render2D.yOffset = 0;
    Render2D.lineCap = "round";
    Render2D.lineJoin = "round";
    Render2D.miterLimit = 10;

    // Process handlers
    var key, handler;
    for (key in modifs) {
        var val = modifs[key];
        if (!val) continue; // may happen when called internally
        handler = handlers[key];
        if (!handler) {
            console.log("Modifier not supported: " + key);
            continue;
        }
        if (handler === true) {
            handler = Render2D.modifHandlers[key];
        }
        handler(evaluate(val));
    }

    // Post-process settings

    if (Render2D.size !== null) {
        Render2D.psize = Render2D.lsize = Render2D.size;
    } else {
        Render2D.psize = csport.drawingstate.pointsize;
        Render2D.lsize = csport.drawingstate.linesize;
    }
    if (Render2D.dashing) {
        Render2D.dashing(Render2D.lsize);
    }
    if (Render2D.colorraw !== null) {
        Render2D.pointColor = Render2D.lineColor = Render2D.textColor =
            Render2D.makeColor(Render2D.colorraw);
    } else if (Render2D.alpha === 1) {
        Render2D.pointColor = csport.drawingstate.pointcolor;
        Render2D.lineColor = csport.drawingstate.linecolor;
        Render2D.textColor = csport.drawingstate.textcolor;
    } else {
        Render2D.pointColor =
            Render2D.makeColor(csport.drawingstate.pointcolorraw);
        Render2D.lineColor =
            Render2D.makeColor(csport.drawingstate.linecolorraw);
        Render2D.textColor =
            Render2D.makeColor(csport.drawingstate.textcolorraw);
    }
    if (Render2D.alpha === 1) {
        Render2D.black = "rgb(0,0,0)";
    } else {
        Render2D.black = "rgba(0,0,0," + Render2D.alpha + ")";
    }
    if (Render2D.fillcolorraw && Render2D.fillalpha > 0) {
        Render2D.fillColor =
            Render2D.makeColor(Render2D.fillcolorraw, Render2D.fillalpha);
    } else {
        Render2D.fillColor = null;
    }

};

Render2D.modifHandlers = {
    "size": function(v) {
        if (v.ctype === "number") {
            Render2D.size = v.value.real;
            if (Render2D.size < 0) Render2D.size = 0;
            if (Render2D.size > 1000) Render2D.size = 1000;
        }
    },

    "color": function(v) {
        if (List.isNumberVector(v).value && v.value.length === 3) {
            Render2D.colorraw = [
                v.value[0].value.real,
                v.value[1].value.real,
                v.value[2].value.real
            ];
        }
    },

    "fillcolor": function(v) {
        if (List.isNumberVector(v).value && v.value.length === 3) {
            Render2D.fillcolorraw = [
                v.value[0].value.real,
                v.value[1].value.real,
                v.value[2].value.real
            ];
        }
    },

    "alpha": function(v) {
        if (v.ctype === "number") {
            Render2D.alpha = v.value.real;
        }
    },

    "fillalpha": function(v) {
        if (v.ctype === "number") {
            Render2D.fillalpha = v.value.real;
        }
    },

    "dashpattern": function(v) {
        if (v.ctype === "list") {
            var pat = [];
            for (var i = 0, j = 0; i < v.value.length; i++) {
                if (v.value[i].ctype === "number")
                    pat[j++] = v.value[i].value.real;
            }
            Render2D.dashing = Render2D.setDash.bind(null, pat);
        }
    },

    "dashtype": function(v) {
        var type;
        if (v.ctype === "number") {
            type = Math.floor(v.value.real);
        } else if (v.ctype === "string") {
            type = v.value;
        } else {
            return;
        }
        var pat = Render2D.dashTypes[type];
        if (pat)
            Render2D.dashing = Render2D.setDash.bind(null, pat);
    },

    "dashing": function(v) {
        if (v.ctype === 'number') {
            var si = Math.floor(v.value.real);
            Render2D.dashing = Render2D.setDash.bind(null, [si * 2, si]);
        }
    },

    "overhang": function(v) {
        if (v.ctype === 'number') {
            // Might combine with arrowposition, see there for details
            Render2D.overhang = Render2D.overhang * v.value.real +
                (1 - Render2D.overhang) * (1 - v.value.real);
        }
    },

    "arrow": function(v) {
        if (v.ctype === 'boolean') {
            Render2D.isArrow = v.value;
        } else {
            console.error("arrow needs to be of type boolean");
        }
    },

    "arrowshape": function(v) {
        if (v.ctype !== 'string') {
            console.error("arrowshape needs to be of type string");
        } else if (!Render2D.arrowShapes.hasOwnProperty(v.value)) {
            var allowed = Object.keys(Render2D.arrowShapes);
            allowed.sort();
            allowed = allowed.join(", ");
            console.error("arrowshape needs to be one of " + allowed);
        } else {
            Render2D.arrowShape = Render2D.arrowShapes[v.value];
            Render2D.isArrow = true;
            if (Render2D.arrowShape.deprecated) {
                console.log("arrowshape " + v.value + " is deprecated, use " +
                    Render2D.arrowShape.deprecated + " instead.");
                Render2D.arrowShape.deprecated = null;
            }
        }
    },

    "arrowsides": function(v) {
        if (v.ctype !== 'string') {
            console.error('arrowsides is not of type string');
        } else if (!(v.value === '==>' || v.value === '<==>' || v.value === '<==')) {
            console.error("arrowsides is unknows");
        } else {
            Render2D.arrowSides = v.value;
            Render2D.isArrow = true;
        }
    },

    "arrowposition": function(v) {
        if (v.ctype !== "number") {
            console.error('arrowposition is not of type number');
        } else if (v.value.real < 0.0) {
            console.error("arrowposition has to be positive");
        } else if (v.value.real > 1.0) {
            // Combine position into overhang to simplify things
            // Writing a for overhang and b for arrowposition, we have
            // q1 = b*(a*p1 + (1-a)*p2) + (1-b)*(a*p2 + (1-a)*p1)
            Render2D.overhang = Render2D.overhang * v.value.real +
                (1 - Render2D.overhang) * (1 - v.value.real);
        } else {
            Render2D.arrowposition = v.value.real;
            Render2D.isArrow = true;
        }
    },

    "arrowsize": function(v) {
        if (v.ctype !== "number") {
            console.error('arrowsize is not of type number');
        } else if (v.value.real < 0.0) {
            console.error("arrowsize has to be positive");
        } else {
            Render2D.headlen = Render2D.headlen * v.value.real;
        }
    },

    "bold": function(v) {
        if (v.ctype === "boolean" && v.value)
            Render2D.bold = "bold ";
    },

    "italics": function(v) {
        if (v.ctype === "boolean" && v.value)
            Render2D.italics = "italic ";
    },

    "family": function(v) {
        if (v.ctype === "string") {
            Render2D.family = v.value;
        }
    },

    "align": function(v) {
        if (v.ctype === "string") {
            var s = v.value;
            // TODO: Use values suitable for csctx.textAlign here
            if (s === "left")
                Render2D.align = 0;
            if (s === "right")
                Render2D.align = 1;
            if (s === "mid" || s === "center")
                Render2D.align = 0.5;
        }
    },

    "x_offset": function(v) {
        if (v.ctype === "number")
            Render2D.xOffset = v.value.real;
    },

    "y_offset": function(v) {
        if (v.ctype === "number")
            Render2D.yOffset = v.value.real;
    },

    "offset": function(v) {
        if (v.ctype === "list" && v.value.length === 2 &&
            v.value[0].ctype === "number" && v.value[1].ctype === "number") {
            Render2D.xOffset = v.value[0].value.real;
            Render2D.yOffset = v.value[1].value.real;
        }
    },

    "lineCap": function(v) {
        if (v.ctype === "string" && (v.value === "round" || v.value === "square" || v.value === "butt"))
            Render2D.lineCap = v.value;
    },

    "lineJoin": function(v) {
        if (v.ctype === "string" && (v.value === "round" || v.value === "bevel" || v.value === "miter"))
            Render2D.lineJoin = v.value;
    },
    "fillrule": function(v) {
        if (v.ctype === "string" && (v.value === "nonzero" || v.value === "evenodd"))
            Render2D.fillrule = v.value;
    },

    "miterLimit": function(v) {
        if (v.ctype === "number" && v.value.real > 0) {
            Render2D.miterLimit = Math.round(v.value.real);
        }
    }
};

Render2D.lineModifs = {
    "size": true,
    "color": true,
    "alpha": true,
    "dashpattern": true,
    "dashtype": true,
    "dashing": true,
    "overhang": true,
    "arrow": true,
    "arrowshape": true,
    "arrowsides": true,
    "arrowposition": true,
    "arrowsize": true,
    "lineCap": true,
    "lineJoin": true,
    "miterLimit": true,
};

Render2D.pointModifs = {
    "size": true,
    "color": true,
    "alpha": true,
};

Render2D.pointAndLineModifs = Render2D.lineModifs;

Render2D.conicModifs = {
    "size": true,
    "color": true,
    "alpha": true,
    "fillcolor": true,
    "fillrule": true,
    "fillalpha": true,
    "lineCap": true,
    "lineJoin": true,
    "miterLimit": true
};

Render2D.textModifs = {
    "size": true,
    "color": true,
    "alpha": true,
    "bold": true,
    "italics": true,
    "family": true,
    "align": true,
    "x_offset": true,
    "y_offset": true,
    "offset": true,
};


Render2D.makeColor = function(colorraw, alpha) {
    if (alpha === undefined) alpha = Render2D.alpha;
    var r = Math.floor(colorraw[0] * 255);
    var g = Math.floor(colorraw[1] * 255);
    var b = Math.floor(colorraw[2] * 255);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};

Render2D.preDrawCurve = function() {
    csctx.lineWidth = Render2D.lsize;
    csctx.lineCap = Render2D.lineCap;
    csctx.lineJoin = Render2D.lineJoin;
    csctx.mozFillRule = Render2D.fillrule;
    csctx.fillrule = Render2D.fillrule;
    csctx.miterLimit = Render2D.miterLimit;
    csctx.strokeStyle = Render2D.lineColor;
};

Render2D.arrowShapes = {
    "default": {
        close: false,
        fill: false,
        ratio: 1,
        deprecated: "line"
    },
    "line": {
        close: false,
        fill: false,
        ratio: 1
    },
    "empty": {
        close: true,
        fill: false,
        ratio: 1
    },
    "hollow": {
        close: true,
        fill: false,
        ratio: 1,
        deprecated: "empty"
    },
    "full": {
        close: true,
        fill: true,
        ratio: 1
    },
    "jet": {
        close: true,
        fill: true,
        ratio: 1.5
    },
    "delta": {
        close: true,
        fill: true,
        ratio: 1.5,
        deprecated: "jet"
    },
};

Render2D.clipSegment = function(pt1, pt2) {
    var dx = pt2.x - pt1.x;
    var dy = pt2.y - pt1.y;
    var clipPoints = Render2D.clipLineCore(-dy, dx, pt1.x * pt2.y - pt2.x * pt1.y);
    if (clipPoints.length !== 2) return [];
    var q1 = clipPoints[0];
    var q2 = clipPoints[1];
    var factor = 1 / (dx * dx + dy * dy);
    var dot1 = ((q1.x - pt1.x) * dx + (q1.y - pt1.y) * dy) * factor;
    var dot2 = ((q2.x - pt1.x) * dx + (q2.y - pt1.y) * dy) * factor;
    if (dot1 < 0) q1 = pt1;
    if (dot1 > 1) q1 = pt2;
    if (dot2 < 0) q2 = pt1;
    if (dot2 > 1) q2 = pt2;
    if (q1 === q2) return [];
    return [q1, q2];
};

Render2D.drawsegcore = function(pt1, pt2) {
    var m = csport.drawingstate.matrix;
    var endpoint1x = pt1.x * m.a - pt1.y * m.b + m.tx;
    var endpoint1y = pt1.x * m.c - pt1.y * m.d - m.ty;
    var endpoint2x = pt2.x * m.a - pt2.y * m.b + m.tx;
    var endpoint2y = pt2.x * m.c - pt2.y * m.d - m.ty;
    var overhang1 = Render2D.overhang;
    var overhang2 = 1 - overhang1;
    var overhang1x = overhang1 * endpoint1x + overhang2 * endpoint2x;
    var overhang1y = overhang1 * endpoint1y + overhang2 * endpoint2y;
    var overhang2x = overhang1 * endpoint2x + overhang2 * endpoint1x;
    var overhang2y = overhang1 * endpoint2y + overhang2 * endpoint1y;

    if (overhang1x < 0 || overhang1x > csw ||
        overhang1y < 0 || overhang1y > csh ||
        overhang2x < 0 || overhang2x > csw ||
        overhang2y < 0 || overhang2y > csh) {
        // clip to canvas boundary (up to line size)
        var res = Render2D.clipSegment({
            x: overhang1x,
            y: overhang1y
        }, {
            x: overhang2x,
            y: overhang2y
        });
        if (res.length !== 2 || Render2D.lsize < 0.01) return;
        overhang1x = res[0].x;
        overhang1y = res[0].y;
        overhang2x = res[1].x;
        overhang2y = res[1].y;
    }

    Render2D.preDrawCurve();

    if (!Render2D.isArrow ||
        (endpoint1x === endpoint1y && endpoint2x === endpoint2y)) {
        // Fast path if we have no arrowheads
        if (Render2D.lsize < 0.01) return;
        csctx.beginPath();
        csctx.moveTo(overhang1x, overhang1y);
        csctx.lineTo(overhang2x, overhang2y);
        csctx.stroke();
        return;
    }

    var dx = endpoint2x - endpoint1x;
    var dy = endpoint2y - endpoint1y;
    var hs = Render2D.headlen / Math.sqrt(dx * dx + dy * dy);
    var hx = dx * hs;
    var hy = dy * hs;
    var pos_fac1 = Render2D.arrowposition;
    var pos_fac2 = 1 - pos_fac1;
    var tip1x = pos_fac1 * overhang1x + pos_fac2 * overhang2x;
    var tip1y = pos_fac1 * overhang1y + pos_fac2 * overhang2y;
    var tip2x = pos_fac1 * overhang2x + pos_fac2 * overhang1x;
    var tip2y = pos_fac1 * overhang2y + pos_fac2 * overhang1y;
    var arrowSides = Render2D.arrowSides;

    csctx.beginPath();

    // draw line in parts for full arrow
    if (Render2D.arrowShape.close) {
        if (arrowSides === "<==>" || arrowSides === "<==") {
            if (Render2D.arrowposition < 1.0) {
                csctx.moveTo(overhang1x, overhang1y);
                csctx.lineTo(tip1x, tip1y);
            }
            csctx.moveTo(tip1x + hx, tip1y + hy);
        } else {
            csctx.moveTo(overhang1x, overhang1y);
        }
        if (arrowSides === '==>' || arrowSides === '<==>') {
            csctx.lineTo(tip2x - hx, tip2y - hy);
            if (Render2D.arrowposition < 1.0) {
                csctx.moveTo(tip2x, tip2y);
                csctx.lineTo(overhang2x, overhang2y);
            }
        } else {
            csctx.lineTo(overhang2x, overhang2y);
        }
    } else {
        csctx.moveTo(overhang1x, overhang1y);
        csctx.lineTo(overhang2x, overhang2y);
    }

    csctx.stroke();

    // draw arrow heads at desired positions
    if (arrowSides === '==>' || arrowSides === '<==>') {
        draw_arrowhead(tip2x, tip2y, 1, Render2D.arrowShape.ratio);
    }
    if (arrowSides === '<==' || arrowSides === '<==>') {
        draw_arrowhead(tip1x, tip1y, -1, -Render2D.arrowShape.ratio);
    }

    function draw_arrowhead(tipx, tipy, sign, ratio) {
        var rx = tipx - ratio * hx + 0.5 * hy;
        var ry = tipy - ratio * hy - 0.5 * hx;
        var lx = tipx - ratio * hx - 0.5 * hy;
        var ly = tipy - ratio * hy + 0.5 * hx;

        csctx.beginPath();
        if (Render2D.arrowShape.fill) {
            csctx.lineWidth = Render2D.lsize / 2;
        }
        csctx.moveTo(rx, ry);
        csctx.lineTo(tipx, tipy);
        csctx.lineTo(lx, ly);
        if (Render2D.arrowShape.close) {
            csctx.fillStyle = Render2D.lineColor;
            csctx.lineTo(tipx - sign * hx, tipy - sign * hy);
            csctx.closePath();
            if (Render2D.arrowShape.fill) {
                csctx.fill();
            }
        }
        csctx.stroke();
    }

};

Render2D.drawpoint = function(pt) {
    var m = csport.drawingstate.matrix;

    var xx = pt.x * m.a - pt.y * m.b + m.tx;
    var yy = pt.x * m.c - pt.y * m.d - m.ty;

    csctx.lineWidth = Render2D.psize * 0.3;
    csctx.beginPath();
    csctx.arc(xx, yy, Render2D.psize, 0, 2 * Math.PI);
    csctx.fillStyle = Render2D.pointColor;

    csctx.fill();

    csctx.beginPath();
    csctx.arc(xx, yy, Render2D.psize * 1.15, 0, 2 * Math.PI);
    csctx.fillStyle = Render2D.black;
    csctx.strokeStyle = Render2D.black;
    csctx.stroke();
};

Render2D.clipLineCore = function(a, b, c) {
    // clip to canvas boundary (up to line size)
    var margin = Math.SQRT1_2 * Render2D.lsize;
    var xMin = 0 - margin;
    var xMax = csw + margin;
    var yMax = 0 - margin;
    var yMin = csh + margin;
    var distNeg = function(x, y) {
        return x * a + y * b + c < 0;
    };
    var ul = distNeg(xMin, yMax);
    var ur = distNeg(xMax, yMax);
    var ll = distNeg(xMin, yMin);
    var lr = distNeg(xMax, yMin);
    var res = [];
    if (ul !== ur) res.push({
        x: (-c - b * yMax) / a,
        y: yMax
    });
    if (ur !== lr) res.push({
        x: xMax,
        y: (-c - a * xMax) / b
    });
    if (ll !== lr) res.push({
        x: (-c - b * yMin) / a,
        y: yMin
    });
    if (ul !== ll) res.push({
        x: xMin,
        y: (-c - a * xMin) / b
    });

    return res;
};

Render2D.clipLine = function(homog) {
    // transformation to canvas coordinates
    var n = List.normalizeMax(List.productVM(homog, csport.toMat()));
    var a = n.value[0].value.real;
    var b = n.value[1].value.real;
    var c = n.value[2].value.real;
    return Render2D.clipLineCore(a, b, c);
};

Render2D.drawline = function(homog) {
    if (!List._helper.isAlmostReal(homog))
        return;

    var res = Render2D.clipLine(homog);
    if (res.length === 2 && Render2D.lsize >= 0.01) {
        Render2D.preDrawCurve();
        csctx.beginPath();
        csctx.moveTo(res[0].x, res[0].y);
        csctx.lineTo(res[1].x, res[1].y);
        csctx.stroke();
    }
};

// draws a segment through infinity, consisting of 2 rays
Render2D.drawRaySegment = function(A, B) {
    var ptA = eval_helper.extractPoint(A);
    var ptB = eval_helper.extractPoint(B);
    if (!ptA.ok || !ptB.ok) {
        return;
    }

    var dx = ptA.x - ptB.x;
    var dy = ptA.y - ptB.y;
    var norm = Math.sqrt(dx * dx + dy * dy);

    // get points outside canvas (at "infinity")
    var sc = csport.drawingstate.matrix.sdet;
    var farAway = 25000 / sc; // 25000px in user coordinates
    var factor = farAway / norm;
    dx = dx * factor;
    dy = dy * factor;

    Render2D.drawsegcore(ptA, {
        x: ptA.x + dx,
        y: ptA.y + dy
    });
    Render2D.drawsegcore(ptB, {
        x: ptB.x - dx,
        y: ptB.y - dy
    });
};

Render2D.dashTypes = {
    "solid": [],
    "dashed": [10, 10],
    "tightdash": [10, 4],
    "dotted": [1, 3],
    "dashdot": [10, 5, 1, 5],
    "dashvalue.solid": [],
    "dashvalue.dashed": [10, 10],
    "dashvalue.tightdash": [10, 4],
    "dashvalue.dotted": [1, 3],
    "dashvalue.dashdot": [10, 5, 1, 5],
    0: [],
    1: [10, 10],
    2: [10, 4],
    3: [1, 3],
    4: [10, 5, 1, 5],
};

Render2D.setDash = function(pattern, size) {
    var s = Math.sqrt(size);
    pattern = pattern.slice();
    for (var i = 0; i < pattern.length; i++) {
        pattern[i] *= s;
    }
    csctx.webkitLineDash = pattern; //Safari
    csctx.setLineDash(pattern); //Chrome
    csctx.mozDash = pattern; //FFX
};

Render2D.unSetDash = function() {
    csctx.webkitLineDash = []; //Safari
    csctx.setLineDash([]); //Chrome
    csctx.mozDash = []; //FFX
};
// JSHint doesn't like setters without getters, but we use them anyway

/*jshint -W078 */

// SVG Writer creates a string representation, as opposed to DOM manipulation.

function SvgWriterContext() {
    this._path = [];
    this._defs = ['<defs>'];
    this._imgcache = [];
    this._body = [];
    this._saveStack = [''];
    this._clipIndex = 0;
    this._fill = '#000';
    this._stroke = '#000';
    this._fillOpacity = null;
    this._strokeOpacity = null;

    this.width = 0;
    this.height = 0;
    this.lineWidth = 1;
    this.lineCap = 'butt';
    this.lineJoin = 'miter';
    this.miterLimit = 10;
    this.globalAlpha = 1;
}

SvgWriterContext.prototype = {

    set fillStyle(style) {
        var self = this;
        parseColor(style, function(r, g, b, a) {
            self._fill = '#' +
                padStr(r.toString(16), 2) +
                padStr(g.toString(16), 2) +
                padStr(b.toString(16), 2);
            self._fillOpacity = (a === 255 ? null : a);
        });
    },

    set strokeStyle(style) {
        var self = this;
        parseColor(style, function(r, g, b, a) {
            self._stroke = '#' +
                padStr(r.toString(16), 2) +
                padStr(g.toString(16), 2) +
                padStr(b.toString(16), 2);
            self._strokeOpacity = (a === 255 ? null : a);
        });
    },

    clearRect: function() {
        // Presumably this just clears everything in an already empty state.
        // But we already might have some transformations applied.
        // So let's just ignore this for now.
    },

    beginPath: function() {
        this._path = [];
    },

    _pathcmd: function() {
        this._path.push.apply(this._path, arguments);
    },

    closePath: function() {
        this._pathcmd('Z');
    },

    moveTo: function(x, y) {
        this._pathcmd('M', x, y);
    },

    lineTo: function(x, y) {
        this._pathcmd('L', x, y);
    },

    bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
        this._pathcmd('C', x1, y1, x2, y2, x3, y3);
    },

    quadraticCurveTo: function(x1, y1, x2, y2) {
        this._pathcmd('Q', x1, y1, x2, y2);
    },

    arc: function(x, y, r, a1, a2, dir) {
        var x1 = r * Math.cos(a1) + x;
        var y1 = r * Math.sin(a1) + y;
        var x2 = r * Math.cos(a2) + x;
        var y2 = r * Math.sin(a2) + y;
        var covered = dir ? a1 - a2 : a2 - a1;
        if (covered >= 2 * Math.PI) {
            // draw in two arcs since the endpoints of a single arc
            // must not coincide as they would in this case
            this._pathcmd(
                this._path.length ? 'L' : 'M', x1, y1,
                'A', r, r, 0, 0, dir ? 1 : 0,
                x - r * Math.cos(a1), y - r * Math.sin(a1),
                'A', r, r, 0, 0, dir ? 1 : 0, x1, y1);
        } else {
            var largeArc = covered > Math.PI ? 1 : 0;
            this._pathcmd(
                this._path.length ? 'L' : 'M', x1, y1,
                'A', r, r, 0, largeArc, dir ? 1 : 0, x2, y2);
        }
    },

    rect: function(x, y, w, h) {
        this._pathcmd('M', x, y, 'h', w, 'v', h, 'h', -w, 'z');
    },

    _cmd: function(op) {
        if (this.globalAlpha !== 1) {
            this._body.push('<g opacity="' + this.globalAlpha + '">');
            this._body.push(op);
            this._body.push('</g>');
        } else {
            this._body.push(op);
        }
    },

    _attrs: function(dict) {
        var res = '';
        for (var key in dict)
            if (dict[key] !== null)
                res += ' ' + key + '="' + dict[key] + '"';
        return res;
    },

    fill: function() {
        this._cmd('<path' + this._attrs({
            d: this._path.join(' '),
            fill: this._fill,
            'fill-opacity': this._fillOpacity,
        }) + '/>');
    },

    stroke: function() {
        this._cmd('<path' + this._attrs({
            d: this._path.join(' '),
            stroke: this._stroke,
            'stroke-opacity': this._strokeOpacity,
            'stroke-width': this.lineWidth,
            'stroke-linecap': this.lineCap,
            'stroke-linejoin': this.lineJoin,
            'stroke-miterlimit': (
                this.lineJoin === 'miter' ? this.miterLimit : null),
        }) + '/>');
    },

    clip: function() {
        ++this._clipIndex;
        this._body.push(
            '<clipPath id="clip' + this._clipIndex + '">' +
            '<path d="' + this._path.join(' ') + '"/>' +
            '</clipPath>',
            '<g clip-path="url(#clip' + this._clipIndex + ')">'
        );
        this._saveStack[this._saveStack.length - 1] += '</g>';
    },

    save: function() {
        this._saveStack.push('');
    },

    restore: function() {
        this._body.push(this._saveStack.pop());
        if (this._saveStack.length === 0)
            this._saveStack.push('');
    },

    _transform: function(tr) {
        this._body.push('<g transform="' + tr + '">');
        this._saveStack[this._saveStack.length - 1] += '</g>';
    },

    translate: function(x, y) {
        this._transform('translate(' + x + ' ' + y + ')');
    },

    rotate: function(rad) {
        this._transform('rotate(' + rad * (Math.PI / 180) + ')');
    },

    scale: function(x, y) {
        this._transform('scale(' + x + ' ' + y + ')');
    },

    transform: function(a, b, c, d, e, f) {
        this._transform('matrix(' + [a, b, c, d, e, f].join(' ') + ')');
    },

    drawImage: function(img, x, y) {
        if (arguments.length !== 3)
            throw Error('SvgWriterContext only supports ' +
                '3-argument version of drawImage');
        var idx = this._imgcache.indexOf(img);
        if (idx === -1) {
            idx = this._imgcache.length;
            var data;
            if (img.cachedDataURL) {
                data = img.cachedDataURL;
            } else {
                data = imageToDataURL(img);
                // Don't add as img.cachedDataURL since it might be
                // e.g. a video source, which we'd want to re-convert
            }
            this._defs.push(
                '<image id="img' + idx + '" x="0" y="0" width="' + img.width +
                '" height="' + img.height + '" xlink:href="' + data + '"/>');
            this._imgcache.push(img);
        }
        this._cmd(
            '<use x="' + x + '" y="' + y + '" xlink:href="#img' + idx + '"/>');
    },

    toBlob: function() {
        while (this._saveStack.length > 1 || this._saveStack[0] !== '')
            this.restore();
        var str = (
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' +
            '<svg xmlns="http://www.w3.org/2000/svg" ' +
            'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
            'version="1.1" ' +
            'width="' + this.width + 'px" ' +
            'height="' + this.height + 'px">\n' +
            this._defs.join('\n') + '\n</defs>\n' +
            '<g stroke="none" fill="none">\n' +
            this._body.join('\n') + '\n' +
            '</g>\n</svg>\n'
        );
        return new Blob([str], {
            type: 'image/svg+xml'
        });
    }

};

// A PDF file writer, currently creating uncompressed PDF.
// See https://www.adobe.com/devnet/pdf/pdf_reference_archive.html.

function PdfWriterContext() {
    this._body = [];
    this._xPos = NaN;
    this._yPos = NaN;
    this._extGState = {
        Af255: '<< /ca 1 >>',
        As255: '<< /CA 1 >>'
    };
    this._objects = [
        ['%PDF-1.4\n']
    ];
    this._offset = this._objects[0][0].length;
    this._nextIndex = 5;
    this._imgcache = [];
    this._xobjects = {};
    this._pathUsed = -1;
    this._globalAlpha = 1;
    this._strokeAlpha = 1;
    this._fillAlpha = 1;

    this.width = 0;
    this.height = 0;
    this.lineWidth = 1;
    this.lineCap = 'butt';
    this.lineJoin = 'miter';
    this.miterLimit = 10;
}

PdfWriterContext.prototype = {

    _cmd: function() {
        this._body.push(Array.prototype.join.call(arguments, ' '));
    },

    _setAlpha: function(alpha, prefix, param) {
        var val = Math.round(255 * alpha * this._globalAlpha);
        var name = prefix + val;
        this._extGState[name] = '<< /' + param + ' ' + (val / 255) + ' >>';
        this._cmd('/' + name, 'gs');
        return alpha;
    },

    set globalAlpha(alpha) {
        this._globalAlpha = alpha;
        this._setAlpha(this._strokeAlpha, 'As', 'CA');
        this._setAlpha(this._fillAlpha, 'Af', 'ca');
    },

    set fillStyle(style) {
        var self = this;
        parseColor(style, function(r, g, b, a) {
            self._cmd(r / 255, g / 255, b / 255, 'rg');
            self._setAlpha(self._fillAlpha = a, 'Af', 'ca');
        });
    },

    set strokeStyle(style) {
        var self = this;
        parseColor(style, function(r, g, b, a) {
            self._cmd(r / 255, g / 255, b / 255, 'RG');
            self._setAlpha(self._strokeAlpha = a, 'As', 'CA');
        });
    },

    set lineWidth(width) {
        this._cmd(width, 'w');
    },

    set lineCap(style) {
        this._cmd({
            butt: 0,
            round: 1,
            square: 2
        }[style], 'J');
    },

    set lineJoin(style) {
        this._cmd({
            miter: 0,
            round: 1,
            bevel: 2
        }[style], 'j');
    },

    set miterLimit(limit) {
        this._cmd(limit, 'M');
    },

    clearRect: function() {
        // Presumably this just clears everything in an already empty state.
        // But we already might have some transformations applied.
        // So let's just ignore this for now.
    },

    beginPath: function() {
        this._pathUsed = false;
    },

    closePath: function() {
        this._cmd('h');
    },

    moveTo: function(x, y) {
        this._cmd(this._xPos = x, this._yPos = -y, 'm');
    },

    lineTo: function(x, y) {
        this._cmd(this._xPos = x, this._yPos = -y, 'l');
    },

    bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
        this._cmd(x1, -y1, x2, -y2, this._xPos = x3, this._yPos = -y3, 'c');
    },

    quadraticCurveTo: function(x1, y1, x2, y2) {
        this.bezierCurveTo(
            (2 * x1 + this._xPos) / 3, (2 * y1 - this._yPos) / 3, (x2 + 2 * x1) / 3, (y2 + 2 * y1) / 3, x2, y2);
    },

    _kappa: 0.55228474983079340, // 4 * (Math.sqrt(2) - 1) / 3

    arc: function(x, y, r, a1, a2, dir) {
        if (a1 === 0 && a2 === 2 * Math.PI) {
            var k = this._kappa * r;
            this.moveTo(x + r, y);
            this.bezierCurveTo(x + r, y + k, x + k, y + r, x, y + r);
            this.bezierCurveTo(x - k, y + r, x - r, y + k, x - r, y);
            this.bezierCurveTo(x - r, y - k, x - k, y - r, x, y - r);
            this.bezierCurveTo(x + k, y - r, x + r, y - k, x + r, y);
            return;
        }
        throw Error('PdfWriterContext.arc only supports full circles');
    },

    rect: function(x, y, w, h) {
        this._cmd(x, -y, w, -h, 're');
    },

    _usePath: function(cmd) {
        if (this._pathUsed) {
            var prev = this._body[this._pathUsed];
            var combined = {
                'S + f': 'B',
                'f + S': 'B',
                'W n + S': 'W S',
                'W n + f': 'W f',
                'S + W n': 'W S',
                'f + W n': 'W f',
                'B + W n': 'W B',
                'W S + f': 'W B',
                'W f + S': 'W B',
            }[prev + ' + ' + cmd];
            if (!combined)
                throw Error("Don't know how to combine '" +
                    prev + "' and '" + cmd + "'");
            this._body.splice(this._pathUsed, 1);
            cmd = combined;
        }
        this._pathUsed = this._body.length;
        this._cmd(cmd);
    },

    fill: function() {
        this._usePath('f');
    },

    stroke: function() {
        this._usePath('S');
    },

    clip: function() {
        this._usePath('W n');
    },

    save: function() {
        this._cmd('q');
    },

    restore: function() {
        this._cmd('Q');
    },

    translate: function(x, y) {
        this.transform(1, 0, 0, 1, x, y);
    },

    rotate: function(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        this.transform(c, s, -s, c, 0, 0);
    },

    scale: function(x, y) {
        this.transform(x, 0, 0, y, 0, 0);
    },

    transform: function(a, b, c, d, e, f) {
        this._cmd(a, -b, -c, d, e, -f, 'cm');
    },

    _png: function(dataURL) {
        if (dataURL.substr(0, 22) !== 'data:image/png;base64,')
            return {
                error: 'Not a base64-encoded PNG file'
            };
        var bytes = base64Decode(dataURL.substr(22));
        var chunks = pngChunks(bytes);
        console.log('PNG chunks:',
            chunks.map(function(chunk) {
                return chunk.type;
            }));

        // Read header
        if (chunks[0].type !== 'IHDR')
            throw Error('Image does not start with an IHDR');
        var ihdr = chunks[0].data;
        var width = ((ihdr[0] << 24) | (ihdr[1] << 16) |
            (ihdr[2] << 8) | (ihdr[3])) >>> 0;
        var height = ((ihdr[4] << 24) | (ihdr[5] << 16) |
            (ihdr[6] << 8) | (ihdr[7])) >>> 0;
        var bitDepth = ihdr[8];
        var colorType = ihdr[9];
        var palette = (colorType & 1) !== 0;
        var grayscale = (colorType & 2) === 0;
        var alpha = (colorType & 4) !== 0;
        var compressionMethod = ihdr[10];
        var filterMethod = ihdr[11];
        var interlaceMethod = ihdr[12];
        if (compressionMethod !== 0)
            throw Error('Unsupported PNG compression method: ' +
                compressionMethod);
        if (filterMethod !== 0)
            throw Error('Unsupported PNG filter method: ' +
                filterMethod);
        if (interlaceMethod !== 0)
            return {
                error: 'Interlaced image not supported'
            };
        if (palette)
            return {
                error: 'Indexed PNG image not supported'
            };

        var smask = null;
        var numColors = grayscale ? 1 : 3;
        var idats = chunks.filter(function(chunk) {
            return chunk.type === 'IDAT';
        }).map(function(chunk) {
            return chunk.data;
        });
        if (alpha) {
            var pako = window.pako;
            var inflate = new pako.Inflate();
            var i;
            for (i = 0; i < idats.length; ++i)
                inflate.push(idats[i], i + 1 === idats.length);
            if (inflate.err) throw Error(inflate.err);
            var rgba = inflate.result;
            var bytesPerComponent = bitDepth >>> 3;
            var bytesPerPixel = (numColors + 1) * bytesPerComponent;
            var bytesPerLine = width * bytesPerPixel + 1;
            if (rgba.length !== height * bytesPerLine)
                throw Error("Data length mismatch");
            var colorBytesPerPixel = numColors * bytesPerComponent;
            var rgb = new Uint8Array(height * (width * colorBytesPerPixel + 1));
            var mask = new Uint8Array(height * (width * bytesPerComponent + 1));
            var a = 0;
            var b = 0;
            var c = 0;
            for (var y = 0; y < height; ++y) {
                rgb[b++] = mask[c++] = rgba[a++];
                for (var x = 0; x < width; ++x) {
                    for (i = 0; i < colorBytesPerPixel; ++i)
                        rgb[b++] = rgba[a++];
                    for (i = 0; i < bytesPerComponent; ++i)
                        mask[c++] = rgba[a++];
                }
            }
            if (a !== rgba.length || b !== rgb.length || c !== mask.length)
                throw Error("Seems we garbled our index computation somehow");
            mask = pako.deflate(mask);
            smask = this._strm({
                Type: '/XObject',
                Subtype: '/Image',
                Width: width,
                Height: height,
                ColorSpace: '/DeviceGray',
                BitsPerComponent: bitDepth,
                Filter: '/FlateDecode',
                DecodeParms: this._dict({
                    Predictor: 15,
                    Colors: 1,
                    BitsPerComponent: bitDepth,
                    Columns: width
                })
            }, mask).ref;
            idats = [pako.deflate(rgb)]; // continue with color only
        }

        var len = 0;
        idats.forEach(function(chunk) {
            len += chunk.length;
        });
        var xobj = this._obj([this._dict({
            Type: '/XObject',
            Subtype: '/Image',
            Name: '/img' + this._imgcache.length,
            Width: width,
            Height: height,
            ColorSpace: grayscale ? '/DeviceGray' : '/DeviceRGB',
            SMask: smask,
            BitsPerComponent: bitDepth,
            Length: len,
            Filter: '/FlateDecode',
            DecodeParms: this._dict({
                Predictor: 15,
                Colors: numColors,
                BitsPerComponent: bitDepth,
                Columns: width
            })
        }), '\nstream\n'].concat(idats, ['\nendstream']));
        return xobj;
    },

    drawImage: function(img, x, y) {
        if (arguments.length !== 3)
            throw Error('PdfWriterContext only supports ' +
                '3-argument version of drawImage');
        var idx = this._imgcache.indexOf(img);
        if (idx === -1) {
            idx = this._imgcache.length;
            this._imgcache.push(img);
            var xobj = this._png(img.cachedDataURL || '');
            if (xobj.hasOwnProperty('error'))
                xobj = this._png(imageToDataURL(img));
            if (xobj.hasOwnProperty('error'))
                throw Error(xobj.error);
            this._xobjects['img' + idx] = xobj.ref;
        }
        this._cmd('q');
        this._setAlpha(1, 'Af', 'ca');
        this._cmd(img.width, 0, 0, img.height, x, -y - img.height, 'cm');
        this._cmd('/img' + idx, 'Do');
        this._cmd('Q');
    },

    _dict: function(dict) {
        var res = '<<';
        for (var key in dict)
            res += ' /' + key + ' ' + dict[key];
        return res + ' >>';
    },

    // obj is either an array, or an object which will be treated as a dict.
    // This adds some fields to the object, to facilitate offset computations.
    // Elements of obj should be ASCII-only strings or typed arrays.
    _obj: function(obj, idx) {
        if (!idx) idx = this._nextIndex++;
        if (!Array.isArray(obj))
            obj = [this._dict(obj)];
        obj.index = idx;
        obj.ref = idx + ' 0 R';
        obj.offset = this._offset;
        var len = 0;
        obj.unshift(idx + ' 0 obj\n');
        obj.push('\nendobj\n');
        for (var i = 0; i < obj.length; ++i)
            len += obj[i].length;
        this._offset += len;
        this._objects.push(obj);
        return obj;
    },

    _strm: function(dict, data, idx) {
        dict.Length = data.length;
        return this._obj([
            this._dict(dict),
            '\nstream\n', data, '\nendstream'
        ], idx);
    },

    toBlob: function() {
        // See PDF reference 1.7 Appendix G
        var i;
        var mediaBox = '[' + [0, -this.height, this.width, 0].join(' ') + ']';
        this._obj({
            Type: '/Catalog',
            Pages: '2 0 R'
        }, 1);
        this._obj({
            Type: '/Pages',
            Kids: '[3 0 R]',
            Count: 1
        }, 2);
        this._obj({
            Type: '/Page',
            Parent: '2 0 R',
            MediaBox: mediaBox,
            Contents: '4 0 R',
            Resources: this._dict({
                ProcSet: '[/PDF /Text /ImageB /ImageC /ImageI]',
                XObject: this._dict(this._xobjects),
                ExtGState: this._dict(this._extGState)
            })
        }, 3);
        var body = this._body.join('\n');
        var buf = new Uint8Array(body.length);
        for (i = 0; i < body.length; ++i)
            buf[i] = body.charCodeAt(i) & 0xff;
        body = window.pako.deflate(buf);
        this._strm({
            Filter: '/FlateDecode'
        }, body, 4);
        var objects = this._objects;
        var byIndex = [];
        for (i = 1; i < objects.length; ++i)
            byIndex[objects[i].index] = objects[i];
        var xref = 'xref\n0 ' + byIndex.length + '\n';
        for (i = 0; i < byIndex.length; ++i) {
            if (!byIndex[i])
                xref += '0000000000 65535 f \n';
            else
                xref += padStr(String(byIndex[i].offset), 10) + ' 00000 n \n';
        }
        var trailer = 'trailer\n' + this._dict({
            Size: byIndex.length,
            Root: '1 0 R'
        }) + '\nstartxref\n' + this._offset + '\n%%EOF\n';
        objects = Array.prototype.concat.apply([], objects);
        objects.push(xref, trailer);
        return new Blob(objects, {
            type: 'application/pdf'
        });
    }

};

/*jshint +W078 */

function imageToDataURL(img, type) {
    var w = img.width;
    var h = img.height;
    var c = document.createElement('canvas');
    c.setAttribute('width', w);
    c.setAttribute('height', h);
    c.setAttribute('style', 'display:none;');
    var mainCanvas = globalInstance.canvas;
    mainCanvas.parentNode.insertBefore(c, mainCanvas.nextSibling);
    try {
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        return c.toDataURL(type || "image/png");
    } finally {
        c.parentNode.removeChild(c);
    }
}

function base64Decode(str) {
    var alphabet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    str = str.replace(new RegExp('[^' + alphabet + ']+', 'g'), '');
    var bytes = new Uint8Array(str.length * 3 >> 2);
    var i, j, a, b, c, d;
    for (i = 0, j = 0; i + 3 < str.length; i += 4) {
        a = alphabet.indexOf(str.charAt(i));
        b = alphabet.indexOf(str.charAt(i + 1));
        c = alphabet.indexOf(str.charAt(i + 2));
        d = alphabet.indexOf(str.charAt(i + 3));
        bytes[j++] = (a << 2) | (b >> 4);
        bytes[j++] = (b << 4) | (c >> 2);
        bytes[j++] = (c << 6) | d;
    }
    switch (str.length - i) {
        case 0:
            break;
        case 2:
            a = alphabet.indexOf(str.charAt(i));
            b = alphabet.indexOf(str.charAt(i + 1));
            bytes[j++] = (a << 2) | (b >> 4);
            break;
        case 3:
            a = alphabet.indexOf(str.charAt(i));
            b = alphabet.indexOf(str.charAt(i + 1));
            c = alphabet.indexOf(str.charAt(i + 2));
            bytes[j++] = (a << 2) | (b >> 4);
            bytes[j++] = (b << 4) | (c >> 2);
            break;
        default:
            throw Error('Malformed Base64 input: ' +
                (str.length - i) + ' chars left: ' + str.substr(i));
    }
    if (j !== bytes.length)
        throw Error('Failed assertion: ' + j + ' should be ' + bytes.length);
    return bytes;
}

// See PNG specification at e.g. http://www.libpng.org/pub/png/
function pngChunks(bytes) {
    function u32be(offset) {
        return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) |
            (bytes[offset + 2] << 8) | (bytes[offset + 3])) >>> 0;
    }
    if (bytes.length < 57)
        throw Error('Too short to be a PNG file');
    if (u32be(0) !== 0x89504e47 || u32be(4) !== 0x0d0a1a0a)
        throw Error('PNG signature missing');
    var chunks = [];
    var pos = 8;
    while (pos < bytes.length) {
        if (pos + 12 > bytes.length)
            throw Error('Incomplete chunk at offset 0x' + pos.toString(16));
        var len = u32be(pos);
        if (len >= 0x80000000)
            throw Error('Chunk too long');
        var end = pos + 12 + len;
        if (end > bytes.length)
            throw Error('Incomplete chunk at offset 0x' + pos.toString(16));
        var type = bytes.subarray(pos + 4, pos + 8);
        type = String.fromCharCode.apply(String, type);
        chunks.push({
            len: len,
            type: type,
            data: bytes.subarray(pos + 8, pos + 8 + len),
            crc: u32be(pos + 8 + len)
        });
        pos = end;
    }
    return chunks;
}

function parseColor(spec, cb) {
    var match;
    if ((match = /^rgba\(([0-9]+), *([0-9]+), *([0-9]+), *([0-9]+)\)$/
            .exec(spec))) {
        cb(+match[1], +match[2], +match[3], +match[4]);
    } else if ((match = /^rgb\(([0-9]+), *([0-9]+), *([0-9]+)\)$/
            .exec(spec))) {
        cb(+match[1], +match[2], +match[3], 1);
    } else {
        throw Error("Can't handle color style " + spec);
    }
}

function cacheImages(cb) {
    var toCache = 1;
    Object.keys(images).forEach(function(name) {
        var img = images[name].value.img;
        if (img.cachedDataURL !== undefined) return;
        if (!img.src) return;
        if (img.src.substr(0, 5) === 'data:') {
            img.cachedDataURL = img.src;
            return;
        }
        ++toCache;
        img.cachedDataURL = null;
        var req = new XMLHttpRequest();
        req.responseType = 'blob';
        req.onreadystatechange = function() {
            if (req.readyState !== XMLHttpRequest.DONE) return;
            if (req.status === 200) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    img.cachedDataURL = reader.result;
                    console.log('Cached data for image ' + img.src);
                    if (--toCache === 0) cb();
                };
                reader.readAsDataURL(req.response);
            } else {
                console.error('Failed to load ' + img.src + ': ' +
                    req.statusText);
                if (--toCache === 0) cb();
            }
        };
        req.open('GET', img.src, true);
        req.send();
    });
    if (--toCache === 0) cb();
}

function padStr(str, len, chr) {
    if (!chr) chr = '0';
    while (str.length < len)
        str = chr + str;
    return str;
}

var exportedCanvasURL = null;

function releaseExportedObject() {
    if (exportedCanvasURL !== null) {
        window.URL.revokeObjectURL(exportedCanvasURL);
        exportedCanvasURL = null;
    }
}

shutdownHooks.push(releaseExportedObject);

// Export current contruction with given writer backend and open the
// result in a new tab.  Note that Firefox fails to show images embedded
// into an SVG.  So in the long run, saving is probably better than opening.
// Note: See https://github.com/eligrey/FileSaver.js/ for saving Blobs
function exportWith(Context) {
    cacheImages(function() {
        var origctx = csctx;
        try {
            csctx = new Context();
            csctx.width = csw;
            csctx.height = csh;
            updateCindy();
            var blob = csctx.toBlob();
            exportedCanvasURL = window.URL.createObjectURL(blob);

            downloadHelper(exportedCanvasURL);
        } finally {
            csctx = origctx;
        }
    });
}

globalInstance.exportSVG = function() {
    exportWith(SvgWriterContext);
};

globalInstance.exportPDF = function() {
    CindyJS.loadScript('pako', 'pako.min.js', function() {
        exportWith(PdfWriterContext);
    });
};

globalInstance.exportPNG = function() {
    downloadHelper(csctx.canvas.toDataURL());
};


var downloadHelper = function(data) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = data;
    a.download = "CindyJSExport";
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        releaseExportedObject();
    }, 100);
};
var activeTool = "Move"; // Current selected tool
var element; // The constructed element
var elements = []; // Contains all grabbed or temporary created elements (except the constructed "element" above)
var idx = 0; // Next free index for the elements array
var pIndex = 0; // Current element index
var step = 0; // Current step

/**
 * Returns the current element at mouse
 *
 * TODO Rewrite
 *
 * @param mouse
 * @returns {*}
 */
function getElementAtMouse(mouse) {
    var mov = null;
    var adist = 1000000;
    var diff;

    console.log("getElementAtMouse");

    for (var i = 0; i < csgeo.gslp.length; i++) {
        var el = csgeo.gslp[i];

        if (el.pinned || el.visible === false || el.tmp === true)
            continue;

        var dx, dy, dist;
        var sc = csport.drawingstate.matrix.sdet;
        if (el.kind === "P") {
            var p = List.normalizeZ(el.homog);
            if (!List._helper.isAlmostReal(p))
                continue;
            dx = p.value[0].value.real - mouse.x;
            dy = p.value[1].value.real - mouse.y;
            dist = Math.sqrt(dx * dx + dy * dy);
            if (el.narrow & dist > 20 / sc) dist = 10000;
        } else if (el.kind === "C") { //Must be CircleMr
            var mid = csgeo.csnames[el.args[0]];
            var rad = 0;

            //console.log(el.radius);

            if (typeof el.radius !== "undefined") {
                rad = el.radius.value.real;

                // For CircleMP
            } else if (el.args.length === 2) {
                /*var p1 = csgeo.csnames[el.args[0]];
                var p2 = csgeo.csnames[el.args[1]];

                var p1xx = CSNumber.div(p1.homog.value[0], p1.homog.value[2]).value.real;
                var p1yy = CSNumber.div(p1.homog.value[1], p1.homog.value[2]).value.real;

                var p2xx = CSNumber.div(p2.homog.value[0], p2.homog.value[2]).value.real;
                var p2yy = CSNumber.div(p2.homog.value[1], p2.homog.value[2]).value.real;

                rad = Math.sqrt(Math.pow(p2xx - p1xx, 2) + Math.pow(p2yy - p1yy, 2));

                console.log("radius");
                console.log(rad);*/
            }

            var xx = CSNumber.div(mid.homog.value[0], mid.homog.value[2]).value.real;
            var yy = CSNumber.div(mid.homog.value[1], mid.homog.value[2]).value.real;
            dx = xx - mouse.x;
            dy = yy - mouse.y;
            var ref = Math.sqrt(dx * dx + dy * dy);

            dist = ref - rad;
            dx = 0;
            dy = 0;
            if (dist < 0) {
                dist = -dist;
            }

            dist = dist + 30 / sc;

        } else if (el.kind === "L" || el.kind === "S") { //Must be ThroughPoint(Horizontal/Vertical not treated yet)
            var l = el.homog;
            var N = CSNumber;
            var nn = N.add(N.mult(l.value[0], N.conjugate(l.value[0])),
                N.mult(l.value[1], N.conjugate(l.value[1])));
            var ln = List.scaldiv(N.sqrt(nn), l);
            dist = ln.value[0].value.real * mouse.x + ln.value[1].value.real * mouse.y + ln.value[2].value.real;
            dx = ln.value[0].value.real * dist;
            dy = ln.value[1].value.real * dist;

            if (dist < 0) {
                dist = -dist;
            }
            dist = dist + 1;
        }

        if (dist < adist + 0.2 / sc) { //A bit a dirty hack, prefers new points
            adist = dist;
            mov = el;
            diff = {
                x: dx,
                y: dy
            };
        }
    }

    if (mov === null)
        return null;
    return {
        mover: mov,
        offset: diff,
        prev: {
            x: mouse.x,
            y: mouse.y
        }
    };
}

/**
 * Sets the active tool
 *
 * @param tool
 */
function setActiveTool(tool) {
    activeTool = tool;

    var actions = tools[activeTool].actions;

    if (statusbar) {
        statusbar.textContent = actions[0].tooltip || "";
    }

    elements = [];
    idx = 0;
    step = 0;
}

/**
 * Gets the next free name for an element
 *
 * TODO Rewrite
 *
 * @returns {string}
 */
function getNextFreeName() {
    return "P" + pIndex++;
}

/**
 * Removes all temporary created elements
 */
function removeTmpElements() {
    for (var i = 0; i < csgeo.gslp.length; i++) {
        var el = csgeo.gslp[i];

        if (el.tmp === true) {
            removeElement(el.name);
        }
    }
}

/**
 * Makes tmp elements to regular elements
 */
function adoptTmpElements() {
    for (var i = 0; i < csgeo.gslp.length; i++) {
        var el = csgeo.gslp[i];

        if (el.tmp === true) {
            el.tmp = false;
        }
    }
}

/**
 * Each tool has a set of actions which are defined in a specific order. An action is linked with an event (e. g. mouse down).
 * Only if this event is triggered and the action returned true, the next action could be executed. Otherwise nothing happend.
 *
 * @param event
 */
function manage(event) {
    var actions = tools[activeTool].actions;

    if (actions[step].event === event) {
        var success = actions[step].do();

        if (success) {
            scheduleUpdate();

            if (step === actions.length - 1) {
                elements = [];
                idx = 0;
                step = 0;

            } else {
                step++;
            }
        }
    }
}

/**
 * Returns true, if an element is at mouse
 *
 * @param element
 * @returns {boolean}
 */
function isElementAtMouse(element) {
    return element && Math.abs(element.offset.x) < 0.5 && Math.abs(element.offset.y) < 0.5 && !element.mover.tmp;
}

/**
 * Returns true, if a point is at mouse
 *
 * @param element
 * @returns {boolean}
 */
function isPointAtMouse(element) {
    return isElementAtMouse(element) && (element.mover.kind === "P");
}

/**
 * Returns true, if a line is at mouse
 *
 * @param element
 * @returns {boolean}
 */
function isLineAtMouse(element) {
    return isElementAtMouse(element) && (element.mover.kind === "L" || element.mover.kind === "S");
}

/**
 * Returns true, if a circle is at mouse
 *
 * @param element
 * @returns {*|boolean}
 */
function isConicAtMouse(element) {
    return isElementAtMouse(element) && (element.mover.kind === "C");
}

/**
 * Set a specific element at mouse
 *
 * @param element
 */
function setElementAtMouse(element) {
    move = {
        mover: element,
        offset: {
            x: 0,
            y: 0
        },
        prev: {
            x: mouse.x,
            y: mouse.y
        }
    };
}

/**
 * Grabs a point if it is present at mouse or creates a temporary one
 */
function grabPoint() {
    var el = getElementAtMouse(mouse);

    if (isPointAtMouse(el)) {
        elements[idx] = el.mover;

    } else {
        elements[idx] = {
            type: "Free",
            name: getNextFreeName(),
            labeled: true,
            pos: [csmouse[0], csmouse[1], 1]
        };

        addElement(elements[idx]);
    }

    idx++;
}

/**
 * Grabs a line if it is present at mouse
 *
 * @returns {boolean}
 */
function grabLine() {
    var el = getElementAtMouse(mouse);

    if (isLineAtMouse(el)) {
        elements[idx] = el.mover;

        idx++;

        return true;
    }

    return false;
}

/**
 * Grabs a line or circle if it is present at mouse
 *
 * @returns {boolean}
 */
function grabLineOrConic() {
    var el = getElementAtMouse(mouse);

    if (isLineAtMouse(el) || isConicAtMouse(el)) {
        elements[idx] = el.mover;

        idx++;

        return true;
    }

    return false;
}

/**
 * Grabs the last point if it is present at mouse or uses the temporary created one
 */
function grabLastPoint() {
    var p2 = getElementAtMouse(mouse);

    if (isPointAtMouse(p2)) {
        element.args[1] = p2.mover.name;
        removeTmpElements();

    } else {
        adoptTmpElements();
    }
}

/**
 * Creates a new element
 *
 * @param type
 */
function create(type) {
    var tmpPoint = {
        type: "Free",
        name: getNextFreeName(),
        labeled: true,
        pos: [csmouse[0], csmouse[1], 1],
        tmp: true
    };

    tmpPoint = addElement(tmpPoint);

    element = addElement({
        type: type,
        name: getNextFreeName(),
        labeled: true,
        args: [elements[0].name, tmpPoint.name]
    });

    setElementAtMouse(tmpPoint);
}

//
// Tools
//
// Each tool has a set of actions which are defined in a specific order. An action is linked with an event (e. g. mouse down).
// Only if this event is triggered and the action returned true, the next action could be executed. Otherwise nothing happend.
//
var tools = {};

// Delete
tools.Delete = {};
tools.Delete.actions = [];
tools.Delete.actions[0] = {};
tools.Delete.actions[0].event = "mousedown";
tools.Delete.actions[0].tooltip = "...";
tools.Delete.actions[0].do = function() {
    move = getElementAtMouse(mouse);

    if (move !== null) {
        removeElement(move.mover.name);
    }

    return true;
};

// Move
tools.Move = {};
tools.Move.actions = [];
tools.Move.actions[0] = {};
tools.Move.actions[0].event = "mousedown";
tools.Move.actions[0].tooltip = "Move free elements by dragging the mouse";
tools.Move.actions[0].do = function() {
    move = getmover(mouse);

    return true;
};

// Point
tools.Point = {};
tools.Point.actions = [];
tools.Point.actions[0] = {};
tools.Point.actions[0].event = "mousedown";
tools.Point.actions[0].tooltip = "Add a single point with the mouse";
tools.Point.actions[0].do = function() {
    addElement({
        type: "Free",
        name: getNextFreeName(),
        labeled: true,
        pos: [csmouse[0], csmouse[1], 1]
    });

    return true;
};

// Mid
tools.Mid = {};
tools.Mid.actions = [];
tools.Mid.actions[0] = {};
tools.Mid.actions[0].event = "mousedown";
tools.Mid.actions[0].tooltip = "Construct two points and their midpoint by dragging";
tools.Mid.actions[0].do = function() {
    grabPoint();

    return true;
};

tools.Mid.actions[1] = {};
tools.Mid.actions[1].event = "mousemove";
tools.Mid.actions[1].do = function() {
    create("Mid");

    return true;
};

tools.Mid.actions[2] = {};
tools.Mid.actions[2].event = "mouseup";
tools.Mid.actions[2].do = function() {
    grabLastPoint();

    return true;
};

// Circle
tools.Circle = {};
tools.Circle.actions = [];
tools.Circle.actions[0] = {};
tools.Circle.actions[0].event = "mousedown";
tools.Circle.actions[0].tooltip = "Construct two points and a circle by dragging the mouse";
tools.Circle.actions[0].do = function() {
    grabPoint();

    return true;
};

tools.Circle.actions[1] = {};
tools.Circle.actions[1].event = "mousemove";
tools.Circle.actions[1].do = function() {
    create("CircleMP");

    return true;
};

tools.Circle.actions[2] = {};
tools.Circle.actions[2].event = "mouseup";
tools.Circle.actions[2].do = function() {
    grabLastPoint();

    return true;
};

// Compass
tools.Compass = {};
tools.Compass.actions = [];
tools.Compass.actions[0] = {};
tools.Compass.actions[0].event = "mousedown";
tools.Compass.actions[0].tooltip = "...";
tools.Compass.actions[0].do = function() {
    grabPoint();

    return true;
};

tools.Compass.actions[1] = {};
tools.Compass.actions[1].event = "mousedown";
tools.Compass.actions[1].tooltip = "...";
tools.Compass.actions[1].do = function() {
    grabPoint();

    return true;
};

tools.Compass.actions[2] = {};
tools.Compass.actions[2].event = "mousedown";
tools.Compass.actions[2].tooltip = "...";
tools.Compass.actions[2].do = function() {
    grabPoint();

    addElement({
        type: "Compass",
        name: getNextFreeName(),
        labeled: true,
        args: [elements[0].name, elements[1].name, elements[2].name]
    });

    return true;
};

// Line
tools.Line = {};
tools.Line.actions = [];
tools.Line.actions[0] = {};
tools.Line.actions[0].event = "mousedown";
tools.Line.actions[0].tooltip = "Construct two points and their connecting line by dragging the mouse";
tools.Line.actions[0].do = function() {
    grabPoint();

    return true;
};

tools.Line.actions[1] = {};
tools.Line.actions[1].event = "mousemove";
tools.Line.actions[1].do = function() {
    create("Join");

    return true;
};

tools.Line.actions[2] = {};
tools.Line.actions[2].event = "mouseup";
tools.Line.actions[2].do = function() {
    grabLastPoint();

    return true;
};

// Segment
tools.Segment = {};
tools.Segment.actions = [];
tools.Segment.actions[0] = {};
tools.Segment.actions[0].event = "mousedown";
tools.Segment.actions[0].tooltip = "Draw a segment by dragging the mouse";
tools.Segment.actions[0].do = function() {
    grabPoint();

    return true;
};

tools.Segment.actions[1] = {};
tools.Segment.actions[1].event = "mousemove";
tools.Segment.actions[1].do = function() {
    create("Segment");

    return true;
};

tools.Segment.actions[2] = {};
tools.Segment.actions[2].event = "mouseup";
tools.Segment.actions[2].do = function() {
    grabLastPoint();

    return true;
};

// Parallel
tools.Parallel = {};
tools.Parallel.actions = [];
tools.Parallel.actions[0] = {};
tools.Parallel.actions[0].event = "mousedown";
tools.Parallel.actions[0].tooltip = "Construct a parallel line by dragging a line";
tools.Parallel.actions[0].do = function() {
    return grabLine();
};

tools.Parallel.actions[1] = {};
tools.Parallel.actions[1].event = "mousemove";
tools.Parallel.actions[1].do = function() {
    var tmpPoint = {
        type: "Free",
        name: getNextFreeName(),
        labeled: true,
        pos: [csmouse[0], csmouse[1], 1],
        tmp: true
    };

    tmpPoint = addElement(tmpPoint);

    element = addElement({
        type: "Para",
        name: getNextFreeName(),
        labeled: true,
        args: [elements[0].name, tmpPoint.name]
    });

    setElementAtMouse(tmpPoint);

    return true;
};

tools.Parallel.actions[2] = {};
tools.Parallel.actions[2].event = "mouseup";
tools.Parallel.actions[2].do = function() {
    grabLastPoint();

    return true;
};

// Orthogonal
tools.Orthogonal = {};
tools.Orthogonal.actions = [];
tools.Orthogonal.actions[0] = {};
tools.Orthogonal.actions[0].event = "mousedown";
tools.Orthogonal.actions[0].tooltip = "Construct a orthogonal line by dragging a line";
tools.Orthogonal.actions[0].do = function() {
    if (grabLine()) {
        var tmpPoint = {
            type: "Free",
            name: getNextFreeName(),
            labeled: true,
            pos: [csmouse[0], csmouse[1], 1],
            tmp: true
        };

        tmpPoint = addElement(tmpPoint);

        element = addElement({
            type: "Perp",
            name: getNextFreeName(),
            labeled: true,
            args: [elements[0].name, tmpPoint.name]
        });

        setElementAtMouse(tmpPoint);

        return true;
    }

    return false;
};

tools.Orthogonal.actions[1] = {};
tools.Orthogonal.actions[1].event = "mouseup";
tools.Orthogonal.actions[1].do = function() {
    grabLastPoint();

    return true;
};

// Intersection
//
// TODO Conic, ...
tools.Intersection = {};
tools.Intersection.actions = [];
tools.Intersection.actions[0] = {};
tools.Intersection.actions[0].event = "mousedown";
tools.Intersection.actions[0].tooltip = "Select two elements to define their intersection";
tools.Intersection.actions[0].do = function() {
    return grabLineOrConic();
};

tools.Intersection.actions[1] = {};
tools.Intersection.actions[1].event = "mousedown";
tools.Intersection.actions[1].do = function() {
    if (grabLineOrConic()) {
        element = addElement({
            type: "Meet",
            name: getNextFreeName(),
            labeled: true,
            args: [elements[0].name, elements[1].name]
        });

        return true;
    }

    return false;
};
var csgstorage = {};

var csport = {};
csport.drawingstate = {};
csport.drawingstate.linecolor = "rgb(0,0,255)";
csport.drawingstate.linecolorraw = [0, 0, 1];
csport.drawingstate.pointcolor = "rgb(0,255,0)";
csport.drawingstate.pointcolorraw = [0, 1, 0];
csport.drawingstate.textcolor = "rgb(0,0,0)";
csport.drawingstate.textcolorraw = [0, 0, 0];
csport.drawingstate.alpha = 1.0;
csport.drawingstate.pointsize = 4.0;
csport.drawingstate.linesize = 1.0;
csport.drawingstate.textsize = null; // use defaultAppearance.textsize

csport.drawingstate.matrix = {};
csport.drawingstate.matrix.a = 25;
csport.drawingstate.matrix.b = 0;
csport.drawingstate.matrix.c = 0;
csport.drawingstate.matrix.d = 25;
csport.drawingstate.matrix.tx = 250.5;
csport.drawingstate.matrix.ty = 250.5;
csport.drawingstate.matrix.det = csport.drawingstate.matrix.a * csport.drawingstate.matrix.d - csport.drawingstate.matrix.b * csport.drawingstate.matrix.c;

csport.drawingstate.matrix.sdet = Math.sqrt(csport.drawingstate.matrix.det);


csport.drawingstate.initialmatrix = {};
csport.drawingstate.initialmatrix.a = csport.drawingstate.matrix.a;
csport.drawingstate.initialmatrix.b = csport.drawingstate.matrix.b;
csport.drawingstate.initialmatrix.c = csport.drawingstate.matrix.c;
csport.drawingstate.initialmatrix.d = csport.drawingstate.matrix.d;
csport.drawingstate.initialmatrix.tx = csport.drawingstate.matrix.tx;
csport.drawingstate.initialmatrix.ty = csport.drawingstate.matrix.ty;
csport.drawingstate.initialmatrix.det = csport.drawingstate.matrix.det;
csport.drawingstate.initialmatrix.sdet = csport.drawingstate.matrix.sdet;

csport.clone = function(obj) {
    if (obj === null || typeof(obj) !== 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj)
        temp[key] = csport.clone(obj[key]);
    return temp;
};

csgstorage.backup = csport.clone(csport.drawingstate);
csgstorage.stack = [];


var back = csport.clone(csport.drawingstate);


csport.reset = function() {
    csport.drawingstate.matrix.a = csport.drawingstate.initialmatrix.a;
    csport.drawingstate.matrix.b = csport.drawingstate.initialmatrix.b;
    csport.drawingstate.matrix.c = csport.drawingstate.initialmatrix.c;
    csport.drawingstate.matrix.d = csport.drawingstate.initialmatrix.d;
    csport.drawingstate.matrix.tx = csport.drawingstate.initialmatrix.tx;
    csport.drawingstate.matrix.ty = csport.drawingstate.initialmatrix.ty;
    csport.drawingstate.matrix.det = csport.drawingstate.initialmatrix.det;
    csport.drawingstate.matrix.sdet = csport.drawingstate.initialmatrix.sdet;
};

csport.from = function(x, y, z) { //Rechnet Homogene Koordinaten in Pixelkoordinaten um
    var xx = x / z;
    var yy = y / z;
    var m = csport.drawingstate.matrix;
    var xxx = xx * m.a - yy * m.b + m.tx;
    var yyy = xx * m.c - yy * m.d - m.ty;
    return [xxx, yyy];
};

csport.to = function(px, py) { //Rechnet Pixelkoordinaten in Homogene Koordinaten um
    var m = csport.drawingstate.matrix;
    var xx = px - m.tx;
    var yy = py + m.ty;
    var x = (xx * m.d - yy * m.b) / m.det;
    var y = -(-xx * m.c + yy * m.a) / m.det;
    return [x, y, 1];
};

// Homogeneous matrix representation of csport.to
csport.toMat = function() {
    var m = csport.drawingstate.matrix;
    return List.realMatrix([
        [m.d, -m.b, -m.tx * m.d - m.ty * m.b],
        [m.c, -m.a, -m.tx * m.c - m.ty * m.a],
        [0, 0, m.det]
    ]);
};

csport.dumpTrafo = function() {

    function r(x) {
        return Math.round(x * 1000) / 1000;

    }
    var m = csport.drawingstate.matrix;

    console.log("a:" + r(m.a) + " " +
        "b:" + r(m.b) + " " +
        "c:" + r(m.c) + " " +
        "d:" + r(m.d) + " " +
        "tx:" + r(m.ty) + " " +
        "ty:" + r(m.tx)
    );

};

csport.setMat = function(a, b, c, d, tx, ty) {
    var m = csport.drawingstate.matrix;
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.tx = tx;
    m.ty = ty;
    m.det = a * d - b * c;
    m.sdet = Math.sqrt(m.det);
};

csport.scaleAndOrigin = function(scale, originX, originY) {
    csport.setMat(scale, 0, 0, scale, originX, originY);
};

csport.visibleRect = function(left, top, right, bottom) {
    var width = right - left;
    var height = top - bottom;
    var scale;
    if (csw * height < csh * width)
        scale = csw / width;
    else
        scale = csh / height;
    var originX = (csw - scale * (left + right)) / 2;
    var originY = (csh - scale * (top + bottom)) / 2;
    csport.setMat(scale, 0, 0, scale, originX, originY);
};

// TODO: This function looks broken. It seems as if the linear
// portion of the matrix is multiplied from the left, but the
// translation is multiplied from the right. Very confusing!
csport.applyMat = function(a, b, c, d, tx, ty) {
    var m = csport.drawingstate.matrix;
    csport.setMat(
        m.a * a + m.c * b,
        m.b * a + m.d * b,
        m.a * c + m.c * d,
        m.b * c + m.d * d,
        m.a * tx + m.c * ty + m.tx,
        m.b * tx + m.d * ty + m.ty);
};

csport.translate = function(tx, ty) {
    csport.applyMat(1, 0, 0, 1, tx, ty);
};

csport.rotate = function(w) {
    var c = Math.cos(w);
    var s = Math.sin(w);
    csport.applyMat(c, s, -s, c, 0, 0);
};

csport.scale = function(s) {
    csport.applyMat(s, 0, 0, s, 0, 0);
};

csport.gsave = function() {
    csgstorage.stack.push(csport.clone(csport.drawingstate));

};

csport.grestore = function() {
    if (csgstorage.stack.length !== 0) {
        csport.drawingstate = csgstorage.stack.pop();
    }
};

csport.greset = function() {
    csport.drawingstate = csport.clone(csgstorage.backup);
    csport.drawingstate.matrix.ty = csport.drawingstate.matrix.ty - csh;
    csport.drawingstate.initialmatrix.ty = csport.drawingstate.initialmatrix.ty - csh;
    csgstorage.stack = [];

};

csport.createnewbackup = function() {
    csport.drawingstate.initialmatrix.a = csport.drawingstate.matrix.a;
    csport.drawingstate.initialmatrix.b = csport.drawingstate.matrix.b;
    csport.drawingstate.initialmatrix.c = csport.drawingstate.matrix.c;
    csport.drawingstate.initialmatrix.d = csport.drawingstate.matrix.d;
    csport.drawingstate.initialmatrix.tx = csport.drawingstate.matrix.tx;
    csport.drawingstate.initialmatrix.ty = csport.drawingstate.matrix.ty;
    csport.drawingstate.initialmatrix.det = csport.drawingstate.matrix.det;
    csport.drawingstate.initialmatrix.sdet = csport.drawingstate.matrix.sdet;
    csgstorage.backup = csport.clone(csport.drawingstate);

};

csport.makecolor = function(r, g, b) {
    var rv = Math.floor(r * 255);
    var gv = Math.floor(g * 255);
    var bv = Math.floor(b * 255);
    if (csport.drawingstate.alpha === 1) {
        return "rgb(" + rv + "," + gv + "," + bv + ")";
    } else {
        return "rgba(" + rv + "," + gv + "," + bv +
            "," + csport.drawingstate.alpha + ")";
    }
};

csport.setcolor = function(co) {
    var r = co.value[0].value.real;
    var g = co.value[1].value.real;
    var b = co.value[2].value.real;
    csport.drawingstate.linecolor =
        csport.drawingstate.pointcolor = csport.makecolor(r, g, b);
    csport.drawingstate.linecolorraw =
        csport.drawingstate.pointcolorraw = [r, g, b];
};

csport.setlinecolor = function(co) {
    var r = co.value[0].value.real;
    var g = co.value[1].value.real;
    var b = co.value[2].value.real;
    csport.drawingstate.linecolor = csport.makecolor(r, g, b);
    csport.drawingstate.linecolorraw = [r, g, b];
};

csport.settextcolor = function(co) {
    var r = co.value[0].value.real;
    var g = co.value[1].value.real;
    var b = co.value[2].value.real;
    csport.drawingstate.textcolor = csport.makecolor(r, g, b);
    csport.drawingstate.textcolorraw = [r, g, b];
};


csport.setpointcolor = function(co) {
    var r = co.value[0].value.real;
    var g = co.value[1].value.real;
    var b = co.value[2].value.real;
    csport.drawingstate.pointcolor = csport.makecolor(r, g, b);
    csport.drawingstate.pointcolorraw = [r, g, b];
};

csport.setalpha = function(al) {
    csport.drawingstate.alpha = al.value.real;
    csport.drawingstate.linecolor = csport.makecolor(
        csport.drawingstate.linecolorraw[0],
        csport.drawingstate.linecolorraw[1],
        csport.drawingstate.linecolorraw[2]);
    csport.drawingstate.pointcolor = csport.makecolor(
        csport.drawingstate.pointcolorraw[0],
        csport.drawingstate.pointcolorraw[1],
        csport.drawingstate.pointcolorraw[2]);
    csport.drawingstate.textcolor = csport.makecolor(
        csport.drawingstate.textcolorraw[0],
        csport.drawingstate.textcolorraw[1],
        csport.drawingstate.textcolorraw[2]);
};

csport.setpointsize = function(si) {
    csport.drawingstate.pointsize = si.value.real;
};


csport.setlinesize = function(si) {
    csport.drawingstate.linesize = si.value.real;
};

csport.settextsize = function(si) {
    csport.drawingstate.textsize = si.value.real;
};
var defaultAppearance = {};
defaultAppearance.clip = "none";
defaultAppearance.pointColor = [1, 0, 0];
defaultAppearance.lineColor = [0, 0, 1];
defaultAppearance.pointSize = 5;
defaultAppearance.lineSize = 1;
defaultAppearance.alpha = 1;
defaultAppearance.overhangLine = 1;
defaultAppearance.overhangSeg = 1;
defaultAppearance.dimDependent = 0.7;
defaultAppearance.fontFamily = "sans-serif";
defaultAppearance.textsize = 20; // Cinderella uses 12 by default

defaultAppearance.lineHeight = 1.45;
/* The value of 1.45 for the line height agrees reasonably well with
 * the default font and size in Cinderella on OS X, but it might well
 * be that the Java line height is read from the font file, so that
 * other fonts should use other line heights.
 * Not sure whether we can reasonably reproduce this.
 */

function setDefaultAppearance(obj) {
    var key;
    for (key in obj)
        if (obj[key] !== null)
            defaultAppearance[key] = obj[key];
}
if (instanceInvocationArguments.defaultAppearance)
    setDefaultAppearance(instanceInvocationArguments.defaultAppearance);

function csinit(gslp) {

    // establish defaults for geoOps
    Object.keys(geoOps).forEach(function(opName) {
        var op = geoOps[opName];
        assert(op.signature || opName === "_helper",
            opName + " has no signature");
        if (op.updatePosition !== undefined && op.stateSize === undefined)
            op.stateSize = 0;
    });

    //Main Data:
    //args          The arguments of the operator
    //type          The operator
    //kind          L,P,C, wird automatisch zugeordnet

    //Relevant fields for appearance:
    //color
    //size
    //alpha
    //overhang
    //clip
    //visible       zum ein und ausblenden
    //isshowing     das wird durch den Konstruktionsbaum vererbt
    //movable

    csgeo.gslp = [];
    csgeo.csnames = {}; // Map from name to geometric element
    csgeo.points = [];
    csgeo.lines = [];
    csgeo.conics = [];
    csgeo.texts = [];
    csgeo.free = [];
    csgeo.polygons = [];

    gslp.forEach(addElementNoProof);
    checkConjectures();
}

// Setzen der Default appearance

function setupTraceDrawing(el) {
    if (typeof el.tracedim === "undefined") el.tracedim = 1;
    if (typeof el.tracelength === "undefined") el.tracelength = 100;
    if (typeof el.traceskip === "undefined") el.traceskip = 1;
    el._traces = new Array(el.tracelength);
    el._traces_index = 0;
    el._traces_tick = 0;
}

function pointDefault(el) {

    if (el.size === undefined) el.size = defaultAppearance.pointSize;
    el.size = CSNumber.real(el.size);
    if (!el.movable || el.pinned) {
        el.color = List.realVector(el.color || defaultAppearance.pointColor);
        el.color = List.scalmult(CSNumber.real(defaultAppearance.dimDependent), el.color);
    } else {
        el.color = List.realVector(el.color || defaultAppearance.pointColor);
    }
    if (el.alpha === undefined) el.alpha = defaultAppearance.alpha;
    el.alpha = CSNumber.real(el.alpha);

    if (el.drawtrace) {
        setupTraceDrawing(el);
    }
}

function lineDefault(el) {
    if (el.size === undefined) el.size = defaultAppearance.lineSize;
    el.size = CSNumber.real(el.size);
    el.color = List.realVector(el.color || defaultAppearance.lineColor);
    if (el.alpha === undefined) el.alpha = defaultAppearance.alpha;
    el.alpha = CSNumber.real(el.alpha);
    el.clip = General.string(el.clip || defaultAppearance.clip);
    if (el.overhang === undefined)
        el.overhang = defaultAppearance.overhangLine;
    el.overhang = CSNumber.real(el.overhang);
    if (el.dashtype)
        el.dashtype = General.wrap(el.dashtype);
}

function segmentDefault(el) {
    if (el.overhang === undefined)
        el.overhang = defaultAppearance.overhangSeg;
    if (el.arrow)
        el.arrow = General.bool(el.arrow);
    if (el.arrowsize)
        el.arrowsize = CSNumber.real(el.arrowsize);
    if (el.arrowposition)
        el.arrowposition = CSNumber.real(el.arrowposition);
    if (el.arrowshape)
        el.arrowshape = General.string(el.arrowshape);
    if (el.arrowsides)
        el.arrowsides = General.string(el.arrowsides);
    lineDefault(el);
    el.clip = General.string("end");
}

function textDefault(el) {
    var size;
    if (el.textsize !== undefined) el.size = el.textsize;
    else if (el.size !== undefined) el.size = el.size;
    else el.size = defaultAppearance.textsize;
    el.size = CSNumber.real(+el.size);
}

function polygonDefault(el) {
    el.filled = (el.filled !== undefined ? General.bool(el.filled) : General.bool(true));
    if (el.fillcolor === undefined) el.fillcolor = nada;
    else el.fillcolor = List.realVector(el.fillcolor);
    if (el.fillalpha === undefined) el.fillalpha = 0;
    el.fillalpha = CSNumber.real(el.fillalpha);

    lineDefault(el);
}

function addElement(el) {
    el = addElementNoProof(el);
    checkConjectures();
    return el;
}

function addElementNoProof(el) {
    var i;

    // Adding an existing element moves that element to the given position
    if (csgeo.csnames[el.name] !== undefined) {
        console.log("Element name '" + el.name + "' already exists");

        var existingEl = csgeo.csnames[el.name];
        if (geoOps[existingEl.type].isMovable &&
            geoOps[existingEl.type].kind === "P")
            movepointscr(existingEl, el.pos, "homog");

        return {
            'ctype': 'geo',
            'value': existingEl
        };
    }

    // Recursively apply aliases
    while (geoAliases.hasOwnProperty(el.type)) {
        el.type = geoAliases[el.type];
    }

    // Expand macros
    var macro = geoMacros[el.type];
    if (macro) {
        var expansion = macro(el);
        var res = null;
        for (i = 0; i < expansion.length; ++i) {
            res = addElement(expansion[i]);
        }
        return res;
    }

    // Detect unsupported operations or missing or incorrect arguments
    var op = geoOps[el.type];
    var isSet = false;
    var getKind = function(name) {
        return csgeo.csnames[name].kind;
    };

    if (!op) {
        console.error(el);
        console.error("Operation " + el.type + " not implemented yet");
        return null;
    }
    if (op.signature !== "**") {
        // check for sets
        if (!Array.isArray(op.signature) && op.signature.charAt(1) === "*") {
            isSet = true;
            el.args.forEach(function(val) {
                if (csgeo.csnames[val].kind !== op.signature.charAt(0)) {
                    console.error(
                        "Not all elements in set are of same type: " +
                        el.name + " expects " + op.signature +
                        " but " + val + " is of kind " +
                        csgeo.csnames[val].kind);
                    if (typeof window !== "undefined")
                        window.alert("Not all elements in set are of same type: " + el.name);
                    return null;
                }
            });
        } else if (op.signature.length !== (el.args ? el.args.length : 0)) {
            console.error(
                "Wrong number of arguments for " + el.name +
                " of type " + el.type);
            if (typeof window !== "undefined")
                window.alert("Wrong number of arguments for " + el.name);
            return null;
        }
    }
    if (el.args) {
        for (i = 0; i < el.args.length; ++i) {
            if (!csgeo.csnames.hasOwnProperty(el.args[i])) {
                console.log(
                    "Dropping " + el.name +
                    " due to missing argument " + el.args[i]);
                return null;
            }
            if (op.signature !== "**" && !isSet) {
                var argKind = csgeo.csnames[el.args[i]].kind;
                if (!(op.signature[i] === argKind || (argKind === "S" &&
                        op.signature[i] ===
                        "L"))) {
                    window.alert("Wrong argument kind " + argKind +
                        " as argument " + i + " to element " +
                        el.name + " of type " + el.type);
                    return null;
                }
            }
        }
    }
    if (op.signatureConstraints && !op.signatureConstraints(el)) {
        window.alert("signature constraints violated for element " + el.name);
    }

    csgeo.gslp.push(el);
    csgeo.csnames[el.name] = el;
    var totalStateSize = stateLastGood.length;
    el.kind = op.kind;
    el.stateIdx = totalStateSize;
    totalStateSize += op.stateSize;
    el.incidences = [];
    el.isshowing = true;
    el.movable = false;

    if (op.isMovable) {
        el.movable = true;
        csgeo.free.push(el);
    }

    if (el.kind === "P") {
        csgeo.points.push(el);
        pointDefault(el);
    }
    if (el.kind === "L") {
        csgeo.lines.push(el);
        lineDefault(el);
    }
    if (el.kind === "C") {
        csgeo.conics.push(el);
        lineDefault(el);
    }
    if (el.kind === "S") {
        csgeo.lines.push(el);
        segmentDefault(el);
    }
    if (el.kind === "Text") {
        csgeo.texts.push(el);
        textDefault(el);
    }
    if (el.kind === "Poly") {
        csgeo.polygons.push(el);
        polygonDefault(el);
    }

    if (true || op.stateSize !== 0) {
        stateAlloc(totalStateSize);
        stateIn = stateOut = stateLastGood;
        // initially, stateIn and stateOut are the same, so that initialize can
        // write some state and updatePosition can immediately use it
        tracingInitial = true;
        if (op.initialize) {
            stateInIdx = stateOutIdx = el.stateIdx;
            el.param = op.initialize(el);
            assert(stateOutIdx === el.stateIdx + op.stateSize,
                "State fully initialized");
        }
        stateInIdx = stateOutIdx = el.stateIdx;
        op.updatePosition(el, false);
        assert(stateInIdx === el.stateIdx + op.stateSize,
            "State fully consumed");
        assert(stateOutIdx === el.stateIdx + op.stateSize,
            "State fully updated");
        tracingInitial = false;
        stateIn = stateArrays.in;
        stateIn.set(stateLastGood);
        stateOut = stateArrays.out;
    } else {
        // Do the updatePosition call with correct state handling around it.
    }
    isShowing(el, op);

    geoDependantsCache = {};
    guessIncidences(el);

    return csgeo.csnames[el.name];
}

// TODO Remove dependencies also
function removeElement(name) {
    var i, el;
    console.log("Remove element " + name);

    // TODO Check if name exists
    delete csgeo.csnames[name];

    for (i = 0; i < csgeo.gslp.length; i++) {
        el = csgeo.gslp[i];

        if (el.name === name) {
            console.log("Removed element from gslp " + name);
            csgeo.gslp.splice(i, 1);
        }
    }

    for (i = 0; i < csgeo.free.length; i++) {
        el = csgeo.free[i];

        if (el.name === name) {
            console.log("Removed element from free " + name);
            csgeo.free.splice(i, 1);
        }
    }

    for (i = 0; i < csgeo.points.length; i++) {
        el = csgeo.points[i];

        if (el.name === name) {
            console.log("Removed element from points " + name);
            csgeo.points.splice(i, 1);
        }
    }

    for (i = 0; i < csgeo.lines.length; i++) {
        el = csgeo.lines[i];

        if (el.name === name) {
            console.log("Removed element from lines " + name);
            csgeo.lines.splice(i, 1);
        }
    }

    for (i = 0; i < csgeo.conics.length; i++) {
        el = csgeo.conics[i];

        if (el.name === name) {
            console.log("Removed element from conics " + name);
            csgeo.conics.splice(i, 1);
        }
    }

    geoDependantsCache = {};
}

function onSegment(p, s) { //TODO was ist mit Fernpunkten
    // TODO das ist eine sehr teure implementiereung
    // Geht das einfacher?
    var el1 = csgeo.csnames[s.args[0]].homog;
    var el2 = csgeo.csnames[s.args[1]].homog;
    var elm = p.homog;

    var x1 = CSNumber.div(el1.value[0], el1.value[2]);
    var y1 = CSNumber.div(el1.value[1], el1.value[2]);
    var x2 = CSNumber.div(el2.value[0], el2.value[2]);
    var y2 = CSNumber.div(el2.value[1], el2.value[2]);
    var xm = CSNumber.div(elm.value[0], elm.value[2]);
    var ym = CSNumber.div(elm.value[1], elm.value[2]);

    if (CSNumber._helper.isAlmostReal(x1) &&
        CSNumber._helper.isAlmostReal(y1) &&
        CSNumber._helper.isAlmostReal(x2) &&
        CSNumber._helper.isAlmostReal(y2) &&
        CSNumber._helper.isAlmostReal(xm) &&
        CSNumber._helper.isAlmostReal(ym)) {
        x1 = x1.value.real;
        y1 = y1.value.real;
        x2 = x2.value.real;
        y2 = y2.value.real;
        xm = xm.value.real;
        ym = ym.value.real;
        var d12 = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var d1m = Math.sqrt((x1 - xm) * (x1 - xm) + (y1 - ym) * (y1 - ym));
        var d2m = Math.sqrt((x2 - xm) * (x2 - xm) + (y2 - ym) * (y2 - ym));
        var dd = d12 - d1m - d2m;
        return dd * dd < 0.000000000000001;

    }
    return false;

}

function isShowing(el, op) {
    el.isshowing = true;
    if (el.args) {
        for (var i = 0; i < el.args.length; i++) {
            if (!csgeo.csnames[el.args[i]].isshowing) {
                el.isshowing = false;
                return;
            }
        }
    }
    /*    if (el.kind==="P" ||el.kind==="L"){
        
            if(!List.helper.isAlmostReal(el.homog)){
                el.isshowing=false;
                return;
            }
        }*/

    if (op.visiblecheck) {
        op.visiblecheck(el);
    }

}

var geoDependantsCache = {};

function getGeoDependants(mover) {
    var deps = geoDependantsCache[mover.name];
    if (deps) return deps;
    var depSet = {};
    var k = 0;
    deps = [];
    depSet[mover.name] = mover;
    var gslp = csgeo.gslp;
    for (var i = 0; i < gslp.length; ++i) {
        var el = gslp[i];
        var args = el.args;
        if (!args) continue;
        for (var j = 0; j < args.length; ++j) {
            var arg = args[j];
            if (depSet.hasOwnProperty(arg)) {
                depSet[el.name] = el;
                deps[k++] = el;
            }
        }
    }
    geoDependantsCache[mover.name] = deps;
    /*
    console.log("getGeoDependants(" + mover.name + ") := [" +
                deps.map(function(el) { return el.name; }).join(",") + "]");
    */
    return deps;
}
function drawgeopoint(el) {
    if (!el.isshowing || el.visible === false || !List._helper.isAlmostReal(el.homog))
        return;
    var col = el.color;
    if (el.behavior) {
        col = el.color; //TODO Anpassen
        // col=List.realVector([0,0,1]);
    }
    evaluator.draw$1([el.homog], {
        size: el.size,
        color: col,
        alpha: el.alpha
    });
    if (el.labeled && !el.tmp) {
        var lbl = el.printname || el.name || "P";
        var lpos = el.labelpos || {
            'x': 3,
            'y': 3
        };
        var textsize = el.textsize || defaultAppearance.textsize;
        var bold = (el.textbold === true);
        var italics = (el.textitalics === true);
        var family = el.text_fontfamily || defaultAppearance.fontFamily;
        var dist = lpos.x * lpos.x + lpos.y * lpos.y;
        var factor = 1.0;
        if (dist > 0) {
            factor = 1.0 + el.size.value.real / Math.sqrt(dist);
        }
        eval_helper.drawtext(
            [el.homog, General.wrap(lbl)], {
                'x_offset': General.wrap(factor * lpos.x),
                'y_offset': General.wrap(factor * lpos.y),
                'size': General.wrap(textsize),
                'bold': General.wrap(bold),
                'italics': General.wrap(italics),
                'family': General.wrap(family)
            });
    }
}

function drawgeoarc(el) {
    if (!el.isshowing || el.visible === false)
        return;

    var modifs = {};
    modifs.color = el.color;
    modifs.alpha = el.alpha;
    modifs.size = el.size;

    // check if we have filled: true
    var df = el.filled ? "F" : "D";

    eval_helper.drawarc(el, modifs, df);
}


function drawgeoconic(el) {
    if (!el.isshowing || el.visible === false)
        return;

    var modifs = {};
    modifs.color = el.color;
    modifs.alpha = el.alpha;
    modifs.size = el.size;

    eval_helper.drawconic(el.matrix, modifs);


}

function drawgeoline(el) {
    var pt1, pt2;
    if (!el.isshowing || el.visible === false || !List._helper.isAlmostReal(el.homog))
        return;

    if (el.kind === "S") {
        var modifs = {
            overhang: el.overhang,
            dashtype: el.dashtype,
            size: el.size,
            color: el.color,
            alpha: el.alpha,
            arrow: el.arrow,
            arrowsize: el.arrowsize,
            arrowposition: el.arrowposition,
            arrowshape: el.arrowshape,
            arrowsides: el.arrowsides,
        };
        var zz = CSNumber.mult(el.startpos.value[2],
            CSNumber.conjugate(el.endpos.value[2]));
        if (zz.value.real >= 0) { // finite segment
            evaluator.draw$2(
                [el.startpos, el.endpos], modifs);
            return;
        } else { // transformed segment through infinity, consisting of 2 rays
            Render2D.handleModifs(modifs, Render2D.lineModifs);
            Render2D.drawRaySegment(el.startpos, el.endpos);
            return;
        }
    }
    if (el.clip.value === "end" && el.type === "Join") {
        // Lines clipped to their defining points join these.
        pt1 = csgeo.csnames[el.args[0]];
        pt2 = csgeo.csnames[el.args[1]];
        evaluator.draw$2(
            [pt1.homog, pt2.homog], {
                overhang: el.overhang,
                dashtype: el.dashtype,
                size: el.size,
                color: el.color,
                alpha: el.alpha
            });
        return;
    }
    if (el.clip.value === "inci") {
        // Figuring out incident points here.
        var li = [];
        var xmin = [+1000000, 0];
        var xmax = [-1000000, 0];
        var ymin = [+1000000, 0];
        var ymax = [-1000000, 0];
        for (var i = 0; i < el.incidences.length; i++) {
            var pt = csgeo.csnames[el.incidences[i]].homog;
            var x = pt.value[0];
            var y = pt.value[1];
            var z = pt.value[2];

            if (!CSNumber._helper.isAlmostZero(z)) {
                x = CSNumber.div(x, z);
                y = CSNumber.div(y, z);
                if (CSNumber._helper.isAlmostReal(x) && CSNumber._helper.isAlmostReal(y)) {
                    if (x.value.real < xmin[0]) {
                        xmin = [x.value.real, pt];
                    }
                    if (x.value.real > xmax[0]) {
                        xmax = [x.value.real, pt];
                    }
                    if (y.value.real < ymin[0]) {
                        ymin = [y.value.real, pt];
                    }
                    if (y.value.real > ymax[0]) {
                        ymax = [y.value.real, pt];
                    }
                }
            }
        }
        if ((xmax[0] - xmin[0]) > (ymax[0] - ymin[0])) {
            pt1 = xmin[1];
            pt2 = xmax[1];
        } else {
            pt1 = ymin[1];
            pt2 = ymax[1];

        }
        if (pt1 !== pt2) {
            evaluator.draw$2(
                [pt1, pt2], {
                    dashtype: el.dashtype,
                    size: el.size,
                    color: el.color,
                    alpha: el.alpha,
                    overhang: el.overhang
                });
            return;
        }
        // otherwise fall through
    }
    // Default: draw an unclipped line
    evaluator.draw$1([el.homog], {
        dashtype: el.dashtype,
        size: el.size,
        color: el.color,
        alpha: el.alpha
    });
}

var textCornerNames = {
    "UL": 0,
    "UR": 1,
    "LR": 2,
    "LL": 3
};

function drawgeotext(el) {
    el._bbox = null;
    if (!el.isshowing || el.visible === false) {
        if (el.html) {
            el.html.parentNode.parentNode.style.display = "none";
            el._textCache = {
                invisible: true
            };
        }
        return;
    }
    var opts = {
        "size": el.size,
    };
    var pos = el.homog;
    var text = el.text;
    var getText = geoOps[el.type].getText;
    if (getText) text = getText(el);
    else text = text.replace(/@[$#]"([^"\\]|\\.)*"/g, function(match) {
        var name, el2;
        try {
            name = JSON.parse(match.substring(2));
            el2 = csgeo.csnames[name];
            if (!el2) return "?";
        } catch (err) {
            return "?";
        }
        switch (match.charAt(1)) {
            case '$':
                return el2.printname || name;
            case '#':
                if (el2.kind !== "V") return "?";
                return niceprint(el2.value);
        }
    });
    var htmlCallback = null;
    if (el.html) {
        var cache = el._textCache || {
            text: false
        };
        var label = el.html;
        var inlinebox = label.parentNode;
        var outer = inlinebox.parentNode;
        htmlCallback = function(text, font, x, y, align) {
            if (cache.invisible)
                outer.style.removeProperty("display");
            if (text === cache.text && font === cache.font &&
                x === cache.x && y === cache.y && align === cache.align)
                return;
            if (font !== cache.font) {
                label.style.font = font;
                label.style.lineHeight = defaultAppearance.lineHeight;
            }
            if (text !== cache.text && text !== false)
                if (textRendererHtml(label, text, font) === false)
                    text = false; // Do not cache, must re-run
            outer.style.left = x + "px";
            outer.style.top = y + "px";
            if (align || inlinebox.style.transform)
                inlinebox.style.transform =
                "translateX(" + (-100 * align) + "%)";
            el._textCache = {
                text: text,
                font: font,
                x: x,
                y: y,
                align: align
            };
        };
    }
    text = General.string(text);
    if (el.dock) {
        if (el.dock.to) {
            pos = csgeo.csnames[el.dock.to].homog;
        } else if (textCornerNames.hasOwnProperty(el.dock.corner)) {
            pos = evaluator.screenbounds$0([], {});
            pos = pos.value[textCornerNames[el.dock.corner]];
        }
        opts.offset = el.dock.offset;
    }
    if (el.align)
        opts.align = General.string(el.align);
    if (pos)
        el._bbox = eval_helper.drawtext([pos, text], opts, htmlCallback);
}

function drawgeopolygon(el) {
    if (!el.isshowing || el.visible === false)
        return;
    var modifs = {
        color: el.color,
        alpha: el.alpha,
        fillcolor: el.fillcolor,
        fillalpha: el.fillalpha,
        size: el.size,
        lineJoin: General.string("miter"),
        fillrule: General.string(el.fillrule),
    };
    eval_helper.drawpolygon([el.vertices], modifs, "D", true);
}

function render() {

    var i;

    for (i = 0; i < csgeo.polygons.length; i++) {
        drawgeopolygon(csgeo.polygons[i]);
    }

    for (i = 0; i < csgeo.conics.length; i++) {
        if (csgeo.conics[i].isArc) drawgeoarc(csgeo.conics[i]);
        else drawgeoconic(csgeo.conics[i]);
    }


    for (i = 0; i < csgeo.lines.length; i++) {
        drawgeoline(csgeo.lines[i]);
    }


    for (i = 0; i < csgeo.points.length; i++) {
        drawgeopoint(csgeo.points[i]);
    }

    for (i = 0; i < csgeo.texts.length; i++) {
        drawgeotext(csgeo.texts[i]);
    }

}

// TODO Lines, ...
// TODO tracedim
function draw_traces() {
    for (var i = 0; i < csgeo.points.length; i++) {
        var el = csgeo.points[i];

        if (!el.drawtrace) continue;
        if (el._traces_tick === el.traceskip) {
            el._traces[el._traces_index] = el.homog;
            el._traces_index = (el._traces_index + 1) % el._traces.length;
            el._traces_tick = 0;
        } else {
            el._traces_tick++;
        }

        var elAlpha = el.alpha.value.real;
        var size = el.size.value.real;
        var dimfactor = 1;
        if (el.tracedim !== 1) {
            size *= el.tracedim;
            dimfactor = Math.pow(el.tracedim, -1 / el._traces.length);
        }
        var j, k = 0;
        for (j = el._traces_index; j < el._traces.length; ++j)
            drawIt();
        for (j = 0; j < el._traces_index; ++j)
            drawIt();
    }

    function drawIt() {
        var lev = k++/ el._traces.length;
        var pos = el._traces[j];
        if (pos) {
            var alpha = elAlpha * lev * lev * lev;
            evaluator.draw$1([pos], {
                size: CSNumber.real(size),
                color: el.color,
                alpha: CSNumber.real(alpha)
            });
        }
        size *= dimfactor;
    }
}
function assert(condition, message) {
    var msg = "Assertion failed: " + message;
    if (condition) return;
    console.log(msg);
    shutdown();
    if (typeof alert !== "undefined") alert(msg); // jshint ignore:line
    throw new Error(msg);
}

var totalStateSize = 0;
var stateArrayNames = ["in", "out", "good", "backup"];
// Initialize all state to zero-length arrays, can be reallocated later on
var stateMasterArray = new Float64Array(0);
var stateArrays = {};
stateArrayNames.forEach(function(name) {
    stateArrays[name] = stateMasterArray;
});
var stateIn = stateMasterArray;
var stateOut = stateMasterArray;
var stateLastGood = stateMasterArray;

function stateAlloc(newSize) {
    if (newSize === stateLastGood.length) return;
    var offset, i;
    var states = stateArrayNames.length;
    if (stateMasterArray.length < newSize * states) {
        // We really need to reallocate memory
        offset = newSize * 2; // include some reserve
        stateMasterArray = new Float64Array(states * offset);
    } else {
        // Master array still has room, we just need to lengthen the subarrays
        offset = (stateMasterArray.length / states) | 0;
    }
    for (i = 0; i < states; ++i) {
        stateArrays[stateArrayNames[i]] = stateMasterArray.subarray(
            i * offset, i * offset + newSize);
    }
    // No array content is deliberately preserved by the above.
    // Now we do preserve the stateLastGood.
    var oldStateLastGood = stateLastGood;
    stateIn = stateArrays.in;
    stateOut = stateArrays.out;
    stateLastGood = stateArrays.good;
    stateLastGood.set(oldStateLastGood);
}

/**
 * Current state (i.e. stateIn) is now deemed good, even in case it
 * wasn't considered good before. Make it the stateLastGood. If we
 * were in a good situation, there is nothing to do.
 */
function stateContinueFromHere() {
    stateLastGood.set(stateIn);
    tracingFailed = false;
    tracingStateReport(false);

    // Make numbers which are almost real totally real. This avoids
    // accumulating errors in the imaginary part.
    var n = stateLastGood.length;
    var abs = Math.abs;
    var epsInverse = 1e12;
    for (var i = 0; i < n; i += 2) {
        if (abs(stateLastGood[i]) > abs(stateLastGood[i + 1]) * epsInverse) {
            stateLastGood[i + 1] = 0;
        }
    }
}

var stateInIdx, stateOutIdx;

var tracingInitial, tracingFailed, noMoreRefinements;

var inMouseMove = false;

var RefineException = {
    toString: function() {
        return "RefineException";
    }
};

function requestRefinement() {
    // Call this whenever you would need exra refinement.
    // Possible outcomes: either an exception will be thrown to
    // request more refinements, or the tracingFailed flag will be set
    // and the function returns normally.
    if (noMoreRefinements) tracingFailed = true;
    else throw RefineException;
}

function defaultParameterPath(el, tr, tc, src, dst) {
    // src + t * (dst - src)
    return General.add(src, General.mult(tc, General.sub(dst, src)));
}

function traceMouseAndScripts() {
    if (traceLog) {
        traceLog.currentMouseAndScripts = [];
    }
    inMouseMove = true;
    if (move) {
        var mover = move.mover;
        var sx = mouse.x + move.offset.x;
        var sy = mouse.y + move.offset.y;
        var pos = List.realVector([sx, sy, 1]);
        traceMover(mover, pos, "mouse");
        move.prev.x = mouse.x;
        move.prev.y = mouse.y;
    }
    evaluate(cscompiled.move);
    evaluate(cscompiled.draw);
    if (!tracingFailed) {
        stateContinueFromHere();
    }
    inMouseMove = false;
    if (traceLog) {
        traceLog.fullLog.push(List.turnIntoCSList([
            List.turnIntoCSList(traceLog.currentMouseAndScripts)
        ]));
        if (traceLog.length > traceLog.logLength)
            traceLog.splice(0, traceLog.length - traceLog.logLength);
        traceLog.currentMouseAndScripts = null;
        traceLog.postMouseHooks.forEach(function(cb) {
            cb();
        });
    }
}

function movepointscr(mover, pos, type) {
    traceMover(mover, pos, type);
    if (!inMouseMove && !tracingFailed)
        stateContinueFromHere();
}

// Remember the last point which got moved.
// @todo: be careful with this variable when doing automatic proving.
var previousMover = null;

/*
 * traceMover moves mover from current param to param for pos along a complex detour.
 */
function traceMover(mover, pos, type) {
    if (traceLog && traceLog.currentMouseAndScripts) {
        traceLog.currentMover = [];
    }
    if (mover === previousMover) {
        stateIn.set(stateLastGood); // copy stateLastGood and use it as input
        tracingFailed = false;
    } else {
        previousMover = mover;
        stateContinueFromHere(); // make changes up to now permanent
    }
    stateOut.set(stateIn); // copy in to out, for elements we don't recalc
    var traceLimit = 10000; // keep UI responsive in evil situations
    var deps = getGeoDependants(mover);
    var last = -1;
    var step = 0.9; // two steps with the *1.25 scaling used below
    var i, el, op;
    var opMover = geoOps[mover.type];
    var parameterPath = opMover.parameterPath || defaultParameterPath;
    stateInIdx = mover.stateIdx;
    var originParam = opMover.getParamFromState(mover);
    stateInIdx = stateOutIdx = mover.stateIdx;
    var targetParam = opMover.getParamForInput(mover, pos, type);
    //console.log("Tracing from " + niceprint(originParam) + " to " + niceprint(targetParam));
    var t = last + step;
    while (last !== t) {
        // Rational parametrization of semicircle,
        // see http://jsperf.com/half-circle-parametrization
        var t2 = t * t;
        var dt = 0.5 / (1 + t2);
        var tc = CSNumber.complex((2 * t) * dt + 0.5, (1 - t2) * dt);
        noMoreRefinements = (last + 0.5 * step <= last || traceLimit === 0);
        if (traceLimit === 0) console.log("tracing limit Reached");
        var refining = false;

        if (traceLog && traceLog.currentMouseAndScripts) {
            traceLog.currentStep = [];
        }
        try {
            traceOneStep();
        } catch (e) {
            if (e !== RefineException)
                throw e;
            step *= 0.5; // reduce step size
            t = last + step;
            --traceLimit;
            refining = true;
        }
        if (traceLog && traceLog.currentMouseAndScripts) {
            traceLog.currentMover.push(List.turnIntoCSList([
                List.turnIntoCSList(traceLog.currentStep), // 1
                General.wrap(refining), //                    2
                General.wrap(last), //                        3
                General.wrap(t), //                           4
                General.wrap(traceLog.currentParam), //       5
            ]));
            traceLog.currentStep = null;
            traceLog.currentParam = null;
        }
    }
    tracingStateReport(tracingFailed);
    for (i = 0; i < deps.length; ++i) {
        el = deps[i];
        op = geoOps[el.type];
        isShowing(el, op);
    }
    if (traceLog && traceLog.currentMouseAndScripts) {
        traceLog.currentMouseAndScripts.push(List.turnIntoCSList([
            List.turnIntoCSList(traceLog.currentMover), //    1
            General.wrap(tracingFailed), //                   2
            General.wrap(mover.name), //                      3
            pos, //                                           4
            General.wrap(type), //                            5
            originParam, //                                   6
            targetParam, //                                   7
        ]));
        traceLog.currentMover = null;
    }

    // use own function to enable compiler optimization
    function traceOneStep() {
        stateInIdx = stateOutIdx = mover.stateIdx;
        var param =
            parameterPath(mover, t, tc, originParam, targetParam);
        if (traceLog) traceLog.currentParam = param;

        var stateTmp = stateOut;
        stateOut = stateIn;
        opMover.putParamToState(mover, param);
        stateOut = stateTmp;
        stateOutIdx = mover.stateIdx;

        if (traceLog) traceLog.currentElement = mover;
        opMover.updatePosition(mover, true);
        assert(stateInIdx === mover.stateIdx + opMover.stateSize, "State fully consumed");
        assert(stateOutIdx === mover.stateIdx + opMover.stateSize, "State fully updated");
        for (i = 0; i < deps.length; ++i) {
            el = deps[i];
            op = geoOps[el.type];
            stateInIdx = stateOutIdx = el.stateIdx;
            if (traceLog) traceLog.currentElement = el;
            op.updatePosition(el, false);
            assert(stateInIdx === el.stateIdx + op.stateSize, "State fully consumed");
            assert(stateOutIdx === el.stateIdx + op.stateSize, "State fully updated");
        }
        if (traceLog) traceLog.currentElement = null;
        last = t; // successfully traced up to t
        step *= 1.25;
        t += step;
        if (t >= 1) t = 1;

        // stateTmp = stateOut; // we still have this from above
        stateOut = stateIn; // recycle old input, reuse as output
        stateIn = stateTmp; // use last output as next input
    }
}

function recalcAll() {
    stateContinueFromHere();
    noMoreRefinements = true; // avoid exceptions requesting refinements
    var gslp = csgeo.gslp;
    for (var k = 0; k < gslp.length; k++) {
        var el = gslp[k];
        var op = geoOps[el.type];
        stateInIdx = stateOutIdx = el.stateIdx;
        op.updatePosition(el, false);
        isShowing(el, op);
    }
    var stateTmp = stateOut;
    stateOut = stateIn;
    stateIn = stateTmp;
    stateContinueFromHere();
}

function tracingStateReport(failed) {
    var arg = instanceInvocationArguments.tracingStateReport;
    if (typeof arg === "string") {
        document.getElementById(arg).textContent =
            failed ? "BAD" : "GOOD";
    }
}

var traceLog = null;

if (instanceInvocationArguments.enableTraceLog) {
    // most properties are JavaScript lists of CindyScript lists
    traceLog = {
        logLength: Infinity,
        fullLog: [],
        currentMouseAndScripts: null,
        currentMover: null,
        currentStep: null,
        currentElement: null,
        currentParam: null,
        labelTracing2: General.wrap("tracing2"),
        labelTracing4: General.wrap("tracing4"),
        labelTracingSesq: General.wrap("tracingSesq"),
        postMouseHooks: []
    };
    if (typeof instanceInvocationArguments.enableTraceLog === "number")
        traceLog.logLength = instanceInvocationArguments.enableTraceLog;
    globalInstance.getTraceLog = getTraceLog;
    globalInstance.formatTraceLog = formatTraceLog;
    globalInstance.addTraceHook =
        traceLog.postMouseHooks.push.bind(traceLog.postMouseHooks);
}

function getTraceLog() {
    return List.turnIntoCSList(traceLog.fullLog.slice());
}

function formatTraceLog(save) {
    var str = JSON.stringify(traceLog.fullLog);
    var type = save ? 'application/octet-stream' : 'application/json';
    var blob = new Blob([str], {
        'type': type
    });
    var uri = window.URL.createObjectURL(blob);
    // var uri = 'data:text/html;base64,' + window.btoa(html);
    return uri;
}

function getStateComplexNumber() {
    var i = stateInIdx;
    stateInIdx += 2;
    return CSNumber.complex(stateIn[i], stateIn[i + 1]);
}

function getStateComplexVector(n) {
    var lst = new Array(n);
    for (var i = 0; i < n; ++i)
        lst[i] = getStateComplexNumber();
    return List.turnIntoCSList(lst);
}

function putStateComplexNumber(c) {
    stateOut[stateOutIdx] = c.value.real;
    stateOut[stateOutIdx + 1] = c.value.imag;
    stateOutIdx += 2;
}

function putStateComplexVector(v) {
    for (var i = 0, n = v.value.length; i < n; ++i)
        putStateComplexNumber(v.value[i]);
}

function tracing2(n1, n2) {
    var o1 = getStateComplexVector(3);
    var o2 = getStateComplexVector(3);
    var res = tracing2core(n1, n2, o1, o2);
    putStateComplexVector(res[0]);
    putStateComplexVector(res[1]);
    return List.turnIntoCSList(res);
}

function tracing2core(n1, n2, o1, o2) {
    var safety = 3;

    if (tracingInitial)
        return [n1, n2];

    var do1n1 = List.projectiveDistMinScal(o1, n1);
    var do1n2 = List.projectiveDistMinScal(o1, n2);
    var do2n1 = List.projectiveDistMinScal(o2, n1);
    var do2n2 = List.projectiveDistMinScal(o2, n2);
    var do1o2 = List.projectiveDistMinScal(o1, o2);
    var dn1n2 = List.projectiveDistMinScal(n1, n2);
    var cost1 = do1n1 + do2n2;
    var cost2 = do1n2 + do2n1;
    var cost, res;

    // Always sort output: we don't know yet whether it's correct, but
    // it's our best bet.
    if (cost1 > cost2) {
        res = [n2, n1];
        cost = cost2;
    } else {
        res = [n1, n2];
        cost = cost1;
    }

    var debug = function() {};
    // debug = console.log.bind(console);
    if (traceLog && traceLog.currentStep) {
        var logRow = [
            traceLog.labelTracing2, //                        1
            General.wrap(traceLog.currentElement.name), //    2
            List.turnIntoCSList(res), //                      3
            List.turnIntoCSList([o1, o2]), //                 4
            List.realMatrix([ //                              5
                [do1n1, do1n2],
                [do2n1, do2n2]
            ]),
            General.wrap(cost), //                            6
            General.wrap(do1o2), //                           7
            General.wrap(dn1n2), //                           8
            nada, // will become the outcome message //       9
        ];
        traceLog.currentStep.push(List.turnIntoCSList(logRow));
        debug = function(msg) {
            if (!traceLog.hasOwnProperty(msg))
                traceLog[msg] = General.wrap(msg);
            logRow[logRow.length - 1] = traceLog[msg];
            // Evil: modify can break copy on write! But it's safe here.
        };
    }
    if (List._helper.isNaN(n1) || List._helper.isNaN(n2)) {
        // Something went very wrong, numerically speaking. We have no
        // clue whether refining will make things any better, so we
        // assume it won't and give up.
        debug("Tracing failed due to NaNs.");
        tracingFailed = true;
    } else if (do1o2 > cost * safety && dn1n2 > cost * safety) {
        // Distance within matching considerably smaller than distance
        // across matching, so we could probably match correctly.
        debug("Normal case, everything all right.");
    } else if (dn1n2 < 1e-5) {
        // New points too close: we presumably are inside a singularity.
        if (do1o2 < 1e-5) { // Cinderella uses the constant 1e-6 here
            // The last "good" position was already singular.
            // Nothing we can do about this.
            debug("Staying inside singularity.");
        } else {
            // We newly moved into the singularity. New position is
            // not "good", but refining won't help since the endpoint
            // is singular.
            debug("Moved into singularity.");
            tracingFailed = true;
        }
    } else if (do1o2 < 1e-5) { // Cinderella uses the constant 1e-6 here
        // We just moved out of a singularity. Things can only get
        // better. If the singular situation was "good", we stay
        // "good", and keep track of things from now on.
        debug("Moved out of singularity.");
    } else {
        // Neither old nor new position looks singular, so there was
        // an avoidable singularity along the way. Refine to avoid it.
        if (noMoreRefinements)
            debug("Reached refinement limit, giving up.");
        else
            debug("Need to refine.");
        requestRefinement();
    }
    return res;
}
tracing2.stateSize = 12; // two three-element complex vectors

function tracing4(n1, n2, n3, n4) {
    var o1 = getStateComplexVector(3);
    var o2 = getStateComplexVector(3);
    var o3 = getStateComplexVector(3);
    var o4 = getStateComplexVector(3);

    var res = tracing4core(n1, n2, n3, n4, o1, o2, o3, o4);

    putStateComplexVector(res[0]);
    putStateComplexVector(res[1]);
    putStateComplexVector(res[2]);
    putStateComplexVector(res[3]);
    return List.turnIntoCSList(res);
}
tracing4.stateSize = 24; // four three-element complex vectors


function tracing4core(n1, n2, n3, n4, o1, o2, o3, o4) {
    var debug = function() {};
    // var debug = console.log.bind(console);

    var useGreedy = false; // greedy or permutation?
    var safety;

    var old_el = [o1, o2, o3, o4];
    var new_el = [n1, n2, n3, n4];

    // first we leave everything to input
    if (tracingInitial)
        return new_el;

    var res, dist, i, j, distMatrix;
    var min_cost = 0;

    if (useGreedy) {
        safety = 3;
        res = new_el;
        for (i = 0; i < 4; i++) {
            var idx = i;
            var min_dist = List.projectiveDistMinScal(old_el[i], res[i]);
            for (j = i + 1; j < 4; j++) {
                dist = List.projectiveDistMinScal(old_el[i], res[j]);
                if (dist < min_dist) {
                    idx = j;
                    min_dist = dist;
                }
            }
            // swap elements
            var tmp = res[i];
            res[i] = res[idx];
            res[idx] = tmp;
            min_cost += min_dist;
        }
    } else {
        safety = 1;

        // build dist matrix
        distMatrix = new Array(4);
        for (i = 0; i < 4; i++) {
            distMatrix[i] = new Array(4);
            for (j = 0; j < 4; j++) {
                dist = List.projectiveDistMinScal(old_el[i], new_el[j]);
                distMatrix[i][j] = dist;
            }
        }

        var bestperm = minCostMatching(distMatrix);
        res = new Array(4);
        for (i = 0; i < 4; ++i) {
            res[i] = new_el[bestperm[i]];
            min_cost += distMatrix[i][bestperm[i]];
        }
    } // end use greedy

    // assume now we have machting between res and old_el
    var need_refine = false;
    var match_cost = min_cost * safety;
    var odist = Infinity;
    var ndist = Infinity;

    for (i = 0; i < 4; i++) {
        if (need_refine) break;
        if (List._helper.isNaN(new_el[i])) {
            // Something went very wrong, numerically speaking. We have no
            // clue whether refining will make things any better, so we
            // assume it won't and give up.
            debug("Tracing failed due to NaNs.");
            tracingFailed = true;
            return res;
        }
        for (j = i + 1; j < 4; j++) {
            dist = List.projectiveDistMinScal(old_el[i], old_el[j]); // do1o2...
            if (odist > dist) odist = dist;
            dist = List.projectiveDistMinScal(res[i], res[j]); // dn1n2...
            if (ndist > dist) ndist = dist;
        }
    }

    if (traceLog && traceLog.currentStep) {
        var logRow = [
            traceLog.labelTracing4, //                        1
            General.wrap(traceLog.currentElement.name), //    2
            List.turnIntoCSList(res), //                      3
            List.turnIntoCSList(old_el), //                   4
            List.realMatrix(distMatrix), //                   5
            General.wrap(min_cost), //                        6
            General.wrap(odist), //                           7
            General.wrap(ndist), //                           8
            nada, // will become the outcome message //       9
        ];
        traceLog.currentStep.push(List.turnIntoCSList(logRow));
        debug = function(msg) {
            if (!traceLog.hasOwnProperty(msg))
                traceLog[msg] = General.wrap(msg);
            logRow[logRow.length - 1] = traceLog[msg];
            // Evil: modify can break copy on write! But it's safe here.
        };
    }

    if (odist > match_cost && ndist > match_cost) {
        // Distance within matching considerably smaller than distance
        // across matching, so we could probably match correctly.
        //debug("Normal case, everything all right.");
    } else if (ndist < 1e-5) {
        // New points too close: we presumably are inside a singularity.
        if (odist < 1e-5) {
            // The last "good" position was already singular.
            // Nothing we can do about this.
            debug("Staying inside singularity.");
        } else {
            // We newly moved into the singularity. New position is
            // not "good", but refining won't help since the endpoint
            // is singular.
            debug("Moved into singularity.");
            tracingFailed = true;
        }
    } else if (odist < 1e-5) {
        // We just moved out of a singularity. Things can only get
        // better. If the singular situation was "good", we stay
        // "good", and keep track of things from now on.
        debug("Moved out of singularity.");
    } else {
        if (noMoreRefinements)
            debug("Reached refinement limit, giving up.");
        else
            debug("Need to refine.");
        requestRefinement();

    }
    return res;
}

function tracing2X(n1, n2, c1, c2, el) {
    var OK = 0;
    var DECREASE_STEP = 1;
    var INVALID = 2;
    var tooClose = el.tooClose || OK;
    var safety = 3;

    var do1n1 = List.projectiveDistMinScal(c1, n1);
    var do1n2 = List.projectiveDistMinScal(c1, n2);
    var do2n1 = List.projectiveDistMinScal(c2, n1);
    var do2n2 = List.projectiveDistMinScal(c2, n2);
    var do1o2 = List.projectiveDistMinScal(c1, c2);
    var dn1n2 = List.projectiveDistMinScal(n1, n2);

    //Das Kommt jetzt eins zu eins aus Cindy

    var care = (do1o2 > 0.000001);

    // First we try to assign the points

    if (do1o2 / safety > do1n1 + do2n2 && dn1n2 / safety > do1n1 + do2n2) {
        el.results = List.turnIntoCSList([n1, n2]); //Das ist "sort Output"
        return OK + tooClose;
    }

    if (do1o2 / safety > do1n2 + do2n1 && dn1n2 / safety > do1n2 + do2n1) {
        el.results = List.turnIntoCSList([n2, n1]); //Das ist "sort Output"
        return OK + tooClose;
    }

    //  Maybe they are too close?

    if (dn1n2 < 0.00001) {
        // They are. Do we care?
        if (care) {
            tooClose = el.tooClose = INVALID;
            el.results = List.turnIntoCSList([n1, n2]);
            return OK + tooClose;
        } else {
            el.results = List.turnIntoCSList([n1, n2]);
            return OK + tooClose;
        }
    }

    // They are far apart. We care now.
    if (!care || tooClose === INVALID) {
        el.results = List.turnIntoCSList([n1, n2]); //Das ist "sort Output"
        return OK + tooClose;
    }
    return DECREASE_STEP + tooClose;
}

function tracingSesq(newVecs) {
    /*
     * Trace an arbitrary number of solutions, with an arbitrary
     * dimension for the homogeneous solution vectors.
     *
     * Conceptually the cost function being used is the negated square
     * of the absolute value of the sesquilinearproduct between two
     * vectors normalized to unit norm. In practice, we avoid
     * normalizing the vectors, and instead divide by the squared norm
     * to avoid taking square roots.
     */

    var n = newVecs.length;
    var i, j;

    if (tracingInitial) {
        for (i = 0; i < n; ++i) {
            stateInIdx += 2 * newVecs[i].value.length;
            putStateComplexVector(newVecs[i]);
        }
        return newVecs;
    }

    var oldVecs = new Array(n);
    var oldNorms = new Array(n);
    var newNorms = new Array(n);
    var oldMinCost = 99;
    var newMinCost = 99;
    var cost = new Array(n);
    for (i = 0; i < n; ++i) {
        oldVecs[i] = getStateComplexVector(newVecs[i].value.length);
        oldNorms[i] = List.normSquared(oldVecs[i]).value.real;
        newNorms[i] = List.normSquared(newVecs[i]).value.real;
        cost[i] = new Array(n);
    }
    var p, w;
    for (i = 0; i < n; ++i) {
        for (j = 0; j < n; ++j) {
            p = List.sesquilinearproduct(oldVecs[i], newVecs[j]).value;
            w = (p.real * p.real + p.imag * p.imag) /
                (oldNorms[i] * newNorms[j]);
            cost[i][j] = 1 - w;
        }
        for (j = i + 1; j < n; ++j) {
            p = List.sesquilinearproduct(oldVecs[i], oldVecs[j]).value;
            w = (p.real * p.real + p.imag * p.imag) /
                (oldNorms[i] * oldNorms[j]);
            if (oldMinCost > 1 - w)
                oldMinCost = 1 - w;
            p = List.sesquilinearproduct(newVecs[i], newVecs[j]).value;
            w = (p.real * p.real + p.imag * p.imag) /
                (newNorms[i] * newNorms[j]);
            if (newMinCost > 1 - w)
                newMinCost = 1 - w;
        }
    }
    var m = minCostMatching(cost);
    var res = new Array(n);
    var resCost = 0;
    var anyNaN = false;
    for (i = 0; i < n; ++i) {
        resCost += cost[i][m[i]];
        var v = res[i] = newVecs[m[i]];
        putStateComplexVector(v);
        anyNaN |= List._helper.isNaN(v);
    }
    anyNaN |= isNaN(resCost);
    var safety = 3;
    var debug = function() {};
    if (traceLog && traceLog.currentStep) {
        var logRow = [
            traceLog.labelTracingSesq, //                     1
            General.wrap(traceLog.currentElement.name), //    2
            List.turnIntoCSList(res), //                      3
            List.turnIntoCSList(oldVecs), //                  4
            List.realMatrix(cost), //                         5
            General.wrap(resCost), //                         6
            General.wrap(oldMinCost), //                      7
            General.wrap(newMinCost), //                      8
            nada, // will become the outcome message //       9
        ];
        traceLog.currentStep.push(List.turnIntoCSList(logRow));
        debug = function(msg) {
            if (!traceLog.hasOwnProperty(msg))
                traceLog[msg] = General.wrap(msg);
            logRow[logRow.length - 1] = traceLog[msg];
            // Evil: modify can break copy on write! But it's safe here.
        };
    }
    if (anyNaN) {
        // Something went very wrong, numerically speaking. We have no
        // clue whether refining will make things any better, so we
        // assume it won't and give up.
        debug("Tracing failed due to NaNs.");
        tracingFailed = true;
    } else if (oldMinCost > resCost * safety && newMinCost > resCost * safety) {
        // Distance within matching considerably smaller than distance
        // across matching, so we could probably match correctly.
        debug("Normal case, everything all right.");
    } else if (newMinCost < 1e-5) {
        // New points too close: we presumably are inside a singularity.
        if (oldMinCost < 1e-5) {
            // The last "good" position was already singular.
            // Nothing we can do about this.
            debug("Staying inside singularity.");
        } else {
            // We newly moved into the singularity. New position is
            // not "good", but refining won't help since the endpoint
            // is singular.
            debug("Moved into singularity.");
            tracingFailed = true;
        }
    } else if (oldMinCost < 1e-5) {
        // We just moved out of a singularity. Things can only get
        // better. If the singular situation was "good", we stay
        // "good", and keep track of things from now on.
        debug("Moved out of singularity.");
    } else {
        // Neither old nor new position looks singular, so there was
        // an avoidable singularity along the way. Refine to avoid it.
        if (noMoreRefinements)
            debug("Reached refinement limit, giving up.");
        else
            debug("Need to refine.");
        requestRefinement();
    }
    return res;
}
var conjectures = [];

function guessIncidences(el) {
    if (guessIncidences.hasOwnProperty(el.kind))
        guessIncidences[el.kind](el);
}

guessIncidences.P = function(p) {
    csgeo.lines.forEach(function(l) {
        var conjecture = incidentPL(p, l);
        if (conjecture.holds())
            conjectures.push(conjecture);
    });
    csgeo.conics.forEach(function(c) {
        var conjecture = incidentPC(p, c);
        if (conjecture.holds())
            conjectures.push(conjecture);
    });
};

guessIncidences.L = function(l) {
    csgeo.points.forEach(function(p) {
        var conjecture = incidentPL(p, l);
        if (conjecture.holds())
            conjectures.push(conjecture);
    });
};

guessIncidences.S = guessIncidences.L;

guessIncidences.C = function(c) {
    csgeo.points.forEach(function(p) {
        var conjecture = incidentPC(p, c);
        if (conjecture.holds())
            conjectures.push(conjecture);
    });
};

function applyIncidence(a, b) {
    return function() {
        a.incidences.push(b.name);
        b.incidences.push(a.name);
    };
}

function incidentPL(p, l) {
    return {
        toString: function() {
            return "point " + p.name + " incident line " + l.name;
        },
        apply: applyIncidence(p, l),
        holds: function() {
            var pn = List.scaldiv(List.abs(p.homog), p.homog);
            var ln = List.scaldiv(List.abs(l.homog), l.homog);
            var prod = CSNumber.abs(List.scalproduct(pn, ln));
            return (prod.value.real < 0.0000000000001);
        }
    };
}

function incidentPC(p, c) {
    return {
        toString: function() {
            return "point " + p.name + " incident conic " + c.name;
        },
        apply: applyIncidence(p, c),
        holds: function() {
            var erg = General.mult(c.matrix, p.homog);
            erg = General.mult(p.homog, erg);
            erg = CSNumber.abs(erg);
            if (erg.value.real < 0.0000000000001) {
                p.incidences.push(c.name);
                c.incidences.push(p.name);
            }
        }
    };
}

function checkConjectures() {
    if (conjectures.length === 0) return;
    // TODO: we need some randomized proving here:
    // move free elements and check conjectures a number of times.
    // For now assume that all conjectures could be verified.
    for (var i = 0; i < conjectures.length; ++i) {
        conjectures[i].apply();
    }
    conjectures = [];
}
var geoOps = {};
geoOps._helper = {};

/* Kinds of geometric elements:
 * P  - Point
 * L  - Line
 * S  - Segment
 * C  - Conic (including circle)
 * *s - Set of *
 * Tr - Projective transformation
 * Mt - Moebius transformation (or anti-Moebius)
 * V  - (numeric) value
 * Text - Text
 * "**" - arbitrary number of arguments with arbitrary types
 * Poly - Polygons
 */


////The RandomLine RandomPoint operators are used by Cinderellas
////Original Mirror Operations

geoOps.RandomLine = {};
geoOps.RandomLine.kind = "L";
geoOps.RandomLine.signature = [];
geoOps.RandomLine.updatePosition = function(el) {
    el.homog = List.realVector([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


geoOps.FreeLine = {};
geoOps.FreeLine.kind = "L";
geoOps.FreeLine.signature = [];
geoOps.FreeLine.isMovable = true;
geoOps.FreeLine.initialize = function(el) {
    var pos = geoOps._helper.initializeLine(el);
    putStateComplexVector(pos);
};
geoOps.FreeLine.getParamForInput = function(el, pos, type) {
    var homog;
    if (type === "mouse") {
        homog = List.cross(pos, List.ez);
        homog = List.cross(homog, pos);
    } else if (type === "homog") {
        homog = pos;
    } else {
        homog = List.turnIntoCSList([CSNumber.zero, CSNumber.zero, CSNumber.zero]);
    }
    return List.normalizeMax(homog);
};
geoOps.FreeLine.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.FreeLine.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.FreeLine.updatePosition = function(el) {
    var param = getStateComplexVector(3);
    putStateComplexVector(param); // copy param
    el.homog = General.withUsage(param, "Line");
};
geoOps.FreeLine.stateSize = 6;


geoOps.RandomPoint = {};
geoOps.RandomPoint.kind = "P";
geoOps.RandomPoint.signature = [];
geoOps.RandomPoint.updatePosition = function(el) {
    el.homog = List.realVector([100 * Math.random(), 100 * Math.random(), 100 * Math.random()]);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Point");
};

///////////////////////////


geoOps.Join = {};
geoOps.Join.kind = "L";
geoOps.Join.signature = ["P", "P"];
geoOps.Join.updatePosition = function(el) {
    var el1 = csgeo.csnames[(el.args[0])];
    var el2 = csgeo.csnames[(el.args[1])];
    el.homog = List.cross(el1.homog, el2.homog);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


geoOps.Segment = {};
geoOps.Segment.kind = "S";
geoOps.Segment.signature = ["P", "P"];
geoOps.Segment.updatePosition = function(el) {
    var el1 = csgeo.csnames[(el.args[0])];
    var el2 = csgeo.csnames[(el.args[1])];
    geoOps.Segment.setSegmentPos(el,
        List.cross(el1.homog, el2.homog),
        List.scalmult(el2.homog.value[2], el1.homog),
        List.scalmult(el1.homog.value[2], el2.homog)
    );
};
geoOps.Segment.setSegmentPos = function(el, line, start, end) {
    line = List.normalizeMax(line);
    el.homog = General.withUsage(line, "Line");
    var startend = List.turnIntoCSList([start, end]);
    startend = List.normalizeMax(startend); // Normalize together!
    el.startpos = startend.value[0];
    el.endpos = startend.value[1];
    // So  midpoint = startpos + endpos
    // and farpoint = startpos - endpos
};


geoOps.Meet = {};
geoOps.Meet.kind = "P";
geoOps.Meet.signature = ["L", "L"];
geoOps.Meet.updatePosition = function(el) {
    var el1 = csgeo.csnames[(el.args[0])];
    var el2 = csgeo.csnames[(el.args[1])];
    el.homog = List.cross(el1.homog, el2.homog);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Point");
};

geoOps.Meet.visiblecheck = function(el) {
    var visible = true;
    var el1 = csgeo.csnames[(el.args[0])];
    var el2 = csgeo.csnames[(el.args[1])];

    if (el1.kind === "S") {
        visible = onSegment(el, el1);
    }
    if (visible && el2.kind === "S") {
        visible = onSegment(el, el2);
    }
    el.isshowing = visible;
};

geoOps._helper.midpoint = function(a, b) {
    return List.normalizeMax(List.add(
        List.scalmult(b.value[2], a),
        List.scalmult(a.value[2], b)));
};

geoOps.Mid = {};
geoOps.Mid.kind = "P";
geoOps.Mid.signature = ["P", "P"];
geoOps.Mid.updatePosition = function(el) {
    var x = csgeo.csnames[(el.args[0])].homog;
    var y = csgeo.csnames[(el.args[1])].homog;
    var res = geoOps._helper.midpoint(x, y);
    el.homog = General.withUsage(res, "Point");
};


geoOps.Perp = {};
geoOps.Perp.kind = "L";
geoOps.Perp.signature = ["L", "P"];
geoOps.Perp.updatePosition = function(el) {
    var l = csgeo.csnames[(el.args[0])].homog;
    var p = csgeo.csnames[(el.args[1])].homog;
    var tt = List.turnIntoCSList([l.value[0], l.value[1], CSNumber.zero]);
    el.homog = List.cross(tt, p);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


geoOps.Para = {};
geoOps.Para.kind = "L";
geoOps.Para.signature = ["L", "P"];
geoOps.Para.updatePosition = function(el) {
    var l = csgeo.csnames[(el.args[0])].homog;
    var p = csgeo.csnames[(el.args[1])].homog;
    var inf = List.linfty;
    el.homog = List.cross(List.cross(inf, l), p);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};

// Horizontal line through a point
geoOps.Horizontal = {};
geoOps.Horizontal.kind = "L";
geoOps.Horizontal.signature = ["P"];
geoOps.Horizontal.updatePosition = function(el) {
    var el1 = csgeo.csnames[(el.args[0])];
    el.homog = List.cross(List.ex, el1.homog);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


// Cinderella's freely movable HorizontalLine (Cinderella semantics)
geoOps.HorizontalLine = {};
geoOps.HorizontalLine.kind = "L";
geoOps.HorizontalLine.signature = [];
geoOps.HorizontalLine.isMovable = true;
geoOps.HorizontalLine.initialize = function(el) {
    var pos = geoOps._helper.initializeLine(el);
    pos = List.turnIntoCSList([CSNumber.zero, pos.value[1], pos.value[2]]);
    pos = List.normalizeMax(pos);
    putStateComplexVector(pos);
};
geoOps.HorizontalLine.getParamForInput = function(el, pos, type) {
    if (type === "mouse") {
        pos = List.cross(pos, List.ex);
    } else if (type === "homog") {
        if (pos.value[0].real !== 0 || pos.value[0].imag !== 0)
            pos = List.turnIntoCSList([
                CSNumber.zero, pos.value[1], pos.value[2]
            ]);
    } else {
        pos = List.turnIntoCSList([CSNumber.zero, CSNumber.zero, CSNumber.zero]);
    }
    return List.normalizeMax(pos);
};
geoOps.HorizontalLine.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.HorizontalLine.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.HorizontalLine.updatePosition = function(el) {
    var param = getStateComplexVector(3);
    putStateComplexVector(param); // copy param
    el.homog = General.withUsage(param, "Line");
};
geoOps.HorizontalLine.stateSize = 6;


// Vertical line through a point
geoOps.Vertical = {};
geoOps.Vertical.kind = "L";
geoOps.Vertical.signature = ["P"];
geoOps.Vertical.updatePosition = function(el) {
    var el1 = csgeo.csnames[(el.args[0])];
    el.homog = List.cross(List.ey, el1.homog);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


// Cinderella's freely movable VerticalLine (Cinderella semantics)
geoOps.VerticalLine = {};
geoOps.VerticalLine.kind = "L";
geoOps.VerticalLine.signature = [];
geoOps.VerticalLine.isMovable = true;
geoOps.VerticalLine.initialize = function(el) {
    var pos = geoOps._helper.initializeLine(el);
    pos = List.turnIntoCSList([pos.value[0], CSNumber.zero, pos.value[2]]);
    pos = List.normalizeMax(pos);
    putStateComplexVector(pos);
};
geoOps.VerticalLine.getParamForInput = function(el, pos, type) {
    if (type === "mouse") {
        pos = List.cross(pos, List.ey);
    } else if (type === "homog") {
        if (pos.value[1].real !== 0 || pos.value[1].imag !== 0)
            pos = List.turnIntoCSList([
                pos.value[0], CSNumber.zero, pos.value[2]
            ]);
    } else {
        pos = List.turnIntoCSList([CSNumber.zero, CSNumber.zero, CSNumber.zero]);
    }
    return List.normalizeMax(pos);
};
geoOps.VerticalLine.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.VerticalLine.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.VerticalLine.updatePosition = function(el) {
    var param = getStateComplexVector(3);
    putStateComplexVector(param); // copy param
    el.homog = General.withUsage(param, "Line");
};
geoOps.VerticalLine.stateSize = 6;


geoOps.LineByFixedAngle = {};
geoOps.LineByFixedAngle.kind = "L";
geoOps.LineByFixedAngle.signature = ["L", "P"];
geoOps.LineByFixedAngle.initialize = function(el) {
    var a = CSNumber._helper.input(el.angle);
    var c = CSNumber.cos(a);
    var s = CSNumber.sin(a);
    // Setup matrix for applying the angle rotation.
    // This will also map from line in the plane to point at infinity.
    // So it's a rotation combined with a projection and hence has det=0.
    // And the rotation is 90 degrees less than one might expect at first
    // due to the translation between line and point.
    el.rot = List.turnIntoCSList([
        List.turnIntoCSList([s, c, CSNumber.zero]),
        List.turnIntoCSList([CSNumber.neg(c), s, CSNumber.zero]),
        List.turnIntoCSList([CSNumber.zero, CSNumber.zero, CSNumber.zero])
    ]);
};
geoOps.LineByFixedAngle.updatePosition = function(el) {
    var l = csgeo.csnames[(el.args[0])];
    var p = csgeo.csnames[(el.args[1])];
    var dir = List.productMV(el.rot, l.homog);
    el.homog = List.cross(p.homog, dir);
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Line");
};


geoOps.Through = {};
geoOps.Through.kind = "L";
geoOps.Through.signature = ["P"];
geoOps.Through.isMovable = true;
geoOps.Through.initialize = function(el) {
    var dir;
    if (el.dir)
        dir = General.wrap(el.dir);
    else
        dir = List.realVector([el.pos[1], -el.pos[0], 0]);
    putStateComplexVector(dir);
};
geoOps.Through.getParamForInput = function(el, pos, type) {
    var l;
    if (type === "dir" || type === "mouse") {
        var p1 = csgeo.csnames[(el.args[0])].homog;
        l = List.cross(p1, pos);
    } else if (type === "homog") {
        l = pos;
    } else {
        l = List.turnIntoCSList([CSNumber.zero, CSNumber.zero, CSNumber.zero]);
    }
    var dir = List.cross(List.linfty, l);
    // The parameter is the point at infinity, without its last coordinate.
    return List.normalizeMax(dir);
};
geoOps.Through.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.Through.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.Through.updatePosition = function(el) {
    var dir = getStateComplexVector(3);
    putStateComplexVector(dir); // copy param
    var p1 = csgeo.csnames[el.args[0]].homog;
    var homog = List.cross(p1, dir);
    homog = List.normalizeMax(homog);
    el.homog = General.withUsage(homog, "Line");
};
geoOps.Through.stateSize = 6;
geoOps.Through.set_angle = function(el, value) {
    if (value.ctype === "number") {
        var cc = CSNumber.cos(value);
        var ss = CSNumber.sin(value);
        var dir = List.turnIntoCSList([cc, ss, CSNumber.real(0)]);
        movepointscr(el, dir, "dir");
    }
};
geoOps.Through.set_slope = function(el, value) {
    if (value.ctype === "number") {
        var dir = List.turnIntoCSList(
            [CSNumber.real(1), value, CSNumber.real(0)]);
        movepointscr(el, dir, "dir");
    }
};


geoOps.Free = {};
geoOps.Free.kind = "P";
geoOps.Free.signature = [];
geoOps.Free.isMovable = true;
geoOps.Free.initialize = function(el) {
    var pos = geoOps._helper.initializePoint(el);
    putStateComplexVector(pos);
};
geoOps.Free.getParamForInput = function(el, pos, type) {
    if (type === "mouse" && cssnap && csgridsize !== 0) {
        pos = List.normalizeZ(pos);
        var sx = pos.value[0].value.real;
        var sy = pos.value[1].value.real;
        var rx = Math.round(sx / csgridsize) * csgridsize;
        var ry = Math.round(sy / csgridsize) * csgridsize;
        if (Math.abs(rx - sx) < 0.2 && Math.abs(ry - sy) < 0.2) {
            pos = List.realVector([rx, ry, 1]);
        }
    }
    return List.normalizeMax(pos);
};
geoOps.Free.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.Free.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.Free.updatePosition = function(el) {
    var param = getStateComplexVector(3);
    putStateComplexVector(param); // copy param
    el.homog = General.withUsage(param, "Point");
};
geoOps.Free.stateSize = 6;

geoOps._helper.projectPointToLine = function(point, line) {
    var tt = List.turnIntoCSList([line.value[0], line.value[1], CSNumber.zero]);
    var perp = List.cross(tt, point);
    return List.normalizeMax(List.cross(perp, line));
};

geoOps.PointOnLine = {};
geoOps.PointOnLine.kind = "P";
geoOps.PointOnLine.signature = ["L"];
geoOps.PointOnLine.isMovable = true;
geoOps.PointOnLine.initialize = function(el) {
    var point = geoOps._helper.initializePoint(el);
    var line = csgeo.csnames[(el.args[0])].homog;
    point = geoOps._helper.projectPointToLine(point, line);
    point = List.normalizeMax(point);
    var other = List.cross(List.linfty, point);
    other = List.normalizeMax(other);
    putStateComplexVector(point);
    putStateComplexVector(line);
    tracingInitial = false; // force updatePosition to do proper matching
};
geoOps.PointOnLine.updatePosition = function(el, isMover) {
    var newPoint;
    var newLine = csgeo.csnames[(el.args[0])].homog;
    var oldPoint = getStateComplexVector(3);
    var oldLine = getStateComplexVector(3);

    if (isMover) {
        newPoint = oldPoint;
    } else {
        // Also read from last good, which is real,
        // instead of only stateIn which might be complex.
        stateInIdx = el.stateIdx;
        var tmpIn = stateIn;
        stateIn = stateLastGood;
        var realPoint = getStateComplexVector(3);
        var realLine = getStateComplexVector(3);
        stateIn = tmpIn;

        var center = List.cross(realLine, newLine);
        //if (CSNumber._helper.isAlmostZero(List.scalproduct(newLine, realPoint))) {
        if (List._helper.isAlmostZero(center)) {
            // line stayed (almost) the same, perform orthogonal projection
            center = List.cross(List.linfty, newLine);
        }
        // Note: center is NOT continuous in the parameter,
        // so refinements might cause it to jump between situations.
        // But refinement will bring lines close to one another,
        // in which case the exact location of center becomes less relevant
        var circle = geoOps._helper.CircleMP(center, realPoint);
        var newCandidates = geoOps._helper.IntersectLC(newLine, circle);
        var oldAntipode = geoOps._helper.pointReflection(center, oldPoint);
        var res = tracing2core(
            newCandidates[0], newCandidates[1],
            oldPoint, oldAntipode);
        newPoint = res[0];
    }
    newPoint = List.normalizeMax(newPoint);
    putStateComplexVector(newPoint);
    putStateComplexVector(newLine);
    el.homog = General.withUsage(newPoint, "Point");
};
geoOps.PointOnLine.getParamForInput = function(el, pos, type) {
    var line = csgeo.csnames[(el.args[0])].homog;
    pos = geoOps._helper.projectPointToLine(pos, line);
    if (type === "mouse" && cssnap && csgridsize !== 0) {
        pos = geoOps._helper.snapPointToLine(pos, line);
    }
    return pos;
};
geoOps.PointOnLine.getParamFromState = function(el) {
    return getStateComplexVector(3); // point is first state element
};
geoOps.PointOnLine.putParamToState = function(el, param) {
    return putStateComplexVector(param);
};
geoOps.PointOnLine.stateSize = 12;


geoOps.PointOnCircle = {};
geoOps.PointOnCircle.kind = "P";
geoOps.PointOnCircle.signature = ["C"];
geoOps.PointOnCircle.isMovable = true;
geoOps.PointOnCircle.initialize = function(el) {
    var circle = csgeo.csnames[el.args[0]];
    var pos = List.normalizeZ(geoOps._helper.initializePoint(el));
    var mid = List.normalizeZ(geoOps._helper.CenterOfCircle(circle.matrix));
    var dir = List.sub(pos, mid);
    var param = List.turnIntoCSList([
        dir.value[1],
        CSNumber.neg(dir.value[0]),
        CSNumber.zero
    ]);
    // The parameter is the far point polar to the diameter through the point
    var diameter = List.cross(pos, mid);
    var candidates = geoOps._helper.IntersectLC(diameter, circle.matrix);
    var d0 = List.projectiveDistMinScal(pos, candidates[0]);
    var d1 = List.projectiveDistMinScal(pos, candidates[1]);
    var other;
    if (d1 < d0) {
        pos = candidates[1];
        other = candidates[0];
    } else {
        pos = candidates[0];
        other = candidates[1];
    }
    putStateComplexVector(param);
    putStateComplexVector(pos);
    putStateComplexVector(other);
    tracingInitial = false; // force updatePosition to do proper matching
};
geoOps.PointOnCircle.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.PointOnCircle.getParamFromState = function(el) {
    return getStateComplexVector(3);
};
geoOps.PointOnCircle.getParamForInput = function(el, pos, type) {
    var circle = csgeo.csnames[el.args[0]];
    var mid = List.normalizeZ(geoOps._helper.CenterOfCircle(circle.matrix));
    var dir = List.sub(pos, mid);
    stateInIdx = el.stateIdx;
    var oldparam = getStateComplexVector(3);
    var oldpos = List.normalizeZ(getStateComplexVector(3));
    var olddir = List.sub(oldpos, mid);
    var oldSign = CSNumber.sub(
        CSNumber.mult(oldparam.value[0], olddir.value[1]),
        CSNumber.mult(oldparam.value[1], olddir.value[0]));
    if (oldSign.value.real < 0)
        dir = List.neg(dir);
    // if oldSign > 0 then oldparam[0], oldparam[1]
    // is a positive multiple of olddir[1], -olddir[0]
    return List.turnIntoCSList([
        dir.value[1],
        CSNumber.neg(dir.value[0]),
        CSNumber.zero
    ]);
};
geoOps.PointOnCircle.parameterPath = function(el, tr, tc, src, dst) {
    src = List.normalizeAbs(src);
    dst = List.normalizeAbs(dst);
    var sp = List.scalproduct(src, dst);
    if (sp.value.real >= 0)
        return defaultParameterPath(el, tr, tc, src, dst);
    // If we have more than half a turn, do two half-circle arcs
    // with a real position half way along the path.
    // This should ensure we get to the far intersection point when needed.
    var mid = List.turnIntoCSList([
        CSNumber.sub(src.value[1], dst.value[1]),
        CSNumber.sub(dst.value[0], src.value[0]),
        CSNumber.zero
    ]);
    sp = List.scalproduct(src, mid);
    if (sp.value.real < 0)
        mid = List.neg(mid);
    var t2, dt;
    if (tr < 0) {
        tr = 2 * tr + 1;
        t2 = tr * tr;
        dt = 0.25 / (1 + t2);
        tc = CSNumber.complex((2 * tr) * dt + 0.25, (1 - t2) * dt);
    } else {
        tr = 2 * tr - 1;
        t2 = tr * tr;
        dt = 0.25 / (1 + t2);
        tc = CSNumber.complex((2 * tr) * dt + 0.75, (1 - t2) * dt);
    }
    var uc = CSNumber.sub(CSNumber.real(1), tc);
    var tc2 = CSNumber.mult(tc, tc);
    var uc2 = CSNumber.mult(uc, uc);
    var tuc = CSNumber.mult(tc, uc);
    var res = List.scalmult(uc2, src);
    res = List.add(res, List.scalmult(tuc, mid));
    res = List.add(res, List.scalmult(tc2, dst));
    return res;
};
geoOps.PointOnCircle.updatePosition = function(el) {
    var param = getStateComplexVector(3);
    putStateComplexVector(param); // copy parameter
    var circle = csgeo.csnames[el.args[0]];
    var diameter = List.productMV(circle.matrix, param);
    var candidates = geoOps._helper.IntersectLC(diameter, circle.matrix);
    candidates = tracing2(candidates[0], candidates[1]);
    var pos = List.normalizeMax(candidates.value[0]);
    el.homog = General.withUsage(pos, "Point");
    el.antipodalPoint = candidates.value[1];
};
geoOps.PointOnCircle.stateSize = 6 + tracing2.stateSize;

geoOps.OtherPointOnCircle = {};
geoOps.OtherPointOnCircle.kind = "P";
geoOps.OtherPointOnCircle.signature = ["P"];
geoOps.OtherPointOnCircle.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[0]].type === "PointOnCircle";
};
geoOps.OtherPointOnCircle.updatePosition = function(el) {
    var first = csgeo.csnames[el.args[0]];
    var pos = first.antipodalPoint;
    pos = List.normalizeMax(pos);
    el.homog = General.withUsage(pos, "Point");
};

geoOps.PointOnSegment = {};
geoOps.PointOnSegment.kind = "P";
geoOps.PointOnSegment.signature = ["S"];
geoOps.PointOnSegment.isMovable = true;
geoOps.PointOnSegment.initialize = function(el) {
    var pos = geoOps._helper.initializePoint(el);
    var cr = geoOps.PointOnSegment.getParamForInput(el, pos);
    putStateComplexNumber(cr);
};
geoOps.PointOnSegment.getParamForInput = function(el, pos, type) {
    var seg = csgeo.csnames[el.args[0]];
    var line = seg.homog;

    // snap to grid
    if (type === "mouse" && cssnap && csgridsize !== 0) {
        pos = geoOps._helper.snapPointToLine(pos, line);
    }

    var tt = List.turnIntoCSList([line.value[0], line.value[1], CSNumber.zero]);
    var farpoint = List.sub(seg.startpos, seg.endpos);
    var cr = List.crossratio3(
        farpoint, seg.startpos, seg.endpos, pos, tt);
    if (cr.value.real < 0)
        cr = CSNumber.complex(0, cr.value.imag);
    if (cr.value.real > 1)
        cr = CSNumber.complex(1, cr.value.imag);
    return cr;
};
geoOps.PointOnSegment.getParamFromState = function(el) {
    return getStateComplexNumber();
};
geoOps.PointOnSegment.putParamToState = function(el, param) {
    putStateComplexNumber(param);
};
geoOps.PointOnSegment.updatePosition = function(el) {
    var param = getStateComplexNumber();
    putStateComplexNumber(param); // copy parameter
    var seg = csgeo.csnames[el.args[0]];
    var start = seg.startpos;
    var end = seg.endpos;
    var far = List.sub(end, start);
    var homog = List.add(start, List.scalmult(param, far));
    homog = List.normalizeMax(homog);
    el.homog = General.withUsage(homog, "Point");
};
geoOps.PointOnSegment.stateSize = 2;

geoOps._helper.projectPointToCircle = function(cir, P) {
    var cen = geoOps._helper.CenterOfCircle(cir.matrix);
    cen = List.normalizeMax(cen);
    var l = List.normalizeMax(List.cross(P, cen));
    var isec = geoOps._helper.IntersectLC(l, cir.matrix);
    var d1 = List.projectiveDistMinScal(P, isec[0]);
    var d2 = List.projectiveDistMinScal(P, isec[1]);
    var erg = d1 < d2 ? isec[0] : isec[1];
    return erg;
};

geoOps.PointOnArc = {};
geoOps.PointOnArc.kind = "P";
geoOps.PointOnArc.signature = ["C"];
geoOps.PointOnArc.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[0]].isArc;
};
geoOps.PointOnArc.isMovable = true;
geoOps.PointOnArc.initialize = function(el) {
    var pos = geoOps._helper.initializePoint(el);
    var cr = geoOps.PointOnArc.getParamForInput(el, pos);
    putStateComplexVector(cr);
};
geoOps.PointOnArc.getParamForInput = function(el, pos) {
    var arc = csgeo.csnames[el.args[0]];
    var P = geoOps._helper.projectPointToCircle(arc, pos);
    var A = arc.startPoint;
    var B = arc.viaPoint;
    var C = arc.endPoint;
    var crh = List.normalizeMax(List.crossratio3harm(A, C, B, P, List.ii));
    // Now restrict cross ratio to the range [0,∞]
    var cr = CSNumber.div(crh.value[0], crh.value[1]);
    if (cr.value.real < 0) {
        if (cr.value.real < -1) {
            crh = List.realVector([1, 0]); // ∞, use end point
        } else {
            crh = List.realVector([0, 1]); // 0, use start point
        }
    }
    return crh;
};
geoOps.PointOnArc.getParamFromState = function(el) {
    return getStateComplexVector(2);
};
geoOps.PointOnArc.putParamToState = function(el, param) {
    putStateComplexVector(param);
};
geoOps.PointOnArc.updatePosition = function(el) {
    var arc = csgeo.csnames[el.args[0]];
    var A = arc.startPoint;
    var B = arc.viaPoint;
    var C = arc.endPoint;
    var I = List.ii;
    var AI = List.cross(A, I);
    var BI = List.cross(B, I);
    var CI = List.cross(C, I);
    // Now we want to scale AI and CI such that λ⋅BI = AI + CI.
    // a*AI + c*CI = BI => [AI, CI]*(a,c) = BI but [AI, CI] is not square so
    // we solve this least-squares-style (see Moore-Penrose pseudoinverse),
    // multiplying both sides by M2x3c and then using the adjoint to solve.
    var M2x3 = List.turnIntoCSList([AI, CI]);
    var M3x2 = List.transpose(M2x3);
    var M2x3c = List.conjugate(M2x3);
    var M2x2 = List.productMM(M2x3c, M3x2);
    var v2x1 = List.productMV(M2x3c, BI);
    var ab = List.productMV(List.adjoint2(M2x2), v2x1);
    var a = ab.value[0];
    var c = ab.value[1];
    var crh = getStateComplexVector(2);
    putStateComplexVector(crh);
    var Q = List.normalizeMax(List.add(
        List.scalmult(CSNumber.mult(a, crh.value[0]), A),
        List.scalmult(CSNumber.mult(c, crh.value[1]), C)));
    var P = geoOps._helper.conicOtherIntersection(arc.matrix, I, Q);
    el.homog = General.withUsage(P, "Point");
};
geoOps.PointOnArc.stateSize = 4;

geoOps._helper.CenterOfCircle = function(c) {
    // Treating this special case of CenterOfConic avoids some computation
    // and also allows dealing with the degenerate case of center at infinity
    return List.turnIntoCSList([
        c.value[2].value[0],
        c.value[2].value[1],
        CSNumber.neg(c.value[0].value[0])
    ]);
};

geoOps._helper.CenterOfConic = function(c) {
    // The center is the pole of the dual conic of the line at infinity
    var adj = List.adjoint3(c);
    // return General.mult(adj, List.linfty);
    // do not use matrix vector multiplication, we know the result
    return {
        'ctype': 'list',
        'value': [adj.value[2].value[0], adj.value[2].value[1], adj.value[2].value[2]]
    };
};

geoOps.CenterOfConic = {};
geoOps.CenterOfConic.kind = "P";
geoOps.CenterOfConic.signature = ["C"];
geoOps.CenterOfConic.updatePosition = function(el) {
    var c = csgeo.csnames[(el.args[0])].matrix;
    var erg = geoOps._helper.CenterOfConic(c);
    el.homog = erg;
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Point");
};

geoOps._helper.CircleMP = function(m, p) {
    var x = m.value[0];
    var y = m.value[1];
    var mz = CSNumber.neg(m.value[2]);
    var zero = CSNumber.zero;
    var tang = List.turnIntoCSList([
        List.turnIntoCSList([mz, zero, x]),
        List.turnIntoCSList([zero, mz, y]),
        List.turnIntoCSList([x, y, zero]),
    ]);
    var mu = General.mult(General.mult(p, tang), p);
    var la = General.mult(General.mult(p, List.fund), p);
    var m1 = General.mult(mu, List.fund);
    var m2 = General.mult(la, tang);
    var erg = List.sub(m1, m2);
    return erg;
};

geoOps.CircleMP = {};
geoOps.CircleMP.kind = "C";
geoOps.CircleMP.signature = ["P", "P"];
geoOps.CircleMP.updatePosition = function(el) { //TODO Performance Checken. Das ist jetzt der volle CK-ansatz
    //Weniger Allgemein geht das viiiiel schneller
    var m = csgeo.csnames[(el.args[0])].homog;
    var p = csgeo.csnames[(el.args[1])].homog;
    el.matrix = geoOps._helper.CircleMP(m, p);
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Circle");

};


geoOps.CircleMr = {};
geoOps.CircleMr.kind = "C";
geoOps.CircleMr.signature = ["P"];
geoOps.CircleMr.isMovable = true;
geoOps.CircleMr.initialize = function(el) {
    putStateComplexNumber(CSNumber.real(el.radius));
};
geoOps.CircleMr.getParamForInput = function(el, pos, type) {
    if (type === "radius") return pos;
    var m = csgeo.csnames[(el.args[0])].homog;
    m = List.normalizeZ(m);
    pos = List.normalizeZ(pos);
    var rad = List.sub(m, pos);
    rad = List.abs(rad);
    return rad;
};
geoOps.CircleMr.getParamFromState = function(el) {
    return getStateComplexNumber();
};
geoOps.CircleMr.putParamToState = function(el, param) {
    putStateComplexNumber(param);
};
geoOps.CircleMr.updatePosition = function(el) {
    var r = getStateComplexNumber();
    putStateComplexNumber(r); // copy param
    var m = csgeo.csnames[(el.args[0])].homog;
    /*
    The circle's radius value may take on values from zero to infinity.
    However since the squared radius value appears in the circle's matrix,
    a radius value of 2E+154 or more could also end up as an infinite value.
    Using List.normalizeMax elsewhere will limit the coordinate values of m
    to no more than 1.0, so that scaling the radius value by m's z-coordinate
    first here will not make the radius value any larger. Then by squaring the
    radius value, any infinity value produced can be caught here.
    */
    var sr = CSNumber.mult(m.value[2], r);
    var sr2 = CSNumber.mult(sr, sr);
    if (!CSNumber._helper.isFinite(sr2) && !CSNumber._helper.isNaN(sr2)) return List.fund;
    var matrix = geoOps._helper.ScaledCircleMrr(m, sr2);
    el.matrix = General.withUsage(matrix, "Circle");
    el.radius = r;
};
geoOps.CircleMr.stateSize = 2;
geoOps.CircleMr.set_radius = function(el, value) {
    if (value.ctype === "number") {
        movepointscr(el, value, "radius");
    }
};


geoOps._helper.ScaledCircleMrr = function(M, rr) {
    /*
    Given M as the circle's homogeneous center point coordinates [x, y, z] and
    rr as the circle's radius value squared scaled by M's z-coordinate squared,
    build the following matrix:
        ⎛   z*z      0      -z*x   ⎞
        ⎜    0      z*z     -z*y   ⎟
        ⎝  -z*x    -z*y  x*x+y*y-rr⎠
    */
    var x = M.value[0];
    var y = M.value[1];
    var mz = CSNumber.neg(M.value[2]); // minus z
    var v = List.scalmult(mz, List.turnIntoCSList([x, y, mz])).value;
    var vxy = List.turnIntoCSList([x, y]);
    var zz = CSNumber.sub(List.scalproduct(vxy, vxy), rr);
    var matrix = geoOps._helper.buildConicMatrix([v[2], CSNumber.zero, v[2], v[0], v[1], zz]);
    return List.normalizeMax(matrix);
};


geoOps.Compass = {};
geoOps.Compass.kind = "C";
geoOps.Compass.signature = ["P", "P", "P"];
geoOps.Compass.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var m = csgeo.csnames[(el.args[2])].homog;
    // Scale each point's homogeneous coordinates by the other two
    // point's z-value to allow addtion and subtraction to be valid.
    var aZ = a.value[2];
    var bZ = b.value[2];
    var mZ = m.value[2];
    a = List.scalmult(CSNumber.mult(bZ, mZ), a);
    b = List.scalmult(CSNumber.mult(aZ, mZ), b);
    m = List.scalmult(CSNumber.mult(aZ, bZ), m);
    // Setup circle's matrix with m as center and segment ab length as radius
    var d = List.sub(b, a);
    var matrix = geoOps._helper.ScaledCircleMrr(m, List.scalproduct(d, d));
    el.matrix = General.withUsage(matrix, "Circle");
};


geoOps._helper.getConicType = function(C) {
    var myEps = 1e-16;
    var adet = CSNumber.abs(List.det(C));

    if (adet.value.real < myEps) {
        return "degenerate";
    }

    var det = CSNumber.mult(C.value[0].value[0], C.value[1].value[1]);
    det = CSNumber.sub(det, CSNumber.pow(C.value[0].value[1], CSNumber.real(2)));

    det = det.value.real;

    if (Math.abs(det) < myEps) {
        return "parabola";
    } else if (det > myEps) {
        return "ellipsoid";
    } else {
        return "hyperbola";
    }
};


geoOps._helper.ConicBy5 = function(el, a, b, c, d, p) {

    var v23 = List.turnIntoCSList([List.cross(b, c)]);
    var v14 = List.turnIntoCSList([List.cross(a, d)]);
    var v12 = List.turnIntoCSList([List.cross(a, b)]);
    var v34 = List.turnIntoCSList([List.cross(c, d)]);

    var erg = geoOps._helper.conicFromTwoDegenerates(v23, v14, v12, v34, p);
    return erg;
};

geoOps._helper.conicFromTwoDegenerates = function(v23, v14, v12, v34, p) {
    var deg1 = General.mult(List.transpose(v14), v23);
    var deg2 = General.mult(List.transpose(v34), v12);
    deg1 = List.add(deg1, List.transpose(deg1));
    deg2 = List.add(deg2, List.transpose(deg2));
    var mu = General.mult(General.mult(p, deg1), p);
    var la = General.mult(General.mult(p, deg2), p);
    var m1 = General.mult(mu, deg2);
    var m2 = General.mult(la, deg1);

    var erg = List.sub(m1, m2);
    return erg;
};


geoOps.ConicBy5 = {};
geoOps.ConicBy5.kind = "C";
geoOps.ConicBy5.signature = ["P", "P", "P", "P", "P"];
geoOps.ConicBy5.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var c = csgeo.csnames[(el.args[2])].homog;
    var d = csgeo.csnames[(el.args[3])].homog;
    var p = csgeo.csnames[(el.args[4])].homog;

    var erg = geoOps._helper.ConicBy5(el, a, b, c, d, p);

    el.matrix = erg;
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Conic");
};

geoOps.FreeConic = {};
geoOps.FreeConic.kind = "C";
geoOps.FreeConic.signature = [];
geoOps.FreeConic.initialize = function(el) {
    var pos;
    if (el.pos)
        pos = geoOps._helper.inputConic(el.pos);
    else
        pos = List.zeromatrix(CSNumber.real(3), CSNumber.real(3));
    geoOps.FreeConic.putParamToState(el, pos);
};
geoOps.FreeConic.getParamForInput = function(el, pos, type) {
    return List.normalizeMax(pos);
};
geoOps.FreeConic.getParamFromState = function(el) {
    return geoOps._helper.buildConicMatrix(getStateComplexVector(6).value);
};
geoOps.FreeConic.putParamToState = function(el, param) {
    for (var i = 0; i < 3; ++i)
        for (var j = 0; j <= i; ++j)
            putStateComplexNumber(param.value[i].value[j]);
};
geoOps.FreeConic.updatePosition = function(el) {
    var pos = getStateComplexVector(6);
    putStateComplexVector(pos);
    el.matrix = geoOps._helper.buildConicMatrix(pos.value);
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Conic");
};
geoOps.FreeConic.set_matrix = function(el, value) {
    if (List._helper.isNumberMatrixMN(value, 3, 3))
        movepointscr(el, List.add(value, List.transpose(value)), "matrix");
};
geoOps.FreeConic.stateSize = 6 * 2;

geoOps._helper.buildConicMatrix = function(arr) {
    var a = arr[0];
    var b = arr[1];
    var c = arr[2];
    var d = arr[3];
    var e = arr[4];
    var f = arr[5];

    var M = List.turnIntoCSList([
        List.turnIntoCSList([a, b, d]),
        List.turnIntoCSList([b, c, e]),
        List.turnIntoCSList([d, e, f])
    ]);
    return M;
};

geoOps._helper.splitDegenConic = function(mat) {
    var adj_mat = List.adjoint3(mat);

    var idx = 0;
    var k, l, abs2;
    var max = CSNumber.abs2(adj_mat.value[0].value[0]).value.real;
    for (k = 1; k < 3; k++) {
        abs2 = CSNumber.abs2(adj_mat.value[k].value[k]).value.real;
        if (abs2 > max) {
            idx = k;
            max = abs2;
        }
    }

    var beta = CSNumber.sqrt(CSNumber.mult(CSNumber.real(-1), adj_mat.value[idx].value[idx]));
    if (CSNumber.abs2(beta).value.real < 1e-16) {
        var zeros = List.turnIntoCSList([
            CSNumber.zero, CSNumber.zero, CSNumber.zero
        ]);
        return [zeros, zeros];
    }
    idx = CSNumber.real(idx + 1);
    var p = List.column(adj_mat, idx);

    p = List.scaldiv(beta, p);


    var lam = p.value[0],
        mu = p.value[1],
        tau = p.value[2];
    var M = List.turnIntoCSList([
        List.turnIntoCSList([CSNumber.real(0), tau, CSNumber.mult(CSNumber.real(-1), mu)]),
        List.turnIntoCSList([CSNumber.mult(CSNumber.real(-1), tau), CSNumber.real(0), lam]),
        List.turnIntoCSList([mu, CSNumber.mult(CSNumber.real(-1), lam), CSNumber.real(0)])
    ]);


    var C = List.add(mat, M);

    // get nonzero index
    var ii = 0;
    var jj = 0;
    max = 0;
    for (k = 0; k < 3; k++)
        for (l = 0; l < 3; l++) {
            abs2 = CSNumber.abs2(C.value[k].value[l]).value.real;
            if (abs2 > max) {
                ii = k;
                jj = l;
                max = abs2;
            }
        }


    var lg = C.value[ii];
    C = List.transpose(C);
    var lh = C.value[jj];
    lg = List.normalizeMax(lg);
    lh = List.normalizeMax(lh);

    lg = General.withUsage(lg, "Line");
    lh = General.withUsage(lh, "Line");


    return [lg, lh];
};

geoOps._helper.inputConic = function(pos) {
    var v = "xx xy yy xz yz zz".split(" ").map(function(name) {
        var num = CSNumber._helper.input(pos[name]);
        if (name[0] !== name[1]) num = CSNumber.realmult(0.5, num);
        return num;
    });
    return geoOps._helper.buildConicMatrix(v);
};

geoOps.SelectConic = {};
geoOps.SelectConic.kind = "C";
geoOps.SelectConic.signature = ["Cs"];
geoOps.SelectConic.initialize = function(el) {
    if (el.index !== undefined)
        return el.index - 1;
    var pos = geoOps._helper.inputConic(el.pos);
    var set = csgeo.csnames[(el.args[0])].results;
    var d1 = List.conicDist(pos, set[0]);
    var best = 0;
    for (var i = 1; i < set.length; ++i) {
        var d2 = List.conicDist(pos, set[i]);
        if (d2 < d1) {
            d1 = d2;
            best = i;
        }
    }
    return best;
};
geoOps.SelectConic.updatePosition = function(el) {
    var set = csgeo.csnames[(el.args[0])];
    el.matrix = set.results[el.param];
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Conic");
};

// conic by 4 Points and 1 line
geoOps._helper.ConicBy4p1l = function(el, a, b, c, d, l) {
    var al = List.scalproduct(a, l);
    var bl = List.scalproduct(b, l);
    var cl = List.scalproduct(c, l);
    var dl = List.scalproduct(d, l);
    var bcd = List.det3(b, c, d);
    var abd = List.det3(a, b, d);
    var acd = List.det3(a, c, d);
    var abc = List.det3(a, b, c);
    var mul = CSNumber.mult;
    var r1 = CSNumber.sqrt(mul(mul(bl, dl), mul(bcd, abd)));
    var r2 = CSNumber.sqrt(mul(mul(al, cl), mul(acd, abc)));
    var a1 = List.cross(List.cross(a, c), l);
    var a2 = List.cross(List.cross(b, d), l);
    var k1 = List.scalmult(r1, a1);
    var k2 = List.scalmult(r2, a2);
    var x = List.normalizeMax(List.add(k1, k2));
    var y = List.normalizeMax(List.sub(k1, k2));
    var xy = tracing2(x, y);
    var t1 = geoOps._helper.ConicBy5(el, a, b, c, d, xy.value[0]);
    var t2 = geoOps._helper.ConicBy5(el, a, b, c, d, xy.value[1]);
    return [List.normalizeMax(t1), List.normalizeMax(t2)];
};

geoOps.ConicBy4p1l = {};
geoOps.ConicBy4p1l.kind = "Cs";
geoOps.ConicBy4p1l.signature = ["P", "P", "P", "P", "L"];
geoOps.ConicBy4p1l.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var c = csgeo.csnames[(el.args[2])].homog;
    var d = csgeo.csnames[(el.args[3])].homog;

    var l = csgeo.csnames[(el.args[4])].homog;

    var erg = geoOps._helper.ConicBy4p1l(el, a, b, c, d, l);

    el.results = erg;

};
geoOps.ConicBy4p1l.stateSize = tracing2.stateSize;


geoOps._helper.ConicBy3p2l = function(a, b, c, g, h) {
    // see http://math.stackexchange.com/a/1187525/35416
    var l = List.cross(a, b);
    var gh = List.cross(g, h);
    var gl = List.cross(g, l);
    var hl = List.cross(h, l);
    var m1 = List.turnIntoCSList([gl, hl, gh]);
    var s1 = List.productVM(c, List.adjoint3(m1));
    var m2 = List.adjoint3(List.turnIntoCSList([
        List.scalmult(s1.value[0], gl),
        List.scalmult(s1.value[1], hl),
        List.scalmult(s1.value[2], gh)
    ]));
    var m3 = List.transpose(m2);
    var mul = CSNumber.mult;
    var aa = List.productMV(m3, a);
    var a1 = aa.value[0];
    var a2 = aa.value[1];
    var bb = List.productMV(m3, b);
    var b1 = bb.value[0];
    var b2 = bb.value[1];
    // assert: aa.value[2] and bb.value[2] are zero

    var a3a = CSNumber.sqrt(mul(a1, a2));
    var b3a = CSNumber.sqrt(mul(b1, b2));
    var signs, res = new Array(4);
    for (signs = 0; signs < 4; ++signs) {
        var sa = ((signs & 1) << 1) - 1;
        var sb = (signs & 2) - 1;
        var a3 = mul(CSNumber.real(sa), a3a);
        var b3 = mul(CSNumber.real(sb), b3a);
        var p1 = det2(a2, a3, b2, b3);
        var p2 = det2(b1, b3, a1, a3);
        var p3 = det2(a1, a2, b1, b2);
        var p4 = CSNumber.add(
            CSNumber.add(
                det2(b1, b2, a1, a2),
                det2(b2, b3, a2, a3)),
            det2(b3, b1, a3, a1));
        var xx = mul(p1, p1);
        var yy = mul(p2, p2);
        var zz = mul(p4, p4);
        var xy = mul(p1, p2);
        var xz = mul(p1, p4);
        var yz = mul(p2, p4);
        xy = CSNumber.sub(xy, mul(CSNumber.real(0.5), mul(p3, p3)));
        var mm = List.turnIntoCSList([
            List.turnIntoCSList([xx, xy, xz]),
            List.turnIntoCSList([xy, yy, yz]),
            List.turnIntoCSList([xz, yz, zz])
        ]);
        mm = List.productMM(m2, List.productMM(mm, m3));
        var vv = List.turnIntoCSList([
            mm.value[0].value[0],
            mm.value[0].value[1],
            mm.value[0].value[2],
            mm.value[1].value[1],
            mm.value[1].value[2],
            mm.value[2].value[2]
        ]);
        res[signs] = vv;
    }
    return res;

    function det2(a, b, c, d) {
        return CSNumber.sub(CSNumber.mult(a, d), CSNumber.mult(b, c));
    }
};

geoOps.ConicBy3p2l = {};
geoOps.ConicBy3p2l.kind = "Cs";
geoOps.ConicBy3p2l.signature = ["P", "P", "P", "L", "L"];
geoOps.ConicBy3p2l.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var c = csgeo.csnames[(el.args[2])].homog;
    var g = csgeo.csnames[(el.args[3])].homog;
    var h = csgeo.csnames[(el.args[4])].homog;
    var newVecs = geoOps._helper.ConicBy3p2l(a, b, c, g, h);
    newVecs = tracingSesq(newVecs);
    var res = new Array(4);
    for (var i = 0; i < 4; ++i) {
        var v = newVecs[i].value;
        res[i] = List.turnIntoCSList([
            List.turnIntoCSList([v[0], v[1], v[2]]),
            List.turnIntoCSList([v[1], v[3], v[4]]),
            List.turnIntoCSList([v[2], v[4], v[5]])
        ]);
    }
    el.results = res;
};
geoOps.ConicBy3p2l.stateSize = 48;

geoOps.ConicBy2p3l = {};
geoOps.ConicBy2p3l.kind = "Cs";
geoOps.ConicBy2p3l.signature = ["P", "P", "L", "L", "L"];
geoOps.ConicBy2p3l.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var g = csgeo.csnames[(el.args[2])].homog;
    var h = csgeo.csnames[(el.args[3])].homog;
    var l = csgeo.csnames[(el.args[4])].homog;
    var oldVecs = el.tracing;
    var newVecs = geoOps._helper.ConicBy3p2l(g, h, l, a, b);
    newVecs = tracingSesq(newVecs);
    var res = new Array(4);
    for (var i = 0; i < 4; ++i) {
        var v = newVecs[i].value;
        var dual = List.turnIntoCSList([
            List.turnIntoCSList([v[0], v[1], v[2]]),
            List.turnIntoCSList([v[1], v[3], v[4]]),
            List.turnIntoCSList([v[2], v[4], v[5]])
        ]);
        res[i] = List.normalizeMax(List.adjoint3(dual));
    }
    el.results = res;
};
geoOps.ConicBy2p3l.stateSize = 48;

geoOps.ConicBy1p4l = {};
geoOps.ConicBy1p4l.kind = "Cs";
geoOps.ConicBy1p4l.signature = ["P", "L", "L", "L", "L"];
geoOps.ConicBy1p4l.updatePosition = function(el) {
    var p = csgeo.csnames[(el.args[0])].homog;
    var l1 = csgeo.csnames[(el.args[1])].homog;
    var l2 = csgeo.csnames[(el.args[2])].homog;
    var l3 = csgeo.csnames[(el.args[3])].homog;
    var l4 = csgeo.csnames[(el.args[4])].homog;


    var erg = geoOps._helper.ConicBy4p1l(el, l1, l2, l3, l4, p);
    var t1 = erg[0];
    var t2 = erg[1];
    t1 = List.adjoint3(t1);
    t2 = List.adjoint3(t2);

    erg = [t1, t2];
    el.results = erg;

};
geoOps.ConicBy1p4l.stateSize = tracing2.stateSize;

geoOps.ConicParabolaPL = {};
geoOps.ConicParabolaPL.kind = "C";
geoOps.ConicParabolaPL.signature = ["P", "L"];
geoOps.ConicParabolaPL.updatePosition = function(el) {
    var F = csgeo.csnames[(el.args[0])].homog.value; // focus point
    var d = csgeo.csnames[(el.args[1])].homog.value; // directrix line
    /* Desired outcome:
     * [[Fz^2*dy^2, -Fz^2*dx*dy, -(Fx*dx^2 + Fx*dy^2 + Fz*dx*dz)*Fz],
     *  [-Fz^2*dx*dy, Fz^2*dx^2, -(Fy*dx^2 + Fy*dy^2 + Fz*dy*dz)*Fz],
     *  [-(Fx*dx^2 + Fx*dy^2 + Fz*dx*dz)*Fz,
     *   -(Fy*dx^2 + Fy*dy^2 + Fz*dy*dz)*Fz,
     *   Fx^2*dx^2 + Fy^2*dx^2 + Fx^2*dy^2 + Fy^2*dy^2 - Fz^2*dz^2]]
     * For derivation see https://github.com/CindyJS/CindyJS/pull/126
     * or http://math.stackexchange.com/a/1557496/35416
     * or https://gist.github.com/gagern/5a1d6d4663c3da6f52dd
     */
    var mult = CSNumber.mult;
    var neg = CSNumber.neg;
    var add = CSNumber.add;
    var sub = CSNumber.sub;
    var Fx = F[0];
    var Fy = F[1];
    var Fz = F[2];
    var dx = d[0];
    var dy = d[1];
    var dz = d[2];
    var Fz2 = mult(Fz, Fz);
    var dx2 = mult(dx, dx);
    var dy2 = mult(dy, dy);
    var Fzdz = mult(Fz, dz);
    var nFz = neg(Fz);
    var dx2pdy2 = add(dx2, dy2);
    var xx = mult(Fz2, dy2);
    var yy = mult(Fz2, dx2);
    var xy = mult(neg(Fz2), mult(dx, dy));
    var xz = mult(nFz, add(mult(Fx, dx2pdy2), mult(Fzdz, dx)));
    var yz = mult(nFz, add(mult(Fy, dx2pdy2), mult(Fzdz, dy)));
    var zz = sub(
        mult(add(mult(Fx, Fx), mult(Fy, Fy)), dx2pdy2),
        mult(Fz2, mult(dz, dz)));
    var m = geoOps._helper.buildConicMatrix([xx, xy, yy, xz, yz, zz]);
    m = List.normalizeMax(m);
    el.matrix = General.withUsage(m, "Conic");
};

geoOps.ConicBy2Foci1P = {};
geoOps.ConicBy2Foci1P.kind = "Cs";
geoOps.ConicBy2Foci1P.signature = ["P", "P", "P"];
geoOps.ConicBy2Foci1P.updatePosition = function(el) {
    var F1 = csgeo.csnames[(el.args[0])].homog;
    var F2 = csgeo.csnames[(el.args[1])].homog;
    var PP = csgeo.csnames[(el.args[2])].homog;

    // i and j
    var II = List.ii;
    var JJ = List.jj;

    var b1 = List.normalizeMax(List.cross(F1, PP));
    var b2 = List.normalizeMax(List.cross(F2, PP));
    var a1 = List.normalizeMax(List.cross(PP, II));
    var a2 = List.normalizeMax(List.cross(PP, JJ));

    var har = geoOps._helper.coHarmonic(a1, a2, b1, b2);
    var e1 = List.normalizeMax(har[0]);
    var e2 = List.normalizeMax(har[1]);

    // lists for transposed
    var lII = List.turnIntoCSList([II]);
    var lJJ = List.turnIntoCSList([JJ]);
    var lF1 = List.turnIntoCSList([F1]);
    var lF2 = List.turnIntoCSList([F2]);

    var co1 = geoOps._helper.conicFromTwoDegenerates(lII, lJJ, lF1, lF2, e1);
    co1 = List.normalizeMax(co1);
    var co2 = geoOps._helper.conicFromTwoDegenerates(lII, lJJ, lF1, lF2, e2);
    co2 = List.normalizeMax(co2);

    // adjoint
    co1 = List.normalizeMax(List.adjoint3(co1));
    co2 = List.normalizeMax(List.adjoint3(co2));

    // return ellipsoid first 
    if (geoOps._helper.getConicType(co1) !== "ellipsoid") {
        var temp = co1;
        co1 = co2;
        co2 = temp;
    }

    // remove hyperbola in limit case
    if (List.almostequals(F1, F2).value) {
        var three = CSNumber.real(3);
        co2 = List.zeromatrix(three, three);
    }

    var erg = [co1, co2];
    el.results = erg;

};

// Given (A, a, B, b, C), compute conic such that
// 1. (A, a) and (B, b) are pole-polar pairs and
// 2. C is incident with the conic
geoOps.ConicBy2Pol1P = {};
geoOps.ConicBy2Pol1P.kind = "C";
geoOps.ConicBy2Pol1P.signature = ["P", "L", "P", "L", "P"];
geoOps.ConicBy2Pol1P.updatePosition = function(el) {
    var A = csgeo.csnames[(el.args[0])].homog;
    var a = csgeo.csnames[(el.args[1])].homog;
    var B = csgeo.csnames[(el.args[2])].homog;
    var b = csgeo.csnames[(el.args[3])].homog;
    var C = csgeo.csnames[(el.args[4])].homog;

    var sp = List.scalproduct;
    var sm = List.scalmult;
    var sub = List.sub;
    var mm = List.productMM;
    var rm = CSNumber.realmult;
    var transpose = List.transpose;
    var asList = List.turnIntoCSList;

    // D = ⟨a,A⟩⋅C − 2⟨a,C⟩⋅A, E = ⟨b,B⟩⋅C − 2⟨b,C⟩⋅B
    var D = sub(sm(sp(a, A), C), sm(rm(2, sp(a, C)), A));
    var E = sub(sm(sp(b, B), C), sm(rm(2, sp(b, C)), B));
    var AC = asList([List.cross(A, C)]);
    var BC = asList([List.cross(B, C)]);
    var M1 = mm(transpose(AC), asList([List.cross(A, E)]));
    var M2 = mm(transpose(BC), asList([List.cross(B, D)]));
    var M3 = mm(transpose(AC), BC);
    var Ab = sp(A, b);
    var Ba = sp(B, a);
    // M = Ba * M1 + Ab * M2 - 2 * Ab * Ba * M3
    var M = List.add(sm(Ba, M1), sm(Ab, M2));
    M = sub(M, sm(rm(2, CSNumber.mult(Ab, Ba)), M3));
    M = List.add(M, transpose(M));
    M = List.normalizeMax(M);
    M = General.withUsage(M, "Conic");
    el.matrix = M;
};

// Given (A, a, B, b, c), compute conic such that
// 1. (A, a) and (B, b) are pole-polar pairs and
// 2. c is a tangent to the conic
geoOps.ConicBy2Pol1L = {};
geoOps.ConicBy2Pol1L.kind = "C";
geoOps.ConicBy2Pol1L.signature = ["P", "L", "P", "L", "L"];
geoOps.ConicBy2Pol1L.updatePosition = function(el) {
    var A = csgeo.csnames[(el.args[0])].homog;
    var a = csgeo.csnames[(el.args[1])].homog;
    var B = csgeo.csnames[(el.args[2])].homog;
    var b = csgeo.csnames[(el.args[3])].homog;
    var c = csgeo.csnames[(el.args[4])].homog;

    var sp = List.scalproduct;
    var sm = List.scalmult;
    var mm = List.productMM;
    var mul = CSNumber.mult;
    var rm = CSNumber.realmult;
    var transpose = List.transpose;
    var asList = List.turnIntoCSList;

    var aA = sp(a, A);
    var aB = sp(a, B);
    var bA = sp(b, A);
    var bB = sp(b, B);
    var cA = sp(c, A);
    var cB = sp(c, B);
    var v = asList([List.sub(sm(mul(bA, cB), a), sm(mul(aB, cA), b))]);

    var M = List.add(
        mm(
            transpose(asList([sm(mul(bA, aB), c)])),
            asList([List.sub(
                List.add(
                    sm(CSNumber.sub(mul(aA, cB), mul(aB, cA)), b),
                    sm(CSNumber.sub(mul(bB, cA), mul(bA, cB)), a)
                ),
                sm(List.det3(a, b, c), List.cross(A, B))
            )])
        ),
        mm(transpose(v), v)
    );
    M = List.add(M, transpose(M));
    M = List.normalizeMax(M);
    M = General.withUsage(M, "Conic");
    el.matrix = M;
};

// Conic by one polar pair and three incident flats
geoOps._helper.conic1Pol3Inc = function(A, a, B, C, D) {
    var sp = List.scalproduct;
    var sm = List.scalmult;
    var mm = List.productMM;
    var cp = List.cross;
    var rm = CSNumber.realmult;
    var mult = CSNumber.mult;
    var transpose = List.transpose;
    var asList = List.turnIntoCSList;
    var det3 = List.det3;

    var ABC = det3(A, B, C);
    var BD = asList([cp(B, D)]);
    var AD = asList([cp(A, D)]);
    var BC = asList([cp(B, C)]);
    var aA = sp(a, A);
    var aB = sp(a, B);
    var aD = sp(a, D);
    var v = asList([cp(C, List.sub(sm(aA, D), sm(rm(2, aD), A)))]);
    var M = sm(ABC, mm(transpose(BD), v));
    var f = rm(2, CSNumber.add(mult(det3(A, C, D), aB), mult(ABC, aD)));
    f = CSNumber.sub(mult(det3(B, C, D), aA), f);
    M = List.add(M, sm(f, mm(transpose(AD), BC)));
    M = List.add(M, transpose(M));
    M = List.normalizeMax(M);
    return M;
};

// Given (A, a, B, C, D), compute conic such that
// 1. (A, a) is a pole-polar pair and
// 2. B, C, D are incident with the conic
geoOps.ConicBy1Pol3P = {};
geoOps.ConicBy1Pol3P.kind = "C";
geoOps.ConicBy1Pol3P.signature = ["P", "L", "P", "P", "P"];
geoOps.ConicBy1Pol3P.updatePosition = function(el) {
    var A = csgeo.csnames[(el.args[0])].homog;
    var a = csgeo.csnames[(el.args[1])].homog;
    var B = csgeo.csnames[(el.args[2])].homog;
    var C = csgeo.csnames[(el.args[3])].homog;
    var D = csgeo.csnames[(el.args[4])].homog;

    var M = geoOps._helper.conic1Pol3Inc(A, a, B, C, D);
    M = General.withUsage(M, "Conic");
    el.matrix = M;
};

// Given (A, a, b, c, d), compute conic such that
// 1. (A, a) is a pole-polar pair and
// 2. b, c, d are tangents to the conic
geoOps.ConicBy1Pol3L = {};
geoOps.ConicBy1Pol3L.kind = "C";
geoOps.ConicBy1Pol3L.signature = ["P", "L", "L", "L", "L"];
geoOps.ConicBy1Pol3L.updatePosition = function(el) {
    var A = csgeo.csnames[(el.args[0])].homog;
    var a = csgeo.csnames[(el.args[1])].homog;
    var b = csgeo.csnames[(el.args[2])].homog;
    var c = csgeo.csnames[(el.args[3])].homog;
    var d = csgeo.csnames[(el.args[4])].homog;

    var M = geoOps._helper.conic1Pol3Inc(a, A, b, c, d);
    M = List.normalizeMax(List.adjoint3(M));
    M = General.withUsage(M, "Conic");
    el.matrix = M;
};

geoOps._helper.coHarmonic = function(a1, a2, b1, b2) {
    var poi = List.realVector([100 * Math.random(), 100 * Math.random(), 1]);

    var ix = List.det3(poi, b1, a1);
    var jx = List.det3(poi, b1, a2);
    var iy = List.det3(poi, b2, a1);
    var jy = List.det3(poi, b2, a2);

    var sqj = CSNumber.sqrt(CSNumber.mult(jy, jx));
    var sqi = CSNumber.sqrt(CSNumber.mult(iy, ix));

    var mui = General.mult(a1, sqj);
    var tauj = General.mult(a2, sqi);

    var out1 = List.add(mui, tauj);
    var out2 = List.sub(mui, tauj);

    return [out1, out2];
};

geoOps.ConicInSquare = {};
geoOps.ConicInSquare.kind = "C";
geoOps.ConicInSquare.signature = ["P", "P", "P", "P"];
geoOps.ConicInSquare.updatePosition = function(el) {
    var A = csgeo.csnames[(el.args[0])].homog;
    var B = csgeo.csnames[(el.args[1])].homog;
    var C = csgeo.csnames[(el.args[2])].homog;
    var D = csgeo.csnames[(el.args[3])].homog;
    // Compute projective transformation from basis to given points (A, B, C, D)
    var m1 = eval_helper.basismap(A, B, C, D);
    // Compute projective transformation from basis to the corners of a square
    // tangent to a unit circle combined with applying this to the unit circle
    // matrix. The pre-computed constant result scaled by 1/16 is created here.
    var o = CSNumber.one;
    var m2Tucm2 = geoOps._helper.buildConicMatrix([o, o, o, CSNumber.real(-3), o, o]);
    // Complete transformation using m1 and m2Tucm2
    var m1a = List.adjoint3(m1);
    var mC = List.productMM(List.productMM(List.transpose(m1a), m2Tucm2), m1a);
    mC = List.normalizeMax(mC);
    el.matrix = General.withUsage(mC, "Conic");
};

geoOps.ConicBy5lines = {};
geoOps.ConicBy5lines.kind = "C";
geoOps.ConicBy5lines.signature = ["L", "L", "L", "L", "L"];
geoOps.ConicBy5lines.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var c = csgeo.csnames[(el.args[2])].homog;
    var d = csgeo.csnames[(el.args[3])].homog;
    var p = csgeo.csnames[(el.args[4])].homog;

    var erg_temp = geoOps._helper.ConicBy5(el, a, b, c, d, p);
    var erg = List.adjoint3(erg_temp);
    el.matrix = erg;
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Conic");
};

geoOps.ConicFromPrincipalDirections = {};
geoOps.ConicFromPrincipalDirections.kind = "C";
geoOps.ConicFromPrincipalDirections.signature = ["P", "P", "P"];
geoOps.ConicFromPrincipalDirections.updatePosition = function(el) {
    var M = csgeo.csnames[(el.args[0])].homog;
    var P1 = csgeo.csnames[(el.args[1])].homog;
    var P2 = csgeo.csnames[(el.args[2])].homog;
    var P3 = geoOps._helper.pointReflection(M, P1);
    var P1M = List.cross(P1, M);
    // Extract perpendicular direction from line P1M
    var perpDirP1M = List.turnIntoCSList([P1M.value[0], P1M.value[1], CSNumber.zero]);
    // A pair of duplicate P1M lines serves as the first degenerate conic
    var vP1M = List.turnIntoCSList([P1M]);
    // The perpendicular lines to P1M through P1 and its antipodal P3 serve as the second
    var vPP1MTP1 = List.turnIntoCSList([List.cross(P1, perpDirP1M)]);
    var vPP1MTP3 = List.turnIntoCSList([List.cross(P3, perpDirP1M)]);
    el.matrix = geoOps._helper.conicFromTwoDegenerates(vP1M, vP1M, vPP1MTP1, vPP1MTP3, P2);
    el.matrix = List.normalizeMax(el.matrix);
    el.matrix = General.withUsage(el.matrix, "Conic");
};

geoOps.CircleBy3 = {};
geoOps.CircleBy3.kind = "C";
geoOps.CircleBy3.signature = ["P", "P", "P"];
geoOps.CircleBy3.updatePosition = function(el) {
    var a = csgeo.csnames[(el.args[0])].homog;
    var b = csgeo.csnames[(el.args[1])].homog;
    var c = List.ii;
    var d = List.jj;
    var p = csgeo.csnames[(el.args[2])].homog;

    var erg = geoOps._helper.ConicBy5(el, a, b, c, d, p);
    el.matrix = List.normalizeMax(erg);
    el.matrix = General.withUsage(el.matrix, "Circle");

};

geoOps.ArcBy3 = {};
geoOps.ArcBy3.kind = "C";
geoOps.ArcBy3.signature = ["P", "P", "P"];
geoOps.ArcBy3.updatePosition = function(el) {
    geoOps.CircleBy3.updatePosition(el);
    el.startPoint = csgeo.csnames[(el.args[0])].homog;
    el.viaPoint = csgeo.csnames[(el.args[1])].homog;
    el.endPoint = csgeo.csnames[(el.args[2])].homog;
};
geoOps.ArcBy3.initialize = function(el) {
    el.startPoint = csgeo.csnames[(el.args[0])].homog;
    el.viaPoint = csgeo.csnames[(el.args[1])].homog;
    el.endPoint = csgeo.csnames[(el.args[2])].homog;
    el.isArc = true;
};

geoOps.PolarOfPoint = {};
geoOps.PolarOfPoint.kind = "L";
geoOps.PolarOfPoint.signature = ["P", "C"];
geoOps.PolarOfPoint.updatePosition = function(el) {
    var point = csgeo.csnames[(el.args[0])];
    var conic = csgeo.csnames[(el.args[1])];
    var homog = General.mult(conic.matrix, point.homog);
    homog = List.normalizeMax(homog);
    el.homog = General.withUsage(homog, "Line");
};

geoOps.PolarOfLine = {};
geoOps.PolarOfLine.kind = "P";
geoOps.PolarOfLine.signature = ["L", "C"];
geoOps.PolarOfLine.updatePosition = function(el) {
    var line = csgeo.csnames[(el.args[0])];
    var conic = csgeo.csnames[(el.args[1])];
    var dualMatrix = List.adjoint3(conic.matrix);
    var homog = General.mult(dualMatrix, line.homog);
    homog = List.normalizeMax(homog);
    el.homog = General.withUsage(homog, "Point");
};


geoOps.AngleBisector = {};
geoOps.AngleBisector.kind = "Ls";
geoOps.AngleBisector.signature = ["L", "L", "P"];
geoOps.AngleBisector.updatePosition = function(el) {
    var a = csgeo.csnames[el.args[0]].homog;
    var b = csgeo.csnames[el.args[1]].homog;
    var p = csgeo.csnames[el.args[2]].homog;
    var add = List.add;
    var sub = List.sub;
    var abs = List.abs;
    var cross = List.cross;
    var sm = List.scalmult;
    var nm = List.normalizeMax;
    var isAlmostZero = List._helper.isAlmostZero;
    var linfty = List.linfty;
    var na = sm(abs(cross(cross(linfty, b), linfty)), a);
    var nb = sm(abs(cross(cross(linfty, a), linfty)), b);
    var res1 = sub(na, nb);
    var res2 = add(na, nb);
    if (isAlmostZero(res1)) res1 = cross(cross(cross(linfty, res2), linfty), p);
    if (isAlmostZero(res2)) res2 = cross(cross(cross(linfty, res1), linfty), p);
    el.results = tracing2(nm(res1), nm(res2));
};
geoOps.AngleBisector.stateSize = tracing2.stateSize;

geoOps._helper.IntersectLC = function(l, c) {

    var N = CSNumber;
    var l1 = List.crossOperator(l);
    var l2 = List.transpose(l1);
    var s = General.mult(l2, General.mult(c, l1));

    var maxidx = List.maxIndex(l, CSNumber.abs2);
    var a11, a12, a21, a22, b;
    if (maxidx === 0) { // x is maximal
        a11 = s.value[1].value[1];
        a12 = s.value[1].value[2];
        a21 = s.value[2].value[1];
        a22 = s.value[2].value[2];
        b = l.value[0];
    } else if (maxidx === 1) { // y is maximal
        a11 = s.value[0].value[0];
        a12 = s.value[0].value[2];
        a21 = s.value[2].value[0];
        a22 = s.value[2].value[2];
        b = l.value[1];
    } else { // z is maximal
        a11 = s.value[0].value[0];
        a12 = s.value[0].value[1];
        a21 = s.value[1].value[0];
        a22 = s.value[1].value[1];
        b = l.value[2];
    }
    var alp = N.div(N.sqrt(N.sub(N.mult(a12, a21), N.mult(a11, a22))), b);
    var erg = List.add(s, List.scalmult(alp, l1));

    maxidx = List.maxIndex(erg, List.abs2);
    var erg1 = erg.value[maxidx];
    erg1 = List.normalizeMax(erg1);
    erg1 = General.withUsage(erg1, "Point");
    erg = List.transpose(erg);
    maxidx = List.maxIndex(erg, List.abs2);
    var erg2 = erg.value[maxidx];
    erg2 = List.normalizeMax(erg2);
    erg2 = General.withUsage(erg2, "Point");
    return [erg1, erg2];
};

geoOps.IntersectLC = {};
geoOps.IntersectLC.kind = "Ps";
geoOps.IntersectLC.signature = ["L", "C"];
geoOps.IntersectLC.updatePosition = function(el) {
    var l = csgeo.csnames[(el.args[0])].homog;
    var c = csgeo.csnames[(el.args[1])].matrix;

    var erg = geoOps._helper.IntersectLC(l, c);
    var erg1 = erg[0];
    var erg2 = erg[1];
    el.results = tracing2(erg1, erg2);
};
geoOps.IntersectLC.stateSize = tracing2.stateSize;

geoOps.OtherIntersectionCL = {};
geoOps.OtherIntersectionCL.kind = "P";
geoOps.OtherIntersectionCL.signature = ["C", "L", "P"];
geoOps.OtherIntersectionCL.updatePosition = function(el) {
    var l = csgeo.csnames[(el.args[1])].homog;
    var c = csgeo.csnames[(el.args[0])].matrix;
    var p = csgeo.csnames[(el.args[2])].homog;

    var erg = geoOps._helper.IntersectLC(l, c);
    var erg1 = erg[0];
    var erg2 = erg[1];
    var d1 = List.projectiveDistMinScal(erg1, p);
    var d2 = List.projectiveDistMinScal(erg2, p);
    if (d1 < d2) {
        el.homog = erg2;
    } else {
        el.homog = erg1;
    }
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Point");

};


geoOps.IntersectCirCir = {};
geoOps.IntersectCirCir.kind = "Ps";
geoOps.IntersectCirCir.signature = ["C", "C"];
geoOps.IntersectCirCir.updatePosition = function(el) {
    var c1 = csgeo.csnames[(el.args[0])].matrix;
    var c2 = csgeo.csnames[(el.args[1])].matrix;

    var ct1 = c2.value[0].value[0];
    var line1 = List.scalmult(ct1, c1.value[2]);
    var ct2 = c1.value[0].value[0];
    var line2 = List.scalmult(ct2, c2.value[2]);
    var ll = List.sub(line1, line2);
    ll = List.turnIntoCSList([
        ll.value[0], ll.value[1], CSNumber.realmult(0.5, ll.value[2])
    ]);
    ll = List.normalizeMax(ll);


    var erg = geoOps._helper.IntersectLC(ll, c1);
    var erg1 = erg[0];
    var erg2 = erg[1];
    el.results = tracing2(erg1, erg2);
};
geoOps.IntersectCirCir.stateSize = tracing2.stateSize;


geoOps.OtherIntersectionCC = {};
geoOps.OtherIntersectionCC.kind = "P";
geoOps.OtherIntersectionCC.signature = ["C", "C", "P"];
geoOps.OtherIntersectionCC.updatePosition = function(el) {
    var c1 = csgeo.csnames[(el.args[0])].matrix;
    var c2 = csgeo.csnames[(el.args[1])].matrix;
    var p = csgeo.csnames[(el.args[2])].homog;

    var ct1 = c2.value[0].value[0];
    var line1 = List.scalmult(ct1, c1.value[2]);
    var ct2 = c1.value[0].value[0];
    var line2 = List.scalmult(ct2, c2.value[2]);
    var ll = List.sub(line1, line2);
    ll = List.turnIntoCSList([
        ll.value[0], ll.value[1], CSNumber.realmult(0.5, ll.value[2])
    ]);
    ll = List.normalizeMax(ll);


    var erg = geoOps._helper.IntersectLC(ll, c1);
    var erg1 = erg[0];
    var erg2 = erg[1];
    var d1 = List.projectiveDistMinScal(erg1, p);
    var d2 = List.projectiveDistMinScal(erg2, p);
    if (d1 < d2) {
        el.homog = erg2;
    } else {
        el.homog = erg1;
    }
    el.homog = List.normalizeMax(el.homog);
    el.homog = General.withUsage(el.homog, "Point");

};


geoOps._helper.IntersectConicConic = function(A, B) {
    var myeps = 1e-24;

    var A1 = A.value[0];
    var A2 = A.value[1];
    var A3 = A.value[2];
    var B1 = B.value[0];
    var B2 = B.value[1];
    var B3 = B.value[2];

    var c3 = List.det3(A1, A2, A3);
    var c2 = CSNumber.add(CSNumber.add(
        List.det3(A1, A2, B3), List.det3(A1, B2, A3)), List.det3(B1, A2, A3));
    var c1 = CSNumber.add(CSNumber.add(
        List.det3(A1, B2, B3), List.det3(B1, A2, B3)), List.det3(B1, B2, A3));
    var c0 = List.det3(B1, B2, B3);
    // det(a*A + b*B) = a^3*c3 + a^2*b*c2 + a*b^2*c1 + b^3*c0 = 0

    var Aabs2 = CSNumber.abs2(c3).value.real;
    var Babs2 = CSNumber.abs2(c0).value.real;
    if (Aabs2 < Babs2) {
        // ensure |c3| > |c0| so if only one is singular, it's B = (0*A + B)
        var tmp = A;
        A = B;
        B = tmp;

        tmp = c0;
        c0 = c3;
        c3 = tmp;

        tmp = c1;
        c1 = c2;
        c2 = tmp;

        tmp = Aabs2;
        Aabs2 = Babs2;
        Babs2 = tmp;
    }

    var CDeg1, CDeg2;
    if (Aabs2 < myeps) { // both are degenerate
        CDeg1 = A;
        CDeg2 = B;
    } else {
        // produce two DISTINCT degenerate Conics
        var sols = CSNumber.solveCubic(c3, c2, c1, c0);
        var d01 = CSNumber.abs2(CSNumber.sub(sols[0], sols[1])).value.real;
        var d02 = CSNumber.abs2(CSNumber.sub(sols[0], sols[2])).value.real;
        var d12 = CSNumber.abs2(CSNumber.sub(sols[1], sols[2])).value.real;
        var sol1, sol2;
        if (d01 > d02) {
            sol1 = sols[1];
            if (d01 > d12) { // d01 > {d02, d12}
                sol2 = sols[0];
            } else { // d12 >= d01 > d02
                sol2 = sols[2];
            }
        } else { // d02 >= d01
            sol1 = sols[2];
            if (d02 > d12) { // d02 >= {d01, d12}
                sol2 = sols[0];
            } else { // d12 >= d02 >= d01
                sol2 = sols[1];
            }
        }
        CDeg1 = List.add(List.scalmult(sol1, A), B);
        CDeg2 = List.add(List.scalmult(sol2, A), B);
    }
    var lines1 = geoOps._helper.splitDegenConic(CDeg1);
    var l11 = lines1[0];
    var l12 = lines1[1];

    var lines2 = geoOps._helper.splitDegenConic(CDeg2);
    var l21 = lines2[0];
    var l22 = lines2[1];

    var p1 = List.cross(l11, l21);
    var p2 = List.cross(l12, l21);
    var p3 = List.cross(l11, l22);
    var p4 = List.cross(l12, l22);

    p1 = List.normalizeMax(p1);
    p2 = List.normalizeMax(p2);
    p3 = List.normalizeMax(p3);
    p4 = List.normalizeMax(p4);

    p1 = General.withUsage(p1, "Point");
    p2 = General.withUsage(p2, "Point");
    p3 = General.withUsage(p3, "Point");
    p4 = General.withUsage(p4, "Point");

    return [p1, p2, p3, p4];
};

geoOps.IntersectConicConic = {};
geoOps.IntersectConicConic.kind = "Ps";
geoOps.IntersectConicConic.signature = ["C", "C"];
geoOps.IntersectConicConic.updatePosition = function(el) {
    var AA = csgeo.csnames[(el.args[0])].matrix;
    var BB = csgeo.csnames[(el.args[1])].matrix;

    var erg = geoOps._helper.IntersectConicConic(AA, BB);
    erg = tracing4(erg[0], erg[1], erg[2], erg[3]);
    el.results = erg;
    //    el.results = List.turnIntoCSList(erg);
};
geoOps.IntersectConicConic.stateSize = tracing4.stateSize;


geoOps.SelectP = {};
geoOps.SelectP.kind = "P";
geoOps.SelectP.signature = ["Ps"];
geoOps.SelectP.initialize = function(el) {
    if (el.index !== undefined)
        return el.index - 1;
    var set = csgeo.csnames[(el.args[0])].results.value;
    var pos = geoOps._helper.initializePoint(el);
    var d1 = List.projectiveDistMinScal(pos, set[0]);
    var best = 0;
    for (var i = 1; i < set.length; ++i) {
        var d2 = List.projectiveDistMinScal(pos, set[i]);
        if (d2 < d1) {
            d1 = d2;
            best = i;
        }
    }
    return best;
};
geoOps.SelectP.updatePosition = function(el) {
    var set = csgeo.csnames[(el.args[0])];
    el.homog = set.results.value[el.param];
};

geoOps.SelectL = {};
geoOps.SelectL.kind = "L";
geoOps.SelectL.signature = ["Ls"];
geoOps.SelectL.initialize = function(el) {
    if (el.index !== undefined)
        return el.index - 1;
    var set = csgeo.csnames[(el.args[0])].results.value;
    var pos = geoOps._helper.initializeLine(el);
    var d1 = List.projectiveDistMinScal(pos, set[0]);
    var best = 0;
    for (var i = 1; i < set.length; ++i) {
        var d2 = List.projectiveDistMinScal(pos, set[i]);
        if (d2 < d1) {
            d1 = d2;
            best = i;
        }
    }
    return best;
};
geoOps.SelectL.updatePosition = function(el) {
    var set = csgeo.csnames[(el.args[0])];
    el.homog = set.results.value[el.param];
    el.homog = General.withUsage(el.homog, "Line");
};

geoOps._helper.moebiusStep = function(a, b, c) {
    var add = CSNumber.add;
    var sub = CSNumber.sub;
    var mult = CSNumber.mult;
    var ax = a.value[0];
    var ay = a.value[1];
    var az = a.value[2];
    var bx = b.value[0];
    var by = b.value[1];
    var bz = b.value[2];
    var cx = c.value[0];
    var cy = c.value[1];
    var cz = c.value[2];
    /*
    Building the matrix [[ax + i*ay, az], [bx + i*by, bz]].transpose()
    using matrices to represent the complex numbers yields this:

        ⎛ ax -ay  bx -by⎞
    m = ⎜ ay  ax  by  bx⎟
        ⎜ az   0  bz   0⎟
        ⎝  0  az   0  bz⎠

    We want to solve that up to a scalar multiple for [cx + i*xy, cz]
    using the same representation.  We avoid inversion and use the 2×2
    adjoint. Since the adjoint of [[a,b],[c,d]] is [[d,-b],[-c,a]] we have

    ⎛ bz   0 -bx  by⎞ ⎛ cx -cy⎞   ⎛ bz*cx - bx*cz -bz*cy + by*cz⎞
    ⎜  0  bz -by -bx⎟ ⎜ cy  cx⎟ = ⎜ bz*cy - by*cz  bz*cx - bx*cz⎟
    ⎜-az   0  ax -ay⎟ ⎜ cz   0⎟   ⎜-az*cx + ax*cz  az*cy - ay*cz⎟
    ⎝  0 -az  ay  ax⎠ ⎝  0  cz⎠   ⎝-az*cy + ay*cz -az*cx + ax*cz⎠

    Let's save the first column of that.
    */
    var d1 = sub(mult(bz, cx), mult(bx, cz));
    var d2 = sub(mult(bz, cy), mult(by, cz));
    var d3 = sub(mult(ax, cz), mult(az, cx));
    var d4 = sub(mult(ay, cz), mult(az, cy));
    /*
    Now we turn that into a diagonal matrix, and multiply m with that.

    ⎛ ax -ay  bx -by⎞ ⎛ d1 -d2   0   0⎞
    ⎜ ay  ax  by  bx⎟ ⎜ d2  d1   0   0⎟ =
    ⎜ az   0  bz   0⎟ ⎜  0   0  d3 -d4⎟
    ⎝  0  az   0  bz⎠ ⎝  0   0  d4  d3⎠
      ⎛ ax*d1 - ay*d2 -ay*d1 - ax*d2  bx*d3 - by*d4 -by*d3 - bx*d4⎞
      ⎜ ay*d1 + ax*d2  ax*d1 - ay*d2  by*d3 + bx*d4  bx*d3 - by*d4⎟
      ⎜         az*d1         -az*d2          bz*d3         -bz*d4⎟
      ⎝         az*d2          az*d1          bz*d4          bz*d3⎠

    We return the first and third column of that. In essence these are
    the real and imaginary parts of the four entries of a 2×2 matrix.
    */
    return [
        sub(mult(ax, d1), mult(ay, d2)),
        add(mult(ay, d1), mult(ax, d2)),
        mult(az, d1),
        mult(az, d2),
        sub(mult(bx, d3), mult(by, d4)),
        add(mult(by, d3), mult(bx, d4)),
        mult(bz, d3),
        mult(bz, d4)
    ];
};

geoOps.TrMoebius = {};
geoOps.TrMoebius.kind = "Mt";
geoOps.TrMoebius.signature = ["P", "P", "P", "P", "P", "P"];
geoOps.TrMoebius.updatePosition = function(el) {
    var neg = CSNumber.neg;
    var A1 = (csgeo.csnames[el.args[0]]).homog;
    var A2 = (csgeo.csnames[el.args[2]]).homog;
    var A3 = (csgeo.csnames[el.args[4]]).homog;
    var A = geoOps._helper.moebiusStep(A1, A2, A3);
    var B1 = (csgeo.csnames[el.args[1]]).homog;
    var B2 = (csgeo.csnames[el.args[3]]).homog;
    var B3 = (csgeo.csnames[el.args[5]]).homog;
    var B = geoOps._helper.moebiusStep(B1, B2, B3);

    /*
    Now we conceptually want B * A.adjoint()

    ⎛ B0 -B1  B4 -B5⎞ ⎛ A6 -A7 -A4  A5⎞   ⎛ ar -ai  br -bi⎞
    ⎜ B1  B0  B5  B4⎟ ⎜ A7  A6 -A5 -A4⎟ = ⎜ ai  ar  bi  br⎟
    ⎜ B2 -B3  B6 -B7⎟ ⎜-A2  A3  A0 -A1⎟   ⎜ cr -ci  dr -di⎟
    ⎝ B3  B2  B7  B6⎠ ⎝-A3 -A2  A1  A0⎠   ⎝ ci  cr  di  dr⎠

    But since we only care about two columns of the result, it's
    enough to use two columns of the adjoint of A, namely the first
    and the third.
    */
    var mB = List.normalizeMax(List.matrix([
        [B[0], neg(B[1]), B[4], neg(B[5])],
        [B[1], B[0], B[5], B[4]],
        [B[2], neg(B[3]), B[6], neg(B[7])],
        [B[3], B[2], B[7], B[6]]
    ]));
    var mAa = List.normalizeMax(List.matrix([
        [A[6], neg(A[4])],
        [A[7], neg(A[5])],
        [neg(A[2]), A[0]],
        [neg(A[3]), A[1]]
    ]));
    var C = List.normalizeMax(List.productMM(mB, mAa));

    // Read from that the (doubly) complex matrix [[a, b], [c, d]]
    el.moebius = {
        anti: false,
        ar: C.value[0].value[0],
        ai: C.value[1].value[0],
        br: C.value[0].value[1],
        bi: C.value[1].value[1],
        cr: C.value[2].value[0],
        ci: C.value[3].value[0],
        dr: C.value[2].value[1],
        di: C.value[3].value[1]
    };
    geoOps._helper.moebiusPair(el);
};

geoOps._helper.moebiusPair = function(el) {
    /*
    Build two matrices with the interesting property that for pxy = px + i*py
    this essentially encodes a Möbius transformation including division:

                                ⎛Re((a*pxy + b*pz)*conj(c*pxy + d*pz))⎞
    cross(mat1 * p, mat2 * p) = ⎜Im((a*pxy + b*pz)*conj(c*pxy + d*pz))⎟
                                ⎝   (c*pxy + d*pz)*conj(c*pxy + d*pz) ⎠
    */
    var m = el.moebius;
    var neg = CSNumber.neg;
    var flip = m.anti ? neg : General.identity;
    el.mat1 = List.normalizeMax(List.matrix([
        [neg(m.cr), flip(m.ci), neg(m.dr)],
        [m.ci, flip(m.cr), m.di],
        [m.ar, neg(flip(m.ai)), m.br]
    ]));
    el.mat2 = List.normalizeMax(List.matrix([
        [neg(m.ci), neg(flip(m.cr)), neg(m.di)],
        [neg(m.cr), flip(m.ci), neg(m.dr)],
        [m.ai, flip(m.ar), m.bi]
    ]));
};

geoOps.TrInverseMoebius = {};
geoOps.TrInverseMoebius.kind = "Mt";
geoOps.TrInverseMoebius.signature = ["Mt"];
geoOps.TrInverseMoebius.updatePosition = function(el) {
    var m = csgeo.csnames[el.args[0]].moebius;
    var neg = CSNumber.neg;
    var flip = m.anti ? neg : General.identity;
    el.moebius = {
        anti: m.anti,
        ar: m.dr,
        ai: flip(m.di),
        br: neg(m.br),
        bi: neg(flip(m.bi)),
        cr: neg(m.cr),
        ci: neg(flip(m.ci)),
        dr: m.ar,
        di: flip(m.ai)
    };
    geoOps._helper.moebiusPair(el);
};

geoOps.TrMoebiusP = {};
geoOps.TrMoebiusP.kind = "P";
geoOps.TrMoebiusP.signature = ["Mt", "P"];
geoOps.TrMoebiusP.updatePosition = function(el) {
    var t = csgeo.csnames[(el.args[0])];
    var p = csgeo.csnames[(el.args[1])].homog;
    var l1 = List.productMV(t.mat1, p);
    var l2 = List.productMV(t.mat2, p);
    el.homog = List.normalizeMax(List.cross(l1, l2));
    el.homog = General.withUsage(el.homog, "Point");
};

geoOps._helper.TrMoebiusP = function(p, Tr) {
    var l1 = List.productMV(Tr.mat1, p);
    var l2 = List.productMV(Tr.mat2, p);
    return List.normalizeMax(List.cross(l1, l2));
};

geoOps.TrMoebiusL = {};
geoOps.TrMoebiusL.kind = "C";
geoOps.TrMoebiusL.signature = ["Mt", "L"];
geoOps.TrMoebiusL.updatePosition = function(el) {
    var t = csgeo.csnames[(el.args[0])];
    var l = csgeo.csnames[(el.args[1])].homog;

    var getRandLine = function() {
        var rline = List.realVector([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]);
        return List.normalizeMax(rline);
    };

    var a1 = List.cross(getRandLine(), l);
    var a2 = List.cross(getRandLine(), l);
    var a3 = List.cross(getRandLine(), l);

    var b1 = geoOps._helper.TrMoebiusP(a1, t);
    var b2 = geoOps._helper.TrMoebiusP(a2, t);
    var b3 = geoOps._helper.TrMoebiusP(a3, t);

    el.matrix = List.normalizeMax(geoOps._helper.ConicBy5(null, b1, b2, b3, List.ii, List.jj));
    el.matrix = General.withUsage(el.matrix, "Circle");
};

geoOps.TrMoebiusS = {};
geoOps.TrMoebiusS.kind = "C";
geoOps.TrMoebiusS.signature = ["Mt", "S"];
geoOps.TrMoebiusS.updatePosition = function(el) {
    var tr = csgeo.csnames[(el.args[0])];
    var s = csgeo.csnames[(el.args[1])];

    var a1 = s.startpos;
    var a3 = s.endpos;
    var a2 = List.add(a1, a3);

    var b1 = geoOps._helper.TrMoebiusP(a1, tr);
    var b2 = geoOps._helper.TrMoebiusP(a2, tr);
    var b3 = geoOps._helper.TrMoebiusP(a3, tr);
    el.startPoint = b1;
    el.viaPoint = b2;
    el.endPoint = b3;

    el.isArc = true;
    el.matrix = List.normalizeMax(geoOps._helper.ConicBy5(null, b1, b2, b3, List.ii, List.jj));
    el.matrix = General.withUsage(el.matrix, "Circle");
};


geoOps.TrMoebiusC = {};
geoOps.TrMoebiusC.kind = "C";
geoOps.TrMoebiusC.signature = ["Mt", "C"];
geoOps.TrMoebiusC.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[1]].matrix.usage === "Circle";
};
geoOps.TrMoebiusC.updatePosition = function(el) {
    var t = csgeo.csnames[(el.args[0])];
    var cir = csgeo.csnames[(el.args[1])].matrix;

    var getRandLine = function() {
        var rline = List.realVector([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]);
        return List.normalizeMax(rline);
    };

    var pts1 = geoOps._helper.IntersectLC(getRandLine(), cir);
    var pts2 = geoOps._helper.IntersectLC(getRandLine(), cir);

    var a1 = pts1[0];
    var a2 = pts1[1];
    var a3 = pts2[1];

    var b1 = geoOps._helper.TrMoebiusP(a1, t);
    var b2 = geoOps._helper.TrMoebiusP(a2, t);
    var b3 = geoOps._helper.TrMoebiusP(a3, t);

    el.matrix = List.normalizeMax(geoOps._helper.ConicBy5(null, b1, b2, b3, List.ii, List.jj));
    el.matrix = General.withUsage(el.matrix, "Circle");
};

geoOps.TrMoebiusArc = {};
geoOps.TrMoebiusArc.kind = "C";
geoOps.TrMoebiusArc.signature = ["Mt", "C"];
geoOps.TrMoebiusArc.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[1]].isArc;
};
geoOps.TrMoebiusArc.updatePosition = function(el) {
    var t = csgeo.csnames[(el.args[0])];
    var Arc = csgeo.csnames[(el.args[1])];

    var a1 = Arc.startPoint;
    var a2 = Arc.viaPoint;
    var a3 = Arc.endPoint;

    var b1 = geoOps._helper.TrMoebiusP(a1, t);
    var b2 = geoOps._helper.TrMoebiusP(a2, t);
    var b3 = geoOps._helper.TrMoebiusP(a3, t);
    el.startPoint = b1;
    el.viaPoint = b2;
    el.endPoint = b3;

    el.isArc = true;
    el.matrix = List.normalizeMax(geoOps._helper.ConicBy5(null, b1, b2, b3, List.ii, List.jj));
    el.matrix = General.withUsage(el.matrix, "Circle");
};

// Produces the transformation matrix and its dual
geoOps._helper.trBuildMatrix = function(el, oneStep) {
    var m0 = oneStep(0);
    var m1 = oneStep(1);
    var m = List.productMM(m1, List.adjoint3(m0));
    el.matrix = List.normalizeMax(m);
    m = List.transpose(List.productMM(m0, List.adjoint3(m1)));
    el.dualMatrix = List.normalizeMax(m);
};

// Define a projective transformation given four points and their images
geoOps.TrProjection = {};
geoOps.TrProjection.kind = "Tr";
geoOps.TrProjection.signature = ["P", "P", "P", "P", "P", "P", "P", "P"];
geoOps.TrProjection.initialize = function(el) {
    el.isEuclidean = 0;
};
geoOps.TrProjection.updatePosition = function(el) {
    geoOps._helper.trBuildMatrix(el, function(offset) {
        return eval_helper.basismap(
            csgeo.csnames[el.args[0 + offset]].homog,
            csgeo.csnames[el.args[2 + offset]].homog,
            csgeo.csnames[el.args[4 + offset]].homog,
            csgeo.csnames[el.args[6 + offset]].homog
        );
    });
};

// Define an affine transformation given three points and their images
// see https://github.com/CindyJS/CindyJS/pull/148 and
// https://gist.github.com/elkins0/f5a98a5ae98b8a8c7571
// https://github.com/CindyJS/CindyJS/files/65335/TrAffine.pdf
geoOps.TrAffine = {};
geoOps.TrAffine.kind = "Tr";
geoOps.TrAffine.signature = ["P", "P", "P", "P", "P", "P"];
geoOps.TrAffine.initialize = function(el) {
    el.isEuclidean = 0;
};
geoOps.TrAffine.updatePosition = function(el) {
    var mult = CSNumber.mult;
    var sm = List.scalmult;
    var mat = List.turnIntoCSList;
    var t = List.transpose;
    var nm = List.normalizeMax;
    var mm = List.productMM;
    var adj = List.adjoint3;
    // Get the set of points
    var ps1 = mat([
        csgeo.csnames[el.args[0]].homog,
        csgeo.csnames[el.args[2]].homog,
        csgeo.csnames[el.args[4]].homog
    ]);
    // Get the set of thier images
    var ps2 = mat([
        csgeo.csnames[el.args[1]].homog,
        csgeo.csnames[el.args[3]].homog,
        csgeo.csnames[el.args[5]].homog
    ]);
    var ps1t = t(ps1);
    var ps2t = t(ps2);
    var z1 = ps1t.value[2].value;
    var z2 = ps2t.value[2].value;
    var u = [mult(z1[0], z2[2]), mult(z1[1], z2[0]), mult(z1[2], z2[1])];
    var w = adj(ps1t).value;
    el.matrix = nm(mm(ps2t, mat([
        sm(mult(u[0], z2[1]), w[0]),
        sm(mult(u[1], z2[2]), w[1]),
        sm(mult(u[2], z2[0]), w[2])
    ])));
    w = ps1.value;
    el.dualMatrix = nm(mm(adj(ps2), mat([
        sm(mult(z1[2], u[1]), w[0]),
        sm(mult(z1[0], u[2]), w[1]),
        sm(mult(z1[1], u[0]), w[2])
    ])));
};

// Define a similarity transformation given two points and their images
geoOps.TrSimilarity = {};
geoOps.TrSimilarity.kind = "Tr";
geoOps.TrSimilarity.signature = ["P", "P", "P", "P"];
geoOps.TrSimilarity.initialize = function(el) {
    el.isEuclidean = 1;
};
geoOps.TrSimilarity.updatePosition = function(el) {
    geoOps._helper.trBuildMatrix(el, function(offset) {
        var a = csgeo.csnames[el.args[0 + offset]].homog,
            b = csgeo.csnames[el.args[2 + offset]].homog;
        return eval_helper.basismap(a, b, List.ii, List.jj);
    });
};

// Define a translation transformation given one point and its image
geoOps.TrTranslation = {};
geoOps.TrTranslation.kind = "Tr";
geoOps.TrTranslation.signature = ["P", "P"];
geoOps.TrTranslation.initialize = function(el) {
    el.isEuclidean = 1;
};
geoOps.TrTranslation.updatePosition = function(el) {
    /*
        Build this matrix when a is [aX, aY, aZ] and  b is [bX, bY, bZ]:
            ⎛aZ*bZ   0    aZ*bX-bZ*aX⎞
        m = ⎜  0   aZ*bZ  aZ*bY-bZ*aY⎟
            ⎝  0     0       aZ*bZ   ⎠
    */
    var a = csgeo.csnames[el.args[0]].homog,
        b = csgeo.csnames[el.args[1]].homog,
        c = List.cross(a, b).value,
        n = CSNumber.mult(a.value[2], b.value[2]),
        mat = List.turnIntoCSList,
        neg = CSNumber.neg,
        zero = CSNumber.zero,
        m = mat([
            mat([n, zero, c[1]]),
            mat([zero, n, neg(c[0])]),
            mat([zero, zero, n])
        ]);
    m = List.normalizeMax(m);
    el.matrix = m;
    // Transpose using already normalized values, negate diagonal values
    // Matrix may end up scaled by -1 if n was the max value
    n = neg(m.value[0].value[0]);
    m = mat([
        mat([n, zero, zero]),
        mat([zero, n, zero]),
        mat([m.value[0].value[2], m.value[1].value[2], n])
    ]);
    el.dualMatrix = m;
};

// Define a reflective transformation given a point
geoOps.TrReflectionP = {};
geoOps.TrReflectionP.kind = "Tr";
geoOps.TrReflectionP.signature = ["P"];
geoOps.TrReflectionP.initialize = function(el) {
    el.isEuclidean = 1;
};
geoOps.TrReflectionP.updatePosition = function(el) {
    /*
        Build this matrix when p is [x, y, z]:

        ⎛-z/2  0   x ⎞
        ⎜  0 -z/2  y ⎟
        ⎝  0   0  z/2⎠
    */
    var p = csgeo.csnames[el.args[0]].homog.value;
    var n = CSNumber.realmult(-0.5, p[2]);
    var zero = CSNumber.zero;
    var m = List.turnIntoCSList([
        List.turnIntoCSList([n, zero, p[0]]),
        List.turnIntoCSList([zero, n, p[1]]),
        List.turnIntoCSList([zero, zero, CSNumber.neg(n)])
    ]);
    m = List.normalizeMax(m);
    el.matrix = m;
    el.dualMatrix = List.transpose(m);
};

// Define a reflective transformation given a line
geoOps.TrReflectionL = {};
geoOps.TrReflectionL.kind = "Tr";
geoOps.TrReflectionL.signature = ["L"];
geoOps.TrReflectionL.initialize = function(el) {
    el.isEuclidean = -1;
};
geoOps.TrReflectionL.updatePosition = function(el) {
    /*
        Build this matrix when l is [x, y, z]:

        ⎛(x^2-y^2)/2     x*y         x*z    ⎞
        ⎜    x*y    -(x^2-y^2)/2     y*z    ⎟
        ⎝     0           0     -(x^2+y^2)/2⎠
    */
    var mult = CSNumber.mult,
        realmult = CSNumber.realmult,
        zero = CSNumber.zero,
        l = csgeo.csnames[el.args[0]].homog.value,
        x = l[0],
        y = l[1],
        z = l[2],
        xx = mult(x, x),
        yy = mult(y, y),
        pm = realmult(-0.5, CSNumber.sub(xx, yy)),
        txy = mult(x, y),
        m = List.turnIntoCSList([
            List.turnIntoCSList([CSNumber.neg(pm), txy, mult(x, z)]),
            List.turnIntoCSList([txy, pm, mult(y, z)]),
            List.turnIntoCSList([zero, zero, realmult(-0.5, CSNumber.add(xx, yy))])
        ]);
    m = List.normalizeMax(m);
    el.matrix = m;
    el.dualMatrix = List.transpose(m);
};

// Define a reflective transformation given a segment
geoOps.TrReflectionS = {};
geoOps.TrReflectionS.kind = "Tr";
geoOps.TrReflectionS.signature = ["S"];
geoOps.TrReflectionS.updatePosition = geoOps.TrReflectionL.updatePosition;

// Define a reflective transformation given a circle (not a general conic)
geoOps.TrReflectionC = {};
geoOps.TrReflectionC.kind = "Mt";
geoOps.TrReflectionC.signature = ["C"];
geoOps.TrReflectionC.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[0]].matrix.usage === "Circle";
};
geoOps.TrReflectionC.updatePosition = function(el) {
    var m = csgeo.csnames[(el.args[0])].matrix;
    // m = [[a, 0, b], [0, a, c], [b, c, d]]
    var a = m.value[0].value[0];
    var b = m.value[0].value[2];
    var c = m.value[1].value[2];
    var d = m.value[2].value[2];
    var neg = CSNumber.neg;
    el.moebius = {
        anti: true,
        ar: b,
        ai: c,
        br: d,
        bi: CSNumber.zero,
        cr: neg(a),
        ci: CSNumber.zero,
        dr: neg(b),
        di: c
    };
    geoOps._helper.moebiusPair(el);
};

geoOps.TrInverse = {};
geoOps.TrInverse.kind = "Tr";
geoOps.TrInverse.signature = ["Tr"];
geoOps.TrInverse.initialize = function(el) {
    var tr = csgeo.csnames[(el.args[0])];
    el.isEuclidean = tr.isEuclidean;
};
geoOps.TrInverse.updatePosition = function(el) {
    var tr = csgeo.csnames[(el.args[0])];
    var m = tr.matrix;
    el.dualMatrix = List.transpose(tr.matrix);
    el.matrix = List.transpose(tr.dualMatrix);
};

// Apply a projective transformation to a conic
geoOps.TransformC = {};
geoOps.TransformC.kind = "C";
geoOps.TransformC.signature = ["Tr", "C"];
geoOps.TransformC.updatePosition = function(el) {
    var d = csgeo.csnames[(el.args[0])].dualMatrix;
    var c = csgeo.csnames[(el.args[1])].matrix;
    var m = List.productMM(List.productMM(d, c), List.transpose(d));
    m = List.normalizeMax(m);
    el.matrix = General.withUsage(m, "Conic");
};


geoOps.TransformArc = {};
geoOps.TransformArc.kind = "C";
geoOps.TransformArc.signature = ["Tr", "C"];
geoOps.TransformArc.signatureConstraints = function(el) {
    return csgeo.csnames[el.args[0]].isArc;
};
geoOps.TransformArc.updatePosition = function(el) {
    var t = csgeo.csnames[(el.args[0])].matrix;
    var Arc = csgeo.csnames[(el.args[1])];

    var a1 = Arc.startPoint;
    var a2 = Arc.viaPoint;
    var a3 = Arc.endPoint;

    var b1 = List.normalizeMax(List.productMV(t, a1)),
        b2 = List.normalizeMax(List.productMV(t, a2)),
        b3 = List.normalizeMax(List.productMV(t, a3));

    el.startPoint = b1;
    el.viaPoint = b2;
    el.endPoint = b3;

    el.isArc = true;
    el.matrix = List.normalizeMax(geoOps._helper.ConicBy5(null, b1, b2, b3, List.ii, List.jj));
    el.matrix = General.withUsage(el.matrix, "Circle");
};

// Apply a projective transformation to a point
geoOps.TransformP = {};
geoOps.TransformP.kind = "P";
geoOps.TransformP.signature = ["Tr", "P"];
geoOps.TransformP.updatePosition = function(el) {
    var m = csgeo.csnames[(el.args[0])].matrix;
    var p = csgeo.csnames[(el.args[1])].homog;
    el.homog = List.normalizeMax(List.productMV(m, p));
    el.homog = General.withUsage(el.homog, "Point");
};

// Apply a projective transformation to a line
geoOps.TransformL = {};
geoOps.TransformL.kind = "L";
geoOps.TransformL.signature = ["Tr", "L"];
geoOps.TransformL.updatePosition = function(el) {
    var m = csgeo.csnames[(el.args[0])].dualMatrix;
    var l = csgeo.csnames[(el.args[1])].homog;
    el.homog = List.normalizeMax(List.productMV(m, l));
    el.homog = General.withUsage(el.homog, "Line");
};

// Apply a projective transformation to a line segment
geoOps.TransformS = {};
geoOps.TransformS.kind = "S";
geoOps.TransformS.signature = ["Tr", "S"];
geoOps.TransformS.updatePosition = function(el) {
    var tr = csgeo.csnames[(el.args[0])];
    var s = csgeo.csnames[(el.args[1])];
    geoOps.Segment.setSegmentPos(el,
        List.productMV(tr.dualMatrix, s.homog),
        List.productMV(tr.matrix, s.startpos),
        List.productMV(tr.matrix, s.endpos)
    );
};

geoOps.TransformPolygon = {};
geoOps.TransformPolygon.kind = "Poly";
geoOps.TransformPolygon.signature = ["Tr", "Poly"];
geoOps.TransformPolygon.updatePosition = function(el) {
    var m = csgeo.csnames[(el.args[0])].matrix;
    var ps = csgeo.csnames[(el.args[1])].vertices.value;
    el.vertices = List.turnIntoCSList(ps.map(function(p) {
        var homog = List.normalizeMax(List.productMV(m, p));
        homog = General.withUsage(homog, "Point");
        return homog;
    }));
};

geoOps.TrComposeTrTr = {};
geoOps.TrComposeTrTr.kind = "Tr";
geoOps.TrComposeTrTr.signature = ["Tr", "Tr"];
geoOps.TrComposeTrTr.initialize = function(el) {
    var a = csgeo.csnames[el.args[0]];
    var b = csgeo.csnames[el.args[1]];
    el.isEuclidean = a.isEuclidean * b.isEuclidean;
};
geoOps.TrComposeTrTr.updatePosition = function(el) {
    var a = csgeo.csnames[el.args[0]];
    var b = csgeo.csnames[el.args[1]];
    el.matrix = List.normalizeMax(List.productMM(b.matrix, a.matrix));
    el.dualMatrix = List.normalizeMax(List.productMM(b.dualMatrix, a.dualMatrix));
};

geoOps._helper.composeMtMt = function(el, m, n) {
    var add = CSNumber.add;
    var sub = CSNumber.sub;
    var mult = CSNumber.mult;

    function f1(a, b, c, d) { // a*b + c*d
        return add(mult(a, b), mult(c, d));
    }

    function f2(a, b, c, d, e, f, g, h) {
        return add(f1(a, b, c, d), f1(e, f, g, h));
    }

    function f3(a, b, c, d, e, f, g, h) {
        return sub(f1(a, b, c, d), f1(e, f, g, h));
    }

    var addsub = n.anti ? f3 : f2;
    var subadd = n.anti ? f2 : f3;
    var v = List.normalizeMax(List.turnIntoCSList([
        subadd(m.ar, n.ar, m.cr, n.br, m.ai, n.ai, m.ci, n.bi),
        addsub(m.ar, n.ai, m.cr, n.bi, m.ai, n.ar, m.ci, n.br),
        subadd(m.br, n.ar, m.dr, n.br, m.bi, n.ai, m.di, n.bi),
        addsub(m.br, n.ai, m.dr, n.bi, m.bi, n.ar, m.di, n.br),
        subadd(m.ar, n.cr, m.cr, n.dr, m.ai, n.ci, m.ci, n.di),
        addsub(m.ar, n.ci, m.cr, n.di, m.ai, n.cr, m.ci, n.dr),
        subadd(m.br, n.cr, m.dr, n.dr, m.bi, n.ci, m.di, n.di),
        addsub(m.br, n.ci, m.dr, n.di, m.bi, n.cr, m.di, n.dr)
    ])).value;
    el.moebius = {
        anti: m.anti !== n.anti,
        ar: v[0],
        ai: v[1],
        br: v[2],
        bi: v[3],
        cr: v[4],
        ci: v[5],
        dr: v[6],
        di: v[7]
    };
    geoOps._helper.moebiusPair(el);
};

geoOps._helper.euc2moeb = function(el) {
    var m = el.matrix.value;
    return {
        anti: el.isEuclidean < 0,
        ar: m[0].value[0],
        ai: m[1].value[0],
        br: m[0].value[2],
        bi: m[1].value[2],
        cr: CSNumber.zero,
        ci: CSNumber.zero,
        dr: m[2].value[2],
        di: CSNumber.zero
    };
};

geoOps.TrComposeMtMt = {};
geoOps.TrComposeMtMt.kind = "Mt";
geoOps.TrComposeMtMt.signature = ["Mt", "Mt"];
geoOps.TrComposeMtMt.updatePosition = function(el) {
    geoOps._helper.composeMtMt(
        el,
        csgeo.csnames[el.args[0]].moebius,
        csgeo.csnames[el.args[1]].moebius);
};

geoOps.TrComposeTrMt = {};
geoOps.TrComposeTrMt.kind = "Mt";
geoOps.TrComposeTrMt.signature = ["Tr", "Mt"];
geoOps.TrComposeTrMt.signatureConstraints = function(el) {
    return !!csgeo.csnames[el.args[0]].isEuclidean;
};
geoOps.TrComposeTrMt.updatePosition = function(el) {
    geoOps._helper.composeMtMt(
        el,
        geoOps._helper.euc2moeb(csgeo.csnames[el.args[0]]),
        csgeo.csnames[el.args[1]].moebius);
};

geoOps.TrComposeMtTr = {};
geoOps.TrComposeMtTr.kind = "Mt";
geoOps.TrComposeMtTr.signature = ["Mt", "Tr"];
geoOps.TrComposeMtTr.signatureConstraints = function(el) {
    return !!csgeo.csnames[el.args[1]].isEuclidean;
};
geoOps.TrComposeMtTr.updatePosition = function(el) {
    geoOps._helper.composeMtMt(
        el,
        csgeo.csnames[el.args[0]].moebius,
        geoOps._helper.euc2moeb(csgeo.csnames[el.args[1]]));
};

geoOps._helper.pointReflection = function(center, point) {
    // If center is at infinity, the result will be center unless point
    // is also at infinity, then the result is the ideal point [0, 0, 0].
    return List.normalizeMax(List.sub(
        List.scalmult(CSNumber.realmult(2, point.value[2]), center),
        List.scalmult(center.value[2], point)));
};

geoOps._helper.conicOtherIntersection = function(conic, a, b) {
    // With A a point on conic M, find the point on
    // line AB which also lies on that conic.
    // return BMB*A - 2*AMB*B
    var mb = List.productMV(conic, b);
    var bmb = List.scalproduct(b, mb);
    var amb = List.scalproduct(a, mb);
    var amb2 = CSNumber.realmult(-2, amb);
    var bmba = List.scalmult(bmb, a);
    var amb2b = List.scalmult(amb2, b);
    var res = List.add(bmba, amb2b);
    res = List.normalizeMax(res);
    return res;
};

geoOps.Dist = {};
geoOps.Dist.kind = "V";
geoOps.Dist.signature = ["P", "P"];
geoOps.Dist.updatePosition = function(el) {
    var a = csgeo.csnames[el.args[0]].homog;
    var b = csgeo.csnames[el.args[1]].homog;
    el.value = List.abs(List.sub(List.normalizeZ(a), List.normalizeZ(b)));
};

geoOps.Angle = {};
geoOps.Angle.kind = "V";
geoOps.Angle.signature = ["L", "L", "P"];
geoOps.Angle.initialize = function(el) {
    if (el.angle === undefined)
        el.angle = 0.5 * Math.PI;
    putStateComplexNumber(CSNumber._helper.input(el.angle));
};
geoOps.Angle.updatePosition = function(el) {
    var a = csgeo.csnames[el.args[0]].homog;
    var b = csgeo.csnames[el.args[1]].homog;
    var p = csgeo.csnames[el.args[2]].homog;
    var ap = List.cross(a, List.linfty);
    var bp = List.cross(b, List.linfty);
    var cr = List.crossratio3(ap, bp, List.ii, List.jj, p);
    var ang = CSNumber.mult(CSNumber.complex(0, 0.5), CSNumber.log(cr));
    var prev = getStateComplexNumber();
    var diff = (prev.value.real - ang.value.real) / Math.PI;
    var winding = Math.round(diff);
    if (!tracingInitial && Math.abs(winding - diff) > 1e-2)
        requestRefinement();
    ang = CSNumber.complex(winding * Math.PI + ang.value.real, ang.value.imag);
    putStateComplexNumber(ang);
    el.value = General.withUsage(ang, "Angle");
};
geoOps.Angle.stateSize = 2;

geoOps.Text = {};
geoOps.Text.kind = "Text";
geoOps.Text.signature = "**";
geoOps.Text.isMovable = true;
geoOps.Text.updatePosition = noop;
geoOps.Text.initialize = function(el) {
    el.text = String(el.text);
    if (el.pos) el.homog = geoOps._helper.initializePoint(el);
    if (el.dock) {
        if (el.dock.offset && el.dock.offset.length === 2)
            el.dock.offset = List.realVector([+el.dock.offset[0], +el.dock.offset[1]]);
        else
            el.dock.offset = List.realVector([0, 0]);
    }
};
geoOps.Text.getParamForInput = function(el, pos, type) {
    return geoOps.Free.getParamForInput(el, pos, type);
};
geoOps.Text.getParamFromState = function(el) {
    return el.homog;
};
geoOps.Text.putParamToState = function(el, param) {
    el.homog = param;
};

geoOps.Calculation = {};
geoOps.Calculation.kind = "Text";
geoOps.Calculation.signature = "**";
geoOps.Calculation.isMovable = true;
geoOps.Calculation.updatePosition = noop;
geoOps.Calculation.initialize = function(el) {
    geoOps.Text.initialize(el);
    el.calculation = analyse(el.text);
};
geoOps.Calculation.getText = function(el) {
    return niceprint(evaluate(el.calculation));
};
geoOps.Calculation.getParamForInput = geoOps.Text.getParamForInput;
geoOps.Calculation.getParamFromState = geoOps.Text.getParamFromState;
geoOps.Calculation.putParamToState = geoOps.Text.putParamToState;

geoOps.Equation = {};
geoOps.Equation.kind = "Text";
geoOps.Equation.isMovable = true;
geoOps.Equation.signature = "**";
geoOps.Equation.updatePosition = noop;
geoOps.Equation.initialize = function(el) {
    geoOps.Text.initialize(el);
    el.calculation = analyse(el.text);
};
geoOps.Equation.getText = function(el) {
    return el.text + " = " + niceprint(evaluate(el.calculation));
};
geoOps.Equation.getParamForInput = geoOps.Text.getParamForInput;
geoOps.Equation.getParamFromState = geoOps.Text.getParamFromState;
geoOps.Equation.putParamToState = geoOps.Text.putParamToState;

geoOps.Evaluate = {};
geoOps.Evaluate.kind = "Text";
geoOps.Evaluate.isMovable = true;
geoOps.Evaluate.signature = "**";
geoOps.Evaluate.updatePosition = noop;
geoOps.Evaluate.initialize = function(el) {
    geoOps.Text.initialize(el);
    el.calculation = analyse(el.text);
};
geoOps.Evaluate.getText = function(el) {
    evaluate(el.calculation); // ugly: side effects in draw
    return el.text;
};
geoOps.Evaluate.getParamForInput = geoOps.Text.getParamForInput;
geoOps.Evaluate.getParamFromState = geoOps.Text.getParamFromState;
geoOps.Evaluate.putParamToState = geoOps.Text.putParamToState;

geoOps.Plot = {};
geoOps.Plot.kind = "Text";
geoOps.Plot.isMovable = true;
geoOps.Plot.signature = "**";
geoOps.Plot.updatePosition = noop;
geoOps.Plot.initialize = function(el) {
    geoOps.Text.initialize(el);
    // Parenthesize expression to avoid modifier injection
    el.calculation = analyse("plot((" + el.text + "))");
};
geoOps.Plot.getText = function(el) {
    evaluate(el.calculation);
    return el.text;
};
geoOps.Plot.getParamForInput = geoOps.Text.getParamForInput;
geoOps.Plot.getParamFromState = geoOps.Text.getParamFromState;
geoOps.Plot.putParamToState = geoOps.Text.putParamToState;

function commonButton(el, event, button) {
    var outer = document.createElement("div");
    var img = document.createElement("img");
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUh" +
        "EUgAAAAEAAAPoCAQAAAC1v1zVAAAAGklEQVR42u3BMQEAAA" +
        "DCoPVPbQ0PoAAAgHcDC7gAAVI8ZnwAAAAASUVORK5CYII=";
    outer.className = "CindyJS-baseline";
    outer.appendChild(img);
    var inlinebox = document.createElement("div");
    inlinebox.className = "CindyJS-button";
    outer.appendChild(inlinebox);
    for (var i = 2; i < arguments.length; ++i)
        inlinebox.appendChild(arguments[i]);
    canvas.parentNode.appendChild(outer);
    el.html = arguments[arguments.length - 1];
    if (!isFiniteNumber(el.fillalpha))
        el.fillalpha = 1.0;
    if (el.fillcolor) {
        el.html.style.backgroundColor =
            Render2D.makeColor(el.fillcolor, el.fillalpha);
    }
    var onEvent = scheduleUpdate;
    if (el.script) {
        var code = analyse(el.script);
        onEvent = function() {
            evaluate(code);
            scheduleUpdate();
        };
    }
    button.addEventListener(event, onEvent);
    if (!instanceInvocationArguments.keylistener &&
        (cscompiled.keydown || cscompiled.keyup || cscompiled.keytyped)) {
        button.addEventListener("keydown", function(e) {
            if (e.keyCode === 9 /* tab */ ) return;
            cs_keydown(e);
        });
        button.addEventListener("keyup", function(e) {
            cs_keyup(e);
        });
        button.addEventListener("keypress", function(e) {
            if (e.keyCode === 9 /* tab */ ) return;
            cs_keytyped(e);
        });
    }
    geoOps.Text.initialize(el);
}

geoOps.Button = {};
geoOps.Button.kind = "Text";
geoOps.Button.signature = "**";
geoOps.Button.isMovable = true; // not using mouse, only via scripts
geoOps.Button.updatePosition = noop;
geoOps.Button.initialize = function(el) {
    var button = document.createElement("button");
    commonButton(el, "click", button);
};
geoOps.Button.getParamForInput = geoOps.Text.getParamForInput;
geoOps.Button.getParamFromState = geoOps.Text.getParamFromState;
geoOps.Button.putParamToState = geoOps.Text.putParamToState;
geoOps.Button.set_fillcolor = function(el, value) {
    if (List._helper.isNumberVecN(value, 3)) {
        el.fillcolor = value.value.map(function(i) {
            return i.value.real;
        });
        el.html.style.backgroundColor =
            Render2D.makeColor(el.fillcolor, el.fillalpha);
    }
};

geoOps.ToggleButton = {};
geoOps.ToggleButton.kind = "Text";
geoOps.ToggleButton.signature = "**";
geoOps.ToggleButton.isMovable = true; // not using mouse, only via scripts
geoOps.ToggleButton.updatePosition = noop;
geoOps.ToggleButton.initialize = function(el) {
    var id = generateId();
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    checkbox.setAttribute("id", id);
    label.setAttribute("for", id);
    checkbox.setAttribute("type", "checkbox");
    if (el.pressed)
        checkbox.checked = true;
    el.checkbox = checkbox;
    commonButton(el, "change", checkbox, label);
};
geoOps.ToggleButton.getParamForInput = geoOps.Text.getParamForInput;
geoOps.ToggleButton.getParamFromState = geoOps.Text.getParamFromState;
geoOps.ToggleButton.putParamToState = geoOps.Text.putParamToState;
geoOps.ToggleButton.set_fillcolor = geoOps.Button.set_fillcolor;

geoOps.EditableText = {};
geoOps.EditableText.kind = "Text";
geoOps.EditableText.isMovable = true; // not using mouse, only via scripts
geoOps.EditableText.signature = [];
geoOps.EditableText.updatePosition = noop;
geoOps.EditableText.initialize = function(el) {
    var textbox = document.createElement("input");
    textbox.setAttribute("type", "text");
    textbox.className = "CindyJS-editabletext";
    if (isFiniteNumber(el.minwidth))
        textbox.style.width = (el.minwidth - 3) + "px";
    if (typeof el.text === "string")
        textbox.value = el.text;
    textbox.addEventListener("keydown", function(event) {
        if (event.keyCode === 13)
            textbox.blur();
    });
    commonButton(el, "change", textbox);
};
geoOps.EditableText.getText = function(el) {
    return false;
};
geoOps.EditableText.getParamForInput = geoOps.Text.getParamForInput;
geoOps.EditableText.getParamFromState = geoOps.Text.getParamFromState;
geoOps.EditableText.putParamToState = geoOps.Text.putParamToState;
geoOps.EditableText.set_fillcolor = geoOps.Button.set_fillcolor;
geoOps.EditableText.get_currenttext = function(el) {
    return General.string(String(el.html.value));
};
geoOps.EditableText.set_currenttext = function(el, value) {
    el.html.value = niceprint(value);
};
geoOps.EditableText.get_text = geoOps.EditableText.get_currenttext;
geoOps.EditableText.set_text = geoOps.EditableText.set_currenttext;

function noop() {}

geoOps._helper.initializePoint = function(el) {
    var sx = 0;
    var sy = 0;
    var sz = 0;
    if (el.pos) {
        if (el.pos.ctype === "list" && List.isNumberVector(el.pos)) {
            return el.pos;
        }
        if (el.pos.length === 2) {
            sx = el.pos[0];
            sy = el.pos[1];
            sz = 1;
        }
        if (el.pos.length === 3) {
            sx = el.pos[0];
            sy = el.pos[1];
            sz = el.pos[2];
        }
    }
    var pos = List.turnIntoCSList([
        CSNumber._helper.input(sx),
        CSNumber._helper.input(sy),
        CSNumber._helper.input(sz)
    ]);
    pos = List.normalizeMax(pos);
    return pos;
};

geoOps._helper.initializeLine = function(el) {
    var sx = 0;
    var sy = 0;
    var sz = 0;
    if (el.pos) {
        if (el.pos.ctype === "list" && List.isNumberVector(el.pos)) {
            return el.pos;
        }
        if (el.pos.length === 3) {
            sx = el.pos[0];
            sy = el.pos[1];
            sz = el.pos[2];
        }
    }
    var pos = List.turnIntoCSList([
        CSNumber._helper.input(sx),
        CSNumber._helper.input(sy),
        CSNumber._helper.input(sz)
    ]);
    pos = List.normalizeMax(pos);
    return pos;
};


geoOps.Poly = {};
geoOps.Poly.kind = "Poly";
geoOps.Poly.signature = "P*";
geoOps.Poly.updatePosition = function(el) {
    el.vertices = List.turnIntoCSList(el.args.map(function(x) {
        return csgeo.csnames[x].homog;
    }));
};

geoOps._helper.snapPointToLine = function(pos, line) {
    // fail safe for far points
    if (CSNumber._helper.isAlmostZero(pos.value[2])) return pos;
    // project point to line - useful for semi free elements
    var projPos = geoOps._helper.projectPointToLine(pos, line);
    projPos = List.normalizeZ(projPos);

    var sx = projPos.value[0].value.real;
    var sy = projPos.value[1].value.real;
    var rx = Math.round(sx / csgridsize) * csgridsize;
    var ry = Math.round(sy / csgridsize) * csgridsize;
    var newpos = List.realVector([rx, ry, 1]);
    if (Math.abs(rx - sx) < 0.2 && Math.abs(ry - sy) < 0.2 &&
        CSNumber._helper.isAlmostZero(List.scalproduct(line, newpos))) {
        pos = geoOps._helper.projectPointToLine(newpos, line);
    }
    return pos;
};


var geoAliases = {
    "CircleByRadius": "CircleMr",
    "IntersectionCircleCircle": "IntersectCirCir",
    "IntersectionConicConic": "IntersectConicConic",
    "FreePoint": "Free",
    "Orthogonal": "Perp",
    "Parallel": "Para",
    "Pole": "PolarOfLine",
    "Polar": "PolarOfPoint",
    "Arc": "ArcBy3",
    "EuclideanMid": "Mid",
    "AngularBisector": "AngleBisector",
    "TransformConic": "TransformC",
    "TransformSegment": "TransformS",
    "TrMoebiusSegment": "TrMoebiusS",
    "ReflectCC": "TrMoebiusC",
    "ReflectCL": "TrMoebiusL",
    "ReflectCP": "TrMoebiusP",
    "ReflectCArc": "TrMoebiusArc",
    "ReflectCS": "TrMoebiusS",
    "TrMoebiusCircle": "TrMoebiusC"
};

var geoMacros = {};

/* Note: currently the expansion of a macro is simply included in the
 * gslp.  This means that objects from the expansion will currently
 * end up in the allpoints() resp. alllines() results.  It might make
 * sense to actively excude elements from these by setting some flag,
 * but that hasn't been implemented yet.
 */

geoMacros.CircleMFixedr = function(el) {
    el.pinned = true;
    el.type = "CircleMr";
    return [el];
};

geoMacros.CircleByFixedRadius = function(el) {
    el.pinned = true;
    el.type = "CircleMr";
    return [el];
};

geoMacros.IntersectionConicLine = function(el) {
    el.args = [el.args[1], el.args[0]];
    el.type = "IntersectLC";
    return [el];
};

geoMacros.angleBisector = function(el) {
    var point = {
        name: el.name + "_Intersection",
        type: "Meet",
        args: el.args,
        visible: false
    };
    el.type = "AngleBisector";
    el.args = [el.args[0], el.args[1], point.name];
    return [point, el];
};

geoMacros.Transform = function(el) {
    var arg = csgeo.csnames[el.args[1]];
    var tr = csgeo.csnames[el.args[0]];
    // workaround for Arcs since we treat them as circles
    var akind = arg.isArc ? "Arc" : arg.kind;

    var map = {
        Tr: "Transform",
        Mt: "TrMoebius"
    };
    var op = map[tr.kind] + akind;
    if (geoOps.hasOwnProperty(op)) {
        el.type = op;
        return [el];
    } else {
        console.log(op + " not implemented yet");
        return [];
    }
};

geoMacros.TrReflection = function(el) {
    var op = "TrReflection" + csgeo.csnames[el.args[0]].kind;
    if (geoOps.hasOwnProperty(op)) {
        el.type = op;
        return [el];
    } else {
        console.log(op + " not implemented yet");
        return [];
    }
};

geoMacros.TrCompose = function(el) {
    var op = "TrCompose" + el.args.map(function(name) {
        return csgeo.csnames[name].kind;
    }).join("");
    if (geoOps.hasOwnProperty(op)) {
        el.type = op;
        return [el];
    } else {
        console.log(op + " not implemented yet");
        return [];
    }
};
var geoscripts = {};
// Functions to save and restore geometric state

var attributesToClone = [
    //"_traces", // internal
    //"_traces_index", // internal
    //"_traces_tick", // internal
    "align",
    "alpha",
    "angle", // LineByFixedAngle, may need update once we have inspect
    //"antipodalPoint", // internal, PointOnCircle to OtherPointOnCircle
    "args",
    "arrow",
    "arrowposition",
    "arrowshape",
    "arrowsides",
    "arrowsize",
    //"behavior", // needs dedicated code
    //"calculation", // internal
    "clip",
    "color",
    "dashtype",
    //"dir", // Through, not needed if we export pos
    //"dock", // needs dedicated code
    "drawtrace",
    //"dualMatrix", // output for conic
    //"endPoint", // output for arc
    //"endpos", // output for segment
    //"farpoint", // output for segment
    "fillalpha",
    "fillcolor",
    "filled", // drawgeoarc
    //"homog", // save as pos
    //"incidences", // internal
    //"index", // should not be used, select by pos
    //"isArc", // internal
    //"isshowing", // internal
    //"kind", // internal
    "labeled",
    "labelpos",
    //"mat1", // output of Möbius transformations
    //"mat2", // output of Möbius transformations
    //"matrix", // output of conic or transform
    //"movable", // internal
    "name",
    "overhang",
    //"param", // internal
    "pinned",
    //"pos", // needs dedicated code
    "printname",
    "radius", // CircleMr, does seem to update this
    //"results", // output of multi-valued operations
    //"rot", // internal, LineByFixedAngle
    //"sclRsq", // internal, TrReflectionC
    "size",
    //"startPoint", // output for arc
    //"startpos", // output for segment
    //"stateIdx", // internal
    "text",
    "text_fontfamily",
    "textbold",
    "textitalics",
    "textsize",
    //"tooClose", // internal
    "tracedim",
    "tracelength",
    "traceskip",
    "tracing",
    "type",
    //"viaPoint", // output for arc
    "visible",
];

function savePos(el) {
    if (!(/^Select/.test(el.type) || geoOps[el.type].isMovable))
        return null; // Fully determined by arguments, no position needed
    var unwrap = General.unwrap;
    var sum = CSNumber.add;
    switch (el.kind) {
        case "P":
        case "L":
        case "Text":
            return unwrap(el.homog);
        case "C":
            var mat = el.matrix.value;
            return {
                xx: unwrap(mat[0].value[0]),
                yy: unwrap(mat[1].value[1]),
                zz: unwrap(mat[2].value[2]),
                xy: unwrap(sum(mat[0].value[1], mat[1].value[0])),
                xz: unwrap(sum(mat[0].value[2], mat[2].value[0])),
                yz: unwrap(sum(mat[1].value[2], mat[2].value[1])),
            };
        default:
            return null;
    }
}

function saveDockingInfo(dock) {
    var res = {};
    res.offset = General.unwrap(dock.offset);
    if (dock.to) res.to = dock.to; // String
    if (dock.corner) res.corner = dock.corner; // String
    return res;
}

function saveGeoElement(el) {
    var res = {};
    attributesToClone.forEach(function(key) {
        if (!el.hasOwnProperty(key)) return;
        var val = General.unwrap(el[key]);
        if (val !== null && val !== undefined)
            res[key] = val;
    });
    if (el.kind === "P" && (!el.movable || el.pinned) && res.color) {
        var undim = CSNumber.real(1 / defaultAppearance.dimDependent);
        res.color = General.unwrap(List.scalmult(undim, el.color));
    }
    var pos = savePos(el);
    if (pos) res.pos = pos;
    if (el.dock) res.dock = saveDockingInfo(el.dock);
    return res;
}

function saveGeoState() {
    var res = [];
    csgeo.gslp.forEach(function(el) {
        if (el.tmp) return;
        res.push(saveGeoElement(el));
    });
    return res;
}

globalInstance.saveState = function() {
    return {
        geometry: saveGeoState(),
    };
};
var lab = {};

var doPri45 = {};


doPri45.a = [
    [],
    [1 / 5],
    [3 / 40, 9 / 40],
    [44 / 45, -56 / 15, 32 / 9],
    [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
    [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]
];
doPri45.dt = [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
doPri45.b1 = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
doPri45.b2 = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40];
doPri45.size = 7; //is this 5, 6 or 7

var fehlberg78 = {};

fehlberg78.a = [
    [],
    [2 / 27],
    [1 / 36, 1 / 12],
    [1 / 24, 0, 1 / 8],
    [5 / 12, 0, -25 / 16, 25 / 16],
    [1 / 20, 0, 0, 1 / 4, 1 / 5],
    [-25 / 108, 0, 0, 125 / 108, -65 / 27, 125 / 54],
    [31 / 300, 0, 0, 0, 61 / 225, -2 / 9, 13 / 900],
    [2, 0, 0, -53 / 6, 704 / 45, -107 / 9, 67 / 90, 3],
    [-91 / 108, 0, 0, 23 / 108, -976 / 135, 311 / 54, -19 / 60, 17 / 6, -1 / 12],
    [2383 / 4100, 0, 0, -341 / 164, 4496 / 1025, -301 / 82, 2133 / 4100, 45 / 82, 45 / 164, 18 / 41],
    [3 / 205, 0, 0, 0, 0, -6 / 41, -3 / 205, -3 / 41, 3 / 41, 6 / 41, 0],
    [-1777 / 4100, 0, 0, -341 / 164, 4496 / 1025, -289 / 82, 2193 / 4100, 51 / 82, 33 / 164, 12 / 41, 0, 1],
    [0, 0, 0, 0, 0, 34 / 105, 9 / 35, 9 / 35, 9 / 280, 9 / 280, 0, 41 / 840, 41 / 840]
];
fehlberg78.dt = [0, 2 / 27, 1 / 9, 1 / 6, 5 / 12, 1 / 2, 5 / 6, 1 / 6, 2 / 3, 1 / 3, 1, 0, 1];
fehlberg78.b1 = [0, 0, 0, 0, 0, 34 / 105, 9 / 35, 9 / 35, 9 / 280, 9 / 280, 0, 41 / 840, 41 / 840];
fehlberg78.b2 = [41 / 840, 0, 0, 0, 0, 34 / 105, 9 / 35, 9 / 35, 9 / 280, 9 / 280, 41 / 840, 0, 0];
fehlberg78.size = 13;


//var rk = fehlberg78;
var rk = doPri45;
var behaviors;
var masses = [];
var springs = [];
var csPhysicsInited = false;

function csresetphys() {
    behaviors.forEach(function(beh) {
        var geo = (beh.geo || []).map(function(name) {
            return csgeo.csnames[name];
        });
        labObjects[beh.type].reset(beh, geo[0], geo);
    });
}


function csinitphys(behavs) {
    csPhysicsInited = (behavs.length !== 0);
    //console.log(csPhysicsInited);

    behaviors = [];
    masses = [];
    springs = [];

    labObjects.Environment.init({}); // Set defaults
    behavs.forEach(function(beh) {
        if (beh.behavior) { // Legacy format
            if (beh.name) {
                beh.behavior.geo = [beh.name];
            }
            beh = beh.behavior;
            if (beh.gravity) {
                beh.gravity = -beh.gravity; // positive was up but now is down
            }
        } else {
            geo = beh.geo;
        }
        var geo = (beh.geo || []).map(function(name) {
            return csgeo.csnames[name];
        });
        var mainGeo = geo[0]; // may be undefined!
        var op = labObjects[beh.type];
        if (!op) {
            console.error(beh);
            console.error("Behavior " + beh.type + " not implemented yet");
            return;
        }
        if (op.init) {
            op.init(beh, mainGeo, geo);
        }
        if (mainGeo) {
            mainGeo.behavior = beh;
            if (beh.type === "Mass") {
                masses.push(mainGeo);
            } else if (beh.type === "Spring") {
                springs.push(mainGeo);
            }
        }
        behaviors.push(beh);
    });

}


lab.tick = function(deltat) {
    deltat = deltat / simaccuracy;
    for (var i = 0; i < simaccuracy; i++) {
        lab.tick1(deltat);
        simtime += deltat;
        cs_simulationstep();
    }
};

lab.tick1 = function(deltat) {

    var mydeltat = deltat;


    var proceeded = 0;
    var actualdelta;

    while (deltat > 0 && proceeded < deltat * 0.999 || deltat < 0 && proceeded > deltat * 0.999) {


        actualdelta = lab.oneRKStep(mydeltat);

        proceeded += actualdelta;
        mydeltat = Math.min(actualdelta * 2, deltat - proceeded);
        mydeltat = Math.max(mydeltat, 0.0000000000000001);
        lab.restorePosition();
        lab.doCollisions();
        lab.calculateForces();
        lab.moveToFinalPos();
    }
    return true;
};

lab.restorePosition = function() {
    behaviors.forEach(function(beh) {
        labObjects[beh.type].restorePos(beh, rk.size + 2);
    });
    //for (Behavior beh : all) {
    //    if (!beh.getBlock()) {
    //        beh.restorePos(rk.getSize() + 2);
    //    }
    //}
};

lab.doCollisions = function() {
    behaviors.forEach(function(beh) {
        labObjects[beh.type].doCollisions(beh);
    });

};

lab.calculateForces = function() {
    behaviors.forEach(function(beh) {
        labObjects[beh.type].calculateForces(beh);
    });
    //dispatcher.callScriptsForOccasion(Assignments.OCCASION_STEP);
    //for (Behavior anAll : all) {
    //    if (!anAll.getBlock()) {
    //        anAll.calculateForces();
    //    }
    //}
};
lab.moveToFinalPos = function() {
    behaviors.forEach(function(beh) {
        labObjects[beh.type].move(beh);
    });
    //for (Behavior beh : all) {
    //    if (!beh.getBlock()) {
    //        beh.move();
    //    }
    //}
};


lab.oneRKStep = function(mydeltat) {

    var initRKTimeStep = function(deltat) {

        behaviors.forEach(function(beh) {
            labObjects[beh.type].initRK(beh, deltat);
            labObjects[beh.type].storePosition(beh);
        });
        //for (Behavior anAll : all) {
        //    if (!anAll.getBlock()) {
        //        anAll.initRK(mydeltat);
        //        anAll.storePosition();
        //    }
        //}
    };

    var setToTimestep = function(j) {
        behaviors.forEach(function(beh) {
            labObjects[beh.type].setToTimestep(beh, rk.dt[j]);
        });
        //   for (Behavior anAll : all) {
        //   if (!anAll.getBlock()) {
        //       anAll.setToTimestep(rk.getDt(j));
        //   }
        //}
    };

    var proceedMotion = function(j) {
        behaviors.forEach(function(beh) {
            labObjects[beh.type].proceedMotion(beh, rk.dt[j], j, rk.a[j]);
        });
        //for (Behavior anAll : all) {
        //    if (!anAll.getBlock()) {
        //        anAll.proceedMotion(rk.getDt(j), j, rk.getA(j));
        //    }
        //}

    };

    var resetForces = function() {
        behaviors.forEach(function(beh) {
            labObjects[beh.type].resetForces(beh);
        });
        //for (Behavior anAll : all) {
        //    if (!anAll.getBlock()) {
        //        anAll.resetForces();
        //    }
        //}
    };

    var calculateDelta = function(j) {
        behaviors.forEach(function(beh) {
            labObjects[beh.type].calculateDelta(beh, j);
        });
        //for (Behavior anAll : all) {
        //    if (!anAll.getBlock()) {
        //        anAll.calculateDelta(j);
        //    }
        //}
    };


    var calculateError = function(j) {
        var error = 0;
        behaviors.forEach(function(beh) {
            var j = rk.size;
            labObjects[beh.type].proceedMotion(beh, rk.dt[j - 1], j, rk.b1);
            labObjects[beh.type].savePos(beh, j + 1);
            labObjects[beh.type].proceedMotion(beh, rk.dt[j - 1], j, rk.b2);
            labObjects[beh.type].savePos(beh, j + 2);
            error += labObjects[beh.type].sqDist(beh, j + 1, j + 2);

        });

        error = Math.sqrt(error) / mydeltat;
        return error;

        //var error = 0;
        //for (Behavior beh : all) {
        //    if (!beh.getBlock()) {
        //        beh.proceedMotion(rk.getDt(rk.getSize() - 1), rk.getSize(), rk.getB1());
        //        beh.savePos(rk.getSize() + 1);
        //        beh.proceedMotion(rk.getDt(rk.getSize() - 1), rk.getSize(), rk.getB2());
        //        beh.savePos(rk.getSize() + 2);
        //        error += beh.sqDist(rk.getSize() + 1, rk.getSize() + 2);
        //    }
        //}
        //error = Math.sqrt(error) / mydeltat;
        //return error;
    };

    var recallInitialPosition = function(j) {
        behaviors.forEach(function(beh) {
            labObjects[beh.type].recallPosition(beh);
        });

        //for (Behavior beh : all) {
        //    if (!beh.getBlock()) {
        //        beh.recallPosition();
        //    }
        //}
    };


    var rksize = rk.size;
    var madeIt = false;
    while (!madeIt) {
        initRKTimeStep(mydeltat);
        for (var j = 0; j < rksize; j++) {
            setToTimestep(j);
            proceedMotion(j);
            resetForces();
            lab.calculateForces();
            calculateDelta(j);

        }
        var error = calculateError(mydeltat);
        //console.log(error);
        //console.log(mydeltat);
        if (error > labObjects.env.errorbound && mydeltat > labObjects.env.lowestdeltat) {
            //          if (error > 0.0001 && mydeltat > 0.0000000001) {
            mydeltat /= labObjects.env.slowdownfactor;
            //            mydeltat /= 4;
            recallInitialPosition();
        } else {

            madeIt = true;
        }

    }


    return mydeltat;
};
var labObjects = {};

/*----------------------------MASS--------------------------*/


labObjects.Mass = {

    reset: function(beh, elem) {
        beh.vel = [0, 0, 0]; //TODO: Das wird später mal die Velocity
        beh.pos = [0, 0, 0, 0]; //Position (homogen) 


        beh.el = elem;
        if (typeof(beh.mass) === 'undefined') beh.mass = 1;
        if (typeof(beh.charge) === 'undefined') beh.charge = 0;
        if (typeof(beh.friction) === 'undefined') beh.friction = 0;
        beh.lnfrict = 0;
        if (typeof(beh.limitspeed) === 'undefined') beh.limitspeed = false;
        if (typeof(beh.fixed) === 'undefined') beh.fixed = false;
        if (typeof(beh.radius) === 'undefined') beh.radius = 1;
        beh.internalmove = false;

        beh.fx = 0;
        beh.fy = 0;
        beh.fz = 0;
        beh.vx = beh.vx || 0;
        beh.vy = beh.vy || 0;
        beh.vz = beh.vz || 0;

        beh.mtype = 0; // TODO: Free, Online, OnCircle

        var x = 0;
        var y = 0;
        var z = 0;
        var xo = 0;
        var yo = 0;
        var zo = 0;
        var vxo = 0;
        var vyo = 0;
        var vzo = 0;
        /*  var x,y,z,xo,yo,zo,vxo,vyo,vzo,oldx,oldy,oldz;
        var oldx1,oldy1,oldz1;
        var oldx2,oldy2,oldz2;
        var oldx3,oldy3,oldz3;
        var oldx4,oldy4,oldz4;*/

        beh.env = labObjects.env; //TODO Environment

        //For Runge Kutta
        beh.deltat = 0;
        beh.mx = 0;
        beh.my = 0;
        beh.mz = 0;
        beh.mvx = 0;
        beh.mvy = 0;
        beh.mvz = 0;
        beh.dx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.dy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.dz = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.dvx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.dvy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.dvz = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        beh.midx = 0;
        beh.midy = 0;
        beh.midz = 0;
        beh.lx = 0;
        beh.ly = 0;
        beh.lz = 0;


    },

    resetForces: function(beh) {
        beh.fx = 0;
        beh.fy = 0;
        beh.fz = 0;

    },

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {
        var pt = eval_helper.extractPoint(beh.el.homog);

        beh.x = pt.x;
        beh.y = pt.y;
        beh.z = 0;
        beh.xo = beh.x;
        beh.yo = beh.y;
        beh.zo = beh.z;
        beh.vxo = beh.vx;
        beh.vyo = beh.vy;
        beh.vzo = beh.vz;
        beh.deltat = dt;

        beh.fx = 0;
        beh.fy = 0;
        beh.fz = 0;

        /* TODO Implement this
            if (type === TYPE_POINTONCIRCLE) {
                Vec mid = ((PointOnCircle) associatedPoint.algorithm).getCenter();
                midx = mid.xr / mid.zr;
                midy = mid.yr / mid.zr;
                
            }
        if (type === TYPE_POINTONLINE) {
            Vec line = ((PointOnLine) associatedPoint.algorithm).getLine().coord;
            lx = line.yr;
            ly = -line.xr;
            double n = Math.sqrt(lx * lx + ly * ly);
            lx /= n; //Das ist die normierte Geradenrichtung
            ly /= n;
        } 
        */
    },

    setVelocity: function(beh, vx, vy, vz) {
        if (!vz) vz = 0;
        //if (type === TYPE_FREE) {
        if (true) {
            beh.vx = vx;
            beh.vy = vy;
            beh.vz = vz;
        }

        /* TODO Implement
            if (type === TYPE_POINTONCIRCLE) {
                double x = associatedPoint.coord.xr / associatedPoint.coord.zr;
                double y = associatedPoint.coord.yr / associatedPoint.coord.zr;
                Vec mid = ((PointOnCircle) associatedPoint.algorithm).getCenter();
                double midx = mid.xr / mid.zr;
                double midy = mid.yr / mid.zr;
                double dix = y - midy;  //Steht senkrecht auf Radius
                double diy = -x + midx;
                double n = Math.sqrt(dix * dix + diy * diy);
                dix /= n;
                diy /= n;
                double scal = dix * vx + diy * vy;//Es wird nur die wirsame kraftmomponente berücksichtigt
                    
                    this.vx = dix * scal;
                    this.vy = diy * scal;
            }
        if (type === TYPE_POINTONLINE) {
            Vec line = ((PointOnLine) associatedPoint.algorithm).getLine().coord;
            double lx = line.yr;
            double ly = -line.xr;
            double n = Math.sqrt(lx * lx + ly * ly);
            lx /= n; //Das ist die normierte Geradenrichtung
            ly /= n;
            double scal = lx * vx + ly * vy;//Es wird nur die wirsame kraftmomponente berücksichtigt
                this.vx = lx * scal;
                this.vy = ly * scal;
        }
        */


    },


    move: function(beh) {
        // if (type === TYPE_FREE) {
        if (true) {
            beh.pos = [beh.x, beh.y, 1.0];
            beh.internalmove = true;
            if (!move || !mouse.down || beh.el !== move.mover)
                movepointscr(beh.el, List.realVector(beh.pos), "homog");
            (beh.el).sx = beh.x;
            (beh.el).sy = beh.y;

            beh.internalmove = false;
        }


        /*
         if (kernel.simulation.containsMover(associatedPoint)) {
             //Hier wird "werfen" implementiert
             voldx4 = voldx3;
             voldy4 = voldy3;
             voldx3 = voldx2;
             voldy3 = voldy2;
             voldx2 = voldx1;
             voldy2 = voldy1;
             voldx1 = x;
             voldy1 = y;
             x = associatedPoint.coord.xr / associatedPoint.coord.zr;
             y = associatedPoint.coord.yr / associatedPoint.coord.zr;
             //reset();
             fx = 0;
             fy = 0;
             vx = (x - voldx4) / 2.0;
             vy = (y - voldy4) / 2.0;
             return;
         }
         if (type === TYPE_FREE) {
             pos.assign(x, y, 1.0);
             internalmove = true;
             kernel.construction.simulateMoveUnlessFixedByMouse(associatedPoint, pos);
             internalmove = false;
         }
         if (type === TYPE_POINTONCIRCLE) {
             double dix = y - midy;  //Steht senkrecht auf radius
             double diy = -x + midx;
             double n = Math.sqrt(dix * dix + diy * diy);
             dix /= n;
             diy /= n;
             n = Math.sqrt(vx * vx + vy * vy);
             dix *= n;
             diy *= n;
             double scal = dix * vx + diy * vy;
             if (scal < 0) {
                 vx = -dix;
                 vy = -diy;
             } else {
                 vx = dix;
                 vy = diy;
             }
             pos.assign(x, y, 1.0);
             internalmove = true;
             kernel.construction.simulateMoveUnlessFixedByMouse(associatedPoint, pos);
             internalmove = false;
         }
         if (type === TYPE_POINTONLINE) {
             
             double scal = lx * vx + ly * vy;
             vx = scal * lx;
             vy = scal * ly;
             
             pos.assign(x, y, 1.0);
             internalmove = true;
             kernel.construction.simulateMoveUnlessFixedByMouse(associatedPoint, pos);
             internalmove = false;
         }
         
         */
    },

    proceedMotion: function(beh, dt, i, a) {

        if (!beh.fixed
            //&& !associatedPoint.appearance.isPinned()   //TODO
        ) {

            if (true) {

                beh.x = beh.mx;
                beh.y = beh.my;
                beh.z = beh.mz;
                beh.vx = beh.mvx;
                beh.vy = beh.mvy;
                beh.vz = beh.mvz;
                for (var j = 0; j < i; j++) {
                    beh.x += a[j] * beh.dx[j] * beh.deltat;
                    beh.y += a[j] * beh.dy[j] * beh.deltat;
                    beh.z += a[j] * beh.dz[j] * beh.deltat;
                    beh.vx += a[j] * beh.dvx[j] * beh.deltat;
                    beh.vy += a[j] * beh.dvy[j] * beh.deltat;
                    beh.vz += a[j] * beh.dvz[j] * beh.deltat;
                }
            } else {
                beh.vx = 0;
                beh.vy = 0;
                beh.vz = 0;
            }
        }
    },

    calculateForces: function(beh) {
        var bv = Math.sqrt(beh.vx * beh.vx + beh.vy * beh.vy + beh.vz * beh.vz);
        var bvv = (bv > 0.1 && beh.limitSpeed) ? 0.1 / bv : 1;
        var fri = (1 - beh.env.friction) * bvv;
        beh.lnfrict = -Math.log((1 - beh.friction) * fri);

        //        if (Double.isInfinite(lnfrict)) lnfrict = 10000000000000.0; TODO
        beh.fx += -beh.vx * beh.lnfrict * beh.mass; //Reibung F_R=v*f*m (richtige Formel ?)
        beh.fy += -beh.vy * beh.lnfrict * beh.mass;
        beh.fz += -beh.vz * beh.lnfrict * beh.mass;

    },

    calculateDelta: function(beh, i) {

        //  if (type === TYPE_FREE) {
        if (true) {
            beh.dx[i] = beh.vx; //x'=v
            beh.dy[i] = beh.vy;
            beh.dz[i] = beh.vz;
            beh.dvx[i] = beh.fx / beh.mass; //v'=F/m
            beh.dvy[i] = beh.fy / beh.mass;
            beh.dvz[i] = beh.fz / beh.mass;
        }
        /* TODO Implement
        if (type === TYPE_POINTONCIRCLE) {
            double dix = y - midy;  //Steht senkrecht auf Radius
            double diy = -x + midx;
            double n = Math.sqrt(dix * dix + diy * diy);
            dix /= n;
            diy /= n;
            double scal = dix * fx + diy * fy;//Es wird nur die wirsame kraftmomponente berücksichtigt
                dx[i] = vx;             //x'=v
                dy[i] = vy;
                dvx[i] = dix * scal / mass;       //v'=F/m
                dvy[i] = diy * scal / mass;
        }
        if (type === TYPE_POINTONLINE) {
            double scal = lx * fx + ly * fy;//Es wird nur die wirsame kraftmomponente berücksichtigt
            dx[i] = vx;             //x'=v
            dy[i] = vy;
            dvx[i] = lx * scal / mass;       //v'=F/m
            dvy[i] = ly * scal / mass;
        }
        */


    },

    savePos: function(beh, i) {
        beh.dx[i] = beh.x;
        beh.dy[i] = beh.y;
        beh.dz[i] = beh.z;
        beh.dvx[i] = beh.vx;
        beh.dvy[i] = beh.vy;
        beh.dvz[i] = beh.vz;
    },

    restorePos: function(beh, i) {

        if (!beh.fixed) {
            beh.x = beh.dx[i];
            beh.y = beh.dy[i];
            beh.z = beh.dz[i];
            beh.vx = beh.dvx[i];
            beh.vy = beh.dvy[i];
            beh.vz = beh.dvz[i];
        }
    },


    sqDist: function(beh, i, j) {
        var dist = (beh.dx[i] - beh.dx[j]) * (beh.dx[i] - beh.dx[j]);
        dist += (beh.dy[i] - beh.dy[j]) * (beh.dy[i] - beh.dy[j]);
        dist += (beh.dz[i] - beh.dz[j]) * (beh.dz[i] - beh.dz[j]);
        dist += (beh.dvx[i] - beh.dvx[j]) * (beh.dvx[i] - beh.dvx[j]);
        dist += (beh.dvy[i] - beh.dvy[j]) * (beh.dvy[i] - beh.dvy[j]);
        dist += (beh.dvz[i] - beh.dvz[j]) * (beh.dvz[i] - beh.dvz[j]);
        return dist;
    },

    kineticEnergy: function(beh) {
        var vsq = beh.vx * beh.vx + beh.vy * beh.vy + beh.vz * beh.vz;
        return 0.5 * beh.mass * vsq;
    },

    storePosition: function(beh) {
        beh.mx = beh.x;
        beh.my = beh.y;
        beh.mz = beh.z;
        beh.mvx = beh.vx;
        beh.mvy = beh.vy;
        beh.mvz = beh.vz;
    },

    recallPosition: function(beh) {
        if (!beh.fixed) {
            beh.x = beh.mx;
            beh.y = beh.my;
            beh.z = beh.mz;
            beh.vx = beh.mvx;
            beh.vy = beh.mvy;
            beh.vz = beh.mvz;
        }
    },

    doCollisions: function(beh) {}


};

/*----------------------------SUN--------------------------*/


labObjects.Sun = {

    reset: function(beh, elem) {
        beh.vel = [0, 0, 0]; //TODO: Das wird später mal die Velocity
        beh.pos = [0, 0, 0, 0]; //Position (homogen) 

        beh.el = elem;
        if (typeof(beh.mass) === 'undefined') beh.mass = 10;
        if (typeof(beh.friction) === 'undefined') beh.friction = 0;

        beh.charge = 0;
        beh.x = 0;
        beh.y = 0;
        beh.z = 0;

    },

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {
        var pt = eval_helper.extractPoint(beh.el.homog);

        beh.x = pt.x;
        beh.y = pt.y;
        beh.z = 0;
    },

    setVelocity: function(beh, vx, vy, vz) {},


    move: function(beh) {},

    proceedMotion: function(beh, dt, i, a) {},

    calculateDelta: function(beh, i) {},


    calculateForces: function(beh) {

        var x1 = beh.x;
        var y1 = beh.y;
        var z1 = beh.z;
        for (var i = 0; i < masses.length; i++) {
            var m = masses[i];
            var x2 = m.behavior.x;
            var y2 = m.behavior.y;
            var z2 = m.behavior.z;
            var l = Math.sqrt(
                (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)
            );
            var fx = (x1 - x2) * beh.mass * m.behavior.mass / (l * l * l);
            var fy = (y1 - y2) * beh.mass * m.behavior.mass / (l * l * l);
            var fz = (z1 - z2) * beh.mass * m.behavior.mass / (l * l * l);
            m.behavior.fx += fx * m.behavior.mass;
            m.behavior.fy += fy * m.behavior.mass;
            m.behavior.fz += fz * m.behavior.mass;


        }


        /*    masses = kernel.simulation.masses;
              double x1 = p1.coord.xr / p1.coord.zr;
              double y1 = p1.coord.yr / p1.coord.zr;
              for (int i = 0; i < masses.size(); i++) {
                  Mass m = ((Mass) masses.elementAt(i));
                  double x2 = m.x;
                  double y2 = m.y;
                  double l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                  double fx = (x1 - x2) * mass * m.mass / (l * l * l);
                  double fy = (y1 - y2) * mass * m.mass / (l * l * l);
                  m.fx += fx * m.mass;
                  m.fy += fy * m.mass;
              }
              */


    },

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},


    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {}


};


/*-------------------------VELOCITY-----------------------*/
labObjects.Velocity = {


    reset: function(beh) {
        var mass = csgeo.csnames[beh.geo[1]];
        console.log(mass);
        var base = eval_helper.extractPoint(mass.homog);
        var tip = eval_helper.extractPoint(csgeo.csnames[beh.geo[2]].homog);
        var bb = mass.behavior;
        labObjects[bb.type].setVelocity(bb, tip.x - base.x, tip.y - base.y, 0);
    },

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {},

    setVelocity: function(beh, vx, vy, vz) {},

    move: function(beh) {
        var tip = csgeo.csnames[beh.geo[2]];
        if (move && mouse.down && tip === move.mover) return;
        var mass = csgeo.csnames[beh.geo[1]];
        var base = eval_helper.extractPoint(mass.homog);
        var bb = mass.behavior;
        var pos = List.realVector([base.x + bb.vx, base.y + bb.vy, 1]);
        movepointscr(tip, pos, "homog");
    },

    proceedMotion: function(beh, dt, i, a) {},

    calculateForces: function(beh) {},

    calculateDelta: function(beh, i) {},

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},

    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {}


};


/*----------------------------GRAVITY--------------------------*/


labObjects.Gravity = {

    reset: function(beh, elem) {
        beh.vel = [0, 0, 0]; //TODO: Das wird später mal die Velocity
        beh.pos = [0, 0, 0, 0]; //Position (homogen) 

        beh.el = elem;
        if (typeof(beh.strength) === 'undefined') beh.strength = 1;

        beh.namea = elem.args[0];
        beh.nameb = elem.args[1];
        beh.ma = csgeo.csnames[beh.namea];
        beh.mb = csgeo.csnames[beh.nameb];

    },

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {

    },

    setVelocity: function(beh, vx, vy, vz) {},

    move: function(beh) {},

    proceedMotion: function(beh, dt, i, a) {},

    calculateDelta: function(beh, i) {},


    calculateForces: function(beh) {

        var pta = eval_helper.extractPoint(beh.ma.homog);
        var ptb = eval_helper.extractPoint(beh.mb.homog);

        var xa = pta.x;
        var ya = pta.y;
        var xb = ptb.x;
        var yb = ptb.y;

        var fx = (xb - xa) * beh.strength;
        var fy = (yb - ya) * beh.strength;
        var fz = 0;
        for (var i = 0; i < masses.length; i++) {
            var m = masses[i];

            m.behavior.fx += fx * m.behavior.mass;
            m.behavior.fy += fy * m.behavior.mass;
            m.behavior.fz += fz * m.behavior.mass;


        }


    },

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},


    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {}


};


/*-------------------------SPRING-----------------------*/
labObjects.Spring = {

    reset: function(beh, elem) {

        beh.el = elem;
        if (typeof(beh.strength) === 'undefined') beh.strength = 1;
        if (typeof(beh.amplitude) === 'undefined') beh.amplitude = 0;
        if (typeof(beh.phase) === 'undefined') beh.phase = 0;
        if (typeof(beh.speed) === 'undefined') beh.speed = 1;
        if (typeof(beh.l0) === 'undefined') beh.l0 = 0;
        //0=HOOK, 1=RUBBER, 2=NEWTON, 3=ELECTRO
        if (typeof(beh.stype) === 'undefined') beh.stype = 1;
        if (typeof(beh.readOnInit) === 'undefined') beh.readOnInit = false;

        beh.namea = elem.args[0];
        beh.nameb = elem.args[1];
        beh.ma = csgeo.csnames[beh.namea];
        beh.mb = csgeo.csnames[beh.nameb];
        var pta = eval_helper.extractPoint(beh.ma.homog);
        var ptb = eval_helper.extractPoint(beh.mb.homog);
        if (true) {
            beh.l0 = (Math.sqrt((pta.x - ptb.x) * (pta.x - ptb.x) + (pta.y - ptb.y) * (pta.y - ptb.y)));
        }
        beh.env = labObjects.env; //TODO Environment


    },

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {},

    setVelocity: function(beh, vx, vy, vz) {},

    move: function(beh) {},

    proceedMotion: function(beh, dt, i, a) {},

    calculateForces: function(beh) {
        var xa, xb, ya, yb;
        if (beh.ma.behavior && (!move || !mouse.down || beh.ma !== move.mover)) {
            xa = beh.ma.behavior.x;
            ya = beh.ma.behavior.y;
        } else {
            var pta = eval_helper.extractPoint(beh.ma.homog);
            xa = pta.x;
            ya = pta.y;
        }
        if (beh.mb.behavior && (!move || !mouse.down || beh.mb !== move.mover)) {
            xb = beh.mb.behavior.x;
            yb = beh.mb.behavior.y;
        } else {
            var ptb = eval_helper.extractPoint(beh.mb.homog);
            xb = ptb.x;
            yb = ptb.y;
        }


        var l = (Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb)));

        var lact = beh.l0; //TODO Motor
        var mytype = beh.stype;

        if (mytype === 1) {
            lact = 0;
        }

        var factor = 0;

        if (mytype === 2 || mytype === 3) {
            factor = beh.ma.behavior.mass * beh.mb.behavior.mass * beh.strength;
        }

        if (mytype === 2) factor = -factor; //NEWTON

        var fx, fy;
        if (l !== 0.0 && (mytype === 0 || mytype === 1)) {
            fx = -(xa - xb) * beh.strength * (l - lact) / l * beh.env.springstrength;
            fy = -(ya - yb) * beh.strength * (l - lact) / l * beh.env.springstrength;
        } else if (beh.ma.behavior && beh.mb.behavior && l !== 0.0) {
            var l3 = (l * l * l);
            if (mytype === 2 || mytype === 3) { //NEWTON //ELECTRO
                fx = (xa - xb) * factor / l3;
                fy = (ya - yb) * factor / l3;
            }
        } else {
            fx = fy = 0.0;
        }

        //if (a !== null) {
        if (beh.ma.behavior) {
            beh.ma.behavior.fx += fx;
            beh.ma.behavior.fy += fy;
        }
        //if (b !== null) {
        if (beh.mb.behavior) {
            beh.mb.behavior.fx -= fx;
            beh.mb.behavior.fy -= fy;
        }

    },

    calculateDelta: function(beh, i) {},

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},

    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {}


};


/*-------------------------Bouncer-----------------------*/
labObjects.det = function(x1, y1, x2, y2, x3, y3) {
    return x2 * y3 - x3 * y2 + x3 * y1 - x1 * y3 + x1 * y2 - x2 * y1;
};


labObjects.Bouncer = {


    reset: function(beh, elem) {

        beh.el = elem;
        if (typeof(beh.xdamp) === 'undefined') beh.xdamp = 0;
        if (typeof(beh.ydamp) === 'undefined') beh.ydamp = 0;
        if (typeof(beh.motorchanger) === 'undefined') beh.motorchanger = true;

        beh.namea = elem.args[0];
        beh.nameb = elem.args[1];
        beh.ma = csgeo.csnames[beh.namea];
        beh.mb = csgeo.csnames[beh.nameb];
        var pta = eval_helper.extractPoint(beh.ma.homog);
        var ptb = eval_helper.extractPoint(beh.mb.homog);
        beh.x1o = pta.x * 1.01 - ptb.x * 0.01;
        beh.y1o = pta.y * 1.01 - ptb.y * 0.01;
        beh.x2o = ptb.x * 1.01 - pta.x * 0.01;
        beh.y2o = ptb.y * 1.01 - pta.y * 0.01;

        beh.env = labObjects.env; //TODO Environment


    },

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {
        beh.deltat = dt;
    },

    setVelocity: function(beh, vx, vy, vz) {},

    move: function(beh) {},

    proceedMotion: function(beh, dt, i, a) {},

    calculateForces: function(beh) {},

    calculateDelta: function(beh, i) {},

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},

    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {


        var pta = eval_helper.extractPoint(beh.ma.homog);
        var ptb = eval_helper.extractPoint(beh.mb.homog);
        var x1 = pta.x;
        var y1 = pta.y;
        var x2 = ptb.x;
        var y2 = ptb.y;

        var x1o = beh.x1o;
        var y1o = beh.y1o;
        var x2o = beh.x2o;
        var y2o = beh.y2o;

        var n = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var nx = (x1 - x2) / n;
        var ny = (y1 - y2) / n;


        for (var i = 0; i < masses.length; i++) {

            var mass = masses[i];

            //a1=x1o+i*y1o
            //b1=x2o+i*y2o
            //c1=mass.xo+i*mass.yo
            //a2=x1+i*y1
            //b2=x2+i*y2
            //Nun berechne (a1*b2-b1*a2+c1*a2-c1*b2)/(a1-b1);
            //Dass ist eine abgefahrene aber effektive Art eine Ähnlichkeitstransformation zu bestimmen

            /*          aa.assign(x1o, y1o).mul(x2, y2);
                        bb.assign(x2o, y2o).mul(x1, y1);
                        aa.sub(bb);
                        bb.assign(mass.xo, mass.yo).mul(x1, y1);
                        aa.add(bb);
                        bb.assign(mass.xo, mass.yo).mul(x2, y2);
                        aa.sub(bb);
                        bb.assign(x1o, y1o).sub(x2o, y2o);
                        aa.div(bb);
            */


            var mxo = mass.behavior.xo;
            var myo = mass.behavior.yo;
            var mx = mass.behavior.x;
            var my = mass.behavior.y;

            var aa = CSNumber.mult(CSNumber.complex(x1o, y1o), CSNumber.complex(x2, y2));
            var bb = CSNumber.mult(CSNumber.complex(x2o, y2o), CSNumber.complex(x1, y1));

            aa = CSNumber.sub(aa, bb);
            bb = CSNumber.mult(CSNumber.complex(mxo, myo), CSNumber.complex(x1, y1));
            aa = CSNumber.add(aa, bb);
            bb = CSNumber.mult(CSNumber.complex(mxo, myo), CSNumber.complex(x2, y2));
            aa = CSNumber.sub(aa, bb);
            bb = CSNumber.sub(CSNumber.complex(x1o, y1o), CSNumber.complex(x2o, y2o));
            aa = CSNumber.div(aa, bb);

            if (labObjects.det(x1, y1, x2, y2, mx, my) * labObjects.det(x1, y1, x2, y2, aa.value.real, aa.value.imag) < 0 &&
                labObjects.det(x1, y1, mx, my, aa.value.real, aa.value.imag) * labObjects.det(x2, y2, mx, my, aa.value.real, aa.value.imag) < 0) {


                // doHitScript(mass);//TODO


                //TODO                if (motorChanger)
                //                    kernel.simulation.motor.dir *= -1;

                var vvx = mass.behavior.mvx + beh.deltat * (-aa.value.real + mass.behavior.xo);
                var vvy = mass.behavior.mvy + beh.deltat * (-aa.value.imag + mass.behavior.yo);

                var ss1 = nx * vvx + ny * vvy;
                var ss2 = ny * vvx - nx * vvy;
                //TODO Nächsten zwei zeilen sind gepfuscht, erhalten aber die Energie

                mass.behavior.x = aa.value.real;
                mass.behavior.y = aa.value.imag;
                mass.behavior.vx = nx * ss1 * (1.0 - beh.xdamp);
                mass.behavior.vy = ny * ss1 * (1.0 - beh.xdamp);
                mass.behavior.vx += -ny * ss2 * (1.0 - beh.ydamp);
                mass.behavior.vy += nx * ss2 * (1.0 - beh.ydamp);

            }
        }
        beh.x1o = x1;
        beh.y1o = y1;
        beh.x2o = x2;
        beh.y2o = y2;
    }


};


/*-------------------------ENVIRONMENT-----------------------*/
labObjects.Environment = {


    init: function(beh) {
        if (typeof(beh.gravity) === 'undefined') beh.gravity = 0;
        if (typeof(beh.friction) === 'undefined') beh.friction = 0;
        if (typeof(beh.springstrength) === 'undefined') beh.springstrength = 1;
        if (typeof(beh.accuracy) !== 'undefined') simaccuracy = beh.accuracy;
        if (typeof(beh.deltat) !== 'undefined') setSpeed(beh.deltat / 0.6);
        if (typeof(beh.charges) === 'undefined') beh.charges = false;
        if (typeof(beh.balls) === 'undefined') beh.balls = false;
        if (typeof(beh.newton) === 'undefined') beh.newton = false;
        if (typeof(beh.ballInteractionBoosting) === 'undefined') beh.ballInteractionBoosting = 1;
        labObjects.env = beh;
        beh.errorbound = 0.001;
        beh.lowestdeltat = 0.0000001;
        beh.slowdownfactor = 2;

    },

    reset: function(beh) {},

    resetForces: function(beh) {},

    getBlock: false,

    setToTimestep: function(beh, j, a) {},

    initRK: function(beh, dt) {},

    setVelocity: function(beh, vx, vy, vz) {},

    move: function(beh) {},

    proceedMotion: function(beh, dt, i, a) {},

    calculateForces: function(beh) {
        var i, m1, x1, y1, j, m2, x2, y2, k, fx, fy, r, l;
        if (beh.newton) {
            for (i = 0; i < masses.length - 1; i++) {
                m1 = masses[i];
                x1 = m1.behavior.x;
                y1 = m1.behavior.y;
                for (j = i + 1; j < masses.length; j++) {

                    m2 = masses[j];
                    x2 = m2.behavior.x;
                    y2 = m2.behavior.y;
                    l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    fx = (x1 - x2) * m1.behavior.mass * m2.behavior.mass / (l * l * l);
                    fy = (y1 - y2) * m1.behavior.mass * m2.behavior.mass / (l * l * l);

                    m1.behavior.fx -= fx;
                    m1.behavior.fy -= fy;
                    m2.behavior.fx += fx;
                    m2.behavior.fy += fy;
                }
            }
        }

        if (beh.charges) {
            for (i = 0; i < masses.length - 1; i++) {
                m1 = masses[i];
                x1 = m1.behavior.x;
                y1 = m1.behavior.y;
                for (j = i + 1; j < masses.length; j++) {

                    m2 = masses[j];
                    x2 = m2.behavior.x;
                    y2 = m2.behavior.y;
                    l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    fx = (x1 - x2) * m1.behavior.charge * m2.behavior.charge / (l * l * l);
                    fy = (y1 - y2) * m1.behavior.charge * m2.behavior.charge / (l * l * l);

                    m1.behavior.fx += fx;
                    m1.behavior.fy += fy;
                    m2.behavior.fx -= fx;
                    m2.behavior.fy -= fy;
                }
            }
        }

        if (beh.balls) {

            for (i = 0; i < masses.length - 1; i++) {
                m1 = masses[i];
                if (m1.behavior.radius !== 0) {
                    x1 = m1.behavior.x;
                    y1 = m1.behavior.y;
                    for (j = i + 1; j < masses.length; j++) {

                        m2 = masses[j];
                        if (m2.behavior.radius !== 0) {

                            x2 = m2.behavior.x;
                            y2 = m2.behavior.y;

                            r = m1.behavior.radius + m2.behavior.radius;
                            l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                            fx = 0;
                            fy = 0;

                            if (beh.ballInteractionBoosting === 0) {
                                fx = (x1 - x2) / (l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                                fy = (y1 - y2) / (l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                            } else {
                                if (beh.ballInteractionBoosting === 1) {

                                    fx = (x1 - x2) / (l * l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                                    fy = (y1 - y2) / (l * l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                                } else {
                                    fx = (x1 - x2) / (l * l * l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                                    fy = (y1 - y2) / (l * l * l * l * l) * (l > r ? 0 : (l - r) * (l - r));
                                }
                            }


                            m1.behavior.fx += fx;
                            m1.behavior.fy += fy;
                            m2.behavior.fx -= fx;
                            m2.behavior.fy -= fy;
                        }
                    }
                }
            }
        }


        for (i = 0; i < masses.length; i++) {
            var m = masses[i];

            m.behavior.fx += 0;
            m.behavior.fy += -beh.gravity * m.behavior.mass;
            m.behavior.fz += 0;


        }
    },

    calculateDelta: function(beh, i) {},

    savePos: function(beh, i) {},

    restorePos: function(beh, i) {},

    sqDist: function(beh, i, j) {
        return 0;
    },

    kineticEnergy: function(beh) {},

    storePosition: function(beh) {},

    recallPosition: function(beh) {},

    doCollisions: function(beh) {}


};
    return globalInstance;
    }; // end newInstance method

    return CindyJS;
    })();
    var createCindy = CindyJS; // backwards compatibility, deprecated!
    if (typeof process !== "undefined" &&
        typeof module !== "undefined" &&
        typeof module.exports !== "undefined" &&
        typeof window === "undefined")
        module.exports = CindyJS;
//# sourceMappingURL=Cindy.js.map
