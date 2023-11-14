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
import ComicDetailLayout from './layouts/ComicDetailLayout';
import ComicDetailHeader from './layouts/ComicDetailLayout/Header';
import ReaderLayout from './layouts/ReaderLayout';

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
const COMIC_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  header: (props) => {
    return (
      <Navigator showBack {...props}>
        <ComicDetailHeader />
      </Navigator>
    );
  },
};
const READER_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
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
          <Stack.Screen
            options={COMIC_SCREEN_OPTIONS}
            name="Comic"
            component={ComicDetailLayout}
          />
          <Stack.Screen
            options={READER_SCREEN_OPTIONS}
            name="Reader"
            component={ReaderLayout}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
