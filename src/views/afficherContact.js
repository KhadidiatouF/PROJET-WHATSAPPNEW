// function showChatInterface() {
//     document.getElementById('loginScreen').classList.add('hidden');
//     document.getElementById('chatInterface').classList.remove('hidden');
    
//     // Initialiser l'avatar de l'utilisateur
//     const avatar = document.getElementById('userAvatar');
//     avatar.textContent = currentUser.prenom.charAt(0).toUpperCase();
    
//     // Charger les contacts
//     loadContacts();
    
//     // Compter les archives
//     updateArchiveCount();
//   }
import { afficherConversation } from "./afficherConv.js";
import { getCurrentUser } from "../store/userStore.js";

export function afficherContacts(data) {
  const container = document.getElementById("contacts-container");
  container.innerHTML = "";

  data.utilisateurs.forEach(utilisateur => {
    if (!utilisateur.nom) return;

    const div = document.createElement("div");
    div.textContent = `${utilisateur.prenom} ${utilisateur.nom}`;
    div.className = "p-2 border-b cursor-pointer";

    div.addEventListener("click", () => {
      const currentUser = getCurrentUser();
      afficherConversation(currentUser.id, utilisateur.id, data);
    });

    container.appendChild(div);
  });
}

