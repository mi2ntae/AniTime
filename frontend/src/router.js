import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import ProfileReservation from "components/Profile/ProfileReservation";

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
    path: "/join",
    async lazy() {
      return {
        Component: (await import("pages/JoinPage")).default,
      };
    },
  },
  {
    path: "/kakaoLogin",
    async lazy() {
      return {
        Component: (await import("pages/KakaoResPage")).default,
      };
    },
  },
  {
    path: "/donation/success",
    async lazy() {
      return {
        Component: (await import("pages/DonationSuccessPage")).default,
      };
    },
  },
  {
    path: "/donation/fail",
    async lazy() {
      return {
        Component: (await import("pages/DonationFailPage")).default,
      };
    },
  },
  {
    path: "meeting/:meetingNo",
    async lazy() {
      return {
        Component: (await import("pages/MeetingPage")).default,
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
        path: "faq",
        async lazy() {
          return {
            Component: (await import("components/FAQ/FAQ")).default,
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
        path: "desertion/reservation/:shelterNo/:desertionNo",
        children: [
          {
            path: "",
            async lazy() {
              return {
                Component: (await import("components/Desertion/DesertionGuide"))
                  .default,
              };
            },
          },
          {
            path: "selecttime",
            async lazy() {
              return {
                Component: (await import("components/SelectTime/SelectTime"))
                  .default,
              };
            },
          },
          {
            path: "form",
            async lazy() {
              return {
                Component: (
                  await import("components/SelectTime/ReservationForm")
                ).default,
              };
            },
          },
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
        children: [
          {
            path: "",
            async lazy() {
              return {
                Component: (await import("pages/MissingPage")).default,
              };
            },
          },
          {
            path: "reservation/:shelterNo/:desertionNo",
            async lazy() {
              return {
                Component: (
                  await import("components/Desertion/DesertionReservation")
                ).default,
              };
            },
            children: [
              {
                path: "",
                async lazy() {
                  return {
                    Component: (
                      await import("components/Desertion/DesertionGuide")
                    ).default,
                  };
                },
              },
              {
                path: "selecttime",
                async lazy() {
                  return {
                    Component: (
                      await import("components/SelectTime/SelectTime")
                    ).default,
                  };
                },
              },
            ],
          },
          {
            path: "write",
            async lazy() {
              return {
                Component: (await import("pages/MissingRegistPage")).default,
              };
            },
          },
          {
            path: "update/:profileNo",
            async lazy() {
              return {
                Component: (await import("pages/MissingUpdate")).default,
              };
            },
          },
        ],
      },
      {
        path: "donation",
        children: [
          {
            path: "",
            async lazy() {
              return {
                Component: (await import("pages/DonationPage")).default,
              };
            },
          },
          {
            path: "write",
            async lazy() {
              return {
                Component: (await import("pages/DonationRegist")).default,
              };
            },
          },
          {
            path: ":id",
            async lazy() {
              return {
                Component: (await import("pages/DonationDetailPage")).default,
              };
            },
          },
        ],
      },
      {
        path: "mypage",
        async lazy() {
          return {
            Component: (await import("pages/MyPage")).default,
          };
        },
      },
      {
        path: "member",
        async lazy() {
          return {
            Component: (await import("pages/MemberInfoUpdate")).default,
          };
        },
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
