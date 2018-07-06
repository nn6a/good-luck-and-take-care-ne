import React, {Component} from 'react'
import firebase from 'firebase'
import ApplePhoneTemplate from '../../templates/ApplePhoneTemplate'
import styled from 'styled-components';

class SettingPage extends Component {
    constructor () {
        super();
        this.state = {
            user: null,
        }
    }

    componentDidMount () {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            this.setState({user});
        });
    }

    componentWillUnmount () {
        this.unregisterAuthObserver();
    }

    handleLogOut = () => {
        firebase.auth().signOut();
    };

    render () {
        return (
            <ApplePhoneTemplate>
                {this.state.user &&
                <ProfileWrapper>
                    <Profile>
                        <Avatar src={this.state.user.photoURL}/>
                        <Name>{this.state.user.displayName}</Name>
                        <Email>{this.state.user.email}</Email>
                        <LogoutButton onClick={this.handleLogOut}>Logout</LogoutButton>
                    </Profile>
                </ProfileWrapper>
                }
            </ApplePhoneTemplate>
        );
    }
}

const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.54) 0 0 60px;
`;

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: linear-gradient(to left bottom, ${props => props.theme.greyLight}, ${props => props.theme.grey});
`;

const Profile = styled.div`
    text-align: center;
`;

const Name = styled.span`
    display: block;
    color: ${props => props.theme.dark};
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 16px;
`;

const Email = styled.span`
    display: block;
    color: ${props => props.theme.greyDark};
    font-size: 0.8rem;
    margin-bottom: 8px;
`;

const LogoutButton = styled.button`
        background-color: transparent;
        border: ${props => props.theme.dark} solid 1px;
        color: ${props => props.theme.dark};
        cursor: pointer;
        outline: none;
        padding: 2px 8px;
        appearance: none;
`;

export default SettingPage;
