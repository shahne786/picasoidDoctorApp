import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');


const GLOBAL = require('./Global');
import { TextField } from 'react-native-material-textfield';
type Props = {};
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',

        };

    }

    render(){
        return(

              <View style={styles.appBar} >
      <View style = {{flex:1,flexDirection:'row', width:window.width, marginTop:7}}>
     <TouchableOpacity style={{height :20,width :20,marginTop :12 ,marginLeft: 15}}
     onPress={() => this.props.navigation.goBack()}>
      <Image style={{height :18,width :18}}
            source={require('./back.png')} />
      </TouchableOpacity >

                    <Image style = {{marginTop:6,height:27,width:27,marginLeft:5}}
                           source={require('./homelogo.png')}/>

      <Text style = {{color:'white',width : '80%' ,height:40,marginLeft :10 ,marginTop :11,fontSize: 15,fontFamily:'Konnect-Medium' }}>
      {this.props.headerName}
      </Text>
       </View>
         </View>

        )
    }
}
const styles = StyleSheet.create({
    appBar: {
   backgroundColor:'#800000',
   height: APPBAR_HEIGHT,
 },

})
