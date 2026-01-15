document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById("project-list");
    const projectNameElement = document.getElementById("project-name");
    const projectIdElement = document.getElementById("project-id");
    const projectDescriptionElement = document.getElementById("project-description");
    const welcomeMessage = document.getElementById("welcome-message");
    const mainContent = document.querySelector(".main-content");
    const progressBar = document.querySelector(".progress-bar");
    const progressInput = document.getElementById("progress-input");
    const progressText = document.querySelector(".progress-text");
    const editProgressBtn = document.getElementById("edit-progress-btn");
    const saveProgressBtn = document.getElementById("save-progress-btn");
    const saveBtn = document.getElementById("save-btn");
    const modifyBtn = document.getElementById("modify-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const descriptionEdit = document.getElementById("description-edit");
    const nameEdit = document.getElementById("name-edit");
    const taskTableBody = document.getElementById("task-table-body");
    const logoContainer = document.getElementById("logo-container");
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");

    document.getElementById("promanage-logo").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html"; 
    });

    document.getElementById("promanage-logo-main").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html";
    });

    let projects = [
        {
            id: 1,
            name: "Optimisation de la chaîne d'approvisionnement",
            description: "Projet visant à améliorer l'efficacité des chaînes d'approvisionnement grâce à des solutions technologiques avancées.",
            progress: 70,
            tasks: [
                { task: "Analyse des besoins", member: "Clara Dupont", deadline: "2022-12-01", startDate: "2022-11-01", status: "Completed" },
                { task: "Développement de la solution", member: "Julien Lefèvre", deadline: "2022-12-15", startDate: "2022-11-05", status: "In Progress" },
            ]
        },
        {
            id: 2,
            name: "Lancement de la campagne marketing",
            description: "Campagne visant à accroître la notoriété de la marque et à générer de nouveaux leads pour le trimestre.",
            progress: 45,
            tasks: [
                { task: "Création de contenu", member: "Sophie Martin", deadline: "2022-11-15", startDate: "2022-11-01", status: "Completed" },
                { task: "Planification des publications sur les réseaux sociaux", member: "Pauline Bernard", deadline: "2022-11-30", startDate: "2022-11-05", status: "Not Started" },
            ]
        },
        {
            id: 3,
            name: "Développement du nouveau produit",
            description: "Développement et lancement d'un produit innovant pour capturer une nouvelle part de marché.",
            progress: 83,
            tasks: [
                { task: "Recherche et développement", member: "Marc Dubois", deadline: "2022-12-01", startDate: "2022-11-01", status: "Completed" },
                { task: "Tests du prototype", member: "Élise Moreau", deadline: "2022-12-15", startDate: "2022-11-05", status: "In Progress" },
            ]
        },
        {
            id: 4,
            name: "Amélioration de l'expérience utilisateur",
            description: "Projet axé sur la refonte de l'interface utilisateur pour offrir une expérience plus intuitive et fluide.",
            progress: 51,
            tasks: [
                { task: "Analyse des feedbacks utilisateurs", member: "Jean-Pierre Roux", deadline: "2022-11-20", startDate: "2022-11-01", status: "Completed" },
                { task: "Conception de nouvelles interfaces", member: "Claire Bernard", deadline: "2022-12-05", startDate: "2022-11-05", status: "In Progress" },
            ]
        }
    ];
    
    

    let currentProjectIndex = null;

    function renderProjectList() {
        projectList.innerHTML = "";
        projects.forEach((project, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("project-item");
    
            const link = document.createElement("a");
            link.textContent = `${project.id} - ${project.name}`;
            link.classList.add("project-link");
            link.href = "#";
            link.addEventListener("click", () => loadProject(index));
    
            const dropdownButton = document.createElement("button");
            dropdownButton.classList.add("dropdown-button");
            dropdownButton.innerHTML = `<span class="arrow">&#9664;</span>`; 
            dropdownButton.addEventListener("click", (event) => {
                event.preventDefault();
                toggleDropdown(dropdownButton, index);
            });
    
            listItem.appendChild(link);
            listItem.appendChild(dropdownButton);
    
            const submenu = document.createElement("ul");
            submenu.classList.add("submenu");
            submenu.innerHTML = `
                <li><a href="#" data-project-id="${index}" class="member-link">Membres</a></li>
                <li><a href="#" data-project-id="${index}" class="task-link">Tâches</a></li>
                <li><a href="PageRapportsWeb.html?projectId=${index}" class="report-link">Rapports</a></li>
            `;
            listItem.appendChild(submenu);
    
            projectList.appendChild(listItem);
        });
    
        document.querySelectorAll(".member-link").forEach(link => {
            link.addEventListener("click", (e) => {
                const projectId = e.target.getAttribute("data-project-id");
                window.location.href = `PageMembreWeb.html?projectId=${projectId}`;
            });
        });
    
        document.querySelectorAll(".task-link").forEach(link => {
            link.addEventListener("click", (e) => {
                const projectId = e.target.getAttribute("data-project-id");
                window.location.href = `PageTachesWeb.html?projectId=${projectId}`;
            });
        });
    
        document.querySelectorAll(".report-link").forEach(link => {
            link.addEventListener("click", (e) => {
                const projectId = e.target.getAttribute("data-project-id");
                window.location.href = `PageRapportsWeb.html?projectId=${projectId}`;
            });
        });
    }
    

    function loadProject(index) {
        const project = projects[index];
        currentProjectIndex = index;
        projectIdElement.textContent = `ID: ${project.id}`;
        projectNameElement.textContent = project.name;
        projectDescriptionElement.textContent = project.description;
        descriptionEdit.value = project.description;
        nameEdit.value = project.name;
        progressBar.style.width = project.progress + "%";
        progressInput.value = project.progress;
        progressText.textContent = project.progress + "%";

        taskTableBody.innerHTML = "";
        project.tasks.forEach((task, taskIndex) => {
            const row = document.createElement("tr");

            const statusSelect = document.createElement("select");
            const statuses = ["Not Started", "In Progress", "Completed"];
            statuses.forEach(status => {
                const option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                if (task.status === status) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });
            statusSelect.addEventListener("change", () => {
                projects[currentProjectIndex].tasks[taskIndex].status = statusSelect.value;
            });

            row.innerHTML = `
                <td>${task.task}</td>
                <td>${task.member}</td>
                <td>${task.startDate}</td>
                <td>${task.deadline}</td>
            `;
            const statusCell = document.createElement("td");
            statusCell.appendChild(statusSelect);
            row.appendChild(statusCell);
            taskTableBody.appendChild(row);
        });

        welcomeMessage.style.display = "none";
        mainContent.style.display = "block";
        logoContainer.style.display = "block"; 
    }

    document.getElementById("create-project-btn").addEventListener("click", () => {
        window.location.href = "PageCreerProjet.html"; 
    });
   

    modifyBtn.addEventListener("click", () => {
        descriptionEdit.style.display = "block";
        nameEdit.style.display = "block";
        projectDescriptionElement.style.display = "none";
        projectNameElement.style.display = "none";
        saveBtn.style.display = "inline-block";
        modifyBtn.style.display = "none";
    });

    saveBtn.addEventListener("click", () => {
        const newDescription = descriptionEdit.value;
        const newName = nameEdit.value;
        projects[currentProjectIndex].description = newDescription;
        projects[currentProjectIndex].name = newName;
        projectDescriptionElement.textContent = newDescription;
        projectNameElement.textContent = newName;

        descriptionEdit.style.display = "none";
        nameEdit.style.display = "none";
        projectDescriptionElement.style.display = "block";
        projectNameElement.style.display = "block";
        saveBtn.style.display = "none";
        modifyBtn.style.display = "inline-block";
        renderProjectList();
    });

    deleteBtn.addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
            projects.splice(currentProjectIndex, 1);
            welcomeMessage.style.display = "block";
            mainContent.style.display = "none";
            renderProjectList();
        }
    });

    editProgressBtn.addEventListener("click", () => {
        progressInput.style.display = "inline-block";
        progressBar.style.display = "none";
        editProgressBtn.style.display = "none";
        saveProgressBtn.style.display = "inline-block";
    });

    saveProgressBtn.addEventListener("click", () => {
        const newProgress = parseInt(progressInput.value);
        projects[currentProjectIndex].progress = newProgress;
        progressBar.style.width = newProgress + "%";
        progressText.textContent = newProgress + "%";
        
        progressInput.style.display = "none";
        progressBar.style.display = "block";
        editProgressBtn.style.display = "inline-block";
        saveProgressBtn.style.display = "none";
    });

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

    function toggleDropdown(button, index) {
        const arrow = button.querySelector(".arrow");
        const submenu = projectList.children[index].querySelector(".submenu");
        
        if (submenu.style.display === "none" || submenu.style.display === "") {
            submenu.style.display = "block";
            arrow.style.transform = "rotate(-90deg)"; 
        } else {
            submenu.style.display = "none";
            arrow.style.transform = "rotate(90deg)"; 
        }
    }

    window.addEventListener("click", (event) => {
        if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });

    renderProjectList();
});
