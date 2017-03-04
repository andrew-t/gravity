document.addEventListener('DOMContentLoaded', e => setTimeout(() => {
	const gameBoard = getSizedCanvas('game-board'),
		universe = new Universe(gameBoard);
		starfield = new Starfield(
			getSizedCanvas('background'),
			{ universe });

	window.addEventListener('resize', e => {
		getSizedCanvas('background');
		getSizedCanvas('game-board');
		starfield.forceResize();
		universe.starSystem.forceRedraw();
	});

	function getSizedCanvas(id) {
		const canvas = document.getElementById(id);
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		console.log('Setting canvas ' + id + ' to ' +
			canvas.width + ' x ' + canvas.height);
		return canvas;
	}
	
}));