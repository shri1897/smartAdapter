import React, { Component } from 'react'
import firebase from 'firebase'
import { View } from 'react-native'
import { Spinner } from './components/common'
import Login from './components/Login'
import Devices from './components/Devices'

class App extends Component {

    state = {
        isLoggedIn: null
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBUDLToyQ6cn721vum8tZWTQpPQ91lMpUg',
            authDomain: 'smart-3-pin-adapter.firebaseapp.com',
            databaseURL: 'https://smart-3-pin-adapter.firebaseio.com',
            projectId: 'smart-3-pin-adapter',
            storageBucket: 'smart-3-pin-adapter.appspot.com',
            messagingSenderId: '125198836025'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ isLoggedIn: true });
            } else {
                this.setState({ isLoggedIn: false });
            }
        });
    }

    renderPages = () => {
        switch (this.state.isLoggedIn) {
            case true:
                return <Devices />

            case false:
                return <Login />

            default:
                return <Spinner size='large' />
        }
    }

    render() {
        return (
            <>
                <View style={styles.loginContainer}>
                    {this.renderPages()}
                </View>
            </>
        );
    };
};

const styles = {
    loginContainer: {
        backgroundColor: '#efefef',
        flex: 1
    }
}

export default App;