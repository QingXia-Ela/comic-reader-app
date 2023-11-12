import { Iconfont } from '@/assets/font';
import Tag from '@/components/Tag';
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
    marginBottom: 30,
  },
  tagName: {
    fontSize: 22,
    color: '#fff',
    marginRight: 10,
  },
});

interface ComicDetailLayoutProps {}
const ComicDetailLayout: FunctionComponent<ComicDetailLayoutProps> = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const title = 'NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版';
  const tags = ['百合'],
    authors = ['mutou-koucha', 'mignon'];

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
        <TouchableOpacity style={[styles.baiscButton, styles.readButton]}>
          <Text style={{ color: '#fff', fontSize: 20 }}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.baiscButton, styles.favoriteButton]}>
          {isFavorite ? (
            <Iconfont name="icon-favorite-fill" color={'#fff'} size={26} />
          ) : (
            <Iconfont name="icon-favorite" color={'#fff'} size={26} />
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
    padding: 15,
  },
  comicDetailWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1b1b1b',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  img: {
    width: '100%',
    height: 320,
    objectFit: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  baiscButton: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readButton: {
    backgroundColor: '#333',
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: '#cc0000',
  },
});

export default ComicDetailLayout;
