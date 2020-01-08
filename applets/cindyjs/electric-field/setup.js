var cdy = CindyJS({
  ports: [{
    id: "CSCanvas",
      width: 800,
      height: 445,
      transform: [ { visibleRect: [-1, -1, 2.2, 1] } ]
  }],
  scripts: "cs*",
  geometry: [
    {name:"A", type:"Free", pos:[1.2,0.5],color:[1,0,0],pinned:false,size:4},
    {name:"B", type:"Free", pos:[1.4,0.5],color:[0,1,0],pinned:false,size:4},
    {name:"C", type:"Free", pos:[1.6,0.5],color:[0,0,1],pinned:false,size:4},
    {name:"D", type:"Free", pos:[1.8,0.5],color:[1,1,0],pinned:false,size:4},
    {name:"E", type:"Free", pos:[1.7,0],color:[1,1,1],pinned:false,size:6},
    //{name:"S1", type:"Free", pos:[1.2,-.8],color:[0,0,0],pinned:true,size:2},
    //{name:"S2", type:"Free", pos:[2.0,-.8],color:[0,0,0],pinned:true,size:2},
    //{name:"S", type:"Free", pos:[1.201,-.8],color:[1,1,1],pinned:false,size:4},
    {name:"l", type:"Segment", args:["S1","S2"],color:[0,0,0],pinned:false,size:2},
    {name:"R1", type:"Free", pos:[1.2,-.6],color:[0,0,0],pinned:true,size:2},
    {name:"R2", type:"Free", pos:[2.0,-.6],color:[0,0,0],pinned:true,size:2},
    {name:"R", type:"Free", pos:[1.7,-.6],color:[1,1,1],pinned:false,size:4},
    {name:"m", type:"Segment", args:["R1","R2"],color:[0,0,0],pinned:false,size:2},
    {name:"T1", type:"Free", pos:[1.2,-.4],color:[0,0,0],pinned:true,size:2},
    {name:"T2", type:"Free", pos:[1.99,-.4],color:[0,0,0],pinned:true,size:2},
    {name:"T", type:"Free", pos:[2.0,-.4],color:[1,1,1],pinned:false,size:4},
    {name:"o", type:"Segment", args:["T1","T2"],color:[0,0,0],pinned:false,size:2}
  ],
  animation: {autoplay: true},
  //transform:[{translate:[0,0]},{scale:10}],
  images:{
          //Rot:"../domcoloring/uiImages/Rot.png",
          Sat:"../domcoloring/uiImages/SSat.png",
          Grid:"../domcoloring/uiImages/Grid.png"},
  use: ["CindyGL"]
});



var typ=function(e, b){
  var chCode=e.which ? e.which:e.keyCode;
  if(chCode==13){
    console.log("*************");
    console.log(b.value);
    cdy.evokeCS('f(z, a, b, c, d, e, A, B, C, D) := (' + b.value + '); forcerecompile();');
  }
}

var sel=function(e, b){
  document.getElementById("inp").value = b.value;
  cdy.evokeCS('f(z, a, b, c, d, e, A, B, C, D) := (' + b.value + '); forcerecompile();');
}

var check1=function(){
       if(document.getElementById("ch1").checked){
          cdy.evokeCS('grid1=true;');
       } else {
           cdy.evokeCS('grid1=false;');

       }
}

var check2=function(){
       if(document.getElementById("ch2").checked){
          cdy.evokeCS('grid2=true;');
       } else {
           cdy.evokeCS('grid2=false;');

       }
}

var check3=function(){
       if(document.getElementById("ch3").checked){
          cdy.evokeCS('linear=true;');
       } else {
           cdy.evokeCS('linear=false;');

       }
}

    var check4=function(){
       if(document.getElementById("ch4").checked){
          cdy.evokeCS('bw=true;');
       } else {
           cdy.evokeCS('bw=false;');

       }
}

    var check5=function(){
       if(document.getElementById("ch5").checked){
          cdy.evokeCS('webcam=true;');
          document.getElementById("ch1").disabled =
          document.getElementById("ch2").disabled =
          document.getElementById("ch4").disabled = true;
       } else {
           cdy.evokeCS('webcam=false;');
          document.getElementById("ch1").disabled =
          document.getElementById("ch2").disabled =
          document.getElementById("ch4").disabled = false;

       }
}
