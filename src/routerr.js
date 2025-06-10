import { connexionU } from "./components/connexionU.js";
import { interfaceU } from "./layouts/layouts.js";
import { inscriptionU } from "./components/inscriptionU.js";


const route = {
    "/login": connexionU,
    "/homePage": interfaceU,
    "/inscriptionPage": inscriptionU,


}

export function router(cheminFichier) {
 const vue = route[cheminFichier]  
 const app = document.querySelector('#app')
 app.innerHTML=""
 if ( vue() instanceof Node) {
   app.appendChild(vue()) 
   
 }

}