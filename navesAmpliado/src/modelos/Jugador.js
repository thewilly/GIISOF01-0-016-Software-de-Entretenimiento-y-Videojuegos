class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y)
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Disparo
        this.cadenciaDisparo = 30;
        this.tiempoDisparo = 0;
        this.disparos = 10;

    }

    actualizar(){
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        if(this.x<0)
            this.x=0;
        if(this.x>480)
            this.x=480;
        if(this.y<0)
            this.y=0;
        if(this.y>320)
            this.y=320;

    }

    moverX (direccion){
        this.vx = direccion * 0.7;
    }

    moverY (direccion){
        this.vy = direccion * 0.7;
    }

    disparar(){
        if ( this.tiempoDisparo == 0 && this.disparos > 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            this.disparos--;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }
    }

}