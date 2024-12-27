
import BentoBox from "../Components/BentoBox/BentoBox";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import FeaturedProjects from "../Components/FeaturedProjects/FeaturedProjects";
import AllClients from "../Components/AllClients/AllClients";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import SpecialitiesWithExperiences from "../Components/Composites/SpecialitiesWithExperiences/SpecialitiesWithExperiences";
import AllTrades from "../Components/AllTrades/AllTrades";
import Footer from "../Components/Footer/Footer";


function App() {
  return (
    <div
      //Gives live highlighting of which element is targeted
      data-bs-spy="scroll"
      className="d-flex flex-column"
    >
      {/* Giving overflow property to div with spy breaks behaviour*/}
      <div className="overflow-x-hidden">
        
        <BentoBox />
        <InfiniteAutoPlay />
        <FeaturedProjects id="FeaturedProjects" />
        <AllClients></AllClients>
        <SpecialitiesWithExperiences></SpecialitiesWithExperiences>
        <AllTrades id="AllTrades" />
        <FixedFooter />
        <Footer id="ContactUs"></Footer>
      </div>
    </div>
  );
}

export default App;
//Nav right side not lined up with Bento Box
/*Either set initial Height that will cover some instances but not all
or only dynmically load ceratin components*/
