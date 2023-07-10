import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import Cart from "../pages/Cart";
import { OpenCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { laptop, mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 5.5em;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 2;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  border: 1px solid #eee;

  img {
    width: 60%;
    margin-left: 2em;
  }

  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
`;

const Center = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
  border: 1px solid #eee;
  ${mobile({ flex: "0", height: "0", padding: "0", border: "none" })}

  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 20px;
  border: 1px solid #eee;
  gap: 20px;

  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
`;

const LoginButton = styled.p`
  font-size: 18px;
`;

const AccountButton = styled.p`
  font-size: 18px;
  position: relative;
`;

const Button = styled.button`
  font-weight: bold;
  background-color: #0c831f;
  color: #fff;
  border: none;
  font-size: 1em;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2em;
  max-width: 7em;
  ${mobile({ fontSize: "0.85em" })};
  ${laptop({ fontSize: "1em" })}
`;

const CartDetail = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
`;

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

  const { total, quantity } = useSelector((state) => state.cartInfo);

  const { user } = useSelector((state) => state.usersInfo);

  const [show, SetShow] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    SetShow(!show);
  };

  const handleOpenCart = () => {
    dispatch(OpenCart());
  };

  return (
    <Container>
      <Left>
        <Link to="/">
          <img src="../flinkitNew.png" />
        </Link>
      </Left>
      <Center>
        <SearchBar />
      </Center>
      <Right>
        {user ? (
          <AccountButton onClick={() => handleClick()}>
            Account <UserInfo show={show} />
          </AccountButton>
        ) : (
          <LoginButton>Login</LoginButton>
        )}

        <Button onClick={() => handleOpenCart()}>
          <FontAwesomeIcon icon={faCartShopping} />
          {quantity === 0 ? (
            <p>cart</p>
          ) : (
            <CartDetail>
              <span>{quantity} items</span> <span>₹ {total}</span>
            </CartDetail>
          )}
        </Button>
      </Right>
    </Container>
  );
};

export default Navbar;
