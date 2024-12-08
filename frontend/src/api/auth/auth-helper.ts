import { signout } from "./api-auth";

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;
    return sessionStorage.getItem("jwt") ? true : false;
  },
  authenticate(data: any, cb?: () => void) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("jwt", JSON.stringify(data.token));
      sessionStorage.setItem("userId", JSON.stringify(data.uuid));
    }
    if (cb) cb();
  },
  clearJWT(cb: any) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("jwt");
      sessionStorage.removeItem("userId");
    }
    cb();
    signout().then((data) => {});
  },
};

export default auth;
