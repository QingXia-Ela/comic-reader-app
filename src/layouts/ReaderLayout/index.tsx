import { Component, createContext, useState, useEffect, memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  VirtualizedList,
  ViewToken,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Config from 'react-native-config';
import PageTip from './components/PageTip';
import ReaderMenu from './components/ReaderMenu';
import ImgList from './components/ImgList';
import $reader, { reset, showPage } from '@/store/reader';
import { useStore } from '@nanostores/react';

interface ReaderLayoutProps {}

function ReaderLayout() {
  const { showMenu, totalPage, title } = useStore($reader);
  const realPage = showPage.get();
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback>
        <ReaderMenu title={title} show={showMenu}>
          <ImgList />
        </ReaderMenu>
      </TouchableWithoutFeedback>
      <PageTip current={realPage} total={totalPage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
  },
  img: {
    width: '100%',
  },
});

export default ReaderLayout;
