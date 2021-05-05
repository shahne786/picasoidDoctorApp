import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  Alert,
  StatusBar,
  FlatList,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const window = Dimensions.get('window');
import store from 'react-native-simple-store';
const GLOBAL = require('./Global');
import moment from 'moment';
type Props = {};
export default class Wallet extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       user_id: '',
  //     };
  //   }

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
  state = {
    total_earnings: 0,
    moviesList: [],
  };

  selectedFirst = itemData => {
    console.log('asd');
  };

  renderRowItem1 = itemData => {
    //            alert(JSON.stringify(itemData))
    var getDate = itemData.item.added_on;
    var StartDate = moment(getDate).format('DD-MM-YYYY');

    return (
      <TouchableOpacity
        style={{width: '95%', alignSelf: 'center', margin: 10}}
        onPress={() => this.selectedFirst(itemData.index)}
        activeOpacity={0.99}>
        <View
          style={{
            backgroundColor: 'white',
            color: 'white',
            flexDirection: 'row',
            height: 85,
            borderRadius: 6,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.6,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              alignSelf: 'center',
              margin: 10,
            }}
            source={require('./wallet_eic.png')}
          />

          <View
            style={{
              backgroundColor: '#0000001A',
              height: 60,
              width: 1.5,
              alignSelf: 'center',
              flexDirection: 'column',
            }}
          />

          <View style={{flexDirection: 'column', marginLeft: 10, marginTop: 5}}>
            <Text
              style={{
                fontSize: 15,
                margin: 5,
                fontFamily: 'Konnect-Medium',
                color: '#444444',
              }}>
              {itemData.item.Line}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Konnect-Regular',
                color: '#bfbfbf',
                marginTop: 5,
                marginLeft: 5,
              }}>
              Booking Id: {itemData.item.id}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Konnect-Regular',
                color: '#bfbfbf',
                marginLeft: 5,
                marginTop: 3,
              }}>
              {getDate}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Konnect-Medium',
              color: '#4CAF50',
              alignSelf: 'center',
              position: 'absolute',
              right: 15,
            }}>
            {'\n'}+₹{itemData.item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  getWalletHistory() {
    const url = GLOBAL.BASE_URL + 'total_earnings';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doctor_id: GLOBAL.user_id,
        //    doctor_id: 68,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
     //    alert(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          this.setState({total_earnings: responseJson.total_earnings});
          this.setState({moviesList: responseJson.earning_list});
        } else {
          alert('Something went wrong!');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getWalletHistory();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#6d0000" />
        <ImageBackground
          style={{width: '100%', height: 250}}
          source={require('./wallet_bg.png')}>
          <View
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{margin: 20}}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{width: 23, height: 23, resizeMode: 'contain'}}
                source={require('./back.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Konnect-Medium',
                color: 'white',
                marginTop: 20,
              }}>
              Total Earning
            </Text>
            <View style={{margin: 20, width: 25}} />
          </View>

          <Text
            style={{
              fontSize: 35,
              fontFamily: 'Konnect-Medium',
              color: 'white',
              marginTop: '12%',
              alignSelf: 'center',
            }}>
            ₹ {this.state.total_earnings}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Konnect-Medium',
              color: 'white',
              marginTop: 30,
              alignSelf: 'center',
            }}>
            Total Balance
          </Text>
        </ImageBackground>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Konnect-Medium',
            color: '#6D6D6D',
            margin: 15,
            alignSelf: 'flex-start',
          }}>
          Wallet Statement
        </Text>
        <View style={{backgroundColor: '#0000001A', height: 1}} />

        {this.state.moviesList.length == 0 && (
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              color: 'black',
              fontFamily: 'Konnect-Medium',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            No earnings yet!
          </Text>
        )}

        {this.state.moviesList.length != 0 && (
          <FlatList
            style={{marginTop: 10}}
            data={this.state.moviesList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderRowItem1}
            extraData={this.state}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
