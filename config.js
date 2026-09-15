window.__TT_API_BASE__='';

document.addEventListener('DOMContentLoaded',()=>{
  const phone=document.getElementById('phone');
  const form=document.getElementById('bookingForm');
  if(!phone||!form)return;
  phone.setAttribute('inputmode','tel');
  phone.setAttribute('autocomplete','tel');
  phone.setAttribute('placeholder','+254 7XXXXXXXX or 07XXXXXXXX or 01XXXXXXXX');
  phone.setAttribute('title','Enter a Kenyan mobile number starting with +254, 07, or 01.');
  const normalize=(value)=>{
    let p=String(value||'').trim().replace(/[\s()\-]/g,'');
    if(/^\+254(?:7|1)\d{8}$/.test(p))return p;
    if(/^254(?:7|1)\d{8}$/.test(p))return '+'+p;
    if(/^0(?:7|1)\d{8}$/.test(p))return '+254'+p.slice(1);
    return null;
  };
  phone.addEventListener('blur',()=>{
    const n=normalize(phone.value);
    if(n)phone.value=n;
  });
  form.addEventListener('submit',e=>{
    const n=normalize(phone.value);
    if(!n){
      e.preventDefault();
      e.stopImmediatePropagation();
      phone.setCustomValidity('Please enter a Kenyan mobile number starting with +254, 07, or 01.');
      phone.reportValidity();
      return;
    }
    phone.setCustomValidity('');
    phone.value=n;
  },true);
});