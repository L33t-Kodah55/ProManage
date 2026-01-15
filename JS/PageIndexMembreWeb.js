document.addEventListener("DOMContentLoaded", () => {
    const availableMembers = [
        { name: "Alice Dubois", role: "Développeuse Front-End" },
        { name: "Benoît Martin", role: "Développeur Back-End" },
        { name: "Clémence Lefèvre", role: "Designer UI/UX" },
        { name: "David Girard", role: "Chef de Projet" }
    ];
    const profileIcon = document.getElementById("profile-icon");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutLink = document.getElementById("logout-link");


    function getProjectIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('projectId');
    }

    function loadAvailableMembers() {
        const projectId = getProjectIdFromURL();
        const membersList = document.getElementById('available-members-list');
        membersList.innerHTML = '';
        availableMembers.forEach((member, index) => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Member Icon">
                <div>
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                </div>
                <button class="add-btn" onclick="addMember(event, ${index})">Ajouter</button>
            `;

            membersList.appendChild(memberCard);
        });
    }

    function addMember(event, index) {
        event.stopPropagation();
        const projectId = getProjectIdFromURL();
        const member = availableMembers[index];
        if (projects[projectId]) {
            projects[projectId].members.push(member);
            window.location.href = `PageMembreWeb.html?projectId=${projectId}`;
        }
    }

    document.getElementById("back-button").addEventListener("click", () => {
        window.history.back();
    });

    document.getElementById("promanage-logo").addEventListener("click", () => {
        window.location.href = "PageAccueilWeb.html";
    });

    document.getElementById("create-member-btn").addEventListener("click", () => {
        window.location.href = "FormCreerMembre.html"; 
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

    loadAvailableMembers();
    

    window.addMember = addMember;
});
