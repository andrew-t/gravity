'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StarSystem = function () {
	function StarSystem(universe) {
		var planetCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

		_classCallCheck(this, StarSystem);

		this.universe = universe;

		var planetMarginSide = 200,
		    planetMarginTop = 50,
		    planetMargin = 80,
		    minPlanetRadius = 50,
		    maxPlanetRadius = 150,
		    density = 2000,
		    planetRadiusVariation = maxPlanetRadius - minPlanetRadius,
		    planetAreaWidth = universe.width - planetMarginSide * 2,
		    planetAreaHeight = universe.height - planetMarginTop * 2;

		this.densityPower = 2;
		// mass = density * radius ^ densityPower
		// should be 3 in reality, or 2 in ideal 2D world
		// leaving as option because who the hell knows

		systemSearch: for (var systemAttempt = 0; systemAttempt < 100; ++systemAttempt) {
			this.planets = [];
			createPlanets: while (this.planets.length < planetCount) {
				nextPlanetSearch: for (var planetAttempt = 0; planetAttempt < 100; ++planetAttempt) {
					var r = Math.random() * planetRadiusVariation + minPlanetRadius,
					    candidate = new Planet(this, new Vector(Math.random() * (planetAreaWidth - 2 * r) + r + planetMarginSide, Math.random() * (planetAreaHeight - 2 * r) + r + planetMarginTop), r, density * Math.pow(r, this.densityPower));
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this.planets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var planet = _step.value;

							if (planet.location.distanceTo(candidate.location) < planet.radius + candidate.radius + planetMargin) {
								// console.log('Candidate planet does not fit');
								continue nextPlanetSearch;
							}
						} // console.log('Placing a planet');
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					this.planets.push(candidate);
					continue createPlanets;
				}
				console.log('Failed to place enough planets');
				continue systemSearch;
			}
			console.log('Done building star system');
			break systemSearch;
		}
		console.log(this.planets);
		this.forceRedraw();
	}

	_createClass(StarSystem, [{
		key: 'forceRedraw',
		value: function forceRedraw() {
			this.image = null;
		}
	}, {
		key: 'draw',
		value: function draw(ctx) {
			if (this.image) ctx.putImageData(this.image, 0, 0);else {
				this.planets.forEach(function (planet) {
					return planet.draw(ctx);
				});
				// this.image = ctx.getImageData(0, 0, this.universe.width, this.universe.height);
			}
		}
	}, {
		key: 'drawBacks',
		value: function drawBacks(ctx) {
			this.planets.forEach(function (planet) {
				return planet.drawBack(ctx);
			});
		}
	}, {
		key: 'collision',
		value: function collision(lineSegment, radius) {
			var collision = null;
			this.planets.forEach(function (planet) {
				var planetCollision = planet.collision(lineSegment, radius);
				if (planetCollision && (!collision || planetCollision.happensBefore(collision))) collision = planetCollision;
			});
			return collision;
		}
	}, {
		key: 'gravityAt',
		value: function gravityAt(point) {
			var _this = this;

			return this.planets.reduce(function (soFar, planet) {
				return soFar.plus(planet.gravityAt(point, _this.densityPower));
			}, Vector.zero);
		}
	}]);

	return StarSystem;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N0YXItc3lzdGVtLmpzIl0sIm5hbWVzIjpbIlN0YXJTeXN0ZW0iLCJ1bml2ZXJzZSIsInBsYW5ldENvdW50IiwicGxhbmV0TWFyZ2luU2lkZSIsInBsYW5ldE1hcmdpblRvcCIsInBsYW5ldE1hcmdpbiIsIm1pblBsYW5ldFJhZGl1cyIsIm1heFBsYW5ldFJhZGl1cyIsImRlbnNpdHkiLCJwbGFuZXRSYWRpdXNWYXJpYXRpb24iLCJwbGFuZXRBcmVhV2lkdGgiLCJ3aWR0aCIsInBsYW5ldEFyZWFIZWlnaHQiLCJoZWlnaHQiLCJkZW5zaXR5UG93ZXIiLCJzeXN0ZW1TZWFyY2giLCJzeXN0ZW1BdHRlbXB0IiwicGxhbmV0cyIsImNyZWF0ZVBsYW5ldHMiLCJsZW5ndGgiLCJuZXh0UGxhbmV0U2VhcmNoIiwicGxhbmV0QXR0ZW1wdCIsInIiLCJNYXRoIiwicmFuZG9tIiwiY2FuZGlkYXRlIiwiUGxhbmV0IiwiVmVjdG9yIiwicG93IiwicGxhbmV0IiwibG9jYXRpb24iLCJkaXN0YW5jZVRvIiwicmFkaXVzIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJmb3JjZVJlZHJhdyIsImltYWdlIiwiY3R4IiwicHV0SW1hZ2VEYXRhIiwiZm9yRWFjaCIsImRyYXciLCJkcmF3QmFjayIsImxpbmVTZWdtZW50IiwiY29sbGlzaW9uIiwicGxhbmV0Q29sbGlzaW9uIiwiaGFwcGVuc0JlZm9yZSIsInBvaW50IiwicmVkdWNlIiwic29GYXIiLCJwbHVzIiwiZ3Jhdml0eUF0IiwiemVybyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLFU7QUFDTCxxQkFBWUMsUUFBWixFQUF1QztBQUFBLE1BQWpCQyxXQUFpQix1RUFBSCxDQUFHOztBQUFBOztBQUN0QyxPQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQSxNQUFNRSxtQkFBbUIsR0FBekI7QUFBQSxNQUNDQyxrQkFBa0IsRUFEbkI7QUFBQSxNQUVDQyxlQUFlLEVBRmhCO0FBQUEsTUFHQ0Msa0JBQWtCLEVBSG5CO0FB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LE1BQTlCLENBQXhCO0FBQ0EsUUFBSWEsb0JBQ0YsQ0FBQ0QsU0FBRCxJQUFjQyxnQkFBZ0JDLGFBQWhCLENBQThCRixTQUE5QixDQURaLENBQUosRUFFQ0EsWUFBWUMsZUFBWjtBQUNELElBTEQ7QUFNQSxVQUFPRCxTQUFQO0FBQ0E7Ozs0QkFFU0csSyxFQUFPO0FBQUE7O0FBQ2hCLFVBQU8sS0FBSzlCLE9BQUwsQ0FBYStCLE1BQWIsQ0FDTixVQUFDQyxLQUFELEVBQVFwQixNQUFSO0FBQUEsV0FBbUJvQixNQUFNQyxJQUFOLENBQVdyQixPQUFPc0IsU0FBUCxDQUFpQkosS0FBakIsRUFBd0IsTUFBS2pDLFlBQTdCLENBQVgsQ0FBbkI7QUFBQSxJQURNLEVBRU5hLE9BQU95QixJQUZELENBQVA7QUFHQSIsImZpbGUiOiJzdGFyLXN5c3RlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN0YXJTeXN0ZW0ge1xuXHRjb25zdHJ1Y3Rvcih1bml2ZXJzZSwgcGxhbmV0Q291bnQgPSA1KSB7XG5cdFx0dGhpcy51bml2ZXJzZSA9IHVuaXZlcnNlO1xuXG5cdFx0Y29uc3QgcGxhbmV0TWFyZ2luU2lkZSA9IDIwMCxcblx0XHRcdHBsYW5ldE1hcmdpblRvcCA9IDUwLFxuXHRcdFx0cGxhbmV0TWFyZ2luID0gODAsXG5cdFx0XHRtaW5QbGFuZXRSYWRpdXMgPSA1MCxcblx0XHRcdG1heFBsYW5ldFJhZGl1cyA9IDE1MCxcblx0XHRcdGRlbnNpdHkgPSAyMDAwLFxuXHRcdFx0cGxhbmV0UmFkaXVzVmFyaWF0aW9uID0gbWF4UGxhbmV0UmFkaXVzIC0gbWluUGxhbmV0UmFkaXVzLFxuXHRcdFx0cGxhbmV0QXJlYVdpZHRoID0gdW5pdmVyc2Uud2lkdGggLSBwbGFuZXRNYXJnaW5TaWRlICogMixcblx0XHRcdHBsYW5ldEFyZWFIZWlnaHQgPSB1bml2ZXJzZS5oZWlnaHQgLSBwbGFuZXRNYXJnaW5Ub3AgKiAyO1xuXG5cdFx0dGhpcy5kZW5zaXR5UG93ZXIgPSAyO1xuXHRcdC8vIG1hc3MgPSBkZW5zaXR5ICogcmFkaXVzIF4gZGVuc2l0eVBvd2VyXG5cdFx0Ly8gc2hvdWxkIGJlIDMgaW4gcmVhbGl0eSwgb3IgMiBpbiBpZGVhbCAyRCB3b3JsZFxuXHRcdC8vIGxlYXZpbmcgYXMgb3B0aW9uIGJlY2F1c2Ugd2hvIHRoZSBoZWxsIGtub3dzXG5cblx0XHRzeXN0ZW1TZWFyY2g6XG5cdFx0Zm9yIChsZXQgc3lzdGVtQXR0ZW1wdCA9IDA7IHN5c3RlbUF0dGVtcHQgPCAxMDA7ICsrc3lzdGVtQXR0ZW1wdCkge1xuXHRcdFx0dGhpcy5wbGFuZXRzID0gW107XG5cdFx0XHRjcmVhdGVQbGFuZXRzOlxuXHRcdFx0d2hpbGUgKHRoaXMucGxhbmV0cy5sZW5ndGggPCBwbGFuZXRDb3VudCkge1xuXHRcdFx0XHRuZXh0UGxhbmV0U2VhcmNoOlxuXHRcdFx0XHRmb3IgKGxldCBwbGFuZXRBdHRlbXB0ID0gMDsgcGxhbmV0QXR0ZW1wdCA8IDEwMDsgKytwbGFuZXRBdHRlbXB0KSB7XG5cdFx0XHRcdFx0Y29uc3QgciA9IE1hdGgucmFuZG9tKCkgKiBwbGFuZXRSYWRpdXNWYXJpYXRpb24gKyBtaW5QbGFuZXRSYWRpdXMsXG5cdFx0XHRcdFx0XHRjYW5kaWRhdGUgPSBuZXcgUGxhbmV0KHRoaXMsXG5cdFx0XHRcdFx0XHRcdG5ldyBWZWN0b3IoXG5cdFx0XHRcdFx0XHRcdFx0TWF0aC5yYW5kb20oKSAqIChwbGFuZXRBcmVhV2lkdGggLSAyICogcikgK1xuXHRcdFx0XHRcdFx0XHRcdFx0ciArIHBsYW5ldE1hcmdpblNpZGUsXG5cdFx0XHRcdFx0XHRcdFx0TWF0aC5yYW5kb20oKSAqIChwbGFuZXRBcmVhSGVpZ2h0IC0gMiAqIHIpICtcblx0XHRcdFx0XHRcdFx0XHRcdHIgKyBwbGFuZXRNYXJnaW5Ub3ApLFxuXHRcdFx0XHRcdFx0XHRcdHIsXG5cdFx0XHRcdFx0XHRcdGRlbnNpdHkgKiBNYXRoLnBvdyhyLCB0aGlzLmRlbnNpdHlQb3dlcikpO1xuXHRcdFx0XHRcdGZvciAobGV0IHBsYW5ldCBvZiB0aGlzLnBsYW5ldHMpXG5cdFx0XHRcdFx0XHRpZiAocGxhbmV0LmxvY2F0aW9uLmRpc3RhbmNlVG8oY2FuZGlkYXRlLmxvY2F0aW9uKSA8XG5cdFx0XHRcdFx0XHRcdFx0cGxhbmV0LnJhZGl1cyArIGNhbmRpZGF0ZS5yYWRpdXMgKyBwbGFuZXRNYXJnaW4pIHtcblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ0NhbmRpZGF0ZSBwbGFuZXQgZG9lcyBub3QgZml0Jyk7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlIG5leHRQbGFuZXRTZWFyY2g7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ1BsYWNpbmcgYSBwbGFuZXQnKTtcblx0XHRcdFx0XHR0aGlzLnBsYW5ldHMucHVzaChjYW5kaWRhdGUpO1xuXHRcdFx0XHRcdGNvbnRpbnVlIGNyZWF0ZVBsYW5ldHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBlbm91Z2ggcGxhbmV0cycpO1xuXHRcdFx0XHRjb250aW51ZSBzeXN0ZW1TZWFyY2g7XG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZygnRG9uZSBidWlsZGluZyBzdGFyIHN5c3RlbScpO1xuXHRcdFx0YnJlYWsgc3lzdGVtU2VhcmNoO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyh0aGlzLnBsYW5ldHMpO1xuXHRcdHRoaXMuZm9yY2VSZWRyYXcoKTtcblx0fVxuXG5cdGZvcmNlUmVkcmF3KCkge1xuXHRcdHRoaXMuaW1hZ2UgPSBudWxsO1xuXHR9XG5cblx0ZHJhdyhjdHgpIHtcblx0XHRpZiAodGhpcy5pbWFnZSlcblx0XHRcdGN0eC5wdXRJbWFnZURhdGEodGhpcy5pbWFnZSwgMCwgMCk7XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnBsYW5ldHMuZm9yRWFjaChwbGFuZXQgPT4gcGxhbmV0LmRyYXcoY3R4KSk7XG5cdFx0XHQvLyB0aGlzLmltYWdlID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLnVuaXZlcnNlLndpZHRoLCB0aGlzLnVuaXZlcnNlLmhlaWdodCk7XG5cdFx0fVxuXHR9XG5cdGRyYXdCYWNrcyhjdHgpIHtcblx0XHR0aGlzLnBsYW5ldHMuZm9yRWFjaChwbGFuZXQgPT4gcGxhbmV0LmRyYXdCYWNrKGN0eCkpO1xuXHR9XG5cblx0Y29sbGlzaW9uKGxpbmVTZWdtZW50LCByYWRpdXMpIHtcblx0XHRsZXQgY29sbGlzaW9uID0gbnVsbDtcblx0XHR0aGlzLnBsYW5ldHMuZm9yRWFjaChwbGFuZXQgPT4ge1xuXHRcdFx0Y29uc3QgcGxhbmV0Q29sbGlzaW9uID0gcGxhbmV0LmNvbGxpc2lvbihsaW5lU2VnbWVudCwgcmFkaXVzKTtcblx0XHRcdGlmIChwbGFuZXRDb2xsaXNpb24gJiZcblx0XHRcdFx0KCFjb2xsaXNpb24gfHwgcGxhbmV0Q29sbGlzaW9uLmhhcHBlbnNCZWZvcmUoY29sbGlzaW9uKSkpXG5cdFx0XHRcdGNvbGxpc2lvbiA9IHBsYW5ldENvbGxpc2lvbjtcblx0XHR9KTtcblx0XHRyZXR1cm4gY29sbGlzaW9uO1xuXHR9XG5cblx0Z3Jhdml0eUF0KHBvaW50KSB7XG5cdFx0cmV0dXJuIHRoaXMucGxhbmV0cy5yZWR1Y2UoXG5cdFx0XHQoc29GYXIsIHBsYW5ldCkgPT4gc29GYXIucGx1cyhwbGFuZXQuZ3Jhdml0eUF0KHBvaW50LCB0aGlzLmRlbnNpdHlQb3dlcikpLFxuXHRcdFx0VmVjdG9yLnplcm8pO1xuXHR9XG59XG4iXX0=