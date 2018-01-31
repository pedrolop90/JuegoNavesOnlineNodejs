
class Mapa{
  constructor(objeto,ancho,alto,contenedor,socket,nombre){
    this.objeto=objeto;
    this.ancho=ancho;
    this.alto=alto;
    this.nombre=nombre;
    this.contenedor=contenedor;
    this.socket=socket;
    this.tanque=new Tanque(objeto,ancho,alto);
    this.enviarDatos();
    this.pixelesMapa=null;
    this.pintarMapa();
  }


    enviarDatos(){
        this.socket.emit("enviarDatos",
        {
        'xi':this.tanque.controles.xi,
        'yi':this.tanque.controles.yi,
        'nombre':this.nombre,
        'angulo':this.tanque.calcularAngulo(),
        'mouseX':this.tanque.mouseX,
        'mouseY':this.tanque.mouseY,
        "tamX":this.tanque.tamX,
        "tamY":this.tanque.tamY,
        "color":this.tanque.colorTanque,
        "tamCanon":this.tanque.tamCanon
      });
    }

    enviarDisparo(){
    var time=new Date().getTime();
      if(time-this.tanque.ultimDisparo>=this.tanque.velDisparo){
        this.socket.emit("disparo",
        {
        'xi':this.tanque.controles.xi,
        'yi':this.tanque.controles.yi,
        'angulo':this.tanque.calcularAngulo(),
        'nombre':this.nombre,
        'mouseX':this.tanque.mouseX,
        'mouseY':this.tanque.mouseY,
        'maximo':this.ancho,
        'aumentador':30,
        'muerto':false,
        "tamBala":this.tanque.tamBala,
        'id':this.socket.id
      });
        this.tanque.ultimDisparo=time;
      }
    }


   pintarMapa(){
    this.objeto.fillStyle='gray'
    this.objeto.fillRect(0,0,this.contenedor.width,this.contenedor.height);
     this.objeto.fillStyle='black'
     this.objeto.fillRect(100,this.alto/2+200,100,this.contenedor.height);
    this.objeto.strokeStyle="black";
    this.objeto.lineWidth ="20";
    this.objeto.strokeRect(0,0,this.contenedor.width,this.contenedor.height);
    if(this.pixelesMapa==null){
    var datos=this.objeto.getImageData(0,0,this.ancho,this.alto).data;
    this.pixelesMapa=[];
    var contX=0;
    var contY=0;
    this.pixelesMapa[contY]=[];
      for (var i = 0; i < datos.length; i+=4,contX++) {
        var pixel=true;
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
}
