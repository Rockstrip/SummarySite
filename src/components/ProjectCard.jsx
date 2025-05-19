import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProjectCard.css';
import ProjectLink from './ProjectLink';
import AppleIcon from '../assets/Icons/Links/apple.svg?react';
import AndroidIcon from '../assets/Icons/Links/android.svg?react';
import WebsiteIcon from '../assets/Icons/Links/website.svg?react';
import GithubIcon from '../assets/Icons/Links/github.svg?react';

const ProjectCard = ({ project }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      const extensions = ['jpg', 'png', 'webp'];
      
      for (const ext of extensions) {
        try {
          const imageModule = await import(`../assets/Portfolio/${project.title}/logo.${ext}`);
          setImageUrl(imageModule.default);
          setIsLoading(false);
          return; // Exit if successful
        } catch (error) {
          continue; // Try next extension
        }
      }
      
      // If no image was found, use placeholder
      console.warn(`Could not load logo for ${project.title}`);
      setImageUrl("https://placehold.co/600x400/EEE/31343C?font=lora&text=?");
      setIsLoading(false);
    };
    loadImage();
  }, [project.title]);

  const getProjectLinks = () => {
    if (!project.links) return [];
    
    return project.links.map(link => {
      let Icon = WebsiteIcon;
      if (link.url.includes('apps.apple.com')) {
        Icon = AppleIcon;
      } else if (link.url.includes('play.google.com')) {
        Icon = AndroidIcon;
      } else if (link.url.includes('github.com')) {
        Icon = GithubIcon;
      }
      
      return {
        ...link,
        Icon
      };
    });
  };

  return (
    <div className="projectCard">
      <div className={`projectCard-image-container ${isLoading ? 'loading' : ''}`}>
        {imageUrl && (
          <img 
            src={imageUrl}
            alt={project.title}
            className="projectCard-image"
          />
        )}
      </div>
      <div className="projectCard-content">
        <h3>{project.title}</h3>
        <p className="projectCard-description">{project.shortDescription}</p>
        <div className="projectCard-links">
          <div className="projectCard-links-left">
            {getProjectLinks().map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="projectCard-link"
                title={link.name}
              >
                <link.Icon />
              </a>
            ))}
          </div>
          <div className="projectCard-links-right">
            <Link to={`/project/${encodeURIComponent(project.title)}`} className="projectCard-link">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 