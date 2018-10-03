var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");

// Capas
var gameLayer;

// Controles
var controles = {};


// Inicio capas y bucle del juego
function iniciarJuego() {
    gameLayer = new GameLayer();
    setInterval(loop, 1000 / 30);
}


function loop(){
    console.log("loop - ")
    gameLayer.actualizar();
    if (entrada == entradas.pulsaciones) {
        gameLayer.calcularPulsaciones(pulsaciones);
    }
    gameLayer.procesarControles()
    gameLayer.dibujar();
}

/*function actualizarPulsaciones () {
    for(var i=0; i < pulsaciones.length; i++){
        if ( pulsaciones[i].tipo ==  tipoPulsacion.inicio){
            pulsaciones[i].tipo = tipoPulsacion.mantener;
        }
    }
}*/


// Cambio de escalado
window.addEventListener('load', resize, false);

function resize() {
    console.log("Resize")
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = this.canvas.width*escaladoMinimo;
    canvas.height = this.canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}
