import { createGroupe, getGroupe, getUser } from "../services/server.js";
import { getUserById } from "../store/userStore.js";
import { afficherMessage } from "../views/afficherConv.js";
import { listeGroupe } from "../views/afficherGroup.js";



export function ajoutGroupe() {
  const idUser = localStorage.getItem('userIdConnected')
 


    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
   
    const modal = document.createElement("div");
    modal.className = "bg-[#202c33] w-[60rem] rounded-[40px] shadow-lg p-10 relative";
  
    modal.innerHTML = `
      <button id="fermerModal" class="absolute top-4 right-4 text-white hover:text-red-500 text-2xl font-bold">&times;</button>
      <h2 class="text-2xl font-bold text-center text-[#ffffff] mb-8">NOUVEAU GROUPE</h2>
  
      <div class=" w-1/2  flex flex-col mx-auto">
        <div class="">
          <label class="block font-bold mb-1 text-white">Nom du groupe:</label>
          <input id="nomG" type="text" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>
       
        <div class="members">
          <label class="block font-bold mb-1 text-white">Membres :</label>
          <div class="memb w-full p-4 bg-white rounded-lg">
           
          </div>

        </div>
      
      </div>
  
      <small class="error-msg text-red-500 text-xl hidden mt-4 block">Message erreur</small>
      <small class="success-msg text-green-600 text-sm hidden mt-4 block font-semibold">Contact ajouté avec succès !</small>
  
      <div class="text-center mt-8">
        <button id="validerGroup" class="bg-[#ffffff] text-black font-bold px-10 py-3 rounded-[20px] hover:bg-[#4ba94d]">
          Ajouter le groupe
        </button>
      </div>
    `;
  
    overlay.appendChild(modal);
  
    const btnValider = modal.querySelector("#validerGroup");
    const btnFermer = modal.querySelector("#fermerModal");
    const errorText = modal.querySelector(".error-msg");
    const successText = modal.querySelector(".success-msg");
    getUser().then(data=>{
      const userConnecte = getUserById(idUser,data)

      const membre= modal.querySelector('.memb')
      data.forEach(u => {
        if (userConnecte.contacts.includes(Number (u.id))) {
          const div = document.createElement('div')
          div.className ="flex gap-4 justify-between"
          div.innerHTML = `
                <label class="block font-bold  text-black">${u.nom} ${u.prenom}</label>
                <input id="" type="checkbox" class=""/>
          `
          membre.appendChild(div)
        }
       
      });
      
    })
  
    btnValider.addEventListener("click", async () => {
      const nom = modal.querySelector("#nomG").value.trim();
  
      errorText.classList.add("hidden");
      successText.classList.add("hidden");
  
      if (!nom) {
        errorText.textContent = "Tous les champs sont obligatoires.";
        errorText.classList.remove("hidden");
        return;
      }

      const groupes = await getGroupe();
          const user = await getUser(); // Si pas déjà dans une variable globale

      const membresCoches = [];

      const checkboxes = modal.querySelectorAll('.memb input[type="checkbox"]');
      const labels = modal.querySelectorAll('.memb label');

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          // Trouver l'ID correspondant à ce contact
          const nomComplet = labels[index].textContent.trim();
          const [nom, prenom] = nomComplet.split(" ");

          const contact = user.find(u => u.nom === nom && u.prenom === prenom);

          if (contact) {
            membresCoches.push({
              id: contact.id,
              statut: "Membre",
              messages: []
            });
          }
        }
      });

      const newGroupe = {
        id: String(groupes.length + 1),
        nom,
        membres: [
          {
            id: idUser,
            statut: "Admin",
            messages: []
          },
          ...membresCoches
        ]
      };

     const success = await createGroupe(newGroupe);

  
    //   const groupes = await getGroupe();
        
    //   const newGroupe = {
    //     id: String(groupes.length + 1),
    //     nom,
    //       membres:[
    //        {
    //         id:idUser,
    //         statut:"Admin",
    //         messages:[]
    //        }
    //       ]
    //   };
      
  
    // //   console.log("Nouveau contact à enregistrer :", newContact);
    //     const success = await createGroupe(newGroupe);

        if (success) {
                  errorText.textContent = 'Ajout réussie !';
                  errorText.classList.add('text-green-600');
                } else {
                  errorText.textContent = "Erreur lors de l'inscription.";
                  errorText.classList.remove("hidden");
                
        }
    
  
    //   successText.classList.remove("hidden");
  
    //   modal.querySelector("#nom").value = "";
    //   modal.querySelector("#prenom").value = "";
    //   modal.querySelector("#numero").value = "";
    //   modal.querySelector("#pays").value = "";
  
    //   setTimeout(() => {
    //     successText.classList.add("hidden");
    //   }, 3000);
    });
  
    btnFermer.addEventListener("click", () => {
      overlay.classList.add('hidden');
    });
    return overlay;
}
  