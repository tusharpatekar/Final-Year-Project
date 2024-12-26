import "./Home.css";
// import HomeHeader from "../../components/homeHeader/homeHeader";
import { Container } from "@chakra-ui/react";
import AboutUs from "./AboutUs/AboutUs";
import Goals from "./Goals/Goals";

const Home = () => {
  return (
    <div id="Home">
     
      <Container maxW="7xl">
        <div className="homeContent">
          <AboutUs />
          <Goals />
        </div>
      </Container>
    </div>
  );
};

export default Home;
