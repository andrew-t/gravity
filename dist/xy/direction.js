'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TAU = Math.PI * 2;

if (typeof require !== 'undefined') {
	Vector = require('./vector');
}

var Direction = function () {
	function Direction(theta) {
		_classCallCheck(this, Direction);

		if (theta instanceof Direction) this.theta = theta.theta;else if (theta instanceof Vector) this.theta = theta.direction;else if (isNaN(theta)) throw new Error('Invalid theta');else this.theta = theta % TAU;
	}

	_createClass(Direction, [{
		key: 'asVector',
		value: function asVector() {
			return Vector.fromAngle(this.theta);
		}
	}, {
		key: 'perpendicular',
		value: function perpendicular() {
			// TODO - test that this rotates the same way as Vector#perpendicular()
			return new Direction(this.theta - Math.PI / 2);
		}
	}, {
		key: 'opposite',
		value: function opposite() {
			return new Direction(this.theta + Math.PI);
		}
	}, {
		key: 'toString',
		value: function toString() {
			var v = this.asVector();
			return t(this.degrees) + 'º (' + t(v.x) + ', ' + t(v.y) + ')';

			function t(n) {
				return n.toString().substr(0, 5);
			}
		}
	}, {
		key: 'degrees',
		get: function get() {
			return this.theta * 180 / Math.PI;
		}
	}]);

	return Direction;
}();

Direction.zero = new Direction(0);

