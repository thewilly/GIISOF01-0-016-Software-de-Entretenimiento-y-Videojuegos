class Enemigo extends Modelo {

	constructor(x, y) {
		super(imagenes.enemigo, x, y)
		this.estado = estados.moviendo;
		this.vxInteligencia = -1;
		this.vx = this.vInteligencia;

		this.aMover = new Animacion(imagenes.enemigo_movimiento,
			this.ancho, this.alto, 6, 3);

		this.aMorir = new Animacion(imagenes.enemigo_morir,
			this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));
		// Ref a la animación actual
		this.animacion = this.aMover;

		this.vy = 0;
		this.vx = 0;
	}

	finAnimacionMorir() {
		this.estado = estados.muerto;
	}

	actualizar() {
		// Actualizar animación
		this.animacion.actualizar();
	}

	impactado() {
		if (this.estado != estados.muriendo) {
			this.estado = estados.muriendo;
		}
	}

	dibujar(scrollX) {
		scrollX = scrollX || 0;
		this.animacion.dibujar(this.x - scrollX, this.y);
	}

}
