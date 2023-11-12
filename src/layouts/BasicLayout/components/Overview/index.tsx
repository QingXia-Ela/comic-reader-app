import { FunctionComponent, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import sleep from '@/utils/sleep';
import ComicItem from '@/components/ComicItem';
import Pagination from '@/components/Pagination';
import { useNavigation } from '@react-navigation/native';

interface OverviewProps {}

const Overview: FunctionComponent<OverviewProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    sleep(2000).then(() => setRefreshing(false));
  }, []);

  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.viewInner}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ComicItem
        name="NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
      (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]"
        authors={['mutou-koucha', 'mignon']}
        tags={['百合']}
        imgPath={require('@/assets/images/00002.jpg')}
        // @ts-expect-error: stupid typescript type generate
        onPress={() => navigation.navigate<any>('Comic')}
      />
      <Pagination total={100} current={1} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewInner: {
    width: '100%',
    flex: 1,
    padding: 15,
    marginBottom: 10,
  },
});

export default Overview;
