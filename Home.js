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
  AsyncStorage,
  StatusBar,
  Platform,
  ImageBackground,
  Modal,
} from 'react-native';
import 'react-native-gesture-handler';
import store from 'react-native-simple-store';
import MaterialTabs from 'react-native-material-tabs';
import Location from './Location.js';
import Landing from './Landing.js';
import requestCameraAndAudioPermission from './requestCameraAndAudioPermission.js';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import {DialogComponent, DialogTitle} from 'react-native-dialog-component';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

import Carousel from 'react-native-banner-carousel';
import {Header} from 'react-navigation';
import Button from 'react-native-button';
import {TextField} from 'react-native-material-textfield';
type Props = {};

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Home extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    company: '',
    selectedTab: 0,
    loading: false,
    visible: false,
    searchText: '',
    banner: [],
    speciality: [],
    article: [],
    list: [],
    lists: [],
    selected: false,
    data: [],
    results: [],
    modalVisible: false,
    dstatus: '',
    dstatus_id: '',
    chatButton: false,
    d_allstatus: [
      {id: '0', status_name: 'Offline'},
      {id: '1', status_name: 'Online'},
      {id: '2', status_name: 'On Vacation'},
      {id: '3', status_name: 'Break'},
    ],
  };

  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
      animations: {
        setRoot: {
          waitForRender: false,
        },
      },
    };
  };

  showLoading() {
    this.setState({loading: true});
  }

  hideLoading() {
    this.setState({loading: false});
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  submitStatus = () => {
    const url = GLOBAL.BASE_URL + 'update_doctor_status';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        doctor_id: GLOBAL.user_id,
        status: GLOBAL.status_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == true) {
          alert('Status changed successfully!');
          this.setState({dstatus: responseJson.doctorstatus});
          this.setState({dstatus_id: responseJson.doctor_id});
        } else {
        }
      })
      .catch(error => {
        console.error(error);
        this.hideLoading();
      });
  };

  getSelection = (item, index) => {
    //    alert(JSON.stringify(item))
    this.setModalVisible(false);
    this.setState({dstatus: item.status_name});
    GLOBAL.status_id = item.id;
  };
  _renderItems = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this.getSelection(item, index)}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'white',
            height: 38,
            borderBottomColor: '#e7e4e4',
            borderBottomWidth: 1,
            padding: 7,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              height: 'auto',
              fontFamily: 'Konnect-Regular',
            }}>
            {item.status_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getData = type => {
    //  alert(type)

    this.timeoutCheck = setTimeout(() => {
      const url = GLOBAL.BASE_URL + 'home_doctor';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          condition: type,
          user_id: GLOBAL.user_id,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          //  alert(JSON.stringify(responseJson));

          // alert(JSON.stringify(responseJson))

          if (responseJson.status == true) {
            //        this.setState({list:responseJson.lists})
            //  this.setState((prevState, props) => {
            // return {list:responseJson.lists}
            // })
            if (type == 'consult_online') {
              this.setState({list: responseJson.lists});
            } else {
              this.setState({lists: responseJson.lists});
            }
            this.getData(type);

            //         alert('Type from' + type)
          } else {
            if (type == 'consult_online') {
              this.setState({list: []});
            } else {
              this.setState({lists: []});
            }
          }

          //        this.getDatad(type)
        })
        .catch(error => {
          console.error(error);
          this.hideLoading();
        });
    }, 400);
  };

  componentDidMount() {
    // alert(JSON.stringify(GLOBAL.user_id))
    if (Platform.OS === 'android') {
      //Request required permissions from Android
      requestCameraAndAudioPermission().then(_ => {
        console.log('requested!');
      });
    }

    this.props.navigation.addListener('willFocus', this._handleStateChange);
  }

  getDatas = type => {
    const url = GLOBAL.BASE_URL + 'home_doctor';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        condition: type,
        user_id: GLOBAL.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //        console.log('call again')

        if (responseJson.status == true) {
          this.setState({list: responseJson.lists});

          // GLOBAL.another = responseJson.patient_id,
          // GLOBAL.anothername = responseJson.patient_name
          // GLOBAL.bookingid = responseJson.chat_g_id
          // GLOBAL.mybookingid = responseJson.booking_id
          // this.setState({isok:responseJson.is_chat_or_video_start})
        } else {
          this.setState({list: []});
        }

        // this.getDatas(type)
      })
      .catch(error => {
        console.error(error);
        //this.hideLoading()
      });
  };

  _handleStateChange = state => {
    this.getDoctorStatus();
    this.getData('consult_online');
    this.setState({show: true});
    if (this.state.selectedTab == 0) {
      this.getData('consult_online');
    } else if (this.state.selectedTab == 1) {
      this.getData('consult_offline');
    } else if (this.state.selectedTab == 2) {
      this.getData('doorstep');
    }
  };

  confCancel = (type, index) => {
    Alert.alert(
      'Confirm!',
      'Are you sure you want to cancel this Appointment?',
      [
        {text: 'Cancel'},
        {
          text: 'Yes',
          onPress: () => this.cancel(type, index),
        },
      ],
      {cancelable: false},
    );
  };

  getDoctorStatus = () => {
    const url = GLOBAL.BASE_URL + 'doctor_status';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        doctor_id: GLOBAL.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == true) {
          this.setState({dstatus: responseJson.doctorstatus});
          this.setState({dstatus_id: responseJson.d_status});
        } else {
        }
      })
      .catch(error => {
        console.error(error);
        this.hideLoading();
      });
  };

  startConsult = item => {
    //   console.log(JSON.stringify(item))
    if (item.video_start == 1) {
      GLOBAL.mybookingid = item.id;
      GLOBAL.another = item.patient_id;
      GLOBAL.bookingid = item.chat_g_id;

      if (
        item.is_chat_or_video_start == '0' ||
        item.is_chat_or_video_start == 0
      ) {
        const url = GLOBAL.BASE_URL + 'start_status_online_consult';

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            booking_id: item.id,
            what: '1',
            from: 'doctor',
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            GLOBAL.bookingid = item.chat_g_id;

            if (responseJson.status == true) {
              if (item.online_mode == 'chat') {
                this.props.navigation.navigate('Chat');
              } else {
                GLOBAL.bookingid = item.chat_g_id;
                this.props.navigation.navigate('VideoCall', {
                  channelName: GLOBAL.bookingid,
                  onCancel: message => {
                    this.setState({
                      visible: true,
                      message,
                    });
                  },
                });
              }
            } else {
            }
          })
          .catch(error => {
            console.error(error);
            //this.hideLoading()
          });
      } else {
        GLOBAL.bookingid = item.chat_g_id;

        if (item.online_mode == 'chat') {
          this.props.navigation.navigate('Chat');
        } else {
          GLOBAL.bookingid = item.chat_g_id;
          this.props.navigation.navigate('VideoCall', {
            channelName: GLOBAL.bookingid,
            onCancel: message => {
              this.setState({
                visible: true,
                message,
              });
            },
          });
        }
      }
    } else {
      alert('Session has not started yet!');
    }
  };

  selectedFirst = item => {
    //  alert(JSON.stringify(item));
    GLOBAL.appointment = item;
    this.props.navigation.navigate('AppointmentDetail');
  };

  renderItem1 = ({item, index}) => {
    // var activeChat;
    // if(item.video_start == 1){
    //     activeChat = true
    // }else{
    //     activeChat = false
    // }

    return (
      <TouchableOpacity
        onPress={() => this.selectedFirst(item)}
        style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            borderColor: 'transparent',
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginTop: 15,
              marginLeft: 5,
            }}
            source={{uri: item.image}}
          />
          <Text
            style={{
              color: '#C0C0C0',
              fontSize: 11,
              fontFamily: 'Konnect-Medium',
              position: 'absolute',
              top: 23,
              right: 10,
            }}>
            {item.booking_date}
          </Text>

          <View
            style={{flexDirection: 'column', marginTop: 15, marginLeft: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Konnect-Medium',
                marginTop: 8,
              }}>
              Booking id: {item.id}
            </Text>

            {item.name == '' && (
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Konnect-Medium',
                  marginTop: 8,
                }}>
                Anonymous User
              </Text>
            )}
            {item.name !== '' && (
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Konnect-Medium',
                  marginTop: 8,
                }}>
                {item.name}
              </Text>
            )}

            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'Konnect-Medium',
                marginTop: 8,
              }}>
              Booking For : {item.booking_for}
            </Text>

            {/*                    <Text style={{color:'black', fontSize:14,fontFamily:'Konnect-Medium',marginTop:8, width:'90%'}}>Problem : {item.problem}</Text>*/}
            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                fontFamily: 'Konnect-Medium',
                marginTop: 8,
              }}>
              Booking Type : {item.booking_mode}
            </Text>
            {/*                    <Text style={{color:'black', fontSize:14,fontFamily:'Konnect-Medium',marginTop:8}}>Gender : {item.gender}</Text> */}

            {item.remain_date == '0' && <View style={{height: 0.5}} />}
            {item.remain_date != '0' && (
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  fontFamily: 'Konnect-Medium',
                  marginTop: 8,
                }}>
                {item.remain_date}
              </Text>
            )}
            <View style={{flexDirection: 'row', marginTop: 15}}>
              {item.online_mode == 'chat' && (
                <Button
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontFamily: 'Konnect-Medium',
                  }}
                  onPress={() => {
                    this.startConsult(item);
                    // alert('hi')
                  }}
                  styleDisabled={{color: 'grey'}}
                  containerStyle={{
                    overflow: 'hidden',
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginRight: 60,
                  }}>
                  CHAT NOW
                </Button>
              )}

              {item.online_mode == 'video' && (
                <Button
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontFamily: 'Konnect-Medium',
                  }}
                  onPress={() => {
                    this.startConsult(item);
                  }}
                  containerStyle={{
                    overflow: 'hidden',
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginRight: 60,
                  }}>
                  VIDEO CALL NOW
                </Button>
              )}

              {item.cancel_power == 1 && (
                <Button
                  style={{
                    fontSize: 15,
                    color: '#FF0000',
                    fontFamily: 'Konnect-Medium',
                  }}
                  onPress={() => {
                    this.confCancel(item.id, index);
                  }}
                  containerStyle={{
                    overflow: 'hidden',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                  CANCEL
                </Button>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  onchange = index => {
    this.setState({selectedTab: index});

    if (index == 0) {
      this.getData('consult_online');
    } else if (index == 1) {
      this.getData('consult_offline');
    } else if (index == 2) {
      this.getData('doorstep');
    }
  };

  cancel = (type, index) => {
    const url = GLOBAL.BASE_URL + 'cancel_by_doctor';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking_id: type,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //   console.log(JSON.stringify(responseJson))
        if (responseJson.status == true) {
          alert('Appointment cancelled successfully!');
          this.getData('consult_online');
        } else {
          alert('Something went wrong!');
        }
      })
      .catch(error => {
        console.error(error);
        this.hideLoading();
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#800000"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#6d0000" />

        <View style={{backgroundColor: 'white'}} />
        <View
          style={{
            backgroundColor: '#800000',
            height: 54,
            width: '100%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{width: '76%'}}
            onPress={() => this.props.navigation.toggleDrawer()}
            activeOpacity={0.9}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{margin: 15, height: 25, width: 30}}
                source={require('./drawer.png')}
              />

              <Image
                style={{marginTop: 14, height: 27, width: 27, marginLeft: -7}}
                source={require('./homelogo.png')}
              />

              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Konnect-Medium',
                  color: 'white',
                  marginTop: 17,
                  marginLeft: 8,
                }}>
                Home
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Konnect-Medium',
            margin: 15,
          }}>
          Mark Status
        </Text>

        <View
          style={{
            height: 70,
            backgroundColor: 'white',
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            marginBottom: 20,
            borderRadius: 5,
            borderColor: 'transparent',
            borderWidth: 1,
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              marginLeft: 10,
            }}>
            <TouchableOpacity
              style={{
                width: '60%',
                borderRadius: 4,
                borderColor: '#bfbfbf',
                borderWidth: 1,
              }}
              onPress={() => this.setModalVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  padding: 15,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Konnect-Medium',
                  }}>
                  {this.state.dstatus}
                </Text>
                <Image
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                  source={require('./drop.png')}
                />
              </View>
            </TouchableOpacity>

            <Button
              style={{
                padding: 10,
                marginTop: 5,
                fontSize: 14,
                color: 'white',
                backgroundColor: '#800000',
                width: 100,
                height: 40,
                fontFamily: 'Konnect-Medium',
                borderRadius: 20,
              }}
              styleDisabled={{color: 'red'}}
              onPress={() => this.submitStatus()}>
              SUBMIT
            </Button>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'transparent',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 5,
            borderColor: 'transparent',
            borderWidth: 1,
          }}>
          <MaterialTabs
            items={['Consult Online', 'Consult Offline']}
            selectedIndex={this.state.selectedTab}
            onChange={index => this.onchange(index)}
            barColor="white"
            barStyle={{backgroundColor: 'red'}}
            indicatorColor="#800000"
            activeTextColor="#800000"
            inactiveTextColor="grey"
            activeTextStyle={{fontFamily: 'Konnect-Medium'}}
          />

          {this.state.selectedTab == 0 && (
            <View style={{marginTop: 15}}>
              {this.state.list.length == 0 && (
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: 18,
                    color: 'black',
                    alignSelf: 'center',
                    height: 'auto',
                    fontFamily: 'Konnect-Regular',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  No Online Bookings found!
                </Text>
              )}

              {this.state.list.length != 0 && (
                <FlatList
                  style={{marginBottom: 410}}
                  data={this.state.list}
                  keyExtractor={this._keyExtractor1}
                  renderItem={this.renderItem1}
                  extraData={this.state}
                />
              )}
            </View>
          )}

          {this.state.selectedTab == 1 && (
            <View style={{marginTop: 15}}>
              {this.state.lists.length == 0 && (
                <Text
                  style={{
                    marginTop: 30,
                    fontSize: 18,
                    color: 'black',
                    alignSelf: 'center',
                    height: 'auto',
                    fontFamily: 'Konnect-Regular',
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  No Offline Bookings found!
                </Text>
              )}

              {this.state.lists.length != 0 && (
                <FlatList
                  style={{marginBottom: 410}}
                  data={this.state.lists}
                  keyExtractor={this._keyExtractor1}
                  renderItem={this.renderItem1}
                  extraData={this.state}
                />
              )}
            </View>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //             Alert.alert('Modal has been closed.');
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              alignItems: 'center',
            }}
            activeOpacity={1}
            onPressOut={() => {
              this.setModalVisible(false);
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 300,
                  backgroundColor: 'white',
                  height: 300,
                }}>
                <View style={{width: '95%', margin: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#800000',
                      fontFamily: 'Konnect-Medium',
                    }}>
                    Mark Status
                  </Text>
                  <View
                    style={{
                      backgroundColor: '#800000',
                      height: 5,
                      width: '7%',
                      borderRadius: 4,
                      marginTop: 5,
                    }}
                  />
                  <View style={{marginTop: 20, flexDirection: 'column'}}>
                    <FlatList
                      data={this.state.d_allstatus}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this._renderItems}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5f7',
  },
  loading: {
    position: 'absolute',
    left: window.width / 2 - 30,
    top: window.height / 2,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
