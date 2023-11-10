// Soltar chispas al rebotar, no crear estrellas con set timeout
var canvas = document.querySelector("canvas"),
    c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var unAltura = canvas.height/8,
    unAncho = canvas.width/8;


function crearFondo(){
    c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(0, 0, 0, 0)";
  
  c.fillStyle="rgba(42,71,87, 0)";
  c.beginPath();
  c.moveTo(0, unAltura * 6);
  c.lineTo(unAncho * 4, unAltura * 0.7);
  c.lineTo(unAncho * 8, unAltura * 6);
  c.lineTo(0, unAltura * 6);
  c.fill();
  c.closePath();

  c.fillStyle ="rgba(32,55,67, 0)";
  c.beginPath();
  c.moveTo(0, unAltura * 8);
  c.lineTo(0, unAltura * 5);
  c.lineTo(unAncho * 1.5, unAltura * 2);
  c.lineTo(unAncho * 4, unAltura * 6);
  c.lineTo(unAncho * 6.5, unAltura * 2);
  c.lineTo(unAncho*8 , unAltura * 5);
  c.lineTo(unAncho*8, unAltura * 8);
  c.lineTo(0, unAltura * 8 );
  c.fill();
  c.closePath();

  c.fillStyle="rgba(26,44,54, 0)";
  c.beginPath();
  c.moveTo(0, unAltura * 8);
  c.lineTo(0, unAltura * 6);
  c.lineTo(unAncho*1.3, unAltura *4);
  c.lineTo(unAncho*2.6, unAltura * 6);
  c.lineTo(unAncho*3.9, unAltura *4);
  c.lineTo(unAncho*5.2, unAltura * 6);
  c.lineTo(unAncho*6.5, unAltura *4);
  c.lineTo(unAncho*8, unAltura * 6);
  c.lineTo(unAncho*8, unAltura *8);
  c.fill();
};


// Propiedades fijas
let velInicialX = 3,
    velInicialY = 0.1,
    cocienteRebote = 0.6,
    gravedad = 0.1,
    estrellas ={},
    indiceEstrellas = 0;

function Estrella(){
  this.radio = 5 + (Math.random() * 10);
  this.inicialX = this.radio + (Math.random() * (canvas.width - (this.radio*2)));
  this.inicialY = -100 + (Math.random() * - 500);
  this.x = this.inicialX;
  this.y = this.inicialY;
  this.velX = velInicialX;
  this.velY = velInicialY;
  this.life = 0;
  this.maxLife = 4;
  indiceEstrellas++;
  estrellas[indiceEstrellas] = this;
  this.id = indiceEstrellas;
};

Estrella.prototype.actualizar = function (){
  
  // Tiempo de vida
  if (this.life >= this.maxLife || this.radio <1.5){
      delete estrellas[this.id];
  }
  
  // Rebote en las paredes
  if (this.x + this.velX > canvas.width- this.radio ||
      this.x + this.velX < this.radio){
    this.velX = -this.velX;
  }
  
  // Rebote en el suelo 
  if (this.y + this.velY + this.radio > canvas.height ){
    this.velY = - this.velY * cocienteRebote;
    this.velX = this.velX * (cocienteRebote + 0.3);
    this.radio = this.radio * cocienteRebote;
    this.life++;
    // Llamar a funcion que suelte chispas
    for (var i = Math.round(Math.random() * 6); i<7; i++){
      // new Chispas(this.x, this.y);
    }
  }
  
  this.x += this.velX;
  this.y += this.velY;
  this.velY += gravedad;
};

Estrella.prototype.dibujar = function (){
  c.beginPath();
  c.fillStyle="white";
  c.shadowBlur = 20;
  c.shadowColor = "darkred";
  c.arc(this.x,this.y, this.radio, 0, Math.PI * 2, false);
  c.fill();
  this.actualizar();
}

function Chispas(inicialX, inicialY){
  this.x = inicialX;
  this.y = inicialY;
};


setInterval(()=>{new Estrella()}, 200);

function animacion (){
  crearFondo();
  for (var i in estrellas){
    estrellas[i].dibujar();
  }
  requestAnimationFrame(animacion);
  // console.table(estrellas);
}
animacion(); 

