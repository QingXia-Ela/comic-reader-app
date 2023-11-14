import { FunctionComponent, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';

interface ReaderLayoutProps {}

const ReaderLayout: FunctionComponent<ReaderLayoutProps> = () => {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <FastImage
        style={{
          width: '100%',
          height: 320,
        }}
        source={{
          uri: `${Config.BACKEND_API}/img/998543/00002.jpg`,
          priority: FastImage.priority.normal,
        }}
        resizeMode="cover"
      />
      {/* <Image source={['https://shiinafan.top/images/self/middle.png']} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ReaderLayout;
