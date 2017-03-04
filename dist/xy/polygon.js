'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof require !== 'undefined') {
	LineSegment = require('./line-segment');
	Vector = require('./vector');
}

var Polygon = function () {
	function Polygon(points) {
		_classCallCheck(this, Polygon);

		if (!points.length) throw new Error('No points');
		for (var i = 0; i < points.length; ++i) {
			if (!(points[i] instanceof Vector)) throw new Error('Not vectors');
		}this.points = points;
		this.edges = points.map(function (p1, i) {
			return new LineSegment(p1, points[(i + 1) % points.length]);
		});
		this.n = points.length;
	}

	_createClass(Polygon, [{
		key: 'toString',
		value: function toString() {
			return this.points.map(function (p) {
				return p.toString();
			}).join(' -- ');
		}
	}, {
		key: 'contains',
		value: function contains(point) {
			var _this = this;

			var maxX = Math.max.apply(Math, _toConsumableArray(this.points.map(function (p) {
				return p.x;
			}))),
			    maxY = Math.max.apply(Math, _toConsumableArray(this.points.map(function (p) {
				return p.y;
			})));
			if (maxX < point.x || maxY < point.y) return false;

			var _loop = function _loop(tries) {
				var testLine = new LineSegment(point, new Vector(maxX * (Math.random() + 2) + 100, maxY * (Math.random() + 2) + 100));
				// console.log(testLine.toString())

				var intersections = 0,
				    onEdge = false;
				_this.edges.forEach(function (edge) {
					var result = edge.crosses(testLine);
					// console.log(edge.toString(), result.toString())
					if (result == LineSegment.Proper) ++intersections;else if (result == LineSegment.Improper) onEdge = true;
				});
				if (!onEdge) return {
						v: !!(intersections & 1)
					};
			};

			for (var tries = 0; tries < 100; ++tries) {
				var _ret = _loop(tries);

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			return true;
		}
	}, {
		key: 'intersects',
		value: function intersects(that) {
			// Check if one polygon is actually within the other:
			if (this.contains(that.points[0]) || that.contains(this.points[0])) return true;
			// Check if any points are on edges:
			for (var i = 0; i < this.n; ++i) {
				for (var j = 0; j < that.n; ++j) {
					if (this.edges[i].contains(that.points[j]) || that.edges[j].contains(this.points[i])) return true;
				}
			} // Check if any edges cross:
			for (var _i = 0; _i < this.n; ++_i) {
				for (var _j = 0; _j < that.n; ++_j) {
					if (this.edges[_i].crosses(that.edges[_j])) return true;
				}
			}return false;
		}
	}, {
		key: 'draw',
		value: function draw(ctx) {
			var p = this.points[this.n - 1];
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			this.points.forEach(function (p) {
				return ctx.lineTo(p.x, p.y);
			});
			ctx.stroke();
			ctx.fill();
		}
	}]);

	return Polygon;
}();

if (typeof module !== 'undefined') module.exports = Polygon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3h5L3BvbHlnb24uanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkxpbmVTZWdtZW50IiwiVmVjdG9yIiwiUG9seWdvbiIsInBvaW50cyIsImxlbmd0aCIsIkVycm9yIiwiaSIsImVkZ2VzIiwibWFwIiwicDEiLCJuIiwicCIsInRvU3RyaW5nIiwiam9pbiIsInBvaW50IiwibWF4WCIsIk1hdGgiLCJtYXgiLCJ4IiwibWF4WSIsInkiLCJ0cmllcyIsInRlc3RMaW5lIiwicmFuZG9tIiwiaW50ZXJzZWN0aW9ucyIsIm9uRWRnZSIsImZvckVhY2giLCJyZXN1bHQiLCJlZGdlIiwiY3Jvc3NlcyIsIlByb3BlciIsIkltcHJvcGVyIiwidGhhdCIsImNvbnRhaW5zIiwiaiIsImN0eCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImZpbGwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxPQUFPQSxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ25DQyxlQUFjRCxRQUFRLGdCQUFSLENBQWQ7QUFDQUUsVUFBU0YsUUFBUSxVQUFSLENBQVQ7QUFDQTs7SUFFS0csTztBQUNMLGtCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE1BQUksQ0FBQ0EsT0FBT0MsTUFBWixFQUNDLE1BQU0sSUFBSUMsS0FBSixDQUFVLFdBQVYsQ0FBTjtBQUNELE9BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxPQUFPQyxNQUEzQixFQUFtQyxFQUFFRSxDQUFyQztBQUNDLE9BQUksRUFBRUgsT0FBT0csQ0FBUCxhQUFxQkwsTUFBdkIsQ0FBSixFQUNDLE1BQU0sSUFBSUksS0FBSixDQUFVLGFBQVYsQ0FBTjtBQUZGLEdBR0EsS0FBS0YsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsT0FBS0ksS0FBTCxHQUFhSixPQUFPSyxHQUFQLENBQVcsVUFBQ0MsRUFBRCxFQUFLSCxDQUFMO0FBQUEsVUFDdkIsSUFBSU4sV0FBSixDQUNDUyxFQURELEVBRUNOLE9BQU8sQ0FBQ0csSUFBSSxDQUFMLElBQVVILE9BQU9DLE1BQXhCLENBRkQsQ0FEdUI7QUFBQSxHQUFYLENBQWI7QUFJQSxPQUFLTSxDQUFMLEdBQVNQLE9BQU9DLE1BQWhCO0FBQ0E7Ozs7NkJBRVU7QUFDVixVQUFPLEtBQUtELE1BQUwsQ0FBWUssR0FBWixDQUFnQjtBQUFBLFdBQUtHLEVBQUVDLFFBQUYsRUFBTDtBQUFBLElBQWhCLEVBQW1DQyxJQUFuQyxDQUF3QyxNQUF4QyxDQUFQO0FBQ0E7OzsyQkFFUUMsSyxFQUFPO0FBQUE7O0FBQ2YsT0FBTUMsT0FBT0MsS0FBS0MsR0FBTCxnQ0FBWSxLQUFLZCxNQUFMLENBQVlLLEdBQVosQ0FBZ0I7QUFBQSxXQUFLRyxFQUFFTyxDQUFQO0FBQUEsSUFBaEIsQ0FBWixFQUFiO0FBQUEsT0FDQ0MsT0FBT0gsS0FBS0MsR0FBTCxnQ0FBWSxLQUFLZCxNQUFMLENBQVlLLEdBQVosQ0FBZ0I7QUFBQSxXQUFLRyxFQUFFUyxDQUFQO0FBQUEsSUFBaEIsQ0FBWixFQURSO0FBRUEsT0FBSUwsT0FBT0QsTUFBTUksQ0FBYixJQUFrQkMsT0FBT0wsTUFBTU0sQ0FBbkMsRUFDQyxPQUFPLEtBQVA7O0FBSmMsOEJBTU5DLEtBTk07QUFPZCxRQUFNQyxXQUFXLElBQUl0QixXQUFKLENBQWdCYyxLQUFoQixFQUNoQixJQUFJYixNQUFKLENBQ0NjLFFBQVFDLEtBQUtPLE1BQUwsS0FBZ0IsQ0FBeEIsSUFBNkIsR0FEOUIsRUFFQ0osUUFBUUgsS0FBS08sTUFBTCxLQUFnQixDQUF4QixJQUE2QixHQUY5QixDQURnQixDQUFqQjtBQUlBOztBQUVBLFFBQUlDLGdCQUFnQixDQUFwQjtBQUFBLFFBQ0NDLFNBQVMsS0FEVjtBQUVBLFVBQUtsQixLQUFMLENBQVdtQixPQUFYLENBQW1CLGdCQUFRO0FBQzFCLFNBQU1DLFNBQVNDLEtBQUtDLE9BQUwsQ0FBYVAsUUFBYixDQUFmO0FBQ0E7QUFDQSxTQUFJSyxVQUFVM0IsWUFBWThCLE1BQTFCLEVBQ0MsRUFBRU4sYUFBRixDQURELEtBRUssSUFBSUcsVUFBVTNCLFlBQVkrQixRQUExQixFQUNKTixTQUFTLElBQVQ7QUFDRCxLQVBEO0FBUUEsUUFBSSxDQUFDQSxNQUFMLEVBQ0M7QUFBQSxTQUFPLENBQUMsRUFBRUQsZ0JBQWdCLENBQWxCO0FBQVI7QUF4QmE7O0FBTWYsUUFBSyxJQUFJSCxRQUFRLENBQWpCLEVBQW9CQSxRQUFRLEdBQTVCLEVBQWlDLEVBQUVBLEtBQW5DLEVBQTBDO0FBQUEscUJBQWpDQSxLQUFpQzs7QUFBQTtBQW1CekM7QUFDRCxVQUFPLElBQVA7QUFDQTs7OzZCQUVVVyxJLEVBQU07QUFDaEI7QUFDQSxPQUFJLEtBQUtDLFFBQUwsQ0FBY0QsS0FBSzdCLE1BQUwsQ0FBWSxDQUFaLENBQWQsS0FDSDZCLEtBQUtDLFFBQUwsQ0FBYyxLQUFLOUIsTUFBTCxDQUFZLENBQVosQ0FBZCxDQURELEVBRUMsT0FBTyxJQUFQO0FBQ0Q7QUFDQSxRQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLSSxDQUF6QixFQUE0QixFQUFFSixDQUE5QjtBQUNDLFNBQUssSUFBSTRCLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsS0FBS3RCLENBQXpCLEVBQTRCLEVBQUV3QixDQUE5QjtBQUNDLFNBQUksS0FBSzNCLEtBQUwsQ0FBV0QsQ0FBWCxFQUFjMkIsUUFBZCxDQUF1QkQsS0FBSzdCLE1BQUwsQ0FBWStCLENBQVosQ0FBdkIsS0FDSEYsS0FBS3pCLEtBQUwsQ0FBVzJCLENBQVgsRUFBY0QsUUFBZCxDQUF1QixLQUFLOUIsTUFBTCxDQUFZRyxDQUFaLENBQXZCLENBREQsRUFFQyxPQUFPLElBQVA7QUFIRjtBQURELElBTmdCLENBV2hCO0FBQ0EsUUFBSyxJQUFJQSxLQUFJLENBQWIsRUFBZ0JBLEtBQUksS0FBS0ksQ0FBekIsRUFBNEIsRUFBRUosRUFBOUI7QUFDQyxTQUFLLElBQUk0QixLQUFJLENBQWIsRUFBZ0JBLEtBQUlGLEtBQUt0QixDQUF6QixFQUE0QixFQUFFd0IsRUFBOUI7QUFDQyxTQUFJLEtBQUszQixLQUFMLENBQVdELEVBQVgsRUFBY3VCLE9BQWQsQ0FBc0JHLEtBQUt6QixLQUFMLENBQVcyQixFQUFYLENBQXRCLENBQUosRUFDQyxPQUFPLElBQVA7QUFGRjtBQURELElBSUEsT0FBTyxLQUFQO0FBQ0E7Ozt1QkFFSUMsRyxFQUFLO0FBQ1QsT0FBTXhCLElBQUksS0FBS1IsTUFBTCxDQUFZLEtBQUtPLENBQUwsR0FBUyxDQUFyQixDQUFWO0FBQ0F5QixPQUFJQyxTQUFKO0FBQ0FELE9BQUlFLE1BQUosQ0FBVzFCLEVBQUVPLENBQWIsRUFBZ0JQLEVBQUVTLENBQWxCO0FBQ0EsUUFBS2pCLE1BQUwsQ0FBWXVCLE9BQVosQ0FBb0I7QUFBQSxXQUFLUyxJQUFJRyxNQUFKLENBQVczQixFQUFFTyxDQUFiLEVBQWdCUCxFQUFFUyxDQUFsQixDQUFMO0FBQUEsSUFBcEI7QUFDQWUsT0FBSUksTUFBSjtBQUNBSixPQUFJSyxJQUFKO0FBQ0E7Ozs7OztBQUdGLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQ0EsT0FBT0MsT0FBUCxHQUFpQnhDLE9BQWpCIiwiZmlsZSI6InBvbHlnb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSB7XG5cdExpbmVTZWdtZW50ID0gcmVxdWlyZSgnLi9saW5lLXNlZ21lbnQnKTtcblx0VmVjdG9yID0gcmVxdWlyZSgnLi92ZWN0b3InKTtcbn1cblxuY2xhc3MgUG9seWdvbiB7XG5cdGNvbnN0cnVjdG9yKHBvaW50cykge1xuXHRcdGlmICghcG9pbnRzLmxlbmd0aClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTm8gcG9pbnRzJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyArK2kpXG5cdFx0XHRpZiAoIShwb2ludHNbaV0gaW5zdGFuY2VvZiBWZWN0b3IpKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vdCB2ZWN0b3JzJyk7XG5cdFx0dGhpcy5wb2ludHMgPSBwb2ludHM7XG5cdFx0dGhpcy5lZGdlcyA9IHBvaW50cy5tYXAoKHAxLCBpKSA9PlxuXHRcdFx0bmV3IExpbmVTZWdtZW50KFxuXHRcdFx0XHRwMSxcblx0XHRcdFx0cG9pbnRzWyhpICsgMSkgJSBwb2ludHMubGVuZ3RoXSkpO1xuXHRcdHRoaXMubiA9IHBvaW50cy5sZW5ndGg7XG5cdH1cblxuXHR0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5wb2ludHMubWFwKHAgPT4gcC50b1N0cmluZygpKS5qb2luKCcgLS0gJyk7XG5cdH1cblxuXHRjb250YWlucyhwb2ludCkge1xuXHRcdGNvbnN0IG1heFggPSBNYXRoLm1heCguLi50aGlzLnBvaW50cy5tYXAocCA9PiBwLngpKSxcblx0XHRcdG1heFkgPSBNYXRoLm1heCguLi50aGlzLnBvaW50cy5tYXAocCA9PiBwLnkpKTtcblx0XHRpZiAobWF4WCA8IHBvaW50LnggfHwgbWF4WSA8IHBvaW50LnkpXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRmb3IgKGxldCB0cmllcyA9IDA7IHRyaWVzIDwgMTAwOyArK3RyaWVzKSB7XG5cdFx0XHRjb25zdCB0ZXN0TGluZSA9IG5ldyBMaW5lU2VnbWVudChwb2ludCxcblx0XHRcdFx0bmV3IFZlY3Rvcihcblx0XHRcdFx0XHRtYXhYICogKE1hdGgucmFuZG9tKCkgKyAyKSArIDEwMCxcblx0XHRcdFx0XHRtYXhZICogKE1hdGgucmFuZG9tKCkgKyAyKSArIDEwMCkpO1xuXHRcdFx0Ly8gY29uc29sZS5sb2codGVzdExpbmUudG9TdHJpbmcoKSlcblxuXHRcdFx0bGV0IGludGVyc2VjdGlvbnMgPSAwLFxuXHRcdFx0XHRvbkVkZ2UgPSBmYWxzZTtcblx0XHRcdHRoaXMuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcblx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gZWRnZS5jcm9zc2VzKHRlc3RMaW5lKTtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coZWRnZS50b1N0cmluZygpLCByZXN1bHQudG9TdHJpbmcoKSlcblx0XHRcdFx0aWYgKHJlc3VsdCA9PSBMaW5lU2VnbWVudC5Qcm9wZXIpXG5cdFx0XHRcdFx0KytpbnRlcnNlY3Rpb25zO1xuXHRcdFx0XHRlbHNlIGlmIChyZXN1bHQgPT0gTGluZVNlZ21lbnQuSW1wcm9wZXIpXG5cdFx0XHRcdFx0b25FZGdlID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKCFvbkVkZ2UpXG5cdFx0XHRcdHJldHVybiAhIShpbnRlcnNlY3Rpb25zICYgMSk7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aW50ZXJzZWN0cyh0aGF0KSB7XG5cdFx0Ly8gQ2hlY2sgaWYgb25lIHBvbHlnb24gaXMgYWN0dWFsbHkgd2l0aGluIHRoZSBvdGhlcjpcblx0XHRpZiAodGhpcy5jb250YWlucyh0aGF0LnBvaW50c1swXSkgfHxcblx0XHRcdHRoYXQuY29udGFpbnModGhpcy5wb2ludHNbMF0pKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Ly8gQ2hlY2sgaWYgYW55IHBvaW50cyBhcmUgb24gZWRnZXM6XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm47ICsraSlcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhhdC5uOyArK2opXG5cdFx0XHRcdGlmICh0aGlzLmVkZ2VzW2ldLmNvbnRhaW5zKHRoYXQucG9pbnRzW2pdKSB8fFxuXHRcdFx0XHRcdHRoYXQuZWRnZXNbal0uY29udGFpbnModGhpcy5wb2ludHNbaV0pKVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdC8vIENoZWNrIGlmIGFueSBlZGdlcyBjcm9zczpcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubjsgKytpKVxuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGF0Lm47ICsrailcblx0XHRcdFx0aWYgKHRoaXMuZWRnZXNbaV0uY3Jvc3Nlcyh0aGF0LmVkZ2VzW2pdKSlcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkcmF3KGN0eCkge1xuXHRcdGNvbnN0IHAgPSB0aGlzLnBvaW50c1t0aGlzLm4gLSAxXTtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4Lm1vdmVUbyhwLngsIHAueSk7XG5cdFx0dGhpcy5wb2ludHMuZm9yRWFjaChwID0+IGN0eC5saW5lVG8ocC54LCBwLnkpKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LmZpbGwoKTtcblx0fVxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gUG9seWdvbjtcbiJdfQ==