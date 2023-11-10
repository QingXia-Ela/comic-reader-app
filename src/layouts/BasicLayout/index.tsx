import { FunctionComponent, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet } from 'react-router-native';
import BottomLink from './components/BottomLink';

interface BasicLayoutProps extends PropsWithChildren {}

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  return (
    <View style={styles.viewWrapper}>
      <View style={styles.viewInner}>
        <Outlet />
      </View>
      <View style={styles.viewGuide}>
        <BottomLink />
      </View>
    </View>
    // <NativeRouter></NativeRouter>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
  viewInner: {
    width: '100%',
    flex: 1,
  },
  viewGuide: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '8%',
  },
});

export default BasicLayout;
