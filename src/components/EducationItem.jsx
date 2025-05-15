import './EducationItem.css';

const EducationItem = ({ degree, institution, period }) => {
  return (
    <div className="education">
      <h3>{degree}</h3>
      <p>{institution}</p>
      <p>{period}</p>
    </div>
  );
};

export default EducationItem; 