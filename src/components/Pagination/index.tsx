import { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

interface PaginationProps {
  total: number;
}

const Pagination: FunctionComponent<PaginationProps> = () => {
  return <View style={styles.paginationWrapper}></View>;
};

const styles = StyleSheet.create({
  paginationWrapper: {
    width: '100%',
  },
});

export default Pagination;
