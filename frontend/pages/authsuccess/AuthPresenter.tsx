import React from "react";
import styled from "styled-components";

interface IProps {
  email: string;
  fullName: string;
  penName: string;
  handleChange: (e: any) => void;
  handleSubmit: () => void;
}

export default (props: IProps) => {
  const { email, fullName, penName, handleChange, handleSubmit } = props;
  return (
    <Container>
      <h1>Sign Up page</h1>
      <input type="text" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="fullName" value={fullName} onChange={handleChange} placeholder="Full Name" />
      <input type="text" name="penName" value={penName} onChange={handleChange} placeholder="Pen Name" />
      <button onClick={handleSubmit}>Sign Up</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px 30px;
`;
