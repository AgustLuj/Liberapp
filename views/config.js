import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-native-elements';

class login extends Component{
    constructor(props){
        super(props);
    }
    render(){
            return (
                <View style = {{flex:1}}>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'home',style: {}, color: '#fff' ,onPress: () => this.props.navigation.navigate('Home'),}}
                        centerComponent={{ text: 'Configuracion', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                        rightComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer(), }}
                        containerStyle={{
                            backgroundColor: '#f6b93b',
                            justifyContent: 'space-around',
                        }}
                        
		            />
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                        <Text style={styles.text}>Prueba</Text>
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

export default login
