// Lista re recursos a precargar
var images = {
	bird: "res/bird.png",
	background_black: "res/fondo.png",
	pipe: "res/pipe.png"
};

var rutasImagenes = Object.values(images);
cargarImagenes(0);

function cargarImagenes(indice) {
	var imagenCargar = new Image();
	imagenCargar.src = rutasImagenes[indice];
	imagenCargar.onload = function() {
		if (indice < rutasImagenes.length - 1) {
			indice++;
			cargarImagenes(indice);
		} else {
			setUp();
		}
	}
}
