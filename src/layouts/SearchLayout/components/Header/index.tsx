import { Iconfont } from '@/assets/font';
import TextInput from '@/components/Input';
import px2dp from '@/utils/ScreenUtils';
import { FunctionComponent, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const [keyword, setKeyword] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Search Comic..."
      />
      <TouchableOpacity>
        <Iconfont
          name="icon-24gl-cross"
          size={px2dp(28)}
          color={'white'}
          onPress={() => setKeyword('')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  input: {
    width: '94%',
    height: '100%',
    borderRadius: 5,
    paddingHorizontal: px2dp(10),
    marginLeft: px2dp(10),
    fontSize: px2dp(30),
    color: '#fff',
  },
});

export default SearchHeader;
