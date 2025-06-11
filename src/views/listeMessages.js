import { getUser } from "../services/server.js";
// import { profil } from "../views/afficherProfil.js";
// import { utilisateurs } from "../data.json";

export  function listeMessage() {
  
    const div = document.createElement('div');

        // console.log('bonjour');
  
    getUser().then(data =>{ 
        // console.log('bonjour');
        
        // console.log(data);

        const idUser = localStorage.getItem('userIdConnected')

        const user = data.find(u => u.id === idUser)
        // console.log(user);
        
        // console.log(data);
        
        data.forEach(u => {
         let initial = u.nom.charAt(0).toUpperCase() +  u.prenom.charAt(0).toUpperCase() ;
         
            // console.log(u);
            // console.log(user.contacts);
            // console.log(u);
            
            if (user.contacts.includes(Number (u.id))) {
                
                const element = document.createElement('div')
                element.className=" contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800"
                element.innerHTML= `
                     <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white flex-row ">
                     ${initial} 
                     </div>
                           <div class="ml-3 flex-1 min-w-0">
                               <div class="flex items-center justify-between">
                                   <h3 class="text-white font-bold truncate">${u.nom} ${u.prenom}  </h3>
                                   <span class="text-xs text-gray-500">00:46</span>
                               </div>
                               
                               <p class="text-sm text-white  truncate mt-1">${u.messages && u.messages.length >0  ? u.messages[0].contenu : "Aucun message"}</p>
                               <div class="flex justify-end text-gray-300 "><i class="fa-solid fa-angle-down"></i></div>
                           </div>
             
           `
           div.appendChild(element)
            }
            // const taille = u.messages.length - 1
            // console.log(u.messages);
            
           
        });
      })

    return div;

}

