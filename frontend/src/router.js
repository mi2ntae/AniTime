import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./components/Main/Main";
import Desertion from "./components/Desertion/Desertion";
import Missing from "./components/Missing/Missing";


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
