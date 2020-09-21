import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import AppStack from './navigator/stack';
import { Button, ThemeProvider } from 'react-native-elements';

class app extends Component {
  constructor(props){
    super(props);  
  }
  render(){
    return (
    <View style = {{flex:1}}>
      <AppStack/>
    </View>);
  }
}

export default app;