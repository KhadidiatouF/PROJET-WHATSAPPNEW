import { createUser } from "../services/server.js";
import { router } from "../routerr.js";
import { getUser } from "../services/server.js";


export function inscriptionU() {
  const div = document.createElement("div");
  div.className = "inscription flex justify-center items-center mt-[2rem] ml-[3rem]";

  div.innerHTML = `
    <div class="container w-[70rem] h-[40rem] bg-white shadow-lg rounded-[50px] flex justify-center items-center">
        <div class="w-1/2 h-full rounded-tl-[50px] rounded-bl-[50px] bg-white">
          <img src="/src/assets/inscription.png" class="w-full h-full object-contain" alt="">
        </div>
      <div class="w-full max-w-[40rem] bg-white rounded-xl p-10 flex flex-col gap-5 shadow-md">
        <h2 class="text-2xl font-bold text-center text-[#6dc262]">Inscription</h2>

        <div>
          <label class="block font-bold mb-1">Nom :</label>
          <input id="nom" type="text" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>

        <div>
          <label class="block font-bold mb-1">Prénom :</label>
          <input id="prenom" type="text" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>

        <div>
          <label class="block font-bold mb-1">Pays :</label>
          <select id="pays" class="w-full border px-4 py-2 rounded-[20px]">
            <option value="fr">🇫🇷 France</option>
            <option value="sn">🇸🇳 Sénégal</option>
            <option value="us">🇺🇸 USA</option>
          </select>
        </div>

        <div>
          <label class="block font-bold mb-1">Numéro :</label>
          <input id="numero" type="tel" class="w-full border px-4 py-2 rounded-[20px]" />
        </div>

        <small class="error-msg text-red-500 text-sm hidden">Message erreur</small>

        <button id="validerInscription" class="bg-[#6dc262] text-white font-bold px-6 py-2 rounded-[20px] hover:bg-[#4ba94d]">
          Valider
        </button>
      </div>
    </div>
  `;

  const btn = div.querySelector("#validerInscription");
  const errorText = div.querySelector(".error-msg");

  btn.addEventListener("click", async () => {
    const nom = div.querySelector("#nom").value.trim();
    const prenom = div.querySelector("#prenom").value.trim();
    const pays = div.querySelector("#pays").value;
    const numero = div.querySelector("#numero").value.trim();

    errorText.classList.add("hidden");

    if (!nom || !prenom || !numero) {
      errorText.textContent = "Tous les champs sont requis.";
      errorText.classList.remove("hidden");
      return;
    }

    // if (numero === ) {
    //   errorText.textContent = "Ce numero existe déja.";
    //   errorText.classList.remove("hidden");
    //   return;
    // }

    const indicatifs = { fr: "+33", sn: "+221", us: "+1" };
    const numeroComplet = indicatifs [pays] + numero;
    const users = await getUser();
    // console.log(users);
    const numeroExiste = users.some(u => u.numero === numeroComplet);

    if (numeroExiste ) {
        errorText.textContent = "Ce numero existe déja.";
        errorText.classList.remove("hidden");
        return;
      }
    const newUser = {
      id: String(users.length + 1),
      numero: numeroComplet,
      nom,
      prenom,
      pays,
      Online: false,
      archive: false,
      messages: []
    };

    

    const success = await createUser(newUser);

    if (success) {
      errorText.textContent = 'Inscription réussie. Vous pouvez maintenant vous connecter.!';
      errorText.classList.add('text-green-600');
      // alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
      router("/login"); 
    } else {
      errorText.textContent = "Erreur lors de l'inscription.";
      errorText.classList.remove("hidden");
    }
  });

  return div;
}
