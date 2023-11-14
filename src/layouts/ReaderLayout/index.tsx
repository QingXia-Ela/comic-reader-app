import useCurrentTime from '@/hooks/useCurrentTime';
import px2dp, { deviceHeight, deviceWidth } from '@/utils/ScreenUtils';
import {
  Component,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

const PageTip = ({ current, total }: { current: number; total: number }) => {
  const currentTime = useCurrentTime(3000);
  const str = `${new Date(currentTime).toLocaleTimeString('zh', {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })}  ${current}/${total}`;
  return (
    <View style={pageTipStyles.container}>
      <Text style={pageTipStyles.text}>{str}</Text>
    </View>
  );
};

const pageTipStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: px2dp(20),
    paddingRight: px2dp(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopRightRadius: px2dp(10),
  },
  text: {
    color: 'white',
    fontSize: px2dp(26),
  },
});

// const viewConfig = {
//   viewAreaCoveragePercentThreshold: 50,
// }

// const ReaderLayout: FunctionComponent<ReaderLayoutProps> = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const viewConfig = useMemo(
//     () => ({
//       viewAreaCoveragePercentThreshold: 50,
//     }),
//     [],
//   );
//   const memoFunc = useCallback(
//     ({ viewableItems }: { viewableItems: ViewToken[] }) => {
//       if (viewableItems.length > 0) {
//         setCurrentPage(viewableItems[0].index);
//       }
//     },
//     [],
//   );
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableWithoutFeedback>
//         <FlatList
//           style={styles.container}
//           data={Array.from({ length: 20 }).map((_, index) => index)}
//           renderItem={({ index }) => <RenderItem index={index + 1} />}
//           keyExtractor={(item, index) => index.toString()}
//           viewabilityConfig={viewConfig}
//           onViewableItemsChanged={handleChange}
//         />
//       </TouchableWithoutFeedback>
//       <PageTip current={currentPage} total={20} />
//     </SafeAreaView>
//   );
// };

class ReaderLayout extends Component<
  ReaderLayoutProps,
  Record<string, any>,
  any
> {
  state = {
    currentPage: 1,
  };

  viewConfig: any;
  handleViewableItemsChanged: any;

  constructor(props: any) {
    super(props);
    this.handleViewableItemsChanged = this.handleChange.bind(this);
    this.viewConfig = {
      waitForInteraction: true,
      itemVisiblePercentThreshold: 95,
    };
  }

  handleChange({ viewableItems }: { viewableItems: ViewToken[] }) {
    if (viewableItems.length > 0) {
      this.setState({ currentPage: (viewableItems[0].index || 0) + 1 });
    }
  }

  render() {
    const { currentPage } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback>
          <FlatList
            style={styles.container}
            data={Array.from({ length: 56 }).map((_, index) => index)}
            renderItem={({ index }) => <RenderItem index={index + 1} />}
            keyExtractor={(item, index) => index.toString()}
            viewabilityConfig={this.viewConfig}
            onViewableItemsChanged={this.handleViewableItemsChanged}
          />
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
