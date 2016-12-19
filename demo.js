function BallObject(elasticity,rad) {

  this.v = { x: 1, y: 5 }; 
  
  this.m = 10;
  this.p = { x: 40, y: 40}; 
  this.r = document.getElementById('m1').value; 
  this.cr = document.getElementById('mu').value; 
}

function draw(obj) {
  ctx.beginPath();
  ctx.arc(obj.p.x, obj.p.y, obj.r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function collide(obj) {
  obj.v.y = (obj.cr * floor.m * -obj.v.y + obj.m * obj.v.y) / (obj.m + floor.m);//resolucion de colision
  if(obj.v.y < -0.5)
  document.getElementById('v2').value = -obj.v.y;
}


function update(obj, dt) {
  //calculo de colision solo en Y para simplificar codigo

  if ((obj.p.y ) > c.height) { 
     obj.p.y = c.height;
     collide(obj);
  }
  obj.v.y += (g * dt);
  obj.p.x += obj.v.x * dt * ppm;
  obj.p.y += obj.v.y * dt * ppm;
}

var d = document,
    br = d.createElement("br"),
    c = d.createElement('canvas'),
    b = d.createElement('button'),
    clr = d.createElement('input'),
    clrl = d.createElement('label'),
    coef = d.createElement('label'),
    radL = d.createElement('label'),
    ctx = c.getContext('2d'),
    fps = 30, 
    ppm = 20, 
    g = 9.8, 
    objs = [],
    floor = {
      v: { x: 0, y: 0 }, 
      m: 5.9722 * Math.pow(10, 24) //Masa de la tierra ja!
    },
    t = new Date().getTime();
    
    

b.innerHTML = 'Agregar Pelota:';
b.onclick = function() { objs.push(new BallObject(document.getElementById('mu').value / 100,document.getElementById('m1').value)); };


clr.type = 'checkbox';
clr.checked = false;

clrl.appendChild(clr);
clrl.appendChild(d.createTextNode('Trazado'));

//element.appendChild(br);

c.style.border = 'solid 1px #3369ff';
c.style.borderRadius = '10px';
c.style.display = 'block';
c.width = 300;
c.height = 200;

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

d.body.appendChild(c);
d.body.appendChild(b);
d.body.appendChild(clrl);
d.body.appendChild(br);
d.body.appendChild(coef);
d.body.appendChild(radL);

setInterval(function() {

  var nt = new Date().getTime(),
      dt = (nt - t) / 1000;

  if (!clr.checked) {
    ctx.clearRect(0, 0, c.width, c.height);
  }

  for (var i = 0; i < objs.length; i++) {
    update(objs[i], dt);
    draw(objs[i]);
  }

  t = nt;

}, 1000 / fps);