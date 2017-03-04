class Player {
	constructor(universe, location, radius, imageFilename) {
		this.universe = universe;
		this.location = location;
		this.hitArea = new Circle(location, radius);
		this.destroyed = false;

		const img = new Image();
		img.addEventListener('load', this.image = img);
		img.src = imageFilename;
	}

	shoot(initialVelocity) {
		const missile = this.universe.addParticle(
			this.location, initialVelocity, 5);
		missile.isBullet = true;
		missile.destroysPlanet = true;
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

	collision(lineSegment, missileRadius) {
		const impact = lineSegment.intersectionWithCircle(
			new Circle(this.location, this.hitArea.radius + missileRadius));
		if (!impact)
			return null;
		const t = lineSegment.parametricTOfPoint(impact.start);
		return t >= 0 && t <= 1
			? new Collision(t, impact.start, this)
			: null;
	}

	explode() {
		Explosions.full(this.universe, this.location);
		this.destroyed = true;
	}

	draw(ctx) {
		if (this.destroyed)
			return;
		if (this.image) {
			ctx.drawImage(this.image,
				0, 0, this.image.width, this.image.height,
				this.location.x - this.hitArea.radius,
				this.location.y - this.hitArea.radius,
				this.hitArea.radius * 2,
				this.hitArea.radius * 2);
		} else {
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 5;
			this.hitArea.draw(ctx);
		}
	}
}
