const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>`);
var canvas=dom.window.document.createElement("canvas");
canvas.width=1200;
canvas.width=637;
ancho=1200;
alto=637;
var objeto=canvas.getContext("2d");
objeto.fillStyle="yellow";
objeto.fillRect(0,0,ancho,alto);
console.log(objeto.getImageData(0,0,ancho,alto));
