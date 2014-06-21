var worker;
var projectileLayer;
var inTurn = false;

function post(object) {
	object = JSON.stringify(object)
	console.log('document sent ' + object);
	worker.postMessage(object);
}

function init() {

	worker = new Worker('worker.js');
	projectileLayer = document.getElementById('projectiles');

	worker.addEventListener('message', function(e) {
		console.log('document received ' + e.data);
		var data = JSON.parse(e.data);
		switch(data.command) {
			case 'updateProjectile':
				var el = document.getElementById(data.name);
				positionElement(el, data.position);
				if (data.isDebris)
					el.style.opacity = 1.0 - (data.age / data.lifespan);
				break;
			case 'removeProjectile':
				projectileLayer.remove(document.getElementById(data.projectile));
				break;
			case 'addProjectile':
				insertProjectile(data.name, data.class, data.position);
				break;
			case 'updatePlanet':
				// todo - update the mask of a planet.
				break;
			case 'endGame':
				document.getElementById('ship_' + data.loser).classList.push('destroyed');
				break;
			case 'endTurn':
				inTurn = false;
				updateturn();
				break;
		}
	}, false);
	
	$('#board').click(clik);
	$('#board').mousemove(move);
	$('#intro').click(function() { $('#intro').hide() });
	forceopts('options', 'links');
	//$('#shotinfo').draggable({ containment: 'body', scroll: false });

	startGame();
}

var ships;

var turn = 1;
var wmult;
var hmult;
var margin = 100.0;
function startGame() {
	wmult = $(window).width() - (margin * 2.0);
	hmult = $(window).height() - (margin * 2.0);
	$('#ships').css({left: (margin - 25) + 'px', top: (margin - 25) + 'px'});
	$('#planets').css({left: (margin - 75) + 'px', top: (margin - 75) + 'px'});
	$('#projectiles').css({left: (margin - 5) + 'px', top: (margin - 5) + 'px'});

	ships = [];
	for (var i = 1; i >= 0; i--) {
		var p =	new Vector(i * wmult, hmult / 2);
		var s = Ship(i, p);
		ships.push(s);
		var el = s.element();
		el.classList = [];
		positionElement(el, s.position);
	};
	
	$('#planets > *').remove();
	var planets = [];

	var r = 75;
	var bsq = (75 * 2 + planetberth) * (75 * 2 + planetberth);
	for (i = 0; i < numplanets; ++i) {
		var cont = true;
		var position;
		for (tries = 0; cont && (tries < 100); ++tries) {
			position = new Vector(
				Math.random() * (wmult - 300.0) + 150.0,
				Math.random() * hmult);
			cont = false;
			for (var j = planets.length - 1; (j >= 0) && !cont; j--)
				if (planets[j].position.minus(position).magnitudeSquared() < bsq)
					cont = true;
		}
		if (cont)
			continue;
		var planet = Planet(position, '', /*mass:*/ 1, r);
		planets.push(planet);
		$('#planets').append('<div id="' + planet.name + '"></div>');
		var el = planet.element();
		positionElement(el, position);
		$(el).css('backgroundImage', "url('planet" + ((i % 5) + 1) + ".png')");
	}

	$('#projectiles > *').remove();
	post({
		command: 'newGame',
		planets: SerializePlanets(planets)
	});

	inTurn = false;
	updateturn();
}

function insertProjectile(name, c, position) {
	var el = document.createElement('div');
	el.id = name;
	el.c = c;
	positionElement(el, position);
	projectileLayer.appendChild(el);
}

function positionElement(el, v) {
	el.style.left = Math.floor(v.x) + 'px';
	el.style.top = Math.floor(v.y) + 'px';
}


// variables
var numplanets = 5;
var speedmult = 0.02;
var maxspeedsq = 250000;
var bomblife = 5;
var planetberth = 75;

// main stuff
function move(e) {
	var turnship = ships[turn - 1];
	if (!turnship || turnship.destroyed || inTurn) {
		$('#board').css('cursor', 'not-allowed');
		return;
	}

	var cursor = new Vector(e.pageX - margin, e.pageY - margin);
	var v = cursor.minus(turnship.position).times(speedmult);
	var power = v.magnitudeSquared();
	if (power > maxspeedsq) {
		$('#board').css('cursor', 'not-allowed');
		$('#shotinfo').html('Out of range');
		return;
	}

	$('#board').css('cursor', 'crosshair');
	var pos = turnship.position;
	$('#shotinfo').html(
		'Power: ' + (Math.sqrt(power / maxspeedsq) * 100).toFixed(2) +
		'%<br />Angle: ' + (v.angle() * 180 / Math.PI).toFixed(2) + '&deg;');

	return v;
}
function clik(e) {
	var v = move(e);
	if (!v)
		return;
	inTurn = true;
	// launch missile
	var turnship = ships[turn - 1];

	post({
		command: 'addBomb',
		position: ships[turn - 1].position.serialize(),
		v: v.serialize(),
		class: 'bomb',
		lifespan: bomblife,
		owner: turnship.name,
		blastRadius: 25
	});
}

function updateturn() {
	if (ships.length == 0)
		return;
	turn = 3 - turn;
	var p = ships[turn - 1].position;
	positionElement(
		document.getElementById('turnindicator'),
		ships[turn - 1].position);
	switch (turn)
	{
		case 1:
			$('#shotinfo').css('float', 'left');
			$('#options').css('float', 'right');
			break;
		case 2:
			$('#shotinfo').css('float', 'right');
			$('#options').css('float', 'left');
			break;
	}
}


// semi-internals
function showopts(cont, panel) {
	$('#' + cont).children('div:not(#' + panel + ')').slideUp();
	$('#' + cont).children('#' + panel).slideToggle();
}
function forceopts(cont, panel) {
	$('#' + cont).children('div:not(#' + panel + ')').slideUp();
	$('#' + cont).children('#' + panel).slideDown();
}
function increment(varname, amount, limit) {
	eval('if ((' + varname + ' += amount) == limit) ' + varname + ' -= amount;');
	$('#' + varname).html(eval(varname));
}