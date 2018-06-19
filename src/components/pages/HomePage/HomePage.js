import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Timeline from '../../Timeline/Timeline'
import Button from '../../Button/Button'

class HomePage extends Component {
    render () {
        return (
            <Wrapper>
                <SettingWrapper>
                    <Link to={'/setting'}>
                        <button>Setting</button>
                    </Link>
                </SettingWrapper>

                <Timeline/>

                <ButtonWrapper>
                    <Link to={'/compose'}>
                        <Button>LEAVE A MESSAGE</Button>
                    </Link>
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

const SettingWrapper = styled.div`
    position: absolute;
    right: 0;
    padding: 0 16px;
`;

const ButtonWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    bottom: 32px;
    padding: 8px;
`;

export default HomePage;
