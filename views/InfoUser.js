import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity, ScrollView,RefreshControl } from 'react-native';
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
            cargando:true,
            errg:false,
            f:true,
        }
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({cargando:true})
        this.noticias = []
        this.loadUsers(()=>{
            this.setState({refreshing: false});
        });
    }
    render(){
            userData = global.value;
            let {hola}=this.props.route.params;
            let {cargando,errg,f,_id} = this.state;
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

            <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                        }>
                        <View>
                            <Text style={styles.ttitle}>El usuario {hola} fue registrado correctamente</Text>
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.8%')}}>Dni:</Text>  
                            <Text style={{color:'black',fontSize:hp('3%'),marginTop:hp('1.5%')}}>Seguimiento:</Text>
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
        //alignItems: 'Left',
        //justifyContent: 'center',
    },
    ttitle:{
        color:'black',
        fontSize:hp('5%'),
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
