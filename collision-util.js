if (typeof require !== 'undefined') {
	Vector = require('./xy/vector');
	LineSegment = require('./xy/line-segment');
}

// TODO - abstract some of this into xy?

// Line.intersectionWithCircle
function lineCircleIntersection(line, circle, extraRadius = 0) {
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

	const d = line.asVector(),
		p1 = line.p1.minus(circle.centre),
		p2 = line.p2.minus(circle.centre),
		D = p1.x * p2.y - p2.x * p1.y,
		r = circle.radius + extraRadius,
		discriminant = r * r * d.dot(d) - D * D;

	// Strictly, there *is* an intersection if D = 0
	// but it is of zero measure so screw it.
	if (discriminant <= 0)
		return null;

	// Note: I have no idea what "sign(dy)" was doing in there,
	// so I've left it out for the time being:
	const a = new Vector(d.y, -d.x).times(D),
		// b = d.times(Math.sqrt(discriminant)),
		b = d.times(Math.sign(d.y) * Math.sqrt(discriminant)),
		c = d.dot(d);

	return new LineSegment(
		a.minus(b).over(c).plus(circle.centre),
		a.plus(b).over(c).plus(circle.centre)
	);
}

// Line.parametricTOfPoint
function lineSegmentProjection(line, point) {
	const v = line.asVector();
	return point.minus(line.p1).dot(v) / v.dot(v);
}

// Line.atParametricT
function fractionalLineSegment(line, t) {
	return line.asVector().times(t).plus(line.p1);
}

class OneDimensionalSet {
	constructor() {
		this.parts = [];
	}

	add(start, end) {
		if (start == end)
			// Ignore sets of zero measure, because we do not care:
			return;
		if (end < start)
			return this.add(end, start);
		const newPart = { start, end },
			newParts = [];
		this.parts.forEach(part => {
			if (OneDimensionalSet.overlaps(part, newPart))
				newPart = OneDimensionalSet.combine(part, newPart);
			else
				newParts.push(part);
		});
		newParts.push(newPart);
		this.parts = newParts;
	}

	remove(start, end) {
		if (start == end)
			// Ignore sets of zero measure, because we do not care:
			return;
		if (end < start)
			return this.remove(end, start);
		const newPart = { start, end },
			newParts = [];
		this.parts.forEach(part => {
			if (!OneDimensionalSet.overlaps(part, newPart))
				//    [---new---]   <---old--->
				// the parts don't overlap; just let the new part be
				newParts.push(part);
			else if (part.start >= start && part.end <= end)
				//    [--<===old===>-new---]
				// the part is a subset of the new part; delete it
				return;
			else if (part.start >= start && part.end > end)
				//    [---new-<==]-old--->
				// the part starts within the new part; delete the end
				newParts.push({ start: end, end: part.end });
			else if (part.start < start && part.end <= end)
				//    <---old--[==>-new---]
				// the part ends within the new part; delete the end
				newParts.push({ start: part.start, end: start });
			else if (part.start < start && part.end > end) {
				//    <---old--[===new===]->
				// the part contains the new part; delete the middle
				newParts.push({ start: start, end: part.start });
				newParts.push({ start: part.end, end: end });
			} else throw new Error('Wait, what?');
		});
		this.parts = newParts;
	}

	static overlaps(a, b) {
		return (a.start < b.end) && (b.start < a.end);
	}

	static combine(a, b) {
		return {
			start: Math.min(a.start, b.start),
			end: Math.max(a.end, b.end)
		};
	}

	firstElement() {
		return this.parts.length == 0
			? null
			: Math.min(...this.parts.map(p => p.start));
	}
}

if (typeof module !== 'undefined') module.exports = {
	lineCircleIntersection,
	lineSegmentProjection,
	fractionalLineSegment
};
