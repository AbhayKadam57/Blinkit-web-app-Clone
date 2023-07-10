import {
  faArrowLeft,
  faChevronRight,
  faClose,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddressSection from "../components/AddressSection";
import {
  AddProducts,
  OpenaddressBook,
  OpenCart,
  UpdateProducts,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: ${(props) => (props.show === true ? "flex" : "none")};
  align-content: center;
  justify-content: flex-end;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

const CartBox = styled.div`
  min-width: 32%;
  background-color: #fff;
  overflow-y: scroll;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 10;
  ${mobile({ width: "100%" })};
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  background-color: #fff;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

const DeliveryStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  small {
    color: #817f7f;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Product = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
      font-size: 14px;
      font-weight: 500;
    }

    small {
      color: #817f7f;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  object-fit: contain;
  padding: 10px;
`;

const Bottom = styled.div`
  display: ${(props) => (props.show >= 1 ? "flex" : "none")};
  z-index: 1;
  align-items: center;
  padding: 20px;
  justify-content: center;
  position: sticky;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  button {
    width: 100%;
    background-color: #0c831f;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 10px;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    p {
      font-size: 16px;
      font-weight: 600;
      margin-right: 10px;
    }
  }
`;

const Button_1 = styled.button`
  width: 100px;
  font-size: 1em;
  font-weight: bold;
  background-color: #0c831f;
  padding: 5px 15px;
  border-radius: 5px;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Reciept = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  small {
    font-size: 12px;
    color: #626262;
    font-weight: 500;
  }
  p {
    font-weight: 600;
    color: #454545;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const EmptyCart = styled.div`
  width: 100%;
  height: 50%;
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  p {
    font-size: 12px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Button = styled.button`
  font-weight: 500;
  background-color: #0c831f;
  color: #fff;
  border: none;
  font-size: 0.8em;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;
`;

const Cart = () => {
  const { products, total, quantity, openCart, openaddressBook } = useSelector(
    (state) => state.cartInfo
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(OpenCart());
  };

  const handleUpdate = (type, product) => {
    dispatch(UpdateProducts({ type, product }));
  };

  const handleOpenAddress = () => {
    dispatch(OpenaddressBook());
  };

  return (
    <Container show={openCart}>
      {!openaddressBook ? (
        <CartBox>
          <Top>
            <h2>My Cart</h2>
            <FontAwesomeIcon
              icon={faClose}
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => handleClose()}
            />
          </Top>
          {products?.length > 0 ? (
            <>
              <Center>
                <DeliveryStatus>
                  <h5>Delivery in 8 minutes</h5>
                  <small>{quantity} item</small>
                </DeliveryStatus>
                <ProductList>
                  {products?.map((items, i) => (
                    <Product>
                      <Image src={items?.images[0]} />
                      <div>
                        <p>{items?.name}</p>
                        <small>{items?.unit}</small>
                        <span>
                          <h5>₹ {items?.price}</h5>
                          <Button_1>
                            <FontAwesomeIcon
                              icon={faPlus}
                              onClick={() => handleUpdate("add", items)}
                            />
                            <p>{items.quantity}</p>
                            <FontAwesomeIcon
                              icon={faMinus}
                              onClick={() => handleUpdate("dec", items)}
                            />
                          </Button_1>
                        </span>
                      </div>
                    </Product>
                  ))}
                </ProductList>
                <Reciept>
                  <div>
                    <small>MRP</small>
                    <small>₹ {total}</small>
                  </div>
                  <div>
                    <small>Handling Charge</small>
                    <small>₹ {quantity * 2}</small>
                  </div>
                  <div>
                    <small>Delievery Charge</small>
                    <small>₹ {quantity * 15}</small>
                  </div>
                  <div>
                    <p>Grand Total</p>
                    <p>₹ {total + quantity * 2 + quantity * 15}</p>
                  </div>
                </Reciept>
              </Center>
            </>
          ) : (
            <EmptyCart>
              <img src="../../undraw_empty_cart_co35.svg" />
              <p>Your favourite items are just click away...</p>
              <Button onClick={() => handleClose()}>Start Shopping</Button>
            </EmptyCart>
          )}

          <Bottom show={products.length}>
            <button onClick={() => handleOpenAddress()}>
              <div>
                <p>
                  {quantity} item . ₹ {total + quantity * 2 + quantity * 15}
                </p>
                <p>
                  Proceed
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
              </div>
            </button>
          </Bottom>
        </CartBox>
      ) : (
        <AddressSection />
      )}
    </Container>
  );
};

export default Cart;
