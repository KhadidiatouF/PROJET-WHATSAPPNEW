import { getGroupe } from "../services/server.js";
// import { profil } from "../views/afficherProfil.js";
// import { utilisateurs } from "../data.json";

export  function listeGroupe() {
  
    const div = document.createElement('div');


    getGroupe().then(data =>{ 
        // console.log(data);

        data.forEach(g => {
         let initial = g.nom.charAt(0).toUpperCase() ;
 
            // const taille = u.messages.length - 1
            const element = document.createElement('div')
            element.className=" contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800"
            element.innerHTML= `
                 <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white flex-row ">
                 ${initial} 
                 </div>
                       <div class="ml-3 flex-1 min-w-0">
                           <div class="flex items-center justify-between">
                               <h3 class="text-white font-medium truncate">${g.nom}  </h3>
                               <span class="text-xs text-gray-500">00:46</span>
                           </div>
                           <p class="text-sm text-white  truncate mt-1">${g.membres[0].nom}</p>
                       </div>
         
       `


     
       div.appendChild(element)
        });
      })

    return div;

}

