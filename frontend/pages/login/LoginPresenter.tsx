import React from "react";
import styled from "styled-components";

interface IProps {
  from: string;
  email: string;
  password: string;
  handleChange: (e: any) => void;
  handleSubmit: () => void;
}

export default ({ from, email, password, handleChange, handleSubmit }: IProps) => (
  <Container>
    <h1>Login page</h1>
    <p>Rendered from {from}</p>

    <input type="text" name="email" value={email} onChange={handleChange} />
    <input type="password" name="password" value={password} onChange={handleChange} />
    <button onClick={handleSubmit}>로그인</button>
  </Container>
);

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
