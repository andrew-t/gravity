'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OneDimensionalSet = function () {
	function OneDimensionalSet() {
		_classCallCheck(this, OneDimensionalSet);

		this.parts = [];
	}

	_createClass(OneDimensionalSet, [{
		key: 'add',
		value: function add(start, end) {
			if (start == end)
				// Ignore sets of zero measure, because we do not care:
				return;
			if (end < start) return this.add(end, start);
			var newPart = { start: start, end: end };
			var newParts = [];
			this.parts.forEach(function (part) {
				if (OneDimensionalSet.overlaps(part, newPart)) newPart = OneDimensionalSet.combine(part, newPart);else newParts.push(part);
			});
			newParts.push(newPart);
			this.parts = newParts;
		}
	}, {
		key: 'remove',
		value: function remove(start, end) {
			if (start == end)
				// Ignore sets of zero measure, because we do not care:
				return;
			if (end < start) return this.remove(end, start);
			var newPart = { start: start, end: end },
			    newParts = [];
			this.parts.forEach(function (part) {
				if (!OneDimensionalSet.overlaps(part, newPart))
					//    [---new---]   <---old--->
					// the parts don't overlap; just let the new part be
					newParts.push(part);else if (part.start >= start && part.end <= end)
					//    [--<===old===>-new---]
					// the part is a subset of the new part; delete it
					return;else if (part.start >= start && part.end > end)
					//    [---new-<==]-old--->
					// the part starts within the new part; delete the end
					newParts.push({ start: end, end: part.end });else if (part.start < start && part.end <= end)
					//    <---old--[==>-new---]
					// the part ends within the new part; delete the end
					newParts.push({ start: part.start, end: start });else if (part.start < start && part.end > end) {
					//    <---old--[===new===]->
					// the part contains the new part; delete the middle
					newParts.push({ start: start, end: part.start });
					newParts.push({ start: part.end, end: end });
				} else throw new Error('Wait, what?');
			});
			this.parts = newParts;
		}
	}, {
		key: 'firstElement',
		value: function firstElement() {
			return this.parts.length == 0 ? null : Math.min.apply(Math, _toConsumableArray(this.parts.map(function (p) {
				return p.start;
			})));
		}
	}], [{
		key: 'overlaps',
		value: function overlaps(a, b) {
			return a.start < b.end && b.start < a.end;
		}
	}, {
		key: 'combine',
		value: function combine(a, b) {
			return {
				start: Math.min(a.start, b.start),
				end: Math.max(a.end, b.end)
			};
		}
	}]);

	return OneDimensionalSet;
}();

