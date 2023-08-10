import { useEffect, useState } from "react";
import http from "../../api/commonHttp.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetail from "./ProfileDetail.jsx";
import DesertionDetail from "../Desertion/DesertionDetail.jsx";
import { setProfileNo } from "reducer/detailInfo.js";
import { useNavigate } from "react-router";

export default function ProfileTab() {
  const [profiles, setProfiles] = useState([]);
  const [whichComponent, setWhichComponent] = useState(<ProfileDetail />);
  // const profileNo = useSelector((state) => state.detailInfo.profileNo);
  // const detailNo = useSelector((state) => state.detailInfo.detailNo);
  const { profileNo, desertionNo } = useSelector((state) => state.detailInfo);

  const general = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // const generalNo = 2;

  useEffect(() => {
    setWhichComponent(<DesertionDetail />);
  }, [desertionNo]);

  useEffect(() => {
    setWhichComponent(<ProfileDetail />);
  }, [profileNo]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!general.token) {
      alert("실종 동물 찾기는 회원 가입 후에 이용하실 수 있습니다.");
      window.history.go(-1);
      return;
    }
    http
      .get(`profile/${general.memberNo}`)
      .then((data) => {
        const input = data.data;
        setProfiles(input);
        if (input.length === 0 || input === null) {
          navigate("/missing/write");
        }
        dispatch(setProfileNo(input[0].profileNo));
      })
      .catch((error) => {
        console.log(error);
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
          margin-bottom: 8px;
        }
        button {
          background-color: white;
          border: 0;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
