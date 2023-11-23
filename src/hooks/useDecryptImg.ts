import $settings from '@/store/settings';
import { useEffect, useState } from 'react';
import useBaseUrl from './useBaseUrl';
import RNFS from 'react-native-fs';
import base64ToUint8Array from '@/utils/file/base64ToU8Array';
import xorCrypto, { asyncXorCrypto } from '@/utils/decrypt/xorDecrypt';
import uint8ArrayToBase64 from '@/utils/file/u8ArrayToBase64';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { ExpensiveTaskThreadPool } from '@/native-modules';

// 5min cache
const CACHE_TIME = 5 * 60 * 1000;

let storeKey = $settings.get().ImageDecryptKey;
let online: boolean | null = null;

$settings.listen(({ ImageDecryptKey }) => {
  storeKey = ImageDecryptKey;
});

function changeConnection(state: NetInfoState) {
  online = state.isConnected;
}

NetInfo.addEventListener(changeConnection);

NetInfo.fetch().then(changeConnection);

/**
 * Fetch and decrypt Img
 * @param uri Img uri
 * @param baseURL
 * @param key
 *
 * @throws `ImageDecryptKey is null`
 *
 * @returns local file url
 */
async function decryptImgFetcher(uri: string, baseURL: string, key = storeKey) {
  const decryptImgUrl = `${RNFS.ExternalCachesDirectoryPath}${uri}`;
  const bufPath = `${decryptImgUrl}.buf`;

  // local cache check
  const curTime = +new Date();
  try {
    const state = await RNFS.stat(decryptImgUrl);
    if (
      false &&
      state.isFile() &&
      (state.mtime > curTime - CACHE_TIME || !online)
    ) {
      return decryptImgUrl;
    }
  } catch (e) {}

  // we don't need init before cache read becase img has been decrypted
  const { init } = $settings.get();
  if (!init) {
    await new Promise((resolve) => {
      const unlisten = $settings.listen(({ init }) => {
        if (init) {
          unlisten();
          resolve(null);
        }
      });
    });
  }

  if (!key) throw new Error('ImageDecryptKey is null');
  const finalURL = bufPath.split('/').slice(0, -1).join('/');
  // ensure dir exists
  await RNFS.mkdir(finalURL);
  // fetch
  await RNFS.downloadFile({
    fromUrl: `${baseURL}${uri}.buf`,
    toFile: bufPath,
    background: true,
    cacheable: true,
  }).promise;

  const u8 = base64ToUint8Array(await RNFS.readFile(bufPath, 'base64'));

  const arr = await new Promise<Uint8Array>((resolve) => {
    ExpensiveTaskThreadPool.run(() => {
      resolve(xorCrypto(u8, key));
    });
  });

  await RNFS.writeFile(decryptImgUrl, uint8ArrayToBase64(arr), 'base64');

  return decryptImgUrl;
}

/**
 * Get Image Decrypt object url
 *
 * **Note:** if `ImageDecryptKey` is null, it will return uri with base url and only render once.
 *
 * @param sourceUri ImgUrl, don't need BASE_URL
 * @param key decrypt key, if set it, which will recover settings decrypt key
 */
function useDecryptImg(sourceUri: string, key = storeKey) {
  const baseURL = useBaseUrl();
  const [uri, setUri] = useState<string>(key ? '' : `${baseURL}${sourceUri}`),
    [error, setError] = useState<string>(),
    [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (key) {
      decryptImgFetcher(sourceUri, baseURL, key)
        .then((uri) => {
          setUri(uri);
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return {
    uri,
    error,
    isLoading,
  };
}

export default useDecryptImg;
