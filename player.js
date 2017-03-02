class Player {
	constructor(universe, location, radius) {
		this.universe = universe;
		this.location = location;
		this.hitArea = new Circle(location, radius);
	}

	shoot(initialVelocity) {
		const missile = this.universe.addParticle(
			this.location, initialVelocity, 5);
		missile.on('impact', collision => {
			missile.destroy();
			collision.obstacle.addCrater(
				collision.location, this.universe.craterSize);
			explode(this.universe,
				missile.location,
				{
					velocity: missile.velocity,
					violence: 1000,
					destroyOnImpact: false
				});
		});
	}

	draw(ctx) {
		// TODO - draw something nice
		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		this.hitArea.draw(ctx);
	}
}
