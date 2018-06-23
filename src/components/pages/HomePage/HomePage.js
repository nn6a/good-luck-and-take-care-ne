import React, {Component} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'
import Timeline from '../../Timeline/Timeline'
import Button from '../../Button/Button'
import setting from '../../../assets/cog.svg'

class HomePage extends Component {
    render () {
        return (
            <ApplePhoneTemplate>
                <SettingWrapper>
                    <Link to={'/setting'}>
                        <SettingIcon src={setting} alt='setting'/>
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
    padding:16px 8px;
`;

const SettingIcon = styled.img`
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.greyDark};
`;

const ButtonWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    bottom: 32px;
    padding: 8px;
`;

export default HomePage
