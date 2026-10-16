(() => {
  "use strict";
  const canvas = document.getElementById("game");
  const ctx = canvas && canvas.getContext("2d");
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
  if (!canvas || !ctx || !startScreen || !startButton) return;

  const W = canvas.width, H = canvas.height, FLOOR = 468;
  const chars = {
    ghost: {name:"GHOST", color:"#6cf4e8", speed:3.7, jump:12.5},
    glitch:{name:"GLITCH", color:"#ff477e", speed:4.3, jump:12},
    echo:  {name:"ECHO", color:"#b6ff5c", speed:3.5, jump:14}
  };
  const stages = [
    {name:"THE CITY", width:2100, exit:1980, platforms:[[0,468,420],[500,468,330],[910,468,340],[1320,468,330],[1720,468,380],[230,365,120],[620,330,120],[1000,355,130],[1430,320,130],[1740,350,120]], coins:[[270,330],[660,295],[1040,320],[1470,285],[1780,315]], spikes:[ [350,45],[720,45],[1110,45],[1510,45] ]},
    {name:"THE SUBWAY",width:2300,exit:2180,platforms:[[0,468,320],[400,468,300],[780,468,310],[1170,468,300],[1550,468,300],[1900,468,400],[100,370,110],[480,330,110],[850,350,120],[1250,315,110],[1620,340,120],[1940,300,120]],coins:[[140,335],[520,295],[890,315],[1290,280],[1660,305],[1980,265]],spikes:[[250,42],[600,42],[980,42],[1350,42],[1730,42]]},
    {name:"THE MAINFRAME",width:2550,exit:2420,platforms:[[0,468,280],[360,468,280],[720,468,280],[1080,468,280],[1440,468,280],[1800,468,280],[2160,468,390],[70,365,100],[420,320,100],[790,340,100],[1150,300,100],[1510,330,100],[1870,290,100],[2220,320,100]],coins:[[110,330],[460,285],[830,305],[1190,265],[1550,295],[1910,255],[2260,285]],spikes:[[180,40],[500,40],[860,40],[1220,40],[1580,40],[1940,40]]}
  ];
  let selected = "ghost", stageIndex=0, player, coins=[], score=0, camera=0, state="menu", keys=new Set(), last=0, best=0;
  try { best=Number(localStorage.getItem("afterDarkBest")||0); } catch(e) {}
  function loadStage() {
    const s=stages[stageIndex];
    player={x:55,y:FLOOR-40,w:24,h:38,vx:0,vy:0,ground:false,color:chars[selected].color};
    coins=s.coins.map(([x,y])=>({x,y,taken:false}));
    camera=0;
    levelLabel.textContent=String(stageIndex+1).padStart(2,"0")+" / 03";
    scoreLabel.textContent=String(score).padStart(2,"0");
    threatLabel.textContent="ACTIVE";
  }
  function start() {
    stageIndex=0; score=0; loadStage(); state="playing";
    startScreen.classList.add("hidden"); endScreen.classList.add("hidden"); pauseTag.classList.add("hidden");
    last=performance.now(); canvas.focus();
  }
  function finish(won) {
    state=won?"complete":"dead";
    endScreen.classList.remove("hidden"); pauseTag.classList.add("hidden");
    if(won && stageIndex<stages.length-1) {
      endKicker.textContent="SECTOR "+String(stageIndex+1).padStart(2,"0")+" CLEARED";
      endTitle.innerHTML="YOU FOUND<br><span>A WAY OUT.</span>";
      endCopy.textContent="Nice. One more sector to go.";
      endButton.innerHTML='NEXT SECTOR <span>↗</span>';
    } else if(won) {
      endKicker.textContent="CONNECTION RESTORED";
      endTitle.innerHTML="YOU BEAT<br><span>THE SYSTEM.</span>";
      endCopy.textContent="All sectors cleared. You escaped the grid.";
      endButton.innerHTML='RUN IT AGAIN <span>↻</span>';
      threatLabel.textContent="ESCAPED";
    } else {
      endKicker.textContent="CONNECTION LOST";
      endTitle.innerHTML="THEY FOUND<br><span>YOU.</span>";
      endCopy.textContent="Try again. Keep moving and jump over the pink spikes.";
      endButton.innerHTML='TRY AGAIN <span>↻</span>';
      threatLabel.textContent="CAUGHT";
    }
    if(score>best){best=score;try{localStorage.setItem("afterDarkBest",String(best));}catch(e){}}
  }
  function jump(){if(state==="playing"&&player.ground){player.vy=-chars[selected].jump;player.ground=false;}}
  function update(dt) {
    const s=stages[stageIndex], speed=chars[selected].speed, step=Math.min(dt/16.67,2);
    const left=keys.has("ArrowLeft")||keys.has("a")||keys.has("A");
    const right=keys.has("ArrowRight")||keys.has("d")||keys.has("D");
    player.vx=left===right?0:(left?-speed:speed);
    const oldBottom=player.y+player.h;
    player.x=Math.max(0,Math.min(s.width-player.w,player.x+player.vx*step));
    player.vy+=0.58*step; player.y+=player.vy*step; player.ground=false;
    for(const [x,y,w] of s.platforms){
      if(player.x+player.w>x && player.x<x+w && oldBottom<=y+6 && player.y+player.h>=y && player.vy>=0){
        player.y=y-player.h; player.vy=0; player.ground=true;
      }
    }
    if(player.y>H+100){finish(false);return;}
    for(const c of coins){if(!c.taken&&Math.hypot(player.x+12-c.x,player.y+18-c.y)<23){c.taken=true;score++;scoreLabel.textContent=String(score).padStart(2,"0");}}
    for(const [x,w] of s.spikes){if(player.x+player.w>x+4&&player.x<x+w-4&&player.y+player.h>FLOOR-23){finish(false);return;}}
    camera=Math.max(0,Math.min(s.width-W,player.x-W*.34));
    if(player.x+player.w>s.exit)finish(true);
  }
  function draw() {
    const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,"#07101b");bg.addColorStop(1,"#17262b");
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    // City skyline
    for(let i=0;i<22;i++){const x=i*55-(camera*.18%55),h=75+(i*37%105);ctx.fillStyle="#0b1922";ctx.fillRect(x,FLOOR-h,45,h);ctx.fillStyle="#6cf4e8";ctx.globalAlpha=.25;ctx.fillRect(x+12,FLOOR-h+16,4,6);ctx.fillRect(x+28,FLOOR-h+33,4,6);ctx.globalAlpha=1;}
    const s=stages[stageIndex];
    for(const [x,y,w,h0] of s.platforms){const sx=x-camera;ctx.fillStyle="#111d25";ctx.fillRect(sx,y,w,h0||72);ctx.fillStyle="#6cf4e8";ctx.fillRect(sx,y,w,3);ctx.strokeStyle="#24373d";ctx.strokeRect(sx,y,w,1);}
    for(const [x,w] of s.spikes){const sx=x-camera;ctx.fillStyle="#ff477e";ctx.shadowColor="#ff477e";ctx.shadowBlur=10;for(let a=0;a<Math.floor(w/12);a++){ctx.beginPath();ctx.moveTo(sx+a*12,FLOOR);ctx.lineTo(sx+a*12+6,FLOOR-20);ctx.lineTo(sx+a*12+12,FLOOR);ctx.fill();}ctx.shadowBlur=0;}
    for(const c of coins){if(c.taken)continue;const x=c.x-camera;ctx.fillStyle="#b6ff5c";ctx.shadowColor="#b6ff5c";ctx.shadowBlur=14;ctx.fillRect(x-5,c.y-5,10,10);ctx.shadowBlur=0;}
    const bx=s.exit-camera;ctx.fillStyle="#102c30";ctx.fillRect(bx,FLOOR-90,42,90);ctx.strokeStyle="#6cf4e8";ctx.lineWidth=2;ctx.strokeRect(bx,FLOOR-90,42,90);ctx.fillStyle="#b6ff5c";ctx.font="10px monospace";ctx.fillText("EXIT",bx+5,FLOOR-100);
    // Player
    ctx.shadowColor=player.color;ctx.shadowBlur=12;ctx.fillStyle=player.color;ctx.fillRect(player.x-camera,player.y+2,24,28);ctx.fillStyle="#081016";ctx.fillRect(player.x-camera+5,player.y+8,5,5);ctx.fillRect(player.x-camera+14,player.y+8,5,5);ctx.fillStyle=player.color;ctx.fillRect(player.x-camera+3,player.y+30,7,8);ctx.fillRect(player.x-camera+15,player.y+30,7,8);ctx.shadowBlur=0;
    ctx.fillStyle="#c2d8d2";ctx.font="11px monospace";ctx.fillText(s.name+" // "+chars[selected].name,18,24);ctx.fillStyle="#b6ff5c";ctx.fillRect(18,35,120*Math.min(1,player.x/s.exit),2);ctx.fillStyle="#8ba09c";ctx.textAlign="right";ctx.fillText("BEST "+String(best).padStart(2,"0"),W-18,24);ctx.textAlign="left";
  }
  function loop(now){try{const dt=Math.min(now-(last||now),34);last=now;if(state==="playing")update(dt);draw();requestAnimationFrame(loop);}catch(err){console.error(err);state="error";startScreen.classList.remove("hidden");startScreen.innerHTML='<div class="screen-kicker">GRID ERROR</div><h2>CONNECTION<br><span>INTERRUPTED.</span></h2><p class="screen-copy">'+String(err.message||err).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]))+'</p><button class="primary-button" onclick="location.reload()">RELOAD GAME</button>';}}
  document.querySelectorAll(".character-card").forEach(btn=>btn.addEventListener("click",()=>{selected=btn.dataset.character;document.querySelectorAll(".character-card").forEach(card=>card.classList.toggle("selected",card===btn));}));
  startButton.addEventListener("click",start);
  endButton.addEventListener("click",()=>{if(state==="complete"&&stageIndex<stages.length-1){stageIndex++;loadStage();state="playing";endScreen.classList.add("hidden");last=performance.now();}else start();});
  window.addEventListener("keydown",e=>{if(["ArrowLeft","ArrowRight","ArrowUp"," "].includes(e.key))e.preventDefault();keys.add(e.key);if((e.key===" "||e.key==="ArrowUp"||e.key==="w"||e.key==="W")&&!e.repeat)jump();if((e.key==="p"||e.key==="P"||e.key==="Escape")&&state==="playing"){state="paused";pauseTag.classList.remove("hidden");}else if((e.key==="p"||e.key==="P"||e.key==="Escape")&&state==="paused"){state="playing";pauseTag.classList.add("hidden");last=performance.now();}});
  window.addEventListener("keyup",e=>keys.delete(e.key));window.addEventListener("blur",()=>keys.clear());
  const touch=document.createElement("div");touch.className="touch-controls";touch.innerHTML='<button data-key="ArrowLeft">←</button><button data-key="ArrowRight">→</button><button data-jump="1">JUMP ↗</button>';document.querySelector(".game-panel").appendChild(touch);
  touch.querySelectorAll("button").forEach(b=>{const down=e=>{e.preventDefault();if(b.dataset.jump)jump();else keys.add(b.dataset.key);};const up=e=>{e.preventDefault();if(b.dataset.key)keys.delete(b.dataset.key);};b.addEventListener("pointerdown",down);["pointerup","pointercancel","pointerleave"].forEach(t=>b.addEventListener(t,up));});
  loadStage();state="menu";draw();requestAnimationFrame(loop);
})();