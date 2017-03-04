"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collision = function () {
	function Collision(proportion, location, obstacle) {
		_classCallCheck(this, Collision);

		this.proportion = proportion;
		this.location = location;
		this.obstacle = obstacle;
	}

	_createClass(Collision, [{
		key: "happensBefore",
		value: function happensBefore(that) {
			return this.proportion < that.proportion;
		}
	}]);

	return Collision;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvbGxpc2lvbi5qcyJdLCJuYW1lcyI6WyJDb2xsaXNpb24iLCJwcm9wb3J0aW9uIiwibG9jYXRpb24iLCJvYnN0YWNsZSIsInRoYXQiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNQSxTO0FBQ0wsb0JBQVlDLFVBQVosRUFBd0JDLFFBQXhCLEVBQWtDQyxRQUFsQyxFQUE0QztBQUFBOztBQUMzQyxPQUFLRixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQTs7OztnQ0FFYUMsSSxFQUFNO0FBQ25CLFVBQU8sS0FBS0gsVUFBTCxHQUFrQkcsS0FBS0gsVUFBOUI7QUFDQSIsImZpbGUiOiJjb2xsaXNpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDb2xsaXNpb24ge1xuXHRjb25zdHJ1Y3Rvcihwcm9wb3J0aW9uLCBsb2NhdGlvbiwgb2JzdGFjbGUpIHtcblx0XHR0aGlzLnByb3BvcnRpb24gPSBwcm9wb3J0aW9uO1xuXHRcdHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcblx0XHR0aGlzLm9ic3RhY2xlID0gb2JzdGFjbGU7XG5cdH1cblxuXHRoYXBwZW5zQmVmb3JlKHRoYXQpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wb3J0aW9uIDwgdGhhdC5wcm9wb3J0aW9uO1xuXHR9XG59XG4iXX0=