document.addEventListener('DOMContentLoaded', function () {
  
    const formChamps = document.getElementById('conteneur');
    const formContainer = document.getElementById('formCreerMembre');
    formChamps.classList.remove('hidden');
    formContainer.classList.remove('hidden');
    setTimeout(() => formContainer.classList.add('show'), 10);
    setTimeout(() => formChamps.classList.add('show'), 10);

    const annuler = document.getElementById('annuler');
    const form = document.getElementById('formCreerMembre');
    const ficheContainer = document.getElementById('ficheContainer');
    const ficheNom = document.getElementById('ficheNom');
    const fichePrenom = document.getElementById('fichePrenom');
    const ficheProjectID = document.getElementById("ficheProjectID");
    const ficheEmail = document.getElementById('ficheEmail');
    const profileImage = document.getElementById('profileImage');
    const blurOverlay = document.getElementById('blurOverlay');
    const confirmYes = document.getElementById('confirmYes');
    const confirmNo = document.getElementById('confirmNo');
    const confirmationContainer = document.getElementById('confirmationContainer');
    const profileImages = [
        'https://cdn-icons-png.flaticon.com/512/1025/1025379.png',
        'https://cdn-icons-png.flaticon.com/512/4775/4775486.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3mKaXjzleODArva3wiM5nsJCqXtxa6ZRk1Q&s',
        'https://cdn-icons-png.flaticon.com/512/4644/4644948.png',
        'https://cdn-icons-png.flaticon.com/512/2403/2403430.png'
    ];

    function getRandomProfileImage() {
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
    }

    annuler.addEventListener('click', function () {
        if (window.confirm("Voulez-vous vraiment quitter la page sans enregistrer ?")) {
            window.location.href = 'PageIndexMembreWeb.html';
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = true;
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');

        const nomError = document.getElementById('nomError');
        const prenomError = document.getElementById('prenomError');
        const emailError = document.getElementById('emailError');

        if (nom.value.trim() === '') {
            nom.classList.add('error');
            nomError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir un nom valide.';
            nomError.style.display = 'flex';
            isValid = false;
        } else {
            nom.classList.remove('error');
            nomError.style.display = 'none';
        }
        
        if (prenom.value.trim() === '') {
            prenom.classList.add('error');
            prenomError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir un prénom valide.';
            prenomError.style.display = 'flex';
            isValid = false;
        } else {
            prenom.classList.remove('error');
            prenomError.style.display = 'none';
        }

        if (projectID.value.trim() === '') {
            projectID.classList.add("error");
            projectIDError.style.display = "inline";
            projectIDError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Le champ ID de projet est requis`;
            isValid = false;
        } else {
            projectID.classList.remove("error");
            projectIDError.style.display = "none";
        }
    
        if (email.value.trim() === '') {
            email.classList.add('error');
            emailError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Veuillez saisir une adresse courriel valide dans ce format : exemple@email.com.';
            emailError.style.display = 'flex';
            isValid = false;
        } else {
            email.classList.remove('error');
            emailError.style.display = 'none';
        }

        if (isValid) {
            ficheNom.textContent = nom.value.trim();
            fichePrenom.textContent = prenom.value.trim();
            ficheProjectID.textContent = projectID.value.trim();
            ficheEmail.textContent = email.value.trim();
            profileImage.src = getRandomProfileImage();
            ficheContainer.style.display = 'block';
            confirmationContainer.style.display = 'block';
            blurOverlay.style.display = 'block';
            blurOverlay.style.zIndex = '1';
            ficheContainer.style.zIndex = '2';
            confirmationContainer.style.zIndex = '2';
        } else {
            alert('Veuillez remplir tous les champs s\'il vous plaît');
        }
    });

    confirmNo.addEventListener('click', function () {
        ficheContainer.style.display = 'none';
        confirmationContainer.style.display = 'none';
        blurOverlay.style.display = 'none';
    });
    
    confirmYes.addEventListener('click', function () {
        blurOverlay.style.display = 'none';
        form.submit();
        alert('Votre formulaire de membre s\'est envoyé avec succès !');
    });

    const emailField = document.getElementById('email');
    emailField.addEventListener('input', function () {
        if (emailField.validity.typeMismatch) {
            emailField.setCustomValidity("Veuillez saisir une adresse courriel valide dans ce format : exemple@email.com.");
        } else {
            emailField.setCustomValidity("");
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
