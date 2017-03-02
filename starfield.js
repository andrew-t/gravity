class Starfield {
	constructor(canvas) {
		this.canvas = canvas;
		this.startTime = Date.now();
		this.starCount = 100;
		this.maxStarRadius = 3;
	}

	draw(ctx) {
		if (!ctx)
			ctx = this.canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(-10, -10, this.canvas.width + 20, this.canvas.height + 20);
		const r = new SeededRandom(this.startTime);
		for (let n = 0; n < this.starCount; ++n) {
			ctx.strokeStyle = 'transparent';
			ctx.fillStyle = `hsla(
				${r.nextFloat() * 360},
				${r.nextFloat() * 50}%,
				80%,
				${r.nextFloat() * 0.5 + 0.5})`;
			new Circle(new Vector(
						r.nextFloat() * this.canvas.width,
						r.nextFloat() * this.canvas.height),
					r.nextFloat() * this.maxStarRadius)
				.draw(ctx);
		}
	}
}