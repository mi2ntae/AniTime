import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import http from "api/commonHttp";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function ProfileDetail() {
  const [modal, setModal] = useState(false);
  let title = {
    name: "이름",
    kind: "품종",
    gender: "성별",
    birth: "출생연도",
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

  const handleDelClick = () => {
    setModal(false);
    http
      .delete(`profile/${profileNo}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {modal && <div className="overlay" />}
      <div className="profile-container">
        <div
          className="profile-image"
          style={{
            background: profile.image
              ? `url(${profile.image}) no-repeat center/cover`
              : `url("/no_image.png") no-repeat center/cover`,
          }}
        />
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
            <Link to="/missing/update" style={{ flex: "1" }}>
              <Button className="profile-edit-btn">수정</Button>
            </Link>
            <Button className="profile-del-btn" onClick={() => setModal(true)}>
              삭제
            </Button>
          </div>
        </div>
        {modal && <Modal setModal={setModal} handleDelClick={handleDelClick} />}
      </div>
      <style jsx="true">{`
        .profile-container {
          border-radius: 8px;
          border: 1px solid var(--lightgrey, #e8ebee);
          width: 100%;
        }
        .profile-image {
          width: 100%;
          height: 240px;
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
          // flex: 1;
          width: 100%;
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

          &:hover {
            background-color: #fff9f9; /* 호버 시 배경색 변경 */
          }
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.28);
          pointer-events: none; /* 클릭 이벤트를 무시하도록 설정 */
          z-index: 998;
        }
      `}</style>
    </>
  );
}

function Modal({ setModal, handleDelClick }) {
  return (
    <>
      <div className="modal-container">
        <img src="icons/img_delete.svg" alt="Error" />
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--gray-scale-dark-gray-2, #1A1A1A)",
            marginTop: "24px",
            marginBottom: "8px",
          }}
        >
          정말 삭제하시겠어요?
        </div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "400",
            textAlign: "center",
            color: "var(--gray-scale-gray-3, #6F6F6F)",
          }}
        >
          삭제한 내 동물은 복구가 불가능해요!
          <br />
          신중하게 검토한 후 삭제해 주세요.
        </div>
        <div style={{ display: "flex", width: "100%", marginTop: "56px" }}>
          <button
            style={{
              color: "var(--gray-scale-gray-1, #C1C1C1)",
              fontSize: "18px",
              fontWeight: "500",
              border: "0",
              flex: "1",
              height: "48px",
              backgroundColor: "white",
            }}
            onClick={() => setModal()}
          >
            취소
          </button>
          <button
            style={{
              color: "var(--red, #FF7676)",
              fontSize: "18px",
              fontWeight: "500",
              border: "0",
              flex: "1",
              backgroundColor: "white",
            }}
            onClick={() => handleDelClick()}
          >
            삭제
          </button>
        </div>
      </div>
      <style jsx="true">{`
        .modal-container {
          background-color: white;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 240px;
          height: 320px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;
          padding: 64px 56px 40px 56px;
          z-index: 999;
        }
      `}</style>
    </>
  );
}
