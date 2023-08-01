import { useEffect, useState } from "react";
import http from "../../api/commonHttp.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetail from "./ProfileDetail.jsx";
import DesertionDetail from "../Desertion/DesertionDetail.jsx";
import { setProfileNo } from "reducer/detailInfo.js";

export default function ProfileTab() {
  let [profiles, setProfiles] = useState([]);
  let [whichComponent, setWhichComponent] = useState(<ProfileDetail />);
  let detail = useSelector((state) => state.detailInfo);
  let general = useSelector((state) => state.member);
  let dispatch = useDispatch();

  // const generalNo = 2;

  useEffect(() => {
    if (detail.desertionNo) {
      setWhichComponent(<DesertionDetail />);
    } else if (detail.profileNo) {
      setWhichComponent(<ProfileDetail />);
    }
  }, [detail]);

  useEffect(() => {
    http
      .get(`profile/${general.memberNo}`)
      .then((data) => {
        console.log(data);
        const input = data.data;
        setProfiles(input);
        dispatch(setProfileNo(input[0].profileNo));
        // http
        //   .get(`profile/detail/${input[0].profileNo}`)
        //   .then((res) => {
        //     setProfile(res.data);
        //   })
        //   .catch(console.log("프로필 세부정보 조회 실패"));
      })
      .catch(() => {
        console.log("프로필 목록 가져오기 실패");
      });
  }, []);

  return (
    <div>
      {profiles.map((data) => (
        <button
          onClick={() => {
            dispatch(setProfileNo(data.profileNo));
          }}
        >
          {data.profileName}
        </button>
      ))}
      {whichComponent}
    </div>
  );
}
