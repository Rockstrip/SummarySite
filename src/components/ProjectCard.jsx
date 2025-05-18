import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProjectCard.css';

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" fill="currentColor" stroke="none">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
    <path d="M16.28125 0.03125C16.152344 0.0546875 16.019531 0.078125 15.90625 0.15625C15.449219 0.464844 15.347656 1.105469 15.65625 1.5625L17.8125 4.78125C14.480469 6.546875 11.996094 9.480469 11.1875 13L38.8125 13C38.003906 9.480469 35.519531 6.546875 32.1875 4.78125L34.34375 1.5625C34.652344 1.105469 34.550781 0.464844 34.09375 0.15625C33.632813 -0.152344 32.996094 -0.0195313 32.6875 0.4375L30.3125 3.9375C28.664063 3.335938 26.875 3 25 3C23.125 3 21.335938 3.335938 19.6875 3.9375L17.3125 0.4375C17.082031 0.09375 16.664063 -0.0429688 16.28125 0.03125ZM19.5 8C20.328125 8 21 8.671875 21 9.5C21 10.332031 20.328125 11 19.5 11C18.667969 11 18 10.332031 18 9.5C18 8.671875 18.667969 8 19.5 8ZM30.5 8C31.332031 8 32 8.671875 32 9.5C32 10.332031 31.332031 11 30.5 11C29.671875 11 29 10.332031 29 9.5C29 8.671875 29.671875 8 30.5 8ZM8 15C6.34375 15 5 16.34375 5 18L5 32C5 33.65625 6.34375 35 8 35C8.351563 35 8.6875 34.925781 9 34.8125L9 15.1875C8.6875 15.074219 8.351563 15 8 15ZM11 15L11 37C11 38.652344 12.347656 40 14 40L36 40C37.652344 40 39 38.652344 39 37L39 15ZM42 15C41.648438 15 41.3125 15.074219 41 15.1875L41 34.8125C41.3125 34.921875 41.648438 35 42 35C43.65625 35 45 33.65625 45 32L45 18C45 16.34375 43.65625 15 42 15ZM15 42L15 46C15 48.207031 16.792969 50 19 50C21.207031 50 23 48.207031 23 46L23 42ZM27 42L27 46C27 48.207031 28.792969 50 31 50C33.207031 50 35 48.207031 35 46L35 42Z"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" fill="currentColor">
    <path d="m 32.191976,45.447389 v -8.325005 c 0,-3.108648 -1.791355,-5.774506 -4.380244,-7.101208 10.84965,-2.075689 15.932002,-12.070333 9.97475,-19.615738 0.721865,-2.2219983 1.528253,-6.1194237 -0.387801,-9.1864337 -3.694203,0 -6.077955,2.5322387 -7.215642,4.1068753 C 28.238164,4.6869617 26.156969,4.3555684 24.054513,4.3500202 21.950701,4.3518102 19.867297,4.6800481 17.919629,5.3163441 16.779181,3.7409686 14.397338,1.2190043 10.710344,1.2190043 8.5114881,4.7386932 9.8707833,8.5238184 10.599086,10.068497 4.2222611,17.60129 9.2224733,27.910331 20.281396,30.03071 c -2.125735,1.095607 -3.717776,3.083685 -4.205417,5.495967 h -2.139263 c -2.110856,0 -2.931037,-0.857714 -4.0719097,-2.304555 -1.126224,-1.446841 -2.3372052,-2.419064 -3.7921837,-2.822683 -0.7844514,-0.083 -1.3129292,0.513678 -0.6293823,1.042612 2.3094121,1.572159 2.4688055,4.145276 3.39485,5.829732 0.84304,1.516823 2.5702927,2.883077 4.5232847,2.883077 h 2.555672 v 5.292529 c 4.253115,1.629422 12.41748,1.9209 16.274927,0 z"/>
  </svg>
);

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