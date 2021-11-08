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