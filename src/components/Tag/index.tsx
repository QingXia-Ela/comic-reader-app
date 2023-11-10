import { FunctionComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';

interface TagProps extends Partial<TouchableOpacity> {
  children?: string;
  onPress?: () => void;
}

const Tag: FunctionComponent<TagProps> = ({ children, ...props }) => {
  return (
    <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} {...props}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#333',
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Tag;
