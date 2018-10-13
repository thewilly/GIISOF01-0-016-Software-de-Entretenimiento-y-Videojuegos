class Enemigo extends Modelo {

    constructor(x, y) {
        super(imagenes.enemigo, x, y);

        // Declarando la animación.
        this.aMover = new Animacion(imagenes.enemigo_movimiento,
            this.ancho, this.alto, 24, 3);
        // Ref a la animación actual
        this.animacion = this.aMover;


        this.vy = 0;
        this.vx = 1;

        // AMPLIACION 2 - ENEMIGO CON CAPACIDAD DE DISPARO
        this.cadenciaDisparo = 200;
        this.tiempoDisparo = 0;
    }

    actualizar() {
        // Actualizar animación
        this.animacion.actualizar();

        this.vx = -1;
        this.x = this.x + this.vx;

        // Tiempo Disparo
        if (this.tiempoDisparo > 0) {
            this.tiempoDisparo--;
        }
    }

    dibujar() {
        this.animacion.dibujar(this.x, this.y);
    }

    // AMPLIACION 2 - ENEMIGO CON CAPACIDAD DE DISPARO
    disparar() {
        if (this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoEnemigo(this.x, this.y);
        } else {
            return null;
        }
    }
}