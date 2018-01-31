
exports.mapa=class Mapa{
  constructor(){
    this.JSDOM  = require("jsdom").JSDOM;
    this.dom = new this.JSDOM(`<!DOCTYPE html>`);
    this.canvas=this.dom.window.document.createElement("canvas");
    this.canvas.width=1200;
    this.canvas.height=637;
    this.objeto=this.canvas.getContext("2d");
    this.ancho=this.canvas.width;
    this.alto=this.canvas.height;
    this.pixelesMapa;
    this.datosMapa;
    this.pintarMapa();
  }

   pintarMapa(){
    this.objeto.fillStyle='gray'
    this.objeto.fillRect(0,0,this.ancho,this.alto);
     this.objeto.fillStyle='black'
     this.objeto.fillRect(100,this.alto/2+200,100,this.alto);
    this.objeto.strokeStyle="black";
    this.objeto.lineWidth ="20";
    this.objeto.strokeRect(0,0,this.ancho,this.alto);
    this.asignarPixeles();
  }
  asignarPixeles(){
    var datos=this.objeto.getImageData(0,0,this.ancho,this.alto).data;
    this.pixelesMapa=[];
    this.datosMapa=[];
    var contX=0;
    var contY=0;
    this.pixelesMapa[contY]=[];
      for (var i = 0; i < datos.length; i+=4,contX++) {
        var pixel=true;
        this.datosMapa[i]=datos[i];
        this.datosMapa[i+1]=datos[i+1];
        this.datosMapa[i+2]=datos[i+2];
        this.datosMapa[i+3]=datos[i+3];
        if(datos[i]==0&&datos[i+1]==0&&datos[i+2]==0&&datos[i+3]==255){
          pixel=false;
        }
        if(this.pixelesMapa[contY].length==this.ancho){
          contY++;
          contX=0;
          this.pixelesMapa[contY]=[];
        }
        this.pixelesMapa[contY][contX]=pixel;
      }
  }
}
