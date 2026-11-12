(() => {
  const canvas=document.getElementById('z-canvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  if(!ctx)return;
  const get=id=>document.getElementById(id),engine=ZinzinEngine;
  const names=['Lieu de vie','Salle des machines','Poste de pilotage'];
  const colors={1:'#777b80',2:'#777b80',3:'#f45b64',4:'#4c9de6',5:'#e3ede9',6:'#e3ede9',7:'#e3ede9',8:'#e3ede9',9:'#68dce1',10:'#68dce1',12:'#6e818c',13:'#e77677',15:'#eb5960',16:'#474c52',17:'#e3b775',18:'#b7ba38',19:'#e3b775',20:'#e3b775',21:'#e77677'};
  let state=engine.create(),running=false,started=false,remaining=180000,lastTick=0;
  let destinationIndex=0;
  function message(text){get('z-message').textContent=text}
  function closeDestinations(){get('z-destinations').hidden=true}
  function updateNearby(){
    const item=engine.nearby(state);
    const labels={3:'Téléporteur de départ : A pour choisir un étage.',4:'Téléporteur d’arrivée. Le départ se trouve dans le couloir du haut.',5:'Couchette occupée : A pour examiner.',6:'Couchette : A pour fouiller.',7:'Couchette : A pour fouiller.',8:'Couchette occupée : A pour examiner.',9:'Écran de pilotage : A pour examiner.',10:'Écran de pilotage : A pour examiner.',12:'Support d’écran : A pour examiner.',13:'Levier de pilotage : A pour essayer la clé.',15:'Noyau du réacteur : A pour examiner.',16:'Paroi du réacteur : A pour examiner.',17:'Caisse : A pour fouiller.',18:'Blindage du réacteur : A pour examiner.',19:'Coffre : A pour fouiller.',20:'Coffre : A pour fouiller.',21:'Levier de pilotage : A pour essayer la clé.'};
    message(item?(labels[item.value]||'Objet à proximité : A pour examiner.'):'Aucun objet à proximité. Explorez les modules avec les flèches.');
  }
  function selectDestination(index){
    const buttons=Array.from(get('z-destinations').querySelectorAll('button'));
    destinationIndex=Math.max(0,Math.min(buttons.length-1,index));
    buttons.forEach((button,i)=>{button.setAttribute('aria-pressed',String(i===destinationIndex));button.tabIndex=i===destinationIndex?0:-1});
    buttons[destinationIndex]?.focus();
  }
  function travel(index){
    if(!running||!engine.teleport(state,index))return;
    closeDestinations();updateNearby();draw();canvas.focus({preventScroll:true});
  }
  function draw(){
    ctx.fillStyle='#1e1e1e';ctx.fillRect(0,0,600,600);
    state.floors[state.floor].forEach((row,r)=>row.forEach((value,c)=>{
      if(!value)return;
      ctx.fillStyle=colors[value]||'#8b9aa4';ctx.fillRect(c*20+1,r*20+1,18,18);
      if([19,20].includes(value)){ctx.fillStyle='#513e23';ctx.fillRect(c*20+3,r*20+8,14,3)}
      if([13,21].includes(value)){ctx.fillStyle='#142028';ctx.fillRect(c*20+8,r*20+2,4,14)}
    }));
    ctx.fillStyle='#47dcaa';ctx.beginPath();ctx.arc(state.col*20+10,state.row*20+10,7,0,Math.PI*2);ctx.fill();
    if(!running){ctx.fillStyle='#0a1426c0';ctx.fillRect(0,245,600,100);ctx.fillStyle='#e3ede9';ctx.textAlign='center';ctx.font='20px monospace';ctx.fillText(state.won?'MISSION ACCOMPLIE':remaining<=0?'TEMPS ÉCOULÉ':started?'PAUSE':'PRÊT POUR LA MISSION ?',300,302)}
    get('z-floor').textContent=`Étage ${state.floor+1} — ${names[state.floor]}`;
    get('z-key').textContent=`Clé : ${state.key?'trouvée':'non'}`;
    const seconds=Math.ceil(remaining/1000);get('z-time').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
    get('z-action').disabled=!running||!engine.nearby(state);
    get('z-pause').disabled=!started||state.won||remaining<=0;
    get('z-pause').textContent=running?'Pause':'Reprendre';
    get('z-start').disabled=started;
    get('z-visited').replaceChildren(...names.map((name,i)=>{const li=document.createElement('li');li.className=state.visited.has(i)?'visited':'';li.textContent=`${i+1}. ${state.visited.has(i)?name:'???'}`;return li}));
    canvas.setAttribute('aria-label',`Étage ${state.floor+1}, ${names[state.floor]}. Position : ligne ${state.row+1}, colonne ${state.col+1}. Clé ${state.key?'trouvée':'non trouvée'}. Flèches pour avancer, A pour interagir.`);
  }
  function tick(){
    const now=performance.now();
    if(running){remaining=Math.max(0,remaining-(now-lastTick));if(remaining===0){running=false;closeDestinations();message('Le temps est écoulé. Recommencez pour tenter une nouvelle exploration.')}draw()}
    lastTick=now;
  }
  function pause(){if(!started||state.won||remaining<=0)return;tick();if(remaining<=0)return;running=!running;lastTick=performance.now();draw()}
  function move(dr,dc){
    if(!running||!get('z-destinations').hidden)return;
    engine.move(state,dr,dc);updateNearby();draw();
  }
  function action(){
    if(!running||!get('z-destinations').hidden)return;
    tick();
    if(!running)return;
    const result=engine.interact(state);message(result.message);
    if(result.type==='teleport'){
      get('z-destinations').hidden=false;
      get('z-destinations').querySelector('.z-destination-buttons').replaceChildren(...names.map((name,i)=>{
        const button=document.createElement('button');button.type='button';button.className='btn';button.textContent=`${i+1} · ${state.visited.has(i)?name:'???'}`;
        button.addEventListener('click',()=>travel(i));return button;
      }));
      selectDestination(0);
    }
    if(result.type==='won'){running=false;closeDestinations();window.ZinzinScores?.finish(180000-remaining)}
    draw();
  }
  const modal=get('zinzin-dialog');
  modal.addEventListener('keydown',event=>{
    if(get('z-destinations').hidden||event.ctrlKey||event.altKey||event.metaKey)return;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){
      event.preventDefault();event.stopPropagation();
      selectDestination(destinationIndex+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1));
    }else if(event.key==='Enter'&&(event.target.closest('#z-destinations')||event.target===canvas)){
      event.preventDefault();event.stopPropagation();if(!event.repeat)travel(destinationIndex);
    }else if(event.key==='Escape'){
      event.preventDefault();event.stopPropagation();closeDestinations();updateNearby();canvas.focus({preventScroll:true});
    }
  },true);
  get('z-open').addEventListener('click',()=>{modal.showModal();document.body.classList.add('zinzin-open');draw()});
  get('z-close').addEventListener('click',()=>modal.close());
  modal.addEventListener('close',()=>{if(running){tick();running=false;draw()}document.body.classList.remove('zinzin-open');get('z-open').focus({preventScroll:true})});
  modal.addEventListener('click',event=>{const r=modal.getBoundingClientRect();if(event.target===modal&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))modal.close()});
  get('z-start').addEventListener('click',()=>{started=true;running=true;lastTick=performance.now();updateNearby();draw();canvas.focus({preventScroll:true})});
  get('z-reset').addEventListener('click',()=>{state=engine.create();running=false;started=false;remaining=180000;closeDestinations();message('Mission réinitialisée. Lancez la démo pour repartir.');draw()});
  get('z-pause').addEventListener('click',()=>{pause();canvas.focus({preventScroll:true})});
  get('z-action').addEventListener('click',()=>{action();if(get('z-destinations').hidden)canvas.focus({preventScroll:true})});
  get('z-hint').addEventListener('click',()=>{message(state.key?'Le levier de sortie se trouve dans le module de gauche au troisième étage.':`La clé est cachée dans un objet à fouiller au ${state.hidingPlace.floor+1}${state.hidingPlace.floor===0?'er':'e'} étage. Pour changer d’étage, approchez le téléporteur rouge du haut et appuyez sur A.`)});
  const directions={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]};
  canvas.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(directions[event.key]){event.preventDefault();move(...directions[event.key])}
    else if(event.key.toLowerCase()==='a'){event.preventDefault();if(!event.repeat)action()}
    else if(event.key==='Escape'){if(running){event.preventDefault();pause()}}
  });
  const pad={up:[-1,0],down:[1,0],left:[0,-1],right:[0,1]};
  document.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>move(...pad[button.dataset.move])));
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){tick();running=false;draw()}});
  setInterval(tick,200);draw();
})();
