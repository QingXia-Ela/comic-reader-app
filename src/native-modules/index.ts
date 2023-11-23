import { NativeModules } from 'react-native';

export interface ExpensiveTaskThreadPoolType {
  run(task: () => void): void;
}

const ExpensiveTaskThreadPool: ExpensiveTaskThreadPoolType =
  NativeModules.ExpensiveTaskThreadPool;

export interface ImgMethodsType {
  /** Decrypt Img, and save to `decryptImgUrl` */
  decryptAndWriteFile(
    bufPath: string,
    decryptImgUrl: string,
    key: string,
  ): void;
}

const ImgMethods: ImgMethodsType = NativeModules.ImgMethods;

export { ExpensiveTaskThreadPool, ImgMethods };
