import { FunctionComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <View
      style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;
