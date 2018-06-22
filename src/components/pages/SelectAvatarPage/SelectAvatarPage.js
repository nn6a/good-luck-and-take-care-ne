import React, {Component} from 'react'
import firebase from 'firebase'
import {db} from '../../../helpers/firebase'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'

class SelectAvatarPage extends Component {
    constructor () {
        super();
        this.state = {
            selectedAvatarURL: '',
            providerAvatarURL: '',
            publicAvatarURL: [],
            uploadedAvatarURL: []
        };
    }

    handleUserAvatar = () => {
        const user = firebase.auth().currentUser;

        if (user !== null) {
            this.setState({
                selectedAvatarURL: user.photoURL,
                providerAvatarURL: user.providerData[0].photoURL
            })
        }
    };

    handlePublicAvatar = () => {
        const avatarRef = db.collection('avatars').doc('public');

        avatarRef.get().then((doc) => {
            const {avatarURL} = doc.data();

            if (doc.exists) {
                this.setState({
                    publicAvatarURL: avatarURL
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };

    handleUploadedAvatar = () => {
        const user = firebase.auth().currentUser;
        const avatarRef = db.collection('avatars').doc(user.uid).collection('images');

        avatarRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({uploadedAvatarURL: [...this.state.uploadedAvatarURL, doc.data().imageURL]})
            });
        });
    };

    handleSelect = () => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            photoURL: this.state.selectedAvatarURL
        }).then(() => {
            this.props.history.push('/compose');
        }).catch((error) => {
            console.log(error);
        });
    };

    onAvatarClick = (index) => {
        const avatarURL = [this.state.providerAvatarURL, ...this.state.publicAvatarURL, ...this.state.uploadedAvatarURL];

        this.setState({selectedAvatarURL: avatarURL[index]})
    };

    componentDidMount () {
        this.handleUserAvatar();
        this.handlePublicAvatar();
        this.handleUploadedAvatar();
    }

    renderAvatar = () => {
        const avatarURL = [this.state.providerAvatarURL, ...this.state.publicAvatarURL, ...this.state.uploadedAvatarURL];

        return avatarURL.map((obj, i) => {
            return (
                <Avatar
                    src={obj}
                    key={i}
                    alt={'avatar'}
                    onClick={() => this.onAvatarClick(i)}
                />
            );
        });
    };

    render () {
        return (
            <ApplePhoneTemplate>
                <h3>Select Avatar</h3>
                <SelectedAvatar src={this.state.selectedAvatarURL} alt='avatar'/>

                <Link to={'/avatar-upload'}>
                    <button>Upload</button>
                </Link>

                {this.state.publicAvatarURL.length > 0 && this.state.providerAvatarURL &&
                <div>
                    {this.renderAvatar()}
                </div>
                }
                <button onClick={this.handleSelect}>Select</button>
            </ApplePhoneTemplate>
        );
    }
}

const SelectedAvatar = styled.img`
    width: 80px;
    height: 80px;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
`;

export default SelectAvatarPage;
