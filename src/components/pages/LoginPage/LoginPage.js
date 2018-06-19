import React, {Component} from 'react'
import firebase from 'firebase'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'

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
                <div>Loading...</div>
                }
            </ApplePhoneTemplate>
        );
    }
}

export default LoginPage;
