/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, } from 'react';
import { connect } from 'react-redux';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import Chat from './Src/Screens/Chatscreen/Chat';

import * as Color from './Src/Utilitys/Colors';

const App = () => {

  return (
     
      <Chat />
     
  );
};


export default connect()(App);
