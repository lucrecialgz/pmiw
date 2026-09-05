   // Lucrecia Leguizamon comision: 3
   
   let animacion = [];
   let animacionExplosion = [];

   let estadoActual = "AVANZAR"; 
   let posX = 400;
   let posY = 520; 

   let frameActual = 0;
   let frameExplosionActual = 0;
   let velocidadFuego = 70;
   let tiempoAnterior = 0;

   let tiempoInicio = 0;
   let tiempoExplotar = 2000; 

   function preload() {
   let nombresAuto = ['auto.png'];
   let nombresFuego = ['fuego1.png', 'fuego2.png'];

    for (let i = 0; i < nombresAuto.length; i++) {
    animacion[i] = loadImage(nombresAuto[i]);
    }

    for (let i = 0; i < nombresFuego.length; i++) {
    animacionExplosion[i] = loadImage(nombresFuego[i]);
    }
    }

     function setup() {
     createCanvas(800, 600);
     noSmooth();
     tiempoInicio = millis();
     }

     function draw() {
     dibujarFondoPista();

     if (estadoActual !== "FUEGO") {
     posY -= 1.5; 

     if (millis() - tiempoInicio > tiempoExplotar) {
      estadoActual = "FUEGO";
      frameExplosionActual = 0;
      }
      }

      if (millis() - tiempoAnterior > velocidadFuego * 16.6) {
      if (estadoActual === "FUEGO") {
      if (animacionExplosion.length > 0) {
        frameExplosionActual = (frameExplosionActual + 1) % animacionExplosion.length;
        }
     } else {
       if (animacion.length > 0) {
        frameActual = (frameActual + 1) % animacion.length;
      }
    }
    tiempoAnterior = millis();
    }

    if (estadoActual === "FUEGO") {
    dibujoExplosion(animacionExplosion, posX, posY); 
      } else {
    dibujoAnimacion(animacion, posX, posY); 
    }
   }

   function escalaAuto(posicionY) {
   return map(posicionY, 200, 600, 0.4, 1.2);
    }

    function dibujarFondoPista() {
     background(112, 208, 65);
      noStroke();

     fill(24, 20, 120);
     quad(385, 0, 415, 0, 720, 600, 80, 600);

     fill(110, 110, 110);
     quad(390, 0, 410, 0, 700, 600, 100, 600);
 
      fill(255);
     quad(399, 10, 401, 10, 402, 30, 398, 30);
     quad(398, 60, 402, 60, 403, 100, 397, 100);
     quad(397, 150, 403, 150, 405, 230, 395, 230);
     quad(395, 300, 405, 300, 407, 430, 393, 430);
     quad(393, 500, 407, 500, 409, 600, 391, 600);
   }

    function dibujoAnimacion(frames, x, y) {
    let escala = escalaAuto(y);
    let reboteY = sin(frameCount * 0.3) * 3;
    let multiplicadorTamano = 2.0; 

    imageMode(CENTER);
     if (frames && frames[0]) {
    image(frames[0], x, y + reboteY, 100 * escala, 80 * escala);
  } else {
    dibujoAuto(x, y + reboteY, escala * multiplicadorTamano);
  }
  }

   function dibujoExplosion(frames, x, y) {
   let escala = escalaAuto(y);
   let pulsacion = sin(frameCount * 0.5) * 4;
   let multiplicadorFuego = 2.0; 

     imageMode(CENTER);
     let img = frames[frameExplosionActual];
     if (img) {
    image(img, x, y, (120 + pulsacion) * escala, (120 + pulsacion) * escala);
    } else if (frames[0]) {
    image(frames[0], x, y, (120 + pulsacion) * escala, (120 + pulsacion) * escala);
    } else {
    dibujoFuego(x, y, escala * multiplicadorFuego);
      }
     }

   //otras funciones

    function dibujoAuto(x, y, escala) {
    push();
   translate(x, y);
   scale(escala);
   rectMode(CENTER);
  
   fill(30, 40, 180);
   rect(0, 0, 32, 40, 6);
  
   fill(200, 220, 255);
   rect(0, -6, 26, 14, 2);
  
   fill(0);
   rect(-18, -12, 6, 12);
   rect(18, -12, 6, 12);
   rect(-18, 12, 6, 12);
   rect(18, 12, 6, 12);
  
   fill(255, 50, 50);
   rect(-10, 18, 6, 3);
   rect(10, 18, 6, 3);
  
   pop();
    }

    function dibujoFuego(x, y, escala) {
    push();
    translate(x, y);
    scale(escala);
    noStroke();

    let tamBase = 45 + sin(frameCount * 0.8) * 12;
  
     fill(255, 150, 0, 200);
     ellipse(random(-15, 15), random(-25, -10), random(4, 8));

     fill(255, 50, 0);
     ellipse(0, 0, tamBase, tamBase * 1.1);
  
      fill(255, 180, 0);
      ellipse(0, 2, tamBase * 0.65, tamBase * 0.75);
  
      fill(255, 255, 150);
      ellipse(0, 4, tamBase * 0.35, tamBase * 0.45);
      pop();
     }

     function keyPressed() {
    if (key === 'r' || key === 'R') {
    estadoActual = "AVANZAR";
    posX = width / 2;
    posY = 520;
    frameActual = 0;
    frameExplosionActual = 0;
    tiempoAnterior = millis();
    tiempoInicio = millis();
    }
   }
