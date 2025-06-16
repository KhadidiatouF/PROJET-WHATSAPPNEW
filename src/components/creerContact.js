import { createUser, updateUser } from "../services/server.js";
import { getUser } from "../services/server.js";
import { getUserById } from "../store/userStore.js";


export function ajouterContact() {
  const idUser = localStorage.getItem('userIdConnected')

    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";
  
    const modal = document.createElement("div");
    modal.className = "bg-[#202c33] w-[60rem] rounded-[40px] shadow-lg p-10 relative";
  
    modal.innerHTML = `
      <button id="fermerModal" class="absolute top-4 right-4 text-white hover:text-red-500 text-2xl font-bold">&times;</button>
      <h2 class="text-2xl font-bold text-center text-[#ffffff] mb-8">NOUVEAU CONTACT</h2>
  
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block font-bold mb-1 text-white">Nom :</label>
          <input id="nom" type="text" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>
  
        <div>
          <label class="block font-bold mb-1 text-white">Prénom :</label>
          <input id="prenom" type="text" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>
  
        <div>
          <label class="block font-bold mb-1 text-white">Pays :</label>
          <select id="pays" class="w-full border px-4 py-2 rounded-[20px]">
            <option value="fr">🇫🇷 France</option>
            <option value="sn">🇸🇳 Sénégal</option>
            <option value="us">🇺🇸 USA</option>
          </select>
        </div>
  
        <div>
          <label class="block font-bold mb-1 text-white">Numéro :</label>
          <input id="numero" type="tel" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>
      </div>
  
      <small class="error-msg text-red-500 text-xl hidden mt-4 block">Message erreur</small>
      <small class="success-msg text-green-600 text-sm hidden mt-4 block font-semibold">Contact ajouté avec succès !</small>
  
      <div class="text-center mt-8">
        <button id="validerContact" class="bg-[#ffffff] text-black font-bold px-10 py-3 rounded-[20px] hover:bg-[#4ba94d]">
          Ajouter le contact
        </button>
      </div>
    `;
  
    overlay.appendChild(modal);
  
    const btnValider = modal.querySelector("#validerContact");
    const btnFermer = modal.querySelector("#fermerModal");
    const errorText = modal.querySelector(".error-msg");
    const successText = modal.querySelector(".success-msg");
  
    btnValider.addEventListener("click", async () => {
      const nom = modal.querySelector("#nom").value.trim();
      const prenom = modal.querySelector("#prenom").value.trim();
      const pays = modal.querySelector("#pays").value;
      const numero = modal.querySelector("#numero").value.trim();
  
      errorText.classList.add("hidden");
      successText.classList.add("hidden");
  
      if (!nom || !prenom || !numero) {
        errorText.textContent = "Tous les champs sont obligatoires.";
        errorText.classList.remove("hidden");
        return;
      }
  
      const indicatifs = { fr: "+33", sn: "+221", us: "+1" };
      const numeroComplet = indicatifs[pays] + numero;

       const users = await getUser();
          const monAmi = users.find(u => u.numero === numeroComplet);
          const userC= getUserById(idUser, users)
          
      
          if (monAmi ) {
              errorText.textContent = "Cet utilisateur a déja un compte.";
              errorText.classList.remove("hidden");
              if (monAmi) {
                userC.contacts.push(Number(monAmi.id))
                userC = await updateUser(userC, idUser)
                
              }
              return;
            }
  
      const newContact = {
        id: String(users.length + 1),
        nom,
        prenom,
        pays,
        numero: numeroComplet,
        Online: false,
        archive: false,
        messages: [{contenu:""}],
        contacts: []
      };

      
      
  
        const success = await createUser(newContact);


        if (success) {
          
            successText.textContent = "Contact ajouté avec succès !";
            successText.classList.remove("hidden");
           
          
        } else {
          errorText.textContent = "Erreur lors de la création du contact.";
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
  