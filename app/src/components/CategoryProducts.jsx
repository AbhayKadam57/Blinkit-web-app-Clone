import {
  faArrowAltCircleLeft,
  faArrowCircleLeft,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  memo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { publicRequest, userRequest } from "../apiRequest";
import { AddProducts, UpdateProducts } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  width: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Heading = styled.p`
  font-size: 1.4em;
  font-weight: 700;
  text-transform: capitalize;
`;

const Products = styled.div`
  display: flex;
  height: 90%;
  flex-grow: 1;
  flex-shrink: 0;
  gap: 10px;
  overflow-x: hidden;
  padding: 20px;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  /* background-color: red; */
  width: 100%;
  transition: all 0.5s ease;
  transform: ${(props) =>
    props.shift < 1
      ? `translateX(${-props.shift * 150}px)`
      : `translateX(${-props.shift * 150}px)`};
`;

const SingleProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 11em;
  height: 250px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #bcbbbb;
  transition: all 0.5s ease;
  padding: 10px;
  /* gap: 10px; */
  text-decoration: none;
  color: #000;
  /* img {
    width: 100%;
    height: 50%;
    object-fit: contain;
  } */

  &:hover {
    border: 1px solid #0c831f;
    cursor: pointer;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled(LazyLoadImage)`
  object-fit: contain;
  min-width: 90%;
  height: 120px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  small {
    color: #aaa;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  p {
    font-size: 14px;
    width: fit-content;
    font-weight: 500;
  }
`;

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
  width: 80px;
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

const Arrow = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: ${(props) => props.type === "left" && "0%"};
  right: ${(props) => props.type === "right" && "0%"};
  transform: translateY(-50%);
  font-size: 1em;
  background-color: #fff;
  color: #222;
  box-shadow: 0px 0px 20px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;

const CategoryProducts = ({ category }) => {
  const [change, setChange] = useState(0);
  const [CategoryProducts, setCatgoryProducts] = useState([]);
  // const [selected, setSelected] = useState([]);

  const { products, selected } = useSelector((state) => state.cartInfo);

  const dispatch = useDispatch();

  const handleClick = (type) => {
    if (type === "left") {
      change > 0 && setChange(change - 1);
    } else if (type === "right") {
      change >= 0 && change <= CategoryProducts.length && setChange(change + 1);

    }
  };

  const GetProducts = useMemo(async () => {
    try {
      const res = await publicRequest.get(`/product/find?category=${category}`);

      setCatgoryProducts(res.data);
    } catch (e) {
      console.log(e);
    }
  }, [category]);

  useEffect(() => {
    let Subscribed = true;

    if (Subscribed) {
      GetProducts;
    }

    return () => {
      Subscribed = false;
    };
  }, [category]);

  const addProducts = (product) => {
    dispatch(AddProducts(product));
  };

  const updateQuantity = (type, product) => {
    dispatch(UpdateProducts({ type, product }));
  };

  const HandelClick = () => {
    let expirationTime = localStorage.getItem("expirationTime");

    if (!expirationTime) {
      window.location.reload(true);
    }
  };

  return (
    <Container>
      <Box>
        <Heading>{category}</Heading>
        <Products>
          <Arrow type="left" onClick={() => handleClick("left")}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Arrow>
          <Slider shift={change}>
            {CategoryProducts.map((product, i) => (
              <SingleProduct key={product._id}>
                <Link
                  to={`/${category}/${product._id}`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => HandelClick()}
                >
                  <Image src={product.images[0]} effect="blur" />
                </Link>
                <ProductInfo>
                  <p>{product.name.slice(0, 25)}...</p>
                  <small>{product.unit}</small>
                  <div>
                    <p>₹ {product.price}</p>
                    {selected.includes(product._id) ? (
                      <Button_1>
                        <FontAwesomeIcon
                          icon={faPlus}
                          type="add"
                          onClick={() => updateQuantity("add", product)}
                        />
                        {products.map(
                          (p, i) =>
                            product._id === p._id && <p>{p?.quantity}</p>
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
                  </div>
                </ProductInfo>
              </SingleProduct>
            ))}
          </Slider>

          <Arrow type="right" onClick={() => handleClick("right")}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Arrow>
        </Products>
      </Box>
    </Container>
  );
};

export default memo(CategoryProducts);
