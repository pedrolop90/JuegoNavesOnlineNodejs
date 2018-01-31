exports.eventos=function(http){

  var io=require("socket.io")(http);
  usuarios=[];
  posiciones={};
  disparos=[];
  claseMapa= require("./mapa1.js").mapa;
  mapa=new claseMapa();
  claseBoss= require("./Boss.js").boss;
  boss=new claseBoss(mapa.pixelesMapa);

    setInterval( ()=>{
      boss.calcularPosiciones(1)
    } ,10);


  setInterval(()=>{
    var disparoBoss=boss.disparo();
    if(disparoBoss!=null&&usuarios.length>0&&posiciones[usuarios[0].id]!=null){
        disparos.push(disparoBoss);
    }
    for (var i = 0; i < usuarios.length; i++) {
      if(posiciones[usuarios[i].id]!=null){
        usuarios[i].emit("recibirDatos",{'usuarios':posiciones,'disparos':disparos,"boss":boss.posicionActual()});
      }
    }
    for (var i = 0; i < disparos.length; i++) {
       disparos[i].aumentador+=10;
       disparos[i]=calcularPosicion(disparos[i]);
      if(!mapa.pixelesMapa[Math.round(disparos[i].yi+disparos[i].posY)][Math.round(disparos[i].xi+disparos[i].posX)]
      || disparos[i].muerto){
        disparos.splice(i,1);
      }
    }
  },20);

  function calcularPosicion(data){
    var posY=Math.sin( data.angulo)*data.aumentador;
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
      boss.calcularDatosBoss(data,mapa.pixelesMapa);
    });
    socket.on('disparo',(data)=>{
      disparos.push(data);
    })
    socket.on('muerto',(data)=>{
      posiciones[socket.id]=null;
      posiciones[socket.id]=null;
      if(data!=null&&typeof disparos[data.i] !="undefined"){
        disparos[data.i].muerto=true;
      }
    });
    socket.on('disconnect', function(){
          console.log('desconectado ' +socket.id);
          posiciones[socket.id]=null;
          usuarios.splice(usuarios.indexOf(socket),1);
      });
  });

}
