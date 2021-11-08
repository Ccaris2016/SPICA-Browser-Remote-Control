var hRes = 1400
var wRes = 150

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

var div_row = document.getElementById("div_canvas")


//Create canvas with the device resolution.
var myCanvas = createHiDPICanvas(hRes, wRes);

div_row.appendChild(myCanvas)

var ctx = myCanvas.getContext("2d");
ctx.fillStyle = "grey";
ctx.beginPath();
for (let x = 0 ; x < hRes ; x++){
    if (x%16 == 0){
        ctx.fillRect(x,110,1,40);
    }
    if (x%32 == 0){
        ctx.fillRect(x,100,1,50);
    }
}
ctx.fill(); 

//Create canvas with a custom resolution.
//var myCustomCanvas = createHiDPICanvas(500, 200, 4);