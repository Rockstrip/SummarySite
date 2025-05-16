import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { projects } from './projects.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Project.css';

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjectImages = useCallback(async (projectTitle) => {
    setLoading(true);
    try {
      // Load logo first
      const images = [];
      try {
        const logoModule = await import(`../assets/portfolio/${projectTitle}/logo.jpg`);
        images.push(logoModule.default);
      } catch (error) {
        console.warn(`No logo found for ${projectTitle}`);
      }

      // Keep trying to load numbered images until one fails
      let imageIndex = 1;
      while (true) {
        try {
          const imageModule = await import(`../assets/portfolio/${projectTitle}/${imageIndex}.jpg`);
          images.push(imageModule.default);
          imageIndex++;
        } catch (error) {
          // Stop when we can't load the next image
          break;
        }
      }

      setImages(images.length > 0 
        ? images 
        : ["https://placehold.co/1200x600/EEE/31343C?font=lora&text=No+Image"]);
    } catch (error) {
      console.warn(`Error loading images for ${projectTitle}:`, error);
      setImages(["https://placehold.co/1200x600/EEE/31343C?font=lora&text=No+Image"]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const foundProject = projects.find(
      p => p.title === decodeURIComponent(projectId)
    );

    if (!foundProject) {
      navigate('/portfolio');
      return;
    }

    setProject(foundProject);
    loadProjectImages(foundProject.title);
  }, [projectId, navigate, loadProjectImages]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  if (!project || loading) {
    return (
      <main className="project-page loading">
        <div className="loader"></div>
      </main>
    );
  }

  return (
    <main className="project-page">
      <div className="project-header">
        <h1>{project.title}</h1>
        <p className="project-date">Release Date: {project.releaseDate}</p>
      </div>

      <div className="project-layout">
        <div className="project-main-content">
          <div className="project-carousel-container">
            <Slider {...sliderSettings}>
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img 
                    src={image} 
                    alt={`${project.title} - ${index === 0 ? 'Logo' : `Screenshot ${index}`}`}
                    className="project-carousel-image"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="project-description">
            <h2>About This Project</h2>
            <p>{project.detailedDescription || project.shortDescription}</p>
          </div>
        </div>

        <div className="project-sidebar">
          {project.links && project.links.length > 0 && (
            <div className="info-section">
              <h2>Links</h2>
              <div className="project-links">
                {project.links.map(link => (
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
              </div>
            </div>
          )}

          <div className="info-section">
            <h2>Technologies</h2>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {(project.developer || project.publisher) && (
            <div className="info-section">
              <h2>Credits</h2>
              <div className="credits-list">
                {project.developer && (
                  <div className="credits-item">
                    <strong>Developer</strong>
                    <span>{project.developer}</span>
                  </div>
                )}
                {project.publisher && (
                  <div className="credits-item">
                    <strong>Publisher</strong>
                    <span>{project.publisher}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Project; 