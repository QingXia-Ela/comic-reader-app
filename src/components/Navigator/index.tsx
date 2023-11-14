import { FunctionComponent, PropsWithChildren } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Iconfont } from '../../assets/font';
import px2dp from '@/utils/ScreenUtils';

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
            size={px2dp(50)}
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
    height: px2dp(100),
    paddingLeft: px2dp(30),
    paddingRight: px2dp(30),
    backgroundColor: '#222',
  },
  titleStyle: {
    color: '#fff',
    fontSize: px2dp(30),
    paddingLeft: px2dp(20),
  },
});

export default Navigator;
