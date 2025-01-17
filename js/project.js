document.addEventListener("DOMContentLoaded", () => {
    fetch('projects.json')
    .then(response => response.json());

        const projectData = projects[0]; // Используем первый проект

        // Убедись, что screenshots массив
        if (!Array.isArray(projectData.screenshots)) {
            projectData.screenshots = [];
        }

            // Генерация списка изображений
            const screenshotCount = 4;  // Укажи максимальное количество изображений
            const screenshotBasePath = `Resources/Portfolio/${projectData.title}/`;

            for (let i = 1; i <= screenshotCount; i++) {
                projectData.screenshots.push(`${screenshotBasePath}${i}.${projectData.screenshotsExtension}`);
            }

            // Заполнение информации о проекте
            document.querySelector(".poster").src = `${screenshotBasePath}logo.${projectData.screenshotsExtension}`;
            const shortDescription = document.querySelector(".short-description");
            shortDescription.innerHTML = `
                <p>${projectData.shortDescription}</p>
                <p><strong>Release Date:</strong> ${projectData.releaseDate}</p>
                <p><strong>Developer:</strong> ${projectData.developer}</p>
                <p><strong>Publisher:</strong> ${projectData.publisher}</p>
                <p>${projectData.tags.join(", ")}</p>
            `;
            document.querySelector(".detailed-description").textContent = projectData.detailedDescription;

            // Заполнение карусели
            const carousel = document.querySelector(".carousel");
            const thumbnails = document.querySelector(".thumbnails");
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
                const width = carousel.children[0].clientWidth;
                carousel.style.transform = `translateX(-${index * width}px)`;
                currentIndex = index;
                document.querySelectorAll(".thumbnails img").forEach((thumb, i) => {
                    thumb.classList.toggle("active", i === index);
                });
            };

            // Инициализация
            setCarouselImage(0);
        })
        .catch(error => console.error('Error loading projects data:', error));
});
