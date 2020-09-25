import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
import AsyncStorage  from '@react-native-community/async-storage' 

class login extends Component{
    constructor(props){
        super(props);
        this.name='';
        this.user='';
        this.seg='';
        this.dni='';
        this.segOld='';

        this.segRegex=/\d\d\d\d-\d\d\d\d/

        this.state = {

        }
    }
    async componentDidMount(){
        const {name,username,dni,imagen,verificado,admin} =JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.dni= dni;
        this.setState({
            name,
            username,
            dni,
            imagen,
            verificado,
            admin
        })
    }
    async changeUser(){
        await this.checkSeg(this.segOld,async (d)=>{
            if(d){
                await User.checkPass(this.dni,this.segOld,async(e)=>{
                    if(e){
                        await this.checkSeg(this.seg,async(d)=>{
                            if(d){
                                await User.changeUser(this.dni,this.name,this.user,this.seg,this.segOld,async (f)=>{
                                    if(f){
                                        await AsyncStorage.removeItem('@UserData');
			                            this.props.navigation.replace('LoginFinish')
                                    }else{
                                        this.setState({'errg':true})
                                    }
                                })                           
                            }else{
                                this.setState({'err2':true})  
                            }
                            
                        });
                    }else{
                        this.setState({'err':true})
                    }  
                })
            }else{
                this.setState({'err':true})
            }
            
        });
        
        
        
    }
    checkSeg(d,fn){
        if(!this.segRegex.test(d)){
            fn(false)
        }else{
            fn(true)
            
        }
    }
    changeName(text){
        this.name=text;
    }
    changeUserText(text){
        this.user=text;
    }
    changeSeg(text){
        this.seg=text;
    }
    changeSegOld(text){
        this.segOld=text;
    }
    render(){
            let {name,dni,username,err,err2,errg} = this.state;
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
                    {errg?<Text style={{color:'red'}}>Algo Salio mal intentar nuevamente</Text>:null}
                    <Input
                        containerStyle={styles.tImput}
                        placeholder={name}
                        label="Nombre:"
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='#f6b93b'
                            />
                        }
                        onChangeText={text => this.changeName(text)}
                    />
                    <Input
                        containerStyle={styles.tImput}
                        placeholder={username}
                        label="Usuario:"
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='#f6b93b'
                            />
                        }
                        maxLength={40}
                        onChangeText={text => this.changeUserText(text)}
                    />
                    <Input
                        containerStyle={styles.tImput}
                        label="N° de seguimiento"
                        placeholder='xxxx-xxxx'
                        keyboardType = 'numeric'
                        leftIcon={
                            <Icon
                            name='address-card-o'
                            size={20}
                            color='#f6b93b'
                            />
                        }
                        maxLength={9}
                        onChangeText={text => this.changeSegOld(text)}
                        errorMessage={err?'Codigo de seguimiento incorrecto':null}
                    />
                    <Input
                        containerStyle={styles.tImput}
                        label="Nuevo N° de seguimiento"
                        placeholder='xxxx-xxxx'
                        keyboardType = 'numeric'
                        leftIcon={
                            <Icon
                            name='address-card-o'
                            size={20}
                            color='#f6b93b'
                            />
                        }
                        maxLength={9}
                        onChangeText={text => this.changeSeg(text)}
                        errorMessage={err2?'Ingresar correctamente el codigo de seguimiento':null}
                    />
                    <Button
                        titleStyle={styles.bTitle}
                        containerStyle={styles.bContainer}
                        title="Ingresar"
                        type="outline"
                        onPress={()=>{this.changeUser()}}
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
