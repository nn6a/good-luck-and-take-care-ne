import React, {Component} from 'react';
import './App.css';
import Form from '../Form/Form.js';
import firebase from 'firebase';

class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    handleSignIn () {
        // const provider = new auth.GoogleAuthProvider();
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    }

    handleLogOut () {
        firebase.auth().signOut();
    }

    render () {
        return (
            <div className="app">
                <div className="app__header">
                    {/*<img src={logo} className="app__logo" alt="logo" />*/}
                    <h3>
                        CHAT APP WITH REACT
                    </h3>
                    {!this.state.user ? (
                        <button
                            className="app__button"
                            onClick={this.handleSignIn.bind(this)}
                        >
                            Sign in
                        </button>
                    ) : (
                        <button
                            className="app__button"
                            onClick={this.handleLogOut.bind(this)}
                        >
                            Logout
                        </button>
                    )}
                </div>
                <div className="app__list">
                    <Form user={this.state.user}/>
                </div>
            </div>
        );
    }
}

export default App;
