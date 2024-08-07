import NavBar from "../Components/NavBar/NavBar";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import BentoBox from "../Components/BentoBox/BentoBox";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import AllTrades from "../Components/AllTrades/AllTrades";
import FeaturedProjects from "../Components/FeaturedProjects/FeaturedProjects";
import ClientExperiences from "../Components/ClientExperiences/ClientExperiences";

function App() {
  return (
    <div
      data-bs-spy="scroll"
      data-bs-target="NavBar"
      className="d-flex flex-column"
    >
      <NavBar />
      <BentoBox />
      <InfiniteAutoPlay />

      <FeaturedProjects id="FeaturedProjects" />

      <FixedFooter />
      <ClientExperiences id="ClientExperiences"></ClientExperiences>
      <AllTrades id="AllTrades" />
    </div>
  );
}

export default App;
//Nav right side not lined up with Bento Box
/*Either set initial Height that will cover some instances but not all
or only dynmically load ceratin components*/
