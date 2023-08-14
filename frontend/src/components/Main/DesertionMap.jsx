import { SimpleSouthKoreaMapChart } from "components/Map/SimpleSouthKoreaMapChart";
import { useEffect, useState } from "react";
import http from "api/commonHttp";

export default function DesertionMap() {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (data.length == 0) fetchData();
  }, [data]);

  const processName = (name) => (name === "강원특별자치도" ? "강원도" : name);

  const fetchData = async () => {
    try {
      let response = await http.get(`count`);
      let newdata = await response.data;
      newdata.reduce((acc, cur) => {
        // console.log(cur);
        setData((p) => [
          ...p,
          { locale: processName(cur.mapName), count: cur.entryNumber },
        ]);
      });
      // console.log(data);
    } catch (error) {
      // console.log("에러메시지: ", error);
    }
  };
  const setColorByCount = (count) => {
    if (count === 0) return "#000000";
    if (count > 8000) return "#3994F0";
    if (count > 4000) return "#80BFFF";
    if (count > 2000) return "#C1E0FF";
    if (count > 400) return "#E9F4FF";
    if (count > 100) return "#A9DFD6";
    if (count > 50) return "#C1E5DF";
    if (count > 5) return "#D9EBE8";
    else return "#000000";
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "32px",
        background: "white",
        height: "100%",
      }}
    >
      <SimpleSouthKoreaMapChart setColorByCount={setColorByCount} data={data} />
    </div>
  );
}
