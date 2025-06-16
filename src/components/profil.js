export function profil(initiales, nomComplet, numero) {
    const profilDiv = document.querySelector('.profil');
    const nomDiv = document.querySelector('.nom-profil');
    const numeroDiv = document.querySelector('.numero-profil');

    // console.log(nomDiv);
    // console.log(numeroDiv);
    
    

    if (profilDiv) profilDiv.textContent = initiales;
    if (nomDiv) nomDiv.textContent = nomComplet;
    if (numeroDiv) numeroDiv.textContent = numero;
}

