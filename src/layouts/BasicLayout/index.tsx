import { FunctionComponent, PropsWithChildren, useState } from 'react';
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

const CacheTab: Record<string, any> = {
  Overview: <Overview />,
  Settings: <Settings />,
};

const TabScreen = ({ choose }: any) => {
  return CacheTab[choose] || null;
};

const BasicLayout: FunctionComponent<BasicLayoutProps> = ({ navigation }) => {
  const [tab, setTab] = useState('Overview');
  const a = useDecryptImg('/img/998543/00001.jpg');
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
