import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 20px;
  background-color: #f8cb46;
  width: 100vw;
  position: relative;
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
  color: #d30808d2;
`;

const Heading = styled.h1`
  color: #0c831f;
`;

const Info = styled.p``;

const Links = styled(Link)`
  color: #0c831f;
`;

const Card = styled.div`
  min-width: 25%;
  background-color: #f8cb46;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
`;

const LoginPage = () => {
  const [users, setUser] = useState({});
  const [Error, setError] = useState(false);

  const { LoginMessage } = useSelector((state) => state.usersInfo);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({ ...users, [e.target.name]: e.target.value });
  };

  console.log(users);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users.username && users.password) {
      setError(false);
      LoginUser(dispatch, users);
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <Card>
        <Heading>Login Page</Heading>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={users.username}
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={users.password}
            onChange={(e) => handleChange(e)}
          />
          <Button>Login</Button>
          {Error ? (
            <Errors>Please fill all fields...</Errors>
          ) : LoginMessage ? (
            <Errors>{`${LoginMessage}`}</Errors>
          ) : (
            ""
          )}
        </Form>
        <Info>
          Not Register ? Please <Links to="/register">Register</Links>
        </Info>
      </Card>
    </Container>
  );
};

export default LoginPage;
