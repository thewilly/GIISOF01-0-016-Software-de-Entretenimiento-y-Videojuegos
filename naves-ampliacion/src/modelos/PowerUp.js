// AMPLIACIÓN 4 - Elemento power up de disparos finitos.
// Modelo del power up.
class PowerUp extends Modelo {

    constructor(x, y) {
        super(imagenes.bala, x, y);

        this.vy = 0;
        this.vx = 1;
    }

    actualizar() {
        this.vx = -1;
        this.x = this.x + this.vx;
    }
}