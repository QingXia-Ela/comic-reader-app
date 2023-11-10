import { FunctionComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import Tag from '../Tag';

interface TagListProps {
  oneLine?: boolean;
}

const TagList: FunctionComponent<TagListProps> = ({ oneLine }) => {
  return oneLine ? (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={{ ...styles.wrapper, height: 40 }} horizontal>
        <Tag />
        <Tag />
      </ScrollView>
    </SafeAreaView>
  ) : (
    <View style={styles.wrapper}>
      <Tag />
      <Tag />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
});

export default TagList;
