import { FunctionComponent } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';
import S from '../../styles/atom';

interface NavigatorProps extends NativeStackHeaderProps {
  title?: string;
  showBack?: boolean;
}

const Navigator: FunctionComponent<NavigatorProps> = ({
  title,
  showBack,
  ...props
}) => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.titleStyle}>{title ?? props.route.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#222',
  },
  titleStyle: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Navigator;
