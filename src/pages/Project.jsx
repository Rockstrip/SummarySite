import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
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
import videoIcon from '../assets/Icons/video.svg?react';
import { trackEvent } from '../mixpanel';
import { getAllMedia } from '../utils/mediaLoader.js';
// ... імпорти залишаються без змін

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSlider = useRef(null);
  const thumbnailSlider = useRef(null);

  const mainSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    beforeChange: (_, next) => setCurrentSlide(next)
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
    beforeChange: (_, next) => {
      mainSlider.current?.slickGoTo(next);
    },
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 6 }},
      { breakpoint: 992, settings: { slidesToShow: 4 }},
      { breakpoint: 768, settings: { slidesToShow: 3 }},
    ]
  };

  useEffect(() => {
    const foundProject = projects.find(
      p => p.title === decodeURIComponent(projectId)
    );

    if (!foundProject) {
      navigate('/portfolio');
      return;
    }

    setProject(foundProject);
  }, [projectId, navigate]);

  useEffect(() => {
    if (!project) return;

    trackEvent(`Project ${project.title} viewed`);

    const loadImages = async () => {
      setLoading(true);
      try {
        const media = await getAllMedia(project.title);
        setImages(media);
      } catch (err) {
        console.error('Error loading project media:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [project]);

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
        <h2 className="project-title">{project.title}</h2>
      </div>

      <div className="project-content">
        <div className="project-main-section">
          <div className="project-banner">
            <div className="project-carousel-container">
              <Slider ref={mainSlider} {...mainSettings}>
                {images.slice(1).map((media, index) => (
                  <div key={index} className="carousel-slide">
                    {media.type === 'video' ? (
                      <iframe
                        src={media.src}
                        width="656"
                        height="357"
                        allowFullScreen
                        title={`Video ${index + 1}`}
                        className="project-video"
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

              {project.notices?.length > 0 && (
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
                    onClick={() => mainSlider.current?.slickGoTo(index)}
                    style={{ position: 'relative' }}
                  >
                    <img
                      src={
                        media.type === 'video'
                          ? `https://drive.google.com/thumbnail?id=${media.id}&sz=w1000`
                          : media.src
                      }
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="project-sidebar">
            {images[0]?.src && (
              <div className="game-box-art">
                <img
                  src={images[0].src}
                  alt={`${project.title} logo`}
                  className="project-logo"
                />
              </div>
            )}

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
              {project.tags?.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="project-details-section">
          <div className="project-description">
            <h2>My Role</h2>
            <div className="description-content">
              <p>{project.myRole}</p>
            </div>
          </div>

          {project.links?.length > 0 && (
            <div className="platform-links">
              <h2>Project Links</h2>
              <div className="links-grid">
                {project.links.map(link => {
                  let Icon = WebsiteIcon;
                  if (link.url.includes('apps.apple.com')) Icon = AppleIcon;
                  else if (link.url.includes('play.google.com')) Icon = AndroidIcon;
                  else if (link.url.includes('github.com')) Icon = GithubIcon;

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
