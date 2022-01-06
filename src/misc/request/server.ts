import { PrivateKey } from "@hashgraph/sdk";
import { AxiosInstance } from "axios";
import api from "./api";
import signature from "../cryptography/signature";


type BaseSignUp = {
  userAccountId: string; 
  name: string; 
  public_key: string;
  [K:string]:any
}

type BaseLogIn = {
  accountId: string; 
  privateKey: string;
}

class Server {
  private api?:AxiosInstance
  constructor(){}

  connect(api:AxiosInstance){
    this.api = api
  }
  async login<T>(submitData:BaseLogIn,msgToSign:string){
    const {hexSignature} = signature(submitData.privateKey,msgToSign)
    const { data } = await api.post<T>("/api/loginUser", {
      data: {
        userAccountId: submitData.accountId,
        signature: hexSignature,
      },
    });
    return data
  }

  async signUp<K,T = BaseSignUp>
  (privateKey:string,msgToSign:string,submitData:T){
    const { hexSignature } = signature(privateKey, msgToSign)
    const { data } = await api.post<K>("/api/createUser", {
    data: {
      ...submitData,
      signature: hexSignature,
    },
    });
    return data
  }

  async logOut(){
    return await api.get("/api/logout");
  }
}

export const server = new Server();

