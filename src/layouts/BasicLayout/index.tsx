import router from '../../router';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  RouterProvider,
  Link,
  NativeRouter,
  Routes,
  Route,
} from 'react-router-native';

interface BasicLayoutProps extends PropsWithChildren { }

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ children }) => {
  return (
    <NativeRouter>
      <View style={styles.viewWrapper}>
        <View style={styles.viewInner}>
          <Routes>
            <Route path="/" element={<Text>Index</Text>}></Route>
            <Route path="/comic/:id" element={<Text>Comic</Text>}></Route>
          </Routes>
          {/* <RouterProvider router={router} /> */}
        </View>
        <View style={styles.viewGuide}>
          <View>
            <Link to="/comic/998543">
              <Text>Comic</Text>
            </Link>
          </View>
          <View>
            <Link to="/">
              <Text>Index</Text>
            </Link>
          </View>
        </View>
      </View>
    </NativeRouter>
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
