'use strict';

export default {
    DOMElementAnlegen({
        inhalt=false,
        klassen=[],
        eltern=document.body,
        typ='div',
        checkbox=''
    }={}){
        let neu = document.createElement(typ);
        if ( inhalt ) neu.innerHTML = inhalt;
        if ( klassen.length ) neu.className = klassen.join(' ');
        if ( checkbox === "checkbox" ) neu.setAttribute("type", "checkbox");
        eltern.appendChild ( neu );
        return neu;
    }
}