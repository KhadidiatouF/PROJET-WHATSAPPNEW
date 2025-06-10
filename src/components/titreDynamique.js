export function titreDynamique(titre) {
    const h5 = document.querySelector('.titreH')
    if (h5) {
        h5.textContent = titre.toUpperCase();
    }
    
}
