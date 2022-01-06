import { useStore } from "@/store";
import { Client,PrivateKey, TopicMessageChunk,TopicMessageSubmitTransaction } from "@hashgraph/sdk";

export async function sendToConsensus<T extends Uint8Array|string>(topicId:string,msg:T,privateKey:string){
  const store = useStore()
  const pKey = PrivateKey.fromString(privateKey)
  if(!store.accountId) return
  const client = Client.forTestnet().setOperator(store.accountId,pKey)
  const submitTxnResp = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: msg,
  }).execute(client);
  const msgReceipt = (await submitTxnResp.getRecord(client))
  return msgReceipt
}
