import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { publicRequest, userRequest } from "../apiRequest";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
  ${mobile({ marginTop: "20px" })}
`;

const CatetogryBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: start;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  ${mobile({ alignItems: "center", justifyContent: "center" })}
`;

const Box = styled(Link)`
  width: 8em;
  text-align: center;
  text-decoration: none;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  ${mobile({ width: "6em" })}
  /* img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  } */

  p {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const Image = styled(LazyLoadImage)`
  width: 80%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const ProductList = () => {
  const [categoryList, SetCategoryList] = useState([]);

  const getCat = useMemo(async () => {
    try {
      const cat = await userRequest.get("/product/getallcategories");

      SetCategoryList(cat.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    let Subscribe = true;

    if (Subscribe) {
      getCat;
    }

    return () => {
      Subscribe = false;
    };
  }, []);

  const HandelClick = () => {
    let expirationTime = localStorage.getItem("expirationTime");

    if (!expirationTime) {
      window.location.reload(true);
    }
  };

  return (
    <Container>
      <CatetogryBox>
        {categoryList.map((item) => (
          <Box
            onClick={() => HandelClick()}
            to={`/${item.category}`}
            key={item._id}
          >
            <Image src={item.image} effect="blur" alt="category" />
            <p>{item.category}</p>
          </Box>
        ))}
      </CatetogryBox>
    </Container>
  );
};

export default ProductList;
