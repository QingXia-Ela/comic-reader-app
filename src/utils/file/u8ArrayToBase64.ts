import { encode } from 'base-64';

function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binaryString = '';
  const length = uint8Array.length;

  for (let i = 0; i < length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }

  return encode(binaryString);
}

export default uint8ArrayToBase64;
