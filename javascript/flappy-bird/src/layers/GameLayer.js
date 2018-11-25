class GameLayer extends Layer {

	constructor() {
		super();
		this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480 / 2, 320 / 2);
		this.iniciar();
	}

	iniciar() {
		reproducirMusica();
		this.pausa = true;
		this.espacio = new Espacio(1.2);

		this.scrollX = 0;
		this.bloques = [];
		this.fondoPuntos =
			new Fondo(imagenes.icono_puntos, 480 * 0.87, 320 * 0.05);

		this.fondoVidas =
			new Fondo(imagenes.icono_corazon, 480 * 0.67, 320 * 0.05);

		this.fondoFantasma =
			new Fondo(imagenes.icono_powerup, 480 * 0.47, 320 * 0.05);

		this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);
		this.iteracionesSinPuntos = 50;

		this.vidas = new Texto(0, 480 * 0.7, 320 * 0.07);

		this.textoFantasma = new Texto(0, 480 * 0.5, 320 * 0.07);

		this.jugador = new Jugador(50, 50);
		this.vidas.valor = this.jugador.vidas;
		this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

		this.enemigos = [];

		this.corazones = [];

		this.pepitas = [];

		this.powerups = [];

		this.cargarMapa("res/" + nivelActual + ".txt");
	}

	actualizar() {
		if (this.pausa) {
			return;
		}

		if (this.copa.colisiona(this.jugador)) {
			nivelActual++;
			if (nivelActual > nivelMaximo) {
				nivelActual = 0;
			}
			this.pausa = true;
			this.mensaje =
				new Boton(imagenes.mensaje_ganar, 480 / 2, 320 / 2);
			this.iniciar();
		}

		// Jugador se cae
		if (this.jugador.y > 480) {
			this.mensaje =
				new Boton(imagenes.mensaje_perder, 480 / 2, 320 / 2);
			this.iniciar();
		}

		this.espacio.actualizar(this.jugador);
		this.fondo.vx = -1;
		this.fondo.actualizar();
		this.jugador.actualizar();

		for (var i = 0; i < this.enemigos.length; i++) {
			this.enemigos[i].actualizar();
		}

		// colisiones
		for (var i = 0; i < this.enemigos.length; i++) {
			if (this.jugador.colisiona(this.enemigos[i])) {
				this.jugador.golpeado();
				if (this.jugador.vidas <= 0) {
					this.mensaje =
						new Boton(imagenes.mensaje_perder, 480 / 2, 320 / 2);
					this.iniciar();
				} else {
					this.espacio
						.eliminarCuerpoEstatico(this.enemigos[i]);
					this.enemigos.splice(i, 1);
				}
				this.vidas.valor = this.jugador.vidas;
			}
		}

		for (var i = 0; i < this.bloques.length; i++) {
			if (this.jugador.colisiona(this.bloques[i])) {
				if (!this.jugador.fantasma) {
					this.mensaje =
						new Boton(imagenes.mensaje_perder, 480 / 2, 320 / 2);
					this.iniciar();
				}
			}
		}

		for (var i = 0; i < this.corazones.length; i++) {
			if (this.jugador.colisiona(this.corazones[i])) {
				this.jugador.vidas++;
				this.vidas.valor = this.jugador.vidas;
				this.espacio
					.eliminarCuerpoEstatico(this.corazones[i]);
				this.corazones.splice(i, 1);
			}
		}

		for (var i = 0; i < this.pepitas.length; i++) {
			if (this.jugador.colisiona(this.pepitas[i])) {
				this.espacio
					.eliminarCuerpoEstatico(this.pepitas[i]);
				this.pepitas.splice(i, 1);
				this.jugador.gordo = true;
			}
		}

		for (var i = 0; i < this.powerups.length; i++) {
			if (this.jugador.colisiona(this.powerups[i])) {
				this.espacio
					.eliminarCuerpoEstatico(this.powerups[i]);
				this.powerups.splice(i, 1);
				this.jugador.fantasma = true;
			}
		}

		// Enemigos muertos fuera del juego
		for (var j = 0; j < this.enemigos.length; j++) {
			if (this.enemigos[j] != null &&
				this.enemigos[j].estado == estados.muerto) {

				this.espacio
					.eliminarCuerpoDinamico(this.enemigos[j]);
				this.enemigos.splice(j, 1);

			}
		}
		this.calcularPuntos();

		this.textoFantasma.valor = Math.max(0, this.jugador.tiempoFantasma);
	}

	calcularPuntos() {
		if (this.iteracionesSinPuntos <= 0) {
			this.puntos.valor++;
			this.iteracionesSinPuntos = 50;
		}
		this.iteracionesSinPuntos--;
	}


	calcularScroll() {
		// limite izquierda
		if (this.jugador.x > 480 * 0.3) {
			if (this.jugador.x - this.scrollX < 480 * 0.3) {
				this.scrollX = this.jugador.x - 480 * 0.3;
			}
		}

		// limite derecha
		if (this.jugador.x < this.anchoMapa - 480 * 0.3) {
			if (this.jugador.x - this.scrollX > 480 * 0.2) {
				this.scrollX = this.jugador.x - 480 * 0.2;
			}
		}
	}

	dibujar() {
		this.calcularScroll();
		this.fondo.dibujar();
		for (var i = 0; i < this.bloques.length; i++) {
			this.bloques[i].dibujar(this.scrollX);
		}

		this.copa.dibujar(this.scrollX);
		this.jugador.dibujar(this.scrollX);

		for (var i = 0; i < this.enemigos.length; i++) {
			this.enemigos[i].dibujar(this.scrollX);
		}

		for (var i = 0; i < this.corazones.length; i++) {
			this.corazones[i].dibujar(this.scrollX);
		}

		for (var i = 0; i < this.pepitas.length; i++) {
			this.pepitas[i].dibujar(this.scrollX);
		}

		for (var i = 0; i < this.powerups.length; i++) {
			this.powerups[i].dibujar(this.scrollX);
		}

		this.fondoPuntos.dibujar();
		this.puntos.dibujar();

		this.fondoVidas.dibujar();
		this.vidas.dibujar();

		this.fondoFantasma.dibujar();
		this.textoFantasma.dibujar();

		if (this.pausa) {
			this.mensaje.dibujar();
		}
	}


	procesarControles() {
		if (controles.continuar) {
			controles.continuar = false;
			this.pausa = false;
		}

		// Eje Y
		if (controles.moverY > 0) {
			this.jugador.saltar();
		}
	}


	cargarMapa(ruta) {
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
					this.cargarObjetoMapa(simbolo, x, y);
				}
			}
		}.bind(this);

		fichero.send(null);
	}


	cargarObjetoMapa(simbolo, x, y) {
		switch (simbolo) {
			case "C":
				this.copa = new Bloque(imagenes.copa, x, y);
				this.copa.y = this.copa.y - this.copa.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.espacio.agregarCuerpoDinamico(this.copa);
				break;
			case "E":
				var enemigo = new Enemigo(x, y);
				enemigo.y = enemigo.y - enemigo.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.enemigos.push(enemigo);
				this.espacio.agregarCuerpoEstatico(enemigo);
				break;
			case "V":
				var vida = new Vida(x, y);
				vida.y = vida.y - vida.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.corazones.push(vida);
				this.espacio.agregarCuerpoEstatico(vida);
				break;
			case "P":
				var pepita = new PepitaMaiz(x, y);
				pepita.y = pepita.y - pepita.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.pepitas.push(pepita);
				this.espacio.agregarCuerpoEstatico(pepita);
				break;
			case "U":
				var up = new PowerUp(x, y);
				up.y = up.y - up.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.powerups.push(up);
				this.espacio.agregarCuerpoEstatico(up);
				break;
			case "1":
				this.jugador = new Jugador(x, y);
				// modificación para empezar a contar desde el suelo
				this.jugador.y = this.jugador.y - this.jugador.alto / 2;
				this.espacio.agregarCuerpoDinamico(this.jugador);
				break;
			case "#":
				var bloque = new Bloque(imagenes.pipe, x, y);
				bloque.y = bloque.y - bloque.alto / 2;
				// modificación para empezar a contar desde el suelo
				this.bloques.push(bloque);
				this.espacio.agregarCuerpoEstatico(bloque);
				break;
		}
	}

}
