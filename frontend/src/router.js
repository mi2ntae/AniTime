import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MyPageMeeting from "pages/mypagetab/MyPageMeeting";
import MyPageChatting from "pages/mypagetab/MyPageChatting";
import MyPageWatchlist from "pages/mypagetab/MyPageWatchlist";
import MyPage from "pages/MyPage";
import ErrorPage from "pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        async lazy() {
          return {
            Component: (await import("pages/LoginPage")).default,
          };
        },
      },
      {
        path: "",
        async lazy() {
          return {
            Component: (await import("pages/HomePage")).default,
          };
        },
        children: [
          {
            path: "",
            async lazy() {
              return {
                Component: (await import("pages/MainPage")).default,
              };
            },
          },
          {
            path: "desertion",
            async lazy() {
              return {
                Component: (await import("pages/DesertionPage")).default,
              };
            },
          },
          {
            path: "desertion/reservation",
            async lazy() {
              return {
                Component: (
                  await import("components/Desertion/DesertionReservation")
                ).default,
              };
            },
          },
          {
            path: "missing",
            async lazy() {
              return {
                Component: (await import("pages/MissingPage")).default,
              };
            },
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
            path: "path", // 경로
            async lazy() {
              return {
                // 컴포넌트 import
                Component: (await import("pages/RouterTestPage")).default,
              };
            },
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