if (typeof module !== 'undefined') module.exports = {
	OneDimensionalSet: OneDimensionalSet
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvbGxpc2lvbi11dGlsLmpzIl0sIm5hbWVzIjpbIk9uZURpbWVuc2lvbmFsU2V0IiwicGFydHMiLCJzdGFydCIsImVuZCIsImFkZCIsIm5ld1BhcnQiLCJuZXdQYXJ0cyIsImZvckVhY2giLCJvdmVybGFwcyIsInBhcnQiLCJjb21iaW5lIiwicHVzaCIsInJlbW92ZSIsIkVycm9yIiwibGVuZ3RoIiwiTWF0aCIsIm1pbiIsIm1hcCIsInAiLCJhIiwiYiIsIm1heCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQU1BLGlCO0FBQ0wsOEJBQWM7QUFBQTs7QUFDYixPQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBOzs7O3NCQUVHQyxLLEVBQU9DLEcsRUFBSztBQUNmLE9BQUlELFNBQVNDLEdBQWI7QUFDQztBQUNBO0FBQ0QsT0FBSUEsTUFBTUQsS0FBVixFQUNDLE9BQU8sS0FBS0UsR0FBTCxDQUFTRCxHQUFULEVBQWNELEtBQWQsQ0FBUDtBQUNELE9BQUlHLFVBQVUsRUFBRUgsWUFBRixFQUFTQyxRQUFULEVBQWQ7QUFDQSxPQUFNRyxXQUFXLEVBQWpCO0FBQ0EsUUFBS0wsS0FBTCxDQUFXTSxPQUFYLENBQW1CLGdCQUFRO0FBQzFCLFFBQUlQLGtCQUFrQlEsUUFBbEIsQ0FBMkJDLElBQTNCLEVBQWlDSixPQUFqQyxDQUFKLEVBQ0NBLFVBQVVMLGtCQUFrQlUsT0FBbEIsQ0FBMEJELElBQTFCLEVBQWdDSixPQUFoQyxDQUFWLENBREQsS0FHQ0MsU0FBU0ssSUFBVCxDQUFjRixJQUFkO0FBQ0QsSUFMRDtBQU1BSCxZQUFTSyxJQUFULENBQWNOLE9BQWQ7QUFDQSxRQUFLSixLQUFMLEdBQWFLLFFBQWI7QUFDQTs7O3lCQUVNSixLLEVBQU9DLEcsRUFBSztBQUNsQixPQUFJRCxTQUFTQyxHQUFiO0FBQ0M7QUFDQTtBQUNELE9BQUlBLE1BQU1ELEtBQVYsRUFDQyxPQUFPLEtBQUtVLE1BQUwsQ0FBWVQsR0FBWixFQUFpQkQsS0FBakIsQ0FBUDtBQUNELE9BQU1HLFVBQVUsRUFBRUgsWUFBRixFQUFTQyxRQUFULEVBQWhCO0FBQUEsT0FDQ0csV0FBVyxFQURaO0FBRUEsUUFBS0wsS0FBTCxDQUFXTSxPQUFYLENBQW1CLGdCQUFRO0FBQzFCLFFBQUksQ0FBQ1Asa0JBQWtCUSxRQUFsQixDQUEyQkMsSUFBM0IsRUFBaUNKLE9BQWpDLENBQUw7QUFDQztBQUNBO0FBQ0FDLGNBQVNLLElBQVQsQ0FBY0YsSUFBZCxFQUhELEtBSUssSUFBSUEsS0FBS1AsS0FBTCxJQUFjQSxLQUFkLElBQXVCTyxLQUFLTixHQUFMLElBQVlBLEdBQXZDO0FBQ0o7QUFDQTtBQUNBLFlBSEksS0FJQSxJQUFJTSxLQUFLUCxLQUFMLElBQWNBLEtBQWQsSUFBdUJPLEtBQUtOLEdBQUwsR0FBV0EsR0FBdEM7QUFDSjtBQUNBO0FBQ0FHLGNBQVNLLElBQVQsQ0FBYyxFQUFFVCxPQUFPQyxHQUFULEVBQWNBLEtBQUtNLEtBQUtOLEdBQXhCLEVBQWQsRUFISSxLQUlBLElBQUlNLEtBQUtQLEtBQUwsR0FBYUEsS0FBYixJQUFzQk8sS0FBS04sR0FBTCxJQUFZQSxHQUF0QztBQUNKO0FBQ0E7QUFDQUcsY0FBU0ssSUFBVCxDQUFjLEVBQUVULE9BQU9PLEtBQUtQLEtBQWQsRUFBcUJDLEtBQUtELEtBQTFCLEVBQWQsRUFISSxLQUlBLElBQUlPLEtBQUtQLEtBQUwsR0FBYUEsS0FBYixJQUFzQk8sS0FBS04sR0FBTCxHQUFXQSxHQUFyQyxFQUEwQztBQUM5QztBQUNBO0FBQ0FHLGNBQVNLLElBQVQsQ0FBYyxFQUFFVCxPQUFPQSxLQUFULEVBQWdCQyxLQUFLTSxLQUFLUCxLQUExQixFQUFkO0FBQ0FJLGNBQVNLLElBQVQsQ0FBYyxFQUFFVCxPQUFPTyxLQUFLTixHQUFkLEVBQW1CQSxLQUFLQSxHQUF4QixFQUFkO0FBQ0EsS0FMSSxNQUtFLE1BQU0sSUFBSVUsS0FBSixDQUFVLGFBQVYsQ0FBTjtBQUNQLElBdkJEO0FBd0JBLFFBQUtaLEtBQUwsR0FBYUssUUFBYjtBQUNBOzs7aUNBYWM7QUFDZCxVQUFPLEtBQUtMLEtBQUwsQ0FBV2EsTUFBWCxJQUFxQixDQUFyQixHQUNKLElBREksR0FFSkMsS0FBS0MsR0FBTCxnQ0FBWSxLQUFLZixLQUFMLENBQVdnQixHQUFYLENBQWU7QUFBQSxXQUFLQyxFQUFFaEIsS0FBUDtBQUFBLElBQWYsQ0FBWixFQUZIO0FBR0E7OzsyQkFmZWlCLEMsRUFBR0MsQyxFQUFHO0FBQ3JCLFVBQVFELEVBQUVqQixLQUFGLEdBQVVrQixFQUFFakIsR0FBYixJQUFzQmlCLEVBQUVsQixLQUFGLEdBQVVpQixFQUFFaEIsR0FBekM7QUFDQTs7OzBCQUVjZ0IsQyxFQUFHQyxDLEVBQUc7QUFDcEIsVUFBTztBQUNObEIsV0FBT2EsS0FBS0MsR0FBTCxDQUFTRyxFQUFFakIsS0FBWCxFQUFrQmtCLEVBQUVsQixLQUFwQixDQUREO0FBRU5DLFNBQUtZLEtBQUtNLEdBQUwsQ0FBU0YsRUFBRWhCLEdBQVgsRUFBZ0JpQixFQUFFakIsR0FBbEI7QUFGQyxJQUFQO0FBSUE7Ozs7OztBQVNGLElBQUksT0FBT21CLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUNBLE9BQU9DLE9BQVAsR0FBaUI7QUFDbkR2QjtBQURtRCxDQUFqQiIsImZpbGUiOiJjb2xsaXNpb24tdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE9uZURpbWVuc2lvbmFsU2V0IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wYXJ0cyA9IFtdO1xuXHR9XG5cblx0YWRkKHN0YXJ0LCBlbmQpIHtcblx0XHRpZiAoc3RhcnQgPT0gZW5kKVxuXHRcdFx0Ly8gSWdub3JlIHNldHMgb2YgemVybyBtZWFzdXJlLCBiZWNhdXNlIHdlIGRvIG5vdCBjYXJlOlxuXHRcdFx0cmV0dXJuO1xuXHRcdGlmIChlbmQgPCBzdGFydClcblx0XHRcdHJldHVybiB0aGlzLmFkZChlbmQsIHN0YXJ0KTtcblx0XHRsZXQgbmV3UGFydCA9IHsgc3RhcnQsIGVuZCB9O1xuXHRcdGNvbnN0IG5ld1BhcnRzID0gW107XG5cdFx0dGhpcy5wYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuXHRcdFx0aWYgKE9uZURpbWVuc2lvbmFsU2V0Lm92ZXJsYXBzKHBhcnQsIG5ld1BhcnQpKVxuXHRcdFx0XHRuZXdQYXJ0ID0gT25lRGltZW5zaW9uYWxTZXQuY29tYmluZShwYXJ0LCBuZXdQYXJ0KTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0bmV3UGFydHMucHVzaChwYXJ0KTtcblx0XHR9KTtcblx0XHRuZXdQYXJ0cy5wdXNoKG5ld1BhcnQpO1xuXHRcdHRoaXMucGFydHMgPSBuZXdQYXJ0cztcblx0fVxuXG5cdHJlbW92ZShzdGFydCwgZW5kKSB7XG5cdFx0aWYgKHN0YXJ0ID09IGVuZClcblx0XHRcdC8vIElnbm9yZSBzZXRzIG9mIHplcm8gbWVhc3VyZSwgYmVjYXVzZSB3ZSBkbyBub3QgY2FyZTpcblx0XHRcdHJldHVybjtcblx0XHRpZiAoZW5kIDwgc3RhcnQpXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW1vdmUoZW5kLCBzdGFydCk7XG5cdFx0Y29uc3QgbmV3UGFydCA9IHsgc3RhcnQsIGVuZCB9LFxuXHRcdFx0bmV3UGFydHMgPSBbXTtcblx0XHR0aGlzLnBhcnRzLmZvckVhY2gocGFydCA9PiB7XG5cdFx0XHRpZiAoIU9uZURpbWVuc2lvbmFsU2V0Lm92ZXJsYXBzKHBhcnQsIG5ld1BhcnQpKVxuXHRcdFx0XHQvLyAgICBbLS0tbmV3LS0tXSAgIDwtLS1vbGQtLS0+XG5cdFx0XHRcdC8vIHRoZSBwYXJ0cyBkb24ndCBvdmVybGFwOyBqdXN0IGxldCB0aGUgbmV3IHBhcnQgYmVcblx0XHRcdFx0bmV3UGFydHMucHVzaChwYXJ0KTtcblx0XHRcdGVsc2UgaWYgKHBhcnQuc3RhcnQgPj0gc3RhcnQgJiYgcGFydC5lbmQgPD0gZW5kKVxuXHRcdFx0XHQvLyAgICBbLS08PT09b2xkPT09Pi1uZXctLS1dXG5cdFx0XHRcdC8vIHRoZSBwYXJ0IGlzIGEgc3Vic2V0IG9mIHRoZSBuZXcgcGFydDsgZGVsZXRlIGl0XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdGVsc2UgaWYgKHBhcnQuc3RhcnQgPj0gc3RhcnQgJiYgcGFydC5lbmQgPiBlbmQpXG5cdFx0XHRcdC8vICAgIFstLS1uZXctPD09XS1vbGQtLS0+XG5cdFx0XHRcdC8vIHRoZSBwYXJ0IHN0YXJ0cyB3aXRoaW4gdGhlIG5ldyBwYXJ0OyBkZWxldGUgdGhlIGVuZFxuXHRcdFx0XHRuZXdQYXJ0cy5wdXNoKHsgc3RhcnQ6IGVuZCwgZW5kOiBwYXJ0LmVuZCB9KTtcblx0XHRcdGVsc2UgaWYgKHBhcnQuc3RhcnQgPCBzdGFydCAmJiBwYXJ0LmVuZCA8PSBlbmQpXG5cdFx0XHRcdC8vICAgIDwtLS1vbGQtLVs9PT4tbmV3LS0tXVxuXHRcdFx0XHQvLyB0aGUgcGFydCBlbmRzIHdpdGhpbiB0aGUgbmV3IHBhcnQ7IGRlbGV0ZSB0aGUgZW5kXG5cdFx0XHRcdG5ld1BhcnRzLnB1c2goeyBzdGFydDogcGFydC5zdGFydCwgZW5kOiBzdGFydCB9KTtcblx0XHRcdGVsc2UgaWYgKHBhcnQuc3RhcnQgPCBzdGFydCAmJiBwYXJ0LmVuZCA+IGVuZCkge1xuXHRcdFx0XHQvLyAgICA8LS0tb2xkLS1bPT09bmV3PT09XS0+XG5cdFx0XHRcdC8vIHRoZSBwYXJ0IGNvbnRhaW5zIHRoZSBuZXcgcGFydDsgZGVsZXRlIHRoZSBtaWRkbGVcblx0XHRcdFx0bmV3UGFydHMucHVzaCh7IHN0YXJ0OiBzdGFydCwgZW5kOiBwYXJ0LnN0YXJ0IH0pO1xuXHRcdFx0XHRuZXdQYXJ0cy5wdXNoKHsgc3RhcnQ6IHBhcnQuZW5kLCBlbmQ6IGVuZCB9KTtcblx0XHRcdH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1dhaXQsIHdoYXQ/Jyk7XG5cdFx0fSk7XG5cdFx0dGhpcy5wYXJ0cyA9IG5ld1BhcnRzO1xuXHR9XG5cblx0c3RhdGljIG92ZXJsYXBzKGEsIGIpIHtcblx0XHRyZXR1cm4gKGEuc3RhcnQgPCBiLmVuZCkgJiYgKGIuc3RhcnQgPCBhLmVuZCk7XG5cdH1cblxuXHRzdGF0aWMgY29tYmluZShhLCBiKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXJ0OiBNYXRoLm1pbihhLnN0YXJ0LCBiLnN0YXJ0KSxcblx0XHRcdGVuZDogTWF0aC5tYXgoYS5lbmQsIGIuZW5kKVxuXHRcdH07XG5cdH1cblxuXHRmaXJzdEVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMucGFydHMubGVuZ3RoID09IDBcblx0XHRcdD8gbnVsbFxuXHRcdFx0OiBNYXRoLm1pbiguLi50aGlzLnBhcnRzLm1hcChwID0+IHAuc3RhcnQpKTtcblx0fVxufVxuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0ge1xuXHRPbmVEaW1lbnNpb25hbFNldFxufTtcbiJdfQ==