document.addEventListener('DOMContentLoaded', function () {
    const projects = {
        0: {
            name: "Optimisation de la chaîne d'approvisionnement",
            members: [
                { name: "Clara Dupont", role: "Analyste Processus" },
                { name: "Julien Lefèvre", role: "Développeur Logiciel" }
            ]
        },
        1: {
            name: "Lancement de la campagne marketing",
            members: [
                { name: "Sophie Martin", role: "Créatrice de Contenu" },
                { name: "Pauline Bernard", role: "Gestionnaire des Réseaux Sociaux" }
            ]
        },
        2: {
            name: "Développement du nouveau produit",
            members: [
                { name: "Marc Dubois", role: "Chercheur et Développeur" },
                { name: "Élise Moreau", role: "Ingénieure Prototype" }
            ]
        },
        3: {
            name: "Amélioration de l'expérience utilisateur",
            members: [
                { name: "Jean-Pierre Roux", role: "Chercheur UX" },
                { name: "Claire Bernard", role: "Designer UI" }
            ]
        }
    };    
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");

    function getProjectIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('projectId');
    }

    function loadMembers() {
        const projectId = getProjectIdFromURL();
        const project = projects[projectId];
        if (project) {
            document.getElementById('project-name').textContent = `Membres du ${project.name}`;
            const membersList = document.getElementById('members-list');
            membersList.innerHTML = '';
            project.members.forEach((member, index) => {
                const memberCard = document.createElement('div');
                memberCard.className = 'member-card';
                memberCard.innerHTML = `
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Member Icon">
                    <div>
                        <div class="member-name">${member.name}</div>
                        <div class="member-role">${member.role}</div>
                    </div>
                    <button class="delete-btn" data-index="${index}">Supprimer</button>
                `;

               
                memberCard.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('delete-btn')) {
                        window.location.href = `PageDetailsMembreWeb.html?projectId=${projectId}&memberIndex=${index}`;
                    }
                });

                membersList.appendChild(memberCard);
            });

           
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function(event) {
                    event.stopPropagation(); 
                    const memberIndex = this.getAttribute('data-index');
                    deleteMember(memberIndex);
                });
            });
        }
    }

    function addMember() {
        window.location.href = `PageIndexMembreWeb.html`;
    }

    function retourPage() {
        window.history.back();
    }

    function deleteMember(index) {
        const projectId = getProjectIdFromURL();
        const project = projects[projectId];
        if (project) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
                project.members.splice(index, 1);
                loadMembers();
            }
        }
    }

    document.getElementById("back-button").addEventListener("click", retourPage);
    document.getElementById('add-member-btn').addEventListener('click', addMember);
    document.getElementById("promanage-logo").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html";
    });

    loadMembers();

    profileIcon.addEventListener("click", () => {
        if (profileDropdown.style.display === "block") {
            profileDropdown.style.display = "none";
        } else {
            profileDropdown.style.display = "block";
        }
    });

    logoutLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
            window.location.href = "connexionPage.html";
        }
    });
});
