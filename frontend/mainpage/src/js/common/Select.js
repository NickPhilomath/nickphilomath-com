const Select = ({ name, label, value, onChange, selections, isObject = false, error }) => {
  let data = [];

  if (isObject) {
    Object.keys(selections).forEach((s) => {
      data.push([s, selections[s]]);
    });
  } else {
    data = selections;
  }

  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {data.map((d) => {
          return <option value={d[0]}>{d[1]}</option>;
        })}
      </select>
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Select;
