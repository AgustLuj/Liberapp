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

        this.segRegex=/[0-9]*-[0-9]*/;

        this.state = {
            f:(this.props.route.params != null)?true:false,
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
                        if(this.seg === ''){
                            this.changeDb(this.dni,this.name,this.user,this.seg,this.segOld);
                        }else{
                          await this.checkSeg(this.seg,async(d)=>{
                            if(d){
                                this.changeDb(this.dni,this.name,this.user,this.seg,this.segOld);                   
                            }else{
                                this.setState({'err2':true})  
                            }
                            
                        });  
                        }
                        
                        
                    }else{
                        this.setState({'err':true})
                    }  
                })
            }else{
                this.setState({'err':true})
            }
            
        });
    }
    async changeDb(dni,name,user,seg,segOld){
        await User.changeUser(dni,name,user,seg,segOld,async (f)=>{
            if(f){
                await AsyncStorage.removeItem('@UserData');
                this.props.navigation.replace('LoginFinish')
            }else{
                this.setState({'errg':true})
            }
        })
    }
    checkSeg(d,fn){
        if(!this.segRegex.test(d)){
            fn(false)
        }else{
            fn(true)
            
        }
    }
    render(){
            let {name,dni,username,err,err2,errg} = this.state;
            return (
                <View style = {{flex:1,backgroundColor:"white"}}>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
                        centerComponent={{ text: 'Configuracion', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                        containerStyle={{
                            backgroundColor: '#f6b93b',
                            justifyContent: 'space-around',
                            borderBottomColor:'#bdc3c7',
                        }}
                        
		            />
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center',marginTop:hp("3%"),marginLeft:hp("2%"),marginRight:hp("2%")}}>
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
                        onChangeText={text => this.name=text}
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
                        onChangeText={text => this.user=text}
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
                        onChangeText={text => this.seg=text}
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
                        onChangeText={text => this.segOld=text}
                        errorMessage={err2?'Ingresar correctamente el codigo de seguimiento':null}
                    />
                    <Button
                        titleStyle={styles.bTitle}
                        containerStyle={styles.bContainer}
                        title="Cambiar datos"
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
