import React, { Component } from 'react'
import { ScrollView, Image, View, Text, TouchableOpacity, PermissionsAndroid, Platform, BackHandler } from 'react-native'
import { Header, Button, QRScanner, CardSection } from './common'
import firebase from 'firebase'
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';

const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
    },
    getItem: (key) => myStorage[key],
    removeItem: (key) => {
        delete myStorage[key];
    },
};

class Devices extends Component {

    state = {
        devices: [],
        isScannerOpen: false,
        isDeviceOpen: false,
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        init({
            size: 10000,
            storageBackend: AsyncStorage,
            defaultExpires: 1000 * 3600 * 24,
            enableCache: true,
            reconnect: true,
            sync: {
            }
        });

        function onConnect() {
            client.subscribe('valliMam');
            alert("onConnect:");
            // // message = new Paho.MQTT.Message("Hello");
            // // message.destinationName = "shri";
            // // client.send(message);
        }
        function onFailure(error) {
            alert(`Failed: ${error}`);
        }

        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                alert("onConnectionLost:" + responseObject.errorMessage);
            }
        }

        function onMessageArrived(message) {
            alert("onMessageArrived:" + message.payloadString);
        }


        const client = new Paho.MQTT.Client("test.mosquitto.org", 8080,  "myClientId");
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect, useSSL: true, onFailure });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        this.setState({ qrValue: '', isScannerOpen: false, isDeviceOpen: false });
        return true;
    }

    onReadCode = (qrValue) => {
        let devices = { ...this.state.devices };
        if (!devices[qrValue]) {
            devices[qrValue] = {
                name: `New Device ${Date.now()}`,
                deviceID: qrValue,
            };
            this.setState({ devices, isScannerOpen: false });
        } else {
            alert('This Device Already Exists!')
            this.setState({ isScannerOpen: false });
        }
    }

    openScanner = () => {
        //To Start Scanning
        const that = this;
        if (Platform.OS === 'android') {
            function requestCameraPermission() {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                        'title': 'Camera Permission Required',
                        'message': 'This app requires camera permission to scan QR code'
                    }
                ).then((granted) => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //If CAMERA Permission is granted
                        that.setState({ qrValue: '', isScannerOpen: true });
                    } else {
                        alert("camera permission denied");
                    }
                }).catch((err) => {
                    alert("Camera permission error", err);
                })
            }
            //Calling the camera permission function for android
            requestCameraPermission();
        } else {
            //IOS
            this.setState({ qrValue: '', isScannerOpen: true });
        }
    }

    openDevice = (qrValue) => {
        this.setState({ isDeviceOpen: true, openedDeviceID: qrValue })
    }

    deleteDevice = (key) => {
        const { devices } = this.state;
        delete devices[key]
        this.setState({ devices });
    }
    deleteDevice = (key) => {
        const { devices } = this.state;
        delete devices[key]
        this.setState({ devices });
    }

    renderDevices = () => {
        const { devices } = this.state;
        let listOfDevices = [];
        for (key in devices) {
            listOfDevices.push(
                <CardSection key={devices[key].qrValue}>
                    <TouchableOpacity style={{ flex: 2, justifySelf: 'center', alignSelf: 'center' }} onPress={() => this.openDevice(devices[key].deviceID)}>
                        <Text>{`${devices[key].deviceID}`}</Text>
                    </TouchableOpacity>
                    <Button text='rename' buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => alert(`Yet to implement`)} />
                    <Button text='delete' onPress={() => this.deleteDevice(key)} buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} />
                </CardSection>)
        }
        // return this.state.devices.map((device) => {
        //     return (
        //         <CardSection key={device}>
        //             <TouchableOpacity style={{ flex: 2, justifySelf: 'center', alignSelf: 'center' }} onPress={this.openDevice}>
        //                 <Text>New Device</Text>
        //             </TouchableOpacity>
        //             <Button text='rename' buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => alert(`You pressed ${device}`)} />
        //             <Button text='delete' buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => alert(`You pressed ${device}`)} />
        //         </CardSection>
        //     );
        // });
        return listOfDevices;
    }

    switchOn = () => {
        const client = new Paho.MQTT.Client("test.mosquitto.org", 8080,  "myClientId");
        const message = new Paho.MQTT.Message("ON");
        message.destinationName = "valliMam";
        // client.send(message);
        alert("Failed:" );
    }

    switchOff = () => {
        const { openedDeviceID } = this.state;
        message = new Paho.MQTT.Message("OFF");
        message.destinationName = "valliMam";
        // client.send(message);
        alert("Failed:");
    }

    renderDevice = () => {
        const { openedDeviceID } = this.state;
        return (
            <>
                <Header headerText={openedDeviceID} />
                <View style={styles.buttonContainer}>
                    <View style={styles.logoutStyle}>
                        <Button text='Switch ON' onPress={this.switchOn} />
                    </View>
                    <View style={styles.logoutStyle}>
                        <Button text='Switch OFF' onPress={this.switchOff} />
                    </View>
                    <View style={styles.logoutStyle}>
                        <Button text='Logout' onPress={() => firebase.auth().signOut()} />
                    </View>
                </View>
            </>
        );
    }

    render() {
        if (this.state.isScannerOpen) {
            return <QRScanner onReadCode={this.onReadCode} />
        }
        if (this.state.isDeviceOpen) {
            return this.renderDevice();
        }
        return (
            <>
                <Header headerText='Devices' />
                <ScrollView>
                    {this.renderDevices()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <View style={styles.addDevices}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.touchableOpacityStyle} onPress={this.openScanner}>
                            <Image
                                style={styles.addButtonStyle}
                                source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutStyle}>
                        <Button text='Logout' onPress={() => firebase.auth().signOut()} />
                    </View>
                </View>
            </>
        );
    }
}


const styles = {
    viewStyle: {
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        paddingTop: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        paddingBottom: 0
    },
    logoutStyle: {
        height: 60,
        justifyContent: 'center'
    },
    addDevices: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 24
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a8aaad',
        backgroundColor: '#a8aaad',
        marginLeft: 1,
        marginTop: 10,
        marginRight: 1
    },
    buttonTextStyle: {
        alignSelf: 'flex-start',
        color: '#000',
        paddingLeft: 10,
        fontSize: 18,
        paddingTop: 10,
        fontWeight: '300',
        paddingBottom: 10
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,

    },
    addButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    },
    buttonContainer: {
        marginBottom: 2
    }
};



export default Devices;
