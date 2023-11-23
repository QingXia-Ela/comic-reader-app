import { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import TagList from '../TagList';
import px2dp from '@/utils/ScreenUtils';
import { Image } from '@rneui/base';
import useDecryptImg from '@/hooks/useDecryptImg';
import ComicItemImage from './components/Image';

interface ComicItemProps extends Partial<View> {
  name: string;
  authors: string[];
  tags?: Parameters<typeof TagList>[0]['tags'];
  id: number;
  /**
   * source img path, will decrypt by component
   */
  cover?: string;
  onPress?: () => void;
}

/**
 * Comic Item on list
 *
 * @height `px2dp(260)` you may need this when your scroll view not really smooth
 */
const ComicItem: FunctionComponent<ComicItemProps> = ({
  name,
  authors,
  onPress,
  tags,
  id,
  cover,
  ...props
}) => {
  const { uri } = useDecryptImg(`/img/${id}/${cover}`);
  return (
    <View style={styles.wrapper} {...props}>
      <TouchableOpacity
        style={styles.leftImgWrapper}
        onPress={onPress}
        activeOpacity={0.7}>
        <ComicItemImage uri={uri} />
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
