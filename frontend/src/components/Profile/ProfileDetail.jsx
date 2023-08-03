import { useSelector } from "react-redux";
import "./ProfileDetailCss.css";
import { useEffect, useState } from "react";
import http from "api/commonHttp";

export default function ProfileDetail() {
  let title = {
    name: "이름",
    kind: "품종",
    gender: "성별",
    age: "나이",
    weight: "몸무게",
    specialMark: "성격 및 기타",
    date: "실종일",
    location: "실종위치",
  };
  let [profile, setProfile] = useState([]);
  let profileNo = useSelector((state) => state.detailInfo.profileNo);
  useEffect(() => {
    if (profileNo === 0) return;
    http
      .get(`profile/detail/${profileNo}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch(() => {
        console.log("프로필 세부정보 조회 실패");
      });
  }, [profileNo]);
  return (
    <>
      <div className="profile-container">
        <img src={profile.image} className="profile-image"></img>
        <div className="profile-desc-container">
          <div className="profile-title-area">{profile.name} 정보</div>
          {/* <div className="profile-desc-area">
            <div className="profile-desc-title">
              {title[index]}
            </div>
            <div className="profile-desc-content">
              {profile.[?]}
            </div>
          </div> */}
          {Object.keys(title).map((key, index) => (
            <div className="profile-desc-area" key={index}>
              <div className="profile-desc-title">{title[key]}</div>
              <div className="profile-desc-content">{profile[key]}</div>
            </div>
          ))}
          <div className="profile-btn-container">
            <button className="profile-edit-btn">수정</button>
            <button className="profile-del-btn">삭제</button>
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .profile-container {
          border-radius: 8px;
          border: 1px solid var(--lightgrey, #e8ebee);
          width: 100%;
        }
        .profile-image {
          width: 100%;
          height: 200px;
          border-radius: 8px 8px 0px 0px;
        }
        .profile-desc-container {
          padding: 32px;
        }
        .profile-title-area {
          color: var(--blackgrey, #35383b);
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 130%; /* 15.6px */
          letter-spacing: 0.12px;
        }
        .profile-desc-area {
          display: flex;
          flex-direction: row;
          width: 100%;
          margin: 16px 0 0 0;
        }
        // .profile.desc-element {
        //   display: flex;
        //   margin: 12px 0 0 0;
        // }
        .profile-desc-title {
          width: 100px;
          color: var(--grey-2, #a7aeb4);
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 130%; /* 18.2px */
          letter-spacing: 0.14px;
        }
        .profile-desc-content {
          flex: 1;
          color: var(--blackgrey, #35383b);
          font-family: Inter;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 130%; /* 18.2px */
          letter-spacing: 0.14px;
        }
        .profile-btn-container {
          gap: 8px;
          display: flex;
          margin-top: 36px;
        }
        .profile-edit-btn {
          border-radius: 12px;
          border: 1px solid var(--primary, #3994f0);
          background: var(--white, #fff);

          color: var(--primary, #3994f0);
          text-align: center;
          font-family: Noto Sans KR;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          // line-height: 155%;

          height: 50px;
          flex: 1;
        }
        .profile-del-btn {
          border-radius: 12px;
          border: 1px solid var(--red, #ff7676);
          background: var(--white, #fff);

          color: var(--red, #ff7676);
          text-align: center;
          font-family: Noto Sans KR;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          // line-height: 155%; /* 24.8px */

          height: 50px;
          flex: 1;
        }
      `}</style>
    </>
  );
}
