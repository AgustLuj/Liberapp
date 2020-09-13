import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import User from './components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class app extends Component {
  constructor(props){
    super(props);
    this.dni=null;
    this.seg=null;

    

    this.state= {
      name:null,
    }
    this.getUser = this.getUser.bind(this)
    
  }
  getUser(){
    if(this.dni != null && this.seg != null){
      User.getData(this.dni,this.seg,(d)=>{
        console.log(d)
      })
    }
    
  }
  changeDni(text){
    this.dni=text;
  }
  changeSeg(text){
    this.seg=text;
  }
  render(){
    const {name}= this.state
    return (
    <View style = {{flex:1}}>
      <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
      <Text style={styles.text}>{name}</Text>
        <Text style={styles.ttitle}>Bienvenidos</Text>
        <TextInput
          style={styles.textImput}
          placeholder="Dni (sin punto)"
          keyboardType = 'numeric'
          onChangeText={text => this.changeDni(text)}
        />
        <TextInput
          style={styles.textImput}
          placeholder="N° Seguimiento"
          keyboardType = 'numeric'
          onChangeText={text => this.changeSeg(text)}
        />
        <TouchableOpacity style={styles.tButton} onPress={()=>{this.getUser()}}>
          <View>
              <Text style={styles.text}>Ingresar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f8c8d',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  ttitle:{
    color:'black',
    fontSize:hp('8%'),
    marginTop:hp('10%'),
    marginBottom:hp('5%')
    //textShadowColor: "red",
  },
  text:{
    color:'black',
    fontSize:hp('3%'),
    marginTop:hp('1%'),
    marginBottom:hp('0.1%'),
    alignItems: 'center',
    textAlign:"center",
  },
  textFooter:{
    color:'black',
    fontSize:30,
    margin:7
  },
  textImput:{ 
    height: hp('5%'),
    width:wp('50%'),
    fontSize:hp('3%'),
    backgroundColor: '#00000000',
    marginBottom:hp('5%'),
    textAlign:"center",
    borderWidth: 1,
    borderRadius:30,
    paddingLeft:5,
    paddingRight:5,
    paddingBottom:10,
    paddingTop:0,
  },
  tButton:{
    height: hp('5%'),
    width:wp('50%'),
    margin:20,
    borderWidth: 1,
    //backgroundColor:'grey',
  }
});

export default app;