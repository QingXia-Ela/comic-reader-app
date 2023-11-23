import $settings from '@/store/settings';
import { useStore } from '@nanostores/react';
import { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface ComicItemImageProps {
  uri: string;
}

const ComicItemImage: FunctionComponent<ComicItemImageProps> = ({ uri }) => {
  const { ImageDecryptKey } = useStore($settings);
  return uri.length ? (
    <Image
      source={{
        uri: `${ImageDecryptKey ? `file://` : ''}${uri}`,
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
