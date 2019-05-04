import React, { Component } from 'react'
import firebase from 'firebase'
import { ScrollView, Image, Text } from 'react-native'
import { Header, CardSection, Input, Button, Spinner } from './common'

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    }

    onEmailChange = (email) => {
        this.setState({ email });
    }

    onPasswordChange = (password) => {
        this.setState({ password });
    }

    validate = () => {
        this.setState({ error: '', isLoading: true });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.onLoginSuccess())
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(this.onLoginSuccess())
                    .catch(() => this.onLoginFail())
            })
    }

    onLoginSuccess = () => {
        this.setState({ isLoading: true });
    }

    onLoginFail = () => {
        this.setState({
            password: '',
            error: 'Login Failed!',
            isLoading: false
        });
    }

    renderButton = () => {
        if (this.state.isLoading) {
            return <Spinner size='small' />
        } else {
            return (
                <Button onPress={this.validate} text='Login' />
            );
        }
    }

    render() {
        return (
            <>
                <Header headerText='Login' />

                <ScrollView>
                    <CardSection>
                        <Image style={styles.imageStyle}
                            source={{ uri: 'https://www.clarifybd.com/wp-content/uploads/2016/03/client-icon-pink.png' }}
                        />
                    </CardSection>

                    <CardSection>
                        <Input label='Email' value={this.state.email} placeholder='username@gmail.com' onChange={this.onEmailChange} />
                    </CardSection>

                    <CardSection>
                        <Input label='Password' value={this.state.password} placeholder='password' onChange={this.onPasswordChange} secureTextEntry />
                    </CardSection>

                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>

                    <CardSection style={styles.buttonContainer}>
                        {this.renderButton()}
                    </CardSection>
                </ScrollView >
            </>
        );
    }
}

const styles = {
    imageStyle: {
        height: 390,
        flex: 1,
        width: null
    },
    buttonContainer: {
        height: 60,
        justifyContent: 'center'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default Login;