import React, { Component } from 'react';
import { StyleSheet, View,ScrollView} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button } from 'react-native-elements';
import AsyncStorage  from '@react-native-community/async-storage' 

class Search extends Component{
    constructor(props){
        super(props);
        this.name='';
        this.user='';
        this.seg='';
        this.dni='';

        this.dniregex=/\d\d\d\d\d\d/;
        this.segRegex=/[0-9]*-[0-9]*/;

        this.state = {
        }
    }
    async searchUser(){
        if(this.dni != ''&& this.dniregex.test(this.dni)){
            this.setState({'errD':false})
            console.log(this.seg)
            if(this.seg != '' && this.segRegex.test(this.seg)){
                this.setState({'errS':false})
                if(this.dni != null && this.seg != null){
                    console.log("hola")
                }else{
                    this.setState({'errS':true})
                }
            }else{
                this.setState({'errS':true,'info':" "})
            }
        }else{
            this.setState({'errD':true,'info':" "})
        }
    }
    checkSeg(d,fn){
        if(!this.segRegex.test(d)){
            fn(false)
        }else{
            fn(true)
            
        }
    }
    searchName(text){
        this.dni=text;
    }
    searchUserText(text){
        this.user=text;
    }
    searchSeg(text){
        this.seg=text;
    }
    render(){
            let {name,dni,username,err,err2,errg,errD,errS}= this.state
            return (
                <View style = {{flex:1,backgroundColor:"white"}}>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
                        centerComponent={{ text: 'Buscar', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                        containerStyle={{
                            backgroundColor: '#f6b93b',
                            justifyContent: 'space-around',
                            borderBottomColor:'#bdc3c7',
                        }}
                        
		            />
                    <View style = {{flex: 1.5,backgroundColor: 'white',alignItems:'center',marginTop:hp("3%"),marginLeft:hp("2%"),marginRight:hp("2%")}}>
                    {errg?<Text style={{color:'red'}}>Algo Salio mal intentar nuevamente</Text>:null}
                    <Input
                        containerStyle={styles.tImput}
                        placeholder='100000'
                        label="Dni:"
                        leftIcon={
                            <Icon
                                name='address-card-o'
                                size={24}
                                color='#f6b93b'
                            />
                        }
                        onChangeText={text => this.searchName(text)}
                        errorMessage={errD?'Formato del Dni incorrecto':null}
                    />
                    <Input
                        containerStyle={styles.tImput}
                        placeholder='Ingresar Username'
                        label="Usuario:"
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='#f6b93b'
                            />
                        }
                        maxLength={40}
                        onChangeText={text => this.searchUserText(text)}
                        errorMessage={err?'Usermame no existe':null}
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
                        onChangeText={text => this.searchSeg(text)}
                        errorMessage={errS?'Codigo de seguimiento incorrecto':null}
                    />
                    <Button
                        titleStyle={styles.bTitle}
                        containerStyle={styles.bContainer}
                        title="Buscar datos"
                        type="outline"
                        onPress={()=>{this.searchUser()}}
                    />
                    </View>
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column', borderTopWidth:3,borderTopColor:'#bdc3c7'}}>
                            <Text style={styles.ttitle}>Datos recuperados</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.8%')}}>Dni:</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Username:</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Verificado:</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Editor:</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Carnet:</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Datos Actualizados:</Text>
                        </View>
                    </ScrollView> 
                </View>
                
                
                );
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
        fontSize:hp('3%'),
        color:'white',
        margin:0,
        padding:0,
    },
    bContainer:{
        width:wp('60%'),
        backgroundColor:'#f6b93b',
    },
    ttitle:{
        color:'black',
        fontSize:hp('5%'),
        //marginTop:hp('10%'),
        //marginBottom:hp('5%')
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

export default Search
