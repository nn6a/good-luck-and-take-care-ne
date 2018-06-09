import React, {Component} from 'react';
import styled from 'styled-components';
import Timeline from '../Timeline/Timeline';
import Input from '../Input/Input'
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
                <AccountWrapper>
                    {!this.state.user ? (
                        <button onClick={this.handleSignIn.bind(this)}>Sign in</button>
                    ) : (
                        <button onClick={this.handleLogOut.bind(this)}>Logout</button>
                    )}
                </AccountWrapper>

                <Timeline user={this.state.user}/>
                <InputWrapper>
                    <Input user={this.state.user}/>
                </InputWrapper>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    @media(min-width: 426px){
        height: 678px;
        width: 314px;
        border: 12px solid #080808;
        border-radius: 44px;
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        margin: 32px auto;
        overflow: hidden;
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

const InputWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
`;

const AccountWrapper = styled.div`
    position: absolute;
    padding: 0 16px;
`;
export default App;
