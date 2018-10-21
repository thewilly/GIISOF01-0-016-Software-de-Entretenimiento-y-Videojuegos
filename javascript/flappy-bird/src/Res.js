// Lista re recursos a precargar
var imagenes = {
	fondo: "res/fondo.jpg"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice) {
	var imagenCargar = new Image();
	imagenCargar.src = rutasImagenes[indice];
	imagenCargar.onload = function() {
		if (indice < rutasImagenes.length - 1) {
			indice++;
			cargarImagenes(indice);
		} else {
			iniciarJuego();
		}
	}
}
