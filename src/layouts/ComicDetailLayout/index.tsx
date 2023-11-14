import { Iconfont } from '@/assets/font';
import Tag from '@/components/Tag';
import px2dp from '@/utils/ScreenUtils';
import { useNavigation } from '@react-navigation/native';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from 'react-native';

const TagView = ({
  name = '',
  tags = [],
}: {
  name: string;
  tags: string[];
}) => {
  return (
    <View style={tagViewStyles.tagWrapper}>
      <Text style={tagViewStyles.tagName}>{name}</Text>
      {tags.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
      ))}
    </View>
  );
};

const tagViewStyles = StyleSheet.create({
  tagWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: px2dp(30),
  },
  tagName: {
    fontSize: px2dp(30),
    color: '#fff',
    marginRight: px2dp(10),
  },
});

interface ComicDetailLayoutProps {}
const ComicDetailLayout: FunctionComponent<ComicDetailLayoutProps> = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const title = 'NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版';
  const tags = ['百合'],
    authors = ['mutou-koucha', 'mignon'];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.comicDetailWrapper}>
        <Image
          style={styles.img}
          source={require('@/assets/images/00002.jpg')}
        />
        <Text style={styles.title}>{title}</Text>
        <TagView name="Authors:" tags={authors} />
        <TagView name="Tags:" tags={tags} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Reader')}
          style={[styles.baiscButton, styles.readButton]}>
          <Text style={{ color: '#fff', fontSize: px2dp(26) }}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.baiscButton, styles.favoriteButton]}>
          {isFavorite ? (
            <Iconfont
              name="icon-favorite-fill"
              color={'#fff'}
              size={px2dp(34)}
            />
          ) : (
            <Iconfont name="icon-favorite" color={'#fff'} size={px2dp(34)} />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: px2dp(30),
  },
  comicDetailWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1b1b1b',
    paddingVertical: px2dp(16),
    paddingHorizontal: px2dp(30),
    borderRadius: px2dp(10),
  },
  img: {
    width: '100%',
    height: px2dp(360),
    objectFit: 'contain',
    marginBottom: px2dp(30),
  },
  title: {
    fontSize: px2dp(30),
    color: '#fff',
    textAlign: 'center',
    marginBottom: px2dp(30),
  },
  baiscButton: {
    width: '100%',
    height: px2dp(80),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readButton: {
    backgroundColor: '#333',
    marginBottom: px2dp(30),
  },
  favoriteButton: {
    backgroundColor: '#cc0000',
    marginBottom: px2dp(30),
  },
});

export default ComicDetailLayout;
