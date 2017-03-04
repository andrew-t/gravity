'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof require !== 'undefined') setTimeout(function () {
	return Direction = require('./direction');
});

var Vector = function () {
	function Vector(x, y) {
		_classCallCheck(this, Vector);

		this.x = x;
		this.y = y;
	}

	_createClass(Vector, [{
		key: 'plus',
		value: function plus(v) {
			return new Vector(this.x + v.x, this.y + v.y);
		}
	}, {
		key: 'minus',
		value: function minus(v) {
			return new Vector(this.x - v.x, this.y - v.y);
		}
	}, {
		key: 'distanceTo',
		value: function distanceTo(v) {
			return this.minus(v).length;
		}
	}, {
		key: 'dot',
		value: function dot(v) {
			return this.x * v.x + this.y * v.y;
		}
	}, {
		key: 'cross',
		value: function cross(v) {
			return this.x * v.y - this.y * v.x;
		}
	}, {
		key: 'equals',
		value: function equals(v) {
			return this.x == v.x && this.y == v.y;
		}
	}, {
		key: 'normalise',
		value: function normalise() {
			if (this.length == 0) {
				console.warn('Normalised a zero vector.');
				return this;
			}
			return this.over(this.length);
		}
	}, {
		key: 'perpendicular',
		value: function perpendicular() {
			return new Vector(this.y, -this.x);
		}
	}, {
		key: 'over',
		value: function over(s) {
			return new Vector(this.x / s, this.y / s);
		}
	}, {
		key: 'times',
		value: function times(s) {
			return new Vector(this.x * s, this.y * s);
		}
	}, {
		key: 'changeOfBasis',
		value: function changeOfBasis(x, y, origin) {
			var c = origin ? this.minus(origin) : this;
			// TODO - is this right??
			return new Vector(c.dot(x) / x.dot(x), c.dot(y) / y.dot(y));
		}
	}, {
		key: 'toString',
		value: function toString() {
			return '(' + round(this.x) + ', ' + round(this.y) + ')';
			function round(n) {
				return Math.round(n * 100) / 100;
			}
		}
	}, {
		key: 'angle',
		get: function get() {
			return Math.atan2(this.y, this.x);
		}
	}, {
		key: 'direction',
		get: function get() {
			return new Direction(this.angle);
		}
	}, {
		key: 'length',
		get: function get() {
			return Math.sqrt(this.dot(this));
		}
	}], [{
		key: 'fromAngle',
		value: function fromAngle(theta) {
			return new Vector(Math.cos(theta), Math.sin(theta));
		}
	}, {
		key: 'canvasMouseVector',
		value: function canvasMouseVector(canvas, e) {
			var rect = canvas.getBoundingClientRect();
			return new Vector((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width, (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
		}
	}]);

	return Vector;
}();

Vector.zero = new Vector(0, 0);

if (typeof module !== 'undefined') module.exports = Vector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3h5L3ZlY3Rvci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwic2V0VGltZW91dCIsIkRpcmVjdGlvbiIsIlZlY3RvciIsIngiLCJ5IiwidiIsIm1pbnVzIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJvdmVyIiwicyIsIm9yaWdpbiIsImMiLCJkb3QiLCJyb3VuZCIsIm4iLCJNYXRoIiwiYXRhbjIiLCJhbmdsZSIsInNxcnQiLCJ0aGV0YSIsImNvcyIsInNpbiIsImNhbnZhcyIsImUiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImxlZnQiLCJyaWdodCIsIndpZHRoIiwiY2xpZW50WSIsInRvcCIsImJvdHRvbSIsImhlaWdodCIsInplcm8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFJLE9BQU9BLE9BQVAsS0FBbUIsV0FBdkIsRUFDQ0MsV0FBVztBQUFBLFFBQ1ZDLFlBQVlGLFFBQVEsYUFBUixDQURGO0FBQUEsQ0FBWDs7SUFHS0csTTtBQUNMLGlCQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFDakIsT0FBS0QsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0E7Ozs7dUJBY0lDLEMsRUFBRztBQUNQLFVBQU8sSUFBSUgsTUFBSixDQUFXLEtBQUtDLENBQUwsR0FBU0UsRUFBRUYsQ0FBdEIsRUFBeUIsS0FBS0MsQ0FBTCxHQUFTQyxFQUFFRCxDQUFwQyxDQUFQO0FBQ0E7Ozt3QkFFS0MsQyxFQUFHO0FBQ1IsVUFBTyxJQUFJSCxNQUFKLENBQVcsS0FBS0MsQ0FBTCxHQUFTRSxFQUFFRixDQUF0QixFQUF5QixLQUFLQyxDQUFMLEdBQVNDLEVBQUVELENBQXBDLENBQVA7QUFDQTs7OzZCQUVVQyxDLEVBQUc7QUFDYixVQUFPLEtBQUtDLEtBQUwsQ0FBV0QsQ0FBWCxFQUFjRSxNQUFyQjtBQUNBOzs7c0JBRUdGLEMsRUFB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bUMsTUFBUCxLQUFrQixXQUF0QixFQUFtQ0EsT0FBT0MsT0FBUCxHQUFpQnBDLE1BQWpCIiwiZmlsZSI6InZlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpXG5cdHNldFRpbWVvdXQoKCkgPT5cblx0XHREaXJlY3Rpb24gPSByZXF1aXJlKCcuL2RpcmVjdGlvbicpKTtcblxuY2xhc3MgVmVjdG9yIHtcblx0Y29uc3RydWN0b3IoeCwgeSkge1xuXHRcdHRoaXMueCA9IHg7XG5cdFx0dGhpcy55ID0geTtcblx0fVxuXG5cdHN0YXRpYyBmcm9tQW5nbGUodGhldGEpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcihNYXRoLmNvcyh0aGV0YSksIE1hdGguc2luKHRoZXRhKSk7XG5cdH1cblxuXHRnZXQgYW5nbGUoKSB7XG5cdFx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuXHR9XG5cblx0Z2V0IGRpcmVjdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IERpcmVjdGlvbih0aGlzLmFuZ2xlKTtcblx0fVxuXG5cdHBsdXModikge1xuXHRcdHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55KTtcblx0fVxuXG5cdG1pbnVzKHYpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSk7XG5cdH1cblxuXHRkaXN0YW5jZVRvKHYpIHtcblx0XHRyZXR1cm4gdGhpcy5taW51cyh2KS5sZW5ndGg7XG5cdH1cblxuXHRkb3Qodikge1xuXHRcdHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG5cdH1cblxuXHRjcm9zcyh2KSB7XG5cdFx0cmV0dXJuIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueDsgXG5cdH1cblxuXHRnZXQgbGVuZ3RoKCkge1xuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy5kb3QodGhpcykpO1xuXHR9XG5cblx0ZXF1YWxzKHYpIHtcblx0XHRyZXR1cm4gKHRoaXMueCA9PSB2LngpICYmICh0aGlzLnkgPT0gdi55KTtcblx0fVxuXG5cdG5vcm1hbGlzZSgpIHtcblx0XHRpZiAodGhpcy5sZW5ndGggPT0gMCkge1xuXHRcdFx0Y29uc29sZS53YXJuKCdOb3JtYWxpc2VkIGEgemVybyB2ZWN0b3IuJyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMub3Zlcih0aGlzLmxlbmd0aCk7XG5cdH1cblxuXHRwZXJwZW5kaWN1bGFyKCkge1xuXHRcdHJldHVybiBuZXcgVmVjdG9yKHRoaXMueSwgLXRoaXMueCk7XG5cdH1cblxuXHRvdmVyKHMpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggLyBzLCB0aGlzLnkgLyBzKTtcblx0fVxuXG5cdHRpbWVzKHMpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnggKiBzLCB0aGlzLnkgKiBzKTtcblx0fVxuXG5cdGNoYW5nZU9mQmFzaXMoeCwgeSwgb3JpZ2luKSB7XG5cdFx0bGV0IGMgPSBvcmlnaW4gPyB0aGlzLm1pbnVzKG9yaWdpbikgOiB0aGlzO1xuXHRcdC8vIFRPRE8gLSBpcyB0aGlzIHJpZ2h0Pz9cblx0XHRyZXR1cm4gbmV3IFZlY3Rvcihcblx0XHRcdGMuZG90KHgpIC8geC5kb3QoeCksXG5cdFx0XHRjLmRvdCh5KSAvIHkuZG90KHkpKTtcblx0fVxuXG5cdHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiBgKCR7cm91bmQodGhpcy54KX0sICR7cm91bmQodGhpcy55KX0pYDtcblx0XHRmdW5jdGlvbiByb3VuZChuKSB7XG5cdFx0XHRyZXR1cm4gTWF0aC5yb3VuZChuICogMTAwKSAvIDEwMDtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgY2FudmFzTW91c2VWZWN0b3IoY2FudmFzLCBlKSB7XG5cdFx0Y29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRyZXR1cm4gbmV3IFZlY3Rvcihcblx0XHRcdChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gKHJlY3QucmlnaHQgLSByZWN0LmxlZnQpICogY2FudmFzLndpZHRoLFxuXHRcdFx0KGUuY2xpZW50WSAtIHJlY3QudG9wKSAvIChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKSAqIGNhbnZhcy5oZWlnaHQpO1xuXHR9XG59XG5cblZlY3Rvci56ZXJvID0gbmV3IFZlY3RvcigwLCAwKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjtcbiJdfQ==