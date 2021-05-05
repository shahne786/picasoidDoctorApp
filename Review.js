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
import React, {Component} from 'react';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';
import Header from './Header.js';
import StarRating from 'react-native-star-rating';


class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            avatarSource: null,
            image:'',
            addmore:[],
            startedadd:0,
            loading:false
        }        
    }



    componentWillUnmount(){

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

//     renderItem1=({item,index}) => {
//         alert(JSON.stringify(item))
//         return(

//    <View style={{backgroundColor:'white',color :'white',flexDirection:'row' , margin: 10, shadowColor: '#000',
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.6,
//             shadowRadius: 2,
//             elevation: 2,
//             height:110,
//             borderRadius:5  }}>
// {/*            <Image style={{width:90, height:90, resizeMode:'contain', margin:10}} source={require('./profile.png')}/>*/}
//             <View style={{flexDirection:'column', marginTop:20, marginLeft:10, marginRight:10}}>
//                 <Text style={{color:'black',fontFamily:"Konnect-Regular", fontSize:20, color:'#800000'}}>Dr. Priya Duass</Text>
//                 <Text style={{color:'black',fontFamily:"Konnect-Regular", fontSize:15, marginTop:5}}>MBBS, MS - Ophthalmology</Text>
//                 <Text style={{color:'black', fontFamily:"Konnect-Regular",fontSize:15}}>Ophthalmologist/Eye Surgeon</Text>

//             </View>
//         </View>

//     )
//     }


    render() {
        console.log(GLOBAL.reviews)
        return(
            <View style={{flex:1}}>
            <Header navigation={this.props.navigation}
            headerName={'REVIEW'}/>

   <View style={{backgroundColor:'white',color :'white',flexDirection:'row' , margin: 10, shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 2,
            height:'auto',
            borderRadius:5  }}>
            <Image style={{width:90, height:90, margin:10, borderRadius:45}} source={{uri: GLOBAL.reviews.image}}/>
            <View style={{flexDirection:'column', marginTop:20, marginLeft:10, marginRight:10}}>
                <Text style={{color:'black',fontFamily:"Konnect-Regular", fontSize:20, color:'#800000'}}>{GLOBAL.reviews.name}</Text>
    <StarRating containerStyle={{width:'40%', marginTop:5, marginBottom:5}}
        disabled={true}
        maxStars={5}
        fullStarColor={'#800000'}        
        starSize={22}        
        rating={parseInt(GLOBAL.reviews.rating_details.rating)}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
                <Text style={{color:'black', fontFamily:"Konnect-Regular",fontSize:15}}>Reviews : {GLOBAL.reviews.rating_details.review}</Text>
                <Text style={{color:'black', fontFamily:"Konnect-Regular",fontSize:15}}>Date : {GLOBAL.reviews.rating_details.date}</Text>

        </View>

        </View>

            </View>
        );
    }
}

export default Review;