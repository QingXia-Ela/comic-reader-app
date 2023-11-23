import px2dp from '@/utils/ScreenUtils';
import { Text, StyleSheet } from 'react-native';
function FetchFailText({ text }: { text?: string }) {
  return (
    <Text style={styles.failText}>
      {text || 'Fetch Failed. Waiting for refresh'}
    </Text>
  );
}

const styles = StyleSheet.create({
  failText: {
    color: 'white',
    textAlign: 'center',
    fontSize: px2dp(20),
    marginTop: px2dp(40),
  },
});

export default FetchFailText;
