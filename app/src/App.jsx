import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import LoginPage from "./pages/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUppage from "./pages/SignUppage";
import { useSelector } from "react-redux";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import { userRequest } from "./apiRequest";
import OrderPage from "./pages/OrderPage";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  overflow: ${(props) => props.show && "hidden"};
  max-height: ${(props) => props.show && "100vh"};
`;

function App() {
  // const [User, setUser] = useState("");

  const [userID, setUserId] = useState("");

  const { user } = useSelector((state) => state.usersInfo);

  console.log(user);

  const { openCart } = useSelector((state) => state.cartInfo);

  const { products, quantity, total, selected } = useSelector(
    (state) => state.cartInfo
  );

  useEffect(() => {
    let currentTime = new Date().getTime();
    const expirationTime = localStorage.getItem("expirationTime");

    //This is added on 08-05-2023 for expiry of session
    if (currentTime >= expirationTime) {
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    let isSubscribe = true;

    const UpdateCart = async () => {
      try {
        const res = await userRequest.post(`/cart/addtocart/${user?._id}`, {
          userId: user?._id,
          products: products,
          quantity: quantity,
          total: total,
          selected: selected,
        });
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      UpdateCart();
    }

    return () => {
      isSubscribe = false;
    };
  }, [products, quantity, total, user?._id]);

  return (
    <Container show={openCart}>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <LoginPage />} />
          <Route path="/register" element={<SignUppage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />

          <Route
            path="/:category/:id"
            element={user ? <ProductPage /> : <Navigate to="/" />}
          />

          <Route
            path="/:category"
            element={user ? <ProductListing /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={user ? <OrderPage /> : <Navigate to="/" />}
          />
        </Routes>
        {user && <Cart />}
      </Router>
    </Container>
  );
}

export default App;
