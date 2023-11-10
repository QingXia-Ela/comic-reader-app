import { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

interface TagProps {}

const Tag: FunctionComponent<TagProps> = () => {
  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.7}>
      <Text style={styles.text}>百合百合百合百合百合百合百合百合百合百合</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#333',
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 6,
    marginRight: 6,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Tag;
