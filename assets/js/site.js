/* Espace pédagogique — M. GIRARD, test public GitHub Pages. AUCUN compte utilisateur. */
(() => {
 'use strict';
 const DATA=window.PORTAIL_CATALOGUE;
 const APP=document.getElementById('app');
 const BREAD=document.getElementById('breadcrumbs');
 const NAV=document.getElementById('main-nav');
 const base='assets/illustrations/';
 const ICONS={
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
 book:'<path d="M12 7c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1zM12 7v14"/>',
 maths:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M7 7h10M8 12h2m4 0h2M8 16h2m4 0h2"/>',
 flask:'<path d="M9 3h6M10 3v7l-5 8c-1 2 0 3 2 3h10c2 0 3-2 2-3l-5-8V3M8 15h8"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-4 4-4 14 0 18m0-18c4 4 4 14 0 18"/>',
 balance:'<path d="M12 3v18M5 6h14M7 6 4 13h6L7 6zm10 0-3 7h6l-3-7zM7 21h10"/>',
 palette:'<path d="M12 3a9 9 0 0 0 0 18h2a2 2 0 0 0 2-2c0-1-1-2-1-3s1-2 2-2h1a3 3 0 0 0 3-3c0-5-4-8-9-8z"/><circle cx="7" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="8" r="1"/>',
 music:'<path d="M9 18V5l12-2v13M9 8l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/>',
 game:'<path d="M6 8h12c3 0 4 3 5 9 .4 3-2 4-4 2l-3-3H8l-3 3c-2 2-4 1-4-2 1-6 2-9 5-9zM8 10v6m-3-3h6m6-1h.01m3 2h.01"/>',
 files:'<path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM15 3v5h4M9 12h6M9 16h7"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 chevron:'<path d="m9 18 6-6-6-6"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 filter:'<path d="M4 5h16M7 12h10m-7 7h4"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 cloud:'<path d="M7 18a5 5 0 1 1 1-9 6 6 0 0 1 12 2 4 4 0 0 1-1 7z"/>',
 warning:'<path d="M12 3 2 21h20L12 3zm0 7v5m0 3h.01"/>',
 play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
 download:'<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',
 external:'<path d="M13 5h6v6m0-6-9 9M18 14v5H5V6h6"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>',
 check:'<path d="m4 13 5 5L20 6"/>',
 folder:'<path d="M3 6h7l2 3h9v12H3z"/>',
 back:'<path d="M19 12H5m6-6-6 6 6 6"/>',
 layers:'<path d="m12 2 10 6-10 6L2 8l10-6zm-10 11 10 6 10-6M2 18l10 5 10-5"/>',
 tablet:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M10 18h4"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>'};
 const icon=n=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||ICONS.book}</svg>`;
 const escape=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const a=(path,label,cls='',ico='')=>`<a href="#/${path}" class="${cls}">${ico?icon(ico):''}${escape(label)}</a>`;
 const image=x=>base+encodeURIComponent(x);
 const premiumFallbacks={"francais-illustration.webp":"francais.svg","mathematiques-illustration.webp":"mathematiques.svg","sciences-illustration.webp":"sciences-matiere.png","histoire-geo-illustration.webp":"histoire-geo.svg","emc-illustration.webp":"emc.svg","arts-plastiques-illustration.webp":"arts.svg","education-musicale-illustration.webp":"musique.svg"};
 document.addEventListener('error',event=>{
  const element=event.target;
  if(!element||element.tagName!=='IMG'||element.dataset.imageFallback)return;
  const name=(element.getAttribute('src')||'').split('/').pop();
  const fallback=premiumFallbacks[name];
  if(fallback){element.dataset.imageFallback='yes';element.src=base+encodeURIComponent(fallback)}
 },true);

 const resourceRoute=r=>r.type==='pdf'?'document/'+r.id:r.type==='html'?'application/'+r.id:'media/'+r.id;
 const bySubject=id=>DATA.subjects.find(s=>s.id===id);
 const byDomain=(s,d)=>s?.domains.find(x=>x.id===d);
 const bySub=(d,k)=>d?.subdomains.find(x=>x.id===k);
 const bySequence=id=>DATA.sequences.find(x=>x.id===id);
 const bySession=id=>DATA.sessions.find(x=>x.id===id);
 const subjectIcon=s=>({francais:'book',mathematiques:'maths',sciences:'flask','histoire-geo':'globe',emc:'balance',arts:'palette',musique:'music'})[s]||'book';
 const navItems=[['francais','Français','book'],['mathematiques','Mathématiques','maths'],['sciences','Sciences','flask'],['histoire-geo','Histoire-Géo','globe'],['emc','EMC','balance'],['arts','Arts plastiques','palette'],['musique','Musique','music'],['jeux','Jeux','game']];
 const routeParts=()=>decodeURIComponent((location.hash.replace(/^#\/?/,'')||'accueil')).split('/').filter(Boolean);
 function nav(active){NAV.innerHTML=navItems.map(([id,name,ic])=>`<a class="nav-link ${active===id?'active':''}" ${active===id?'aria-current="page"':''} href="#/${id==='accueil'||id==='jeux'||id==='ressources'?id:'matiere/'+id}">${icon(ic)}${escape(name)}</a>`).join('')}
 function bread(parts){BREAD.innerHTML=parts.map((x,i)=>`${i?'<span class="crumb-div">›</span>':''}${x.path?`<a href="#/${x.path}">${escape(x.label)}</a>`:`<span class="crumb-current">${escape(x.label)}</span>`}`).join('')}
 function title(h,p){return `<div class="page-heading"><h1>${escape(h)}</h1>${p?`<p>${escape(p)}</p>`:''}</div>`}
 const section=(h,p,href='')=>`<div class="section-head"><div><h2>${escape(h)}</h2>${p?`<p>${escape(p)}</p>`:''}</div>${href?a(href,'Tout voir','text-link','arrow'):''}</div>`;
 function subjectCard(s){return `<a class="subject-card" href="#/matiere/${s.id}" aria-label="Ouvrir la matière ${escape(s.label)}"><div class="subject-art"><img src="${image(s.image)}" alt="" loading="eager"></div><div class="subject-body"><h3>${escape(s.label)}</h3><span class="home-card-arrow" aria-hidden="true">${icon('arrow')}</span></div></a>`}
 function domainCard(s,d){return `<a class="domain-card" href="#/domaine/${s.id}/${d.id}"><div class="domain-pic"><img src="${image(d.image)}" alt="" loading="lazy"></div><div class="domain-copy"><h3>${escape(d.label)}</h3><p>${d.subdomains.length} sous-domaines</p><span>Explorer ${icon('arrow')}</span></div></a>`}
function subCard(s,d,x){return `<a class="sub-card" href="#/sous-domaine/${s.id}/${d.id}/${x.id}"><div class="sub-tile"><img src="${image(d.image)}" alt="" loading="lazy"></div><div><h3>${escape(x.label)}</h3></div><span class="arrow-dot" aria-hidden="true">${icon('chevron')}</span></a>`}
 function band(top,heading,p,img){return `<div class="band"><div><div class="kicker">${escape(top)}</div><h1>${escape(heading)}</h1>${p?`<p>${escape(p)}</p>`:''}</div>${img?`<img src="${image(img)}" alt="">`:''}</div>`}
 function empty(t,p){return `<div class="empty"><div class="empty-symbol">${icon('folder')}</div><h3>${escape(t)}</h3><p>${escape(p)}</p></div>`}

 function index(){bread([]);return `<div class="home-screen"><h1 class="visually-hidden">Choisir une matière</h1><div class="subjects-grid">${DATA.subjects.map(subjectCard).join('')}</div></div>`}
 function subjectPage(s){
  bread([{label:s.label}]);
  return `<section class="subject-screen count-${s.domains.length}"><header class="subject-screen-head"><div class="subject-title"><span class="subject-kicker">Classe ${escape(s.classes.join(', '))}</span><h1>${escape(s.label)}</h1></div><img src="${image(s.image)}" alt="" loading="eager"></header><div class="subject-overview" aria-label="Domaines de ${escape(s.label)}">${s.domains.map(d=>`<a class="overview-card" href="#/domaine/${s.id}/${d.id}" aria-label="Voir ${escape(d.label)}"><div class="overview-image"><img src="${image(d.image)}" alt="" loading="eager"></div><div class="overview-label"><h2>${escape(d.label)}</h2><span class="overview-arrow" aria-hidden="true">${icon('arrow')}</span></div></a>`).join('')}</div></section>`;
 }
function domainPage(s,d){
  bread([{label:s.label,path:'matiere/'+s.id},{label:d.label}]);
  return `<section class="domain-screen"><header class="domain-screen-head"><div><span class="domain-parent">${escape(s.label)}</span><h1>${escape(d.label)}</h1></div><img src="${image(d.image)}" alt="" loading="eager"></header><div class="subdomain-grid" aria-label="Sous-domaines de ${escape(d.label)}">${d.subdomains.map(x=>subCard(s,d,x)).join('')}</div></section>`;
 }
function subPage(s,d,x){
  bread([{label:s.label,path:'matiere/'+s.id},{label:d.label,path:`domaine/${s.id}/${d.id}`},{label:x.label}]);
  const seqs=x.sequenceIds.map(bySequence).filter(Boolean);
  return `${band(s.label,x.label,'',d.image)}<div class="section-head"><h2>Séquences</h2></div>${seqs.length?seqs.map(seq=>`<div class="list-card"><div><h3>${escape(seq.title)}</h3><span class="tag gold">Exemple</span></div>${a('sequence/'+seq.id,'Ouvrir','button ghost small','arrow')}</div>`).join(''):empty('À venir','')}`;
 }
function seqPage(seq){
  const sess=bySession(seq.sessions[0]),s=bySubject(sess.subject),d=byDomain(s,sess.domain),sub=bySub(d,sess.subdomain);
  bread([{label:s.label,path:'matiere/'+s.id},{label:d.label,path:`domaine/${s.id}/${d.id}`},{label:sub.label,path:`sous-domaine/${s.id}/${d.id}/${sub.id}`},{label:seq.title}]);
  return `${band(s.label,seq.title,'',d.image)}<div class="section-head"><h2>Séances</h2></div>${seq.sessions.map(id=>{const ses=bySession(id);return `<div class="list-card"><div><h3>${escape(ses.title)}</h3><span class="tag gold">Exemple</span></div>${a('seance/'+ses.id,'Ouvrir','button ghost small','arrow')}</div>`}).join('')}`;
 }
function sessionPage(sess){
 const s=bySubject(sess.subject),d=byDomain(s,sess.domain),sub=bySub(d,sess.subdomain),seq=bySequence(sess.sequence);
 bread([{label:s.label,path:`matiere/${s.id}`},{label:d.label,path:`domaine/${s.id}/${d.id}`},{label:sub.label,path:`sous-domaine/${s.id}/${d.id}/${sub.id}`},{label:seq.title,path:`sequence/${seq.id}`},{label:sess.title}]);
 const parcours=[...new Set(sess.resources.map(r=>r.parcours).filter(Boolean))];
 const parcoursControl=parcours.length?`<div class="filter-control" style="max-width:280px;margin:12px 0"><label for="parcours-select">Parcours</label><select id="parcours-select"><option value="">Tous</option>${parcours.sort().map(p=>`<option value="${escape(p)}">Parcours ${escape(p)}</option>`).join('')}</select></div>`:'';
 const items=sess.resources.map(r=>`<div class="resource-item" data-parcours="${escape(r.parcours||'')}"><div class="file-icon">${icon(r.type==='pdf'?'files':r.type==='html'?'game':'play')}</div><div class="file-copy"><h3>${escape(r.label)}</h3><p>${r.type==='pdf'?'PDF':r.type==='html'?'Jeu interactif':r.type==='image'?'Image':'Vidéo'}${r.parcours?' · Parcours '+escape(r.parcours):''}</p></div>${a(resourceRoute(r),'Ouvrir','button ghost small','arrow')}</div>`).join('');
 return `<div class="lesson-cover"><div class="tags"><span class="tag">Classe ${escape(sess.classe)}</span><span class="tag gold">Exemple</span></div><h1>${escape(sess.title)}</h1></div><div class="section-head"><h2>Ressources</h2></div>${parcoursControl}<div class="resource-panel">${items}</div>`;
 }
 function updateParcours(){const p=document.getElementById('parcours-select');if(!p)return;document.querySelectorAll('.resource-item[data-parcours]').forEach(el=>{el.hidden=!!(p.value&&el.dataset.parcours&&el.dataset.parcours!==p.value);el.style.display=el.hidden?'none':''})}
 function allResources(){bread([{label:'Accueil',path:'accueil'},{label:'Ressources'}]);return `${title('Bibliothèque')}<div class="res-filters"><div class="filter-control"><label for="search">Rechercher</label><input id="search" type="search" placeholder="Ex. : énergie, homophones, calcul..."></div><div class="filter-control"><label for="class-select">Classe</label><select id="class-select"><option value="">Toutes les classes</option><option value="601">601</option><option value="501">501</option><option value="502">502</option></select></div><div class="filter-control"><label for="type-select">Type de ressource</label><select id="type-select"><option value="">Tous les formats</option><option value="pdf">PDF</option><option value="html">Activité HTML</option><option value="image">Illustration</option><option value="video">Vidéo externe</option></select></div></div><div class="counter" id="result-count"></div><div id="result-list" class="catalogue-list"></div>`}
 function files(){return DATA.sessions.flatMap(sess=>sess.resources.map(r=>({...r,subject:sess.subject,session:sess,subjectName:bySubject(sess.subject).label}))) }
 function updateResources(){const input=document.getElementById('search');if(!input)return;const q=input.value.toLocaleLowerCase('fr'),classe=document.getElementById('class-select').value,t=document.getElementById('type-select').value;const items=files().filter(r=>(!classe||r.session.classe===classe)&&(!t||r.type===t)&&(!q||[r.label,r.session.title,r.subjectName,r.session.classe].join(' ').toLocaleLowerCase('fr').includes(q)));document.getElementById('result-count').textContent=`${items.length} ressource${items.length>1?'s':''}`;document.getElementById('result-list').innerHTML=items.length?items.map(r=>`<article class="catalogue-card"><div class="tags"><span class="tag">Classe ${r.session.classe}</span><span class="tag gold">${({pdf:'PDF',html:'Jeu HTML',image:'Image',video:'Vidéo'})[r.type]||r.type}</span><span class="tag">Exemple</span></div><h3>${escape(r.label)}</h3><p>${escape(r.subjectName)} • ${escape(r.session.title)}</p><div class="item-foot">${a('seance/'+r.session.id,'Voir la séance','text-link','arrow')}${a(resourceRoute(r),'Ouvrir','text-link','external')}</div></article>`).join(''):empty('Aucun résultat','Essaie un autre mot ou supprime un filtre.')}
function gamesPage(){
 bread([{label:'Jeux'}]);
 const games=files().filter(r=>r.type==='html');
 return `${title('Jeux')}<div class="games-grid">${games.map(r=>`<article class="game-card"><div class="game-badge">${icon('game')}</div><div class="tags"><span class="tag gold">Exemple</span></div><h3>${escape(r.label)}</h3>${a('application/'+r.id,'Jouer','button gold','play')}</article>`).join('')}</div>`;
 }
 function resourceById(id){return files().find(x=>x.id===id)}
 function viewer(id,kind){
 const r=resourceById(id);
 if(!r||(kind==='media'?!['image','video'].includes(r.type):r.type!==kind)){notFound();return ''}
 const s=r.session;
 bread([{label:'Accueil',path:'accueil'},{label:bySubject(s.subject).label,path:'matiere/'+s.subject},{label:s.title,path:'seance/'+s.id},{label:r.label}]);
 const back=a('seance/'+s.id,'Retour à la séance','button ghost small','back');
 const isExternal=/^https:\/\//i.test(r.url);
 const link=`<a href="${escape(r.url)}" class="button gold small" target="_blank" rel="noopener noreferrer">${icon('external')}${kind==='pdf'?'Ouvrir le PDF':kind==='html'?'Ouvrir le jeu seul':kind==='media'?'Ouvrir le média':'Ouvrir'}</a>`;
 let inner='';
 if(kind==='pdf')inner=`<div class="viewer-shell"><div class="viewer-toolbar"><h3>Lecture du document</h3><div style="display:flex;gap:8px;flex-wrap:wrap">${link}<a class="button ghost small" href="${escape(r.url)}" download>${icon('download')}Télécharger</a></div></div><iframe class="viewer-frame" src="${escape(r.url)}#view=FitH" title="Aperçu du document PDF"></iframe></div><p class="content-note">Si le PDF ne s'affiche pas dans ton navigateur, utilise « Ouvrir le PDF » ou « Télécharger ».</p>`;
 else if(kind==='html')inner=`<div class="viewer-toolbar" style="background:var(--surface);border:1px solid var(--line);border-radius:14px;margin-bottom:12px"><h3>Memory — activité de démonstration</h3>${link}</div><iframe src="${escape(r.url)}" class="iframe-app" title="Jeu interactif ${escape(r.label)}"></iframe>`;
 else if(r.type==='image')inner=`<div class="viewer-shell" style="text-align:center;padding:25px"><img src="${escape(r.url)}" alt="${escape(r.label)}" style="max-height:550px;width:auto;object-fit:contain"></div><div style="margin:14px 0">${link}</div>`;
 else inner=isExternal?`<div class="resource-panel"><h3>Vidéo sur une plateforme externe</h3><p class="content-note">Ce média s'ouvre sur son site d'origine. Une connexion Internet peut être nécessaire.</p>${link}</div>`:empty('Adresse vidéo à vérifier','La vidéo doit pointer vers une adresse https autorisée et vérifiée avant publication.');
 return `<div class="page-heading"><div class="tags"><span class="tag gold">Démonstration</span><span class="tag">Classe ${s.classe}</span></div><h1>${escape(r.label)}</h1><p>${kind==='pdf'?'Document PDF.':kind==='html'?'Application interactive intégrée à la page.':'Média associé à la séance.'}</p></div>${inner}<div style="margin-top:21px">${back}</div>`;
 }
function infoPage(){
 bread([{label:'À propos'}]);
 return `${title('À propos')}<div class="resource-panel"><p>Espace pédagogique — M. GIRARD.</p><p class="content-note">Les ressources marquées « Exemple » servent à présenter le site. Ce portail est public.</p></div>`;
 }
 function notFound(){bread([{label:'Accueil',path:'accueil'},{label:'Page introuvable'}]);APP.innerHTML=`${empty('Page introuvable','Cette rubrique est indisponible dans le catalogue actuel.')}<p style="text-align:center;margin:20px">${a('accueil','Retour à l’accueil','button gold','back')}</p>`}
 function render(){const parts=routeParts();const route=parts[0];document.body.classList.toggle('home-view',route==='accueil');document.body.classList.toggle('subject-view',route==='matiere'&&!!bySubject(parts[1]));document.body.classList.toggle('domain-view',route==='domaine'&&!!byDomain(bySubject(parts[1]),parts[2]));let html='';let current='accueil';try{switch(route){case'accueil':html=index();break;case'matiere':{const s=bySubject(parts[1]);if(!s)return notFound();current=s.id;html=subjectPage(s);break;}case'domaine':{const s=bySubject(parts[1]),d=byDomain(s,parts[2]);if(!d)return notFound();current=s.id;html=domainPage(s,d);break;}case'sous-domaine':{const s=bySubject(parts[1]),d=byDomain(s,parts[2]),x=bySub(d,parts[3]);if(!x)return notFound();current=s.id;html=subPage(s,d,x);break;}case'sequence':{const seq=bySequence(parts[1]);if(!seq)return notFound();const ss=bySession(seq.sessions[0]);current=ss.subject;html=seqPage(seq);break;}case'seance':{const ss=bySession(parts[1]);if(!ss)return notFound();current=ss.subject;html=sessionPage(ss);break;}case'ressources':current='ressources';html=allResources();break;case'jeux':current='jeux';html=gamesPage();break;case'document':{let r=resourceById(parts[1]);current=r?.subject||'ressources';html=viewer(parts[1],'pdf');break;}case'application':{let r=resourceById(parts[1]);current='jeux';html=viewer(parts[1],'html');break;}case'media':{const r=resourceById(parts[1]);current=r?.subject||'ressources';html=viewer(parts[1],'media');break;}case'a-propos':html=infoPage();break;default:return notFound()}APP.innerHTML=html;nav(current);if(route==='ressources')updateResources();document.title=`${BREAD.lastElementChild?.textContent||'Accueil'} | Espace pédagogique — M. GIRARD`;}catch(e){console.error('Erreur du site',e);APP.innerHTML=empty('Erreur de chargement','Ouvre à nouveau index.html. Si le problème persiste, consulte le guide du site.')}}
 document.addEventListener('input',e=>{if(e.target.id==='search')updateResources()});document.addEventListener('change',e=>{if(['class-select','type-select'].includes(e.target.id))updateResources();if(e.target.id==='parcours-select')updateParcours()});
 window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'})});
 // Thème sombre permanent : aucune bascule ni lecture de préférence locale.
 document.documentElement.dataset.theme='dark';
 render();
})();
