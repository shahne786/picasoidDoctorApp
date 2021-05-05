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
    AsyncStorage,
    Platform,
    ImageBackground
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import DeviceInfo from 'react-native-device-info';



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        company :'',
        loading:false,
        visible:false,
        elevationone:0,
        elevationtwo:0,
        selected:false,
        data:[],
        results:[],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }


    componentDidMount(){
        var valuesf =  AsyncStorage.getItem('token');
        valuesf.then((f)=> {
            // alert(f)
            GLOBAL.firebaseToken = f
            console.log(f)
        }) 

    }


    login = () => {
//        console.log(DeviceInfo.getUniqueId())
        if (this.state.phone == ''){
            alert('Please Enter Username')
        }    else if (this.state.company == '') {
            alert('Please Enter Password')
        }  else {
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'Signin_doctor'
           console.log(JSON.stringify({
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.firebaseToken,

                }))
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.state.phone,
                    password: this.state.company,
                    deviceID: DeviceInfo.getUniqueId(),
                    deviceType: Platform.OS,
                    deviceToken: GLOBAL.firebaseToken,

                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                     console.log(JSON.stringify(responseJson))

                    this.hideLoading()
                    if (responseJson.status == true) {
                        this.setState({results: responseJson.user_detail})
                        GLOBAL.user_id = this.state.results.user_id
                        GLOBAL.myimage = this.state.results.image
                        GLOBAL.myname= this.state.results.name
                        GLOBAL.myemail = this.state.results.email
                        AsyncStorage.setItem('userID', this.state.results.user_id);
                        AsyncStorage.setItem('image', this.state.results.image);
                        AsyncStorage.setItem('name', this.state.results.name);
                        AsyncStorage.setItem('email', this.state.results.email);
                        AsyncStorage.setItem('mobile', this.state.results.mobile);
                        this.props.navigation.replace('DrawerNavigator')
                    } else {
                        alert('Invalid Credentials!')
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }
    otp =  () => {
        this.props.navigation.replace('MyOtp')
    }
    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {

        this.setState({selected:true})
    }


    onBlur=()=>{
        this.setState({elevationone:0})
    }

    onFocus = ()=>{
        this.setState({elevationone:15})
    }


    onBlurs=()=>{
        this.setState({elevationtwo:0})
    }

    onFocuss = ()=>{
        this.setState({elevationtwo:15})
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

                                       size="large" color='#800000' />
                </View>
            )
        }
        return (

            <View style={styles.container}>
                  <ImageBackground source={require('./background.png')}style={{width: '100%', height: '100%'}}>

                <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

                    <Image style = {{width :300 ,height: 140,alignSelf:'center',marginTop:'10%',resizeMode: 'contain'}}
                           source={require('./logo_ch.png')}/>

                    <Text style={{marginLeft:35,textAlign:'left',width:'100%',color :'black',fontFamily:'Konnect-Medium',fontSize: 40,marginTop:20}} >

                        Login
                    </Text>


                    <Text style={{marginLeft:35,textAlign:'left',marginRight:40 ,width:'80%',color :'#6c6c6c',fontFamily:'Konnect-Regular',fontSize: 18,marginTop:12}} >

                       Please Log In to your account to continue with PiCaSoid Doctor app.
                    </Text>


                  <View style = {{alignSelf:'center',width:'80%',marginTop:'10%',flexDirection:'row', elevation:this.state.elevationone, backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>

                <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginTop:30, marginLeft:10}}
                       source={require('./email.png')}/>

                    <View style = {{marginLeft:10,width:'80%'}}>

                        <TextField
                            label= 'Email /Mobile No'
                            value={phone}
                            onBlur={ () => this.onBlur() }
                            onFocus={ () => this.onFocus() }
                            onChangeText={ (phone) => this.setState({ phone }) }
                            tintColor = {'#800000'}
                        />

                    </View>    

                    </View>

                  <View style = {{alignSelf:'center',width:'80%',marginTop:'3%',flexDirection:'row', elevation:this.state.elevationtwo, backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'transparent'}}>

                <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginTop:30, marginLeft:10}}
                       source={require('./password.png')}/>

                    <View style = {{marginLeft:10,width:'80%'}}>

                        <TextField
                            label= 'Password'
                            value={company}
                            onBlur={ () => this.onBlurs() }
                            onFocus={ () => this.onFocuss() }
                            secureTextEntry={true}
                            tintColor = {'#800000'}
                            onChangeText={ (company) => this.setState({ company }) }
                        />
                </View>

                </View>

                    <TouchableOpacity 
                    style={{alignSelf:'flex-end',marginRight:50,marginTop:30, marginBottom:20}}
                    onPress={() => this.props.navigation.navigate('Forgot')}>
                    <Text style={{textAlign:'left',color :'black',fontFamily:'Konnect-Regular',fontSize: 16}}>
                        Forgot Password?
                    </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => this.login()
                    }
                    style={{marginTop:20, marginBottom:40}}>
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