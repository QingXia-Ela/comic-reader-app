import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

interface SearchHeaderProps {}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default SearchHeader;
