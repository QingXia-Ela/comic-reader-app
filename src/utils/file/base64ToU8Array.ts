import { decode } from 'base-64';
function base64ToUint8Array(base64String: string) {
  const binaryString = decode(base64String);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
}

export default base64ToUint8Array;
