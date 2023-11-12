import { atom } from 'nanostores';
import * as Keychain from 'react-native-keychain';

const $searchHistory = atom<string[]>([]);

Keychain.getGenericPassword({ service: 'search_history' }).then((res) => {
  if (res) {
    $searchHistory.set(JSON.parse(res.password));
  }
});

$searchHistory.listen((res) => {
  if (res) {
    Keychain.setGenericPassword('search_history', JSON.stringify(res), {
      service: 'search_history',
    });
  }
});

export function add(keyword: string) {
  $searchHistory.set([...$searchHistory.get(), keyword]);
}

export function clean() {
  $searchHistory.set([]);
}

export default $searchHistory;
