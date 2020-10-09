import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import { Header } from 'react-native-elements';
class login extends Component{
    constructor(props){
        super(props);
        this.name='';
        this.dni = '';
        this.imagen='';
        this.verificado=''
        this.admin=''
        this.imgP=''

        this.data();
        this.state = {

        }
    }
    async componentDidMount(){
        let {name,dni,imagen,verificado,admin,imgP} = JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.setState({
            name,
            dni,
            imagen,
            verificado,
            admin,
            imgP
        })
        await User.getOnlyData(dni,async (d,user)=>{
            if(d){
                try{
                    await AsyncStorage.mergeItem(
                        '@UserData',
                        JSON.stringify(user)
                      );
                    /*await AsyncStorage.setItem(
                        '@UserData',
                        JSON.stringify(user)
                    );*/
                    this.data()
                }catch{
                    this.data()
                }
            }else{
                this.data()
            }
        })
    }
    async data(){
        let {name,dni,imagen,verificado,admin,imgP} = JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.name=name;
        this.dni = dni;
        this.imagen=imagen;
        this.verificado=verificado;
        this.admin=admin;
        this.imgP=imgP
        this.setState({
            name,
            dni,
            imagen,
            verificado,
            admin,
            imgP
        })
        
    }
    render(){
        let {name,dni,verificado,admin} = this.state;
        //this.getData();
        var noticias = [];
        for (let i = 0; i < 5; i++) {
            noticias.push({
                title:'Anuncio de Marcha',
                text:'El dia 8 de noviembre se va a realizar una marcha en el obelsico y en cada parte de argentina no sean tibios y vayan'
                }
            ) 
        }
        let link =`https://adordni.ml/img/${this.imgP}`;
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
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                    <View style = {{flex: 0.9,backgroundColor: 'white',flexDirection: 'row'}}>
                        <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'row'}}>
                        <Image 
                            resizeMode="contain" 
                            style={styles.dni} 
                            source={{
                                uri:link}} />
                        </View>
                        <View style = {{flex: 1.45,backgroundColor: 'white',flexDirection: 'column'}}>
                            <Text style={styles.ttitle}>Bienvenido!!</Text>    
                            <Text style={styles.text}>{name}</Text>
                            <Text style={styles.text}>Tu dni es:{dni}</Text>
                            {!verificado?<Text style={styles.text}>No esta verificado</Text> :null} 
                            {admin?<Text style={styles.text}>Sos Admin</Text> :null} 
                        </View>
                    </View>
                    <View style = {{flex: 0.2,backgroundColor: 'white',flexDirection: 'row', borderBottomWidth:2,borderBottomColor:'black'}}>
                        <Text style={{color:'black',fontSize:hp('3.5%'),marginTop:hp('1%')}}>Noticias</Text>                       
                    </View>
                    <View style = {{flex: 2.3,backgroundColor: 'white',flexDirection: 'column'}}>
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                        {noticias.map(({title,text})=>{
                            return(
                            <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'black' }}>
                                <Text style={styles.ttitle}>{title}</Text>
                                <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>{text}</Text>
                            </View>
                            )
                        })}
                    </ScrollView>
                        
                    </View>
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

export default login
