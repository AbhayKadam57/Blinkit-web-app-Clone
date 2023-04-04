import styled from "styled-components";

const Container = styled.div`
  min-width: 100vw;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Dot1 = styled.div`
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50%;
  position: relative;
  animation: bounce 0.8s infinite alternate forwards linear;

  @keyframes bounce {
    0% {
      top: 0px;
    }

    50% {
      top: -20px;
    }
    100% {
      top: 0px;
    }
  }
`;
const Dot2 = styled.div`
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50%;
  position: relative;
  animation: bounce 1s infinite alternate forwards linear;

  @keyframes bounce {
    0% {
      top: 0px;
    }

    50% {
      top: -20px;
    }
    100% {
      top: 0px;
    }
  }
`;

const Dot3 = styled.div`
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50%;
  position: relative;
  animation: bounce 0.8s infinite alternate forwards linear;

  @keyframes bounce {
    0% {
      top: 0px;
    }

    50% {
      top: -20px;
    }
    100% {
      top: -10px;
    }
  }
`;

const Loader = () => {
  return (
    <Container>
      <Box>
        <Dot1></Dot1>
        <Dot2></Dot2>
        <Dot3></Dot3>
      </Box>
    </Container>
  );
};

export default Loader;
