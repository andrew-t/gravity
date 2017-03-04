'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Starfield = function () {
	function Starfield(canvas) {
		var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Starfield);

		if (!opts.starCount) opts.starCount = 100;
		if (!opts.maxStarRadius) opts.maxStarRadius = 3;
		if (!opts.lightness) opts.lightness = '80%';

		this.canvas = canvas;
		this.options = opts;

		this.forceResize();
	}

	_createClass(Starfield, [{
		key: 'forceResize',
		value: function forceResize() {
			this.stars = [];
			for (var n = 0; n < this.options.starCount; ++n) {
				this.stars.push({
					colour: 'hsla(\n\t\t\t\t\t' + Math.random() * 360 + ',\n\t\t\t\t\t' + Math.random() * 50 + '%,\n\t\t\t\t\t' + this.options.lightness + ',\n\t\t\t\t\t' + (Math.random() * 0.5 + 0.5) + ')',
					circle: new Circle(new Vector(Math.random() * this.canvas.width, Math.random() * this.canvas.height), Math.random() * this.options.maxStarRadius)
				});
			}this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this = this;

			var ctx = this.canvas.getContext('2d');
			ctx.fillStyle = 'black';
			ctx.fillRect(-10, -10, this.canvas.width + 20, this.canvas.height + 20);
			ctx.strokeStyle = 'transparent';
			this.stars.forEach(function (star) {
				ctx.fillStyle = star.colour;
				star.circle.draw(ctx);
			});

			if (this.options.universe) this.options.universe.withTransformedCanvas(function (ctx) {
				return _this.options.universe.starSystem.drawBacks(ctx);
			}, this.canvas, ctx, false);
		}
	}]);

	return Starfield;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3N0YXJmaWVsZC5qcyJdLCJuYW1lcyI6WyJTdGFyZmllbGQiLCJjYW52YXMiLCJvcHRzIiwic3RhckNvdW50IiwibWF4U3RhclJhZGl1cyIsImxpZ2h0bmVzcyIsIm9wdGlvbnMiLCJmb3JjZVJlc2l6ZSIsInN0YXJzIiwibiIsInB1c2giLCJjb2xvdXIiLCJNYXRoIiwicmFuZG9tIiwiY2lyY2xlIiwiQ2lyY2xlIiwiVmVjdG9yIiwid2lkdGgiLCJoZWlnaHQiLCJkcmF3IiwiY3R4IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlU3R5bGUiLCJmb3JFYWNoIiwic3RhciIsInVuaXZlcnNlIiwid2l0aFRyYW5zZm9ybWVkQ2FudmFzIiwic3RhclN5c3RlbSIsImRyYXdCYWNrcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU1BLFM7QUFDTCxvQkFBWUMsTUFBWixFQUErQjtBQUFBLE1BQVhDLElBQVcsdUVBQUosRUFBSTs7QUFBQTs7QUFDOUIsTUFBSSxDQUFDQSxLQUFLQyxTQUFWLEVBQXFCRCxLQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBQ3JCLE1BQUksQ0FBQ0QsS0FBS0UsYUFBVixFQUF5QkYsS0FBS0UsYUFBTCxHQUFxQixDQUFyQjtBQUN6QixNQUFJLENBQUNGLEtBQUtHLFNBQVYsRUFBcUJILEtBQUtHLFNBQUwsR0FBaUIsS0FBakI7O0FBRXJCLE9BQUtKLE1BQUwsR0FBY0EsTUFBZDtBQUNBLE9BQUtLLE9BQUwsR0FBZUosSUFBZjs7QUFFQSxPQUFLSyxXQUFMO0FBQ0E7Ozs7Z0NBRWE7QUFDYixRQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUNBLFFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtILE9BQUwsQ0FBYUgsU0FBakMsRUFBNEMsRUFBRU0sQ0FBOUM7QUFDQyxTQUFLRCxLQUFMLENBQVdFLElBQVgsQ0FBZ0I7QUFDZkMsbUNBQ0dDLEtBQUtDLE1BQUwsS0FBZ0IsR0FEbkIscUJBRUdELEtBQUtDLE1BQUwsS0FBZ0IsRUFGbkIsc0JBR0csS0FBS1AsT0FBTCxDQUFhRCxTQUhoQixzQkFJR08sS0FBS0MsTUFBTCxLQUFnQixHQUFoQixHQUFzQixHQUp6QixPQURlO0FBTWZDLGFBQVEsSUFBSUMsTUFBSixDQUFXLElBQUlDLE1BQUosQ0FDakJKLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS1osTUFBTCxDQUFZZ0IsS0FEWCxFQUVqQkwsS0FBS0MsTUFBTCxLQUFnQixLQUFLWixNQUFMLENBQVlpQixNQUZYLENBQVgsRUFHUE4sS0FBS0MsTUFBTCxLQUFnQixLQUFLUCxPQUFMLENBQWFGLGFBSHRCO0FBTk8sS0FBaEI7QUFERCxJQVlBLEtBQUtlLElBQUw7QUFDQTs7O3lCQUVNO0FBQUE7O0FBQ04sT0FBTUMsTUFBTSxLQUFLbkIsTUFBTCxDQUFZb0IsVUFBWixDQUF1QixJQUF2QixDQUFaO0FBQ0FELE9BQUlFLFNBQUosR0FBZ0IsT0FBaEI7QUFDQUYsT0FBSUcsUUFBSixDQUFhLENBQUMsRUFBZCxFQUFrQixDQUFDLEVBQW5CLEVBQXVCLEtBQUt0QixNQUFMLENBQVlnQixLQUFaLEdBQW9CLEVBQTNDLEVBQStDLEtBQUtoQixNQUFMLENBQVlpQixNQUFaLEdBQXFCLEVBQXBFO0FBQ0FFLE9BQUlJLFdBQUosR0FBa0IsYUFBbEI7QUFDQSxRQUFLaEIsS0FBTCxDQUFXaUIsT0FBWCxDQUFtQixnQkFBUTtBQUMxQkwsUUFBSUUsU0FBSixHQUFnQkksS0FBS2YsTUFBckI7QUFDQWUsU0FBS1osTUFBTCxDQUFZSyxJQUFaLENBQWlCQyxHQUFqQjtBQUNBLElBSEQ7O0FBS0EsT0FBSSxLQUFLZCxPQUFMLENBQWFxQixRQUFqQixFQUNDLEtBQUtyQixPQUFMLENBQWFxQixRQUFiLENBQXNCQyxxQkFBdEIsQ0FBNEM7QUFBQSxXQUMzQyxNQUFLdEIsT0FBTCxDQUFhcUIsUUFBYixDQUFzQkUsVUFBdEIsQ0FBaUNDLFNBQWpDLENBQTJDVixHQUEzQyxDQUQyQztBQUFBLElBQTVDLEVBRUMsS0FBS25CLE1BRk4sRUFHQ21CLEdBSEQsRUFJQyxLQUpEO0FBS0QiLCJmaWxlIjoic3RhcmZpZWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RhcmZpZWxkIHtcblx0Y29uc3RydWN0b3IoY2FudmFzLCBvcHRzID0ge30pIHtcblx0XHRpZiAoIW9wdHMuc3RhckNvdW50KSBvcHRzLnN0YXJDb3VudCA9IDEwMDtcblx0XHRpZiAoIW9wdHMubWF4U3RhclJhZGl1cykgb3B0cy5tYXhTdGFyUmFkaXVzID0gMztcblx0XHRpZiAoIW9wdHMubGlnaHRuZXNzKSBvcHRzLmxpZ2h0bmVzcyA9ICc4MCUnO1xuXG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0cztcblxuXHRcdHRoaXMuZm9yY2VSZXNpemUoKTtcblx0fVxuXG5cdGZvcmNlUmVzaXplKCkge1xuXHRcdHRoaXMuc3RhcnMgPSBbXTtcblx0XHRmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMub3B0aW9ucy5zdGFyQ291bnQ7ICsrbilcblx0XHRcdHRoaXMuc3RhcnMucHVzaCh7XG5cdFx0XHRcdGNvbG91cjogYGhzbGEoXG5cdFx0XHRcdFx0JHtNYXRoLnJhbmRvbSgpICogMzYwfSxcblx0XHRcdFx0XHQke01hdGgucmFuZG9tKCkgKiA1MH0lLFxuXHRcdFx0XHRcdCR7dGhpcy5vcHRpb25zLmxpZ2h0bmVzc30sXG5cdFx0XHRcdFx0JHtNYXRoLnJhbmRvbSgpICogMC41ICsgMC41fSlgLFxuXHRcdFx0XHRjaXJjbGU6IG5ldyBDaXJjbGUobmV3IFZlY3Rvcihcblx0XHRcdFx0XHRcdE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhcy53aWR0aCxcblx0XHRcdFx0XHRcdE1hdGgucmFuZG9tKCkgKiB0aGlzLmNhbnZhcy5oZWlnaHQpLFxuXHRcdFx0XHRcdE1hdGgucmFuZG9tKCkgKiB0aGlzLm9wdGlvbnMubWF4U3RhclJhZGl1cylcblx0XHRcdH0pO1xuXHRcdHRoaXMuZHJhdygpO1xuXHR9XG5cblx0ZHJhdygpIHtcblx0XHRjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXHRcdGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuXHRcdGN0eC5maWxsUmVjdCgtMTAsIC0xMCwgdGhpcy5jYW52YXMud2lkdGggKyAyMCwgdGhpcy5jYW52YXMuaGVpZ2h0ICsgMjApO1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9ICd0cmFuc3BhcmVudCc7XG5cdFx0dGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHN0YXIuY29sb3VyO1xuXHRcdFx0c3Rhci5jaXJjbGUuZHJhdyhjdHgpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy51bml2ZXJzZSlcblx0XHRcdHRoaXMub3B0aW9ucy51bml2ZXJzZS53aXRoVHJhbnNmb3JtZWRDYW52YXMoY3R4ID0+XG5cdFx0XHRcdHRoaXMub3B0aW9ucy51bml2ZXJzZS5zdGFyU3lzdGVtLmRyYXdCYWNrcyhjdHgpLFxuXHRcdFx0XHR0aGlzLmNhbnZhcyxcblx0XHRcdFx0Y3R4LFxuXHRcdFx0XHRmYWxzZSk7XG5cdH1cbn0iXX0=