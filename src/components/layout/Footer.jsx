import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">About Me</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Me</h3>
          <p>Email: <a href="mailto:artes5kgc@gmail.com">artes5kgc@gmail.com</a></p>
          <p>Phone: <a href="tel:+17819647620">+1 (781) 964-7620</a></p>
          <div className="social-links">
            <a href="https://linkedin.com/in/arturkashuba" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/arturkashuba" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.upwork.com/freelancers/arturk98" target="_blank" rel="noopener noreferrer">Upwork</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Artur Kashuba. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 