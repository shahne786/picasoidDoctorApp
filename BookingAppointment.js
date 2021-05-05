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
    AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import { TextField } from 'react-native-material-textfield';
type Props = {};

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import store from "react-native-simple-store";


export default class BookingAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            images: [
                {
                    days :'10.00',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.15',
                    selected:'',
                },
                {
                    days :'10.23',
                    selected:'',
                },
                {
                    days :'10.33',
                    selected:'',
                },
                {
                    days :'10.56',
                    selected:'',
                },
                {
                    days :'10.66',
                    selected:'',
                },
            ]

        };

    }
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
    }
    componentWillUnmount() {

    }

    myCallbackFunctions = (res) => {
        this.hideLoading()
        GLOBAL.mobile =  this.state.phone
        if (res.status == 200){
            GLOBAL.which = "2"

            GLOBAL.userID = res.user_id.toString();
            GLOBAL.name = res.name;
            GLOBAL.mobile =  res.mobile;
            AsyncStorage.setItem('mobile', res.mobile);
            AsyncStorage.setItem('userID', res.user_id);
            AsyncStorage.setItem('username', res.name);


            this.props.navigation.navigate('Otp')
        }
        else if (res.status == 201){
            this.setState({visible:true})
        }
        else{
            alert(stringsoflanguages.unable)
        }

    }
    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,

            headerTintColor :'#0592CC',
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    _handlePressLogin() {
        this.showLoading()
        var self=this;
        var url = GLOBAL.BASE_URL + 'getrole';
        axios.get(url)
            .then(function (response) {
                self.myCallbackFunction(response.data)
            })
            .catch(function (error) {
                console.log(error);

            });

    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }
    getSelection = (index) => {



        for(let i = 0; i < 2; i++){

            this.state.moviesList[i].selected = "";

        }

        this.setState({moviesList:this.state.moviesList})

        let indexs = this.state.moviesList;
        let targetPost = this.state.moviesList[index];
        if (targetPost.selected == ''){
            targetPost.selected = 'Y'
        }else{
            targetPost.selected = ''
        }
        indexs[index] = targetPost
        this.setState({moviesList:indexs})


    }


    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){

        const url = GLOBAL.BASE_URL +  'fetch_nearest_doctor'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "lat":GLOBAL.lat,
                "long":GLOBAL.long,
                "doctor_condition":GLOBAL.doctor_condition,
                "type":"",
                "departments_filter":"",
                "hospital_filter":"",
                "price_range_min":"",
                "price_range_max":"",
                "is_favrouite":"",




            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.setState({results:responseJson.doctor_list_s})


                    // this.props.navigation.navigate("VideoCall", {
                    //     channelName: 'Picasoid',
                    //     onCancel: (message) => {
                    //         this.setState({
                    //             visible: true,
                    //             message
                    //         });
                    //

                    //
                    //     }
                    // });
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

        //   this._handlePressLogin()
    }
    _handlePress() {
        console.log('Pressed!');

        if (this.state.mobile == ""){
            alert(stringsoflanguages.mobile + stringsoflanguages.please)
        }else if (this.state.company == ""){
            alert(stringsoflanguages.password + stringsoflanguages.please)
        }else{
            this.showLoading()
            var self=this;

            var url = GLOBAL.BASE_URL + 'login';


            alert(url)

            axios.post(url, {
                mobile: this.state.phone,
                password: this.state.company,
                divice_token:"11111"
            })
                .then(function (response) {

                    self.myCallbackFunctions(response.data)


                    //    self.myCallbackFunction.bind()

                    //   this.myCallbackFunction()


                })
                .catch(function (error) {
                    console.log(error);
                    //  self.myCallbackFunction()

                });

        }

        // this.props.navigation.navigate('Otp')
    }

    login = (item) => {
        GLOBAL.bookingArray = item
        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {

            this.props.navigation.navigate('DoctorDetail')

    }
    selectedFirsts = () => {
        var a = this.state.images

        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }

        var index = a[1]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[1] = index
        this.setState({images:this.state.images})

    }
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _renderItems = ({item,index}) => {
        var s = item.speciality_detail_array
       var speciality =  s.join(',')


        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>
                <View style={{ flex: 1 ,marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




<View style = {{flexDirection:'row',width :'100%'}}>
    <View>
                    <Image style = {{width :40 ,height :40,borderRadius: 20,margin:10}}
                           source={{ uri: item.image }}/>
        <View style = {{marginLeft:10,backgroundColor:'#800000',borderRadius:4,width:40,height:20,marginTop:-2,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
            <Image style = {{width :10 ,height :10,marginLeft:4,resizeMode:'contain'}}
                   source={require('./star.png')}/>

            <Text style={{marginLeft : 2,fontSize : 10,marginTop:1,color :'white',fontFamily:'Konnect-Regular',}}>
                {item.ratting}
            </Text>

        </View>

        {item.avail == 1 && (
        <Text style={{textAlign:'center',marginLeft : 2,fontSize : 10,color :'#3DBA56',fontFamily:'Konnect-Regular',width:60}}>

            Available
        </Text>
        )}
        {item.avail != 1 && (
            <Text style={{textAlign:'center',marginLeft : 2,fontSize : 10,color :'#3DBA56',fontFamily:'Konnect-Regular',width:60}}>

                Offline
            </Text>
        )}

    </View>

                           <View>

    <View style = {{flexDirection:'row',width:'100%'}}>
                    <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Konnect-Regular',width :'80%',marginTop:10}}>

                        {item.name}
                    </Text>

        <Image style = {{width :25 ,height :25,marginLeft:-20,resizeMode:'contain',marginTop:18}}
               source={require('./share.png')}/>

    </View>

                               <View style = {{flexDirection:'row'}}>
                               <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Konnect-Regular',width :'90%'}}>

                                   {speciality}
                               </Text>



                               </View>



                               <View style = {{flexDirection:'row',marginTop:10}}>
                                   <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                          source={require('./location.png')}/>

                                   <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Konnect-Regular',width:window.width - 120}}>

                                       Branch: {item.lat_long_address}
                                   </Text>

                               </View>

                               <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10,width:250}}>

                                   <View>
                                       <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                           Experience
                                       </Text>
                                       <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                           {item.experience} Years
                                       </Text>
                                   </View>

                                   <View >
                                       <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                           Likes
                                       </Text>
                                       <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                           {item.like}
                                       </Text>
                                   </View>

                                   <View >
                                       <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Konnect-Regular',}}>

                                           Reviews
                                       </Text>
                                       <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Konnect-Regular',textAlign:'center'}}>

                                           {item.total_review}
                                       </Text>
                                   </View>

                               </View>
    </View>

</View>






                    <Button
                        style={{padding:4,marginTop:14,fontSize: 16, color: 'white',backgroundColor:'#800000',marginLeft:'55%',width:40,height:30,fontFamily:'Konnect-Regular',shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,borderRadius:10,marginBottom: 20}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login(item)}>
                        Consult
                    </Button>

                </View>





            </TouchableOpacity>
        )
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

            <View style = {{backgroundColor:'#f2f5f7'}}>
                <SafeAreaView style={{ flex:0, backgroundColor: '#6d0000' }} />


                <View style={{ flex: 1, backgroundColor: 'black' }} />
                <View style = {{backgroundColor:'#800000',height:54,width:'100%',flexDirection: 'row'}}>
                    <View style = {{width :'76%',flexDirection:'row'}}>
                        <Image style = {{margin :15,height:25,width:30}}
                               source={require('./back.png')}/>

                        <Image style = {{marginTop:14,height:27,width:27,marginLeft:-7}}
                               source={require('./homelogo.png')}/>



                        <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'white',marginTop:17,marginLeft:8}} >
                            Consult Online
                        </Text>
                    </View>

                    <View style = {{flexDirection:'row',marginTop :2}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AmbulanceBooking')
                        }>
                        <Image style = {{margin :15,height:20,width:20}}
                               source={require('./loc.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Filter')
                        }>

                        <Image style = {{marginTop:14,height:20,width:20,marginLeft:-2}}
                               source={require('./filter.png')}/>
                        </TouchableOpacity>

                    </View>
                </View>

                    <View style = {{margin :10,width:window.width - 20 ,height:35,borderRadius:20,flexDirection:'row',backgroundColor:'white',}}>

                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./search.png')}/>

                        <TextInput style={{marginLeft:10 ,width:window.width - 100}}
                                   placeholderTextColor='rgba(0, 0, 0, 0.4)'
                                   onChangeText={(text) => this.setState({height:text})

                                   } placeholder={"Search"}/>


                        <Image style = {{width :18 ,height: 18,alignSelf:'center',resizeMode: 'contain',marginLeft:13}}
                               source={require('./speech.png')}/>




                    </View>




                <View style = {{backgroundColor:'#f2f5f7'}}>
                    <FlatList style= {{flexGrow:0,margin:8,height:window.height - 140}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                </View>



            </View>












        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

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
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})
