import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from './projects.js';
import { getAllProjectLogos } from '../utils/drive.js';
import './Portfolio.css';

const Portfolio = () => {
  const [logos, setLogos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const fetchedLogos = await getAllProjectLogos();
        console.log(fetchedLogos);
        setLogos(fetchedLogos);
      } catch (err) {
        console.error('Error loading project logos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogos();
  }, []);

  return (
    <main>
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            image={logos[project.title]}
            isImageLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
