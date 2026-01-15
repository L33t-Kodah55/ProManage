document.addEventListener('DOMContentLoaded', function () {
    const projects = {
        0: {
            name: "Optimisation de la chaîne d'approvisionnement",
            members: [
                { 
                    nom: "Dupont", 
                    prenom: "Clara", 
                    courriel: "clara.dupont@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 70, 
                    tasks: [
                        { name: "Analyse des besoins", project: "Optimisation", echeance: "12/12/2023", statut: "En cours" },
                        { name: "Modélisation", project: "Optimisation", echeance: "18/12/2023", statut: "Non commencé" }
                    ]
                },
                { 
                    nom: "Lefèvre", 
                    prenom: "Julien", 
                    courriel: "julien.lefevre@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 50,
                    tasks: [
                        { name: "Développement", project: "Optimisation", echeance: "20/12/2023", statut: "En cours" }
                    ]
                }
            ]
        },
        1: {
            name: "Lancement de la campagne marketing",
            members: [
                { 
                    nom: "Martin", 
                    prenom: "Sophie", 
                    courriel: "sophie.martin@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 90, 
                    tasks: [
                        { name: "Création de contenu", project: "Campagne", echeance: "25/12/2023", statut: "En cours" }
                    ]
                },
                { 
                    nom: "Bernard", 
                    prenom: "Pauline", 
                    courriel: "pauline.bernard@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 60,
                    tasks: [
                        { name: "Gestion des publications", project: "Campagne", echeance: "27/12/2023", statut: "Non commencé" }
                    ]
                }
            ]
        },
        2: {
            name: "Développement du nouveau produit",
            members: [
                { 
                    nom: "Dubois", 
                    prenom: "Marc", 
                    courriel: "marc.dubois@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 75, 
                    tasks: [
                        { name: "Recherche initiale", project: "Nouveau produit", echeance: "15/12/2023", statut: "Terminé" },
                        { name: "Développement du prototype", project: "Nouveau produit", echeance: "28/12/2023", statut: "En cours" }
                    ]
                },
                { 
                    nom: "Moreau", 
                    prenom: "Élise", 
                    courriel: "elise.moreau@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 80,
                    tasks: [
                        { name: "Conception du prototype", project: "Nouveau produit", echeance: "30/12/2023", statut: "En cours" }
                    ]
                }
            ]
        },
        3: {
            name: "Amélioration de l'expérience utilisateur",
            members: [
                { 
                    nom: "Roux", 
                    prenom: "Jean-Pierre", 
                    courriel: "jeanpierre.roux@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 85, 
                    tasks: [
                        { name: "Étude UX", project: "Expérience utilisateur", echeance: "10/12/2023", statut: "Terminé" },
                        { name: "Analyse des résultats", project: "Expérience utilisateur", echeance: "20/12/2023", statut: "En cours" }
                    ]
                },
                { 
                    nom: "Bernard", 
                    prenom: "Claire", 
                    courriel: "claire.bernard@example.com", 
                    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    avancement: 70,
                    tasks: [
                        { name: "Refonte de l'interface", project: "Expérience utilisateur", echeance: "22/12/2023", statut: "En cours" }
                    ]
                }
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

    function getMemberIndexFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('memberIndex');
    }

    function loadMemberDetails() {
        const projectId = getProjectIdFromURL();
        const memberIndex = getMemberIndexFromURL();
        const project = projects[projectId];
        const member = project.members[memberIndex];
        
        if (member) {
            document.getElementById('member-nom').textContent = member.nom;
            document.getElementById('member-prenom').textContent = member.prenom;
            document.getElementById('member-courriel').textContent = member.courriel;
            document.getElementById('member-icon').src = member.icon;

            
            const performanceBar = document.getElementById('performance-bar');
            performanceBar.style.width = `${member.avancement}%`;

           
            const tasksTable = document.getElementById('tasks-table');
            tasksTable.innerHTML = ''; 
            member.tasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="table-cell">${task.name}</td>
                    <td class="table-cell">${task.project}</td>
                    <td class="table-cell">${task.echeance}</td>
                    <td class="table-cell">${task.statut}</td>
                `;
                tasksTable.appendChild(row);
            });
        }
    }

    function retourPage() {
        window.history.back();
    }

    document.getElementById("back-button").addEventListener("click", retourPage);
    document.getElementById("promanage-logo").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html";
    });
    loadMemberDetails();

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
