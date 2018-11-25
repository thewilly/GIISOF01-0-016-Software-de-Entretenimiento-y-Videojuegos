class Model {

	constructor(img, x, y) {
		this.image = new Image();
		this.image.src = img;
		this.x = x;
		this.y = y;
		this.width = this.image.width;
		this.height = this.image.height;
	}

	draw() {
		ctx.drawImage(
			this.image,
			this.x - this.width / 2,
			this.y - this.height / 2
		);
	}

	hits(model) {
		if (model.x - model.width / 2 <= this.x + this.width / 2 &&
			model.x + model.width / 2 >= this.x - this.width / 2 &&
			this.y + this.height / 2 >= model.y - model.height / 2 &&
			this.y - this.height / 2 <= model.y + model.height / 2) {

			return true;
		}
		return false;
	}

	onScreen() {
		if (this.x - this.width / 2 <= 480 &&
			this.x + this.width / 2 >= 0 &&
			this.y - this.height / 2 <= 320 &&
			this.y + this.height / 2 >= 0) {
			return true;
		}
		return false;
	}

}
