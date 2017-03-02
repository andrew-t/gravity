class Universe {
	constructor(canvas) {
		this.canvas = canvas;
		this.starfield = new Starfield(canvas);
		this.starSystem = new StarSystem(canvas);
		this.players = [];
		this.particles = new Set();

		this.craterSize = 25;

		this.timestream = new Timestream();
		this.timestream.maxInterval = 100;
		this.timestream.on('frame', interval => {
			const ctx = this.canvas.getContext('2d');
			this.drawBackground(ctx);
			this.particles.forEach(particle => {
				if (interval == this.maxInterval &&
					particle.disposable)
					particle.destroy();
				if (particle.destroyed) {
					this.removeParticle(particle);
					return;
				}
				const motion = particle.advance(
						interval / 1000, this.starSystem);
				if (particle.checkCollisions) {
					const collision = this.starSystem.collision(
							motion, particle.radius);
					if (collision)
						particle.impact(collision);
				}
				particle.draw(ctx);
			});
		});

		this._clickListener = e => {
			const mouse = Vector.canvasMouseVector(this.canvas, e),
				player = this.players[0];
			player.shoot(mouse.minus(player.location).times(1));
		};
		canvas.addEventListener('click', this._clickListener);
	}

	addPlayer(location, size) {
		this.players.push(
			new Player(this, location, size));
	}

	addParticle(...args) {
		const p = new Particle(this, ...args);
		this.particles.add(p);
		return p;
	}

	removeParticle(particle) {
		this.particles.delete(particle);
	}

	drawBackground(ctx) {
		this.starfield.draw(ctx);
		this.starSystem.draw(ctx);
		this.players.forEach(player => player.draw(ctx));
	}

	gravityAt(location) {
		return this.starSystem.gravityAt(location);
	}

	destroy() {
		this._cancelUpdates();
		this.canvas.removeEventListener(this._clickListener);
	}
}
