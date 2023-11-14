declare module 'react-native-config' {
  export interface NativeConfig {
    BACKEND_API?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
