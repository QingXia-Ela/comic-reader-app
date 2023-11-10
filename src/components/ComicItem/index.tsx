import { FunctionComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import TagList from '../TagList';

interface ComicItemProps extends Partial<View> {
  imgPath: string;
  name: string;
  authors: string[];
  tags?: Parameters<typeof TagList>[0]['tags'];
  onPress?: () => void;
}

const ComicItem: FunctionComponent<ComicItemProps> = ({
  imgPath,
  name,
  authors,
  onPress,
  tags,
  ...props
}) => {
  return (
    <View style={styles.wrapper} {...props}>
      <TouchableOpacity
        style={styles.leftImgWrapper}
        onPress={onPress}
        activeOpacity={0.7}>
        {/* @ts-expect-error: source can resolve img */}
        <Image source={imgPath} style={styles.leftImg} />
      </TouchableOpacity>
      <View style={styles.rightInfo}>
        <TouchableOpacity
          onPress={onPress}
          style={{ flex: 1 }}
          activeOpacity={0.7}>
          <Text style={styles.rightTitle} numberOfLines={4}>
            {name}
          </Text>
          <View style={styles.authorList}>
            <Text style={styles.authorItem} numberOfLines={1}>
              {(authors || []).join(' | ')}
            </Text>
          </View>
        </TouchableOpacity>
        <TagList tags={tags} oneLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 220,
    backgroundColor: '#1f1f1f',
    padding: 8,
    marginBottom: 15,
  },
  leftImgWrapper: {
    width: '25%',
  },
  leftImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  rightInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  rightTitle: {
    color: '#fff',
    fontSize: 23,
    lineHeight: 30,
  },
  authorList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
  },
  authorItem: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ComicItem;
