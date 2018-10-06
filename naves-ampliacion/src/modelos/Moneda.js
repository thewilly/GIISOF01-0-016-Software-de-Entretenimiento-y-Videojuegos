// AMPLIACIÓN 6 - Monedas.
// Modelo de la moneda.
class Moneda extends Modelo {

    constructor(x, y) {
        super(imagenes.moneda, x, y);

        this.vy = 0;
        this.vx = 1;

    }

    actualizar() {
        this.vx = -1;
        this.x = this.x + this.vx;
    }
}