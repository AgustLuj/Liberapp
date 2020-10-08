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
        let noticias = [{"_id":"5f75b6776ae56408e8adf3aa","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:59:03.610Z","__v":0},{"_id":"5f75b6766ae56408e8adf3a8","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:59:02.302Z","__v":0},{"_id":"5f75b6746ae56408e8adf3a6","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:59:00.647Z","__v":0},{"_id":"5f75b6736ae56408e8adf3a4","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:59.364Z","__v":0},{"_id":"5f75b6716ae56408e8adf3a2","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:57.172Z","__v":0},{"_id":"5f75b66f6ae56408e8adf3a0","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:55.569Z","__v":0},{"_id":"5f75b66e6ae56408e8adf39e","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:54.010Z","__v":0},{"_id":"5f75b66c6ae56408e8adf39c","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:52.461Z","__v":0},{"_id":"5f75b66a6ae56408e8adf39a","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:50.446Z","__v":0},{"_id":"5f75b6686ae56408e8adf398","title":"Bienvenido","text":"Gracias por utilizar esta aplicacion","author":{"verificado":true,"admin":true,"_id":"5f24a4e9ac12c01e74455404","username":"AgustLuj","name":"Topodorni","dni":"111239"},"Date":"2020-10-01T10:58:48.734Z","__v":0}]
        User.allnews((err,d)=>{
            if(err){
                this.setState({'errg':true});
            }else{
                console.log(d[0].tittle)
            }
        })
    }
    render(){
        
        let {name,dni,imagen,verificado,admin,errg} = this.state;
        let link =`http://localhost:3000/img/topodorni.jpg`;

        /*for (let i = 0; i < 10; i++) {
            noticias.push(
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'black' }}>
                    <Text style={styles.ttitle}>Anuncio de Marcha</Text>
                    <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>El dia 8 de noviembre se va a realizar una marcha en el obelsico y en cada parte de argentina no sean tibios y vayan</Text>
                </View>
            ) 
        }*/
        /*<ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',borderBottomWidth:1,borderBottomColor:'black' }}>
                                <Text style={styles.ttitle}>Encuenta</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>Vota al mejor</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Impresoradorni</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>General blanoc</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>che Adorni</Text>    
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Adorni Enojado</Text> 
                            </View>
                        {noticias}
                    </ScrollView>  */
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
                    {errg?<Text style={{color:'red'}}>Algo Salio mal intentar nuevamente</Text>:null}
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',borderBottomWidth:1,borderBottomColor:'black' }}>
                                <Text style={styles.ttitle}>Encuenta</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>Vota al mejor</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Impresoradorni</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>General blanoc</Text>  
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>che Adorni</Text>    
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('8%')}}>Adorni Enojado</Text> 
                            </View>
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
