var controles = {};
var teclas = [];



var GameLayer = cc.Layer.extend({
    spritePelota:null,
    velocidadX:null,
    velocidadY:null,
    spriteBarra:null,
    arrayBloques:[],

    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Cache de plist.
        // cachear
        // SIEMPRE AL INICIO DEL CONSTRUCTOR PARA NO OLVIDARSE
        cc.spriteFrameCache.addSpriteFrames(res.animacioncocodrilo_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animacionpanda_plist);
        cc.spriteFrameCache.addSpriteFrames(res.animaciontigre_plist);

        this.velocidadX = 3;
        this.velocidadY = 2;

        // sprite pelota
        this.spritePelota = cc.Sprite.create(res.bola_png);
        this.spritePelota.setPosition(cc.p(size.width/2 , size.height/2));
        this.addChild(this.spritePelota);

        // sprite barra
        this.spriteBarra = cc.Sprite.create(res.barra_2_png);
        this.spriteBarra.setPosition(cc.p(size.width/2 , size.height*0.1 ));
        this.addChild(this.spriteBarra);

        // sprite fondo
        this.spriteFondo = cc.Sprite.create(res.fondo_png);
        this.spriteFondo.setPosition(cc.p(size.width/2 , size.height/2));
        this.spriteFondo.setScale( size.width / this.spriteFondo.width );
        this.addChild(this.spriteFondo, -1);

        this.inicializarBloques();

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: this.procesarMouseDown.bind(this)
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.procesarKeyPressed.bind(this),
            onKeyReleased: this.procesarKeyReleased.bind(this)
        }, this);

        this.scheduleUpdate();
        return true;
    },

    inicializarBloques:function() {
        var insertados = 0;
        var fila = 0;
        var columna = 0;

        var framesBloque = [];
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo1.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo2.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo3.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo4.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo5.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo6.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo7.png"));
        framesBloque.push(cc.spriteFrameCache.getSpriteFrame("cocodrilo8.png"));

        var framesBloquePanda = [];
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda1.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda2.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda3.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda4.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda5.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda6.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda7.png"));
        framesBloquePanda.push(cc.spriteFrameCache.getSpriteFrame("panda8.png"));

        var framesBloqueTigre = [];
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre1.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre2.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre3.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre4.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre5.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre6.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre7.png"));
        framesBloqueTigre.push(cc.spriteFrameCache.getSpriteFrame("tigre8.png"));


        var animacionBloque;
        var i = 1;
        while (insertados < 50 ){

            if(i == 1) {
                animacionBloque = new cc.Animation(framesBloque, 0.1);
                i++;
            } else if(i == 2) {
                animacionBloque = new cc.Animation(framesBloquePanda, 0.1);
                i++;
            } else {
                animacionBloque = new cc.Animation(framesBloqueTigre, 0.1);
                i = 1;
            }


            var accionAnimacionBloque = new cc.RepeatForever(new cc.Animate(animacionBloque));

            var spriteBloqueActual = cc.Sprite.create('#cocodrilo1.png');

            spriteBloqueActual.runAction(accionAnimacionBloque);

            var x = ( spriteBloqueActual.width / 2 ) +
                ( spriteBloqueActual.width * columna );
            var y = (cc.winSize.height - spriteBloqueActual.height/2 ) -
                ( spriteBloqueActual.height * fila );
            console.log("Insertado en: "+x+" ,"+y);

            spriteBloqueActual.setPosition(cc.p(x,y));

            this.arrayBloques.push(spriteBloqueActual);
            this.addChild(spriteBloqueActual);

            insertados++;
            columna++;

            if( x + spriteBloqueActual.width / 2 > cc.winSize.width){
                columna = 0;
                fila++;
            }
        }
    },


    procesarMouseDown:function(event) {
        console.log(event.getLocationX());
        console.log(event.getLocationY());

        var actionMoverPelotaAPunto =
            cc.MoveTo.create(1,
                cc.p(event.getLocationX(),
                    event.getLocationY()));

        // Ambito procesarMouseDown
        this.spritePelota.runAction(actionMoverPelotaAPunto);

    },


    update:function (dt) {
        this.procesarControles();

        // Mover barra
        if ( this.spriteBarra.velocidadX == null){
            this.spriteBarra.velocidadX = 0;
        }

        this.spriteBarra.x = this.spriteBarra.x + this.spriteBarra.velocidadX;



        var mitadAncho = this.spritePelota.getContentSize().width/2;
        var mitadAlto = this.spritePelota.getContentSize().height/2;

        // Nuevas posiciones
        this.spritePelota.x = this.spritePelota.x + this.velocidadX;
        this.spritePelota.y = this.spritePelota.y + this.velocidadY;

        // Rebote
        if (this.spritePelota.x < 0 + mitadAncho){
            this.spritePelota.x = 0 + mitadAncho;
            this.velocidadX = this.velocidadX*-1;
        }
        if (this.spritePelota.x > cc.winSize.width - mitadAncho){
            this.spritePelota.x = cc.winSize.width - mitadAncho;
            this.velocidadX = this.velocidadX*-1;
        }
        if (this.spritePelota.y < 0 + mitadAlto){
            // No rebota, se acaba el juego
            cc.director.pause();
            this.getParent().addChild(new GameOverLayer());
        }
        if (this.spritePelota.y > cc.winSize.height - mitadAlto){
            this.spritePelota.y = cc.winSize.height - mitadAlto;
            this.velocidadY = this.velocidadY*-1;
        }

        // --- COLISIONES ---

        //Colisiones Pelota y Barra
        var areaPelota = this.spritePelota.getBoundingBox();
        var areaBarra = this.spriteBarra.getBoundingBox();

        if( cc.rectIntersectsRect(areaPelota, areaBarra)){
            console.log("Colision");

            this.velocidadX = ( this.spritePelota.x - this.spriteBarra.x ) / 8;
            this.velocidadY =  this.velocidadY*-1;
        }

        //Colisiones Pelota y Bloque
        for(var i = 0; i < this.arrayBloques.length; i++){
            var areaBloque = this.arrayBloques[i].getBoundingBox();
            if( cc.rectIntersectsRect(areaPelota, areaBloque)){
                if(this.arrayBloques[i] != null) {
                    this.removeChild(this.arrayBloques[i]);
                    this.arrayBloques.splice(i, 1);
                    console.log("Quedan : "+this.arrayBloques.length);
                }
            }
        }

    },


    procesarKeyPressed(keyCode){
        console.log("procesarKeyPressed "+keyCode);
        var posicion = teclas.indexOf(keyCode);
        if ( posicion == -1 ) {
            teclas.push(keyCode);
            switch (keyCode ){
                case 39:
                    // ir derecha
                    console.log("controles.moverX = 1");
                    controles.moverX = 1;
                    break;
                case 37:
                    // ir izquierda
                    controles.moverX = -1;
                    break;
            }
        }
    },


    procesarKeyReleased(keyCode){
        console.log("procesarKeyReleased "+keyCode);
        var posicion = teclas.indexOf(keyCode);
        teclas.splice(posicion, 1);
        switch (keyCode ){
            case 39:
                if ( controles.moverX == 1){
                    controles.moverX = 0;
                }
                break;
            case 37:
                if ( controles.moverX == -1){
                    controles.moverX = 0;
                }
                break;
        }
    },


    procesarControles(){
        if ( controles.moverX > 0){
            this.spriteBarra.velocidadX = 5;
        }
        if ( controles.moverX < 0){
            this.spriteBarra.velocidadX = -5;
        }
        if ( controles.moverX == 0 ){
            this.spriteBarra.velocidadX = 0;
        }
    }




});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.director.resume();

        var layer = new GameLayer();
        this.addChild(layer);
    }
});

