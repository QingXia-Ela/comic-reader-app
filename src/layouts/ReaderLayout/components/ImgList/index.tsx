import $reader, { changePage, toggleMenu } from '@/store/reader';
import { useStore } from '@nanostores/react';
import {
  FunctionComponent,
  forwardRef,
  memo,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  VirtualizedList,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import Config from 'react-native-config';

interface ImgListProps {}

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

const CachedItem = memo(RenderItem);

class StaticNamespace {
  viewConfig: any;
  constructor() {
    this.viewConfig = {
      minimumViewTime: 1,
      itemVisiblePercentThreshold: 95,
    };
  }
}

let scrolling = false;

const ImgList: FunctionComponent<ImgListProps> = forwardRef<
  VirtualizedList<any>
>(function ({}, outerRef) {
  const { currentPage, totalPage } = useStore($reader);
  const listRef = useRef<VirtualizedList<any>>(null);
  useEffect(() => {
    if (!scrolling)
      listRef.current?.scrollToIndex({
        index: currentPage > 55 ? 55 : currentPage,
      });
  }, [currentPage]);
  // ref
  return (
    <VirtualizedList
      ref={(ref) => {
        // @ts-expect-error: current ref can change value
        listRef.current = ref;
        if (outerRef) {
          // @ts-expect-error: current ref can change value
          outerRef.current = ref;
        }
      }}
      style={styles.container}
      data={Array.from({ length: totalPage }).map((_, index) => index)}
      renderItem={({ index }) => (
        <CachedItem index={index + 1} onPress={toggleMenu} />
      )}
      getItem={({ index }) => index}
      getItemCount={() => totalPage}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfig={StaticNamespace.prototype.viewConfig}
      getItemLayout={(data, index) => {
        const finalHeight = heightMap[index] || heighestImg;
        return {
          length: finalHeight,
          offset: finalHeight * index,
          index,
        };
      }}
      onScrollBeginDrag={() => (scrolling = true)}
      onMomentumScrollEnd={() => (scrolling = false)}
      onViewableItemsChanged={({ viewableItems }) => {
        if (scrolling && viewableItems.length > 0) {
          changePage(viewableItems[0].index || 0);
        }
      }}
      onScrollToIndexFailed={() => {
        console.log('failed');
      }}
      windowSize={7}
    />
  );
});

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

export default ImgList;
