'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Planet = function () {
	function Planet(starSystem, location, radius, mass) {
		_classCallCheck(this, Planet);

		this.starSystem = starSystem;
		this.location = location;
		this.radius = radius;
		this.radiusSquared = radius * radius;
		this.mass = mass;
		this.hue = Math.random() * 360;
		this.craters = [];
	}

	_createClass(Planet, [{
		key: 'draw',
		value: function draw(ctx) {
			ctx.globalCompositeOperation = 'source-over';
			ctx.strokeStyle = 'transparent';
			if (!this.gradient) {
				this.gradient = ctx.createRadialGradient(this.location.x - this.radius * 0.3, this.location.y - this.radius * 0.3, this.radius * 2, this.location.x - this.radius * 0.3, this.location.y - this.radius * 0.3, 0);
				this.gradient.addColorStop(0, 'hsl(' + this.hue + ', 75%, 20%)');
				this.gradient.addColorStop(1, 'hsl(' + this.hue + ', 75%, 75%)');
			}
			ctx.fillStyle = this.gradient;
			this.circle.draw(ctx);
			ctx.globalCompositeOperation = 'destination-out';
			ctx.fillStyle = 'black';
			this.craters.forEach(function (crater) {
				return crater.draw(ctx);
			});
			ctx.globalCompositeOperation = 'source-atop';
			ctx.fillStyle = 'transparent';
			ctx.strokeStyle = '#840';
			ctx.lineWidth = 8;
			this.craters.forEach(function (crater) {
				return crater.draw(ctx);
			});
			ctx.globalCompositeOperation = 'source-over';
		}
	}, {
		key: 'drawBack',
		value: function drawBack(ctx) {
			ctx.strokeStyle = 'transparent';
			ctx.fillStyle = 'hsl(' + this.hue + ', 75%, 15%)';
			this.circle.draw(ctx);
		}
	}, {
		key: 'addCrater',
		value: function addCrater(location, radius) {
			this.craters.push(new Circle(location, radius));
			this.starSystem.forceRedraw();
		}
	}, {
		key: 'collision',
		value: function collision(lineSegment, missileRadius) {
			var main = lineSegment.intersectionWithCircle(new Circle(this.location, this.radius + missileRadius));
			if (!main) return null;

			var start = lineSegment.parametricTOfPoint(main.start),
			    end = lineSegment.parametricTOfPoint(main.end);
			if (start > end) {
				;
				var _ref = [end, start];
				start = _ref[0];
				end = _ref[1];
			}if (end < 0 || start > 1) return null;
			if (end > 1) end = 1;
			if (start < 0) start = 0;

			var nonCrater = new OneDimensionalSet();
			nonCrater.add(start, end);
			this.craters.forEach(function (crater) {
				var craterIntersection = lineSegment.intersectionWithCircle(new Circle(crater.centre, crater.radius - missileRadius));
				if (craterIntersection) {
					var _start = lineSegment.parametricTOfPoint(craterIntersection.start),
					    _end = lineSegment.parametricTOfPoint(craterIntersection.end);
					nonCrater.remove(_start, _end);
				}
			});

			var el = nonCrater.firstElement();
			return el == null ? null : new Collision(el, lineSegment.atParametricT(el), this);
		}
	}, {
		key: 'gravityAt',
		value: function gravityAt(point) {
			var densityPower = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

			var R = this.location.minus(point),
			    r2 = R.dot(R);

			// In scalar terms: F = GMm /  r ^2
			// As acceleration: a = GM  /  r ^2
			// In vector terms: a = GMr / |r|^3
			// Defining G = 1:  a =  Mr / |r|^3
			if (r2 >= this.radiusSquared) return R.times(this.mass / Math.pow(r2, 3 / 2));

			// Inside the sphere, we can ignore all the mass "above" the point.
			// so if R is the radius of the planet,
			// g = Mr / R^2|r|
			// and since mass is proportional to radius cubed,
			// a = g * (|r|/R)^3
			//   = (Mr * |r|^3) / (R^5 * |r|)
			//   = (Mr * |r|^2) / R^5
			return R.times(this.mass * Math.pow(r2, (densityPower - 1) / 2) / Math.pow(this.radius, densityPower + 2));
		}
	}, {
		key: 'circle',
		get: function get() {
			return new Circle(this.location, this.radius);
		}
	}]);

	return Planet;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3BsYW5ldC5qcyJdLCJuYW1lcyI6WyJQbGFuZXQiLCJzdGFyU3lzdGVtIiwibG9jYXRpb24iLCJyYWRpdXMiLCJtYXNzIiwicmFkaXVzU3F1YXJlZCIsImh1ZSIsIk1hdGgiLCJyYW5kb20iLCJjcmF0ZXJzIiwiY3R4IiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwic3Ryb2tlU3R5bGUiLCJncmFkaWVudCIsImNyZWF0ZVJhZGlhbEdyYWRpZW50IiwieCIsInkiLCJhZGRDb2xvclN0b3AiLCJmaWxsU3R5bGUiLCJjaXJjbGUiLCJkcmF3IiwiZm9yRWFjaCIsImNyYXRlciIsImxpbmVXaWR0aCIsInB1c2giLCJDaXJjbGUiLCJmb3JjZVJlZHJhdyIsImxpbmVTZWdtZW50IiwibWlzc2lsZVJhZGl1cyIsIm1haW4iLCJpbnRlcnNlY3Rpb25XaXRoQ2lyY2xlIiwic3RhcnQiLCJwYXJhbWV0cmljVE9mUG9pbnQiLCJlbmQiLCJub25DcmF0ZXIiLCJPbmVEaW1lbnNpb25hbFNldCIsImFkZCIsImNyYXRlckludGVyc2VjdGlvbiIsImNlbnRyZSIsInJlbW92ZSIsImVsIiwiZmlyc3RFbGVtZW50IiwiQ29sbGlzaW9uIiwiYXRQYXJhbWV0cmljVCIsInBvaW50IiwiZGVuc2l0eVBvd2VyIiwiUiIsIm1pbnVzIiwicjIiLCJkb3QiLCJ0aW1lcyIsInBvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLE07QUFDTCxpQkFBWUMsVUFBWixFQUF3QkMsUUFBeEIsRUFBa0NDLE1BQWxDLEVBQTBDQyxJQUExQyxFQUFnRDtBQUFBOztBQUMvQyxPQUFLSCxVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsT0FBS0UsYUFBTCxHQUFxQkYsU0FBU0EsTUFBOUI7QUFDQSxPQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxPQUFLRSxHQUFMLEdBQVdDLEtBQUtDLE1BQUwsS0FB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QyxJQUFMLEdBQVlHLEtBQUs0QyxHQUFMLENBQVNILEVBQVQsRUFBYSxDQUFDSCxlQUFlLENBQWhCLElBQXFCLENBQWxDLENBQVosR0FDZHRDLEtBQUs0QyxHQUFMLENBQVMsS0FBS2hELE1BQWQsRUFBc0IwQyxlQUFlLENBQXJDLENBRE0sQ0FBUDtBQUVBOzs7c0JBM0RZO0FBQ1osVUFBTyxJQUFJcEIsTUFBSixDQUFXLEtBQUt2QixRQUFoQixFQUEwQixLQUFLQyxNQUEvQixDQUFQO0FBQ0EiLCJmaWxlIjoicGxhbmV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGxhbmV0IHtcblx0Y29uc3RydWN0b3Ioc3RhclN5c3RlbSwgbG9jYXRpb24sIHJhZGl1cywgbWFzcykge1xuXHRcdHRoaXMuc3RhclN5c3RlbSA9IHN0YXJTeXN0ZW07XG5cdFx0dGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuXHRcdHRoaXMucmFkaXVzID0gcmFkaXVzO1xuXHRcdHRoaXMucmFkaXVzU3F1YXJlZCA9IHJhZGl1cyAqIHJhZGl1cztcblx0XHR0aGlzLm1hc3MgPSBtYXNzO1xuXHRcdHRoaXMuaHVlID0gTWF0aC5yYW5kb20oKSAqIDM2MDtcblx0XHR0aGlzLmNyYXRlcnMgPSBbXTtcblx0fVxuXG5cdGRyYXcoY3R4KSB7XG5cdFx0Y3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gJ3RyYW5zcGFyZW50Jztcblx0XHRpZiAoIXRoaXMuZ3JhZGllbnQpIHtcblx0XHRcdHRoaXMuZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoXG5cdFx0XHRcdHRoaXMubG9jYXRpb24ueCAtIHRoaXMucmFkaXVzICogMC4zLFxuXHRcdFx0XHR0aGlzLmxvY2F0aW9uLnkgLSB0aGlzLnJhZGl1cyAqIDAuMyxcblx0XHRcdFx0dGhpcy5yYWRpdXMgKiAyLFxuXHRcdFx0XHR0aGlzLmxvY2F0aW9uLnggLSB0aGlzLnJhZGl1cyAqIDAuMyxcblx0XHRcdFx0dGhpcy5sb2NhdGlvbi55IC0gdGhpcy5yYWRpdXMgKiAwLjMsXG5cdFx0XHRcdDApO1xuXHRcdFx0dGhpcy5ncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgYGhzbCgke3RoaXMuaHVlfSwgNzUlLCAyMCUpYCk7XG5cdFx0XHR0aGlzLmdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBgaHNsKCR7dGhpcy5odWV9LCA3NSUsIDc1JSlgKTtcblx0XHR9XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMuZ3JhZGllbnQ7XG5cdFx0dGhpcy5jaXJjbGUuZHJhdyhjdHgpO1xuXHRcdGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0Jztcblx0XHRjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcblx0XHR0aGlzLmNyYXRlcnMuZm9yRWFjaChjcmF0ZXIgPT4gY3JhdGVyLmRyYXcoY3R4KSk7XG5cdFx0Y3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2UtYXRvcCc7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9ICd0cmFuc3BhcmVudCc7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gJyM4NDAnO1xuXHRcdGN0eC5saW5lV2lkdGggPSA4O1xuXHRcdHRoaXMuY3JhdGVycy5mb3JFYWNoKGNyYXRlciA9PiBjcmF0ZXIuZHJhdyhjdHgpKTtcblx0XHRjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcblx0fVxuXG5cdGRyYXdCYWNrKGN0eCkge1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9ICd0cmFuc3BhcmVudCc7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGBoc2woJHt0aGlzLmh1ZX0sIDc1JSwgMTUlKWA7XG5cdFx0dGhpcy5jaXJjbGUuZHJhdyhjdHgpO1xuXHR9XG5cblx0YWRkQ3JhdGVyKGxvY2F0aW9uLCByYWRpdXMpIHtcblx0XHR0aGlzLmNyYXRlcnMucHVzaChuZXcgQ2lyY2xlKGxvY2F0aW9uLCByYWRpdXMpKTtcblx0XHR0aGlzLnN0YXJTeXN0ZW0uZm9yY2VSZWRyYXcoKTtcblx0fVxuXG5cdGdldCBjaXJjbGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBDaXJjbGUodGhpcy5sb2NhdGlvbiwgdGhpcy5yYWRpdXMpO1xuXHR9XG5cblx0Y29sbGlzaW9uKGxpbmVTZWdtZW50LCBtaXNzaWxlUmFkaXVzKSB7XG5cdFx0Y29uc3QgbWFpbiA9IGxpbmVTZWdtZW50LmludGVyc2VjdGlvbldpdGhDaXJjbGUoXG5cdFx0XHRuZXcgQ2lyY2xlKHRoaXMubG9jYXRpb24sIHRoaXMucmFkaXVzICsgbWlzc2lsZVJhZGl1cykpO1xuXHRcdGlmICghbWFpbilcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0bGV0IHN0YXJ0ID0gbGluZVNlZ21lbnQucGFyYW1ldHJpY1RPZlBvaW50KG1haW4uc3RhcnQpLFxuXHRcdFx0ZW5kID0gbGluZVNlZ21lbnQucGFyYW1ldHJpY1RPZlBvaW50KG1haW4uZW5kKTtcblx0XHRpZiAoc3RhcnQgPiBlbmQpXG5cdFx0XHRbIHN0YXJ0LCBlbmQgXSA9IFsgZW5kLCBzdGFydCBdO1xuXHRcdGlmIChlbmQgPCAwIHx8IHN0YXJ0ID4gMSlcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdGlmIChlbmQgPiAxKSBlbmQgPSAxO1xuXHRcdGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMDtcblxuXHRcdGNvbnN0IG5vbkNyYXRlciA9IG5ldyBPbmVEaW1lbnNpb25hbFNldCgpO1xuXHRcdG5vbkNyYXRlci5hZGQoc3RhcnQsIGVuZCk7XG5cdFx0dGhpcy5jcmF0ZXJzLmZvckVhY2goY3JhdGVyID0+IHtcblx0XHRcdGNvbnN0IGNyYXRlckludGVyc2VjdGlvbiA9IGxpbmVTZWdtZW50LmludGVyc2VjdGlvbldpdGhDaXJjbGUoXG5cdFx0XHRcdFx0bmV3IENpcmNsZShjcmF0ZXIuY2VudHJlLCBjcmF0ZXIucmFkaXVzIC0gbWlzc2lsZVJhZGl1cykpO1xuXHRcdFx0aWYgKGNyYXRlckludGVyc2VjdGlvbikge1xuXHRcdFx0XHRjb25zdCBzdGFydCA9IGxpbmVTZWdtZW50LnBhcmFtZXRyaWNUT2ZQb2ludChjcmF0ZXJJbnRlcnNlY3Rpb24uc3RhcnQpLFxuXHRcdFx0XHRcdGVuZCA9IGxpbmVTZWdtZW50LnBhcmFtZXRyaWNUT2ZQb2ludChjcmF0ZXJJbnRlcnNlY3Rpb24uZW5kKTtcblx0XHRcdFx0bm9uQ3JhdGVyLnJlbW92ZShzdGFydCwgZW5kKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvbnN0IGVsID0gbm9uQ3JhdGVyLmZpcnN0RWxlbWVudCgpO1xuXHRcdHJldHVybiBlbCA9PSBudWxsXG5cdFx0XHQ/IG51bGxcblx0XHRcdDogbmV3IENvbGxpc2lvbihlbCxcblx0XHRcdFx0bGluZVNlZ21lbnQuYXRQYXJhbWV0cmljVChlbCksXG5cdFx0XHRcdHRoaXMpO1xuXHR9XG5cblx0Z3Jhdml0eUF0KHBvaW50LCBkZW5zaXR5UG93ZXIgPSAzKSB7XG5cdFx0Y29uc3QgUiA9IHRoaXMubG9jYXRpb24ubWludXMocG9pbnQpLFxuXHRcdFx0cjIgPSBSLmRvdChSKTtcblxuXHRcdC8vIEluIHNjYWxhciB0ZXJtczogRiA9IEdNbSAvICByIF4yXG5cdFx0Ly8gQXMgYWNjZWxlcmF0aW9uOiBhID0gR00gIC8gIHIgXjJcblx0XHQvLyBJbiB2ZWN0b3IgdGVybXM6IGEgPSBHTXIgLyB8cnxeM1xuXHRcdC8vIERlZmluaW5nIEcgPSAxOiAgYSA9ICBNciAvIHxyfF4zXG5cdFx0aWYgKHIyID49IHRoaXMucmFkaXVzU3F1YXJlZClcblx0XHRcdHJldHVybiBSLnRpbWVzKHRoaXMubWFzcyAvIE1hdGgucG93KHIyLCAzLzIpKTtcblxuXHRcdC8vIEluc2lkZSB0aGUgc3BoZXJlLCB3ZSBjYW4gaWdub3JlIGFsbCB0aGUgbWFzcyBcImFib3ZlXCIgdGhlIHBvaW50LlxuXHRcdC8vIHNvIGlmIFIgaXMgdGhlIHJhZGl1cyBvZiB0aGUgcGxhbmV0LFxuXHRcdC8vIGcgPSBNciAvIFJeMnxyfFxuXHRcdC8vIGFuZCBzaW5jZSBtYXNzIGlzIHByb3BvcnRpb25hbCB0byByYWRpdXMgY3ViZWQsXG5cdFx0Ly8gYSA9IGcgKiAofHJ8L1IpXjNcblx0XHQvLyAgID0gKE1yICogfHJ8XjMpIC8gKFJeNSAqIHxyfClcblx0XHQvLyAgID0gKE1yICogfHJ8XjIpIC8gUl41XG5cdFx0cmV0dXJuIFIudGltZXModGhpcy5tYXNzICogTWF0aC5wb3cocjIsIChkZW5zaXR5UG93ZXIgLSAxKSAvIDIpIC9cblx0XHRcdE1hdGgucG93KHRoaXMucmFkaXVzLCBkZW5zaXR5UG93ZXIgKyAyKSk7XG5cdH1cbn1cbiJdfQ==