declare module 'types:response' {
  export interface BasicResponse<T> {
    code: number;
    message: string;
    data: T;
  }
}
