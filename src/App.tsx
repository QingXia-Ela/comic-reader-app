import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import BasicLayout from './layouts/BasicLayout';
import SearchLayout from './layouts/SearchLayout';
import Navigator from './components/Navigator';
import globalStyles from './styles/global';
import SearchHeader from './layouts/SearchLayout/components/Header';

const BASIC_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  header: (props) => {
    return <Navigator {...props} />;
  },
};
const SEARCH_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  header: (props) => {
    return (
      <Navigator {...props} showBack>
        <SearchHeader />
      </Navigator>
    );
  },
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <View style={globalStyles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={BASIC_SCREEN_OPTIONS}
            name="Comic Reader"
            component={BasicLayout}
          />
          <Stack.Screen
            options={SEARCH_SCREEN_OPTIONS}
            name="Search"
            component={SearchLayout}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
