import { router } from "../routerr.js";
import { getUser } from "../services/server.js";
import { listeMessage } from "../views/listeMessages.js";
import { ajouterContact } from "../components/creerContact.js";
import { ajoutGroupe } from "../components/creerGroupe.js";
import { titreDynamique } from "../components/titreDynamique.js";
import { listeGroupe } from "../views/afficherGroup.js";
import { afficherMessage } from "../views/afficherConv.js";



export  function interfaceU() {
    const contenu = document.createElement("div")
    contenu.className="flex w-[80%]  h-screen  mt-[-6rem]  shadow-xl shadow-[#1d1c1c] rounded-[50px] "
    contenu.innerHTML=`
        
    
        <div class="w-[8rem]  justify-between rounded-tl-[50px] rounded-bl-[50px]  bg-[#202c33] border-r border-gray-700 flex flex-col">
           <div class="title flex m-1 mt-4 justify-center items-center text-center  flex-col text-2xl text-[#aebac1] space-y-4 cursor-pointer ">
                <div tabindex="0"  class=" w-[6rem] h-[4rem]   rounded-[10px] hover:text-white hover:bg-green-700 active:bg-green-700  focus:bg-green-700 ">
                    <i class=" mt-[10px] fa-solid fa-message"></i>
                    <h5 class="text-xs font-bold">Messages</h5>
                </div>
                
                <div tabindex="0"  class=" w-[6rem] h-[4rem]   rounded-[10px] hover:text-white hover:bg-green-700 active:bg-green-700  focus:bg-green-700 ">
                  <i class="mt-[10px] fa-solid fa-circle-notch "></i>
                    <h5 class="text-xs font-bold">Statuts</h5>
                </div>

                <div tabindex="0"  class=" w-[6rem] h-[4rem]   rounded-[10px] hover:text-white hover:bg-green-700 active:bg-green-700  focus:bg-green-700 ">
                    <i class="mt-[10px] fa-regular fa-comment  "></i>
                    <h5 class="text-xs font-bold">Chaines</h5>
                </div>

                <div tabindex="0"  class=" w-[6rem] h-[4rem]   rounded-[10px] hover:text-white hover:bg-green-700 active:bg-green-700  focus:bg-green-700 ">
                    <i class="mt-[10px] fa-solid fa-users "></i>
                    <h5 class="text-xs font-bold">Communautés</h5>
                </div>

                <div id="btnAjoutContact"  tabindex="0"  class=" w-[6rem] h-[4rem]  hover:text-white  rounded-[10px] hover:bg-green-700 active:bg-green-700  focus:bg-green-700 " >
                    <i class="mt-[10px] fa-solid fa-user-plus"></i>
                    <h5 class="text-xs font-bold">Ajout contact</h5>
                </div>
                
                <div id="btnAjoutGroupe" tabindex="0"  class=" w-[6rem] h-[4rem] hover:text-white  rounded-[10px] hover:bg-green-700 active:bg-green-700  focus:bg-green-700 ">
                    <i class="mt-[10px] fa-solid fa-folder-plus"></i>
                    <h5 class="text-xs font-bold">Ajout groupe</h5>
                </div>
          
            </div>
        
          <div class="flex flex-col justify-center gap-4 items-center">
            <div class="logout text-[#aebac1] text-2xl cursor-pointer"><i class="fa-solid fa-right-from-bracket"></i></div>
            <div class="text-[#aebac1] text-2xl cursor-pointer"><i class="fa-solid fa-gear"></i></div>

            <div class="w-[50px] h-[50px] bg-slate-300 rounded-full mb-10"></div>

          </div>

        </div>

        <div class="w-1/3 bg-[#111b21] border-r border-gray-700 flex flex-col">
            <!-- Header -->
            <div class="bg-[#111b21]- p-4 border-b border-gray-700">
                <div class="flex items-center justify-between mb-4">
                    <h1 class="titreH text-xl font-semibold text-white">Discussions</h1>
                    <div class="flex items-center space-x-2">
                        <button class="p-2 hover:bg-white rounded-full">
                            <i class="fas fa-ellipsis-v text-white"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Search -->
                <div class="relative mb-4">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Rechercher"
                        class="w-full pl-10 pr-4 py-2 bg-[#111b21] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <!-- Tabs -->
                <div class="flex space-x-6">
                    <button class="text-green-600 border-b-2 border-green-600 pb-1 font-medium">Toutes</button>
                    <button class="text-gray-500 hover:text-gray-700">Non lues</button>
                    <button class="text-gray-500 hover:text-gray-700">Favoris</button>
                    <button class="text-gray-500 hover:text-gray-700">Groupes</button>
                </div>
            </div>

            <!-- Archives -->
            <div class="px-4 py-3 border-b border-gray-700 bg-[111b21]">
                <div class="flex items-center justify-between">
                    <span class="text-gray-600 font-medium ml-3 "><i class="fa-solid fa-box-archive"></i>  Archivées</span>
                    <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">14</span>
                </div>
            </div>

            <!-- Contact List -->
            
            <div id="contacts-container" class=" contact flex-1 overflow-y-auto">
               
            </div> 
        </div>

        <!-- Chat Area -->
        <div class="flex-1 flex flex-col">
            <!-- Chat Header -->
            <div class="bg-[#202c33] p-4 border-b rounded-tr-[50px]  border-gray-200 flex items-center justify-between">
                <div class="profil flex items-center">
                    <img src="https://i.pravatar.cc/40?img=5" alt="Lady React SA" class="w-10 h-10 rounded-full">
                    <div class="ml-3">
                        <h2 class="nom-profil font-semibold text-white">Lady React SA 🔥</h2>
                        <p class="numero-profil text-sm text-gray-400">Dernière connexion hier</p>
                    </div>
                </div>
                
                <div class="flex items-center space-x-2">
                    <button class="p-2 hover:bg-gray-600 rounded-full">
                        <i class="fas fa-phone text-gray-300"></i>
                    </button>
                    <button class="p-2 hover:bg-gray-600 rounded-full">
                        <i class="fas fa-video text-gray-300"></i>
                    </button>
                    <button class="p-2 hover:bg-gray-600 rounded-full">
                        <i class="fas fa-search text-gray-300"></i>
                    </button>
                    <button class="p-2 hover:bg-gray-600 rounded-full">
                        <i class="fas fa-ellipsis-v text-gray-300"></i>
                    </button>
                </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 bg-[#0b141a]">
                <div id="zone-discussion" class="messagesList space-y-3">
                    <!-- Message reçu et Message envoyé -->

                    <!-- <div class="flex justify-start">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-xl bg-[#202c33] text-white shadow-sm">
                            <p>Dama demone hôpital mi Cva demain inchalah Dina nieuw</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-gray-500">15:07</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#202c33] text-white shadow-sm">
                            <p>Beugn bi mi nice tané na</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-gray-500">15:52</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Ayooo massa t'es malade? Loulay meti</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">15:16</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Massa ay way</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">15:55</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="text-center my-4">
                        <span class="text-xs text-[#8696a0] bg-[#182229] px-2 py-1 rounded">HIER</span>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <div class="bg-green-600 p-2 rounded mb-2">
                                <p class="text-sm">📎 Transféré</p>
                                <p class="text-blue-200 underline">www.youtube.com</p>
                                <p class="text-blue-200 text-xs">https://www.youtube.com/watch?v=7lvJnkN1NwA</p>
                            </div>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">08:09</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="text-center my-4">
                        <span class="text-xs text-[#8696a0] bg-[#182229] px-2 py-1 rounded">AUJOURD'HUI</span>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Coucou ❤️<br>Nakamou ba yangui tanei bou bax massaa mane dama nieew rek teud</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">00:34</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#202c33] text-white shadow-sm">
                            <p>wa cva magui tané bou bahk kay ioe ba cva biguay nieble refk</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-gray-500">00:41</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Ah alhamdoulilah massa diemal khol no delio hopital sinon dmala sonal</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">00:43</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Waa mane javais pas de souci sama mak bi da am kou ma bofel mom la dadiel et sur le chemin comme par hasard ma guissat un ami de thies nonou lagn andei nou trois</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">00:44</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#202c33] text-white shadow-sm">
                            <p>en ok heureusement soit prudente de wautoul</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-gray-500">01:00</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-green-500 text-white">
                            <p>Waa tkt pas dinay ande ak nitt wala meu dieul auto rek</p>
                            <div class="flex items-center justify-end mt-1">
                                <span class="text-xs text-green-100">01:03</span>
                                <i class="fas fa-check-double ml-1 text-green-100"></i>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>

            <!-- Message Input -->
            <div class="bg-[#202c33]  p-4 border-t rounded-br-[50px]  border-gray-700">
                <div class="flex items-center space-x-3">
                    <button class="p-2 hover:bg-gray-100 rounded-full">
                        <i class="fas fa-paperclip text-gray-600"></i>
                    </button>
                    
                    <div class="flex-1 relative">
                        <input
                            type="text"
                            id="messageInput"
                            placeholder="Entrez un message"
                            class="mess w-full px-4 py-2 bg-[#2a3942] rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                           
                        />
                    </div>
                    
                    <button id="sendBtn" class="p-2 text-gray-300 hover:bg-gray-500 rounded-full">
                        <i class="vocal  fas fa-microphone text-gray-600"></i>
                        <i class="envoie hidden fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        
    `;

    const mess = contenu.querySelector('.mess')
    mess.addEventListener('keydown', ()=>{
        const envoie = contenu.querySelector('.envoie')
        const vocal = contenu.querySelector('.vocal')
        
        envoie.classList.remove('hidden')
        vocal.classList.add('hidden')

    })
   

    const btnAjoutC = contenu.querySelector('#btnAjoutContact')
    btnAjoutC.addEventListener("click", () => {
        const popup = ajouterContact();
        contenu.appendChild(popup);
    });
    const btnAjoutG = contenu.querySelector('#btnAjoutGroupe')
    btnAjoutG.addEventListener("click", () => {
        const popup = ajoutGroupe();
        contenu.appendChild(popup);
    });

    const titres = contenu.querySelectorAll('.title div')
    titres[0].addEventListener('click', ()=>{
        titreDynamique("Messages");
    })

    titres[1].addEventListener('click', ()=>{
        titreDynamique("Statuts");
    })

    titres[2].addEventListener('click', ()=>{
        titreDynamique("Chaines");
    })
    
    titres[3].addEventListener('click', ()=>{
        titreDynamique("Communautés");
    })

    titres[4].addEventListener('click', ()=>{
        titreDynamique("Ajout contact");
    })

    titres[5].addEventListener('click', ()=>{
        titreDynamique("Ajout groupe");
    })

    const div = contenu.querySelector('#contacts-container')
    // console.log(div);
    div.appendChild(listeMessage())
    div.appendChild(listeGroupe())

    const zone = contenu.querySelector('#zone-discussion')
    zone.appendChild(afficherMessage())
       
    const logout = contenu.querySelector(".logout")
    logout.addEventListener("click", ()=>{
        localStorage.removeItem("userIdConnected")
        router("/login")
    })
    return contenu;
}

