import axios from "axios";
import { useEffect } from "react";
import store from "../store.js"; //

const http = axios.create({
  baseURL: "http://localhost:8000/api/",
  // process.env 파일로 url저장해서 쓰면 더 좋음! (누가 적용 해주셈)
});

// http.defaults.headers.common["Authorization"] =
//   "Bearer " + useSelector((state) => state.member.token);
// http.interceptors.request.use(
//   (config) => {
//     const token = useSelector((state) => {
//       return state.member.token;
//     });
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

const Interceptor = ({ children }) => {
  useEffect(() => {
    http.interceptors.request.use(
      function (config) {
        config.headers.Authorization = `Bearer ${
          store.getState().member.token
        }`;
        return config;
      },
      function (err) {
        return Promise.reject(err);
      }
    );
    http.interceptors.response.use(
      (response) => {
        const res = response.data;
        return res;
      },
      (err) => {
        console.log(err);
        console.log(err.response.data.message);
      }
    );
  }, []);
  return children;
};

// http.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     const res = response.data;
//     return res;
//   },
//   (err) => {
//     console.log(err);
//     console.log(err.response.data.message);
//     // return Promise.reject(err);
//   }
// );

export { Interceptor };
export default http;
