import { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface ComicItemImageProps {
  uri: string;
}

const ComicItemImage: FunctionComponent<ComicItemImageProps> = ({ uri }) => {
  return uri.length ? (
    <Image
      source={{
        uri,
      }}
      style={styles.leftImg}
    />
  ) : null;
};

const styles = StyleSheet.create({
  leftImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

export default ComicItemImage;
