import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
class login extends Component{
    constructor(props){
        super(props);
        this.dni=null;
        this.seg=null;
        this.dniregex=/\d\d\d\d/;
        this.segregex=/[0-9]*-[0-9]*/;
        this.state= {
          name:null,
        }
        this.getUser = this.getUser.bind(this)
    }
    getUser(){
        if(this.dniregex.test(this.dni)){
            this.setState({'errD':false})
            if(this.segregex.test(this.seg)){
                this.setState({'errS':false})
                if(this.dni != null && this.seg != null){
                    User.getData(this.dni,this.seg,async (d,user)=>{
                        if(d){
                            try{
                                if(null != await AsyncStorage.getItem('@UserData')){
                                    await AsyncStorage.removeItem('@UserData');
                                }
                                await AsyncStorage.setItem(
                                    '@UserData',
                                    JSON.stringify(user)
                                );
                                
                                if(null != await AsyncStorage.getItem('@UserData')){
                                    global.value=user;
                                    this.props.navigation.replace('Tabs'); 
                                }
                            }catch{
                                this.setState({'errg':true,'info':" "})
                            }
                        }else if(user === false){
                            this.setState({'errg':true,'info':"Entra a adordni.ml y actualizar tus datos"})
                        }else{
                            this.setState({'errg':true,'info':" "})
                        }
                    })
                }
            }else{
                this.setState({'errS':true,'info':" "})
            }
        }else{
            this.setState({'errD':true,'info':" "})
        }
        
        
    }
    changeDni(text){
        this.dni=text;
    }
    changeSeg(text){
        this.seg=text;
    }
    /*<TouchableOpacity style={styles.tButton} onPress={()=>{this.getUser()}}>
                    <View>
                        <Text style={styles.text}>Ingresar</Text>
                    </View>
                </TouchableOpacity>
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
                />*/
    render(){
        const {name,errg,errD,errS,info}= this.state
        return (
            
            <View style = {{flex:1}}>
                <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                <Text h1 h1Style={styles.ttitle}>Bienvenidos</Text>
               
                {errg?<Text style={{color:'red'}} >{(info === " ")?"Dni o Seguimineto incorrecto":info}</Text>:null}
                <Input
                    containerStyle={styles.tImput}
                    placeholder='100000'
                    label="Ingrese su Dni"
                    leftIcon={
                        <Icon
                        name='user-o'
                        size={24}
                        color='#f6b93b'
                        />
                    }
                    keyboardType = 'numeric'
                    onChangeText={text => this.changeDni(text)}
                    errorMessage={errD?'Formato del Dni incorrecto':null}
                    />
                <Input
                    containerStyle={styles.tImput}
                    label="Ingrese su N° de seguimiento"
                    placeholder='xxxx-xxxx'
                    keyboardType = 'numeric'
                    leftIcon={
                        <Icon
                        name='address-card-o'
                        size={20}
                        color='#f6b93b'
                        />
                    }
                    onChangeText={text => this.changeSeg(text)}
                    errorMessage={errS?'Formato del N° Seguimiento incorrecto':null}
                />
                <Button
                    titleStyle={styles.bTitle}
                    containerStyle={styles.bContainer}
                    title="Ingresar"
                    type="outline"
                    onPress={()=>{this.getUser()}}
                />
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
    bTitle:{
        fontSize:hp('5%'),
        color:'white',
        margin:0,
        padding:0,
    },
    bContainer:{
        width:wp('70%'),
        margin:hp('5%'),
        backgroundColor:'#f6b93b',
    },
    ttitle:{
        marginTop:hp('20%'),
        marginBottom:hp('2%')
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
    },
    tImput:{
        height: hp('5%'),
        width:wp('70%'),
        margin:hp('5%'),
    //backgroundColor:'grey',
    }
});

export default login
