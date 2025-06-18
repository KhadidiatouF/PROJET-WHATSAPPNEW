import { etat }     from "../store/userStore.js";


export function archiverContact(utilisateurs){
    // console.log(elements)
    
    const element =  etat.userClicked
    
    element.forEach(data => {        
            utilisateurs.forEach(utilisateur => {
                let nom_complet = `${utilisateur.nom} ${utilisateur.prenom}`;
                
                if (nom_complet == nom.textContent.trim()) { 
                    
                    if (utilisateur.archive == true) {
                        
                        utilisateur.archive = false;
                    }else{
                        utilisateur.archive = true;

                    }                 
                    
                }
            });
        
    });    
}