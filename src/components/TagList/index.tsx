import { FunctionComponent, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Tag from '../Tag';
import px2dp from '@/utils/ScreenUtils';

interface TagOption {
  title: string;
  onPress?: () => void;
}

interface TagListProps {
  oneLine?: boolean;
  tags?: Array<TagOption | string>;
}

const TagList: FunctionComponent<TagListProps> = ({ oneLine, tags = [] }) => {
  const List = useMemo(() => {
    return tags.map((item, index) => {
      if (typeof item === 'string') {
        return <Tag key={index}>{item}</Tag>;
      }
      return (
        <Tag key={index} {...item}>
          {item.title}
        </Tag>
      );
    });
  }, []);

  return oneLine ? (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={{ ...styles.wrapper }} horizontal>
        {List}
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={styles.wrapper}>{List}</View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: px2dp(8),
    width: '100%',
  },
});

export default TagList;
