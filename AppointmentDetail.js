import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import Header from './Header.js';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
class AppointmentDetail extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
      // title: 'APPOINTMENT DETAILS',
      // headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
      // headerStyle:{
      //     backgroundColor:'white',
      // },
      // headerTintColor :'#0592CC',
      // animations: {
      //     setRoot: {
      //         waitForRender: false
      //     }
      // }
    };
  };

  renderRowItem = itemData => {
    //        alert(JSON.stringify(itemData))
    return (
      <TouchableOpacity onPress={() => Linking.openURL(itemData.item)}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 5,
            width: '40%',
            height: 200,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Image
            style={{width: 130, height: 200, resizeMode: 'cover'}}
            source={{uri: itemData.item}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      image: '',
      details_ap: GLOBAL.appointment,
    };
  }

  componentDidMount() {
    //      alert(JSON.stringify(GLOBAL.appointment))
  }

  render() {
    var yeah = this.state.details_ap;
    console.log(JSON.stringify(yeah));
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={this.props.navigation}
          headerName={'APPOINTMENT DETAILS'}
        />
        <ScrollView>
          <View
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: 'white',
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 18,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Konnect-Regular',
                  color: '#0000004D',
                }}>
                Date and time
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Konnect-Medium',
                  color: '#0000004D',
                  marginRight: 18,
                }}>
                Booking id:{GLOBAL.appointment.id}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.booking_date}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 15,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Patient Details
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 10,
              }}>
              {GLOBAL.appointment.email}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 10,
              }}>
              {GLOBAL.appointment.mobile}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 10,
              }}>
              {GLOBAL.appointment.gender}
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 10,
              }}>
              Booking For: {GLOBAL.appointment.booking_for}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Patient Complaint
            </Text>
            {GLOBAL.appointment.problem == '' && (
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Konnect-Medium',
                  color: '#000000',
                  marginLeft: 18,
                  marginTop: 15,
                }}>
                No complaint provided by the patient!
              </Text>
            )}

            {GLOBAL.appointment.problem != '' && (
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Konnect-Medium',
                  color: '#000000',
                  marginLeft: 18,
                  marginTop: 15,
                }}>
                {GLOBAL.appointment.problem}
              </Text>
            )}

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            {GLOBAL.appointment.hasOwnProperty('prescription_content') ==
              true && (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Konnect-Regular',
                    color: '#0000004D',
                    marginLeft: 18,
                    marginTop: 20,
                  }}>
                  Patient Prescription
                </Text>

                <FlatList
                  style={{flexGrow: 0, marginBottom: 10}}
                  data={GLOBAL.appointment.prescription_content}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderRowItem}
                  extraData={this.state}
                />
                <View
                  style={{
                    borderBottomWidth: 1,
                    width: '100%',
                    borderBottomColor: '#0000001A',
                    marginTop: 20,
                  }}
                />
              </View>
            )}

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Type
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.booking_mode}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Age
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.dob}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Past Booking Count
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.count_booking}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Address
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.address}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Time
            </Text>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Konnect-Medium',
                color: '#000000',
                marginLeft: 18,
                marginTop: 15,
              }}>
              {GLOBAL.appointment.start_time_end_time}
            </Text>

            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Konnect-Regular',
                color: '#0000004D',
                marginLeft: 18,
                marginTop: 20,
              }}>
              Photos
            </Text>

            {GLOBAL.appointment.imagess.length == 0 && (
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Konnect-Medium',
                  width: '100%',
                  marginLeft: 18,
                }}>
                No Images Added!
              </Text>
            )}
            {GLOBAL.appointment.imagess.length != 0 && (
              <FlatList
                style={{flexGrow: 0, marginBottom: 10}}
                data={GLOBAL.appointment.imagess}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderRowItem}
                extraData={this.state}
              />
            )}
            <View
              style={{
                borderBottomWidth: 1,
                width: '100%',
                borderBottomColor: '#0000001A',
                marginTop: 20,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AppointmentDetail;
