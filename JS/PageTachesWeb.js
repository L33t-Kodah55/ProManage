document.addEventListener("DOMContentLoaded", () => {
    const projectNameElement = document.getElementById("project-name");
    const titleEditElement = document.getElementById("title-edit");
    const modifyTitleBtn = document.getElementById("modify-title-btn");
    const saveTitleBtn = document.getElementById("save-title-btn");

    const taskCardContainer = document.getElementById("task-card-container");
    const confirmationModal = document.getElementById("confirmation-modal");
    const closeButton = document.querySelector(".close-button");
    const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
    const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
    const backButton = document.getElementById("back-button");
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('projectId');
    
  let projects = [
    {
        name: "Optimisation de la chaîne d'approvisionnement",
        description: "Projet visant à améliorer l'efficacité des chaînes d'approvisionnement grâce à des solutions technologiques avancées.",
        progress: 70,
        tasks: [
            { task: "Analyse des besoins", member: "Clara Dupont", deadline: "2023-12-01", status: "Completed", description: "Analyse détaillée des besoins en optimisation des processus." },
            { task: "Développement de la solution", member: "Julien Lefèvre", deadline: "2023-12-15", status: "In Progress", description: "Développement des outils et solutions technologiques pour l'optimisation." }
        ]
    },
    {
        name: "Lancement de la campagne marketing",
        description: "Campagne visant à accroître la visibilité et les ventes grâce à des stratégies marketing innovantes.",
        progress: 45,
        tasks: [
            { task: "Création de contenu", member: "Sophie Martin", deadline: "2023-11-15", status: "Completed", description: "Création des supports marketing nécessaires pour la campagne." },
            { task: "Planification des publications sur les réseaux sociaux", member: "Pauline Bernard", deadline: "2023-11-30", status: "Not Started", description: "Gestion et programmation des publications sur les réseaux sociaux." }
        ]
    },
    {
        name: "Développement du nouveau produit",
        description: "Développement d'un produit innovant pour répondre aux besoins du marché.",
        progress: 83,
        tasks: [
            { task: "Recherche et développement", member: "Marc Dubois", deadline: "2023-12-01", status: "Completed", description: "Recherche approfondie et développement du prototype du produit." },
            { task: "Tests du prototype", member: "Élise Moreau", deadline: "2023-12-15", status: "In Progress", description: "Tests et évaluation des performances du prototype développé." }
        ]
    },
    {
        name: "Amélioration de l'expérience utilisateur",
        description: "Projet visant à améliorer l'interface et l'expérience utilisateur de nos applications.",
        progress: 51,
        tasks: [
            { task: "Analyse des feedbacks utilisateurs", member: "Jean-Pierre Roux", deadline: "2023-11-20", status: "Completed", description: "Analyse des retours des utilisateurs pour identifier les points à améliorer." },
            { task: "Conception de nouvelles interfaces", member: "Claire Bernard", deadline: "2023-12-05", status: "In Progress", description: "Conception et prototypage des nouvelles interfaces pour améliorer l'expérience utilisateur." }
        ]
    }
];

    

    let selectedProject = projects[projectId];
    projectNameElement.textContent = `Tâches du Projet : ${selectedProject.name}`;

    const renderTasks = () => {
        taskCardContainer.innerHTML = '';
        selectedProject.tasks.forEach((task, index) => {
            const taskCard = document.createElement("div");
            taskCard.classList.add("card");
            taskCard.innerHTML = 
                `<h3>${task.task}</h3>
                <p><strong>Membre:</strong> <span class="member-text">${task.member}</span><input type="text" class="member-edit" value="${task.member}"></p>
                <p><strong>Date limite:</strong> <span class="deadline-text">${task.deadline}</span><input type="date" class="deadline-edit" value="${task.deadline}"></p>
                <p><strong>Status:</strong> <span class="status-text">${task.status}</span>
                    <select class="status-edit">
                        <option value="Not Started" ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
                        <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                        <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </p>
                <p class="description-text">${task.description}</p>
                <textarea class="description-edit">${task.description}</textarea>
                <button class="button modify-btn" onclick="toggleEdit(${index})">Modifier</button>
                <button class="button save-btn" onclick="saveEdit(${index})" style="display:none;">Sauvegarder</button>
                <button class="delete-btn" onclick="showConfirmationModal(${index})">Supprimer</button>`;
            taskCardContainer.appendChild(taskCard);
        });
    };

    renderTasks();

    let editingTaskIndex = null;

    window.toggleEdit = (index) => {
        const taskCard = taskCardContainer.children[index];
        const descriptionText = taskCard.querySelector(".description-text");
        const descriptionEdit = taskCard.querySelector(".description-edit");
        const statusText = taskCard.querySelector(".status-text");
        const statusEdit = taskCard.querySelector(".status-edit");
        const memberText = taskCard.querySelector(".member-text");
        const memberEdit = taskCard.querySelector(".member-edit");
        const deadlineText = taskCard.querySelector(".deadline-text");
        const deadlineEdit = taskCard.querySelector(".deadline-edit");
        const modifyBtn = taskCard.querySelector(".modify-btn");
        const saveBtn = taskCard.querySelector(".save-btn");

        if (editingTaskIndex !== null && editingTaskIndex !== index) {
            // Enregistrez les modifications de la tâche actuellement en édition
            const previousTaskCard = taskCardContainer.children[editingTaskIndex];
            const previousDescriptionText = previousTaskCard.querySelector(".description-text");
            const previousDescriptionEdit = previousTaskCard.querySelector(".description-edit");
            const previousStatusText = previousTaskCard.querySelector(".status-text");
            const previousStatusEdit = previousTaskCard.querySelector(".status-edit");
            const previousMemberText = previousTaskCard.querySelector(".member-text");
            const previousMemberEdit = previousTaskCard.querySelector(".member-edit");
            const previousDeadlineText = previousTaskCard.querySelector(".deadline-text");
            const previousDeadlineEdit = previousTaskCard.querySelector(".deadline-edit");

            previousDescriptionText.textContent = previousDescriptionEdit.value;
            previousDescriptionText.style.display = "block";
            previousDescriptionEdit.style.display = "none";
            previousStatusText.textContent = previousStatusEdit.value;
            previousStatusText.style.display = "block";
            previousStatusEdit.style.display = "none";
            previousMemberText.textContent = previousMemberEdit.value;
            previousMemberText.style.display = "block";
            previousMemberEdit.style.display = "none";
            previousDeadlineText.textContent = previousDeadlineEdit.value;
            previousDeadlineText.style.display = "block";
            previousDeadlineEdit.style.display = "none";
            previousTaskCard.querySelector(".save-btn").style.display = "none";
            previousTaskCard.querySelector(".modify-btn").style.display = "inline-block";
        }

        descriptionEdit.value = descriptionText.textContent;
        statusEdit.value = statusText.textContent;
        memberEdit.value = memberText.textContent;
        deadlineEdit.value = deadlineText.textContent;
        descriptionText.style.display = "none";
        descriptionEdit.style.display = "block";
        statusText.style.display = "none";
        statusEdit.style.display = "block";
        memberText.style.display = "none";
        memberEdit.style.display = "block";
        deadlineText.style.display = "none";
        deadlineEdit.style.display = "block";
        modifyBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
        editingTaskIndex = index;
    };

    window.saveEdit = (index) => {
        const taskCard = taskCardContainer.children[index];
        const descriptionText = taskCard.querySelector(".description-text");
        const descriptionEdit = taskCard.querySelector(".description-edit");
        const statusText = taskCard.querySelector(".status-text");
        const statusEdit = taskCard.querySelector(".status-edit");
        const memberText = taskCard.querySelector(".member-text");
        const memberEdit = taskCard.querySelector(".member-edit");
        const deadlineText = taskCard.querySelector(".deadline-text");
        const deadlineEdit = taskCard.querySelector(".deadline-edit");
        const modifyBtn = taskCard.querySelector(".modify-btn");
        const saveBtn = taskCard.querySelector(".save-btn");

        descriptionText.textContent = descriptionEdit.value;
        statusText.textContent = statusEdit.value;
        memberText.textContent = memberEdit.value;
        deadlineText.textContent = deadlineEdit.value;

        descriptionText.style.display = "block";
        descriptionEdit.style.display = "none";
        statusText.style.display = "block";
        statusEdit.style.display = "none";
        memberText.style.display = "block";
        memberEdit.style.display = "none";
        deadlineText.style.display = "block";
        deadlineEdit.style.display = "none";
        saveBtn.style.display = "none";
        modifyBtn.style.display = "inline-block";
        editingTaskIndex = null;
    };

    window.showConfirmationModal = (index) => {
        confirmationModal.style.display = "block";
        confirmDeleteBtn.onclick = () => {
            deleteTask(index);
        };
    };

    function createTask() {
        window.location.href = `creerTache.html`;
    }
    
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

    window.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }

        modifyTitleBtn.addEventListener("click", () => {
            titleEditElement.value = projectNameElement.textContent.replace("Tâches du Projet : ", "");
            projectNameElement.style.display = "none";
            titleEditElement.style.display = "inline-block";
            modifyTitleBtn.style.display = "none";
            saveTitleBtn.style.display = "inline-block";
        });
    
        saveTitleBtn.addEventListener("click", () => {
            const newTitle = titleEditElement.value;
            projectNameElement.textContent = `Tâches du Projet : ${newTitle}`;
            selectedProject.name = newTitle;
            projectNameElement.style.display = "block";
            titleEditElement.style.display = "none";
            saveTitleBtn.style.display = "none";
            modifyTitleBtn.style.display = "inline-block";
        });
    
    });


    closeButton.onclick = () => {
        confirmationModal.style.display = "none";
    };

    cancelDeleteBtn.onclick = () => {
        confirmationModal.style.display = "none";
    };

    const deleteTask = (index) => {
        selectedProject.tasks.splice(index, 1);
        renderTasks(); 
        confirmationModal.style.display = "none";
    };

    backButton.onclick = () => {
        window.history.back();
    };

    document.getElementById('create-tache-btn').addEventListener('click', createTask);
});

document.getElementById("promanage-logo").addEventListener("click", () => {
    window.location.href = "PageAccueilWeb.html"; 
});

document.getElementById("promanage-logo-main").addEventListener("click", () => {
    window.location.href = "PageAccueilWeb.html";
});
