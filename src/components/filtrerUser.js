import { getCurrentTime } from "../components/time.js";
import { getUser } from "../services/server.js";

export async function afficherList(liste, type, zone1) {
  const idUser = localStorage.getItem("userIdConnected");

  if (type === "groupes") {
    const users = await getUser();

    liste.forEach(g => {
      const estMembre = g.membres.some(m => m.id === idUser);
      if (!estMembre) return;

      const div = document.createElement("div");
      div.className = "contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";

      const nomMembres = g.membres.map(m => {
        const user = users.find(u => String(u.id) === String(m.id));
        return user ? `${user.nom} ${user.prenom}` : "Inconnu";
      }).join(", ");

      const initial = g.nom.charAt(0).toUpperCase();

      div.innerHTML = `
        <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white">
          ${initial}
        </div>
        <div class="ml-3 flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h3 class="text-white font-medium truncate">${g.nom}</h3>
            <span class="text-xs text-gray-500">${getCurrentTime()}</span>
          </div>
          <p class="text-sm text-white truncate mt-1">Membres : ${nomMembres}</p>
          <div class="btnGrp relative flex justify-end text-gray-300">
            <i class="fa-solid fa-angle-down"></i>
            <div class="menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
              <ul class="py-2 text-sm text-white">
                <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-power-off"></i> &nbsp;Changer statut membre</li>
                <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-user-minus"></i> &nbsp;Retirer un membre</li>
                <li class="sup px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i> &nbsp;Supprimer groupe</li>
                <li class="changer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-ban"></i> &nbsp;Quitter le groupe</li>
              </ul>
            </div>
          </div>
        </div>
      `;

      zone1.appendChild(div);
    });

    return;
  }

  // Contacts
  liste.forEach(item => {
    const initial = item.nom.charAt(0).toUpperCase() + item.prenom.charAt(0).toUpperCase();
    const div = document.createElement("div");
    div.className = "contact-item flex items-center p-4 hover:bg-gray-400 cursor-pointer border-b border-gray-800";

    div.innerHTML = `
      <div class="item relative w-[4rem] h-[4rem] bg-slate-800 rounded-full items-center justify-center flex text-white flex-row">
        ${initial}
      </div>
      <div class="ml-3 flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <h3 class="text-white font-bold truncate">${item.nom} ${item.prenom}</h3>
          <span class="text-xs text-gray-500">${getCurrentTime()}</span>
        </div>
        <p class="text-sm text-white truncate mt-1">
          ${item.messages && item.messages.length > 0 ? item.messages[item.messages.length - 1].contenu : "Aucun message"}
        </p>
        <div class="boutonBas relative flex justify-end text-gray-300">
          <i class="fa-solid fa-angle-down"></i>
          <div class="dropdown-menu absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg hidden z-10">
            <ul class="py-2 text-sm text-white">
              <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-box-archive"></i> &nbsp;Archiver</li>
              <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-square-minus"></i> &nbsp;Bloquer</li>
              <li class="px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-thumbtack"></i> &nbsp;Épingler</li>
              <li class="supprimer px-4 py-2 hover:bg-gray-600 cursor-pointer"><i class="fa-solid fa-trash-can"></i> &nbsp;Supprimer</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    zone1.appendChild(div);
  });
}
