import { FunctionComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

interface ComicItemProps {
  imgPath: string;
}

const ComicItem: FunctionComponent<ComicItemProps> = ({ imgPath }) => {
  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.75}>
      {/* @ts-expect-error: source can resolve img */}
      <Image source={imgPath} style={styles.leftImg} />
      <View style={styles.rightInfo}>
        <Text style={styles.rightTitle}>WHAT</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 250,
    backgroundColor: '#1f1f1f',
    padding: 8,
    marginBottom: 6,
  },
  leftImg: {
    width: '25%',
    height: '100%',
    objectFit: 'cover',
  },
  rightInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  rightTitle: {
    color: '#fff',
    fontSize: 23,
  },
});

export default ComicItem;
