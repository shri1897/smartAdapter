import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            < Text style={textStyle} >{props.headerText}</Text>
        </View>
    );
};

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
    textStyle: {
        fontSize: 24
    }
};

export { Header };
