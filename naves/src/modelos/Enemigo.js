class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y);

        this.vy = 0;
        this.vx = 1;
    }

    actualizar() {
        this.vx = -1;
        this.x = this.x + this.vx;
    }
}