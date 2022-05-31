import { LocalStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem("loggedIn");

    if (!loggedIn && to.path == "/auth") {
      next();
    } else if (!loggedIn && to.path !== "/auth") {
      next("/auth");
    } else if (loggedIn && to.path == "/auth") {
      next("/");
    } else {
      next();
    }
  });
};