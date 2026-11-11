/* No native iOS installation or cloud speech is implied by this web-app adapter. */
(() => {
 'use strict';
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const installed=()=>navigator.standalone===true||matchMedia('(display-mode: standalone)').matches;
 const update=()=>{document.documentElement.classList.toggle('ios-device',ios);document.documentElement.classList.toggle('ios-home-screen',ios&&installed())};update();
 window.addEventListener('pageshow',update);
 const preference=matchMedia('(display-mode: standalone)');preference.addEventListener?.('change',update);
 if(ios){
  const base=window.render;
  window.render=function(){const result=base.apply(this,arguments);if(!installed()&&['settings','help'].includes(page)&&!document.querySelector('#iosInstallNote')){
   const note=document.createElement('section');note.id='iosInstallNote';note.className='ios-install-note';
   note.innerHTML='<h2>Fluentiq on your iPhone</h2><p>Add Fluentiq to your Home Screen for its own app icon and a full-screen workspace.</p><a class="btn ghost" href="./install-ios.html">iPhone installation guide</a>';
   document.querySelector('#main')?.append(note);
  }return result};
 }
 // Pause existing sound/recording through the app's own visibility handlers.
 // Storage is device-local: the existing backup export/import remains available.
})();
