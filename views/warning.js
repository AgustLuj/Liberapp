import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import { Input, Text, Button } from 'react-native-elements';
import { Header,ListItem, Icon } from 'react-native-elements';

speed();
var userData;
async function speed (){
    userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
class List_Options extends Component{
    constructor(props){
        super(props);
        this.state= {
          name:null,
        }
    }
    render(){
        
        
        return (
            <View style = {{flex:1}}>
                <Header
				placement="left"
				leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
				centerComponent={{ text: 'Actuzalizar', style: { color: '#fff',fontSize:hp('3.5%'), } }}
				containerStyle={{
					backgroundColor: '#f6b93b',
          justifyContent: 'space-around',
          borderBottomColor:'#bdc3c7',
				}}
			/>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'red', fontSize:hp("10%")}}>Atencion</Text>
                <Text style={{fontSize:hp("3%")}}>Tiene que ingresar a adordni.ml y ingresar sus datos nuevamente su usuario, foto y dni para que se le actualizen los datos</Text>
                <Button
                    titleStyle={styles.bTitle}
                    containerStyle={styles.bContainer}
                    title="Atras"
                    type="outline"
                    onPress={()=>{this.props.navigation.goBack()}}
                />
            </View>
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
    bContainer:{
        width:wp('70%'),
        margin:hp('5%'),
        backgroundColor:'#f6b93b',
    },
    bTitle:{
        fontSize:hp('5%'),
        color:'white',
        margin:0,
        padding:0,
    },
});

export default List_Options
