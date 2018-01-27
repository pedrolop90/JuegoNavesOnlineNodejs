class Juego{

  constructor(){
    this.ancho=1200;
    this.alto=637;
    this.socket=io();
    this.contenedor=document.querySelector("#canvas");
    this.login=document.querySelector("#login");
    this.objeto=this.contenedor.getContext("2d");
    this.nombre=document.querySelector("#nombre");
    this.letrero=document.querySelector("#matador");
    this.boton_nombre=document.querySelector("#jugar");
    this.sala=new Login(this.ancho,this.alto,this.contenedor,this.login,this.letrero,this.nombre,this.socket,this.objeto);
    this.iniciar();
  }
  iniciar(){
    this.sala.ponerLogin()
    this.boton_nombre.addEventListener("click",()=>{
    this.sala.ponerMapa();
    });
  }
}
