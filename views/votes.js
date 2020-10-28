import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,ScrollView,RefreshControl} from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' 
import { Header } from 'react-native-elements';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as Progress from 'react-native-progress';

class News extends Component{
    constructor(props){
        super(props);
        this.loadNews(()=>{
            this.setState({value:11})
        });
        this.noticias = [];
        this.state = {
            cargando : true,
            f:true,
        }
    }
    async loadNews(fn){
        await User.newsHome((err,d)=>{
            if(!err){
                this.setState({'errg':true});
            }else{
                
                d.forEach(element => {
                    if(element !=  null){
                        if(null != element.options){
                            if(element.type == 1){
                                element.options.candidates.forEach(({_id},i)=>{
                                    element.options.candidates[i].value=_id
                                })
                                this.noticias.push(element);
                                this.setState({cargando:true})
                            }
                        }
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
    async userVote(id,i,j){
        console.log(id);
        User.userVote(this._id,id,(err, d)=>{
            //console.log(d);
            this.noticias[i]=d;
            setTimeout(()=>{
                this.setState({f:false})
            },800)
        })
    }
    async componentDidMount(){
        const {_id} =JSON.parse(await AsyncStorage.getItem('@UserData'));
        this.setState({
            _id,
        })
        
        
    }
    
    render(){
        
        let {errg,cargando,_id,f} = this.state;
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
                        borderBottomColor:'#bdc3c7',
                    }}
                />
                <View style = {{flex: 1,backgroundColor: 'white',flexDirection: 'column'}}>
                    {errg?<Text style={{color:'red'}}>Algo Salio mal intentar nuevamente</Text>:null}
                    <ScrollView style={{flex: 1,backgroundColor: 'white',flexDirection: 'column'}} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                        }>
                        {(cargando)?<Text style={styles.ttitle}>{errg?<Text style={{color:'red'}}>Algo Salio mal intentar nuevamente</Text>:'Cargando'}</Text> :

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
                                                        <Progress.Bar key={j} progress={(f)?0:(options.votes === 0 )?0:obj.vote/options.votes} width={wp('85%')} color={'#f6b93b'} style={{marginLeft:hp('5%'),marginTop:hp('0.5%'),marginBottom:hp('1%')}} animationType={'spring'}/>
                                                    </View>
                                                    
                                                )}
                                                
                                            )}   
                                                
                                        </View>
                                    )
                                }
                            }
                        )}  
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
