import React, {Component} from 'react';
import styled from 'styled-components';
import Message from '../Message/Message';
import {db} from '../../helpers/firebase';

export default class Timeline extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: [],
        };
        this.messageRef = db.collection('messages');
        this.listenMessages();
    }

    listenMessages () {
        this.unsubscribe = this.messageRef.orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });

            this.setState({
                list: messages
            })
        });
    }

    componentWillUnmount () {
        // Stop listening to changes
        this.unsubscribe();
    }

    render () {
        return (
            <Wrapper>
                {this.state.list.map((item, index) =>
                    <Message key={index} message={item}/>
                )}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    height: 100%;
    padding: 0 16px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
`;
