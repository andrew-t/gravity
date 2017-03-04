document.addEventListener('DOMContentLoaded', e => {
	let fullscreen;

	function checkFullscreen() {
		fullscreen = document.fullScreen ||
			document.mozFullScreen ||
			document.webkitIsFullScreen;
		if (fullscreen)
			document.body.classList.add('fullscreen');
		else
			document.body.classList.remove('fullscreen');
	}
	document.addEventListener('fullscreenchange', checkFullscreen);
	document.addEventListener('mozfullscreenchange', checkFullscreen);
	document.addEventListener('webkitfullscreenchange', checkFullscreen);
	checkFullscreen();

	document.getElementById('fullscreen')
		.addEventListener('click', e => {
			if (fullscreen) {
				(document.exitFullscreen ||
					document.mozCancelFullScreen ||
					document.webkitCancelFullScreen).bind(document)();
				fullscreen = false;
			} else {
				const docElm = document.documentElement;
				if (docElm.requestFullscreen)
					docElm.requestFullscreen();
				else if (docElm.mozRequestFullScreen)
					docElm.mozRequestFullScreen();
				else if (docElm.webkitRequestFullScreen)
					docElm.webkitRequestFullScreen();
				else {
					console.err('Cannot fullscreen');
					document.getElementById('fullscreen')
						.classList.add('hidden');
				}
				fullscreen = true;
			}
			e.preventDefault();
		});
});
