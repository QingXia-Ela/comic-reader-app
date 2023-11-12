import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FunctionComponent, useEffect, useState } from 'react';
import TagList from '@/components/TagList';
import { Iconfont } from '@/assets/font';
import $searchHistory, { clean } from '../../store/SearchHistory';
import { useStore } from '@nanostores/react';

interface InitSearchProps {}

const InitSearch: FunctionComponent<InitSearchProps> = () => {
  const arr = useStore($searchHistory);

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          color: '#aaa',
          fontSize: 24,
          marginBottom: 20,
        }}>
        {' '}
        Search Something...
      </Text>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: '#ddd',
            fontSize: 20,
          }}>
          Search History
        </Text>
        <TouchableOpacity onPress={clean}>
          <Iconfont name="icon-24gl-trash2" size={24} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.tagWrapper}>
        <TagList tags={arr.slice(0, 20)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tagWrapper: {
    width: '100%',
  },
});

export default InitSearch;
