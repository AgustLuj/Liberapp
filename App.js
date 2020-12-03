import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import AppStack from './navigator/stack';
import { Button, ThemeProvider } from 'react-native-elements';
import AsyncStorage  from '@react-native-async-storage/async-storage';
let data = new Date();
let dia=`${data.getDay()}/${data.getMonth()}`;
class app extends Component {
  constructor(props){
    super(props);
    this.count =0;
    this.state = {
    }
  }
  render(){
    global.dia= 9//data.getDate();
    global.mes= 12//data.getMonth()+1;
    //console.log(data.getDate(),data.getMonth()+1);
    return (
      <View style = {{flex:1}}>
        <AppStack />
      </View>);
  }
}

export default app;