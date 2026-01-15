document.addEventListener('DOMContentLoaded', function () {

    const formContainer = document.getElementById('conteneur');
    const formChamps = document.getElementById('formCreerTache');
    const annuler = document.getElementById('annuler');
    formContainer.classList.remove('hidden');
    formChamps.classList.remove('hidden');
    setTimeout(() => formContainer.classList.add('show'), 10);
    setTimeout(() => formChamps.classList.add('show'), 10);

    annuler.addEventListener('click', function () {
        if (window.confirm("Voulez-vous vraiment quitter la page sans enregistrer ?")) {
            window.history.back();
        }
    });

    formChamps.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;

        const nom = document.getElementById('nom');
        const description = document.getElementById('description');
        const dateEcheance = document.getElementById('date_echeance');
        const membreAssigne = document.getElementById('membre_assigne');

        const nomError = document.getElementById('nomError');
        const descriptionError = document.getElementById('descriptionError');
        const dateEcheanceError = document.getElementById('dateEcheanceError');
        const membreAssigneError = document.getElementById('membreAssigneError');

        if (nom.value.trim() === '') {
            nom.classList.add('error');
            nomError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir un nom valide.';
            nomError.style.display = 'flex';
            isValid = false;
        } else {
            nom.classList.remove('error');
            nomError.style.display = 'none';
        }

        if (description.value.trim() === '') {
            description.classList.add('error');
            descriptionError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir une description valide.';
            descriptionError.style.display = 'flex';
            isValid = false;
        } else {
            description.classList.remove('error');
            descriptionError.style.display = 'none';
        }

        if (dateEcheance.value.trim() === '') {
            dateEcheance.classList.add('error');
            dateEcheanceError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir une date d\'échéance valide.';
            dateEcheanceError.style.display = 'flex';
            isValid = false;
        } else {
            dateEcheance.classList.remove('error');
            dateEcheanceError.style.display = 'none';
        }

        if (membreAssigne.value.trim() === '') {
            membreAssigne.classList.add('error');
            membreAssigneError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir un membre assigné valide.';
            membreAssigneError.style.display = 'flex';
            isValid = false;
        } else {
            membreAssigne.classList.remove('error');
            membreAssigneError.style.display = 'none';
        }

        if (isValid) {
            // Afficher un message de succès
            alert('Tâche soumise avec succès !');

            // Réinitialiser le formulaire
            formChamps.reset();
        } else {
            alert('Veuillez remplir tous les champs s\'il vous plaît');
        }
        
    });

    document.getElementById("promanage-logo").addEventListener("click", () => {
        if (window.confirm("Voulez-vous vraiment quitter la page sans enregistrer ?")) {
            window.location.href = 'PageAccueilWeb.html';
        }
    });

    document.getElementById("promanage-logo-main").addEventListener("click", () => {
        if (window.confirm("Voulez-vous vraiment quitter la page sans enregistrer ?")) {
            window.location.href = 'PageAccueilWeb.html';
        }
    });

});
