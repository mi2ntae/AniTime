import http from "api/commonHttp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DesertionDetail() {
  let [animal, setAnimal] = useState([]);
  let desertionNo = useSelector((state) => state.detailInfo.desertionNo);
  useEffect(() => {
    http
      .get(`desertion/${desertionNo}`)
      .then((res) => {
        setAnimal(res.data);
      })
      .catch(() => {
        console.log("프로필 세부정보 조회 실패");
      });
  }, [desertionNo]);

  return (
    <div>
      <img src={animal.image2} />
      <div>대상동물 정보</div>
      <div>
        <div>
          <div>종류</div>
        </div>
      </div>
    </div>
  );
}
