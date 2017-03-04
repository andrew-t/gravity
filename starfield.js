class Starfield {
	constructor(canvas, opts = {}) {
		if (!opts.starCount) opts.starCount = 100;
		if (!opts.maxStarRadius) opts.maxStarRadius = 3;
		if (!opts.lightness) opts.lightness = '80%';

		this.canvas = canvas;
		this.options = opts;

		this.forceResize();
	}

	forceResize() {
		this.stars = [];
		for (let n = 0; n < this.options.starCount; ++n)
			this.stars.push({
				colour: `hsla(
					${Math.random() * 360},
					${Math.random() * 50}%,
					${this.options.lightness},
					${Math.random() * 0.5 + 0.5})`,
				circle: new Circle(new Vector(
						Math.random() * this.canvas.width,
						Math.random() * this.canvas.height),
					Math.random() * this.options.maxStarRadius)
			});
		this.draw();
	}

	draw() {
		const ctx = this.canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(-10, -10, this.canvas.width + 20, this.canvas.height + 20);
		ctx.strokeStyle = 'transparent';
		this.stars.forEach(star => {
			ctx.fillStyle = star.colour;
			star.circle.draw(ctx);
		});

		if (this.options.universe)
			this.options.universe.withTransformedCanvas(ctx =>
				this.options.universe.starSystem.drawBacks(ctx),
				this.canvas,
				ctx,
				false);
	}
}