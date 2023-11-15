import px2dp, { deviceWidth } from '@/utils/ScreenUtils';
import { FunctionComponent, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import ReaderMenuHeader from './components/Header';
import ReaderMenuFooter from './components/Footer';

interface ReaderMenuProps extends PropsWithChildren {
  show?: boolean;
  title?: string;
}

const ReaderMenu: FunctionComponent<ReaderMenuProps> = ({
  show,
  title,
  children,
}) => {
  return (
    show && (
      <>
        <View style={styles.topMenu}>
          <ReaderMenuHeader height={px2dp(110)} title={title} />
        </View>
        {children}
        <View style={styles.bottomMenu}>
          <ReaderMenuFooter />
        </View>
      </>
    )
  );
};

const styles = StyleSheet.create({
  topMenu: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceWidth,
    height: px2dp(110),
  },
  bottomMenu: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: deviceWidth,
    height: px2dp(110),
    backgroundColor: 'rgba(0, 0, 0, 0.84)',
  },
});

export default ReaderMenu;
