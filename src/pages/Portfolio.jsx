import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getAllLogos } from '../utils/mediaLoader';
import './Portfolio.css';

const Portfolio = () => {
  const [logos, setLogos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logosMap = getAllLogos();
    console.log(logosMap);
    setLogos(logosMap);
    setIsLoading(false);
  }, []);

  return (
    <main>
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {Object.keys(logos).map((projectTitle) => (
          <ProjectCard
            key={projectTitle}
            project={projectTitle}
            image={logos[projectTitle]}
            isImageLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
