import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from '../Modal';
import TextInput from '../Input';
import px2dp from '@/utils/ScreenUtils';

interface PaginationProps {
  total: number;
  current: number;
  /** @default 10 */
  eachPageCount?: number;
  /** @default 5 */
  maxCountButton?: number;
  onChange?: (page: number) => void;
}

const PaginationButton = ({ children, active, onPress }: any) => (
  <TouchableOpacity
    style={{
      ...styles.paginationButton,
      ...(active ? styles.paginationButtonActive : {}),
    }}
    activeOpacity={0.7}
    onPress={onPress}>
    <Text style={{ color: '#fff', fontSize: px2dp(26) }}>{children}</Text>
  </TouchableOpacity>
);

interface PaginationButtonGroupProps {
  total: number;
  current: number;
  eachPageCount: number;
  /** @default 5 */
  maxCountButton?: number;
  onChange: (page: number) => void;
}

const PaginationButtonGroup = ({
  total,
  current,
  eachPageCount,
  maxCountButton = 5,
  onChange,
}: PaginationButtonGroupProps) => {
  const pageCount = Math.ceil(total / eachPageCount);
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }).map((_, index) => {
      const active = current === index + 1;
      return (
        <PaginationButton
          key={index}
          active={active}
          onPress={() => {
            onChange(index + 1);
          }}>
          {index + 1}
        </PaginationButton>
      );
    });
  }
  const template: Array<number | '...'> = [];

  if (current <= 3) {
    Array.from({ length: maxCountButton - 1 }).map((_, index) => {
      template.push(index + 1);
    });
    template.push('...', pageCount);
  } else if (current >= pageCount - 2) {
    template.push(1, '...');
    Array.from({ length: maxCountButton - 1 }).map((_, index) => {
      template.push(pageCount - (maxCountButton - 2) + index);
    });
  } else {
    template.push(1, '...');
    const mid = Math.floor(maxCountButton / 2);
    Array.from({ length: maxCountButton - 2 }).map((_, index) => {
      template.push(current - mid + index + 1);
    });
    template.push('...', pageCount);
  }

  return template.map((item, index) => {
    return (
      <PaginationButton
        key={index}
        active={item === current || item === '...'}
        onPress={() => {
          if (typeof item === 'number') {
            onChange?.(item);
          }
        }}>
        {item}
      </PaginationButton>
    );
  });
};

// don't know why inputPage val is not change
let inputVal = '';

const Pagination: FunctionComponent<PaginationProps> = ({
  total,
  current,
  eachPageCount = 10,
  maxCountButton = 5,
  onChange,
}) => {
  const [page, setPage] = useState(current || 1);
  const [showModal, setShowModal] = useState(false);
  const [inputPage, setInputPage] = useState('');
  useEffect(() => {
    onChange?.(page);
  }, [page]);

  const pageCount = Math.ceil(total / eachPageCount);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputPage = (val: string) => {
    if (val === '') {
      setInputPage(val);
    } else if (/^\d+$/.test(val)) {
      setInputPage(val);
      inputVal = val;
    }
  };

  const handleOk = () => {
    if (/^\d+$/.test(inputVal)) {
      setPage(parseInt(inputVal) > pageCount ? pageCount : parseInt(inputVal));
    } else {
      setPage(1);
    }
    setInputPage('');
    setShowModal(false);
  };

  return (
    <View style={styles.paginationWrapper}>
      <View style={styles.paginationButtonWrapper}>
        <PaginationButton onPress={() => page > 1 && setPage(page - 1)}>
          {'<'}
        </PaginationButton>
        <PaginationButtonGroup
          total={total}
          current={page}
          onChange={setPage}
          eachPageCount={eachPageCount}
          maxCountButton={maxCountButton}
        />
        <PaginationButton onPress={() => page < pageCount && setPage(page + 1)}>
          {'>'}
        </PaginationButton>
      </View>
      {pageCount >= 5 && (
        <>
          <TouchableOpacity
            style={styles.paginationInputButton}
            onPress={handleShowModal}>
            <Text style={{ color: '#fff', fontSize: px2dp(24) }}>
              Input Pages...
            </Text>
          </TouchableOpacity>
          <Modal
            title="Input Pages"
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
            onOk={handleOk}>
            <TextInput
              value={inputPage}
              onChangeText={handleInputPage}
              placeholder="Input Page Number..."
            />
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: px2dp(45),
  },
  paginationButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: px2dp(56),
    gap: px2dp(10),
    marginTop: px2dp(10),
  },
  paginationButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(56),
    height: px2dp(56),
    borderRadius: px2dp(28),
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
    marginTop: px2dp(20),
  },
});

export default Pagination;
