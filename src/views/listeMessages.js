import { getUser } from "../services/server.js";
// import { utilisateurs } from "../data.json";

export  function listeMessage() {
  
    const div = document.createElement('div');


    getUser().then(data =>{ 
        // console.log(data);

        data.forEach(u => {
            // const taille = u.messages.length - 1
            const element = document.createElement('div')
            element.className=" contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800"
            element.innerHTML= `
                 <div class="relative">
                     <img src="https://i.pravatar.cc/40?img=1" alt="BootTata" class="w-12 h-12 rounded-full">
                 </div>
                       <div class="ml-3 flex-1 min-w-0">
                           <div class="flex items-center justify-between">
                               <h3 class="text-white font-medium truncate">${u.nom}</h3>
                               <span class="text-xs text-gray-500">00:46</span>
                           </div>
                           <p class="text-sm text-white  truncate mt-1">${u.messages[0].contenu}</p>
                       </div>
         
       `
       div.appendChild(element)
        });
      })

    return div;

}

// // Charger les messages
// console.log(loadMessages);

// // function message() {
// //     const messagesList = document.getElementById('messagesList');
// //     messagesList.innerHTML = '';
    
// //     if (!selectedChat) return;
    
// //     // Récupérer tous les messages entre les deux utilisateurs
// //     const messages = getAllMessages(currentUser.id, selectedChat.id);
    
// //     if (messages.length === 0) {
// //       messagesList.innerHTML = `
// //         <div class="text-center text-gray-400 py-8">
// //           <i class="fas fa-comments text-4xl mb-4"></i>
// //           <p>Aucun message dans cette conversation</p>
// //         </div>
// //       `;
// //       return;
// //     }
    
// //     messages.forEach(message => {
// //       const messageDiv = document.createElement('div');
// //       const isFromCurrentUser = message.from === currentUser.id;
      
// //       messageDiv.className = `flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`;
// //       messageDiv.innerHTML = `
// //         <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isFromCurrentUser ? 'bg-green-500 text-white' : 'bg-[#202c33] text-white'} shadow-sm">
// //           <p>${message.contenu}</p>
// //           <div class="flex items-center justify-end mt-1">
// //             <span class="text-xs ${isFromCurrentUser ? 'text-green-100' : 'text-gray-400'}">${formatTime(message.timestamp)}</span>
// //             ${isFromCurrentUser ? '<i class="fas fa-check-double ml-1 text-green-100"></i>' : ''}
// //           </div>
// //         </div>
// //       `;
      
// //       messagesList.appendChild(messageDiv);
// //     });
    
// //     // Faire défiler vers le bas
// //     document.getElementById('messagesContainer').scrollTop = document.getElementById('messagesContainer').scrollHeight;
//   }