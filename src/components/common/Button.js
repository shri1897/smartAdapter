import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = (props) => {
    const { buttonStyle, buttonTextStyle } = styles;
    return (
        <TouchableOpacity style={props.buttonStyle || buttonStyle} onPress={props.onPress}>
            <Text style={props.buttonTextStyle || buttonTextStyle}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
};

export { Button };

const styles = {

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f9008d',
        backgroundColor: '#f9008d',
        marginLeft: 1,
        marginTop: 10,
        marginRight: 1
    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        paddingTop: 10,
        fontWeight: '600',
        paddingBottom: 10
    }
};
