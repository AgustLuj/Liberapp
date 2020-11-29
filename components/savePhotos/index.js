import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import { StyleSheet, View,TextInput,TouchableOpacity, Image, Alert,SafeAreaView,StatusBar,Platform,PermissionsAndroid,ActivityIndicator, } from 'react-native';
class SavePhoto{
    async getPermissionAndroid(){
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Image Download Permission',
              message: 'Your permission is required to save images to your device',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
          }
          Alert.alert(
            'Save remote Image',
            'Grant Me Permission to save Image',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        } catch (err) {
          Alert.alert(
            'Save remote Image',
            'Failed to save Image: ' + err.message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
    }
    async handleDownload(url,fn){
        if (Platform.OS === 'android') {
            const granted = await this.getPermissionAndroid();
            if (!granted) {
              return;
            }
          }
          RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
          })
            .fetch('GET',url)
            .then(res => {
                CameraRoll.save(res.data, 'photo')
                .then(() => {
                  Alert.alert(
                    'Save remote Image',
                    'Image Saved Successfully',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                })
                .catch(err => {
                  Alert.alert(
                    'Save remote Image',
                    'Failed to save Image: ' + err.message,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  );
                })
                .finally(() => fn());
            })
            .catch(error => {
              //this.setState({saving: false});
              Alert.alert(
                'Save remote Image',
                'Failed to save Image: ' + error.message,
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
              );
            });     
    }
}

export default new SavePhoto;
