import { Iconfont } from '../../../../assets/font';
import { FunctionComponent } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface BottomLinkProps {
  onTabChange?: (tab: string) => void;
}

interface SingleLinkProps {
  text: string;
  iconName: any;
  onPress?: (...args: any) => void;
  [key: string]: any;
}

const SingleLink: FunctionComponent<SingleLinkProps> = ({
  text,
  iconName,
  onPress,
}) => (
  <TouchableOpacity style={{ ...styles.linkTextWrapper }} onPress={onPress}>
    <Iconfont name={iconName} size={30} color={'white'} />
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);

const LinkList: SingleLinkProps[] = [
  {
    text: 'Overview',
    iconName: 'icon-24gl-list3',
    to: '/',
    onPress: (_, onTabChange) => {
      onTabChange?.('Overview');
    },
  },
  {
    text: 'Search',
    iconName: 'icon-24gl-search2',
    to: '/search',
    onPress: (navigation: NavigationProp<any>) => {
      navigation.navigate('Search');
    },
  },
  {
    text: 'Settings',
    iconName: 'icon-24gl-gear2',
    to: '/settings',
    onPress: (_, onTabChange) => {
      onTabChange?.('Settings');
    },
  },
];

const BottomLink: FunctionComponent<BottomLinkProps> = ({ onTabChange }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.linkWrapper}>
      {LinkList.map((item, index) => (
        <SingleLink
          key={index}
          text={item.text}
          iconName={item.iconName}
          onPress={() => item.onPress?.(navigation, onTabChange)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  linkWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#333',
  },
  linkTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    paddingTop: 6,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 3,
    borderRadius: 40,
  },
  linkTextWrapperActive: {
    backgroundColor: '#555',
  },
  linkText: {
    color: 'white',
    fontSize: 22,
    backgroundColor: 'transparent',
  },
});

export default BottomLink;
