
class Tanque{
  constructor(objeto,ancho,alto){
    this.tamX=30;
    this.tamY=30;
    this.tamCanon=25;
    this.objeto=objeto;
    this.mouseX;
    this.mouseY;
    this.tamBala=10;
    this.velDisparo=300;
    this.ultimDisparo=new Date().getTime();
    this.colorTanque="blue";
    this.controles=new Controles(10,ancho,alto,this.tamX,this.tamY);
  }
   pintarTanque(data){
    this.objeto.fillStyle=this.colorTanque;
    this.objeto.save();
    this.objeto.translate(data.xi,data.yi);
    this.objeto.rotate(data.angulo);
    this.objeto.fillRect(this.tamX/-2,this.tamY/-2,this.tamX,this.tamY);
    this.objeto.restore();
    this.pintarCanon(data);
    this.objeto.fillStyle="yellow";
    this.objeto.fillText(data.nombre,data.xi-10,data.yi);
  }


  pintarCanon(data){
    this.objeto.strokeStyle=this.colorTanque;
    this.objeto.lineWidth ="10";
    this.objeto.beginPath();
    this.objeto.moveTo(data.xi,data.yi);
      var posY=Math.sin(data.angulo)*this.tamCanon;
      var posX=Math.cos(data.angulo)*this.tamCanon;
      if(data.mouseY>data.yi&&posY<0 || data.mouseY<data.yi&&posY>0)posY*=-1;
     if( data.mouseX>data.xi&&posX<0 || data.mouseX<data.xi&&posX>0)posX*=-1;
     this.objeto.lineTo(data.xi+posX,data.yi+posY);
     this.objeto.stroke();
  }
   pintarDisparo(data,color){
    this.objeto.beginPath();
    this.objeto.fillStyle=color;
   this.objeto.save();
   this.objeto.translate(data.xi+data.posX,data.yi+data.posY);
   this.objeto.rotate(data.angulo);
   this.objeto.fillRect(10/-2,10/-2,10,10);
   this.objeto.restore();
    //this.objeto.arc(data.xi+posX,data.yi+posY,this.tamBala,0,2*Math.PI);
    this.objeto.fill();
  }
  calcularAngulo(){
    var  mxs=Math.max( this.mouseX,this.controles.xi)-Math.min( this.mouseX,this.controles.xi),
     mys=Math.max(this.mouseY,this.controles.yi)-Math.min(this.mouseY,this.controles.yi)
     if(this.mouseX<this.controles.xi) mxs*=-1;
     if(this.mouseY>this.controles.yi) mys*=-1;
    return (-Math.atan(mys/mxs))
  }

}
