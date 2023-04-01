import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BannerImage = styled.img`
  width: 80%;
  padding: 20px;
`;

const Banner = () => {
  return (
    <Container>
      <BannerImage src="../../banner.jpg" />
    </Container>
  );
};

export default Banner;
