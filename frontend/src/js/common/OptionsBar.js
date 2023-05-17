import { NavLink } from "react-router-dom";
import "./OptionsBar.css";

const OptionsBar = ({ options = [] }) => {
  return (
    <div className="options-bar">
      {options.map((option, index) => {
        return (
          <div className={"option"} key={index}>
            <NavLink to={option.link} key={index} className={option.active ? "active-option" : ""}>
              {option.title}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default OptionsBar;
