import React, {Component} from 'react';
import styled from 'styled-components';
import Timeline from '../../Timeline/Timeline';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

class HomePage extends Component {
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
                <FabWrapper to={'/compose'}>
                    <Fab/>
                </FabWrapper>
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


const AccountWrapper = styled.div`
    position: absolute;
    padding: 0 16px;
`;

const FabWrapper = styled(Link)`
    position: absolute;
    bottom: 32px;
    right: 8px;
`;

const Fab = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 64px;
    background-color: rgb(244, 83, 123, 1);
`;

export default HomePage;
