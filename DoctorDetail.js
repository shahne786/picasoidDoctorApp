import React, { Component } from 'react';
import { StyleSheet, ScrollView,View, Image, Text, Platform, Dimensions,StatusBar, TouchableOpacity,TextInput, Button } from 'react-native';
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';

const { width, height } = Dimensions.get('window');
const window = Dimensions.get('window');

type Props = {};
const FirstRoute = () => (
    <ScrollView style={styles.container} >
        <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row', margin:10,}}>
                <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dplus.png')}/>
                <View style={{flexDirection:'column', marginLeft:30}}>
                    <Text style={{fontSize:15, color:'black'}}>Experience</Text>
                    <Text style={{fontSize:15, color:'grey'}}>10 yrs</Text>
                </View>
                <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3,marginLeft:window.width/6 }} source={require('./loc.png')}/>
                <View style={{flexDirection:'column', marginLeft:30}}>
                    <Text style={{fontSize:15, color:'black'}}>Distance</Text>
                    <Text style={{fontSize:15, color:'grey'}}>10 Km</Text>
                </View>

            </View>
        </View>
        <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dre.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Review</Text>
                <Text style={{fontSize:15, color:'grey'}}>10 </Text>
            </View>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3,marginLeft:window.width/6 }} source={require('./recommended.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Recommendtions</Text>
                <Text style={{fontSize:15, color:'grey'}}>168</Text>
            </View>

        </View>

    <View style={{width:window.width-20, height:1, backgroundColor:'#bfbfbf', marginLeft:10,marginRight:10,marginTop:5}}></View>


        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dhouse.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'black'}}>Medeor Hospital</Text>
                <Text style={{fontSize:15, color:'grey'}}>Chaudhary Chandu Singh Marg, Block A2 Building</Text>
                <Text style={{fontSize:15, color:'grey'}}>Landmark: Green Field School</Text>
                <Image style={{width:280, height:150, resizeMode:'cover', margin:5}} source ={require('./dloc.png')}/>
            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtime.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#8BC60D'}}>AVAILABLE TODAY</Text>
                <Text style={{fontSize:15, color:'grey'}}>10:30 AM - 05:00 PM</Text>
                <Text style={{fontSize:13, color:'blue'}}>ALL TIMINGS</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#010101'}}>SERVICES</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Aesthetics Dentistry</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Laser Bleaching</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>-Office Bleaching</Text>
                <Text style={{fontSize:13, color:'red',marginTop:5}}>ALL SERVICES</Text>
            </View>
        </View>

        <View style={{flexDirection:'row', margin:10,}}>
            <Image style={{width:20, height:20, resizeMode:'contain', marginTop:3}} source={require('./dtick.png')}/>
            <View style={{flexDirection:'column', marginLeft:30}}>
                <Text style={{fontSize:15, color:'#010101'}}>ALSO PRACTICES AT</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>Noida Family Dentistry & TCC</Text>
                <Text style={{fontSize:12, color:'grey', marginTop:5, marginLeft:5}}>Block-D House No. 127-A ( Landmark : The millenium School, Block-D park )</Text>

            </View>
        </View>
    </ScrollView>
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

export default class DoctorDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }
    constructor(props) {
        super(props);



        this.state = {
            position: 1,
            interval: null,
            password:'',
            index: 0,
            routes: [
                { key: 'first', title: 'Details' },
                { key: 'second', title: 'Rating' },
            ],
        };
    }

    componentDidMount() {

    }
    renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'rgba(0,0,0,0.5)', borderBottomWidth: 2.5, height:50}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 18, fontWeight: 'bold'}}

                {...props}
                indicatorStyle={{backgroundColor: '#0592CC', height: 2.5}}
            />
        );
    }

    componentWillUnmount() {
    }

    render() {
        return (

            <View style={styles.container}>
                <Image style={{width:window.width, height:200, resizeMode:'cover'}} source={require('./treat.png')}/>
                <View style={{backgroundColor:'transparent',color :'white',flexDirection:'row' , flex: 1 ,margin: 10, shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5, position:'absolute',top:70  }}>
                    <Image style={{width:90, height:90, resizeMode:'contain', margin:10}} source={require('./profile.png')}/>
                    <View style={{flexDirection:'column', marginTop:20, marginLeft:10, marginRight:10}}>
                        <Text style={{color:'white',fontFamily:"Poppins-Regular", fontSize:20}}>Dr. Priya Dua</Text>
                        <Text style={{color:'white',fontFamily:"Poppins-Regular", fontSize:15, marginTop:5}}>MBBS, MS - Ophthalmology</Text>
                        <Text style={{color:'white', fontFamily:"Poppins-Regular",fontSize:15}}>Ophthalmologist/Eye Surgeon</Text>

                    </View>
                </View>
                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#0592CC' }}
                    style={{ backgroundColor: 'white' }}
                    renderTabBar={this.renderTabBar}
                    renderScene={SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        backgroundColor:'#000000',
    },
})