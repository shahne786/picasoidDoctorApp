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
    ActivityIndicator
} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import React, { Component } from 'react';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
import Header from './Header.js';
var finalImagesName = '';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            image: '',
            addmore: [],
            startedadd: 0,
            loading: false
        }

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);


    }



    componentWillUnmount() {
        GLOBAL.profile == ''
        GLOBAL.finalImagesName = ''
    }

    finalUploadAllImages = () => {
        console.log(GLOBAL.finalImagesName + GLOBAL.order_id + GLOBAL.user_id)
        const url = GLOBAL.BASE_URL + 'upload_prescription'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "doctor_id": GLOBAL.user_id,
                "booking_id": GLOBAL.order_id,
                "prescription_type": "1",
                "prescription_content": GLOBAL.finalImagesName
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == true) {
                    alert('Prescription uploaded successfully!')
                    this.props.navigation.goBack()
                } else {
                    alert('Something went wrong!')
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    uploadSingleImage = (geturi) => {
        this.showLoading()

        const url = GLOBAL.BASE_URL + 'image_attchment_upload_doctor'
        const data = new FormData();
        data.append('user_id', GLOBAL.user_id);
        data.append('flag', "1");

        // you can append anyone.
        data.append('image', {
            uri: geturi,
            type: 'image/jpeg', // or photo.type
            name: 'image.png'
        });
        fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }

        }).then((response) => response.json())
            .then((responseJson) => {
                //               alert(JSON.stringify(responseJson))
                //               alert('Prescription uploaded successfully!')
                //             GLOBAL.profile ==''
                //           this.props.navigation.goBack()
                this.hideLoading()
                if (responseJson.status == true) {
                    //                    alert(responseJson.images[0].image)
                    finalImagesName = responseJson.images[0].image
                    for (let i = 1; i < responseJson.images.length; i++) {
                        finalImagesName = finalImagesName + '|' + responseJson.images[i].image
                    }

                    GLOBAL.finalImagesName = finalImagesName
                    //  alert(JSON.stringify(GLOBAL.finalImagesName))
                    this.setState({ image: geturi })

                    this.setState({ startedadd: 1 })
                    this._handleAddButton(geturi)
                 //   alert(JSON.stringify(geturi))
                } else {
                    alert('Something went wrong!')
                }

            });

    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,

        }
    }


    showLoading() {
        this.setState({ loading: true })
    }

    hideLoading() {
        this.setState({ loading: false })
    }


    selectPhotoTapped = () => {

        const options = {
            title: 'Select Prescription Image',
            storageOptions: {
                skipBackup: true,
                maxWidth: 500,
                maxHeight: 500,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            //            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                //                GLOBAL.profile = source.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                //                this.setState({image :   GLOBAL.profile})
                //    alert(JSON.stringify(source))
                this.uploadSingleImage(source.uri)
            }
        });
    }



    _handleAddButton(imageuri) {
        let newly_added_data = { title: 'new title', content: 'new content goes here', isUploaded: 'y', image: imageuri };

        this.setState({
            addmore: [...this.state.addmore, newly_added_data]
        });
    }

    render() {

        if (this.state.loading) {
            return (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator style={{
                        position: 'absolute',
                        left: window.width / 2 - 30,
                        top: window.height / 2,
                        opacity: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        size="large" color='#800000' />
                </View>
            )
        }

        // alert("hi")

        var buttonTitle = ''
        if (this.state.startedadd == 0) {
            buttonTitle = 'UPLOAD'
        } else {
            buttonTitle = 'ADD MORE'
        }


        let added_buttons_goes_here = this.state.addmore.map((data, index) => {
            //            alert(JSON.stringify(data))
            return (

                <View style={{ height: 220, width: Dimensions.get('window').width - 30, borderWidth: 1, marginLeft: 15, marginTop: 15, borderStyle: 'dashed', borderRadius: 5, borderColor: 'grey', justifyContent: 'center', flexDirection: 'row' }}>

                    <Image source={require('./uploadlogo.png')}
                        style={{ alignSelf: 'center', height: 40, width: 40 }} />
                    <Text style={{ alignSelf: 'center', marginLeft: 5, fontFamily: 'Konnect-Medium' }}>Upload Prescription</Text>

                    {data.isUploaded != 'y' && (
                        <View style={{ height: 220, width: window.width - 25, borderWidth: 1, borderColor: 'grey', borderRadius: 5, position: 'absolute', top: 15, left: 15, justifyContent: 'center', flexDirection: 'row' }}>




                        </View>
                    )}

                    {data.isUploaded == 'y' && (
                        <Image source={{ uri: data.image }}
                            style={{ height: 220, width: window.width - 25, position: 'absolute', borderColor: 'grey', borderRadius: 5 }} />

                    )}


                </View>
            )
        });

        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation}
                    headerName={'UPLOAD PRESCRIPTION'} />
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}>


                    {added_buttons_goes_here}

                    {this.state.startedadd == 0 && (
                        <View style={{ height: 220, width: Dimensions.get('window').width - 30, borderWidth: 1, marginLeft: 15, marginTop: 15, borderStyle: 'dashed', borderRadius: 5, borderColor: 'grey', justifyContent: 'center', flexDirection: 'row' }}>

                            <Image source={require('./uploadlogo.png')}
                                style={{ alignSelf: 'center', height: 40, width: 40 }} />
                            <Text style={{ alignSelf: 'center', marginLeft: 5, fontFamily: 'Konnect-Medium' }}>Upload Prescription</Text>


                            {this.state.isUploaded == 'y' && (
                                <Image source={{ uri: this.state.image }}
                                    style={{ height: 220, width: window.width - 25, position: 'absolute', borderColor: 'grey', borderRadius: 5 }} />

                            )}



                        </View>


                    )}

                    <Button style={{ alignSelf: 'center', fontSize: 12, color: 'white', fontFamily: 'Konnect-Medium' }}
                        containerStyle={{ height: 30, width: 100, marginLeft: 15, marginTop: 10, borderRadius: 15, backgroundColor: '#800000', justifyContent: 'center' }}
                        onPress={this.selectPhotoTapped.bind(this)}>
                        {buttonTitle}
                    </Button>


                </ScrollView>

                <Button style={{ fontSize: 17, color: 'white', fontFamily: 'Konnect-Medium', }}
                    onPress={() => {
                        this.finalUploadAllImages()
                    }}

                    containerStyle={{ height: 60, borderRadius: 15, backgroundColor: '#800000', justifyContent: 'center', margin: 20 }}>
                    UPLOAD
                    </Button>

            </View>
        );
    }
}

export default Upload;