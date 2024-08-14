import NavBar from "../Components/NavBar/NavBar";
import BentoBox from "../Components/BentoBox/BentoBox";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import FeaturedProjects from "../Components/FeaturedProjects/FeaturedProjects";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import ClientExperiences from "../Components/ClientExperiences/ClientExperiences";
import AllTrades from "../Components/AllTrades/AllTrades";
import OurSpecialities from "../Components/OurSpecialities/OurSpecialities";

function App() {
  return (
    <div
      //Gives live highlighting of which element is targeted
      data-bs-spy="scroll"
      //Give "overflow-hidden" to stop horizontal scrolling
      className="d-flex flex-column overflow-hidden"
    >
      <NavBar />
      <BentoBox />
      <InfiniteAutoPlay />

      <FeaturedProjects id="FeaturedProjects" />
      <OurSpecialities id="Specialities"></OurSpecialities>
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
