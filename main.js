document.addEventListener('DOMContentLoaded', e => {
	const canvas = document.getElementById('game-board');
	canvas.width = document.body.clientWidth;
	canvas.height = canvas.width * 0.65;

	const ctx = canvas.getContext('2d');

	const universe = new Universe(canvas);
	universe.addPlayer(
		new Vector(50, canvas.height / 2), 20);
	universe.addPlayer(
		new Vector(canvas.width - 50, canvas.height / 2), 20);

	// canvas.addEventListener('mousemove', e => {
	// 	const mouse = Vector.canvasMouseVector(canvas, e),
	// 		gravity = starSystem.gravityAt(mouse),
	// 		mousePlusGravity = mouse.plus(gravity.times(0.1));
	// 	drawBackground();
	// 	ctx.strokeStyle = 'yellow';
	// 	ctx.strokeWidth = 2;
	// 	ctx.beginPath();
	// 	ctx.moveTo(mouse.x, mouse.y);
	// 	ctx.lineTo(mousePlusGravity.x, mousePlusGravity.y);
	// 	ctx.stroke();
	// 	// console.log(gravity);
	// });

	
});

