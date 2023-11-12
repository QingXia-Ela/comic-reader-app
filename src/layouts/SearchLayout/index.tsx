import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import globalStyles from '@/styles/global';
import EmptyTips from './components/EmptyTips';
import Loading from './components/Loading';

interface SearchLayoutProps {}

const SearchLayout: FunctionComponent<SearchLayoutProps> = () => {
  return (
    <View style={globalStyles.container}>
      <Loading />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchLayout;
