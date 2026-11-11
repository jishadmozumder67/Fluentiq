/* Durable preference events: these survive settings-page rebuilds. */
(() => {
 'use strict';
 const appearance=new Set(['accent','themeMode']),toggles=new Set(['large','motion','music','ticks']);
 function repaint(){const y=window.scrollY;render();window.scrollTo({top:y,behavior:'instant'})}
 function unlockAudio(){try{const ctx=audio();if(ctx)Promise.resolve(ctx.resume()).then(()=>updateAudio()).catch(()=>notify('Sound could not start. Check your phone’s media volume and try again.'));updateAudio()}catch{notify('Sound is unavailable on this device.')}}
 document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const key=b.dataset.toggle,set=b.dataset.set;
  if(toggles.has(key)){
   e.preventDefault();e.stopImmediatePropagation();state[key]=!state[key];
   if(key==='music'&&state.music)unlockAudio();
   if(key==='motion'&&state.motion)document.getElementById('splash')?.remove();
   save();apply();repaint();return;
  }
  if(appearance.has(set)){
   e.preventDefault();e.stopImmediatePropagation();state[set]=b.dataset.val;
   if(set==='themeMode'&&state.themeMode!=='system')state.theme=state.themeMode;
   save();apply();repaint();return;
  }
  if(b.id==='bell2'){
   e.preventDefault();e.stopImmediatePropagation();
   if(!state.volume){notify('Increase Volume to hear the test sound.');return}
   try{const ctx=audio();Promise.resolve(ctx?.resume()).then(()=>{bell();updateAudio()}).catch(()=>notify('Sound could not start. Check media volume.'))}catch{notify('Sound is unavailable on this device.')}
  }
 },true);
 document.addEventListener('input',e=>{
  if(e.target.id==='volume2'){
   e.stopImmediatePropagation();state.volume=Math.max(0,Math.min(100,Number(e.target.value)||0));save();if(state.music)unlockAudio();else updateAudio();
   e.target.setAttribute('aria-valuetext',state.volume+' percent');
  }
  if(e.target.id==='accentPick'){
   state.accent='custom';state.accentCustom=e.target.value;save();apply();
   e.target.closest('.swatch')?.style.setProperty('--c',e.target.value);
  }
 },true);
 document.addEventListener('change',e=>{
  if(e.target.id==='accentPick'){e.stopImmediatePropagation();state.accent='custom';state.accentCustom=e.target.value;save();apply();repaint()}
 },true);
 // Resume sound only after a learner gesture, including after returning to the app.
 document.addEventListener('pointerdown',()=>{if(state.music)unlockAudio()},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)updateAudio()});
 apply();
})();
