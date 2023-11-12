import { FunctionComponent, PropsWithChildren } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Iconfont } from '../../assets/font';

interface NavigatorProps extends PropsWithChildren<NativeStackHeaderProps> {
  title?: string;
  showBack?: boolean;
}

const Navigator: FunctionComponent<NavigatorProps> = ({
  title,
  showBack,
  children,
  ...props
}) => {
  return (
    <View style={styles.headerWrapper}>
      {showBack && (
        <TouchableOpacity>
          <Iconfont
            name="icon-24gl-arrowLeft"
            color={'#fff'}
            size={40}
            onPress={() => props.navigation.goBack()}
          />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1 }}>
        {children ?? (
          <Text style={styles.titleStyle}>{title ?? props.route.name}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#222',
  },
  titleStyle: {
    color: '#fff',
    fontSize: 24,
    paddingLeft: 20,
  },
});

export default Navigator;
