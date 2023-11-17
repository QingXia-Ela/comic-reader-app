import { FunctionComponent, useState, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { Slider } from '@rneui/base';
import px2dp from '@/utils/ScreenUtils';
import { useStore } from '@nanostores/react';
import $reader, { changePage, showPage } from '@/store/reader';
import { debounce, throttle } from 'lodash';
interface ReaderMenuFooterProps {}

let showSelfPage = false;

const ReaderMenuFooter: FunctionComponent<ReaderMenuFooterProps> = () => {
  const [selfPage, setSelfPage] = useState(1);
  const { totalPage } = useStore($reader);
  const realPage = showPage.get();
  const debounceChangePage = useCallback((v: number) => {
    setSelfPage(v);
    changePage(v - 1);
    showSelfPage = false;
  }, []);

  const throttleSetSelfPage = useCallback(
    throttle((v: number) => {
      showSelfPage = true;
      setSelfPage(v);
    }, 33),
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{showSelfPage ? selfPage : realPage}</Text>
      <Slider
        style={styles.sliderStyle}
        value={showSelfPage ? selfPage : realPage}
        minimumValue={1}
        onValueChange={throttleSetSelfPage}
        maximumValue={totalPage}
        step={1}
        onSlidingComplete={debounceChangePage}
        thumbStyle={styles.thumbStyle}
        minimumTrackTintColor="#eee"
        maximumTrackTintColor="#555"
      />
      <Text style={styles.text}>{totalPage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px2dp(20),
  },
  sliderStyle: {
    width: '79%',
  },
  text: {
    color: 'white',
    width: px2dp(50),
    fontSize: px2dp(30),
  },
  thumbStyle: {
    width: px2dp(30),
    height: px2dp(30),
    backgroundColor: 'white',
  },
});

export default ReaderMenuFooter;
