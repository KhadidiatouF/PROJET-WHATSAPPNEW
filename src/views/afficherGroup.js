// import { getGroupe } from "../services/server.js";
// import { profil } from "../views/afficherProfil.js";
// import { utilisateurs } from "../data.json";

import { getGroupe, getUser } from "../services/server.js";

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
                  </div>
                `;
                div.appendChild(element);
              }
            });
          });
        });
      });

    return div;

}

