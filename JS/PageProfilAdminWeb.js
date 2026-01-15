document.addEventListener("DOMContentLoaded", function() {
    // Get manager ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");
    let managerId = urlParams.get('id');

    // Mock data for managers
    const managers = [
        {
            id: 1,
            nom: "Lakaka",
            courriel: "rimalu-lakaka@example.com",
            role: "Administrateur",
            icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        },
        {
            id: 2,
            nom: "Diane",
            courriel: "diane-obey@example.com",
            role: "Administrateur",
            icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }
    ];

    // Redirect if no ID is found
    if (!managerId) {
        managerId = managers[0].id;
        window.location.search = `?id=${managerId}`;
    }

    // Find manager by ID
    const manager = managers.find(mgr => mgr.id == managerId);

    if (manager) {
        document.getElementById('manager-nom').textContent = manager.nom;
        document.getElementById('manager-courriel').textContent = manager.courriel;
        document.getElementById('manager-role').textContent = manager.role;
        document.getElementById('manager-icon').src = manager.icon;
    } else {
        console.error("Gestionnaire non trouvé.");
    }

    profileIcon.addEventListener("click", () => {
        if (profileDropdown.style.display === "block") {
            profileDropdown.style.display = "none";
        } else {
            profileDropdown.style.display = "block";
        }
    });

    logoutLink.addEventListener("click", (event) => {
        event.preventDefault(); // Empêche la redirection immédiate
        if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            window.location.href = "connexionPage.html"; // Redirige vers la page de connexion
        }
    });

    window.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });

    document.getElementById("promanage-logo").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html";
    });

    document.getElementById("back-button").addEventListener("click", () => {
        window.history.back();
    });

    document.getElementById("logout-button").addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            window.location.href = "connexionPage.html";
        }
    });
});
