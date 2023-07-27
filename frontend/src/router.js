import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./components/Main/Main";
import Desertion from "./pages/DesertionPage";
import Missing from "./pages/MissingPage";
import MyPage from "pages/MyPage";
import MyPageMeeting from "pages/mypagetab/MyPageMeeting";
import MyPageChatting from "pages/mypagetab/MyPageChatting";
import MyPageWatchlist from "pages/mypagetab/MyPageWatchlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "desertion",
        element: <Desertion />,
      },
      {
        path: "missing",
        element: <Missing />,
      },
      {
        path: "mypage",
        element: <MyPage />,
        children: [
          {
            path: "meeting",
            element: <MyPageMeeting />,
          },
          {
            path: "chatting",
            element: <MyPageChatting />,
          },
          {
            path: "watchlist",
            element: <MyPageWatchlist />,
          },
        ],
      },
      {
        path: "path",
        async lazy() {
          return {
            Component: (await import("./components/RouterTest")).default,
          };
        },
      },
      {
        path: "path", // 경로
        async lazy() {
          return {
            // 컴포넌트 import
            Component: (await import("./components/RouterTest")).default,
          };
        },
      },
    ],
  },
]);

export default router;
