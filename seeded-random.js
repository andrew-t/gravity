class SeededRandom {
	constructor(seed) {
		this.seed = seed;
	}

	nextFloat() {
		// http://stackoverflow.com/questions/521295/javascript-random-seeds
		const x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}
}
