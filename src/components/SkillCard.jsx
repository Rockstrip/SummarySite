import './SkillCard.css';

const SkillCard = ({ icon, title, description }) => {
  return (
    <div className="skill-card">
      <img src={icon} alt={`${title} Icon`} className="skill-icon" />
      <div className="skill-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SkillCard; 