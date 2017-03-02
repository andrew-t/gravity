document.addEventListener('DOMContentLoaded', e => {
	const gameBoard = getSizedCanvas('game-board');

	const universe = new Universe(gameBoard);
	universe.addPlayer(
		new Vector(50, gameBoard.height / 2),
		20);
	universe.addPlayer(
		new Vector(gameBoard.width - 50, gameBoard.height / 2),
		20);

	new Starfield(getSizedCanvas('background'), {
		starSystem: universe.starSystem
	})

	function getSizedCanvas(id) {
		const canvas = document.getElementById(id);
		canvas.width = document.body.clientWidth;
		canvas.height = canvas.width * 0.65;
		return canvas;
	}
	
});