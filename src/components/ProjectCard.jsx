import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const [imageUrl, setImageUrl] = useState("https://placehold.co/600x400/EEE/31343C?font=lora&text=?");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../assets/Portfolio/${project.title}/logo.jpg`);
        setImageUrl(imageModule.default);
      }catch (fallbackError) {
          console.warn(`Could not load image for ${project.title}:`, fallbackError);
          setImageUrl("https://placehold.co/600x400/EEE/31343C?font=lora&text=?");
      }
    };
    loadImage();
  }, [project.title]);

  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <img 
        src={imageUrl}
        alt={project.title}
        className="project-image"
      />
      <p className="project-date">{project.releaseDate}</p>
      <p className="project-description">{project.shortDescription}</p>

      <div className="project-links">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {link.name}
          </a>
        ))}
        <Link to={`/project/${encodeURIComponent(project.title)}`} className="project-link">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard; 