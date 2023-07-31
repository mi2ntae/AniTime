import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";
import store from "./store";
import { Provider } from "react-redux";
import { Interceptor } from "api/commonHttp";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Interceptor>
          <Header />
          <Outlet />
          <Footer />
        </Interceptor>
      </Provider>
    </div>
  );
}

export default App;
