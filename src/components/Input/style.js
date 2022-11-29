import styled from "styled-components";

export const InputContainer = styled.div`
    width: 100%;
    height: 80px;
    border-radius: 25px;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    overflow-x: auto;

    input {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        background-color: black;
        color: #ffffff;
        border: 0;
        text-align: right;

        font-family: 'Roboto';
        font-size: 18px;
    }
`