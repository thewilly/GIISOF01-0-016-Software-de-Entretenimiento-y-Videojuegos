var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

window.addEventListener('mousedown', mousePressed, false);
window.addEventListener('mouseup', mouseReleased, false);

function mousePressed(event) {
	controles.moverY = 1;
	controles.continuar = true;
}

function mouseReleased() {
	if (controles.moverY == 1) {
		controles.moverY = 0;
	}
}

function onKeyDown(event) {
	entrada = entradas.teclado;
	// agregar la tecla pulsada si no estaba
	var posicion = teclas.indexOf(event.keyCode);
	if (posicion == -1) {
		teclas.push(event.keyCode);
		switch (event.keyCode) {
			case 38:
				controles.moverY = 1;
				break;
		}
	}
}

function onKeyUp(event) {
	// sacar la tecla pulsada
	var posicion = teclas.indexOf(event.keyCode);
	teclas.splice(posicion, 1);
	console.log("Tecla levantada");

	switch (event.keyCode) {
		case 38:
			if (controles.moverY == 1) {
				controles.moverY = 0;
			}
			break;
	}
}
