(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  // If a browser runtime error occurs, show it in the game instead of leaving a silent black screen.
  window.addEventListener("error", (event) => {
    const screen = document.getElementById("start-screen");
    if (!screen) return;
    screen.classList.remove("hidden");
    screen.innerHTML = '<div class="screen-kicker">GRID ERROR</div><h2>CONNECTION<br><span>INTERRUPTED.</span></h2><p class="screen-copy">Recarga la página. Si vuelve a pasar, comparte este mensaje: ' +
      String(event.message || "error desconocido").replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])) +
      '</p><button class="primary-button" type="button" onclick="location.reload()">RELOAD GAME <span>↻</span></button>';
  });
  const startScreen = document.getElementById("start-screen");
  const endScreen = document.getElementById("end-screen");
  const startButton = document.getElementById("start-button");
  const endButton = document.getElementById("end-button");
  const pauseTag = document.getElementById("pause-tag");
  const levelLabel = document.getElementById("level-label");
  const scoreLabel = document.getElementById("score-label");
  const threatLabel = document.getElementById("threat-label");
  const endKicker = document.getElementById("end-kicker");
  const endTitle = document.getElementById("end-title");
  const endCopy = document.getElementById("end-copy");

  const W = canvas.width;
  const H = canvas.height;
  const FLOOR = 468;
  const GRAVITY = 0.62;
  const keys = new Set();
  const characters = {
    ghost: { name: "GHOST", color: "#6cf4e8", speed: 3.65, jump: 12.8 },
    glitch: { name: "GLITCH", color: "#ff477e", speed: 4.25, jump: 12.2 },
    echo: { name: "ECHO", color: "#b6ff5c", speed: 3.5, jump: 14.2 }
  };
  const levels = [
    {
      name: "THE CITY",
      width: 2650,
      agentSpeed: 1.22,
      platforms: [
        {x:0,y:FLOOR,w:510,h:72},{x:590,y:FLOOR,w:370,h:72},
        {x:1040,y:FLOOR,w:350,h:72},{x:1470,y:FLOOR,w:410,h:72},
        {x:1960,y:FLOOR,w:690,h:72},
        {x:270,y:370,w:145,h:16},{x:690,y:335,w:130,h:16},
        {x:900,y:390,w:100,h:16},{x:1150,y:350,w:155,h:16},
        {x:1530,y:320,w:140,h:16},{x:1740,y:380,w:100,h:16},
        {x:2030,y:345,w:155,h:16},{x:2260,y:300,w:140,h:16}
      ],
      hazards:[{x:405,w:52},{x:780,w:55},{x:1240,w:50},{x:1650,w:58},{x:2110,w:52}],
      fragments:[{x:320,y:335},{x:735,y:300},{x:955,y:355},{x:1215,y:315},{x:1590,y:285},{x:1780,y:345},{x:2090,y:310},{x:2325,y:265}],
      booth:2490
    },
    {
      name: "THE SUBWAY",
      width: 3000,
      agentSpeed: 1.52,
      platforms: [
        {x:0,y:FLOOR,w:350,h:72},{x:430,y:FLOOR,w:350,h:72},
        {x:860,y:FLOOR,w:390,h:72},{x:1340,y:FLOOR,w:350,h:72},
        {x:1770,y:FLOOR,w:400,h:72},{x:2250,y:FLOOR,w:750,h:72},
        {x:160,y:375,w:125,h:16},{x:500,y:330,w:125,h:16},
        {x:700,y:380,w:95,h:16},{x:940,y:345,w:145,h:16},
        {x:1160,y:300,w:115,h:16},{x:1420,y:365,w:125,h:16},
        {x:1600,y:315,w:130,h:16},{x:1870,y:350,w:150,h:16},
        {x:2070,y:300,w:115,h:16},{x:2340,y:350,w:145,h:16},
        {x:2570,y:310,w:145,h:16}
      ],
      hazards:[{x:280,w:48},{x:570,w:48},{x:1000,w:52},{x:1480,w:50},{x:1920,w:52},{x:2390,w:50}],
      fragments:[{x:205,y:340},{x:540,y:295},{x:740,y:345},{x:1000,y:310},{x:1210,y:265},{x:1470,y:330},{x:1660,y:280},{x:1935,y:315},{x:2110,y:265},{x:2400,y:315},{x:2635,y:275}],
      booth:2820
    },
    {
      name: "THE MAINFRAME",
      width: 3250,
      agentSpeed: 1.8,
      platforms: [
        {x:0,y:FLOOR,w:300,h:72},{x:390,y:FLOOR,w:310,h:72},
        {x:780,y:FLOOR,w:320,h:72},{x:1180,y:FLOOR,w:330,h:72},
        {x:1590,y:FLOOR,w:320,h:72},{x:1990,y:FLOOR,w:330,h:72},
        {x:2400,y:FLOOR,w:850,h:72},
        {x:95,y:375,w:110,h:16},{x:440,y:325,w:115,h:16},
        {x:620,y:370,w:90,h:16},{x:830,y:335,w:120,h:16},
        {x:1010,y:285,w:105,h:16},{x:1240,y:355,w:115,h:16},
        {x:1420,y:305,w:110,h:16},{x:1640,y:355,w:125,h:16},
        {x:1820,y:290,w:120,h:16},{x:2040,y:340,w:120,h:16},
        {x:2220,y:285,w:105,h:16},{x:2450,y:350,w:125,h:16},
        {x:2670,y:305,w:120,h:16},{x:2880,y:265,w:120,h:16}
      ],
      hazards:[{x:205,w:45},{x:485,w:48},{x:875,w:48},{x:1285,w:48},{x:1695,w:48},{x:2110,w:48},{x:2490,w:48},{x:2730,w:48}],
      fragments:[{x:145,y:340},{x:480,y:290},{x:660,y:335},{x:870,y:300},{x:1060,y:250},{x:1280,y:320},{x:1460,y:270},{x:1680,y:320},{x:1870,y:255},{x:2090,y:305},{x:2260,y:250},{x:2500,y:315},{x:2725,y:270},{x:2930,y:230}],
      booth:3070
    }
  ];

  let selectedCharacter = "ghost";
  let player, agents, platforms, hazards, fragments, booth, levelIndex, score, cameraX, state, lastTime, elapsed, particles, codeRain, level;
  let bestScore = 0;
  try { bestScore = Number(localStorage.getItem("afterDarkBest") || 0); } catch (_) {}

  function resetGame() {
    levelIndex = 0;
    score = 0;
    loadLevel();
    state = "playing";
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    pauseTag.classList.add("hidden");
    canvas.focus();
    lastTime = performance.now();
  }

  function loadLevel() {
    level = levels[levelIndex];
    platforms = level.platforms.map(p => ({...p}));
    hazards = level.hazards.map(h => ({...h, y:FLOOR-20}));
    fragments = level.fragments.map((f,i) => ({...f, r:7, taken:false, phase:i*1.7}));
    booth = {x:level.booth,y:FLOOR-90,w:42,h:90};
    const stats = characters[selectedCharacter];
    player = {x:55,y:FLOOR-42,w:24,h:38,vx:0,vy:0,onGround:false,face:1,color:stats.color,speed:stats.speed,jump:stats.jump,invulnerable:0};
    agents = [{x:player.x-220,y:FLOOR-40,w:24,h:38,offset:0},{x:player.x-340,y:FLOOR-40,w:24,h:38,offset:1}];
    cameraX = 0;
    particles = [];
    elapsed = 0;
    codeRain = Array.from({length:90},(_,i)=>({x:(i*137)%W,y:(i*71)%H,speed:0.5+(i%5)*0.22,alpha:0.08+(i%4)*0.035,char:["0","1","<",">","/",";"][i%6]}));
    levelLabel.textContent = String(levelIndex+1).padStart(2,"0")+" / 03";
    threatLabel.textContent = "ACTIVE";
  }

  function setEnd(won) {
    state = won ? "complete" : "dead";
    endScreen.classList.remove("hidden");
    pauseTag.classList.add("hidden");
    if (won) {
      if (levelIndex < levels.length-1) {
        endKicker.textContent = "SECTOR "+String(levelIndex+1).padStart(2,"0")+" CLEARED";
        endTitle.innerHTML = "YOU FOUND<br><span>A WAY OUT.</span>";
        endCopy.textContent = "The line is still open. One more sector to go.";
        endButton.innerHTML = 'NEXT SECTOR <span>↗</span>';
      } else {
        endKicker.textContent = "CONNECTION RESTORED";
        endTitle.innerHTML = "YOU BEAT<br><span>THE SYSTEM.</span>";
        endCopy.textContent = "All sectors cleared. You were never part of their code.";
        endButton.innerHTML = 'RUN IT AGAIN <span>↻</span>';
        threatLabel.textContent = "ESCAPED";
      }
    } else {
      endKicker.textContent = "CONNECTION LOST";
      endTitle.innerHTML = "THEY FOUND<br><span>YOU.</span>";
      endCopy.textContent = "Keep moving. The system only wins if you stop.";
      endButton.innerHTML = 'TRY AGAIN <span>↻</span>';
      threatLabel.textContent = "CAUGHT";
    }
  }

  function jump() {
    if (state !== "playing") return;
    if (player.onGround) {
      player.vy = -player.jump;
      player.onGround = false;
      burst(player.x+player.w/2,player.y+player.h,5,player.color);
    }
  }

  function burst(x,y,count,color) {
    for(let i=0;i<count;i++) particles.push({x,y,vx:(Math.random()-.5)*3,vy:-Math.random()*2.5,life:24+Math.random()*15,color});
  }

  function update(dt) {
    if (state !== "playing") return;
    elapsed += dt;
    const step = Math.min(dt/16.67,2);
    const stats = characters[selectedCharacter];
    const movingLeft = keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
    const movingRight = keys.has("ArrowRight") || keys.has("d") || keys.has("D");
    if(movingLeft && !movingRight){player.vx=-player.speed;player.face=-1;}
    else if(movingRight && !movingLeft){player.vx=player.speed;player.face=1;}
    else player.vx=0;
    const oldBottom = player.y+player.h;
    player.x = Math.max(0,Math.min(level.width-player.w,player.x+player.vx*step));
    player.vy += GRAVITY*step;
    player.y += player.vy*step;
    player.onGround = false;

    for(const p of platforms){
      const horizontal = player.x+player.w>p.x && player.x<p.x+p.w;
      if(horizontal && oldBottom<=p.y+5 && player.y+player.h>=p.y && player.vy>=0){
        player.y=p.y-player.h;player.vy=0;player.onGround=true;
      }
    }
    if(player.y>H+150){setEnd(false);return;}

    for(const f of fragments){
      if(f.taken)continue;
      const dx=(player.x+player.w/2)-f.x,dy=(player.y+player.h/2)-f.y;
      if(Math.hypot(dx,dy)<24){f.taken=true;score++;burst(f.x,f.y,10,"#b6ff5c");}
    }

    for(const h of hazards){
      if(player.x+player.w>h.x+5 && player.x<h.x+h.w-5 && player.y+player.h>h.y+8){
        setEnd(false);return;
      }
    }

    for(const agent of agents){
      const target=player.x-8-agent.offset*4;
      if(agent.x<target)agent.x+=level.agentSpeed*step;
      else agent.x+=0.18*step;
      agent.x=Math.min(agent.x,player.x-2);
      if(player.x-agent.x<25 && player.y+player.h>FLOOR-58){setEnd(false);return;}
    }

    player.invulnerable=Math.max(0,player.invulnerable-step);
    const targetCamera=Math.max(0,Math.min(level.width-W,player.x-W*0.34));
    cameraX+=(targetCamera-cameraX)*Math.min(.14*step,1);
    for(const p of particles){p.x+=p.vx*step;p.y+=p.vy*step;p.vy+=.08*step;p.life-=step;}
    particles=particles.filter(p=>p.life>0);
    for(const r of codeRain){r.y+=r.speed*step;if(r.y>H){r.y=-15;r.x=Math.random()*W;}}
    scoreLabel.textContent=String(score).padStart(2,"0");
    if(player.x+player.w>booth.x+10 && player.y+player.h>booth.y+10) setEnd(true);
  }

  function drawBackground() {
    const grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"#07101b");grad.addColorStop(.62,"#101b2a");grad.addColorStop(1,"#17262b");
    ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    const moonX=760-(cameraX*.035)%80;
    ctx.fillStyle="#b6ff5c";ctx.globalAlpha=.08;ctx.beginPath();ctx.arc(moonX,88,46,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
    ctx.fillStyle="#d7ffe7";ctx.globalAlpha=.42;ctx.beginPath();ctx.arc(moonX,88,19,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
    for(let layer=0;layer<3;layer++){
      const parallax=.12+layer*.12;
      const bw=80+layer*22;
      for(let i=-2;i<Math.ceil(W/bw)+3;i++){
        const worldX=i*bw-((cameraX*parallax)%(bw));
        const bh=90+((i*47+layer*29)%130+130)%130;
        const y=FLOOR-bh;
        ctx.fillStyle=["#0a1420","#0c1922","#102027"][layer];
        ctx.fillRect(worldX,y,bw-8,bh);
        ctx.fillStyle=layer===2?"#b6ff5c":"#6cf4e8";
        ctx.globalAlpha=.12;
        for(let wy=y+14;wy<FLOOR-12;wy+=17)for(let wx=worldX+12;wx<worldX+bw-15;wx+=17){
          if(Math.abs(Math.floor(wx+wy+i*3)%5)!==0)ctx.fillRect(wx,wy,3,5);
        }
        ctx.globalAlpha=1;
      }
    }
    ctx.font="12px monospace";
    for(const r of codeRain){ctx.globalAlpha=r.alpha;ctx.fillStyle="#73ffb3";ctx.fillText(r.char,r.x,r.y);}
    ctx.globalAlpha=1;
    const fog=ctx.createLinearGradient(0,FLOOR-80,0,FLOOR+60);
    fog.addColorStop(0,"#6cf4e800");fog.addColorStop(1,"#6cf4e81a");
    ctx.fillStyle=fog;ctx.fillRect(0,FLOOR-80,W,100);
  }

  function drawPlatform(p) {
    const x=p.x-cameraX;
    if(x+p.w<0||x>W)return;
    ctx.fillStyle="#111d25";ctx.fillRect(x,p.y,p.w,p.h);
    ctx.fillStyle="#2b4b4d";ctx.fillRect(x,p.y,p.w,3);
    ctx.fillStyle="#6cf4e8";ctx.globalAlpha=.28;ctx.fillRect(x,p.y,p.w,1);ctx.globalAlpha=1;
    ctx.strokeStyle="#24373d";ctx.lineWidth=1;ctx.strokeRect(x+.5,p.y+.5,p.w-1,p.h-1);
    for(let sx=x+13;sx<x+p.w-8;sx+=31){ctx.fillStyle="#23383d";ctx.fillRect(sx,p.y+14,12,2);}
  }

  function drawHazard(h) {
    const x=h.x-cameraX;
    if(x+h.w<0||x>W)return;
    ctx.fillStyle="#ff477e";ctx.shadowColor="#ff477e";ctx.shadowBlur=12;
    const n=Math.max(2,Math.floor(h.w/14));
    for(let i=0;i<n;i++){ctx.beginPath();ctx.moveTo(x+i*h.w/n,h.y+20);ctx.lineTo(x+(i+.5)*h.w/n,h.y);ctx.lineTo(x+(i+1)*h.w/n,h.y+20);ctx.fill();}
    ctx.shadowBlur=0;
  }

  function drawFragment(f) {
    if(f.taken)return;
    const x=f.x-cameraX,y=f.y+Math.sin(elapsed*.004+f.phase)*4;
    if(x<-20||x>W+20)return;
    ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);ctx.fillStyle="#b6ff5c";ctx.shadowColor="#b6ff5c";ctx.shadowBlur=18;ctx.fillRect(-5,-5,10,10);ctx.restore();ctx.shadowBlur=0;
    ctx.fillStyle="#e9ffc7";ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();
  }

  function drawBooth() {
    const x=booth.x-cameraX,y=booth.y;
    if(x<-100||x>W+100)return;
    ctx.save();
    ctx.shadowColor="#6cf4e8";ctx.shadowBlur=30;
    ctx.fillStyle="#6cf4e8";ctx.globalAlpha=.1;ctx.fillRect(x-15,y-15,booth.w+30,booth.h+15);
    ctx.globalAlpha=1;ctx.shadowBlur=0;
    ctx.fillStyle="#102c30";ctx.fillRect(x,y,booth.w,booth.h);
    ctx.strokeStyle="#6cf4e8";ctx.lineWidth=2;ctx.strokeRect(x+1,y+1,booth.w-2,booth.h-2);
    ctx.fillStyle="#6cf4e8";ctx.fillRect(x+5,y+6,booth.w-10,5);
    ctx.fillStyle="#1c4547";ctx.fillRect(x+7,y+17,booth.w-14,42);
    ctx.strokeStyle="#b6ff5c";ctx.lineWidth=1;ctx.strokeRect(x+10,y+20,booth.w-20,36);
    ctx.fillStyle="#b6ff5c";ctx.font="bold 9px monospace";ctx.textAlign="center";ctx.fillText("CALL",x+booth.w/2,y+39);
    ctx.fillStyle="#6cf4e8";ctx.fillRect(x+booth.w-10,y+64,3,4);
    ctx.fillStyle="#a4c5c1";ctx.fillRect(x+10,y+66,booth.w-20,3);
    ctx.fillStyle="#6cf4e8";ctx.font="9px monospace";ctx.fillText("EXIT",x+booth.w/2,y-12);
    ctx.restore();
  }

  function drawCharacter(x,y,color,face,isAgent=false) {
    ctx.save();ctx.translate(x,y);
    if(face<0){ctx.translate(24,0);ctx.scale(-1,1);}
    if(isAgent){
      ctx.shadowColor="#ff477e";ctx.shadowBlur=14;
      ctx.fillStyle="#11151c";ctx.fillRect(3,2,18,34);
      ctx.fillStyle="#ff477e";ctx.fillRect(4,8,16,7);
      ctx.fillStyle="#ffe4ed";ctx.fillRect(7,10,3,3);ctx.fillRect(15,10,3,3);
      ctx.fillStyle="#ff477e";ctx.fillRect(5,37,5,3);ctx.fillRect(15,37,5,3);
      ctx.restore();return;
    }
    ctx.shadowColor=color;ctx.shadowBlur=13;
    ctx.fillStyle="#081016";ctx.fillRect(2,7,20,25);
    ctx.fillStyle=color;ctx.fillRect(5,1,14,15);
    ctx.fillStyle="#081016";ctx.fillRect(8,6,3,4);ctx.fillRect(14,6,3,4);
    ctx.fillStyle=color;ctx.globalAlpha=.8;ctx.fillRect(4,18,16,14);ctx.globalAlpha=1;
    ctx.fillStyle="#0b141a";ctx.fillRect(6,31,5,7);ctx.fillRect(14,31,5,7);
    ctx.fillStyle=color;ctx.fillRect(4,37,8,2);ctx.fillRect(13,37,8,2);
    ctx.fillStyle="#eafff9";ctx.globalAlpha=.6;ctx.fillRect(7,19,2,9);ctx.globalAlpha=1;
    ctx.restore();
  }

  function draw() {
    drawBackground();
    if(!player){
      ctx.fillStyle="#b6ff5c";ctx.font="12px monospace";ctx.fillText("INITIALIZING GRID...",30,40);return;
    }
    for(const p of platforms)drawPlatform(p);
    for(const h of hazards)drawHazard(h);
    for(const f of fragments)drawFragment(f);
    drawBooth();
    for(const a of agents)drawCharacter(a.x-cameraX,a.y,"#ff477e",1,true);
    const blink=player.invulnerable>0&&Math.floor(elapsed/80)%2===0;
    if(!blink)drawCharacter(player.x-cameraX,player.y,player.color,player.face);
    for(const p of particles){ctx.globalAlpha=Math.max(0,p.life/35);ctx.fillStyle=p.color;ctx.fillRect(p.x-cameraX,p.y,3,3);}
    ctx.globalAlpha=1;
    // Tiny mission label and progress line.
    ctx.fillStyle="#c2d8d2";ctx.globalAlpha=.8;ctx.font="10px monospace";ctx.fillText(level.name+" // "+characters[selectedCharacter].name,18,24);ctx.globalAlpha=1;
    ctx.fillStyle="#24383a";ctx.fillRect(18,35,120,2);ctx.fillStyle="#b6ff5c";ctx.fillRect(18,35,120*Math.min(1,player.x/booth.x),2);
    ctx.fillStyle="#8ba09c";ctx.font="9px monospace";ctx.textAlign="right";ctx.fillText("BEST "+String(bestScore).padStart(2,"0"),W-18,24);ctx.textAlign="left";
  }

  function loop(now) {
    try {
      const dt=Math.min(now-(lastTime||now),34);lastTime=now;
      if(state==="playing")update(dt);
      draw();
    } catch (error) {
      console.error("After Dark game loop error:", error);
      const screen = document.getElementById("start-screen");
      if (screen) {
        screen.classList.remove("hidden");
        screen.innerHTML = '<div class="screen-kicker">GRID ERROR</div><h2>CONNECTION<br><span>INTERRUPTED.</span></h2><p class="screen-copy">Error del juego: ' + String(error.message || error).replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])) + '</p><button class="primary-button" type="button" onclick="location.reload()">RELOAD GAME <span>↻</span></button>';
      }
      return;
    }
    requestAnimationFrame(loop);
  }

  document.querySelectorAll(".character-card").forEach(button=>{
    button.addEventListener("click",()=>{
      selectedCharacter=button.dataset.character;
      document.querySelectorAll(".character-card").forEach(card=>card.classList.toggle("selected",card===button));
    });
  });
  startButton.addEventListener("click",resetGame);
  endButton.addEventListener("click",()=>{
    if(state==="complete"&&levelIndex<levels.length-1){levelIndex++;loadLevel();state="playing";endScreen.classList.add("hidden");canvas.focus();}
    else resetGame();
  });

  window.addEventListener("keydown",event=>{
    const key=event.key;
    if(["ArrowLeft","ArrowRight","ArrowUp"," ","ArrowDown"].includes(key))event.preventDefault();
    keys.add(key);
    if((key===" "||key==="ArrowUp"||key==="w"||key==="W")&&!event.repeat)jump();
    if((key==="p"||key==="P")&&state==="playing"){state="paused";pauseTag.classList.remove("hidden");}
    else if((key==="p"||key==="P")&&state==="paused"){state="playing";pauseTag.classList.add("hidden");lastTime=performance.now();}
    if((key==="Enter"||key===" ")&&state==="dead"){resetGame();}
    if(state==="playing"&&key==="Escape"){state="paused";pauseTag.classList.remove("hidden");}
    else if(state==="paused"&&key==="Escape"){state="playing";pauseTag.classList.add("hidden");lastTime=performance.now();}
  });
  window.addEventListener("keyup",event=>keys.delete(event.key));
  window.addEventListener("blur",()=>keys.clear());

  // Touch controls are created here so the game remains usable on phones.
  const touchControls=document.createElement("div");
  touchControls.className="touch-controls";
  touchControls.innerHTML='<button type="button" aria-label="Mover a la izquierda" data-key="ArrowLeft">←</button><button type="button" aria-label="Mover a la derecha" data-key="ArrowRight">→</button><button type="button" aria-label="Saltar" data-jump="true">JUMP ↗</button>';
  document.querySelector(".game-panel").appendChild(touchControls);
  touchControls.querySelectorAll("button").forEach(button=>{
    const down=e=>{e.preventDefault();if(button.dataset.jump)jump();else keys.add(button.dataset.key);};
    const up=e=>{e.preventDefault();if(button.dataset.key)keys.delete(button.dataset.key);};
    button.addEventListener("pointerdown",down);
    ["pointerup","pointercancel","pointerleave"].forEach(type=>button.addEventListener(type,up));
  });

  // Remember the best fragment count locally when a run ends.
  const originalSetEnd=setEnd;
  setEnd=function(won){
    originalSetEnd(won);
    if(score>bestScore){bestScore=score;try{localStorage.setItem("afterDarkBest",String(bestScore));}catch(_){}}
  };

  loadLevel();
  state="menu";
  requestAnimationFrame(loop);
})();