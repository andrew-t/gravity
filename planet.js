class Planet {
	constructor(location, radius, mass) {
		this.location = location;
		this.radius = radius;
		this.radiusSquared = radius * radius;
		this.mass = mass;
		this.hue = Math.random() * 360;
		this.craters = [];
	}

	draw(ctx) {
		ctx.globalCompositeOperation = 'source-over';
		ctx.strokeStyle = 'transparent';
		if (!this.gradient) {
			this.gradient = ctx.createRadialGradient(
				this.location.x - this.radius * 0.3, this.location.y - this.radius * 0.3, this.radius * 2,
				this.location.x - this.radius * 0.3, this.location.y - this.radius * 0.3, 0);
			this.gradient.addColorStop(0, `hsl(${this.hue}, 75%, 20%)`);
			this.gradient.addColorStop(1, `hsl(${this.hue}, 75%, 75%)`);
		}
		ctx.fillStyle = this.gradient;
		this.circle.draw(ctx);
		ctx.globalCompositeOperation = 'destination-out';
		ctx.fillStyle = 'black';
		this.craters.forEach(crater => crater.draw(ctx));
		ctx.globalCompositeOperation = 'source-over';
	}

	drawBack(ctx) {
		ctx.strokeStyle = 'transparent';
		ctx.fillStyle = `hsl(${this.hue}, 75%, 25%)`;
		this.circle.draw(ctx);
	}

	addCrater(location, radius) {
		this.craters.push(new Circle(location, radius));
	}

	get circle() {
		return new Circle(this.location, this.radius);
	}

	collision(lineSegment, radius) {
		// TODO: do this properly
		if (this.location.distanceTo(lineSegment.end) <= this.radius + radius) {
			for (let crater of this.craters)
				if (crater.centre.distanceTo(lineSegment.end) <= crater.radius + radius)
					return null;
			return new Collision(1, lineSegment.end, this);
		}
	}

	gravityAt(point, densityPower = 3) {
		const R = this.location.minus(point),
			r2 = R.dot(R);

		// In scalar terms: F = GMm /  r ^2
		// As acceleration: a = GM  /  r ^2
		// In vector terms: a = GMr / |r|^3
		// Defining G = 1:  a =  Mr / |r|^3
		if (r2 >= this.radiusSquared)
			return R.times(this.mass / Math.pow(r2, 3/2));

		// Inside the sphere, we can ignore all the mass "above" the point.
		// so if R is the radius of the planet,
		// g = Mr / R^2|r|
		// and since mass is proportional to radius cubed,
		// a = g * (|r|/R)^3
		//   = (Mr * |r|^3) / (R^5 * |r|)
		//   = (Mr * |r|^2) / R^5
		return R.times(this.mass * Math.pow(r2, (densityPower - 1) / 2) /
			Math.pow(this.radius, densityPower + 2));
	}
}
