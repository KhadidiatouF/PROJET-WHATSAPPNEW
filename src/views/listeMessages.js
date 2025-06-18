import { profil } from "../components/profil.js";
import { getCurrentTime } from "../components/time.js";
import { router } from "../routerr.js";
import { deleteUser, getUser } from "../services/server.js";

import { etat } from "../store/userStore.js";
import { afficherMessage } from "../views/afficherConv.js";

export  function listeMessage() {
  
    const div = document.createElement('div');

  
    getUser().then(data =>{ 
     

        const idUser = localStorage.getItem('userIdConnected')
        const user = data.find(u => u.id === idUser)
      
        data.forEach(u => {
         let initial = u.nom.charAt(0).toUpperCase() +  u.prenom.charAt(0).toUpperCase() ;
         
            
            
            if (user.contacts.includes(Number (u.id))) {
                
                const element = document.createElement('div')
                element.className="contact-item flex items-center p-4 hover:bg-gray-400  cursor-pointer border-b border-gray-800"
                element.innerHTML= `
                     <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white flex-row ">
                     ${initial} 
                     </div>
                           <div id="" class="ml-3 flex-1 min-w-0">
                               <div class="flex items-center justify-between">
                                   <h3 class="text-white font-bold truncate">${u.nom} ${u.prenom}  </h3>
                                   <span class="text-xs text-gray-500">${getCurrentTime()}</span>
                               </div>
                               
                                <p class="text-sm text-white truncate mt-1">
                                ${u.messages && u.messages.length > 0 ? u.messages[u.messages.length - 1].contenu : "Aucun message"}
                                </p>
                               <div class="boutonBas  relative flex justify-end text-gray-300 "><i class="fa-solid fa-angle-down"></i>
                                    <div class="dropdown-menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
                                    <ul class="py-2 text-sm text-white">
                                        <li class="px-4 py-2  hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-box-archive"></i> &nbsp;Archiver</li>
                                        <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-square-minus"></i> &nbsp;Bloquer</li>
                                        <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-thumbtack"></i>  &nbsp;Epingler </li>
                                        <li class="supprimer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i>  &nbsp;Supprimer</li>
                                    </ul>
                                    </div>
                               </div>
                               
                           </div>
             
               `
                div.appendChild(element)

                element.addEventListener('click', ()=>{
                        etat.userClicked=u
                        etat.groupeClicked=null
  
                                
                        router("/homePage")
                            
                        const user = data.find(u => 
                            u.nom.toLowerCase() === u.nom.toLowerCase() &&
                            u.prenom.toLowerCase() === u.prenom.toLowerCase()
                        );
                    
                        const nomComplet = user ? `${user.nom} ${user.prenom}` : `${u.nom} ${u.prenom}`;
                        const numero = user ? user.numero : u.numero;

                        // const nomComplet = `${u.nom} ${u.prenom}`;
                        // const numero = u.numero;
                        profil(initial, nomComplet, numero);
                            
                    })

            

            // if (etat.userClicked) {
            //     const user = data.find(u => 
            //         u.nom.toLowerCase() === u.nom.toLowerCase() &&
            //         u.prenom.toLowerCase() === u.prenom.toLowerCase()
            //     );
            
            //     const nomComplet = user ? `${user.nom} ${user.prenom}` : `${u.nom} ${u.prenom}`;
            //     const numero = user ? user.numero : u.numero;
            //     profil(initial, nomComplet, numero);
                
            // }
        

            const supprim = element.querySelector('.supprimer');
            supprim.addEventListener('click', async () => {
            etat.userClicked= user.contacts
                
            if (etat.userClicked === user.contacts) {
                // console.log(etat.userClicked);

                const userId = etat.userClicked;
            
                const confirmed = confirm("Confirmer la suppression ?");
                if (!confirmed) return;
            
                const success = await deleteUser(userId);
            
                if (success) {
                alert("Utilisateur supprimé !");
                element.remove(); 
                } else {
                alert("Échec de la suppression !");
                }
            }
            });
        

         

   
            const bouton = element.querySelector('.boutonBas')
         const menu = element.querySelector('.dropdown-menu');
        
        
        bouton.addEventListener('click', (e)=>{
         e.stopPropagation()
          
         menu.classList.toggle('hidden');
  
        })
        
        document.addEventListener('click', (e) => {
            if (!bouton.contains(e.target)) {
              menu.classList.add('hidden');
            }
          });
          
        }
            
 
        });
      

  
    })

     
    return div;

}

