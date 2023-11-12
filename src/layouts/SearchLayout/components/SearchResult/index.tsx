import ComicItem from '@/components/ComicItem';
import Pagination from '@/components/Pagination';
import { FunctionComponent } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

interface SearchResultProps {}

const SearchResult: FunctionComponent<SearchResultProps> = () => {
  return (
    <ScrollView style={styles.container}>
      <ComicItem
        name="NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
  (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]"
        authors={['mutou-koucha', 'mignon']}
        tags={['百合']}
        imgPath={require('@/assets/images/00002.jpg')}
      />
      <Pagination total={20} current={1} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
});

export default SearchResult;
