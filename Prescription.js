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
    Platform
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Prescription extends Component {
    state = {
        name :'',
        email:'',
        phone :'',
        diagnoses :'',
        company :'',
        loading:false,
        visible:false,

        selected:false,
        data:[],
        results:[],

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


            this.props.navigation.replace('Otp')
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
            title: 'PRESCRIPTION',
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
    _renderItems = ({item,index}) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{flexDirection :'row', flex: 1 ,marginLeft: '5%',marginTop:12,width : '90%', backgroundColor: 'white',height:38,borderBottomColor:'#77869E',borderBottomWidth:1
                    ,justifyContent:'space-between'}}>

                    <Text style={{marginLeft : 5,marginTop:10,fontSize : 20,color :'#77869E', height:'auto',fontFamily:'AvenirLTStd-Medium'}}>

                        {item.title}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({loading: true})
    }


    componentDidMount(){
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


    }

    login = () => {
        if(this.state.phone ==''){
            alert('Please enter Patient Complaint')
        }else if(this.state.company ==''){
            alert('Please enter Past History of Patient')
        }else if(this.state.email ==''){
            alert('Please enter vitals')
        }else if(this.state.name){
            alert('Please enter Treatment')
        }else if(this.state.diagnoses){
            alert('Please enter Final diagnosis')
        }else{
        var commonHtml = `Patient Complaint:${this.state.phone},Past History:${this.state.company},Vitual's:${this.state.email},Treatment:${this.state.name},Provisions/Final Diagnosis:${this.state.diagnoses}`;
            this.showLoading()
            const url = GLOBAL.BASE_URL + 'upload_prescription'
            this.showLoading()
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor_id: GLOBAL.user_id,
                    booking_id: GLOBAL.token,
                    prescription_type: '2',
                    prescription_content: commonHtml,


                }),
            }).then((response) => response.json())
                .then((responseJson) => {
//                     alert(JSON.stringify(responseJson))

                    this.hideLoading()
                    if (responseJson.status == true) {
                    alert('Prescription added successfully!')

                    } else {
                        alert('Something went wrong!')
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
    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }
    render() {
//diagnoses

        let { phone } = this.state;
        let { email } = this.state;
        let { name } = this.state;
        let { company } = this.state;
        let { diagnoses } = this.state;
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
                <KeyboardAwareScrollView>




                    <View style = {{marginLeft:'5%',width:'90%',marginTop:'2%'}}>


                        <TextField
                            label= 'Patient Complaint'
                            value={phone}
                            onChangeText={ (phone) => this.setState({ phone }) }
                            tintColor = {'#0592CC'}
                        />
                        <TextField
                            label= 'Past History'
                            value={company}

                            tintColor = {'#0592CC'}
                            onChangeText={ (company) => this.setState({ company }) }
                        />
                        <TextField
                            label= 'Vitals'
                            value={email}

                            tintColor = {'#0592CC'}
                            onChangeText={ (email) => this.setState({ email }) }
                        />
                        <TextField
                            label= 'Treatment'
                            value={name}

                            tintColor = {'#0592CC'}
                            onChangeText={ (name) => this.setState({ name }) }
                        />
                        <TextField
                            label= 'Final Diagnosis'
                            value={diagnoses}

                            tintColor = {'#0592CC'}
                            onChangeText={ (diagnoses) => this.setState({ company }) }
                        />

                    </View>







                    <Button
                        style={{padding:4,marginTop:14,fontSize: 20, color: 'white',backgroundColor:'#0592CC',marginLeft:'5%',width:'90%',height:40,fontFamily:'Poppins-Medium',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this.login()}>
                        SUBMIT
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