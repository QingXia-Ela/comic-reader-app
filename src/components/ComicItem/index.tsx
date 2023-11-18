import { FunctionComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TagList from '../TagList';
import px2dp from '@/utils/ScreenUtils';
import { Image } from '@rneui/base';

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
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.rightTitle} numberOfLines={3}>
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
    height: px2dp(260),
    backgroundColor: '#1f1f1f',
    padding: px2dp(8),
    marginBottom: px2dp(15),
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: px2dp(20),
    paddingBottom: px2dp(2),
  },
  rightTitle: {
    color: '#fff',
    fontSize: px2dp(26),
    lineHeight: px2dp(34),
  },
  authorList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: px2dp(15),
  },
  authorItem: {
    color: '#fff',
    fontSize: px2dp(26),
  },
});

export default ComicItem;
