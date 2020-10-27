import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import AppStack from './navigator/stack';
import { Button, ThemeProvider } from 'react-native-elements';
import AsyncStorage  from '@react-native-community/async-storage';
class app extends Component {
  constructor(props){
    super(props);
    AsyncStorage.setItem(
      'Inicio',
      'A'
  );
  }
  render(){
    return (
    <View style = {{flex:1}}>
      <AppStack/>
    </View>);
  }
}

export default app;