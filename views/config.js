import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
import AsyncStorage  from '@react-native-async-storage/async-storage' 

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
    async changeUser(){/// re hacer config a base de search.js
        if((this.segOld == null )||(this.name.length === 0 && this.user.length === 0 && this.seg.length === 0)){
            this.setState({'errg':true})
            return null;
        }
        this.setState({'errg':false})
        if(this.segRegex.test(this.segOld)){
            this.setState({'err':false});
            this.setState({'err2':false});
            if(!this.segRegex.test(this.seg) && this.seg.length != 0 ){
                this.setState({'err2':true});
                return null;
            }
            this.changeDb(this.name,this.user,this.seg,this.segOld);
            return null;
        }else{
            this.setState({'err':true})  
            return null;
        }
        /*await this.checkSeg(this.segOld,async (d)=>{
            console.log(this.segOld);
            if(d){
                await User.checkPass(this.segOld,async(e)=>{
                    if(e){
                        if(this.seg === ''){
                            this.changeDb(this.name,this.user,this.seg,this.segOld);
                        }else{
                            await this.checkSeg(this.seg,async(f)=>{
                                if(f){
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
            
        });*/
    }
    /*async searchUser(){
        
        if((this.dni == null && this.user == null)||(this.dni.length === 0 && this.user.length === 0)){
            this.setState({'errD':true})
            this.setState({'err2':true})
            return null
        }
        if(this.seg != null){
            if(this.state.errD)this.setState({'errD':false});            
            if(this.state.err2)this.setState({'err2':false});

            if(!this.segRegex.test(this.seg)){
                this.setState({'errS':true})
                console.log('hola2')
                return null
            }
            

            if(!this.dniregex.test(this.dni) && this.dni.length != 0){
                this.setState({'errD':true})
                return null;
            }
            this.setState({info:null})
            await User.checkPass(this.seg,async(e)=>{
                if(e){
                    if(this.state.errS)this.setState({'errS':false});
                    User.search(this.dni,this.user,(d,user)=>{
                        if(d){
                            this.setState(user);
                            this.setState({search:true});
                        }else{
                            this.setState({info:user})
                        }
                    })         
                }else{
                    this.setState({'errS':true})
                    return null
                }  
            })
             
        }else{
            if(!(this.segRegex.test(this.seg))||this.seg === null){
                this.setState({'errS':true})
                console.log('hola1')
                return null
            }
        }
    }*/
    async changeDb(name,user,seg,segOld){
        await User.changeUser(name,user,seg,segOld,async (f)=>{
            if(f){
                await AsyncStorage.removeItem('@UserData');
                this.props.navigation.replace('LoginFinish')
            }else{
                this.setState({'errg':true})
            }
        })
    }
    checkSeg(d,fn){
        if(d != null || d.length !== 0){
            if(!this.segRegex.test(d)){
                fn(false)
            }else{
                fn(true)
            }
        }else{
            fn(false)
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
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center',marginTop:hp("2%"),marginLeft:hp("2%"),marginRight:hp("2%")}}>
                    {errg?<Text style={{color:'red',marginBottom:hp('1%')}}>Ingrese un nuevo Seguimiento o Nombre o Usuario</Text>:null}
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
                        onChangeText={text => this.segOld=text}
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
                        onChangeText={text => this.seg=text}
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
