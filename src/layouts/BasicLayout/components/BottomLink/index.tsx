import { Iconfont } from '../../../../assets/font';
import { FunctionComponent } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

interface BottomLinkProps {}

const SingleLink: FunctionComponent<{
  text: string;
  iconName: any;
  to: string;
}> = ({ text, iconName, to }) => (
  <Link to={to} underlayColor="transparent">
    <View style={{ ...styles.linkTextWrapper }}>
      <Iconfont name={iconName} size={30} color={'white'} />
      <Text style={styles.linkText}>{text}</Text>
    </View>
  </Link>
);

const LinkList = [
  {
    text: '总览',
    iconName: 'icon-24gl-list3',
    to: '/',
  },
  {
    text: '搜索',
    iconName: 'icon-24gl-search2',
    to: '/search',
  },
  {
    text: '设置',
    iconName: 'icon-24gl-gear2',
    to: '/settings',
  },
];

const BottomLink: FunctionComponent<BottomLinkProps> = () => {
  return (
    <View style={styles.linkWrapper}>
      {LinkList.map((item, index) => (
        <SingleLink
          key={index}
          text={item.text}
          iconName={item.iconName}
          to={item.to}
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
