import { useLocalStorage,RemovableRef } from "@vueuse/core";

interface Keys{
  public_key:string,
  x25519_public_key:string,
  privateKey:string
}

class LocalKeys{
  private  state:RemovableRef<Partial<Keys>> = useLocalStorage('keys',{})
  constructor(){}

  setKeys(keys:Partial<Keys>){
    this.state.value = {...this.state.value,...keys}
    return this
  }

  clearKeys(){
    this.state.value = {}
    return this
  }

  get getKeys(){
    return this.state
  }
}

export const localKeys = new LocalKeys();