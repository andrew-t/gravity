class Collision {
	constructor(proportion, lineSegment, obstacle, missileRadius) {
		this.proportion = proportion;
		this.lineSegment = lineSegment;
		this.location = lineSegment.atParametricT(proportion);
		this.obstacle = obstacle;
		this._missileRadius = missileRadius;
		this._normal = null;
	}

	happensBefore(that) {
		return this.proportion < that.proportion;
	}

	get normal() {
		if (this._normal) return this._normal;

		// The most likely case is it hit the outer edge of a planet or a player:
		if (!this.obstacle.craters ||
			roughly(this.obstacle.location.distanceTo(this.location),
				this.obstacle.radius + this._missileRadius)) {
			console.log('Collision with exterior of planet/ship');
			// A - B is the direction from B to A;
			// we want a normal pointing out of the planet:
			return this._normal = this.location
				.minus(this.obstacle.location)
				.normalise();
		}

		// If that didn't happen, it hit a crater:
		const hits = this.obstacle.craters.filter(crater =>
			roughly(crater.centre.distanceTo(this.location),
				crater.radius - this._missileRadius));

		// There's a chance that something's gone wrong and
		// we've not detected any craters as plausible hit zones.
		if (!hits.length) {
			console.warn('Failed to detect collision with any crater walls or the planet.');
			// Bounce away from the planet like before;
			// it's as good a guess as any:
			return this._normal = this.location
				.minus(this.obstacle.location)
				.normalise();
		}

		// Again, the most likely case is it hit exactly one crater:
		if (hits.length == 1) {
			console.log('Collision with interior surface of crater');
			// This time the normal points *into* the crater:
			return this._normal = hits[0].centre
				.minus(this.location)
				.normalise();
		}
		// (This may also be the intersection of one crater edge
		// with the planet surface; that should work out the same
		// so we ignore that case and trust the above to handle it.)

		// We've hit at least two craters' intersection:
		const centroid = hits.reduce((prev, curr) =>
				prev.plus(curr.centre),
				Vector.zero)
			.over(hits.length);

		// Lastly, we might have hit the intersection of two craters.
		if (hits.length == 2) {
			console.log('Collision with intersection of two craters');
			// The point the missile hit will be a little way from
			// the centroid in one of two directions:
			const hitToCentroid = centroid.minus(hits[0].centre),
				bounceCentroidOffset = hitToCentroid
					.normalise()
					.perpendicular()
					.times(Math.sqrt(hits[0].radius * hits[0].radius -
						hitToCentroid.dot(hitToCentroid)));
			// Presumably one of them will be exactly missileRadius
			// from the location of the bounce, so pick the nearest to that:
			const a = centroid.plus(bounceCentroidOffset),
				b = centroid.minus(bounceCentroidOffset),
				aError = Math.abs(a.length - this._missileRadius),
				bError = Math.abs(b.length - this._missileRadius),
				bouncePoint = aError > bError ? b : a;
			// The normal points from the intersection to the player:
			return this._normal = this.location
				.minus(bouncePoint)
				.normalise();
			// (The idea here is that it is the location on the missile
			// that determines the normal reaction force; not the angle
			// of the wall that it hit.)
		}

		// Again, there's a chance that by error or fluke
		// we've hit the intersection of more than two craters.
		// If so, bounce from the centroid of the N craters,
		// that has to be pretty close???
		console.warn('Collision with intersection of many craters?');
		return this._normal = this.loction
			.minus(centroid)
			.normalise();

		function roughly(a, b) {
			// TODO - tune this value:
			return Math.abs(a - b) < 0.05;
		}
	}
}
