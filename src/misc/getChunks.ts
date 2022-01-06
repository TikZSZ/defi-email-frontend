import { decodeUTF8 } from "tweetnacl-util";

const CHUNK_SIZE = 1024;
export const getChunks = (message: string|Uint8Array) => {
  if(typeof message === 'string'){
    return Math.floor((decodeUTF8(message).length + (CHUNK_SIZE - 1)) / CHUNK_SIZE);
  }
  return Math.floor((message.length + (CHUNK_SIZE - 1)) / CHUNK_SIZE);
} 
  