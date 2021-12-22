import styled from 'styled-components'

export const SectionForm = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
        padding: 7px;
        border-radius: 8px;
        color: aliceblue;
        background-color: #1b1a71;
    }
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
        textarea {
            resize: none;
        }
    }
`
