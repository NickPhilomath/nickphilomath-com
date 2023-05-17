import "./Input.css";

const Input = ({ name, label, value, onChange, type, error }) => {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} className={error ? "red-border" : ""} />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;
