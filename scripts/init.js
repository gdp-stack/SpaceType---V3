/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre les différents niveaux et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let niveauActuel = niveaux.facile // Commencer par le niveau facile
    let display = document.querySelector('#timerDisplay')
    
    //pârametrage du timer en fonction du niveau à integrer ici
    updateTimer(niveauActuel, display, i)

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(niveauActuel[i])
    console.log(niveauActuel[i])

    // Gestion de l'événement touche "entrée"
    inputEcriture.addEventListener('keypress', (event) => {
        if (event.keyCode == 13) {
        if (inputEcriture.value === niveauActuel[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        //pârametrage du timer en fonction du niveau à integrer ici
        updateTimer(niveauActuel, display, i)
        if (niveauActuel[i] === undefined) {
            afficherProposition("Le jeu est fini")
            updateTimer(niveauActuel, display, i)
            i = 0
            finirJeu()
        } else {
            afficherProposition(niveauActuel[i])
        }
    }})
 
    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === niveauActuel[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        //pârametrage du timer en fonction du niveau à integrer ici
        updateTimer(niveauActuel, display, i)
        if (niveauActuel[i] === undefined) {
            afficherProposition("Le jeu est fini") 
            i = 0
            finirJeu()
        } else {
            afficherProposition(niveauActuel[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer au niveau facile. 
            if (event.target.value === "1") {
                niveauActuel = niveaux.facile
            } else if (event.target.value === "2") {
                // Sinon nous voulons jouer au niveau moyen
                niveauActuel = niveaux.moyen
            } else {
                // Autrement nous voulons jouer au niveau difficile
                niveauActuel = niveaux.difficile
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(niveauActuel[i])
            // On relance le timer également
            updateTimer(niveauActuel, display, i)
        })
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })

    afficherResultat(score, i)

     // Gestion de l'événement click sur le bouton "rejouer"
     let btnRejoue = document.getElementById("btnRejoue")
     let zoneRejoueBackground = document.querySelector(".zoneRejoueBackground")
     btnRejoue.addEventListener("click", () => {
        cacherRelance()
        lancerJeu()
     })

}