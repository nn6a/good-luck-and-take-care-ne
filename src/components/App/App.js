import React, {Component} from 'react';
import styled from 'styled-components';
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
            <Wrapper>
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

                <Form user={this.state.user}/>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    @media(min-width: 426px){
        height: 678px;
        width: 314px;
        border: 12px solid #080808;
        border-radius: 44px;
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        position: relative;
        margin: 32px auto;
        &:before {
            position: absolute;
            left: calc(50% - 28%);
            top: 0;
            width: 56%;
            background: #080808;
            height: 26px;
            content: "";
            border-radius: 0 0 15px 15px;
        }
    }
`;

export default App;
