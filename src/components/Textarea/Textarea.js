import React, {Component} from "react"
import styled from 'styled-components'

class Textarea extends Component {
    handleChange = e => {
        const value = e.target.value;

        this.props.onEditText(value);
    };

    render () {
        const {placeholder} = this.props;

        return (
            <StyledTextarea
                rows = '10'
                placeholder={placeholder}
                onChange={this.handleChange}
            />
        );
    }
}

const StyledTextarea = styled.textarea`
    width: 100%;
    appearance: none;
    resize: none;
    font-size: 1rem;
    box-sizing: border-box;
    padding: 16px;
    &:focus {
      outline: none;
    }
    &::-webkit-scrollbar {
      display: none;
    }

`;

export default Textarea;
