import { Fragment, useEffect, useState } from "react";
import http from "../../api/commonHttp.js";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetail from "./ProfileDetail.jsx";
import DesertionDetail from "../Desertion/DesertionDetail.jsx";
import { setProfileNo } from "reducer/detailInfo.js";
import { useNavigate } from "react-router";

export default function ProfileTab() {
  const [profiles, setProfiles] = useState([]);
  const [whichComponent, setWhichComponent] = useState(<ProfileDetail />);
  const { profileNo, desertionNo } = useSelector((state) => state.detailInfo);
  const [curProfileNo, setCurProfileNo] = useState(0);

  const general = useSelector((state) => state.member);
  const dispatch = useDispatch();

  useEffect(() => {
    setWhichComponent(<DesertionDetail category={1} />);
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
        if (input.length === 0 || input === null) {
          navigate("/missing/write");
          return;
        }
        setProfiles(input);
        setCurProfileNo(input[0].profileNo);
        dispatch(setProfileNo(input[0].profileNo));
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <div className="profile-tab-container">
        <div className="button-area">
          {profiles.map((data) => (
            <Fragment key={data.profileNo}>
              <button
                onClick={() => {
                  dispatch(setProfileNo(data.profileNo));
                  setCurProfileNo(data.profileNo);
                  setWhichComponent(<ProfileDetail />);
                }}
                style={
                  curProfileNo === data.profileNo
                    ? { color: "#3994f0" }
                    : { color: "#7d848a" }
                }
              >
                {data.profileName}
              </button>
              {data !== profiles[profiles.length - 1] && (
                <span className="divider">|</span>
              )}
            </Fragment>
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
          height: 55px;
          padding-bottom: 8px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        button {
          padding: 0px 10px;
          background-color: white;
          border: 0;
          font-weight: 600;
          cursor: pointer;
        }
        .divider {
          color: #7d848a;
          padding: 0 5px;
        }
      `}</style>
    </>
  );
}
