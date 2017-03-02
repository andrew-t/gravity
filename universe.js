class Universe {
	constructor(canvas) {
		this.canvas = canvas;
		this.starfield = new Starfield(canvas);
		this.starSystem = new StarSystem(canvas);
		this.players = [];
		this.particles = new Set();

		this.gameState = {
			currentPlayer: 0,
			state: Universe.TARGETTING
		};

		this.craterSize = 25;

		this.timestream = new Timestream();
		this.timestream.maxInterval = 100;
		this.timestream.on('frame', interval => {
			const ctx = this.canvas.getContext('2d');
			let ongoingShot = false;
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
				if (particle.isBullet) {
					ongoingShot = true;
					// TODO:
					// this.players.forEach(player =>
					// if (motion.intersects(player.circle))
					// player.explode();
				}
				particle.draw(ctx);
			});
			if (!ongoingShot)
				this.gameState.state = Universe.TARGETTING;
		});

		this._clickListener = e => {
			if (this.gameState.state != Universe.TARGETTING)
				return;
			const mouse = Vector.canvasMouseVector(this.canvas, e);
			this.currentPlayer.shoot(
				mouse.minus(this.currentPlayer.location)
					.times(1));
			this.endTurn();
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

	get currentPlayer() {
		return this.players[this.gameState.currentPlayer];
	}

	endTurn() {
		this.gameState.currentPlayer =
			1 - this.gameState.currentPlayer;
		this.gameState.state = Universe.ONGOING_SHOT;
	}

	destroy() {
		this._cancelUpdates();
		this.canvas.removeEventListener(this._clickListener);
	}
}

Universe.TARGETTING = Symbol('Targetting');
Universe.ONGOING_SHOT = Symbol('Ongoing Shot');
