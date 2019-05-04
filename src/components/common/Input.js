import React from 'react'
import { View, Text, TextInput } from 'react-native'

const Input = (props) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelStyle} >
                {props.label + ":"}
            </Text>
            <TextInput
                style={styles.inputStyle}
                value={props.value}
                placeholder={props.placeholder}
                onChangeText={props.onChange}
                secureTextEntry={props.secureTextEntry}
                autoCorrect={false}
                autoCapitalize="none"
            />
        </View>
    );
};

const styles = {
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    labelStyle: {
        alignSelf: 'center',
        fontSize: 18,
        paddingLeft: 5,
        lineHeight: 23,
        flex: 1
    },
    inputStyle: {
        paddingLeft: 5,
        fontSize: 18,
        flex: 2
    }
}


export { Input }