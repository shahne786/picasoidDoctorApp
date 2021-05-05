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
const window = Dimensions.get('window');
import CalendarStrip from "react-native-calendar-strip";
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import moment from 'moment';

let customDatesStyles = [];

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class BookingDetailFinal extends Component {
    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            company: '',
            loading: false,
            visible: false,

            selected: false,
            data: [],
            images: [
                {
                    days :'10.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
                {
                    days :'0.20',
                    selected:'',
                },
            ]
        }
    };
    myCallbackFunction = (res) => {
        this.hideLoading()
        this.setState({data:res.role})
        this.setState({loading: false})
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
            //   header: () => null,
            title: 'BOOKING',
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


        let startDate = moment();
        for (let i=0; i<700; i++) {
            customDatesStyles.push({
                startDate: startDate.clone().add(i, 'days'), // Single date since no endDate provided
                dateNameStyle: styles.dateNameStyle,
                dateNumberStyle: styles.dateNumberStyle,

                // Random color...
                dateContainerStyle: {shadowOpacity: 1.0,
                    shadowRadius: 1,
                    shadowColor: 'black',
                    shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' },
            });
        }
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

    login = () => {
        this.props.navigation.navigate('Confirmation')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }
    getSelection = () => {
        alert('dd')
        this.setState({selected:true})
    }
    selectedFirst = (indexs) => {
        var a = this.state.images
        for (var i = 0;i<this.state.images.length ;i ++){

            this.state.images[i].selected = ''
        }
        var index = a[indexs]
        if (index.selected == ""){
            index.selected = "Y"
        }else{
            index.selected = ""
        }
        this.state.images[indexs] = index
        this.setState({images:this.state.images})
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

                {item.selected == '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: 'white'
                    }}>

                        <Text style={{color:'#707070',fontSize:13}}>
                            AM
                        </Text>

                        <Text style={{color:'#707070',fontSize:16}}>
                            {item.days}
                        </Text>


                    </View>

                )}

                {item.selected != '' && (
                    <View style={{height:60,shadowOpacity: 1.0,justifyContent:'center',alignItems:'center',
                        shadowRadius: 1,
                        shadowColor: 'black',
                        shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:50,borderRadius: 0 ,backgroundColor: '#FD9683'
                    }}>

                        <Text style={{color:'white',fontSize:13}}>
                            DAY
                        </Text>

                        <Text style={{color:'white',fontSize:16}}>
                            {item.days}
                        </Text>


                    </View>

                )}
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
            <SafeAreaView>
                <View style={styles.container}>

                    <View style={{ marginLeft : 5,width:window.width - 10, backgroundColor: 'white',marginTop: 10,marginBottom:10,borderRadius:10}}>




                        <View style = {{flexDirection:'row',width :'100%'}}>
                            <Image style = {{width :60 ,height :60,borderRadius: 30,margin:10}}
                                   source={require('./splash.png')}/>

                            <View>

                                <View style = {{flexDirection:'row',width:'100%'}}>
                                    <Text style={{marginLeft : 5,fontSize : 18,color :'#3A3A3A',fontFamily:'Poppins-Medium',width :'60%',marginTop:18}}>

                                        Dr. Luke Reynolds
                                    </Text>

                                    <View style = {{backgroundColor:'#F1AE42',borderRadius:4,width:70,height:30,marginTop:18,flexDirection:'row',justifyItems:'center',alignItems:'center'}}>
                                        <Image style = {{width :22 ,height :22,marginLeft:4,resizeMode:'contain'}}
                                               source={require('./star.png')}/>

                                        <Text style={{marginLeft : 5,fontSize : 16,marginTop:3,color :'white',fontFamily:'Poppins-Medium',}}>

                                            4.5
                                        </Text>
                                    </View>

                                </View>

                                <View style = {{flexDirection:'row'}}>
                                    <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',width :'50%'}}>

                                        Dermatologist, Skin ethics Skin Clinic & Dermatosurgery Center
                                    </Text>

                                    <Text style={{marginLeft : 5,fontSize : 12,color :'#3DBA56',fontFamily:'Poppins-Medium',width:100}}>

                                        Available Today
                                    </Text>

                                </View>



                                <View style = {{flexDirection:'row'}}>
                                    <Image style = {{width :20 ,height :20,resizeMode:'contain'}}
                                           source={require('./location.png')}/>

                                    <Text style={{marginLeft : 5,fontSize : 12,color :'#8F8F8F',fontFamily:'Poppins-Medium',}}>

                                        Branch: Farmacias Del Ahorro
                                    </Text>

                                </View>

                                <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                                    <View>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Experience
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            20 Years
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Likes
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            20
                                        </Text>
                                    </View>

                                    <View style = {{marginRight:30}}>
                                        <Text style={{fontSize : 12,color :'#AAAAAA',fontFamily:'Poppins-Medium',}}>

                                            Reviews
                                        </Text>
                                        <Text style={{fontSize : 16,color :'#3A3A3A',fontFamily:'Poppins-Medium',textAlign:'center'}}>

                                            20
                                        </Text>
                                    </View>

                                </View>
                            </View>

                        </View>


                    </View>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Date
                    </Text>

                    <CalendarStrip

                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#80D8CF'}}
                        style={{height:120, paddingTop: 15}}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'white'}
                        highlightDateNameStyle={{color:'white'}}
                        highlightDateNumberStyle  ={{color:'white'}}


                        customDatesStyles={customDatesStyles}
                        dateContainerStyle = {{shadowOpacity: 1.0,
                            shadowRadius: 1,
                            shadowColor: 'black',
                            shadowOffset: { textAlign:'left',height: 0, width: 0 },margin :5,width:40,borderRadius: 0 ,backgroundColor: 'white' }}

                        iconContainer={{flex: 0.1}}
                        onDateSelected={(date)=> alert(date)}
                    />

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 18,color :'#707070', height:'auto',fontFamily:'Poppins-Regular',width :window.width - 80}}>

                        Select Time Slot
                    </Text>


                    <FlatList style= {{flexGrow:0,margin:8}}
                              data={this.state.images}
                              numColumns={1}
                              horizontal={true}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

                    <Button
                        style={{padding:7,marginTop:'20%',fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        PROCEED
                    </Button>









                </View>
            </SafeAreaView>
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
})