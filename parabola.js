var c = document.getElementById("lienzito");
var pizarra = c.getContext("2d");
pizarra.font = "bold 13px sans-serif";
document.addEventListener("keydown", flechitas);
var fire = 0;
var velocidad = 100;
var angulo = 45;
var radio = 10;
var colorProyectil = "black";
var velocidad = [100]; //se controla por teclado
var anguloCanon=[45]; //se controla por teclado
var tiempo = [0];
var radioCanon= radio+3;
var pCanon = 30;  // posición inicial del proyectil (pCanon,c.heigth-pCanon)
var colorCanon= "green";
var g=100;

animacion_proyectil();

function animacion_proyectil ()
{
  pizarra.clearRect(0,0,c.width,c.height);
  dibujarRectangulo("grey",0,0,c.width,c.height,pizarra); //contorno del canvas
  pizarra.fillText("angulo : "+ anguloCanon[fire],2*pCanon+20,c.height-40);
  pizarra.fillText("velocidad : "+ velocidad[fire],2*pCanon+20,c.height-20);
  pizarra.fillText("Canon",pCanon-19,c.height-5);
  dibujarCanon(colorCanon,radioCanon,anguloCanon[fire],pCanon,pizarra);
  dibujarRectangulo(colorCanon,2*pCanon+20,c.height-15,500,6,pizarra);
  dibujarLinea(colorProyectil,2*pCanon+20,c.height-12,2*pCanon+20+velocidad[fire],c.height-12,pizarra);
  velocidad[fire+1]=velocidad[fire];
  anguloCanon[fire+1]=anguloCanon[fire];
  if(fire>=1)
  {
    for(i=0; i<tiempo.length-1; i++)
    {
      dibujarProyectil(colorProyectil,radio,velocidad[i],anguloCanon[i],pCanon,0.05*tiempo[i],pizarra);
      if(fire>=i+1)
      {
        tiempo[i]=tiempo[i]+0.1;
      }
    }
  }
  setTimeout(animacion_proyectil,1);
}

function flechitas(tecla)
{
  if (tecla.keyCode==38)
  {
    anguloCanon[fire]=anguloCanon[fire]+3;
    console.log("angulo = "+anguloCanon[fire]);
  }
  if (tecla.keyCode==40)
  {
    anguloCanon[fire]=anguloCanon[fire]-3;
    console.log("angulo = "+anguloCanon[fire]);
  }
  if (tecla.keyCode==39)
  {
    velocidad[fire]=velocidad[fire]+5;
    console.log("velocidad = "+ velocidad[fire]);
  }
  if (tecla.keyCode==37)
  {
    velocidad[fire]=velocidad[fire]-5;
    console.log("velocidad = "+ velocidad[fire]);
  }

  if (tecla.keyCode==32)
  {
      fire = fire+1;
      tiempo[fire]=0;
      console.log("FUEGO!! "+ fire +" : "+ anguloCanon[fire]);
  }
}

function dibujarProyectil(color,r,vel,ang,p,t,lienzo)
{
  var alt= c.height;
  var xi= p;  //la posición inicial depende del parámetro del Cañon
  var yi= alt-p;
  ang=ang*Math.PI/180;
  var vxi= vel*Math.cos(ang);
  var vyi= vel*Math.sin(ang);
  var x= xi+vxi*t;
  var y= yi-(vyi*t-0.5*g*t*t);
  dibujarCirculo(color,x,y,r,lienzo);
}

function dibujarCanon(color,r,ang,p,lienzo)
{
  var alto = c.height;
  ang=ang*Math.PI/180;
  seno=Math.sin(ang);
  coseno=Math.cos(ang);
  var ax= p-r*seno;
  var ay= alto-p-r*coseno;
  var bx= ax+p*coseno;
  var by= ay-p*seno;
  var dx= ax+2*r*seno;
  var dy= ay+2*r*coseno;
  var cx= dx+p*coseno;
  var cy= dy-p*seno;
  dibujarLinea(color,0,alto,2*p,alto,lienzo);
  dibujarLinea(color,0,alto,p-r,alto-p,lienzo);
  dibujarCirculo(color,p,alto-p,r,lienzo);
  dibujarCirculo(color,p,alto-p,r/4,lienzo);
  dibujarLinea(color,2*p,alto,p+r,alto-p,lienzo);
  dibujarLinea(color,ax,ay,bx,by,lienzo);
  dibujarLinea(color,bx,by,cx,cy,lienzo);
  dibujarLinea(color,cx,cy,dx,dy,lienzo);
}

function dibujarLinea(color,xi,yi,xf,yf,lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 2;
  lienzo.moveTo(xi,yi);
  lienzo.lineTo(xf,yf);
  lienzo.stroke();
  lienzo.closePath();
}
function dibujarCirculo(color,h,k,r,lienzo)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = 2;
  lienzo.arc(h,k,r,0,2*Math.PI,false);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarRectangulo(color,xi,yi,ancho,alto,lienzo)
{
  dibujarLinea(color,xi,yi,xi,yi+alto,lienzo);
  dibujarLinea(color,xi,yi+alto,xi+ancho,yi+alto,lienzo);
  dibujarLinea(color,xi+ancho,yi+alto,xi+ancho,yi,lienzo);
  dibujarLinea(color,xi+ancho,yi,xi,yi,lienzo);
}
