import FeaturedProjects from "../Components/FeaturedProjects/FeaturedProjects";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import BentoBox from "../Components/BentoBox/BentoBox";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import AllTrades from "../Components/JackOfAll/AllTrades";
import NavBar from "../Components/NavBar/NavBar";

function App() {
  return (
    <div
      data-bs-spy="scroll"
      data-bs-target="NavBar"
      className="d-flex flex-column"
    >
      <NavBar></NavBar>
      <BentoBox id="BentoBox"></BentoBox>
      <InfiniteAutoPlay></InfiniteAutoPlay>
      <FeaturedProjects id="FeaturedProjects"></FeaturedProjects>
      <FixedFooter></FixedFooter>
      <AllTrades id="AllTrades"></AllTrades>
    </div>
  );
}

export default App;
