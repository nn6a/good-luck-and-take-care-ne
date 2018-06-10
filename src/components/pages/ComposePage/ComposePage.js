import React, {Component} from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import Input from '../../Input/Input';

class ComposePage extends Component {
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

    render () {
        return (
            <Wrapper>
                <InputWrapper>
                    <Input user={this.state.user}/>
                </InputWrapper>
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
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export default ComposePage;
