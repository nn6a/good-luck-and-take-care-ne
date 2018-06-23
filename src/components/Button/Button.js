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
    color: ${props => props.theme.light};
    background-color: ${props => props.theme.dark};
    border-radius: 8px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.04) 0 2px 6px;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }

`;

export default Button;
