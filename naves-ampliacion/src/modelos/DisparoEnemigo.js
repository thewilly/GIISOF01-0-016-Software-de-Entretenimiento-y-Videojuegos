// AMPLIACION 2 - ENEMIGOS CON CAPADIDAD DE DISPARO.
class DisparoEnemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.disparo_enemigo, x, y);
        this.vx = -2;
    }

    actualizar() {
        this.x = this.x + this.vx;
    }
}