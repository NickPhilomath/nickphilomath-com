const Checkbox = ({ name, label, checked, onChange, error }) => {
  return (
    <div className="input checkbox">
      <div className="row">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} onChange={onChange} type="checkbox" checked={checked} />
      </div>
      {error && <div className="err-input">{error}</div>}
    </div>
  );
};

export default Checkbox;
