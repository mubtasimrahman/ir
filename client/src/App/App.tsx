import NavBar from "../Components/NavBar/NavBar";
import BentoBox from "../Components/BentoBox/BentoBox";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import FeaturedProjects from "../Components/FeaturedProjects/FeaturedProjects";
import OurSpecialities from "../Components/OurSpecialities/OurSpecialities";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import ClientExperiences from "../Components/ClientExperiences/ClientExperiences";
import AllTrades from "../Components/AllTrades/AllTrades";

function App() {
  return (
    <div
      //Gives live highlighting of which element is targeted
      data-bs-spy="scroll"
      className="d-flex flex-column"
    >
      {/* Giving overflow attribute to div with spy breaks behaviour*/}
      <div className="overflow-x-hidden">
        <NavBar />
        <BentoBox />
        <InfiniteAutoPlay />
        <FeaturedProjects id="FeaturedProjects" />
        <OurSpecialities id="Specialities"></OurSpecialities>
        <FixedFooter />
        <ClientExperiences id="ClientExperiences"></ClientExperiences>
        <AllTrades id="AllTrades" />
      </div>
    </div>
  );
}

export default App;
//Nav right side not lined up with Bento Box
/*Either set initial Height that will cover some instances but not all
or only dynmically load ceratin components*/
