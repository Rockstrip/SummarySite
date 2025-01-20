document.addEventListener("DOMContentLoaded", () => {
    const getQueryParam = (param) =>
        new URLSearchParams(window.location.search).get(param);

    const projectName = getQueryParam("name");

    const fetchJSON = (url) =>
        fetch(url).then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        });

    const fetchImage = (filePath) =>
        fetch(filePath, { method: "HEAD" })
            .then((response) => (response.ok ? filePath : "Resources/black.webp"))
            .catch(() => "Resources/black.webp");

    const updateCarousel = (carousel, thumbnails, screenshots) => {
        screenshots.forEach((src, index) => {
            const createImage = (src, alt, clickHandler = null) => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = alt;
                if (clickHandler) img.addEventListener("click", clickHandler);
                return img;
            };

            carousel.appendChild(createImage(src, `Screenshot ${index + 1}`));
            thumbnails.appendChild(
                createImage(src, `Thumbnail ${index + 1}`, () => setCarouselImage(index))
            );
        });

        let currentIndex = 0;

        const setCarouselImage = (index) => {
            const width = carousel.children[0]?.clientWidth || 0;
            carousel.style.transform = `translateX(-${index * width}px)`;
            currentIndex = index;
            thumbnails.querySelectorAll("img").forEach((thumb, i) => {
                thumb.classList.toggle("active", i === index);
            });
        };

        setCarouselImage(0);
    };

    const updateProjectDetails = (projectData, screenshotBasePath) => {
        const poster = document.querySelector(".poster");
        if (poster) {
            poster.src = `${screenshotBasePath}logo.${projectData.screenshotsExtension}`;
        }

        const shortDescription = document.querySelector(".short-description");
        if (shortDescription) {
            shortDescription.innerHTML = `
                <p>${projectData.shortDescription}</p>
                <div class="tags-container">
                    ${projectData.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
            `;
        }

        const detailedDescription = document.querySelector(".detailed-description");
        if (detailedDescription) {
            detailedDescription.textContent = projectData.detailedDescription;
        }
    };

    fetchJSON("projects.json")
        .then((projects) => {
            const projectData = projects.find((p) => p.title === projectName);

            if (!projectData) {
                console.error(`Project with name "${projectName}" not found.`);
                document.querySelector(".short-description").innerHTML = `
                    <p>Project not found. Please check the URL or try again later.</p>
                `;
                return;
            }

            const screenshotBasePath = `Resources/Portfolio/${projectData.title}/`;
            const screenshotCount = 4;

            // Параллельная загрузка изображений
            Promise.all(
                Array.from({ length: screenshotCount }, (_, i) =>
                    fetchImage(`${screenshotBasePath}${i + 1}.${projectData.screenshotsExtension}`)
                )
            ).then((screenshots) => {
                const carousel = document.querySelector(".carousel");
                const thumbnails = document.querySelector(".thumbnails");

                if (carousel && thumbnails) {
                    updateCarousel(carousel, thumbnails, screenshots);
                } else {
                    console.error("Carousel or thumbnails container not found.");
                }
            });

            // Обновляем остальные данные проекта
            updateProjectDetails(projectData, screenshotBasePath);
        })
        .catch((error) => console.error("Error loading projects data:", error));
});
