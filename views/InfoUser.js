import React, { Component,useEffect } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity, ScrollView,RefreshControl,Alert } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import { Input, Text, Button } from 'react-native-elements';
import { Header,ListItem, Icon } from 'react-native-elements';

speed();
var userData;
async function speed (){
    //userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
class List_Options extends Component{
    constructor(props){
        super(props);
        this.userNews=[]
        this.state= {
            cargando:false,
            errg:false,
            title:`El usuario ${this.props.route.params.username} quiere ingresar a la comunidad`,
            msg1:`Antes de aceptar porfavor revisa su twitter para evitar usuarios falsos, bots o personas ajenas a nuestra lucha`,
            msg2:`Este usuario merece ser agregado a nuestra comunidad?\nEsta accion no tiene marcha atras y serás responsable de este usuario \n\n`,
            msg3:`Name:${this.props.route.params.name}\nUsername:${this.props.route.params.username}\nEspecie:${this.props.route.params.especie}\n`,
            f:false,

        }
    }
    async rejectUser(id){
        this.setState({cargando:true});
        await User.rejectUser(global.value._id,id,(err,usera)=>{
            if(!err){
                if(usera){
                    let title = `El usuario ${this.props.route.params.username} fue rechazado en la comunidad`;
                    let msg1 ='Esta decicion puede ser cambiada en un futuro';
                    let msg2 = ''
                    let msg3 = '';
                    this.setState({cargando:false,title,msg1,msg2,msg3,f:true});
                }
                
                //console.log(usera);
            }else{
                this.setState({cargando:true,errg:true});
            }
        })
    }
    async acceptUser(id){
        this.setState({cargando:true})
        await User.acceptUser(global.value._id,id,(err,usera)=>{
            if(!err){
                let title = `El usuario ${this.props.route.params.username} fue aceptado en la comunidad`;
                let msg1 ='';
                let msg2 = ''
                let msg3 = `Los datos nuevos de ${this.props.route.params.username} son : \n\nDni:${usera.dni}\n\nSeguimineto : ${usera.seg}\n`;
                this.setState({cargando:false,title,msg1,msg2,msg3,f:true});
                //console.log(usera);
            }else{
                this.setState({cargando:true,errg:true});
            }
        })
        //console.log(id);
        //this.props.navigation.replace("add_user");
    }
    render(){
            userData = global.value;
            let {username,name,_id,especie}=this.props.route.params;
            let {cargando,errg,f,title,msg1,msg2,msg3} = this.state;
        return (
            <View style = {{flex:1}}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
                    centerComponent={{ text: 'Añadir Usuarios', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                    containerStyle={{
                        backgroundColor: '#f6b93b',
                        justifyContent: 'space-around',
                        borderBottomColor:'#bdc3c7',
                    }}
			    />

            <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                {(!cargando)?
                        <View>
                            <View>
                                <Text style={styles.ttitle}>{title}</Text>
                                <Text style={{color:'red',fontSize:hp('2%'),marginTop:hp('1.8%')}}>{msg1}</Text>  
                                <Text style={{color:'red',fontSize:hp('2%'),marginTop:hp('1.8%')}}>{msg2} </Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.8%')}}>{msg3}</Text>  
                            </View>
                            {!f?<View style={{flexDirection:'row',justifyContent:'space-around'}}>  
                                <Button
                                    titleStyle={styles.bTitle}
                                    containerStyle={styles.bContainer}
                                    title="Aceptar"
                                    type="outline"
                                    onPress={()=>{this.acceptUser(_id)}}
                                />
                                <Button
                                    titleStyle={styles.bTitle}
                                    containerStyle={styles.bContainer}
                                    title="Cambiar"
                                    type="outline"
                                    onPress={()=>{/*this.props.navigation.navigate("Config",this.props.route.params)*/
                                    Alert.alert(
                                        "Avertencia",
                                        "Funcion en construccion",
                                      )}}
                                />
                                <Button
                                    titleStyle={styles.bTitle}
                                    containerStyle={styles.bContainer}
                                    title="Rechazar"
                                    type="outline"
                                    onPress={()=>{this.rejectUser(_id)}}
                                /> 
                            </View>:<Button
                                titleStyle={styles.bTitle}
                                containerStyle={styles.bContainer}
                                title="Volver"
                                type="outline"
                                onPress={()=>{this.props.navigation.goBack()}}
                            /> }
                            
                        </View>
                        
                    :errg?<View>
                            <Text style={styles.ttitle}>Algo Salio mal intentar nuevamente{"\n"}</Text>
                            <Button
                                titleStyle={styles.bTitle}
                                containerStyle={styles.bContainer}
                                title="Volver"
                                type="outline"
                                onPress={()=>{this.props.navigation.goBack()}}
                            /> 
                        </View>
                    :<Text style={styles.ttitle}>Cargando</Text>}      
            </ScrollView>
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7f8c8d',
        //alignItems: 'Left',
        //justifyContent: 'center',
    },
    bTitle:{
        fontSize:hp('2.5%'),
        color:'white',
        margin:0,
        padding:0,
    },
    bContainer:{
        width:wp('30%'),
        backgroundColor:'#f6b93b',
        justifyContent:'flex-start'
    },
    ttitle:{
        color:'black',
        fontSize:hp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop:hp('10%'),
        //marginBottom:hp('5%')
        //textShadowColor: "red",
    },
    dni:{
        height: hp('23%'), 
        width: wp('40%'),
    },
    text:{
        color:'black',
        fontSize:hp('3%'),
        //marginTop:hp('1%'),
        //marginBottom:hp('0.1%'),
        //alignItems: 'center',
        //textAlign:"center",
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

export default List_Options
