import { Link } from 'react-router-dom';
import './ProjectCard.css';
import AppleIcon from '../assets/Icons/Links/apple.svg?react';
import AndroidIcon from '../assets/Icons/Links/android.svg?react';
import WebsiteIcon from '../assets/Icons/Links/website.svg?react';
import GithubIcon from '../assets/Icons/Links/github.svg?react';
import placeholder from '../assets/Icons/placeholder.svg?react';

const ProjectCard = ({ project, image, isImageLoading }) => {
  const title = typeof project === 'string' ? project : project.title || 'Untitled';
  const shortDescription = typeof project === 'object' ? project.shortDescription || '' : '';

  const getProjectLinks = () => {
    if (!project || typeof project !== 'object' || !project.links) return [];

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

  const imageUrl = image || placeholder;

  return (
    <div className="projectCard">
      <div className={`projectCard-image-container ${isImageLoading ? 'loading' : ''}`}>
        <img 
          src={imageUrl}
          alt={title}
          className={`projectCard-image ${isImageLoading ? 'image-loading' : ''}`}
        />
      </div>
      <div className="projectCard-content">
        <h3>{title}</h3>
        {shortDescription && (
          <p className="projectCard-description">{shortDescription}</p>
        )}
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
            <Link
              to={`/project/${encodeURIComponent(title)}`}
              className="projectCard-link"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
