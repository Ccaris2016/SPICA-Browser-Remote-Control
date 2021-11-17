$('.pcmd').on('click',function(e){
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

$('.rw').on('click',function(e){
    fetch(target+mode, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par: fTotal-1}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);
    })
    .catch((error) => {console.error('Error:', error);
	});
});


$('.mode').on('click',function(e){
    mode = e.target.dataset.target;
    fetch(target, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par:e.target.dataset.par}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);
    })
    .catch((error) => {console.error('Error:', error);
	});
});

$('.shutdown').on('click',function(e){
    fetch("op/sys", { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmd: e.target.dataset.cmd, par:""}),
    })
    .then(response => response.json())
    .then(data => {console.log('Success:', data);
    })
    .catch((error) => {console.error('Error:', error);
	});
})

function ChangeValue(e){
    var val = e.target.value;
    if (e.target.type == "number") {
        if(e.target.value > e.target.max){
            val = parseInt(e.target.max)
        }
        else if (e.target.value < e.target.min){
            val = parseInt(e.target.min);
        }
        else{
            val = parseInt(e.target.value);
        }
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
