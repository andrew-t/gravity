// variables
var margin = 100;
var framerate = 20; //ms per frame
var numplanets = 5;
var score = [0, 0, 0];
var G = 12; var speedmult = 0.02;
var maxspeedsq = 250000;
var bomblife = 5;

// explosions
var expcount = 20;
var expspeed = 5;
var explife = 1000 / framerate;


// main stuff
function clik(e) {
	move(e);
	if ($('#board').css('cursor') == 'not-allowed') return;
	if (activebombs > 0) return;
	// launch missile
	var turnship = get('ship', turn);
	var p = turnship.position();
	var xs = (e.pageX - p.left - margin) * speedmult;
	var ys = (e.pageY - p.top - margin) * speedmult;
	newbomb(turn, xs, ys, true);
	updateturn();
}
function move(e)
{
	var turnship = get('ship', turn);
	if (turnship.length == 0) {
		updateturn();
		turnship = get('ship', turn);
	}
	if (turnship.length == 0) {
		$('#board').css('cursor', 'not-allowed');
	} else if (activebombs == 0) {
		var power = sqdistanceto(turnship, e.pageX - margin, e.pageY - margin);
		if (power > maxspeedsq) {
			$('#board').css('cursor', 'not-allowed');
			$('#shotinfo').html('Out of range');
		} else {
			$('#board').css('cursor', 'crosshair');
			var pos = turnship.position();
			$('#shotinfo').html('Power: ' + (Math.sqrt(power / maxspeedsq) * 100).toFixed(2) +
				'%<br />Angle: ' + (Math.atan2(pos.left - e.pageX + margin,
				pos.top - e.pageY + margin) * 180 / Math.PI).toFixed(2) + '&deg;');
		}
	}
}

