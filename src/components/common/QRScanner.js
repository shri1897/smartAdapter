import React from 'react'
import { View } from 'react-native'
import { CameraKitCameraScreen } from 'react-native-camera-kit'

const QRScanner = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <CameraKitCameraScreen
                showFrame={false}
                //Show/hide scan frame
                scanBarcode={true}
                //Can restrict for the QR Code only
                laserColor={'blue'}
                //Color can be of your choice
                frameColor={'yellow'}
                //If frame is visible then frame color
                colorForScannerFrame={'black'}
                //Scanner Frame color
                onReadCode={event => props.onReadCode(event.nativeEvent.codeStringValue)}
            />
        </View>
    );
};

export { QRScanner };