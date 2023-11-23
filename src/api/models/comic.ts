import useSWR from 'swr';
import { $Comic$Id, ComicDetail } from 'types:comic';

export const useComicDetail = (id: string | number) => {
  return useSWR<$Comic$Id>(`/comic/${id}`);
};
