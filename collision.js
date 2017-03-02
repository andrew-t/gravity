class Collision {
	constructor(proportion, location, obstacle) {
		this.proportion = proportion;
		this.location = location;
		this.obstacle = obstacle;
	}

	happensBefore(that) {
		return this.proportion < that.proportion;
	}
}
