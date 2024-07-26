import "./FeaturedProjects.scss";
import demoLogo from "../../assets/vite.svg";

const clients = [
  {
    name: "IPDC Finance",
    services: [
      "Graphic Design",
      "Motion Design",
      "Video Editing",
      "AI Image Generation",
      "Artwork and Illustrations",
    ],
    imageUrl: "path_to_image_1",
  },
  {
    name: "Smart Air",
    services: [
      "Graphic Design",
      "Web Design",
      "Motion Design",
      "Video Editing",
      "AI Image Generation",
    ],
    imageUrl: "path_to_image_2",
  },
  {
    name: "Lueur Bakery",
    services: ["Graphic Design", "AI Image Generation"],
    imageUrl: "path_to_image_3",
  },
  {
    name: "Unimart",
    services: ["Video Editing", "Videography", "Motion Design"],
    imageUrl: "path_to_image_4",
  },
];

function FeaturedProjects({id}:{id:string}) {
  return (
    <div id={id} className="featured-projects my-4">
      <div className="featured-title poppins-bold-heading">
        Featured Clients
      </div>
      <div className="container">
        <div className="row ">
          {clients.map((client, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card bg-transparent border-light mb-3">
                <div className="card-body">
                  <div className="container">
                    <div className="row justify-content-between align-item-center">
                      <h5 className="col-lg-9 col-9 poppins-semibold card-title">
                        {client.name}
                      </h5>
                      <div className="col-lg-3 col-2 button-container-fp poppins-regular">
                        <span className="mask-fp">GO</span>
                        <button className="button-fp" type="button" name="Hover">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-services">
                    {client.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="service-tag poppins-extralight"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <img
                  src={demoLogo}
                  className="card-img-bottom"
                  alt={client.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProjects;