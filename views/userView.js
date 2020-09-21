import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import { Header } from 'react-native-elements';
class login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    async componentDidMount(){
        const {name,dni,imagen} =JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.setState({
            name,
            dni,
            imagen
        })
        /*await User.online((d)=>{
            if(d){
                if(this.'name' === null){
                    this.props.navigation.navigate('Login')
                }
            } 
        })*/
    }
    componentDidUpdate(){
        //this.name= true;
        /*<Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:link}} />*/
        //console.log(this.props.route)
    }
    render(){
        
            let {name,dni,imagen} = this.state;
            //let {name,imagen} = this.props.navigation.route.params.d;
            //console.log(this.props)
            let link =`https://adordni.ml/img/2${imagen}`;
            return (
                
                <View style = {{flex:1}}>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'home', color: '#fff' ,onPress: () => this.props.navigation.navigate('Home'),}}
                        rightComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer(), }}
                        containerStyle={{
                            backgroundColor: '#f6b93b',
                            justifyContent: 'space-around',
                        }}
		            />
                    <View style = {{flex: 10,backgroundColor: 'white',alignItems:'center'}}>
                        <Text style={styles.text}>Bienvenido nuevamente {name} </Text>
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
    ttitle:{
    color:'black',
    fontSize:hp('8%'),
    marginTop:hp('10%'),
    marginBottom:hp('5%')
    //textShadowColor: "red",
    },
    dni:{
        height: hp('40%'), width: wp('100%')
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
