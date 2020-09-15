import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class login extends Component{
    constructor(props){
        super(props);
        this.name = null;
    }
    async componentDidMount(){
        /*await User.online((d)=>{
            if(d){
                if(this.name === null){
                    this.props.navigation.navigate('Login')
                }
            } 
        })*/
    }
    componentDidUpdate(){
        //this.name= true;
        //console.log(this.props.route)
    }
    render(){
            let {name,imagen} = this.props.route.params.d;
            let link =`https://adordni.ml/img/2${imagen}`;
            return (
                <View style = {{flex:1}}>
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                        <Text style={styles.text}>Buenas {name} </Text>
                        <Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:link}} />
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
    dni:{
        height: hp('40%'), width: wp('100%')
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