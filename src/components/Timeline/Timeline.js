import React, {Component} from 'react';
import Message from '../Message/Message';
import {db} from '../../helpers/firebase';

export default class Timeline extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: [],
        };
        this.messageRef = db.collection("messages");
        this.listenMessages();
    }

    listenMessages () {
        this.messageRef.orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            this.setState({
                list: messages
            })
        });

    }

    render () {
        return (
            <div className="form">
                <div className="form__message">
                    {this.state.list.map((item, index) =>
                        <Message key={index} message={item}/>
                    )}
                </div>
            </div>
        );
    }
}
