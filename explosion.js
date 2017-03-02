const Explosions = {

	full: function fullExplosion(
				universe, location, velocity) {
		// Smoke
		Explosions.single(universe, location,
			{
				velocity: velocity.times(0.2),
				violence: 400,
				lifetime: 5000,
				destroyOnImpact: false,
				debrisRadius: 20,
				debrisCount: 500,
				maxOpacity: 0.25,
				baseColour: '64, 64, 64',
				globalCompositeOperation: 'source-over'
			});
		// Fireball
		Explosions.single(universe, location,
			{
				velocity,
				violence: 750,
				lifetime: 1500,
				destroyOnImpact: false
			});
		// Glowing embers
		Explosions.single(universe, location,
			{
				velocity,
				violence: 750,
				destroyOnImpact: false,
				debrisCount: 100,
				lifetime: 2000,
				debrisRadius: 3,
				baseColour: '255, 255, 255'
			});
	},

	single: function explode(universe, position, {
		velocity,
		violence,
		debrisRadius,
		destroyOnImpact,
		lifetime,
		debrisCount,
		maxOpacity,
		globalCompositeOperation,
		baseColour
	}) {

		if (!velocity) velocity = Vector.zero;
		if (!violence) violence = 100;
		if (!debrisCount) debrisCount = 1000;
		if (!debrisRadius) debrisRadius = 20;
		if (destroyOnImpact === undefined) destroyOnImpact = true;
		if (!lifetime) lifetime = 1000;
		if (!globalCompositeOperation)
			globalCompositeOperation = 'screen';
		if (!baseColour) baseColour = '128, 16, 0';
		if (!maxOpacity) maxOpacity = 1;

		const startTime = universe.timestream.t;

		for (let i = 0; i < debrisCount; ++i) {
			const r = Math.random() * violence,
				theta = Math.random() * Math.PI * 2,
				particle = universe.addParticle(
					position,
					Vector.fromAngle(theta)
						.times(r)
						.plus(velocity),
					debrisRadius,
					{
						checkCollisions: destroyOnImpact,
						globalCompositeOperation,
						disposable: true
					});

			// Set the colour:
			Object.defineProperty(particle, 'colour', {
				get: () => 'rgba(' +
					baseColour + ', ' +
					((lifetime + startTime - universe.timestream.t)
						* maxOpacity / lifetime)
					+ ')'
			});

			if (destroyOnImpact)
				particle.on('impact', collision =>
					particle.destroy());
			universe.timestream.setTimeout(() =>
				particle.destroy(),
				lifetime);
		}
	}


};
