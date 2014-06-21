function Vector(x, y) {
	var v = this;

	this.x = x;
	this.y = y;

	this.add = function(vector) {
		v.x += vector.x;
		v.y += vector.y;
	}
	this.subtract = function(vector) {
		v.x -= vector.x;
		v.y -= vector.y;
	}
	this.multiply = function(s) {
		v.x *= s;
		v.y *= s;
	}
	this.divide = function(s) {
		v.x /= s;
		v.y /= s;
	}

	this.plus = function(vector) {
		return new Vector(v.x + vector.x, v.y + vector.y);
	}
	this.minus = function(vector) {
		return new Vector(v.x - vector.x, v.y - vector.y);
	}
	this.times = function(s) {
		return new Vector(v.x * s, v.y * s);
	}
	this.over = function(s) {
		return new Vector(v.x / s, v.y / s);
	}

	this.magnitudeSquared = function() {
		return v.x * v.x + v.y * v.y;
	}
	this.magnitude = function() {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	this.angle = function() {
		return Math.atan2(v.x, v.y);
	}
	this.serialize = function() {
		return {
			x: v.x,
			y: v.y
		};
	}
}
function DeserializeVector(v) {
	return new Vector(v.x, v.y);
}

function Thing(name, position) {
	this.name = name;
	this.position = position;

	this.element = function() {
		return document.getElementById(name);
	};
}

var projectileCount = 0;
function Projectile(position, velocity, lifespan) {
	var p = new Thing('projectile_' + projectileCount++, position);

	p.velocity = velocity;
	p.lifespan = lifespan; // milliseconds
	p.age = 0;

	p.fly = function(time) {
		p.position.add(p.velocity.times(time));
	};
	p.force = function(time, g) {
		p.velocity.add(g.times(time));
	};

	return p;
}

function Bomb(position, velocity, lifespan, owner, blastRadius) {
	var p = Projectile(position, velocity, lifespan);

	p.isBomb = true;
	p.owner = owner;
	p.blastRadius = blastRadius;
	p.blastRadiusSquared = blastRadius*blastRadius;

	return p;
}

function Debris(position, speed, lifespan) {
	var theta = Math.random() * Math.PI * 2;
	var r = Math.random() * speed;
	var p = Projectile(position,
		new Vector(r * Math.sin(theta), r * Math.cos(theta)),
		'debris',
		lifespan);

	p.isDebris = true;

	return p;
}

var planetCount = 0;
function Planet(position, m, r, mask) {
	var p = new Thing('planet_' + planetCount++, position);

	p.mass = m;
	p.radius = r;
	var radiusSquared = r*r;
	var radiusCubed = r*r*r;
	var GM = 0.6 * m;
	var GMOverRadiusCubed = GM / radiusCubed;

	if (mask)
		p.mask = mask
	else {
		p.mask = []
		var w = r * 2;
		for (var x = r - 1; x >= 0; x--)
			for (var y = r - 1; y >= 0; y--) {
				p.mask[(r - y - 1) * w + (r - x - 1)] =
				p.mask[(r + y)     * w + (r - x - 1)] =
				p.mask[(r - y - 1) * w + (r + x)] =
				p.mask[(r + y)     * w + (r + x)] =
					(x*x + y*y <= radiusSquared);
		}
	}

	p.serialize = function () {
		return [
			p.position.x,
			p.position.y,
			p.mass,
			p.radius,
			p.mask
		];
	}

	p.gravityAt = function(pos) {
		// s = dispacement from projectile to planet
		var s = p.position.minus(pos);
		var rsq = s.magnitudeSquared();

		return g = rsq >= radiusSquared
			// f = GMm/r => a = GM/r
			// => as vectors, a = s * GM/r²
			? s.times(GM / rsq)
			// net gravity is zero within a hollow shell so just take small subplanet 'below' missile.
			// therefore, it's the same but M = M*(r/R)^3
			// => a = GM/r = GMr²/R^3
			// as vectors, a = s * (GMr/R^3)
			: s.times(GMOverRadiusCubed * Math.sqrt(rsq));
	}

	p.contains = function(pos) {
		pos.subtract(p.position);
		return pos.x >= -r &&
			pos.x <= r &&
			pos.y >= -r &&
			pos.y <= r &&
			p.mask[(pos.y + r) * w + (pos.x + r)];
	}

	p.crater = function(pos, r) {
		pos.subtract(p.position);
		var rsq = r*r;
		// todo - optimise
		for (var x = r - 1; x >= -r; x--)
			for (var y = r - 1; y >= -r; y--) {
				var i = (r + y) * w + (r + x);
				if (!p.mask[i])
					continue;
				var v = new Vector(x, y);
				if (v.minus(pos).magnitudeSquared() <= rsq)
					p.mask[i] = false;
			}
	}

	return p;
}
function DeserializePlanet(array) {
	return Planet(new Vector(array[0], array[1]), array[2], array[3], array[4]);
}
function DeserializePlanets(array) {
	for (var i = array.length - 1; i >= 0; i--)
		array[i] = DeserializePlanet(array[i]);
	return array;
}
function SerializePlanets(planets) {
	for (var i = planets.length - 1; i >= 0; i--)
		planets[i] = planets[i].serialize();
	return planets;
}

function Ship(name, position) {
	var p = new Thing('ship_' + name, position);

	p.radius = 25;
	p.radiusSquared = p.radius * p.radius;
	p.destroyed = false;

	p.contains = function(position) {
		return position.minus(p.position).magnitudeSquared() <= p.radiusSquared;
	}

	return p;
}