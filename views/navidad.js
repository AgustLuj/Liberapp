import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity, Image, Alert,SafeAreaView,StatusBar,Platform,PermissionsAndroid,ActivityIndicator, } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import { Input, Text, Button } from 'react-native-elements';
import { Header,ListItem, Icon } from 'react-native-elements';
import SavePhoto from '../components/savePhotos';
import savePhotos from '../components/savePhotos';

speed();
var userData;
async function speed (){
    userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
class Navidad extends Component{
    constructor(props){
        super(props);
        this.state= {
          name:null,
          uri:false,
        }
        
    }
    async navidad(){
      global.navidad=false;
      await User.navidad( async(d)=>{
        if(d){
          this.setState({uri:true});
          global.navidad=false;
          await AsyncStorage.setItem(
            'Navidad',
            JSON.stringify({'Navidad':true})
          );
        }else{
          this.setState({uri:false});
          global.navidad=false;
        }
      })
    }
    async savephoto(){
      SavePhoto.handleDownload(`https://adordni.ml/img/${global.value.username}${global.value.dni}Navidad.png`,()=>{
        this.props.navigation.goBack();
      })
    }
    /*<View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'#eb4d4b', fontSize:hp("10%")}}>Feliz Navidad</Text>
                        <Text style={{fontSize:hp("3%")}}>Ojala que estas navidades las puedan pasar en familia o junto con personas que aprecias para todos juntos disfrutar algo juntos de este año que fue de locos</Text>
                        <Button
                            titleStyle={styles.bTitle}
                            containerStyle={styles.bContainer}
                            title="Generar regalo"
                            type="outline"
                            onPress={()=>{this.handleDownload}}
                        />
                    </View>
                </View>
                <View>
                    <Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:`https://i.pinimg.com/originals/99/f9/96/99f996d8c2d9c5890f12457a570f093d.jpg`}} />  
                */
    render(){
        const {url, saving,uri} = this.state;
        return (
            <View style = {{flex:1, backgroundColor:'#7bed9f',justifyContent:'space-between'}}>
                <View>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
                        centerComponent={{ text: 'Evento de Navidad', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                        containerStyle={{
                            backgroundColor: '#eb4d4b',
                            justifyContent: 'space-around',
                            borderBottomColor:'#eb4d4b',
                        }}
                    />
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color:'#eb4d4b', fontSize:hp("10%")}}>Feliz Navidad</Text>
                        <Text style={{fontSize:hp("3%")}}>Ojala que estas navidades las puedan pasar en familia o junto con personas que aprecias para todos juntos disfrutar algo juntos de este año que fue de locos</Text>
                        {(uri)?<View style={{justifyContent: 'center', alignItems: 'center'}}><Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:`https://adordni.ml/img/${global.value.username}${global.value.dni}Navidad.png`}} />
                                <Button
                            titleStyle={styles.bTitle}
                            containerStyle={{
                              width:wp('70%'),
                              backgroundColor:'#eb4d4b',
                              borderWidth: 1,
                              borderTopLeftRadius: 20,
                              borderTopRightRadius: 20,
                              justifyContent: 'center', alignItems: 'center'
                          }}
                            title="Guardar Carnet"
                            type="outline"
                            onPress={()=>this.savephoto()}
                        /></View>:<Button
                        titleStyle={styles.bTitle}
                        containerStyle={styles.bContainer}
                        title="Generar regalo"
                        type="outline"
                        onPress={()=>{this.navidad()}}
                    />}   
                    </View>
                </View>
                
                <View>
                    
                </View>
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
    bContainer:{
        width:wp('70%'),
        margin:hp('5%'),
        backgroundColor:'#eb4d4b',
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center', alignItems: 'center'
    },
    bTitle:{
        fontSize:hp('5%'),
        color:'white',
        margin:0,
        padding:0,
    },
    dni:{
      height: hp('40%'), width: wp('100%')
  },
});

export default Navidad
