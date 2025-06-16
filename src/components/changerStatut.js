import { getGroupe, getUser, updateGroupe } from "../services/server.js";
import { etat, getUserById } from "../store/userStore.js";

export function changerStatutMembre() {

    
  // const idUser = localStorage.getItem('userIdConnected')
        const overlay = document.createElement("div");
        overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
      
        const modal = document.createElement("div");
        modal.className = "bg-[#202c33] w-[60rem] rounded-[40px] shadow-lg p-10 relative";
      
        modal.innerHTML = `
          <button id="fermerModal" class="absolute top-4 right-4 text-white hover:text-red-500 text-2xl font-bold">&times;</button>
      <h2 class="text-2xl font-bold text-center text-[#ffffff] mb-8">CHANGER STATUT MEMBRE</h2>
  
      <div class=" w-1/2  flex flex-col mx-auto">
        <div class="">
          
        </div>
      
        <div class="members">
          <label class="block font-bold mb-1 text-white">Membres :</label>
          <div class="membr w-full p-4 bg-white rounded-lg"> 
            <div class="flex gap-4 justify-between"> 
              <div class="flex gap-5"> 
             
              </div>


             </div>               
           
          </div>

        </div>
      
      </div>
  
      <small class="error-msg text-red-500 text-xl hidden mt-4 block">Message erreur</small>
      <small class="success-msg text-green-600 text-sm hidden mt-4 block font-semibold">Contact ajouté avec succès !</small>
  
      <div class="text-center mt-8">
        <button id="validerGroup" class="bg-[#ffffff] text-black font-bold px-10 py-3 rounded-[20px] hover:bg-[#4ba94d]">
          Réactualiser
        </button>
      </div>
        `;
      
        overlay.appendChild(modal);


        const membreContainer = modal.querySelector('.membr');

        getUser().then(u => {
          const membresGroupe = etat.groupeClicked.membres;

          membresGroupe.forEach(membre => {
            const user = getUserById(membre.id, u); 

            const div = document.createElement('div');
            div.className = "flex gap-4 justify-between items-center mb-2";

            div.innerHTML = `
              <label class="block font-bold text-black">${user.nom} ${user.prenom}</label>
              <div class="flex gap-4 items-center">
                <i class="state fa-solid fa-power-off cursor-pointer ${membre.statut === 'Admin' ? 'text-green-500' : 'text-gray-500'}"></i>
                <i class="supp fa-solid fa-minus text-red-500 cursor-pointer"></i>
              </div>
            `;

            membreContainer.appendChild(div);


              const icons = div.querySelectorAll('i');
              const state = icons[0];
              const supIcon = icons[1]; 

              state.addEventListener('click', async () => {
                membre.statut = membre.statut === 'Admin' ? 'Simple' : 'Admin';
                state.classList.toggle('text-green-500');
                state.classList.toggle('text-gray-500');

                 const groupeId = etat.groupeClicked;
                                             
                                       
                   const success = await updateGroupe(groupeId);
                                              
                    if (success) {
                    alert("Groupe actualisé !");
                   } else {
                    alert("Échec !");
                   }
              });


              supIcon.addEventListener('click', async () => {
                const index = etat.groupeClicked.membres.findIndex(m => m.id === membre.id);
              
                if (index !== -1) {
                  etat.groupeClicked.membres.splice(index, 1); 
                  div.remove();
              
                  const success = await updateGroupe(etat.groupeClicked);
              
                  if (success) {
                    alert("Membre retiré !");
                  } else {
                    alert("Échec de la mise à jour !");
                  }
                }
              });

          });
          
        });


       
      



        // getUser().then(data=>{
        //       // console.log(data);
              // const userConnecte = getUserById(idUser,data)
        //       // console.log(userConnecte);
        
        //       const membre= modal.querySelector('.membr')
        //       data.forEach(u => {
        //         console.log(u);
                
        //         if (userConnecte.contacts.includes(Number (u.id))) {
        //           const div = document.createElement('div')
        //           div.className ="flex gap-4 justify-between"
        //           div.innerHTML = `
             
               
        //                 <label class="block font-bold  text-black">${u.nom} ${u.prenom}</label>
        //                 <div class="flex gap-5">
        //                   <div class=""><i class=" text-zinc-700 fa-solid fa-power-off ${u.statut === 'Admin' ? 'text-green-600' : 'text-gray-500'}"></i> </div>
        //                   <div class=""><i class="text-red-600 fa-solid fa-minus"></i> </div>
        //                 </div>
                        
                    
        //           `
        //           membre.appendChild(div)
        //         }
               
        //       });
              
        // })

        modal.addEventListener('click', (e) => {
          e.stopPropagation(); 
        });
        
       
        modal.querySelector('#fermerModal').addEventListener('click', () => {
          overlay.remove();
        });
        
        return overlay;
}
      
