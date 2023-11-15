import { FunctionComponent, PropsWithChildren } from 'react';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Iconfont } from '../../assets/font';
import px2dp from '@/utils/ScreenUtils';
import { ViewStyle } from 'react-native';

interface NavigatorProps extends PropsWithChildren<NativeStackHeaderProps> {
  title?: string;
  showBack?: boolean;
  height?: number;
}

const Navigator: FunctionComponent<NavigatorProps> = ({
  title,
  showBack,
  children,
  height,
  ...props
}) => {
  const finalStyle: Array<ViewStyle> = [styles.headerWrapper];
  if (height) {
    finalStyle.push({ height });
  }
  return (
    <View style={finalStyle}>
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
          <Text style={styles.titleStyle} numberOfLines={1}>
            {title ?? props.route.name}
          </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.84)',
  },
  titleStyle: {
    color: '#fff',
    fontSize: px2dp(30),
    paddingLeft: px2dp(20),
  },
});

export default Navigator;
