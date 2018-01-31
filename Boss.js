exports.boss=class Boss{
  constructor(mapaPixelesAux){
    this.xi=1000;
    this.yi=100;
    this.anuglo=(45*Math.PI/180);
    this.mouseX=1000;
    this.mouseY=100;
    this.distancia=100000;
    this.nombre="Jefe";
    this.objetivo="-1";
    this.velDisparo=1000;
    this.fecha_ultimo_disparo=new Date().getTime()
    this.fecha_ultimo_movimiento=new Date().getTime()
    this.tamX=30;
    this.tamY=30;
    this.color="red";
    this.tamCanon=50;
    this.velMovimiento=25;
    this.colaPosicionesBoss=[];
    this.mapaPixelesAux=mapaPixelesAux;
    this.aumentador=30;
    this.id=1;
    this.distanciaEncontrar=25;
    this.indiceCola=0;
    this.indicePosiciones=0;
    this.boxChoque=15;
  }


  calcularPosiciones(num){
    for (var i = 0; i < num&&this.colaPosicionesBoss.length>0; i++) {
      if(this.choque(this.colaPosicionesBoss[this.indiceCola]) &&
      this.distanciaPuntos(this.colaPosicionesBoss[this.indiceCola],
        {"xi":this.colaPosicionesBoss[this.indiceCola].mouseX,
        "yi":this.colaPosicionesBoss[this.indiceCola].mouseY}
      )>=this.distanciaEncontrar){
        var posY=Math.sin(this.colaPosicionesBoss[this.indiceCola].angulo)*(1/num);
        var posX=Math.cos(this.colaPosicionesBoss[this.indiceCola].angulo)*(1/num);
       if( this.colaPosicionesBoss[this.indiceCola].mouseY>this.colaPosicionesBoss[this.indiceCola].yi&&posY<0 ||  this.colaPosicionesBoss[this.indiceCola].mouseY< this.colaPosicionesBoss[this.indiceCola].yi&&posY>0)posY*=-1;
       if( this.colaPosicionesBoss[this.indiceCola].mouseX>this.colaPosicionesBoss[this.indiceCola].xi&&posX<0 ||  this.colaPosicionesBoss[this.indiceCola].mouseX< this.colaPosicionesBoss[this.indiceCola].xi&&posX>0)posX*=-1;
       this.colaPosicionesBoss[this.indiceCola+1]=this.posicionActual();
       this.colaPosicionesBoss[this.indiceCola+1].xi=this.colaPosicionesBoss[this.indiceCola].xi+posX;
       this.colaPosicionesBoss[this.indiceCola+1].yi=this.colaPosicionesBoss[this.indiceCola].yi+posY;
       if(num!=1){
       this.actualizarPosicionActual(true);
       }
       this.indiceCola++;
     }
    }
    this.actualizarPosicionActual();
  }

  choque(accion){
    if(this.mapaPixelesAux[Math.round(accion.yi+this.boxChoque)][Math.round(accion.xi+this.boxChoque)]&&
      this.mapaPixelesAux[Math.round(accion.yi+this.boxChoque)][Math.round(accion.xi-this.boxChoque)]&&
      this.mapaPixelesAux[Math.round(accion.yi-this.boxChoque)][Math.round(accion.xi-this.boxChoque)]&&
      this.mapaPixelesAux[Math.round(accion.yi-this.boxChoque)][Math.round(accion.xi+this.boxChoque)]){
      return (true);
    }else{
      return (false);
    }
  }

   calcularDatosBoss(data,mapaPixeles){
    var d=this.distanciaPuntos(this.posicionActual(),data);
    if(d<=this.distancia){
      this.mouseX=data.xi;
      this.mouseY=data.yi;
      var  mxs=Math.max( this.mouseX,this.xi)-Math.min( this.mouseX,this.xi),
       mys=Math.max(this.mouseY,this.yi)-Math.min(this.mouseY,this.yi)
       if(this.mouseX<this.xi) mxs*=-1;
       if(this.mouseY>this.yi) mys*=-1;
       this.angulo=(-Math.atan(mys/mxs))
       this.indiceCola=0;
       this.colaPosicionesBoss=[];
       this.colaPosicionesBoss[this.indiceCola]=this.posicionActual();
       this.indicePosiciones=this.indiceCola;
       this.calcularPosiciones(2);
       this.mapaPixelesAux=mapaPixeles;
    }
  }
   distanciaPuntos(data1,data2){
    var elevado1=Math.pow(Math.max(data1.xi,data2.xi)-Math.min(data1.xi,data2.xi),2);
    var elevado2=Math.pow(Math.max(data1.yi,data2.yi)-Math.min(data1.yi,data2.yi),2);
    return (Math.sqrt(Math.max(elevado1,elevado2)-Math.min(elevado1,elevado2)));
  }

    actualizarPosicionActual(dato){
      var fin=new Date().getTime();
      if((fin-this.fecha_ultimo_movimiento>=this.velMovimiento
        && this.indicePosiciones<this.colaPosicionesBoss.length-1)
        ||dato){
        this.fecha_ultimo_movimiento=fin;
        var movs=this.colaPosicionesBoss[this.indicePosiciones];
        this.indicePosiciones++;
        this.xi=movs.xi;
        this.yi=movs.yi;
        this.anuglo=movs.angulo;
        this.mouseX=movs.mouseX;
        this.mouseY=movs.mouseY;
        this.distancia=movs.distancia;
        this.nombre="Jefe";
        this.objetivo=movs.objetivo;
      }
    }
  posicionActual(){
    return {
      "xi":this.xi,
      "yi":this.yi,
      "angulo":this.angulo,
      "mouseX":this.mouseX,
      "mouseY":this.mouseY,
      "distancia":this.distancia,
      "nombre":this.nombre,
      "tamX":this.tamX,
      "tamY":this.tamY,
      "color":this.color,
      "tamCanon":this.tamCanon
    }
  }
  disparo(){
    var fin=new Date().getTime();
    if(fin-this.fecha_ultimo_disparo>=this.velDisparo){
      this.fecha_ultimo_disparo=fin;
      return {
      'xi':this.xi,
      'yi':this.yi,
      'angulo':this.angulo,
      'nombre':this.nombre,
      'mouseX':this.mouseX,
      'mouseY':this.mouseY,
      'aumentador':this.aumentador,
      'muerto':false,
      'id':this.id,
      }
    }else{
      return null;
    }
  }

}
