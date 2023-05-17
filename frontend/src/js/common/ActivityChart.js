import { fixDate, getChoice } from "../functions/Functions";
import "./ActivityChart.css";

const ActivityChart = ({ data }) => {
  // const data = {
  //   from: "2023-02-13T00:00:00.000000-05:00",
  //   to: "2023-02-14T00:00:00.000000-05:00",
  //   charts: [
  //     {
  //       time: "2023-02-13T04:00:00.824602-05:00",
  //       status: "ready",
  //     },
  //     {
  //       time: "2023-02-13T12:00:00.824602-05:00",
  //       status: "enroute",
  //     },
  //   ],
  //   colors: {
  //     enroute: "blue",
  //     ready: "red",
  //   },
  // };
  const convert = (index, t1, t2) => {
    var from = new Date(data.from).getTime();
    var to = new Date(data.to).getTime();
    var t1 = index ? new Date(t1).getTime() : from;
    var t2 = t2 === -1 ? to : new Date(t2).getTime();
    var scale = to - from;
    return {
      left: `${((t1 - from) / scale) * 100}%`,
      width: `${((t2 - t1) / scale) * 100}%`,
    };
  };
  return (
    <div className="activity-chart">
      <div className="chart">
        <span className="time-start">{fixDate(data.from)}</span>
        <span className="time-end">{fixDate(data.to)}</span>
        {data.charts.map((e, index) => {
          var evars = convert(index, e.time, index === data.charts.length - 1 ? -1 : data.charts[index + 1].time);
          return (
            <span
              key={index}
              className="chart-element"
              style={{
                background: data.colors[e.status],
                left: evars.left,
                width: evars.width,
              }}
            ></span>
          );
        })}
      </div>
      <div className="chart-map">
        {Object.keys(data.colors).map((s) => {
          return (
            <div className="color">
              <span className="box" style={{ background: data.colors[s] }}></span>
              {data.colorChoices ? getChoice(s, data.colorChoices) : s}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityChart;
