import React from 'react';
import './ProjectLink.css';

const ProjectLink = ({ icon, label, ...props }) => (
  <span className="project-link-tag" {...props}>
    <span className="project-link-icon">{icon}</span>
    <span className="project-link-label">{label}</span>
  </span>
);

export default ProjectLink; 