class Universe {
	constructor(canvas) {
		this._canvas = canvas;

		this.width = 1440;
		this.height = 768;
		this.craterSize = 25;
		this.playerMargin = 100;
		this.playerRadius = 20;
		this.maxShotVelocity = 400;
		this.shotVelicityMultiplier = 0.8;

		this.starSystem = new StarSystem(this);
		this.players = [];
		this.particles = new Set();

		let _state = Universe.TARGETTING,
			_currentPlayer = 0;
		const self = this;
		this.gameState = {
			get currentPlayer() { return _currentPlayer; },
			set currentPlayer(val) {
				_currentPlayer = val;
				self._triggerEvent('change-player', val);
			},
			get state() { return _state; },
			set state(val) {
				_state = val;
				self._triggerEvent('state-change', val);
			}
		};
		setTimeout(() => {
			self._triggerEvent('state-change', _state);
			self._triggerEvent('change-player', _currentPlayer);
		});

		this.timestream = new Timestream();
		this.timestream.maxInterval = 100;
		this.timestream.on('frame', interval => this.withTransformedCanvas(ctx => {
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
					const planetCollision = this.starSystem.collision(
							motion, particle.radius);
					if (planetCollision) {
						particle.impact(planetCollision);
						if (particle.destroysPlanet) {
							planetCollision.obstacle.addCrater(
								planetCollision.location,
								this.craterSize);
							// Bits of planet
							Explosions.single(this, planetCollision.location,
								{
									velocity: Vector.zero,
									violence: 400,
									destroyOnImpact: true,
									debrisCount: 250,
									lifetime: 100000,
									debrisRadius: 3,
									globalCompositeOperation: 'source-over',
									baseColour: `${planetCollision.obstacle.hue}, 75%, 20%`,
									colourModel: 'hsl',
									smooth: false
								});
						}
					}
					if (particle.isBullet) {
						ongoingShot = true;
						if (particle.hasClearedShooter)
							this.players.forEach(player => {
								const playerCollision =
									player.collision(motion, particle.radius);
								if (playerCollision) {
									player.explode();
									particle.impact(playerCollision);
									document.getElementById('winner')
										.innerHTML = player.name;
									this.gameState.state = Universe.GAME_OVER;
								}
							});
						else if (particle.location.distanceTo(particle.owner.location) >
								particle.radius + particle.owner.hitArea.radius)
							particle.hasClearedShooter = true;
					}
				}
				particle.draw(ctx);
			});
			if (!ongoingShot &&
				this.gameState.state == Universe.ONGOING_SHOT)
				this.gameState.state = Universe.TARGETTING;
		}));

		this.addPlayer(
			new Vector(this.playerMargin, this.height / 2),
			this.playerRadius,
			'img/ship1.png')
				.name = 'Player One';
		this.addPlayer(
			new Vector(this.width - this.playerMargin, this.height / 2),
			this.playerRadius,
			'img/ship2.png')
				.name = 'Player Two';

		this._clickListener = e => {
			if (this.gameState.state != Universe.TARGETTING)
				return;
			this.currentPlayer.shoot(this.mouseToShot(e));
			this.endTurn();
		};
		canvas.addEventListener('click', this._clickListener);

		this._moveListener = e => {
			if (this.gameState.state != Universe.TARGETTING)
				return;
			const shot = this.mouseToShot(e);
			document.getElementById('shot-power')
				.innerHTML = Math.round(shot.length * 100 / this.maxShotVelocity);
			document.getElementById('shot-angle')
				.innerHTML = Math.round(shot.angle * 180 / Math.PI);
		};
		canvas.addEventListener('mousemove', this._moveListener);
	}

	mouseToShot(e) {
		const mouse = this.mouseVector(e);
		let shot = mouse.minus(this.currentPlayer.location)
				.times(this.shotVelicityMultiplier);
		if (shot.length > this.maxShotVelocity)
			shot = shot.normalise().times(this.maxShotVelocity);
		return shot;
	}

	mouseVector(e) {
		return Vector.canvasMouseVector(this._canvas, e)
			.minus(new Vector(this._canvas.width / 2, this._canvas.height / 2))
			.over(this._lastScale || 1)
			.plus(new Vector(this.width / 2, this.height / 2));
	}

	addPlayer(location, size, filename) {
		const player = new Player(this, location, size, filename);
		this.players.push(player);
		return player;
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
		this.starSystem.draw(ctx);
		this.players.forEach(player => player.draw(ctx));
	}

	withTransformedCanvas(code,
			canvas = this._canvas,
			ctx = canvas.getContext('2d'),
			clear = true) {
		if (clear)
			ctx.clearRect(-10, -10, canvas.width + 20, canvas.height + 20);
		const scale = Math.min(
			canvas.width / this.width,
			canvas.height / this.height);
		ctx.save();
		ctx.translate(canvas.width / 2, canvas.height / 2);
		ctx.scale(scale, scale);
		ctx.translate(-this.width / 2, -this.height / 2);
		if (canvas == this._canvas) {
			if (this._lastScale != scale)
				console.log('Viewing at ' + (scale * 100) + '% scale');
			this._lastScale = scale;
		}
		code(ctx);
		ctx.restore();
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
		this._canvas.removeEventListener(this._clickListener);
		this._canvas.removeEventListener(this._moveListener);
	}
}

Universe.TARGETTING = Symbol('Targetting');
Universe.ONGOING_SHOT = Symbol('Ongoing Shot');
Universe.GAME_OVER = Symbol('Game Over');

eventise(Universe);
