import { FunctionComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import TagList from '../TagList';

interface ComicItemProps {
  imgPath: string;
}

const TestAuthors = ['mutou-koucha', 'sakura'];

const ComicItem: FunctionComponent<ComicItemProps> = ({ imgPath }) => {
  return (
    <View style={styles.wrapper}>
      {/* @ts-expect-error: source can resolve img */}
      <Image source={imgPath} style={styles.leftImg} />
      <View style={styles.rightInfo}>
        <TouchableOpacity style={{ flex: 1 }}>
          <Text style={styles.rightTitle} numberOfLines={4}>
            NoyAcg | [エゾクロテン (宮野木ジジ)] わるい子晴ちん 暫定版
            (アイドルマスター シンデレラガールズ) [中国翻訳] [DL版]
          </Text>
          <View style={styles.authorList}>
            <Text style={styles.authorItem} numberOfLines={1}>
              {TestAuthors.join(' | ')}
            </Text>
          </View>
        </TouchableOpacity>
        <TagList oneLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 220,
    backgroundColor: '#1f1f1f',
    padding: 8,
    marginBottom: 6,
  },
  leftImg: {
    width: '25%',
    height: '100%',
    objectFit: 'contain',
  },
  rightInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  rightTitle: {
    color: '#fff',
    fontSize: 23,
    lineHeight: 30,
  },
  authorList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
  },
  authorItem: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ComicItem;
