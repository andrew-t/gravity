class Universe {
	constructor(canvas) {
		this._canvas = canvas;

		this.width = 1440;
		this.height = 768;
		this.craterSize = 25;
		this.playerMargin = 100;
		this.playerRadius = 20;
		this.maxShotVelocity = 600;
		this.ownerClearance = 50;
		this.shotPowerUpSpeed = this.maxShotVelocity / 3000;

		this.players = [];
		this.particles = new Set();

		let _state = Universe.PREGAME,
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
			},
			shot: {
				angle: Vector.zero,
				power: 0
			}
		};
		setTimeout(() => {
			self._triggerEvent('state-change', _state);
			self._triggerEvent('change-player', _currentPlayer);
		});

		this.timestream = new Timestream();
		this.timestream.maxInterval = 100;
		this.timestream.on('frame', interval => this.withTransformedCanvas(ctx => {
			if (this.gameState.state == Universe.POWERING) {
				this.gameState.shot.power += this.shotPowerUpSpeed * interval;
				if (this.gameState.shot.power >= this.maxShotVelocity)
					this.gameState.shot.power = this.maxShotVelocity;
				this.updateShotAngle();
			}
			let ongoingShot = false;
			this.drawBackground(ctx);
			if (this.gameState.state == Universe.TARGETTING ||
				this.gameState.state == Universe.POWERING) {
				ctx.fillStyle = 'transparent';
				ctx.strokeStyle = '#00ff00';
				ctx.lineWidth = 2;
				new Circle(this.currentPlayer.location, 30).draw(ctx);
				new LineSegment(
						this.currentPlayer.location
							.plus(this.gameState.shot.angle.times(30)),
						this.currentPlayer.location
							.plus(this.gameState.shot.angle.times(30 +
								Math.max(10, this.gameState.shot.power /
									this.maxShotVelocity * 100))))
					.draw(ctx);
			}
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
									baseColour: `${planetCollision.obstacle.hue}, 75%, 45%`,
									colourModel: 'hsl',
									smooth: false
								});
						}
						particle.impact(planetCollision);
					}
					if (particle.isBullet) {
						ongoingShot = true;
						if (particle.location.distanceTo(particle.owner.location) >
									this.ownerClearance &&
								!particle.hasClearedShooter) {
							particle.hasClearedShooter = true;
							console.log('Missile cleared shooter');
						} else if (particle.hasClearedShooter)
							this.players.forEach(player => {
								const playerCollision =
									player.collision(motion, particle.radius);
								if (playerCollision) {
									player.explode();
									particle.impact(playerCollision);
									const winner = this.otherPlayer(player);
									document.getElementById('winner').innerHTML = winner.name;
									++winner.score;
									this.players.forEach((player, i) =>
										document.getElementById(`score-${i + 1}`).innerHTML =
											player.score);
									this.gameState.state = Universe.GAME_OVER;
								}
							});
					}
				}
				particle.draw(ctx);
			});
			if (!ongoingShot &&
				this.gameState.state == Universe.ONGOING_SHOT) {
				this.gameState.state = Universe.TARGETTING;
				this.gameState.shot.power = 0;
			}
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

		this._canvasListeners = {};

		this.addCanvasListener('touchstart mousedown', e => {
			if (this.gameState.state == Universe.TARGETTING) {
				this.gameState.shot.power = 0;
				this.updateShotAngle(e);
				this.gameState.state = Universe.POWERING;
				e.preventDefault();
			}
		});

		this.addCanvasListener('touchend mouseup', e => {
			if (this.gameState.state != Universe.POWERING)
				return;
			this.updateShotAngle(e);
			if (this.gameState.shot.power >= this.maxShotVelocity)
				this.gameState.shot.power = this.maxShotVelocity;
			this.currentPlayer.shoot(this.gameState.shot.angle
					.times(this.gameState.shot.power));
			this.endTurn();
			e.preventDefault();
		});

		this.addCanvasListener('mouseout', e => {
			if (this.gameState.state == Universe.POWERING)
				this.gameState.state = Universe.TARGETTING;
		});

		this.addCanvasListener('touchmove mousemove', e => {
			if (this.gameState.state == Universe.POWERING ||
				this.gameState.state == Universe.TARGETTING) {
				this.updateShotAngle(e);
				e.preventDefault();
			}
		});

		this.resetForNewGame();
	}

	resetForNewGame() {
		this.starSystem = new StarSystem(this);
		this.players.forEach(player => player.destroyed = false);
		this._triggerEvent('reset');
	}

	startGame() {
		this.gameState.state = Universe.TARGETTING;
	}

	updateShotAngle(e) {
		if (e && (!e.touches || e.touches.length == 1)) {
			this.gameState.shot.angle = this.eventVector(e)
				.minus(this.currentPlayer.location)
				.normalise();
			document.getElementById('shot-angle').innerHTML =
				Math.round(this.gameState.shot.angle.angle
					* 180 / Math.PI);
		}
		document.getElementById('shot-power').innerHTML =
			Math.round(this.gameState.shot.power
				* 100 / this.maxShotVelocity);
	}

	addCanvasListener(events, callback) {
		events.split(' ')
			.forEach(event => {
				if (!this._canvasListeners[event])
					this._canvasListeners[event] = [];
				this._canvasListeners[event].push(callback);
				this._canvas.addEventListener(event, callback);
			});
	}

	otherPlayer(player) {
		return this.players[1 - this.players.indexOf(player)];
	}

	mouseToShot(e) {
		const mouse = this.mouseVector(e);
		let shot = mouse.minus(this.currentPlayer.location)
				.times(this.shotVelicityMultiplier);
		if (shot.length > this.maxShotVelocity)
			shot = shot.normalise().times(this.maxShotVelocity);
		return shot;
	}

	eventVector(e) {
		return Vector.canvasMouseVector(this._canvas,
				e.touches ? e.touches[0] : e)
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
		for (let event in this._canvasListeners)
			this._canvasListeners[event].forEach(listener =>
				this._canvas.removeEventListener(event, listener));
	}
}

Universe.PREGAME = Symbol('Pre-game');
Universe.TARGETTING = Symbol('Targetting');
Universe.POWERING = Symbol('Powering Up');
Universe.ONGOING_SHOT = Symbol('Ongoing Shot');
Universe.GAME_OVER = Symbol('Game Over');

eventise(Universe);
