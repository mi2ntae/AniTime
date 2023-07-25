import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./components/Main/Main";

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
