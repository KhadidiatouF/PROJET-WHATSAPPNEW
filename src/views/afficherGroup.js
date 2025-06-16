// import { getGroupe } from "../services/server.js";
// import { profil } from "../views/afficherProfil.js";
// import { utilisateurs } from "../data.json";

import { changerStatutMembre } from "../components/changerStatut.js";
import { router } from "../routerr.js";
import { deleteGrp, getGroupe, getUser } from "../services/server.js";
import { etat }     from "../store/userStore.js";



export  function listeGroupe() {
  
    const div = document.createElement('div');

    const idUser = localStorage.getItem('userIdConnected')



    getGroupe().then(groupes => {
        getUser().then(data => {
          groupes.forEach(g => {
            const initial = g.nom.charAt(0).toUpperCase();
    
            g.membres.forEach(membre => {
              if (idUser === membre.id) {
                const element = document.createElement('div');
                element.className = "contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";
    
                const nomMembres = g.membres.map(m => {
                  const user = data.find(u => String(u.id) === String(m.id));
                  return user ? `${user.nom} ${user.prenom}` : "Inconnu";
                }).join(", ");
    
                element.innerHTML = `
                  <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white">
                    ${initial}
                  </div>
                  <div class="ml-3 flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3 class="text-white font-medium truncate">${g.nom}</h3>
                      <span class="text-xs text-gray-500">00:46</span>
                    </div>
                    <p class="text-sm text-white truncate mt-1">Membres : ${nomMembres}</p>

                     <div class="btnGrp  relative flex justify-end text-gray-300 "><i class="fa-solid fa-angle-down"></i>
                         <div class="menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
                             <ul class="py-2 text-sm text-white">
                                <li class="changer px-4 py-2  hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-power-off"></i> &nbsp; Changer statut membre</li>
                                <li class="changer px-4 py-2  hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-user-minus"></i> &nbsp; Retirer un membre</li>
                                <li class="sup px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i>  &nbsp; Supprimer groupe</li>
                                <li class="changer px-4 py-2  hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-ban"></i> &nbsp; Quitter le groupe</li>

                              </ul>
                          </div>
                     </div>
                  </div>
                `;
                div.appendChild(element);
                

                element.addEventListener('click', ()=>{
                  etat.groupeClicked = g
                  etat.userClicked = null
                  router("/homePage")
                  
                })



                const change = element.querySelector('.changer')
                
                change.addEventListener('click',  ()=>{
                  const overlay =  changerStatutMembre();
                  element.appendChild(overlay)

                })


                  const bouton = element.querySelector('.btnGrp')
                  const menu = element.querySelector('.menu');
                  
                  
                  bouton.addEventListener('click', (e)=>{
                  e.stopPropagation()
                    
                  menu.classList.toggle('hidden');
            
                  })
                
                  document.addEventListener('click', (e) => {
                    if (!bouton.contains(e.target)) {
                      menu.classList.add('hidden');
                    }
                  });


                  const supprim = element.querySelector('.sup');
                  supprim.addEventListener('click', async () => {
                  etat.groupeClicked= g
                  if (etat.groupeClicked === g) {
                  
                  const groupeId = etat.groupeClicked;
                             
                  const confirmed = confirm("Confirmer la suppression ?");
                  if (!confirmed) return;
                              
                  const success = await deleteGrp(groupeId);
                              
                  if (success) {
                  alert("Groupe supprimé !");
                  element.remove(); 
                  } else {
                  alert("Échec de la suppression !");
                  }
                  }
                  });



              }
            });
          });
        });
      });

    return div;

}

