import React, {Component} from 'react'
// import styled from 'styled-components'
import firebase from 'firebase'

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

    handleLogOut = () => {
        firebase.auth().signOut();
    };

    render () {
        return (
            <div>
                {this.state.isAuthenticated !== undefined && !this.state.isAuthenticated &&
                <div>
                    {!this.state.user ? (
                        <button onClick={this.handleSignIn}>Sign in</button>
                    ) : (
                        <button onClick={this.handleLogOut}>Logout</button>
                    )}
                </div>
                }
                {this.state.isAuthenticated === undefined &&
                <div>Loading...</div>
                }
            </div>
        );
    }
}

export default LoginPage;
