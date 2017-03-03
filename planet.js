class Planet {
	constructor(starSystem, location, radius, mass) {
		this.starSystem = starSystem;
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
		ctx.globalCompositeOperation = 'source-atop';
		ctx.fillStyle = 'transparent';
		ctx.strokeStyle = '#840';
		ctx.strokeWidth = 8;
		this.craters.forEach(crater => crater.draw(ctx));
		ctx.globalCompositeOperation = 'source-over';
	}

	drawBack(ctx) {
		ctx.strokeStyle = 'transparent';
		ctx.fillStyle = `hsl(${this.hue}, 75%, 15%)`;
		this.circle.draw(ctx);
	}

	addCrater(location, radius) {
		this.craters.push(new Circle(location, radius));
		this.starSystem.forceRedraw();
	}

	get circle() {
		return new Circle(this.location, this.radius);
	}

	collision(lineSegment, missileRadius) {
		const main = lineSegment.intersectionWithCircle(
			new Circle(this.location, this.radius + missileRadius));
		if (!main)
			return null;

		let start = lineSegment.parametricTOfPoint(main.start),
			end = lineSegment.parametricTOfPoint(main.end);
		if (start > end)
			[ start, end ] = [ end, start ];
		// console.log('potential collision from ' + start + ' to ' + end);
		if (end < 0 || start > 1)
			return null;

		if (end > 1) end = 1;
		if (start < 0) start = 0;
		// console.log('revised potential collision from ' + start + ' to ' + end);

		const nonCrater = new OneDimensionalSet();
		nonCrater.add(start, end);

		this.craters.forEach(crater => {
			const craterIntersection = lineSegment.intersectionWithCircle(
					new Circle(crater.centre, crater.radius - missileRadius));
			if (craterIntersection) {
				console.log(craterIntersection.toString())
				const start = lineSegment.parametricTOfPoint(craterIntersection.start),
					end = lineSegment.parametricTOfPoint(craterIntersection.end);
				// console.log('crater from ' + start + ' to ' + end);
				nonCrater.remove(start, end);
			}
		});

		// console.log(nonCrater.parts);

		const el = nonCrater.firstElement();
		if (el == null)
			return null;

		// console.log('collision at ' + el)

		return new Collision(el,
			lineSegment.atParametricT(el),
			this);
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
