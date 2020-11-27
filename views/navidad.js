import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity, Image, Alert,SafeAreaView,StatusBar,Platform,PermissionsAndroid,ActivityIndicator, } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import { Input, Text, Button } from 'react-native-elements';
import { Header,ListItem, Icon } from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

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
        }
        
    }
    async getPermissionAndroid(){
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Image Download Permission',
              message: 'Your permission is required to save images to your device',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          }
          Alert.alert(
            'Save remote Image',
            'Grant Me Permission to save Image',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } catch (err) {
          Alert.alert(
            'Save remote Image',
            'Failed to save Image: ' + err.message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
    }
    async handleDownload(){
        if (Platform.OS === 'android') {
            const granted = await this.getPermissionAndroid();
            if (!granted) {
              return;
            }
          }
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
          })
            .fetch('GET', 'https://adordni.ml/img/AgustLuj111239.png')
            .then(res => {
                CameraRoll.save(res.data, 'photo')
                .then(() => {
                  Alert.alert(
                    'Save remote Image',
                    'Image Saved Successfully',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                })
                .catch(err => {
                  Alert.alert(
                    'Save remote Image',
                    'Failed to save Image: ' + err.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                })
                .finally(() => this.setState({saving: false}));
            })
            .catch(error => {
              this.setState({saving: false});
              Alert.alert(
                'Save remote Image',
                'Failed to save Image: ' + error.message,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
              );
            });     
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
        const {url, saving} = this.state;
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
                        <Button
                            titleStyle={styles.bTitle}
                            containerStyle={styles.bContainer}
                            title="Generar regalo"
                            type="outline"
                            onPress={()=>{this.handleDownload()}}
                        />
                    </View>
                </View>
                <View>
                    <Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:`https://i.pinimg.com/originals/99/f9/96/99f996d8c2d9c5890f12457a570f093d.jpg`}} />
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
    },
    bTitle:{
        fontSize:hp('5%'),
        color:'white',
        margin:0,
        padding:0,
    },
});

export default Navidad
