const expect = require('chai').expect;

const {
		lineCircleIntersection,
		lineSegmentProjection,
		fractionalLineSegment,
		OneDimensionalSet
	} = require('../collision-util'),
	// TODO: switch when I build a 'line' class
	Line = require('../xy/line-segment'),
	Circle = require('../xy/circle'),
	Vector = require('../xy/vector');

describe('lineCircleIntersection', () => {

	it('should not intersect two things nowhere near each other', () => {
		const res = lineCircleIntersection(new Line(
				new Vector(10, 30),
				new Vector(20, 40)),
			new Circle(new Vector(100, 200), 30),
			20);
		console.log((res || 'null').toString());
		expect(res).not.to.be.ok;
	});

	it('should intersect two things that intersect', () => {
		const res = lineCircleIntersection(new Line(
				new Vector(10, 30),
				new Vector(20, 40)),
			new Circle(new Vector(15, 35), 5));
		console.log((res || 'null').toString());
		expect(res).to.be.ok;
	});

});

describe('lineSegmentProjection', () => {

	it('should work', () => {
		// y = 2x + 5
		const res = lineSegmentProjection(
			new Line(
				new Vector(10, 25),
				new Vector(20, 45)),
			new Vector(17, 39));
		expect(res).to.equal(0.7);
	});

});
