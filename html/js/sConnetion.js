var target = "";
var mode = "/playback";
var uri_station = "system/stations";
var uri_parameters = "";

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
		for (var i=0;i<data.parlist.length;i++){
			var inp = document.createElement("input")
			var label = document.createElement("label")
			var subDiv = document.createElement("div")
			var br = document.createElement("br")
			try{
				var dBtn = document.getElementById(data.parlist[i].id);
				var dLabel = document.getElementById(data.parlist[i].id + " label")

				var dDiv = document.getElementById(data.parlist[i].id +" div");
				
				dDiv.removeChild(dBtn);
				dDiv.removeChild(dLabel);
				myDiv.removeChild(dDiv); 
			}catch{
				console.log("error")
			}
			inp.innerHTML = data.parlist[i].value;
			inp.id = data.parlist[i].id;
			inp.className ="btn btn-outline-warning";
			inp.value = data.parlist[i].value;

			label.innerHTML	 = data.parlist[i].id
			label.id = data.parlist[i].id + " label";

			subDiv.className ="btn-group-lg";
			subDiv.id = data.parlist[i].id+" div"

			myDiv.appendChild(subDiv);
			subDiv.appendChild(label)
			subDiv.appendChild(br)
			subDiv.appendChild(inp)
		}
	});
}

$('.pcmd').on('click',function(e){
    fetch(target+mode, {  // localhost:80/index/system/station1/dhs1/playback --> json ({cmd = play , par = })
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par: e.target.dataset.par}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);
    })
    .catch((error) => {console.error('Error:', error);
    });
});
$('#seek_norm').on('change',function(e){
	fetch(target+mode, {

		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ cmd: "seek_norm", par: e.target.value/100.0 }),


	})
	.then(response => response.json())
	.then(data => {console.log('Success:', data);
	})
	.catch((error) => {console.error('Error:', error);
	});

});

$('.change-value').on('click',function(e){
	fetch(target+"/par/fps", {

		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ value: 5000.0 }),


	})
	.then(data => {console.log('Success:', data);
	})
	.catch((error) => {console.error('Error:', error);
	});

});

$('.mode').on('click',function(e){
    mode = e.target.dataset.target;
});









