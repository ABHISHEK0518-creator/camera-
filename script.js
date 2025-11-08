// Data and UI logic for the SecureSight demo site
// Local asset images (already placed in the `assests/` folder)
const assetFiles = [
  'assests/camera1.png.jpg',
  'assests/camera2.png.jpg',
  'assests/camera3.png.jpg'
];

// Show only three cameras: use the three local assets. Specs should be defined directly in the `cameras` array in code.
const cameras = [
  {
    id: 'asset-1',
    name: 'DUAL LENS CAMERA',
type: 'dome',
specs: [
  "SMART 5MP+5MP SINGLE LENS 360",
  "4K VIDEO RESOLUTION",
  "128GB MEMORY CARD",
  "40 WATT SOLAR PANEL",
  "WIFI NETWORK"
],
price: 23000,
oldPrice: 25000,
    currencySymbol: '₹',
    showInstall: false,
    img: assetFiles[0]
  },
  {
    id: 'asset-2',
    name: 'SINGLE LENS CAMERA',
    type: 'dome',
    specs: [
        "SMART 3MP SINGLE LENS 360",
  "2K VIDEO RESOLUTION",
  "128GB MEMORY CARD",
  "30 WATT SOLAR PANEL",
  "4G NETWORK"

    ],
    price: 17000,
    oldPrice: 19000,
    currencySymbol: '₹',
    showInstall: false,
    img: assetFiles[1]
  },
  {
    id: 'asset-3',
    name: 'SOLAR MINI CAMERA',
    type: 'dome',
    specs: [
        "SMART 3MP SINGLE LENS 360",
  "4K VIDEO RESOLUTION",
  "256GB MEMORY CARD",
  "7W SOLAR PANEL",
    ],
    price: 15000,
    oldPrice: 13000,
    currencySymbol: '₹',
    showInstall: false,
    img: assetFiles[2]
  }
];

// Gallery will include the local assets, the 7 installed photos from `assests/installed1-7.png`,
// plus an optional external fallback image.
const galleryImages = [
  'assests/installed/installed1.png',
  'assests/installed/installed2.png',
  'assests/installed/installed3.png',
  'assests/installed/installed4.png',
  'assests/installed/installed5.png',
  'assests/installed/installed6.png',
  'assests/installed/installed7.png'
];

function el(selector){return document.querySelector(selector)}

// Helper: format a camera price with optional currency symbol
function formatPrice(cam){
  if(typeof cam.price === 'number' && cam.price > 0){
    if(cam.currencySymbol){
      // use toLocaleString for thousands separators
      return cam.currencySymbol + cam.price.toLocaleString();
    }
    return '$' + cam.price.toFixed(2);
  }
  return 'Call for price';
}

// Render camera cards
function renderCameras(list){
  const grid = el('#cameraGrid');
  grid.innerHTML = '';
  list.forEach(cam => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${cam.img}" alt="${cam.name}" loading="lazy"/></div>
      <div class="card-body">
        <div>
          <span class="type-badge">${cam.type.toUpperCase()}</span>
          <h4>${cam.name}</h4>
        </div>
        ${ (Array.isArray(cam.specs) && cam.specs.length) ? `<ul class="spec-list">${cam.specs.slice(0,4).map(s => `<li>${s}</li>`).join('')}</ul>` : '' }
        <div class="price-wrap">
          ${ (typeof cam.oldPrice === 'number' && cam.oldPrice > 0) ? `<div class="price-old">${cam.currencySymbol ? cam.currencySymbol + cam.oldPrice.toLocaleString() : '$'+cam.oldPrice.toFixed(2)}</div>` : '' }
          <div class="price-new">${formatPrice(cam)}</div>
        </div>
        ${ cam.showInstall === false ? '' : `<button class="install-btn" data-id="${cam.id}">Install</button>` }
      </div>
    `;
    grid.appendChild(card);
  });
}

// Render gallery
function renderGallery(){
  const g = el('#galleryGrid');
  g.innerHTML = '';
  galleryImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Installed camera example';
    img.loading = 'lazy';
    img.addEventListener('click', ()=> openLightbox(src));
    g.appendChild(img);
  });
}

// Specs are now managed directly in the `cameras` array in code; persistence/editor removed.

// OCR processing removed — specs will be entered manually to avoid load delay.

// Lightbox
const lightbox = el('#lightbox');
const lbImg = el('#lightboxImg');
const lbClose = el('#lightboxClose');
function openLightbox(src){
  lbImg.src = src; lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lbImg.src = '';
  lightbox.setAttribute('aria-hidden','true');
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });

// Counters animation
function animateCounters(){
  const elems = document.querySelectorAll('.stat-value');
  elems.forEach(elm => {
    const target = +elm.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));
    const timer = setInterval(()=>{
      current += step;
      if(current >= target){ elm.textContent = target; clearInterval(timer); }
      else elm.textContent = current;
    },12);
  });
}

// Cleanup: remove any stray standalone text nodes equal to 'uud'
function removeStrayTextNodes(root = document, stray = 'uud'){
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
  const nodesToRemove = [];
  let node;
  while(node = walker.nextNode()){
    if(node.nodeValue && node.nodeValue.trim() === stray){
      nodesToRemove.push(node);
    }
  }
  nodesToRemove.forEach(n => n.parentNode && n.parentNode.removeChild(n));
}

// Filter UI (optional element). Guard in case the filter was removed from the page.
const filterSelect = el('#filterSelect');
if(filterSelect){
  filterSelect.addEventListener('change', () => {
    const val = filterSelect.value;
    if(val === 'all') renderCameras(cameras);
    else renderCameras(cameras.filter(c=>c.type===val));
  });
}

// Contact form (demo only) — guard in case the form was removed from the page.
const contactForm = el('#contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks! This is a demo form — in a real site the data would be sent to the installer.');
    e.target.reset();
  });
}

// Init
function init(){
  // Remove any stray 'uud' text nodes that may have been injected or left in the DOM
  removeStrayTextNodes(document, 'uud');
  renderGallery();
  animateCounters();
  // render the fixed camera list (specs should be set in the cameras array)
  renderCameras(cameras);
  document.getElementById('year').textContent = new Date().getFullYear();
  // example: clicking install shows quick modal/alert
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('.install-btn');
    if(!btn) return;
    const cam = cameras.find(c=>c.id === btn.dataset.id);
    if(cam) {
      const priceText = formatPrice(cam);
      alert(`You selected ${cam.name} — Price: ${priceText}. Contact us for a site survey.`);
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
