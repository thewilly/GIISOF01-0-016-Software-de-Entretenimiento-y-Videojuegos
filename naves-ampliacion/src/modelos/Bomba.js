// AMPLIACIÓN 10 - Bombas.
// Modelo de la bomba.
class Bomba extends Modelo {

    constructor(x, y) {
        super(imagenes.bomba, x, y);

        this.vy = 0;
        this.vx = 1;
    }

    actualizar() {
        this.vx = -1;
        this.x = this.x + this.vx;
    }
}