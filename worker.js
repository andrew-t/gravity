importScripts('projectile.js');

function post(object) {
	self.postMessage(JSON.stringify(object));
}

self.addEventListener('message', function(e) {
	var data = JSON.parse(e.data);
	switch (data.command) {
		case 'addBomb':
			var bomb = Bomb(DeserializeVector(data.position),
				DeserializeVector(data.v),
				data.lifespan,
				data.owner,
				data.blastRadius);
			projectiles.push(bomb);
			post({
				command: 'addProjectile',
				name: bomb.name,
				position: bomb.position.serialize(),
				class: bomb.class
			});
			break;
		case 'newGame':
			projectiles = [];
			for (var i = ships.length - 1; i >= 0; i--) {
				ships[i].destroyed = false;
			};
			break;
	}
}, false);

var planets = [];
var projectiles = [];
var ships = [];

var t = 20; // milliseconds
var lastFrame = new Date();
var maxTime = 100; // milliseconds

var inTurn = false;

var tik;
tik = function() {
	var thisFrame = new Date();
	t = (thisFrame - lastFrame);
	lastFrame = thisFrame;
	if (t > maxTime)
		t = maxTime;

	var activeBombs = 0;
	for (var i = projectiles.length - 1; i >= 0; i--) {
		var p = projectiles[i];

		// gravity
		for (var j = planets.length - 1; j >= 0; j--) {
			var planet = planets[j];
			p.force(t, planet.gravityAt(p.position));
			if (p.isBomb)
				p.collide(projectile);
		}
		p.fly(t);

		var exploded = false;
		if (p.isBomb) {
			activeBombs++;

			// planet collisions
			for (var j = planets.length - 1; j >= 0; j--) {
				var planet = planets[j];
				p.force(t, planet.gravityAt(p.position));
				if (planet.contains(p.position)) {
					removeProjectile(i);
					planet.crater(p.position, p.blastRadius);
					post({
						command: 'updatePlanet',
						planet: planet.serialize()
					});
					exploded = true;
					break;
				}
			}

			// ship collisions
			for (var j = ships.length - 1; j >= 0; j--) {
				var s = ships[j];
				if (!s.destroyed && s.contains(p.position) && s.name != p.owner) {
					explodeProjectile(i);
					post({
						command: 'endGame',
						loser: j
					});
					exploded = true;
					break;
				}
			}
		}

		if ((p.age += t) > p.lifespan) {
			explodeProjectile(i);
			exploded = true;
		}

		if (exploded)
			continue;

		post({
			command: 'updateProjectile',
			name: p.name,
			position: {
				x: p.position.x,
				y: p.position.y
			},
			isDebris: p.isDebris,
			age: p.age,
			lifespan: p.lifespan
		});
	}

	if (inTurn && (activeBombs == 0)) {
		inTurn = false;
		post({
			command: 'endTurn'
		});
	} else if (activeBombs > 0)
		inTurn = true;

	setTimeout(tik, 5);
}
setTimeout(tik, 500);

function explodeProjectile(i) {
	var xp = projectiles[i];
	for (var i = 25; i >= 0; i--) {
		var p = Debris(xp.position, 5);
		projectiles.push(p);
		post({
			command: 'addProjectile',
			name: p.name,
			position: p.position.serialize(),
			class: 'debris'
		});
	}
	removeProjectile(i);
}

function removeProjectile(i) {
	post({
		command: 'removeProjectile',
		projectile: projectiles[i].name
	});
	projectiles.splice(i, 1);
}