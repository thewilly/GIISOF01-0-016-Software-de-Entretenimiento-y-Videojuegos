var keys = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(event) {
	// agregar la tecla pulsada si no estaba
	var key = keys.indexOf(event.keyCode);
	if (key == -1) {
		keys.push(event.keyCode);
		switch (event.keyCode) {
			case 38:
				controls.up = true;
				break;
		}
	}
}

function onKeyUp(event) {
	// sacar la tecla pulsada
	var key = keys.indexOf(event.keyCode);
	keys.splice(key, 1);
	switch (event.keyCode) {
		case 38:
			controls.up = false;
			break;
	}

}