if (typeof module !== 'undefined') module.exports = Direction;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3h5L2RpcmVjdGlvbi5qcyJdLCJuYW1lcyI6WyJUQVUiLCJNYXRoIiwiUEkiLCJyZXF1aXJlIiwiVmVjdG9yIiwiRGlyZWN0aW9uIiwidGhldGEiLCJkaXJlY3Rpb24iLCJpc05hTiIsIkVycm9yIiwiZnJvbUFuZ2xlIiwidiIsImFzVmVjdG9yIiwidCIsImRlZ3JlZXMiLCJ4IiwieSIsIm4iLCJ0b1N0cmluZyIsInN1YnN0ciIsInplcm8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxNQUFNQyxLQUFLQyxFQUFMLEdBQVUsQ0FBdEI7O0FBRUEsSUFBSSxPQUFPQyxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ25DQyxVQUFTRCxRQUFRLFVBQVIsQ0FBVDtBQUNBOztJQUVLRSxTO0FBQ0wsb0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDbEIsTUFBSUEsaUJBQWlCRCxTQUFyQixFQUNDLEtBQUtDLEtBQUwsR0FBYUEsTUFBTUEsS0FBbkIsQ0FERCxLQUVLLElBQUlBLGlCQUFpQkYsTUFBckIsRUFDSixLQUFLRSxLQUFMLEdBQWFBLE1BQU1DLFNBQW5CLENBREksS0FFQSxJQUFJQyxNQUFNRixLQUFOLENBQUosRUFDSixNQUFNLElBQUlHLEtBQUosQ0FBVSxlQUFWLENBQU4sQ0FESSxLQUdKLEtBQUtILEtBQUwsR0FBYUEsUUFBUU4sR0FBckI7QUFDRDs7Ozs2QkFFVTtBQUNWLFVBQU9JLE9BQU9NLFNBQVAsQ0FBaUIsS0FBS0osS0FBdEIsQ0FBUDtBQUNBOzs7a0NBRWU7QUFDZjtBQUNBLFVBQU8sSUFBSUQsU0FBSixDQUFjLEtBQUtDLEtBQUwsR0FBYUwsS0FBS0MsRUFBTCxHQUFVLENBQXJDLENBQVA7QUFDQTs7OzZCQUVVO0FBQ1YsVUFBTyxJQUFJRyxTQUFKLENBQWMsS0FBS0MsS0FBTCxHQUFhTCxLQUFLQyxFQUFoQyxDQUFQO0FBQ0E7Ozs2QkFNVTtBQUNWLE9BQU1TLElBQUksS0FBS0MsUUFBTCxFQUFWO0FBQ0EsVUFBT0MsRUFBRSxLQUFLQyxPQUFQLElBQ04sS0FETSxHQUNFRCxFQUFFRixFQUFFSSxDQUFKLENBREYsR0FDVyxJQURYLEdBQ2tCRixFQUFFRixFQUFFSyxDQUFKLENBRGxCLEdBQzJCLEdBRGxDOztBQUdBLFlBQVNILENBQVQsQ0FBV0ksQ0FBWCxFQUFjO0FBQ2IsV0FBT0EsRUFBRUMsUUFBRixHQUFhQyxNQUFiLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLENBQVA7QUFDQTtBQUNEOzs7c0JBWmE7QUFDYixVQUFPLEtBQUtiLEtBQUwsR0FBYSxHQUFiLEdBQW1CTCxLQUFLQyxFQUEvQjtBQUNBOzs7Ozs7QUFhRkcsVUFBVWUsSUFBVixHQUFpQixJQUFJZixTQUFKLENBQWMsQ0FBZCxDQUFqQjs7QUFFQSxJQUFJLE9BQU9nQixNQUFQLEtBQWtCLFdBQXRCLEVBQW1DQSxPQUFPQyxPQUFQLEdBQWlCakIsU0FBakIiLCJmaWxlIjoiZGlyZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVEFVID0gTWF0aC5QSSAqIDI7XG5cbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0VmVjdG9yID0gcmVxdWlyZSgnLi92ZWN0b3InKTtcbn1cblxuY2xhc3MgRGlyZWN0aW9uIHtcblx0Y29uc3RydWN0b3IodGhldGEpIHtcblx0XHRpZiAodGhldGEgaW5zdGFuY2VvZiBEaXJlY3Rpb24pXG5cdFx0XHR0aGlzLnRoZXRhID0gdGhldGEudGhldGE7XG5cdFx0ZWxzZSBpZiAodGhldGEgaW5zdGFuY2VvZiBWZWN0b3IpXG5cdFx0XHR0aGlzLnRoZXRhID0gdGhldGEuZGlyZWN0aW9uO1xuXHRcdGVsc2UgaWYgKGlzTmFOKHRoZXRhKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0aGV0YScpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMudGhldGEgPSB0aGV0YSAlIFRBVTtcblx0fVxuXG5cdGFzVmVjdG9yKCkge1xuXHRcdHJldHVybiBWZWN0b3IuZnJvbUFuZ2xlKHRoaXMudGhldGEpO1xuXHR9XG5cblx0cGVycGVuZGljdWxhcigpIHtcblx0XHQvLyBUT0RPIC0gdGVzdCB0aGF0IHRoaXMgcm90YXRlcyB0aGUgc2FtZSB3YXkgYXMgVmVjdG9yI3BlcnBlbmRpY3VsYXIoKVxuXHRcdHJldHVybiBuZXcgRGlyZWN0aW9uKHRoaXMudGhldGEgLSBNYXRoLlBJIC8gMik7XG5cdH1cblxuXHRvcHBvc2l0ZSgpIHtcblx0XHRyZXR1cm4gbmV3IERpcmVjdGlvbih0aGlzLnRoZXRhICsgTWF0aC5QSSk7XG5cdH1cblxuXHRnZXQgZGVncmVlcygpIHtcblx0XHRyZXR1cm4gdGhpcy50aGV0YSAqIDE4MCAvIE1hdGguUEk7XG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRjb25zdCB2ID0gdGhpcy5hc1ZlY3RvcigpO1xuXHRcdHJldHVybiB0KHRoaXMuZGVncmVlcykgK1xuXHRcdFx0J8K6ICgnICsgdCh2LngpICsgJywgJyArIHQodi55KSArICcpJztcblxuXHRcdGZ1bmN0aW9uIHQobikge1xuXHRcdFx0cmV0dXJuIG4udG9TdHJpbmcoKS5zdWJzdHIoMCwgNSk7XG5cdFx0fVxuXHR9XG59XG5cbkRpcmVjdGlvbi56ZXJvID0gbmV3IERpcmVjdGlvbigwKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IERpcmVjdGlvbjtcbiJdfQ==