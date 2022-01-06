import { PrivateKey, Client,TopicCreateTransaction } from "@hashgraph/sdk";

export async function createTopic(accountId:string,privateKey:string){
  const client = Client.forTestnet().setOperator(accountId,privateKey)
  const topicCreateTxn = await  new TopicCreateTransaction()
    .execute(client)
  const record = await  topicCreateTxn.getRecord(client)
  return record
}