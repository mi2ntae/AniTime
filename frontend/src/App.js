import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";
import store from "./store";
import { Provider } from "react-redux";
import { Interceptor } from "api/commonHttp";
import LoginPage from "pages/LoginPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Interceptor>
          <Outlet />
        </Interceptor>
      </Provider>
    </div>
  );
}

export default App;
