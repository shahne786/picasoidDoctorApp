import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage,
    Platform,
    ImageBackground
} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import Header from './Header.js';
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Forgot extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        selected:false,
        data:[],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
        }
    }
    login = () => {
        if(this.state.phone==''){
            alert('Please enter email id')
        }else{
              this.showLoading()
            const url = GLOBAL.BASE_URL + 'Forget_password_doctor'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.phone,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.hideLoading()
                    if (responseJson.status == true) {
                        alert('Password has been sent to your registered email address.')
                        this.props.navigation.goBack()
                    } else {
                        alert('Invalid email id!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });



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


        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}
                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (

                <View style={styles.container}>
                <Header navigation = {this.props.navigation}
                headerName={'FORGOT PASSWORD'}/>
                  <ImageBackground source={require('./background.png')}style={{width: '100%', height: '100%'}}>

                    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

                        <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                               source={require('./logo_ch.png')}/>

                    <Text style={{marginLeft:35,textAlign:'left',width:'100%',color :'black',fontFamily:'Konnect-Medium',fontSize: 35,marginTop:20}} >

                    Forgot Password
                    </Text>



                        <Text style = {{marginLeft: 35,width:'80%',color:'#6c6c6c',fontSize: 18,marginTop:12,fontFamily:'Konnect-Regular',textAlign:'left', marginRight:40}}>
                            Enter the email id you used to create {'\n'}the account and we will send your {'\n'}password to your email id.

                        </Text>


                  <View style = {{alignSelf:'center',width:'80%',marginTop:'10%',flexDirection:'row',  backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>

                    <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginTop:30, marginLeft:10}}
                       source={require('./email.png')}/>

                        <View style = {{marginLeft:10,width:'80%',}}>


                            <TextField
                                label= 'Email'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#800000'}
                            />


                        </View>
                        </View>




                    <TouchableOpacity style={{marginTop:'20%', marginBottom:40}}
                    onPress={() => this.login()}>
                    <View style = {{backgroundColor:'#800000',height:55,borderRadius:27.5,alignSelf:'center',width:300,
                        borderBottomWidth: 0,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        flexDirection:'row'}}>


                        <Text style= {{width:'100%',alignSelf:'center',textAlign:'center',fontSize:20,fontFamily:'Konnect-Medium',color:'white',padding:11}} >
                            SUBMIT
                        </Text>

                        <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginLeft:-50,alignSelf:'center'}}
                               source={require('./right.png')}/>
                    </View>
                    </TouchableOpacity>

                    </KeyboardAwareScrollView>
                    </ImageBackground>
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

})
