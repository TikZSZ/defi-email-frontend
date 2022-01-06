const byteToHex:string[] = [];

for (let n = 0; n <= 0xff; n += 1) {
  byteToHex.push(n.toString(16).padStart(2, "0"));
}

function encode(data:Uint8Array):string {
  let string = "";

  for (const byte of data) {
    string += byteToHex[byte];
  }

  return string;
}

function decode(text:string) {
  const str = text.startsWith("0x") ? text.substring(2) : text;
  const result = str.match(/.{1,2}/gu);
  return new Uint8Array((result == null ? [] : result).map(byte => parseInt(byte, 16)));
}

export default {encode,decode}