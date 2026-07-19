let scene,camera,renderer,player;
let obstacles=[];
let score=0;
let best=localStorage.best||0;
let jumpPower=0;
let move=0;
let speed=0.18;
let playing=true;

document.getElementById('left').ontouchstart=()=>move=-1;
document.getElementById('right').ontouchstart=()=>move=1;
document.getElementById('jump').ontouchstart=()=>{if(player.position.y<=.76)jumpPower=.25};

scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
scene.fog=new THREE.Fog(0x87ceeb,10,100);

camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,500);
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
document.getElementById('game').appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff,0x555555,2));

let ground=new THREE.Mesh(new THREE.BoxGeometry(12,.2,300),new THREE.MeshStandardMaterial({color:0x45aa45}));
ground.position.z=-120;
scene.add(ground);

player=new THREE.Mesh(new THREE.BoxGeometry(1,1.5,1),new THREE.MeshStandardMaterial({color:0x3366ff}));
player.position.y=.75;
scene.add(player);

function addObstacle(){
 let o=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0xff3333}));
 o.position.set((Math.floor(Math.random()*3)-1)*2,.5,-80);
 scene.add(o);
 obstacles.push(o);
}
setInterval(()=>{if(playing)addObstacle()},1800);

function gameOver(){
 playing=false;
 if(score>best){best=score;localStorage.best=best}
 alert('GAME OVER\n점수: '+score+'\n최고: '+best);
 location.reload();
}

function update(){
 if(!playing)return;
 player.position.z-=speed;
 player.position.x+=move*.08;
 move=0;
 if(player.position.x>2)player.position.x=2;
 if(player.position.x<-2)player.position.x=-2;
 jumpPower-=.012;
 player.position.y+=jumpPower;
 if(player.position.y<.75){player.position.y=.75;jumpPower=0}

 obstacles.forEach((o,i)=>{
  o.position.z+=speed;
  if(o.position.z>player.position.z+10){scene.remove(o);obstacles.splice(i,1)}
  if(Math.abs(o.position.z-player.position.z)<1&&Math.abs(o.position.x-player.position.x)<1)gameOver();
 });
 score++;
 document.getElementById('score').textContent=score;
 camera.position.set(player.position.x,3,player.position.z+6);
 camera.lookAt(player.position);
}

function loop(){requestAnimationFrame(loop);update();renderer.render(scene,camera)}
loop();

onresize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)};