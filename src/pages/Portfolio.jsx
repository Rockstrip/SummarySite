import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from './projects.js';
import { getAllProjectImages } from '../utils/getDriveFiles';
import './Portfolio.css';

const Portfolio = () => {
  const [images, setImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const all = await getAllProjectImages(); // ❗️ Один раз
        setImages(all);
      } catch (err) {
        console.error('Error loading project images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <main>
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            image={images[project.title]}
            isImageLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
