import pkg from "@/misc/cryptography/encryption"
import { PrivateKey } from "@hashgraph/sdk";
import { decodeUTF8, encodeUTF8 } from "tweetnacl-util";
self.onmessage = async (e) => {
  console.log(e);
  const test = async () => {
    await pkg.ready
    const {X25519PrivateKey,encrypt,decrypt} = pkg
    const msg = `{
      "consensus_timestamp": "1638571402.278779377",
      "topic_id": "0.0.16430783",
      "message": "eyJiaWxsIjp7InByb2R1Y3ROYW1lIjoicmVhbG1lIEJ1ZHMgQWlyIDIiLCJkYXRlIjoiU2F0IERlYyAwNCAyMDIxIDA0OjEyOjQyIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInByaWNlIjoiMzAwMFJzIiwiaXRlbU5vIjoxLCJzZWxsZXJJZCI6IjAuMC4xNTY3ODE3NyJ9LCJzaWduYXR1cmUiOiIzMjUzZTAwYmM2MDRlNWJlZDZlZTMyODBjZmRkNjY3MDRkYjI3NTAxNjk4ODY4MzA5MjExN2NjMTg1NzdhMWMzMTg1ZGU4M2YyN2QwMDBiMWM3NGFkYTJlOWQ4MDllNjdjODgzMmRhMmJjYjU4YTFkYzk5YmM4MmUwNTVjZDgwMCJ9",
      "running_hash": "XbU1+0qtR6IsIThcE4E8Kp/05vIZFvriJ7upcCVouzRVpG1ps9uny94tdpHAGM0P",
      "running_hash_version": 3,
      "sequence_number": 1
    }`


    const key1 = PrivateKey.generate()
    const key2 = PrivateKey.generate()

    const iter = 1000
    console.time('time for encryption')
    for (let i = 0; i < iter; i++) {
      const encrypted = encrypt({
        msg,
        X25519PrivateKey: X25519PrivateKey.fromHederaPrivateKey(key2),
        signatureKey: key1,
        theirX25519PublicKey: X25519PrivateKey.fromHederaPrivateKey(key1).publicKey
      })

    }
    console.timeEnd('time for encryption')
    const encrypted = encrypt({
      msg,
      X25519PrivateKey: X25519PrivateKey.fromHederaPrivateKey(key2),
      signatureKey: key1,
      theirX25519PublicKey: X25519PrivateKey.fromHederaPrivateKey(key1).publicKey
    })
    console.time('time for decryption')
    for (let i = 0; i < iter; i++) {
      const decrypted = decrypt({
        msg: encrypted,
        X25519PrivateKey: X25519PrivateKey.fromHederaPrivateKey(key1),
        signatureKey: key1.publicKey,
        theirX25519PublicKey: X25519PrivateKey.fromHederaPrivateKey(key2).publicKey
      })
    }
    console.timeEnd('time for decryption')
    self.postMessage(JSON.parse(decrypt({
        msg: encrypted,
        X25519PrivateKey: X25519PrivateKey.fromHederaPrivateKey(key1),
        signatureKey: key1.publicKey,
        theirX25519PublicKey: X25519PrivateKey.fromHederaPrivateKey(key2).publicKey
    })))
  }
  await test()
  
}

export default{}