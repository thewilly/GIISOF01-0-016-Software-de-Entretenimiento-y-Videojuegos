// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var escaladoMinimo = 1;

// Capas
var gameLayer;

// Controles
var controls = {};

// Inicio capas y bucle del juego
function setUp() {
	gameLayer = new GameLayer();
	setInterval(update, 1000 / 30);
}

function update() {
	gameLayer.update();
	gameLayer.processControls();
	gameLayer.draw();
}

// Resizing the canvas
window.addEventListener('load', resize, false);

function resize() {
	var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
	var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

	escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

	canvas.width = this.canvas.width * escaladoMinimo;
	canvas.height = this.canvas.height * escaladoMinimo;

	ctx.scale(escaladoMinimo, escaladoMinimo);
}
