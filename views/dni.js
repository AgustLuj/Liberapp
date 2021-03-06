import React, { Component } from 'react';
import { StyleSheet, View, Image,ScrollView} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-async-storage/async-storage' 
import { Header } from 'react-native-elements';
import SavePhoto from '../components/savePhotos';
import { Input, Text, Button } from 'react-native-elements';

class login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    async savephoto(link){
        SavePhoto.handleDownload(link,()=>{
          this.props.navigation.goBack();
        })
      }
    async componentDidMount(){
        const {name,dni,imagen,seguimiento} =JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.setState({
            name,
            dni,
            imagen,
            seguimiento
        })
        /*await User.online((d)=>{
            if(d){
                if(this.'name' === null){
                    this.props.navigation.navigate('Login')
                }
            } 
        })*/
    }
    render(){
        let {name,dni,imagen,seguimiento} = this.state
        Image.resolveAssetSource(link);
        let link =`https://adordni.ml/img/${imagen}`;
        let link2 =`https://adordni.ml/img/2${imagen}`;
            return (
                <View style = {{flex:1}}>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'home', color: '#fff' ,onPress: () => this.props.navigation.navigate('Home'),}}
                        centerComponent={{ text: 'Carnet', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                        rightComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer(), }}
                        containerStyle={{
                            backgroundColor: '#f6b93b',
                            justifyContent: 'space-around',
                            borderBottomColor:'#bdc3c7',
                        }}
		            />
                    <ScrollView style={{flex: 1,flexDirection: 'column'}}>
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                        <Text style={styles.text}>Tu Dni es: {global.value.dni} </Text>
                        <Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:`https://adordni.ml/img/${imagen}`}} />
                        <Button
                              titleStyle={styles.bTitle}
                              containerStyle={{
                                width:wp('30%'),
                                backgroundColor:'#f6b93b',
                                borderWidth: 1,
                                borderRadius: 20,
                                justifyContent: 'center', alignItems: 'center'
                              }}
                              title="Guardar Carnet"
                              type="outline"
                              onPress={()=>this.savephoto(`https://adordni.ml/img/${imagen}`)}
                            />
                        {(global.navidad)?<View style = {{flex: 1,backgroundColor: 'white',alignItems:'center'}} ><Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:`https://adordni.ml/img/${global.value.username}${global.value.dni}Navidad.png`}} />
                                 <Button
                              titleStyle={styles.bTitle}
                              containerStyle={{
                                width:wp('30%'),
                                backgroundColor:'#f6b93b',
                                borderWidth: 1,
                                borderRadius: 20,
                                justifyContent: 'center', alignItems: 'center'
                              }}
                              title="Guardar Carnet"
                              type="outline"
                              onPress={()=>this.savephoto(`https://adordni.ml/img/${global.value.username}${global.value.dni}Navidad.png`)}
                            /></View>:null}
                   
                    </View>
                    </ScrollView>
                </View>);
            }
}
    
const styles = StyleSheet.create({
    dni:{
        height: hp('40%'), width: wp('100%')
    },
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
    bTitle:{
        fontSize:hp('2%'),
        color:'white',
        margin:0,
        padding:0,
    },
    text:{
        color:'black',
        fontSize:hp('2%'),
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
