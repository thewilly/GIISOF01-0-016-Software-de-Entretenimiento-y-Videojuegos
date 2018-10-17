class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        // Creando enemigos.
        this.enemigos = [];
        this.enemigos.push(new Enemigo(300,50));
        this.enemigos.push(new Enemigo(350,200));

        // Creando disparos.
        this.disparosJugador = [];

        // Creando monedas.
        this.monedas = [];

    }

    actualizar (){

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }
        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos ++;

        if ( this.iteracionesCrearEnemigos > 110){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new Enemigo(rX,rY));
            this.iteracionesCrearEnemigos = 0;
        }

        // Generar Monedas
        if (this.iteracionesCrearMonedas == null){
            this.iteracionesCrearMonedas = 0;
        }
        // iteracionesCrearMonedas tiene que ser un número
        this.iteracionesCrearMonedas ++;

        if ( this.iteracionesCrearMonedas > 200){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.monedas.push(new ElementoRecolectable(rX,rY));
            this.iteracionesCrearMonedas = 0;
        }

        this.jugador.actualizar();

        // Actualizando enemigos.
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }

        // Actualizando monedas.
        for (var i=0; i < this.monedas.length; i++){
            this.monedas[i].actualizar();
        }

        // Actualizando colisiones
        // Enemigo - Jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.iniciar();
            }
        }

        // DisparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.disparosJugador.splice(i, 1);

                    if(this.enemigos[j].vidas < 1)
                        this.enemigos.splice(j, 1);
                    else
                        this.enemigos[j].vidas = this.enemigos[j].vidas - 1;
                }
            }
        }

        // Moneda - Jugador
        for (var i=0; i < this.monedas.length; i++){
            if ( this.jugador.colisiona(this.monedas[i])){
                this.monedas.splice(i, 1);
                this.jugador.disparos = this.jugador.disparos + 1;
            }
        }


        // Actualizando disparos.
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

    }

    dibujar (){

        // Pintando el fondo.
        this.fondo.dibujar();

        // Dibujando enemigos.
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        // Dibujando monedas.
        for (var i=0; i < this.monedas.length; i++) {
            this.monedas[i].dibujar();
        }

        // Pintando el jugador
        this.jugador.dibujar();

        // Pintando los enemigos.
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }

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
