

import { getUser } from "../services/server.js";

export  function afficherMessage() {
  
    const div = document.createElement('div');

   
    getUser().then(data =>{ 
      const idUser = localStorage.getItem('userIdConnected')

      const user = data.find(u => u.id=== idUser)
  
        data.forEach(u => {
            
            // const taille = u.messages.length - 1
            const element = document.createElement('div')
            element.className=" flex-1 overflow-y-auto p-4 bg-[#0b141a] rounded-tr-[50px] rounded-br-[50px]"
            if (u.messages && u.messages.length >0) {
              element.innerHTML= `
              <div id="zone-discussion" class="messagesList space-y-3">
                  <!-- Message reçu et Message envoyé -->

              
                  <div class="flex justify-start">
                      <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#202c33] text-white shadow-sm">
                          <p> ${ u.messages[0].contenu}</p>
                          <div class="flex items-center justify-end mt-1">
                              <span class="text-xs text-gray-500">15:52</span>
                          </div>
                      </div>
                  </div>

                  <div class="flex justify-end">
                      <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                          <p>${user}</p>
                          <div class="flex items-center justify-end mt-1">
                              <span class="text-xs text-green-100">15:16</span>
                              <i class="fas fa-check-double ml-1 text-green-100"></i>
                          </div>
                      </div>
                  </div> 
     `     
     div.appendChild(element)
              
            }
           
        });
      })

    return div;

}



// export function afficherMessage(contactId) {
//   const zoneDiscussion = document.getElementById('zone-discussion');
//   zoneDiscussion.innerHTML = ""; // Vider avant d'afficher

//   const utilisateurConnecte = utilisateurs.find(u => u.id === utilisateurConnecteId);
//   const contact = utilisateurs.find(u => u.id === contactId);

//   if (!utilisateurConnecte || !contact) return;

//   // Fusionner tous les messages entre les deux utilisateurs
//   const messagesFusionnes = [...utilisateurConnecte.messages, ...contact.messages]
//     .filter(m =>
//       (m.from == utilisateurConnecte.id && m.to == contact.id) ||
//       (m.from == contact.id && m.to == utilisateurConnecte.id)
//     )
//     .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // trier par date

//   // Affichage dans la zone
//   messagesFusionnes.forEach(msg => {
//     const isSentByUser = msg.from == utilisateurConnecte.id;
//     const messageDiv = document.createElement("div");

//     messageDiv.className = `p-2 m-1 rounded-xl max-w-[60%] ${isSentByUser ? 'bg-[#6dc262] text-white self-end ml-auto' : 'bg-[#e8e8e8] text-gray-800 self-start mr-auto'}`;
//     messageDiv.innerText = msg.contenu;

//     zoneDiscussion.appendChild(messageDiv);
//   });
// }
