import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #cacaca;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.section`
    background-color: #ffffff;
    width: 25%;
    min-width: 300px;
    max-width: 400px;
    padding: 10px;
    border-radius: 30px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`