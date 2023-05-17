import "./Switch.css";

const Switch = ({ value, label, onChange }) => {
  return (
    <div className="switch-container">
      <p>{label}</p>
      <label className="switch">
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Switch;
