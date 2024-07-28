import { Suspense, lazy } from "react";
import NavBar from "../Components/NavBar/NavBar";
import InfiniteAutoPlay from "../Components/InfiniteAutoPlay/InfiniteAutoPlay";
import BentoBox from "../Components/BentoBox/BentoBox";
import FixedFooter from "../Components/ScrollComponents/FixedFooter";
import LazyLoadWrapper from "../Components/WrapperComponents/LazyLoadWrapper";

const FeaturedProjects = lazy(() => import('../Components/FeaturedProjects/FeaturedProjects'));
const AllTrades = lazy(() => import('../Components/JackOfAll/AllTrades'));

const App: React.FC = () => {

  
  return (
    <div data-bs-spy="scroll" data-bs-target="NavBar" className="d-flex flex-column">
      <NavBar />
      <BentoBox />
      <InfiniteAutoPlay />

      <LazyLoadWrapper id="FeaturedProjects" initialHeight="1500px">
        <Suspense fallback={<div>Loading...</div>}>
          <FeaturedProjects  />
        </Suspense>
      </LazyLoadWrapper>

      <FixedFooter />

      <LazyLoadWrapper id="AllTrades" initialHeight="800px">
        <Suspense fallback={<div>Loading...</div>}>
          <AllTrades />
        </Suspense>
      </LazyLoadWrapper>
    </div>
  );
}

export default App;
//Nav right side not lined up with Bento Box