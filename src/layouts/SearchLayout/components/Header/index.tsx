import { Iconfont } from '@/assets/font';
import TextInput from '@/components/Input';
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
          size={24}
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
    width: '88%',
    height: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#222',
  },
});

export default SearchHeader;
