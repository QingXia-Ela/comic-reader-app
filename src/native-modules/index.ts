import { NativeModules } from 'react-native';

export interface ExpensiveTaskThreadPoolType {
  run(task: () => void): void;
}

const ExpensiveTaskThreadPool: ExpensiveTaskThreadPoolType =
  NativeModules.ExpensiveTaskThreadPool;

export { ExpensiveTaskThreadPool };
