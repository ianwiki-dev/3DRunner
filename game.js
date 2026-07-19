let scene,camera,renderer,player;let score=0;let jump=0;let x=0;
scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.1,100);
renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);document.getElementById('game').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xffffff,0x444444,2));
let ground=new THREE.Mesh(new THREE.BoxGeometry(10,.2,200),new THREE.MeshStandardMaterial({color:0x44aa44}));ground.position.z=-80;scene.add(ground);
player=new THREE.Mesh(new THREE.BoxGeometry(1,1.5,1),new THREE.MeshStandardMaterial({color:0x3366ff}));player.position.y=.75;scene.add(player);
let obs=[];
function addObstacle(){let o=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0xff0000}));o.position.set((Math.floor(Math.random()*3)-1)*2,.5,-60);scene.add(o);obs.push(o)}
setInterval(()=>addObstacle(),2000);
document.getElementById('left').ontouchstart=()=>x=-.15;
document.getElementById('right').ontouchstart=()=>x=.15;
document.getElementById('jump').ontouchstart=()=>{if(player.position.y<=.76)jump=.22};
function loop(){requestAnimationFrame(loop);player.position.z-=.15;player.position.x+=x;x=0;jump-=.012;player.position.y+=jump;if(player.position.y<.75){player.position.y=.75;jump=0}obs.forEach(o=>{o.position.z+=.15;if(Math.abs(o.position.z-player.position.z)<1&&Math.abs(o.position.x-player.position.x)<1)alert('GAME OVER');});camera.position.set(player.position.x,3,player.position.z+6);camera.lookAt(player.position);score++;document.getElementById('score').textContent=score;renderer.render(scene,camera)}
loop();