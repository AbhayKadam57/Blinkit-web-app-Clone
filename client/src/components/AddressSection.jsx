import { faClose, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OpenaddressBook } from "../redux/cartSlice";
import { publicRequest, userRequest } from "../apiRequest";
import useRazorpay from "react-razorpay";
import { useNavigate, useParams } from "react-router-dom";

const AddressBox = styled.div`
  width: 22%;
  background-color: #fff;
  overflow-y: scroll;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: 10;
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
  gap: 10px;
  flex-wrap: wrap;
`;

const Bottom = styled.div`
  display: flex;
  z-index: 1;
  align-items: center;
  padding: 20px;
  justify-content: center;
  position: sticky;
  top: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  flex-direction: column;
  gap: 10px;
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

const Container = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(47, 47, 47, 0.3);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
  flex-grow: 1;
`;

const Form = styled.form`
  display: flex;
  align-items: Start;
  justify-content: flex-start;
  min-width: 30%;
  background-color: #fff;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  button {
    width: 100%;
    background-color: #0c831f;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin-top: 20px;
  }
`;

const Input = styled.input`
  font-size: 1em;
  font-weight: 500;
  padding: 8px;
  border: 1px solid green;
  border-radius: 5px;
  width: 100%;
`;
const Label = styled.label`
  font-size: 1em;
  margin-top: 10px;
  margin-bottom: 8px;
`;

const AddressList = styled.div`
  max-width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props) => (props.show ? "#0cce2d64" : "")};

  &:hover {
    background-color: #0cce2d64;
    cursor: pointer;
  }
`;

const AddressSection = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [showAddress, setShowAddress] = useState(false);

  const [address, setAddress] = useState({});

  const { user } = useSelector((state) => state.usersInfo);

  const { products, quantity, total } = useSelector((state) => state.cartInfo);

  const [addressList, setAddressList] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await userRequest.get(`/user/getAddress/${user?._id}`);

        console.log(res);

        let arr = [];

        res.data.address.map((item, i) => {
          let str = "";
          for (let key in item) {
            str += item[key] + ",";
          }
          arr.push(str);
        });

        setAddressList([...arr]);
      } catch (e) {
        console.log(e);
      }
    };

    getAddress();

    return () => {
      getAddress();
    };
  }, [showAddress]);

  console.log(addressList);

  const handleOpenAddress = () => {
    dispatch(OpenaddressBook());
  };

  const handleShowAddress = () => {
    setShowAddress(!showAddress);
  };

  const handleChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userRequest.put(
        `/user/addAddress/${user?._id}`,
        address
      );
    } catch (e) {
      console.log(e);
    }

    setShowAddress(!showAddress);
  };

  const SelectNewAddress = (id) => {
    setSelectedAddress(id);
  };

  const FinalAmount = Math.ceil(total + quantity * 2 + quantity * 15);

  const Razorpay = useRazorpay();

  const initiatePayment = async (data) => {
    try {
      const order = await userRequest.post(`/order/create-order/${user?._id}`, {
        userId: user?._id,
        products: products,
        quantity: quantity,
        amount: FinalAmount,
        address: selectedAddress,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "blinkIt.pvt.ltd",
        description: "Your favourite items is click away. ",
        image: "https://blinkit.com/9f644712ea8611916099.png",
        order_id: data.id,
        handler: async (response) => {
          const res = await userRequest.post(
            `payment/verify/${user?._id}`,
            response
          );

          if (res.data === "OK") {
            localStorage.setItem("products", JSON.stringify([]));
            localStorage.setItem("quantity", 0);
            localStorage.setItem("total", 0);
            localStorage.setItem("selected", JSON.stringify([]));

            // window.location.replace("http://localhost:5173/orders");

            window.location.href = "/orders";

            // Navigate("/orders");
            // window.location.reload(true);
          }
        },
        theme: {
          color: "#0C831F",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } catch (e) {
      console.log(e);
    }
  };

  const handlepayment = async () => {
    const { data } = await userRequest.post(`payment/create/${user?._id}`, {
      amount: FinalAmount,
    });

    initiatePayment(data.data);
  };

  return (
    <>
      <AddressBox>
        <Top>
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ color: "green", fontSize: "2em" }}
            onClick={() => handleShowAddress()}
          />
          <h2>Add Address</h2>
        </Top>
        <Center>
          {addressList.map((a, i) => (
            <AddressList
              show={selectedAddress === a}
              onClick={() => SelectNewAddress(a)}
            >
              {a.slice(0, a.length - 1) + "."}
            </AddressList>
          ))}
        </Center>
        <Bottom>
          <button onClick={() => handleOpenAddress()}>Back</button>
          <button onClick={() => handlepayment()}>Make a Payment</button>
        </Bottom>
      </AddressBox>

      <Container show={showAddress}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h3>Address</h3>
            <FontAwesomeIcon
              icon={faClose}
              onClick={() => handleShowAddress()}
            />
          </div>

          <Label>Building/Apartment</Label>
          <Input
            type="text"
            name="building"
            value={address.building}
            onChange={(e) => handleChangeAddress(e)}
          />
          <Label>Road Name</Label>
          <Input
            type="text"
            name="road"
            value={address.road}
            onChange={(e) => handleChangeAddress(e)}
          />
          <Label>Landmark</Label>
          <Input
            type="text"
            name="landmark"
            value={address.landmark}
            onChange={(e) => handleChangeAddress(e)}
          />
          <Label>Pincode</Label>
          <Input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={(e) => handleChangeAddress(e)}
          />
          <button type="submit">Add Address</button>
        </Form>
      </Container>
    </>
  );
};

export default AddressSection;
