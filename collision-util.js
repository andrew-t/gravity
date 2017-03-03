
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
	OneDimensionalSet
};
