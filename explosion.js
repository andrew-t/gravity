const Explosions = {

	full: function fullExplosion(
				universe, location, velocity = Vector.zero) {
		// Smoke
		Explosions.single(universe, location,
			{
				velocity: velocity.times(0.2),
				violence: 200,
				lifetime: 5000,
				destroyOnImpact: false,
				debrisRadius: 50,
				debrisCount: 70,
				maxOpacity: 0.25,
				baseColour: '64, 64, 64',
				globalCompositeOperation: 'source-over'
			});
		// Fireball
		Explosions.single(universe, location,
			{
				velocity,
				violence: 450,
				lifetime: 1500,
				debrisCount: 100,
				debrisRadius: 30,
				destroyOnImpact: false
			});
		// Glowing embers
		Explosions.single(universe, location,
			{
				velocity,
				violence: 350,
				destroyOnImpact: false,
				debrisCount: 50,
				lifetime: 2000,
				debrisRadius: 3,
				baseColour: '255, 255, 255',
				smooth: false
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
		baseColour,
		smooth,
		colourModel
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
		if (smooth === undefined) smooth = true;
		if (!colourModel) colourModel = 'rgb';

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
						disposable: true,
						colour: colourModel + '(' + baseColour + ')'
					});

			particle.on('before-draw', e => {
				if (particle.age > lifetime)
					particle.destroy();
				particle.globalAlpha =
					(lifetime + startTime - universe.timestream.t)
						* maxOpacity / lifetime;
				if (smooth) {
					const gradient = e.ctx.createRadialGradient(
						particle.location.x, particle.location.y, debrisRadius,
						particle.location.x, particle.location.y, 0);
					gradient.addColorStop(0, colourModel + 'a(' + baseColour + ', 0)');
					gradient.addColorStop(1, colourModel + 'a(' + baseColour + ', 1)');
					particle.colour = gradient;
				}
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
