import { FunctionComponent, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { Slider } from '@rneui/base';
import px2dp from '@/utils/ScreenUtils';
import { ProviderCtx } from '@/layouts/ReaderLayout';
interface ReaderMenuFooterProps {}

let showSelfVale = false;

const ReaderMenuFooter: FunctionComponent<ReaderMenuFooterProps> = () => {
  const [selfPage, setSelfPage] = useState(0);
  return (
    <ProviderCtx.Consumer>
      {({ state, setCurrentPage }) => {
        return (
          <View style={styles.container}>
            <Text style={styles.text}>
              {showSelfVale ? selfPage : state.currentPage}
            </Text>
            <Slider
              style={styles.sliderStyle}
              value={state.currentPage}
              minimumValue={1}
              onValueChange={(v) => {
                showSelfVale = true;
                setSelfPage(v);
              }}
              maximumValue={state.totalPage}
              step={1}
              onSlidingComplete={(v) => {
                setCurrentPage(v);
                showSelfVale = false;
              }}
              thumbStyle={styles.thumbStyle}
              minimumTrackTintColor="#eee"
              maximumTrackTintColor="#555"
            />
            <Text style={styles.text}>{state.totalPage}</Text>
          </View>
        );
      }}
    </ProviderCtx.Consumer>
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
