import { FunctionComponent, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet } from 'react-router-native';
import BottomLink from './components/BottomLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ComicItem from '../../components/ComicItem';

interface BasicLayoutProps extends PropsWithChildren {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ navigation }) => {
  return (
    <View style={styles.viewWrapper}>
      <View style={styles.viewInner}>
        <ComicItem imgPath={require('../../assets/images/00002.jpg')} />
      </View>
      <View style={styles.viewGuide}>
        <BottomLink />
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
    backgroundColor: '#121212',
  },
  viewInner: {
    width: '100%',
    flex: 1,
    padding: 15,
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
