import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import BasicLayout from './layouts/BasicLayout';
import SearchLayout from './layouts/SearchLayout';
import Navigator from './components/Navigator';

const BASIC_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  header: (props) => {
    // props.
    return <Navigator {...props} />;
  },
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={BASIC_SCREEN_OPTIONS}
          name="Comic Reader"
          component={BasicLayout}
        />
        <Stack.Screen
          options={BASIC_SCREEN_OPTIONS}
          name="Search"
          component={SearchLayout}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
