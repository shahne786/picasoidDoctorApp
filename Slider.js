import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    Image, TouchableOpacity,
} from 'react-native';

import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import PageControl from 'react-native-page-control';

import SwiperFlatList from 'react-native-swiper-flatlist';
var array = ["Who want to trudge down the high street when you can do it all from home?","Appsdiajci  svisvis b sjvijsivjs sjosvjosjv isvisvisvh isvijsjvsj ivisvih","Who want to trudge down the high street when you can do it all from home?",]
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const window = Dimensions.get('window');
type Props = {};
export default class Slider extends Component<Props> {
    state = {
        value: '',
        index :'',
    }
    static navigationOptions = ({ navigation }) => {
        return {
            swipeEnabled: false,
            gesturesEnabled: false,
            header: () => null
        }
    }

    buttonClickListener = () =>{
        this.props.navigation.navigate('Landing')
    }

    renders  = (index) => {
        this.setState({value:array[index]})
        this.setState({index:index})
    }


    _handlePress = () =>{
        this.props.navigation.navigate('Login')
    }
    render(){
        return (

            <View style={{width: '100%', height: '100%',flex: 1, flexDirection: 'column' ,backgroundColor :'white'}}>


                <View style={{width :window.width,height :window.height}}>



                    <View style = {{position:'absolute',top:0,width :'100%' ,height : window.height }}>
                        <SwiperFlatList
                            autoplay
                            autoplayDelay={2}
                            autoplayLoop
                            index={0}
                            showPagination = {true}
                            onChangeIndex ={ (index) => this.renders(index.index) }
                        >
                            <View style={[styles.child, { backgroundColor: 'tomato' }]}>
                                <Image style = {styles.text}
                                       source={require('./how.png')}/>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'thistle' }]}>
                                <Image style = {styles.text}
                                       source={require('./how.png')}/>
                            </View>
                            <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
                                <Image style = {styles.text}
                                       source={require('./how.png')}/>
                            </View>

                        </SwiperFlatList>
                    </View>


                </View>


                <View style = {{position:'absolute',bottom:0,height:200,width:'100%',backgroundColor:'white',borderRadius:20}}>


                    <Text style = {{color:'black',fontFamily:'Poppins-Regular',fontSize: 20,margin:20,textAlign: 'center'}}>

                        {this.state.value}


                    </Text>



                    <View style = {{width:'60%',marginLeft:'38%',flexDirection:'row',marginTop:0,justifyContent:'space-between'}}>


                        <PageControl
                            style={{width :100 ,marginTop:30}}
                            numberOfPages={3}
                            currentPage={this.state.index}
                            hidesForSinglePage
                            pageIndicatorTintColor='#CCCCCC'
                            currentPageIndicatorTintColor='#800000'
                            indicatorStyle={{borderRadius: 5}}
                            currentIndicatorStyle={{borderRadius: 5}}
                            indicatorSize={{width:8, height:8}}
                            onPageIndicatorPress={this.onItemTap}
                        />

                        <Button
                            style={{padding:4,marginTop:14,fontSize: 20, color: '#800000',marginRight:10,width:window.width/2 - 90,height:40,fontFamily:'Konnect-Medium',borderRadius:15,borderWidth:0,borderColor:'#0592CC'}}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this.props.navigation.navigate('Home')}>
                            SKIP
                        </Button>

                    </View>


                </View>





            </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {

        marginLeft : 50,
        marginTop :75,
        width: window.width - 50,
        height:window.height - 250,
        resizeMode:'contain',


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },

    child: {
        height: window.height ,
        width:window.width ,
        justifyContent: 'center'
    },
    text: {
        resizeMode:'stretch',
        height: window.height ,
        width:window.width ,
        marginTop : 0

    }
})