import { createBrowserRouter } from "react-router-dom";
import MyPageMeeting from "pages/mypagetab/MyPageMeeting";
import MyPageChatting from "pages/mypagetab/MyPageChatting";
import MyPageWatchlist from "pages/mypagetab/MyPageWatchlist";
import MyPage from "pages/MyPage";
import SelectTime from "components/SelectTime/SelectTime";
import ReservationForm from "components/SelectTime/ReservationForm";
import DesertionGuide from "components/Desertion/DesertionGuide";
import ErrorPage from "pages/ErrorPage";

const router = createBrowserRouter([
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
        Component: (await import("App")).default,
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
        children: [
          { path: "selecttime", element: <SelectTime /> },
          { path: "form", element: <ReservationForm /> },
          { path: "", element: <DesertionGuide /> },
        ],
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
    errorElement: <ErrorPage />,
  },
]);

export default router;
