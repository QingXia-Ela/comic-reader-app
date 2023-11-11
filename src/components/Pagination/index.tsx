import { FunctionComponent, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from '../Modal';

interface PaginationProps {
  total: number;
  current: number;
  /** @default 10 */
  eachPageCount?: number;
  /** @default 5 */
  maxCountButton?: number;
  onChange: (page: number) => void;
}

const PaginationButton = ({ children, active, onPress }: any) => (
  <TouchableOpacity
    style={{
      ...styles.paginationButton,
      ...(active ? styles.paginationButtonActive : {}),
    }}
    activeOpacity={0.7}
    onPress={onPress}>
    <Text style={{ color: '#fff', fontSize: 20 }}>{children}</Text>
  </TouchableOpacity>
);

const Pagination: FunctionComponent<PaginationProps> = ({
  total,
  current,
  eachPageCount = 10,
  maxCountButton = 5,
  onChange,
}) => {
  const [page, setPage] = useState(current);
  const [showModal, setShowModal] = useState(false);

  const handleInput = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.paginationWrapper}>
      <View style={styles.paginationButtonWrapper}>
        <PaginationButton>{'<'}</PaginationButton>
        <PaginationButton>{'1'}</PaginationButton>
        <PaginationButton>{'2'}</PaginationButton>
        <PaginationButton>{'>'}</PaginationButton>
      </View>
      <TouchableOpacity
        style={styles.paginationInputButton}
        onPress={handleInput}>
        <Text style={{ color: '#fff', fontSize: 18 }}>Input Pages...</Text>
      </TouchableOpacity>
      <Modal
        title="Input Pages"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  paginationButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 46,
    gap: 10,
  },
  paginationButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#242424',
  },
  paginationButtonActive: {
    backgroundColor: 'transparent',
    pointerEvents: 'none',
  },
  paginationInputButton: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default Pagination;
