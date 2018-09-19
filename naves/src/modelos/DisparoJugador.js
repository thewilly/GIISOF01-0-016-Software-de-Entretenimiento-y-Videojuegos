class DisparoJugador extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo_jugador, x, y);
        this.vx = 1;
    }

    actualizar (){
        this.x = this.x + this.vx;
    }

}
