import { PublicKey } from "@hashgraph/sdk";
import { MessagesResponse } from "@tikz/hedera-mirror-node-ts";
import { decodeBase64, encodeUTF8 } from "tweetnacl-util";
import { pkg } from "./cryptography/encryption";
import { Message} from "@/misc/interface/Message"


const decrypt = (
  message: string,
  privateKey: string,
  ed25519_public_key: string,
  x25519_public_key: string
) => {
  const { X25519PrivateKey, X25519PublicKey, decrypt: drcpt } = pkg;
  let decryptedMessage: string | null;
  try {
    const msg = drcpt({
      msg: message,
      X25519PrivateKey: X25519PrivateKey.fromEdd25519PrivateKey(privateKey!),
      signatureKey: PublicKey.fromString(ed25519_public_key),
      theirX25519PublicKey: X25519PublicKey.fromString(x25519_public_key),
    });
    decryptedMessage = msg
  } catch (err) {
    decryptedMessage = null;
  }
  return decryptedMessage;
};

function parseMessage(msg:string,key:string){
  try{
    return {...JSON.parse(msg),x25519_public_key:key}
  }catch(err){
    return {
      subject:"Couldn't parse message"
    }
  }
}

export const decryptMessages = ( 
  consensusMsgs: MessagesResponse["messages"], 
  privateKey: string
) => {
  let decryptedMessages: any[] = [];
  for (let i = 0; i < consensusMsgs.length;i++ ) {
    let decryptedMessage: Message|null = null;
    const base64DecodedMsg = decodeBase64(consensusMsgs[i].message);
    const parsedChunks = parseInt(encodeUTF8(base64DecodedMsg.subarray(0, 2)))
    const chunks = isNaN(parsedChunks) ? null : parsedChunks;
    if (chunks === null) continue;
    else if (chunks === 1) {
      const { message, x25519_public_key, ed25519_public_key } = JSON.parse(
        encodeUTF8(base64DecodedMsg.subarray(2))
      );
      const msg = decrypt( message, privateKey, ed25519_public_key, x25519_public_key);
      if (!msg) {
        decryptedMessages.push({subject:'Error: Cannot Decrypt Invalid Keys'})
        continue
      };
      decryptedMessages.push(parseMessage(msg,x25519_public_key))
    } 
    else {
      if (chunks + i > consensusMsgs.length) break;
      let completeMsg = "";
      for (let j = 0; j < chunks; j++) {
        if (j === 0) {
          completeMsg += encodeUTF8(
            decodeBase64(consensusMsgs[i + j].message).subarray(2)
          );
        } else {
          completeMsg += encodeUTF8(decodeBase64(consensusMsgs[i + j].message));
        }
      }
      const { message, x25519_public_key, ed25519_public_key } = JSON.parse(completeMsg);
      const msg = decrypt( message, privateKey, ed25519_public_key, x25519_public_key);
      i += chunks - 1;
      if (!msg) {
        decryptedMessages.push({subject:'Error: Cannot Decrypt Invalid Keys'})
        continue
      };
      decryptedMessages.push(parseMessage(msg,x25519_public_key))
    }
  }
  return decryptedMessages;
};

