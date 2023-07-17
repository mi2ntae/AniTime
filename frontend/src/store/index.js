import { createStore } from "vuex";
import accountStore from "./accountStore";
import menuStore from "./menuStore";
import platformInfoStore from "./platformInfoStore";

export default createStore({
  modules: {
    accountStore,
    menuStore,
    platformInfoStore
  }
});
