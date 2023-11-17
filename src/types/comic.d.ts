declare module 'types:comic' {
  interface Comic {
    id: number;
    title: string;
    cover: string;
    authors: string[];
    tags: string[];
    description: string;
  }

  interface $List {
    data: Comic[];
    total: number;
    hasMore: boolean;
  }
}
