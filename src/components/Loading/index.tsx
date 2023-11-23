import globalStyles from '@/styles/global';
import { FunctionComponent } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <View
      style={[
        { paddingTop: 20, justifyContent: 'center', alignItems: 'center' },
        globalStyles.container,
      ]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;
