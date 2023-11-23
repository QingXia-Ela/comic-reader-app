import {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';
import sleep from '@/utils/sleep';
import ComicItem from '@/components/ComicItem';
import Pagination from '@/components/Pagination';
import { useNavigation } from '@react-navigation/native';
import useSWR from 'swr';
import { $List, Comic } from 'types:comic';
import Loading from '@/components/Loading';
import { BasicResponse } from 'types:response';
import px2dp from '@/utils/ScreenUtils';

interface OverviewProps {}

const eachPageCount = 10;

const Overview: FunctionComponent<OverviewProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigation = useNavigation();

  const { data, error, isLoading } = useSWR<BasicResponse<$List>>(
    `/list?count=${eachPageCount}&offset=${(currentPage - 1) * eachPageCount}`,
  );

  useEffect(() => {
    console.log('render');
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return (
      <Text style={styles.failText}>Fetch Failed. Waiting for refresh</Text>
    );
  const {
    data: { data: remoteList, hasMore, total },
  } = data!;

  return (
    <FlatList
      style={styles.viewInner}
      data={remoteList}
      renderItem={({ item }) => (
        <ComicItem
          key={item.id}
          id={item.id}
          name={item.title}
          authors={item.authors}
          tags={item.tags}
          cover={item.cover}
          // @ts-expect-error: stupid typescript type generate for navigate
          onPress={() => navigation.navigate<any>('Comic')}
        />
      )}
      windowSize={5}
      ListFooterComponent={() => (
        <Pagination
          total={total}
          current={currentPage}
          eachPageCount={eachPageCount}
          onChange={setCurrentPage}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  viewInner: {
    width: '100%',
    flex: 1,
    padding: px2dp(15),
  },
  failText: {
    color: 'white',
    textAlign: 'center',
    fontSize: px2dp(20),
    marginTop: px2dp(40),
  },
});

export default memo(Overview);
