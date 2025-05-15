import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/"><button className="active"><h1>About Me</h1></button></Link>
        <Link to="/portfolio"><button><h1>Portfolio</h1></button></Link>
        <Link to="/contact"><button><h1>Contact</h1></button></Link>
      </nav>
    </header>
  );
};

export default Navbar; 