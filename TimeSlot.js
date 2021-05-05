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
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
import CalendarPicker from 'react-native-calendar-picker';
import Header from './Header.js';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      chatTime :[],
      videoTime :[],
        offlineTime :[],
    };
    this.onDateChange = this.onDateChange.bind(this);
  }


  onDateChange(date) {
   this.setState({
     selectedStartDate: date,
   });
 }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            //   header: () => null,
            headerLeft:<Header navigation={navigation}
            headerName={'TIME SLOTS'}/>,
            headerRight:  <TouchableOpacity onPress={() =>params.handleSave()
            }>
                <Text style={{color :'white',fontFamily:'Konnect-Regular',fontSize: 16,marginRight:10}} >
                  Edit
                </Text>
            </TouchableOpacity>,
            title: 'TIME SLOTS',
            headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'white', fontFamily:'Konnect-Medium'},
            headerStyle:{
                backgroundColor:'#800000',
            },
            headerTintColor :'white',
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



    showLoading() {
        this.setState({loading: true})
    }
    _saveDetails=()=> {

  this.props.navigation.navigate('Calendar')
    }

    componentDidMount(){
        this.props.navigation.setParams({ handleSave: this._saveDetails });

      const url = GLOBAL.BASE_URL +  'list_doctor_time_slots_by_admin'

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },


          body: JSON.stringify({
      "user_id":GLOBAL.user_id
  }),
}).then((response) => response.json())
.then((responseJson) => {



  if(responseJson.status==true){

   this.setState({chatTime:responseJson.chat_time})
      this.setState({videoTime:responseJson.video_time})
    this.setState({offlineTime:responseJson.offline_time})
//offlineTime

  }else{
      this.setState({list:[]})
  }




})
.catch((error) => {
  console.error(error);
  this.hideLoading()
});
    }


    render() {

  var monF = ""
  var monS = ""
  var tueF = ""
  var tueS = ""


  var wedF = ""
  var wedS = ""

  var thuF = ""
  var thuS = ""

  var friF = ""
  var friS = ""

  var satF = ""
  var satS = ""

  var sunF = ""
  var sunS = ""




    var vmonF = ""
    var vmonS = ""
    var vtueF = ""
    var vtueS = ""


    var vwedF = ""
    var vwedS = ""

    var vthuF = ""
    var vthuS = ""

    var vfriF = ""
    var vfriS = ""

    var vsatF = ""
    var vsatS = ""

    var vsunF = ""
    var vsunS = ""




    var omonF = ""
    var omonS = ""
    var otueF = ""
    var otueS = ""


    var owedF = ""
    var owedS = ""

    var othuF = ""
    var othuS = ""

    var ofriF = ""
    var ofriS = ""

    var osatF = ""
    var osatS = ""

    var osunF = ""
    var osunS = ""




     if (this.state.chatTime.length != 0){

       monF = `${this.state.chatTime.mon[0].start} - ${this.state.chatTime.mon[0].end}`;
          monS = `${this.state.chatTime.mon[1].start} - ${this.state.chatTime.mon[1].end}`;
          tueF = `${this.state.chatTime.tue[0].start} - ${this.state.chatTime.tue[0].end}`;
             tueS = `${this.state.chatTime.tue[1].start} - ${this.state.chatTime.tue[1].end}`;

             wedF = `${this.state.chatTime.wed[0].start} - ${this.state.chatTime.wed[0].end}`;
                wedS = `${this.state.chatTime.wed[1].start} - ${this.state.chatTime.wed[1].end}`;

                thuF = `${this.state.chatTime.thu[0].start} - ${this.state.chatTime.thu[0].end}`;
                   thuS = `${this.state.chatTime.thu[1].start} - ${this.state.chatTime.thu[1].end}`;


                   friF = `${this.state.chatTime.fri[0].start} - ${this.state.chatTime.fri[0].end}`;
                      friS = `${this.state.chatTime.fri[1].start} - ${this.state.chatTime.fri[1].end}`;

                      satF = `${this.state.chatTime.sat[0].start} - ${this.state.chatTime.sat[0].end}`;
                         satS = `${this.state.chatTime.sat[1].start} - ${this.state.chatTime.sat[1].end}`;

                         sunF = `${this.state.chatTime.sun[0].start} - ${this.state.chatTime.sun[0].end}`;
                            sunS = `${this.state.chatTime.sun[1].start} - ${this.state.chatTime.sun[1].end}`;

     }



     if (this.state.videoTime.length != 0){

       vmonF = `${this.state.videoTime.mon[0].start} - ${this.state.videoTime.mon[0].end}`;
        vmonS = `${this.state.videoTime.mon[1].start} - ${this.state.videoTime.mon[1].end}`;
          vtueF = `${this.state.videoTime.tue[0].start} - ${this.state.videoTime.tue[0].end}`;
             vtueS = `${this.state.videoTime.tue[1].start} - ${this.state.videoTime.tue[1].end}`;

             vwedF = `${this.state.videoTime.wed[0].start} - ${this.state.videoTime.wed[0].end}`;
                vwedS = `${this.state.videoTime.wed[1].start} - ${this.state.videoTime.wed[1].end}`;

                vthuF = `${this.state.videoTime.thu[0].start} - ${this.state.videoTime.thu[0].end}`;
                   vthuS = `${this.state.videoTime.thu[1].start} - ${this.state.videoTime.thu[1].end}`;


                   vfriF = `${this.state.videoTime.fri[0].start} - ${this.state.videoTime.fri[0].end}`;
                      vfriS = `${this.state.videoTime.fri[1].start} - ${this.state.videoTime.fri[1].end}`;

                      vsatF = `${this.state.videoTime.sat[0].start} - ${this.state.videoTime.sat[0].end}`;
                         vsatS = `${this.state.videoTime.sat[1].start} - ${this.state.videoTime.sat[1].end}`;

                         vsunF = `${this.state.videoTime.sun[0].start} - ${this.state.videoTime.sun[0].end}`;
                            vsunS = `${this.state.videoTime.sun[1].start} - ${this.state.videoTime.sun[1].end}`;

     }



     if (this.state.offlineTime.length != 0){

       omonF = `${this.state.offlineTime.mon[0].start} - ${this.state.offlineTime.mon[0].end}`;
        omonS = `${this.state.offlineTime.mon[1].start} - ${this.state.offlineTime.mon[1].end}`;
          otueF = `${this.state.offlineTime.tue[0].start} - ${this.state.offlineTime.tue[0].end}`;
             otueS = `${this.state.offlineTime.tue[1].start} - ${this.state.offlineTime.tue[1].end}`;

             owedF = `${this.state.offlineTime.wed[0].start} - ${this.state.offlineTime.wed[0].end}`;
                owedS = `${this.state.offlineTime.wed[1].start} - ${this.state.offlineTime.wed[1].end}`;

                othuF = `${this.state.offlineTime.thu[0].start} - ${this.state.offlineTime.thu[0].end}`;
                   othuS = `${this.state.offlineTime.thu[1].start} - ${this.state.offlineTime.thu[1].end}`;


                   ofriF = `${this.state.offlineTime.fri[0].start} - ${this.state.offlineTime.fri[0].end}`;
                      ofriS = `${this.state.offlineTime.fri[1].start} - ${this.state.offlineTime.fri[1].end}`;

                      osatF = `${this.state.offlineTime.sat[0].start} - ${this.state.offlineTime.sat[0].end}`;
                         osatS = `${this.state.offlineTime.sat[1].start} - ${this.state.offlineTime.sat[1].end}`;

                         osunF = `${this.state.offlineTime.sun[0].start} - ${this.state.offlineTime.sun[0].end}`;
                            osunS = `${this.state.offlineTime.sun[1].start} - ${this.state.offlineTime.sun[1].end}`;

     }

// this.state.chatTime.mon[0].start
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
                <KeyboardAwareScrollView style = {{}}>
                <View style={styles.container}>

                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:18,marginTop:20, fontFamily:'Konnect-Medium', marginBottom:20}}>
                Chat Consultation

                </Text>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5,}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                MON

                </Text>

                </View>

            <View>

            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
    {monF}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>
            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
    {monS}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>

            </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                TUE

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {tueF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {tueS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:9.58}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                WED

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {wedF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {wedS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>


                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                THU

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {thuF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {thuS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                FRI

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {friF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {friS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SAT

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {satF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {satS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SUN

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {sunF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {sunS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:18,marginTop:20,marginBottom:20,fontFamily:'Konnect-Medium'}}>
                Video Consultation

                </Text>



                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                MON

                </Text>

                </View>

            <View>

            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
      {vmonF}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>
            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
      {vmonS}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>
            </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                TUE

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vtueF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vtueS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                WED

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vwedF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vwedS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>


                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                THU

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vthuF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vthuS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                FRI

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vfriF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vfriS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SAT

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vsatF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vsatS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SUN

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vsunF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {vsunS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:18,marginTop:20,marginBottom:20,fontFamily:'Konnect-Medium'}}>
                Offline Consultation

                </Text>



                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                MON

                </Text>

                </View>

            <View>

            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
            {omonF}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>
            <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
            {omonS}

            </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

            </View>
            </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                TUE

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {otueF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {otueS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                WED

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {owedF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {owedS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>


                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                THU

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {othuF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {othuS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                FRI

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {ofriF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {ofriS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SAT

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {osatF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {osatS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                <View style = {{flexDirection:'row'}}>

                <View style = {{backgroundColor:'#f0f0f6',width:100,height:103, borderColor:'rgb(75, 75, 75)', borderWidth:0.5}}>
                <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:40,color:'rgb(116, 116, 116)',fontFamily:'Konnect-Regular'}}>
                SUN

                </Text>

                </View>

              <View>

              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {osunF}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              <Text style = {{alignSelf:'center',textAlign:'center',fontSize:17,marginTop:20,fontFamily:'Konnect-Medium', color:'rgb(255, 159, 0)'}}>
              {osunS}

              </Text>
              <View style = {{backgroundColor:'grey',width:window.width - 100,height:1,marginTop:10}}>

              </View>
              </View>



                </View>

                </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor :'white',

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
