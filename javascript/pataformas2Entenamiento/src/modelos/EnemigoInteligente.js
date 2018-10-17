class EnemigoInteligente extends Enemigo {



    constructor(x, y) {
        super(x,y);
        this.tSalto = 30;
    }

    actualizar (){
        this.saltar();
        this.tSalto--;
        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }


        if ( this.estado == estados.muriendo) {
            this.vx = 0;
            this.vy = 0;
        } else {
            if ( this.vx == 0){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
        }

    }

    saltar() {
        if(this.tSalto == 0) {
            this.vy = -16;
            this.tSalto = 30;
        }
    }
}