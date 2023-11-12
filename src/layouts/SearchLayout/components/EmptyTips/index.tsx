import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

interface EmptyTipsProps {}

const EmptyTips: FunctionComponent<EmptyTipsProps> = () => {
  return (
    <View
      style={{
        marginTop: 20,
        width: '100%',
      }}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 26 }}>
        There is no search result :(
      </Text>
    </View>
  );
};

export default EmptyTips;
