import { getUser, getGroupe } from "../services/server.js";

export function afficherListe(liste, type) {

    const idUser = localStorage.getItem('userIdConnected')

    const zone = document.querySelector('.contact'); // le conteneur HTML
    zone.innerHTML = '';

    if (type === 'groupes') {
        getGroupe().then(groupes => {
            getUser().then(data => {
              groupes.forEach(g => {
                const initial = g.nom.charAt(0).toUpperCase();
        
                g.membres.forEach(membre => {
                  if (idUser === membre.id) {
          const div = document.createElement('div');
          const initial = g.nom.charAt(0).toUpperCase();
          const nomMembres = g.membres.map(m => {
            const user = data.find(u => String(u.id) === String(m.id));
            return user ? `${user.nom} ${user.prenom}` : "Inconnu";
          }).join(", ");
    
          div.className ="contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";
    
      
          if (type === 'groupes') {
            div.innerHTML = ` <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white">
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
                      </div>`;
          }
      
          zone.appendChild(div);
          
        
        }
        });
       });
      });
     });
    }

    if (type === 'contacts') {
        
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
                                   <span class="text-xs text-gray-500">00:46</span>
                               </div>
                               
                               <p class="text-sm text-white  truncate mt-1">${u.messages && u.messages.length >0  ? u.messages[0].contenu : "Aucun message"}</p>
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
                zone.appendChild(element)
            }
         });
       });
    }
   

    if (type === 'toutes') {
        Promise.all([getUser(), getGroupe()]).then(([users, groupes]) => {
          const idUser = localStorage.getItem('userIdConnected');
          const user = users.find(u => u.id === idUser);
      
          // 🔹 1. Afficher les contacts du user connecté
          users.forEach(u => {
            const initial = u.nom.charAt(0).toUpperCase() + u.prenom.charAt(0).toUpperCase();
      
            if (user.contacts.includes(Number(u.id))) {
              const element = document.createElement('div');
              element.className = "contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";
              element.innerHTML = `
                <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white flex-row ">
                  ${initial}
                </div>
                <div class="ml-3 flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h3 class="text-white font-bold truncate">${u.nom} ${u.prenom}</h3>
                    <span class="text-xs text-gray-500">00:46</span>
                  </div>
                  <p class="text-sm text-white truncate mt-1">${u.messages && u.messages.length > 0 ? u.messages[0].contenu : "Aucun message"}</p>
                  <div class="boutonBas relative flex justify-end text-gray-300">
                    <i class="fa-solid fa-angle-down"></i>
                    <div class="dropdown-menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
                      <ul class="py-2 text-sm text-white">
                        <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-box-archive"></i> &nbsp;Archiver</li>
                        <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-square-minus"></i> &nbsp;Bloquer</li>
                        <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-thumbtack"></i> &nbsp;Epingler</li>
                        <li class="supprimer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i> &nbsp;Supprimer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              `;
              zone.appendChild(element);
            }
          });
      
          // 🔹 2. Afficher les groupes dont l'utilisateur est membre
          groupes.forEach(g => {
            const estMembre = g.membres.find(m => String(m.id) === String(idUser));
            if (estMembre) {
              const initial = g.nom.charAt(0).toUpperCase();
              const nomMembres = g.membres.map(m => {
                const membre = users.find(u => String(u.id) === String(m.id));
                return membre ? `${membre.nom} ${membre.prenom}` : "Inconnu";
              }).join(", ");
      
              const div = document.createElement('div');
              div.className = "contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";
      
              div.innerHTML = `
                <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white">
                  ${initial}
                </div>
                <div class="ml-3 flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h3 class="text-white font-medium truncate">${g.nom}</h3>
                    <span class="text-xs text-gray-500">00:46</span>
                  </div>
                  <p class="text-sm text-white truncate mt-1">Membres : ${nomMembres}</p>
                  <div class="btnGrp relative flex justify-end text-gray-300">
                    <i class="fa-solid fa-angle-down"></i>
                    <div class="menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
                      <ul class="py-2 text-sm text-white">
                        <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-power-off"></i> &nbsp;Changer statut membre</li>
                        <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-user-minus"></i> &nbsp;Retirer un membre</li>
                        <li class="sup px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i> &nbsp;Supprimer groupe</li>
                        <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-ban"></i> &nbsp;Quitter le groupe</li>
                      </ul>
                    </div>
                  </div>
                </div>
              `;
      
              zone.appendChild(div);
            }
          });
        });
      }
      


      

  }
  