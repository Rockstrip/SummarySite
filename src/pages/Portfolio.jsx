import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { GetPortfolio } from '../utils/mediaLoader';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const portfolio = GetPortfolio();
    console.log(portfolio);
    setProjects(portfolio);
    setIsLoading(false);
  }, []);

  return (
    <main>
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            image={project.logoUrl}
            isImageLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
