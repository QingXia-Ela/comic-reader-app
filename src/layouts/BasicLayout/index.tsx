import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Outlet } from 'react-router-native';
import BottomLink from './components/BottomLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ComicItem from '../../components/ComicItem';
import sleep from '../../utils/sleep';

interface BasicLayoutProps extends PropsWithChildren {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    sleep(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.viewWrapper}>
      <ScrollView
        style={styles.viewInner}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {Array.from({ length: 30 }).map((v, i) => (
          <ComicItem
            key={i}
            name="NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
          (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]"
            authors={['mutou-koucha', 'mignon']}
            tags={['百合']}
            imgPath={require('../../assets/images/00002.jpg')}
          />
        ))}
      </ScrollView>
      <View style={styles.viewGuide}>
        <BottomLink />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
  viewInner: {
    width: '100%',
    flex: 1,
    padding: 15,
    marginBottom: 10,
  },
  viewGuide: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '8%',
  },
});

export default BasicLayout;
