/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
* Cette fonction pour gérer l'affichage lors de la fin du jeu
*/
function finirJeu() {
    afficherRelance()
}

/**
 * Cette fonction affiche la popup de relance pour rejouer. 
 */
function afficherRelance() {
    let zoneRejoueBackground = document.querySelector(".zoneRejoueBackground")
    // va changer son display et la rendre visible. 
    zoneRejoueBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup de relance pour rejouer. 
 */
function cacherRelance() {
    let zoneRejoueBackground = document.querySelector(".zoneRejoueBackground")
    // va changer son display et la rendre invisible. 
    zoneRejoueBackground.classList.remove("active")
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Spacetype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court. ")
    }
    
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.")
    }
    
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"
        
        popup.append(spanErreurMessage)
    }
    
    spanErreurMessage.innerText = message
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
    
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    } catch(erreur) {
        afficherMessageErreur(erreur.message)
    }
    
}

function startTimer(duration, display, niveauActuel, i) {
    let timer = duration, seconds;
    // Arrêter le timer précédent si un existe
    if (window.currentTimer) {
        clearInterval(window.currentTimer);
    }
    let interval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;

        if (--timer < 0) {
            clearInterval(interval);
            //alert("Temps écoulé ! Passage au mot suivant.");
            // Simuler un clic sur le bouton pour passer au mot suivant
            if (niveauActuel[i] === undefined) {
                clearInterval(window.currentTimer)
            } else {
                document.getElementById("btnValiderMot").click();
            }

        }
    }, 1000);

    // Stocker l'identifiant de l'intervalle dans une variable globale pour y accéder plus tard
    window.currentTimer = interval;

    // Retourner l'identifiant de l'intervalle pour référence externe si nécessaire
    return interval;
}

function updateTimer(niveauActuel, display, i) {
    if (niveauActuel == niveaux.facile) {
        startTimer(2, display, niveauActuel, i)
    } else if (niveauActuel == niveaux.moyen) {
        startTimer(4, display, niveauActuel, i)
    } else {    
        startTimer(6, display, niveauActuel, i)
    }
}

