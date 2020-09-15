import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import AppStack from './navigator/stack';

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