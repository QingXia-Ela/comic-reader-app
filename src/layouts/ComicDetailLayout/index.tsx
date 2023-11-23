import { Iconfont } from '@/assets/font';
import Tag from '@/components/Tag';
import px2dp from '@/utils/ScreenUtils';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
  ScrollView,
  Button,
} from 'react-native';
import { Image } from '@rneui/base';
import { useComicDetail } from '@/api/models/comic';
import Loading from '@/components/Loading';
import FetchFailText from '@/components/FetchFailText';
import useDecryptImg from '@/hooks/useDecryptImg';
import { initComicInfo } from '@/store/reader';

const TagView = ({
  name = '',
  tags = [],
}: {
  name: string;
  tags?: string[];
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

interface ComicDetailParams {
  id: string;
}

const ComicDetailLayout: FunctionComponent<ComicDetailLayoutProps> = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  // const navigation = useNavigation();
  const { params } = useRoute<RouteProp<{ params: ComicDetailParams }>>();

  const navigation = useNavigation();

  const { data, error, isLoading } = useComicDetail(params?.id);

  const { title, tags, authors, cover } = data?.data || {};

  const { uri } = useDecryptImg(`/img/${params?.id}/${cover}`);

  data?.data.imgList.length && initComicInfo(data?.data.imgList.length);

  if (isLoading) return <Loading />;
  if (error || !data) return <FetchFailText />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.comicDetailWrapper}>
        <View style={styles.img}>
          {uri.length ? (
            <Image
              style={{
                objectFit: 'contain',
                height: '100%',
              }}
              source={{
                uri,
              }}
            />
          ) : null}
        </View>
        <Text style={styles.title}>{title}</Text>
        <TagView name="Authors:" tags={authors} />
        <TagView name="Tags:" tags={tags} />
        <TouchableOpacity
          // @ts-expect-error: router valid navigate
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
