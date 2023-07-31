import { useEffect, useState } from "react";
import http from "../../api/commonHttp.js";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileTab() {
  let [profile, setProfile] = useState();
  let [profiles, setProfiles] = useState([]);

  const generalNo = 2;

  // useEffect(()=>{
  //     const member = useSelector((state) => {
  //         return state.member;
  //       });
  // })

  // 버튼을 갱신할때마다 state의 profileNo 갱신하고 디스플레이 되는 컴포넌트 바꿈

  useEffect(() => {
    http
      .get(`profile/${generalNo}`)
      .then((data) => {
        console.log(data);
        const input = data.data;
        setProfiles(input);
        http
          .get(`profile/detail/${input[0].profileNo}`)
          .then((res) => {
            setProfile(res.data);
          })
          .catch(console.log("프로필 세부정보 조회 실패"));
      })
      .catch(() => {
        console.log("프로필 목록 가져오기 실패");
      });
  }, []);

  return (
    <div>
      {console.log(profiles)}
      {console.log(profile)}

      {profiles.map((data) => {
        console.log(data.profileName);
        return (
          <button
            onClick={() => {
              http
                .get(`profile/detail/${data.profileNo}`)
                .then((data) => {
                  setProfile(data.data);
                })
                .catch(() => {
                  console.log("프로필 목록 가져오기 실패");
                });
            }}
          >
            {data.profileName}
          </button>
        );
      })}
    </div>
  );
}
