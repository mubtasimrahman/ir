import "./NavBar.scss";

function NavBar() {
  return (
    <nav
      id="NavBar"
      /*sticky-top option. Then there is browser compat issues with small screens(Chromium vs firefox)
      where when expanding, in chromium it causes the jitter but does not take space whereas
      with firefox there is not jitter, but the expanded content causes shifts. Also the issue of how it will
      work in tandem with back2top button*/
      className="navbar navbar-expand-lg poppins-regular fixed-top"
      data-bs-theme="dark"
      aria-label="navbar + scrollspy"
    >
      <div className="container ">
        <button
          className="navbar-toggler me-9 me-sm-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand ms-9 ms-sm-0" href="#bla">
          Navbar
        </a>
        <div
          className="collapse navbar-collapse ms-9 ms-sm-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 flex-fill justify-content-evenly">
            <li className="nav-item">
              <a className="nav-link" href="#FeaturedProjects">
                Our Work
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ClientExperiences">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#AllTrades">
                About
              </a>
            </li>
          </ul>

          <button type="button" className="contact-button mb-lg-0 mb-3">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}

//onclick of anchor tags in mobile screens, close navbar by using state to turn on collapsed class in button
export default NavBar;
