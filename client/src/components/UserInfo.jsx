import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { publicRequest, userRequest } from "../apiRequest";
import { Link } from "react-router-dom";
import { OpenaddressBook, OpenCart } from "../redux/cartSlice";

const Container = styled.div`
  position: absolute;
  width: 10em;
  background-color: #fff;
  display: ${(props) => (props.show === true ? "flex" : "none")};
  flex-direction: column;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 2;
  top: 240%;
  right: 0;
  gap: 20px;
  box-shadow: 0px 1px 0px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: all 0.3s ease-in-out;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
`;

const Features = styled.div`
  display: flex;
`;

const UserInfo = ({ show }) => {
  const { user } = useSelector((state) => state.usersInfo);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await userRequest.post(`/user/logout/${user._id}`);

      if (res.data === "User logout successfully") {
        localStorage.clear();
        window.location.reload(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddress = () => {
    dispatch(OpenCart());
    dispatch(OpenaddressBook());
  };

  return (
    <Container show={show}>
      <Name>
        <h5>My Account</h5>
        <h6>{user.username}</h6>
      </Name>
      <Features>
        <Link to="/orders" style={{ textDecoration: "none", color: "#000" }}>
          <small>My orders</small>
        </Link>
      </Features>
      <Features onClick={() => handleAddress()}>
        <small>My address</small>
      </Features>
      <Features onClick={() => handleLogout()}>
        <small>Logout</small>
      </Features>
    </Container>
  );
};

export default UserInfo;
