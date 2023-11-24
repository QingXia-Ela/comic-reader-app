import useDecryptImg from '@/hooks/useDecryptImg';
import $reader, { changePage, toggleMenu } from '@/store/reader';
import { useStore } from '@nanostores/react';
import FastImage from 'react-native-fast-image';
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
  View,
  Text,
} from 'react-native';
import { deviceHeight } from '@/utils/ScreenUtils';

interface ImgListProps {}

const heightMap = new Array(400).fill(deviceHeight / 2);

const RenderItem = ({
  index,
  onPress,
  imgPath,
}: {
  index: number;
  onPress?: () => void;
  imgPath: string;
}) => {
  const [height, setHeight] = useState(heightMap[index]);
  const { uri } = useDecryptImg(imgPath);
  useEffect(() => {
    if (height > 1) {
      heightMap[index] = height;
    }
  }, [height, uri]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {uri.length ? (
        <Image
          style={[styles.img, { height }]}
          source={{
            uri,
          }}
          onLoad={({ nativeEvent }) => {
            setHeight(
              nativeEvent.source.height *
                (Dimensions.get('window').width / nativeEvent.source.width),
            );
          }}
        />
      ) : (
        <View style={{ height: '100%' }}></View>
      )}
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

function calcLayout(_: any, index: number) {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += heightMap[i];
  }
  return {
    length: heightMap[index],
    offset,
    index,
  };
}

const ImgList: FunctionComponent<ImgListProps> = forwardRef<
  VirtualizedList<any>
>(function ({}, outerRef) {
  const { currentPage, totalPage, imgList, id } = useStore($reader);
  const listRef = useRef<VirtualizedList<any>>(null);
  useEffect(() => {
    if (!scrolling)
      listRef.current?.scrollToIndex({
        index: currentPage > 55 ? 55 : currentPage,
      });
  }, [currentPage]);
  // ref
  return (
    <VirtualizedList<string>
      ref={(ref) => {
        // @ts-expect-error: current ref can change value
        listRef.current = ref;
        if (outerRef) {
          // @ts-expect-error: current ref can change value
          outerRef.current = ref;
        }
      }}
      style={styles.container}
      data={imgList}
      renderItem={({ index, item }) => (
        <CachedItem index={index + 1} imgPath={item} onPress={toggleMenu} />
      )}
      getItem={(imgList, index) => `/img/${id}/${imgList[index]}`}
      getItemCount={() => totalPage}
      keyExtractor={(item, index) => index.toString()}
      viewabilityConfig={StaticNamespace.prototype.viewConfig}
      getItemLayout={calcLayout}
      onScrollBeginDrag={() => (scrolling = true)}
      onMomentumScrollEnd={() => (scrolling = false)}
      onViewableItemsChanged={({ viewableItems }) => {
        if (scrolling && viewableItems.length > 0) {
          changePage(viewableItems[0].index || 0);
        }
      }}
      windowSize={5}
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
