import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image, StatusBar,Button ,Alert,AsyncStorage,Dimensions ,TouchableOpacity} from 'react-native';
const window = Dimensions.get('window');
import store from 'react-native-simple-store';
const GLOBAL = require('./Global');
type Props = {};
export default class Splash extends Component {
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

proceed=()=>{
    var value =  AsyncStorage.getItem('userID');
    value.then((e)=> {
        if (e == '' || e == null ){
            this.props.navigation.replace('Login')
        }else {
            GLOBAL.user_id = e

            var values =  AsyncStorage.getItem('name');
            values.then((f)=> {
                GLOBAL.myname = f

            })

            var valuess =  AsyncStorage.getItem('email');
            valuess.then((f)=> {
                GLOBAL.myemail = f

            })
            var values2 =  AsyncStorage.getItem('mobile');
            values2.then((f)=> {
                GLOBAL.mymobile = f
            })

            var values =  AsyncStorage.getItem('image');
            values.then((f)=> {
                GLOBAL.myimage = f

            })

            this.props.navigation.replace('DrawerNavigator')
        }
    })

}
componentDidMount() {

        this.timeoutCheck = setTimeout(() => {
   this.proceed();
   }, 1000);


}

    render() {
        return (
            <View style={styles.container}>
            <StatusBar backgroundColor ='#6d0000'/>
                <Image style = {{width :window.width ,height : window.height}}
                       source={require('./splash.png')}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
