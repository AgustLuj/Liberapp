import React, { Component } from 'react';
import { StyleSheet, View,TextInput,TouchableOpacity, ScrollView,RefreshControl } from 'react-native';
import User from '../components/user';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-community/async-storage' ;
import { Input, Text, Button, Header,ListItem, Icon } from 'react-native-elements';

speed();
var userData;
async function speed (){
    //userData = JSON.parse(await AsyncStorage.getItem('@UserData'))
}
class List_Options extends Component{
    constructor(props){
        super(props);
        this.loadUsers(()=>{
            return null;
        })
        this.userNews=[]
        this.state= {
            cargando:true,
            errg:false,
            f:true,
        }
    }
    componentDidMount() {
        //this.startData();

        this.focusListener = this.props.navigation.addListener('focus', () => {
            //this.startData();
            this._onRefresh()
            //console.log("hola")
            //Put your Data loading function here instead of my this.LoadData()
        });
    }
    async loadUsers(fn){
        await User.getDataNewUser(global.value._id,(err,d)=>{
            if(!err){
                this.setState({'errg':true});
            }else{
                this.userNews=d;
                //console.log(d)
                this.setState({cargando:false})
            }
        });
        fn()
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.setState({cargando:true})
        this.loadUsers(()=>{
            this.setState({refreshing: false});
        });
    }
    render(){
          userData = global.value;
            /*
            <View key={i} style = {{flex: 1,backgroundColor: 'white',flexDirection: 'row',justifyContent: "space-between",borderBottomWidth:1,borderBottomColor:'black',paddingBottom:hp('2%')}}>
                                    <View style={{flexDirection: 'column',justifyContent:'center'}}>
                                        <Text style={styles.ttitle}>{username}</Text>
                                    </View>
                                    <View style={{flexDirection: 'column',justifyContent:'center'}}>
                                        <Button
                                            titleStyle={styles.bTitle}
                                            containerStyle={styles.bContainer}
                                            title="Aceptar"
                                            type="outline"
                                            onPress={()=>{}}
                                        />
                                    </View>  
                                    <View style={{flexDirection: 'column',justifyContent:'center'}}>
                                        <Button
                                            titleStyle={styles.bTitle}
                                            containerStyle={styles.bContainer}
                                            title="Rechazar"
                                            type="outline"
                                            onPress={()=>{this.rejectUser()}}
                                        /> 
                                    </View>
                                    
                                </View>
            
            */
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
                            {(cargando)?<View style={{alignItems:'center'}}><Text style={styles.ttitle}>{errg?'Algo Salio mal intentar nuevamente':'Cargando'}</Text></View> : 
                            this.userNews.map((user,i)=>{
                                return(
                                    <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('UserInfo',user)}>
                                    <ListItem key={i} bottomDivider >
                                        <Icon name={"md-person-add"} type='ionicon'/>
                                      <ListItem.Content>
                                        <ListItem.Title>{user.username}</ListItem.Title>
                                      </ListItem.Content>
                                      <ListItem.Chevron color ="#f6b93b">
                                      </ListItem.Chevron>
                                    </ListItem>
                                  </TouchableOpacity>
                                );
                            })
                            
                            }  
                        
                        
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
