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

export default class AddTime extends Component {
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

  const url = GLOBAL.BASE_URL +  'doctor_time_slots_create'

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
  this.props.navigation.goBack()
   alert('Successfully Added')

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
                <Header navigation={this.props.navigation}
                headerName={'ADD TIME SLOT'}
                />

                <KeyboardAwareScrollView>
                <View style={styles.container}>

      <Text style = {{marginLeft:20,marginTop:20,marginBottom:10,color:'#1E2432',fontSize:18, fontFamily:'Konnect-Medium'}}>
      Add Online Timing Slot

      </Text>


                <DatePicker
                       style={{width: window.width - 20, marginTop:5}}
                       date={this.state.date}
                       mode="time"
                       placeholder="Select Start Time"
                       placeholderColor = {'black'}
                      format="hh:mma"

                       is24Hour = {false}
                       confirmBtnText="Confirm"
                       cancelBtnText="Cancel"
                       iconSource={require('./slots_picker.png')}
                       customStyles={{
                         dateIcon: {
                           position: 'absolute',
                           right: 5,
                           top: 15,
                           padding:10,
                           width:20, height:20,
                           marginLeft: 20
                         },
                         dateInput: {
                           marginLeft: 20,
                           borderColor:'#e5e5e5',
                           borderRadius:5,
                           justifyContent: 'center',
                           alignItems: 'flex-start',
                           marginTop:10,
                           paddingLeft:10,
                           width:'90%',
                         }
                         // ... You can check the source to find the other keys.
                       }}
                       onDateChange={(date) => {this.setState({date: date})}}
                     />



                     <DatePicker
                            style={{width: window.width - 20,marginTop:25}}
                            date={this.state.dates}
                            mode="time"
                              format="hh:mma"
                            placeholder="Select End Time"
                            placeholderColor = {'black'}


                            is24Hour = {false}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                           iconSource={require('./slots_picker.png')}

                            customStyles={{
                         dateIcon: {
                           position: 'absolute',
                           right: 5,
                           top: 15,
                           padding:10,
                           width:20, height:20,
                           marginLeft: 20
                         },
                         dateInput: {
                           marginLeft: 20,
                           borderColor:'#e5e5e5',
                           borderRadius:5,
                           justifyContent: 'center',
                           alignItems: 'flex-start',
                           marginTop:10,
                           paddingLeft:10,
                           width:'90%',
                         } 
                         // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(dates) => {this.setState({dates: dates})}}
                          />

                          <Text style = {{marginTop:30,marginLeft:20,marginBottom:10,color:'#1E2432',fontSize:18, fontFamily:'Konnect-Medium'}}>
                          Add Offline Timing Slot

                          </Text>


                          <DatePicker
                                 style={{width: window.width - 20, marginTop:5}}
                                 date={this.state.datess}
                                 mode="time"
                                 placeholder="Select Start Time"
                                 placeholderColor = {'black'}
                                format="hh:mma"

                                 is24Hour = {false}
                                 confirmBtnText="Confirm"
                                 iconSource={require('./slots_picker.png')}

                                  customStyles={{
                               dateIcon: {
                                 position: 'absolute',
                                 right: 5,
                                 top: 15,
                                 padding:10,
                                 width:20, height:20,
                                 marginLeft: 20
                               },
                               dateInput: {
                                 marginLeft: 20,
                                 borderColor:'#e5e5e5',
                                 borderRadius:5,
                                 justifyContent: 'center',
                                 alignItems: 'flex-start',
                                 marginTop:10,
                                 paddingLeft:10,
                                 width:'90%',
                               } 
                                   // ... You can check the source to find the other keys.
                                 }}
                                 onDateChange={(datess) => {this.setState({datess: datess})}}
                               />

                               <DatePicker
                                      style={{width: window.width - 20,marginTop:25}}
                                      date={this.state.datesss}
                                      mode="time"
                                        format="hh:mma"
                                      placeholder="Select End Time"
                                      placeholderColor = {'black'}
                                      is24Hour = {false}
                                      confirmBtnText="Confirm"
                                     iconSource={require('./slots_picker.png')}

                                      customStyles={{
                                   dateIcon: {
                                     position: 'absolute',
                                     right: 5,
                                     top: 15,
                                     padding:10,
                                     width:20, height:20,
                                     marginLeft: 20
                                   },
                                   dateInput: {
                                     marginLeft: 20,
                                     borderColor:'#e5e5e5',
                                     borderRadius:5,
                                     justifyContent: 'center',
                                     alignItems: 'flex-start',
                                     marginTop:10,
                                     paddingLeft:10,
                                     width:'90%',
                                   } 
                                        // ... You can check the source to find the other keys.
                                      }}
                                      onDateChange={(datesss) => {this.setState({datesss: datesss})}}
                                    />



                <TouchableOpacity style={{marginTop:'20%'}}
                    onPress={() => this.save()}>
                    <View style = {{backgroundColor:'#800000',height:55,borderRadius:27.5,alignSelf:'center',width:300,
                        borderBottomWidth: 0,
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        flexDirection:'row'}}>


                        <Text style= {{width:'100%',alignSelf:'center',textAlign:'center',fontSize:20,fontFamily:'Konnect-Medium',color:'white',padding:11}} >
                            SAVE
                        </Text>

                        <Image style = {{width :25 ,height: 25,resizeMode: 'contain',marginLeft:-50,alignSelf:'center'}}
                               source={require('./right.png')}/>
                    </View>
                    </TouchableOpacity>


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
