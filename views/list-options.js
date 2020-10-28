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
    userData.admin = true;
    userData.editor = false;
}
class List_Options extends Component{
    constructor(props){
        super(props);
        this.state= {
          name:null,
        }
    }
    render(){
        const list = [
            {
                title: 'Buscar',
                view:'Search',
                icon: 'ios-search',
                admin:true
            },
            {
                title: 'Configurar',
                view:'Config',
                icon: 'ios-build',
                admin:false
              
            },
            {
                title: 'Verificar',
                view:'Verificar',
                icon: 'ios-person',
                admin:true
              
            },
            {
                title: 'Crear Noticias',
                view:'build_News',
                icon: 'ios-create',
                admin:false,
                editor:true,
              
            },
            {
                title: 'Crear Votacion',
                view:'build_News',
                icon: 'ios-checkbox',
                admin:false,
                editor:true,
              
            },
            
            
          ]
        return (
            <View style = {{flex:1}}>
                <Header
				placement="left"
				leftComponent={{ icon: 'arrow-back',style: {}, color: '#fff' ,onPress: () => this.props.navigation.goBack(),}}
				centerComponent={{ text: 'Opciones', style: { color: '#fff',fontSize:hp('3.5%'), } }}
				containerStyle={{
					backgroundColor: '#f6b93b',
          justifyContent: 'space-around',
          borderBottomColor:'#bdc3c7',
				}}
			/>
            {
              list.map((item, i) =>{
                if(userData.admin){
                  return(
                    <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate(item.view)}>
                      <ListItem key={i} bottomDivider >
                        <Icon name={item.icon} type='ionicon'/>
                        <ListItem.Content>
                          <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color ="#f6b93b">
                        </ListItem.Chevron>
                      </ListItem>
                    </TouchableOpacity>
                  )
                }else{
                  if(!item.admin && !item.editor){
                    return(
                      <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate(item.view)}>
                        <ListItem key={i} bottomDivider>
                          <Icon name={item.icon} type='ionicon'/>
                          <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      </TouchableOpacity>
                    )
                  }else if (userData.editor && item.editor === true){
                      return(
                        <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate(item.view)}>
                          <ListItem key={i} bottomDivider>
                            <Icon name={item.icon} type='ionicon'/>
                            <ListItem.Content>
                              <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                          </ListItem>
                        </TouchableOpacity>
                      )
                  }
                }
              })
            }
          </View>
        );
    }
}
    
const styles = StyleSheet.create({
    
});

export default List_Options
