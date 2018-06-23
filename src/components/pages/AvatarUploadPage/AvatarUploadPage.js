import React, {Component} from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import {db} from '../../../helpers/firebase'
import ReactCrop, {makeAspectCrop} from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'

class AvatarUploadPage extends Component {
    constructor () {
        super();
        this.state = {
            src: null,
            crop: {},
            croppedImage: null,
            croppedImageURL: null
        };
    }

    onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load',
                () =>
                    this.setState({
                        src: reader.result,
                    }),
                false
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    onImageLoaded = (image) => {
        this.setState({
            crop: makeAspectCrop({
                x: 0,
                y: 0,
                aspect: 1,
                width: 50
            }, image.width / image.height)
        });
    };

    onCropComplete = (crop, pixelCrop) => {
        this.getCroppedImage(this.state.src, pixelCrop, 'croppedImage')
            .then((image) => {
                this.setState({
                    croppedImage: image,
                    croppedImageURL: URL.createObjectURL(image)
                });
            })

    };

    onCropChange = (crop, pixelCrop) => {
        this.setState({crop, pixelCrop})
    };

    getCroppedImage = (image, pixelCrop, fileName) => {
        const img = new Image();
        img.src = image;

        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            img,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(file => {
                file.name = fileName;
                resolve(file);
            }, 'image/jpeg');
        });
    };

    onUpload = () => {
        const user = firebase.auth().currentUser;
        const timestamp = Date.now().toString();
        const storageRef = firebase.storage().ref('avatar').child(user.uid);

        storageRef.child(timestamp).put(this.state.croppedImage).then((snapshot) => {

            storageRef.child(snapshot.metadata.name).getDownloadURL()
                .then((url) => {
                    const newItem = {
                        imageURL: url
                    };

                    db.collection('avatars').doc(user.uid).collection('images').add(newItem)
                        .then(() => {
                            this.props.history.push('/avatar');
                        })
                        .catch((error) => {
                            console.error('Error adding document: ', error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    render () {
        return (
            <ApplePhoneTemplate>
                <h3>Upload Your Avatar</h3>

                <input type="file" accept="image/*" onChange={this.onSelectFile}/>
                {this.state.src && (
                    <ReactCrop
                        src={this.state.src}
                        crop={this.state.crop}
                        keepSelection={true}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}

                {this.state.croppedImageURL &&
                <div>
                    <h4>Cropped Image</h4>
                    <CroppedImage src={this.state.croppedImageURL}/>
                    <button onClick={this.onUpload}>Upload</button>
                </div>
                }
            </ApplePhoneTemplate>
        );
    }
}

const CroppedImage = styled.img`
    width: 80px;
    height: 80px;
`;

export default AvatarUploadPage
