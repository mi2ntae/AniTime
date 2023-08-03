import { useEffect, useState } from "react";
import http from "../../api/commonHttp.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetail from "./ProfileDetail.jsx";
import DesertionDetail from "../Desertion/DesertionDetail.jsx";
import { setProfileNo } from "reducer/detailInfo.js";
import { useNavigate } from "react-router";

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
  
  const navigate = useNavigate();
  useEffect(() => {
    
    http
      .get(`profile/${general.memberNo}`)
      .then((data) => {
        console.log(data);
        const input = data.data;
        setProfiles(input);
        dispatch(setProfileNo(input[0].profileNo));
        
        if (input.size.length === 0 || input === null) {
          navigate('/missing/regist');
        };
      })
      .catch(() => {
        console.log("프로필 목록 가져오기 실패");
      });
  }, []);

  return (
    <>
      <div className="profile-tab-container">
        <div className="button-area">
          {profiles.map((data) => (
            <button
              key={data.profileNo}
              onClick={() => {
                dispatch(setProfileNo(data.profileNo));
              }}
            >
              {data.profileName}
            </button>
          ))}
        </div>
        {whichComponent}
      </div>
      <style jsx="true">{`
        .profile-tab-container {
          width: 100%;
        }
        .button-area {
          width: 100%;
        }
      `}</style>
    </>
  );
}
