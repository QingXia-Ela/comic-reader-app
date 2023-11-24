import { atom, computed } from 'nanostores';
import { ComicDetail } from 'types:comic';

interface ReaderState extends ComicDetail {
  /**
   * 是否展示操作菜单
   */
  showMenu: boolean;
  /**
   * 当前页，为真实页面，索引从 0 开始
   *
   * 如果需要使用展示页面，可以使用 `showPage` 导出项
   */
  currentPage: number;
  /**
   * 总页数
   */
  totalPage: number;
}

const DEFAULT_DATA: ReaderState = {
  showMenu: false,
  currentPage: 0,
  totalPage: 56,
  imgList: [],
  authors: [],
  description: '',
  id: -1,
  tags: [],
  title: '',
  cover: '',
};

const $reader = atom<ReaderState>(DEFAULT_DATA);

export function initComicInfo(comic: ReaderState) {
  $reader.set({ ...DEFAULT_DATA, ...comic });
}

export function toggleMenu() {
  const data = $reader.get();
  $reader.set({ ...data, showMenu: !data.showMenu });
}

export function changePage(page: number) {
  const data = $reader.get();
  $reader.set({ ...data, currentPage: page });
}

export function reset() {
  $reader.set(DEFAULT_DATA);
}

export const showPage = computed($reader, (data) => {
  return data.currentPage + 1;
});

export default $reader;
