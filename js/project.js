document.addEventListener("DOMContentLoaded", () => {
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const projectName = getQueryParam("name");

    fetch("projects.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((projects) => {
            const projectData = projects.find(
                (project) => project.title === projectName
            );

            if (!projectData) {
                console.error(`Project with name "${projectName}" not found.`);
                document.querySelector(".short-description").innerHTML = `
                    <p>Project not found. Please check the URL or try again later.</p>
                `;
                return;
            }

            if (!Array.isArray(projectData.screenshots)) {
                projectData.screenshots = [];
            }

            const screenshotCount = 4;
            const screenshotBasePath = `Resources/Portfolio/${projectData.title}/`;

            // Проверяем все изображения параллельно
            const promises = [];
            for (let i = 1; i <= screenshotCount; i++) {
                const filePath = `${screenshotBasePath}${i}.${projectData.screenshotsExtension}`;
                promises.push(
                    fetch(filePath, { method: "HEAD" })
                        .then((response) => {
                            if (response.ok) {
                                return filePath;
                            } else {
                                return "Resources/black.webp";
                            }
                        })
                        .catch(() => "Resources/black.webp")
                );
            }

            // Заполняем массив изображений после всех проверок
            Promise.all(promises).then((results) => {
                projectData.screenshots.push(...results);

                // Заполняем карусель
                const carousel = document.querySelector(".carousel");
                const thumbnails = document.querySelector(".thumbnails");

                if (carousel && thumbnails) {
                    projectData.screenshots.forEach((src, index) => {
                        const img = document.createElement("img");
                        img.src = src;
                        img.alt = `Screenshot ${index + 1}`;
                        carousel.appendChild(img);

                        const thumb = document.createElement("img");
                        thumb.src = src;
                        thumb.alt = `Thumbnail ${index + 1}`;
                        thumb.addEventListener("click", () => setCarouselImage(index));
                        thumbnails.appendChild(thumb);
                    });

                    let currentIndex = 0;

                    const setCarouselImage = (index) => {
                        const width = carousel.children[0]?.clientWidth || 0;
                        carousel.style.transform = `translateX(-${index * width}px)`;
                        currentIndex = index;
                        document.querySelectorAll(".thumbnails img").forEach((thumb, i) => {
                            thumb.classList.toggle("active", i === index);
                        });
                    };

                    setCarouselImage(0);
                } else {
                    console.error("Carousel or thumbnails container not found.");
                }
            });

            // Заполняем остальные данные проекта
            const poster = document.querySelector(".poster");
            if (poster) {
                poster.src = `${screenshotBasePath}logo.${projectData.screenshotsExtension}`;
            }

            const shortDescription = document.querySelector(".short-description");
            if (shortDescription) {
                shortDescription.innerHTML = `
                    <p>${projectData.shortDescription}</p>
                    <p><strong>Release Date:</strong> ${projectData.releaseDate}</p>
                    <p><strong>Developer:</strong> ${projectData.developer}</p>
                    <p><strong>Publisher:</strong> ${projectData.publisher}</p>
                    <p>${projectData.tags.join(", ")}</p>
                `;
            }

            const detailedDescription = document.querySelector(".detailed-description");
            if (detailedDescription) {
                detailedDescription.textContent = projectData.detailedDescription;
            }
        })
        .catch((error) => console.error("Error loading projects data:", error));
});
