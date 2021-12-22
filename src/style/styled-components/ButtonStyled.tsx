import styled from 'styled-components'

interface ButtonProps {
    readonly fontSize?: number
}

export const ButtonStyled = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    background-color: #5e5af7;
    color: #dcdbf9;
    font-size: ${(p) => `${p.fontSize}px`};
    border: 0;
    padding: 3px 7px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s linear;
    &:hover {
        background-color: #1b1a71;
    }
    span {
        display: flex;
        margin-left: 7px;
    }
`
