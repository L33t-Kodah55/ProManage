document.addEventListener("DOMContentLoaded", () => {
    const reportList = document.getElementById("report-list");
    const welcomeMessage = document.getElementById("welcome-message");
    const mainContent = document.querySelector(".main-content");
    const backButton = document.getElementById("back-button");
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");



    const projectReports = {
        0: [
            { title: "Rapport 1 de l'Optimisation de la chaîne d'approvisionnement", content: "Ce rapport détaille l'analyse des besoins et l'évaluation des solutions pour améliorer l'efficacité des chaînes d'approvisionnement.", member: "Clara Dupont", deadline: "2022-12-01", tasks: [{ title: "Analyse des besoins", description: "Analyse détaillée des besoins en optimisation des processus." }, { title: "Évaluation des solutions", description: "Évaluation des solutions proposées pour l'optimisation." }] },
            { title: "Rapport 2 de l'Optimisation de la chaîne d'approvisionnement", content: "Ce rapport couvre le développement des solutions technologiques et les tests préliminaires pour l'optimisation des chaînes d'approvisionnement.", member: "Julien Lefèvre", deadline: "2022-12-15", tasks: [{ title: "Développement de la solution", description: "Développement des outils et solutions technologiques pour l'optimisation." }, { title: "Tests préliminaires", description: "Tests préliminaires des solutions développées." }] }
        ],
        1: [
            { title: "Rapport 1 du Lancement de la campagne marketing", content: "Ce rapport présente la création du contenu promotionnel et la planification des publications sur les réseaux sociaux pour accroître la notoriété de la marque.", member: "Sophie Martin", deadline: "2022-11-15", tasks: [{ title: "Création de contenu", description: "Création des supports marketing nécessaires pour la campagne." }, { title: "Planification des publications", description: "Planification des publications sur les réseaux sociaux." }] },
            { title: "Rapport 2 du Lancement de la campagne marketing", content: "Ce rapport couvre la gestion des réseaux sociaux et l'analyse des performances des campagnes marketing.", member: "Pauline Bernard", deadline: "2022-11-30", tasks: [{ title: "Gestion des réseaux sociaux", description: "Gestion et programmation des publications sur les réseaux sociaux." }, { title: "Analyse des performances", description: "Analyse des performances des campagnes lancées." }] }
        ],
        2: [
            { title: "Rapport 1 du Développement du nouveau produit", content: "Ce rapport couvre la recherche et le développement du prototype du produit, ainsi que la création du prototype initial.", member: "Marc Dubois", deadline: "2022-12-01", tasks: [{ title: "Recherche et développement", description: "Recherche approfondie et développement du prototype du produit." }, { title: "Prototype initial", description: "Création du prototype initial pour le produit." }] },
            { title: "Rapport 2 du Développement du nouveau produit", content: "Ce rapport traite des tests du prototype et des ajustements nécessaires basés sur les résultats des tests.", member: "Élise Moreau", deadline: "2022-12-15", tasks: [{ title: "Tests du prototype", description: "Tests et évaluation des performances du prototype développé." }, { title: "Ajustements", description: "Ajustements basés sur les résultats des tests du prototype." }] }
        ],
        3: [
            { title: "Rapport 1 de l'Amélioration de l'expérience utilisateur", content: "Ce rapport présente l'analyse des feedbacks des utilisateurs et les propositions d'améliorations pour l'interface utilisateur.", member: "Jean-Pierre Roux", deadline: "2022-11-20", tasks: [{ title: "Analyse des feedbacks", description: "Analyse des retours des utilisateurs pour identifier les points à améliorer." }, { title: "Propositions d'améliorations", description: "Propositions d'améliorations basées sur l'analyse des feedbacks." }] },
            { title: "Rapport 2 de l'Amélioration de l'expérience utilisateur", content: "Ce rapport couvre la conception de nouvelles interfaces et les tests de ces interfaces pour améliorer l'expérience utilisateur.", member: "Claire Bernard", deadline: "2022-12-05", tasks: [{ title: "Conception de nouvelles interfaces", description: "Conception et prototypage des nouvelles interfaces pour améliorer l'expérience utilisateur." }, { title: "Tests des nouvelles interfaces", description: "Tests des nouvelles interfaces pour s'assurer qu'elles répondent aux besoins des utilisateurs." }] }
        ]
    };
    
    
    


    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');

    if (projectId !== null && projectReports[projectId]) {
        displayReports(projectReports[projectId]);
    } else {
        welcomeMessage.textContent = "Aucun rapport trouvé pour ce projet.";
    }

    function displayReports(reports) {
        reportList.innerHTML = "";
        reports.forEach((report) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const title = document.createElement("div");
            title.classList.add("card-title");
            title.textContent = report.title;

            const content = document.createElement("div");
            content.classList.add("card-content");
            content.textContent = report.content;

            const info = document.createElement("div");
            info.classList.add("card-info");
            info.innerHTML = `
                <div>Membre: ${report.member}</div>
                <div>Échéance: ${report.deadline}</div>
            `;

            const tasks = document.createElement("div");
            tasks.classList.add("card-tasks");
            tasks.innerHTML = "<div><strong>Tâches :</strong></div>";
            report.tasks.forEach((task) => {
                const taskDiv = document.createElement("div");
                taskDiv.innerHTML = `<div class="task-title">${task.title}:</div> <div>${task.description}</div>`;
                tasks.appendChild(taskDiv);
            });

            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(info);
            card.appendChild(tasks);
            reportList.appendChild(card);
        });

        welcomeMessage.style.display = "none";
        mainContent.style.display = "block";
    }

    backButton.onclick = () => {
        window.history.back();
    };

       
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

document.getElementById("promanage-logo").addEventListener("click", () => {
    window.location.href = "PageAccueilWeb.html"; 
});

document.getElementById("promanage-logo-main").addEventListener("click", () => {
    window.location.href = "PageAccueilWeb.html";
});
