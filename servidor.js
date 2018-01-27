var servidor=function(puerto,url){
  http = require('http').createServer(crearServidor);
  fs=require("fs");
  path=require("path");
  http.listen(puerto,url,()=>{
    console.log("server creado");
  });
 var url=[
    {
      ruta:'',
      salida:'/index0.html',
      type:'text/html'
    },
    {
      ruta:'Controles.js',
      salida:'/Clases/Controles.js',
      type:'text/js'
    },
    {
      ruta:'Mapa.js',
      salida:'/Clases/Mapa.js',
      type:'text/js'
    },
    {
      ruta:'Tanque.js',
      salida:'/Clases/Tanque.js',
      type:'text/js'
    },
    {
      ruta:'Juego.js',
      salida:'/Clases/Juego.js',
      type:'text/js'
    },
    {
      ruta:'Mapa1.js',
      salida:'/Clases/Mapa1.js',
      type:'text/js'
    },
    {
      ruta:'Tanque1.js',
      salida:'/Clases/Tanque1.js',
      type:'text/js'
    },
    {
      ruta:'Login.js',
      salida:'/Clases/Login.js',
      type:'text/js'
    }
  ];
    function crearServidor (req, res) {
      var pathUrl=path.basename(req.url);
      res.writeHead(404,{'Content-Type': 'text/html'});
      url.forEach(function (pos){
        if(pos.ruta.includes(pathUrl)){
          res.writeHead(200, {'Content-Type': pos.type});
          res.end(fs.readFileSync(__dirname+pos.salida));
        }
      })

  }
}
exports.iniciar=servidor;
