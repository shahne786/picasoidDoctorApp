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
    AsyncStorage, StatusBar
} from 'react-native';

const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
const GLOBAL = require('./Global');
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Support extends Component {
    state = {
        name :GLOBAL.myname,
        email:GLOBAL.myemail,
        message :'',
        company :'',
        loading:false,
        visible:false,helpline_email:'',helpline_no:''
    };


        static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
            // title: 'SUPPORT',
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
//        this.getSupport()
    }

    getSupport=()=>{
                const url =  GLOBAL.BASE_URL  + 'settings'

        fetch(url, {
            method: 'GET',



        }).then((response) => response.json())
            .then((responseJson) => {

             //   alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {

                    this.setState({helpline_email: responseJson.support_email})
                    this.setState({helpline_no: responseJson.helpline_number})
                }else{

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });


    }


    submitEnq=()=>{
        if(this.state.name == ''){
            alert('Please enter name')
        }else if(this.state.email==''){
            alert('Please enter email')
        }else if(this.state.message ==''){
            alert('Please enter message')
        }else{

                const url = GLOBAL.BASE_URL +  'patient_support'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "patient_id": GLOBAL.user_id,
                "name": this.state.name,
                "email": this.state.email,
                "message": this.state.message
                 
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                    alert('Thank You! Your query has been submitted successfully! We will reach you soon!')
                }else{
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

        }

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
        <View>
      <View style={styles.appBar} >
      <View style = {{flex:1,flexDirection:'row', width:window.width, height:window.height,marginTop:5}}>
     <TouchableOpacity style={{height :20,width :20,marginTop :12 ,marginLeft: 15}}
     onPress={() => this.props.navigation.goBack()}>
      <Image style={{height :18,width :18}}
            source={require('./back.png')} />
      </TouchableOpacity >

                    <Image style = {{marginTop:6,height:27,width:27,marginLeft:5}}
                           source={require('./homelogo.png')}/>

      <Text style = {{color:'white',width : 200 ,height:40,marginLeft :10 ,marginTop :10,fontSize: 15,fontFamily:'Konnect-Medium' }}>
      SUPPORT
      </Text>
       </View>
         </View>
<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

    <View style={{width : Dimensions.get('window').width,height : Dimensions.get('window').height-30, backgroundColor:'#F2F5F7'}}>

    <View style={{backgroundColor:'white',color :'white',flexDirection:'column',flex:1 ,marginTop:15,marginBottom:70,marginLeft:15,marginRight:15, height:350,borderRadius :6,width : Dimensions.get('window').width-30, shadowColor: '#D3D3D3',
    shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 2}}>



    <View style={{flexDirection:'row',marginTop:40,marginLeft:20,alignItems:'center'}}>

    <Text style={{fontSize:15,color:'black',fontFamily:'Konnect-Medium'}}>LEAVE US A MESSAGE</Text>

  </View>

  <View style={{flexDirection:'column',marginTop:40,marginLeft:20}}>
  <Text style={{fontSize:16,fontFamily:'Konnect-Regular',color:'lightgrey'}}>FULL NAME</Text>

   <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey', fontFamily:'Konnect-Regular'}}
        placeholder=""
        returnKeyType='go'
        value= {this.state.name}
        onChangeText={(text)=> this.setState({name : text})}
        secureTextEntry={false}
        autoCorrect={false}
     />


     <Text style={{fontSize:16,fontFamily:'Konnect-Regular',color:'lightgrey',marginTop:20}}>EMAIL</Text>

      <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Konnect-Regular'}}
           placeholder=""
           returnKeyType='go'
           value={this.state.email}
           onChangeText={(text)=> this.setState({email : text})}
           secureTextEntry={false}
           autoCorrect={false}
        />

        <Text style={{fontSize:16,fontFamily:'Konnect-Regular',color:'lightgrey',marginTop:20}}>MESSAGE</Text>

         <TextInput style={{ fontSize: 16, borderBottomWidth: 1,width:325, borderBottomColor:'lightgrey',fontFamily:'Konnect-Regular'}}
              placeholder=""
              returnKeyType='go'

              onChangeText={(text)=> this.setState({message : text})}
              secureTextEntry={false}
              autoCorrect={false}
           />
     </View>

        <TouchableOpacity style={{position:'absolute', bottom:'5%', alignSelf:'center'}}
        onPress={() => this.submitEnq()}>
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

    </View>

    </View>
  </KeyboardAwareScrollView>


    </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',
        height: window.height,
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
   appBar: {
   backgroundColor:'#800000',
   height: APPBAR_HEIGHT,
 },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },

})