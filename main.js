document.addEventListener('DOMContentLoaded', e => {
	const canvas = document.getElementById('game-board');
	canvas.width = document.body.clientWidth;
	canvas.height = canvas.width * 0.65;

	const universe = new Universe(canvas);
	universe.addPlayer(
		new Vector(50, canvas.height / 2),
		20);
	universe.addPlayer(
		new Vector(canvas.width - 50, canvas.height / 2),
		20);
	
});

