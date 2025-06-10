// import { getUser } from "../store/userStore.js";

// export default function conversationsPage() {
//   const utilisateurs = getUser();

// //   return `
// //     <div class="text-center">
// //       <h2 class="text-2xl mb-4">Bienvenue ${utilisateurs.nom} !</h2>
// //       <p>Voici vos conversations (exemple en dur).</p>
// //       <ul class="mt-4">
// //         <li class="border p-2 bg-white">Discussion avec Alice</li>
// //         <li class="border p-2 bg-white">Discussion avec Bob</li>
// //       </ul>
// //     </div>
// //   `;
// }


// views/afficherConv.js
import { getMessagesBetweenUsers } from "../services/messagesServices.js";

export const afficherConversation = (userId1, userId2, data) => {
  const zoneDiscussion = document.getElementById("zone-discussion");
  zoneDiscussion.innerHTML = "";

  const messages = getMessagesBetweenUsers(userId1, userId2, data);

  messages.forEach(message => {
    const div = document.createElement("div");
    div.className = message.from == userId1 ? "text-right" : "text-left";
    div.innerHTML = `
      <div class="inline-block bg-blue-100 rounded-xl p-2 m-1 max-w-xs">
        <p class="text-sm">${message.contenu}</p>
        <span class="text-[10px] text-gray-500">${new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    `;
    zoneDiscussion.appendChild(div);
  });
};
