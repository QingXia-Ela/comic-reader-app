import useCurrentTime from '@/hooks/useCurrentTime';
import px2dp, { deviceHeight, deviceWidth } from '@/utils/ScreenUtils';
import { Component, createContext, useState } from 'react';
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

interface ReaderLayoutProps {}

const RenderItem = ({ index }: { index: number }) => {
  const [height, setHeight] = useState(deviceHeight);
  return (
    <TouchableWithoutFeedback>
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

let changeView = true;
export const ProviderCtx = createContext<ReaderLayout>({} as ReaderLayout);

class ReaderLayout extends Component<
  ReaderLayoutProps,
  Record<string, any>,
  any
> {
  state = {
    currentPage: 1,
    flatListRef: null as unknown as FlatList,
    totalPage: 56,
  };
  viewConfig: any;
  handleViewableItemsChanged: any;

  constructor(props: any) {
    super(props);
    this.handleViewableItemsChanged = this.handleChange.bind(this);
    this.viewConfig = {
      itemVisiblePercentThreshold: 95,
    };
  }

  handleChange({ viewableItems }: { viewableItems: ViewToken[] }) {
    if (viewableItems.length > 0) {
      const curVal = (viewableItems[0].index || 0) + 1;
      if (changeView)
        this.setState({ currentPage: (viewableItems[0].index || 0) + 1 });
      else if (curVal === this.state.currentPage) {
        this.setState({ currentPage: (viewableItems[0].index || 0) + 1 });
        changeView = true;
      }
    }
  }

  setCurrentPage = debounce((page: number) => {
    this.setState({ currentPage: page });
    this.state.flatListRef?.scrollToIndex({
      index: page - 1,
    });
    changeView = false;
  }, 200);

  changePage = (page: number) => {
    console.log(+new Date());
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback>
          <ProviderCtx.Provider value={this}>
            <ReaderMenu
              title="NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
            (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]"
              show={true}>
              <FlatList
                ref={(ref) => (this.state.flatListRef = ref!)}
                style={styles.container}
                data={Array.from({ length: 56 }).map((_, index) => index)}
                renderItem={({ index }) => <RenderItem index={index + 1} />}
                keyExtractor={(item, index) => index.toString()}
                viewabilityConfig={this.viewConfig}
                onScrollToIndexFailed={({ index }) =>
                  this.state.flatListRef?.scrollToIndex({
                    index: index - 1,
                  })
                }
                onViewableItemsChanged={this.handleViewableItemsChanged}
              />
            </ReaderMenu>
          </ProviderCtx.Provider>
        </TouchableWithoutFeedback>
        <PageTip current={currentPage} total={56} />
      </SafeAreaView>
    );
  }
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
