import AllTradesAdmin from "../Components/AllTrades/AllTradesAdmin";
import FeaturedProjectsAdmin from "../Components/FeaturedProjects/FeaturedProjectsAdmin";

const AdminApp = () => {
  return (
    <div className="d-flex flex-column" style={{backgroundColor:"white"}}>
      <AllTradesAdmin></AllTradesAdmin>
      <FeaturedProjectsAdmin></FeaturedProjectsAdmin>
    </div>
  );
};

export default AdminApp;
