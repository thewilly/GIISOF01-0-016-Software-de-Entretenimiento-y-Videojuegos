class GameLayer extends Layer {

	constructor() {
		super();
		this.iniciar();
	}

	iniciar() {
		this.espacio = new Espacio(0.25);
		this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);
	}

	actualizar() {
		this.espacio.actualizar();
		this.fondo.vx = -0.5;
		this.fondo.actualizar();
	}

	dibujar() {
		this.fondo.dibujar();
	}

	procesarControles() {}
}
