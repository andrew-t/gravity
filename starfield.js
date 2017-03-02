class Starfield {
	constructor(canvas, opts = {}) {
		if (!opts.starCount) opts.starCount = 100;
		if (!opts.maxStarRadius) opts.maxStarRadius = 3;
		if (!opts.lightness) opts.lightness = '80%';

		this.stars = [];
		this.canvas = canvas;

		for (let n = 0; n < opts.starCount; ++n)
			this.stars.push({
				colour: `hsla(
					${Math.random() * 360},
					${Math.random() * 50}%,
					${opts.lightness},
					${Math.random() * 0.5 + 0.5})`,
				circle: new Circle(new Vector(
						Math.random() * canvas.width,
						Math.random() * canvas.height),
					Math.random() * opts.maxStarRadius)
			});

		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(-10, -10, canvas.width + 20, canvas.height + 20);
		ctx.strokeStyle = 'transparent';
		this.stars.forEach(star => {
			ctx.fillStyle = star.colour;
			star.circle.draw(ctx);
		});

		if (opts.starSystem)
			opts.starSystem.drawBacks(ctx);
	}
}