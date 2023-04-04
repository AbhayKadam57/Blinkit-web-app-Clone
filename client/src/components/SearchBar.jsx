import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { publicRequest } from "../apiRequest";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  background-color: #f1f0f0;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  ${mobile({
    position: "absolute",
    top: "100%",
    left: "-30%",
    transform: "translateX(50%)",
    width: "80%",
    margin: "10px 0",
  })}
`;

const SearchButton = styled.div`
  width: 5%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  left: 0;
  top: 0;
`;

const Input = styled.input`
  position: absolute;
  right: 0;
  top: 0;
  width: 95%;
  height: 100%;
  border: none;
  /* background-color: #ffffff; */
  outline: none;
  font-size: 1.2em;
  padding: 0 10px;
  z-index: 1;
`;

const SearchResult = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 10;
  width: 100%;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show === false ? "flex" : "none")};
  flex-direction: column;
`;

const FindItem = styled.div`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  align-content: center;
  justify-content: flex-start;

  img {
    width: 40px;
    height: 50%;
    object-fit: cover;
  }

  p {
    display: flex;
    align-items: center;
  }
`;

const Box = styled.div`
  width: 100%;
  padding: 10px;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
`;

const Slider = styled.div`
  position: absolute;
  top: 110%;
  width: 100%;
  left: 6%;
  background-color: #e4e2e2;
  z-index: 5;

  p {
    height: 2em;
    animation: move 8s linear infinite forwards;
    transition: all 5s ease-in;
    margin-bottom: 40px;
    color: #cdcaca;
  }

  @keyframes move {
    0% {
      transform: translateY(10%);
    }
    100% {
      transform: translateY(-700%);
    }
  }
`;

const SearchBar = () => {
  const [SearchTerm, setSearchItem] = useState("");

  const [ProductsList, SetProductList] = useState([]);

  const [hide, SetHide] = useState(true);

  const [hideSearch, SetHideSearch] = useState(true);

  const [List, SetList] = useState([
    "Search 'milk'",
    "Search 'curd'",
    "Search 'chips'",
    "Search 'milk'",
  ]);

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        if (SearchTerm.length > 3) {
          const res = await publicRequest.get(
            `/product/search?term=${SearchTerm}`
          );

          res.data && SetHideSearch(false);

          SetProductList(res.data);
        } else {
          SetProductList([]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    GetData();
  }, [SearchTerm]);

  const handleFocus = () => {
    SetHide(false);
  };

  const handleBlur = () => {
    SetHide(true);
  };

  const handleClick = () => {
    SetHideSearch(true);
    setSearchItem("");
  };

  return (
    <Container>
      <SearchButton>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </SearchButton>
      <Input
        type="text"
        value={SearchTerm}
        onChange={(e) => handleChange(e)}
        show={hide}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
      />
      {SearchTerm.length > 0 && ProductsList.length > 0 && (
        <SearchResult show={hideSearch}>
          {ProductsList.slice(0, 5).map((p, i) => (
            <Link
              to={`/${p.category}/${p._id}`}
              style={{ textDecoration: "none", color: "#222" }}
              key={p._id}
              onClick={() => handleClick()}
            >
              <FindItem>
                <img src={p.images[0]} alt="" />
                <p>{p.name}</p>
              </FindItem>
            </Link>
          ))}
        </SearchResult>
      )}
      <Box show={hide}>
        <Slider>
          {List.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default SearchBar;
