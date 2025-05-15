import { Link } from 'react-router-dom';
import './TimelineItem.css';

const TimelineItem = ({ company, period, title, achievements, projects }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-marker"></div>
      <div className="timeline-content">
        <div className="timeline-left">
          <h3>{company}</h3>
          <p>{period}</p>
        </div>
        <div className="timeline-right">
          <h3>{title}</h3>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
            {projects && projects.length > 0 && (
              <li>
                Delivered: {projects.map((project, index) => (
                  <span key={project.name}>
                    {index > 0 && ', '}
                    <Link to={project.link.replace('project.html?name=', '/project/')}>
                      {project.name}
                    </Link>
                  </span>
                ))}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem; 