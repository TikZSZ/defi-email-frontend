import { defineStore } from "pinia";
import { RouteLocationNormalized, Router } from "vue-router";
import api from "@/misc/request/api";
import { server } from "@/misc/request/server";
import { localKeys } from "@/misc/localstorage/setKeys";
import { Message} from "@/misc/interface/Message"
let msgToSign = "bills";

interface AuthResponse {
  name: string;
  public_key: string;
  x25519_public_key: string;
  userAccountId: string;
}

export const useStore = defineStore("main", {
  state: () => ({
    isMobile: false,
    accountId: null as string | null,
    name: null as string | null,
    currentPath: "/home",
    message:null as Message & {x25519_public_key:string}|null
  }),
  actions: {
    async logOut(route: RouteLocationNormalized, router: Router) {
      await server.logOut();
      this.name = null;
      this.accountId = null;
      console.log(route);
      localKeys.clearKeys();
      if (route.meta.requiresAuth) {
        router.push({ name: "Home" });
      }
    },
    logIn(data: { accountId: string; name: string }, router?: Router) {
      this.name = data.name;
      this.accountId = data.accountId;
      router?.push("/home");
    },

    async submitLogin(
      submitData: { privateKey: string; accountId: string },
      router: Router
    ) {
      const data = await server.login<AuthResponse>(submitData, msgToSign);
      localKeys
        .clearKeys()
        .setKeys({
          public_key: data.public_key,
          x25519_public_key: data.x25519_public_key,
          privateKey: submitData.privateKey,
        });
      this.logIn({ accountId: data.userAccountId, name: data.name }, router);
    },

    async submitSignUp(
      privateKey: string,
      submitData: {
        userAccountId: string;
        name: string;
        public_key: string;
        x25519_public_key: string;
      },
      router: Router
    ) {
      const data = await server.signUp<AuthResponse>(
        privateKey,
        msgToSign,
        submitData
      );
      const {public_key,x25519_public_key} = submitData
      localKeys.clearKeys().setKeys({public_key,x25519_public_key,privateKey})
      useStore().logIn(
        { accountId: data.userAccountId, name: data.name },
        router
      );
    },

    async checkAuth() {
      try {
        const { data } = await api.get<{
          userAccountId: string;
          name: string;
          public_key: string;
          x25519_public_key: string;
        }>("/api/currentUser");
        this.logIn({ accountId: data.userAccountId, name: data.name });
        localKeys.setKeys({
          public_key: data.public_key,
          x25519_public_key: data.x25519_public_key,
        });
      } catch (err) {
        localKeys.clearKeys();
        return null;
      }
      return null;
    }
  },
});
