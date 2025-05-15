import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from './projects.js';
import './Portfolio.css';

const Portfolio = () => {

  return (
    <main>
      <h1 className="portfolio-title">My Portfolio</h1>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </main>
  );
};

export default Portfolio; 