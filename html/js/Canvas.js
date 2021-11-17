var hRes = $(this).width()
var wRes = 150
var point = 0;

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
var myCanvas = createHiDPICanvas(hRes, wRes);
div_row.appendChild(myCanvas)
var ctx = myCanvas.getContext("2d");
var elemLeft = myCanvas.offsetLeft
var x = (fIndex/fTotal)*(hRes+elemLeft+elemLeft) // fps -> pixel

function clearRC(){
    ctx.clearRect(0,0,myCanvas.width,30) // limpiamos un tramo de nuestro canvas
}

function clearall(){
    listStn[actual].splice(0) // limpiamos los elementos de la lista asociados a nuestra actual estacion
}

function purgeall(){
    for (var j = 0 ; j<listStn.length; j++){
        listStn[j].splice(0) //limpiamos los elementos de la lista
    }
}
setInterval(() => {
    x = (fIndex/(fTotal / hRes))
    ctx.clearRect(0,30,myCanvas.width, myCanvas.height);
    drawTime();
    drawMarks();
    moveLine();
}, 500);

function drawTime(){
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
}
myCanvas.addEventListener('click', function(event) {
    x = event.pageX - elemLeft
    var proporcion = ((x+elemLeft)/(hRes+elemLeft+elemLeft))*fTotal // pixel -> fps
    point = (proporcion*100)/fTotal 
    changeFps();
}, false);
function moveLine(){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x+2, 50, 10, 0, 2 * Math.PI);
    ctx.fillRect(x,50,5,400);
    ctx.fill();
}
function changeFps(){
	fetch(target+mode, {
		
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ cmd: "seek_norm", par:point/100}),
		
	})
	.then(response => response.json())
	.then(data => {console.log('Success:', data);
	})
	.catch((error) => {console.error('Error:', error);
	});
}
function mark(){
    listStn[actual].push(x) // guardamos pos
}
function drawMarks(){
    for (var j = 0 ; j<listStn.length; j++){  // recorremos la lista, y pintamos las marcas en las pos guardadas
        if (actual == j){
            clearRC()
            for (var h = 0; h<listStn[j].length;h++){
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.arc(listStn[j][h], 20, 10, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}
