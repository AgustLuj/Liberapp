import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
class login extends Component{
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
          User.getData(this.dni,this.seg,async (d,user)=>{
            console.log(d,user)
            if(d){
                try{
                    await AsyncStorage.setItem(
                        '@UserData',
                        JSON.stringify(user)
                    );
                    const value = await AsyncStorage.getItem('name');
                    if(value !== 'null'){
                        this.props.navigation.replace('Tabs' )
                    }
                }catch{
                    this.setState({'errg':true})
                }
            }else{
                this.setState({'errg':true})
            }
              //console.log(d)
            
            
          })
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
        const {name,errg}= this.state
        return (
            
            <View style = {{flex:1}}>
                <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                <Text h1 h1Style={styles.ttitle}>Bienvenidos</Text>
               
                {errg?<Text style={{color:'red'}} >Dni o Seguimineto incorrecto</Text>:null}
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
        margin:hp('4%'),
    //backgroundColor:'grey',
    }
});

export default login
