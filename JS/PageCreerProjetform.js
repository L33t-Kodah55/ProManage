document.addEventListener('DOMContentLoaded', function() {
    const formulaire = document.getElementById('form-projet');
    const boutonAnnuler = document.querySelector('.retour');
    const boutonEffacer = document.querySelector('.renitialiser');
    const modal = document.getElementById('confirmationModal');
    const modalNom = document.getElementById('modalNom');
    const modalDescription = document.getElementById('modalDescription');
    const modalEcheance = document.getElementById('modalEcheance');

    formulaire.addEventListener('submit', function(event) {
        event.preventDefault();
        modalNom.textContent = document.getElementById('nom').value;
        modalDescription.textContent = document.getElementById('description').value;
        modalEcheance.textContent = document.getElementById('echeance').value;
        modal.style.display = 'block';
    });

    window.submitForm = function() {
        alert('Projet créé avec succès !');
        formulaire.reset();
        location.reload();
    }

    window.closeModal = function() {
        modal.style.display = 'none';
    }

    boutonAnnuler.addEventListener('click', function(event) {
        event.preventDefault();
        let confirmationQuitter = confirm('Voulez-vous vraiment quitter cette page ? Tous les changements non sauvegardés seront perdus.');
        if (confirmationQuitter) {
            window.location.href = 'PageAccueilWeb.html';
        }
    });

    boutonEffacer.addEventListener('click', function(event) {
        event.preventDefault();
        let confirmationReinitialiser = confirm('Êtes-vous sûr de vouloir effacer tous les champs du formulaire ?');
        if (confirmationReinitialiser) {
            formulaire.reset();
        }
    });
});
