import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationActions, StackActions, } from 'react-navigation';
import PropTypes from 'prop-types';
import {
    ScrollView, Text, View, Linking, AsyncStorage, StyleSheet,
    Image, TouchableOpacity, Alert, TouchableNativeFeedback
} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';




const GLOBAL = require('./Global');

class Drawer extends React.Component {

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.state = {
            my: 'sdf',
            myemail: GLOBAL.myemail,
            myname: GLOBAL.myname,
            myimage: GLOBAL.myimage
        }
    }

    componentDidMount() {
        this.getNewsUpdate()

        this.props.navigation.addListener('willFocus', this._handleStateChange);

    }

    _handleStateChange = state => {
        this.getNewsUpdate()
    };

    getNewsUpdate() {
        //            console.log('caee')

        const url = GLOBAL.BASE_URL + 'doctor_profile'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctor_id: GLOBAL.user_id,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                //   console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                    this.setState({ myimage: responseJson.image })
                    this.setState({ myname: responseJson.name })
                    this.setState({ myemail: responseJson.email })
                    GLOBAL.myname = responseJson.name
                    GLOBAL.myemail = responseJson.email

                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }



    _YesLogout = () => {

        const url = GLOBAL.BASE_URL + 'logout_doctor'
        //      this.showLoading()
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: GLOBAL.user_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                //  console.log(JSON.stringify(responseJson))
                //     this.hideLoading()
                if (responseJson.status == true) {
                    AsyncStorage.removeItem('userID');

                    this.props
                        .navigation
                        .dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Login',
                                    params: { someParams: 'parameters goes here...' },
                                }),
                            ],
                        }))


                    this.props.navigation.dispatch(DrawerActions.closeDrawer())

                } else {
                    alert('Something Went Wrong.')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    navigateToScreen1 = (route) => () => {

        Alert.alert('Logout!', 'Are you sure you want to Logout?',
            [{ text: "Cancel" },
            {
                text: "Yes", onPress: () => this._YesLogout()
            },
            ],
            { cancelable: false }
        )

    }


    navigateToScreen = (route) => () => {

        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView>
                    <View style={{ backgroundColor: 'white', }}>

                        <View style={styles.headertop}>

                            <View style={{ marginTop: 30, marginLeft: 20, flexDirection: 'column' }}>

                                <TouchableOpacity activeOpacity={0.99}>
                                    <View style={{ flexDirection: 'column', marginTop: 5, }}>
                                        <Image style={{ width: 70, height: 70, borderRadius: 35, marginLeft: 10 }}
                                            source={{ uri: this.state.myimage }} />
                                        <Text style={{ marginTop: 10, color: 'white', marginLeft: 10, fontSize: 17, height: 'auto', fontFamily: 'Konnect-Regular' }} >
                                            {this.state.myname}
                                        </Text>
                                        <Text style={[styles.drawerText, { color: 'white' }]} >
                                            {this.state.myemail}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('EditProfile')}>
                                    <View style={{
                                        marginTop: 30, padding: 5, height: 25, overflow: 'hidden', borderRadius: 15, marginLeft: 10, borderWidth: 2, width: 120, marginBottom: 10,
                                        borderColor: 'white', backgroundColor: '#800000', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                    }}>

                                        <Text style={{ fontSize: 12, color: 'white', fontFamily: 'Konnect-Medium', alignSelf: 'center' }}>Edit Profile</Text>

                                    </View>
                                </TouchableNativeFeedback>

                            </View>

                        </View>


                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                source={require('./drawer/d_home.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={() => this.props.navigation.toggleDrawer()}>
                                Home
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_book.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={this.navigateToScreen('BookingHistory')}>
                                Appointment History
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_earn.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={this.navigateToScreen('Wallet')}>
                                Total Earning
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_clock.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={this.navigateToScreen('TimeSlot')}>
                                Schedule Time
                            </Text>
                        </View>
                        <View style={styles.menuItem}>

<Image style={styles.drawericon}
    source={require('./drawer/d_tc.png')} />
<Text style={styles.drawerTexts}
    onPress={() => Linking.openURL('https://www.picasoid.co.in/nehealthcard.aspx')}>
    NE Health Card
</Text>
</View>

                        {/*
                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./drawer/d_book.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('')}>
                                  Vacation
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./d_my_order.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('Upload')}>
                                My Order
                            </Text>
                        </View>
*/}




                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_support.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={this.navigateToScreen('Support')}>
                                Support
                            </Text>
                        </View>


                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_about.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={() => Linking.openURL('https://www.picasoid.co.in/about.aspx')}>
                                About Us
                            </Text>
                        </View>

                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                source={require('./drawer/d_lists.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={() => Linking.openURL('https://www.picasoid.co.in/privacypolicy.aspx')}>
                                Privacy Policy
                            </Text>
                        </View>



                      

                        {/*                        <View style={styles.menuItem}>

                            <Image style={styles.drawericon}
                                   source={require('./d_share.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={this.navigateToScreen('Terms')}>
                                Share
                            </Text>
                        </View>


                                   <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./d_tc.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Terms')}>
            Wallet
            </Text>
          </View>
*/}
                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                source={require('./drawer/d_logout.png')} />
                            <Text style={styles.drawerTexts}
                                onPress={this.navigateToScreen1('Login')}>
                                Logout
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
    },
    drawerText: {
        marginTop: 2,
        color: 'white',
        marginLeft: 10,
        fontSize: 13,
    },
    headertop: {
        width: 300,
        height: 230,
        backgroundColor: '#800000',
        flexDirection: 'column'
    },
    menuItem: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    drawericon: {
        borderLeftWidth: 1,
        width: 20,
        height: 20,
        marginLeft: 8,
        marginTop: 3,
        resizeMode: 'contain'
    },
    drawericons: {
        width: 20,
        height: 20,
        marginLeft: 8,
        marginTop: 3,
    },
    drawerTexts: {
        width: 180,
        height: 22,
        marginLeft: 45,
        marginTop: -18,
        color: 'black',
        fontFamily: 'Konnect-Medium'
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
})

export default Drawer;