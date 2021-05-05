import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    AsyncStorage,
    Platform, ImageBackground
} from 'react-native';
import store from 'react-native-simple-store';
import MaterialTabs from 'react-native-material-tabs';

import Location from './Location.js';
import Landing from './Landing.js';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import { DialogComponent, DialogTitle } from 'react-native-dialog-component';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;
const images = [];
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

import Carousel from 'react-native-banner-carousel';
import { Header } from 'react-navigation';
import Button from 'react-native-button';
import { TextField } from 'react-native-material-textfield';
type Props = {};



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class BookingHistory extends Component {
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
        selected: false,
        data: [],
        results: [],

    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            // title: 'APPOINTMENT HISTORY',
            // headerTitleStyle :{textAlign: 'center',alignSelf:'center',color :'black'},
            // headerStyle:{
            //     backgroundColor:'white',
            // },
            // headerTintColor :'#800000',
            // animations: {
            //     setRoot: {
            //         waitForRender: false
            //     }
            // }
        }
    }




    showLoading() {
        this.setState({ loading: true })
    }





    hideLoading() {
        this.setState({ loading: false })
    }

    _renderItems = ({ item, index }) => {

        return (

            <TouchableOpacity onPress={() => this.getSelection(index)
            }>
                <View style={{
                    flexDirection: 'row', flex: 1, marginLeft: '5%', marginTop: 12, width: '90%', backgroundColor: 'white', height: 38, borderBottomColor: '#77869E', borderBottomWidth: 1
                    , justifyContent: 'space-between'
                }}>

                    <Text style={{ marginLeft: 5, marginTop: 10, fontSize: 20, color: '#77869E', height: 'auto', fontFamily: 'AvenirLTStd-Medium' }}>

                        {item.title}
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }

    showLoading() {
        this.setState({ loading: true })
    }


    getRespone = (res) => {
        this.setState({ speciality: res.specialty })
        this.setState({ banner: res.banners })
        this.setState({ articles: res.articles })

    }

    getData = (type) => {
        const url = GLOBAL.BASE_URL + 'home_doctor_history'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "condition": type,
                "user_id": GLOBAL.user_id

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                //               console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.setState({ list: responseJson.lists })

                } else {
                    this.setState({ list: [] })

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this._handleStateChange);

    }
    _handleStateChange = state => {
        this.getData('consult_online')

    };

    selectedFirst = (item) => {
        //  alert(JSON.stringify(item))
        GLOBAL.appointment = item
        this.props.navigation.navigate('AppointmentDetail')
    }

    renderItem1 = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ width: '95%', marginLeft: 15, marginRight: 15, marginTop: 10, alignSelf: 'center' }} onPress={() => this.selectedFirst(item)
            }>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', width: '100%', borderRadius: 5, borderColor: 'transparent', borderWidth: 1 }}>

                    <Image style={{ width: 70, height: 70, borderRadius: 35, marginTop: 15, marginLeft: 5 }}
                        source={{ uri: item.image }} />
                    <Text style={{ color: '#C0C0C0', fontSize: 11, fontFamily: 'Konnect-Medium', position: 'absolute', top: 23, right: 10 }}>{item.booking_date}</Text>
                    <View style={{ flexDirection: 'column', marginTop: 15, marginLeft: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>Booking id: {item.id}</Text>

                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>{item.name}</Text>
                        <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>Mobile No : {item.mobile}</Text>
                        <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>Booking For : {item.booking_for}</Text>
                        {/*                        <Text style={{color:'black', fontSize:14,fontFamily:'Konnect-Medium',marginTop:8, width:'90%'}}>Problem : {item.problem}</Text> */}
                        <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>Booking Type : {item.booking_mode}</Text>
                        {/*                        <Text style={{color:'black', fontSize:14,fontFamily:'Konnect-Medium',marginTop:8}}>Gender : {item.gender}</Text> */}
                        <Text style={{ color: 'grey', fontSize: 14, fontFamily: 'Konnect-Medium', marginTop: 8 }}>Booking Status: {item.booking_status} </Text>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            {item.booking_status == "complete" && item.is_prescription == "0" && (
                                <Button style={{ fontSize: 13, color: '#FF0000', fontFamily: 'Konnect-Medium' }}
                                    onPress={() => {
                                        this.upload(item.id, index, item)
                                    }}
                                    containerStyle={{ overflow: 'hidden', padding: 7, borderRadius: 5, borderWidth: 1, borderColor: '#800000', justifyContent: 'center', marginBottom: 10, marginTop: 5, backgroundColor: 'white', }}>
                                    UPLOAD{`\n`} PRESCRIPTION
                                </Button>
                            )}


                            {item.booking_status == "complete" && item.is_prescription == "1" && (
                                <Button style={{ fontSize: 13, color: 'white', fontFamily: 'Konnect-Medium' }}
                                    onPress={() => {
                                        this.viewPresc(item, index, item)
                                    }}
                                    containerStyle={{ overflow: 'hidden', padding: 7, borderRadius: 5, justifyContent: 'center', marginBottom: 10, marginTop: 5, backgroundColor: '#800000', }}>
                                    VIEW{`\n`} PRESCRIPTION
                                </Button>
                            )}

                        </View>
                    </View>
                </View>
                {item.rating_flag == 1 && (
                    <Button style={{ fontSize: 13, color: 'white', fontFamily: 'Konnect-Medium' }}
                        onPress={() => {
                            this.viewReview(item, index)
                        }}
                        containerStyle={{
                            overflow: 'hidden', padding: 7, height: 30,
                            borderRadius: 5, justifyContent: 'center', backgroundColor: '#800000', position: 'absolute', bottom: 10, right: 12
                        }}>
                        View Review
                    </Button>

                )}


            </TouchableOpacity>
        );
    }

    onchange = (index) => {
        this.setState({ selectedTab: index })

        if (index == 0) {
            this.getData('consult_online')
        } else if (index == 1) {
            this.getData('consult_offline')
        } else if (index == 2) {
            this.getData('doorstep')
        }


    }
    cancels = (type) => {
        GLOBAL.token = type
        this.props.navigation.navigate('Prescription')
    }

    upload = (type, index, item) => {
        // alert(JSON.stringify(item))
        GLOBAL.order_id = type
        this.props.navigation.navigate('Upload')
    }


    viewReview = (type, index) => {
        //        alert(JSON.stringify(type))
        GLOBAL.reviews = type
        this.props.navigation.navigate('Review')
    }

    viewPresc = (item, index) => {
        // alert(JSON.stringify(item))
        GLOBAL.order_id = item.id
        this.props.navigation.navigate('ViewPrescription')

    }

    render() {



        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator style={styles.loading}

                        size="large" color='#800000' />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.appBar} >
                    <View style={{ flex: 1, flexDirection: 'row', width: window.width, marginTop: 5 }}>
                        <TouchableOpacity style={{ height: 20, width: 20, marginTop: 12, marginLeft: 15 }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Image style={{ height: 18, width: 18 }}
                                source={require('./back.png')} />
                        </TouchableOpacity >

                        <Image style={{ marginTop: 6, height: 27, width: 27, marginLeft: 5 }}
                            source={require('./homelogo.png')} />

                        <Text style={{ color: 'white', width: 200, height: 40, marginLeft: 10, marginTop: 10, fontSize: 15, fontFamily: 'Konnect-Medium' }}>
                            APPOINTMENT HISTORY
      </Text>
                    </View>
                </View>


                <MaterialTabs
                    items={['Consult Online', 'Consult Offline']}
                    selectedIndex={this.state.selectedTab}
                    onChange={(index) => this.onchange(index)}
                    barColor="white"
                    indicatorColor="#800000"
                    activeTextColor="#800000"
                    inactiveTextColor="grey"
                    activeTextStyle={{ fontFamily: 'Konnect-Medium' }}
                />
                {this.state.list.length == 0 && (
                    <Text style={{
                        marginTop: '20%', fontSize: 18, color: 'black', alignSelf: 'center',
                        height: 'auto', fontFamily: 'Konnect-Regular', width: '100%', textAlign: 'center'
                    }}>
                        No Bookings found!
                    </Text>

                )}

                {this.state.list.length != 0 && (

                    <FlatList style={{ marginBottom: 10 }}
                        data={this.state.list}
                        keyExtractor={this._keyExtractor1}
                        renderItem={this.renderItem1}
                        extraData={this.state}
                    />

                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f5f7'
    },
    loading: {
        position: 'absolute',
        left: window.width / 2 - 30,

        top: window.height / 2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    appBar: {
        backgroundColor: '#800000',
        height: APPBAR_HEIGHT,
    },


})