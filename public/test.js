'use strict';


let mappe = new Map();
                
let pTags = document.querySelectorAll('p');

pTags.forEach ( el => {
 mappe.set ( el, {
  content: el.innerHTML,
  value: 0
 });
 el.onclick = evt => {
  mappe.get(evt.currentTarget).value++;
  evt.currentTarget.innerHTML = mappe.get(evt.currentTarget).value;
  setTimeout ( target => {
    console.log ( target );
    target.innerHTML = mappe.get(target).content;
   },
   1000,
   evt.currentTarget
  )
 }
});