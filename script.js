
let PHONES=[];
fetch('/data/phones.json').then(r=>r.json()).then(d=>{PHONES=d.phones; initCompare(); initSearch();});
function phonePage(p){return '/phones/'+p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.html';}
function showSuggest(input, box, onPick){
  const q=input.value.trim().toLowerCase();
  if(q.length<2){box.classList.remove('open');box.innerHTML='';return;}
  const matches=PHONES.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)).slice(0,8);
  if(!matches.length){box.classList.remove('open');box.innerHTML='';return;}
  box.innerHTML='';
  matches.forEach(p=>{
    const b=document.createElement('button'); b.type='button'; b.className='suggest-item';
    b.innerHTML=`<img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>${p.brand} · ${p.chipset||''}</small></span>`;
    b.onclick=()=>{onPick(p); box.classList.remove('open'); box.innerHTML='';};
    box.appendChild(b);
  });
  box.classList.add('open');
}
function initSearch(){
  const main=document.getElementById('mainSearch'), mainBox=document.getElementById('mainSuggest');
  if(main){ main.addEventListener('input',()=>showSuggest(main, mainBox, p=>{window.location.href=phonePage(p);}));
    document.addEventListener('click',e=>{ if(!e.target.closest('.search-wrap')){mainBox.classList.remove('open');} }); }
  [1,2,3].forEach(i=>{
    const inp=document.getElementById('phone'+i), box=document.getElementById('suggest'+i);
    if(inp&&box){ inp.addEventListener('input',()=>showSuggest(inp, box, p=>{inp.value=p.name;})); }
  });
}
function initCompare(){
  const lists=document.querySelectorAll('.phone-pick');
  lists.forEach(sel=>{ PHONES.forEach(p=>{const o=document.createElement('option');o.value=p.name;o.textContent=p.name;sel.appendChild(o);}); });
}
function findPhone(name){return PHONES.find(p=>p.name.toLowerCase()===String(name).toLowerCase());}
function comparePhones(){
  const names=[1,2,3].map(i=>{const el=document.getElementById('phone'+i);return el?el.value.trim():'';}).filter(Boolean);
  const out=document.getElementById('compareResult');
  if(names.length<2){out.innerHTML='<p>Please pick at least 2 phones to compare.</p>';return;}
  const picked=names.map(findPhone).filter(Boolean);
  if(picked.length<2){out.innerHTML='<p>One of those phones is not in our database yet (40 phones in this version). Try a phone from the sidebar list.</p>';return;}
  const rows=[['Phone',''],['Display',''],['Chipset',''],['RAM / Storage',''],['Battery',''],['Main camera',''],['Selfie camera',''],['OS',''],['Weight','']];
  function val(p,k){ if(k==='Phone') return `<img class="compare-img" src="${p.image}" alt="${p.name}"><br><strong>${p.name}</strong><br><a href="/phones/${p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}.html">Full specs</a>`;
    if(k==='Display') return `${p.display.size_inches||''} inch ${p.display.type||''} ${p.display.refresh_rate_hz?p.display.refresh_rate_hz+'Hz':''}`;
    if(k==='Chipset') return p.chipset||'';
    if(k==='RAM / Storage') return p.memory_raw||'';
    if(k==='Battery') return p.battery_raw||'';
    if(k==='Main camera') return p.main_camera||'';
    if(k==='Selfie camera') return p.selfie_camera||'';
    if(k==='OS') return p.os||'';
    if(k==='Weight') return p.weight_raw||''; return ''; }
  let h='<table><tr><th>Spec</th>'+picked.map(p=>`<th>${p.name}</th>`).join('')+'</tr>';
  rows.forEach(r=>{h+=`<tr><th>${r[0]}</th>`+picked.map(p=>`<td>${val(p,r[0])}</td>`).join('')+'</tr>';});
  h+='</table><h3>Prices by storage (US launch price, verified only)</h3>';
  picked.forEach(p=>{ h+=`<h4>${p.name}</h4>`; if(p.prices&&p.prices.length){h+='<ul>'+p.prices.map(v=>`<li>${v.ram_gb}GB RAM / ${v.storage_gb}GB — <strong>$${v.price_usd}</strong></li>`).join('')+'</ul>';} else {h+=`<p>${p.prices_note||'Price not verified yet.'}</p>`;} });
  h+='<h3>Reviews</h3>'+picked.map(p=>`<p><strong>${p.name}:</strong> ${p.review?p.review.summary:''} <a href="${p.review?p.review.url:'#'}" target="_blank" rel="noopener">Read full ${p.review?p.review.source:''} review</a></p>`).join('');
  out.innerHTML=h;
}
document.addEventListener('input',e=>{ if(e.target&&e.target.id==='sidebarSearch'){ const q=e.target.value.toLowerCase(); document.querySelectorAll('#sidebarPhones li').forEach(li=>{li.style.display=li.textContent.toLowerCase().includes(q)?'':'none';}); }});
