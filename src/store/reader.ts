import { atom, computed } from 'nanostores';

const DEFAULT_DATA = {
  showMenu: false,
  currentPage: 0,
  totalPage: 0,
};

const $reader = atom(DEFAULT_DATA);

export function initComicInfo(totalPage: number) {
  const data = $reader.get();
  $reader.set({ ...data, totalPage });
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
