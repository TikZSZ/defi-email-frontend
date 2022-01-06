import { PrivateKey } from "@hashgraph/sdk";
import hex from "./hex"
import hash from "object-hash"

export default  function signature<T>(privateKey:string,data:string|object){
  const pKey = PrivateKey.fromString(privateKey);
	//const msg = new TextEncoder().encode(data);
  let msg:string
  if(typeof data === 'string') msg = data
  else msg = hash(data)
	const UInt8Msg = new TextEncoder().encode(msg);
	const signature = pKey.sign(UInt8Msg);
  return {UInt8Signature:signature,hexSignature:hex.encode(signature)}
}

export {signature}