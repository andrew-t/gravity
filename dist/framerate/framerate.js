'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// To run physics with a variable framerate, but
// without ever running more than 100ms per frame:
//
// everyFrame(i => {
//     /* simulate i milliseconds of physics */
// }, 100);

if (typeof require !== 'undefined') {
	eventise = require('./events');
}

var Timestream = function () {
	function Timestream() {
		var _this = this;

		_classCallCheck(this, Timestream);

		this.t = 0;
		this.timeouts = [];
		this.intervals = [];

		this.maxInterval = 250;
		this.warnOnMaxInterval = true;

		var lastTime = 0,
		    cancelled = false;
		var update = function update(time) {
			if (_this.destroyed) return;
			var interval = time - lastTime;
			if (_this.logFramerate) console.log(1000 / interval + ' FPS');
			if (interval > _this.maxInterval) {
				if (_this.warnOnMaxInterval) console.warn('Framerate limiting: ' + interval + 'ms');
				interval = _this.maxInterval;
			}
			_this.advance(interval);
			lastTime = time;
			requestAnimationFrame(update);
			_this._triggerEvent('frame', interval);
		};
		requestAnimationFrame(update);
	}

	_createClass(Timestream, [{
		key: 'advance',
		value: function advance(dt) {
			this.t += dt;
			this.timeouts = this.timeouts.filter(function (timeout) {
				timeout.timeToGo -= dt;
				if (timeout.timeToGo <= 0) {
					timeout.callback();
					return false;
				} else return true;
			});
		}
	}, {
		key: 'setTimeout',
		value: function setTimeout(callback, timeToGo) {
			var timeout = { callback: callback, timeToGo: timeToGo };
			this.timeouts.push(timeout);
			return timeout;
		}
	}, {
		key: 'cancelTimeout',
		value: function cancelTimeout(timeout) {
			this.timeouts = this.timeouts.splice(this.timeouts.indexOf(timeout), 1);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.destroyed = true;
		}
	}]);

	return Timestream;
}();

eventise(Timestream);

