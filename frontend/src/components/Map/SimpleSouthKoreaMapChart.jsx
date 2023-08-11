import React from "react";
import { useEffect, useState } from "react";
import { SouthKoreaSvgMap } from "./SouthKoreaSvgMap";

// type MapDataType = { [location: string]: number };

const DefaultTooltip = ({ darkMode, tooltipStyle, children }) => {
  return (
    <div
      style={{
        borderRadius: "10px",
        color: darkMode ? "#f5f5f5" : "#41444a",
        position: "fixed",
        minWidth: "80px",
        padding: "10px",
        border: `1px solid ${darkMode ? "#41444a" : "#f5f5f5"}`,
        backgroundColor: darkMode ? "#41444a" : "#fff",
        ...tooltipStyle,
      }}
    >
      {children}
    </div>
  );
};

export const SimpleSouthKoreaMapChart = ({
  darkMode = false,
  data,
  unit = "마리",
  setColorByCount,
  customTooltip,
}) => {
  const [mapData, setMapData] = useState({});
  const [tooltipMsg, setTooltipMsg] = useState("");
  const [tooltipStyle, setTooltipStyle] = useState();

  useEffect(() => {
    const items = data.reduce((acc, item) => {
      return {
        ...acc,
        [item.locale]: item.count,
      };
    }, {});

    setMapData(items);
  }, [data]);

  const handleLocationMouseOver = (event) => {
    const location = event.target.attributes.name.value;
    const count = mapData[location] ? mapData[location] : 0;
    setTooltipMsg(`${location}: ${count}${unit}`);
  };

  const handleLocationMouseOut = () => {
    setTooltipStyle({ display: "none" });
  };

  const handleLocationMouseMove = (event) => {
    const tooltipStyle = {
      display: "block",
      top: event.clientY - 50,
      left: event.clientX - 60,
    };
    setTooltipStyle(tooltipStyle);
  };

  return (
    <>
      <SouthKoreaSvgMap
        data={mapData}
        setColorByCount={setColorByCount}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        onLocationMouseMove={handleLocationMouseMove}
      />
      {customTooltip ? (
        React.cloneElement(customTooltip, {
          darkMode,
          tooltipStyle,
          children: tooltipMsg,
        })
      ) : (
        <DefaultTooltip darkMode={darkMode} tooltipStyle={tooltipStyle}>
          {tooltipMsg}
        </DefaultTooltip>
      )}
    </>
  );
};
