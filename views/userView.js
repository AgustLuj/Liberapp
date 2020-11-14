import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,ScrollView,RefreshControl } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import { Header } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Progress from 'react-native-progress';

speed();
let userData;
async function speed (){
    userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
    /*userData = AsyncStorage.getItem('@UserData')
    setInterval(async ()=>{
          if(await AsyncStorage.getItem('@UserData') != null){
                clearInterval(this);
                this.setState({f:true});
            }else{
                this.setState({f:true});
                clearInterval(this);
                this.count= 0;
            }
    },400);*/
}
class login extends Component{
    constructor(props){
        super(props);
        this.loadNews(()=>{
            this.setState({value:11})
        });
        this.noticias = [];
        this.name=global.value.name;
        this._id=global.value._id;
        this.dni =global.value.dni;
        this.imagen=global.value.imagen;
        this.verificado=global.value.verificado;
        this.admin=global.value.admin;
        this.imgP=global.value.imgP;
        this.state = {
            cargando:true,
            errg:false,
            _id:global.value._id,
            name:global.value.name,
            dni: global.value.dni,
            f:true,
            imagen: global.value.imagen,
            verificado: global.value.verificado,
            admin: global.value.admin,
            imgP:global.value.imgP
        }
    }
    async loadNews(fn){
        await User.newsHome((err,d)=>{
            if(!err){
                this.setState({'errg':true});
            }else{
                
                d.forEach(element => {
                    if(element !=  null){
                        if(null != element.options){// cambiar a type
                            element.options.candidates.forEach(({_id},i)=>{
                                element.options.candidates[i].value=_id
                            })
                        }
                        this.noticias.push(element);
                        this.setState({cargando:true})
                    }  
                });
                
                setTimeout(()=>{
                    this.setState({f:false})
                },800)
                this.setState({cargando:false})
            }
        });
        fn()
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({cargando:true})
        this.noticias = []
        this.loadNews(()=>{
            this.setState({refreshing: false});
        });
    }
    async componentDidMount(){
        //this.data();
    }
    async userVote(id,i,j){
        console.log(id);
        User.userVote(id,(err, d)=>{
            //console.log(d);
            this.noticias[i]=d;
            setTimeout(()=>{
                this.setState({f:false})
            },800)
        })
    }
    async data(){
        let {name,dni,imagen,verificado,admin,imgP,_id} = JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.name=name;
        this._id = _id;
        this.dni = dni;
        this.imagen=imagen;
        this.verificado=verificado;
        this.admin=admin;
        this.imgP=imgP
        this.setState({
            _id,
            name,
            dni,
            imagen,
            verificado,
            admin,
            imgP
        })
        
    }
    render(){
        let {cargando,errg,f,_id} = this.state;
        //this.getData();
        /*
        <Text style={styles.text}>LiberCoins: 1000</Text>
        */
        let link =`https://adordni.ml/img/${this.imgP}`;
        var radio_props = [
            {label: 'param1', value: 'Agustin',id:0 },
            {label: 'param2', value: 'Que onda',id:1 }
          ];
        
        const progressCustomStyles = {
        backgroundColor: '#f6b93b', 
        borderColor: 'black',
        };
        return (
            
            <View style = {{flex:1}}>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'home', color: '#fff' ,onPress: () => this.props.navigation.navigate('Home'),}}
                    rightComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer(), }}
                    containerStyle={{
                        backgroundColor: '#f6b93b',
                        justifyContent: 'space-around',
                        borderBottomColor:'#bdc3c7',
                        borderBottomWidth:1
                    }}
                />
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column'}} >
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
                            <Text style={styles.text}>{this.name}</Text>
                            <Text style={styles.text}>Tu dni es:{this.dni}</Text>
                            
                            {!this.verificado?<Text style={styles.text}>No esta verificado</Text> :null} 
                            {this.admin?<Text style={styles.text}>Sos Admin</Text> :null} 
                        </View>
                    </View>
                    <View style = {{flex: 0.3,backgroundColor: 'white',flexDirection: 'row', borderTopWidth:3,borderTopColor:'#bdc3c7'}}>
                        <Text style={{color:'black',fontSize:hp('5%'),marginTop:hp('1%')}}>Noticias</Text>                       
                    </View>
                    <View style = {{flex: 2.3,backgroundColor: 'white',flexDirection: 'column',marginLeft:hp('1.5%')}}>
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                        }>  
                        {(cargando)?<Text style={styles.ttitle}>{errg?'Algo Salio mal intentar nuevamente':'Cargando'}</Text> :

                        this.noticias.map(({title,text,type,options},i)=>{
                            if(type == 1){
                                return(
                                    <View key={i} style = {{flex: 1,backgroundColor: 'white',borderBottomWidth:1,borderBottomColor:'black',paddingBottom:hp('2%')}}>
                                            <Text style={styles.ttitle}>Encuesta</Text>
                                            <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>{text}</Text>
                                            {(options.users.findIndex(({id}) => id == _id )) === -1 ? <RadioForm
                                            formHorizontal={false}
                                            
                                            style={{marginLeft:hp('5%'),marginTop:hp('2%'),marginBottom:hp('1%')}}
                                            >
                                            {}
                                            {options.candidates.map((obj, j) => (
                                                <RadioButton labelHorizontal={true} key={j} >
                                                    {}
                                                    <RadioButtonInput
                                                    obj={obj}
                                                    isSelected={this.state.value3Index === obj._id}
                                                    index={j}
                                                    onPress={(id)=> {
                                                            this.setState({value3Index:obj._id})
                                                            this.userVote(id,i)
                                                        }
                                                    }
                                                    buttonOuterColor={'#f6b93b'}
                                                    buttonInnerColor={'#f6b93b'}
                                                    />
                                                    <RadioButtonLabel
                                                    obj={obj}
                                                    onPress={value=>console.log(j)}
                                                    index={j}
                                                    labelHorizontal={true}
                                                    />
                                                </RadioButton>
                                                ))
                                            }  
                                        </RadioForm>:
                                            options.candidates.map((obj, j) =>{
                                                return(
                                                <View key={j}>
                                                    <Text style={{color:'black',fontSize:hp('2.5%'),marginLeft:hp('5%')}}>{obj.label}</Text>
                                                    <Progress.Bar key={j} 
                                                        progress={(f)?0:(options.votes === 0 )?0:obj.vote/options.votes} 
                                                        width={wp('85%')} color={'#f6b93b'} 
                                                        style={{marginLeft:hp('5%'),marginTop:hp('0.5%'),marginBottom:hp('1%')}} 
                                                        animationType={'spring'}
                                                    />
                                                </View>
                                                
                                            )}
                                              
                                        )}   
                                            
                                    </View>
                                )
                            }else if(type == 0){
                                return(
                                    <View key={i} style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'black',paddingBottom:hp('2%') }}>
                                        <Text style={styles.ttitle}>{title}</Text>
                                        <Text style={{color:'black',fontSize:hp('3%'),marginLeft:hp('5%')}}>{text}</Text>
                                    </View>
                                    )   
                            }
                        }
                    )}  
                        
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
