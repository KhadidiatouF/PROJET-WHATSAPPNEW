import { profil } from "../components/profil.js";
import { getCurrentTime, getMinutes } from "../components/time.js";
import { getUser } from "../services/server.js";
import { getGroupe } from "../services/server.js";
import { etat }     from "../store/userStore.js";

export function afficherMessage() {  

          const div = document.createElement('div');
          div.className = "flex-1 overflow-y-auto p-4 bg-[#0b141a] rounded-tr-[50px] rounded-br-[50px]";

          if (etat.userClicked !== null) {
            
            getUser().then(data => {
              const idUser = localStorage.getItem('userIdConnected');
              const user  = data.find(u => u.id === idUser);
  
              const contact = data.find(u => u.id === etat.userClicked?.id); 
            
              console.log(contact);
              
              if (!user || !contact) return;                                     
  
              const messages = [...user.messages, ...contact.messages]
              .filter(m =>
                (m.from == user.id && m.to == contact.id) ||
                (m.from == contact.id && m.to == user.id)
              )
              .sort((a, b) => {
                const timeA = getMinutes(a.timestamp || a.heure);
                const timeB = getMinutes(b.timestamp || b.heure);
                return timeA - timeB;
              });
            
  
              const zone = document.createElement('div');
              zone.id        = "zone-discussion";
              zone.innerHTML = ''; 
              zone.className = "messagesList space-y-3";
  
              messages.forEach(m => {
                const sent   = m.from == user.id;
                const bloc   = document.createElement('div');
                bloc.className = sent ? "flex justify-end" : "flex justify-start";
  
              
  
                bloc.innerHTML = `
                  <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                              ${sent ? 'bg-green-500 text-white' : 'bg-[#202c33] text-white'}">
                    <p>${m.contenu}</p>
                    <div class="flex items-center justify-end mt-1">
                      <span class="text-xs ${sent ? 'text-green-100' : 'text-gray-400'}">
                       ${m.timestamp ? m.timestamp : (m.heure || getCurrentTime())}
                                          </span>
                      ${sent ? '<i class="fas fa-check-double ml-1 text-green-100"></i>' : ''}
                    </div>
                  </div>`;
  
                
              
                zone.appendChild(bloc);
              });
  
              div.appendChild(zone);   
            });

            
          }
          
          
          if (etat.groupeClicked !== null) {
            const idUser = localStorage.getItem('userIdConnected');

            etat.groupeClicked.membres.forEach(membre => {
              
              if (membre.id) {
                
                membre.messages.forEach(message => {
                  
                  const zone = document.createElement('div')
                  zone.id        = "zone-discussion"; 
                  zone.className = "messagesList space-y-3";
                  const sent   = message.me == idUser;

                  zone.className = sent ? "flex justify-end" : "flex justify-start";
                           
                  zone.innerHTML = `
                    <div class="max-w-xs lg:max-w-md mt-5 px-4 py-2 rounded-lg
                              ${sent ? 'bg-green-500 text-white' : 'bg-[#202c33] text-white'}">
                    <p>${message.contenu}</p>
                    <div class="flex items-center justify-end mt-1">
                      <span class="text-xs ${sent ? 'text-green-100' : 'text-gray-400'}">
                        ${getCurrentTime()}
                      </span>
                      ${sent ? '<i class="fas fa-check-double ml-1 text-green-100"></i>' : ''}
                    </div>
                    </div>
                  `
                  div.appendChild(zone)
                  
                });
              }
              
            });
          }
         

          return div;
}


