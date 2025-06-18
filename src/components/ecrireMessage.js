
export function envoieMessage({ contenu, heure, me }) {
  const bloc = document.createElement('div');
  bloc.className = me ? "flex justify-end" : "flex justify-start";

  bloc.innerHTML = `
    <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                ${me ? 'bg-green-500 text-white' : 'bg-[#202c33] text-white'}">
      <p>${contenu}</p>
      <div class="flex items-center justify-end mt-1">
        <span class="text-xs ${me ? 'text-green-100' : 'text-gray-400'}">
          ${heure}
        </span>
        ${me ? '<i class="fas fa-check-double ml-1 text-green-100"></i>' : ''}
      </div>
    </div>`;
    
  return bloc;
}
