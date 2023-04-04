import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../apiRequest";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  flex-direction: column;
  ${tablet({ backgroundColor: "red" })}
`;

const Box = styled.div`
  width: 80%;
  padding: 10px;
  flex-direction: column;
  ${mobile({ marginTop: "50px" })}
`;

const OrderBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: 1px solid #0c831f;
  padding: 10px;
  border-radius: 10px;
  gap: 10px;
`;

const TimeBox = styled.p`
  font-size: 14px;
  color: #444;
`;

const ArrivingBox = styled.p`
  font-size: 18px;
  color: #0c831f;
  font-weight: bold;
`;

const AddressingBox = styled.p`
  font-size: 16px;
  color: #444;
  ${mobile({ fontSize: "0.8em" })}
`;

const ProducBox = styled.div`
  display: flex;
  padding: 10px;
`;

const LefthandBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }
`;

const CenterBox = styled.div`
  flex: 5;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 18px;
    font-weight: 400;
    ${mobile({ fontSize: "0.9em" })}
  }

  small {
    font-size: 16px;
    color: #444;
    ${mobile({ fontSize: "0.7em" })}
  }
`;

const RighthandBox = styled.div`
  flex: 1;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 18px;
    font-weight: 600;
    ${mobile({ fontSize: "0.9em" })}
  }
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 10%;
  margin-left: 50px;
  gap: 10px;

  p {
    color: ${(props) => (props.show === false ? "#f7710b" : "#0C831F")};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) => (props.show === false ? "#f7710b" : "#0C831F")};
  animation: ${(props) =>
    props.show === false ? "pulse 2s infinite ease-in-out" : "none"};

  @keyframes pulse {
    0% {
      font-size: 10px;
    }
    50% {
      font-size: 14px;
    }
    100% {
      font-size: 10px;
    }
  }
`;

const OrderPage = () => {
  const { user } = useSelector((state) => state.usersInfo);

  const [OrderList, SetOrderList] = useState([]);

  useEffect(() => {
    let isSubscribe = true;

    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/order/getorders/${user?._id}`);

        console.log(res.data);

        SetOrderList(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getOrders();
    }

    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <Container>
      <Navbar />
      <Box>
        <h2>Hey {user.username.split(" ")[0]} your orders</h2>

        {OrderList.map((o, i) => (
          <OrderBox>
            <TimeBox>
              Order on {new Date(o.updatedAt).getDate()}/
              {new Date(o.updatedAt).getMonth() + 1}/
              {new Date(o.updatedAt).getFullYear()} at{" "}
              {new Date(o.updatedAt).getHours()}:
              {new Date(o.updatedAt).getMinutes()}{" "}
              {new Date(o.updatedAt).getHours() >= 12 ? "PM" : "AM"}
            </TimeBox>
            <ArrivingBox>arriving in 10 minutes</ArrivingBox>
            <AddressingBox>{o.address}</AddressingBox>
            <p style={{ fontWeight: "600" }}>Order id:{o._id}</p>
            <Status>
              <Icon
                show={o.status === "pending" ? false : true}
                icon={faDotCircle}
              />
              <p show={o.status === "pending" ? false : true}>{o.status}</p>
            </Status>

            {o.products.map((p, i) => (
              <ProducBox>
                <LefthandBox>
                  <img src={p.images[0]} alt="" />
                </LefthandBox>
                <CenterBox>
                  <p>{p.name}</p>
                  <small>{p.unit}</small>
                  <small>Qty: {p.quantity}</small>
                </CenterBox>
                <RighthandBox>
                  <p>₹ {p.quantity * p.price}</p>
                </RighthandBox>
              </ProducBox>
            ))}
          </OrderBox>
        ))}
      </Box>
    </Container>
  );
};

export default OrderPage;
