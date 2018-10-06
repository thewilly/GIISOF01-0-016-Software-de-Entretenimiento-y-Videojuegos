// Lista de recursos a precargar
var imagenes = {
    jugador: "res/jugador.png",
    fondo: "res/fondo.png",
    enemigo: "res/enemigo.png",
    enemigo_movimiento: "res/enemigo_movimiento.png",
    disparo_jugador: "res/disparo_jugador.png",
    disparo_enemigo: "res/disparo_enemigo.png",
    icono_puntos: "res/icono_puntos.png",
    corazon: "res/corazon.png",
    bomba: "res/bomba_espacial.png",
    corazon_mediano: "res/corazon_mediano.png",
    corazon_pequenio: "res/corazon_pequenio.png",
    moneda: "res/moneda.png",
    bala: "res/bullet.png",
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice) {
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function () {
        if (indice < rutasImagenes.length - 1) {
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}