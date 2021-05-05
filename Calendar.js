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

const GLOBAL = require('./Global');
import moment from 'moment';
import Header from './Header.js';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var date ;
var s;
import CalendarPicker from 'react-native-calendar-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      online :[],
      offline :[],
      disabledAddTime:true      
    };
    this.onDateChange = this.onDateChange.bind(this);
  }


  onDateChange(date) {


    var t = new Date( date );
    s = moment(t).format('YYYY-MM-DD')

    var nowDate = moment().format('YYYY-MM-DD')

    if(moment(date).isSameOrAfter(nowDate, 'day')){
//    alert(moment().format('YYYY-MM-DD'))
    this.setState({disabledAddTime : false})      
    this._handlePressLogin(s)
    }else{
//    alert('Selected date should be after or equal to current date')
    this.setState({disabledAddTime : true})      
    }


 }


     _handlePressLogin =(s)=> {
        GLOBAL.date = s
       const url = GLOBAL.BASE_URL +  'list_doctor_time_slots'

       fetch(url, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },


           body: JSON.stringify({
       "user_id":GLOBAL.user_id,
       "date":s
   }),
 }).then((response) => response.json())
 .then((responseJson) => {

   // alert(JSON.stringify(responseJson))

   if(responseJson.status=="1"){
     var a = JSON.parse(responseJson.offline_time)

//     // alert(JSON.parse(responseJson.online_time))
    this.setState({online:JSON.parse(responseJson.online_time)})
    this.setState({offline:JSON.parse(responseJson.offline_time)})
 //offlineTime

   }else{
     this.setState({online:[]})
     this.setState({offline:[]})
   }




 })
 .catch((error) => {
   console.error(error);
   this.hideLoading()
 });
     }

    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,

        }
    }



    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    _handleStateChange = state => {
            this._handlePressLogin(s)
    }
    componentDidMount(){
      this.props.navigation.addListener('willFocus',this._handleStateChange);
       s = moment().format('YYYY-MM-DD')
      this._handlePressLogin(s)
    }


    login = () => {
        this.props.navigation.navigate('NurseTime')
    }

    render() {
      var online = ""
        var offline = ""
      if (this.state.online.length !=0){
        online =    `${this.state.online.start} - ${this.state.online.end}`;
      }
      if (this.state.offline.length !=0){
        offline =    `${this.state.offline.start} - ${this.state.offline.end}`;
      }

      const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style = {styles.loading}
                                       size="large" color='#006FA5' />
                </View>
            )
        }
        return (
            <View>
            <Header navigation={this.props.navigation}
            headerName={'CALENDAR'}/>
                <KeyboardAwareScrollView>
                <View style={styles.container}>
                <CalendarPicker
                onDateChange={this.onDateChange}
                selectedDayColor = '#800000'
                selectedDayTextColor="#FFFFFF"
                textStyle = {{color:'black', fontFamily:'Konnect-Medium'}}
                enableSwipe = {true}
              />

{online == '' && offline == '' && (
  <Button
      style={{padding:7,marginTop:10,fontSize: 20, color: 'white',backgroundColor:'#800000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Konnect-Medium',borderRadius:4}}
      styleDisabled={{color: 'white', backgroundColor:'grey'}}
      disabled={this.state.disabledAddTime}
      onPress={() => this.props.navigation.navigate('AddTime')}>
      Add Time Slot
  </Button>
)}

{online != '' && offline != '' && (
  <Button
      style={{padding:7,marginTop:10,fontSize: 20, color: 'white',backgroundColor:'#800000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Konnect-Medium',borderRadius:4}}
      styleDisabled={{color: 'red'}}
    onPress={() => this.props.navigation.navigate('UpdateTime')}>
      Update Time Slot
  </Button>
)}

{online != '' && offline != '' && (
      <View style = {{margin:10,width:window.width - 20,backgroundColor:'#AF2D32',height:100}}>

<Text style = {{margin:4,color:'white',fontSize:18, fontFamily:'Konnect-Medium'}}>
Online Timing

</Text>

<Text style = {{margin:4,color:'white',fontSize:18,fontFamily:'Konnect-Medium'}}>
{online}

</Text>
      </View>

)}
{online != '' && offline != '' && (
      <View style = {{margin:10,width:window.width - 20,backgroundColor:'#99181E',height:100}}>

    <Text style = {{margin:4,color:'white',fontFamily:'Konnect-Medium',fontSize:18}}>
    Offline Timing

    </Text>

    <Text style = {{margin:4,color:'white',fontFamily:'Konnect-Medium',fontSize:18}}>
    {offline}
    </Text>
      </View>
    )}


                </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor :'#f1f1f1',
        height:window.height-25
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
