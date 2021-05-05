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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',

        };

    }

    componentWillUnmount() {

    }

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
            // title: 'ABOUT US',
            // headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            // headerStyle:{
            //     backgroundColor:'white',
            // },
            // headerTintColor :'#800000',
            // animations: {
            //     setRoot: {
            //         waitForRender: false
            //     }
            // }
        }
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }




    componentDidMount(){


    }




    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}

                                       size="large" color='#800000' />
                </View>
            )
        }
        return (
            <View style={styles.container}>

              <View style={styles.appBar} >
      <View style = {{flex:1,flexDirection:'row', width:window.width, marginTop:5}}>
     <TouchableOpacity style={{height :20,width :20,marginTop :12 ,marginLeft: 15}}
     onPress={() => this.props.navigation.goBack()}>
      <Image style={{height :18,width :18}}
            source={require('./back.png')} />
      </TouchableOpacity >

                    <Image style = {{marginTop:6,height:27,width:27,marginLeft:5}}
                           source={require('./homelogo.png')}/>

      <Text style = {{color:'white',width : 200 ,height:40,marginLeft :10 ,marginTop :10,fontSize: 15,fontFamily:'Konnect-Medium' }}>
      ABOUT US
      </Text>
       </View>
         </View>

            <ScrollView>


                <Text style = {{fontSize:20,margin:10,fontFamily:'Konnect-Medium',color:'#800000',textAlign:'left',width:'100%'}}>
                    About Us

                </Text>

                <Text style = {{fontSize:17,marginLeft:10,marginRight:10,marginBottom:10,fontFamily:'Konnect-Regular',color:'black',textAlign:'left',width:'90%'}}>
                    Company is providing 24 X 7 health care services


                </Text>


            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f1f1f1',

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    transcript: {
        textAlign: 'center',
        color: 'red',

    },appBar: {
   backgroundColor:'#800000',
   height: APPBAR_HEIGHT,
 },

})
