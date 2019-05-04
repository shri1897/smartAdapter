import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
    <View style={styles.containerStyle}>
        {props.children}
    </View>
);

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#efefef',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        marginLeft: 1,
        marginRight: 1
    }
};

export { CardSection };
