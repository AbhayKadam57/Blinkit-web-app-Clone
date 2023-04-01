import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f8cb46;
  width: 100vw;
  gap: 20px;
  background: url("../../bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Form = styled.form`
  min-height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  font-size: 1.2em;
  padding: 10px;
  outline: none;
  border-radius: 8px;
  outline: none;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  font-weight: bold;
  font-size: 1.2em;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: #0c831f;
  color: #fff;
  cursor: pointer;
`;

const Errors = styled.small`
  color: red;
`;

const Success = styled.small`
  color: #04176e;
  text-align: center;
`;

const Heading = styled.h1`
  color: #0c831f;
`;
const Info = styled.p``;

const Links = styled(Link)`
  color: #0c831f;
`;

const Card = styled.div`
  width: 25%;
  background-color: #f8cb46;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
`;

const SignUppage = () => {
  const [users, setUser] = useState({});

  const { registerMessage } = useSelector((state) => state.usersInfo);

  const [Error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.username && users.password) {
      setError(false);
      RegisterUser(dispatch, users);
      users.username = "";
      users.password = "";
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <Card>
        <Heading>Register Page</Heading>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
            value={users.username}
            name="username"
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            value={users.password}
            name="password"
          />
          <Button>Register</Button>
          {Error ? (
            <Errors>Please fill all fields...</Errors>
          ) : (
            <Success>{registerMessage}</Success>
          )}
        </Form>
        <Info>
          Already Registered ? Please <Links to="/login">Login</Links>
        </Info>
      </Card>
    </Container>
  );
};

export default SignUppage;
