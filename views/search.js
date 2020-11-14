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
        this.dni='';
        this.user='';
        this.dniregex=/\d\d\d\d\d\d/;
        this.segRegex=/[0-9]*-[0-9]*/;

        this.state = {
            search:false,
            errD:false,
            err2:false,
        }
    }
    async searchUser(){
        
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
    }
    checkSeg(d,fn){
        if(d != null){
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
            let {name,dni,username,verificado,editor,carnet,err,err2,errg,errD,errS,search,cargando,info}= this.state;
            //console.log(this.state);
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
                    <View style = {{flex: 1.5,backgroundColor: 'white',marginTop:hp("3%"),marginLeft:hp("2%"),marginRight:hp("2%")}}>
                    {errg?<View>
                            <Text style={{color:'red'}}>Algo Salio mal intentar nuevamente{'\n'}</Text>
                            <Button
                                titleStyle={styles.bTitle}
                                containerStyle={styles.bContainer}
                                title="Volver"
                                type="outline"
                                onPress={()=>{this.props.navigation.goBack()}}
                            /> 
                        </View>:(cargando)?<View style={{alignItems:'center'}}><Text style={styles.ttitle}>{errg?'Algo Salio mal intentar nuevamente':'Cargando'}</Text></View>:
                    (!search)?<View>
                        {(info!=null)?<Text style={{color:'red'}}>{info}{'\n'}</Text>:null}
                        <Text style={{color:'red',fontSize:hp('2%')}}>Es necesario ingresar cualquiera de los dos puede ser el dni o el username y tu numero de seguimiento</Text>
                        <Text style={{color:'red'}}>Algo Salio mal intentar nuevamente{'\n'}</Text> 
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
                            onChangeText={text => this.dni=text}
                            errorMessage={errD?'Formato del Dni incorrecto':null}
                        />
                    
                        <Input
                            containerStyle={styles.tImput}
                            placeholder='LiiberApp'
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
                            errorMessage={err2?'Debe ingresar algo si deja el dni vacio':null}
                        />
                        <Input
                            containerStyle={styles.tImput}
                            label="N° de seguimiento propio"
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
                            errorMessage={errS?'Codigo de seguimiento incorrecto':null}
                        />
                        <Button
                            titleStyle={styles.bTitle}
                            containerStyle={styles.bContainer}
                            title="Buscar datos"
                            type="outline"
                            onPress={()=>{this.searchUser()}}
                        />
                    </View>:
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                            <Text style={styles.ttitle}>Datos recuperados</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.8%')}}>Dni:{dni}</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.8%')}}>Name:{name}</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Username:{username}</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Verificado:{(!verificado)?'No':'Si'}</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Editor:{(!editor)?'No':'Si'}</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Carnet:{(!carnet)?'No':'Si'}</Text>
                        </View>
                        <Button
                                titleStyle={styles.bTitle}
                                containerStyle={styles.bContainer}
                                title="Volver"
                                type="outline"
                                onPress={()=>{this.props.navigation.goBack()}}
                            />
                    </ScrollView>}
                    
                    </View>
                    
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
