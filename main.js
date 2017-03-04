document.addEventListener('DOMContentLoaded', e => {
	const gameBoard = getSizedCanvas('game-board'),
		universe = new Universe(gameBoard);
		starfield = new Starfield(
			getSizedCanvas('background'),
			{ universe });

	document.addEventListener('fullscreenchange', onResize);
	document.addEventListener('mozfullscreenchange', onResize);
	document.addEventListener('webkitfullscreenchange', onResize);
	window.addEventListener('resize', onResize);
	function onResize(e) {
		setTimeout(() => {
			getSizedCanvas('background');
			getSizedCanvas('game-board');
			starfield.forceResize();
			universe.starSystem.forceRedraw();
		});
	}
	onResize();

	function getSizedCanvas(id) {
		const canvas = document.getElementById(id);
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		console.log('Setting canvas ' + id + ' to ' +
			canvas.width + ' x ' + canvas.height);
		return canvas;
	}

	universe.on('state-change', state => {
		document.body.classList.remove('targetting');
		document.body.classList.remove('ongoing-shot');
		document.body.classList.remove('game-over');
		switch (state) {
			case Universe.TARGETTING:
				document.body.classList.add('targetting');
				break;
			case Universe.ONGOING_SHOT:
				document.body.classList.add('ongoing-shot');
				break;
			case Universe.GAME_OVER:
				document.body.classList.add('game-over');
				break;
		}
	});
	universe.on('change-player', player => {
		document.body.classList.remove('player-1');
		document.body.classList.remove('player-2');
		document.body.classList.add(`player-${player + 1}`);
	});
	
});