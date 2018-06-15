import React, {Component} from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import {db} from "../../../helpers/firebase";
import Textarea from '../../Textarea/Textarea';
import Button from '../../Button/Button';

class ComposePage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName: '',
            message: '',
        };
        this.messageRef = db.collection("messages");
    }

    handleMessage = (message) => {
        this.setState({message})
    };

    handleSend = () => {
        if (!this.state.message) return;

        const newItem = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userName: this.state.userName,
            message: this.state.message,
        };
        this.messageRef.add(newItem)
            .then(() => {
                this.setState({message: ''});
                this.props.history.push('/');
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({userName: user.displayName})
        });
    }

    render () {
        return (
            <Wrapper>
                <p>{this.props.userName}</p>
                <InputWrapper>
                    <Textarea
                        value={this.props.message}
                        onEditText={this.handleMessage}
                    />
                </InputWrapper>
                <ButtonWrapper>
                    <Button onButtonClick={this.handleSend}>PUSH ME</Button>
                </ButtonWrapper>
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
    width: 100%;
    box-sizing: border-box;
    padding: 40px 16px 24px;
`;

const ButtonWrapper = styled.div`
    padding: 0 8px;
`;

export default ComposePage;
