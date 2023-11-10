import { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

interface SearchLayoutProps {}

const SearchLayout: FunctionComponent<SearchLayoutProps> = () => {
  return (
    <View>
      <Text style={{ color: 'red' }}>test</Text>
    </View>
  );
};

export default SearchLayout;
