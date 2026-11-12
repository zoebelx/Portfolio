/* Démonstration web adaptée : trois étages fixes, modules du jeu C# original. */
(function(root){
  const modules=typeof module!=='undefined'&&module.exports?require('./zinzin-maps.js'):ZINZIN_MODULES;
  const clone=name=>modules[name].map(row=>row.slice());
  let previousHidingPlace='';
  function create(){
    const types=[['coffre','couchage','moteur'],['coffre','moteur','couchage'],['pilotage','coffre','moteur']];
    const floors=types.map((layout,index)=>{
      const grid=Array.from({length:30},()=>Array(30).fill(0));
      // Les quatre coins et les cinq modules reprennent la disposition du C#.
      for(let r=0;r<30;r++)for(let c=0;c<30;c++){
        if((r===9||r===20)&&(c<10||c>=20))grid[r][c]=1;
        if((c===9||c===20)&&(r<10||r>=20))grid[r][c]=1;
      }
      [['teleport',0,10],['arrival',10,10],[layout[0],10,0],[layout[1],10,20],[layout[2],20,10]].forEach(([name,row,col])=>{
        const part=clone(name);
        if(index===2&&name==='pilotage')for(const line of part)for(let c=0;c<line.length;c++)if(line[c]===13)line[c]=21;
        part.forEach((line,r)=>line.forEach((value,c)=>{grid[row+r][col+c]=value}));
      });
      return grid;
    });
    const state={floors,floor:0,row:14,col:13,key:false,won:false,visited:new Set([0]),searched:new Set()};
    const candidates=new Map();
    // Only choose objects that can actually be examined from a reachable tile.
    floors.forEach((grid,floor)=>{
      const queue=[[14,13]],seen=new Set(['14:13']);
      for(let i=0;i<queue.length;i++){
        const [row,col]=queue[i];
        const item=nearby({...state,floor,row,col});
        if(item&&[5,6,7,8,17,19,20].includes(item.value)){
          const id=`${floor}:${item.row}:${item.col}`;
          candidates.set(id,{floor,row:item.row,col:item.col});
        }
        for(const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]){
          const r=row+dr,c=col+dc,id=`${r}:${c}`;
          if(grid[r]?.[c]===0&&!seen.has(id)){seen.add(id);queue.push([r,c])}
        }
      }
    });
    const choices=Array.from(candidates.entries()).filter(([id])=>id!==previousHidingPlace);
    const [id,place]=choices[Math.floor(Math.random()*choices.length)];
    previousHidingPlace=id;
    state.hidingPlace=place;
    return state;
  }
  function move(state,dr,dc){
    if(state.won)return false;
    const row=state.row+dr,col=state.col+dc;
    if(row<0||col<0||row>=30||col>=30||state.floors[state.floor][row][col]!==0)return false;
    state.row=row;state.col=col;return true;
  }
  function nearby(state){
    for(const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]){
      const r=state.row+dr,c=state.col+dc,value=state.floors[state.floor][r]?.[c];
      if(value!==undefined&&![0,1,2].includes(value))return {row:r,col:c,value};
    }
    return null;
  }
  function interact(state){
    if(state.won)return {type:'won',message:'Mission déjà accomplie.'};
    const item=nearby(state);
    if(!item)return {type:'none',message:'Approchez-vous d’un objet pour interagir avec A.'};
    if(item.value===3)return {type:'teleport',message:'Choisissez un étage de destination.'};
    if(item.value===4)return {type:'info',message:'Téléporteur d’arrivée. Le départ se trouve dans le module du haut.'};
    if(state.floor===state.hidingPlace.floor&&item.row===state.hidingPlace.row&&item.col===state.hidingPlace.col&&!state.key){state.key=true;return {type:'key',message:'Clé trouvée ! Rejoignez le poste de pilotage au troisième étage.'}}
    if(item.value===21){
      if(!state.key)return {type:'locked',message:'Le levier attend la clé du vaisseau.'};
      state.won=true;return {type:'won',message:'Clé insérée : le vaisseau est déverrouillé. Mission accomplie !'};
    }
    if([5,6,7,8,17,19,20].includes(item.value)){
      state.searched.add(`${state.floor}:${item.row}:${item.col}`);
      return {type:'empty',message:'Vous fouillez cette cachette. La clé ne se trouve pas ici.'};
    }
    return {type:'info',message:'Un élément du vaisseau. Essayez les coffres, les couchettes et les caisses.'};
  }
  function teleport(state,floor){
    if(!Number.isInteger(floor)||floor<0||floor>=state.floors.length||nearby(state)?.value!==3||state.won)return false;
    state.floor=floor;state.row=14;state.col=13;state.visited.add(floor);return true;
  }
  const api={create,move,nearby,interact,teleport};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ZinzinEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
