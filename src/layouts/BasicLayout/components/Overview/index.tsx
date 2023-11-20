import { FunctionComponent, useState, useCallback, useMemo } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import sleep from '@/utils/sleep';
import ComicItem from '@/components/ComicItem';
import Pagination from '@/components/Pagination';
import { useNavigation } from '@react-navigation/native';
import useSWR from 'swr';
import { $List, Comic } from 'types:comic';
import Loading from '@/components/Loading';
import { BasicResponse } from 'types:response';
import useDecryptImg from '@/hooks/useDecryptImg';

interface OverviewProps {}

const Overview: FunctionComponent<OverviewProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState<Comic[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    sleep(2000).then(() => setRefreshing(false));
  }, []);

  const navigation = useNavigation();

  const { data, error, isLoading } =
    useSWR<BasicResponse<$List>>('/list?count=10');

  if (isLoading) return <Loading />;
  if (error) return <Text>error</Text>;
  const {
    data: { data: remoteList, hasMore, total },
  } = data!;

  return (
    <ScrollView
      style={styles.viewInner}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {remoteList.map(({ title, id, authors, tags, cover }) => {
        return (
          <ComicItem
            key={id}
            id={id}
            name={title}
            authors={authors}
            tags={tags}
            cover={cover}
            // @ts-expect-error: stupid typescript type generate for navigate
            onPress={() => navigation.navigate<any>('Comic')}
          />
        );
      })}
      <Pagination total={total} current={1} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewInner: {
    width: '100%',
    flex: 1,
    padding: 15,
    marginBottom: 10,
  },
});

export default Overview;
