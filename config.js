window.__TT_API_BASE__='';
window.TT_CONTACT_NUMBERS={tel:'254731099723',office:'254729842062'};
window.TT_ADMIN_WHATSAPP=localStorage.getItem('ttAdminWhatsApp')||window.TT_CONTACT_NUMBERS.tel;

function ttAddContacts(){
  const contact=document.getElementById('contact');
  if(!contact||contact.querySelector('.tt-dual-contacts'))return;
  const wrap=document.createElement('div');wrap.className='tt-dual-contacts';
  wrap.innerHTML=`<div><strong>Tel</strong><p>📞 <a href="tel:+254731099723">0731 099 723</a></p><a class="btn ghost dark" href="https://wa.me/254731099723">WhatsApp Tel</a></div><div><strong>Office</strong><p>📞 <a href="tel:+254729842062">0729 842 062</a></p><a class="btn ghost dark" href="https://wa.me/254729842062">WhatsApp Office</a></div>`;
  contact.appendChild(wrap);
}

function ttAddAdminContactChoice(){
  const content=document.getElementById('adminContent');
  if(!content||content.querySelector('#ttAdminContactChoice'))return;
  const box=document.createElement('div');box.id='ttAdminContactChoice';box.className='admin-contact-choice';
  box.innerHTML=`<label><b>Booking WhatsApp destination</b><select id="ttAdminWhatsAppSelect"><option value="254731099723">Tel — 0731 099 723</option><option value="254729842062">Office — 0729 842 062</option></select></label><small>Choose which Time & Tides number receives new customer booking requests on WhatsApp.</small>`;
  const tabs=content.querySelector('.admin-tabs');
  if(tabs)tabs.insertAdjacentElement('afterend',box);else content.prepend(box);
  const select=box.querySelector('select');select.value=window.TT_ADMIN_WHATSAPP;select.addEventListener('change',()=>{window.TT_ADMIN_WHATSAPP=select.value;localStorage.setItem('ttAdminWhatsApp',select.value);});
}

function ttNormalizeSmsNumber(value){
  let p=String(value||'').trim().replace(/[\s()\-]/g,'');
  if(p.startsWith('00'))p='+'+p.slice(2);
  if(/^0(?:7|1)\d{8}$/.test(p))p='+254'+p.slice(1);
  if(/^254(?:7|1)\d{8}$/.test(p))p='+'+p;
  return p;
}

function ttAddSmsButtons(){
  document.querySelectorAll('#adminBody .admin-item').forEach(item=>{
    if(item.querySelector('.tt-sms-button'))return;
    const text=item.textContent||'';
    const match=text.match(/(?:Tel|Phone)?\s*[:•]?\s*(\+?\d[\d\s()\-]{6,})/i);
    if(!match)return;
    const phone=ttNormalizeSmsNumber(match[1]);
    if(!phone)return;
    const actions=item.querySelector('.admin-actions')||item;
    const a=document.createElement('a');a.className='btn ghost dark tt-sms-button';a.href='sms:'+phone;a.textContent='SMS Customer';a.style.display='inline-block';a.style.textDecoration='none';
    actions.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  const phone=document.getElementById('phone');
  const form=document.getElementById('bookingForm');
  if(phone&&form){
    phone.setAttribute('inputmode','tel');
    phone.setAttribute('autocomplete','tel');
    phone.setAttribute('placeholder','International number: +country code + number');
    phone.setAttribute('title','Enter any international number with +country code, or a Kenyan number starting with 07 or 01.');
    const normalize=(value)=>{
      let p=String(value||'').trim().replace(/[\s()\-]/g,'');
      if(/^(?:\+[1-9]\d{6,14}|00[1-9]\d{6,14})$/.test(p))return p.startsWith('00')?'+'+p.slice(2):p;
      if(/^0(?:7|1)\d{8}$/.test(p))return '+254'+p.slice(1);
      if(/^254(?:7|1)\d{8}$/.test(p))return '+'+p;
      return null;
    };
    phone.addEventListener('blur',()=>{const n=normalize(phone.value);if(n)phone.value=n;});
    form.addEventListener('submit',e=>{const n=normalize(phone.value);if(!n){e.preventDefault();e.stopImmediatePropagation();phone.setCustomValidity('Please enter a valid international phone number with a country code, such as +254712345678 or +447123456789. Kenyan 07 and 01 numbers are also accepted.');phone.reportValidity();return;}phone.setCustomValidity('');phone.value=n;},true);
  }
  ttAddContacts();
  const observer=new MutationObserver(()=>{ttAddContacts();ttAddAdminContactChoice();ttAddSmsButtons();});
  observer.observe(document.body,{childList:true,subtree:true});
  ttAddAdminContactChoice();
  ttAddSmsButtons();
});

const ttOriginalOpen=window.open;
window.open=function(url,...args){
  if(typeof url==='string'&&url.startsWith('https://wa.me/254731099723?text=')&&window.TT_ADMIN_WHATSAPP){
    url=url.replace(/^https:\/\/wa\.me\/254731099723/, 'https://wa.me/'+window.TT_ADMIN_WHATSAPP);
  }
  return ttOriginalOpen.call(window,url,...args);
};
