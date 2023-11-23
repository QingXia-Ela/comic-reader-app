import { FunctionComponent, PropsWithChildren, useState, memo } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import BottomLink from './components/BottomLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Overview from './components/Overview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './components/Settings';
import useDecryptImg from '@/hooks/useDecryptImg';

interface BasicLayoutProps extends PropsWithChildren {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const TabScreen = ({ choose }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: choose === 'Overview' ? 'flex' : 'none',
          height: '100%',
        }}>
        <Overview />
      </View>
      <View
        style={{
          display: choose === 'Settings' ? 'flex' : 'none',
          height: '100%',
        }}>
        <Settings />
      </View>
    </View>
  );
};

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ navigation }) => {
  const [tab, setTab] = useState('Overview');
  return (
    <View style={styles.viewWrapper}>
      <TabScreen choose={tab} />
      <View style={styles.viewGuide}>
        <BottomLink onTabChange={setTab} />
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
  viewGuide: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '8%',
  },
});

export default BasicLayout;
