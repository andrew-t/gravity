'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof require !== 'undefined') {
	Vector = require('./vector');
}

var Circle = function () {
	function Circle(centre, radius) {
		_classCallCheck(this, Circle);

		this.centre = centre;
		this.radius = radius;
	}

	_createClass(Circle, [{
		key: 'draw',
		value: function draw(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.centre.x + this.radius, this.centre.y);
			ctx.arc(this.centre.x, this.centre.y, this.radius, 0, Math.PI * 2, false);
			ctx.stroke();
			ctx.fill();
		}
	}, {
		key: 'contains',
		value: function contains(point) {
			return this.centre.distanceTo(point) <= this.radius;
		}
	}]);

	return Circle;
}();

if (typeof module !== 'undefined') module.exports = Circle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3h5L2NpcmNsZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiVmVjdG9yIiwiQ2lyY2xlIiwiY2VudHJlIiwicmFkaXVzIiwiY3R4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwieCIsInkiLCJhcmMiLCJNYXRoIiwiUEkiLCJzdHJva2UiLCJmaWxsIiwicG9pbnQiLCJkaXN0YW5jZVRvIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxPQUFPQSxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ25DQyxVQUFTRCxRQUFRLFVBQVIsQ0FBVDtBQUNBOztJQUVLRSxNO0FBQ0wsaUJBQVlDLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCO0FBQUE7O0FBQzNCLE9BQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBOzs7O3VCQUVJQyxHLEVBQUs7QUFDVEEsT0FBSUMsU0FBSjtBQUNBRCxPQUFJRSxNQUFKLENBQVcsS0FBS0osTUFBTCxDQUFZSyxDQUFaLEdBQWdCLEtBQUtKLE1BQWhDLEVBQXdDLEtBQUtELE1BQUwsQ0FBWU0sQ0FBcEQ7QUFDQUosT0FBSUssR0FBSixDQUFRLEtBQUtQLE1BQUwsQ0FBWUssQ0FBcEIsRUFBdUIsS0FBS0wsTUFBTCxDQUFZTSxDQUFuQyxFQUFzQyxLQUFLTCxNQUEzQyxFQUFtRCxDQUFuRCxFQUFzRE8sS0FBS0MsRUFBTCxHQUFVLENBQWhFLEVBQW1FLEtBQW5FO0FBQ0FQLE9BQUlRLE1BQUo7QUFDQVIsT0FBSVMsSUFBSjtBQUNBOzs7MkJBRVFDLEssRUFBTztBQUNmLFVBQU8sS0FBS1osTUFBTCxDQUFZYSxVQUFaLENBQXVCRCxLQUF2QixLQUFpQyxLQUFLWCxNQUE3QztBQUNBOzs7Ozs7QUFHRixJQUFJLE9BQU9hLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUNBLE9BQU9DLE9BQVAsR0FBaUJoQixNQUFqQiIsImZpbGUiOiJjaXJjbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFZlY3RvciA9IHJlcXVpcmUoJy4vdmVjdG9yJyk7XG59XG5cbmNsYXNzIENpcmNsZSB7XG5cdGNvbnN0cnVjdG9yKGNlbnRyZSwgcmFkaXVzKSB7XG5cdFx0dGhpcy5jZW50cmUgPSBjZW50cmU7XG5cdFx0dGhpcy5yYWRpdXMgPSByYWRpdXM7XG5cdH1cblxuXHRkcmF3KGN0eCkge1xuXHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRjdHgubW92ZVRvKHRoaXMuY2VudHJlLnggKyB0aGlzLnJhZGl1cywgdGhpcy5jZW50cmUueSk7XG5cdFx0Y3R4LmFyYyh0aGlzLmNlbnRyZS54LCB0aGlzLmNlbnRyZS55LCB0aGlzLnJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LmZpbGwoKTtcblx0fVxuXG5cdGNvbnRhaW5zKHBvaW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY2VudHJlLmRpc3RhbmNlVG8ocG9pbnQpIDw9IHRoaXMucmFkaXVzO1xuXHR9XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSBDaXJjbGU7XG4iXX0=