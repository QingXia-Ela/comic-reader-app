import useCurrentTime from '@/hooks/useCurrentTime';
import px2dp, { deviceHeight, deviceWidth } from '@/utils/ScreenUtils';
import { Component, createContext, useState, useEffect, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  VirtualizedList,
  ViewToken,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import PageTip from './components/PageTip';
import ReaderMenu from './components/ReaderMenu';
import debounce from 'lodash/debounce';
import { throttle } from 'lodash';
import ImgList from './components/ImgList';
import $reader, { reset, showPage } from '@/store/reader';
import { useStore } from '@nanostores/react';

interface ReaderLayoutProps {}

const heightMap = new Array(400).fill(0);
let heighestImg = 0;

const RenderItem = ({
  index,
  onPress,
}: {
  index: number;
  onPress?: () => void;
}) => {
  const [height, setHeight] = useState(heightMap[index] || heighestImg);
  useEffect(() => {
    if (height > 0) {
      heightMap[index] = height;
      if (height > heighestImg) {
        heighestImg = height;
      }
    }
  }, [height]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        style={[styles.img, { height }]}
        onLoad={({ nativeEvent }) => {
          setHeight(
            nativeEvent.source.height *
              (Dimensions.get('window').width / nativeEvent.source.width),
          );
        }}
        source={{
          uri: `${Config.BACKEND_API}/img/998543/${index
            .toString()
            .padStart(5, '0')}.jpg`,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

function ReaderLayout() {
  const { showMenu, totalPage } = useStore($reader);
  const realPage = showPage.get();
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback>
        <ReaderMenu
          title="NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
        (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]"
          show={showMenu}>
          <ImgList />
        </ReaderMenu>
      </TouchableWithoutFeedback>
      <PageTip current={realPage} total={totalPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  img: {
    width: '100%',
  },
});

export default ReaderLayout;
