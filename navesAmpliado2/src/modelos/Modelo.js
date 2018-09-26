class Modelo {

    constructor(imagenRuta, x, y) {
        this.imagen = new Image();
        this.imagen.src = imagenRuta;
        this.x = x;
        this.y = y;
        this.ancho = this.imagen.width;
        this.alto = this.imagen.height;
    }

    dibujar (){
        contexto.drawImage( this.imagen,
            this.x - this.ancho /2,
            this.y - this.alto /2 );
    }

    colisiona (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.ancho/2
            && modelo.x + modelo.ancho/2 >= this.x - this.ancho/2
            && this.y + this.alto/2 >= modelo.y - modelo.alto/2
            && this.y - this.alto/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }

    estaEnPantalla (){
        if ( this.x - this.ancho/2 <= 480 &&
            this.x + this.ancho/2 >= 0 &&
            this.y - this.alto/2 <= 320 &&
            this.y + this.alto/2 >= 0 ){
            return true;
        }
        return false;
    }

}
