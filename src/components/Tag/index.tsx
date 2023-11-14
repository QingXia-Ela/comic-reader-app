import px2dp from '@/utils/ScreenUtils';
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
    paddingHorizontal: px2dp(12),
    paddingVertical: px2dp(8),
    marginRight: px2dp(8),
  },
  text: {
    color: '#fff',
    fontSize: px2dp(22),
    textAlign: 'center',
  },
});

export default Tag;
