import React, {Component} from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import {db} from "../../../helpers/firebase"
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'
import Textarea from '../../Textarea/Textarea'
import Button from '../../Button/Button'
import FileUploader from 'react-firebase-file-uploader'

class ComposePage extends Component {
    constructor () {
        super();
        this.state = {
            uid: '',
            userName: '',
            message: '',
            isUploading: false,
            progress: 0,
            fileName: [],
            imageURL: [],
        };
        this.messageRef = db.collection("messages");
        this.storageRef = firebase.storage().ref('user-images');
    }

    handleMessage = (message) => {
        this.setState({message})
    };

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    };
    handleUploadSuccess = (filename) => {
        this.setState({
            fileName: [...this.state.fileName, filename],
            progress: 100,
            isUploading: false,
        });
        this.storageRef.child(this.state.uid).child(filename).getDownloadURL()
            .then(url => this.setState({
                imageURL: [...this.state.imageURL, url]
            }));
    };

    handleRemove = (index) => {
        const {fileName, imageURL} = this.state;
        const imageRef = this.storageRef.child(this.state.uid).child(fileName[index]);

        imageRef.delete().then(function() {
            console.log('Successfully deleted')
        }).catch(function(error) {
            console.log(error)
        });

        this.setState({
            fileName: fileName.filter((fileName, i) => i !== index),
            imageURL: imageURL.filter((imageURL, i) => i !== index)
        });

    };

    handleSend = () => {
        if (!this.state.message && this.state.imageURL.length === 0) return;

        const newItem = {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userName: this.state.userName,
            message: this.state.message,
            imageURL: this.state.imageURL
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
            if (user) {
                this.setState({
                    userName: user.displayName,
                    uid: user.uid
                })
            }
        });
    }

    renderImage = (url, index) => {
        return (
            <StyledImage
                key={url}
                src={url}
                onClick={() => this.handleRemove(index)}
            />
        )
    };

    render () {
        const {imageURL} = this.state;

        return (
            <ApplePhoneTemplate>
                <InputWrapper>
                    <Textarea
                        value={this.props.message}
                        onEditText={this.handleMessage}
                    />
                </InputWrapper>

                <UploaderWrapper>
                    {this.state.imageURL &&
                        imageURL.map(this.renderImage)
                    }

                    {!this.state.isUploading && this.state.imageURL.length < 4 &&
                    <StyledLabel>
                        ADD
                        <FileUploader
                            hidden
                            accept="image/*"
                            name="user-image"
                            randomizeFilename
                            storageRef={this.storageRef.child(this.state.uid)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </StyledLabel>
                    }
                </UploaderWrapper>
                {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
                }

                <ButtonWrapper>
                    <Button onButtonClick={this.handleSend}>PUSH ME</Button>
                </ButtonWrapper>
            </ApplePhoneTemplate>
        );
    }
}

const InputWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 40px 16px 24px;
`;

const ButtonWrapper = styled.div`
    margin-top: 40px;
    padding: 0 8px;
`;

const StyledImage = styled.div`
    height: 80px;
    width: 25%;
    background: url(${props => props.src}) center center;
    background-size: cover;
    border-radius: 8px;
`;

const UploaderWrapper = styled.div`
    display: flex;
    padding: 16px;
`;

const StyledLabel = styled.label`
    height: 80px;
    width: 25%;
    display: inline-block;
    border: 1px solid #000;
    text-align: center;
`;

export default ComposePage;
