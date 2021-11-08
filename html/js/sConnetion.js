var target = "system/station1/dhs1";
var mode = "/playback";
var uri_station = "system/stations";
var uri_parameters = "";

var time_line = document.getElementById("timeline")

// for (var i = 0; i<100;i++){
// 	if (i%2 == 0){
// 		var numbottom = 100 + (30*i)
// 		var timediv = document.createElement("div")
// 		timediv.className = "mid-line"
// 		timediv.style = "left: " + i.toString() + "%; bottom:" + numbottom.toString()+"%"
// 		time_line.appendChild(timediv)
// 	}else{
// 		var numbottom = 90 + (30*i)
// 		var timediv = document.createElement("div")
// 		timediv.className = "mid-line"
// 		timediv.style = "left: " + i.toString() + "%; bottom:" + numbottom.toString()+"%; height: 40%;" 
// 		time_line.appendChild(timediv)
// 	}
// }
setInterval(function(){ 	fetch(target, { 
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ cmd: "info", par:""}),	
})
.then(function(response) {
	return response.json();
  })
  .then(function(jsonResponse) {
	console.log(jsonResponse)
}); }, 500);

$.getJSON(uri_station, function(data) {
	var myDiv = document.getElementById("buttons_station")
	for (var i=0;i<data.station.length;i++){
		let btn = document.createElement("button")
		var subDiv = document.createElement("div")
		var br = document.createElement("br")

		btn.innerHTML = data.station[i].id;
		btn.className ="btn btn-outline-warning station";
		btn.dataset.target= "system/" + data.station[i].id + "/" + data.station[i].dhs[0].id;
		btn.onclick = function(){
			target = btn.dataset.target;
			parlist();
		}

		subDiv.className ="btn-group-lg";
		subDiv.id = data.station[i].id +" div"

		myDiv.appendChild(subDiv);
		subDiv.appendChild(btn);
		subDiv.appendChild(br);
	}
});

function parlist(){
	uri_parameters = target + "/parlist";
	$.getJSON(uri_parameters, function(data) {
		var myDiv = document.getElementById("parameters_list")
		try{
			var h6 = document.getElementById("h6-current")
			myDiv.removeChild(h6);
		}catch{
		}
		var myCurrent = document.createElement("h6")
		myCurrent.id = "h6-current"

		var tCurrent = document.createTextNode("Current: " + target )
		myCurrent.appendChild(tCurrent)
		myDiv.appendChild(myCurrent)

		for (var i=0;i<data.parlist.length;i++){
			var inp = document.createElement("input")
			var label = document.createElement("label")
			var labelValue = document.createElement("label")
			var subDiv = document.createElement("div")
			var br = document.createElement("br")
			try{
				var dBtn = document.getElementById(data.parlist[i].id);
				var dLabel = document.getElementById(data.parlist[i].id + " label")
				
				var dDiv = document.getElementById(data.parlist[i].id +" div");

				var inprad = document.getElementById(data.parlist[i].id+" inp_rad");
				var dLabelRad = document.getElementById(data.parlist[i].id + " label_rad")

				var dSubDiv = document.getElementById(data.parlist[i].id +" div_rad");

				dSubDiv.removeChild(inprad);
				dSubDiv.removeChild(dLabelRad);

				dDiv.removeChild(dSubDiv);
				
				dDiv.removeChild(dBtn);
				dDiv.removeChild(dLabel);
				
				myDiv.removeChild(dDiv);
				
			}catch{
			}
			subDiv.className ="btn-group-lg";
			subDiv.id = data.parlist[i].id+" div"
			label.innerHTML = data.parlist[i].name

			myDiv.appendChild(subDiv);
			subDiv.appendChild(label)

			inp.innerHTML = data.parlist[i].value;
			inp.id = data.parlist[i].id;
			inp.className ="btn btn-outline-warning";

			//INTERGER
			if (data.parlist[i].type == "integer" ){
				inp.type = "number"
				inp.max = data.parlist[i].range.hi;
				inp.min = data.parlist[i].range.lo;
				label.innerHTML	 = data.parlist[i].name
				label.id = data.parlist[i].id + " label";
				inp.value = data.parlist[i].value;
				subDiv.appendChild(br)
				subDiv.appendChild(inp)
				subDiv.appendChild(labelValue)
			}

			//FLOAT
			if (data.parlist[i].type == "float" ){
				inp.type = "range"
				inp.step = 0.1
				inp.max = data.parlist[i].range.hi;
				inp.min = data.parlist[i].range.lo;
				inp.className ="range_par";
				inp.onchange = function(e){
					var Label = document.getElementById(e.target.id+"label")
					Label.innerHTML = e.target.value
				}
				inp.value = data.parlist[i].value;
				label.innerHTML	 = data.parlist[i].name
				label.id = data.parlist[i].id + " label";
				labelValue.innerHTML = data.parlist[i].value;
				labelValue.id = data.parlist[i].id + "label"

				subDiv.appendChild(br)
				subDiv.appendChild(inp)
				subDiv.appendChild(labelValue)

			}

			//LISTAS
			if (data.parlist[i].type == "msel" ){
				let form = document.createElement("form")
				for(x=0;x<data.parlist[i].opt.length;x++){
					let radio = document.createElement("input")
					let labelRad = document.createElement("label")
					if(x==data.parlist[i].value){
						console.log(data.parlist[i].value)
						radio.checked=true
					}
					radio.name = "Radio"
					radio.type="radio"
					radio.value = x
					labelRad.innerHTML = data.parlist[i].opt[x]
					form.appendChild(radio);
					form.appendChild(labelRad)
				}
				subDiv.appendChild(form);
			}

			//BOOL
			if (data.parlist[i].type == "bool" ){
				if(data.parlist[i].value){
					inp.checked=true
				}
				inp.type = "checkbox"
				inp.id = data.parlist[i].id
				subDiv.appendChild(br)
				subDiv.appendChild(inp)
			}

			//CMD
			if (data.parlist[i].type == "cmd" ){
				inp.type = "button"
				inp.id = data.parlist[i].id
				inp.className = inp.className +" boton_cmd";
				subDiv.appendChild(br)
				subDiv.appendChild(inp)
			}

			//TEXT
			if (data.parlist[i].type == "string" ){
				inp.type = "text"
				inp.id = data.parlist[i].id
				subDiv.appendChild(br)
				subDiv.appendChild(inp)
				subDiv.appendChild(labelValue)
			}
		}
	});
}

$('.change-value').on('click',function(e){
	fetch(target+"/par/fps", {

		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ value: 0}),

	})
	.then(data => {console.log('Success:', data);
	})
	.catch((error) => {console.error('Error:', error);
	});
});
