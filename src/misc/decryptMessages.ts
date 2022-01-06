import { PublicKey } from "@hashgraph/sdk";
import {MessagesResponse } from "@tikz/hedera-mirror-node-ts";
import { decodeBase64, encodeUTF8 } from "tweetnacl-util";
import {pkg} from "./cryptography/encryption";


const decrypt = (
  message: string,
  privateKey: string,
  ed25519_public_key: string,
  x25519_public_key: string
) => {
  const { X25519PrivateKey, X25519PublicKey, decrypt: drcpt } = pkg;
  let decryptedMessage:string | null
  try{
    const msg = drcpt({
      msg: message,
      X25519PrivateKey: X25519PrivateKey.fromEdd25519PrivateKey(privateKey!),
      signatureKey: PublicKey.fromString(ed25519_public_key),
      theirX25519PublicKey: X25519PublicKey.fromString(x25519_public_key),
    });
    decryptedMessage = msg
  }catch(err){
    decryptedMessage = null
  }
  return decryptedMessage
};


export const decryptMessages = ( consensusMResp: MessagesResponse['messages'], privateKey: string ) => {
  const consensusMsg = consensusMResp
  let decryptedMessages: any[] = []
  console.log(consensusMsg);
  for (let i = 0; i < consensusMsg.length;) {
    let decryptedMessage:string
    const base64DecodedMsg = decodeBase64(consensusMsg[i].message);
    const chunks = parseInt(encodeUTF8(base64DecodedMsg.subarray(0, 2)))!==NaN?parseInt(encodeUTF8(base64DecodedMsg.subarray(0, 2))):null ;
    if(chunks === null){
      i+=1
      continue
    }else if (chunks === 1) {
      const { message, x25519_public_key, ed25519_public_key } = JSON.parse(
        encodeUTF8(base64DecodedMsg.subarray(2))
      );
      const msg = decrypt(
        message,
        privateKey,
        ed25519_public_key,
        x25519_public_key
      );
      i+=1
      if(msg === null) continue
      decryptedMessage = msg
    } else {
      if (chunks + i > consensusMsg.length) break;
      let completeMsg = "";
      for (let j = 0; j < chunks; j++) {
        if(j === 0){
          completeMsg += encodeUTF8(decodeBase64(consensusMsg[i + j].message).subarray(2));
        }else{         
          completeMsg += encodeUTF8(decodeBase64(consensusMsg[i + j].message));
        }
      }      
      const { message, x25519_public_key, ed25519_public_key } = JSON.parse(completeMsg);
      const msg = decrypt(
        message,
        privateKey,
        ed25519_public_key,
        x25519_public_key
      );
      i += chunks;
      if(msg === null) continue
      decryptedMessage = msg
    }
    decryptedMessages.push(JSON.parse(decryptedMessage!))
  }
  return decryptedMessages
};
