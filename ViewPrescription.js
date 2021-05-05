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

class ViewPrescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            image: '',
            addmore: [],
            startedadd: 0,
            loading: false,
            up_images_name: '',
        }

        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);


    }

    componentDidMount() {
        // alert(JSON.stringify(this.state.addmore.length))
        this.getData();
    }

    getData = () => {

        const url = GLOBAL.BASE_URL + 'get_prescription_data'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "doctor_id": GLOBAL.user_id,
                "booking_id": GLOBAL.order_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                // alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    this.setState({ addmore: responseJson.prescription_content })


                } else {

                    // alert('Something went wrong!')

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }


    componentWillUnmount() {
        GLOBAL.profile = ''
        GLOBAL.finalImagesName = ''
    }

    finalUploadAllImages = () => {
        console.log(GLOBAL.finalImagesName + GLOBAL.order_id + GLOBAL.user_id)
        const url = GLOBAL.BASE_URL + 'update_prescription_data'

        var updatefinalImages = ''

        updatefinalImages = this.state.addmore[0].image_name
        for (let i = 1; i < this.state.addmore.length; i++) {
            updatefinalImages = updatefinalImages + '|' + this.state.addmore[i].image_name
        }

        console.log(JSON.stringify({
            "doctor_id": GLOBAL.user_id,
            "booking_id": GLOBAL.order_id,
            "prescription_type": "1",
            "prescription_content": updatefinalImages,
            "prescription_content_new": GLOBAL.finalImagesName
        }))

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "doctor_id": GLOBAL.user_id,
                "booking_id": GLOBAL.order_id,
                "prescription_type": "1",
                "prescription_content": updatefinalImages,
                "prescription_content_new": GLOBAL.finalImagesName
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                //                alert(JSON.stringify(responseJson))
                if (responseJson.status == true) {
                    //                this.setState({list:responseJson.lists})
                    alert('Prescription updated successfully!')
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

        const url = GLOBAL.BASE_URL + 'image_attchment_upload_doctor_2'
        const data = new FormData();
        data.append('user_id', GLOBAL.user_id);
        data.append('flag', "1");
        data.append('booking_id', GLOBAL.order_id);
        data.append('images_name', this.state.up_images_name);
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
                // console.log(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {
                    // alert(responseJson.images[0].image)
                    finalImagesName = responseJson.images[0].image
                    for (let i = 1; i < responseJson.images.length; i++) {
                        finalImagesName = finalImagesName + '|' + responseJson.images[i].image
                    }

                    GLOBAL.finalImagesName = finalImagesName
                    console.log(GLOBAL.finalImagesName)

                    const theOneIWant = [...responseJson.images].pop();

                    // alert(theOneIWant.image)

                    this.setState({
                        image: geturi,
                        up_images_name: theOneIWant.image
                    })

                    this.setState({ startedadd: 1 })
                    this._handleAddButton(geturi)
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
             //   this.uploadSingleImage(source.uri)
            }
        });
    }



    _handleAddButton(imageuri) {
        let newly_added_data = { is_selected: 0,
             image: imageuri,
             image_name: this.state.up_images_name };

        this.setState({
            addmore: [...this.state.addmore, newly_added_data]
        });
    }

    ondelete = (item, index) => {

        // alert(JSON.stringify(item))

        const url = GLOBAL.BASE_URL + 'delete_prescription_image'

        // this.showLoading()
        fetch(url, {
            method: 'POST',
            timeoutInterval: 1000,
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                "booking_id": GLOBAL.order_id,
                "image_name": item.image_name,

            })
        })

            .then((response) => response.json())
            .then((responseData) => {

                alert(JSON.stringify(responseData.message))
                this.props.navigation.goBack();
                // 




            })
            .catch((error) => {
                console.error(error);
            })

        // var arr = this.state.addmore


        // var arrnew = arr.array.indexOf(5)
        // // alert(JSON.stringify())
        // alert('Prescription image removed!')
        // this.setState({ addmore: arr })
    }


    renderItem1 = ({ item, index }) => {
        // alert(JSON.stringify(this.state.addmore.length))
        // if (index != 0) {
        //     return (



        //     )
        // }

        return (

            <View>












                <ImageBackground source={{ uri: item.image }}
                    style={{ height: 220, width: window.width - 30, resizeMode: 'cover', alignSelf: 'center', marginTop: 15 }} imageStyle={{ borderRadius: 5 }}>




                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 12 }}
                        onPress={() => this.ondelete(item, index)}>
                        <Image style={{ width: 40, height: 30, resizeMode: 'contain' }}
                            source={require('./trash.png')} />
                    </TouchableOpacity>

                </ImageBackground>















            </View>


        )
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

        // alert(JSON.stringify(this.state.addmore.length))



        return (
            <View style={{ flex: 1 }}>
                <Header navigation={this.props.navigation}
                    headerName={'VIEW PRESCRIPTION'} />


                <ScrollView style={{ backgroundColor: 'white' }}>


                    {this.state.addmore.length == 0 && (
                        <View>

                            <View style={{ height: 220, width: Dimensions.get('window').width - 30, borderWidth: 1, marginLeft: 15, marginTop: 15, borderStyle: 'dashed', borderRadius: 5, borderColor: 'grey', justifyContent: 'center', flexDirection: 'row' }}>


                                <Image source={require('./uploadlogo.png')}
                                    style={{ alignSelf: 'center', height: 40, width: 40 }} />
                                <Text style={{ alignSelf: 'center', marginLeft: 5, fontFamily: 'Konnect-Medium' }}>Upload Prescription</Text>

                            </View>

                            <Button style={{ alignSelf: 'center', fontSize: 12, color: 'white', fontFamily: 'Konnect-Medium' }}
                                containerStyle={{ height: 30, width: 100, marginLeft: 15, marginTop: 10, borderRadius: 15, backgroundColor: '#800000', justifyContent: 'center' }}
                                onPress={this.selectPhotoTapped.bind(this)}>
                                Add More
                        </Button>

                        </View>


                    )}

                    {this.state.addmore.length != 0 && (

                        <View>
                            <FlatList style={{ marginBottom: 10 }}
                                contentContainerStyle={{ height: 'auto' }}
                                data={this.state.addmore}
                                keyExtractor={this._keyExtractor1}
                                renderItem={this.renderItem1}
                                extraData={this.state}
                            />

                            <Button style={{ alignSelf: 'center', fontSize: 12, color: 'white', fontFamily: 'Konnect-Medium' }}
                                containerStyle={{ height: 30, width: 100, marginLeft: 15, marginTop: 10, borderRadius: 15, backgroundColor: '#800000', justifyContent: 'center' }}
                                onPress={this.selectPhotoTapped.bind(this)}>
                                Add More
                </Button>

                        </View>

                    )}


                </ScrollView>

                <View style={{ height: 80, backgroundColor: 'white', width: '100%', elevation: 2 }}>

                    <Button style={{ fontSize: 17, color: 'white', fontFamily: 'Konnect-Medium', }}
                        onPress={() => {
                            this.finalUploadAllImages()
                        }}

                        containerStyle={{ height: 60, borderRadius: 15, backgroundColor: '#800000', marginTop: 10, justifyContent: 'center', alignSelf: 'center', width: '92%' }}>
                        UPDATE
                </Button>

                </View>

            </View>
        );
    }
}

export default ViewPrescription;