import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import { projects } from './projects.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Project.css';
import ProjectLink from '../components/ProjectLink';
import AppleIcon from '../assets/Icons/Links/apple.svg?react';
import AndroidIcon from '../assets/Icons/Links/android.svg?react';
import WebsiteIcon from '../assets/Icons/Links/website.svg?react';
import GithubIcon from '../assets/Icons/Links/github.svg?react';

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSlider = useRef(null);
  const thumbnailSlider = useRef(null);

  const loadProjectImages = useCallback(async (projectTitle) => {
    setLoading(true);
    try {
      const media = [];
      const extensions = ['jpg', 'png', 'webp', 'gif', 'mp4'];
      
      // Load logo first
      for (const ext of extensions) {
      try {
        const logoModule = await import(`../assets/Portfolio/${projectTitle}/logo.${ext}`);
        media.push({ type: 'image', src: logoModule.default });
      } catch (error) {
        console.warn(`No logo found for ${projectTitle}`);
      }
    }

      // Keep trying to load numbered media until one fails
      let mediaIndex = 1;
      while (true) {
        let mediaLoaded = false;
        
        // Try each extension
        for (const ext of extensions) {
          try {
            const mediaModule = await import(`../assets/Portfolio/${projectTitle}/${mediaIndex}.${ext}`);
            media.push({ 
              type: ext === 'mp4' ? 'video' : 'image',
              src: mediaModule.default 
            });
            mediaLoaded = true;
            break;
          } catch (error) {
            continue;
          }
        }
        
        if (!mediaLoaded) break;
        mediaIndex++;
      }

      setImages(media.length > 0 
        ? media 
        : [{ type: 'image', src: "https://placehold.co/1200x600/EEE/31343C?font=lora&text=No+Image" }]);
    } catch (error) {
      console.warn(`Error loading media for ${projectTitle}:`, error);
      setImages([{ type: 'image', src: "https://placehold.co/1200x600/EEE/31343C?font=lora&text=No+Image" }]);
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

  const mainSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next)
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: false,
    arrows: false,
    variableWidth: true,
    draggable: true,
    useCSS: true,
    useTransform: false,
    beforeChange: (current, next) => {
      if (mainSlider.current) {
        mainSlider.current.slickGoTo(next);
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
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
      {/* Top Section */}
      <div className="project-header">
        <h2 className="project-title">{project.title}</h2>
      </div>

      {/* Main Content Area */}
      <div className="project-content">
        {/* Banner and Sidebar Layout */}
        <div className="project-main-section">
          {/* Left: Banner/Carousel Section */}
          <div className="project-banner">
            <div className="project-carousel-container">
              <Slider ref={mainSlider} {...mainSettings}>
                {images.slice(1).map((media, index) => (
                  <div key={index} className="carousel-slide">
                    {media.type === 'video' ? (
                      <video 
                        src={media.src}
                        className="project-carousel-image"
                        controls
                        playsInline
                      />
                    ) : (
                      <img 
                        src={media.src} 
                        alt={`${project.title} - Media ${index + 1}`}
                        className="project-carousel-image"
                      />
                    )}
                  </div>
                ))}
              </Slider>
              {/* Overlay Notice */}
              {project.notices && (
                <div className="project-notices">
                  {project.notices.map((notice, index) => (
                    <span key={index} className="notice-text">{notice}</span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="carousel-thumbnails">
              <Slider ref={thumbnailSlider} {...thumbnailSettings}>
                {images.slice(1).map((media, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail-slide ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => {
                      if (mainSlider.current) {
                        mainSlider.current.slickGoTo(index);
                      }
                    }}
                  >
                    {media.type === 'video' ? (
                      <video 
                        src={media.src}
                        className="thumbnail-image"
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={media.src} 
                        alt={`Thumbnail ${index + 1}`}
                        className="thumbnail-image"
                      />
                    )}
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right: Game Info Sidebar */}
          <div className="project-sidebar">
            <div className="game-box-art">
              <img 
                src={images[0].src} 
                alt={`${project.title} logo`}
                className="project-logo"
              />
            </div>

            <div className="game-brief">
              <p>{project.shortDescription}</p>
            </div>

            <div className="game-metadata">
              <div className="metadata-item">
                <strong>Release Date:</strong>
                <span>{project.releaseDate}</span>
              </div>
              
              {project.publisher && (
                <div className="metadata-item">
                  <strong>Publisher:</strong>
                  <span>{project.publisher}</span>
                </div>
              )}
            </div>

            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="project-details-section">
          {/* Left: My Role */}
          <div className="project-description">
            <h2>My Role</h2>
            <div className="description-content">
              <p>{project.myRole}</p>
            </div>
          </div>

          {/* Right: Project Links */}
          {project.links && project.links.length > 0 && (
            <div className="platform-links">
              <h2>Project Links</h2>
              <div className="links-grid">
                {project.links.map(link => {
                  let Icon = WebsiteIcon;
                  if (link.url.includes('apps.apple.com')) {
                    Icon = AppleIcon;
                  } else if (link.url.includes('play.google.com')) {
                    Icon = AndroidIcon;
                  } else if (link.url.includes('github.com')) {
                    Icon = GithubIcon;
                  }
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="platform-link"
                      style={{ padding: 0, background: 'none', border: 'none', boxShadow: 'none' }}
                    >
                      <ProjectLink icon={<Icon />} label={link.name} />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Project Detailed Description Block */}
        <div className="project-detailed-description-block">
          <h2>Project Detailed Description</h2>
          <div className="description-content">
            <p>{project.detailedDescription || project.shortDescription}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Project; 