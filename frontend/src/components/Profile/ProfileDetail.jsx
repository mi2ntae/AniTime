import { useSelector } from "react-redux";
import "./ProfileDetailCss.css";
import { useEffect, useState } from "react";
import http from "api/commonHttp";

export default function ProfileDetail() {
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
    <div className="component-parent">
      <h1>{profile.profileNo}</h1>
      <div className="rectangle-parent">
        <div className="component-child" />
        <div className="component-item" />
        <div className="component-inner" />
        <b className="b7">수정</b>
        <b className="b8">삭제</b>
        <div className="div75">{profile.profileName}</div>
        <div className="div76">이름</div>
        <b className="b9">대상동물 정보</b>
        <div className="div77">
          {profile.profileKind} / {profile.detailKind}
        </div>
        <div className="div78">종류</div>
        <div className="kg1">{profile.sexCode}</div>
        <div className="div79">성별</div>
        <div className="div80">{profile.profileAge}</div>
        <div className="div81">만 나이</div>
        <div className="x4">{profile.kg}?</div>
        <div className="div82">몸무게</div>
        <div className="x5">{profile.specialMark}</div>
        <div className="x6">{profile.dateAt}</div>
        <div className="x7">{profile.profileLocation}</div>
        <div className="div83">성격</div>
        <div className="div84">실종일</div>
        <div className="div85">실종위치</div>
        <img className="component-child2" alt="" src={profile.image} />
      </div>
    </div>
  );
}
