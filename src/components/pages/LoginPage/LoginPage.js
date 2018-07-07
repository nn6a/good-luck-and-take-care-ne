import React, {Component} from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'
import Spinner from '../../Spinner/Spinner'

class LoginPage extends Component {
    constructor () {
        super();
        this.state = {
            isAuthenticated: undefined
        };
    }

    componentDidMount () {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({isAuthenticated: !!user});
        });
    }

    componentWillUnmount () {
        this.unregisterAuthObserver();
    }

    handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    };

    render () {
        return (
            <ApplePhoneTemplate>
                {this.state.isAuthenticated !== undefined && !this.state.isAuthenticated &&
                <div>
                    <h3>Login Page</h3>
                    <button onClick={this.handleSignIn}>Sign in</button>
                </div>
                }
                {this.state.isAuthenticated === undefined &&
                <SpinnerWrapper>
                    <Spinner/>
                </SpinnerWrapper>
                }
            </ApplePhoneTemplate>
        );
    }
}

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default LoginPage;
