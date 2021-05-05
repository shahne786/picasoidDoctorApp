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
const window = Dimensions.get('window');

import { TextField } from 'react-native-material-textfield';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
type Props = {};
const GLOBAL = require('./Global');

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class BookingAppointmentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            images: [
                {
                    name :'Myself',
                    selected:'',
                    myself:'Y',
                },
                {
                    name :'Someone else',
                    selected:'',
                    myself:'N',

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
            title: 'BOOKING APPOINTMENT',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            headerStyle:{
                backgroundColor:'white',
            },
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
        //   this._handlePressLogin()
    }
    _handlePress() {




        this.props.navigation.navigate('BookingDetailFinal')
    }

    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {

        this.props.navigation.navigate('BookingAppointmentDetail')

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

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(index)
            }>

                {index == 0 && (

                        <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                               source={require('./myself.png')}/>




                )}
                {index != 0 && (

                    <Image style = {{width :60 ,height :60,margin:10,resizeMode:'contain'}}
                           source={require('./add.png')}/>


                )}

                {index == 0 && (
                <Text style={{fontSize : 14,color :'#0592CC',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                    {item.name}
                </Text>
                )}

                {index != 0 && (
                    <Text style={{fontSize : 14,color :'rgba(0,0,0,0.5)',fontFamily:'Poppins-Regular',textAlign:'center'}}>

                        {item.name}
                    </Text>
                )}

            </TouchableOpacity>
        )
    }
    render() {
        var item = GLOBAL.bookingArray

        var s = item.speciality_detail_array
        var speciality =  s.join(',')
        var radio_props_one = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
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



                <View style = {{backgroundColor:'#800000',height:54,width:'100%',flexDirection: 'row'}}>

                    <Image style = {{margin :15,height:25,width:30}}
                           source={require('./back.png')}/>

                    <Image style = {{marginTop:14,height:27,width:27,marginLeft:-7}}
                           source={require('./homelogo.png')}/>



                    <Text style= {{fontSize:17,fontFamily:'Konnect-Medium',color:'white',marginTop:17,marginLeft:8}} >
                        CONSULT ONLINE
                    </Text>
                </View>



                <KeyboardAwareScrollView>
                    <View style={{ marginLeft : 10,width:window.width - 20, backgroundColor: 'white',marginTop: 10,marginBottom:20,borderRadius:10}}>




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

                                <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginBottom:15,width:250}}>

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



                    </View>


                    <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                        Is this for you or someone else?
                    </Text>
                    <FlatList style= {{flexGrow:0,margin:8,backgroundColor:'white',width:'100%'}}
                              horizontal = {true}
                              data={this.state.images}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Text style={{fontSize : 20,color :'#132439',fontFamily:'Poppins-Regular',margin:10}}>

                        Basic Information
                    </Text>

                        <View style = {{backgroundColor:'white',borderRadius:8,marginLeft:10,width:window.width - 20}}>
                            <View style = {{marginLeft:10}}>
                            <TextField
                                label= 'Name'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />
                            <Text style={{fontSize : 12,color :'rgba(0,0,0,0.5)',fontFamily:'Poppins-Medium',}}>

                               Gender
                            </Text>

                            <RadioForm style={{ marginTop:12}}
                                       labelStyle={{paddingRight:20}}
                                       radio_props={radio_props_one}
                                       initial={0}
                                       buttonSize={10}
                                       formHorizontal={true}
                                       buttonColor={'#0592CC'}
                                       labelHorizontal={true}
                                       animation={false}
                                       labelColor={'black'}
                                       selectedButtonColor={'#0592CC'}
                                       onPress={(value) => {this.setState({value:value})}}
                            />
                            <TextField
                                label= 'Date of Birth'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />

                            <TextField
                                label= 'Address'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />

                            <TextField
                                label= 'Area Locality'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />
                            <TextField
                                label= 'City'
                                value={phone}
                                onChangeText={ (phone) => this.setState({ phone }) }
                                tintColor = {'#0592CC'}
                            />

                        </View>
                        </View>

                        <Button
                            style={{padding:7,marginTop:18,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            PROCEED
                        </Button>
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
