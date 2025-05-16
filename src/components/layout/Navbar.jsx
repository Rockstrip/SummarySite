import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header>
      <nav>
        <Link to="/">
          <button className={location.pathname === '/' ? 'active' : ''}>
            <h1>About Me</h1>
          </button>
        </Link>
        <Link to="/portfolio">
          <button className={location.pathname === '/portfolio' ? 'active' : ''}>
            <h1>Portfolio</h1>
          </button>
        </Link>
        <Link to="/contact">
          <button className={location.pathname === '/contact' ? 'active' : ''}>
            <h1>Contact</h1>
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar; 