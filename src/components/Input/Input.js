import React, {Component} from 'react';
import styled from 'styled-components';
import {db} from '../../helpers/firebase';
import firebase from 'firebase'
import Textarea from 'react-textarea-autosize';

export default class Input extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName: '',
            message: '',
        };
        this.messageRef = db.collection("messages");
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user) {
            this.setState({'userName': nextProps.user.displayName});
        }
    }

    handleChange (event) {
        this.setState({message: event.target.value});
    }

    handleSend () {
        if (this.state.message) {
            const newItem = {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userName: this.state.userName,
                message: this.state.message,
            };
            this.messageRef.add(newItem)
                .then(() => {
                    this.setState({message: ''});
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }

    handleKeyPress (event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }


    render () {
        return (
            <Wrapper>
                <StyledInput
                    maxRows={3}
                    type="text"
                    placeholder="Type message"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                />
                <Button onClick={this.handleSend.bind(this)}>send</Button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
`;

const StyledInput = styled(Textarea)`
    flex: 5;
    appearance: none;
    resize: none;
    font-size: 1rem;
    padding: 16px;
    border: 1px solid #080808;
    border-radius: 8px 0 0 8px;
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }
`;

const Button = styled.button`
    flex: 1;
    appearance: none;
    border: 1px solid #080808;
    border-left: none;
    border-radius: 0 8px 8px 0;
    &:focus {
      outline: none;
    }
`;
