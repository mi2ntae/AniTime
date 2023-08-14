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
      console.log(newdata);
      newdata.map((cur) => {
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
    if (count === 0) return "#FFFFFF";
    if (count > 8000) return "#3994F0";
    if (count > 4000) return "#80BFFF";
    if (count > 2000) return "#C1E0FF";
    if (count > 400) return "#E9F4FF";
    else return "#E9F4FF";
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
