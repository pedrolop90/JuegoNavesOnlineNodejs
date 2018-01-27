
class Controles{
   constructor(velMovimiento,ancho,alto,tamX,tamY){
    this.velMovimiento=velMovimiento;
    this.ancho=ancho;
    this.alto=alto;
    this.xi=Math.round(ancho/2);
    this.yi=Math.round(alto/2);
    this.tamX=tamX;
    this.tamY=tamY;
    this.boxChoque=15;
  }
     capturar(data,callback){
       var tecla=String.fromCharCode(data.tecla).toLowerCase();
       if(tecla=='a'&&this.choque(data.pixelesMapa,this.xi-this.velMovimiento,this.yi)){
         this.xi-=this.velMovimiento;
       }else if(tecla=='d'&&this.choque(data.pixelesMapa,this.xi+this.velMovimiento,this.yi)) {
         this.xi+=this.velMovimiento;
       }else if(tecla=='w'&&this.choque(data.pixelesMapa,this.xi,this.yi-this.velMovimiento)) {
          this.yi-=this.velMovimiento;
       }else if(tecla=='s'&&this.choque(data.pixelesMapa,this.xi,this.yi+this.velMovimiento)) {
           this.yi+=this.velMovimiento;
       }
       this.xi=Math.round(this.xi);
       this.yi=Math.round(this.yi);
       callback();
    }
    choque(data,accionX,accionY){
      if(data[accionY+this.boxChoque][accionX+this.boxChoque]&&
        data[accionY+this.boxChoque][accionX-this.boxChoque]&&
      data[accionY-this.boxChoque][accionX-this.boxChoque]&&
      data[accionY-this.boxChoque][accionX+this.boxChoque]){
        return (true);
      }else{
        return (false);
      }
    }
  }
