import { useSelector, useDispatch } from "react-redux";
import { setMember } from "../reducer/member";
import http from "../api/commonHttp";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function KakaoResPage() {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  useEffect(() => {
    http
      .get("auth/oauth2/kakao", {
        params: {
          code: code,
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(setMember(res));
        navi("/");
      })
      .catch((err) => {
        console.log(err);
        navi("/login");
      });
    console.log(code);
  }, []);
  return <div>asd</div>;
}
