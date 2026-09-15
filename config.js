window.__TT_API_BASE__='';

document.addEventListener('DOMContentLoaded',()=>{
  const phone=document.getElementById('phone');
  const form=document.getElementById('bookingForm');
  if(!phone||!form)return;
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
  phone.addEventListener('blur',()=>{
    const n=normalize(phone.value);
    if(n)phone.value=n;
  });
  form.addEventListener('submit',e=>{
    const n=normalize(phone.value);
    if(!n){
      e.preventDefault();
      e.stopImmediatePropagation();
      phone.setCustomValidity('Please enter a valid international phone number with a country code, such as +254712345678 or +447123456789. Kenyan 07 and 01 numbers are also accepted.');
      phone.reportValidity();
      return;
    }
    phone.setCustomValidity('');
    phone.value=n;
  },true);
});