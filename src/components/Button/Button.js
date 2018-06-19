import React, {Component} from "react"
import styled from 'styled-components'

class Button extends Component {
    handleClick = () => {
        if (this.props.onButtonClick) {
            this.props.onButtonClick()
        }
    };

    render () {
        const {children} = this.props;
        return (
            <StyledButton onClick={this.handleClick}>{children}</StyledButton>
        );
    }
}

const StyledButton = styled.button`
    width: 100%;
    padding: 16px;
    appearance: none;
    font-size: 1rem;
    color: #fff;
    background-color: rgb(244, 83, 123, 1);
    border-radius: 8px;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }

`;

export default Button;
