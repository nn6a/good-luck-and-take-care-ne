import React from 'react'
import styled from 'styled-components'

const ApplePhoneTemplate = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
    background-color: ${props => props.theme.greyLight};
    @media(min-width: 500px){
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

export default ApplePhoneTemplate
