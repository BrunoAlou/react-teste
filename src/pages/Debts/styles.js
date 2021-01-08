import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  background : #f5f5dc;

`;

export const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ContainerList = styled.div`
  display: grid;
  padding: 25px;
  align-items: center;
  justify-content: center;
  div{
    padding : 15px;
    margin : 15px;
    background: #fff;
    p{
      text-align : left;
    }
    ul{
      text-align : right;
    }
  }
`;

export const Form = styled.form`
  width: 300px;
  height: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }

  button {
    color: #fff;
    font-size: 11px;
    background: #4bb543;
    height: 35px;
    border: 0;
    border-radius: 5px;
    width: 70%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
  Link{
    padding: 3px;
    margin: 2px;
  }
  select {
    flex: 1;
    height: 46px;
    width: 115%;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }`;

export const FormDebts = styled.form`
  padding: 20px;
  display: contents;
  p {
    color: #ff3333;
    width: 100%;
  }
  input {
    height: 30px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
`;
