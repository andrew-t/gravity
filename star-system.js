class StarSystem {
	constructor(universe, planetCount = 5) {
		this.universe = universe;

		const planetMarginSide = 200,
			planetMarginTop = 50,
			planetMargin = 80,
			minPlanetRadius = 50,
			maxPlanetRadius = 150,
			density = 2000,
			planetRadiusVariation = maxPlanetRadius - minPlanetRadius,
			planetAreaWidth = universe.width - planetMarginSide * 2,
			planetAreaHeight = universe.height - planetMarginTop * 2;

		this.densityPower = 2;
		// mass = density * radius ^ densityPower
		// should be 3 in reality, or 2 in ideal 2D world
		// leaving as option because who the hell knows

		systemSearch:
		for (let systemAttempt = 0; systemAttempt < 100; ++systemAttempt) {
			this.planets = [];
			createPlanets:
			while (this.planets.length < planetCount) {
				nextPlanetSearch:
				for (let planetAttempt = 0; planetAttempt < 100; ++planetAttempt) {
					const r = Math.random() * planetRadiusVariation + minPlanetRadius,
						candidate = new Planet(this,
							new Vector(
								Math.random() * (planetAreaWidth - 2 * r) +
									r + planetMarginSide,
								Math.random() * (planetAreaHeight - 2 * r) +
									r + planetMarginTop),
								r,
							density * Math.pow(r, this.densityPower));
					for (let planet of this.planets)
						if (planet.location.distanceTo(candidate.location) <
								planet.radius + candidate.radius + planetMargin) {
							// console.log('Candidate planet does not fit');
							continue nextPlanetSearch;
						}
					// console.log('Placing a planet');
					this.planets.push(candidate);
					continue createPlanets;
				}
				console.log('Failed to place enough planets');
				continue systemSearch;
			}
			console.log('Done building star system');
			break systemSearch;
		}
		console.log(this.planets);
		this.forceRedraw();
	}

	forceRedraw() {
		this.image = null;
	}

	draw(ctx) {
		if (this.image)
			ctx.putImageData(this.image, 0, 0);
		else {
			this.planets.forEach(planet => planet.draw(ctx));
			// this.image = ctx.getImageData(0, 0, this.universe.width, this.universe.height);
		}
	}
	drawBacks(ctx) {
		this.planets.forEach(planet => planet.drawBack(ctx));
	}

	collision(lineSegment, radius) {
		let collision = null;
		this.planets.forEach(planet => {
			const planetCollision = planet.collision(lineSegment, radius);
			if (planetCollision &&
				(!collision || planetCollision.happensBefore(collision)))
				collision = planetCollision;
		});
		return collision;
	}

	gravityAt(point) {
		return this.planets.reduce(
			(soFar, planet) => soFar.plus(planet.gravityAt(point, this.densityPower)),
			Vector.zero);
	}
}
