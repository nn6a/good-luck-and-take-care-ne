import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'
import Timeline from '../../Timeline/Timeline'
import Button from '../../Button/Button'

class HomePage extends Component {
    render () {
        return (
            <ApplePhoneTemplate>
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
            </ApplePhoneTemplate>
        );
    }
}

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

export default HomePage
