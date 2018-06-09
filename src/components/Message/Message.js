import React, {Component} from 'react';
import styled from 'styled-components';

export default class Message extends Component {
    render () {
        return (
            <Wrapper>
                <Name>{this.props.message.userName}</Name>
                <StyledMessage>{this.props.message.message}</StyledMessage>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    background-color: rgba(29,38,65,0.84);
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 8px;
    &:first-child {
      margin-top: 32px;
    }
    &:last-child {
      margin-bottom: 104px;
    }
`;

const Name = styled.span`
    display: block;
    font-size: 0.6rem;
    color: rgb(244, 83, 123, 1);
`;

const StyledMessage = styled.span`
    color: rgba(255, 255, 255, 0.84);
`;
