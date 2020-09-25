import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import { Header } from 'react-native-elements';
class News extends Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }
    async componentDidMount(){
        const {name,dni,imagen,verificado,admin} =JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.setState({
            name,
            dni,
            imagen,
            verificado,
            admin
        })
    }
    render(){
        
        let {name,dni,imagen,verificado,admin} = this.state;
        let link =`http://localhost:3000/img/topodorni.jpg`;
        var noticias = [];
        for (let i = 0; i < 10; i++) {
            noticias.push(
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'black' }}>
                    <Text style={styles.ttitle}>Anuncio de Marcha</Text>
                    <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>El dia 8 de noviembre se va a realizar una marcha en el obelsico y en cada parte de argentina no sean tibios y vayan</Text>
                </View>
            ) 
        }
        return (
            <View style = {{flex:1}}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'home', color: '#fff' ,onPress: () => this.props.navigation.navigate('Home'),}}
                    centerComponent={{ text: 'Noticias', style: { color: '#fff',fontSize:hp('3.5%'), } }}
                    rightComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer(), }}
                    containerStyle={{
                        backgroundColor: '#f6b93b',
                        justifyContent: 'space-around',
                    }}
                />
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',borderBottomWidth:1,borderBottomColor:'black' }}>
                                <Text style={styles.ttitle}>Encuenta</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>Vota al mejor</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Impresoradorni</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>General blanoc</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>che Adorni</Text>    
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Adorni Enojado</Text> 
                            </View>
                        {noticias}
                    </ScrollView>  
                </View>
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
        //marginTop:hp('10%'),
        //marginBottom:hp('5%')
        //textShadowColor: "red",
    },
    dni:{
        height: hp('23%'), 
        width: wp('40%'),
        borderWidth:1,
        borderColor:'black',
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

export default News
