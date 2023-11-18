import request from '@/api/request';
import $settings from '@/store/settings';
import { useState } from 'react';
import useBaseUrl from './useBaseUrl';

let storeKey = $settings.get().ImageDecryptKey;

$settings.listen(({ ImageDecryptKey }) => {
  storeKey = ImageDecryptKey;
});

async function imgFetcher(uri: string, key = storeKey) {
  const baseURL = useBaseUrl();
  const res = await request(`${baseURL}${uri}`);
  console.log(res);
  // console.log(res.type);
  // res.arrayBuffer().then((buf) => {
  //   console.log(buf);
  // });
  // blobToBuffer(res, (err, buf) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(buf);
  // });
}

function useDecryptImg(sourceUri: string, key = storeKey) {
  const [uri, setUri] = useState<string>(),
    [error, setError] = useState<string>(),
    [isLoading, setIsLoading] = useState(false);

  imgFetcher(sourceUri, key).then(() => {});

  return {
    uri,
    error,
    isLoading,
  };
}

export default useDecryptImg;
