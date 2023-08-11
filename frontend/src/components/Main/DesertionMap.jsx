import { SimpleSouthKoreaMapChart } from "components/Map/SimpleSouthKoreaMapChart";
import { useEffect, useState } from "react";
import http from "api/commonHttp";

export default function DesertionMap() {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data.length == 0) fetchData();
  }, [data]);
  const fetchData = async () => {
    try {
      let response = await http.get(`count`);
      let newdata = await response.data;
      newdata.reduce((acc, cur) => {
        console.log(cur);
        setData((p) => [...p, { locale: cur.mapName, count: cur.entryNumber }]);
      });
      console.log(data);
    } catch (error) {
      console.log("에러메시지: ", error);
    }
  };
  const setColorByCount = (count) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#79D3C4";
    if (count > 3000) return "#43cdb6";
    if (count > 1000) return "#61CDBB";
    if (count > 200) return "#91D9CD";
    if (count > 100) return "#A9DFD6";
    if (count > 50) return "#C1E5DF";
    if (count > 5) return "#D9EBE8";
    else return "#ebfffd";
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        background: "white",
      }}
    >
      <SimpleSouthKoreaMapChart setColorByCount={setColorByCount} data={data} />
    </div>
  );
}
