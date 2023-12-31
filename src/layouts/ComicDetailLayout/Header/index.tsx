import { Iconfont } from '@/assets/font';
import px2dp from '@/utils/ScreenUtils';
import { useNavigation } from '@react-navigation/native';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

interface ComicDetailHeaderProps {}

const ComicDetailHeader: FunctionComponent<ComicDetailHeaderProps> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comic</Text>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        // @ts-expect-error: router valid navigate
        onPress={() => navigation.navigate('Comic Reader')}>
        <Iconfont
          name="icon-24gl-home3"
          size={px2dp(36)}
          color={'white'}></Iconfont>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px2dp(30),
  },
  title: {
    fontSize: px2dp(30),
    color: 'white',
  },
});

export default ComicDetailHeader;
