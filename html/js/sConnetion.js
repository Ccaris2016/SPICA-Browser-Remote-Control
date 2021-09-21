$('.pcmd').on('click',function(e){
    console.log("cmd:"+ e.target.dataset.cmd+", par:" +e.target.dataset.par);
    fetch(e.target.dataset.target, {  // localhost:80/index/system/station1/dhs1/playback --> json ({cmd = play , par = })
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
    console.log(e.target.value);
	fetch('system/station1/dhs1/playback', {

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