function tik() {
	all('projectile').each( function() {
		var i = this.id; var that = this;
		// gravity...
		$(this).css({left: xes[i] += xss[i], top: yes[i] += yss[i]});
		all('planet').each( function() {
			var p2 = $(this).position();
			var rsq = sqdistanceto($(this), xes[i], yes[i]);
			if (rsq >= planetrsq[this.id])
				// f = GMm/r => a = GM/r
				// => as vectors, a = r * GM/r²
				var k = G * planetmass[this.id] / rsq;
			else
				// net gravity is zero within a hollow shell so just take small subplanet 'below' missile.
				// therefore, it's the same but M = M*(r/R)^3
				// => a = GM/r = GMr²/R^3
				// as vectors, a = r * (GMr/R^3)
				var k = G * planetmass[this.id] * Math.sqrt(rsq) / Math.pow(planetr[this.id], 3);
			xss[i] -= k * (xes[i] - p2.left);
			yss[i] -= k * (yes[i] - p2.top);
		});
		if (projectilebomb[that.id])
		{
			// ship collisions
			all('ship').each( function() {
				if (this.id == projectileowners[i]) {
					if (sqdistanceto($(this), xes[i], yes[i]) > 625)
						projectileowners[i] = -1;
				} else if (sqdistanceto($(this), xes[i], yes[i]) < 625) {
					kaboom(this);
					$(this).remove();
					$(that).remove();
					--activebombs;
					var victor = 3 - this.id;
					$('#score' + victor).html((++score[victor]).toFixed(0));
					forceopts('options', 'optform');
				}
			});
			// planet collisions
			all('planet').each( function() {
				if (sqdistanceto($(this), xes[i], yes[i]) < planetrsq[this.id]) {
					// crater 'inverse collisions'
					var incrater = false;
					var p = $(this).position();
					var x = xes[i] - p.left + 50;
					var y = yes[i] - p.top + 50;
					$(this).children().each( function() {
						incrater |= (sqdistanceto($(this), x, y) < 625);
					});
					// process collision
					if (!incrater) {
						if (projectilebomb[that.id]) {
							--activebombs;
							kaboom(that);
							newcrater(this, xes[i], yes[i]);
						}
						$(that).remove();
					}
				}			
			});
		}
		// projectiles have finite lifespan
		if (--projectilelife[i] == 0) {
			if (projectilebomb[i]) {
				--activebombs;
				kaboom(this);
			}
			$(this).remove();
		} else if (!projectilebomb[i]) {
			$(this).css('opacity', projectilelife[i] / explife);
		}
	});
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


// internals
var wmult; var hmult;
var shipn = 0; var turn = 1;
var planetn = 0; var cratern = 0;
var planetberth = 175;
var planetmass = [];
var planetr = []; var planetrsq = [];
var projectilen = 0;
var projectileowners = [];
var projectilebomb = [];
var activebombs = 0;
var xes = []; var yes = [];
var xss = []; var yss = [];
var timerdone = false;
var projectilelife = [];
function init() {
	// init engine
	wmult = $(window).width() - (margin * 2);
	hmult = $(window).height() - (margin * 2);
	$('#ships').css({left: (margin - 25) + 'px', top: (margin - 25) + 'px'});
	$('#planets').css({left: (margin - 75) + 'px', top: (margin - 75) + 'px'});
	$('#projectiles').css({left: (margin - 5) + 'px', top: (margin - 5) + 'px'});
	if (!timerdone) {
		setInterval('tik()', framerate);
		timerdone = true;
		$('#board').click(clik);
		$('#board').mousemove(move);
		$('#intro').click(function() { $('#intro').hide() });
		forceopts('options', 'links');
		//$('#shotinfo').draggable({ containment: 'body', scroll: false });
	}

	// delete last game
	all('ship').remove(); shipn = 0;
	all('planet').remove(); planetn = 0; cratern = 0;
	all('projectile').remove(); projectilen = 0; activebombs = 0;

	// init game
	newship(0, 0.5);
	newship(1, 0.5);
	for (i = 0; i < numplanets; ++i)
		newplanet();
	turn = 0; updateturn();
}

// bits...
function get(clas, id) { return $('#' + clas + 's').children('#' + id); }
function all(clas) { return $('#' + clas + 's').children(); }
function distanceto(element, x, y) { return Math.sqrt(sqdistanceto(element, x, y)); }
function sqdistanceto(element, x, y) { 
	var p = element.position();
	x -= p.left; y -= p.top;
	return x * x + y * y;
}
function updateturn() {
	if (all('ship').length == 0) return;
	var lastturn = turn;
	if (++turn > shipn) turn = 1;
	while (lastturn != turn) {
		if (get('ship', turn).length > 0) break;
		if (++turn > shipn) turn = 1;
	}
	var p = get('ship', turn).position();
	$('#turnindicator').css({left: p.left + margin - 25, top: p.top + margin - 25});
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

// constructors
function newship(x, y) {
	$('#ships').append('<div id="' + ++shipn + '"></div>');
	var ship = get('ship', shipn);
	ship.css({left: x * wmult, top: y * hmult});
	if (x <= 0.5)
		ship.css('background-image', "url('ship1.png')");
	else
		ship.css('background-image', "url('ship2.png')");
}
function newplanet(x, y) {
	var cont = true;
	for (tries = 0; cont; ++tries) {
		x = Math.random() * (wmult - 300) + 150;
		y = Math.random() * hmult;
		cont = false;
		all('planet').each( function() { cont |= (distanceto($(this), x, y) < planetberth); });
		if (tries > 100) return;
	}
	$('#planets').append('<div id="' + ++planetn + '"></div>');
	var planet = get('planet', planetn);
	planet.css({left: x, top: y, backgroundImage: "url('planet" + ((planetn % 5) + 1) + ".png')"});
	planetmass[planetn] = 1;
	planetr[planetn] = 75;
	planetrsq[planetn] = planetr[planetn] * planetr[planetn];
}
function newbomb(owner, xs, ys) {
	projectileowners[++projectilen] = owner;
	xss[projectilen] = xs; yss[projectilen] = ys;
	projectilebomb[projectilen] = true; ++activebombs;
	projectilelife[projectilen] = bomblife * 1000 / framerate;
	$('#projectiles').append('<div id="' + projectilen + '"></div>');
	var pos = get('ship', owner).position();
	xes[projectilen] = pos.left; yes[projectilen] = pos.top;
	var projectile = get('projectile', projectilen);
	projectile.css({left: pos.left, top: pos.top});
	projectile.addClass('bomb');
}
function newcrater(planet, x, y) {
	planet = $(planet);
	planet.append('<div id="' + ++cratern + '"></div>');
	var crater = planet.children('#'+cratern);
	var p = planet.position();
	crater.css({left: x - p.left + 50, top: y - p.top + 50});
}
function kaboom(bomb) {
	var p = $(bomb).position();
	for (i = 0; i < expcount; ++i) {
		projectileowners[++projectilen] = -1;
		var theta = Math.random() * Math.PI * 2;
		var r = Math.random() * expspeed;
		xss[projectilen] = r * Math.sin(theta);
		yss[projectilen] = r * Math.cos(theta);
		projectilebomb[projectilen] = false;
		projectilelife[projectilen] = explife;
		$('#projectiles').append('<div id="' + projectilen + '"></div>');
		xes[projectilen] = p.left; yes[projectilen] = p.top;
		var projectile = get('projectile', projectilen);
		projectile.css({left: p.left, top: p.top});
		projectile.addClass('debris');
	}
}
