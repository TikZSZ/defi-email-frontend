import { encrypt as encr, X25519PrivateKey, X25519PublicKey } from "@/misc/cryptography/encryption";
import { PrivateKey } from "@hashgraph/sdk";

export function encrypt(msgToEncrypt:string,privateKey:string,x25519_public_key_key:string){
    const x25519PVK = X25519PrivateKey.fromEdd25519PrivateKey(privateKey)
    const theirX25519PUBk = X25519PublicKey.fromString(x25519_public_key_key)
    const encryptedMessage = encr({
      X25519PrivateKey:x25519PVK,
      msg:msgToEncrypt,
      signatureKey:PrivateKey.fromString(privateKey),
      theirX25519PublicKey:theirX25519PUBk
    })
    return {encryptedMessage,x25519PubK:x25519PVK.publicKey.toString()}
  }