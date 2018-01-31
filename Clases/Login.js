class Login{
  constructor(ancho,alto,contenedor,login,letrero,nombre,socket,objeto){
    this.ancho=ancho;
    this.alto=alto;
    this.contenedor=contenedor;
    this.letrero=letrero;
    this.nombre=nombre;
    this.socket=socket;
    this.socket.on("recibirDatos",(data)=>{
      this.pintar(data);
    })
    this.mapa=null;
    this.objeto=objeto;
    this.login=login;
    this.capturarFuncionalidades();
  }

        pintar(data){
          if(this.mapa!=null){
            this.mapa.pintarMapa();
            var puntos={};
            var menor=100000;
            for (var i in data['usuarios']) {
              if(data['usuarios'][i]!=null){
                this.mapa.tanque.pintarTanque(data['usuarios'][i]);
              }
            }
            for (var i = 0; i < data["disparos"].length; i++) {
              if(data["disparos"][i].id==this.socket.id){
                this.mapa.tanque.pintarDisparo(data["disparos"][i],"black");
              }else{
                  this.mapa.tanque.pintarDisparo(data["disparos"][i],"red");
                  data["disparos"][i].i=i;
                  this.interceptarBala(data["disparos"][i]);
              }
            }
            this.mapa.tanque.pintarTanque(data.boss);
          }
        }

    ponerLogin(data){
      this.contenedor.style.display="none";
      this.login.style.display="inherit";
      this.nombre.focus();
      this.login.style.width=window.innerWidth+"px";
      this.login.style.height=window.innerHeight+"px";
      this.login.style.backgroundColor = 'gray';
      if(typeof data != "undefined"){
        this.letrero.style.display="inherit";
        this.letrero.innerHTML="te ha matado "+data.nombre;
      }
      this.mapa=null;
      this.socket.emit("muerto",data);
    }

     ponerMapa(){
      this.login.style.display="none";
      this.contenedor.style.display="inherit";
      this.contenedor.width=this.ancho;
      this.contenedor.height=this.alto;
      this.letrero.style.display="none";
      this.mapa=new Mapa(this.objeto,this.ancho,this.alto,this.contenedor,this.socket,this.nombre.value);
    }

    capturarFuncionalidades(){
      document.addEventListener("keydown",(e)=>{
      if(this.mapa!=null){
          this.mapa.tanque.controles.capturar({'tecla':e.keyCode,'pixelesMapa':this.mapa.pixelesMapa},()=>{
            this.mapa.enviarDatos();
          });
        }
        });
       this.contenedor.addEventListener("click",()=>{
       if(this.mapa!=null){
         this.mapa.enviarDisparo();
       }
       });
       this.contenedor.addEventListener("mousemove",(e)=>{
       if(this.mapa!=null){
         this.mapa.tanque.mouseX=e.clientX
         this.mapa.tanque.mouseY =e.clientY
         this.mapa.enviarDatos();
       }
       });
     }

       interceptarBala(data){
         var datosPixelesTanque=this.objeto.getImageData(this.mapa.tanque.controles.xi-this.mapa.tanque.controles.boxChoque,this.mapa.tanque.controles.yi-this.mapa.tanque.controles.boxChoque,this.mapa.tanque.controles.boxChoque*2,this.mapa.tanque.controles.boxChoque*2).data;
         for (var i = 0; i < datosPixelesTanque.length;i+=4) {
           if(datosPixelesTanque[i]==255&&
             datosPixelesTanque[i+1]==0&&
             datosPixelesTanque[i+2]==0&&
             datosPixelesTanque[i+3]==255){
             this.ponerLogin(data);
             break;
           }
         }
       }
}
