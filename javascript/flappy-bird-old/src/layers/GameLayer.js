class GameLayer extends Layer {

	constructor() {
		super();
		this.setUp();
	}

	setUp() {
		// The first time the game is paused until the player
		// presses the up key. Then the game starts.
		this.pause = true;

		// The background.
		this.bg = new Background(images.background_black, 480 * 0.5, 320 * 0.5);

		// The GameSpace.
		this.gameSpace = new GameSpace(0);

		// The main player
		this.bird = new Bird(50, 50);

		// The scroll at the X axis.
		this.scrollX = 0;

		// Array of pipes.
		this.pipes = [];

		// Loading the map and its objects.
		this.loadMap("res/0.txt");
	}

	update() {
		if (this.pause) {
			return;
		}

		// Updating the background.
		this.bg.update();

		// Updating the game space.
		this.gameSpace.update();

		// Updating the bird.
		this.bird.update(this);
	}

	draw() {
		// Drawing the background.
		this.bg.draw();

		// Drawing the bird.
		this.bird.draw();

		// Drawing the pipes.
		for (var i = 0; i < this.pipes.length; i++) {
			this.pipes[i].draw();
			//console.log(this.pipes[i]);
		}
	}

	processControls() {
		// Jump up
		if (controls.up > 0) {
			if (this.pause) {
				this.pause = false;
				controls.up = false;
			} else {
				this.bird.up();
				controls.up = false;
			}
		}
	}

	loadMap(ruta) {
		var fichero = new XMLHttpRequest();
		fichero.open("GET", ruta, false);

		fichero.onreadystatechange = function() {
			var texto = fichero.responseText;
			var lineas = texto.split('\n');
			this.anchoMapa = (lineas[0].length - 1) * 40;
			for (var i = 0; i < lineas.length; i++) {
				var linea = lineas[i];
				for (var j = 0; j < linea.length; j++) {
					var simbolo = linea[j];
					var x = 40 / 2 + j * 40; // x central
					var y = 32 + i * 32; // y de abajo
					this.loadObjectsInMap(simbolo, x, y);
				}
			}
		}.bind(this);

		fichero.send(null);
	}


	loadObjectsInMap(simbolo, x, y) {
		switch (simbolo) {
			case "C":
				this.copa = new Pipe(images.pipe, x, y);
				this.copa.y = this.copa.y - this.copa.alto / 2;

				// modificación para empezar a contar desde el suelo
				this.gameSpace.agregarCuerpoDinamico(this.copa);
				break;
			case "1":
				this.bird = new Bird(x, y);
				// modificación para empezar a contar desde el suelo
				this.bird.y = this.bird.y - this.bird.height / 2;
				this.gameSpace.agregarCuerpoDinamico(this.bird);
				break;
			case "#":
				var pipe = new Pipe(images.pipe, x, y);
				pipe.y = pipe.y - pipe.alto / 2;

				// modificación para empezar a contar desde el suelo
				this.pipes.push(pipe);
				this.gameSpace.agregarCuerpoEstatico(pipe);
				break;
		}
	}
}
