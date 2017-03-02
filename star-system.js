class StarSystem {
	constructor(canvas, planetCount = 5) {
		this.canvas = canvas;

		// TODO: Generate?
		const planetMarginSide = 100,
			planetMarginTop = 50,
			planetMargin = 80,
			minPlanetRadius = 50,
			maxPlanetRadius = 150,
			density = 2000,
			planetRadiusVariation = maxPlanetRadius - minPlanetRadius,
			planetAreaWidth = canvas.width - planetMarginSide * 2,
			planetAreaHeight = canvas.height - planetMarginTop * 2;
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
						candidate = new Planet(new Vector(
							Math.random() * (planetAreaWidth - 2 * r) + r + planetMarginSide,
							Math.random() * (planetAreaHeight - 2 * r) + r + planetMarginTop),
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
		console.log(this.planets)

	}

	draw(ctx) {
		this.planets.forEach(planet => planet.draw(ctx));
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
