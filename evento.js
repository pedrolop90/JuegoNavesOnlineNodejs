exports.eventos=function(http){

  var io=require("socket.io")(http);
  usuarios=[];
  posiciones={};
  disparos=[];
  pixelesMapa=null;
  const jsdom = require("jsdom");
  const   { JSDOM } = jsdom;
  const dom = new JSDOM(`<!DOCTYPE html>`);
   canvas=dom.window.document.createElement("canvas");
  canvas.width=1200;
  canvas.width=637;
  ancho=1200;
  alto=637;
  var objeto=canvas.getContext("2d");
  objeto.fillStyle="black";

  setInterval(()=>{
    for (var i = 0; i < usuarios.length; i++) {
      if(posiciones[usuarios[i].id]!=null){
        usuarios[i].emit("recibirDatos",{'usuarios':posiciones,'disparos':disparos});
      }
    }
    for (var i = 0; i < disparos.length; i++) {
       disparos[i].aumentador+=10;
       disparos[i]=calcularPosicion(disparos[i]);
      if(!pixelesMapa[Math.round(disparos[i].yi+disparos[i].posY)][Math.round(disparos[i].xi+disparos[i].posX)]
      || disparos[i].muerto){
        disparos.splice(i,1);
      }
    }
  },20);

  function calcularPosicion(data){
    var posY=Math.sin( data.angulo)* data.aumentador;
    var posX=Math.cos( data.angulo)*data.aumentador;
   if( data.mouseY> data.yi&&posY<0 ||  data.mouseY< data.yi&&posY>0)posY*=-1;
   if(  data.mouseX> data.xi&&posX<0 ||  data.mouseX< data.xi&&posX>0)posX*=-1;
   data.posX=posX;
   data.posY=posY;
   return data;
  }

  io.sockets.on('connection',function(socket){

   console.log("usuario "+socket.id+ " conectado");
    usuarios.push(socket);
     posiciones[socket.id]=null;
    socket.on("enviarDatos",(data)=>{
      posiciones[socket.id]=data;
    });
    socket.on('disparo',(data)=>{
      disparos.push(data);
    })
    socket.on('muerto',(data)=>{
      posiciones[socket.id]=null;
      if(data!=null){
        disparos[data.i].muerto=true;
        posiciones[socket.id]=null;
      }
    });
    socket.on("mapaPixeles",(data)=>{
      if(pixelesMapa==null){
        pixelesMapa=data;
      }
    });
    socket.on('disconnect', function(){
          console.log('desconectado ' +socket.id);
          posiciones[socket.id]=null;
          usuarios.splice(usuarios.indexOf(socket),1);
      });
  });

}
