import styled from 'styled-components'

export const SectionForm = styled.section`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 14px;
    form {
        > div {
            display: flex;
            justify-content: space-between;
            margin: 7px 0;
        }
        & div:last-child {
            display: flex;
            justify-content: flex-end;
        }
        input {
            margin-left: 7px;
            border-radius: 8px;
            border: 1px solid #5e5af7;
            padding: 3.5px;
        }
        button {
            background-color: #5e5af7;
            color: #dcdbf9;
            border: 0;
            padding: 3px 7px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s linear;
            &:hover {
                background-color: #1b1a71;
            }
        }
    }
`
