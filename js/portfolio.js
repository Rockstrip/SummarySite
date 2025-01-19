document.addEventListener("DOMContentLoaded", () => {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => {
            if (!Array.isArray(projects) || projects.length === 0) {
                throw new Error("Projects data is empty or invalid.");
            }

            const portfolioGrid = document.getElementById("portfolio-grid");

            // Генерация HTML для каждого проекта
            projects.forEach(project => {
                const projectDiv = document.createElement("div");
                projectDiv.className = "project";

                const projectLink = document.createElement("a");
                projectLink.href = `project.html?name=${encodeURIComponent(project.title)}`;

                const projectImg = document.createElement("img");
                projectImg.src = `Resources/Portfolio/${project.title}/logo.${project.screenshotsExtension}`;
                projectImg.alt = project.title;

                const projectTitle = document.createElement("h3");
                projectTitle.textContent = project.title;

                projectLink.appendChild(projectImg);
                projectLink.appendChild(projectTitle);
                projectLink.appendChild(projectTags);
                projectDiv.appendChild(projectLink);
                portfolioGrid.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Error loading projects data:', error));
});