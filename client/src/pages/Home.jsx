import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../apiRequest";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductList from "../components/ProductList";
import CategoryProducts from "../components/CategoryProducts";
import Cart from "./Cart";
import { memo } from "react";

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  position: relative;
  height: ${(props) => props.show && "100vh"};
  overflow: ${(props) => props.show && "hidden"};
  z-index: 1;
  overflow-x: hidden;
`;

const Home = () => {
  const { user } = useSelector((state) => state.usersInfo);

  const { openCart } = useSelector((state) => state.cartInfo);

  const [categories, setCategories] = useState([]);

  // let accessToken = localStorage.getItem("accessToken");
  // let refreshToken = localStorage.getItem("refreshToken");

  // const handleRefreshToken = async () => {
  //   try {
  //     const res = await userRequest.get(
  //       `/userOperation/getAllusers/${user._id}`
  //     );

  //     console.log(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const LogoutUser = async () => {
  //   try {
  //     const res = await userRequest.post(`/user/logout/${user._id}`);

  //     console.log(res.data);

  //     if (res.data === "User logout successfully") {
  //       localStorage.clear();

  //       window.location.reload(true);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    let isSubscribe = true;

    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/product/find");

        res.data.map((item) => {
          for (let key in item) {
            if (!categories.includes(item["category"]) && key === "category") {
              setCategories([...categories, item["category"]]);
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getProducts();
    }

    return () => {
      isSubscribe = false;
    };
  }, [categories]);

  return (
    <Container show={openCart}>
      {/* <button onClick={() => handleRefreshToken()}>Get Users</button>
      <button onClick={() => LogoutUser()}>Logout</button> */}
      <Navbar />

      <ProductList />

      {categories.map((item, key) => (
        <CategoryProducts category={item} key={key} />
      ))}

      {/* <Cart /> */}
    </Container>
  );
};

export default memo(Home);
