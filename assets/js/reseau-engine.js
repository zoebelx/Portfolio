(function(root){
  function sweep(input,weights,thresholds){
    const state=Array.from(input,Number);
    // Mise a jour sequentielle des 256 cellules, comme recognize_letter en Python.
    for(let cell=0;cell<256;cell++){
      let total=-thresholds[cell];
      for(let j=0;j<256;j++)total+=weights[cell][j]*state[j];
      state[cell]=total>0?1:0;
    }
    return state;
  }
  function recall(input,data,maxIterations=100){
    if(input.length!==256)throw new Error('Une lettre doit contenir 256 pixels.');
    let state=Array.from(input,Number);
    const seen=new Set([state.join('')]);
    for(let iteration=1;iteration<=maxIterations;iteration++){
      const next=sweep(state,data.weights,data.thresholds);
      if(next.every((v,i)=>v===state[i]))return {state:next,stable:true,iterations:iteration};
      const key=next.join('');
      if(seen.has(key))return {state:next,stable:false,iterations:iteration};
      seen.add(key);state=next;
    }
    return {state,stable:false,iterations:maxIterations};
  }
  function identify(state,patterns){
    const index=patterns.findIndex(pattern=>pattern.every((v,i)=>Number(v)===state[i]));
    return index<0?null:String.fromCharCode(65+index);
  }
  const api={sweep,recall,identify};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ReseauEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
