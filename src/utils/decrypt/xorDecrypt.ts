/**
 * Basic XOR decryption
 */
export default function xorCrypto(a: Uint8Array, b: string) {
  const result = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b.charCodeAt(i % b.length);
  }
  return result;
}

/**
 * Async XOR decryption
 */
export async function asyncXorCrypto(
  a: Uint8Array,
  b: string,
): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const result = new Uint8Array(a.length);
    for (let i = 0; i < a.length; i++) {
      result[i] = a[i] ^ b.charCodeAt(i % b.length);
    }
    resolve(result);
  });
}
