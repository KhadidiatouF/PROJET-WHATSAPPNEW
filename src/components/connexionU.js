import { interfaceU } from "../layouts/layouts.js";
import { router } from "../routerr.js";
import { getUserByPhone  } from "../services/server.js";
import { setUser } from "../store/userStore.js";
import { inscriptionU } from "../components/inscriptionU.js";
import { validerNumero } from "../utils/validator.js";


export function connexionU() {
  if (localStorage.getItem("userIdConnected")) {
    router("/homePage")
    return;
  }
 
    const div = document.createElement("div")
    div.className= "login  flex justify-center items-center mt-[2rem] ml-[3rem]"
    div.innerHTML = `
        <div class="container w-[75rem] h-[35rem] bg-white shadow-xl shadow-[#1d1c1c] rounded-[50px] flex justify-center items-center">
            <div class="content w-[90rem] h-[42rem] rounded-[50px] flex flex-row">
               <div class="w-1/2 h-full rounded-tl-[50px] rounded-bl-[50px] bg-white">
                 <img src="/src/assets/login.png" class="w-full h-full object-contain" alt="">
               </div>

                <div class="w-1/2 h-full bg-white rounded-tr-[50px] rounded-br-[50px] flex justify-center items-center">
                    <div class="flex flex-col justify-center h-[50%] w-[80%] gap-5 items-center shadow-xl shadow-[#6dc262] rounded-xl">
                        <div>
                          <label class="font-bold block mb-2">Pays :</label>
                          <select id="pays" class="w-[15rem] h-[50px] border-2 px-4 rounded-[50px] shadow-xl">
                            <option value="+221">🇸🇳 Sénégal</option>
                            <option value="+33">🇫🇷 France</option>
                            <option value="+1">🇺🇸 USA</option>
                          </select>
                        </div>

                        <div>
                            <label class="font-bold block mb-2">Numéro :</label>
                            <input
                                type="tel"
                                id="numero"
                                class=" w-full h-[50px] px-4 border-2 rounded-[50px] shadow-xl"
                                placeholder="Entrez votre numéro"
                            />
                            <small class="login text-red-600 text-[10px] hidden">Error message</small>

                        </div>

                      <button type="submit" id="ajout" class="w-[100px] h-[30px] bg-[#6dc262] text-white font-bold rounded-[20px] hover:bg-[#a8a5a0]">Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    
  `;


  const button = div.querySelector("#ajout");
  const Inumero = div.querySelector("#numero");
  const selectPays = div.querySelector("#pays");
  const errorText = div.querySelector(".login small ");
 
 
  button.addEventListener("click", async () => {
    const numero = Inumero.value.trim();
    const pays = selectPays.value.trim();
    let  numeroComplet = pays + numero;
    // console.log(typeof numeroComplet)

    errorText.classList.add("hidden");

    if (!numero) {
      errorText.textContent = "Le numéro est requis.";
      errorText.classList.remove("hidden");
      return;
    }
    // if (isNaN(numero)) {
    //   errorText.textContent = "Le numéro doit etre avoir uniquement des chiffres.";
    //   errorText.classList.remove("hidden");
    //   return;
    // }

    if (!/^\d+$/.test(numero)) {
      errorText.textContent = "Le numéro doit contenir uniquement des chiffres.";
      errorText.classList.remove("hidden");
      return;
    }

    // if (validerNumero(numero) === false) {
    //   errorText.textContent = "Le numéro est invalide";
    //   errorText.classList.remove("hidden");
    //   return;
    // }

    const user = await getUserByPhone(numeroComplet);
    if (user) {
      localStorage.setItem("userIdConnected",user.id )
      setUser(user);
      router("/homePage"); 

    } else {
      // errorText.textContent = "Utilisateur non trouvé.";
      // errorText.classList.remove("hidden");
      // router(inscriptionU())
      const app = document.getElementById("app");
      app.innerHTML = "";
      app.appendChild(inscriptionU());
    }
  });

  return div;

  
}
