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
import DatePicker from 'react-native-datepicker'
const GLOBAL = require('./Global');
import moment from 'moment';
const window = Dimensions.get('window');
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};
var date ;
import Header from './Header.js';
import CalendarPicker from 'react-native-calendar-picker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class UpdateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      online :[],
      offline :[],
      date:'',
      dates:'',
        datess:'',
          datess:'',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }


  onDateChange(date) {

    var t = new Date( date );
     var s = moment(t).format('YYYY-MM-DD')
    this._handlePressLogin(s)


 }


     _handlePressLogin =(s)=> {

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

    componentDidMount(){
      var s = moment().format('YYYY-MM-DD')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

save = () =>{
var a = "";
var b = ""
if (this.state.date == ''){
  a = ""
  b = ""
}else{
  a =  this.state.date
  b = this.state.dates
  if (this.state.dates == ""){
    return
  }
}

var c = "";
var d = ""
if (this.state.datess == ''){
  c = ""
  d = ""
}else{
  c =  this.state.datess
  d = this.state.datesss
  if (this.state.datesss == ""){
    return
  }
}



var commonHtml = `{"start":"${a}","end":"${b}"}`;
var commonHtmls = `{"start":"${c}","end":"${d}"}`;

  const url = GLOBAL.BASE_URL +  'doctor_update_time_slots'

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },


      body: JSON.stringify({
  "user_id":GLOBAL.user_id,
  "date":  GLOBAL.date,
  "json":commonHtml,
  "json_offline":commonHtmls

 }),
 }).then((response) => response.json())
 .then((responseJson) => {



 if(responseJson.status== true){
   alert('Successfully Added')
  this.props.navigation.goBack()

 //offlineTime

 }else{
 alert('Unable to add.')
 }




 })
 .catch((error) => {
 console.error(error);
 this.hideLoading()
 });

}

    render() {


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
                <KeyboardAwareScrollView>
                <View style={styles.container}>

                <Header navigation={this.props.navigation}
                headerName={'UPDATE TIME SLOT'}
                />
      <Text style = {{margin:10,color:'#1E2432',fontSize:20, fontFamily:'Konnect-Medium'}}>
      Add Online Timing Slot

      </Text>


                <DatePicker
                       style={{width: window.width - 20}}
                       date={this.state.date}
                       mode="time"
                       placeholder="Select From Time"
                       placeholderColor = {'black'}
                      format="hh:mma"

                       is24Hour = {false}
                       confirmBtnText="Confirm"
                       cancelBtnText="Cancel"
                       customStyles={{
                         dateIcon: {
                           position: 'absolute',
                           left: 0,
                           top: 20,
                           marginLeft: 20
                         },
                         dateInput: {
                           marginLeft: 56,
                           borderColor:'#1E2432',
                           borderRadius:4,
                           marginTop:20,
                           width:window.width - 100,
                         }
                         // ... You can check the source to find the other keys.
                       }}
                       onDateChange={(date) => {this.setState({date: date})}}
                     />



                     <DatePicker
                            style={{width: window.width - 20,marginTop:40}}
                            date={this.state.dates}
                            mode="time"
                              format="hh:mma"
                            placeholder="Select From Time"
                            placeholderColor = {'black'}


                            is24Hour = {false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                              dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 20,
                                marginLeft: 20
                              },
                              dateInput: {
                                marginLeft: 56,
                                borderColor:'#1E2432',
                                borderRadius:4,
                                marginTop:20,
                                width:window.width - 100,
                              }
                              // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(dates) => {this.setState({dates: dates})}}
                          />

                          <Text style = {{margin:10,marginTop:30,color:'#1E2432',fontSize:20, fontFamily:'Konnect-Medium'}}>
                          Add Offline Timing Slot

                          </Text>


                          <DatePicker
                                 style={{width: window.width - 20}}
                                 date={this.state.datess}
                                 mode="time"
                                 placeholder="Select From Time"
                                 placeholderColor = {'black'}
                                format="hh:mma"

                                 is24Hour = {false}
                                 confirmBtnText="Confirm"
                                 cancelBtnText="Cancel"
                                 customStyles={{
                                   dateIcon: {
                                     position: 'absolute',
                                     left: 0,
                                     top: 20,
                                     marginLeft: 20
                                   },
                                   dateInput: {
                                     marginLeft: 56,
                                     borderColor:'#1E2432',
                                     borderRadius:4,
                                     marginTop:20,
                                     width:window.width - 100,
                                   }
                                   // ... You can check the source to find the other keys.
                                 }}
                                 onDateChange={(datess) => {this.setState({datess: datess})}}
                               />

                               <DatePicker
                                      style={{width: window.width - 20,marginTop:40}}
                                      date={this.state.datesss}
                                      mode="time"
                                        format="hh:mma"
                                      placeholder="Select From Time"
                                      placeholderColor = {'black'}


                                      is24Hour = {false}
                                      confirmBtnText="Confirm"
                                      cancelBtnText="Cancel"
                                      customStyles={{
                                        dateIcon: {
                                          position: 'absolute',
                                          left: 0,
                                          top: 20,
                                          marginLeft: 20
                                        },
                                        dateInput: {
                                          marginLeft: 56,
                                          borderColor:'#1E2432',
                                          borderRadius:4,
                                          marginTop:20,
                                          width:window.width - 100,
                                        }
                                        // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(datesss) => {this.setState({datesss: datesss})}}
                                    />

                          <Button
                              style={{padding:7,marginTop:60,fontSize: 20, color: 'white',backgroundColor:'#800000',marginLeft:'5%',width:'90%',height:40,fontFamily:'Konnect-Medium',borderRadius:4}}
                              styleDisabled={{color: 'red'}}
                              onPress={() => this.save()}>
                              Save
                          </Button>

                </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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

})
