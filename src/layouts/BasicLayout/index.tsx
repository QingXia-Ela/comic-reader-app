import router from '../../router';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NativeRouter, RouterProvider } from 'react-router-native';

interface BasicLayoutProps extends PropsWithChildren { }

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  return (
    <View style={styles.viewWrapper}>
      <View style={styles.viewInner}>
        <RouterProvider router={router} />
      </View>
      <View style={styles.viewGuide}>
        <Text>test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  viewInner: {
    width: '100%',
    flex: 1,
  },
  viewGuide: {
    width: '100%',
    height: '6%',
  },
});

export default BasicLayout;
