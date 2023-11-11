import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import BottomLink from './components/BottomLink';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Overview from './components/Overview';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './components/Settings';

interface BasicLayoutProps extends PropsWithChildren {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

const TabScreen = ({ choose }: any) => {
  switch (choose) {
    case 'Overview':
      return <Overview />;

    case 'Settings':
      return <Settings />;

    default:
      console.warn('unknown tab');
      return null;
  }
};

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ navigation }) => {
  const [tab, setTab] = useState('Overview');
  return (
    <View style={styles.viewWrapper}>
      <View style={{ flex: 1 }}>
        <TabScreen choose={tab} />
      </View>
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
