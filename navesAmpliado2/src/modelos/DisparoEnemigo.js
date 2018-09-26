class DisparoJugador extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo_enemigor, x, y);
        this.vx = -1;
    }

    actualizar (){
        this.x = this.x + this.vx;
    }

}
