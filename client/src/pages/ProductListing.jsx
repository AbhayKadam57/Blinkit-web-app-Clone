import {
  faCheck,
  faMinus,
  faPlus,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../apiRequest";
import Navbar from "../components/Navbar";
import { AddProducts, UpdateProducts } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  flex-direction: column;
`;

const Box = styled.div`
  width: 80%;

  display: flex;
`;

const Left = styled.div`
  flex: 2;
  position: sticky;
  top: 0;
  flex-direction: column;
  overflow-y: scroll;
  height: 100vh;
  border: 2px solid #ddd;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const Image = styled.div`
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;

  img {
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
`;

const Category = styled.div`
  height: 5em;
  padding: 10px;
  border-bottom: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  background-color: ${(props) => props.show && "#e3f8e6"};
  border-left: ${(props) => props.show && "3px solid #0c831f"};
  cursor: pointer;

  p {
    font-size: 18px;
    text-transform: capitalize;
  }

  &:hover {
    background-color: #e3f8e6;
    border-left: 3px solid #0c831f;
  }

  &:hover {
    ${Image} {
      transform: translateY(-5px);
    }
  }
`;

const Right = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
`;

const RightTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
`;

const MainHeading = styled.p`
  font-size: 1em;
  font-weight: 600;

  p {
    text-transform: capitalize;
  }
`;

const SortSelect = styled.div`
  display: flex;
  color: #0e6e1c;
  align-items: center;
  justify-content: center;
  gap: 20px;

  small {
    font-size: 14px;
  }
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border: 1px solid #ddd;
  width: 14em;
  border-radius: 8px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
`;

const MainSelect = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  text-decoration: capitalize;
`;

const Options = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ddd;
  flex-direction: column;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: ${(props) => (props.selectOp ? "flex" : "none")};
  cursor: pointer;
  background-color: #fff;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
  gap: 10px;

  span {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid green;
    display: ${(props) => (props.show ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: green;
    color: #fff;
    gap: 20px;
  }

  p {
    font-size: 14px;
    text-align: start;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const RightBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const ProductBox = styled.div`
  width: 25%;
  height: 20em;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: start;
  justify-content: space-between;
  gap: 15px;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Links = styled(Link)`
  width: 100%;
  height: 50%;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

// const Button = styled.button`
//   width: 100px;
//   font-size: 1em;
//   font-weight: bold;
//   background-color: #2cdc493a;
//   border: 1.7px solid #0c831f;
//   padding: 5px 15px;
//   border-radius: 5px;
//   color: #0c831f;
//   cursor: pointer;
// `;

const Button = styled.button`
  width: 80px;
  font-size: 1em;
  font-weight: 600;
  background-color: #b6f9c239;
  border: 1px solid #0c831f;
  padding: 8px 15px;
  border-radius: 8px;
  color: #0c831f;
  cursor: pointer;
`;

const Button_1 = styled.button`
  width: 90px;
  font-size: 1em;
  font-weight: bold;
  background-color: #0c831f;
  padding: 8px 15px;
  border-radius: 8px;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const ProductListing = () => {
  const [selectOp, SetSelect] = useState(false);

  const [sortSelect, setSortSelect] = useState("");

  const { products, selected } = useSelector((state) => state.cartInfo);

  const { user } = useSelector((state) => state.usersInfo);

  const { category } = useParams();

  const [subcategory, setSubCategory] = useState([]);

  const [productList, setProductList] = useState([]);
  const [choose, SetChoose] = useState("" || subcategory[0]);

  console.log(subcategory[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await publicRequest.get(
          `/product/find?subcategory=${choose}`
        );

        setProductList(res.data);

        SetChoose(res.data[0].subcategory);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getData();
    }

    return () => {
      isSubscribe = false;
    };
  }, [choose]);

  useEffect(() => {
    let isSubscribe = true;
    const getData = async () => {
      try {
        const res = await userRequest.get(
          `/product/filter/${user._id}?subcategory=${choose}&sort=${sortSelect}`
        );

        console.log(res.data);

        setProductList(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getData();
    }

    return () => {
      isSubscribe = false;
    };
  }, [sortSelect, subcategory, choose]);

  const handleChoose = async (type) => {
    SetChoose(type);
    localStorage.setItem("subcategory", type);
  };

  const handleSelect = () => {
    SetSelect(!selectOp);
  };

  const handleSort = (type) => {
    setSortSelect(type);
  };

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await userRequest.get(`/product/find?category=${category}`);

        console.log(res.data);
        SetChoose(res.data[0].subcategory);

        let arr = [];

        for (let i = 0; i < res.data.length; i++) {
          if (!arr.includes(res.data[i].subcategory)) {
            arr.push(res.data[i].subcategory);
          }
        }

        setSubCategory([...arr]);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getData();
    }

    return () => {
      isSubscribe = false;
    };
  }, [category]);

  const addProducts = (product) => {
    dispatch(AddProducts(product));
  };

  const updateQuantity = (type, product) => {
    dispatch(UpdateProducts({ type, product }));
  };

  return (
    <Container>
      <Navbar />
      <Box>
        <Left>
          {subcategory.map((p, i) => (
            <Category
              onClick={() => handleChoose(p)}
              show={choose === p ? true : false}
            >
              <Image>
                <img src="../../subcategory.png" alt="" />
              </Image>
              <p>{p}</p>
            </Category>
          ))}
        </Left>
        <Right>
          <RightTop>
            <MainHeading>
              <p>Buy {choose} Online</p>
            </MainHeading>
            <SortSelect onClick={() => handleSelect()}>
              <small>Sort By</small>
              <Select>
                <MainSelect>
                  <p>{sortSelect ? sortSelect : "New"}</p>
                  <FontAwesomeIcon icon={faSortDown} />
                </MainSelect>
                <Options selectOp={selectOp}>
                  <Option onClick={() => handleSort("Price (Low to High)")}>
                    <span
                      show={sortSelect === "Price (Low to High)" ? true : false}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>Price (Low to High)</p>
                  </Option>
                  <Option onClick={() => handleSort("Price (High to Low)")}>
                    <span
                      show={sortSelect === "Price (High to Low)" ? true : false}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>Price (High to Low)</p>
                  </Option>
                  <Option onClick={() => handleSort("New")}>
                    <span show={sortSelect === "New" ? true : false}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <p>New</p>
                  </Option>
                </Options>
              </Select>
            </SortSelect>
          </RightTop>
          <RightBottom>
            {productList.map((product, i) => (
              <ProductBox>
                <Links to={`/${category}/${product._id}`}>
                  <ProductImage src={product.images[0]} />
                </Links>

                <p>{product.name.slice(0, 20)}...</p>
                <small>{product.unit}</small>
                <PriceBox>
                  <small>₹ {product.price}</small>
                  {selected.includes(product._id) ? (
                    <Button_1>
                      <FontAwesomeIcon
                        icon={faPlus}
                        type="add"
                        onClick={() => updateQuantity("add", product)}
                      />
                      {products.map(
                        (pr, i) =>
                          pr._id === product._id && <p>{pr?.quantity}</p>
                      )}
                      <FontAwesomeIcon
                        icon={faMinus}
                        type="dec"
                        onClick={() => updateQuantity("dec", product)}
                      />
                    </Button_1>
                  ) : (
                    <Button onClick={() => addProducts(product)}>ADD</Button>
                  )}
                </PriceBox>
              </ProductBox>
            ))}
          </RightBottom>
        </Right>
      </Box>
    </Container>
  );
};

export default ProductListing;
