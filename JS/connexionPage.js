document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (event) => {
        const userNameField = document.getElementById('username');
        const passwordField = document.getElementById('password');

        let isValid = true;


        if (!userNameField.value) {
            userNameField.setCustomValidity('Veuillez entrer votre nom d\'utilisateur.');
            isValid = false;
        } else userNameField.setCustomValidity('');
        


        if (!passwordField.value) {
            passwordField.setCustomValidity('Veuillez entrer votre mot de passe.');
            isValid = false;
        } else passwordField.setCustomValidity('');
        


        if (!isValid) {
            event.preventDefault();
            form.reportValidity();
        }
    });

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.setCustomValidity('');
        });
    });
});

//https://coolbackgrounds.io/