'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineSegment = function () {
	function LineSegment(p1, p2) {
		_classCallCheck(this, LineSegment);

		this.p1 = p1;
		this.p2 = p2;
	}

	_createClass(LineSegment, [{
		key: 'asVector',
		value: function asVector() {
			return this.p2.minus(this.p1);
		}
	}, {
		key: 'toString',
		value: function toString() {
			return this.p1.toString() + ' -> ' + this.p2.toString();
		}
	}, {
		key: 'crosses',
		value: function crosses(line) {
			var maxX1 = Math.max(this.p1.x, this.p2.x),
			    minX1 = Math.min(this.p1.x, this.p2.x),
			    maxY1 = Math.max(this.p1.y, this.p2.y),
			    minY1 = Math.min(this.p1.y, this.p2.y),
			    maxX2 = Math.max(line.p1.x, line.p2.x),
			    minX2 = Math.min(line.p1.x, line.p2.x),
			    maxY2 = Math.max(line.p1.y, line.p2.y),
			    minY2 = Math.min(line.p1.y, line.p2.y);
			if (minX2 > maxX1 || minX1 > maxX2 || minY2 > maxY1 || minY1 > maxY2) return false;

			var r1 = this._crossesFullLine(line),
			    r2 = line._crossesFullLine(this);
			if (!r1 || !r2) return false;
			if (r1 == LineSegment.Improper || r2 == LineSegment.Improper) return LineSegment.Improper;
			return LineSegment.Proper;
		}
	}, {
		key: 'contains',
		value: function contains(point) {
			var v = this.asVector(),
			    p = point.minus(this.p1);
			if (p.cross(v) != 0) return false;
			var d = p.dot(v),
			    l2 = v.dot(v);
			if (d < 0 || d > l2) return false;
			return true;
		}
	}, {
		key: 'parametricTOfPoint',
		value: function parametricTOfPoint(point) {
			var v = this.asVector();
			return point.minus(this.p1).dot(v) / v.dot(v);
		}
	}, {
		key: 'atParametricT',
		value: function atParametricT(t) {
			return this.asVector().times(t).plus(this.p1);
		}
	}, {
		key: 'intersectionWithCircle',
		value: function intersectionWithCircle(circle) {
			// from http://mathworld.wolfram.com/Circle-LineIntersection.html
			// intersection of line through (x1,y1) and (x2,y2) and circle radius r at the origin
			// dx = x2-x1; dy = y2-y1;
			// dr = √(dx^2 + dy^2)
			// D = determinant of thing
			//   = x1.y2 - x2.y1
			// =>
			// x = (D.dy ± sign(dy)dx √(r^2.dr^2 - D^2)) / dr^2
			// y = (-D.dx ± |dy| √(r^2.dr^2 - D^2)) / dr^2
			//   = (-D.dx ± sign(dy)dy √(r^2.dr^2 - D^2)) / dr^2

			// in vectors:
			// d = p2 - p1
			// dp = perpendicular of d
			// intersection = (dp.D ± d.sign(dy)).√(r^2.(d.d) - D^2) ) / (d.d)

			var d = this.asVector(),
			    p1 = this.p1.minus(circle.centre),
			    p2 = this.p2.minus(circle.centre),
			    D = p1.x * p2.y - p2.x * p1.y,
			    discriminant = circle.radius * circle.radius * d.dot(d) - D * D;

			// Strictly, there *is* an intersection if D = 0
			// but it is of zero measure so screw it.
			if (discriminant <= 0) return null;

			// Note: I have no idea what "sign(dy)" is doing in there:
			var a = new Vector(d.y, -d.x).times(D),

			// b = d.times(Math.sqrt(discriminant)),
			b = d.times(Math.sign(d.y) * Math.sqrt(discriminant)),
			    c = d.dot(d);

			return new LineSegment(a.minus(b).over(c).plus(circle.centre), a.plus(b).over(c).plus(circle.centre));
		}
	}, {
		key: '_crossesFullLine',
		value: function _crossesFullLine(line) {
			var l1 = line.p1.minus(this.p1),
			    l2 = line.p2.minus(this.p1),
			    a1 = l1.cross(this.asVector()),
			    a2 = l2.cross(this.asVector()),
			    result = a1 * a2;
			if (result < 0) return LineSegment.Proper;
			if (result == 0) return LineSegment.Improper;
			return false;
		}
	}, {
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.p1.x, this.p1.y);
			ctx.lineTo(this.p2.x, this.p2.y);
			ctx.stroke();
		}
	}, {
		key: 'length',
		get: function get() {
			return this.asVector().length;
		}
	}, {
		key: 'start',
		get: function get() {
			return this.p1;
		}
	}, {
		key: 'end',
		get: function get() {
			return this.p2;
		}
	}, {
		key: 'finish',
		get: function get() {
			return this.p2;
		}
	}]);

	return LineSegment;
}();

