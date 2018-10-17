class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        // Creando el icono de puntos.
        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.puntos = new Texto(0,480*0.9,320*0.07 );

        // Creando enemigos.
        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));

        // Creando disparos.
        this.disparosJugador = [];

        // Creando disparos.
        this.disparosEnemigos = [];

        // Creando Bombas.
        this.bombas = [];

    }

    actualizar (){

        //Actualizando el fondo
        this.fondo.vx = -1;
        this.fondo.actualizar();


        // Comprobando disparos fuera de pantalla
        console.log("disparosJugador: "+this.disparosJugador.length);

        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.disparosJugador.splice(i, 1);
            }
        }

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }

        // Generar bombas
        if (this.iteracionesCrearBombas == null){
            this.iteracionesCrearBombas = 0;
        }

        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos ++;

        // iteracionesCrearBombas tiene que ser un número
        this.iteracionesCrearBombas ++;

        // Generando Enemigos.
        if ( this.iteracionesCrearEnemigos > 110){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX,rY));
            this.iteracionesCrearEnemigos = 0;
        }

        // Generando Bombas
        if ( this.iteracionesCrearBombas > 200){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.bombas.push(new Bomba(rX,rY));
            this.iteracionesCrearBombas = 0;
        }

        this.jugador.actualizar();

        // Actualizando enemigos.
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }

        // Actualizando enemigos.
        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].actualizar();
        }

        // Actualizando colisiones
        // Enemigo - Jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }

        // Bomba - Jugador
        for (var i=0; i < this.bombas.length; i++){
            if ( this.jugador.colisiona(this.bombas[i])){
                this.enemigos = [];
                this.bombas = [];
            }
        }

        // DisparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.disparosJugador.splice(i, 1);
                    this.enemigos.splice(j, 1);
                    this.puntos.valor++;
                }
            }
        }

        // DisparoEnemigo - Jugador
        for (var i=0; i < this.disparosEnemigos.length; i++){
            if(this.jugador.colisiona(this.disparosEnemigos[i])) {
                this.iniciar();
            }
        }


        // Actualizando disparos jugador.
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // Actualizando disparos de enemigos.
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].actualizar();
        }

        // Actualizando disparos enemigos.
        for(var i=0; i < this.enemigos.length; i++) {
            var nuevoDisparo = this.enemigos[i].disparar();
            if ( nuevoDisparo != null ) {
                this.disparosEnemigos.push(nuevoDisparo);
            }
        }

    }

    dibujar (){

        // Pintando el fondo.
        this.fondo.dibujar();

        // Dibujando enemigos.
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        // Dibujando disparos de enemigos.
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].dibujar();
        }

        // Pintando el jugador
        this.jugador.dibujar();

        // Pintando los enemigos.
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

        // Pintando las bombas.
        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].dibujar();
        }

        //DIBUJANDO ELEMENTOS DE PUNTUACIÓN
        // Dibujando el icono de puntos.
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

    }

    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }

            // controles.disparo = false; Si queremos obligar a levantar el dedo de la barra espaciadora.
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }

}
