declare module 'types:comic' {
  interface BasicSuccessResponse<T> {
    code: number;
    message: string;
    data: T;
  }

  interface Comic {
    id: number;
    title: string;
    cover: string;
    authors: string[];
    tags: string[];
    description: string;
  }

  interface ComicDetail extends Comic {
    imgList: string[];
  }

  interface $List {
    data: Comic[];
    total: number;
    hasMore: boolean;
  }

  interface $Comic$Id extends BasicSuccessResponse<ComicDetail> {}
}
