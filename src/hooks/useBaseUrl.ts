import $settings from '@/store/settings';
import { useStore } from '@nanostores/react';
import Config from 'react-native-config';
function useBaseUrl() {
  const { BackendAddress } = useStore($settings);
  return `${
    process.env.NODE_ENV === 'development' ? Config.BACKEND_API : BackendAddress
  }`;
}

export default useBaseUrl;
