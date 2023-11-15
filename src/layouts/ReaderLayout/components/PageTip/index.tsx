import useCurrentTime from '@/hooks/useCurrentTime';
import px2dp from '@/utils/ScreenUtils';
import { StyleSheet, Text, View } from 'react-native';

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

export default PageTip;
