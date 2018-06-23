import React, {Component} from 'react'
import styled from 'styled-components'
import Lightbox from 'react-images'

export default class Message extends Component {
    constructor () {
        super();
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0
        };
    }

    openLightbox = (index, event) => {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true,
        });
    };

    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    };

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    };

    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    };

    gotoImage = (index) => {
        this.setState({
            currentImage: index,
        });
    };

    renderImage = (url) => {
        if (!url) return;

        const images = url.map((obj, i) => {
            return (
                <ImageLink
                    href={obj.src}
                    key={i}
                    onClick={(e) => this.openLightbox(i, e)}
                />
            );
        });

        return (
            <ImageWrapper numberOfImages={images.length}>
                {images}
            </ImageWrapper>
        );
    };

    render () {
        const imageURL = this.props.message.imageURL.map((url) => {
            return {src: url}
        });

        return (
            <Wrapper>
                <div>
                    <Avatar src={this.props.message.avatar}/>
                </div>
                <MessageWrapper>
                    <Name>{this.props.message.userName}</Name>
                    <StyledMessage>{this.props.message.message}</StyledMessage>

                    {imageURL.length > 0 &&
                    <div>
                        {this.renderImage(imageURL)}
                        <Lightbox
                            currentImage={this.state.currentImage}
                            images={imageURL}
                            isOpen={this.state.lightboxIsOpen}
                            onClickNext={this.gotoNext}
                            onClickPrev={this.gotoPrevious}
                            onClickThumbnail={this.gotoImage}
                            onClose={this.closeLightbox}
                            showImageCount={false}
                            backdropClosesModal={true}
                        />
                    </div>
                    }
                </MessageWrapper>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
`;

const MessageWrapper = styled.div`
    flex-grow: 1;
    background-color: ${props => props.theme.light};
    padding: 16px;
    margin-top: 5px;
    box-shadow: rgba(0, 0, 0, 0.04) 0 2px 6px;
    border-radius: 0 16px 16px 16px;
`;

const Name = styled.span`
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    font-feature-settings : 'palt';
    color: rgb(244, 83, 123, 1);
    word-break: break-word;
    margin-bottom: 8px;
`;

const StyledMessage = styled.span`
    max-width: 100%;
    font-feature-settings : 'palt';
    letter-spacing: 0.05em;
    word-break: break-word;
    color: ${props => props.theme.dark};
`;

const ImageWrapper = styled.div`
    height: 180px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => props.numberOfImages === 3 ? 'column' : 'row'};
    border-radius: 8px;
    overflow: hidden;
    margin-top: 8px;
`;

const ImageLink = styled.a`
    flex-basis: 50%;
    display: block;
    background: url(${props => props.href}) center center;
    background-size: cover;
    :first-child {
        flex-grow: 1;
    }
    // only first child which has 2 siblings
    :first-child:nth-last-child(3) {
        flex-basis: 100%;
    }
`;
