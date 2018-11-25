class Jugador extends Modelo {

	constructor(x, y) {
		super(imagenes.jugador, x, y)
		this.vidas = 3;

		this.vx = 3; // velocidadX
		this.vy = 0; // velocidadY

		this.aMover = new Animacion(imagenes.pajaro_movimiento,
			this.ancho, this.alto, 6, 3);

		// Ref a la animación actual
		this.animacion = this.aMover;

		// Disparo
		this.cadenciaDisparo = 1;

		this.tiempoGordo = -1;

		this.tiempoFantasma = -1;

		this.gordo = false;

		this.fantasma = false;
	}


	saltar() {
		this.vy = -10;
		//this.enElAire = false;

		if (this.y > (320)) {
			this.y = (320);
			this.vy = 0;
		}

		if (this.y < 0) {
			this.y = 0;
			this.vy = 0;
		}
	}

	golpeado() {
		if (this.vidas > 0) {
			this.vidas--;
		}

	}

	engordar() {
		this.ancho = this.ancho * 1.5;
		this.alto = this.alto * 1.5;

		this.animacion.modeloAlto = this.animacion.modeloAlto * 1.5;
		this.animacion.modeloAncho = this.animacion.modeloAncho * 1.5;
	}

	tamanioNormal() {
		this.ancho = this.imagen.width;
		this.alto = this.imagen.height;

		this.animacion.modeloAlto = this.alto;
		this.animacion.modeloAncho = this.ancho;
	}

	actualizar() {
		// Actualizar animación
		this.animacion.actualizar();

		// ¿Esta en el aire?
		if (this.choqueAbajo == true) {
			this.enElAire = false;
		} else {
			this.enElAire = true;
		}

		this.vx = 3; // velocidadX

		if (this.gordo) {
			if ((this.ancho / this.imagen.width) == 1) {
				this.engordar();
				this.tiempoGordo = 50;
			}
		} else {
			this.tamanioNormal();
		}

		if (this.tiempoGordo == 0) {
			this.gordo = false;
		}
		this.tiempoGordo--;

		if (this.fantasma && this.tiempoFantasma < 0) {
			this.tiempoFantasma = 100;
		}

		if (this.tiempoFantasma == 0) {
			this.fantasma = false;
		}

		this.tiempoFantasma--;
	}

	moverX(direccion) {
		this.vx = direccion * 3;
	}

	moverY(direccion) {
		this.vy = direccion * 3;
	}

	dibujar(scrollX) {
		this.animacion.dibujar(this.x - scrollX, this.y);
	}


}
