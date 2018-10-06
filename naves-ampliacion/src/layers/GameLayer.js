class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo, 480 * 0.5, 320 * 0.5);

        // AMPLIACION 3 - VIDAS
        // Creando el icono de vidas.
        this.fondoVidas = new Fondo(imagenes.corazon_pequenio, 480 * 0.05, 320 * 0.05);
        this.vidas = new Texto(3, 480 * 0.1, 320 * 0.07);

        // AMPLIACIÓN 4 - DISPAROS FINITOS
        // Creando el icono de disparos disponibles.
        this.fondoDisparos = new Fondo(imagenes.bala, 480 * 0.65, 320 * 0.05);
        this.disparos = new Texto(10, 480 * 0.7, 320 * 0.07);

        // Creando el icono de puntos.
        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);
        this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        // Creando enemigos.
        this.enemigos = [];

        // Creando disparos del jugador.
        this.disparosJugador = [];

        // AMPLIACION 2 - ENEMIGOS CON CAPACIDAD DE DISPARO.
        this.disparosEnemigos = [];

        // AMPLIACION 10 - BOMBAS.
        this.bombas = [];

        // AMPLIACION 6 - MONEDAS.
        this.monedas = [];

        // AMPLIACION 4 - DISPAROS FINITOS.
        // Elemento power up.
        this.powerups = [];

    }

    actualizar() {
        //Actualizando el fondo
        this.fondo.vx = -1;
        this.fondo.actualizar();

        // Comprobando disparos fuera de pantalla
        console.log("disparosJugador: " + this.disparosJugador.length);

        // Eliminar disparos fuera de pantalla
        // Disparos del jugador.
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {
                this.disparosJugador.splice(i, 1);
            }
        }

        // Disparos de los enemigos
        for (var i = 0; i < this.disparosEnemigos.length; i++) {
            if (this.disparosEnemigos[i] != null &&
                !this.disparosEnemigos[i].estaEnPantalla()) {
                this.disparosEnemigos.splice(i, 1);
            }
        }

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null) {
            this.iteracionesCrearEnemigos = 0;
        }

        // AMPLIACION 10 - BOMBAS.
        // Generar bombas
        if (this.iteracionesCrearBombas == null) {
            this.iteracionesCrearBombas = 0;
        }

        // AMPLIACION 6 - MONEDAS.
        // Generar monedas
        if (this.iteracionesCrearMonedas == null) {
            this.iteracionesCrearMonedas = 0;
        }

        // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
        // Generar power ups
        if (this.iteracionesCrearPowerUps == null) {
            this.iteracionesCrearPowerUps = 0;
        }

        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos++;

        // AMPLIACION 10 - BOMBAS.
        // iteracionesCrearBombas tiene que ser un número
        this.iteracionesCrearBombas++;

        // AMPLIACION 6 - MONEDAS.
        // iteracionesCrearMonedas tiene que ser un numero.
        this.iteracionesCrearMonedas++;

        // AMPLICACION 4 - JUGADOR CON DISPAROS FINITOS.
        // iteracionesCrearPowerUps tiene que ser un numero.
        this.iteracionesCrearPowerUps++;

        // Generando Enemigos.
        if (this.iteracionesCrearEnemigos > 110) {
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX, rY));
            this.iteracionesCrearEnemigos = 0;
        }

        // AMPLIACION 10 - BOMBAS.
        // Generando Bombas
        if (this.iteracionesCrearBombas > 300) {
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.bombas.push(new Bomba(rX, rY));
            this.iteracionesCrearBombas = 0;
        }

        // AMPLIACION 6 - MONEDAS.
        // Generando Monedas
        if (this.iteracionesCrearMonedas > 300) {
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.monedas.push(new Moneda(rX, rY));
            this.iteracionesCrearMonedas = 0;
        }

        // AMPLICACION 4 - JUGADOR CON DISPAROS FINITOS.
        // Generando Power Ups
        if (this.iteracionesCrearPowerUps > 300) {
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.powerups.push(new PowerUp(rX, rY));
            this.iteracionesCrearPowerUps = 0;
        }

        this.jugador.actualizar();

        // Actualizando enemigos.
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }

        // AMPLIACION 10 - BOMBAS.
        // Actualizando bombas.
        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].actualizar();
        }

        // AMPLIACION 6 - MONEDAS.
        // Actualizando monedas.
        for (var i = 0; i < this.monedas.length; i++) {
            this.monedas[i].actualizar();
        }

        // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
        // Actualizando powerups.
        for (var i = 0; i < this.powerups.length; i++) {
            this.powerups[i].actualizar();
        }

        // Actualizando colisiones
        // Enemigo - Jugador
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                if (this.vidas.valor == 1) {
                    this.iniciar();
                } else {
                    this.vidas.valor--;
                    this.enemigos.splice(i, 1);
                }
            }
        }

        // AMPLAICION 10 - BOMBAS.
        // Bomba - Jugador
        for (var i = 0; i < this.bombas.length; i++) {
            if (this.jugador.colisiona(this.bombas[i])) {
                this.enemigos = [];
                this.bombas = [];
                this.disparosEnemigos = [];
            }
        }

        // AMPLIACION 6 - MONEDAS.
        // Moneda - Jugador
        for (var i = 0; i < this.monedas.length; i++) {
            if (this.jugador.colisiona(this.monedas[i])) {
                this.puntos.valor++;
                if (this.vidas.valor < 3) {
                    this.vidas.valor++;
                }
                this.monedas.splice(i, 1);
            }
        }

        // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
        // PowerUp - Jugador
        for (var i = 0; i < this.powerups.length; i++) {
            if (this.jugador.colisiona(this.powerups[i])) {
                this.disparos.valor += 10;
                this.powerups.splice(i, 1);
            }
        }

        // DisparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.disparosJugador.splice(i, 1);
                    this.enemigos.splice(j, 1);
                    this.puntos.valor++;
                }
            }
        }

        // AMPLIACION 2 - ENEMIGOS CON CAPACIDAD DE DISPARO.
        // DisparoEnemigo - Jugador
        for (var i = 0; i < this.disparosEnemigos.length; i++) {
            if (this.jugador.colisiona(this.disparosEnemigos[i])) {
                if (this.vidas.valor == 1) {
                    this.iniciar();
                } else {
                    this.vidas.valor--;
                    this.disparosEnemigos.splice(i, 1);
                }
            }
        }

        // Actualizando disparos jugador.
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // AMPLIACION 2 - ENEMIGOS CON CAPACIDAD DE DISPARO.
        // Actualizando disparos de enemigos.
        for (var i = 0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].actualizar();
        }

        // AMPLIACION 2 - ENEMIGOS CON CAPACIDAD DE DISPARO.
        // Generando los disparos de ls enemigos.
        for (var i = 0; i < this.enemigos.length; i++) {
            var nuevoDisparo = this.enemigos[i].disparar();
            if (nuevoDisparo != null) {
                this.disparosEnemigos.push(nuevoDisparo);
            }
        }
    }

    dibujar() {

        // Pintando el fondo.
        this.fondo.dibujar();

        // Dibujando enemigos.
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        // AMPLIACION 2 - ENEMIGOS CON CAPACIDAD DE DISPARO.
        // Dibujando disparos de enemigos.
        for (var i = 0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].dibujar();
        }

        // Pintando el jugador
        this.jugador.dibujar();

        // Pintando los enemigos.
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar();
        }

        // AMPLIACION 10 - BOMBAS.
        // Pintando las bombas.
        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].dibujar();
        }

        // AMPLIACION 6 - MONEDAS.
        // Pintando las monedas.
        for (var i = 0; i < this.monedas.length; i++) {
            this.monedas[i].dibujar();
        }

        // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
        // Pintando las powerups.
        for (var i = 0; i < this.powerups.length; i++) {
            this.powerups[i].dibujar();
        }

        // Elementos del fondo.
        this.fondoPuntos.dibujar();
        this.fondoVidas.dibujar(); // AMPLIACION 3 - JUGADOR CON VIDA.
        this.fondoDisparos.dibujar(); // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
        this.puntos.dibujar();
        this.vidas.dibujar(); // AMPLIACION 3 - JUGADOR CON VIDA.
        this.disparos.dibujar(); // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.

    }

    procesarControles() {
        // disparar
        if (controles.disparo) {
            if (this.disparos.valor > 0) { // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
                var nuevoDisparo = this.jugador.disparar();
                if (nuevoDisparo != null) {
                    this.disparosJugador.push(nuevoDisparo);
                    this.disparos.valor--; // AMPLIACION 4 - JUGADOR CON DISPAROS FINITOS.
                }
            }

            // controles.disparo = false; // Si queremos obligar a levantar el dedo de la barra espaciadora.
        }

        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(-1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }

}