LineSegment.Proper = Symbol('Proper Intersection');
LineSegment.Improper = Symbol('Improper Intersection');

if (typeof module !== 'undefined') module.exports = LineSegment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3h5L2xpbmUtc2VnbWVudC5qcyJdLCJuYW1lcyI6WyJMaW5lU2VnbWVudCIsInAxIiwicDIiLCJtaW51cyIsInRvU3RyaW5nIiwibGluZSIsIm1heFgxIiwiTWF0aCIsIm1heCIsIngiLCJtaW5YMSIsIm1pbiIsIm1heFkxIiwieSIsIm1pblkxIiwibWF4WDIiLCJtaW5YMiIsIm1heFkyIiwibWluWTIiLCJyMSIsIl9jcm9zc2VzRnVsbExpbmUiLCJyMiIsIkltcHJvcGVyIiwiUHJvcGVyIiwicG9pbnQiLCJ2IiwiYXNWZWN0b3IiLCJwIiwiY3Jvc3MiLCJkIiwiZG90IiwibDIiLCJ0IiwidGltZXMiLCJwbHVzIiwiY2lyY2xlIiwiY2VudHJlIiwiRCIsImRpc2NyaW1pbmFudCIsInJhZGl1cyIsImEiLCJWZWN0b3IiLCJiIiwic2lnbiIsInNxcnQiLCJjIiwib3ZlciIsImwxIiwiYTEiLCJhMiIsInJlc3VsdCIsImN0eCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImxlbmd0aCIsIlN5bWJvbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxXO0FBQ0wsc0JBQVlDLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CO0FBQUE7O0FBQ25CLE9BQUtELEVBQUwsR0FBVUEsRUFBVjtBQUNBLE9BQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBOzs7OzZCQU1VO0FBQ1YsVUFBTyxLQUFLQSxFQUFMLENBQVFDLEtBQVIsQ0FBYyxLQUFLRixFQUFuQixDQUFQO0FBQ0E7Ozs2QkFFVTtBQUNWLFVBQU8sS0FBS0EsRUFBTCxDQUFRRyxRQUFSLEtBQXFCLE1BQXJCLEdBQ04sS0FBS0YsRUFBTCxDQUFRRSxRQUFSLEVBREQ7QUFFQTs7OzBCQU1PQyxJLEVBQU07QUFDYixPQUFNQyxRQUFRQyxLQUFLQyxHQUFMLENBQVMsS0FBS1AsRUFBTCxDQUFRUSxDQUFqQixFQUFvQixLQUFLUCxFQUFMLENBQVFPLENBQTVC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bkIsS0FBSCxDQUFTLEtBQUtGLFFBQUwsRUFBVCxDQUZOO0FBQUEsT0FHQ3VCLEtBQUtsQixHQUFHSCxLQUFILENBQVMsS0FBS0YsUUFBTCxFQUFULENBSE47QUFBQSxPQUlDd0IsU0FBU0YsS0FBS0MsRUFKZjtBQUtBLE9BQUlDLFNBQVMsQ0FBYixFQUNDLE9BQU9sRCxZQUFZdUIsTUFBbkI7QUFDRCxPQUFJMkIsVUFBVSxDQUFkLEVBQ0MsT0FBT2xELFlBQVlzQixRQUFuQjtBQUNELFVBQU8sS0FBUDtBQUNBOzs7dUJBRUk2QixHLEVBQUs7QUFDVEEsT0FBSUMsU0FBSjtBQUNBRCxPQUFJRSxNQUFKLENBQVcsS0FBS3BELEVBQUwsQ0FBUVEsQ0FBbkIsRUFBc0IsS0FBS1IsRUFBTCxDQUFRWSxDQUE5QjtBQUNBc0MsT0FBSUcsTUFBSixDQUFXLEtBQUtwRCxFQUFMLENBQVFPLENBQW5CLEVBQXNCLEtBQUtQLEVBQUwsQ0FBUVcsQ0FBOUI7QUFDQXNDLE9BQUlJLE1BQUo7QUFDQTs7O3NCQXRIWTtBQUNaLFVBQU8sS0FBSzdCLFFBQUwsR0FBZ0I4QixNQUF2QjtBQUNBOzs7c0JBV1c7QUFBRSxVQUFPLEtBQUt2RCxFQUFaO0FBQWlCOzs7c0JBQ3JCO0FBQUUsVUFBTyxLQUFLQyxFQUFaO0FBQWlCOzs7c0JBQ2hCO0FBQUUsVUFBTyxLQUFLQSxFQUFaO0FBQWlCOzs7Ozs7QUEwR2pDRixZQUFZdUIsTUFBWixHQUFxQmtDLE9BQU8scUJBQVAsQ0FBckI7QUFDQXpELFlBQVlzQixRQUFaLEdBQXVCbUMsT0FBTyx1QkFBUCxDQUF2Qjs7QUFFQSxJQUFJLE9BQU9DLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUNBLE9BQU9DLE9BQVAsR0FBaUIzRCxXQUFqQiIsImZpbGUiOiJsaW5lLXNlZ21lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMaW5lU2VnbWVudCB7XG5cdGNvbnN0cnVjdG9yKHAxLCBwMikge1xuXHRcdHRoaXMucDEgPSBwMTtcblx0XHR0aGlzLnAyID0gcDI7XG5cdH1cblxuXHRnZXQgbGVuZ3RoKCkge1xuXHRcdHJldHVybiB0aGlzLmFzVmVjdG9yKCkubGVuZ3RoO1xuXHR9XG5cblx0YXNWZWN0b3IoKSB7XG5cdFx0cmV0dXJuIHRoaXMucDIubWludXModGhpcy5wMSk7XG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5wMS50b1N0cmluZygpICsgJyAtPiAnICtcblx0XHRcdHRoaXMucDIudG9TdHJpbmcoKTtcblx0fVxuXG5cdGdldCBzdGFydCgpIHsgcmV0dXJuIHRoaXMucDE7IH1cblx0Z2V0IGVuZCgpIHsgcmV0dXJuIHRoaXMucDI7IH1cblx0Z2V0IGZpbmlzaCgpIHsgcmV0dXJuIHRoaXMucDI7IH1cblxuXHRjcm9zc2VzKGxpbmUpIHtcblx0XHRjb25zdCBtYXhYMSA9IE1hdGgubWF4KHRoaXMucDEueCwgdGhpcy5wMi54KSxcblx0XHRcdG1pblgxID0gTWF0aC5taW4odGhpcy5wMS54LCB0aGlzLnAyLngpLFxuXHRcdFx0bWF4WTEgPSBNYXRoLm1heCh0aGlzLnAxLnksIHRoaXMucDIueSksXG5cdFx0XHRtaW5ZMSA9IE1hdGgubWluKHRoaXMucDEueSwgdGhpcy5wMi55KSxcblx0XHRcdG1heFgyID0gTWF0aC5tYXgobGluZS5wMS54LCBsaW5lLnAyLngpLFxuXHRcdFx0bWluWDIgPSBNYXRoLm1pbihsaW5lLnAxLngsIGxpbmUucDIueCksXG5cdFx0XHRtYXhZMiA9IE1hdGgubWF4KGxpbmUucDEueSwgbGluZS5wMi55KSxcblx0XHRcdG1pblkyID0gTWF0aC5taW4obGluZS5wMS55LCBsaW5lLnAyLnkpO1xuXHRcdGlmIChtaW5YMiA+IG1heFgxIHx8IG1pblgxID4gbWF4WDIgfHxcblx0XHRcdG1pblkyID4gbWF4WTEgfHwgbWluWTEgPiBtYXhZMilcblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdGNvbnN0IHIxID0gdGhpcy5fY3Jvc3Nlc0Z1bGxMaW5lKGxpbmUpLFxuXHRcdFx0cjIgPSBsaW5lLl9jcm9zc2VzRnVsbExpbmUodGhpcyk7XG5cdFx0aWYgKCFyMSB8fCAhcjIpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0aWYgKHIxID09IExpbmVTZWdtZW50LkltcHJvcGVyIHx8XG5cdFx0XHRyMiA9PSBMaW5lU2VnbWVudC5JbXByb3Blcilcblx0XHRcdHJldHVybiBMaW5lU2VnbWVudC5JbXByb3Blcjtcblx0XHRyZXR1cm4gTGluZVNlZ21lbnQuUHJvcGVyO1xuXHR9XG5cblx0Y29udGFpbnMocG9pbnQpIHtcblx0XHRjb25zdCB2ID0gdGhpcy5hc1ZlY3RvcigpLFxuXHRcdFx0cCA9IHBvaW50Lm1pbnVzKHRoaXMucDEpO1xuXHRcdGlmIChwLmNyb3NzKHYpICE9IDApXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0Y29uc3QgZCA9IHAuZG90KHYpLFxuXHRcdFx0bDIgPSB2LmRvdCh2KTtcblx0XHRpZiAoZCA8IDAgfHwgZCA+IGwyKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0cGFyYW1ldHJpY1RPZlBvaW50KHBvaW50KSB7XG5cdFx0Y29uc3QgdiA9IHRoaXMuYXNWZWN0b3IoKTtcblx0XHRyZXR1cm4gcG9pbnQubWludXModGhpcy5wMSkuZG90KHYpIC8gdi5kb3Qodik7XG5cdH1cblx0YXRQYXJhbWV0cmljVCh0KSB7XG5cdFx0cmV0dXJuIHRoaXMuYXNWZWN0b3IoKS50aW1lcyh0KS5wbHVzKHRoaXMucDEpO1xuXHR9XG5cblx0aW50ZXJzZWN0aW9uV2l0aENpcmNsZShjaXJjbGUpIHtcblx0XHQvLyBmcm9tIGh0dHA6Ly9tYXRod29ybGQud29sZnJhbS5jb20vQ2lyY2xlLUxpbmVJbnRlcnNlY3Rpb24uaHRtbFxuXHRcdC8vIGludGVyc2VjdGlvbiBvZiBsaW5lIHRocm91Z2ggKHgxLHkxKSBhbmQgKHgyLHkyKSBhbmQgY2lyY2xlIHJhZGl1cyByIGF0IHRoZSBvcmlnaW5cblx0XHQvLyBkeCA9IHgyLXgxOyBkeSA9IHkyLXkxO1xuXHRcdC8vIGRyID0g4oiaKGR4XjIgKyBkeV4yKVxuXHRcdC8vIEQgPSBkZXRlcm1pbmFudCBvZiB0aGluZ1xuXHRcdC8vICAgPSB4MS55MiAtIHgyLnkxXG5cdFx0Ly8gPT5cblx0XHQvLyB4ID0gKEQuZHkgwrEgc2lnbihkeSlkeCDiiJoocl4yLmRyXjIgLSBEXjIpKSAvIGRyXjJcblx0XHQvLyB5ID0gKC1ELmR4IMKxIHxkeXwg4oiaKHJeMi5kcl4yIC0gRF4yKSkgLyBkcl4yXG5cdFx0Ly8gICA9ICgtRC5keCDCsSBzaWduKGR5KWR5IOKImihyXjIuZHJeMiAtIEReMikpIC8gZHJeMlxuXG5cdFx0Ly8gaW4gdmVjdG9yczpcblx0XHQvLyBkID0gcDIgLSBwMVxuXHRcdC8vIGRwID0gcGVycGVuZGljdWxhciBvZiBkXG5cdFx0Ly8gaW50ZXJzZWN0aW9uID0gKGRwLkQgwrEgZC5zaWduKGR5KSku4oiaKHJeMi4oZC5kKSAtIEReMikgKSAvIChkLmQpXG5cblx0XHRjb25zdCBkID0gdGhpcy5hc1ZlY3RvcigpLFxuXHRcdFx0cDEgPSB0aGlzLnAxLm1pbnVzKGNpcmNsZS5jZW50cmUpLFxuXHRcdFx0cDIgPSB0aGlzLnAyLm1pbnVzKGNpcmNsZS5jZW50cmUpLFxuXHRcdFx0RCA9IHAxLnggKiBwMi55IC0gcDIueCAqIHAxLnksXG5cdFx0XHRkaXNjcmltaW5hbnQgPSBjaXJjbGUucmFkaXVzICogY2lyY2xlLnJhZGl1cyAqIGQuZG90KGQpIC0gRCAqIEQ7XG5cblx0XHQvLyBTdHJpY3RseSwgdGhlcmUgKmlzKiBhbiBpbnRlcnNlY3Rpb24gaWYgRCA9IDBcblx0XHQvLyBidXQgaXQgaXMgb2YgemVybyBtZWFzdXJlIHNvIHNjcmV3IGl0LlxuXHRcdGlmIChkaXNjcmltaW5hbnQgPD0gMClcblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0Ly8gTm90ZTogSSBoYXZlIG5vIGlkZWEgd2hhdCBcInNpZ24oZHkpXCIgaXMgZG9pbmcgaW4gdGhlcmU6XG5cdFx0Y29uc3QgYSA9IG5ldyBWZWN0b3IoZC55LCAtZC54KS50aW1lcyhEKSxcblx0XHRcdC8vIGIgPSBkLnRpbWVzKE1hdGguc3FydChkaXNjcmltaW5hbnQpKSxcblx0XHRcdGIgPSBkLnRpbWVzKE1hdGguc2lnbihkLnkpICogTWF0aC5zcXJ0KGRpc2NyaW1pbmFudCkpLFxuXHRcdFx0YyA9IGQuZG90KGQpO1xuXG5cdFx0cmV0dXJuIG5ldyBMaW5lU2VnbWVudChcblx0XHRcdGEubWludXMoYikub3ZlcihjKS5wbHVzKGNpcmNsZS5jZW50cmUpLFxuXHRcdFx0YS5wbHVzKGIpLm92ZXIoYykucGx1cyhjaXJjbGUuY2VudHJlKVxuXHRcdCk7XG5cdH1cblxuXHRfY3Jvc3Nlc0Z1bGxMaW5lKGxpbmUpIHtcblx0XHRjb25zdCBsMSA9IGxpbmUucDEubWludXModGhpcy5wMSksXG5cdFx0XHRsMiA9IGxpbmUucDIubWludXModGhpcy5wMSksXG5cdFx0XHRhMSA9IGwxLmNyb3NzKHRoaXMuYXNWZWN0b3IoKSksXG5cdFx0XHRhMiA9IGwyLmNyb3NzKHRoaXMuYXNWZWN0b3IoKSksXG5cdFx0XHRyZXN1bHQgPSBhMSAqIGEyO1xuXHRcdGlmIChyZXN1bHQgPCAwKVxuXHRcdFx0cmV0dXJuIExpbmVTZWdtZW50LlByb3Blcjtcblx0XHRpZiAocmVzdWx0ID09IDApXG5cdFx0XHRyZXR1cm4gTGluZVNlZ21lbnQuSW1wcm9wZXI7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZHJhdyhjdHgpIHtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4Lm1vdmVUbyh0aGlzLnAxLngsIHRoaXMucDEueSk7XG5cdFx0Y3R4LmxpbmVUbyh0aGlzLnAyLngsIHRoaXMucDIueSk7XG5cdFx0Y3R4LnN0cm9rZSgpO1xuXHR9XG59XG5cbkxpbmVTZWdtZW50LlByb3BlciA9IFN5bWJvbCgnUHJvcGVyIEludGVyc2VjdGlvbicpO1xuTGluZVNlZ21lbnQuSW1wcm9wZXIgPSBTeW1ib2woJ0ltcHJvcGVyIEludGVyc2VjdGlvbicpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gTGluZVNlZ21lbnQ7XG4iXX0=