import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../apiRequest";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CatetogryBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: start;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
`;

const Box = styled(Link)`
  width: 8em;
  height: 6em;
  text-align: center;
  text-decoration: none;
  color: #222;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const ProductList = () => {
  const [categoryList, SetCategoryList] = useState([]);

  useEffect(() => {
    const getCat = async () => {
      try {
        const cat = await publicRequest.get("/product/getallcategories");

        SetCategoryList(cat.data);
      } catch (e) {
        console.log(e);
      }
    };

    getCat();
  }, []);

  return (
    <Container>
      <CatetogryBox>
        {categoryList.map((item) => (
          <Box to={`/${item.category}`} key={item._id}>
            <img src={item.image} />
            <p>{item.category}</p>
          </Box>
        ))}
      </CatetogryBox>
    </Container>
  );
};

export default ProductList;