if (typeof module !== 'undefined') module.exports = Timestream;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2ZyYW1lcmF0ZS9mcmFtZXJhdGUuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImV2ZW50aXNlIiwiVGltZXN0cmVhbSIsInQiLCJ0aW1lb3V0cyIsImludGVydmFscyIsIm1heEludGVydmFsIiwid2Fybk9uTWF4SW50ZXJ2YWwiLCJsYXN0VGltZSIsImNhbmNlbGxlZCIsInVwZGF0ZSIsImRlc3Ryb3llZCIsImludGVydmFsIiwidGltZSIsImxvZ0ZyYW1lcmF0ZSIsImNvbnNvbGUiLCJsb2ciLCJ3YXJuIiwiYWR2YW5jZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIl90cmlnZ2VyRXZlbnQiLCJkdCIsImZpbHRlciIsInRpbWVvdXQiLCJ0aW1lVG9HbyIsImNhbGxiYWNrIiwicHVzaCIsInNwbGljZSIsImluZGV4T2YiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxPQUFPQSxPQUFQLEtBQW1CLFdBQXZCLEVBQW9DO0FBQ25DQyxZQUFXRCxRQUFRLFVBQVIsQ0FBWDtBQUNBOztJQUVLRSxVO0FBQ0wsdUJBQWM7QUFBQTs7QUFBQTs7QUFDYixPQUFLQyxDQUFMLEdBQVMsQ0FBVDtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEVBQWpCOztBQUVBLE9BQUtDLFdBQUwsR0FBbUIsR0FBbkI7QUFDQSxPQUFLQyxpQkFBTCxHQUF5QixJQUF6Qjs7QUFFQSxNQUFJQyxXQUFXLENBQWY7QUFBQSxNQUNDQyxZQUFZLEtBRGI7QUFFQSxNQUFNQyxTQUFTLFNBQVRBLE1BQVMsT0FBUTtBQUNyQixPQUFJLE1BQUtDLFNBQVQsRUFBb0I7QUFDcEIsT0FBSUMsV0FBV0MsT0FBT0wsUUFBdEI7QUFDQSxPQUFJLE1BQUtNLFlBQVQsRUFDQ0MsUUFBUUMsR0FBUixDQUFhLE9BQU9KLFFBQVIsR0FBb0IsTUFBaEM7QUFDRCxPQUFJQSxXQUFXLE1BQUtOLFdBQXBCLEVBQWlDO0FBQ2hDLFFBQUksTUFBS0MsaUJBQVQsRUFDQ1EsUUFBUUUsSUFBUixDQUFhLHlCQUNaTCxRQURZLEdBQ0QsSUFEWjtBQUVEQSxlQUFXLE1BQUtOLFdBQWhCO0FBQ0E7QUFDRCxTQUFLWSxPQUFMLENBQWFOLFFBQWI7QUFDQUosY0FBV0ssSUFBWDtBQUNBTSx5QkFBc0JULE1BQXRCO0FBQ0EsU0FBS1UsYUFBTCxDQUFtQixPQUFuQixFQUE0QlIsUUFBNUI7QUFDQSxHQWZGO0FBZ0JBTyx3QkFBc0JULE1BQXRCO0FBQ0E7Ozs7MEJBRU9XLEUsRUFBSTtBQUNYLFFBQUtsQixDQUFMLElBQVVrQixFQUFWO0FBQ0EsUUFBS2pCLFFBQUwsR0FBZ0IsS0FBS0EsUUFBTCxDQUFja0IsTUFBZCxDQUFxQixtQkFBVztBQUMvQ0MsWUFBUUMsUUFBUixJQUFvQkgsRUFBcEI7QUFDQSxRQUFJRSxRQUFRQyxRQUFSLElBQW9CLENBQXhCLEVBQTJCO0FBQzFCRCxhQUFRRSxRQUFSO0FBQ0EsWUFBTyxLQUFQO0FBQ0EsS0FIRCxNQUlDLE9BQU8sSUFBUDtBQUNELElBUGUsQ0FBaEI7QUFRQTs7OzZCQUVVQSxRLEVBQVVELFEsRUFBVTtBQUM5QixPQUFNRCxVQUFVLEVBQUVFLGtCQUFGLEVBQVlELGtCQUFaLEVBQWhCO0FBQ0EsUUFBS3BCLFFBQUwsQ0FBY3NCLElBQWQsQ0FBbUJILE9BQW5CO0FBQ0EsVUFBT0EsT0FBUDtBQUNBOzs7Z0NBRWFBLE8sRUFBUztBQUN0QixRQUFLbkIsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWN1QixNQUFkLENBQ2YsS0FBS3ZCLFFBQUwsQ0FBY3dCLE9BQWQsQ0FBc0JMLE9BQXRCLENBRGUsRUFDaUIsQ0FEakIsQ0FBaEI7QUFFQTs7OzRCQUVTO0FBQ1QsUUFBS1osU0FBTCxHQUFpQixJQUFqQjtBQUNBOzs7Ozs7QUFHRlYsU0FBU0MsVUFBVDs7QUFFQSxJQUFJLE9BQU8yQixNQUFQLEtBQWtCLFdBQXRCLEVBQ0NBLE9BQU9DLE9BQVAsR0FBaUI1QixVQUFqQiIsImZpbGUiOiJmcmFtZXJhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUbyBydW4gcGh5c2ljcyB3aXRoIGEgdmFyaWFibGUgZnJhbWVyYXRlLCBidXRcbi8vIHdpdGhvdXQgZXZlciBydW5uaW5nIG1vcmUgdGhhbiAxMDBtcyBwZXIgZnJhbWU6XG4vL1xuLy8gZXZlcnlGcmFtZShpID0+IHtcbi8vICAgICAvKiBzaW11bGF0ZSBpIG1pbGxpc2Vjb25kcyBvZiBwaHlzaWNzICovXG4vLyB9LCAxMDApO1xuXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnKSB7XG5cdGV2ZW50aXNlID0gcmVxdWlyZSgnLi9ldmVudHMnKTtcbn1cblxuY2xhc3MgVGltZXN0cmVhbSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudCA9IDA7XG5cdFx0dGhpcy50aW1lb3V0cyA9IFtdO1xuXHRcdHRoaXMuaW50ZXJ2YWxzID0gW107XG5cblx0XHR0aGlzLm1heEludGVydmFsID0gMjUwO1xuXHRcdHRoaXMud2Fybk9uTWF4SW50ZXJ2YWwgPSB0cnVlO1xuXG5cdFx0bGV0IGxhc3RUaW1lID0gMCxcblx0XHRcdGNhbmNlbGxlZCA9IGZhbHNlO1xuXHRcdGNvbnN0IHVwZGF0ZSA9IHRpbWUgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5kZXN0cm95ZWQpIHJldHVybjtcblx0XHRcdFx0bGV0IGludGVydmFsID0gdGltZSAtIGxhc3RUaW1lO1xuXHRcdFx0XHRpZiAodGhpcy5sb2dGcmFtZXJhdGUpXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coKDEwMDAgLyBpbnRlcnZhbCkgKyAnIEZQUycpO1xuXHRcdFx0XHRpZiAoaW50ZXJ2YWwgPiB0aGlzLm1heEludGVydmFsKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMud2Fybk9uTWF4SW50ZXJ2YWwpXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZyYW1lcmF0ZSBsaW1pdGluZzogJyArXG5cdFx0XHRcdFx0XHRcdGludGVydmFsICsgJ21zJyk7XG5cdFx0XHRcdFx0aW50ZXJ2YWwgPSB0aGlzLm1heEludGVydmFsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuYWR2YW5jZShpbnRlcnZhbCk7XG5cdFx0XHRcdGxhc3RUaW1lID0gdGltZTtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG5cdFx0XHRcdHRoaXMuX3RyaWdnZXJFdmVudCgnZnJhbWUnLCBpbnRlcnZhbCk7XG5cdFx0XHR9O1xuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuXHR9XG5cblx0YWR2YW5jZShkdCkge1xuXHRcdHRoaXMudCArPSBkdDtcblx0XHR0aGlzLnRpbWVvdXRzID0gdGhpcy50aW1lb3V0cy5maWx0ZXIodGltZW91dCA9PiB7XG5cdFx0XHR0aW1lb3V0LnRpbWVUb0dvIC09IGR0O1xuXHRcdFx0aWYgKHRpbWVvdXQudGltZVRvR28gPD0gMCkge1xuXHRcdFx0XHR0aW1lb3V0LmNhbGxiYWNrKCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9KTtcblx0fVxuXG5cdHNldFRpbWVvdXQoY2FsbGJhY2ssIHRpbWVUb0dvKSB7XG5cdFx0Y29uc3QgdGltZW91dCA9IHsgY2FsbGJhY2ssIHRpbWVUb0dvIH07XG5cdFx0dGhpcy50aW1lb3V0cy5wdXNoKHRpbWVvdXQpO1xuXHRcdHJldHVybiB0aW1lb3V0O1xuXHR9XG5cblx0Y2FuY2VsVGltZW91dCh0aW1lb3V0KSB7XG5cdFx0dGhpcy50aW1lb3V0cyA9IHRoaXMudGltZW91dHMuc3BsaWNlKFxuXHRcdFx0dGhpcy50aW1lb3V0cy5pbmRleE9mKHRpbWVvdXQpLCAxKTtcblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuXHR9XG59XG5cbmV2ZW50aXNlKFRpbWVzdHJlYW0pO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpXG5cdG1vZHVsZS5leHBvcnRzID0gVGltZXN0cmVhbTtcbiJdfQ==