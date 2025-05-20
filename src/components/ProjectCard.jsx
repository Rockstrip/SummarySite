import { Link } from 'react-router-dom';
import './ProjectCard.css';
import ProjectLink from './ProjectLink';
import AppleIcon from '../assets/Icons/Links/apple.svg?react';
import AndroidIcon from '../assets/Icons/Links/android.svg?react';
import WebsiteIcon from '../assets/Icons/Links/website.svg?react';
import GithubIcon from '../assets/Icons/Links/github.svg?react';

const placeholderUrl = "https://placehold.co/600x400/1a1a1a/2a2a2a?font=lora&text=?&color=black";

const ProjectCard = ({ project, image, isImageLoading }) => {
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

  const imageUrl = image || placeholderUrl;
  return (
    <div className="projectCard">
      <div className={`projectCard-image-container ${isImageLoading ? 'loading' : ''}`}>
        <img 
          src={imageUrl}
          alt={project.title || "Project preview"}
          className={`projectCard-image ${isImageLoading ? 'image-loading' : ''}`}
        />
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
