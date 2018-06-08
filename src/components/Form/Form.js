import React, {Component} from 'react';
import Message from '../Message/Message';
import {db} from '../../helpers/firebase';
import firebase from 'firebase'

export default class Form extends Component {
    constructor (props) {
        super(props);
        this.state = {
            userName: 'Noah',
            message: '',
            list: ['test'],
        };
        this.messageRef = db.collection("messages");
        this.listenMessages();
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
                <div className="form__row">
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Type message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form__button"
                        onClick={this.handleSend.bind(this)}
                    >
                        send
                    </button>
                </div>
            </div>
        );
    }
}
