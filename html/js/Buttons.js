$('.pcmd').on('click',function(e){
	console.log(target+mode)
    fetch(target+mode, { 
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

$('.mode').on('click',function(e){
    mode = e.target.dataset.target;
});

$('.range_par').on('input',function(e){
    var label = "hello world"
	console.log(label)
});

function ChangeValue(e){
    var val = e.target.value;
    if (e.target.type == "number") {
        val = parseInt(e.target.value);
    }
    if (e.target.type == "range") {
        val = parseFloat(e.target.value);
    }
    if (e.target.type == "radio") {
        val = parseInt(e.target.value);
    }
    if (e.target.type == "checkbox"){
        if (e.target.checked){
            val = true
        } else {
            val = false
        }
    }
    if (e.target.type == "text") {
        val = String(val)
    }
	fetch(target+"/par/"+e.target.id, {

		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ value: val }),

	})
	.then(data => {console.log('Success:', data);
	})
	.catch((error) => {console.error('Error:', error);
	})
}