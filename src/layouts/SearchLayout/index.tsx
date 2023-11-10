import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/global';

interface SearchLayoutProps {}

const SearchLayout: FunctionComponent<SearchLayoutProps> = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={{ color: 'red' }}>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchLayout;
