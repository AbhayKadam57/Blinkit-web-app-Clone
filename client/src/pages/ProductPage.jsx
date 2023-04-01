import {
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { publicRequest, userRequest } from "../apiRequest";
import Navbar from "../components/Navbar";
import { AddProducts, UpdateProducts } from "../redux/cartSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
`;

const Box = styled.div`
  width: 80%;
  display: flex;
  align-content: center;
  padding: 10px;
`;

const Left = styled.div`
  width: 50%;
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  flex-direction: column;
  border-right: 2px solid rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Images = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;

  img {
    width: 90%;
    height: 90%;
    object-fit: contain;
    transition: all 0.5s ease-in-out;
  }
`;

const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 20px;
  position: relative;
  width: 90%;
  overflow: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MainSilder = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  transition: all 0.8s linear;
  transform: ${(props) =>
    props.show >= 0 && `translateX(${-props.show * 50}%)`};
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;

  img {
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
`;

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: ${(props) => props.type === "left" && "1%"};
  right: ${(props) => props.type === "right" && "1%"};
  transform: translateY(-50%);
  font-size: 1em;
  background-color: #fff;
  color: #222;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;

const Heading = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
  text-decoration: capitalize;
`;

const Feature = styled.p`
  font-size: 14px;
  color: #616161;
  text-decoration: capitalize;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 20px;
`;

const ProductTitle = styled.p`
  font-size: 24px;
`;

const Brand = styled.p`
  font-size: 18px;
  color: #0c831f;
  font-weight: 500;
`;

const SelectionBrand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0c831f;
  max-width: 150px;
  height: 50px;
  border-radius: 10px;
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;

    h6 {
      font-weight: bold;
    }

    p {
      font-size: 16px;
    }
  }
`;

const Button_1 = styled.button`
  width: 120px;
  font-size: 1.3em;
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

const Button = styled.button`
  width: 120px;
  font-size: 1.3em;
  font-weight: 600;
  background-color: #b6f9c239;
  border: 1px solid #0c831f;
  padding: 8px 15px;
  border-radius: 8px;
  color: #0c831f;
  cursor: pointer;
`;

const ProductPage = () => {
  const [change, SetChange] = useState(0);
  const [activeImage, SetActiveImage] = useState("");
  const { products, selected } = useSelector((state) => state.cartInfo);
  const { id } = useParams();
  const [product, Setproduct] = useState({});
  const { user } = useSelector((state) => state.usersInfo);

  console.log(id);
  console.log(user._id);

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribe = true;

    const getProduct = async () => {
      try {
        const res = await userRequest.get(
          `/product/getproduct/${user._id}/${id}`
        );

        console.log(res.data);

        Setproduct(res.data);
        SetActiveImage(res.data.images[0]);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getProduct();
    }

    return () => {
      isSubscribe = false;
    };
  }, []);

  console.log(product.images);

  const handleSlider = (type) => {
    if (type === "right") {
      change >= 0 && change < 1 && SetChange(change + 1);
    } else if (type === "left") {
      change > 0 && SetChange(change - 1);
    }
  };

  const handleActiveImageChange = (img) => {
    SetActiveImage(img);
  };

  console.log(change);

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
          <Slider>
            <Images>
              <img src={activeImage || ""} />
            </Images>

            <ImageGroup>
              <MainSilder show={change}>
                {product.images?.map((p, i) => (
                  <ImageContainer onClick={() => handleActiveImageChange(p)}>
                    <img src={p} alt="" />
                  </ImageContainer>
                ))}
              </MainSilder>
              <Arrow type="left" onClick={() => handleSlider("left")}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Arrow>

              <Arrow type="right" onClick={() => handleSlider("right")}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Arrow>
            </ImageGroup>
          </Slider>
          <ProductDetails>
            <Heading>Product Details</Heading>

            {Object.entries(product).map(
              ([key, value]) =>
                key !== "images" &&
                key !== "category" &&
                key !== "subcategory" &&
                key !== "updatedAt" &&
                key !== "_id" &&
                key !== "createdAt" &&
                key !== "_V" &&
                key !== "discount" &&
                value != "" && (
                  <Details>
                    {
                      <Title>
                        {key.split("_").join(" ")[0].toUpperCase() +
                          key.split("_").join(" ").slice(1)}
                      </Title>
                    }
                    {<Feature>{value}</Feature>}
                  </Details>
                )
            )}
          </ProductDetails>
        </Left>
        <Right>
          <ProductTitle>{product?.name}</ProductTitle>
          <Brand>{product?.brand}</Brand>
          <SelectionBrand>
            <div>
              <h5>{product.unit}</h5>
              <p>₹ {product.price}</p>
            </div>
          </SelectionBrand>
          {products.map(
            (p, i) =>
              p._id === product._id && (
                <Button_1>
                  <FontAwesomeIcon
                    icon={faPlus}
                    type="add"
                    onClick={() => updateQuantity("add", product)}
                  />
                  <p>{p.quantity}</p>
                  <FontAwesomeIcon
                    icon={faMinus}
                    type="dec"
                    onClick={() => updateQuantity("dec", product)}
                  />
                </Button_1>
              )
          )}
          {!selected.includes(product._id) && (
            <Button onClick={() => addProducts(product)}>ADD</Button>
          )}
        </Right>
      </Box>
    </Container>
  );
};

export default ProductPage;
