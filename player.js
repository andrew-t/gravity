class Player {
	constructor(universe, location, radius) {
		this.universe = universe;
		this.location = location;
		this.hitArea = new Circle(location, radius);
		this.destroyed = false;
	}

	shoot(initialVelocity) {
		const missile = this.universe.addParticle(
			this.location, initialVelocity, 5);
		missile.isBullet = true;
		missile.hasClearedShooter = false;
		missile.owner = this;
		missile.on('impact', collision => {
			missile.destroy();
			Explosions.full(this.universe,
				collision.location, missile.velocity);
		});
		this.universe.timestream.setTimeout(() => {
			if (!missile.destroyed) {
				missile.destroy();
				Explosions.full(this.universe,
					missile.location, missile.velocity);
			}
		}, 5000);
	}

	collision(lineSegment, radius) {
		// TODO: do this properly
		if (this.location.distanceTo(lineSegment.end) <=
				this.hitArea.radius + radius) {
			return new Collision(1, lineSegment.end, this);
		}
	}

	explode() {
		Explosions.full(this.universe, this.location);
		this.destroyed = true;
	}

	draw(ctx) {
		if (this.destroyed)
			return;
		// TODO - draw something nice
		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		this.hitArea.draw(ctx);
	}
}
