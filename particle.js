if (typeof require !== 'undefined') {
	eventise = require('./framerate/events');
}

class Particle {
	constructor(universe, location, velocity, radius, opts = {}) {
		this.universe = universe;
		this.location = location;
		this.velocity = velocity;
		this.radius = radius;

		this.checkCollisions = def('checkCollisions', true);
		this.colour = def('colour', 'red');
		this.globalCompositeOperation = def('globalCompositeOperation', null);
		this.disposable = def('disposable', false);

		this.destroyed = false;

		function def(name, defVal) {
			return (!opts || !opts.hasOwnProperty(name))
				? defVal
				: opts[name];
		}
	}

	get circle() {
		return new Circle(this.location, this.radius);
	}

	draw(ctx) {
		if (this.destroyed)
			return;
		const globalCompositeOperation =
			ctx.globalCompositeOperation;
		ctx.fillStyle = this.colour;
		ctx.strokeStyle = 'transparent';
		if (this.globalCompositeOperation)
			ctx.globalCompositeOperation =
				this.globalCompositeOperation;
		this.circle.draw(ctx);
		ctx.globalCompositeOperation =
			globalCompositeOperation;
	}

	advance(interval) {
		if (this.destroyed)
			return null;
		const oldLocation = this.location;
		this.location = this.location.plus(this.velocity.times(interval));
		this.velocity = this.velocity.plus(this.universe.gravityAt(oldLocation).times(interval));
		return new LineSegment(oldLocation, this.location);
	}

	destroy() {
		this.destroyed = true;
		this.universe.removeParticle(this);
	}

	impact(collision) {
		this._triggerEvent('impact', collision);
	}
}

eventise(Particle);
