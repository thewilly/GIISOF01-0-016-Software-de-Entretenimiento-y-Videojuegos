class Bird extends Model {

	constructor(x, y) {
		super(images.bird, x, y);

		// Bird exclussive propperties.
		this.gravity = 0.7; // Down force.
		this.lift = -12; // Up force when jump.
		this.velocity = 0; // Y-Axis velocity.
		this.lifes = 3; // Lifes of the player. 3 is the initial lifes.
	}

	update(layer) {
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y > (320)) {
			this.y = (320);
			this.velocity = 0;
			layer.setUp();
		}

		if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;
		}
	}

	up() {
		this.velocity = this.lift;
	}
}
