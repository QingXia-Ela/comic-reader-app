import { atom } from 'nanostores';
import * as Keychain from 'react-native-keychain';

interface Settings {
  BackendAddress: string | null;
  AuthHeaderKey: string | null;
  AuthHeaderValue: string | null;
  ImageDecryptKey: string | null;
}

const $settings = atom<Settings>({
  BackendAddress: null,
  AuthHeaderKey: null,
  AuthHeaderValue: null,
  ImageDecryptKey: null,
});

Keychain.getGenericPassword({ service: 'settings' }).then((res) => {
  if (res) {
    $settings.set(JSON.parse(res.password));
  }
});

$settings.listen((state) => {
  Keychain.setGenericPassword('settings', JSON.stringify(state), {
    service: 'settings',
  });
});

export const CnMap = {
  BackendAddress: '后端地址',
  AuthHeaderKey: '认证头键',
  AuthHeaderValue: '认证头值',
  ImageDecryptKey: '图像解密密钥',
};

export const changeSettings = (key: string, value: string) => {
  $settings.set({ ...$settings.get(), [key]: value?.length ? value : null });
};

export default $settings;
