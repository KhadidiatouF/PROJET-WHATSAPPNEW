export function envoieMessage() {
    
    const divParent = document.createElement("div");
    divParent.className = `flex ${deMoi ? 'justify-end' : 'justify-start'} mt-10`;
    divParent.id = deMoi ? 'expediteur' : 'destinataire';
  
    const heure = message.heure || getCurrentTime();
    const texte = message.content || '';
    
  
    divParent.innerHTML = `
      <div class="text-black justify-between w-80 gap-5 h-20 
        ${deMoi ? 'bg-[#45CA42] rounded-s-xl rounded-tr-xl mr-3' : 'bg-[#E5E5EA] rounded-e-xl rounded-tl-xl ml-3'}
        flex items-center mt-10">
        <div class="text-xl font-medium ml-2 break-words overflow-hidden w-full">      
            ${texte}
        </div>
        <div class="inline-flex gap-4">
          <div class="text-black">${heure}</div>
          <i class="fa-solid fa-check"></i>
        </div>
      </div>
    `;
    return divParent;
}