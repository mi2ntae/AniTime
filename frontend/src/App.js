import "./App.css";
import { Outlet } from "react-router";
import store from "./store";
import { Provider } from "react-redux";
import { Interceptor } from "api/commonHttp";

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
